import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { newAuthor } from '../shared/authorApi'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import './EditAuthor.css'

function AddAuthor(props) {
    // different props that in other files
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [location, setLocation] = useState('')
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [pages, setPages] = useState('')
    const queryClient = useQueryClient()
    // being passed in from parent component, so that default value is show State in Authors.js
    const [show, setShow] = useState(props.show)

    const handleClose = () => setShow(false)

    const addAuthorMutation = useMutation(newAuthor, {
        onSuccess: () => {
            // Invalidates cache and refetch
            queryClient.invalidateQueries('author')
        },
    })
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const dateTime = new Date().toISOString()

        const author = {
            name: name,
            age: age,
            location: location,
            createdAt: dateTime,
            updatedAt: dateTime,
            books: [
                {
                    name: title,
                    genre: genre,
                    pages: pages,
                    createdAt: dateTime,
                    updatedAt: dateTime,
                },
            ],
        }

        addAuthorMutation.mutate(author)

        setName('')
        setAge('')
        setLocation('')
        setTitle('')
        setGenre('')
        setPages('')

        props.toggleShow()
    }

    return (
        <>
            <Button variant='primary' onClick={props.toggleShow}>
                <div className='edit-btn'>Add Author</div>
            </Button>

            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Author w/ a Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                value={name}
                                id='name'
                                name='name'
                                placeholder='John Smith'
                                // any time form changes, state changes
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type='text'
                                value={age}
                                id='age'
                                name='age'
                                placeholder='45'
                                // any time form changes, state changes
                                onChange={(e) => {
                                    setAge(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type='text'
                                value={location}
                                id='location'
                                name='location'
                                placeholder='USA'
                                // any time form changes, useState changes to value
                                onChange={(e) => {
                                    setLocation(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <hr />
                        {/* BOOK INFO */}
                        <Form.Group>
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control
                                type='text'
                                value={title}
                                id='title'
                                name='title'
                                placeholder='Lord of the Bracelets'
                                // any time form changes, useState changes to value
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type='text'
                                value={genre}
                                id='genre'
                                name='genre'
                                placeholder='Fantasy'
                                // any time form changes, useState changes to value
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
                                id='pages'
                                name='pages'
                                placeholder='800'
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
                    <Button variant='primary' onClick={handleSubmit}>
                        Add!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddAuthor
