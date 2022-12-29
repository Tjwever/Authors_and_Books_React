import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
// import Author from '../components/Author'
import '../components/Author.css'

export default function AuthorEditDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const url = 'api/author'
    const fetchUrl = `https://localhost:7150/${url}/${id}`
    const [author, setAuthor] = useState()
    const [alertVisable, setAlertVisable] = useState(false)

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

    const updateAuthor = (e) => {
        e.preventDefault()
        const data = {
            ...author,
            name: author.name,
            age: author.age,
            location: author.location,
        }

        fetch(fetchUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(author),
            body: JSON.stringify(data),
            // body: JSON.stringify(authors[authorId]),
        })
            .then((response) => {
                if (response.status === 204) {
                    setAlertVisable(true)
                    setTimeout(() => {
                        setAlertVisable(false)
                    }, 4000)
                    console.log(alertVisable)
                    console.log('Success: Updated successfully!')
                } else {
                    throw new Error('Error: Update failed miserably!')
                }
                console.log('Data: ', data)
                setAuthor(data)
            })
            .catch((e) => {
                console.log('Error: ', e)
            })
    }

    return (
        <>
            <p className='bootylicious'>Edit this Author</p>
            <h1 className='bootylicious'>--==AUTHOR==--</h1>
            <div className='hr'>
                <hr />
                {alertVisable ? (
                    <div className='alert alert-success' role='alert'>
                        Success: Updated successfully!
                    </div>
                ) : null}
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
                            type='number'
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
                                setAuthor({
                                    ...author,
                                    location: e.target.value,
                                })
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
                                  <div
                                      className='container mx-auto'
                                      key={book.id}
                                  >
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
                            <Button
                                variant='primary'
                                size='md'
                                onClick={updateAuthor}
                            >
                                Save
                            </Button>
                        </div>
                    </Link>
                </div>
            ) : null}
        </>
    )
}
