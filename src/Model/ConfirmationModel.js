import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmationModal = ({ show, onClose, popupMessage, path_image }) => {
  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        onHide={() => onClose(false)}
        keyboard={false}
        id="pollModel1"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <img
              src="https://webinar.docintel.app/Event/webinar-assets/images/octa-logo.svg"
              alt=""
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <img src={path_image + "alert.png"} alt="" />
            <h4>{popupMessage?.message1 ? popupMessage?.message1 : ""}</h4>
            <h4>
              <strong>
                {popupMessage?.message2 ? popupMessage?.message2 : ""}
              </strong>
            </h4>
            <div className="modal-buttons">
              {/* <button
                type="button"
                className="btn btn-primary btn-filled"
                onClick={handleCollection}
              >
                {popupMessage?.footerButton}
              </button> */}

              <button
                type="button"
                className="btn btn-primary btn-bordered"
                onClick={() => onClose(false)}
              >
                Close
              </button>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
