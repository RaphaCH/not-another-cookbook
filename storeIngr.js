  let myarrIngr = ["9 ounce", "Butternut Squash Agnolotti", "5 ounce", "Spinach", "1 unit", "Granny Smith Apple",
     "¼ ounce", "Sage", "1 ounce", "Sour Cream", "2 clove", "Garlic", "1 unit", "Veggie Stock Concentrate"]

    //conversion ounce cup 
    const convertUnits = (arr) => {
       let includeOunce = arr[0].indexOf('ounce')
       console.log(includeOunce)

    }

    const storeIngredients = async (arrIngr) => {
        let conditions = ["¼", "½", "¾", "⅛"]

        for (let i = 0; i < arrIngr.length; i++) {
    
            if (i === 0 || (i % 2) === 0) {
                let myconditions = conditions.some(el => arrIngr[i].includes(el))
                // console.log("cond " + myconditions)
                let arrSplit
                if (myconditions) {
                    // console.log(i)
                    arrSplit = arrIngr[i].split(" ")
                    arrIngr.splice(i, 1, arrSplit)
                } else {
                    arrSplit = arrIngr[i].split(/(\d+)/)
                }
                // console.log(arrSplit)
                if (arrSplit[0] === "") {
                    arrSplit.splice(0, 1)
                    arrIngr.splice(i, 1, arrSplit)
                    // console.log(arrSplit)
                }
            } else {

            }
        }
        // console.log(arrIngr)
        convertUnits(arrIngr)
        return arrIngr
    }

    console.log(storeIngredients(myarrIngr))