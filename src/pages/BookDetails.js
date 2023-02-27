import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Book from '../components/Book'
import '../components/Author.css'

export default function BookDetails() {
    const { id } = useParams() 
    const navigate = useNavigate()
    const url = 'api/book'
    const fetchUrl = `https://localhost:7150/${url}/${id}`
    const [book, setBook] = useState()
    const [show, setShow] = useState(false)

    const toggleShow = () => {
        setShow(!show)
    }

    useEffect(() => {
        fetchBookData()
    }, [])

    const fetchBookData = () => {
        fetch(fetchUrl)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setBook(data)
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
                navigate('/books')
            })
            .catch((e) => {
                console.log(e)
            })
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
