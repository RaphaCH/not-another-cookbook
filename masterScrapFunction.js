const fs = require("fs");


const scrapUrls = require('./scrapping/raphaScrap');
const georgianaScrap = require('./scrapping/georgianaScrap')
const recipes = JSON.parse(fs.readFileSync("recipeData.json", "utf-8"));
const laurentScrap = require('./scrapping/laurentScrap')

const scrapAll = async() =>{
    await georgianaScrap(recipes.slice(0, 400));
    await scrapUrls();
    await laurentScrap();
 }
 
 scrapAll()

