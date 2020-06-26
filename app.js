import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const App = () => {
  return (
    <div>
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>Za'atar</Card.Header>
          {/* <Card.Meta>Friends of Elliot</Card.Meta> */}
          <Card.Description>
            Add this recipe to your box!
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              Add recipe
            </Button>
            <Button basic color='red'>
              Remove recipe
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

export default App
