import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function StaticExample({setShow,show}) {
 

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Informed</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Your changes have been saved successfully.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StaticExample;
