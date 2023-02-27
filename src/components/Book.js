import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import './Author.css'

// Author.js should be the actual page that holds the authors
// More specifically, they should hold the author Cards component
function Book(props) {
    return (
        <>
            {/* This should be part of the EditAuthor component */}
            <Card
                border='light'
                style={{ width: '18rem', height: '10rem', margin: 'auto' }}
            >
                <Card.Header>
                    <Link className='links' to={'/books/' + props.id}>
                        <Card.Title>{props.name}</Card.Title>
                    </Link>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <span>Genre: {props.genre}</span>
                    </Card.Text>
                    <Card.Text>
                        Number of Pages:{' '}
                        {props.pages}
                    </Card.Text>
                    <hr />
                </Card.Body>
            </Card>
        </>
    )
}

export default Book
