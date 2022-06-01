import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { loader } from "../../../loader";

import axios from "axios";
import { popup_alert } from "../../../popup_alert";

let path = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const SmartListCreate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let file_name = useRef("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);
  const [smartListName, setSmartListName] = useState("");
  const [smartListId, setSmartListId] = useState();
  const [data, setData] = useState();

  const handleClose = () => {
    setShow(false);
    setSelectedFile(null);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSmartListName = async (event) => {
    setSmartListName(event.target.value);
  };

  const segmentCohort = () => {
    if (!smartListName.trim()) {
      toast.warning("Please enter the smart list name first.");
    } else {
      navigate("/webinar/FilterList", {
        state: { smartListName: smartListName },
      });
    }
  };

  const closeClicked = () => {
    navigate("/webinar/WebinarSmartList");
  };

  const createSmartList = async () => {
    if (!smartListName.trim()) {
      toast.warning("Please enter the Smart list name first");
      return;
    }

    const body = {
      name: smartListName,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };
    await axios
      .post(
        `http://51.89.210.56:8000/api/smart-list/create`,

        body,
        { headers }
      )
      .then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          setSmartListId(res.data.data.smart_list_id);
          handleShow();
        } else {
          toast.warning(res.data.message);
        }

        //  console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createSmartListCohort = async () => {
    if (!smartListName.trim()) {
      toast.warning("Please enter the Smart list name first");
      return;
    }

    const body = {
      name: smartListName,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };
    await axios
      .post(
        `http://51.89.210.56:8000/api/smart-list/create`,

        body,
        { headers }
      )
      .then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          setSmartListId(res.data.data.smart_list_id);
          segmentCohort();
        } else {
          toast.warning(res.data.message);
        }

        //  console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShow = (e) => {
    // e.preventDefault();
    console.log("inside handle show");
    if (!smartListName.trim()) {
      toast.warning("Please enter the smart list name first");
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

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    // loader("show");

    console.log(formData);

    await axios
      .post(
        `http://51.89.210.56:8000/api/upload-unregistered-participant`,
        formData,
        { headers }
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          setData(res.data.data);
          navigate("/webinar/ExcelUpload", {
            state: {
              data: res.data.data,
              smartListName: smartListName,
            },
          });

          //setapi_flag(api_flag + 1);
        } else {
          popup_alert({
            visible: "show",
            message: res.data.message,
            type: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
      <popup_alert />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
      <div class="right-sidebar">
        <div class="page-top-nav smart_list_names">
          <div class="row justify-content-end align-items-center">
            <div class="col-12 col-md-11">
              <ul class="tabnav-link">
                <li class="active">
                  <a href="javascript:void(0)">Create smart list</a>
                </li>
                <li class="">
                  <a href="javascript:void(0)">?</a>
                </li>
              </ul>
            </div>
            <div class="col-12 col-md-1">
              <div class="header-btn-right">
                <button
                  class="btn btn-primary btn-bordered light"
                  onClick={closeClicked}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <section class="create_smart_list">
          <div class="create_smart_list_inset">
            <div class="create-smart-step">
              <h2>STEP1</h2>
              <div class="create-smart-step-box">
                <form>
                  <div class="row justify-content-between align-items-center">
                    <div class="form-group col">
                      <label for="smart-list-name">Enter smart list name</label>
                      <input
                        type="text"
                        class="form-control"
                        value={smartListName}
                        onChange={(event) => handleSmartListName(event)}
                      />
                    </div>

                    <div class="form-group col-sm-12">
                      <div class="form-group-content">
                        <p>
                          I want this to be a <span>Demo list</span>
                        </p>
                        <div class="select-demo-option">
                          <input type="radio" name="radio" />
                          <span class="checkmark"></span>
                        </div>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Step to create smart list"
                        >
                          <img src={path + "question.svg"} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="create-smart-step">
              <h2>STEP2</h2>
              <div class="create-smart-step-box">
                <h5>How do you want to create your smart list ?</h5>
                <ul>
                  <li>
                    <div class="send-option-img group-opt">
                      <input
                        type="radio"
                        name="select-option-hcp"
                        id="segment"
                        onClick={(e) => {
                          createSmartListCohort();
                        }}
                      />
                      <img src={path + "group-hcp.svg"} alt="Group HCPs" />
                    </div>
                    <p>Segment from current cohort </p>
                  </li>
                  <li>
                    <div
                      class="send-option-img upload-opt"
                      data-bs-toggle="modal"
                      data-bs-target="#upload-confirm"
                    >
                      <input
                        type="radio"
                        onClick={(e) => {
                          createSmartList();
                        }}
                        name="select-option-hcp"
                      />
                      <img src={path + "upload-btn.svg"} alt="Single HCP" />{" "}
                      {/* {filename != "" ? <p>{filename}</p> : null} */}
                    </div>
                    <p>Upload new HCPs</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="download-sample">
              <p>Download sample Excel file to upload new HCPs</p>
              <div class="upload-btn" onClick={downloadFile}>
                Download File
              </div>
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
                  <p>Upload your excel file</p>
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
