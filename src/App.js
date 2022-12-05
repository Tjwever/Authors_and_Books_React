import "./App.css"
import Author from "./components/Author"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import { useEffect, useState } from "react"

function App() {
  // would be for authorization later
  const showAuthor = true

  // the useState Hook is doing some react magic that is taking 
  // a variable and a setVariable argument.  What this means is
  // when we use the useState, we'll create a variable, and we'll
  // set information or data to the setVariable so that we can use it later
  const [name, setName] = useState()
  const [authors, setAuthors] = useState()

  useEffect(() => {
    fetch("https://localhost:7150/api/author")
      .then((response) => response.json())
      .then((data) => {
        setAuthors(data)
      })
  }, [])

  const updateAuthor = (id, newName, newAge, newLocation) => {
    const updatedAuthors = authors.map((author) => {
      if(id === author.id) {
        return { ...author, name: newName, age: newAge, location: newLocation }
      }

      return author
    })

    setAuthors(updatedAuthors)
  }

  return (
    <div className="App">
      <div className="App-header">
        <p className="bootylicious">Bootylicious!</p>

        {/* if showAuthor or authentication exists, show this */}
        {showAuthor ? (
          // these are fragments, not entirely sure what they're for yet...
          <>
            {/* <input
              type="text"
              onChange={(e) => {
                console.log(e.target.value)
                setName(e.target.value)
              }}
            /> */}

            <div className="btn-container">
              <Button variant="primary">Add Author</Button>
            </div>

            <div className="card-container">
              {/* If there are authors, render or show all the authors in your data, else... */}
              {authors ? (
                authors.map((author) => {
                  return (
                    // When needing to have a component that could potentially change it's state
                    // we'll need to pass the props in all the way down to the child component
                    <Author
                      key={author.id}
                      id={author.id}
                      name={author.name}
                      location={author.location}
                      age={author.age}
                      updateAuthor={updateAuthor}
                    />
                  )
                })
              ) : (
                // returning a spinner if authors are loading/don't exist
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </div>
          </>
        ) : (
          <p>You can't see any Authors</p>
        )}

      </div>
    </div>
  )
}

export default App
