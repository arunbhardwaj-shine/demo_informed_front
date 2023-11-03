import { Modal } from "react-bootstrap";

const MessageModelLog = ({
    show=true,
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
          className="send-confirm view-modal"
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
  
              </h4>
              */
  
                footerButton !== ""
                ?
                <>
                  {data != "" ? <p id="message_change">{data}</p> : null}
                  {/* <button
                    type="button"
                    className="btn btn-primary save btn-filled"
                    onClick={() => {
                      handleSubmit();
  
                      onClose();
                    }}
                  >
                    {footerButton}
                  </button> */}
                </>
                :null
            }
  
          </Modal.Body>
        </Modal>
      </>
    );
  };
  export default MessageModelLog;
