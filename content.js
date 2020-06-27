// const thumbnail = document.getElementsByClassName("wp-post-image")
// console.log(thumbnail[0].src)
console.log('content.js running')

let updatedStore
chrome.storage.sync.get(['zaatar'], async function(result) {
  updatedStore = await result
  console.log("chrome store before set", result)
})

console.log("updated store initialization", updatedStore)



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("GOT MESSAGE IN CONTENT.JS", request)

    chrome.storage.sync.get(['zaatar'], async function(result) {
      updatedStore = await result
      console.log("chrome store before set", result)
    })

    if (request.message === "add recipe") {
      console.log("got message in content.js", request)
      const recipe = getContent(request.domain)
      const domain = request.domain
      console.log('parsed recipe', recipe)

      chrome.runtime.sendMessage({"message": "added recipe", domain, recipe})

      // updatedStore.zaatar[domain] = updatedStore.zaatar[domain] || []

      // let domainRecipes = updatedStore.zaatar[domain].filter(domainRecipe => domainRecipe.title !== recipe.title)

      // updatedStore.zaatar[domain] = [...domainRecipes, recipe]

      // console.log("updatedStore in set", updatedStore)

      // chrome.storage.sync.set(updatedStore, function() {
      //   console.log("chrome storage synced", updatedStore)
      // })
      // chrome.storage.sync.get(['zaatar'], async function(result) {
      //   updatedStore = await result
      //   console.log("after getting again", result)
      // })

      // chrome.runtime.sendMessage({"message": "added recipe", domain: request.domain, recipe});

    }
    else if (request.message === "remove recipe") {
      const recipe = getContent(request.domain)
      const domain = request.domain

      if (updatedStore.zaatar[domain]) {
        updatedStore.zaatar[domain] = updatedStore.zaatar[domain].filter(domainRecipe => domainRecipe.title !== recipe.title)

        chrome.storage.sync.set(updatedStore, function() {
          console.log("chrome storage synced", updatedStore)
        })
        chrome.storage.sync.get(['zaatar'], async function(result) {
          updatedStore = await result
          console.log("after getting again", result)
        })
      }

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
