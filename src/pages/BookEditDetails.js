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

        const dateTime = new Date().toISOString()

        updateBookMutation.mutate({
            id: id,
            name: name,
            genre: genre,
            pages: pages,
            updatedAt: dateTime,
            authorId: book.authorId
        })

        setName('')
        setGenre('')
        setPages('')
        navigate('/books')
    }

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
                            value={name}
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
                            value={genre}
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
                            value={pages}
                            onChange={(e) => {
                                setPages(e.target.value)
                            }}
                        />
                    </div>

                    <br />

                    <div className='bootylicious back-edit'>
                        <Button
                            variant='primary'
                            size='md'
                            onClick={handleUpdate}
                        >
                            Save
                        </Button>

                    <Link className='links' to={'/books/' + id}>
                            <Button variant='light' size='md'>
                                Back
                            </Button>
                    </Link>
                        </div>
                </div>
            ) : null}
        </>
    )
}
