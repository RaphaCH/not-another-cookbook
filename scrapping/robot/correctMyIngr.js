const fs = require('fs');

let catArr = ["0 Dairy", "1 Fats & oils", "2 Fruits & Vegetables", "3 Pasta", "4 Rice & Pulses", "5 Grain products & Nuts",
    "6 Herbs & Spices", "7 Meat & Seafood", "8 Drinks", "9 Alcohol", "10 Sauces", "11 No Category Found ]"]

let rawdata = fs.readFileSync('recipeIngr.json');
newData = []
let recipes = JSON.parse(rawdata);
let myRecipe = []
let myData = []


const feedArr = (ingr) => {
    myData.push(ingr)
}

recipes.forEach(element => {
    myRecipe.push(element)
    element.ingredients.forEach(ingr => {
        feedArr(ingr.name)

    })
})

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ingredient = async () => {
    rl.question('Ready to sort? ', async () => {
        //recipes
        for (let p = 0; p < recipes.length; p++) {
            //recipe
            for (let k = 0; k < recipes[p].ingredients.length; k++) {
                let myIngredient = recipes[p].ingredients[k]

                console.log('')
                console.log('')
                console.log(myIngredient.name + " ? ")

                await new Promise((resolve) => {
                    rl.question('ingredient --> ', (ingred) => {
                        myIngredient.name = ingred
                        // return console.log(recipes[0])
                        resolve()

                    })
                })
                await new Promise((resolve) => {
                    console.log("categories---[ " + catArr)
                    rl.question('category --> ', (category) => {
                        if (!isNaN(category) && category < 12 && category >= 0) {
                            switch (category) {
                                case "0":
                                    category = 'Dairy'
                                    myIngredient.category = category
                                    break;
                                case "1":
                                    category = 'Fats & oils'
                                    myIngredient.category = category
                                    break;
                                case "2":
                                    category = 'Fruits & Vegetables'
                                    myIngredient.category = category
                                    break;
                                case "3":
                                    category = 'Pasta'
                                    myIngredient.category = category
                                    break;
                                case "4":
                                    category = 'Rice & Pulses'
                                    myIngredient.category = category
                                    break;
                                case "5":
                                    category = 'Grain products & Nuts'
                                    myIngredient.category = category
                                    break;
                                case "6":
                                    category = 'Herbs & Spices'
                                    myIngredient.category = category
                                    break;
                                case "7":
                                    category = 'Meat & Seafood'
                                    myIngredient.category = category
                                    break;
                                case "8":
                                    category = 'Drinks'
                                    myIngredient.category = category
                                    break;
                                case "9":
                                    category = 'Alcohol'
                                    myIngredient.category = category
                                    break;
                                case "10":
                                    category = 'Sauces'
                                    myIngredient.category = category
                                    break;
                                case "11":
                                    category = 'No Category Found'
                                    myIngredient.category = category
                                    break;
                                default:
                                    category = 'No Category Found'
                                    myIngredient.category = category
                            }


                        }
                        resolve()

                        console.log(myIngredient)

                    })
                })
                await new Promise((resolve) => {
                    rl.question('info ok? y/n: ', (question) => {
                        if (question === "n") {
                            k--
                        } else {
                            console.log()

                            // fs.writeFileSync("correctedList", )

                            resolve()
                        }
                    })
                })
            }
            fs.appendFile("ingredientCorr_1.json", JSON.stringify(recipes[p]) + ",", function (err) {
                if (err) throw err;
            });
        }
    }) 
}
ingredient()

