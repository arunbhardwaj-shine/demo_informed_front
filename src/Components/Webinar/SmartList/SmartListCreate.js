import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { loader } from "../../../loader";
import { BaseApi } from "../../../Api/BaseApi";

import axios from "axios";
import { popup_alert } from "../../../popup_alert";

const SmartListCreate = () => {
  const baseURL = BaseApi.getBaseURL();
  let path_image = process.env.REACT_APP_ASSETS_PATH_WEBINAR;
  const location = useLocation();
  const navigate = useNavigate();
  let file_name = useRef("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);
  const [smartListName, setSmartListName] = useState("");
  const [smartListId, setSmartListId] = useState();
  const [data, setData] = useState([]);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [creatorName, setCreatorName] = useState(localStorage.getItem("username"));

  const handleClose = () => {
    setShow(false);
    setSelectedFile(null);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSmartListName = async (event) => {
    setSmartListName(event);
    if (event == "") {
      setShowValidationMessage(true);
    } else {
      setShowValidationMessage(false);
    }
  };

  const segmentCohort = (listId) => {
    console.log(smartListName)
    localStorage.setItem("SmartListIdView",listId)
    localStorage.setItem("SmartListIdViewName",smartListName)
    //console.log(smartListId);
    if (!smartListName.trim()) {
      // toast.warning("Please enter the smart list name first.");

      setShowValidationMessage(true);
    } else {
      navigate("/webinar/email/SmartListCreate/FilterList")
    }
  };

  const closeClicked = () => {
    navigate("/webinar/email/WebinarSmartList");
  };

  const createSmartList = async () => {

    if (!smartListName.trim()) {
      setShowValidationMessage(true);
      //  toast.warning("Please enter the Smart list name first");
      return;
    }

    const body = {
      name: smartListName,
      creator:creatorName,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };
    loader("show");
    await axios
      .post(
        baseURL + `/smart-list/create`,body,{ headers})
      .then((res) => {
        if (res.data.code == 200) {
          // console.log(res);
          setSmartListId(res.data.data.smart_list_id);
          handleShow();
          loader("hide");
        } else {
          toast.warning(res.data.message);
          loader("hide");
        }
        //  console.log(res);
      })
      .catch((err) => {
        // toast.error("Please try again")
        loader("hide");
      });
  };

  const createSmartListCohort = async () => {
    if (!smartListName.trim()) {
      // toast.warning("Please enter the Smart list name first");
      setShowValidationMessage(true);
      return;
    }
 
  

    const body = {
      name: smartListName,
      creator:creatorName,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };
    // console.log(smartListName)
// console.log(selectedFile)
    loader("show");
    await axios
      .post(
        baseURL + `/smart-list/create`,
        body,
        { headers }
      )
      .then((res) => {
        if (res.data.code == 200) {

          // console.log(res.data.data.smart_list_id);
          setSmartListId(res.data.data.smart_list_id);
          segmentCohort(res.data.data.smart_list_id);
          loader("hide");
        } else {
          toast.warning(res.data.message);
          loader("hide");
        }
        //  console.log(res);
      })
      .catch((err) => {
        loader("hide");
      });
  };

  const handleShow = (e) => {
    // e.preventDefault();
    // console.log("inside handle show");
    if (!smartListName.trim()) {
      // toast.warning("Please enter the smart list name first");
      setShowValidationMessage(true);
    } else {
      setShow(true);
    }
  };

  const uploadFile = async () => {
    setShow(false);
    if (selectedFile === null) {
      toast.warning("Please upload file first");
      return false;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };
    let formData = new FormData();
    formData.append("smart_list_id", smartListId);
    formData.append("file", selectedFile);
    // formData.append("event_id", selectedFile);

// console.log(smartListId)
// console.log(selectedFile)
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    // loader("show");

    // console.log(formData);

    await axios
      .post(baseURL + `/upload-unregistered-participant`, formData, { headers })
      .then((res) => {
        //  console.log(smartListId);
        // console.log(res);
        if (res.data.code === 200) {
          setData(res.data.data);
          navigate("/webinar/email/SmartListCreate/ExcelUpload", {
            state: {
              data: res.data.data,
              smartListId: smartListId,
            },
          });

          //setapi_flag(api_flag + 1);
        } else {
          toast.warning(res.data.message)
          // popup_alert({
          //   visible: "show",
          //   message: res.data.message,
          //   type: "error",
          // });
        }
      })
      .catch((err) => {
        loader("hide");
      });
  };

  const downloadFile = () => {
    let link = document.createElement("a");
    link.href = "https://informed.pro/sample.xls";
    link.setAttribute("download", "file.xlsx");
    document.body.appendChild(link);
    link.download = "";
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
        <div className="loader" id="custom_loader">
          <span className="loader-view"> </span>
        </div>
      <div className="right-sidebar col">
        <ToastContainer />
        <div className="page-top-nav smart_list_names">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
            </div>
            <div className="col-12 col-md-10">
              <ul className="tabnav-link">
                <li className="active active-main">
                  <a href="javascript:void(0)">Create smart list</a>
                </li>
                <li className="">
                  <a href="javascript:void(0)">Select & Verify Your HCPs</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-1">
              <div className="header-btn-right">
                <button
                  className="btn btn-primary btn-bordered light"
                  onClick={closeClicked}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <section className="create_smart_list">
          <div className="create_smart_list_inset">
            <div className="create-smart-step">
              <h2>STEP1</h2>
              <div className="create-smart-step-box">
                <form>
                  <div className="row justify-content-between align-items-end">
                    <div className="form-group col">
                      <label for="smart-list-name">Enter smart list name</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        value={smartListName}
                        onChange={(event) =>{setCreatorName(localStorage.getItem("username")); handleSmartListName(event.target.value)}}
                      />
                      {showValidationMessage ? (
                        <p style={{ color: "red" }}>
                          Smart list name is required
                        </p>
                      ) : null}{" "}
                    </div>
                    <div class="form-group col">
                    <label for="creator-name">Creator’s Name</label>
                    <input
                      type="text"
                      class="form-control"
                       value={creatorName}
                       onChange={(event) => setCreatorName(event.target.value)}
                    />
                  </div>
                    <div className="form-group col-sm-12">
                      <div className="form-group-content">
                        <p>
                          I want this to be a <span>Demo list</span>
                        </p>
                        <div className="select-demo-option">
                          <input type="checkbox" name="checkbox" />
                          <span className="checkmark"></span>
                        </div>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Step to create smart list"
                        >
                          <img src={path_image + "question.svg"} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="create-smart-step">
              <h2>STEP2</h2>
              <div className="create-smart-step-box">
                <h5>How do you want to create your smart list ?</h5>
                <ul>
                  <li>
                    <div className="send-option-img">
                      <input
                        type="radio"
                        name="select-option-hcp"
                        onClick={(e) => {
                          createSmartListCohort();
                        }}
                      />
                      <img
                        src={path_image + "group-hcp.svg"}
                        alt="Group HCPs"
                      />
                    </div>
                    <p>Segment from current cohost </p>
                  </li>
                  <li>
                    <div
                      className="send-option-img"
                      data-bs-toggle="modal"
                      data-bs-target="#upload-confirm"
                    >
                      <input
                        type="radio"
                        name="select-option-hcp"
                        onClick={(e) => {
                          createSmartList();
                        }}
                      />
                      <img
                        src={path_image + "upload-btn.svg"}
                        alt="Single HCP"
                      />
                    </div>
                    <p>Upload new HCPs</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="download-sample">
              <p>Download sample Excel file to upload new HCPs</p>
              <button
                className="btn btn-primary btn-bordered"
                onClick={downloadFile}
              >
                Download File
              </button>
            </div>
          </div>
        </section>
      </div>

      <Modal
        className="send-confirm"
        id="upload-confirm"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <h4>Upload File</h4>
          <button
            type="button"
            onClick={handleClose}
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div class="upload-file-box">
            <div class="box">
              <input
                type="file"
                name="file-4[]"
                id="file-4"
                class="inputfile inputfile-3"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={onFileChange}
                data-multiple-caption="{count} files selected"
                ref={file_name}
              />
              {file_name.current?.files === undefined ||
              file_name.current.files?.length === 0 ? (
                <>
                  <label for="file-4">
                    <span>Choose Your File</span>
                  </label>
                  <p>Upload your new list file</p>
                </>
              ) : (
                <h5>{file_name.current.files[0].name}</h5>
              )}
            </div>
          </div>
          <div class="modal-buttons">
            {file_name.current?.files === undefined ||
            file_name.current.files?.length === 0 ? (
              <>
                {" "}
                <button
                  type="button"
                  class="btn btn-primary btn-bordered light"
                  data-bs-dismiss="modal"
                >
                  Upload
                </button>
              </>
            ) : (
              <button
                type="button"
                class="btn btn-primary"
                onClick={uploadFile}
                data-bs-dismiss="modal"
              >
                Upload
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default SmartListCreate;
