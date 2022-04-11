//const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

//let ingredient = '2 cups cooked pulled pork';
//let ingredient = '1,5 pounds bone-in, skin-on chicken thighs';
// let ingredient = '0.25 cup Louisiana-style hot sauce';

// let chicken = ''

// let ingredient = "aspargus"

const getIngredientInfo = async (ingredient) => {
  // console.log(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEYS}&nutrition-type=cooking&ingr=100g ${ingredient}`);
  const { data } = await axios.get(`https://api.edamam.com/api/nutrition-data?app_id=${"f81a5805"}&app_key=${"6dfc4b2ee3cf328a2f2048d480a80085"}&nutrition-type=cooking&ingr=100g ${ingredient}`);

  // console.log(data);
  if (data) {
     //console.log('hey' + data.calories, data.totalNutrients.FAT.quantity, data.totalNutrients.CHOCDF.quantity, data.totalNutrients.PROCNT.quantity);
    return [data.calories, data.totalNutrients.FAT.quantity, data.totalNutrients.CHOCDF.quantity, data.totalNutrients.PROCNT.quantity];
  }


}

// getIngredientInfo(ingredient)

module.exports = getIngredientInfo;







