import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { loader } from "../../loader";
import { toast } from "react-toastify";
import Accordion from "react-bootstrap/Accordion";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getEmailData,getDraftData } from "../../actions";
import { propTypes } from "react-bootstrap/esm/Image";
var dxr = 0;
var pdf_id = 0;
const EmailArticleSelect = (props) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [SendListData, setSendListData] = useState([]);
  const [previousSendListData, setPreviousSendListData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  

  const [PdfSelected, setPdfSelected] = useState((dxr!==0 && dxr) ? dxr : pdf_id);


  const [showfilter, setShowFilter] = useState(false);
  const [filtertags, setFilterTags] = useState([]);
  const [filterdate, setFilterDate] = useState([]);
  const [filterlng, setFilterlng] = useState([]);
  const [updateflag, setUpdateFlag] = useState(0);
  const [getloadmore, setloadmore] = useState(0);
  const [filterapplied, setFilterApply] = useState(false);
  const inputElement = useRef();
  const [search, setSearch] = useState("");

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    getContentData(0, 1);
  }, [props]);

  const getContentData = (flag, page) => {
    const body = {
      user_id: 18207,
      search: search,
      filter: filter,
    };
    loader("show");
    axios
      .post(`emailapi/get_content_list?page=` + page, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          setSendListData(res.data.response.data);
          if (flag == 0) {
            setPreviousSendListData(res.data.response.data);
            setFilterData(res.data.response.filter);
          }

          if (page == 2) {
            let up = updateflag + 1;
            setUpdateFlag(up);
          }
        } else {
          setSendListData([]);
        }
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
        // console.log(err);
      });
  };

  useEffect(() => {
    if (PdfSelected !== 0) {
      inputElement.current.classList.remove("disabled");
    }
  }, [PdfSelected]);

  const handleSelect = (e) => {
    setPdfSelected(e.target.value);
  };

  const cancelClicked = () => {
    navigate("/EmailList");
    // return true;
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setSendListData(previousSendListData);
    }
  };

  const submitHandler = (event) => {
    getContentData(1, 1);
    setShowFilter(false);
    event.preventDefault();
    return false;
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

  const nextClicked = () => {
    props.getEmailData({ PdfSelected: PdfSelected });
  };

  const handleOnfilterlngguage = (lan) => {
    let index = filterlng.indexOf(lan);
    if (index !== -1) {
      filterlng.splice(index, 1);
      setFilterlng(filterlng);
    } else {
      filterlng.push(lan);
      setFilterlng(filterlng);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("lng")) {
      getfilter.lng = filterlng;
    } else {
      getfilter = Object.assign({ lng: filterlng }, filter);
    }

    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const clearFilter = () => {
    document.querySelectorAll("input").forEach((checkbox) => {
      checkbox.checked = false;
    });
    setFilterTags([]);
    setFilterlng([]);
    setFilterDate([]);
    setFilter([]);
    let up = updateflag + 1;
    setUpdateFlag(up);
    if (filterapplied) {
      setSendListData(previousSendListData);
    }
    setShowFilter(false);
  };

  const applyFilter = () => {
    setFilterApply(true);
    getContentData(1, 1);
    setShowFilter(false);
  };

  const removeindividualfilter = (src, item) => {
    // setRemoveFlag(true);
    loader("show");
    if (src == "tag") {
      handleOnFilterTags(item);
    } else if (src == "lng") {
      handleOnfilterlngguage(item);
    } else if (src == "date") {
      handleOnFilterDate(item);
    }

    if (filterapplied) {
      getContentData(1, 1);
    } else {
      loader("hide");
    }
    setShowFilter(false);
  };

  const load_more = () => {
    getContentData(0, 2);
    setloadmore(1);
  };

  return (
    <>
      <div className="right-sidebar">
      <div className="custom-container">
        <div className="row">
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left"></div>
            </div>
            <div className="col-12 col-md-9">
              <ul className="tabnav-link">
                <li className="active active-main">
                  <a href="">Select Content</a>
                </li>
                <li className="">
                  <a href="">Create Your Email</a>
                </li>
                <li className="">
                  <a href="">Select HCPs</a>
                </li>
                <li className="">
                  <a href="">Verify your list</a>
                </li>
                <li className="">
                  <a href="">Verify your Email</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-2">
              <div className="header-btn">
                <button
                  className="btn btn-primary btn-bordered cancel"
                  onClick={cancelClicked}
                >
                  Cancel
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
                    to="/CreateEmail"
                    state={{ PdfSelected: PdfSelected }}
                    onClick={nextClicked}
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

        <div className="top-header">
          <div className="page-title">
            <h4>Select your content</h4>
          </div>
          <div className="top-right-action">
            <div className="search-bar">
              <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
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
                                        onChange={() =>
                                          handleOnFilterTags(item)
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

                    {filterdata.hasOwnProperty("language") &&
                      filterdata.language.length > 0 && (
                        <Accordion.Item className="card" eventKey="1">
                          <Accordion.Header className="card-header">
                            Language
                          </Accordion.Header>
                          <Accordion.Body className="card-body">
                            <ul>
                              {Object.entries(filterdata.language).map(
                                ([index, item]) => (
                                  <li>
                                    <label className="select-multiple-option">
                                      <input
                                        type="checkbox"
                                        id={`custom-checkbox-lng-${index}`}
                                        name="language[]"
                                        value={item}
                                        checked={
                                          updateflag > 0 &&
                                          typeof filterlng !== "undefined" &&
                                          filterlng.indexOf(item) !== -1
                                        }
                                        onChange={() =>
                                          handleOnfilterlngguage(item)
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
                            Created
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
                                          typeof filterdate !== "undefined" &&
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
          </div>
        </div>

        {/*Code for filters start*/}
        {updateflag > 0 &&
          (filtertags.length > 0 ||
            filterlng.length > 0 ||
            filterdate.length > 0) && (
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

                  {filterlng.length > 0 && (
                    <div className="filter-div">
                      <div className="filter-div-title">
                        <span>Language |</span>
                      </div>
                      <div className="filter-div-list">
                        {Object.entries(filterlng).map(([index, item]) => (
                          <div
                            className="filter-result"
                            onClick={(event) =>
                              removeindividualfilter("lng", item)
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
        {/*Code for filters end*/}

        <div className="mail-content-select">
          <div className="row">
            {typeof SendListData !== "undefined" && SendListData.length > 0 ? (
              SendListData.map((data) => {
                return (
                  <div className="col-12 col-md-4">
                    <div className="mail-content-select-box">
                      <div className="mail-content-select-top">
                        <div className="mail-preview-img">
                          <img src={data.cover_img} alt="Preview " />
                        </div>
                        <div className="mail-box-content">
                          <h5>{data.title}</h5>
                          <p>{data.pdf_sub_title}</p>
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
                        </div>
                        <div
                          className="select-mail-option"
                          onClick={handleSelect}
                        >
                          <input
                            type="radio"
                            name="radio"
                            value={data.id}
                            checked={
                              typeof PdfSelected !== "undefined" &&
                              PdfSelected == data.id
                            }
                          />
                          <span className="checkmark"></span>
                        </div>
                      </div>
                      <div className="mail-content-table">
                        <table>
                          <tbody>
                            <tr>
                              <th>Upload Date</th>
                              <td>{data.created}</td>
                            </tr>
                            <tr>
                              <th>Language</th>
                              <td>{data.language}</td>
                            </tr>
                            <tr>
                              <th>SPC</th>
                              <td>{data.spc_included === 0 ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                              <th>Last Email</th>
                              <td>
                                {data.last_sent == "" ? "N/A" : data.last_sent}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="mail-content-footer">
                        <a href={data.preview_link} target="_blank">
                          <button className="btn btn-primary btn-filled">
                            Preview
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="not_found">
                <p>No Data Found</p>
              </div>
            )}
          </div>
        </div>

        {typeof SendListData !== "undefined" &&
          SendListData.length == 30 &&
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
      </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  
  dxr = state.getEmailData?.PdfSelected;
  pdf_id = state.getDraftData?.pdf_id;
  return state;
};

export default connect(mapStateToProps, { getEmailData: getEmailData,getDraftData: getDraftData })(
  EmailArticleSelect
);
