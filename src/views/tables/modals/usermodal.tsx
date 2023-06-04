import React from 'react'
import { Button, Modal } from '@mui/material'

const ViewModal = ({ isOpen, closeModal }) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <div className='modal-content'>
        <h2>Modal Title</h2>
        <p>Modal content goes here</p>
        <Button variant='contained' onClick={closeModal}>
          Close
        </Button>
      </div>
    </Modal>
  )
}

export default ViewModal
