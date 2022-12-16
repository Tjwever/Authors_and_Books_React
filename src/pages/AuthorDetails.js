import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Author from '../components/Author'
import '../components/Author.css'

export default function AuthorDetails() {
   const { id } = useParams()
   const url = 'api/author'
   const fetchUrl = `https://localhost:7150/${url}/${id}`
   console.log(fetchUrl)
   console.log(id)
   const [author, setAuthor] = useState()

   useEffect(() => {
      fetch(fetchUrl)
         .then((response) => {
            return response.json()
         })
         .then((data) => {
            console.log(data)
            setAuthor(data)
         })
   }, [])

   return (
      <>
         <div className='container' style={{backgroundColor: 'slategrey'}}>
         <p className='bootylicious'>Author Details</p>
            {author ? (
               <Author
                  // key={author.id}
                  id={author.id}
                  name={author.name}
                  location={author.location}
                  age={author.age}
                  books={author.books}
                  // editAuthor={editAuthor}
                  // updateBook={updateBook}
               />
            ) : null}
         </div>
      </>
   )
}
