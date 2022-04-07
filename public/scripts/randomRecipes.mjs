// const fetch = require('node-fetch');
import fetch from 'node-fetch';
const randomFood = []

const randomizeRecipes = () => {
  fetch("/recipes/random", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
     randomFood.push(data[0])
    console.log(randomFood)

     })
     .catch((err) => {
      console.log(err)
    })
  }

  randomizeRecipes()