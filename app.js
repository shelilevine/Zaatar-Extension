import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import {getDomain} from './utility'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.addRecipe = this.addRecipe.bind(this)
    this.removeRecipe = this.removeRecipe.bind(this)
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if( request.message === "added recipe" ) {
          console.log("got added recipe message in popup")
        }
        if (request.message === 'removed recipe') {

        }
      }
    )
  }

  addRecipe () {
    //tell content to grab recipe and save to local storage
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let activeTab = tabs[0]
      let domain = getDomain(activeTab)
      chrome.tabs.sendMessage(activeTab.id, {message: "add recipe", domain});
    });
  }

  removeRecipe () {
    console.log("in removeRecipe in popup")

    //tell content to remove recipe from local storage
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let activeTab = tabs[0]
      let domain = getDomain(activeTab)
      chrome.tabs.sendMessage(activeTab.id, {message: "remove recipe", domain});
    });
  }

  render () {
    return (
      <div>
        {/* <div id="header">
          <h1 id="title">Za'atar</h1>
          <img id="logo" src="salt.png"></img>
        </div>
        <div class="button-container">
          <button id="add" class="button">
            Add Recipe
          </button>
          <button id="remove" class="button">
            Remove Recipe
          </button>
        </div>
        <div id="snackbar"></div> */}
        <Card id="card">
          <Card.Content id="header">
            {/* <Image
              floated='right'
              size='mini'
              id='logo'
              src='salt.png'
            /> */}
            <Card.Header id="title">Za'atar</Card.Header>
            <Image
              floated='right'
              size='mini'
              id='logo'
              src='salt.png'
            />
            {/* <Card.Meta>Friends of Elliot</Card.Meta> */}
            {/* {/* <Card.Description> */}
              {/* Add this recipe to your box!
            </Card.Description> */}
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={this.addRecipe}>
                Add recipe
              </Button>
              <Button basic color='red' onClick={this.removeRecipe}>
                Remove recipe
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    )
  }
}


// const App = () => {
//   return (
//     <div>
//       {/* <div id="header">
//         <h1 id="title">Za'atar</h1>
//         <img id="logo" src="salt.png"></img>
//       </div>
//       <div class="button-container">
//         <button id="add" class="button">
//           Add Recipe
//         </button>
//         <button id="remove" class="button">
//           Remove Recipe
//         </button>
//       </div>
//       <div id="snackbar"></div> */}
//       <Card id="card">
//         <Card.Content id="header">
//           {/* <Image
//             floated='right'
//             size='mini'
//             id='logo'
//             src='salt.png'
//           /> */}
//           <Card.Header id="title">Za'atar</Card.Header>
//           <Image
//             floated='right'
//             size='mini'
//             id='logo'
//             src='salt.png'
//           />
//           {/* <Card.Meta>Friends of Elliot</Card.Meta> */}
//           {/* {/* <Card.Description> */}
//             {/* Add this recipe to your box!
//           </Card.Description> */}
//         </Card.Content>
//         <Card.Content extra>
//           <div className='ui two buttons'>
//             <Button basic color='green'>
//               Add recipe
//             </Button>
//             <Button basic color='red'>
//               Remove recipe
//             </Button>
//           </div>
//         </Card.Content>
//       </Card>
//     </div>
//   )
// }

export default App
