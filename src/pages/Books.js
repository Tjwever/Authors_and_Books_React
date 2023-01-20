import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Book from '../components/Book'
import { getBooks } from '../shared/bookApi'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

function Books() {
    // would be for authorization later
    const showBook = true

    const [show, setShow] = useState(false)

    function toggleShow() {
        setShow(!show)
    }

    const { data: books, isError, isLoading, error } = useQuery(
        ['books'],
        getBooks,
        { select: (data) => data.sort((a, b) => b.id - a.id) }
    )

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
        <div className='App'>
            <div className='App-header'>

                <Container>
                    <h1 className='bootylicious'>Books</h1>
                    {showBook ? (
                        <>
                            <div className='card-container'>
                                {books?.map((book) => {
                                    return (
                                        <Book
                                            key={book.id}
                                            id={book.id}
                                            name={book.name}
                                            genre={book.genre}
                                            pages={book.pages}
                                        />
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <p>You can't see any Books</p>
                    )}
                </Container>
            </div>
        </div>
    )
}

export default Books
