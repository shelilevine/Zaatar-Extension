// const thumbnail = document.getElementsByClassName("wp-post-image")
// console.log(thumbnail[0].src)
console.log('content.js running')

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // if( request.message === "clicked_browser_action" ) {

    //   const thumbnail = document.getElementsByClassName("wp-post-image")[0].src
    //   console.log(thumbnail)


    //   chrome.runtime.sendMessage({"message": "got image", "url": thumbnail});
    // }
    if (request.message === "add recipe") {
      console.log("got message in content.js", request)
      const recipe = getContent(request.domain)
      console.log('content returned', recipe)
      // chrome.runtime.sendMessage({"message": "added recipe", recipe});
      // chrome.storage.sync.get(['zaatar'], function(result) {
      //   console.log(result)
      // })
    }
  }
)


//add listener for add button and add recipe to local storage

const getContent = domain => {
  console.log('in getContent')
  if (domain === 'epicurious') {
    return getEpicurious()
  }
}


const getEpicurious = () => {
  console.log('in getEpicurious')
  const title = document.getElementsByTagName('h1')[0].innerText
  const imgUrl = document.getElementsByClassName('photo loaded')[0].src
  // const recipeContent = document.getElementsByClassName('recipe-content')[0]
  const yield = document.getElementsByClassName('recipe-summary')[0]
  const ingredients = []
  const ingredientList = Array.from(document.getElementsByClassName('ingredient'))
  ingredientList.forEach(ingredient => ingredients.push(ingredient.innerText))
  const recipe = []
  const recipeSteps = Array.from(document.getElementsByClassName('preparation-step'))
  recipeSteps.forEach(step => recipe.push(step.innerText))

  return {title, imgUrl, yield, ingredients, recipe}
}
