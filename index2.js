const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
    });
    const page = await browser.newPage();
    let linksPerPages = []
    
    for (let r=0; r<2; r++){
        let cardSelector = 22;
        let myPage = ['hall-of-fame','most-recent-recipes']
        for (let i = 9; i < 16; i++) {
            await page.goto(
                `https://www.hellofresh.com/recipes/${myPage[r]}?page=${i}`
            );
            let pageLinks = []
            for (let k = cardSelector; k < (cardSelector + 8); k++) {
                if(r===1){
                    const myParent = await page.$$(`.web-1nlafhw:nth-child(${k})`)
                    const link = await myParent[0].$eval('a', element => element.href)
                    pageLinks.push(link)
                }else{
                    const myParent = await page.$$(`div:nth-child(${k})`)
                    const link = await myParent[0].$eval('a', element => element.href)
                    pageLinks.push(link)
                }
               
            }
            linksPerPages.push(pageLinks)
            // console.log(link)
            cardSelector += 8
        }
    }
    console.log(linksPerPages)

        let arraySelector = [['body', 'h1'], ['.dsjd', '.dsje'], [".fela-_1slhjvb", ".fela-_19qpnoj"], [".fela-_g6xips>div>", "p"], [".fela-_12sjl9r>div>", "p"], [".fela-_14dtxzo", "img"], ["div.fela-_1mq2bj0", "div.fela-_1qmjd6x >div"]]
        let arrayStoredRecipes = []

        const myScrap = async (parentSelct, childSelct, type) => {
            try {
                const parent = await page.$$(`${parentSelct}`)
                // console.log(parentSelct.length)
                if (type != 'img') {
                    const child = await parent[0].$eval(`${childSelct}`, element => element.innerText)
                    return child
                }
                else {
                    const child = await parent[0].$eval(`${childSelct}`, element => element.src)
                    return child
                }
            } catch (error) {
                console.log('*****error')
            }
          
        }

        const myScrapLoop = async (parentSelct, childSelct, nbrLoop, type) => {
            let myChildren = []
            try {
                for (let i = 1; i < nbrLoop; i++) {
                    const parent = await page.$$(`${parentSelct}:nth-child(${i})`)
                    //don't forget nth
                    const child = await parent[0].$eval(`${childSelct}`, element => element.innerText)
                    myChildren.push(child)
                    if(type === 'ingr'){
                        const child = await parent[0].$eval(`${childSelct}`, element => element.nextElementSibling.innerText)
                        myChildren.push(child)
                    }
                }
            } catch {
                console.log('****EndLoop')
                return myChildren
            }
        }
        let recipeAdded = 0
        for (let i = 0; i < linksPerPages.length; i++) {
            for (let k = 0; k < linksPerPages[0].length; k++) {
                await page.goto(`${linksPerPages[0][k]}`)
                    let myRecipeObj = {}
                    myRecipeObj.title = await myScrap(arraySelector[0][0], arraySelector[0][1])
                    myRecipeObj.servingAmount = await myScrap(arraySelector[1][0], arraySelector[1][1])
                    myRecipeObj.cookingTime = await myScrap(arraySelector[2][0], arraySelector[2][1])
                    myRecipeObj.ingredients = await myScrapLoop(arraySelector[3][0], arraySelector[3][1],30, "ingr")
                    myRecipeObj.instructions = await myScrapLoop(arraySelector[4][0], arraySelector[4][1],30)
                    myRecipeObj.image = await myScrap(arraySelector[5][0], arraySelector[5][1],"img")
                    myRecipeObj.nutrition = await myScrap(arraySelector[6][0], arraySelector[6][1])    
                    arrayStoredRecipes.push(myRecipeObj)
                    recipeAdded+= 1;
                    console.clear()
                    console.log("recipeAdded: "+recipeAdded)


            }
        }
            console.log(arrayStoredRecipes[3].myRecipeObj + "  "+ arrayStoredRecipes[4].myRecipeObj) 
            await browser.close();




        /*
            myObject ={title: myRecipeArr[0],servingAmount:myRecipeArr[1],cookingTime:myRecipeArr[2],ingredients:{quantity:myRecipeArr[3],ingredientName:myRecipeArr[4], instructions:[myRecipeArr[5]], image:[myRecipeArr[6]], nutrition: [myRecipeArr[7]] } } 
        
            every key of one object pointing to two functions
            1 normal
            2 loop try catch
    
            fct myLoop(ParentSelector, ChildSelector)
            let loopArray = []
            Try
            Loop 30 Times
            Catch{
            Return array
            }
            
            Fct scrapMySelector
            (ParentSelector, ChildSelector, type)
            Return text, link..
    
    
        */



    })()
