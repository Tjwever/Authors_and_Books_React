import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import './EditAuthor.css'

function AddBook(props) {
    // different props that in other files
    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [pages, setPages] = useState('')
    // const [book, setBook] = useState('')
    // being passed in from parent component, so that default value is show State in Authors.js
    const [show, setShow] = useState(props.show)

    const handleClose = () => setShow(false)
    // const handleShow = () => setShow(true)

    return (
        <>
            {/* <Button variant='primary' onClick={props.toggleShow}>
            <div className='edit-btn'>Add Author</div>
         </Button> */}
            <Button variant='primary' size='lg' onClick={props.toggleShow}>
                + Add A Book +
            </Button>

            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                value={name}
                                placeholder='Harry Plopper'
                                // any time form changes, state changes
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type='text'
                                value={genre}
                                placeholder='Thriller'
                                // any time form changes, state changes
                                onChange={(e) => {
                                    setGenre(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Pages</Form.Label>
                            <Form.Control
                                type='text'
                                value={pages}
                                placeholder='666'
                                // any time form changes, useState changes to value
                                onChange={(e) => {
                                    setPages(e.target.value)
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={props.toggleShow}>
                        Close
                    </Button>
                    <Button
                        variant='primary'
                        onClick={(e) => {
                            // on click prevents a refresh of the page
                            e.preventDefault()
                            console.log('submitted and added')
                            console.log(name, genre, pages)
                            // any time this is clicked, we have to reset the values
                            // so that if we create an author, and click Add Author
                            // the values will be gone
                            setName('')
                            setGenre('')
                            setPages('')
                            // will call the updateAuthor method with the state's parameters as arguments
                            // props.newBook()
                            props.newBook(name, genre, pages)
                            // props.toggleShow()
                        }}
                    >
                        Add!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddBook
