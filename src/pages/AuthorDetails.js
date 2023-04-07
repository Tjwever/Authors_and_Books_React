import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAuthorById } from '../shared/authorApi'
import { deleteAuthor } from '../shared/authorApi'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Author from '../components/Author'
import AddBook from '../components/AddBook'
import { newBook } from '../shared/bookApi'
import '../components/Author.css'

export default function AuthorDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [book, setBook] = useState()
    const [show, setShow] = useState(false)

    const toggleShow = () => {
        setShow(!show)
    }

    const { data: author, isError, isLoading, error } = useQuery({
        queryKey: ['author', id],
        queryFn: () => getAuthorById(id),
    })

    const deleteAuthorMutation = useMutation(deleteAuthor, {
        onSuccess: () => {
            // Invalidates cache and refetch
            queryClient.invalidateQueries('author')
        },
    })

    const handleDelete = () => {
        deleteAuthorMutation.mutate({ id: id })
        navigate('/authors')
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
                <p className='bootylicious'>Author Details</p>

                {author ? (
                    <>
                        <Author
                            id={author.id}
                            name={author.name}
                            location={author.location}
                            age={author.age}
                            books={author.books}
                        />
                        <div className='bootylicious'>
                            <AddBook
                                toggleShow={toggleShow}
                                show={show}
                                id={author.id}
                                name={author.books.name}
                                genre={author.books.genre}
                                pages={author.books.pages}
                                newBook={newBook}
                            />
                        </div>
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
