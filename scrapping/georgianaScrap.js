const puppeteer = require("puppeteer");
const fs = require("fs");
const recipes = JSON.parse(fs.readFileSync("recipeData.json", "utf-8"));

//The category urls from which all the recipe urls are scraped

const baseurls = [
  "https://www.allrecipes.com/recipes/76/appetizers-and-snacks/",
  "https://www.allrecipes.com/recipes/156/bread/",
  "https://www.allrecipes.com/recipes/78/breakfast-and-brunch/",
  "https://www.allrecipes.com/recipes/79/desserts/",
  "https://www.allrecipes.com/recipes/17562/dinner/",
  "https://www.allrecipes.com/recipes/77/drinks/",
  "https://www.allrecipes.com/recipes/1642/everyday-cooking/",
  "https://www.allrecipes.com/recipes/17561/lunch/",
  "https://www.allrecipes.com/recipes/80/main-dish/",
  "https://www.allrecipes.com/recipes/92/meat-and-poultry/",
  "https://www.allrecipes.com/recipes/95/pasta-and-noodles/",
  "https://www.allrecipes.com/recipes/96/salad/",
  "https://www.allrecipes.com/recipes/93/seafood/",
  "https://www.allrecipes.com/recipes/94/soups-stews-and-chili/",
  "https://www.allrecipes.com/recipes/86/world-cuisine/",
];
let finalURLs2 = [];


//This was the function to scrape all the urls from the baseurl and then save it in a JSON file
const scrapeURLsFromOnePage = async (url) => {
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

  await browser.close();
};


// const loopThroughArray = async () => {
//   for (const link of baseurls){
//   await scrapeURLsFromOnePage(link)
// }
// fs.writeFileSync("recipeData.json", JSON.stringify(finalURLs2))  -> Saving the urls in the JSON so I don't scrape them each time
// }

const scrapContentFromUrls = async (urls) => {
  //Creating empty array to push all the data that we are going to scrape
  let recipeData = [];

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  for (let i = 0; i < urls.length; i++) {
    recipe = {};
    await page.goto(urls[i]);
    await page.waitForTimeout(1000);

    try {
      recipe.title = await page.evaluate(() =>
        document.querySelector(".headline").innerText.trim()
      );
    } catch (error) {}

    try {
      recipe.servingAmount = await page.evaluate(
        () =>
          document.querySelector(
            ".recipe-adjust-servings.elementFont__body.recipe-manually-adjust-servings"
          ).dataset.initServingsSize
      );
    } catch (error) {}

    try {
      recipe.cookingTime = await page.evaluate(() =>
        document
          .querySelector(".recipe-meta-item-body.elementFont__subtitle")
          .innerText.trim()
      );
    } catch (error) {}

    try {
      recipe.ingredients = await page.evaluate(() => {
        let allIngredients = Array.from(
          document.querySelector(".ingredients-section").children
        );
        return allIngredients.map((ingredient) => ingredient.innerText);
      });
    } catch (error) {}

    try {
      recipe.instructions = await page.evaluate(() =>
        document.querySelector(".instructions-section").innerText.split("\n")
      );
    } catch (error) {}

    try {
      recipe.image = await page.evaluate(
        () => document.querySelector(".icon.icon-image-zoom").dataset.image
      );
    } catch (error) {}

    try {
      recipe.nutrition = await page.evaluate(() =>
        document
          .querySelector(
            "section.nutrition-section.container > div > div > div.section-body"
          )
          .innerText.trim()
      );
    } catch (error) {}

    recipeData.push(recipe);
  }
  console.log(recipeData);
  await browser.close();
};

//Calling the function to scrape 100 recipes, the limit needs to be tested (the array has almost 300 but it crashed with all of them)
scrapContentFromUrls(recipes.slice(0, 100));

module.exports = scrapContentFromUrls;