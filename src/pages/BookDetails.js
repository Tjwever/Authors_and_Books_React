import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getBookById, deleteBook } from '../shared/bookApi'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Book from '../components/Book'
import '../components/Author.css'

export default function BookDetails() {
    const { id } = useParams() 
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const url = 'api/book'
    const fetchUrl = `https://localhost:7150/${url}/${id}`
    const [show, setShow] = useState(false)

    const toggleShow = () => {
        setShow(!show)
    }

    const { data: book, isError, isLoading, error } = useQuery({
        queryKey: ['book', id],
        queryFn: () => getBookById(id),
    })

    const deleteBookMutation = useMutation(deleteBook, {
        onSuccess: () => {
            // Invalidates cache and refetch
            queryClient.invalidateQueries('book')
        },
    })

    const handleDelete = () => {
        deleteBookMutation.mutate({ id: id })
        navigate('/books')
    }

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

    return (
        <>
            <div className='container' style={{ backgroundColor: 'slategrey' }}>
                <p className='bootylicious'>Book Details</p>

                {book ? (
                    <>
                        <Book
                            key={book.id}
                            id={book.id}
                            name={book.name}
                            genre={book.genre}
                            pages={book.pages}
                        />
                        <div className='bootylicious'>
                            
                        </div>
                        <div className='bootylicious back-edit'>
                            <Link className='links' to={'/books'}>
                                <Button variant='light' size='md'>
                                    Back
                                </Button>
                            </Link>
                            <Link className='links' to={'/books/edit/' + id}>
                                <Button variant='info' size='md'>
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                variant='danger'
                                size='md'
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </div>
                    </>
                ) : null}
            </div>
        </>
    )
}
