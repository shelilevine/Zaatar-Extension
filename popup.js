import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
// import store from './store'
import App from './app'
import {SnackbarProvider} from 'notistack'

// establishes socket connection
// import './socket'

ReactDOM.render(
  // <Provider >
  //     <SnackbarProvider maxSnack={1}>
        <App />,
      /* </SnackbarProvider>
  </Provider>, */
  document.getElementById('app')
)


// const addButton = document.getElementById('add')

// const removeButton = document.getElementById('remove')

// const snackbar = document.getElementById("snackbar")


// const add = () => {
//   //send message to content.js to grab data
// }

// const remove = () => {
//   console.log('remove')
// }


// addButton.addEventListener("click", add)

// removeButton.addEventListener("click", remove)




//listen for data from content.js
  //if receive an add recipe
    //add recipe to local storage
  //elise if receive a remove recipe
    //remove recipe from local storage
