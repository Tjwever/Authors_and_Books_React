import Card from "react-bootstrap/Card"
import "./Author.css"
// import EditAuthor from './EditAuthor'

// Author.js should be the actual page that holds the authors
// More specifically, they should hold the author Cards component
function Book(props) {
  return (
    <>
      {/* This should be part of the EditAuthor component */}
      <Card border="light" style={{ width: "18rem", height: "10rem" }}>
        <Card.Header>
          {/* Again, passing the props down from parent to child */}
          {/* <EditAuthor
                  id={props.id}
                  name={props.name}
                  age={props.age}
                  location={props.location}
                  updateAuthor={props.updateAuthor}
               /> */}
          {/* Using JSX to send the props from Parent component */}
          {/* {props.editAuthor} */}
          <Card.Title>{props.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <span>Genre: {props.genre}</span>
          </Card.Text>
          <Card.Text>
            Number of Pages:{" "}
            {/* {props.location ? props.location : "No Location Assigned"} */}
            {props.pages}
          </Card.Text>
          <hr />
            
        </Card.Body>
      </Card>
      {/* This should be part of the EditAuthor component */}
    </>
  )
}

export default Book
