import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Author from '../components/Author'
import AddAuthor from '../components/AddAuthor'
import { getAuthors, newAuthor } from '../shared/authorApi'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

function Authors() {
    // would be for authorization later
    const showAuthor = true
    // the useState Hook is doing some react magic that is taking
    // a variable and a setVariable argument.  What this means is
    // when we use the useState, we'll create a variable, and we'll
    // set information or data to the setVariable so that we can use it later
    const [show, setShow] = useState(false)
    const url = 'api/author'

    const { isError, isLoading, data: authors, error } = useQuery(
        ['authors'],
        getAuthors,
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

    function toggleShow() {
        setShow(!show)
    }

    return (
        <div className='App'>
            <div className='App-header'>
                {/* <Header /> */}

                <Container>
                    {/* <h1 className='bootylicious'>Bootylicious Authors</h1> */}
                    <h1 className='bootylicious'>Authors</h1>
                    {/* if showAuthor or authentication exists, show this */}
                    {showAuthor ? (
                        // these are fragments, not entirely sure what they're for yet...
                        <>
                            {/* Adding an Author */}
                            <div className='btn-container'>
                                <AddAuthor
                                    show={show}
                                    toggleShow={toggleShow}
                                />
                            </div>

                            <div className='card-container'>
                                {/* If there are authors, render or show all the authors in your data, else... */}

                                {authors?.map((author) => {
                                    return (
                                        // When needing to have a component that could potentially change it's state
                                        // we'll need to pass the props in all the way down to the child component
                                        <Author
                                            key={author.id}
                                            id={author.id}
                                            name={author.name}
                                            location={author.location}
                                            age={author.age}
                                            books={author.books}
                                        />
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <p>You can't see any Authors</p>
                    )}
                </Container>
            </div>
        </div>
    )
}

export default Authors
