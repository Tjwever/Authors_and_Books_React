import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import './EditAuthor.css'

function AddAuthor(props) {
   // different props that in other files
   const [name, setName] = useState('')
   const [age, setAge] = useState('')
   const [location, setLocation] = useState('')

   const [show, setShow] = useState(false)

   const handleClose = () => setShow(false)
   const handleShow = () => setShow(true)

   return (
      <>
         <Button variant='primary' onClick={handleShow}>
            <div className='edit-btn'>Add Author</div>
         </Button>

         <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            keyboard={false}
         >
            <Modal.Header closeButton>
               <Modal.Title>Add Author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                  <Form.Group>
                     <Form.Label>Name</Form.Label>
                     <Form.Control
                        type='text'
                        value={name}
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
                        placeholder='45'
                        // any time form changes, state changes
                        onChange={(e) => {
                           setAge(e.target.value)
                        }}
                     />
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>Age</Form.Label>
                     <Form.Control
                        type='text'
                        value={location}
                        placeholder='USA'
                        // any time form changes, useState changes to value
                        onChange={(e) => {
                           setLocation(e.target.value)
                        }}
                     />
                  </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant='secondary' onClick={handleClose}>
                  Close
               </Button>
               <Button
                  variant='primary'
                  onClick={(e) => {
                     // on click prevents a refresh of the page
                     e.preventDefault()
                     console.log('submitted and added')
                     console.log(name, age, location)
                     // any time this is clicked, we have to reset the values
                     // so that if we create an author, and click Add Author
                     // the values will be gone
                     setName('')
                     setAge('')
                     setLocation('')
                     // will call the updateAuthor method with the state's parameters as arguments
                     props.newAuthor(name, age, location)
                     handleClose()
                  }}
               >
                  Add!
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   )
}

export default AddAuthor
