import "./App.css"
import Authors from "./pages/Authors"
import AuthorDetails from "./pages/AuthorDetails"
import BookDetails from "./pages/BookDetails"
import AuthorEditDetails from "./pages/AuthorEditDetails"
import BookEditDetails from "./pages/BookEditDetails"
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
          <Route path="/authors/:id" element={<AuthorDetails />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/authors/edit/:id" element={<AuthorEditDetails />} />
          <Route path="/books/edit/:id" element={<BookEditDetails />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </Header>
    </BrowserRouter>
  )
}

export default App
