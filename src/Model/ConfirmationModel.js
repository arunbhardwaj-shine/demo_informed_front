import React from "react";
import Modal from "react-bootstrap/Modal";

const ConfirmationModal = ({ show, onClose, popupMessage, path_image }) => {
  return (
    <>
      <Modal
        className="modal send-confirm"
        id="delete-confirm"
        show={show}
        onHide={() => onClose(false)}
      >
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => onClose(false)}
          ></button>
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
                {popupMessage?.footerButton}
              </button>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
