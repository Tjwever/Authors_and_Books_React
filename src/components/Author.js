import Card from 'react-bootstrap/Card'
import './Author.css'
import EditAuthor from './EditAuthor'

function Author(props) {
   return (
      <>
         <Card border='light' style={{ width: '18rem' }}>
            <Card.Header>
              {/* Again, passing the props down from parent to child */}
               <EditAuthor
                  id={props.id}
                  name={props.name}
                  age={props.age}
                  location={props.location}
                  updateAuthor={props.updateAuthor}
               />
            </Card.Header>
            <Card.Body>
               <Card.Title>{props.name}</Card.Title>
               <Card.Text>
                  They live in{' '}
                  {props.location ? props.location : 'No Location Assigned'}
               </Card.Text>
            </Card.Body>
         </Card>
      </>
   )
}

export default Author
