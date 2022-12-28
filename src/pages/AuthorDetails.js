import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Author from '../components/Author'
import '../components/Author.css'

export default function AuthorDetails() {
   const { id } = useParams()
   const url = 'api/author'
   const fetchUrl = `https://localhost:7150/${url}/${id}`
   // console.log(fetchUrl)
   // console.log(id)
   const [author, setAuthor] = useState()

   useEffect(() => {
      fetch(fetchUrl)
         .then((response) => {
            return response.json()
         })
         .then((data) => {
            // console.log(data)
            setAuthor(data)
         })
   }, [])

   // const updateAuthor = (authorId, name, age, location) => {
   //    const authorData = {
   //       id: authorId,
   //       name: name,
   //       age: age,
   //       location: location,
   //       createdAt: author.createdAt,
   //       updatedAt: new Date(Date.now()),
   //       books: author.books,
   //    }

   //    // console.log('author by ID: ', author[authorId - 1])
   //    // console.log('authorData: ', authorData)
   //    // console.log('current url: ', fetchUrl)

   //    fetch(fetchUrl, {
   //       method: 'PUT',
   //       headers: {
   //          'Content-Type': 'application/json',
   //       },
   //       body: JSON.stringify(authorData),
   //       // body: JSON.stringify(authors[authorId]),
   //    })
   //       .then((response) => {
   //          if (!response.ok) {
   //             throw new Error('Something went wrong')
   //          }
   //          return response.json()
   //       })
   //       .then((data) => {
   //          console.log('data', data)
   //          setAuthor([data])
   //       })
   //       .catch((e) => {
   //          console.log(e)
   //       })

   //    // fetch(fetchUrl)
   //    //    .then((response) => {
   //    //       return response.json()
   //    //    })
   //    //    .then((data) => {
   //    //       console.log('update fetch all data:', data)
   //    //       setSingle(data)
   //    //    })

   // }

   return (
      <>
         <div className='container' style={{ backgroundColor: 'slategrey' }}>
            <p className='bootylicious'>Author Details</p>

            {author ? (
               <>
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
                  <div className='bootylicious back-edit'>
                     <Link className='links' to={'/authors'}>
                        <Button variant='light' size='md'>
                           Back
                        </Button>
                     </Link>
                     <Link className='links' to={'/authors/edit/' + id}>
                        <Button variant='info' size='md'>
                           Edit
                        </Button>
                     </Link>
                     <Button variant='danger' size='md'>
                        Delete
                     </Button>
                  </div>
               </>
            ) : null}
         </div>
      </>
   )
}
