import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { loader } from "../../../loader";
import { connect } from "react-redux";
import { Col, Modal, Row } from "react-bootstrap";
import { getListId } from "../../../actions";
import { toast } from "react-toastify";
import { popup_alert } from "../../../popup_alert";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import CommonModel from "../../../Model/CommonModel";
import SmartListLayout from "../../CommonComponent/SmartListLayout";
import SmartListTableLayout from "../../CommonComponent/SmartListTableLayout";
import { surveyAxiosInstance } from "../../surveybuilder/CommonFunctions/CommonFunction";
import { surveyEndpoints } from "../../surveybuilder/SurveyEndpoints/SurveyEndpoints";

const SmartList = (props) => {
  // const RouteName=
     const{DOWNLOAD_SMART_LIST} = surveyEndpoints
  const type= props?.type === "survey" ? "survey" : 0;
  const navigate = useNavigate();
  const rdLikeArray=["56Ek4feL/1A8mZgIKQWEqg==","bWmUjqX7J011   WUTYn9g==","MXl8m36VZFYXpgFVz3Pg0g=="]
  const isLikeRdAccount= rdLikeArray.includes(localStorage.getItem("user_id"))
  const [smartListData, setSmartListData] = useState([]);
  const [getUserDetails, setUserDetails] = useState([]);
  const [prevsmartListData, setPrevSmartListData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [deletestatus, setDeleteStatus] = useState(false);
  const [editstatus, setEditStatus] = useState(false);
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [deletecardid, setDeleteCardId] = useState();
  const [filterdata, setFilterData] = useState([]);
  const [getfiltername, setFilterName] = useState([]);
  const [getFilterCreator, setFilterCreator] = useState([]);
  const [getFilterIbu, setFilterIbu] = useState([]);
  const [filterdate, setFilterDate] = useState([]);
  const [filter, setFilter] = useState("");
  const [updateflag, setUpdateFlag] = useState(0);
  const [showfilter, setShowFilter] = useState(false);
  const [filterapplied, setFilterApply] = useState(false);
  const [getloadmore, setloadmore] = useState(0);
  const [show,setShow] = useState(false)
  const [opening_details, setOpeningDetails] = useState([]);
  const [flag, setFlag] = useState(0);
  const [downloadStatus,setDownloadStatus] = useState(false)
  const [selectedListId, setSelectedListId] = useState(0);
  const [userObj, setUserObj] = useState({
    "name":""
  });
  const [modelData,setModelData] =  useState([
    {
      label: "Name",
      type: "input",
      placeholder: "Smart list name",
      value:""
    },
  ])

   const deletButtonColor = isLikeRdAccount ? '#8A4E9C' : '#0066be'
   const isRDAccount = isLikeRdAccount

  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED;
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  const buttonRef = useRef(null);
  const filterRef = useRef(null);

  const body = {
    user_id: localStorage.getItem("user_id"),
    type:type == "survey" ? 1 :type,
    // user_id: "56Ek4feL/1A8mZgIKQWEqg==",
    search: search,
    filter: filter,
    paging: "31",
  };
  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const getSmartListData = async (flag, page = 1) => {
    loader("show");
    await axios
      .post(`distributes/get_smart_list?page=` + page, body)
      .then((res) => {
        setLoading(false);
        setSmartListData(res?.data?.response?.data);
        if (flag == 0) {
          setFilterData(res?.data?.response?.filter);
          setPrevSmartListData(res?.data?.response?.data);
        }
        setUserDetails(res?.data?.response?.userdetails);
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        console.log(err);
      });
  };

  

  useEffect(() => {
  
    getSmartListData(0);

   
    function handleOutsideClick(event) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setShowFilter(false);
      }
    }

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };

  }, []);

  const linkClicked = (data) => {
    props.getListId(data);
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value == "") {
      setSmartListData(prevsmartListData);
      // getSmartListData(1);
    }
  };
  const handleClick = (data,index)=>{
    const newData = [...modelData]
    newData[0].value = data.name
    setUserObj({"id":data?.id,"index":index})
    setModelData(newData)
    setShow(true)
  }

  const submitHandler = (event) => {
    setShowFilter(false);
    if (search.length > 2) {
      getSmartListData(1);
    } else {
      toast.error("Please enter three letters minimum.");
    }
    event.preventDefault();
    return false;
  };

  const showDeleteButtons = () => {
    if (deletestatus) {
      setDeleteStatus(false);
    } else {
      setDeleteStatus(true);
    }
  };

  const showEditButtons = () => {
    if (editstatus) {
      setEditStatus(false);
    } else {
      setEditStatus(true);
    }
  };

  const showConfirmationPopup = (id) => {
    if (confirmationpopup) {
      setConfirmationPopup(false);
    } else {
      setConfirmationPopup(true);
    }
    setDeleteCardId(id);
  };

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };

  const deleteEmail = () => {
    hideConfirmationModal();
    const body = {
      user_id: localStorage.getItem("user_id"),
      smart_list_id: deletecardid,
      type:type == "survey" ? 1 :type,
    };
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");

    axios
      .post(`distributes/delete_smart_list`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          var updatedArray = smartListData.filter(function (item) {
            return item["id"] != deletecardid;
          });
          if (typeof updatedArray !== "undefined") {
            setSmartListData(updatedArray);
          }
          popup_alert({
            visible: "show",
            message: "The Smart List has been deleted <br />successfully !",
            type: "success",
            redirect: "",
          });
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
      });
  };

  const handleDownload = async (list_id,name) => {
    
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
   
    const requestData = {
      user_id: localStorage.getItem("user_id"),
      list_id: list_id,
    };

    try {
      loader("show")
      const response = await axios.post(DOWNLOAD_SMART_LIST, requestData, {
        responseType: "blob", // Ensure the response is treated as a binary Blob
      });
    
      // Extract filename from Content-Disposition header (if available)
      const contentDisposition = response.headers["content-disposition"];
      let filename = `${name}.xlsx`; // Default filename
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match.length > 1) {
          filename = match[1];
        }
      }
    
      // Create a Blob URL
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
    
      // Create a temporary <a> element to trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
    
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      loader("hide")
    } catch (error) {
      loader("hide")
      console.error("Error downloading file:", error);
    }
  };






  const handleNameChange = (name) => {
    let get_name_index = getfiltername.indexOf(name);
    if (get_name_index !== -1) {
      getfiltername.splice(get_name_index, 1);
      setFilterName(getfiltername);
    } else {
      getfiltername.push(name);
      setFilterName(getfiltername);
    }

    let getfilter = getfiltername;
    if (getfilter.hasOwnProperty("name")) {
      getfilter.name = getfiltername;
    } else {
      getfilter = Object.assign({ name: getfiltername }, filter);
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

  const handleIBUChange = (ibu) => {
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
  }


  const handleOnFilterDate = (fdate) => {
    let date_index = filterdate.indexOf(fdate);
    if (date_index !== -1) {
      filterdate.splice(date_index, 1);
      setFilterDate(filterdate);
    } else {
      filterdate.push(fdate);
      setFilterDate(filterdate);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("date")) {
      getfilter.date = filterdate;
    } else {
      getfilter = Object.assign({ date: filterdate }, filter);
    }
    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleChange = (e) =>{
    setUserObj({...userObj,"name":e.target.value})
  }
  const handleSubmit =async (data) =>{
    try{
      loader("show")
      const result =  await axios.post(`distributes/update_smart_list_name`,{
        "user_id":localStorage.getItem('user_id'),
        "smart_list_id":userObj?.id,
         "name":userObj?.name
      } )
      let listData = [...smartListData]
      listData[userObj?.index].name = userObj?.name
      setSmartListData(listData)
  }catch(err){
    console.log(err);
  }
  finally{
    loader("hide");
  }
  }

  const clearFilter = () => {
    document.querySelectorAll("input").forEach((checkbox) => {
      checkbox.checked = false;
    });
    setFilterName([]);
    setFilterCreator([]);
    setFilterIbu([]);
    setFilterDate([]);
    setFilter([]);
    let up = updateflag + 1;
    setUpdateFlag(up);
    if (filterapplied) {
      setSmartListData(prevsmartListData);
    }
    setShowFilter(false);
  };

  const applyFilter = () => {
    setFilterApply(true);
    getSmartListData(1);
    setShowFilter(false);
  };

  const removeindividualfilter = (src, item) => {
    loader("show");
    if (src == "name") {
      handleNameChange(item);
    } else if (src == "date") {
      handleOnFilterDate(item);
    } else if (src == "creator") {
      handleCreatorChange(item);
    }else if (src == "ibu") {
      handleIBUChange(item);
    }
    if (filterapplied) {
      getSmartListData(1);
    } else {
      loader("hide");
    }
    setShowFilter(false);
  };

  const load_more = () => {
    getSmartListData(0, 2);
    setloadmore(1);
  };

  const viewSmartListData = async(id) => {
    setSelectedListId(id);
  }

  const closeSmartListPopup = async() => {
    setSelectedListId(0);
  }

  const EditList = async(data) => {
    let redirectRoute = '';
    if(data?.upload_by_filter == 1){
      const redirectRouteType = type == "survey" ? "/survey/EditList" : "/EditList"
      redirectRoute = redirectRouteType+'?listId='+data?.id;
    }else{
      const redirectRouteType = type == "survey" ? "/survey/ViewSmartList" : "/ViewSmartList";
      redirectRoute = redirectRouteType+'?listId='+data?.id;
    }
    navigate(redirectRoute);
  }

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header sticky">
              <div className="page-title"> <h2>Smart List</h2></div>
              <div className="top-right-action">
              {/* {isLikeRdAccount ? ( */}
                  <div className="action-btn-add" style={{margin:"0"}}>
                    <Link  to={ type == "survey" ? "/survey/smartlist/createlist" : "/CreateSmartList"}
                    state={{ creator: getUserDetails?.name }} className="btn-dashed">Create Smart List <img src={path_image + "add-icon.png"} alt="" /></Link>
                    {
                      smartListData?.length > 0 && (
                        editstatus ? (
                          <button
                            className="btn btn-outline-primary btn-filled"
                            onClick={(e) => showEditButtons()}
                          >
                            Cancel
                          </button>
                        ) : (
                          <button type="button" className={`btn-white btn btn-primary ${deletestatus || downloadStatus ?"disabled":""}`} onClick={(e) => showEditButtons()}>
                            Edit Smart List
                            <img src={path_image + "edit-button.svg"} alt="Edit" />
                          </button>
                        )
                      )
                    }
                  </div>
                  {
                     smartListData?.length > 0 &&
                      <div className="clear-search">
                      <button title="Download stats" className={`btn btn-outline-primary ${downloadStatus ? "btn-filled" : ""} ${editstatus || deletestatus ?"disabled":""}`} onClick={(e)=>{setDownloadStatus(!downloadStatus)}}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z" fill="#0066BE"></path><path d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z" fill="#0066BE"></path></svg></button>
                      </div>
                  }
                {/* ) : null} */}
                {smartListData !== "undefined" &&
                  smartListData?.length > 0&&(
                  <>
                    <div className="search-bar">
                      <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                          onChange={(e) => searchChange(e)}
                        />
                        <button className="btn btn-outline" type="submit">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z"
                              fill="#97B6CF"
                            />
                          </svg>
                        </button>
                      </form>
                    </div>

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
                          <Accordion defaultActiveKey="0" flush>
                            {filterdata?.hasOwnProperty("name") &&
                              filterdata.name.length > 0 && (
                                <Accordion.Item className="card" eventKey="0">
                                  <Accordion.Header className="card-header">
                                    Name
                                  </Accordion.Header>
                                  <Accordion.Body className="card-body">
                                    <ul>
                                      {Object.entries(filterdata.name).map(
                                        ([index, item]) => (
                                          <li key={item}>
                                            <label className="select-multiple-option">
                                              <input
                                                type="checkbox"
                                                id={`custom-checkbox-name-${index}`}
                                                name="names[]"
                                                value={item}
                                                checked={
                                                  updateflag > 0 &&
                                                  typeof getfiltername !==
                                                    "undefined" &&
                                                  getfiltername.indexOf(item) !== -1
                                                }
                                                onChange={() =>
                                                  handleNameChange(item)
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

                            {filterdata?.hasOwnProperty("ibu") && localStorage.getItem('user_id') == 'B7SHpAc XDXSH NXkN0rdQ==' &&
                              filterdata.ibu.length > 0 && (
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
                                                handleIBUChange(item)
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

                            {filterdata?.hasOwnProperty("creator") &&
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

                            {filterdata?.hasOwnProperty("created") &&
                              filterdata.created.length > 0 && (
                                <Accordion.Item className="card" eventKey="2">
                                  <Accordion.Header className="card-header">
                                    Created
                                  </Accordion.Header>
                                  <Accordion.Body className="card-body">
                                    <ul>
                                      {Object.entries(filterdata.created).map(
                                        ([index, item]) => (
                                          <li key={item}>
                                            <label className="select-multiple-option">
                                              <input
                                                type="checkbox"
                                                id={`custom-checkbox-date-${index}`}
                                                name="date[]"
                                                value={item}
                                                checked={
                                                  updateflag > 0 &&
                                                  typeof filterdate !==
                                                    "undefined" &&
                                                  filterdate.indexOf(item) !== -1
                                                }
                                                onChange={() =>
                                                  handleOnFilterDate(item)
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

                    <div className="clear-search">
                      {deletestatus ? (
                        <button
                          className="btn btn-outline-primary cancel"
                          onClick={(e) => showDeleteButtons()}
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          className={`btn btn-outline-primary rd ${editstatus || downloadStatus ?"disabled":""}`}
                          onClick={(e) => showDeleteButtons()}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                              fill="#8A4E9C"
                            />
                            <path
                              d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                              fill="#8A4E9C"
                            />
                            <path
                              d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                              fill="#8A4E9C"
                            />
                            <path
                              d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                              fill="#8A4E9C"
                            />
                            <path
                              d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                              fill="#8A4E9C"
                            />
                            <path
                              d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                              fill="#8A4E9C"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {updateflag > 0 &&
              (getfiltername.length > 0 ||
                getFilterCreator.length > 0 ||
                getFilterIbu.length > 0 ||
                filterdate.length > 0) && (
                <div className="apply-filter">
                  <h6>Applied filters</h6>
                  <div className="filter-block">
                    <div className="filter-block-left full">
                      {getfiltername.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Name |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(getfiltername).map(
                              ([index, item]) => (
                                <div
                                  key={item}
                                  className="filter-result"
                                  onClick={(event) =>
                                    removeindividualfilter("name", item)
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

                      {filterdate.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Created |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(filterdate).map(([index, item]) => (
                              <div
                                key={item}
                                className="filter-result"
                                onClick={(event) =>
                                  removeindividualfilter("date", item)
                                }
                              >
                                {item}
                                <img
                                  src={path_image + "filter-close.svg"}
                                  alt="Close-filter"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="clear-filter">
                      <button
                        className="btn btn-outline-primary btn-bordered"
                        onClick={clearFilter}
                      >
                        Remove All
                      </button>
                    </div>
                  </div>
                </div>
              )}

            <div className="smart-list-result">
              <div
               className={`col smartlist-result-block new-smartlist rd`}
              >
                {/* {
                  getfiltername.length == 0 &&
                  getFilterCreator.length == 0 &&
                  getFilterIbu.length == 0 &&
                  filterdate.length == 0 &&
                  !deletestatus && (!isLikeRdAccount && (
                    <div className="smartlist_box_block">
                      <div className="smartlist-add smartlist-view">
                          <>
                            <Link
                              to={type == "survey" ? "/survey/smartlist/createlist" : "/CreateSmartList"}
                              state={{ creator: getUserDetails?.name }}
                            >
                              <img src={path_image + "add-button.svg"} alt="" />
                            </Link>
                            <p>Create New Smart List</p>
                          </>
                      </div>
                    </div>)
                  )
                } */}
                {typeof smartListData !== "undefined" &&
                smartListData.length > 0 ? (
                  smartListData.map((data,index) => {
                    return (
                      // localStorage.getItem('user_id') == 'B7SHpAc XDXSH NXkN0rdQ==' ?
                      <div className="smartlist_box_block" key={index}>
                        <div className="smartlist-view email_box">
                          <div className="mail-box-content">
                          <div className="mail-box-conten-title">
                                <h5>{data.name}</h5>
                                <img className="edit-name" src={path_image + "edit-button.svg"} alt="Edit" onClick={()=>handleClick(data,index)} />
                          </div>
                            <SmartListLayout data= {data} deletestatus={deletestatus} callLinkClickFun={linkClicked} iseditshow={editstatus} isviewshow={1}  isDownloadEnable={downloadStatus} viewSmartListData = {viewSmartListData} type={type} layout={'list'}/>
                            {deletestatus && (
                              <div className="dlt_btn">
                                <button
                                  onClick={(e) =>
                                    showConfirmationPopup(data.id)
                                  }
                                >
                                  <img
                                    src={path_image + "delete.svg"}
                                    alt="Delete Row"
                                  />
                                </button>
                              </div>
                            )}

                            {!deletestatus && editstatus && (
                              <div className="dlt_btn edit_btn">
                                <button
                                  onClick={(e) => EditList(data)}
                                >
                                  <img
                                    src={path_image + "edit-white.svg"}
                                    alt="Edit Row"
                                  />
                                </button>
                              </div>
                            )}

                          {!deletestatus && !editstatus && downloadStatus && (
                              <div className="dlt_btn download_btn">
                                <button
                                  onClick={(e) =>
                                     handleDownload(data?.id,data?.name)
                                  }
                                >
                                   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z" fill="#0066BE"></path><path d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z" fill="#0066BE"></path></svg>
                                </button>
                              </div>
                            )}


                          </div>
                        </div>
                          </div>
                    );
                  })
                ) : (
                  <>
                  <div className="mail_trigger_right_dummy">
                    <div className="mail_trigger_dummy_content d-flex justify-content-center">
                    {isLikeRdAccount ?
                      <h3>Create your first smart list by clicking on Create List button</h3>: <h3>Create your first smart list by clicking on <img src={path_image + "add_smartlist.svg"} alt="" /></h3>}
                    </div>
                  </div>
                    </>
                )}
              </div>
            </div>
            {typeof smartListData !== "undefined" &&
              smartListData.length == 31 &&
              getloadmore === 0 && (
                <div className="load_more">
                  <button
                    className="btn btn-primary btn-filled"
                    onClick={load_more}
                  >
                    Load All
                  </button>
                </div>
              )}
          </Row>
        </div>
      </Col>
      {/*Modal for delete confrimaton start*/}
      <div className="delete">
        <Modal
          className="modal send-confirm"
          id="delete-confirm"
          show={confirmationpopup}
        >
          <Modal.Header>
            {/* <Modal.Title>Heading Text</Modal.Title>*/}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={(e) => hideConfirmationModal()}
            ></button>
          </Modal.Header>

          <Modal.Body>
            <img src={path_image + "alert.png"} alt="" />
            <h4>
              The Smart List will be deleted from the list.
              <br />
              Are you sure you want to delete it?
            </h4>
            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                onClick={(e) => deleteEmail()}
              >
                Yes Please!
              </button>
              <button
                type="button"
                className="btn btn-primary btn-bordered light"
                onClick={(e) => hideConfirmationModal()}
              >
                Cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      {/*Modal for delete confrimaton end*/}
      <CommonModel
        show={show}
        onClose={setShow}
        heading={"Smart List Name"}
        data={modelData}
        footerButton={"Update"}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputValue
      />

      {
        selectedListId ?
         <SmartListTableLayout id = {selectedListId}  closeSmartListPopup = {closeSmartListPopup} />
         : null
      }

    </>

  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { getListId: getListId })(SmartList);
