import "./App.css"
import Author from "./components/Author"

function App() {
  // would be for authorization later
  const showAuthor = false

  return (
    <div className="App">
      <header className="App-header">
        <p>Bootylicious!</p>

        {showAuthor ? <Author /> : <p>You can't see any Authors</p>}
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
