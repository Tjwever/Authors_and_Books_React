import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Author from '../components/Author'
import { useQuery } from '@tanstack/react-query'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { getAuthorById } from '../shared/authorApi'
import { deleteAuthor } from '../shared/authorApi'
import '../components/Author.css'
import AddBook from '../components/AddBook'

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

    const newBook = (name, genre, pages) => {
        const data = { name: name, genre: genre, pages: pages, authorId: id }

        fetch('https://localhost:7150/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong')
                }
                return response.json()
            })
            .then((data) => {
                toggleShow()
                setBook([...book, data])
            })
            .catch((e) => {
                console.log(e)
            })
    }

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
                        />
                        <div className='bootylicious'>
                            <AddBook
                                toggleShow={toggleShow}
                                show={show}
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
