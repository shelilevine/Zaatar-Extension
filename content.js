const thumbnail = document.getElementsByClassName("wp-post-image")
console.log(thumbnail[0].src)

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {

      const thumbnail = document.getElementsByClassName("wp-post-image")[0].src
      console.log(thumbnail)


      chrome.runtime.sendMessage({"message": "got image", "url": thumbnail});
    }
  }
)
