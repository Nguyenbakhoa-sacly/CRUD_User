

import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalAddNew = (props) => {
  const { onHide } = props
  const [name, setName] = useState('')
  const [job, setJob] = useState('')

  const handleAddUsers = () => {
    console.log(name, job)

  }
  return (
    <div>
      <Modal
        {...props}
        size="base"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Job</span>
            <input
              value={job}
              onChange={(e) => setJob(e.target.value)}
              type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button
            onClick={handleAddUsers}
            variant="success">Add User</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalAddNew