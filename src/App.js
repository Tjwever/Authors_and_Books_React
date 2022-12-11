import "./App.css"
import Authors from "./pages/Authors"
import Books from "./pages/Books"
import Home from "./pages/Home"
import Header from "./components/Header"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </Header>
    </BrowserRouter>
  )
}

export default App
