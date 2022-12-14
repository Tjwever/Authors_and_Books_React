import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Author from '../components/Author'
import '../components/Author.css'
import AddBook from '../components/AddBook'

export default function AuthorDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const url = 'api/author'
    const fetchUrl = `https://localhost:7150/${url}/${id}`
    const [author, setAuthor] = useState()
    const [book, setBook] = useState()
    const [show, setShow] = useState(false)

    const toggleShow = () => {
        setShow(!show)
    }

    useEffect(() => {
        fetchAuthorData()
    }, [])

    useEffect(() => {
        fetch('https://localhost:7150/api/book')
            .then((response) => response.json())
            .then((data) => {
                setBook(data)
            })
    }, [])

    const fetchAuthorData = () => {
        fetch(fetchUrl)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setAuthor(data)
            })
    }

    const handleDelete = () => {
        fetch(fetchUrl, {
            method: 'DELETE',
            'Content-Type': 'application/json',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('You suck and nothing happened!')
                }
                navigate('/authors')
            })
            .catch((e) => {
                console.log(e)
            })
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
                fetchAuthorData()
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
