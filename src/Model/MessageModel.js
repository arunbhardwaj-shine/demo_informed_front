import React, { useState } from "react";
import { Dropdown, DropdownButton, Modal, Form } from "react-bootstrap";

const MessageModel = ({
  show,
  onClose,
  heading,
  data,
  footerButton,
  handleSubmit,
  handleQR,
}) => {
  // const handleClose = () => {
  //   onClose(false);
  // };

  return (
    <>
      <Modal
        show={show}
        className="send-confirm"
        id="message_modal"
      >
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            {heading}
          </h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={onClose}
          ></button>
        </Modal.Header>
        <Modal.Body>
          {
            /*
            <h4 className="message"
            onClick={() => {handleClose();}}>
            {data}
            </h4>
            */

              footerButton !== ""
              ?
              <button
                type="button"
                className="btn btn-primary save btn-filled"
                onClick={() => {
                  handleSubmit();

                  onClose();
                }}
              >
                {footerButton}
              </button>
              :null
          }

        </Modal.Body>
      </Modal>
    </>
  );
};

export default MessageModel;
