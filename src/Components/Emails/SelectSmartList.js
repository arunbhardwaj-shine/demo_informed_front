import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { loader } from "../../loader";
import { connect } from "react-redux";
import { getSelectedSmartListData, getEmailData, getDraftData } from "../../actions";
import { Navigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { popup_alert } from "../../popup_alert";


var new_object;
var draft_object;
var old_object = {};
const SelectSmartList = (props) => {
  let file_name = useRef("");
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [SendListData, setSendListData] = useState([]);
  const [PdfSelected, setPdfSelected] = useState(0);
  const [TemplateId, setTemplateId] = useState(0);
  const [getselecedlistid, setselecedlistid] = useState(0);
  const [smartListSelected, setSmartListSelected] = useState({});
  const [getpopupopeningstatus, setpopupopeningstatus] = useState(false);
  const navigate = useNavigate();
  const campaign_id = old_object?.campaign_id
    ? old_object.campaign_id
    : draft_object?.campaign_id ? draft_object.campaign_id : "";
  const [campaign_id_st, setCampaign_id] = useState(campaign_id);
  const [getReaderDetails, setReaderDetails] = useState({});
  const [getSmartListName, setSmartListName] = useState("");
  const [getSmartListPopupStatus, setSmartListPopupStatus] = useState(false);
  const [showLessInfo, setShowLessInfo] = useState(true);
  const [getFileUploadPopup, setFileUploadPopup] = useState(false);

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

  useEffect(() => {
    let listid = new_object?.id
      ? new_object.id
      : (draft_object?.campaign_data?.smart_list_id) ? draft_object.campaign_data.smart_list_id : 0;
    setselecedlistid(listid);
    setPdfSelected(listid);
  }, []);

  useEffect(() => {
    if (PdfSelected !== 0) {
      inputElement.current.classList.remove("disabled");
    }
  }, [PdfSelected]);

  const handleSelect = (e) => {
    if(new_object?.id){
      if(e.id != new_object.id){
        if(old_object?.removedHcp){
          old_object.removedHcp = [];
        }
      }
    }

    if(PdfSelected != ""){
      if(PdfSelected == e.id){
        setSmartListSelected({});
        props.getSelectedSmartListData(null);
        setPdfSelected(0);
        setselecedlistid(0);
      }else{
        setSmartListSelected(e);
        props.getSelectedSmartListData(e);
        setPdfSelected(e.id);
        setselecedlistid(e.id);
      }
    }else{
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
      : draft_object?.description ? draft_object.description : '',
    creator: old_object?.emailCreator
      ? old_object.emailCreator
      : draft_object?.creator ? draft_object.creator : '',
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
          : 0

        // selectedHcp: selectedHcp,
      },
      source_code: old_object?.template
        ? old_object.template
        : draft_object?.source_code ? draft_object.source_code : '',
      campaign_id: campaign_id_st ? campaign_id_st : '',
      status: 2,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        if (res.data.status_code === 200) {
          setCampaign_id(res.data.response.data.id);
          if(flag == "draft"){
            popup_alert({
              visible: "show",
              message: "Your changes has been saved <br />successfully !",
              type: "success",
              redirect: "/EmailList",
            });
          }else{
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
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    // setShow(false);
    if (getCreatedListName === "") {
      toast.warning("Please enter the smart list name first.");
      return false;
    }else if(creatorName === ""){
      toast.warning("Please enter the creator name");
      return false;
    }else  if (selectedFile === null) {
      toast.warning("Please upload file first");
      return false;
    }

    let formData = new FormData();
    let user_id =  localStorage.getItem("user_id");
    formData.append("user_id", user_id);
    formData.append("smart_list_name", getCreatedListName);
    formData.append("creator_name", creatorName);
    formData.append("reader_file", selectedFile);

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`distributes/create_upload_list`, formData)
      .then((res) => {
        if (res.data.status_code === 200) {
            setFileUploadPopup(false);
            getSmartListData();
            popup_alert({
              visible: "show",
              message: "Smart list created.",
              type: "success",
            });
        } else {
          setFileUploadPopup(false);
          popup_alert({
            visible: "show",
            message: res.data.message,
            type: "error",
          });
        }
        setCreatedListName("");
        setCreatorName("");
        loader("hide");
      })
      .catch((err) => {
        setCreatedListName("");
        setCreatorName("");
        loader("hide");
        toast.error("Something went wrong.")
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
                {
                  /*
                  <li className="active active-main">
                    <Link to="/SelectSmartList">Select Smart List</Link>
                  </li>
                  */
                }
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
                  If you do not have a smart list for the HCPs group, you can :
                </p>
                <button
                  className="btn btn-primary btn-bordered"
                  onClick={() => saveAsDraft("continue")}
                >
                  Create new smart list
                </button>
                <button className="upload-btn btn btn-primary btn-bordered"
                onClick={() =>
                  setFileUploadPopup(
                    (getFileUploadPopup) => !getFileUploadPopup
                  )
                }
                >

                  Upload excel file
                </button>
              </div>
            </div>
            {
              /*
              <div className="col smartlist-refresh_div">
                <button
                  className="btn btn-primary btn-bordered back"
                  onClick={refreshSmartList}
                >
                  Refresh List
                </button>
              </div>
              */
            }

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
                        {/* <div className="mail-stats">
                        <ul>
                          <li>
                            <div className="mail-status smartlist_view">
                              <svg
                                width="16"
                                height="14"
                                viewBox="0 0 16 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.65531 2.57856C10.3951 3.04241 10.9139 3.82733 11.0083 4.73845C11.31 4.87942 11.6449 4.96049 11.9999 4.96049C13.296 4.96049 14.3465 3.91 14.3465 2.6141C14.3465 1.31801 13.296 0.267517 11.9999 0.267517C10.7162 0.267916 9.67488 1.29964 9.65531 2.57856ZM8.11801 7.38316C9.4141 7.38316 10.4646 6.33246 10.4646 5.03657C10.4646 3.74067 9.4139 2.69018 8.11801 2.69018C6.82211 2.69018 5.77102 3.74087 5.77102 5.03677C5.77102 6.33266 6.82211 7.38316 8.11801 7.38316ZM9.11339 7.5431H7.12223C5.46552 7.5431 4.11771 8.89111 4.11771 10.5478V12.9829L4.1239 13.021L4.29163 13.0735C5.87266 13.5675 7.24622 13.7322 8.37679 13.7322C10.585 13.7322 11.8649 13.1027 11.9438 13.0625L12.1005 12.9833H12.1173V10.5478C12.1179 8.89111 10.7701 7.5431 9.11339 7.5431ZM12.9957 5.12063H11.0199C10.9985 5.91115 10.6611 6.62299 10.1273 7.13496C11.6 7.57285 12.6774 8.93843 12.6774 10.5514V11.3018C14.6282 11.2303 15.7524 10.6774 15.8265 10.6403L15.9832 10.5608H16V8.12495C16 6.46844 14.6522 5.12063 12.9957 5.12063ZM4.0005 4.96089C4.45955 4.96089 4.88666 4.82691 5.24847 4.59868C5.36348 3.8485 5.76563 3.19296 6.3401 2.74649C6.34249 2.70256 6.34669 2.65903 6.34669 2.6147C6.34669 1.31861 5.29599 0.268116 4.0005 0.268116C2.70421 0.268116 1.65391 1.31861 1.65391 2.6147C1.65391 3.9102 2.70421 4.96089 4.0005 4.96089ZM6.10787 7.13496C5.57674 6.62559 5.24048 5.91754 5.21592 5.13181C5.14264 5.12642 5.07016 5.12063 4.99548 5.12063H3.00452C1.34781 5.12063 0 6.46844 0 8.12495V10.5604L0.00618994 10.5979L0.173917 10.6508C1.44226 11.0468 2.57422 11.2293 3.55742 11.2868V10.5514C3.55782 8.93843 4.63487 7.57325 6.10787 7.13496Z"
                                  fill="#FAC755"
                                ></path>
                              </svg>
                            </div>
                            <span>10%</span>
                          </li>
                          <li>
                            <div className="mail-status mail_click">
                              <svg
                                width="14"
                                height="16"
                                viewBox="0 0 14 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.96391 5.30631C2.85416 4.93468 2.74879 4.56243 2.6696 4.20577C2.14894 3.89774 1.79477 3.33718 1.79477 2.68932C1.79477 1.71473 2.58729 0.922837 3.56126 0.922837C4.53522 0.922837 5.32774 1.71535 5.32774 2.68932C5.32774 2.82338 5.30966 2.95246 5.2816 3.07779C5.45058 3.45004 5.58713 3.86906 5.70685 4.29493C6.04356 3.84599 6.25058 3.29415 6.25058 2.68932C6.25058 1.20343 5.04715 0 3.56126 0C2.07536 0 0.872559 1.20343 0.872559 2.68932C0.872559 3.96882 1.76734 5.03445 2.96391 5.30631Z"
                                  fill="#C8D1D9"
                                ></path>
                                <path
                                  d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z"
                                  fill="#C8D1D9"
                                ></path>
                              </svg>
                            </div>
                            <span>60%</span>
                          </li>
                        </ul>
                      </div> */}
                        <div className="smartlist-buttons">
                          <button className="btn view">
                            <a
                              className="color_blue"
                              onClick={() => openSmartListPopup(template.id)}
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
          <h4>
            Your changes will be save in draft.
          </h4>
          <div className="modal-buttons">
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              onClick={() => saveAsDraft("continue")}
            >
              Continue
            </button>
            {
              /*
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
              */
            }
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
        <Modal show={getFileUploadPopup}
        className="send-confirm"
        id="create_list_popup">
            <Modal.Header>
              <h4>Upload New List</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() =>
                  setFileUploadPopup(
                    (getFileUploadPopup) => !getFileUploadPopup
                  )
                }
              ></button>
            </Modal.Header>
            <Modal.Body>
            <div className="add_hcp_boxes">
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
                        value= {getCreatedListName}
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
                        <p> I want this to be a <span>Demo list</span>
                        </p>
                        <div className="select-demo-option">
                          <input type="checkbox" name="checkbox" />
                          <span className="checkmark"></span>
                        </div>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Step to create smart list">
                          <img src={path_image + "question.svg"} alt="" />
                        </a>
                        <div className="tooltip">A list that will appeare when you select smart list to <span>send a sample.</span></div>
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
              </div>
              </div>
            </div>
              {/* <div className="form_action">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label for="smart-list-name">Enter smart list name</label>
                      <input
                        type="text"
                        className="form-control"
                        value= {getCreatedListName}
                        onChange={(event) => handleSmartListName(event)}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label for="creator-name">Creator's Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={creatorName}
                        onChange={(event) => handleCreatorName(event)}
                      />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

              {/* <div className="upload-file-box">
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
              </div> */}
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
            </Modal.Body>
        </Modal>
      {/*Modal For Creating Smart list with Excel File end*/}
    </>
  );
};

const mapStateToProps = (state) => {
  new_object = state.getSelectedSmartListData;
  old_object =  state.getEmailData ? state.getEmailData : {};
  draft_object =  state.getDraftData ? state.getDraftData : {};
  return state;
};

export default connect(mapStateToProps, {
  getDraftData: getDraftData,
  getSelectedSmartListData: getSelectedSmartListData,
  getEmailData: getEmailData,
})(SelectSmartList);
