console.log("background running")

let updatedStore

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({zaatar: {}}, function() {
    console.log("The color is green.");
  });

  console.log(chrome.storage.sync)
  chrome.storage.sync.get(['zaatar'], function(result) {
    updatedStore = result
    console.log("on install", result)
  })
  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostEquals: 'epicurious.com'},
  //     })
  //     ],
  //         actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });
});


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab (received by content.js)
  console.log(tab)
  // console.log(chrome.storage.sync.get(['zaatar']))
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   console.log(tabs)
  //   var activeTab = tabs[0];
  chrome.pageAction.show(tab.id)
  let activeTab = tab
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
// });





// Listen for messages from content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // if( request.message === "open_new_tab" ) {
    //   chrome.tabs.create({"url": request.url});
    // }
    chrome.storage.sync.get(['zaatar'], async function(result) {
      updatedStore = await result
      console.log("get on general message", updatedStore)
    })
    if (request.message === "added recipe") {
      console.log("got added recipe message in background.js", request)
      console.log("updatedStore in message receipt", updatedStore)

      const domain = request.domain
      const recipe = request.recipe

      updatedStore.zaatar[domain] = updatedStore.zaatar[domain] || []

      let domainRecipes = updatedStore.zaatar[domain].filter(domainRecipe => domainRecipe.title !== recipe.title)

      updatedStore.zaatar[domain] = [...domainRecipes, recipe]

      console.log("updatedStore before set", updatedStore)

      chrome.storage.sync.set(updatedStore, function() {
        console.log("chrome storage synced", updatedStore)
      })
      chrome.storage.sync.get(['zaatar'], async function(result) {
        updatedStore = await result
        console.log("after getting again", result)
      })
  }
  });


