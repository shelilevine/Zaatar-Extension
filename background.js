console.log("background running")
let updatedStore

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDqO_r6F_95LvL3taTGeOA0P8uCJRwNz0s",
    authDomain: "zaatar-4d040.firebaseapp.com",
    databaseURL: "https://zaatar-4d040.firebaseio.com",
    projectId: "zaatar-4d040",
    storageBucket: "zaatar-4d040.appspot.com",
    messagingSenderId: "1022904200186",
    appId: "1:1022904200186:web:d808271651c70cfd23d243"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore()

  // console.log(firebase)




//initialize chrome storage object
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({zaatar: {}});

  console.log(chrome.storage.sync)
  chrome.storage.sync.get(['zaatar'], function(result) {
    updatedStore = result
  })
});



// Listen for messages
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // if( request.message === "open_new_tab" ) {
    //   chrome.tabs.create({"url": request.url});
    // }
    chrome.storage.sync.get(['zaatar'], async function(result) {
      updatedStore = await result
      // console.log("get on general message", updatedStore)
    })
    if (request.message === "added recipe") {
      // console.log("got added recipe message in background.js", request)
      // console.log("updatedStore in message receipt", updatedStore)
      const domain = request.domain
      const recipe = request.recipe

      updatedStore.zaatar[domain] = updatedStore.zaatar[domain] || []

      let domainRecipes = updatedStore.zaatar[domain].filter(domainRecipe => domainRecipe.title !== recipe.title)

      updatedStore.zaatar[domain] = [...domainRecipes, recipe]

      chrome.storage.sync.set(updatedStore, function() {
        // console.log("chrome storage synced", updatedStore)
      })
      chrome.storage.sync.get(['zaatar'], async function(result) {
        updatedStore = await result
        // console.log("after getting again", result)
      })
      db.collection("recipes").doc(recipe.title).set(recipe)
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
  }
  else if (request.message === "remove from db") {
    const recipe = request.recipe
    console.log("recipe in delete", recipe)
    db.collection("recipes").doc(recipe.title).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }
});


