import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import './EditAuthor.css'

function EditAuthor(props) {
   // different props that in other files
   const [name, setName] = useState(props.name)
   const [age, setAge] = useState(props.age)
   const [location, setLocation] = useState(props.location)

   const [show, setShow] = useState(false)

   const handleClose = () => setShow(false)
   const handleShow = () => setShow(true)

   return (
      <>
         <Button variant='primary' onClick={handleShow}>
            <div className='edit-btn'>Edit</div>
         </Button>

         <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            keyboard={false}
         >
            <Modal.Header closeButton>
               <Modal.Title>Update Author</Modal.Title>
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
                     console.log('submitted')
                     console.log(props.id, name, age, location)
                     // will call the updateAuthor method with the state's parameters as arguments
                     props.updateAuthor(props.id, name, age, location)
                  }}
               >
                  Update
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   )
}

export default EditAuthor
