import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import '../components/Author.css'

export default function BookEditDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const url = 'api/book'
    const fetchUrl = `https://localhost:7150/${url}/${id}`
    const [book, setBook] = useState()
    const [alertVisable, setAlertVisable] = useState(false)

    useEffect(() => {
        fetch(fetchUrl)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setBook(data)
            })
    }, [])

    const updateBook = (e) => {
        e.preventDefault()
        const data = {
            ...book,
            name: book.name,
            genre: book.genre,
            pages: book.pages,
        }

        fetch(fetchUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 204) {
                    setAlertVisable(true)
                    setTimeout(() => {
                        setAlertVisable(false)
                    }, 4000)
                } else {
                    throw new Error('Error: Update failed miserably!')
                }
                setBook(data)
            })
            .catch((e) => {
                console.log('Error: ', e)
            })
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
                        <label className='col'>{book.name}:</label>{' '}
                        <input
                            className='col'
                            type='text'
                            value={book.name}
                            onChange={(e) => {
                                setBook({ ...book, name: e.target.value })
                            }}
                        />
                    </div>
                    <div className='container col-md-5 row mx-auto'>
                        {' '}
                        <label className='col'>{book.genre}:</label>{' '}
                        <input
                            className='col'
                            type='text'
                            value={book.genre}
                            onChange={(e) => {
                                setBook({ ...book, genre: e.target.value })
                            }}
                        />
                    </div>
                    <div className='container col-md-5 row mx-auto'>
                        {' '}
                        <label className='col'>{book.pages}:</label>{' '}
                        <input
                            className='col'
                            type='number'
                            value={book.pages}
                            onChange={(e) => {
                                setBook({
                                    ...book,
                                    pages: e.target.value,
                                })
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
                                onClick={updateBook}
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
