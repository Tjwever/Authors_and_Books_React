import "./App.css"
import Author from "./components/Author"
import {useEffect, useState} from 'react'

function App() {
  // would be for authorization later
  const showAuthor = true
  const [name, setName] = useState()
  const [authors, setAuthors] = useState()

  useEffect(() => {
    fetch('https://localhost:7150/api/author')
      .then((response) => response.json())
      .then((data) => {
        setAuthors(data)
      })
  }, [])
  
  return (
    <div className="App">
      <div className="App-header">
        
        <p>Bootylicious!</p>

        {
          showAuthor ? (
            <>
              <input type="text" onChange={(e) => {
                console.log(e.target.value)
                setName(e.target.value)

              }}/>
              {authors ? authors.map((author) => {
                return (
                  <Author name={author.name} location={author.location} />
                )
              }) : null}
              
            </>
          )
          : <p>You can't see any Authors</p>
        }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    </div>
  )
}

export default App
