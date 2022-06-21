import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { getListId } from "../../../actions";

import { toast } from "react-toastify";
import { popup_alert } from "../../../popup_alert";
import ExportApi from "../../../Api/ExportApi";
import { loader } from "../../../loader";
import Accordion from "react-bootstrap/Accordion";
import { BaseApi } from "../../../Api/BaseApi";

const WebinarSmartList = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_WEBINAR;
  const [smartListData, setSmartListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getUserDetails, setUserDetails] = useState([]);
  const [prevsmartListData, setPrevSmartListData] = useState([]);
  const [search, setSearch] = useState("");
  const baseURL = BaseApi.getBaseURL();
  const [deletestatus, setDeleteStatus] = useState(false);
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [deletecardid, setDeleteCardId] = useState();
  const [filterdata, setFilterData] = useState([]);
  const [getfiltername, setFilterName] = useState([]);
  const [getFilterCreator, setFilterCreator] = useState([]);
  const [filterdate, setFilterDate] = useState([]);
  const [filter, setFilter] = useState("");
  const [updateflag, setUpdateFlag] = useState(0);
  const [showfilter, setShowFilter] = useState(false);
  const [filterapplied, setFilterApply] = useState(false);

  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED;

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

  const getSmartListData = async (flag) => {
    // console.log(localStorage.getItem("Token"));

    const body = {
      search: search,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };

    console.log(headers);
    loader("show");
    await axios
      .post(baseURL + `smart-list/lists`, body, {
        headers,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res.data.data);
        setSmartListData(res.data.data);
        if (flag == 0) {
          //setFilterData(res.data.response.filter);
          setPrevSmartListData(res.data.data);
        }

        console.log(res);
        loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSmartListData(0);
  }, []);

  const searchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value == "") {
      setSmartListData(prevsmartListData);
      // getSmartListData(1);
    }
  };

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

  const showConfirmationPopup = (id) => {
    console.log(id);
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

    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };

    const body = {
      smart_list_id: deletecardid,
    };
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

    loader("show");
    axios
      .post(baseURL + `smart-list/delete`, body, {
        headers,
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        if (res.data.code == 200) {
          loader("hide");
          var updatedArray = smartListData.filter(function (item) {
            return item["id"] != deletecardid;
          });
          console.log(updatedArray);
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
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
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

  const clearFilter = () => {
    document.querySelectorAll("input").forEach((checkbox) => {
      checkbox.checked = false;
    });
    setFilterName([]);
    setFilterCreator([]);
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
    if (src == "name") {
      handleNameChange(item);
    } else if (src == "date") {
      handleOnFilterDate(item);
    } else if (src == "creator") {
      handleCreatorChange(item);
    }
    if (filterapplied) {
      getSmartListData(1);
    } else {
    }
    setShowFilter(false);
  };

  return (
    <>
      <div class="right-sidebar">
        <div className="loader" id="custom_loader">
          <span className="loader-view"> </span>
        </div>
        <div class="top-header">
          <div class="page-title">
            <h2>Smart List</h2>
          </div>
          <div class="top-right-action">
            <div class="search-bar" onSubmit={(e) => submitHandler(e)}>
              <form class="d-flex">
                <input
                  class="form-control me-2"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => searchChange(e)}
                />
                <button class="btn btn-outline-success" type="submit">
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
            {/* <div class="filter-by nav-item dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter By{" "}
                <svg
                  class="filter-arrow"
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
                <svg
                  class="close-arrow"
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
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#">
                    Filter1{" "}
                    <img
                      src={path_image + "filter-close.svg"}
                      alt="Close-filter"
                    />
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Filter2{" "}
                    <img
                      src={path_image + "filter-close.svg"}
                      alt="Close-filter"
                    />
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Filter3{" "}
                    <img
                      src={path_image + "filter-close.svg"}
                      alt="Close-filter"
                    />
                  </a>
                </li>
              </ul>
            </div> */}
            <div class="clear-search">
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
            </div>
          </div>
        </div>
        <div class="smart-list-result">
          <div class="col smartlist-result-block">
            <div class="smartlist_box_block">
              <div class="smartlist-add smartlist-view">
                <Link to="/webinar/email/SmartListCreate">
                  <img src={path_image + "add-button.svg"} alt="" />
                </Link>
                <p>Create New Smart List</p>
              </div>
            </div>

            {typeof smartListData !== "undefined" &&
            smartListData.length > 0 ? (
              smartListData.map((data) => {
                return (
                  <div class="smartlist_box_block">
                    {console.log(data)}
                    <div class="smartlist-view email_box">
                      <div class="mail-box-content">
                        {data.count != 0 ? (
                          <Link
                            // className="btn btn-primary btn-filled view"
                            to={{
                              pathname: "/webinar/email/ViewSmartListWebinar",
                              search: "?listId=" + data.id,
                            }}
                          >
                            {" "}
                            <h5>{data.name}</h5>{" "}
                          </Link>
                        ) : (
                          <h5>{data.name}</h5>
                        )}
                        <div class="mail-time">
                          <span>{data.mod_date}</span>
                        </div>
                        <div class="smart-list-added-user">
                          <img
                            src={path_image + "smartlist-user.svg"}
                            alt="User icon"
                          />

                          {data.count}
                        </div>
                        <div class="mail-stats">
                          <ul>
                            <li>
                              <div class="mail-status smartlist_view">
                                <img
                                  src={path_image + "user-group.png"}
                                  alt=""
                                />
                              </div>
                              <span>10%</span>
                            </li>
                            <li>
                              <div class="mail-status mail_click">
                                <img
                                  src={path_image + "user-click.png"}
                                  alt=""
                                />
                              </div>
                              <span>60%</span>
                            </li>
                            <li>
                              <div class="mail-status smartlist_view">
                                <img
                                  src={path_image + "user-mail-template.png"}
                                  alt=""
                                />
                              </div>
                              <span>60%</span>
                            </li>
                          </ul>
                        </div>
                        {deletestatus && (
                          <div className="dlt_btn">
                            <button
                              onClick={(e) => showConfirmationPopup(data.id)}
                            >
                              <img
                                src={path_image + "delete.svg"}
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
              <div className="coming-soon">
                <h2>No data found</h2>
              </div>
            )}
          </div>
        </div>
      </div>

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
    </>
  );
};
export default WebinarSmartList;
