//Global Variables

let fullRecipeDiv = document.querySelectorAll(".homepage-full-recipe-div");
let recipeImages = document.querySelectorAll(".homepage-recipe-image-flexalign");
let regex = /[+-]?\d+(\.\d+)?/g;
let nutritionFactsDiv = document.querySelector(".homepage-fullRecipenutritionfacts-details");
let nutritionFacts = document.querySelector(".homepage-fullRecipenutritionfacts-details").innerHTML;
let closeCard = document.querySelectorAll(".homepage-fullRecipecard-buttonclose");


//Toggling the modal visible

recipeImages.forEach(image =>{
  image.addEventListener('click', ()=>{
    let fullRecipe = image && image.closest(".homepage-recipe-card").nextElementSibling
    
    fullRecipe.classList.toggle("homepage-full-recipe-div-visible")  
    let toggleVisible = document.querySelector(".homepage-full-recipe-div-visible")
    toggleVisible.style.display = "block";

    let closeBtn = fullRecipe.lastChild.previousSibling.firstChild.nextSibling
    closeBtn.classList.toggle("homepage-full-recipe-div-close")
    closeBtn.addEventListener('click', ()=>{
      toggleVisible.style.display = "none";
    })
})
})

//The function below needs to be refactored as some elements/data on the page have changed and currently it does not work anymore

//Extracting only the integers and floats from the nutrition facts 

let nutritionFactsNumbers = nutritionFacts.match(regex).map(function (v) {
    return parseFloat(v);
  });
  let nutritionFactsNumbersArr = Array.from(nutritionFactsNumbers);
  
//Taking the nutrition string, splitting the integers/floats from words, multiplying the nutrition numbers obtained with the function above with the selected portion and changing the content of the nutrition facts div accordingly

const showSelected = () => {
  let separatedStrings = nutritionFacts.match(/[a-zA-Z]+|[+-]?\d+(\.\d+)?/g);
  let selectValue = document.querySelector(
    ".homepage-fullRecipeservings-select"
  ).value;
  let selectValueNumber = selectValue.match(regex).map((n) => parseInt(n));
  if (selectValueNumber == 1) {
    nutritionFactsDiv.innerText = nutritionFacts;
  }
  if (selectValueNumber == 2) {
    let multipliedByTwo = nutritionFactsNumbersArr.map((x) => {
      return Math.ceil(x * 2);
    });
    separatedStrings[0] = multipliedByTwo[0];
    separatedStrings[3] = multipliedByTwo[1];
    separatedStrings[6] = multipliedByTwo[2];
    separatedStrings[9] = multipliedByTwo[3];
    separatedStrings[12] = multipliedByTwo[4];
    separatedStrings[15] = multipliedByTwo[5];

    let twoPortionsNutrition = separatedStrings.join(" ");
    nutritionFactsDiv.innerText = twoPortionsNutrition;
  }
  if (selectValueNumber == 3) {
    let multipliedByThree = nutritionFactsNumbersArr.map((x) => {
      return Math.ceil(x * 3);
    });
    separatedStrings[0] = multipliedByThree[0];
    separatedStrings[3] = multipliedByThree[1];
    separatedStrings[6] = multipliedByThree[2];
    separatedStrings[9] = multipliedByThree[3];
    separatedStrings[12] = multipliedByThree[4];
    separatedStrings[15] = multipliedByThree[5];
    let threePortionsNutrition = separatedStrings.join(" ");
    nutritionFactsDiv.innerText = threePortionsNutrition;
  }
  if (selectValueNumber == 4) {
    let multipliedByFour = nutritionFactsNumbersArr.map((x) => {
      return Math.ceil(x * 4);
    });
    separatedStrings[0] = multipliedByFour[0];
    separatedStrings[3] = multipliedByFour[1];
    separatedStrings[6] = multipliedByFour[2];
    separatedStrings[9] = multipliedByFour[3];
    separatedStrings[12] = multipliedByFour[4];
    separatedStrings[15] = multipliedByFour[5];
    let fourPortionsNutrition = separatedStrings.join(" ");
    nutritionFactsDiv.innerText = fourPortionsNutrition;
  }
  if (selectValueNumber == 5) {
    let multipliedByFive = nutritionFactsNumbersArr.map((x) => {
      return Math.ceil(x * 5);
    });
    separatedStrings[0] = multipliedByFive[0];
    separatedStrings[3] = multipliedByFive[1];
    separatedStrings[6] = multipliedByFive[2];
    separatedStrings[9] = multipliedByFive[3];
    separatedStrings[12] = multipliedByFive[4];
    separatedStrings[15] = multipliedByFive[5];
    let fivePortionsNutrition = separatedStrings.join(" ");
    nutritionFactsDiv.innerText = fivePortionsNutrition;
  }
  if (selectValueNumber == 6) {
    let multipliedBySix = nutritionFactsNumbersArr.map((x) => {
      return Math.ceil(x * 6);
    });
    separatedStrings[0] = multipliedBySix[0];
    separatedStrings[3] = multipliedBySix[1];
    separatedStrings[6] = multipliedBySix[2];
    separatedStrings[9] = multipliedBySix[3];
    separatedStrings[12] = multipliedBySix[4];
    separatedStrings[15] = multipliedBySix[5];
    let sixPortionsNutrition = separatedStrings.join(" ");
    nutritionFactsDiv.innerText = sixPortionsNutrition;
  }
};
