// Dairy, Fats & oils, Fruits & Vegetables, Pasta, Rice & Pulses, Grain products & Nuts, Herbs & Spices, Meat & Seafood, Drinks, Alcohol, Sauces, No Category Found.



const shoppingIngredients = []

const noCategoryFound = []
const AlcoholArr = []
const DairyArr = []
const FruitsVegetablesArr = []
const GrainNutsArr = []
const DrinksArr = []
const PastaRicePulsesArr = []
const FatsOilsArr = []
const HerbsSpicesArr = []
const MeatSeafoodArr = []
const SaucesArr = []

const keyWords = ['alcohol','alcoholic','liquor','distilled','dairy','milk','cream','bread','bake','baked','sugar','flour','grain','cereal','cereals','dough','sugar','nuts','nut','water','drink','carbonated','juice','beverage','fruit','fruits','vegetable','vegetables','plant','plants','oil','pasta','rice','seed','pulse',    'meat','steak','beef','pork','chicken','turkey','poultry','egg','eggs','venison','fish','seafod','shell','shells','shellfish','crustacean','claw','herb','herbs','spice','spices','powder']

const Alcohol = [
    'alcohol',
    'alcoholic',
    'liquor',
    'distilled'
]

const Dairy = [
    'dairy',
    'milk',
    'cream'
]

const GrainNuts = [
    'bread',
    'bake',
    'baked',
    'sugar',
    'cake',
    'batter',
    'flour',
    'grain',
    'cereal',
    'cereals',
    'dough',
    'sugar',
    'nuts',
    'nut',
]

const Drinks = [
    'water',
    'drink',
    'carbonated',
    'juice',
    'beverage',
]

const FruitsVegetables = [
    'fruit',
    'fruits',
    'vegetable',
    'vegetables',
    'plant',
    'plants',
]

const FatsOils = [
    'oil'
]


const PastaRicePulses = [
    'pasta',
    'rice',
    'seed',
    'pulse'
]

const MeatSeafood = [
    'meat',
    'steak',
    'beef',
    'pork',
    'chicken',
    'turkey',
    'poultry',
    'egg',
    'eggs',
    'venison',
    'fish',
    'seafod',
    'shell',
    'shells',
    'shellfish',
    'crustacean',
    'claw',
]

const HerbsSpices = [
    'herb',
    'herbs',
    'spice',
    'spices',   
    'powder'
]


const Sauces = [
    'condiment'
]

const LoopIngredientArray = async (iArr) => {
    console.log("look here", iArr)
    // shoppingIngredients.forEach( async (ingredient) => {
    // await FetchDefinition(ingredient.name, ingredient.quantity, ingredient.unit)  
    // return {noCategoryFound: noCategoryFound, AlcoholArr: AlcoholArr, DairyArr: DairyArr, FruitsVegetablesArr: FruitsVegetablesArr, GrainNutsArr: GrainNutsArr, DrinksArr: DrinksArr, PastaRicePulsesArr: PastaRicePulsesArr, FatsOilsArr: FatsOilsArr, HerbsSpicesArr: HerbsSpicesArr, MeatSeafoodArr: MeatSeafoodArr, SaucesArr: SaucesArr}  

    // })


    for (let i = 0; i <  iArr.length; i++) {
        let ingredient = iArr[i]
        await FetchDefinition(ingredient.ingredient.name, ingredient.quantity, ingredient.unit)  
    }

    return {noCategoryFound: noCategoryFound, AlcoholArr: AlcoholArr, DairyArr: DairyArr, FruitsVegetablesArr: FruitsVegetablesArr, GrainNutsArr: GrainNutsArr, DrinksArr: DrinksArr, PastaRicePulsesArr: PastaRicePulsesArr, FatsOilsArr: FatsOilsArr, HerbsSpicesArr: HerbsSpicesArr, MeatSeafoodArr: MeatSeafoodArr, SaucesArr: SaucesArr}

    // return {FruitsVegetablesArr: {name: "gffds"}}
    // for (let i = 0; i >= ingredient.length; i++) {
        //return {noCategoryFound: noCategoryFound, AlcoholArr: AlcoholArr, DairyArr: DairyArr, FruitsVegetablesArr: FruitsVegetablesArr, GrainNutsArr: GrainNutsArr, DrinksArr: DrinksArr, PastaRicePulsesArr: PastaRicePulsesArr, FatsOilsArr: FatsOilsArr, HerbsSpicesArr: HerbsSpicesArr, MeatSeafoodArr: MeatSeafoodArr, SaucesArr: SaucesArr}
    //   }
    }



const FetchDefinition = async (name, quantity, unit) => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${name}`)
    const jsonResponse = await response.json()
    
    // fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${name}`)
    // .then(response => response.json())
	// .then(jsonResponse => {
       if(jsonResponse[0]){
            let definition1 = jsonResponse[0].meanings[0].definitions[0].definition
            let definition2 = jsonResponse[0].meanings[0].definitions[1].definition
            checkForCategory(definition1, definition2, name, quantity, unit)
       }else{
        let newArr = {name: name, quantity: quantity, unit: unit}
        noCategoryFound.push(newArr)
       }
            
  
        
	// })
}

const checkForCategory = (definition1, definition2, name, quantity, unit) => {
    let found = false
    if ((definition1.includes('sauce') || definition2.includes('sauce')) && found == false) {
        let newArr = {name: name, quantity: quantity, unit: unit}
        SaucesArr.push(newArr)
        // console.log('Sauce')
        found = true
        return
    }

    else {
        Alcohol.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                let newArr = {name: name, quantity: quantity, unit: unit}
                AlcoholArr.push(newArr)
                // console.log('Alcohol')
                // console.log(name)
                found = true
                return
            }
        })
        Dairy.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                let newArr = {name: name, quantity: quantity, unit: unit}
                DairyArr.push(newArr)
                // console.log('Dairy')
                // console.log(name)
                found = true
                return
            }
        })
        FruitsVegetables.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                let newArr = {name: name, quantity: quantity, unit: unit}
                FruitsVegetablesArr.push(newArr)
                // console.log('Fruits & Vegetables')
                // console.log(name)
                found = true
                return
            }
        })
        GrainNuts.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                let newArr = {name: name, quantity: quantity, unit: unit}
                GrainNutsArr.push(newArr)
                // console.log('Grain products & Nuts')
                // console.log(name)
                found = true
                return
            }
        })
        Drinks.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                let newArr = {name: name, quantity: quantity, unit: unit}
                DrinksArr.push(newArr)
                // console.log('Drinks')
                // console.log(name)
                found = true
                return
            }
        })

        PastaRicePulses.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                let newArr = {name: name, quantity: quantity, unit: unit}
                PastaRicePulsesArr.push(newArr)
                // console.log('Pasta, Rice & Pulses')
                // console.log(name)
                found = true
                return
            }
        })
        MeatSeafood.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                let newArr = {name: name, quantity: quantity, unit: unit}
                MeatSeafoodArr.push(newArr)
                // console.log('Meat & Seafood')
                // console.log(name)
                found = true
                return
            }
        })
        FatsOils.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                let newArr = {name: name, quantity: quantity, unit: unit}
                FatsOilsArr.push(newArr)
                // console.log('Fats & Oil')
                // console.log(name)
                found = true
                return
            }
        })
        HerbsSpices.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                let newArr = {name: name, quantity: quantity, unit: unit}
                HerbsSpicesArr.push(newArr)
                // console.log('Herbs & Spices')
                // console.log(name)
                found = true
                return
            }
        })
        Sauces.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                let newArr = {name: name, quantity: quantity, unit: unit}
                SaucesArr.push(newArr)
                // console.log('Sauce')
                // console.log(name)
                found = true
                return
            }
        })
        keyWords.forEach((item) => {
            if ((definition1.includes(item) === false && definition2.includes(item) === false ) && found === false) {
                let newArr = {name: name, quantity: quantity, unit: unit}
                noCategoryFound.push(newArr)
                // console.log(noCategoryFound)
                found = true
                return
            }
        })   
    }
}
export default LoopIngredientArray