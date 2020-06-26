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
    }
  }
)


//add listener for add button and add recipe to local storage
