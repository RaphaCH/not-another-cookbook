const recipeTitle = document.querySelector('.homepage-recipe-title');

let myInterval


 function thisInterval(){

    console.log("hello")
    myInterval = setInterval(myLoop, 25)
    setTimeout(loopBack, 3000)
}

function myLoop() {
    recipeTitle.scrollLeft += 1
    console.log('myloop')
}

function loopBack() {
    clearInterval(myInterval)
    recipeTitle.scrollLeft = 0
}






// recipeTitle.ontouchmove = thisInterval()

recipeTitle.addEventListener('touchstart', thisInterval)