import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import "./EditAuthor.css"

function EditBook(props) {
  const [name, setName] = useState(props.name)
  const [genre, setGenre] = useState(props.genre)
  const [pages, setPages] = useState(props.pages)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="light" size="sm" onClick={handleShow}>
        <div className="edit-btn">{props.name}</div>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update This Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Pet Cemetery"
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                value={genre}
                placeholder="Horror"
                onChange={(e) => {
                  setGenre(e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pages</Form.Label>
              <Form.Control
                type="text"
                value={pages}
                placeholder="USA"
                onChange={(e) => {
                  setPages(e.target.value)
                }}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              // on click prevents a refresh of the page
              e.preventDefault()
              console.log("Book edited")
              // console.log(props.id, name, age, location, book)
              console.log(props.id, name, genre, pages)
              props.updateBook(props.id, name, genre, pages)
              handleClose()
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditBook
