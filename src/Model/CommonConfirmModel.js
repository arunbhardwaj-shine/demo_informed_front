import React from "react";
import { Modal } from "react-bootstrap";

const CommonConfirmModel = ({
  show,
  onClose,
  deleteUser,
  popupMessage,
  path_image,
  deletestatus,
  resetDataId,
  resetCollectionFn,
}) => {
  const handleClose = () => {
    onClose(false);
  };
  const handleCollection = () => {
    resetCollectionFn(resetDataId);
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
            onClick={handleClose}
          ></button>
        </Modal.Header>

        <Modal.Body>
          <img src={path_image + "alert.png"} alt="" />
          <h4>
            {popupMessage.message1 ? popupMessage.message1 : ""}
            <br />

            {popupMessage.message2 ? popupMessage.message2 : ""}
          </h4>
          <div className="modal-buttons">
            {deletestatus ? (
              <button
                type="button"
                className="btn btn-primary btn-filled"
                onClick={deleteUser}
              >
                Yes Please!
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-filled"
                onClick={handleCollection}
              >
                Reset Collection
              </button>
            )}

            <button
              type="button"
              className="btn btn-primary btn-bordered light"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
      ;
    </>
  );
};

export default CommonConfirmModel;
