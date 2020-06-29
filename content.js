let updatedStore
chrome.storage.sync.get(['zaatar'], async function(result) {
  updatedStore = await result
})



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("GOT MESSAGE IN CONTENT.JS", request)

    chrome.storage.sync.get(['zaatar'], async function(result) {
      updatedStore = await result
      // console.log("chrome store before set", result)
    })

    if (request.message === "add recipe") {
      const recipe = getContent(request.domain)
      const domain = request.domain
      // console.log('parsed recipe', recipe)

      chrome.runtime.sendMessage({"message": "added recipe", domain, recipe})
    }
    else if (request.message === "remove recipe") {
      const recipe = getContent(request.domain)
      const domain = request.domain

      if (updatedStore.zaatar[domain]) {
        updatedStore.zaatar[domain] = updatedStore.zaatar[domain].filter(domainRecipe => domainRecipe.title !== recipe.title)

        chrome.storage.sync.set(updatedStore, function() {
          // console.log("chrome storage synced", updatedStore)
        })
        chrome.storage.sync.get(['zaatar'], async function(result) {
          updatedStore = await result
          // console.log("after getting again", result)
        })
      }
      chrome.runtime.sendMessage({"message": "remove from db", recipe})
    }
  }
)


//add listener for add button and add recipe to local storage

const getContent = domain => {
  // console.log('in getContent')
  if (domain === 'epicurious') {
    return getEpicurious()
  }
}


const getEpicurious = () => {
  const title = document.getElementsByTagName('h1')[0].innerText
  const imgUrl = document.getElementsByClassName('photo loaded')[0].src
  const yield = document.getElementsByClassName('yield')[1].innerText
  const ingredients = []
  const ingredientList = Array.from(document.getElementsByClassName('ingredient'))
  ingredientList.forEach(ingredient => ingredients.push(ingredient.innerText))
  const recipe = []
  const recipeSteps = Array.from(document.getElementsByClassName('preparation-step'))
  recipeSteps.forEach(step => recipe.push(step.innerText))

  return {title, imgUrl, yield, ingredients, recipe}
}
