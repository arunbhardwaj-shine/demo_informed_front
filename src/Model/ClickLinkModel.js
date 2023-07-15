import React, { useState } from "react";
import { Dropdown, DropdownButton, Modal, Form, Button} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const ClickLinkModel = ({
  show,
  onClose,
  heading,
  data,
  footerButton,
  handleSubmit,
  handleQR,
}) => {
    const navigate = useNavigate();
    const [uploadNewVideo, setUploadNewVideo] = useState(false);
    const [changeEmbeddedVideo, setChangeEmbeddedVideo] = useState("");
    const [chapterSelect, setChapterSelect] = useState("");
    const [videoSelect, setVideoSelect] = useState("");


    const onUploadNewVideoClicked = () => {
      setUploadNewVideo(true);
    };

    const onChangeEmbeddedVideo = (event) => {
      setChangeEmbeddedVideo(event);
    };

    const onChapterSelect = (event) => {
      setChapterSelect(event);
    };

    const onVideoSelect = (event) => {
      setVideoSelect(event);
    };

    const handleClose = () => {
      onClose();
    }

  return (
    <>
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
              {/* <ReactSelect
                placeholder="Select your chapter"
                options={types}
                className="dropdown-basic-button split-button-dropup"
                isClearable
              /> */}
              <DropdownButton
                className="dropdown-basic-button split-button-dropup "
                title={
                  chapterSelect != "" ? chapterSelect : "Select your chapter"
                }
                onSelect={(event) => onChapterSelect(event)}
              >
                <div className="scroll_div">
                  <Dropdown.Item
                    eventKey="Chapter 1"
                    className={chapterSelect == "Chapter 1" ? "active" : ""}
                  >
                    Chapter 1
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Chapter 2"
                    className={chapterSelect == "Chapter 2" ? "active" : ""}
                  >
                    Chapter 2
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Chapter 3"
                    className={chapterSelect == "Chapter 3" ? "active" : ""}
                  >
                    Chapter 3
                  </Dropdown.Item>
                </div>
              </DropdownButton>
            </Form.Group>
          </div>
          <div className="side-step-text second-step">
            <div className="embedded-video-step">
              <h2>Step2</h2>
            </div>
            <p>
              Select the video and highlight the area you want to embed the
              video in{" "}
            </p>
            <Form.Group className="formgroup">
              <Form.Label>
                Videos <span>*</span>
              </Form.Label>
              <DropdownButton
                className="dropdown-basic-button split-button-dropup "
                title={videoSelect != "" ? videoSelect : "Select your video"}
                onSelect={(event) => onVideoSelect(event)}
              >
                <div className="scroll_div">
                  <Dropdown.Item
                    eventKey="Video 1"
                    className={videoSelect == "Video 1" ? "active" : ""}
                  >
                    Video 1
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Video 2"
                    className={videoSelect == "Video 2" ? "active" : ""}
                  >
                    Video 2
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Video 3"
                    className={videoSelect == "Video 3" ? "active" : ""}
                  >
                    Video 3
                  </Dropdown.Item>
                </div>
              </DropdownButton>

              <div className="upload-file-box">
                <Button
                  className="btn-filled"
                  onClick={onUploadNewVideoClicked}
                >
                  Upload new Video +
                </Button>
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
          // onClick={handleClose}
          onClick={() => navigate("/edit-Consent-Options")}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={uploadNewVideo} className="send-confirm" id="download-qr">
      <Modal.Header>
        <h5 className="modal-title" id="staticBackdropLabel">
          Change Embedded Video
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          onClick={() => {
            setUploadNewVideo(false);
          }}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="">Video</label>
          <DropdownButton
            className="dropdown-basic-button split-button-dropup "
            title={
              changeEmbeddedVideo != ""
                ? changeEmbeddedVideo
                : "Select your video"
            }
            onSelect={(event) => onChangeEmbeddedVideo(event)}
          >
            <div className="scroll_div">
              <Dropdown.Item
                eventKey="Change Video 1"
                className={
                  changeEmbeddedVideo == "Change Video 1" ? "active" : ""
                }
              >
                Change Video 1
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="Change Video 2"
                className={
                  changeEmbeddedVideo == "Change Video 2" ? "active" : ""
                }
              >
                Change Video 2
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="Change Video 3"
                className={
                  changeEmbeddedVideo == "Change Video 3" ? "active" : ""
                }
              >
                Change Video 3
              </Dropdown.Item>
            </div>
          </DropdownButton>
        </div>
      </Modal.Body>

      <div className="modal-footer">
        <button
          type="button"
          disabled={changeEmbeddedVideo == "" ? true : false}
          className="btn btn-primary save btn-filled"
          onClick={() => setUploadNewVideo(false)}
        >
          Apply
        </button>
      </div>
    </Modal>
    </>
  );
};

export default ClickLinkModel;
