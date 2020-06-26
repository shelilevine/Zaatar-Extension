console.log("background running")

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({zaatar: {}}, function() {
    console.log("The color is green.");
  });

  console.log(chrome.storage.sync)
  chrome.storage.sync.get(['zaatar'], function(result) {
    console.log(result)
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
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url});
    }
  }
);


