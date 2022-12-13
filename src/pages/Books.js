import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Book from '../components/Book'
// import AddBook from '../components/AddBook'
// import EditBook from '../components/EditBook'
import Header from '../components/Header'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'

function Books() {
   // would be for authorization later
   const showBook = true

  //  const [authors, setAuthors] = useState()
   const [books, setBooks] = useState()
   const [show, setShow] = useState(false)

   function toggleShow() {
      setShow(!show)
   }
   
   useEffect(() => {
      fetch('https://localhost:7150/api/book')
         .then((response) => response.json())
         .then((data) => {
            setBooks(data)
         })
   }, [])

  //  useEffect(() => {
  //     fetch('https://localhost:7150/api/author')
  //        .then((response) => response.json())
  //        .then((data) => {
  //           setAuthors(data)
  //        })
  //  }, [])

  //  const newAuthor = (name, age, location) => {
  //     const newAuthor = {
  //        id: uuidv4(),
  //        name: name,
  //        age: age,
  //        location: location,
  //     }
  //     setAuthors([...authors, newAuthor])
  //  }

  //  const updateAuthor = (id, newName, newAge, newLocation, newBook) => {
  //     const updatedAuthors = authors.map((author) => {
  //        if (id === author.id) {
  //           return {
  //              ...author,
  //              name: newName,
  //              age: newAge,
  //              location: newLocation,
  //              book: newBook
  //           }
  //        }
  //        {console.log(newBook)}
  //        return author
  //     })

  //     setAuthors(updatedAuthors)
  //  }

   return (
      <div className='App'>
         <div className='App-header'>
            {/* <Header /> */}
            
            <Container>
            <h1 className="bootylicious">Books</h1>
            {/* <h1 className="bootylicious">Bootylicious Books</h1> */}
               {/* if showAuthor or authentication exists, show this */}
               {showBook ? (
                  // these are fragments, not entirely sure what they're for yet...
                  <>
                     
                     {/* Adding an Author */}
                     <div className='btn-container'>
                        {/* <AddAuthor newAuthor={newAuthor} show={show} toggleShow={toggleShow}/> */}
                     </div>

                     <div className='card-container'>
                        {/* If there are authors, render or show all the authors in your data, else... */}
                        {books ? (
                           books.map((book) => {
                              // const book = (
                                //  <EditAuthor
                                //     id={author.id}
                                //     name={author.name}
                                //     age={author.age}
                                //     location={author.location}
                                //     books={author.books}
                                //     updateAuthor={updateAuthor}
                                //  />
                              // )
                              return (
                                 // When needing to have a component that could potentially change it's state
                                 // we'll need to pass the props in all the way down to the child component
                                 <Book
                                    key={book.id}
                                    id={book.id}
                                    name={book.name}
                                    genre={book.genre}
                                    pages={book.pages}
                                    // editAuthor={editAuthor}
                                 />
                              )
                           })
                        ) : (
                           // returning a spinner if authors are loading/don't exist
                           <Spinner animation='border' role='status'>
                              <span className='visually-hidden'>
                                 Loading...
                              </span>
                           </Spinner>
                        )}
                     </div>
                  </>
               ) : (
                  <p>You can't see any Books</p>
               )}
            </Container>

         </div>
      </div>
   )
}

export default Books


// function Books() {
//   return <h1 className="bootylicious">Bootylicious Books</h1>
// }

// export default Books