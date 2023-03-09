import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { newBook } from '../shared/bookApi'
import { getBookById } from '../shared/bookApi'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import './EditAuthor.css'

function AddBook(props) {
    const { id } = useParams()
    const queryClient = useQueryClient()
    
    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [pages, setPages] = useState('')
    const [show, setShow] = useState(props.show)

    const handleClose = () => setShow(false)

    const addBookMutation = useMutation(newBook, {
        onSuccess: () => {
            // Invalidates cache and refetch
            queryClient.invalidateQueries('book')
        },
    })

    const handleNewBook = (e) => {
        e.preventDefault()

        const book = {
            name: name,
            genre: genre,
            pages: pages,
            authorId: props.id,
        }

        addBookMutation.mutate(book)

        setName('')
        setGenre('')
        setPages('')
        
		props.toggleShow()
    }
    
    return (
        <>
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
                        onClick={handleNewBook}
                    >
                        Add!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddBook
