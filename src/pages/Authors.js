import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Author from '../components/Author'
import AddAuthor from '../components/AddAuthor'
import EditAuthor from '../components/EditAuthor'
import Header from '../components/Header'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'

function Authors() {
   // would be for authorization later
   const showAuthor = true

   // the useState Hook is doing some react magic that is taking
   // a variable and a setVariable argument.  What this means is
   // when we use the useState, we'll create a variable, and we'll
   // set information or data to the setVariable so that we can use it later
   const [name, setName] = useState()
   const [authors, setAuthors] = useState()
   const [show, setShow] = useState(false)

   function toggleShow() {
      setShow(!show)
   }
   
   useEffect(() => {
      fetch('https://localhost:7150/api/author')
         .then((response) => response.json())
         .then((data) => {
            setAuthors(data)
         })
   }, [])

   const newAuthor = (name, age, location) => {
      const newAuthor = {
         id: uuidv4(),
         name: name,
         age: age,
         location: location,
         booker: {name: 'Default Book', genre: 'Genre', pages: 100}
      }
      setAuthors([...authors, newAuthor])
   }

   const updateAuthor = (id, newName, newAge, newLocation, newBook) => {
      const updatedAuthors = authors.map((author) => {
         if (id === author.id) {
            return {
               ...author,
               name: newName,
               age: newAge,
               location: newLocation
               // book: newBook
            }
         }
         // {console.log(newBook)}
         return author
      })

      setAuthors(updatedAuthors)
   }

   return (
      <div className='App'>
         <div className='App-header'>
            {/* <Header /> */}
            
            <Container>
            {/* <h1 className='bootylicious'>Bootylicious Authors</h1> */}
            <h1 className='bootylicious'>Authors</h1>
               {/* if showAuthor or authentication exists, show this */}
               {showAuthor ? (
                  // these are fragments, not entirely sure what they're for yet...
                  <>
                     
                     {/* Adding an Author */}
                     <div className='btn-container'>
                        <AddAuthor newAuthor={newAuthor} show={show} toggleShow={toggleShow}/>
                     </div>

                     <div className='card-container'>
                        {/* If there are authors, render or show all the authors in your data, else... */}
                        {authors ? (
                           authors.map((author) => {
                              const editAuthor = (
                                 <EditAuthor
                                    id={author.id}
                                    name={author.name}
                                    age={author.age}
                                    location={author.location}
                                    books={author.books}
                                    updateAuthor={updateAuthor}
                                 />
                              )
                              return (
                                 // When needing to have a component that could potentially change it's state
                                 // we'll need to pass the props in all the way down to the child component
                                 <Author
                                    key={author.id}
                                    id={author.id}
                                    name={author.name}
                                    location={author.location}
                                    age={author.age}
                                    books={author.books}
                                    editAuthor={editAuthor}
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
                  <p>You can't see any Authors</p>
               )}
            </Container>

         </div>
      </div>
   )
}

export default Authors
