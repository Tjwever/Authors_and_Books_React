import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
// import Author from '../components/Author'
import '../components/Author.css'

export default function AuthorEditDetails() {
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

   const updateAuthor = () => {
    //   const authorData = {
    //      id: authorId,
    //      name: name,
    //      age: age,
    //      location: location,
    //      createdAt: author.createdAt,
    //      updatedAt: new Date(Date.now()),
    //      books: author.books,
    //   }

      // console.log('author by ID: ', author[authorId - 1])
      // console.log('authorData: ', authorData)
      // console.log('current url: ', fetchUrl)

      fetch(fetchUrl, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(author),
         // body: JSON.stringify(authors[authorId]),
      })
         .then((response) => {
            console.log('response', response.clone().json);
            if (!response.ok) {
               throw new Error('Something went wrong')
            }
            return response.json()
         })
         .then((data) => {
            console.log('data', data)
            setAuthor([data])
         })
         .catch((e) => {
            console.log(e)
         })

   }

   return (
      <>
         <p className='bootylicious'>Edit this Author</p>
         <h1 className='bootylicious'>--==AUTHOR==--</h1>
         <div className='hr'>
            <hr />
         </div>
         {author ? (
            <div className='bootylicious'>
               <div className='container col-md-5 row mx-auto'>
                  {' '}
                  <label className='col'>{author.name}:</label>{' '}
                  <input
                     className='col'
                     type='text'
                     value={author.name}
                     onChange={(e) => {
                        setAuthor({ ...author, name: e.target.value })
                     }}
                  />
               </div>
               <div className='container col-md-5 row mx-auto'>
                  {' '}
                  <label className='col'>{author.age}:</label>{' '}
                  <input
                     className='col'
                     type='text'
                     value={author.age}
                     onChange={(e) => {
                        setAuthor({ ...author, age: e.target.value })
                     }}
                  />
               </div>
               <div className='container col-md-5 row mx-auto'>
                  {' '}
                  <label className='col'>{author.location}:</label>{' '}
                  <input
                     className='col'
                     type='text'
                     value={author.location}
                     onChange={(e) => {
                        setAuthor({ ...author, location: e.target.value })
                     }}
                  />
               </div>
               <br />
               <h1 className='bootylicious'>--==BOOKS==--</h1>

               <div className='hr'>
                  <hr />
               </div>

               {author.books.length > 0
                  ? author.books.map((book) => {
                       return (
                          <div className='container mx-auto' key={book.id}>
                             {book.name}
                          </div>
                       )
                    })
                  : null}

               <Link className='links' to={'/authors/' + id}>
                  <br />
                  <div className='bootylicious back-edit'>
                     <Button variant='light' size='md'>
                        Back
                     </Button>
                     <Button variant='primary' size='md' onClick={updateAuthor}>
                        Save
                     </Button>
                  </div>
               </Link>
            </div>
         ) : null}
      </>
   )
}
