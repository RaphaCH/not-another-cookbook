const fs = require('fs');

let catArr = ["0 Dairy", "1 Fats & oils", "2 Fruits & Vegetables", "3 Pasta", "4 Rice & Pulses", "5 Grain products & Nuts",
    "6 Herbs & Spices", "7 Meat & Seafood", "8 Drinks", "9 Alcohol", "10 Sauces", "11 No Category Found ]"]

let rawdata = fs.readFileSync('recipeIngr.json');
newData = []
let myJsonData = JSON.parse(rawdata);
let myData = []


const feedArr = (ingr) => {
    myData.push(ingr)
}

myJsonData.forEach(element => {
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
        for (let i = 0; i < myData.length; i++) {
            // Wait for a question to be answered. 
            console.log('')
            console.log('')
            console.log(myData[i] + " ? ")

            await new Promise((resolve) => {
                rl.question('ingredient --> ', (ingred) => {

                    newData.push({ name: myData[i], ingred: ingred })
                    console.log(newData[i])
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
                                newData[i].category = category
                                break;
                            case "1":
                                category = 'Fats & oils'
                                newData[i].category = category
                                break;
                            case "2":
                                category = 'Fruits & Vegetables'
                                newData[i].category = category
                                break;
                            case "3":
                                category = 'Pasta'
                                newData[i].category = category
                                break;
                            case "4":
                                category = 'Rice & Pulses'
                                newData[i].category = category
                                break;
                            case "5":
                                category = 'Grain products & Nuts'
                                newData[i].category = category
                                break;
                            case "6":
                                category = 'Herbs & Spices'
                                newData[i].category = category
                                break;
                            case "7":
                                category = 'Meat & Seafood'
                                newData[i].category = category
                                break;
                            case "8":
                                category = 'Drinks'
                                newData[i].category = category
                                break;
                            case "9":
                                category = 'Alcohol'
                                newData[i].category = category
                                break;
                            case "10":
                                category = 'Sauces'
                                newData[i].category = category
                                break;
                            case "11":
                                category = 'No Category Found'
                                newData[i].category = category
                                break;
                            default:
                                category = 'No Category Found'
                                newData[i].category = category
                        }


                    }
                    resolve()


                    console.log(newData[i])

                })
            })
            await new Promise((resolve) => {
                rl.question('info ok? y/n: ', (question) => {
                    if (question === "n") {
                        newData.pop()
                        i--
                    } else {
                        fs.appendFile("ingredientCorr_1.json", JSON.stringify(newData[i]) + ",", function (err) {
                            if (err) throw err;
                        });
                    }
                    resolve()
                })
            })
        }
    });
}

ingredient()
