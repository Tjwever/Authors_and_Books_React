import "./App.css"
import Author from "./components/Author"

function App() {
  // would be for authorization later
  const showAuthor = true

  return (
    <div className="App">
      <header className="App-header">
        <p>Bootylicious!</p>

        {
          showAuthor ? (
            <>
              <Author name='Jane Doe' genre='horror' />
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
      </header>
    </div>
  )
}

export default App
