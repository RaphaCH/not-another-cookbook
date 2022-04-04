const fs = require("fs");


const scrapUrls = require('./scrapping/raphaScrap');
const baseUrl = 'https://www.bbcgoodfood.com/recipes/collection/easy-recipes'
// const georgianaScrap = require('./scrapping/georgianaScrap')
const recipes = JSON.parse(fs.readFileSync("recipeData.json", "utf-8"));
const laurentScrap = require('./scrapping/laurentScrap')

const scrapAll = async() =>{
    // await georgianaScrap(recipes.slice(0, 400));
    await laurentScrap();
    await scrapUrls(baseUrl);
 }
 
 scrapAll()

/*
category search loop

need to be added to the object: 
scrapIdName: 
category:
mainIngredient: null (for the moment, possible with python, see:
https://github.com/p-mckenzie/example-projects/blob/master/Allrecipes%20text%20analysis/Analysis.ipynb)
ingredients: -> separate quantity with https://www.npmjs.com/package/parse-ingredient

*/

