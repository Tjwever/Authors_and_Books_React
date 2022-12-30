import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import './Author.css'
// Author.js should be the actual page that holds the authors
// More specifically, they should hold the author Cards component

function Author(props) {
    const [books, setBooks] = useState(props.books)

    return (
        <>
            {/* This should be part of the EditAuthor component */}
            <Card
                border='light'
                style={{ width: '25rem', height: '22rem', margin: 'auto' }}
            >
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
                    <Link className='links' to={'/authors/' + props.id}>
                        <Card.Title>{props.name}</Card.Title>
                    </Link>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <span>Age: {props.age}</span>
                    </Card.Text>
                    <Card.Text>
                        They live in:{' '}
                        {props.location
                            ? props.location
                            : 'No Location Assigned'}
                    </Card.Text>
                    <div className='hr'>
                        <hr />
                    </div>
                    <h5>Books Published</h5>
                    <ul>
                        {props.books.length > 0 ? (
                            props.books.map((book) => {
                                return <li key={book.id}>
                                 <Link className='links' to={`/books/${book.id}`}>
                                 {book.name}
                                 </Link>
                                </li>
                            })
                        ) : (
                            <h3
                                style={{
                                    textAlign: 'center',
                                    color: 'slateblue',
                                }}
                            >
                                Add a book
                            </h3>
                        )}
                    </ul>
                    {/* <div className='d-grid gap-2'>
                     <Button
                        variant='light'
                        size='sm'
                        style={{ textAlign: 'center' }}
                     >
                        + Add Book
                     </Button>
                  </div> */}
                </Card.Body>
            </Card>
            {/* This should be part of the EditAuthor component */}
        </>
    )
}

export default Author
