import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { loader } from "../../../../../loader";
import { connect } from "react-redux";
import {
  getWebinarSelectedSmartListData,
  getWebinarEmailData,
  getWebinarDraftData,
} from "../../../../../actions";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { popup_alert } from "../../../../../popup_alert";
import * as XLSX from "xlsx";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Accordion from "react-bootstrap/Accordion";
import Select from "react-select";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import SmartListTableLayout from "../../../../CommonComponent/SmartListTableLayout";
import SmartListLayout from "../../../../CommonComponent/SmartListLayout";

var new_object;
var draft_object;
var old_object = {};
const WebinarSelectSmartList = (props) => {
  const location = useLocation();
    const { eventIdContext, handleEventId } = useSidebar()
    const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"))
    const [eventId, setEventId] = useState(
        eventIdContext?.eventId
            ? eventIdContext?.eventId
            : localStorageEvent?.eventId
    );
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
  const checkPdfSelected=useRef(location?.state?.flag==2?true:false)
  const [fileLength, setFileLength] = useState();
  const [getCreatedListName, setCreatedListName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [validationError, setValidationError] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [getloadmore, setloadmore] = useState(0);
  const [showfilter, setShowFilter] = useState(false);
  const [filterdata, setFilterData] = useState([]);
  const [updateflag, setUpdateFlag] = useState(0);
  const [getFilterIbu, setFilterIbu] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterapplied, setFilterApply] = useState(false);
  const [prevsmartListData, setPrevSmartListData] = useState([]);
  // const [isToggled, setIsToggled] = useState(true); 
  const [isToggled,setIsToggled]=useState(location?.state?.thisEventToggled!=null&&
    location?.state?.thisEventToggled!="undefined"&&location?.state?.thisEventToggled
     ? 
    location?.state?.thisEventToggled 
    : draft_object?.campaign_data?.thisEventToggled
      ? draft_object?.campaign_data?.thisEventToggled
      : 1
  )

  const [typeOfHcp,setTypeOfHcp]=useState(location?.state?.typeOfHcp!=null&&
    location?.state?.typeOfHcp!="undefined"&&location?.state?.typeOfHcp
    ?location?.state?.typeOfHcp
    :draft_object?.campaign_data?.typeOfHcp
    ?draft_object?.campaign_data?.typeOfHcp
    :""
  )
  
  const inputElement = useRef();
  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  const [selectedListId, setSelectedListId] = useState(0);
  const [addListOpen, setAddListOpen] = useState(false);
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

  useEffect(() => {
    if (location?.state?.typeOfHcp) {
      setTypeOfHcp(location?.state?.typeOfHcp);
    } else {
      setTypeOfHcp(draft_object?.campaign_data?.typeOfHcp);
    }
    if (location?.state?.thisEventToggled) {
      setIsToggled(location?.state?.thisEventToggled);
    } else  {
     
      setTypeOfHcp(
        draft_object?.campaign_data?.thisEventToggled
        ?draft_object?.campaign_data?.thisEventToggled
        :1
        );
    }
    getSmartListData(1);
  }, []);

  const getSmartListData = (page = 1) => {
    setApiCallStatus(false);
    const body = {
      user_id: localStorage.getItem("user_id"),
      search: "",
      filter: filter,
      paging: "32",
      event_id: isToggled==1 ? eventId : '',
    };
    loader("show");
    axios
      .post(`distributes/get_smart_list?page=` + page, body)
      .then((res) => {
        setSendListData(res?.data?.response?.data);
        if(filterdata?.length == 0){
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
      ? new_object?.id
      : draft_object?.campaign_data?.smart_list_id
        ? draft_object?.campaign_data?.smart_list_id
        : 0;
    setselecedlistid(listid);
    setPdfSelected(listid);
  }, []);

  // useEffect(() => {
  //   if (PdfSelected !== 0) {
  //     inputElement.current.classList.remove("disabled");
  //   }
  // }, [PdfSelected]);

  const handleSelect = (e) => {
    // setCheckPdfSelected(false)
    if(PdfSelected==e?.id){
      checkPdfSelected.current=!checkPdfSelected.current
    }else{
      checkPdfSelected.current=false
    }
    
    
    if (new_object?.id) {
      if (e.id != new_object?.id) {
        if (old_object?.removedHcp) {
          old_object.removedHcp = [];
        }
        if (old_object?.addedHcp) {
          old_object.addedHcp = [];
        }

        if(draft_object?.campaign_data?.removedHcp){
          draft_object.campaign_data.removedHcp = [];
        }

        if(draft_object?.campaign_data?.addedHcp){
          draft_object.campaign_data.addedHcp = [];
        }
      }
    }

    if (PdfSelected != "") {
      if (PdfSelected == e?.id) {
        setSmartListSelected({});
        props.getWebinarSelectedSmartListData(null);
        setPdfSelected(0);
        setselecedlistid(0);
      } else {
        setSmartListSelected(e);
        props.getWebinarSelectedSmartListData(e);
        setPdfSelected(e?.id);
        setselecedlistid(e?.id);
      }
    } else {
      setSmartListSelected(e);
      props.getWebinarSelectedSmartListData(e);
      setPdfSelected(e?.id);
      setselecedlistid(e?.id);
    }
  };

  const backClicked = () => {
    navigate("/webinar/email/selectHCP");
  };

  const saveAsDraft = async (flag) => {
    const body = {
      pdf_id:0,
      user_id: localStorage.getItem("user_id"),
      event_id:eventId,
      description: old_object?.emailDescription
        ? old_object?.emailDescription
        : draft_object?.description
          ? draft_object?.description
          : "",
      creator: old_object?.emailCreator
        ? old_object?.emailCreator
        : draft_object?.creator
          ? draft_object?.creator
          : "",
          campaign_name: "webinar",
      // campaign_name: old_object?.emailCampaign
      //   ? old_object?.emailCampaign
      //   : draft_object?.campaign,
      subject: old_object?.emailSubject
        ? old_object?.emailSubject
        : draft_object?.subject,
      route_location: "webinar/email/selectSmartList",
      tags: old_object?.tags ? old_object?.tags : draft_object?.tags,
      campaign_data: {
        template_id: old_object?.templateId
          ? old_object?.templateId
          : draft_object?.campaign_data?.template_id,
        smart_list_id: PdfSelected,
        list_selection: old_object?.selected
          ? old_object?.selected
          : props.getWebinarDraftData?.campaign_data?.list_selection
            ? props.getWebinarDraftData?.campaign_data?.list_selection
            : 0,
            auto_responder_id: old_object?.templateId
            ? old_object?.templateId
            : draft_object?.campaign_data?.template_id,

        // selectedHcp: selectedHcp,
        thisEventToggled:isToggled,
        typeOfHcp:typeOfHcp
      },
      source_code: old_object?.template
        ? old_object?.template
        : draft_object?.source_code
          ? draft_object?.source_code
          : "",
      campaign_id: campaign_id_st ? campaign_id_st : "",
      status: 2,
      auto_responder_id: old_object?.templateId
      ? old_object?.templateId
      : props?.getWebinarDraftData?.campaign_data?.template_id
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        if (res?.data?.status_code === 200) {
          setCampaign_id(res?.data?.response?.data?.id);
          if (flag == "draft") {
            popup_alert({
              visible: "show",
              message: "Your changes has been saved <br />successfully !",
              type: "success",
              redirect: "/webinar/email",
            });
          } else {
            body.campaign_id = res?.data?.response?.data?.id;
            props.getWebinarDraftData(body);
            localStorage.setItem("webinar_sd_i", res?.data?.response?.data?.id);
            navigate("/webinar/email/smartlist/createsmartlist");
          }
        } else {
          toast.warning(res?.data?.message);
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
    window.open("/webinar/email/smartlist/createsmartlist", "_blank");
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
        if (res?.data?.status_code == 200) {
          setReaderDetails(res?.data?.response?.data);
          setSmartListName(res?.data?.response?.smart_list_name);
          setSmartListPopupStatus(true);
        } else {
          toast.warning(res?.data?.message);
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
    var files = event?.target?.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      var data = event?.target?.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData?.SheetNames[0];
      const ws = readedData?.Sheets[wsname];

      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setFileLength(dataParse?.length);
    };
    reader.readAsBinaryString(f);
    setSelectedFile(event?.target?.files[0]);
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

    if (getCreatedListName?.trim() === "") {
      error.getCreatedListName = "Please enter the smart list name";
      // toast.warning("Please enter the smart list name first.");
      // return false;
    }
    if (creatorName?.trim() === "") {
      error.creatorName = "Please enter the creator name";
      // return false;
    }

    if (localStorage.getItem('user_id') == 'B7SHpAc XDXSH NXkN0rdQ==' && customIbu?.trim() === "") {
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
    formData.append("event_id", eventId);

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    setShowProgressBar(true);
   
    await axios
      .post(`distributes/create_upload_list`, formData)
      .then((res) => {
        if (res?.data?.status_code === 200) {
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
    setCreatedListName(event?.target?.value);
  };

  const handleCreatorName = async (event) => {
    setCreatorName(event?.target?.value);
  };

  const handleIBUChange = async(value) => {
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
    let getfilter = ''
    if(ibu == 'All'){
      ibu = ['All','Critical Care','Haematology','Immunotherapy'];
      let get_creator_index = getFilterIbu.indexOf('All');
      getFilterIbu.length = 0;
      if(get_creator_index != -1){
        setFilterIbu([]);
      }else{
        // let ibuToAdd = ibu.filter(item => !getFilterIbu.includes(item));
        getFilterIbu.push(...ibu);
        setFilterIbu(getFilterIbu);
      }
    }else{
      let get_creator_index = getFilterIbu.indexOf(ibu);
      if (get_creator_index !== -1) {

        getFilterIbu.splice(get_creator_index, 1);        
        let index = getFilterIbu.indexOf('All');
        if (index !== -1) {
          getFilterIbu.splice(index, 1);
        }
        setFilterIbu(getFilterIbu);
      } else {
        getFilterIbu.push(ibu);
        setFilterIbu(getFilterIbu);
      }
    }
    
    getfilter = getFilterIbu;
    if (getfilter?.hasOwnProperty("ibu")) {
      getfilter.ibu = getFilterIbu;
    } else {
      // getfilter = Object.assign({ ibu: getFilterIbu }, filter);
      getfilter = Object.assign({}, filter, { ibu: getFilterIbu });
    }
    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const removeindividualfilter = (src, item) => {
    loader("show");
    if (src == "ibu") {
      handleIBUFilterChange(item);
    }
    if (filterapplied) {
      getSmartListData(1);
    } else {
      loader("hide");
    }
    setShowFilter(false);
  };

  const viewSmartListData = async(id) => {
    setAddListOpen(false);
    setSelectedListId(id);
  }

  const closeSmartListPopup = async() => {
    setSelectedListId(0);
    setAddListOpen(true);
  }

  const handleToggle = async(e) => {
    if(isToggled==1){
      setIsToggled(2);
    }else{
      setIsToggled(1);
    }
    
  }

  useEffect(() => {
  
    getSmartListData(1);
  }, [isToggled]);

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
                      <Link to="/webinar/email/create-new-email">Create Your Email</Link>
                    </li>
                    <li className="active active-main">
                      <Link to="/webinar/email/selectSmartList">
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
                        to="/webinar/email/selectSmartListUsers"
                        state={{ smartListSelected: smartListSelected, flag: 1 ,typeOfHcp:typeOfHcp,thisEventToggled:isToggled}}
                      >
                        <button
                          ref={inputElement}
                          // className="btn btn-primary btn-filled next disabled"
                          className="btn btn-primary btn-filled next"
                        >
                          Next
                        </button>
                      </Link>
                    )} 
                  </div>
                </div>
              </div>
            </div>

            <section className="search-hcp webinar-smart">
              <div className="select-smart-list">
                <div className="table-title webinar-smart">

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
                  <div className="hcp-options d-flex align-items-center justify-content-between">
                    <div className="switch6">
                      <label className="switch6-light">
                       
                        <input type="checkbox"
                          checked={isToggled==1?true:false}
                          onChange={(e) => {
                            handleToggle(e.target?.checked);
                          }}
                        />
                        <span>
                          <span>All Smart List
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0001 6.99995C14.0001 8.50257 13.5241 9.89606 12.7153 11.0377C12.4271 11.2905 11.9806 11.3315 11.81 11.2323C11.7665 11.2071 11.7514 11.1858 11.768 11.1189C11.9377 10.4354 11.9106 10.0843 11.8843 9.74482C11.8733 9.6017 11.8627 9.46646 11.8663 9.30284C11.8829 8.51547 11.7753 8.045 11.5175 7.77711C11.2531 7.50272 10.8886 7.4964 10.5364 7.49049C10.2793 7.48609 10.0139 7.48155 9.74501 7.38825C8.93328 6.84679 9.15966 6.49039 9.47174 5.99875C9.65048 5.71736 9.85152 5.40075 9.73979 5.06745C9.78545 4.97719 9.92266 4.82926 9.99351 4.80944C10.5727 4.99054 11.9777 5.02493 12.2463 4.95143C12.5304 4.87356 12.7749 4.40502 12.7311 4.02317C12.6897 3.66141 12.4079 3.43533 11.9771 3.41841C11.9132 3.41581 11.7939 3.42707 11.5519 3.45018C11.2549 3.47867 10.5979 3.54156 10.3637 3.51348C10.2858 3.24226 10.2259 2.69847 10.4634 2.48161C10.7081 2.25775 11.1453 2.11173 11.4646 2.00512C11.5974 1.96079 11.7001 1.92585 11.7811 1.89213C13.1458 3.17034 14.0001 4.98712 14.0001 6.99995ZM3.01071 1.2515C3.26405 1.33063 3.44734 1.39612 3.59773 1.45007C4.20181 1.66622 4.26562 1.66611 5.30206 1.44799C5.98224 1.30473 6.12686 1.42349 6.34618 1.60333C6.52616 1.75098 6.75046 1.93468 7.2249 2.00225C7.36816 2.02275 7.5641 2.02866 7.66743 2.14438C7.71725 2.20052 7.73858 2.27757 7.74063 2.35257C7.74463 2.50463 7.69327 2.6483 7.66853 2.79634C7.64788 2.91895 7.64528 3.05957 7.55185 3.15369C7.439 3.26736 7.20139 3.27548 7.05195 3.30643C6.62468 3.39489 6.25814 3.5365 5.87133 3.73436C5.51108 3.91863 5.06278 4.14786 4.93068 4.82404C4.89284 5.01916 4.62191 5.07295 4.21269 5.13267C3.84571 5.18618 3.46634 5.2415 3.32473 5.54712C3.16966 5.8812 3.41018 6.22798 3.568 6.51104C3.72006 6.78336 3.88213 7.08799 4.15516 7.25796C4.36376 7.38798 4.57428 7.36334 4.92311 7.32263C5.04998 7.30789 5.20781 7.28946 5.39823 7.27434C5.6257 7.27434 7.26111 7.73199 7.82168 8.33085C7.93245 8.44892 7.98473 8.55679 7.97773 8.65118C7.92146 9.39067 7.57662 9.79754 7.21156 10.2284C6.8685 10.6329 6.51418 11.0512 6.43013 11.7284C6.33325 12.5113 6.05295 12.9105 5.9232 12.9139H5.92211C5.83335 12.9139 5.53711 12.6449 5.32189 11.4387C5.06319 9.98714 4.61697 9.68455 4.25852 9.44141C3.96651 9.24325 3.75558 9.10016 3.74361 8.04434C3.73576 7.34437 3.36711 6.84567 2.77088 6.50029C2.2345 6.18972 1.24543 5.61578 0.67643 4.0002C1.20345 2.89349 2.01283 1.94625 3.01071 1.2515ZM7.00008 14.0001C9.03068 14.0001 10.8618 13.1306 12.1416 11.7449C12.1107 11.747 12.0797 11.7484 12.0491 11.7484C11.8727 11.7484 11.7073 11.7123 11.5755 11.6358C11.3474 11.5034 11.25 11.2679 11.315 11.0064C11.4667 10.3963 11.4433 10.0973 11.4189 9.78089C11.4075 9.63268 11.3955 9.47967 11.3995 9.29296C11.4127 8.66619 11.3392 8.26506 11.1811 8.10078C11.0574 7.97226 10.8623 7.96277 10.5284 7.95698C10.239 7.95216 9.91093 7.94653 9.55976 7.81758C9.54283 7.81137 9.52675 7.80341 9.51188 7.79363C8.98141 7.44576 8.72274 7.07727 8.72066 6.66734C8.71916 6.31356 8.90961 6.01346 9.07761 5.74856C9.24591 5.48354 9.34429 5.31401 9.28938 5.1958C9.19718 4.99751 9.37196 4.75519 9.48423 4.62834C9.69161 4.394 9.92469 4.29658 10.123 4.36097C10.6115 4.51948 11.8963 4.54248 12.1124 4.50341C12.1799 4.45099 12.3055 4.20782 12.2606 4.03914C12.2513 4.00351 12.2224 3.89506 11.959 3.88475C11.9205 3.88366 11.7482 3.90015 11.5962 3.91475C10.3686 4.03225 10.0795 4.01051 9.96775 3.792C9.75198 3.36943 9.7484 2.67895 10.0209 2.28375C10.0576 2.23037 10.1005 2.18096 10.1483 2.13721C10.4663 1.84647 10.9579 1.6823 11.3166 1.56245C11.3366 1.55583 11.357 1.54897 11.3776 1.54208C10.178 0.577938 8.65558 0 7.00008 0C5.73429 0 4.54595 0.337668 3.52026 0.927855C3.6097 0.958809 3.68758 0.98648 3.75501 1.01068C4.25849 1.19066 4.25849 1.19066 5.20573 0.991293C6.04043 0.815555 6.32745 0.984539 6.64188 1.24242C6.7979 1.37025 6.94515 1.49105 7.2908 1.54033C7.59557 1.58367 7.86103 1.63581 8.0238 1.83466C8.28401 2.15236 8.15976 2.71146 8.07926 3.0739C8.01787 3.34953 7.8686 3.58758 7.58223 3.66477C7.32039 3.73524 7.05053 3.76852 6.79156 3.85011C6.54732 3.92716 6.3076 4.03534 6.08388 4.1498C5.75846 4.31629 5.4772 4.46009 5.38885 4.91348C5.2844 5.44764 4.70373 5.53241 4.2799 5.59434C4.09413 5.62157 3.78358 5.66686 3.74793 5.74336C3.74615 5.74708 3.70776 5.83857 3.9019 6.14983L3.97827 6.27298C4.18425 6.60393 4.3085 6.80373 4.4018 6.86178C4.46923 6.90375 4.58645 6.89205 4.86883 6.85915C5.00008 6.84373 5.1637 6.82475 5.36378 6.80879C5.65343 6.78568 7.41554 7.26657 8.12325 7.97166C8.35387 8.20132 8.46161 8.44197 8.4429 8.68651C8.3752 9.57693 7.94618 10.0833 7.56733 10.5301C7.24147 10.9146 6.96011 11.2467 6.89322 11.7857C6.77515 12.7421 6.39909 13.3681 5.93565 13.3804C5.93042 13.3805 5.92547 13.3806 5.9205 13.3806C5.43834 13.3806 5.08252 12.755 4.86232 11.5205C4.63805 10.2628 4.29704 10.0315 3.9964 9.82748C3.57052 9.53865 3.29049 9.25892 3.27688 8.04953C3.27138 7.54261 2.96535 7.15222 2.53684 6.904C2.03982 6.61612 1.0634 6.05043 0.418742 4.61442C0.147793 5.3594 0 6.1626 0 6.99989C0.000109375 10.8598 3.14021 14.0001 7.00008 14.0001Z" fill="#0066BE" />
                            </svg>
                          </span>
                          <span>
                            This Event
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M6.99996 0C4.2042 0 1.92969 2.27451 1.92969 5.07024C1.92969 8.53983 6.46708 13.6334 6.66027 13.8485C6.84172 14.0506 7.15852 14.0503 7.33965 13.8485C7.53283 13.6334 12.0702 8.53983 12.0702 5.07024C12.0702 2.27451 9.79569 0 6.99996 0ZM6.99996 7.62122C5.59334 7.62122 4.449 6.47686 4.449 5.07024C4.449 3.66362 5.59337 2.51929 6.99996 2.51929C8.40655 2.51929 9.55088 3.66365 9.55088 5.07027C9.55088 6.47689 8.40655 7.62122 6.99996 7.62122Z" fill="#0066BE" />
                            </svg>
                          </span>
                        </span>
                        <a className="btn btn-primary"></a>
                      </label>
                    </div>
                  
                  {
                    localStorage.getItem('user_id') == 'B7SHpAc XDXSH NXkN0rdQ==' ?
                    <div className="filter_btn_div">
                        

                        {updateflag > 0 &&
                          (
                            getFilterIbu?.length > 0 ) && (
                            <div className="apply-filter">
                              <div className="filter-block">
                                <div className="filter-block-left full">
                                  {getFilterIbu?.length > 0 && (
                                    <div className="filter-div">
                                      <div className="filter-div-title">
                                        <span>IBU |</span>
                                      </div>
                                      <div className="filter-div-list">
                                        {Object.entries(getFilterIbu)?.map(
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
                                          {Object.entries(filterdata?.ibu)?.map(
                                            ([index, item]) => (
                                              <li key={item}>
                                                <label className="select-multiple-option">
                                                  <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-ibu-${index}`}
                                                    name="ibu[]"
                                                    value={item}
                                                    checked={
                                                      updateflag > 0 &&
                                                      typeof getFilterIbu !==
                                                        "undefined" &&
                                                        getFilterIbu.indexOf(item) !==
                                                        -1
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
                </div>
                 

                <div className="col smartlist-result-block">
                  {
                    apiCallStatus && SendListData?.length > 0
                      ?
                      SendListData?.map((template) => {
                        return (
                          <div className="smartlist_box_block new-smartlist">
                            <div className="smartlist-view email_box">
                              <div className="mail-box-content">
                              <div className="mail-box-conten-title">
                                <h5>{template?.name}</h5>
                                <div className="select-mail-option">
                                <input
                                    onClick={() => handleSelect(template)}
                                    type="radio"
                                    name="radio"
                                    checked={
                                      template?.id == PdfSelected
                                        ? true
                                        : template?.id == getselecedlistid &&
                                          !PdfSelected
                                          ? true
                                          : false
                                    }
                                  />
                                 
                                  {/* {checkPdfSelected.current==true?(<>                                  
                                    <input
                                    onClick={() => handleSelect(template)}
                                    type="radio"
                                    name="radio"
                                    checked={false}
                                  />
                                  </>):(<>                                   
                                    <input
                                    onClick={() => handleSelect(template)}
                                    type="radio"
                                    name="radio"
                                    defaultChecked={
                                      template?.id == PdfSelected
                                        ? true
                                        : template?.id == getselecedlistid &&
                                          !PdfSelected
                                          ? true
                                          : false
                                    }
                                  /></>)
                                   }  */}
                                 
                                  <span className="checkmark"></span>
                                </div>
                                </div>
                                <SmartListLayout data= {template} iseditshow={0} isviewshow={1} deletestatus = {0} viewSmartListData = {viewSmartListData} webinarFlag={1}/>

                                {/* <div className="mailbox-table">
                                  <table>
                                    <tbody>
                                      <tr>
                                        <th>Contact type</th>
                                        <td>{template?.contact_type}</td>
                                      </tr>
                                      <tr>
                                        <th>Speciality</th>
                                        <td>{template?.speciality}</td>
                                      </tr>
                                      <tr>
                                        <th>Readers</th>
                                        <td>{template?.reader_selection}</td>
                                      </tr>
                                      <tr>
                                        <th>IBU</th>
                                        <td>{template?.ibu}</td>
                                      </tr>
                                      <tr>
                                        <th>Product</th>
                                        <td>{template?.product}</td>
                                      </tr>
                                      <tr>
                                        <th>Country</th>
                                        <td>{template?.country}</td>
                                      </tr>
                                      <tr>
                                        <th>Registered</th>
                                        <td>{template?.registered}</td>
                                      </tr>
                                      <tr>
                                        <th>Created by</th>
                                        <td>
                                          <span>{template?.creator}</span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>

                                <div className="mail-time">
                                  <span> {template?.created_at}</span>
                                </div>
                                <div className="smart-list-added-user">
                                  <img
                                    src={path_image + "smartlist-user.svg"}
                                    alt="User icon"
                                  />
                                  {template?.readers_count}
                                </div>

                                <div className="smartlist-buttons">
                                  <button className="btn view">
                                    <a
                                      className="color_blue"
                                      onClick={() =>
                                        openSmartListPopup(template?.id)
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
                  getloadmore === 0&&apiCallStatus && (
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
              getReaderDetails?.length > 0 &&
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
                      getReaderDetails?.length > 0 &&
                      getReaderDetails?.length}
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
                      {localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
                        <th scope="col">IRT mandatory training</th>
                      ) : (
                        <th scope="col">Business unit</th>
                      )}
                      {localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
                        <th scope="col">IRT role</th>
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
                      getReaderDetails?.length > 0 &&
                      getReaderDetails?.map((rr, i) => {
                        return (
                          <>
                            <tr>
                              <td>{rr?.first_name}</td>
                              <td>{rr?.email}</td>
                              <td>{rr?.bounce}</td>
                              <td>{rr?.country}</td>
                              <td>
                                {localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg=="
                                  ? rr?.irt
                                    ? "Yes"
                                    : "No"
                                  : rr?.ibu
                                    ? rr?.ibu
                                    : "N/A"}
                              </td>
                              <td>
                                {localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg=="
                                  ? rr?.user_type != 0
                                    ? rr?.user_type
                                    : "N/A"
                                  : rr?.contact_type
                                    ? rr?.contact_type
                                    : "N/A"}
                              </td>
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr?.consent ? rr?.consent : "N/A"}</span>{" "}
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr?.email_received
                                      ? rr?.email_received
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr?.email_opening
                                      ? rr?.email_opening
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr?.registration ? rr?.registration : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr?.last_email ? rr?.last_email : "N/A"}
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
                      {file_name?.current?.files === undefined ||
                        file_name?.current.files?.length === 0 ? (
                        <>
                          <label htmlFor="file-4">
                            <span>Choose Your File</span>
                          </label>
                          <p>Upload your new list file</p>
                        </>
                      ) : (
                        <h5>{file_name?.current?.files[0]?.name}</h5>
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
                {file_name?.current?.files === undefined ||
                  file_name?.current?.files?.length === 0 ? (
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
          ) : null}
        </Modal.Body>
      </Modal>
      {/*Modal For Creating Smart list with Excel File end*/}
      {
        selectedListId ?
         <SmartListTableLayout id = {selectedListId}  closeSmartListPopup = {closeSmartListPopup} />
         : null
      }
    </>
  );
};

const mapStateToProps = (state) => {
  new_object = state.getWebinarSelectedSmartListData;
  old_object = state.getWebinarEmailData ? state.getWebinarEmailData : {};
  draft_object = state.getWebinarDraftData ? state.getWebinarDraftData : {};
  return state;
};

export default connect(mapStateToProps, {
  getWebinarDraftData: getWebinarDraftData,
  getWebinarSelectedSmartListData: getWebinarSelectedSmartListData,
  getWebinarEmailData: getWebinarEmailData,
})(WebinarSelectSmartList);
