//const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

//let ingredient = '2 cups cooked pulled pork';
//let ingredient = '1,5 pounds bone-in, skin-on chicken thighs';
let ingredient = '0.25 cup Louisiana-style hot sauce';
let chicken = ''

const test = async () => {
  const { data } = await axios.get(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEYS}&nutrition-type=cooking&ingr=${ingredient}`);

  console.log(data);

}

test();







