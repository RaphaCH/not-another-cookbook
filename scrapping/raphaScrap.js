const puppeteer = require('puppeteer');
const fs = require("fs");

baseUrl = 'https://www.bbcgoodfood.com/recipes/collection/easy-recipes'


const scrapUrls = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' });
    let agreeButton = '.css-1x23ujx'
    await page.click(agreeButton);
    //Detect "LOAD MORE" button and click on it until it doest now display anymore
    const cssSelector = '.button.load-more-paginator__btn';
    const isElementVisible = async (page, cssSelector) => {
      let visible = true;
      await page
        .waitForSelector(cssSelector, { visible: true, timeout: 4000 })
        .catch(() => {
          visible = false;
        });
      return visible;
    };

    let loadMoreVisible = await isElementVisible(page, cssSelector);
    while (loadMoreVisible) {
      await page
        .click(cssSelector)
        .catch(() => { });
      loadMoreVisible = await isElementVisible(page, cssSelector);
    }


    const recipesUrls = await page.evaluate(() => {
      let array = Array.from(document.querySelectorAll('div[class="card__section card__content"] > a'));
      let allLinks = array.map(element => {
        return element.href
      })
      return allLinks.filter(link => link.match(/recipes/)).filter(link => !link.match(/howto/));
    })
    console.log(recipesUrls);
    await browser.close();
    scrapContent(recipesUrls)
  } catch (error) {
    console.log(error)
  }
}

const scrapContent = async (urls) => {
  
  let recipesData = []
  try {
    //apparently, second part only works with headless false. Not action required however
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    for (let i = 0; i < urls.length; i++) {
      recipe = {}
      await page.goto(urls[i], { waitUntil: 'networkidle2' })
      // let agreeButton = '.css-1x23ujx'
      // await page.click(agreeButton);

      recipe.title = await page.evaluate(() => document.querySelector('div[class="headline post-header__title post-header__title--masthead-layout"] > h1').textContent)

      recipe.servingAmount = await page.evaluate(() => {
        let realInfo = Array.from(document.querySelectorAll('.icon-with-text__children')) || []
        if (realInfo.length > 0) {
          let servings = realInfo[realInfo.length - 1].textContent.split(' ').pop();
          return servings;
        }
      })

      recipe.cookingTime = await page.evaluate(() => {
        let realInfo = Array.from(document.querySelectorAll('.icon-with-text__children')) || []
        if (realInfo.length > 0) {
          let cookingArray = realInfo[0].textContent.split(':');
          let time = cookingArray[cookingArray.length - 1].split('p')[0];
          return time
        }
      })

      recipe.ingredients = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.pb-xxs.pt-xxs.list-item.list-item--separator')).map(element => {
          if (element !== undefined) {
            return element.innerText
          }
        })
      })

      recipe.instructions = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('ul[class="grouped-list__list list"]>li>div')).map(Element => Element.textContent)
      })

      recipe.image = await page.evaluate(() => document.querySelector('section>div>div>div>div>picture>img').src)

      recipe.nutrition = await page.evaluate(() => {
        let nutriArray = []
        Array.from(document.querySelectorAll('tr[class="key-value-blocks__item"]>td')).map(element => {
          return nutriArray.push(element.textContent)
        })
        return nutriArray.toString();
      })

      recipesData.push(recipe)
      // }
    }
    await browser.close()
    console.log(recipesData)
    fs.writeFileSync("recipeDataScraped.json", JSON.stringify(recipesData))
  } catch (error) {
    console.log(error)
    await browser.close()
  }
}

//scrapUrls(baseUrl)



//get nutrients as a string:
/* let nutriArray = []
  let test = Array.from(document.querySelectorAll('tr[class="key-value-blocks__item"]>td')).map(element => {
  return nutriArray.push(element.textContent)
  })
  let nutriString = nutriArray.toString();
*/

module.exports = scrapUrls;




