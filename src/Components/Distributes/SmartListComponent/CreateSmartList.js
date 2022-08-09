import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, NavigationType } from "react-router-dom";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button, Modal } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { loader } from "../../../loader";
import { popup_alert } from "../../../popup_alert";
import * as XLSX from "xlsx";

import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CreateSmartList = () => {
  const percentage = 98;
  const [uploadOrDownloadCount, setUploadOrDownloadCount] = React.useState(0);
  const [fileLength, setFileLength] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPreogressBar, setShowProgressBar] = useState(false);
  let file_name = useRef("");
  const { creator } = location.state != null ? location.state : "";
  const [updateState, setUpdateState] = useState(0);
  const [show, setShow] = useState(false);
  const [smartListName, setSmartListName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [api_flag, setapi_flag] = useState(0);
  const [data, setData] = useState([]);
  const [activeClass, setActiveClass] = useState();
  const [filename, setFileName] = useState();
  const [rendervalidation, setRenderValidation] = useState(0);
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [validator] = React.useState(new SimpleReactValidator());

  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  const handleClose = () => {
    setShow(false);
    setSelectedFile(null);
  };
  const handleShow = () => {
    if (!smartListName.trim()) {
      toast.warning("Please enter the smart list name first");
    } else if (!creatorName.trim()) {
      toast.warning("Please enter the creator name");
    } else {
      setShow(true);
      var element = document.querySelector(".upload-opt");
      var element2 = document.querySelector(".group-opt");
      element2.classList.remove("active");
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      } else {
        element.classList.add("active");
      }
    }
  };

  const handleSmartListName = async (event) => {
    setSmartListName(event.target.value);
  };

  const handleCreatorName = async (event) => {
    setCreatorName(event.target.value);
  };

  const onFileChange = (event) => {
    var files = event.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      var data = event.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(dataParse);

      setFileLength(dataParse.length);
    };
    reader.readAsBinaryString(f);
    setSelectedFile(event.target.files[0]);
  };

  const saveButtonClicked = () => {
    console.log(data);
    if (selectedFile != null) {
      setShow(false);
      setFileName(selectedFile.name);
      toggleSelection("upload_excel");
    } else {
      toast.success("Please upload a file.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
      });
    }
  };

  const toggleSelection = (elm) => {
    var element = document.querySelector("." + elm);
    var element2 = document.querySelector(".upload-opt");
    element2.classList.remove("active");

    if (!smartListName.trim()) {
      toast.warning("Please enter the smart list name first.");
    } else if (!creatorName.trim()) {
      toast.warning("Please enter the creator name");
    } else {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      } else {
        element.classList.add("active");
      }
      navigate("/SmartListFilter", {
        state: { smartListName: smartListName, creatorName: creatorName },
      });
    }
  };

  const clickNext = (event) => {
    if (validator.allValid()) {
      if (activeClass == "upload_excel") {
        uploadFile();
      } else {
        navigate("/SmartListFilter", {
          state: { smartListName: smartListName },
        });
      }
    } else {
      console.log("show error messages");
      console.log(validator.errorMessages);
      validator.showMessages();
      setRenderValidation(rendervalidation + 1);
    }
    // navigate("/SmartListFilter", {state: { smartListName: "My test" }});
  };

  const closeClicked = () => {
    var x = localStorage.getItem("sd_i");
    if (x) {
      localStorage.removeItem("sd_i");
      navigate("/SelectSmartList");
    } else {
      navigate("/SmartList");
    }
  };
  const delay = (n) => new Promise((r) => setTimeout(r, n));

  function wait(ms, cb) {
    var waitDateOne = new Date();
    while (new Date() - waitDateOne <= ms) {
      //Nothing
    }
    if (cb) {
      eval(cb);
    }
  }

  useEffect(() => {
    if (uploadOrDownloadCount == 100) {
      setUpdateState(updateState + 1);
      console.log("in useEffect");
    }
  }, [uploadOrDownloadCount]);

  const uploadFile = async () => {
    let i = 0;
    const intervals_spend = (15 / 100) * fileLength;
    var intervals_increment = 100 / intervals_spend;
    let adr = 0;
    const timer = setInterval(() => {
      adr = adr + intervals_increment;
      setUploadOrDownloadCount(parseInt(adr));
    }, 1000);

    // setShow(false);
    if (selectedFile === null) {
      toast.warning("Please upload file first");
      return false;
    }

    let formData = new FormData();
    let user_id = localStorage.getItem("user_id");
    formData.append("user_id", user_id);
    formData.append("smart_list_name", smartListName);
    formData.append("reader_file", selectedFile);

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    setShowProgressBar(true);
    await axios
      .post(`distributes/create_smart_list_with_excel`, formData)
      .then((res) => {
        if (res.data.status_code === 200) {
          setUploadOrDownloadCount(100);
          setDataRetrieved(true);
          clearInterval(timer);
          setTimeout(() => {
            setData(res.data.response.data);
            navigate("/UploadExcel", {
              state: {
                data: res.data.response.data,
                smartListName: smartListName,
                creator: creatorName,
              },
            });
            console.log(uploadOrDownloadCount);
            setShowProgressBar(false);
            setapi_flag(api_flag + 1);
          }, 1000);
        } else {
          popup_alert({
            visible: "show",
            message: res.data.message,
            type: "error",
          });
        }
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong.");
        console.log(err);
      });
  };

  useEffect(() => {
    if (typeof creator !== "undefined" && creator != "") {
      setCreatorName(creator);
    }
  }, [smartListName]);

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
      <div class="col right-sidebar">
        <div className="custom-container">
          <div className="row">
            <div className="page-top-nav smart_list_names">
              <div class="row justify-content-end align-items-center">
                <div class="col-12 col-md-11">
                  <ul class="tabnav-link">
                    <li class="active active-main">
                      <a href="javascript:void(0)">Create smart list</a>
                    </li>
                    <li class="">
                      <a href="javascript:void(0)">Select & Verify Your HCPs</a>
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
            <section className="create_smart_list">
              <div class="create_smart_list_inset">
                <div class="create-smart-step">
                  <h2>STEP1</h2>
                  <div class="create-smart-step-box">
                    <form>
                      <div class="row justify-content-between align-items-center">
                        <div class="form-group col">
                          <label for="smart-list-name">
                            Enter smart list name
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            value={smartListName}
                            onChange={(event) => handleSmartListName(event)}
                          />
                        </div>

                        <div class="form-group col">
                          <label for="creator-name">Creator’s Name</label>
                          <input
                            type="text"
                            class="form-control"
                            value={creatorName}
                            onChange={(event) => handleCreatorName(event)}
                          />
                        </div>

                        <div class="form-group col-sm-12">
                          <div class="form-group-content">
                            <p>
                              I want this to be a <span>Demo list</span>
                            </p>
                            <div class="select-demo-option">
                              <input type="checkbox" name="cherk" />
                              <span class="checkmark"></span>
                            </div>
                            <a
                              href="#"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                            >
                              <img src={path + "question.svg"} alt="" />
                            </a>
                            <div className="tooltip">
                              A list that will appeare when you select smart
                              list to <span>send a sample.</span>
                            </div>
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
                            onClick={(event) => toggleSelection("group-opt")}
                            type="radio"
                            name="select-option-hcp"
                            id="segment"
                            value={activeClass}
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
                            onClick={handleShow}
                            name="select-option-hcp"
                          />
                          <img src={path + "upload-btn.svg"} alt="Single HCP" />{" "}
                          {filename != "" ? <p>{filename}</p> : null}
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
        </div>
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
          {showPreogressBar == true ? (
            <div
              className="CircularProgressBar"
              style={{
                width: 200,
                height: 200,
                position: "relative",
                marginLeft: "170px",
              }}
            >
              <CircularProgressbar
                value={uploadOrDownloadCount}
                text={`${uploadOrDownloadCount}%`}
                strokeWidth={5}
              />
            </div>
          ) : (
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
          )}
          {showPreogressBar !== true ? (
            <>
              <h4>Please upload maximum of 1000 records.</h4>

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
            </>
          ) : null}{" "}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateSmartList;
