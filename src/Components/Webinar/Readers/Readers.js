import React, { useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  Col,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import ExportApi from "../../../Api/ExportApi";
import ReactDOM from "react-dom";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import CsvDownload from "react-json-to-csv";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import { Accordion } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loader } from "../../../loader";
import axios from "axios";
import { BaseApi } from "../../../Api/BaseApi";

const Readers = () => {
  const [data, setData] = useState();
  const [showfilter, setShowFilter] = useState(false);
  const [type, setType] = useState();
  const [paginate, setPaginate] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [countryvalue, setCountryValue] = useState();
  const [event, setEvent] = useState([]);
  const [eventId, setEventId] = useState();
  const [search, setSearch] = useState();
  const [userType, setUserType] = useState(["HCP", "Staff User", "Test User"]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [flag, setFlag] = useState(false);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [NewData, setNewData] = useState();
  const [modalShow1, setModalShow1] = useState(false);
  const baseURL = BaseApi.getBaseURL();
  const [countryName, setCountryName] = useState();
  const [render, setRender] = useState(0);
  const [massage, setMassage] = useState(false);
  const [selectedType, setSelectedType] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [participantsCount, setParticipantsCount] = useState();
  const [lastPage, setLastPage] = useState();
  const [nextPageUrl, setNextPageUrl] = useState("");

  let path_image = process.env.REACT_APP_ASSETS_PATH_WEBINAR;
  const handleGetReadersData = (id) => {
    ExportApi.ReadersData(id).then((resp) => {
      if (resp.ok) {
        // console.log(resp);
        if (resp.data.code === 404) {
          setMassage("No data found");
          setData();
          setFlag(false);
        } else {
          setPaginate(resp.data.data.paginate);
          setUpdatedData(resp.data.data.data);
          setCurrentPage(resp.data.data.paginate.currentPage);
          setData(resp.data.data.data);
          setParticipantsCount(resp.data.data.paginate.count);
          setLastPage(resp.data.data.paginate.lastPage);
          setNextPageUrl(resp.data.data.paginate.nextPageUrl);
          const newArray = resp.data.data.data?.map(
            ({ id, state, is_blocked, category, country_id, ...item }) => item
          );
          setNewData(newArray);
          setFlag(true);
        }
      }
    });
  }; const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      country: "",
      profession: "",
      interest: "",
      hospital: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().required("Email is required").email(),
    }),
    onSubmit: (values) => {
      loader("show");
      let Data = JSON.stringify([values]);
      ExportApi.EmailSand(localStorage.getItem("SmartListId"), Data)
        .then((resp) => {
          if (resp.data) {
            // console.log(resp.data);
            if (resp.data.code == 200) {             
              toast.success(resp.data.message);
            } else {
              loader("hide");
              toast.error(resp.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          }
        })

        .catch((err) => {
          loader("hide");
        });
 loader("hide");
    },

    // props.closePopup();
  });

  const handleGetReadersDataPage = (id) => {
    ExportApi.ReadersPage(id, eventId).then((resp) => {
      if (resp.ok) {
        if (resp.data.code === 404) {
          setMassage("Data Not Found");
          setData();
        } else {
          setPaginate(resp.data.data.paginate);
          setCurrentPage(resp.data.data.paginate.currentPage);
          setData(resp.data.data.data);
        }
      }
    });
  };
  const handleGetReadersSearch = (id) => {
    ExportApi.ReadersDataSearch(localStorage.getItem("EventIdHeader"), id, type, countryvalue).then(
      (resp) => {
        if (resp.ok) {
          if (resp.data.code === 404) {
            setMassage("Data Not Found");
            setData();
          } else {
            setData(resp.data.data.data);
          }
        }
      }
    );
  };
  const handleGetReadersType = (id) => {
    if (id == "null") {
      setMassage("Data Not Found");
      handleGetReadersData(eventId);
    } else {
      ExportApi.ReadersType(localStorage.getItem("EventIdHeader"), id, search, countryvalue).then((resp) => {
        if (resp.ok) {
          if (resp.data.code === 404) {
            setData();
            setMassage("No data found");
          } else {
            setData(resp.data.data.data);
          }
        }
      });
    }
  };

  const showPaginationData = async () => {
    const body = {
      event_id: localStorage.getItem("EventIdHeader"),
      type: selectedType,
      country_id: selectedCountry,
    };

    // loader("show");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };
    // console.log(nextPageUrl);
    loader("show");
    await axios
      .post(nextPageUrl, body, {
        headers,
      })
      .then((res) => {
        // console.log(res);
        // console.log(res);
        if (res.data.code == 200) {
          // console.log(res);
          setData((oldArray) => [...oldArray, ...res.data.data.data]);
          // setData(res.data.data.data);
          setParticipantsCount(res.data.data.paginate.count);
          setNextPageUrl(res.data.data.paginate.nextPageUrl);
          setLastPage(res.data.data.paginate.lastPage);
          setCurrentPage(res.data.data.paginate.currentPage);
          loader("hide");
        } else {
          toast.error(res.data.message);
          loader("hide");
        }

        //    loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetReadersCountry = (id) => {
    // console.log(id);
    if (id == "null") {
      setMassage("No data found");
      setData();
      setFlag(false);
    } else {
      ExportApi.ReadersCountry(eventId, id, type, search).then((resp) => {
        if (resp.ok) {
          if (resp.data.code === 404) {
            setMassage("No data found");
            setData();
          } else {
            setData(resp.data.data.data);
          }
        }
      });
    }
  };
  const handleGetCountryData = () => {
    ExportApi.GetCountryData().then((resp) => {
      if (resp.ok) {
        //  console.log(resp.data.data);

        setCountryName(resp.data.data);
      }
    });
  };
  const handleDeleteData = () => {
    ExportApi.ReadersDelete(localStorage.getItem("DeleteData"), 1).then(
      (resp) => {
        if (resp.ok) {
          if (resp.data.code == 200) {
            toast.success(resp.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error(resp.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      }
    );
  };
  const handleBlock = () => {
    if (localStorage.getItem("is") == 0) {
      ExportApi.ReadersBlock(localStorage.getItem("blockId"), 1).then(
        (resp) => {
          if (resp.ok) {
            if (resp.data.code == 200) {
              handleGetReadersSearch();
              toast.success(resp.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              toast.error(resp.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          }
        }
      );
    } else {
      ExportApi.ReadersBlock(localStorage.getItem("blockId"), 0).then(
        (resp) => {
          if (resp.ok) {
            if (resp.data.code == 200) {
              handleGetReadersSearch();
              toast.success(resp.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              toast.error(resp.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          }
        }
      );
    }
  };
  const handleSelect = (e, i) => {
    let copydata = data;
    copydata[i].type = e;
    setData(copydata);
    setRender(render + 1);
  };
  const handleSelectChange = (id, val) => {
    ExportApi.ReadersBlockt(id, val).then((resp) => {
      if (resp.ok) {
        if (resp.data.code == 200) {
          toast.success(resp.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(resp.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    });
  };

  const getCountryFilter = (e, country_id) => {
    //  console.log(country_id);
    const { value, checked } = e.target;
    // console.log(value);
    // console.log(checked);

    if (checked) {
      setSelectedCountry((oldArray) => [...oldArray, country_id]);
      // setSelectedCountryName((oldArray) => [...oldArray, item.country]);
    } else {
      const country_selected = selectedCountry.filter((data) => {
        return data != country_id;
      });

      setSelectedCountry(country_selected);
      // setSelectedCountryName(country_selected_name);
    }
  };

  useEffect(() => {
    handleGetCountryData();
  }, []);

  useEffect(() => {
    window.addEventListener("EventId", () =>
      handleGetReadersData(localStorage.getItem("EventIdHeader"))
    );
    handleGetReadersData(localStorage.getItem("EventIdHeader"));
    if (localStorage.getItem("EventIdHeader")) {
      console.log("done");
    } else {
      loader("hide");
    }
  }, []);

  const getUserType = (e, type) => {
    const { value, checked } = e.target;
    // console.log(value);
    // console.log(checked);

    if (checked) {
      setSelectedType((oldArray) => [...oldArray, type]);
      // setSelectedCountryName((oldArray) => [...oldArray, item.country]);
    } else {
      const type_selected = selectedType.filter((data) => {
        return data != type;
      });

      setSelectedType(type_selected);
      // setSelectedCountryName(country_selected_name);
    }
  };

  const clearFilter = () => {
    document.querySelectorAll("input").forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedType([]);
    setSelectedCountry([]);
    setShowFilter(false);

    handleGetReadersData(localStorage.getItem("EventIdHeader"));
    // setNextPageUrl("");
    // setLastPage();
    // setCurrentPage(1);

    setData(updatedData);
  };

  const filterData = async () => {
    // console.log(selectedCountry);
    // console.log(selectedType);

    const body = {
      event_id: localStorage.getItem("EventIdHeader"),

      type: selectedType,
      country_id: selectedCountry,
    };

    // loader("show");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };
    loader("show");
    await axios
      .post(baseURL + "/participants", body, {
        headers,
      })
      .then((res) => {
        // console.log(res);
        // console.log(res);
        if (res.data.code == 200) {
          // console.log(res);
          setData(res.data.data.data);

          loader("hide");
        } else {
          toast.error(res.data.message);
          loader("hide");
        }

        //    loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });
    // setShowFilter(false);
  };

  return (
    <>
      <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
    <div className="right-sidebar col">
      <Row>
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
        <div className="top-header">
          <div className="page-title">
            <h2>HCPs List</h2>
            <span className="reader-header-count">
              {data ? " Total Registrations | " + data.length : null}
            </span>
          </div>
          <div className="top-right-action">
            <div className="search-bar">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => {
                    handleGetReadersSearch(e.target.value);
                    setSearch(e.target.value);
                  }}
                />
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
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
              {/* {console.log(showfilter)} */}
              {showfilter && (
                <div
                  className="dropdown-menu filter-options"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <h4>Filter By</h4>
                  <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item className="card" eventKey="0">
                      <Accordion.Header className="card-header">
                        Country
                      </Accordion.Header>

                      <Accordion.Body className="card-body">
                        <ul>
                          {countryName.map((data, index) => {
                            return (
                              <li>
                                {/* {console.log(
                                  selectedCountry.indexOf(data) !== -1
                                )} */}
                                {/* {console.log("here")} */}
                                {data != "" ? (
                                  <label className="select-multiple-option">
                                    <input
                                      type="checkbox"
                                      id={`custom-checkbox-tags-${index}`}
                                      name="tags[]"
                                      value={data.country}
                                      // checked={
                                      //   //    updateflag > 0 &&
                                      //   //    typeof filtertags !==
                                      //   //      "undefined" &&
                                      //   //    filtertags.indexOf(item) !== -1
                                      //   selectedCountry.indexOf(data) !== -1
                                      // }
                                      onChange={(e) =>
                                        getCountryFilter(e, data.id)
                                      }
                                    />
                                    {data.country}
                                    <span className="checkmark"></span>
                                  </label>
                                ) : null}
                              </li>
                            );
                          })}

                          {/* {Object.entries(filterdata).map(([index, item]) => (
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
                                      typeof filtertags !== "undefined" &&
                                      filtertags.indexOf(item) !== -1
                                    }
                                    onChange={() => handleOnFilterTags(item)}
                                  />
                                  {item}
                                  <span className="checkmark"></span>
                                </label>
                              ) : null}
                            </li>
                          ))} */}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item className="card" eventKey="1">
                      <Accordion.Header className="card-header">
                        Type
                      </Accordion.Header>

                      <Accordion.Body className="card-body">
                        <ul>
                          {userType.map((data, index) => {
                            return (
                              <li>
                                {data != "" ? (
                                  <label className="select-multiple-option">
                                    <input
                                      type="checkbox"
                                      id={`custom-checkbox-tags-${index}`}
                                      name="tags[]"
                                      value={data}
                                      //  checked={
                                      //    updateflag > 0 &&
                                      //    typeof filtertags !==
                                      //      "undefined" &&
                                      //    filtertags.indexOf(item) !== -1
                                      //  }
                                      onChange={(e) => getUserType(e, data)}
                                    />
                                    {data}
                                    <span className="checkmark"></span>
                                  </label>
                                ) : null}
                              </li>
                            );
                          })}

                          {/* {Object.entries(filterdata).map(([index, item]) => (
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
                                      typeof filtertags !== "undefined" &&
                                      filtertags.indexOf(item) !== -1
                                    }
                                    onChange={() => handleOnFilterTags(item)}
                                  />
                                  {item}
                                  <span className="checkmark"></span>
                                </label>
                              ) : null}
                            </li>
                          ))} */}
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
                      onClick={() => {
                        filterData();
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="clear-search">
              <CsvDownload data={NewData} className="btn-filled download">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
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
              </CsvDownload>
            </div>
          </div>
        </div>
        {/* <Row className="readerListing">
          <Col>
            <Form.Select
              className="form-select"
              onChange={(e) => {
                handleGetReadersCountry(e.target.value);
                setCountryValue(e.target.value);
              }}
            >
              <option value="">Select Country</option>
              {countryName?.map((val, i) => (
                <React.Fragment key={i}>
                  <option value={val.id}>{val.country}</option>
                </React.Fragment>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Select
              className="form-select"
              onChange={(e) => {
                handleGetReadersType(e.target.value);
                setType(e.target.value);
              }}
            >
              <option value="">Select Type</option>
              <option value="HCP">HCP</option>
              <option value="Staff User">Staff User</option>
              <option value="Test User">Test User</option>
            </Form.Select>
          </Col>
        </Row> */}

        <div className="hcp-table">
          <div className="table-responsive">
            <div className="hcp-table-view">
              <div className="hcp-table-left">
                <div className="hcp-table-heading">
                  <ul className="hcp-table-heading-left">
                    <li>Name</li>
                    <li>Email</li>
                    <li>Country</li>
                    <li>Hospital</li>
                    <li>Profession</li>
                    <li>Interest</li>
                    <li>SignUP Date</li>
                  </ul>
                  <ul className="hcp-table-heading-right">
                    <li>User Type</li>
                    <li>Action</li>
                  </ul>
                </div>

                {data ? (
                  data.map((val, i) => (
                    <div className="hcp-table-content">
                      <ul className="hcp-table-content-left" key={i}>
                        <li>{val.name}</li>
                        <li>{val.email} </li>
                        <li>{val.country} </li>
                        <li>??</li>
                        <li>??</li>
                        <li>??</li>
                        <li>{val.signup_date} </li>
                      </ul>
                      <ul className="hcp-table-content-right">
                        <li>
                          <div className="user-type-option">
                            <Form.Select
                              className="form-select"
                              onChange={(e) => {
                                handleSelect(e.target.value, i);
                                handleSelectChange(val.id, val.type);
                              }}
                              value={val.type}
                              key={i}
                            >
                              <option value="HCP">HCP</option>
                              <option value="Staff User">Staff User</option>
                              <option value="Test User">Test User</option>
                            </Form.Select>
                          </div>
                        </li>
                        <li>
                          <div className="user-type-action">
                            <button onClick={()=>{setShow(true)}} className="btn btn-primary btn-filled">
                              <img
                                src={path_image + "edit-btn.png"}
                                alt="Edit"
                              />
                            </button>
                            <button className="btn btn-primary btn-filled">
                              <img
                                src={path_image + "link-btn.png"}
                                alt="Link"
                              />
                            </button>
                            <button className="btn btn-primary btn-filled">
                              <img
                                src={path_image + "envalop-btn.png"}
                                alt="Send Mail"
                              />
                            </button>

                              {val.is_blocked == 0 ? (
                            <button   onClick={() => {
                              setModalShow(true);
                              localStorage.setItem("blockId", val.id);
                              localStorage.setItem("is", val.is_blocked);
                            }}className="btn btn-primary btn-filled">
                                <img
                                  src={path_image + "lock-btn.png"}
                                  width={70}
                                
                                />
                                </button>
                              ) : (
                                <button  onClick={() => {
                                  localStorage.setItem("blockId", val.id);
                                  localStorage.setItem("is", val.is_blocked);
                                  handleBlock();
                                }} className="btn btn-primary btn-filled">
                                <img
                                  src={path_image + "lock-svgrepo-com.svg"}
                                 style={{height:"20px",width:"20px"}}
                                 
                                />
                            </button>
                              )}
                            <button    onClick={() => {
                                  localStorage.setItem("DeleteData", val.id);
                                  setModalShow1(true);
                                }} className="btn btn-primary btn-filled">
                              <img
                                alt="Delete"
                                src={path_image + "delete-btn.png"}
                                onClick={() => {
                                  localStorage.setItem("DeleteData", val.id);
                                  setModalShow1(true);
                                }}
                              />
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="hcp-table-content">
                    <ul className="hcp-table-content-left">{massage}</ul>
                  </div>
                )}

                {/* {console.log(lastPage)} */}

                {/* {lastPage != currentPage ? (
                  <button onClick={showPaginationData}>Load more</button>
                ) : null} */}

                {lastPage != currentPage ? (
                  <div onClick={showPaginationData} className="loadmore-button">
                    <span >Load More</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <Modal
        id="webinar_event"
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <h4>Edit\HCP</h4>
        </Modal.Header>
        <Modal.Body>
        <form className={"tab-pane active"}>
              <div className="modal-body-content">
              <div className="add_hcp_boxes">
                      <div className="form_action">
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor=""> Name</label>
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                              />
                              {formik.touched.name && formik.errors.name ? (
                                <div className="error" style={{ color: "red" }}>
                                  {formik.errors.name}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">Email *</label>
                              <input
                                type="email"
                                className="form-control"
                                id="email-desc"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                              />
                              {formik.touched.email && formik.errors.email ? (
                                <div className="error" style={{ color: "red" }}>
                                  {formik.errors.email}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">Hospital</label>
                              <input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.hospital}
                                name="hospital"
                                type="text"
                                className="form-control"
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">Profession</label>
                              <input
                                type="text"
                                className="form-control"
                                name="profession"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.profession}
                              />
                            </div>
                          </div>
                          

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">Interest</label>
                              <input
                                name="interest"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.interest}
                                type="text"
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
        <div className="modal-footer-btn">
                <Button
                  type="reset"
                  className="btn btn-primary btn-bordered"
                  variant="danger"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Close
                </Button>
                <Button type="submit" className="btn btn-primary btn-filled">
                  Update
                </Button>
              </div>
              </form>
        </Modal.Body>
      </Modal>

        <Modal
          className="modal send-confirm"
          id="delete-confirm"
          show={modalShow}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            onClick={() => setModalShow(false)}
            closeButton
          ></Modal.Header>
          <Modal.Body>
            <img src={path_image + "alert.png"} alt="" />
            <h4>The block action will remove the HCP from this event only.</h4>
            <div className="modal-buttons">
              <Button
                type="button"
                className="btn-bordered"
                onClick={() => {
                  setModalShow(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="btn-filled"
                onClick={() => {
                  handleBlock();
                  setTimeout(() => {
                    setModalShow(false);
                  }, 1000);
                }}
              >
                Block
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          className="modal send-confirm"
          id="delete-confirm"
          show={modalShow1}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            onClick={() => setModalShow1(false)}
            closeButton
          ></Modal.Header>
          <Modal.Body>
            <img src={path_image + "alert.png"} alt="" />
            <h4>
              The Delete action will delete the HCP from your account entirly.
            </h4>
            <div className="modal-buttons">
              <Button
                className="btn-filled"
                onClick={() => {
                  handleDeleteData();
                  setModalShow1(false);
                }}
              >
                Delete
              </Button>
              <Button
                className="btn-bordered"
                onClick={() => {
                  setModalShow1(false);
                }}
              >
                Close
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Row>
    </div>
    </>
  );
};

export default Readers;
