import { Viewer } from "@react-pdf-viewer/core";
import React, { useState, useMemo, useEffect } from "react";
import { Dropdown, DropdownButton, Modal, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const ClickLinkModel = ({
  show,
  onClose,
  chapterListing,
  ebook,
  videoListing,
  pdf,
  type,
}) => {
  const navigate = useNavigate();
  const [uploadNewVideo, setUploadNewVideo] = useState(false);
  const [changeEmbeddedVideo, setChangeEmbeddedVideo] = useState("");
  const [chapterSelect, setChapterSelect] = useState("");
  const [chapterOption, setChapterOption] = useState([]);
  const [videoListingData, setVideoListingData] = useState([]);

  const [videoSelect, setVideoSelect] = useState("");
  const [ebookData, setEbookData] = useState(ebook);
  const [file, setFile] = useState();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const defaultScale = 1.5;
  useEffect(() => {}, []);
  const onUploadNewVideoClicked = () => {
    setUploadNewVideo(true);
  };
  useEffect(() => {
    if (type == "ebook" && chapterListing?.length) {
      const newData = chapterListing?.map((item, index) => {
        return {
          label: item?.chapterTitle,
          value: item?.chapterTitle,
          index: index,
        };
      });
      setChapterOption(newData);
    } else if (type == "pdf" && pdf?.length) {
      setFile(URL.createObjectURL(pdf?.[0]));
    }
    if (videoListing?.length) {
      let newVideo = videoListing.map((item, index) => {
        return {
          label: item?.title,
          value: item?.title,
          index: index,
        };
      });
      setVideoListingData(newVideo);
      console.log("video Listing--->", videoListing);
    }
  }, [chapterListing, pdf]);
  const renderPage = (props: RenderPageProps) => {
    return (
      <>
        <div id={"canvas_page_" + props.pageIndex}>
          {props.canvasLayer.children}
        </div>

        <div style={{ userSelect: "none" }} id={"page_" + props.pageIndex}>
          {props.textLayer.children}
        </div>

        {props.annotationLayer.children}
      </>
    );
  };

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    const toolbar = document.querySelector(".viewer-layout-toolbar");

    const sidebar = document.querySelector(".viewer-layout-sidebar");

    if (toolbar) {
      toolbar.remove();
    }

    if (sidebar) {
      sidebar.remove();
    }
  };

  const onChangeEmbeddedVideo = (event) => {
    setChangeEmbeddedVideo(event);
  };

  const onChapterSelect = (e) => {
    setFile(URL.createObjectURL(ebook[e?.index]));

    // setChapterSelect(event);
  };

  const onVideoSelect = (e) => {
    console.log("---e--->", e);

    setVideoSelect(e);
  };

  const handleClose = () => {
    setChapterOption([]);
    setFile("");
    onClose();
  };

  const handleOnVideoChange = (event) => {
    const file = event.target.files[0];
    console.log("file--->", file);
    setSelectedVideo(file);
    // const value = e.target.files[0]?.name;
    // const list = [...chapter];
    // list[i].uploadFile = value;
    // ebookFile[i] = e.target.files[0];
    // setEbookFile(ebookFile);
    // setChapter(list);
  };

  const onVideoTitleChange = (e) => {
    console.log("in chapter title change");
    //  const { value } = e.target;
    //  const list = [...chapter];
    //  list[i].chapterTitle = value;
    //  setChapter(list);
  };

  return (
    <>
      <Modal className="pdf-video-link" show={show} onHide={handleClose}>
        <Modal.Header>
          <div className="form_action embedding-video">
            {chapterOption?.length ? (
              <div className="side-step-text first-step">
                <div className="embedded-video-step">
                  <h2>Step1</h2>
                </div>
                <p>{`Select the ${
                  chapterOption?.length ? "Chapter" : "Pdf"
                }`}</p>
                <Form.Group className="formgroup">
                  <Form.Label>{`Select the ${
                    chapterOption?.length ? "Chapter" : "Pdf"
                  }`}</Form.Label>
                  <Select
                    className="dropdown-basic-button split-button-dropup "
                    options={chapterOption}
                    onChange={onChapterSelect}
                  />
                </Form.Group>
              </div>
            ) : (
              ""
            )}

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
                {/* {console.log("-dfdf", videoListingData)} */}
                <Select
                  className="dropdown-basic-button split-button-dropup "
                  options={videoListingData}
                  onChange={onVideoSelect}
                />

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
          {file ? (
            <>
              <div className="modal-body-content">
                {/* <img src={path_image + "pdf-dummy.png"} alt="Close-filter" /> */}

                <Viewer
                  id="container"
                  renderPage={renderPage}
                  defaultScale={defaultScale}
                  onDocumentLoad={handleDocumentLoad}
                  renderMode="canvas"
                  fileUrl={
                    file
                    // "https://docintel.s3-eu-west-1.amazonaws.com/pdf/arunp/551689228346851.pdf"
                  }
                />
              </div>
            </>
          ) : null}
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
            Upload file
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
            <div className="form-group val chapter-title">
              <div className="ebook-format">
                <label htmlFor="">Video title</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => onVideoTitleChange(e)}
                />
                <div className="upload-file-box">
                  <div className="box">
                    <input
                      type="file"
                      name="videoFile"
                      id="videoInput"
                      className="inputfile inputfile-6"
                      // accept="video/*"
                      accept=".mp4"
                      onChange={handleOnVideoChange}
                    />
                    <label
                      htmlFor="videoInput"
                      // htmlFor={`file-${i}`}
                    >
                      <span>Choose Your File</span>
                    </label>

                    <p>
                      {selectedVideo === null ? (
                        "Upload your new list file"
                      ) : (
                        <p className="uploaded-file">{selectedVideo?.name}</p>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="chapter-btn-wrapper">
                {chapter.length - 1 == i ? (
                  <Button
                    className="btn btn-primary btn-bordered btn-voilet move-draft chappter-add-btn"
                    onClick={addMoreChClicked}
                  >
                    Add Ch +
                  </Button>
                ) : null}

                {chapter.length > 1 ? (
                  <Button
                    className="dlt_btn"
                    onClick={() => deleteRecord(i, val?.id)}
                  >
                    <img src={path_image + "delete.svg"} alt="Delete Row" />
                  </Button>
                ) : null}
              </div> */}

              {/* {error?.chapter?.[i] ? (
                <div className="login-validation-upload">
                  {error?.chapter?.[i]}
                </div>
              ) : null} */}
            </div>
            {/* <DropdownButton
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
            </DropdownButton> */}
          </div>
        </Modal.Body>

        <div className="modal-footer">
          <button
            type="button"
            disabled={selectedVideo === null ? true : false}
            className="btn btn-primary save btn-filled"
            onClick={() => setUploadNewVideo(false)}
          >
            Upload
          </button>
        </div>
      </Modal>
    </>
  );
};
export default React.memo(ClickLinkModel);
