import React, { useState } from "react";
import Select from "react-select";
import { Link,useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-bootstrap/Modal";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { createContent } from "../../CommonComponent/Validations";
import { Button, Form, Dropdown, DropdownButton } from "react-bootstrap";
import {postFormData} from "../../../axios/apiHelper"
import {ENDPOINT} from "../../../axios/apiConfig"
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const LibraryCreateUser = () => {
  const [counterFlag, setCounterFlag] = useState(0);
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [image, setImage] = useState({});
  const [userInputs, setCreateLibraryInputs] = useState({
     "expDatetime":new Date(),
  });
  const [chapter, setChapter] = useState([
    {
      chapterTitle: "",
      uploadFile: "",
      fileValue:""
    },
  ]);

  const [countryAll, setCountryAll] = useState([
    { value: "India", label: "India" },
    { value: "Australia", label: "Australia" },
    { value: "Russia", label: "Russia" },
  ]);

  const [productionAll, setProductionAll] = useState([
    { value: "production1", label: "production1" },
    { value: "production2", label: "production2" },
    { value: "production3", label: "production3" },
  ]);

  const [sales, setSales] = useState("");
  const [salesAll, setSalesAll] = useState([
    { value: "sales1", label: "sales1" },
    { value: "sales2", label: "sales2" },
    { value: "sales3", label: "sales3" },
  ]);

  const [ePrintType, setePrintType] = useState([
    { value: "pdf", label: "PDF" },
    { value: "video", label: "video" },
    { value: "eBook", label: "eBook" },
  ]);


  const [chapterSelect, setChapterSelect] = useState("");
  const [videoSelect, setVideoSelect] = useState("");
  const [uploadNewVideo, setUploadNewVideo] = useState(false);
  const [changeEmbeddedVideo, setChangeEmbeddedVideo] = useState("");


  const handleChange = (e, isSelectedName) => {
    if (e?.target?.files?.length < 1) {
      return;
    }
    setCreateLibraryInputs({
      ...userInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e?.target?.files
          : e
        : e?.target?.value,
    });
  };

  const nextButtonClicked = async(e) => {
    e.preventDefault();
    const err = createContent(userInputs);

    if (Object.keys(err)?.length) {
      console.log("- im err",err)

      setError(err);
      return;
    } else {
   
      let formData = new FormData();
      formData.append("keyAuthor", userInputs?.keyAuthor);
      formData.append("expDatetime", userInputs?.expDatetime);
      formData.append("limit", userInputs?.limitOfUsage);
      formData.append("file", userInputs?.uploadFile[0]);
      formData.append("title", userInputs?.contentTitle)
      formData.append("fileType", userInputs?.docintelFormat)
      formData.append("ebookData", chapter)
      formData.append("createdBy", 18207)
      await postFormData(ENDPOINT.LIBRARYCREATE,formData,{
        header:{
          "Content-Type": "multipart/form-data",
        }
      });
    }
  };

  const addMoreChClicked = () => {
    const status = chapter.map((data) => {
      if (data.chapterTitle == "") {
        return "false";
      } else {
        return "true";
      }
    });

    if (status.every((element) => element == "true")) {
      setChapter([
        ...chapter,
        {
          chapterTitle: "",
          uploadFile: "",
        },
      ]);
    } else {
      toast.warning("Please input the chapter title atleast!");
    }
  };

  const deleteRecord = (i) => {
    const list = chapter;

    list.splice(i, 1);

    setChapter(list);
    setCounterFlag(counterFlag + 1);
  };
 
  const includeVideoCheckboxChanged = (e) => {
    if (e.target.checked == true) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  const onChapterTitleChange = (e, i) => {
    const { value } = e.target;
    const list = [...chapter];
    const name = chapter[i].chapterTitle;
    list[i].chapterTitle = value;
    setChapter(list);
  };

  const handleOnEbookChange = (e, i) => {
    const value = e.target.files[0]?.name;
    const list = [...chapter];
    list[i].fileValue = e.target.files[0];
    list[i].uploadFile = value;
    setChapter(list);
  };

  const onChapterSelect = (event) => {
    setChapterSelect(event);
  };

  const onVideoSelect = (event) => {
    setVideoSelect(event);
  };

  const onUploadNewVideoClicked = () => {
    setUploadNewVideo(true);
  };
  const onChangeEmbeddedVideo = (event) => {
    setChangeEmbeddedVideo(event);
  };

  return (
    <>
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
            <div className="page-top-nav">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    <button className="btn btn-primary btn-bordered back">
                      <Link to="/library-create">Back</Link>
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">
                    <li className="active active-main">
                      <a href="">Create Your Content</a>
                    </li>
                    <li className="">
                      <a href="">Edit Consent Option</a>
                    </li>
                    <li className="">
                      <a href="">Approve Your Content &amp; Publish</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <button className="btn btn-primary btn-bordered move-draft">
                      Cancel
                    </button>

                    <button
                      className="btn btn-primary btn-filled next"
                      onClick={nextButtonClicked}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="create-change-content">
              <div className="form_action">
                <h4>Who is involved</h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="">Company</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => onCompanyChange(event)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Country</label>
                      <Select
                        options={countryAll}
                        placeholder="Select country"
                        onChange={(event) => onCountryChange(event)}
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Client product</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => onClientProductChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Production</label>
                      <Select
                        options={productionAll}
                        placeholder="Select own production person"
                        onChange={(event) => onProductionChange(event)}
                        className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                        isClearable
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Sales</label>
                      <Select
                        options={salesAll}
                        placeholder="Who made the sale?"
                        onChange={(event) => onSalesChange(event)}
                        className="dropdown-basic-button split-button-dropup edit-sales-dropdown"
                        isClearable
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex justify-content-end align-items-end right-change">
                    <div className="form-group justify-content-end">
                      <label htmlFor="">Reseller</label>
                      <div className="form-check-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            value=""
                            id="flexCheckDefault"
                            type="checkbox"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            N/A
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            value=""
                            id="flexCheckReseller"
                            type="checkbox"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckReseller"
                          >
                            Reseller Name
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            value=""
                            id="flexCheckReseller1"
                            type="checkbox"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckReseller1"
                          >
                            Reseller Name
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            value=""
                            id="flexCheckReseller2"
                            type="checkbox"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckReseller2"
                          >
                            Reseller Name
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="create-change-content">
              <div className="form_action">
                <h4>Limits agreed</h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                    {/* <div className="form-group">
                      <label htmlFor="">Cost centre</label>
                      <Select
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                        placeholder="Select cost center"
                      />
                    </div> */}
                    <div className="form-group">
                      <label htmlFor="">Expiration date</label>
                      <DatePicker
                        selected={userInputs?.expDatetime}
                        name="expDatetime"
                        onChange={(e)=>handleChange(e,"expDatetime")}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Set limit of usage</label>
                      <input
                        type="text"
                        name="limitOfUsage"
                        className="form-control"
                        placeholder="“0” value means unlimited limit"
                        onChange={handleChange}
                      />
                      {error?.limitOfUsage ? (
                        <div className="login-validation">
                          {error?.limitOfUsage}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Enable</label>
                      <fieldset id="group2">
                        <input
                          type="checkbox"
                          value="value1"
                          name="group2"
                          id="limitagreed1"
                        />
                        <label htmlFor="limitagreed1">Print</label>
                        <input
                          type="checkbox"
                          value="value2"
                          name="group2"
                          id="limitagreed2"
                        />
                        <label htmlFor="limitagreed2">Download</label>
                        <input
                          type="checkbox"
                          value="value3"
                          name="group2"
                          id="limitagreed3"
                        />
                        <label htmlFor="limitagreed3">Share</label>
                      </fieldset>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex justify-content-end align-items-start right-change">
                    <div className="form-group justify-content-end">
                      <label htmlFor="">Invoice notes</label>
                      <textarea
                        className="form-control"
                        id="formControlTextarea"
                        rows="5"
                        placeholder="Please type your notes here.."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-change-content">
              <div className="form_action">
                <h4>Creating the eprint</h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group val">
                      <label htmlFor="">Content title *</label>
                      <input
                        type="text"
                        name="contentTitle"
                        className="form-control"
                        // onChange={(e) => contentTitleChanged(e)}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      {error?.contentTitle ? (
                        <div className="login-validation">
                          {error?.contentTitle}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Journal title</label>
                      <input
                        type="text"
                        name="journalTitle"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Author</label>
                      <input
                        type="text"
                        name="keyAuthor"
                        className="form-control"
                        onChange={
                          handleChange
                        }
                      />
                    </div>
                    <div className="form-group val">
                      <label htmlFor="">Docintel format *</label>
                      <Select
                        className="dropdown-basic-button split-button-dropup"
                        options={ePrintType}
                        isClearable
                        placeholder="Select type of Docintel format "
                        onChange={(event) =>
                          handleChange(event?.value, "docintelFormat")
                        }
                      />
                      {error?.docintelFormat ? (
                        <div className="login-validation">
                          {error?.docintelFormat}
                        </div>
                      ) : null}
                    </div>

                    {userInputs.docintelFormat == "pdf" ? (
                      <div className="form-group val">
                        <label htmlFor="">Upload PDF</label>
                        <div className="upload-file-box">
                          <div className="box">
                            <input
                              type="file"
                              name="file-6[]"
                              id="file-6"
                              className="inputfile inputfile-6"
                              accept="application/pdf"
                              // onChange={(e) => handleFileChange(e)}
                              onChange={(e) => handleChange(e, "uploadFile")}
                            />
                            <label htmlFor="file-6">
                              <span>Choose Your File</span>
                            </label>
                            {userInputs?.uploadFile?.[0]?.name ? (
                              <h5>{userInputs?.uploadFile?.[0].name}</h5>
                            ) : (
                              <p>Upload your PDF</p>
                            )}

                            {/* <p>
                              {selectedPdfName == ""
                                ? "Upload your PDF"
                                : selectedPdfName}{" "}
                            </p> */}
                          </div>
                        </div>
                        {error?.uploadPdf ? (
                          <div className="login-validation-upload">
                            {error?.uploadPdf}
                          </div>
                        ) : null}
                      </div>
                    ) : // : ePrint == "video" ? (
                    userInputs.docintelFormat == "video" ? (
                      <div className="form-group val">
                        <label htmlFor="">Upload video</label>
                        <div className="upload-file-box">
                          <div className="box">
                            <input
                              type="file"
                              name="file-6[]"
                              id="file-6"
                              className="inputfile inputfile-6"
                              accept="video/*"
                              // onChange={(e) => handleVideoChange(e)}
                              onChange={(e) => handleChange(e, "uploadFile")}
                            />
                            <label htmlFor="file-6">
                              <span>Choose Your File</span>
                            </label>
                            {userInputs?.uploadFile?.[0]?.name ? (
                              <h5>{userInputs?.uploadFile?.[0].name}</h5>
                            ) : (
                              <p>Upload your Video file</p>
                            )}
                            {/* <p>
                              {selectedVideoName == ""
                                ? "Upload your Video file"
                                : selectedVideoName}{" "}
                            </p> */}
                          </div>
                        </div>
                        {error?.uploadFile ? (
                          <div className="login-validation-upload">
                            {error?.uploadFile}
                          </div>
                        ) : null}
                      </div>
                    ) : // ePrint == "eBook" ? (
                    userInputs.docintelFormat == "eBook" ? (
                      chapter.map((val, i) => {
                        return (
                          <>
                            <div className="form-group val chapter-title">
                              <div className="ebook-format">
                                <label htmlFor="">Chapter title {i + 1}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => onChapterTitleChange(e, i)}
                                  value={val.chapterTitle}
                                />
                                <div className="upload-file-box">
                                  <div className="box">
                                    <input
                                      type="file"
                                      name={`file-${i}`}
                                      id={`file-${i}`}
                                      className="inputfile inputfile-6"
                                      accept="application/pdf"
                                      onChange={(e) =>
                                        handleOnEbookChange(e, i)
                                      }
                                    />
                                    <label htmlFor={`file-${i}`}>
                                      <span>Choose Your File</span>
                                    </label>

                                    <p>
                                      {val.uploadFile == ""
                                        ? "Upload your PDF file"
                                        : val.uploadFile}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="chapter-btn-wrapper">
                                <Button
                                  className="btn btn-primary btn-bordered btn-voilet move-draft chappter-add-btn"
                                  onClick={addMoreChClicked}
                                >
                                  Add Ch +
                                </Button>

                                {chapter.length > 1 ? (
                                  <Button
                                    className="dlt_btn"
                                    onClick={() => deleteRecord(i)}
                                  >
                                    <img
                                      src={path_image + "delete.svg"}
                                      alt="Delete Row"
                                    />
                                  </Button>
                                ) : null}
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : // <div className="form-group val">
                    //   <label htmlFor="">Upload Ebook</label>
                    //   <div className="upload-file-box">
                    //     <div className="box">
                    //       <input
                    //         type="file"
                    //         name="file-6[]"
                    //         id="file-6"
                    //         className="inputfile inputfile-6"
                    //         accept="application/pdf"
                    //         onChange={(e) => handleEbookChange(e)}
                    //       />
                    //       <label htmlFor="file-6">
                    //         <span>Choose Your File</span>
                    //       </label>
                    //       <p>
                    //         {selectedEbookName == ""
                    //           ? "Upload your Ebook file"
                    //           : selectedEbookName}{" "}
                    //       </p>
                    //     </div>
                    //   </div>
                    //   {error?.pdfFile ? (
                    //     <div className="login-validation-upload">
                    //       {error?.pdfFile}
                    //     </div>
                    //   ) : null}
                    // </div>
                    null}

                    <div className="form-group">
                      <label htmlFor="">Include video</label>
                      <div className="switch">
                        <label className="switch-light">
                          <input
                            type="checkbox"
                            onChange={(e) => includeVideoCheckboxChanged(e)}
                          />
                          <span>
                            <span className="switch-btn active">No</span>
                            <span className="switch-btn">Yes</span>
                          </span>
                          <a className="btn"></a>
                        </label>
                      </div>
                      {checked == false ? (
                        <Button
                          className="btn-bordered btn-voilet"
                          onClick={handleShow}
                        >
                          click to embed your Videos{" "}
                        </Button>
                      ) : (
                        false
                      )}
                    </div>
                    <div className="form-group val">
                      <label htmlFor="">Content cover</label>
                      <div className="upload-file-box">
                        <div className="box">
                          <input
                            type="file"
                            name="file-5[]"
                            id="file-5"
                            className="inputfile inputfile-5"
                            accept="image/png, image/jpeg"
                            // onChange={(e) => handleImageChange(e, "image")}
                          />
                          <label htmlFor="file-5">
                            <span>Choose Your File</span>
                          </label>
                          {/* {image?.image?.[0]?.name ? (
                            <h5>{image?.image?.[0]?.name}</h5>
                          ) : (
                            <p>
                              Upload your cover image <br />
                              <span>(Recommended size 00 X 00)</span>
                            </p>
                          )} */}
                          {/* <p>
                            Upload your cover image
                            <br />
                            <span>(Recommended size 00 X 00)</span>
                          </p> */}
                        </div>
                      </div>
                      {/* {error?.image ? (
                        <div className="login-validation-upload">
                          {error?.image}
                        </div>
                      ) : null} */}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex justify-content-end align-items-start right-change">
                    <div className="form-group justify-content-end">
                      <label htmlFor="">
                        Production notes to Docintel team
                      </label>
                      <textarea
                        className="form-control"
                        id="formControlTextarea"
                        rows="5"
                        placeholder="Please type your notes here.."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                <Form.Label>Videos *</Form.Label>
                {/* <ReactSelect
                  placeholder="Select your chapter"
                  className="dropdown-basic-button split-button-dropup"
                  isClearable
                /> */}

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
                  {/* <input
                    type="file"
                    name="file-10[]"
                    id="file-10"
                    className="inputfile inputfile-6"
                    accept=".mp4"
                  />
                  <label htmlFor="file-10">
                    <span>Upload new Video +</span>
                  </label> */}
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
export default LibraryCreateUser;
