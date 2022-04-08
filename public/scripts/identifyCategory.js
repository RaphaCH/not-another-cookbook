

// Dairy, Fats & oils, Fruits & Vegetables, Pasta, Rice & Pulses, Grain products & Nuts, Herbs & Spices, Meat & Seafood, Drinks, Alcohol, Sauces, No Category Found.

const dummyIngredients = ['lemon','sausage','sugar','yoghurt','ham','ketchup','lentils','jam','butter']

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

const LoopIngredientArray = async () => {
    // dummyIngredients.forEach((ingredient) => {
    //     let ingredientArray = ingredient.split(' ')
    //     // console.log('test ' + ingredientArray[0])
    //     FetchDefinition(ingredientArray[0])
    // })
        for (let i = 0; i < dummyIngredients.length; i++) {
            let ingredientArray = dummyIngredients[i].split(' ')
            // console.log('test ' + ingredientArray[0])
            await FetchDefinition(ingredientArray[0])
        } 

    return {noCategoryFound: noCategoryFound, AlcoholArr: AlcoholArr, DairyArr: DairyArr, FruitsVegetablesArr: FruitsVegetablesArr, GrainNutsArr: GrainNutsArr, DrinksArr: DrinksArr, PastaRicePulsesArr: PastaRicePulsesArr, FatsOilsArr: FatsOilsArr, HerbsSpicesArr: HerbsSpicesArr, MeatSeafoodArr: MeatSeafoodArr, SaucesArr: SaucesArr}
    }

const FetchDefinition = async (ingredient) => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${ingredient}`)
    const jsonResponse = await response.json()

    let definition1 = jsonResponse[0].meanings[0].definitions[0].definition
    let definition2 = jsonResponse[0].meanings[0].definitions[0].definition
    checkForCategory(definition1, definition2, ingredient)
}

const checkForCategory = (definition1, definition2, ingredient) => {
    let found = false
    if (definition1.includes('sauce') || definition2.includes('sauce')) {
        // console.log('Sauce')
        // console.log(ingredient)
    }
    else {
        Alcohol.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                AlcoholArr.push(ingredient)
                // console.log('Alcohol')
                // console.log(ingredient)
                found = true
                return
            }
        })
        Dairy.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                DairyArr.push(ingredient)
                // console.log('Dairy')
                // console.log(ingredient)
                found = true
                return
            }
        })
        FruitsVegetables.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                FruitsVegetablesArr.push(ingredient)
                // console.log('Fruits & Vegetables')
                // console.log(ingredient)
                found = true
                return
            }
        })
        GrainNuts.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                GrainNutsArr.push(ingredient)
                // console.log('Grain products & Nuts')
                // console.log(ingredient)
                found = true
                return
            }
        })
        Drinks.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                DrinksArr.push(ingredient)
                // console.log('Drinks')
                // console.log(ingredient)
                found = true
                return
            }
        })

        PastaRicePulses.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                PastaRicePulsesArr.push(ingredient)
                // console.log('Pasta, Rice & Pulses')
                // console.log(ingredient)
                found = true
                return
            }
        })
        FatsOils.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                FatsOilsArr.push(ingredient)
                // console.log('Fats & Oil')
                // console.log(ingredient)
                found = true
                return
            }
        })
        HerbsSpices.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                HerbsSpicesArr.push(ingredient)
                // console.log('Herbs & Spices')
                // console.log(ingredient)
                found = true
                return
            }
        })
        MeatSeafood.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                MeatSeafoodArr.push(ingredient)
                // console.log('Meat & Seafood')
                // console.log(ingredient)
                found = true
                return
            }
        })
        Sauces.forEach((item) => {
            if ((definition1.includes(item) || definition2.includes(item)) && found === false) {
                SaucesArr.push(ingredient)
                // console.log('Sauce')
                // console.log(ingredient)
                found = true
                return
            }
        })
        keyWords.forEach((item) => {
            if ((definition1.includes(item) === false && definition2.includes(item) === false ) && found === false) {
                noCategoryFound.push(ingredient)
                // console.log(noCategoryFound)
                found = true
                return
            }
        })
        
    }
}


export default LoopIngredientArray