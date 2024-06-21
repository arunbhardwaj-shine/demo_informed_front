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
import Accordion from "react-bootstrap/Accordion";
import Select from "react-select";
import SmartListLayout from "../CommonComponent/SmartListLayout";
import SmartListTableLayout from "../CommonComponent/SmartListTableLayout";

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
  const [customIbu, setCustomIbu] = useState("");
  const [apiCallStatus, setApiCallStatus] = useState(false);
  const [smartListSelected, setSmartListSelected] = useState({});
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [getpopupopeningstatus, setpopupopeningstatus] = useState(false);
  const navigate = useNavigate();
  const campaign_id = old_object?.campaign_id
    ? old_object.campaign_id
    : draft_object?.campaign_id
      ? draft_object.campaign_id
      : "";
  const [userId, setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==");
  const [campaign_id_st, setCampaign_id] = useState(campaign_id);
  const [getReaderDetails, setReaderDetails] = useState({});
  const [getSmartListName, setSmartListName] = useState("");
  const [getSmartListPopupStatus, setSmartListPopupStatus] = useState(false);
  const [showLessInfo, setShowLessInfo] = useState(true);
  const [getFileUploadPopup, setFileUploadPopup] = useState(false);

  const [fileLength, setFileLength] = useState();
  const [getCreatedListName, setCreatedListName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [validationError, setValidationError] = useState({});

  const [selectedFile, setSelectedFile] = useState(null);
  const [getloadmore, setloadmore] = useState(0);
  const [selectedListId, setSelectedListId] = useState(0);
  const [showfilter, setShowFilter] = useState(false);
  const [filterdata, setFilterData] = useState([]);
  const [updateflag, setUpdateFlag] = useState(0);
  const [getFilterIbu, setFilterIbu] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterapplied, setFilterApply] = useState(false);
  const [prevsmartListData, setPrevSmartListData] = useState([]);
  const [getFilterCreator, setFilterCreator] = useState([]);
  const [sortBy, setSortBy] = useState('first_name'); // Initial sort key
  const [sortOrder, setSortOrder] = useState('asc');
  const inputElement = useRef();
  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  const [ibu, setIbu] = useState([
    {
      label: "All",
      value: "All",
    },
    {
      label: "Critical Care",
      value: "Critical Care",
    },
    { label: "Haematology", value: "Haematology" },
    { label: "Immunotherapy", value: "Immunotherapy" },
  ]);

  const [creatorList, setCreatorList] = useState([
    { label: "alexandr.litvinov@octapharma.com", value: "alexandr.litvinov@octapharma.com" },
    { label: "igor.ilic@octapharma.com", value: "igor.ilic@octapharma.com" },
    { label: "maria.legina@octapharma.com", value: "maria.legina@octapharma.com" },
    { label: "zvenyslava.husak@octapharma.com", value: "zvenyslava.husak@octapharma.com" },
  ]);

  useEffect(() => {
    getSmartListData(1);
  }, []);

  const getSmartListData = (page = 1) => {
    setApiCallStatus(false);
    const body = {
      user_id: localStorage.getItem("user_id"),
      search: "",
      filter: filter,
      paging: "32",
    };
    loader("show");
    axios
      .post(`distributes/get_smart_list?page=` + page, body)
      .then((res) => {
        setSendListData(res?.data?.response?.data);
        if (filterdata?.length == 0) {
          setFilterData(res?.data?.response?.filter);
          setPrevSmartListData(res?.data?.response?.data);
        }
        loader("hide");
        setApiCallStatus(true);
      })
      .catch((err) => {
        loader("hide");
        setApiCallStatus(true);
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
      show_specific: 1,
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
    getSmartListData(1);
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
      // console.log(dataParse);

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
      if (adr >= 98) {
        setUploadOrDownloadCount(98);
      } else {
        setUploadOrDownloadCount(parseInt(adr));
      }
    }, 1000);
    let error = {};

    if (getCreatedListName.trim() === "") {
      error.getCreatedListName = "Please enter the smart list name";
      // toast.warning("Please enter the smart list name first.");
      // return false;
    }
    if (creatorName.trim() === "") {
      error.creatorName = "Please enter the creator name";
      // return false;
    }

    if (localStorage.getItem('user_id') == 'B7SHpAc XDXSH NXkN0rdQ==' && customIbu.trim() === "") {
      error.ibu = "Please enter the ibu";
      // return false;
    }

    if (selectedFile === null) {
      error.selectedFile = "Please upload file first";
    }
    if (Object.keys(error)?.length) {
      setValidationError(error);
      // toast.error(error[Object.keys(error)[0]]);
      return;
    }

    let formData = new FormData();
    let user_id = localStorage.getItem("user_id");
    formData.append("user_id", user_id);
    formData.append("smart_list_name", getCreatedListName);
    formData.append("creator_name", creatorName);
    formData.append("ibu", customIbu);
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
            getSmartListData(1);
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
        setCustomIbu("");
        //   loader("hide");
      })
      .catch((err) => {
        clearInterval(timer);
        setShowProgressBar(false);
        setCreatedListName("");
        setCreatorName("");
        setCustomIbu("");
        loader("hide");
        toast.error("Something went wrong.");
        setFileUploadPopup(false);
      });
  };

  const handleSmartListName = async (event) => {
    setCreatedListName(event.target.value);
  };

  const handleCreatorName = async (event) => {
    const creatorName = event?.target?.value ? event?.target?.value : event?.value;
    setCreatorName(creatorName);
    // setCreatorName(event.target.value);
  };

  const handleIBUChange = async (value) => {
    setCustomIbu(value);
  }

  const downloadFile = () => {
    // let link = document.createElement("a");
    // link.href = "https://webinar.informed.pro/sample.xls";
    // link.setAttribute("download", "file.xlsx");
    // document.body.appendChild(link);
    // link.download = "";
    // link.click();
    // document.body.removeChild(link);

    let user_id = localStorage.getItem("user_id");
    let link = document.createElement("a");
    if (
      user_id == "wW0geGtDPvig5gF 6KbJrg==" ||
      user_id == "qDgwPdToP05Kgzc g2VjIQ==" ||
      user_id == "z2TunmZQf3QwCsICFTLGGQ==" ||
      user_id == "UbCJcnLM9fe HsRMgX8c1A=="
    ) {
      link.href = "https://webinar.informed.pro/sample_st.xlsx";
    } else if (user_id == "56Ek4feL/1A8mZgIKQWEqg==") {
      link.href = "https://webinar.informed.pro/R_Dsample.xlsx";
    } else {
      link.href = "https://webinar.informed.pro/sample.xlsx";
    }
    link.setAttribute("download", "file.xlsx");
    document.body.appendChild(link);
    link.download = "";
    link.click();
    document.body.removeChild(link);
  };

  const load_more = () => {
    getSmartListData(2);
    setloadmore(1);
  };

  const clearFilter = () => {
    document.querySelectorAll("input").forEach((checkbox) => {
      checkbox.checked = false;
    });
    setFilterIbu([]);
    setFilter([]);
    let up = updateflag + 1;
    setUpdateFlag(up);
    if (filterapplied) {
      setSendListData(prevsmartListData);
    }
    setShowFilter(false);
  };

  const applyFilter = () => {
    setFilterApply(true);
    getSmartListData(1);
    setShowFilter(false);
  };

  const handleIBUFilterChange = (ibu) => {
    let get_creator_index = getFilterIbu.indexOf(ibu);
    if (get_creator_index !== -1) {
      getFilterIbu.splice(get_creator_index, 1);
      setFilterIbu(getFilterIbu);
    } else {
      getFilterIbu.length = 0;
      getFilterIbu.push(ibu);
      setFilterIbu(getFilterIbu);
    }

    let getfilter = getFilterIbu;
    if (getfilter.hasOwnProperty("ibu")) {
      getfilter.name = getFilterIbu;
    } else {
      getfilter = Object.assign({ ibu: getFilterIbu }, filter);
    }
    setFilter(getfilter);

    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleCreatorChange = (creator) => {
    let get_creator_index = getFilterCreator.indexOf(creator);
    if (get_creator_index !== -1) {
      getFilterCreator.splice(get_creator_index, 1);
      setFilterCreator(getFilterCreator);
    } else {
      getFilterCreator.push(creator);
      setFilterCreator(getFilterCreator);
    }

    let getfilter = getFilterCreator;
    if (getfilter.hasOwnProperty("creator")) {
      getfilter.name = getFilterCreator;
    } else {
      getfilter = Object.assign({ creator: getFilterCreator }, filter);
    }
    setFilter(getfilter);

    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const removeindividualfilter = (src, item) => {
    loader("show");
    if (src == "ibu") {
      handleIBUFilterChange(item);
    } else if (src == "creator") {
      handleCreatorChange(item);
    }
    if (filterapplied) {
      getSmartListData(1);
    } else {
      loader("hide");
    }
    setShowFilter(false);
  };

  const handleSort = (key) => {
    setSortBy(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortData = (data, key, order) => {
    return data.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      // Handle different data types (numbers, strings)
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return order === 'asc'
          ? valueA?.localeCompare(valueB) // Handle string sorting with locale awareness
          : valueB?.localeCompare(valueA);
      }
    });
  };

  const viewSmartListData = async (id) => {
    setSelectedListId(id);
  }

  const closeSmartListPopup = async () => {
    setSelectedListId(0);
  }


  return (
    <>
      <div className="col right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="page-top-nav sticky">
              <div className="d-flex justify-content-end align-items-center header-links">
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
                      <Link to="/SelectSmartList">
                        {localStorage.getItem("user_id") == userId
                          ? "Select Users"
                          : "Select HCPs"}{" "}
                      </Link>
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
                        state={{ smartListSelected: smartListSelected, flag: 1 }}
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
                      {localStorage.getItem("user_id") == userId
                        ? `If you do not have a smart list for the Users group, you
                      can :`
                        : `If you do not have a smart list for the HCPs group, you
                      can `}
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

                  {
                    localStorage.getItem('user_id') == 'B7SHpAc XDXSH NXkN0rdQ==' ?
                      <div className="filter_btn_div">


                        {updateflag > 0 &&
                          (
                            getFilterCreator.length > 0 ||
                            getFilterIbu.length > 0) && (
                            <div className="apply-filter">
                              <div className="filter-block">
                                <div className="filter-block-left full">
                                  {getFilterIbu.length > 0 && (
                                    <div className="filter-div">
                                      <div className="filter-div-title">
                                        <span>IBU |</span>
                                      </div>
                                      <div className="filter-div-list">
                                        {Object.entries(getFilterIbu).map(
                                          ([index, item]) => (
                                            <div
                                              key={item}
                                              className="filter-result"
                                              onClick={(event) =>
                                                removeindividualfilter("ibu", item)
                                              }
                                            >
                                              {item}
                                              <img
                                                src={path_image + "filter-close.svg"}
                                                alt="Close-filter"
                                              />
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {getFilterCreator.length > 0 && (
                                    <div className="filter-div">
                                      <div className="filter-div-title">
                                        <span>Creator |</span>
                                      </div>
                                      <div className="filter-div-list">
                                        {Object.entries(getFilterCreator).map(
                                          ([index, item]) => (
                                            <div
                                              key={item}
                                              className="filter-result"
                                              onClick={(event) =>
                                                removeindividualfilter("creator", item)
                                              }
                                            >
                                              {item}
                                              <img
                                                src={path_image + "filter-close.svg"}
                                                alt="Close-filter"
                                              />
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        <div className="filter-by nav-item dropdown">
                          <button
                            ref={buttonRef}
                            className="btn btn-secondary dropdown"
                            type="button"
                            id="dropdownMenuButton2"
                            onClick={() => setShowFilter((showfilter) => !showfilter)}
                          >
                            Filter By
                            {showfilter ? (
                              <svg
                                className="close-arrow"
                                width="13"
                                height="12"
                                viewBox="0 0 13 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="2.09896"
                                  height="15.1911"
                                  rx="1.04948"
                                  transform="matrix(0.720074 0.693897 -0.720074 0.693897 11.0977 0)"
                                  fill="#0066BE"
                                />
                                <rect
                                  width="2.09896"
                                  height="15.1911"
                                  rx="1.04948"
                                  transform="matrix(0.720074 -0.693897 0.720074 0.693897 0 1.45898)"
                                  fill="#0066BE"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="filter-arrow"
                                width="16"
                                height="14"
                                viewBox="0 0 16 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                                  fill="#97B6CF"
                                />
                                <path
                                  d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                                  fill="#97B6CF"
                                />
                                <path
                                  d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                                  fill="#97B6CF"
                                />
                              </svg>
                            )}
                          </button>

                          {showfilter && (
                            <div
                              ref={filterRef}
                              className="dropdown-menu filter-options"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              <h4>Filter By</h4>
                              <Accordion flush>

                                {filterdata?.hasOwnProperty("ibu") && localStorage.getItem('user_id') == 'B7SHpAc XDXSH NXkN0rdQ==' &&
                                  filterdata?.ibu?.length > 0 && (
                                    <Accordion.Item className="card" eventKey="3">
                                      <Accordion.Header className="card-header">
                                        IBU
                                      </Accordion.Header>
                                      <Accordion.Body className="card-body">
                                        <ul>
                                          {Object.entries(filterdata.ibu).map(
                                            ([index, item]) => (
                                              <li key={item}>
                                                <label className="select-multiple-option">
                                                  <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-ibu-${index}`}
                                                    name="names[]"
                                                    value={item}
                                                    checked={
                                                      updateflag > 0 &&
                                                      typeof getFilterIbu !==
                                                      "undefined" &&
                                                      getFilterIbu.indexOf(item) !== -1
                                                    }
                                                    onChange={() =>
                                                      handleIBUFilterChange(item)
                                                    }
                                                  />
                                                  {item}
                                                  <span className="checkmark"></span>
                                                </label>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  )}

                                {filterdata.hasOwnProperty("creator") &&
                                  filterdata.creator.length > 0 && (
                                    <Accordion.Item className="card" eventKey="1">
                                      <Accordion.Header className="card-header">
                                        Creator
                                      </Accordion.Header>
                                      <Accordion.Body className="card-body">
                                        <ul>
                                          {Object.entries(filterdata.creator).map(
                                            ([index, item]) => (
                                              <li key={item}>
                                                <label className="select-multiple-option">
                                                  <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-creator-${index}`}
                                                    name="creator[]"
                                                    value={item}
                                                    checked={
                                                      updateflag > 0 &&
                                                      typeof getFilterCreator !==
                                                      "undefined" &&
                                                      getFilterCreator.indexOf(item) !==
                                                      -1
                                                    }
                                                    onChange={() =>
                                                      handleCreatorChange(item)
                                                    }
                                                  />
                                                  {item}
                                                  <span className="checkmark"></span>
                                                </label>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  )}
                              </Accordion>
                              <div className="filter-footer">
                                <button
                                  className="btn btn-primary btn-bordered"
                                  onClick={clearFilter}
                                >
                                  Clear
                                </button>
                                <button
                                  className="btn btn-primary btn-filled"
                                  onClick={applyFilter}
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      : null
                  }
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

                <div className="col smartlist-result-block new-smartlist">
                  {
                    apiCallStatus && SendListData?.length > 0
                      ?
                      SendListData?.map((template) => {
                        return (
                          <div className="smartlist_box_block">
                            <div className="smartlist-view email_box">
                              <div className="mail-box-content">
                                <div className="mail-box-conten-title">
                                  <h5>{template.name}</h5>
                                  <div className="select-mail-option">
                                    <input
                                      onClick={() => handleSelect(template)}
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
                                </div>
                                <SmartListLayout data={template} iseditshow={0} isviewshow={1} deletestatus={0} viewSmartListData={viewSmartListData} />

                                {/* <div className="mailbox-table">
                                  <table>
                                    <tbody>
                                      <tr>
                                        <th>Contact type</th>
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
                                        <th>Created by</th>
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
                                </div> */}

                              </div>
                            </div>
                          </div>
                        );
                      })
                      :
                      apiCallStatus ? (
                        <div className="no_found"><p>No Data Found</p></div>
                      ) : null
                  }
                </div>

                {typeof SendListData !== "undefined" &&
                  SendListData?.length == 32 &&
                  getloadmore === 0 && (
                    <div className="load_more">
                      <button
                        className="btn btn-primary btn-filled"
                        onClick={load_more}
                      >
                        Load More
                      </button>
                    </div>
                  )}
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
                      <th scope="col">Name
                        <button
                          className={`event_sort_btn ${sortBy == "first_name" ?
                            sortOrder == "asc"
                              ? "svg_asc"
                              : "svg_active"
                            : ""
                            }`}
                          onClick={() => handleSort('first_name')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <g clip-path="url(#clip0_3722_6611)">
                              <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                            </g>
                            <defs>
                              <clipPath id="clip0_3722_6611">
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </th>
                      <th scope="col">Email
                        <button
                          className={`event_sort_btn ${sortBy == "email" ?
                            sortOrder == "asc"
                              ? "svg_asc"
                              : "svg_active"
                            : ""
                            }`}
                          onClick={() => handleSort('email')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <g clip-path="url(#clip0_3722_6611)">
                              <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                            </g>
                            <defs>
                              <clipPath id="clip0_3722_6611">
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </th>
                      <th scope="col" className="sort_option">
                        Bounced
                      </th>
                      <th scope="col">Country
                        <button
                          className={`event_sort_btn ${sortBy == "country" ?
                            sortOrder == "asc"
                              ? "svg_asc"
                              : "svg_active"
                            : ""
                            }`}
                          onClick={() => handleSort('country')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <g clip-path="url(#clip0_3722_6611)">
                              <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                            </g>
                            <defs>
                              <clipPath id="clip0_3722_6611">
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </th>
                      {localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg==" ? (<>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort("site_number")}>
                              Site number
                              <button
                                className={`event_sort_btn ${sortBy == "site_number"
                                  ? sortOrder == "asc"
                                    ? "svg_asc"
                                    : "svg_active"
                                  : ""
                                  }`}
                                onClick={() => handleSort("site_number")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort("irt")}>
                              IRT mandatory training
                              <button
                                className={`event_sort_btn ${sortBy == "irt"
                                  ? sortOrder == "asc"
                                    ? "svg_asc"
                                    : "svg_active"
                                  : ""
                                  }`}
                                onClick={() => handleSort("irt")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                        </>) : (
                        <th scope="col">Business unit
                          <button
                            className={`event_sort_btn ${sortBy == "ibu" ?
                              sortOrder == "asc"
                                ? "svg_asc"
                                : "svg_active"
                              : ""
                              }`}
                            onClick={() => handleSort('ibu')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <g clip-path="url(#clip0_3722_6611)">
                                <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                              </g>
                              <defs>
                                <clipPath id="clip0_3722_6611">
                                  <rect width="8" height="8" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </th>
                      )}
                      {localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
                        <th scope="col" className="sort_option">
                          <span onClick={() => handleSort("user_type")}>
                            IRT role
                            <button
                              className={`event_sort_btn ${sortBy == "user_type"
                                ? sortOrder == "asc"
                                  ? "svg_asc"
                                  : "svg_active"
                                : ""
                                }`}
                              onClick={() => handleSort("user_type")}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path
                                    d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                    fill="#97B6CF"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect
                                      width="8"
                                      height="8"
                                      fill="white"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </span>
                        </th>
                      ) : (
                        <th scope="col">Contact type</th>
                      )}

                      {showLessInfo == false ? (
                        <>
                          <th scope="col">Consent</th>
                          <th scope="col">Email received</th>
                          <th scope="col">Openings</th>
                          <th scope="col">Registrations</th>
                          <th scope="col">Last email</th>
                        </>
                      ) : null}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {typeof getReaderDetails !== "undefined" &&
                      getReaderDetails.length > 0 &&
                      sortData(getReaderDetails, sortBy, sortOrder).map((rr, i) => {
                        return (
                          <>
                            <tr>
                              <td>{rr.first_name}</td>
                              <td>{rr.email}</td>
                              <td>{rr.bounce}</td>
                              <td>{rr.country}</td>
                              {localStorage.getItem("user_id") ==
                                "56Ek4feL/1A8mZgIKQWEqg==" && (<><td>{rr?.site_number ? rr?.site_number : "N/A"}</td></>)}
                              <td>
                                {localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg=="
                                  ? rr.irt
                                    ? "Yes"
                                    : "No"
                                  : rr.ibu
                                    ? rr.ibu
                                    : "N/A"}
                              </td>

                              <td>
                                {localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg=="
                                  ? rr.user_type != 0
                                    ? rr.user_type
                                    : "N/A"
                                  : rr.contact_type
                                    ? rr.contact_type
                                    : "N/A"}
                              </td>
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.consent ? rr.consent : "N/A"}</span>{" "}
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr.email_received
                                      ? rr.email_received
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr.email_opening
                                      ? rr.email_opening
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr.registration ? rr.registration : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr.last_email ? rr.last_email : "N/A"}
                                  </span>
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
                    <div className="row justify-content-between align-items-start">
                      <div className="form-group col">
                        <label htmlFor="smart-list-name">
                          Enter smart list name<span>*</span>
                        </label>
                        <input
                          type="text"
                          className={
                            validationError?.getCreatedListName
                              ? "form-control error"
                              : "form-control"
                          }
                          value={getCreatedListName}
                          onChange={(event) => handleSmartListName(event)}
                        />
                        {validationError?.getCreatedListName ? (
                          <div className="login-validation">
                            {validationError?.getCreatedListName}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group col">
                        <label htmlFor="creator-name">
                          Creator’s name<span>*</span>
                        </label>
                        {
                          localStorage.getItem('user_id') == 'B7SHpAc XDXSH NXkN0rdQ==' ?
                            <>
                              <Select
                                options={creatorList}
                                createNewLabel="true"
                                placeholder="Select creator name"
                                name="creator"
                                className={
                                  validationError?.creatorName
                                    ? "dropdown-basic-button split-button-dropup error"
                                    : "dropdown-basic-button split-button-dropup"
                                }
                                isClearable
                                onChange={(e) => handleCreatorName(e)}
                              />
                            </>
                            :
                            <input
                              type="text"
                              className={
                                validationError?.creatorName
                                  ? "form-control error"
                                  : "form-control"
                              }
                              value={creatorName}
                              onChange={(event) => handleCreatorName(event)}
                            />
                        }
                        {validationError?.creatorName ? (
                          <div className="login-validation">
                            {validationError?.creatorName}
                          </div>
                        ) : null}
                      </div>

                      {
                        localStorage.getItem('user_id') == 'B7SHpAc XDXSH NXkN0rdQ==' ?
                          <div className="form-group col">
                            <label htmlFor="creator-name">
                              IBU <span>*</span>
                            </label>
                            <Select
                              options={ibu}
                              placeholder="Select IBU"
                              name="ibu"
                              className={
                                validationError?.ibu
                                  ? "dropdown-basic-button split-button-dropup error"
                                  : "dropdown-basic-button split-button-dropup"
                              }
                              isClearable
                              onChange={(e) => handleIBUChange(e?.value)}
                            />
                            {validationError?.ibu ? (
                              <div className="login-validation">
                                {validationError?.ibu}
                              </div>
                            ) : null}
                          </div>
                          :
                          null
                      }

                      {
                        /*<div className="form-group col-sm-12">
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
                        </div>*/
                      }

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
                          <label htmlFor="file-4">
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

      {
        selectedListId ?
          <SmartListTableLayout id={selectedListId} closeSmartListPopup={closeSmartListPopup} />
          : null
      }
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
