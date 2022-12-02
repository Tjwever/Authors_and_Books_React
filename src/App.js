import "./App.css"
import Author from "./components/Author"
import {useState} from 'react'

function App() {
  // would be for authorization later
  const showAuthor = true
  const [name, setName] = useState()

  return (
    <div className="App">
      <div className="App-header">
        input
        <p>Bootylicious!</p>


        {
          showAuthor ? (
            <>
              <input type="text" onChange={(e) => {
                console.log(e.target.value)
                setName(e.target.value)

              }}/>
              <Author name={!name ? 'No name provided' : name} genre='horror' />
              <Author name='John Doe' genre='romance' />
              <Author name='Jack Doe' genre='comedy' />
              <Author name='Julie Doe' genre='fantasy' />
              <Author name='Jay Doe' genre='sci-fi' />
            </>
          )
          : <p>You can't see any Authors</p>
        }
        {/* <Author /> */}
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
