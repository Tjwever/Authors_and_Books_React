import './App.css'
import Authors from './pages/Authors'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import AddAuthor from './components/AddAuthor'
import EditAuthor from './components/EditAuthor'
import Header from './components/Header'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'

function App() {
   
   return (
      <Header>
         <Authors />
      </Header>
   )
}

export default App
