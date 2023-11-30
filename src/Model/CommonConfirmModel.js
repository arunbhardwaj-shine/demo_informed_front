import React from "react";
import { Modal } from "react-bootstrap";

const CommonConfirmModel = ({
  show,
  onClose,
  fun,
  popupMessage,
  path_image,
  resetDataId,
  onCloseCross
}) => {
  const handleClose = () => {
    onClose(false);
  };

  const handleCollection = () => {
    fun(resetDataId);
  };
  return (
    <>
      <Modal
        className="modal send-confirm"
        id="delete-confirm"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={onCloseCross}
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
              <button
                type="button"
                className="btn btn-primary btn-filled"
                onClick={handleCollection}
              >
                {popupMessage?.footerButton}
              </button>

              <button
                type="button"
                className="btn btn-primary btn-bordered"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CommonConfirmModel;
