import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getBookById, updateBook } from '../shared/bookApi'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import '../components/Author.css'

export default function BookEditDetails() {

    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    
    const { data: book, isError, isLoading, error } = useQuery({
        queryKey: ['book', id],
        queryFn: () => getBookById(id),
    })

    console.log(book)

    const updateBookMutation = useMutation(updateBook, {
        onSuccess: () => {
            // Invalidates cache and refetch
            queryClient.invalidateQueries('book')
        },
    })

    // Had to set the default values in useState since we're using state for our values.
    // originally it wasn't keeping the value even though it was showing on the page.

    const [name, setName] = useState(book.name)
    const [genre, setGenre] = useState(book.genre)
    const [pages, setPages] = useState(book.pages)
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

        updateBookMutation.mutate({
            id: id,
            name: name,
            genre: genre,
            pages: pages,
        })

        setName('')
        setGenre('')
        setPages('')
        navigate('/authors')
    }
    
    // const { id } = useParams()
    // const navigate = useNavigate()
    // const url = 'api/book'
    // const fetchUrl = `https://localhost:7150/${url}/${id}`
    // const [book, setBook] = useState()
    // const [alertVisable, setAlertVisable] = useState(false)
    
    // useEffect(() => {
    //     fetch(fetchUrl)
    //         .then((response) => {
    //             return response.json()
    //         })
    //         .then((data) => {
    //             setBook(data)
    //         })
    // }, [])

    // const updateBook = (e) => {
    //     e.preventDefault()
    //     const data = {
    //         ...book,
    //         name: book.name,
    //         genre: book.genre,
    //         pages: book.pages,
    //     }

    //     fetch(fetchUrl, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     })
    //         .then((response) => {
    //             if (response.status === 204) {
    //                 setAlertVisable(true)
    //                 setTimeout(() => {
    //                     setAlertVisable(false)
    //                 }, 4000)
    //             } else {
    //                 throw new Error('Error: Update failed miserably!')
    //             }
    //             setBook(data)
    //         })
    //         .catch((e) => {
    //             console.log('Error: ', e)
    //         })

    //         navigate('/authors')
    // }

    return (
        <>
            <p className='bootylicious'>Edit this Book</p>
            <h1 className='bootylicious'>--==BOOK==--</h1>
            <div className='hr'>
                <hr />
                {alertVisable ? (
                    <div className='alert alert-success' role='alert'>
                        Success: Updated successfully!
                    </div>
                ) : null}
            </div>
            {book ? (
                <div className='bootylicious'>
                    <div className='container col-md-5 row mx-auto'>
                        {' '}
                        <label className='col'>Title:</label>{' '}
                        <input
                            className='col'
                            type='text'
                            value={book.name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                    </div>
                    <div className='container col-md-5 row mx-auto'>
                        {' '}
                        <label className='col'>Genre:</label>{' '}
                        <input
                            className='col'
                            type='text'
                            value={book.genre}
                            onChange={(e) => {
                                setGenre(e.target.value)
                            }}
                        />
                    </div>
                    <div className='container col-md-5 row mx-auto'>
                        {' '}
                        <label className='col'>Pages:</label>{' '}
                        <input
                            className='col'
                            type='number'
                            value={book.pages}
                            onChange={(e) => {
                                setPages(e.target.value)
                            }}
                        />
                    </div>

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
