import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../../loader";
import { Link } from "react-router-dom";
import axios from "axios";
import { getDraftData, getEmailData } from "../../actions";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";

import { toast } from "react-toastify";
import { popup_alert } from "../../popup_alert";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import queryString from "query-string";
import { getSelectedSmartListData } from "../../actions";
const EmailList = (props) => {
  const navigate = useNavigate();
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const queryParams = queryString.parse(window.location.search);

  const [SendListData, setSendListData] = useState([]);
  const [getoriginalsendlistdata, setOriginalSendListData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [submiHandle, setSubmiHandle] = useState("");
  const [getreference, setReference] = useState("");
  const [campaign_id, setCampaignId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [viewEmailModal, setviewEmailModal] = useState(false);
  const [viewEmailData, setviewEmailData] = useState();
  const [deletestatus, setDeleteStatus] = useState(false);
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [verificationpopup, setVerificationPopup] = useState(false);
  const [showfilter, setShowFilter] = useState(false);
  const [deletecardid, setDeleteCardId] = useState();
  const [filtertags, setFilterTags] = useState([]);
  const [filtercreator, setFilterCreators] = useState([]);
  const [filterdate, setFilterDate] = useState([]);
  const [filtercampaign, setFilterCampaigns] = useState([]);
  const [updateflag, setUpdateFlag] = useState([]);
  const [removeFlag, setRemoveFlag] = useState(false);
  const [filterapplied, setFilterApply] = useState(false);
  const [getDraftEmailSendStatus, setDraftEmailSendStatus] = useState(false);
  const [getDraftCamapignId, setDraftCamapignId] = useState(0);
  const [getloadmore, setloadmore] = useState(0);
  const [options_ch, setOptions_ch] = useState({
    chart: {
      type: "column",
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
      },
    },
    title: {
      text: "Mail campaign stats",
    },
    plotOptions: {
      column: {
        depth: 25,
      },
    },
    xAxis: {
      categories: ["Email sent", "Email opened", "Link clicked"],
      labels: {
        skew3d: true,
        style: {
          fontSize: "16px",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    series: [
      {
        name: "Email campaign",
        data: [
          {y: 2, color: '#8a4e9c'}, {y:3,color: '#ffbe2c'}, {y:0,color: '#39cabc'}
        ],
      },
    ],
  });

  useEffect(() => {
    props.getEmailData(null);
    props.getDraftData(null);
    props.getSelectedSmartListData(null);
  }, []);

  const showViewEmailModal = (data) => {
    let id = data;
    if (typeof SendListData !== "undefined") {
      let getSpecificKeyData = SendListData.filter((p) => p.id == id);
      let valueupdate = options_ch;
      valueupdate.series[0].data = [
        {y: getSpecificKeyData[0].total_Sent, color: '#8a4e9c'},
        {y: getSpecificKeyData[0].total_Opened, color: '#ffbe2c'},
        {y: getSpecificKeyData[0].total_Click, color: '#39cabc'}
      ];
      setOptions_ch(valueupdate);
      setviewEmailData(getSpecificKeyData);
    }
    hideModal();
    setviewEmailModal(true);
    setCampaignId(id);
  };
  const hideEmailModal = () => {
    setviewEmailModal(false);
  };
  const showModal = (refernce, id) => {
    hideEmailModal();
    setReference(refernce);
    setCampaignId(id);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const getData = (stage,page=1) => {
    loader("show");
    const body = {
      user_id: localStorage.getItem("user_id"),
      search: search,
      filter: filter,
    };
    axios
      .post(`emailapi/getlist?page=` + page, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          setSendListData(res.data.response.data.emails);
          if (stage == "initial") {
            setOriginalSendListData(res.data.response.data.emails);

            setFilterData(res.data.response.data.filter);

          }
          setUserData(res.data.response.data.user);
        } else if (res.data.status_code == 201) {
          setSendListData([]);
        } else {
          setSendListData([]);
          // toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        // toast.error("Something went wrong");
      });
  };

  const resendemail = () => {
    hideModal();
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      campaign_id: campaign_id,
    };
    loader("show");
    axios
      .post(`emailapi/resend_email`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          toast.success("Email send successfully.");
        } else if (res.data.status_code == 201) {
          toast.warning(res.data.message);
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

  const submitHandler = (event) => {
    setShowFilter(false);
    getData("progress");
    setSubmiHandle(1);
    event.preventDefault();
    return false;
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setSendListData(getoriginalsendlistdata);
    }
  };

  const draftNavigate = async (
    campaign_id,
    pdf_id,
    route,
    campaign,
    creator,
    discription,
    subject,
    tags
  ) => {
    // if (campaign_id != "" && route != "" && pdf_id != "") {
    // navigate("/" + route, {
    //   state: { campaign_id: campaign_id, PdfSelected: pdf_id },
    // });

    const body = {
      user_id: localStorage.getItem("user_id"),
      campaign_id: campaign_id,
    };
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/get_campaign_details`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          let campaign_data = res.data.response.data;
          props.getDraftData(campaign_data);
          if (campaign_data?.smart_list_data) {
            if (
              typeof campaign_data.smart_list_data != "undefined" &&
              campaign_data.smart_list_data != ""
            ) {
              props.getSelectedSmartListData(campaign_data.smart_list_data);
            }
          }
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
      });

    //console.log(props);
    navigate("/" + route);
    //  }
  };

  // data.id,
  //   data.pdf_id,
  //   data.route_location,
  //   data.campaign,
  //   data.creator,
  //   data.discription,
  //   data.subject,
  //   data.tags;

  useEffect(() => {
    getData("initial");
  }, []);

  const showDeleteButtons = () => {
    if (deletestatus) {
      setDeleteStatus(false);
    } else {
      setDeleteStatus(true);
    }
  };

  const createNewEmail = () => {
    props.getDraftData(null);
    props.getSelectedSmartListData(null);
    props.getEmailData(null);
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

  // const showVerificationPopup = () => {
  //   hideConfirmationModal();
  //   if(verificationpopup){
  //     setVerificationPopup(false);
  //   }else{
  //     setVerificationPopup(true);
  //   }
  // }

  // const hideVerificationPopup = () => {
  //   setVerificationPopup(false);
  // }

  const deleteEmail = () => {
    hideConfirmationModal();
    const body = {
      user_id: localStorage.getItem("user_id"),
      campaign_id: deletecardid,
    };
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    axios
      .post(`emailapi/delete_campaign`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          hideConfirmationModal();
          var updatedArray = SendListData.filter(function (item) {
            return item["id"] != deletecardid;
          });
          if (typeof updatedArray !== "undefined") {
            setSendListData(updatedArray);
          }
          popup_alert({
            visible: "show",
            message: "The Email record has been deleted <br />successfully !",
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

  const handleScroll = (ev) => {
    if (ev.target.scrollTop > 20) {
      document.querySelector("#mail-view").setAttribute("custom-atr", "scroll");
    } else {
      document
        .querySelector("#mail-view")
        .setAttribute("custom-atr", "non-scroll");
    }
  };

  const handleOnFilterTags = (ftag) => {
    let tag_index = filtertags.indexOf(ftag);
    if (tag_index !== -1) {
      filtertags.splice(tag_index, 1);
      setFilterTags(filtertags);
    } else {
      filtertags.push(ftag);
      setFilterTags(filtertags);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("tags")) {
      getfilter.tags = filtertags;
    } else {
      getfilter = Object.assign({ tags: filtertags }, filter);
    }
    setFilter(getfilter);

    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnFilterCreator = (fcreator) => {
    let tag_index = filtercreator.indexOf(fcreator);
    if (tag_index !== -1) {
      filtercreator.splice(tag_index, 1);
      setFilterCreators(filtercreator);
    } else {
      filtercreator.push(fcreator);
      setFilterCreators(filtercreator);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("creator")) {
      getfilter.creator = filtercreator;
    } else {
      getfilter = Object.assign({ creator: filtercreator }, filter);
    }
    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnFilterDate = (fdate) => {
    let tag_index = filterdate.indexOf(fdate);
    if (tag_index !== -1) {
      filterdate.splice(tag_index, 1);
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

  const handleOnFilterCampaign = (fcampaign) => {
    let tag_index = filtercampaign.indexOf(fcampaign);
    if (tag_index !== -1) {
      filtercampaign.splice(tag_index, 1);
      setFilterCampaigns(filtercampaign);
    } else {
      filtercampaign.push(fcampaign);
      setFilterCampaigns(filtercampaign);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("campaign")) {
      getfilter.campaign = filtercampaign;
    } else {
      getfilter = Object.assign({ campaign: filtercampaign }, filter);
    }
    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const clearFilter = () => {
    document.querySelectorAll("input").forEach((checkbox) => {
      checkbox.checked = false;
    });
    document.getElementById("email_search").value = "";
    setSearch("");
    setFilterTags([]);
    setFilterCreators([]);
    setFilterDate([]);
    setFilterCampaigns([]);
    setFilter([]);
    let up = updateflag + 1;
    setUpdateFlag(up);
    if (filterapplied) {
      setSendListData(getoriginalsendlistdata);
    }
    setShowFilter(false);
  };

  const applyFilter = () => {
    setFilterApply(true);
    getData("progress");
    setShowFilter(false);
  };

  const removeindividualfilter = (src, item) => {
    // setRemoveFlag(true);
    loader("show");
    if (src == "tag") {
      handleOnFilterTags(item);
    } else if (src == "campaign") {
      handleOnFilterCampaign(item);
    } else if (src == "date") {
      handleOnFilterDate(item);
    } else if (src == "creator") {
      handleOnFilterCreator(item);
    }
    if (filterapplied) {
      getData("progress");
    } else {
      loader("hide");
    }
    setShowFilter(false);
  };

  const draftEmailCampaign = (draftContent) => {
    setDraftCamapignId(draftContent);
  };

  const sendDraftMail = async () => {
    setDraftEmailSendStatus(false);
    const body = {
      user_id: localStorage.getItem("user_id"),
      campaign_id: getDraftCamapignId,
    };
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/get_campaign_details`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          let draft_campaign = res.data.response.data;
          let finalTags = draft_campaign.tags.map((tags) => {
            return tags.innerHTML || tags;
          });

          let user_list = draft_campaign.campaign_data.selectedHcp.map(
            (userId) => {
              return userId.profile_user_id || userId.user_id;
            }
          );

          const body = {
            user_id: localStorage.getItem("user_id"),
            route_location: "VerifyMAIL",
            pdf_id: draft_campaign.pdf_id,
            subject: draft_campaign.subject,
            description: draft_campaign?.description
              ? draft_campaign.description
              : "",
            creator: draft_campaign?.creator ? draft_campaign.creator : "",
            campaign_name: draft_campaign.campaign,
            tags: finalTags,
            template_source_code: draft_campaign.source_code,
            campaign_id: getDraftCamapignId,
            campaign_data: {
              user_list: user_list,
              smart_list_id: draft_campaign.smart_list_data.id,
              template_id: draft_campaign.campaign_data.template_id,
            },
          };
          axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
          axios
            .post(`emailapi/send_email`, body)
            .then((res) => {
              loader("hide");
              if (res.data.status_code === 200) {
                getData("initial");
                popup_alert({
                  visible: "show",
                  message: "Mail sent successfully",
                  type: "success",
                  redirect: "/EmailList",
                });
              } else {
                popup_alert({
                  visible: "show",
                  message: res.data.message,
                  type: "error",
                });
              }
            })
            .catch((err) => {
              toast.error("Something went wrong");
              console.log(err);
            });
        } else {
          loader("hide");
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
      });
  }

  const load_more = () => {
    getData('initial', 2);
    setloadmore(1);
  };



  return (
    <>
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
            <div className="top-header">
              <div className="page-title">
                <h2>Email</h2>
              </div>
              <div className="top-right-action">
                <div className="search-bar">
                  <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                      id="email_search"
                      onChange={(e) => searchChange(e)}
                    />
                    <button className="btn btn-outline-success" type="submit">
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
                <div
                  className={
                    showfilter
                      ? "filter-by nav-item dropdown highlight"
                      : "filter-by nav-item dropdown"
                  }
                >
                  <button
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
                  {/*Code for show filters*/}
                  {showfilter && (
                    <div
                      className="dropdown-menu filter-options"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <h4>Filter By</h4>
                      <Accordion defaultActiveKey="0" flush>
                        {filterdata.hasOwnProperty("tags") &&
                          filterdata.tags.length > 0 && (
                            <Accordion.Item className="card" eventKey="0">
                              <Accordion.Header className="card-header">
                                Tags
                              </Accordion.Header>
                              <Accordion.Body className="card-body">
                                <ul>
                                  {Object.entries(filterdata.tags).map(
                                    ([index, item]) => (
                                      <li>
                                        {item != "" ? (
                                          <label className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-tags-${index}`}
                                              name="tags[]"
                                              value={item}
                                              checked={
                                                updateflag > 0 &&
                                                typeof filtertags !==
                                                  "undefined" &&
                                                filtertags.indexOf(item) !== -1
                                              }
                                              onChange={() =>
                                                handleOnFilterTags(item)
                                              }
                                            />
                                            {item}
                                            <span className="checkmark"></span>
                                          </label>
                                        ) : null}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </Accordion.Body>
                            </Accordion.Item>
                          )}

                        {filterdata.hasOwnProperty("creators") &&
                          filterdata.creators.length > 0 && (
                            <Accordion.Item className="card" eventKey="1">
                              <Accordion.Header className="card-header">
                                Creator
                              </Accordion.Header>
                              <Accordion.Body className="card-body">
                                <ul>
                                  {Object.entries(filterdata.creators).map(
                                    ([index, item]) => (
                                      <li>
                                        <label className="select-multiple-option">
                                          <input
                                            type="checkbox"
                                            id={`custom-checkbox-creator-${index}`}
                                            name="creator[]"
                                            value={item}
                                            checked={
                                              updateflag > 0 &&
                                              typeof filtercreator !==
                                                "undefined" &&
                                              filtercreator.indexOf(item) !== -1
                                            }
                                            onChange={() =>
                                              handleOnFilterCreator(item)
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
                        {filterdata.hasOwnProperty("created") &&
                          filterdata.created.length > 0 && (
                            <Accordion.Item className="card" eventKey="2">
                              <Accordion.Header className="card-header">
                                Date
                              </Accordion.Header>
                              <Accordion.Body className="card-body">
                                <ul>
                                  {Object.entries(filterdata.created).map(
                                    ([index, item]) => (
                                      <li>
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

                        <Accordion.Item className="card" eventKey="3">
                          <Accordion.Header className="card-header">
                            Campaign
                          </Accordion.Header>
                          <Accordion.Body className="card-body">
                            <ul>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    id={`custom-checkbox-campaign-0`}
                                    name="campaign[]"
                                    value="Sent"
                                    checked={
                                      updateflag > 0 &&
                                      typeof filtercampaign !== "undefined" &&
                                      filtercampaign.indexOf(1) !== -1
                                    }
                                    onChange={() => handleOnFilterCampaign(1)}
                                  />
                                  Sent
                                  <span className="checkmark"></span>
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    id={`custom-checkbox-campaign-1`}
                                    name="campaign[]"
                                    value="Draft"
                                    checked={
                                      updateflag > 0 &&
                                      typeof filtercampaign !== "undefined" &&
                                      filtercampaign.indexOf(2) !== -1
                                    }
                                    onChange={() => handleOnFilterCampaign(2)}
                                  />
                                  Draft
                                  <span className="checkmark"></span>
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    id={`custom-checkbox-campaign-2`}
                                    name="campaign[]"
                                    value="draft-approved"
                                    checked={
                                      updateflag > 0 &&
                                      typeof filtercampaign !== "undefined" &&
                                      filtercampaign.indexOf(3) !== -1
                                    }
                                    onChange={() => handleOnFilterCampaign(3)}
                                  />
                                  Draft Approved
                                  <span className="checkmark"></span>
                                </label>
                              </li>
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
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

                  {/*
                 <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                     <li><a className="dropdown-item" href="#">Filter1 <img src={path + "filter-close.svg"} alt="Close-filter" /></a></li>
                     <li><a className="dropdown-item" href="#">Filter2 <img src={path + "filter-close.svg"} alt="Close-filter" /></a></li>
                     <li><a className="dropdown-item" href="#">Filter3 <img src={path + "filter-close.svg"} alt="Close-filter" /></a></li>
                 </ul>
                 */}
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
                      className="btn btn-outline-primary"
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
                          fill="#0066BE"
                        />
                        <path
                          d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                          fill="#0066BE"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            {updateflag > 0 &&
              (filtertags.length > 0 ||
                filtercreator.length > 0 ||
                filterdate.length > 0 ||
                filtercampaign.length > 0) && (
                <div className="apply-filter">
                  <h6>Applied filters</h6>
                  <div className="filter-block">
                    <div className="filter-block-left full">
                      {filtertags.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Tags |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(filtertags).map(([index, item]) => (
                              <div
                                className="filter-result"
                                onClick={(event) =>
                                  removeindividualfilter("tag", item)
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

                      {filtercreator.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Creator |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(filtercreator).map(
                              ([index, item]) => (
                                <div
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
                            <span>Date |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(filterdate).map(([index, item]) => (
                              <div
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

                      {filtercampaign.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Campaign |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(filtercampaign).map(
                              ([index, item]) => (
                                <div
                                  className="filter-result"
                                  onClick={(event) =>
                                    removeindividualfilter("campaign", item)
                                  }
                                >
                                  {item == 3
                                    ? "Draft Approved"
                                    : item == 2
                                    ? "Draft"
                                    : "Sent"}
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
            <div className="email-result">
              <div className="col email-result-block">
                {filtertags.length == 0 &&
                  filtercreator.length == 0 &&
                  filterdate.length == 0 &&
                  filtercampaign.length == 0 &&
                  !deletestatus && (
                    <div className="email_box_block">
                      <div className="email-block-add">
                        <Link to="/EmailArticleSelect" onClick={createNewEmail}>
                          <img src={path_image + "add-button.svg"} alt="" />
                        </Link>
                        <p>Create New Email</p>
                      </div>
                    </div>
                  )}

                {SendListData.length > 0 ? (
                  SendListData.map((data) => {
                    return (
                      <div className="email_box_block">
                        <div
                          className={
                            "email_box " +
                            (data.status == 1
                              ? "approved"
                              : data.status == 2
                              ? "email-draft"
                              : "draft-approved")
                          }
                        >
                          <div className="mail-top-title">
                            <span>
                              {data.status == 2 ? "Draft" : "Approved Draft"}
                            </span>
                          </div>
                          <div className="mail-box-content">
                            <div className="mail-box-content-top">
                              <div className="mail-box-content-top-view">
                                <h5>{data.subject}</h5>
                                <p>{data.description}</p>
                                <div className="mailbox-table">
                                  <table>
                                    <tbody>
                                      <tr>
                                        <th>Campaign</th>
                                        <td>{data.campaign}</td>
                                      </tr>
                                      <tr>
                                        <th>Creator</th>
                                        <td>{data.creator}</td>
                                      </tr>
                                      <tr>
                                        <th>List</th>
                                        <td>{data.smart_list_name}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="mailbox-tags">
                                  <ul>
                                    {data.tags != "" ? (
                                      data.tags.map((tag) => {
                                        return <li className="list1">{tag}</li>;
                                      })
                                    ) : (
                                      <li className="list1">N/A</li>
                                    )}
                                  </ul>
                                </div>
                                <div className="mail-time">
                                  <span>{data.created_at}</span>
                                </div>
                              </div>
                              <div className="mail-stats">
                                <ul>
                                  <li>
                                    <div
                                      className="mail-status mail_send"
                                      title="Sent Emails"
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clipPath="url(#clip0_586_1145)">
                                          <path
                                            d="M9.52404 0.0444336C9.25621 0.125366 9.01122 0.27124 8.80846 0.473999L1.54639 7.73596C1.3396 7.94275 1.19666 8.18957 1.11719 8.45154L8.12279 7.05041L9.52404 0.0444336Z"
                                            fill="#C8D1D9"
                                          />
                                          <path
                                            d="M15.4959 4.72375L11.2462 0.473999C11.0314 0.259277 10.7691 0.108765 10.4826 0.03125L8.98073 7.54077C8.94362 7.72632 8.7986 7.87146 8.61305 7.90857L1.10341 9.41052C1.17958 9.69031 1.32692 9.95471 1.54628 10.1741L1.91957 10.5474L0.137222 12.3297C-0.0457611 12.5128 -0.0457611 12.8096 0.137344 12.9927C0.228897 13.0841 0.34877 13.1299 0.468765 13.1299C0.58876 13.1299 0.708633 13.0841 0.800186 12.9927L2.58253 11.2103L3.33961 11.9674L0.137222 15.1698C-0.0457611 15.3528 -0.0457611 15.6497 0.137344 15.8326C0.228897 15.9242 0.34877 15.97 0.468765 15.97C0.58876 15.97 0.708633 15.9242 0.800186 15.8326L4.00258 12.6302L4.75966 13.3875L2.97743 15.1698C2.79433 15.3528 2.79433 15.6497 2.97743 15.8326C3.06886 15.9242 3.18886 15.97 3.30885 15.97C3.42885 15.97 3.54872 15.9242 3.64027 15.8326L5.42262 14.0504L5.79591 14.4237C6.12062 14.7483 6.55348 14.9271 7.01491 14.9271C7.47633 14.9271 7.90932 14.7483 8.2339 14.4237L15.4959 7.16174C16.1681 6.4895 16.1681 5.39587 15.4959 4.72375Z"
                                            fill="#C8D1D9"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_586_1145">
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <span>{data.total_Sent}</span>
                                  </li>
                                  <li>
                                    <div
                                      className="mail-status mail_view"
                                      title="Opened Emails"
                                    >
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M6.9998 8.43003L0.0498047 4.68503C0.143433 4.30746 0.382451 3.98218 0.714804 3.78003L6.7648 0.560029C6.83687 0.520642 6.91767 0.5 6.9998 0.5C7.08193 0.5 7.16274 0.520642 7.2348 0.560029L13.2598 3.76503C13.4298 3.86532 13.5782 3.99824 13.6967 4.15613C13.8151 4.31402 13.9011 4.49377 13.9498 4.68503L6.9998 8.43003Z"
                                          fill="#C8D1D9"
                                        />
                                        <path
                                          d="M4.8 8.37992L0 11.7399V5.79492L4.8 8.37992Z"
                                          fill="#C8D1D9"
                                        />
                                        <path
                                          d="M8.21499 8.91016L13.77 12.8002C13.6338 13.0138 13.4462 13.1899 13.2243 13.3122C13.0024 13.4345 12.7534 13.4991 12.5 13.5002H1.49998C1.24661 13.4991 0.997559 13.4345 0.775664 13.3122C0.553768 13.1899 0.366136 13.0138 0.22998 12.8002L5.78499 8.91016L6.76499 9.44016C6.8371 9.47941 6.91789 9.49997 6.99999 9.49997C7.08209 9.49997 7.16288 9.47941 7.23499 9.44016L8.21499 8.91016Z"
                                          fill="#C8D1D9"
                                        />
                                        <path
                                          d="M14.0002 5.79492V11.7399L9.2002 8.37992L14.0002 5.79492Z"
                                          fill="#C8D1D9"
                                        />
                                      </svg>
                                    </div>
                                    <span>
                                      {data.total_Opened_pr > 0
                                        ? data.total_Opened_pr + "%"
                                        : 0}{" "}
                                    </span>
                                  </li>
                                  <li>
                                    <div
                                      className="mail-status mail_click"
                                      title="CTR Clicks"
                                    >
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
                                        />
                                        <path
                                          d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z"
                                          fill="#C8D1D9"
                                        />
                                      </svg>
                                    </div>
                                    <span>
                                      {data.total_Click_pr > 0
                                        ? data.total_Click_pr + "%"
                                        : 0}{" "}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {data.status == 1 ? (
                              <div className="mailbox-buttons">
                                {!deletestatus && (
                                  <>
                                    <div className="send_new">
                                      <button
                                        className="btn btn-primary btn-bordered send-new"
                                        onClick={() =>
                                          draftNavigate(
                                            data.id,
                                            data.pdf_id,
                                            "SelectHCP",
                                            data.campaign,
                                            data.creator,
                                            data.discription,
                                            data.subject,
                                            data.tags
                                          )
                                        }
                                      >
                                        Send New
                                      </button>
                                    </div>

                                    <div className="mailbox-buttons-list">
                                      {data.total_Opened_pr < 100 ? (
                                        <button
                                          className="btn btn-primary btn-bordered send"
                                          onClick={(e) =>
                                            showModal("resend", data.id)
                                          }
                                        >
                                          Resend
                                        </button>
                                      ) : (
                                        ""
                                      )}

                                      <button
                                        className="btn btn-primary btn-filled edit"
                                        onClick={(e) =>
                                          showViewEmailModal(data.id)
                                        }
                                      >
                                        View
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            ) : (
                              <div className="mailbox-buttons">
                                {!deletestatus && (
                                  <div className="mailbox-buttons-list">
                                    {data.route_location == "VerifyMAIL" &&
                                    data.pdf_id != 13 ? (
                                      <button
                                        className="btn btn-primary send btn-bordered"
                                        onClick={() => {
                                          getEmailData(null);
                                          draftEmailCampaign(data.id);
                                          setDraftEmailSendStatus(
                                            (getDraftEmailSendStatus) =>
                                              !getDraftEmailSendStatus
                                          );
                                        }}
                                        // onClick={(e) => showModal("send", data.id)
                                      >
                                        Send
                                      </button>
                                    ) : (
                                      ""
                                    )}
                                    <button
                                      className="btn btn-primary edit btn-filled"
                                      onClick={() => {
                                        getEmailData(null);
                                        // getSelectedSmartListData(null);
                                        draftNavigate(
                                          data.id,
                                          data.pdf_id,
                                          data.route_location,
                                          data.campaign,
                                          data.creator,
                                          data.discription,
                                          data.subject,
                                          data.tags
                                        );
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                            {deletestatus && (
                              <div className="dlt_btn">
                                <button
                                  onClick={(e) =>
                                    showConfirmationPopup(data.id)
                                  }
                                >
                                  <img
                                    src={path + "delete.svg"}
                                    alt="Delete Row"
                                  />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="email_box_block no_found">
                    <p>No Data Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {typeof SendListData !== "undefined" &&
          SendListData.length == 32 &&
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

      <div>
        <Modal className="modal send-confirm" id="resend-confirm" show={isOpen}>
          <Modal.Header>
            <button
              type="button"
              className="btn-close"
              onClick={hideModal}
            ></button>
          </Modal.Header>

          <Modal.Body>
            <img src={path + "alert.png"} alt="" />
            <h4>
              This email will be sent to everybody who has not opened the email{" "}
            </h4>

            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                data-bs-dismiss="modal"
                onClick={resendemail}
              >
                Yes Please!
              </button>
              {getreference == "resend" ? (
                <button
                  type="button"
                  className="btn btn-primary btn-bordered"
                  onClick={(e) => showViewEmailModal(campaign_id)}
                >
                  View Email
                </button>
              ) : (
                ""
              )}
              <button
                type="button"
                className="btn btn-primary btn-bordered light"
                onClick={hideModal}
              >
                Cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <div>
        <Modal
          id="mail-view"
          show={viewEmailModal}
          onHide={hideEmailModal}
          custom-atr="non-scroll"
        >
          <Modal.Header>
            <h4>Email View</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={hideEmailModal}
            ></button>
          </Modal.Header>

          <Modal.Body onScroll={handleScroll}>
            {typeof viewEmailData !== "undefined" && (
              <div className="modal-body-view">
                <div className="mail-box-content">
                  <div className="mail-box-heading-block">
                    <div className="mail-box-heading">
                      <h5>{viewEmailData[0].subject}</h5>
                      <p>{viewEmailData[0].description}</p>
                    </div>
                    <div className="mail-view-btn">
                      <button
                        className="btn btn-primary btn-bordered"
                        onClick={(e) => showModal("send", campaign_id)}
                      >
                        Resend
                      </button>
                    </div>
                  </div>
                  <div className="mailbox-table">
                    <table>
                      <tbody>
                        <tr>
                          <th>Campaign</th>
                          <td>{viewEmailData[0].campaign}</td>
                        </tr>
                        <tr>
                          <th>List</th>
                          <td>{viewEmailData[0].smart_list_name}</td>
                        </tr>
                        <tr>
                          <th>Content Title </th>
                          <td>{viewEmailData[0].article_title}</td>
                        </tr>
                        <tr>
                          <th>Docintel Link </th>
                          <td>
                            <a
                              href={viewEmailData[0].docintel_link}
                              target="_blank"
                            >
                              {viewEmailData[0].docintel_link}
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mail-time">
                    <span>{viewEmailData[0].created_at}</span>
                  </div>
                  <div className="mailbox-tags">
                    <h6>Tags</h6>
                    <ul>
                      {viewEmailData[0].tags != "" ? (
                        viewEmailData[0].tags.map((tag) => {
                          return <li className="list1">{tag}</li>;
                        })
                      ) : (
                        <li className="list1">N/A</li>
                      )}
                    </ul>
                  </div>
                  <div className="mail-stats">
                    <ul>
                      <li>
                        <div className="mail_send">
                          <h6>Emails send</h6>
                          <div className="mail-stats-list">
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="18.5"
                                stroke="#986CA5"
                                stroke-width="3"
                                stroke-linejoin="round"
                              />
                              <g clipPath="url(#clip0_698_88)">
                                <path
                                  d="M21.905 10.0557C21.5703 10.1568 21.264 10.3392 21.0106 10.5926L11.933 19.6701C11.6745 19.9286 11.4958 20.2371 11.3965 20.5645L20.1535 18.8131L21.905 10.0557Z"
                                  fill="#986CA5"
                                />
                                <path
                                  d="M29.3698 15.9047L24.0578 10.5925C23.7892 10.3241 23.4613 10.136 23.1032 10.0391L21.2259 19.426C21.1795 19.6579 20.9982 19.8393 20.7663 19.8857L11.3793 21.7632C11.4745 22.1129 11.6586 22.4434 11.9328 22.7176L12.3995 23.1842L10.1715 25.4121C9.9428 25.641 9.9428 26.012 10.1717 26.2408C10.2861 26.3551 10.436 26.4124 10.586 26.4124C10.736 26.4124 10.8858 26.3551 11.0002 26.2408L13.2282 24.0129L14.1745 24.9593L10.1715 28.9623C9.9428 29.191 9.9428 29.5621 10.1717 29.7908C10.2861 29.9052 10.436 29.9625 10.586 29.9625C10.736 29.9625 10.8858 29.9052 11.0002 29.7908L15.0032 25.7878L15.9496 26.7343L13.7218 28.9623C13.4929 29.191 13.4929 29.5621 13.7218 29.7908C13.8361 29.9052 13.9861 29.9625 14.1361 29.9625C14.2861 29.9625 14.4359 29.9052 14.5503 29.7908L16.7783 27.563L17.2449 28.0296C17.6508 28.4354 18.1919 28.6589 18.7686 28.6589C19.3454 28.6589 19.8866 28.4354 20.2924 28.0296L29.3698 18.9522C30.2101 18.1119 30.2101 16.7448 29.3698 15.9047Z"
                                  fill="#986CA5"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_698_88">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(10 10)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>

                            <span>{viewEmailData[0].total_Sent}</span>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="mail_view">
                          <h6>Emails bounced</h6>
                          <div className="mail-stats-list">
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="18.5"
                                stroke="#F58289"
                                stroke-width="3"
                                stroke-linejoin="round"
                              />
                              <g clipPath="url(#clip0_698_97)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M27.9098 12.283C27.5648 12.0981 27.1782 12.0001 26.7771 12.0001L12.4111 12C12.002 12 11.6165 12.1028 11.2788 12.2833L19.594 17.8268L27.9098 12.283ZM20.6461 25.1001C20.5929 24.8003 20.5651 24.4917 20.5651 24.1766C20.5651 21.2795 22.9136 18.931 25.8107 18.931C27.0975 18.931 28.2762 19.3944 29.1888 20.1634L29.1889 14.2817C29.1888 13.8568 29.0782 13.4485 28.8715 13.0884L19.9582 19.0308C19.738 19.1776 19.451 19.1777 19.2307 19.0309L10.3172 13.0886C10.1158 13.4407 10 13.8479 10 14.2819V15.0203V16.3318V17.8295L10.0001 19.1409L10 20.6387V21.9502V22.6886C10.0001 23.3309 10.2514 23.9359 10.7078 24.3923C11.1642 24.8487 11.7694 25.1001 12.4115 25.1001L20.6461 25.1001ZM25.804 28.3757C28.1216 28.3757 30.0004 26.4969 30.0004 24.1792C30.0004 21.8616 28.1216 19.9828 25.804 19.9828C23.4863 19.9828 21.6075 21.8616 21.6075 24.1792C21.6075 26.4969 23.4863 28.3757 25.804 28.3757ZM25.1052 26.6285C25.1052 26.2422 25.4184 25.9291 25.8047 25.9291C26.1909 25.9291 26.504 26.2422 26.504 26.6285C26.504 27.0148 26.1909 27.3279 25.8047 27.3279C25.4185 27.3279 25.1052 27.0148 25.1052 26.6285ZM25.8046 24.9097C26.1909 24.9097 26.504 24.583 26.504 24.1799V21.7623C26.504 21.3593 26.1909 21.0325 25.8046 21.0325C25.4183 21.0325 25.1052 21.3593 25.1052 21.7623V24.1799C25.1052 24.583 25.4183 24.9097 25.8046 24.9097Z"
                                  fill="#F58289"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_698_97">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(10 10)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <span>0</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mail_open">
                          <h6>Emails opened</h6>
                          <div className="mail-stats-list">
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="18.5"
                                stroke="#FAC755"
                                stroke-width="3"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M20 21.7875L11.3125 17.1063C11.4295 16.6343 11.7283 16.2277 12.1437 15.975L19.7062 11.95C19.7963 11.9008 19.8973 11.875 20 11.875C20.1027 11.875 20.2037 11.9008 20.2937 11.95L27.825 15.9563C28.0375 16.0817 28.2231 16.2478 28.3711 16.4452C28.5191 16.6425 28.6266 16.8672 28.6875 17.1063L20 21.7875Z"
                                fill="#FAC755"
                              />
                              <path
                                d="M17.25 21.7251L11.25 25.9251V18.4939L17.25 21.7251Z"
                                fill="#FAC755"
                              />
                              <path
                                d="M21.5189 22.3875L28.4626 27.25C28.2924 27.517 28.0579 27.7371 27.7805 27.89C27.5031 28.0429 27.1918 28.1237 26.8751 28.125H13.1251C12.8084 28.1237 12.4971 28.0429 12.2197 27.89C11.9423 27.7371 11.7078 27.517 11.5376 27.25L18.4814 22.3875L19.7064 23.05C19.7965 23.099 19.8975 23.1247 20.0001 23.1247C20.1027 23.1247 20.2037 23.099 20.2939 23.05L21.5189 22.3875Z"
                                fill="#FAC755"
                              />
                              <path
                                d="M28.75 18.4939V25.9251L22.75 21.7251L28.75 18.4939Z"
                                fill="#FAC755"
                              />
                            </svg>
                            <span>{viewEmailData[0].total_Opened_pr}%</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mail_click">
                          <div className="mail_click_box">
                            <h6>CTR 1</h6>
                            <div className="mail_click_box_content">
                              <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="20"
                                  cy="20"
                                  r="18.5"
                                  stroke="#39CABC"
                                  stroke-width="3"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M14.955 16.6329C14.8178 16.1684 14.6861 15.703 14.5871 15.2572C13.9363 14.8722 13.4936 14.1715 13.4936 13.3617C13.4936 12.1434 14.4842 11.1535 15.7017 11.1535C16.9192 11.1535 17.9098 12.1442 17.9098 13.3617C17.9098 13.5292 17.8872 13.6906 17.8521 13.8472C18.0633 14.3125 18.234 14.8363 18.3837 15.3687C18.8046 14.8075 19.0633 14.1177 19.0633 13.3617C19.0633 11.5043 17.5591 10 15.7017 10C13.8443 10 12.3408 11.5043 12.3408 13.3617C12.3408 14.961 13.4593 16.2931 14.955 16.6329Z"
                                  fill="#39CABC"
                                />
                                <path
                                  d="M12.6329 24.5915C13.4615 23.696 14.3913 24.0467 15.6361 24.2361C16.7054 24.4006 17.7584 24.1005 17.6883 23.5229C17.5776 22.5884 17.4217 22.1706 17.0671 20.9602C16.7842 19.9976 16.2471 18.2626 15.7584 16.604C15.1037 14.385 14.9143 13.3546 15.7857 13.0974C16.7249 12.8238 17.2635 14.1582 17.7514 16.0085C18.3071 18.1145 18.5994 19.0444 18.7631 18.9953C19.0515 18.9127 18.6571 18.0116 19.4116 17.7895C20.3547 17.5152 20.5371 18.2525 20.8013 18.1784C21.0655 18.0989 20.9759 17.3523 21.728 17.1325C22.4841 16.9142 22.8637 17.8448 23.1754 17.7521C23.4841 17.6609 23.4771 17.325 23.9432 17.1917C24.41 17.053 26.1668 17.8394 27.1723 21.2743C28.4342 25.5931 27.0125 26.3959 27.4435 27.8581L21.8107 30C21.3547 28.9033 19.9424 28.8222 18.693 28.1231C17.4342 27.4146 16.5792 26.0342 13.2986 26.1013C12.0647 26.1262 12.1232 25.1426 12.6329 24.5915Z"
                                  fill="#39CABC"
                                />
                              </svg>
                              <span>{viewEmailData[0].total_Click_pr}%</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="chart-description">
                  <div className="chart-description-view">
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={options_ch}
                    />
                  </div>
                </div>

                <div
                  className="preview-mail-box"
                  dangerouslySetInnerHTML={{
                    __html: viewEmailData[0].template,
                  }}
                ></div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>

      {/* <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Email View</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={hideEmailModal}></button>
          </div>

        {typeof viewEmailData !== "undefined" && (

          <div className="modal-body">
          <div className="mail-box-content">
            <div className="mail-box-heading">
            <h5>{viewEmailData[0].subject}</h5>
            <p>{viewEmailData[0].description}</p>
            </div>
            <div className="mail-view-btn">
              <button className="btn btn-primary btn-bordered" onClick={(e) => showModal('send',campaign_id)}>Resend</button>
            </div>
            <div className="mailbox-table">
              <table>
              <tbody>
                <tr><th>Campaign</th><td>{viewEmailData[0].campaign}</td></tr>
                <tr><th>List</th><td>{viewEmailData[0].list}</td></tr>
                <tr><th>Content Title </th><td>{viewEmailData[0].article_title}</td></tr>
                <tr><th>Docintel Link </th><td><a href={viewEmailData[0].docintel_link} target="_blank">{viewEmailData[0].docintel_link}</a></td></tr>
              </tbody>
              </table>

            </div>
              <div className="mail-time"><span>{viewEmailData[0].created_at}</span></div>
            <div className="mailbox-tags">
              <h6>Tags</h6>
              <ul>
              { viewEmailData[0].tags != "" ?
                viewEmailData[0].tags.map((tag) => {
                  return ( <li className="list1">{tag}</li> );
                })
                : <li className="list1">N/A</li>
              }
              </ul>
            </div>
            <div className="mail-stats">
              <ul>
              <li>
                <div className="mail_send">
                <h6>Emails send</h6>
                <div className="mail-stats-list">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18.5" stroke="#986CA5" stroke-width="3" stroke-linejoin="round"/>
                  <g clipPath="url(#clip0_698_88)">
                  <path d="M21.905 10.0557C21.5703 10.1568 21.264 10.3392 21.0106 10.5926L11.933 19.6701C11.6745 19.9286 11.4958 20.2371 11.3965 20.5645L20.1535 18.8131L21.905 10.0557Z" fill="#986CA5"/>
                  <path d="M29.3698 15.9047L24.0578 10.5925C23.7892 10.3241 23.4613 10.136 23.1032 10.0391L21.2259 19.426C21.1795 19.6579 20.9982 19.8393 20.7663 19.8857L11.3793 21.7632C11.4745 22.1129 11.6586 22.4434 11.9328 22.7176L12.3995 23.1842L10.1715 25.4121C9.9428 25.641 9.9428 26.012 10.1717 26.2408C10.2861 26.3551 10.436 26.4124 10.586 26.4124C10.736 26.4124 10.8858 26.3551 11.0002 26.2408L13.2282 24.0129L14.1745 24.9593L10.1715 28.9623C9.9428 29.191 9.9428 29.5621 10.1717 29.7908C10.2861 29.9052 10.436 29.9625 10.586 29.9625C10.736 29.9625 10.8858 29.9052 11.0002 29.7908L15.0032 25.7878L15.9496 26.7343L13.7218 28.9623C13.4929 29.191 13.4929 29.5621 13.7218 29.7908C13.8361 29.9052 13.9861 29.9625 14.1361 29.9625C14.2861 29.9625 14.4359 29.9052 14.5503 29.7908L16.7783 27.563L17.2449 28.0296C17.6508 28.4354 18.1919 28.6589 18.7686 28.6589C19.3454 28.6589 19.8866 28.4354 20.2924 28.0296L29.3698 18.9522C30.2101 18.1119 30.2101 16.7448 29.3698 15.9047Z" fill="#986CA5"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_698_88">
                  <rect width="20" height="20" fill="white" transform="translate(10 10)"/>
                  </clipPath>
                  </defs>
                  </svg>

                  <span>{viewEmailData[0].total_Sent}</span>
                </div>
                </div>
              </li>

              <li>
                <div className="mail_view">
                <h6>Emails bounced</h6>
                <div className="mail-stats-list">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18.5" stroke="#F58289" stroke-width="3" stroke-linejoin="round"/>
                  <g clipPath="url(#clip0_698_97)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M27.9098 12.283C27.5648 12.0981 27.1782 12.0001 26.7771 12.0001L12.4111 12C12.002 12 11.6165 12.1028 11.2788 12.2833L19.594 17.8268L27.9098 12.283ZM20.6461 25.1001C20.5929 24.8003 20.5651 24.4917 20.5651 24.1766C20.5651 21.2795 22.9136 18.931 25.8107 18.931C27.0975 18.931 28.2762 19.3944 29.1888 20.1634L29.1889 14.2817C29.1888 13.8568 29.0782 13.4485 28.8715 13.0884L19.9582 19.0308C19.738 19.1776 19.451 19.1777 19.2307 19.0309L10.3172 13.0886C10.1158 13.4407 10 13.8479 10 14.2819V15.0203V16.3318V17.8295L10.0001 19.1409L10 20.6387V21.9502V22.6886C10.0001 23.3309 10.2514 23.9359 10.7078 24.3923C11.1642 24.8487 11.7694 25.1001 12.4115 25.1001L20.6461 25.1001ZM25.804 28.3757C28.1216 28.3757 30.0004 26.4969 30.0004 24.1792C30.0004 21.8616 28.1216 19.9828 25.804 19.9828C23.4863 19.9828 21.6075 21.8616 21.6075 24.1792C21.6075 26.4969 23.4863 28.3757 25.804 28.3757ZM25.1052 26.6285C25.1052 26.2422 25.4184 25.9291 25.8047 25.9291C26.1909 25.9291 26.504 26.2422 26.504 26.6285C26.504 27.0148 26.1909 27.3279 25.8047 27.3279C25.4185 27.3279 25.1052 27.0148 25.1052 26.6285ZM25.8046 24.9097C26.1909 24.9097 26.504 24.583 26.504 24.1799V21.7623C26.504 21.3593 26.1909 21.0325 25.8046 21.0325C25.4183 21.0325 25.1052 21.3593 25.1052 21.7623V24.1799C25.1052 24.583 25.4183 24.9097 25.8046 24.9097Z" fill="#F58289"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_698_97">
                  <rect width="20" height="20" fill="white" transform="translate(10 10)"/>
                  </clipPath>
                  </defs>
                  </svg>
                  <span>60%</span>
                </div>
                </div>
              </li>
              <li>
                <div className="mail_open">
                <h6>Emails opened</h6>
                <div className="mail-stats-list">

                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18.5" stroke="#FAC755" stroke-width="3" stroke-linejoin="round"/>
                  <path d="M20 21.7875L11.3125 17.1063C11.4295 16.6343 11.7283 16.2277 12.1437 15.975L19.7062 11.95C19.7963 11.9008 19.8973 11.875 20 11.875C20.1027 11.875 20.2037 11.9008 20.2937 11.95L27.825 15.9563C28.0375 16.0817 28.2231 16.2478 28.3711 16.4452C28.5191 16.6425 28.6266 16.8672 28.6875 17.1063L20 21.7875Z" fill="#FAC755"/>
                  <path d="M17.25 21.7251L11.25 25.9251V18.4939L17.25 21.7251Z" fill="#FAC755"/>
                  <path d="M21.5189 22.3875L28.4626 27.25C28.2924 27.517 28.0579 27.7371 27.7805 27.89C27.5031 28.0429 27.1918 28.1237 26.8751 28.125H13.1251C12.8084 28.1237 12.4971 28.0429 12.2197 27.89C11.9423 27.7371 11.7078 27.517 11.5376 27.25L18.4814 22.3875L19.7064 23.05C19.7965 23.099 19.8975 23.1247 20.0001 23.1247C20.1027 23.1247 20.2037 23.099 20.2939 23.05L21.5189 22.3875Z" fill="#FAC755"/>
                  <path d="M28.75 18.4939V25.9251L22.75 21.7251L28.75 18.4939Z" fill="#FAC755"/>
                  </svg>
                  <span>{viewEmailData[0].total_Opened_pr}%</span>
                </div>
                </div>
              </li>
              <li><div className="mail_click">
                <div className="mail_click_box">
                <h6>CTR 1</h6>
                <div className="mail_click_box_content">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18.5" stroke="#39CABC" stroke-width="3" stroke-linejoin="round"/>
                    <path d="M14.955 16.6329C14.8178 16.1684 14.6861 15.703 14.5871 15.2572C13.9363 14.8722 13.4936 14.1715 13.4936 13.3617C13.4936 12.1434 14.4842 11.1535 15.7017 11.1535C16.9192 11.1535 17.9098 12.1442 17.9098 13.3617C17.9098 13.5292 17.8872 13.6906 17.8521 13.8472C18.0633 14.3125 18.234 14.8363 18.3837 15.3687C18.8046 14.8075 19.0633 14.1177 19.0633 13.3617C19.0633 11.5043 17.5591 10 15.7017 10C13.8443 10 12.3408 11.5043 12.3408 13.3617C12.3408 14.961 13.4593 16.2931 14.955 16.6329Z" fill="#39CABC"/>
                    <path d="M12.6329 24.5915C13.4615 23.696 14.3913 24.0467 15.6361 24.2361C16.7054 24.4006 17.7584 24.1005 17.6883 23.5229C17.5776 22.5884 17.4217 22.1706 17.0671 20.9602C16.7842 19.9976 16.2471 18.2626 15.7584 16.604C15.1037 14.385 14.9143 13.3546 15.7857 13.0974C16.7249 12.8238 17.2635 14.1582 17.7514 16.0085C18.3071 18.1145 18.5994 19.0444 18.7631 18.9953C19.0515 18.9127 18.6571 18.0116 19.4116 17.7895C20.3547 17.5152 20.5371 18.2525 20.8013 18.1784C21.0655 18.0989 20.9759 17.3523 21.728 17.1325C22.4841 16.9142 22.8637 17.8448 23.1754 17.7521C23.4841 17.6609 23.4771 17.325 23.9432 17.1917C24.41 17.053 26.1668 17.8394 27.1723 21.2743C28.4342 25.5931 27.0125 26.3959 27.4435 27.8581L21.8107 30C21.3547 28.9033 19.9424 28.8222 18.693 28.1231C17.4342 27.4146 16.5792 26.0342 13.2986 26.1013C12.0647 26.1262 12.1232 25.1426 12.6329 24.5915Z" fill="#39CABC"/>
                    </svg>
                  <span>{viewEmailData[0].total_Click_pr}%</span>
                </div>
                </div>
              </div></li>
              </ul>
            </div>

            </div>
            <div className="chart-description">
            <div className="chart-description-view">
              <img src={path_image+"chart-description.png"} alt="" />
            </div>
            </div>
          </div>
        )}
        </div>
      </div> */}

      {/*Modal for delete Email listing*/}
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
            <img src={path + "alert.png"} alt="" />
            <h4>
              This email will be deleted.
              <br />
              Are you sure you wish to go ahead?
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

      {/*Modal for Verification
        <div className="delete-confirm">
          <Modal className="modal send-confirm" id="action-confirm" show={verificationpopup}>
              <Modal.Header>

              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={(e) => hideVerificationPopup()}></button>
            </Modal.Header>

            <Modal.Body>
              <img src={path_image+"success.png"} alt="" />
  						<h4>The HCP record has been deleted <br />successfully !</h4>
                <div className="modal-buttons">
                  <button type="button" className="btn btn-primary btn-bordered light" onClick={(e) => hideVerificationPopup()}>Close</button>
                </div>
            </Modal.Body>
          </Modal>
				</div>*/}

      {/*Modal start for send Draft Email*/}
      <div>
        <Modal
          className="modal send-confirm"
          id="send-draft-mail"
          show={getDraftEmailSendStatus}
        >
          <Modal.Header>
            <button
              type="button"
              className="btn-close"
              onClick={() =>
                setDraftEmailSendStatus(
                  (getDraftEmailSendStatus) => !getDraftEmailSendStatus
                )
              }
            ></button>
          </Modal.Header>

          <Modal.Body>
            <img src={path + "alert.png"} alt="" />
            <h4>
              This will send the email.
              <br />
              Are you sure it's perfect?
            </h4>

            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                data-bs-dismiss="modal"
                onClick={sendDraftMail}
              >
                Yes Please!
              </button>

              <button
                type="button"
                className="btn btn-primary btn-bordered light"
                onClick={() =>
                  setDraftEmailSendStatus(
                    (getDraftEmailSendStatus) => !getDraftEmailSendStatus
                  )
                }
              >
                Cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      {/*Modal end for send Draft Email*/}
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  getDraftData: getDraftData,
  getSelectedSmartListData: getSelectedSmartListData,
  getEmailData: getEmailData,
})(EmailList);
