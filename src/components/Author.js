import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import EditBook from "./EditBook"
import "./Author.css"
// import EditAuthor from './EditAuthor'
// Author.js should be the actual page that holds the authors
// More specifically, they should hold the author Cards component

function Author(props) {
  const [books, setBooks] = useState(props.books)

  const updateBook = (id, newName, newGenre, newPages) => {
    const updatedBooks = books.map((book) => {
      if (id === book.id) {
        return {
          ...book,
          name: newName,
          genre: newGenre,
          pages: newPages,
        }
      }
      return book
    })

    setBooks(updatedBooks)
  }

  return (
    <>
      {/* This should be part of the EditAuthor component */}
      <Card border="light" style={{ width: "18rem", height: "24rem" }}>
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
          {props.editAuthor}
        </Card.Header>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            <span>Age: {props.age}</span>
          </Card.Text>
          <Card.Text>
            They live in:{" "}
            {props.location ? props.location : "No Location Assigned"}
          </Card.Text>
          <hr />
          <h5>Books Published</h5>
          {props.books.length > 0 ? props.books.map((book) => {
            return (
              <p key={book.id}>
                <EditBook
                  id={book.id}
                  name={book.name}
                  genre={book.genre}
                  pages={book.pages}
                  updateBook={updateBook}
                />
              </p>
            )
          }) : <div className="d-grid gap-2"><Button variant="light" size="sm" style={{textAlign: 'center'}}>+ Add Book</Button></div>}
        </Card.Body>
      </Card>
      {/* This should be part of the EditAuthor component */}
    </>
  )
}

export default Author
