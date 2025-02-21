import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function StaticExample({setShow,show}) {
  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal className='modal-dialog-centered modal-dialog-scrollable' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>
  <img src={`${path_image}success.svg`} alt="Success" />
</Modal.Title>

        </Modal.Header>

        <Modal.Body>
          <h4 id="reader-sucess">Your changes have been saved successfully.</h4>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" className='btn btn-primary btn-bordered light' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StaticExample;
