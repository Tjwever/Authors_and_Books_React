import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAuthorById, updateAuthor } from '../shared/authorApi'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import '../components/Author.css'

export default function AuthorEditDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data: author, isError, isLoading, error } = useQuery({
        queryKey: ['author', id],
        queryFn: () => getAuthorById(id),
    })

    const updateAuthorMutation = useMutation(updateAuthor, {
        onSuccess: () => {
            // Invalidates cache and refetch
            queryClient.invalidateQueries('author')
        },
    })

    // Had to set the default values in useState since we're using state for our values.
    // originally it wasn't keeping the value even though it was showing on the page.

    const [name, setName] = useState(author.name)
    const [age, setAge] = useState(author.age)
    const [location, setLocation] = useState(author.location)
    const [alertVisable, setAlertVisable] = useState(false)

    if (isError) {
        console.log('Something went wrong...')
        return (
            <>
                <div className='card-container'>
                    <h1>Something went wrong...</h1>
                </div>
            </>
        )
    }

    if (isLoading) {
        return (
            <>
                <div className='card-container'>
                    <Spinner animation='border' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                </div>
            </>
        )
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        const dateTime = new Date().toISOString()

        updateAuthorMutation.mutate({
            id: id,
            name: name,
            age: age,
            location: location,
            createdAt: author.createdAt,
            updatedAt: dateTime,
        })

        setName('')
        setAge('')
        setLocation('')
        navigate('/authors')
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
                        <label className='col'>Name:</label>{' '}
                        <input
                            className='col'
                            type='text'
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                    </div>
                    <div className='container col-md-5 row mx-auto'>
                        {' '}
                        <label className='col'>Age:</label>{' '}
                        <input
                            className='col'
                            type='number'
                            value={age}
                            onChange={(e) => {
                                setAge(e.target.value)
                            }}
                        />
                    </div>
                    <div className='container col-md-5 row mx-auto'>
                        {' '}
                        <label className='col'>Location:</label>{' '}
                        <input
                            className='col'
                            type='text'
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value)
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
                                onClick={handleUpdate}
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
