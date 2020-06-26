console.log("background running")

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab (received by content.js)
  console.log(tab)
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   console.log(tabs)
  //   var activeTab = tabs[0];
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
