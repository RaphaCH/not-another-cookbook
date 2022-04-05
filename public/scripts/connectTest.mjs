import fetch from "node-fetch";
// import { myUpdatedRecipes } from "../../models/5recipes.mjs";

// import * as data from "../../models/5recipes.json"
import * as data from "../../models/5recipesCorr.json";
// const data = require("../../models/5recipesCorr.json")

console.log(data[0])


// const fetchMyDataToDb = (data) => {
//     console.log(data)
//     fetch('/newRecipeTest', {
//         method: 'POST', // or 'PUT'
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success Task Added:', data);
//             getLastFromDB()
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//   }
  
//   fetchMyDataToDb({data:myUpdatedRecipes})