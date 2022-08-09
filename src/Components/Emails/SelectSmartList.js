import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { loader } from "../../loader";
import { connect } from "react-redux";
import {
  getSelectedSmartListData,
  getEmailData,
  getDraftData,
} from "../../actions";
import { Navigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { popup_alert } from "../../popup_alert";
import * as XLSX from "xlsx";

import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

var new_object;
var draft_object;
var old_object = {};
const SelectSmartList = (props) => {
  let file_name = useRef("");
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [uploadOrDownloadCount, setUploadOrDownloadCount] = React.useState(0);
  const [showPreogressBar, setShowProgressBar] = useState(false);
  const [SendListData, setSendListData] = useState([]);
  const [PdfSelected, setPdfSelected] = useState(0);
  const [TemplateId, setTemplateId] = useState(0);
  const [getselecedlistid, setselecedlistid] = useState(0);
  const [smartListSelected, setSmartListSelected] = useState({});
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [getpopupopeningstatus, setpopupopeningstatus] = useState(false);
  const navigate = useNavigate();
  const campaign_id = old_object?.campaign_id
    ? old_object.campaign_id
    : draft_object?.campaign_id
    ? draft_object.campaign_id
    : "";
  const [campaign_id_st, setCampaign_id] = useState(campaign_id);
  const [getReaderDetails, setReaderDetails] = useState({});
  const [getSmartListName, setSmartListName] = useState("");
  const [getSmartListPopupStatus, setSmartListPopupStatus] = useState(false);
  const [showLessInfo, setShowLessInfo] = useState(true);
  const [getFileUploadPopup, setFileUploadPopup] = useState(false);

  const [fileLength, setFileLength] = useState();
  const [getCreatedListName, setCreatedListName] = useState("");
  const [creatorName, setCreatorName] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const inputElement = useRef();
  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    getSmartListData();
  }, []);

  const getSmartListData = () => {
    const body = {
      user_id: localStorage.getItem("user_id"),
      search: "",
      filter: "",
    };
    loader("show");
    axios
      .post(`distributes/get_smart_list`, body)
      .then((res) => {
        setSendListData(res.data.response.data);
        loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    getFileUploadPopup(false);
    showAlertPopup(false);
    setSelectedFile(null);
  };

  useEffect(() => {
    let listid = new_object?.id
      ? new_object.id
      : draft_object?.campaign_data?.smart_list_id
      ? draft_object.campaign_data.smart_list_id
      : 0;
    setselecedlistid(listid);
    setPdfSelected(listid);
  }, []);

  useEffect(() => {
    if (PdfSelected !== 0) {
      inputElement.current.classList.remove("disabled");
    }
  }, [PdfSelected]);

  const handleSelect = (e) => {
    if (new_object?.id) {
      if (e.id != new_object.id) {
        if (old_object?.removedHcp) {
          old_object.removedHcp = [];
        }
      }
    }

    if (PdfSelected != "") {
      if (PdfSelected == e.id) {
        setSmartListSelected({});
        props.getSelectedSmartListData(null);
        setPdfSelected(0);
        setselecedlistid(0);
      } else {
        setSmartListSelected(e);
        props.getSelectedSmartListData(e);
        setPdfSelected(e.id);
        setselecedlistid(e.id);
      }
    } else {
      setSmartListSelected(e);
      props.getSelectedSmartListData(e);
      setPdfSelected(e.id);
      setselecedlistid(e.id);
    }
  };

  const backClicked = () => {
    navigate("/SelectHCP");
  };

  const saveAsDraft = async (flag) => {
    const body = {
      user_id: localStorage.getItem("user_id"),
      pdf_id: old_object?.PdfSelected
        ? old_object.PdfSelected
        : draft_object.pdf_id,
      description: old_object?.emailDescription
        ? old_object.emailDescription
        : draft_object?.description
        ? draft_object.description
        : "",
      creator: old_object?.emailCreator
        ? old_object.emailCreator
        : draft_object?.creator
        ? draft_object.creator
        : "",
      campaign_name: old_object?.emailCampaign
        ? old_object.emailCampaign
        : draft_object.campaign,
      subject: old_object?.emailSubject
        ? old_object.emailSubject
        : draft_object.subject,
      route_location: "SelectSmartList",
      tags: old_object?.tags ? old_object.tags : draft_object.tags,
      campaign_data: {
        template_id: old_object?.templateId
          ? old_object.templateId
          : draft_object.campaign_data.template_id,
        smart_list_id: PdfSelected,
        list_selection: old_object?.selected
          ? old_object.selected
          : props.getDraftData?.campaign_data?.list_selection
          ? props.getDraftData.campaign_data.list_selection
          : 0,

        // selectedHcp: selectedHcp,
      },
      source_code: old_object?.template
        ? old_object.template
        : draft_object?.source_code
        ? draft_object.source_code
        : "",
      campaign_id: campaign_id_st ? campaign_id_st : "",
      status: 2,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        if (res.data.status_code === 200) {
          setCampaign_id(res.data.response.data.id);
          if (flag == "draft") {
            popup_alert({
              visible: "show",
              message: "Your changes has been saved <br />successfully !",
              type: "success",
              redirect: "/EmailList",
            });
          } else {
            body.campaign_id = res.data.response.data.id;
            props.getDraftData(body);
            localStorage.setItem("sd_i", res.data.response.data.id);
            navigate("/CreateSmartList");
          }
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const handleInputChange = (event, selected) => {
    const div = document.querySelector("div.active");

    if (div) {
      div.classList.remove("active");
    }
    event.target.classList.toggle("active");
    setTemplateId(selected);
  };

  const redirectToList = () => {
    setpopupopeningstatus(false);
    window.open("/CreateSmartList", "_blank");
    // navigate("/CreateSmartList");
  };

  const openSmartListPopup = async (smart_list_id) => {
    setShowLessInfo(true);
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      list_id: smart_list_id,
    };
    loader("show");
    await axios
      .post(`distributes/get_reders_list`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          setReaderDetails(res.data.response.data);
          setSmartListName(res.data.response.smart_list_name);
          setSmartListPopupStatus(true);
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        toast.warning("Something went wrong");
        loader("hide");
      });
  };

  const showMoreInfo = (e) => {
    e.preventDefault();
    setShowLessInfo(!showLessInfo);
  };

  const refreshSmartList = () => {
    getSmartListData();
  };

  // const openFileUploadPopup = () => {
  //   alert("HERE");
  // }

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

  const uploadFile = async () => {
    // setShow(false);
    let i = 0;
    const intervals_spend = (23 / 100) * fileLength;
    var intervals_increment = 100 / intervals_spend;
    let adr = 0;
    const timer = setInterval(() => {
      adr = adr + intervals_increment;
      setUploadOrDownloadCount(parseInt(adr));
    }, 1000);

    if (getCreatedListName === "") {
      toast.warning("Please enter the smart list name first.");
      return false;
    } else if (creatorName === "") {
      toast.warning("Please enter the creator name");
      return false;
    } else if (selectedFile === null) {
      toast.warning("Please upload file first");
      return false;
    }

    let formData = new FormData();
    let user_id = localStorage.getItem("user_id");
    formData.append("user_id", user_id);
    formData.append("smart_list_name", getCreatedListName);
    formData.append("creator_name", creatorName);
    formData.append("reader_file", selectedFile);

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    setShowProgressBar(true);
    // loader("show");
    await axios
      .post(`distributes/create_upload_list`, formData)
      .then((res) => {
        if (res.data.status_code === 200) {
          setUploadOrDownloadCount(100);
          clearInterval(timer);
          setTimeout(() => {
            setFileUploadPopup(false);
            getSmartListData();
            popup_alert({
              visible: "show",
              message: "Smart list created.",
              type: "success",
            });
            setShowProgressBar(false);
            setUploadOrDownloadCount(0);
          }, 1000);
        } else {
          clearInterval(timer);
          setUploadOrDownloadCount(0);
          setShowAlertPopup(true);
          setShowProgressBar(false);
          setFileUploadPopup(false);
          popup_alert({
            visible: "show",
            message: res.data.message,
            type: "error",
          });
        }
        setCreatedListName("");
        setCreatorName("");
        //   loader("hide");
      })
      .catch((err) => {
        setCreatedListName("");
        setCreatorName("");
        loader("hide");
        toast.error("Something went wrong.");
        setFileUploadPopup(false);
      });
  };

  const handleSmartListName = async (event) => {
    setCreatedListName(event.target.value);
  };

  const handleCreatorName = async (event) => {
    setCreatorName(event.target.value);
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
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
            <div className="page-top-nav">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    <button
                      className="btn btn-primary btn-bordered back"
                      onClick={backClicked}
                    >
                      Back
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">
                    <li className="active">
                      <Link to="/EmailArticleSelect">Select Content</Link>
                    </li>
                    <li className="active">
                      <Link to="/CreateEmail">Create Your Email</Link>
                    </li>
                    <li className="active active-main">
                      <Link to="/SelectSmartList">Select HCPs</Link>
                    </li>
                    {/*
                  <li className="active active-main">
                    <Link to="/SelectSmartList">Select Smart List</Link>
                  </li>
                  */}
                    <li className="">
                      <a href="javascript:void(0)">Verify Your List</a>
                    </li>

                    <li className="">
                      <a href="javascript:void(0)">Verify your Email</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <button
                      className="btn btn-primary btn-bordered move-draft"
                      onClick={() => saveAsDraft("draft")}
                    >
                      Save As Draft
                    </button>
                    {PdfSelected === 0 ? (
                      <button
                        ref={inputElement}
                        className="btn btn-primary btn-filled next disabled"
                      >
                        Next
                      </button>
                    ) : (
                      <Link
                        to="/SelectSmartListUsers"
                        state={{ smartListSelected: smartListSelected }}
                      >
                        <button
                          ref={inputElement}
                          className="btn btn-primary btn-filled next disabled"
                        >
                          Next
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <section className="search-hcp">
              <div className="select-smart-list">
                <div className="table-title">
                  <div className="create-smart-list">
                    <p>
                      If you do not have a smart list for the HCPs group, you
                      can :
                    </p>
                    <button
                      className="btn btn-primary btn-bordered"
                      onClick={() => saveAsDraft("continue")}
                    >
                      Create new smart list
                    </button>
                    <button
                      className="upload-btn btn btn-primary btn-bordered"
                      onClick={() => {
                        setShowAlertPopup(false);
                        setFileUploadPopup(
                          (getFileUploadPopup) => !getFileUploadPopup
                        );
                      }}
                    >
                      Upload excel file
                    </button>
                  </div>
                </div>
                {/*
              <div className="col smartlist-refresh_div">
                <button
                  className="btn btn-primary btn-bordered back"
                  onClick={refreshSmartList}
                >
                  Refresh List
                </button>
              </div>
              */}

                <div className="col smartlist-result-block">
                  {SendListData.map((template) => {
                    return (
                      <div className="smartlist_box_block">
                        <div className="smartlist-view email_box">
                          <div className="mail-box-content">
                            <h5>{template.name}</h5>
                            <div
                              className="select-mail-option"
                              onClick={() => handleSelect(template)}
                            >
                              <input
                                type="radio"
                                name="radio"
                                checked={
                                  template.id == PdfSelected
                                    ? true
                                    : template.id == getselecedlistid &&
                                      !PdfSelected
                                    ? true
                                    : false
                                }
                              />
                              <span className="checkmark"></span>
                            </div>
                            <div className="mailbox-table">
                              <table>
                                <tbody>
                                  <tr>
                                    <th>Contact Type</th>
                                    <td>{template.contact_type}</td>
                                  </tr>
                                  <tr>
                                    <th>Speciality</th>
                                    <td>{template.speciality}</td>
                                  </tr>
                                  <tr>
                                    <th>Readers</th>
                                    <td>{template.reader_selection}</td>
                                  </tr>
                                  <tr>
                                    <th>IBU</th>
                                    <td>{template.ibu}</td>
                                  </tr>
                                  <tr>
                                    <th>Product</th>
                                    <td>{template.product}</td>
                                  </tr>
                                  <tr>
                                    <th>Country</th>
                                    <td>{template.country}</td>
                                  </tr>
                                  <tr>
                                    <th>Registered</th>
                                    <td>{template.registered}</td>
                                  </tr>
                                  <tr>
                                    <th>Created By</th>
                                    <td>
                                      <span>{template.creator}</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div className="mail-time">
                              <span> {template.created_at}</span>
                            </div>
                            <div className="smart-list-added-user">
                              <img
                                src={path_image + "smartlist-user.svg"}
                                alt="User icon"
                              />
                              {template.readers_count}
                            </div>

                            <div className="smartlist-buttons">
                              <button className="btn view">
                                <a
                                  className="color_blue"
                                  onClick={() =>
                                    openSmartListPopup(template.id)
                                  }
                                >
                                  View
                                </a>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*Confrimation Popup start*/}
      <Modal
        show={getpopupopeningstatus}
        className="send-confirm"
        id="resend-confirm"
      >
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() =>
              setpopupopeningstatus(
                (getpopupopeningstatus) => !getpopupopeningstatus
              )
            }
          ></button>
        </Modal.Header>
        <Modal.Body>
          <img src={path_image + "alert.png"} alt="" />
          <h4>Your changes will be save in draft.</h4>
          <div className="modal-buttons">
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              onClick={() => saveAsDraft("continue")}
            >
              Continue
            </button>
            {/*
              <button
                type="button"
                className="btn btn-primary btn-bordered light"
                data-bs-dismiss="modal"
                onClick={() =>
                  setpopupopeningstatus(
                    (getpopupopeningstatus) => !getpopupopeningstatus
                  )
                }
              >
                Close
              </button>
              */}
          </div>
        </Modal.Body>
      </Modal>
      {/*Confrimation Popup end*/}

      {/* Reader Details popup */}
      <Modal
        show={getSmartListPopupStatus}
        className="smart_list_popup"
        id="smart_list_popup_id"
      >
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            {typeof getReaderDetails !== "undefined" &&
              getReaderDetails.length > 0 &&
              getSmartListName}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() =>
              setSmartListPopupStatus(
                (getSmartListPopupStatus) => !getSmartListPopupStatus
              )
            }
          ></button>
        </Modal.Header>
        <Modal.Body>
          <section className="search-hcp">
            <div className="result-hcp-table">
              <div className="table-title">
                <h4>
                  HCPs{" "}
                  <span>
                    |
                    {typeof getReaderDetails !== "undefined" &&
                      getReaderDetails.length > 0 &&
                      getReaderDetails.length}
                  </span>
                </h4>
                <div className="selected-hcp-table-action">
                  <a
                    className="show-less-info"
                    onClick={(e) => showMoreInfo(e)}
                  >
                    {showLessInfo == true ? (
                      <p className="show_more">Show More information</p>
                    ) : (
                      <p className="show_less">Show less information</p>
                    )}{" "}
                  </a>
                </div>
              </div>
              <div className="selected-hcp-list">
                <table className="table">
                  <thead className="sticky-header">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Bounced</th>
                      <th scope="col">Country</th>
                      <th scope="col">Business Unit</th>
                      <th scope="col">Contact Type</th>
                      {showLessInfo == false ? (
                        <>
                          <th scope="col">Consent</th>
                          <th scope="col">Email Received</th>
                          <th scope="col">Openings</th>
                          <th scope="col">Registrations</th>
                          <th scope="col">Last Email</th>
                        </>
                      ) : null}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {typeof getReaderDetails !== "undefined" &&
                      getReaderDetails.length > 0 &&
                      getReaderDetails.map((rr, i) => {
                        return (
                          <>
                            <tr>
                              <td>{rr.first_name}</td>
                              <td>{rr.email}</td>
                              <td>{rr.bounce}</td>
                              <td>{rr.country}</td>
                              <td>{rr.ibu}</td>
                              <td>{rr.contact_type}</td>
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.consent}</span>{" "}
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.email_received}</span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.email_opening}</span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.registration}</span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.last_email}</span>
                                </td>
                              ) : null}
                              <td></td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </Modal.Body>
      </Modal>
      {/*Reader Details popup end*/}

      {/*Modal For Creating Smart list with Excel File start*/}
      <Modal
        show={getFileUploadPopup && showAlertPopup !== true}
        className="send-confirm"
        id="create_list_popup"
        onHide={handleClose}
      >
        <Modal.Header>
          {showPreogressBar == true ? (
            <h4>Processing data, Please be patient!</h4>
          ) : (
            <h4>Upload New List</h4>
          )}
          {showPreogressBar != true ? (
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() =>
                setFileUploadPopup((getFileUploadPopup) => !getFileUploadPopup)
              }
            ></button>
          ) : null}
        </Modal.Header>
        <Modal.Body>
          {showPreogressBar == true ? (
            <div
              className="circular-progressbar"
              style={{
                width: 200,
                height: 200,
              }}
            >
              <CircularProgressbar
                value={uploadOrDownloadCount}
                text={`${uploadOrDownloadCount}%`}
                strokeWidth={5}
              />
            </div>
          ) : (
            <div className="add_hcp_boxes">
              <div className="create-smart-step">
                <h2>STEP1</h2>
                <div className="create-smart-step-box">
                  <form>
                    <div className="row justify-content-between align-items-end">
                      <div className="form-group col">
                        <label for="smart-list-name">
                          Enter smart list name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={getCreatedListName}
                          onChange={(event) => handleSmartListName(event)}
                        />
                      </div>
                      <div class="form-group col">
                        <label for="creator-name">Creator’s Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={creatorName}
                          onChange={(event) => handleCreatorName(event)}
                        />
                      </div>
                      <div className="form-group col-sm-12">
                        <div className="form-group-content">
                          <p>
                            {" "}
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
                          <div className="tooltip">
                            A list that will appeare when you select smart list
                            to <span>send a sample.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="create-smart-step">
                <h2>STEP2</h2>
                <div className="create-smart-step-box">
                  <div className="upload-file-box">
                    <div className="box">
                      <input
                        type="file"
                        name="file-4[]"
                        id="file-4"
                        className="inputfile inputfile-3"
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
                    <h4>Please upload maximum of 1000 records.</h4>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showPreogressBar != true ? (
            <div className="modal_upload_btns">
              <div className="download-sample">
                <p>Download sample Excel file to upload new HCPs</p>
                <div className="upload-btn" onClick={downloadFile}>
                  Download File
                </div>
              </div>
              <div className="modal-buttons">
                {file_name.current?.files === undefined ||
                file_name.current.files?.length === 0 ? (
                  <>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-primary btn-bordered light"
                      data-bs-dismiss="modal"
                    >
                      Upload
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={uploadFile}
                    data-bs-dismiss="modal"
                  >
                    Upload
                  </button>
                )}
              </div>
            </div>
          ) : null}{" "}
        </Modal.Body>
      </Modal>
      {/*Modal For Creating Smart list with Excel File end*/}
    </>
  );
};

const mapStateToProps = (state) => {
  new_object = state.getSelectedSmartListData;
  old_object = state.getEmailData ? state.getEmailData : {};
  draft_object = state.getDraftData ? state.getDraftData : {};
  return state;
};

export default connect(mapStateToProps, {
  getDraftData: getDraftData,
  getSelectedSmartListData: getSelectedSmartListData,
  getEmailData: getEmailData,
})(SelectSmartList);
