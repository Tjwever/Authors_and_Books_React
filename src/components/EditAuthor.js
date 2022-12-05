import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
 import Form from 'react-bootstrap/Form';
import "./EditAuthor.css"

function EditAuthor(props) {
  const [name, setName] = useState(props.name)
  const [age, setAge] = useState(props.age)
  const [location, setLocation] = useState(props.location)
    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <div className='edit-btn'>
          Edit
        </div>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} placeholder='John Smith' onChange={(e) => {setName(e.target.value)}} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" value={age} placeholder='45' onChange={(e) => {setAge(e.target.value)}} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" value={location} placeholder='USA' onChange={(e) => {setLocation(e.target.value)}} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditAuthor