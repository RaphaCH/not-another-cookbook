const puppeteer = require("puppeteer");
const fs = require("fs");
const { Console } = require("console");
const recipes = JSON.parse(fs.readFileSync("recipeData.json", "utf-8"));

//The category urls from which all the recipe urls are scraped

let baseurls =["https://www.allrecipes.com/search/results/?search=ognion"]
// [
  // "https://www.allrecipes.com/search/results/?search=pasta"
// ];



let trackOfMyCategory = 0
//This was the function to scrape all the urls from the baseurl and then save it in a JSON file (won't be called again as all the links have already been saved in a JSON)
const scrapeURLsFromOnePage = async (url) => {
  let finalURLs2 = [];
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: false,
  });
  const page = await browser.newPage();
  await page.goto(url);

  const scrapingUrls = [];

  //Selecting the parent class of the "a" tags which contain the URLs
  const recipeParent = await page.$$(".card__titleLink");

  //Looping through the children to get all the URLs and push the data in the empty array
  for (const recipe of recipeParent) {
    const urls = await page.evaluate((el) => el.href, recipe);
    scrapingUrls.push(urls);
  }

  //Removing duplicates from the array
  const urlArray = [...new Set(scrapingUrls)];

  //As the page contains both recipes and articles, I am filtering my array to remove the links that contain the word "gallery"(the articles)
  const finalURLS = urlArray.filter((arr) => !arr.match(/gallery/i));
  finalURLs2 = [...finalURLs2, ...finalURLS];
  console.log("finalURLS---------> "+finalURLs2)
  await scrapContentFromUrls(finalURLs2, trackOfMyCategory)

  await browser.close();
};

//(the urls are saved aleady in a JSON file so this next function won't be called again)
// const loopThroughArray = async () => {
    // await scrapeURLsFromOnePage(baseurls[0])
  
  // fs.writeFileSync("recipeData.json", JSON.stringify(finalURLs2))  
  // -> Saving the urls in the JSON so I don't scrape them each time
// }

//-->Delete baseUrls

// const arrayOfCategory = ['pastaRisotto', 'pasta bakes', 'salad', 'curry', 'vegetarian', 'vegan', 'soup',
// 'antipasti', 'roast', 'bbq', 'stew', 'pizza', 'saucesCondiments', 'meatballs', 'sandwichesWraps']

const myCategory = (track) => {
  let category
  switch (track) {
    case 0:
      category = "pastaRisotto"
      break;
    case 1:
      category = "pastaBakes"
      break;
    case 2:
      category = "salad"
      break;
    case 3:
      category = "curry"
      break;
    case 4:
      category = "vegetarian"
      break;
    case 5:
      category = "vegan"
      break;
    case 6:
      category = "soup"
      break;
    case 7:
      category = "antipasti"
      break;
    case 8:
      category = "roast"
      break;
    case 9:
      category = "bbq"
      break;
    case 10:
      category = "stew"
      break;
    case 11:
      category = "pizza"
      break;
    case 12:
      category = "saucesCondiments"
      break;
    case 13:
      category = "meatballs"
      break;
    case 14: 
      category ="sandwichesWraps"
      break;
  }
  return category
}

let recipeData = [];
//Function to scrap the content from each recipe url
const scrapContentFromUrls = async (urls, trackOfMyCategory) => {

  console.log('First Stage, total time 30min scrapping or more...')
  

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  for (let i = 0; i < urls.length; i++) {
    let recipe = {};
    await page.goto(urls[i]);
    await page.waitForTimeout(1000);
    recipe.scrapIdName = "allrecipes"
    recipe.category = myCategory(trackOfMyCategory)
    recipe.mainIngredient = null
    try {
      recipe.title = await page.evaluate(() =>
        document.querySelector(".headline").innerText.trim()
      );
    } catch (error) { }

    try {
      recipe.servingAmount = await page.evaluate(
        () =>
          document.querySelector(
            ".recipe-adjust-servings.elementFont__body.recipe-manually-adjust-servings"
          ).dataset.initServingsSize
      );
    } catch (error) { }

    try {
      recipe.cookingTime = await page.evaluate(() =>
        document
          .querySelector(".recipe-meta-item-body.elementFont__subtitle")
          .innerText.trim()
      );
    } catch (error) { }

    try {
      recipe.ingredients = await page.evaluate(() => {
        let allIngredients = Array.from(
          document.querySelector(".ingredients-section").children
        );
        return allIngredients.map((ingredient) => ingredient.innerText);
      });
    } catch (error) { }

    try {
      recipe.instructions = await page.evaluate(() =>
        document.querySelector(".instructions-section").innerText.split("\n")
      );
    } catch (error) { }

    try {
      recipe.image = await page.evaluate(
        () => document.querySelector(".icon.icon-image-zoom").dataset.image
      );
    } catch (error) { }

    try {
      recipe.nutrition = await page.evaluate(() =>
        document
          .querySelector(
            "section.nutrition-section.container > div > div > div.section-body"
          )
          .innerText.trim()
      );
    } catch (error) { }

    recipeData.push(recipe);
    // console.clear()
    console.log('recipe:' + recipe.title)

  }
  console.log(recipeData);
  fs.writeFileSync("recipeDataScraped.json", JSON.stringify(recipeData))

  await browser.close();
};

const loopThroughCat = async () => {
  const arrayOfCategory = ['pastaRisotto', 'pasta & bakes', 'salad', 'curry', 'vegetarian', 'vegan', 'soup',
    'antipasti', 'roast', 'bbq', 'stew', 'pizza', 'saucesCondiments', 'meatballs', 'sandwichesWraps']
  if (trackOfMyCategory < arrayOfCategory.length) {
    let mySelectedCat = arrayOfCategory[trackOfMyCategory].split(/(?=[A-Z])/)
    console.log(mySelectedCat)
    if (mySelectedCat.length > 1) {
      baseurls[0] = `https://www.allrecipes.com/search/results/?search=${mySelectedCat[0]}`
      await scrapeURLsFromOnePage(baseurls[0])
      console.log(baseurls)
      baseurls[0] = `https://www.allrecipes.com/search/results/?search=${mySelectedCat[1]}`
      await scrapeURLsFromOnePage(baseurls[0])
      console.log(baseurls)
      trackOfMyCategory++
    } else {
      baseurls[0] = `https://www.allrecipes.com/search/results/?search=${arrayOfCategory[trackOfMyCategory]}`
      await scrapeURLsFromOnePage(baseurls[0])
      trackOfMyCategory++
    }
  }
  await loopThroughCat()
}

//Calling the function to scrape 400 recipes (array has 472 items, but if it exceeds a certain amount of time, it crashes)
loopThroughCat()
// scrapContentFromUrls(recipes.slice(0, 400));



module.exports = scrapContentFromUrls;
