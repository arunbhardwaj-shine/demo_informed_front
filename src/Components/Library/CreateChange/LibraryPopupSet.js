import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactSelect from "react-select";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const LibraryPopupSet = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button>

            <Modal className="pdf-video-link" show={show} onHide={handleClose}>
              <Modal.Header>
                <div className="form_action embedding-video">
                  <div className="side-step-text first-step">
                    <div className="embedded-video-step">
                      <h2>Step1</h2>
                    </div>
                    <p>Select the chapter </p>
                    <Form.Group className="formgroup">
                      <Form.Label>Chapters</Form.Label>
                      <ReactSelect
                        placeholder="Select your chapter"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                    </Form.Group>
                  </div>
                  <div className="side-step-text second-step">
                    <div className="embedded-video-step">
                      <h2>Step2</h2>
                    </div>
                    <p>
                      Select the video and highlight the area you want to embed
                      the video in{" "}
                    </p>
                    <Form.Group className="formgroup">
                      <Form.Label>Videos *</Form.Label>
                      <ReactSelect
                        placeholder="Select your chapter"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                      <div className="upload-file-box">
                        <input
                          type="file"
                          name="file-10[]"
                          id="file-10"
                          className="inputfile inputfile-6"
                          accept=".mp4"
                        />
                        <label htmlFor="file-10">
                          <span>Upload new Video +</span>
                        </label>
                      </div>
                    </Form.Group>
                  </div>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div className="modal-body-content">
                  <img src={path_image + "pdf-dummy.png"} alt="Close-filter" />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="btn-bordered"
                  variant="secondary"
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  className="btn-filled"
                  variant="primary"
                  onClick={handleClose}
                >
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default LibraryPopupSet;
