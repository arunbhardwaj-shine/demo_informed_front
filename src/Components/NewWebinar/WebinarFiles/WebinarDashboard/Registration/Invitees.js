import React, { useState, useEffect } from "react";
import { Button, Col, Modal, Accordion } from "react-bootstrap";
import Select from "react-select";
import ConfirmationModal from "../../../../../Model/ConfirmationModel";
import CommonConfirmModel from "../../../../../Model/CommonConfirmModel";
import { popup_alert } from "../../../../../popup_alert";
import { loader } from "../../../../../loader";
import { useLocation } from "react-router-dom";
import { getData, postData, deleteMethod } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import moment from "moment";
import { Spinner } from "react-activity";


const Invitees = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const { state } = useLocation()
  const [userTypeOptions, setUserTypeOptions] = useState([])
  const [userData, setUserData] = useState()
  const [originalUserData, setOriginalUserData] = useState()
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [clickUserId, setClickUserId] = useState(0);
  const [sortNameDirection, setSortNameDirection] = useState(0);
  const [sortingCount, setSortingCount] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [isActive, setIsActive] = useState("");
  const [search, setSearch] = useState("");
  const [noData, setNoData] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [showfilter, setShowFilter] = useState(false);
  const [filterdata, setFilterData] = useState({
    // "User type ": ["HCP", "Staff user", "Test user"],
    // "User ": ["Registered", "Blocked"]
  });
  const [otherFilter, setOtherFilter] = useState({});
  const [page, setPage] = useState(1)
  const [totalReaders, setTotalReaders] = useState()
  const [totalPage, setTotalPage] = useState()
  const [pageAll, setPageAll] = useState(false);

  useEffect(() => {
    getWebinarData(page);
  }, [])

  const getWebinarData = async (page) => {
    try {
      loader("show")
      let payload = {
        "search": search,
        "Country": otherFilter?.Country ? otherFilter?.Country : "",
        "UserType": otherFilter?.UserType ? otherFilter?.UserType : "",
        "Type": otherFilter?.Type ? otherFilter?.Type : ""
      }
      const response = await postData(`${ENDPOINT.WEBINAR_GET_EVENT_REGISTRATION}/${state?.eventId}?page=${page}`, payload)
      setTotalReaders(response?.data?.data?.totalReaders)
      setTotalPage(response?.data?.data?.totalPage)
      let userType = response?.data?.data?.filterData?.UserType?.map((item) => {
        return { label: item, value: item }

      })
      setFilterData(response?.data?.data?.filterData)
      setUserTypeOptions(userType)
      if (response?.data?.data?.totalReaders > ((userData?.length ? userData?.length : 0) + response?.data?.data?.data?.length)) {
        console.log("in is loaded")
        console.log("count--->", (userData?.length ? userData?.length : 0) + response?.data?.data?.data?.length)
        setIsLoaded(true)
      } else {
        setIsLoaded(false)
      }
      if (page == 1) {
        setUserData(response?.data?.data?.data)
      } else {
        setUserData((oldArray) => [...oldArray, ...response?.data?.data?.data]);
      }
      console.log("filters--->", response?.data?.data?.filterData)

      setApiStatus(true);

    } catch (err) {
      console.log("---err", err)
      setApiStatus(true);
    } finally {
      loader("hide")
    }

  }
  const searchChange = (e) => {
    setSearch(e?.target?.value?.trim());
    setIsLoaded(false);
    setNoData(false);
    setSearch(e?.target?.value);
    if (e?.target?.value === "") {
      setUserData(originalUserData)

    }
  };

  const handleChange = (e, user, index) => {
    let updateUserData = JSON.parse(JSON.stringify([...userData]))
    let updateUser = { ...updateUserData[index] }
    updateUser.hcp_status = e?.value
    updateUserData[index] = updateUser
    setUserData(updateUserData)
  }

  const saveUserClicked = async (e, user) => {
    try {
      loader("show")
      let data = {
        "eventId": state?.eventId, "user_id": user?.user_id, "hcp_status": user?.hcp_status
      }
      const res = await postData(ENDPOINT.WEBINAR_UPDATE_HCP_STATUS, data)
      popup_alert({
        visible: "show",
        message: "Your user has been updated <br />successfully !",
        type: "success",
        redirect: "",
      });
    } catch (err) {
      console.log("--err", err)
    } finally {
      loader("hide")
    }
  }

  const userEmailClicked = (e, user) => {
    console.log("email clicked-->", user?.Email)
  }

  const userBlockedClicked = async (e, user, index) => {
    try {
      loader("show")
      let data = {
        "eventId": state?.eventId, "user_id": user?.user_id, "is_blocked": user?.is_blocked == 0 ? 1 : 0
      }
      const response = await postData(ENDPOINT.WEBINAR_BLOCK_UNBLOCK_USER, data)
      let updateUserData = JSON.parse(JSON.stringify([...userData]))
      let updateUser = { ...updateUserData[index] }
      updateUser.is_blocked = user?.is_blocked == 0 ? 1 : 0
      updateUserData[index] = updateUser
      setUserData(updateUserData)
    } catch (err) {
      console.log("--err", err)
    } finally {
      loader("hide")
    }
  }

  const handleConfirmModel = async (id) => {
    setConfirmationPopup(false);

    try {
      loader("show");
      const res = await deleteMethod(`${ENDPOINT.WEBINAR_DELETE_USER}/${id}/${state?.eventId}`);
      setTotalReaders(res?.data?.data?.totalReaders)
      let updatedUserData = userData
      updatedUserData = updatedUserData?.filter((item) => item?.user_id != id)
      setUserData(updatedUserData)
      loader("hide");
      setClickUserId(0);
      popup_alert({
        visible: "show",
        message: "Your user has been deleted <br />successfully !",
        type: "success",
        redirect: "",
      });
    } catch (err) {
      console.log("--err", err);
      loader("hide");
    }
  };

  // const userSort = (e, type) => {
  //   const sortedIsData = [...userData].sort((a, b) => {
  //     const siteNumberA = a?.type;
  //     const siteNumberB = b?.type;
  //     if (sortNameDirection === 0) {
  //       if (siteNumberA < siteNumberB) return -1;
  //       if (siteNumberA > siteNumberB) return 1;
  //       return 0;
  //     } else {
  //       if (siteNumberA > siteNumberB) return -1;
  //       if (siteNumberA < siteNumberB) return 1;
  //       return 0;
  //     }
  //   });

  //   setUserData(sortedIsData);
  //   setSortNameDirection(sortNameDirection === 0 ? 1 : 0); // Toggle the sort direction
  //   if (isActive == "asc") {
  //     setIsActive("dec");
  //   } else {
  //     setIsActive("asc");
  //   }

  //   setSorting(1 - sorting);
  //   setSortingCount(sortingCount + 1);
  // };


  const dynamicSort = (key, direction) => (a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (direction === 'asc') {
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    } else {
      if (valueA > valueB) return -1;
      if (valueA < valueB) return 1;
      return 0;
    }
  };

  const userSort = (e, key) => {
    const direction = sortNameDirection === 0 ? 'asc' : 'dec';

    const sortedUserData = [...userData].sort(dynamicSort(key, direction));

    setUserData(sortedUserData);
    setSortNameDirection(sortNameDirection === 0 ? 1 : 0); // Toggle the sort direction
    setIsActive(direction === 'asc' ? 'dec' : 'asc');
    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
  };

  const getDownloadData = async (page, obj, search) => {
    // try {
    //   loader("show");
    //   let data = {
    //     user_id: localStorage.getItem("user_id"),
    //     userType: 5,
    //     search: search,
    //     type: "",
    //     page: 1,
    //   };

    //   let payload = { ...data, ...filterObject };
    //   const res = await postFormData(
    //     ENDPOINT.MARKETING_READER_DOWNLOAD,
    //     payload,
    //     {
    //       responseType: "blob",
    //     }
    //   );
    //   const link = document.createElement("a");
    //   const url = URL.createObjectURL(res?.data);
    //   link.href = url;
    //   link.download = "readers.xlsx";
    //   link.click();
    //   loader("hide");
    // } catch (err) {
    //   console.log(err);
    //   loader("hide");
    // }
  }
  const handleOnFilterChange = (e, item, index, key, data = {}) => {
    const updatedFilter = { ...data };

    if (e?.target?.type === "checkbox") {
      if (updatedFilter[key]) {

        updatedFilter[key] = updatedFilter[key].includes(item)
          ? updatedFilter[key].filter((value) => value !== item)
          : [...updatedFilter[key], item];
      } else {

        updatedFilter[key] = [item];
      }
    }
    setOtherFilter(updatedFilter);
  };
  const applyFilter = async () => {
    console.log("Filters Applied:", otherFilter);
    let page = 1
    getWebinarData(page, otherFilter)
    setShowFilter(false)
  };


  const clearFilter = () => {
    setOtherFilter({});
    setShowFilter(false)
  };
  const loadMoreClicked = () => {
    let sp = page + 1;
    setPage(sp);
    getWebinarData(sp)
  };

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="top-header regi-web">
              <div className="page-title">
                <h2>Invitees</h2>
              </div>
            </div>

            <div className="page-top-nav smart_list_names sticky">
              <div className="d-flex justify-content-between align-items-center">
                <div className="table-title">
                  <h4>Total Registrations | {totalReaders}</h4>
                </div>
                <div className="search-bar">
                  <form
                    className="d-flex"
                  // onSubmit={(e) => submitSearchHandler(e)}
                  >
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Search by title"
                      aria-label="Search"
                      id="email_search"
                    //   onChange={(e) => searchChange(e)}
                    />
                    <button className="btn-outline-success" type="submit">
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
                <div className="clear-search">
                  <button
                    className="btn print"
                    title="Download stats"
                  // onClick={() => {
                  //   getDownloadData(page, obj, search);
                  // }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z"
                        fill="#0066BE"
                      />
                      <path
                        d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                        fill="#0066BE"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className="filter-by nav-item dropdown"
                >
                  <button
                    className="btn btn-secondary dropdown"
                    type="button"
                    id="dropdownMenuButton2"
                    onClick={() => setShowFilter((showfilter) => !showfilter)}
                  >
                    Filter By
                    {
                      showfilter ? (
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
                          ></path>
                          <path
                            d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                            fill="#97B6CF"
                          ></path>
                          <path
                            d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                            fill="#97B6CF"
                          ></path>
                        </svg>
                      )
                    }
                  </button>
                  {
                    showfilter && (
                      <div
                        className="dropdown-menu filter-options"
                        aria-labelledby="dropdownMenuButton2"
                      >
                        <h4>Filter By</h4>
                        <Accordion defaultActiveKey="0" flush>
                          {Object.keys(filterdata)?.map(function (key, index) {
                            return (
                              <>
                                {filterdata[key]?.length ? (
                                  <Accordion.Item
                                    className={
                                      key == "Role" ? "card upper" : "card"
                                    }
                                    eventKey={index}
                                  >
                                    <Accordion.Header className="card-header">
                                      {key}
                                    </Accordion.Header>
                                    <Accordion.Body className="card-body">
                                      <ul>
                                        {filterdata[key]?.length
                                          ? filterdata[key]?.map(
                                            (item, index) => (
                                              <li>
                                                {item != "" ? (
                                                  <label className="select-multiple-option">
                                                    <input
                                                      type="checkbox"

                                                      id={`custom-checkbox-tags-${index}`}
                                                      value={item}
                                                      name={key}
                                                      checked={
                                                        otherFilter[
                                                          key
                                                        ]?.includes(item)
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={(e) =>
                                                        handleOnFilterChange(e, item, index, key, otherFilter)
                                                      }
                                                    />

                                                    {key == "draft" &&
                                                      item == "0"
                                                      ? "live"
                                                      : key == "draft" &&
                                                        item == "1"
                                                        ? "draft"
                                                        : item}
                                                    <span className="checkmark"></span>
                                                  </label>
                                                ) : null}
                                              </li>
                                            )
                                          )
                                          : null}
                                      </ul>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                ) : null}
                              </>
                            );
                          })}
                        </Accordion>

                        <div className="filter-footer">
                          <button
                            className="btn btn-primary btn-bordered" onClick={clearFilter}
                          >
                            Clear
                          </button>
                          <button
                            className="btn btn-primary btn-filled" onClick={applyFilter}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            {userData != "undefined" && userData?.length > 0 ?
              (<div className="invitee">
                <table className="table" id="table-to-xls">
                  <thead className="sticky-header">
                    <tr>
                      <th scope="col">Name
                        <button
                          className={`event_sort_btn ${isActive == "dec"
                            ? "svg_active"
                            : isActive == "asc"
                              ? "svg_asc"
                              : ""
                            }`}
                          onClick={(e) => userSort(e, "name")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              id="asc"
                              d="M18.9224 12.744C18.7661 12.5878 18.5542 12.5 18.3332 12.5C18.1122 12.5 17.9003 12.5878 17.744 12.744L14.9999 15.4882V2.49984C14.9999 2.27882 14.9121 2.06686 14.7558 1.91058C14.5995 1.7543 14.3875 1.6665 14.1665 1.6665C13.9455 1.6665 13.7335 1.7543 13.5773 1.91058C13.421 2.06686 13.3332 2.27882 13.3332 2.49984V15.4882L10.589 12.744C10.4318 12.5922 10.2213 12.5082 10.0029 12.5101C9.78435 12.512 9.57534 12.5997 9.42084 12.7542C9.26633 12.9087 9.17869 13.1177 9.17679 13.3362C9.17489 13.5547 9.25889 13.7652 9.41068 13.9223L13.5774 18.089C13.6548 18.1666 13.7467 18.2282 13.848 18.2702C13.9492 18.3122 14.0577 18.3338 14.1674 18.3338C14.277 18.3338 14.3855 18.3122 14.4867 18.2702C14.588 18.2282 14.6799 18.1666 14.7574 18.089L18.924 13.9223C19.08 13.7658 19.1675 13.5538 19.1672 13.3328C19.1669 13.1119 19.0788 12.9001 18.9224 12.744Z"
                              fill="#97B6CF"
                            />
                            <path
                              id="dsc"
                              d="M10.5892 6.0772L6.42251 1.91054C6.34489 1.83277 6.25253 1.77129 6.15084 1.7297C5.94698 1.64544 5.71803 1.64544 5.51417 1.7297C5.41248 1.77129 5.32011 1.83277 5.2425 1.91054L1.07583 6.0772C0.919572 6.23368 0.831875 6.44582 0.832031 6.66695C0.832188 6.88809 0.920184 7.10011 1.07666 7.25636C1.23314 7.41262 1.44528 7.50032 1.66642 7.50016C1.88756 7.5 2.09957 7.41201 2.25583 7.25553L5 4.51137V17.4997C5 17.7207 5.0878 17.9327 5.24408 18.0889C5.40036 18.2452 5.61232 18.333 5.83334 18.333C6.05435 18.333 6.26631 18.2452 6.4226 18.0889C6.57888 17.9327 6.66667 17.7207 6.66667 17.4997V4.51137L9.41085 7.25553C9.56801 7.40733 9.77852 7.49132 9.99701 7.48943C10.2155 7.48753 10.4245 7.39989 10.579 7.24538C10.7335 7.09087 10.8212 6.88186 10.8231 6.66337C10.825 6.44487 10.741 6.23437 10.5892 6.0772Z"
                              fill="#97B6CF"
                            />
                          </svg>
                        </button>
                      </th>
                      <th scope="col">Email
                        <button
                          className={`event_sort_btn ${isActive == "dec"
                            ? "svg_active"
                            : isActive == "asc"
                              ? "svg_asc"
                              : ""
                            }`}
                          onClick={(e) => userSort(e, "email")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              id="asc"
                              d="M18.9224 12.744C18.7661 12.5878 18.5542 12.5 18.3332 12.5C18.1122 12.5 17.9003 12.5878 17.744 12.744L14.9999 15.4882V2.49984C14.9999 2.27882 14.9121 2.06686 14.7558 1.91058C14.5995 1.7543 14.3875 1.6665 14.1665 1.6665C13.9455 1.6665 13.7335 1.7543 13.5773 1.91058C13.421 2.06686 13.3332 2.27882 13.3332 2.49984V15.4882L10.589 12.744C10.4318 12.5922 10.2213 12.5082 10.0029 12.5101C9.78435 12.512 9.57534 12.5997 9.42084 12.7542C9.26633 12.9087 9.17869 13.1177 9.17679 13.3362C9.17489 13.5547 9.25889 13.7652 9.41068 13.9223L13.5774 18.089C13.6548 18.1666 13.7467 18.2282 13.848 18.2702C13.9492 18.3122 14.0577 18.3338 14.1674 18.3338C14.277 18.3338 14.3855 18.3122 14.4867 18.2702C14.588 18.2282 14.6799 18.1666 14.7574 18.089L18.924 13.9223C19.08 13.7658 19.1675 13.5538 19.1672 13.3328C19.1669 13.1119 19.0788 12.9001 18.9224 12.744Z"
                              fill="#97B6CF"
                            />
                            <path
                              id="dsc"
                              d="M10.5892 6.0772L6.42251 1.91054C6.34489 1.83277 6.25253 1.77129 6.15084 1.7297C5.94698 1.64544 5.71803 1.64544 5.51417 1.7297C5.41248 1.77129 5.32011 1.83277 5.2425 1.91054L1.07583 6.0772C0.919572 6.23368 0.831875 6.44582 0.832031 6.66695C0.832188 6.88809 0.920184 7.10011 1.07666 7.25636C1.23314 7.41262 1.44528 7.50032 1.66642 7.50016C1.88756 7.5 2.09957 7.41201 2.25583 7.25553L5 4.51137V17.4997C5 17.7207 5.0878 17.9327 5.24408 18.0889C5.40036 18.2452 5.61232 18.333 5.83334 18.333C6.05435 18.333 6.26631 18.2452 6.4226 18.0889C6.57888 17.9327 6.66667 17.7207 6.66667 17.4997V4.51137L9.41085 7.25553C9.56801 7.40733 9.77852 7.49132 9.99701 7.48943C10.2155 7.48753 10.4245 7.39989 10.579 7.24538C10.7335 7.09087 10.8212 6.88186 10.8231 6.66337C10.825 6.44487 10.741 6.23437 10.5892 6.0772Z"
                              fill="#97B6CF"
                            />
                          </svg>
                        </button>
                      </th>
                      <th scope="col">Country
                        <button
                          className={`event_sort_btn ${isActive == "dec"
                            ? "svg_active"
                            : isActive == "asc"
                              ? "svg_asc"
                              : ""
                            }`}
                          onClick={(e) => userSort(e, "country")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              id="asc"
                              d="M18.9224 12.744C18.7661 12.5878 18.5542 12.5 18.3332 12.5C18.1122 12.5 17.9003 12.5878 17.744 12.744L14.9999 15.4882V2.49984C14.9999 2.27882 14.9121 2.06686 14.7558 1.91058C14.5995 1.7543 14.3875 1.6665 14.1665 1.6665C13.9455 1.6665 13.7335 1.7543 13.5773 1.91058C13.421 2.06686 13.3332 2.27882 13.3332 2.49984V15.4882L10.589 12.744C10.4318 12.5922 10.2213 12.5082 10.0029 12.5101C9.78435 12.512 9.57534 12.5997 9.42084 12.7542C9.26633 12.9087 9.17869 13.1177 9.17679 13.3362C9.17489 13.5547 9.25889 13.7652 9.41068 13.9223L13.5774 18.089C13.6548 18.1666 13.7467 18.2282 13.848 18.2702C13.9492 18.3122 14.0577 18.3338 14.1674 18.3338C14.277 18.3338 14.3855 18.3122 14.4867 18.2702C14.588 18.2282 14.6799 18.1666 14.7574 18.089L18.924 13.9223C19.08 13.7658 19.1675 13.5538 19.1672 13.3328C19.1669 13.1119 19.0788 12.9001 18.9224 12.744Z"
                              fill="#97B6CF"
                            />
                            <path
                              id="dsc"
                              d="M10.5892 6.0772L6.42251 1.91054C6.34489 1.83277 6.25253 1.77129 6.15084 1.7297C5.94698 1.64544 5.71803 1.64544 5.51417 1.7297C5.41248 1.77129 5.32011 1.83277 5.2425 1.91054L1.07583 6.0772C0.919572 6.23368 0.831875 6.44582 0.832031 6.66695C0.832188 6.88809 0.920184 7.10011 1.07666 7.25636C1.23314 7.41262 1.44528 7.50032 1.66642 7.50016C1.88756 7.5 2.09957 7.41201 2.25583 7.25553L5 4.51137V17.4997C5 17.7207 5.0878 17.9327 5.24408 18.0889C5.40036 18.2452 5.61232 18.333 5.83334 18.333C6.05435 18.333 6.26631 18.2452 6.4226 18.0889C6.57888 17.9327 6.66667 17.7207 6.66667 17.4997V4.51137L9.41085 7.25553C9.56801 7.40733 9.77852 7.49132 9.99701 7.48943C10.2155 7.48753 10.4245 7.39989 10.579 7.24538C10.7335 7.09087 10.8212 6.88186 10.8231 6.66337C10.825 6.44487 10.741 6.23437 10.5892 6.0772Z"
                              fill="#97B6CF"
                            />
                          </svg>
                        </button>
                      </th>
                      <th scope="col">Registered
                        <button
                          className={`event_sort_btn ${isActive == "dec"
                            ? "svg_active"
                            : isActive == "asc"
                              ? "svg_asc"
                              : ""
                            }`}
                          onClick={(e) => userSort(e, "registered")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              id="asc"
                              d="M18.9224 12.744C18.7661 12.5878 18.5542 12.5 18.3332 12.5C18.1122 12.5 17.9003 12.5878 17.744 12.744L14.9999 15.4882V2.49984C14.9999 2.27882 14.9121 2.06686 14.7558 1.91058C14.5995 1.7543 14.3875 1.6665 14.1665 1.6665C13.9455 1.6665 13.7335 1.7543 13.5773 1.91058C13.421 2.06686 13.3332 2.27882 13.3332 2.49984V15.4882L10.589 12.744C10.4318 12.5922 10.2213 12.5082 10.0029 12.5101C9.78435 12.512 9.57534 12.5997 9.42084 12.7542C9.26633 12.9087 9.17869 13.1177 9.17679 13.3362C9.17489 13.5547 9.25889 13.7652 9.41068 13.9223L13.5774 18.089C13.6548 18.1666 13.7467 18.2282 13.848 18.2702C13.9492 18.3122 14.0577 18.3338 14.1674 18.3338C14.277 18.3338 14.3855 18.3122 14.4867 18.2702C14.588 18.2282 14.6799 18.1666 14.7574 18.089L18.924 13.9223C19.08 13.7658 19.1675 13.5538 19.1672 13.3328C19.1669 13.1119 19.0788 12.9001 18.9224 12.744Z"
                              fill="#97B6CF"
                            />
                            <path
                              id="dsc"
                              d="M10.5892 6.0772L6.42251 1.91054C6.34489 1.83277 6.25253 1.77129 6.15084 1.7297C5.94698 1.64544 5.71803 1.64544 5.51417 1.7297C5.41248 1.77129 5.32011 1.83277 5.2425 1.91054L1.07583 6.0772C0.919572 6.23368 0.831875 6.44582 0.832031 6.66695C0.832188 6.88809 0.920184 7.10011 1.07666 7.25636C1.23314 7.41262 1.44528 7.50032 1.66642 7.50016C1.88756 7.5 2.09957 7.41201 2.25583 7.25553L5 4.51137V17.4997C5 17.7207 5.0878 17.9327 5.24408 18.0889C5.40036 18.2452 5.61232 18.333 5.83334 18.333C6.05435 18.333 6.26631 18.2452 6.4226 18.0889C6.57888 17.9327 6.66667 17.7207 6.66667 17.4997V4.51137L9.41085 7.25553C9.56801 7.40733 9.77852 7.49132 9.99701 7.48943C10.2155 7.48753 10.4245 7.39989 10.579 7.24538C10.7335 7.09087 10.8212 6.88186 10.8231 6.66337C10.825 6.44487 10.741 6.23437 10.5892 6.0772Z"
                              fill="#97B6CF"
                            />
                          </svg>
                        </button>
                      </th>
                      <th scope="col">Last Email
                        <button
                          className={`event_sort_btn ${isActive == "dec"
                            ? "svg_active"
                            : isActive == "asc"
                              ? "svg_asc"
                              : ""
                            }`}
                          onClick={(e) => userSort(e, "last_email")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              id="asc"
                              d="M18.9224 12.744C18.7661 12.5878 18.5542 12.5 18.3332 12.5C18.1122 12.5 17.9003 12.5878 17.744 12.744L14.9999 15.4882V2.49984C14.9999 2.27882 14.9121 2.06686 14.7558 1.91058C14.5995 1.7543 14.3875 1.6665 14.1665 1.6665C13.9455 1.6665 13.7335 1.7543 13.5773 1.91058C13.421 2.06686 13.3332 2.27882 13.3332 2.49984V15.4882L10.589 12.744C10.4318 12.5922 10.2213 12.5082 10.0029 12.5101C9.78435 12.512 9.57534 12.5997 9.42084 12.7542C9.26633 12.9087 9.17869 13.1177 9.17679 13.3362C9.17489 13.5547 9.25889 13.7652 9.41068 13.9223L13.5774 18.089C13.6548 18.1666 13.7467 18.2282 13.848 18.2702C13.9492 18.3122 14.0577 18.3338 14.1674 18.3338C14.277 18.3338 14.3855 18.3122 14.4867 18.2702C14.588 18.2282 14.6799 18.1666 14.7574 18.089L18.924 13.9223C19.08 13.7658 19.1675 13.5538 19.1672 13.3328C19.1669 13.1119 19.0788 12.9001 18.9224 12.744Z"
                              fill="#97B6CF"
                            />
                            <path
                              id="dsc"
                              d="M10.5892 6.0772L6.42251 1.91054C6.34489 1.83277 6.25253 1.77129 6.15084 1.7297C5.94698 1.64544 5.71803 1.64544 5.51417 1.7297C5.41248 1.77129 5.32011 1.83277 5.2425 1.91054L1.07583 6.0772C0.919572 6.23368 0.831875 6.44582 0.832031 6.66695C0.832188 6.88809 0.920184 7.10011 1.07666 7.25636C1.23314 7.41262 1.44528 7.50032 1.66642 7.50016C1.88756 7.5 2.09957 7.41201 2.25583 7.25553L5 4.51137V17.4997C5 17.7207 5.0878 17.9327 5.24408 18.0889C5.40036 18.2452 5.61232 18.333 5.83334 18.333C6.05435 18.333 6.26631 18.2452 6.4226 18.0889C6.57888 17.9327 6.66667 17.7207 6.66667 17.4997V4.51137L9.41085 7.25553C9.56801 7.40733 9.77852 7.49132 9.99701 7.48943C10.2155 7.48753 10.4245 7.39989 10.579 7.24538C10.7335 7.09087 10.8212 6.88186 10.8231 6.66337C10.825 6.44487 10.741 6.23437 10.5892 6.0772Z"
                              fill="#97B6CF"
                            />
                          </svg>
                        </button>

                      </th>
                      <th scope="col">User Type</th>
                    </tr>
                  </thead>

                  <tbody className="form-group">
                    {userData?.map((user, index) => (
                      <tr key={index}>
                        <td>{user?.name}</td>
                        <td>{user?.email}</td>
                        <td>{user?.province}</td>
                        <td className="registred">
                          {user?.is_blocked == 0 ?
                            moment(user?.register_time).format('DD MMMM YYYY | hh:mm:ss A') : "Blocked"}
                        </td>
                        <td>{user?.last_email ? user?.last_email : "N/A"}</td>
                        <td>
                          <div className="invitess-tbl">
                            <div className="invitess-tbl-left">
                              <div className="clear-search">
                                <Select
                                  className="dropdown-basic-button split-button-dropup"
                                  options={userTypeOptions}
                                  placeholder="Select user type"
                                  value={userTypeOptions?.findIndex((item, i) => item?.value == user?.hcp_status) != -1 ?
                                    userTypeOptions[userTypeOptions?.findIndex((item, i) => item?.value == user?.hcp_status)]
                                    : ""
                                  }
                                  onChange={(e) => handleChange(e, user, index)}
                                />

                              </div>
                              <div className="clear-search">
                                <Button
                                  style={{ marginLeft: "8px" }}
                                  onClick={(e) => saveUserClicked(e, user)}
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                            <div className="invitess-tbl-right">
                              <div className="clear-search">
                                <button
                                  // style={{ marginLeft: "10px" }}
                                  className="btn-webinar"
                                  onClick={(e) => userEmailClicked(e, user)}
                                >
                                  <img
                                    title="Email"
                                    src={path_image + "email-icon1.svg"}
                                    alt="Email"
                                  />
                                </button>
                              </div>
                              <div className="clear-search">
                                <button
                                  // style={{ marginLeft: "10px" }}
                                  className="btn-webinar"
                                  onClick={(e) => userBlockedClicked(e, user, index)}
                                >
                                  <img
                                    title="Email"
                                    src={path_image + "user-blocked.svg"}
                                    alt="Email"
                                  />
                                </button>
                              </div>
                              <div className="clear-search">
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={() => {
                                    setConfirmationPopup(true);
                                    setClickUserId(user?.user_id);
                                  }}
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )
              : apiStatus ? (
                <div class="email_box_block no_found">
                  <p>No Data Found</p>
                </div>
              ) : (
                ""
              )
            }
            <div className="load_more">
              {isLoaded == true ? (
                <Button
                  className="btn btn-primary btn-filled"
                  onClick={loadMoreClicked}
                >
                  Load More
                </Button>
              ) : null}
            </div>
            {pageAll == true ? (
              <div
                className="load_more"
                style={{
                  margin: "0 auto",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Spinner
                  color="#53aff4"
                  size={32}
                  speed={1}
                  animating={true}
                />
              </div>
            ) : null}

          </div>
        </div>
      </Col>
      <CommonConfirmModel
        show={confirmationpopup}
        onClose={setConfirmationPopup}
        fun={handleConfirmModel}
        resetDataId={clickUserId}
        popupMessage={{
          message1: "You are about to remove this user forever.",
          message2: "Are you sure you want to do this?",
          footerButton: " Yes please!",
        }}
        path_image={path_image}
      />
    </>
  );
};


export default Invitees;
