import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, Row, Table, Form, Accordion, Col } from "react-bootstrap";
import { popup_alert } from "../../popup_alert";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData, deleteData, getData } from "../../axios/apiHelper";
import CommonConfirmModel from "../../Model/CommonConfirmModel";
import { loader } from "../../loader";
import { Button } from "react-bootstrap";
import Select from "react-select";

const SpcView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let obj = {};

  const [filterApplyflag, setFilterApplyflag] = useState(0);

  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [apiCallStatus, setApiCallStatus] = useState(false);
  const [spcData, setSpcData] = useState([]);
  const [superSpcData, setSuperSpcData] = useState([]);
  const [search, setSearch] = useState("");
  const [spcDeletedId, setSpcDeletedId] = useState("");
  const [showfilter, setShowFilter] = useState(false);
  const [filterdata, setFilterData] = useState({
    country: ["Algeria", "USA", "Albania"],
    language: ["English", "Russian", "Spainish", "italian"],

    IBU: ["Haematology","Critical Care","Immunotherapy"],
    product: ["Octapharma", "IBUE", "Haematology"],
  });
  const [filterObject, setFilterObject] = useState({});

  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  useEffect(() => {
    getSpcData("");
    getFilters();
  }, []);

  const getSpcData = async (searchVal) => {
    loader("show");
    setApiCallStatus(false);
    try {
      const body = {
        user_id: localStorage.getItem("user_id"),
        search: searchVal,
      };

      const res = await postData(ENDPOINT.LIBRARYGETSPC, body);
      setSpcData(res?.data?.data);
      setSuperSpcData(res?.data?.data);
      loader("hide");
    } catch (err) {
      loader("hide");
    }
    setApiCallStatus(true);
  };

  const getFilters = async () => {
    try {
      const res = await getData(ENDPOINT.SPCFILTERS);
      if (res?.data?.data) {
        setFilterData(res?.data?.data);
      }
    } catch (err) {
      console.log("err");
    }
  };

  const searchChange = (e) => {
    setSearch(e?.target?.value);
    if (e?.target?.value === "") {
      setSpcData([]);
      getSpcData(e?.target?.value);
    }
  };

  const submitHandler = (event) => {
    setSpcData([]);
    getSpcData(search);
    event.preventDefault();
    return false;
  };

  const deleteSpc = async () => {
    loader("show");
    try {
      const res = await deleteData(ENDPOINT.LIBRARYSPCDELETE, spcDeletedId);
      popup_alert({
        visible: "show",
        message: "The SPC file has been deleted <br />successfully !",
        type: "success",
        redirect: "",
      });

      setSpcData([]);
      getSpcData(search);
    } catch (err) {
      console.log(err);
    }
    setConfirmationPopup(false);
    loader("hide");
  };

  const isJson = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
  const handleOnFilterChange = (e, item, index, key) => {
    if (!filterObject[key]) {
      filterObject[key] = [];
    }

    if (e?.target?.checked == true) {
      if (
        key == "product" ||
        key == "IBU" ||
        key == "language" ||
        key == "country"
      ) {
        filterObject[key] = [];
      }
      filterObject[key]?.push(item);
    } else {
      const index = filterObject[key]?.indexOf(item);
      if (index > -1) {
        filterObject[key]?.splice(index, 1);
        if (filterObject[key]?.length == 0) {
          delete filterObject[key];
        }
      }
    }
    console.log(filterObject);

    setFilterObject(filterObject);
  };
  const clearFilter = () => {
    document.querySelectorAll("input")?.forEach((checkbox) => {
      checkbox.checked = false;
    });
    obj = {};
    if (filterApplyflag > 0) {
      setFilterObject({});
      setSpcData(superSpcData);
      setSearch("");
    }
    setShowFilter(false);
  };
  const removeindividualfilter = (key, item) => {
    let old_object = filterObject;

    const index = old_object[key]?.indexOf(item);
    if (index > -1) {
      old_object[key]?.splice(index, 1);
      if (old_object[key]?.length == 0) {
        delete old_object[key];
      }
    }

    setFilterObject(old_object);
    // setLibraryData([]);
    // getLibraryData(page, old_object);
    applyFilter();
  };

  const applyFilter = (e) => {
    e?.preventDefault();
    setFilterApplyflag(1);
    // setSpcData([]);
    setFilterObject(filterObject);
    // alert("je;;");
    // console.log(filterObject);

    const filteredData = superSpcData.filter((item) => {
      for (const key in filterObject) {
        if (filterObject[key].length > 0) {
          let found = false;
          for (let i = 0; i < filterObject[key].length; i++) {
            if (item[key] && item[key].includes(filterObject[key][i])) {
              found = true;
              break;
            }
          }
          if (!found) {
            return false;
          }
        }
      }
      return true;
    });
    // console.log(superSpcData);

    // console.log(filteredData);
    setSpcData(filteredData);

    setShowFilter(false);
  };
  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header sticky">
              <div className="page-title d-flex">
                <Link
                  className="btn btn-primary btn-bordered back-btn"
                  to="/spc"
                >
                  <svg
                    width="14"
                    height="24"
                    viewBox="0 0 14 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z"
                      fill="#97B6CF"
                    />
                  </svg>
                </Link>
                <h2>
                  {location?.state?.data == "delete"
                    ? "Delete SPC"
                    : "View | Edit SPC"}
                </h2>
              </div>
              <div className="form_action">
                {/* <Form className="product-unit d-flex justify-content-between align-items-center">
                  <div className="form-group d-flex align-items-center">
                    <label htmlFor="">Filter By</label>
                    <Select
                      options={countries}
                      placeholder="Country"
                      onChange={filterDataCountry}
                      defaultValue={countries[0]}
                      name="country"
                      className="dropdown-basic-button split-button-dropup mr-2"
                      isClearable
                    />
                    <Select
                      options={language}
                      name="language"
                      placeholder="Language"
                      onChange={filterDataLanguage}
                      defaultValue={language[0]}
                      className="dropdown-basic-button split-button-dropup"
                      isClearable
                    />
                    <Select
                      options={ibu}
                      name="ibu"
                      placeholder="IBU"
                      onChange={filterDataIBU}
                      defaultValue={ibu[0]}
                      className="dropdown-basic-button split-button-dropup"
                      isClearable
                    />
                    <Select
                      options={products}
                      name="product"
                      placeholder="Product"
                      // onChange={filterDataByYears}
                      // defaultValue={years?.current ? years?.current : null}
                      className="dropdown-basic-button split-button-dropup"
                      isClearable
                    />
                  </div>
                </Form> */}
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
                    className={Object.keys(filterObject).length > 0 ? "btn btn-secondary dropdown filter_applied" : "btn btn-secondary dropdown"}
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
                        {Object.keys(filterdata)?.map(function (key, index) {
                          return (
                            <>
                              {filterdata[key]?.length > 0 ? (
                                <Accordion.Item
                                  className="card"
                                  eventKey={index}
                                >
                                  <Accordion.Header className="card-header">
                                    {key}
                                  </Accordion.Header>

                                  <Accordion.Body className="card-body">
                                    <ul>
                                      {/* {console.log("---dfdf", filterObject)} */}
                                      {filterdata[key]?.length
                                        ? filterdata[key]?.map(
                                            (item, index) => (
                                              <li>
                                                {item != "" ? (
                                                  <label className="select-multiple-option">
                                                    <input
                                                      type={
                                                        key == "product" ||
                                                        key == "IBU" ||
                                                        key == "language" ||
                                                        key == "country"
                                                          ? "radio"
                                                          : "checkbox"
                                                      }
                                                      id={`custom-checkbox-tags-${index}`}
                                                      value={item}
                                                      name={key}
                                                      defaultChecked={
                                                        filterObject?.hasOwnProperty(
                                                          key
                                                        )
                                                          ? filterObject[
                                                              key
                                                            ]?.indexOf(item) !==
                                                            -1
                                                          : false
                                                      }
                                                      onChange={(e) =>
                                                        handleOnFilterChange(
                                                          e,
                                                          item,
                                                          index,
                                                          key
                                                        )
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
                {/* <button
                    className="btn-bordered cancel btn btn-primary"
                    type="button"
                    onClick={() => navigate("/spc")}>
                    Close
                  </button> */}
              </div>
            </div>
            {Object.keys(filterObject)?.length !== 0 && filterApplyflag > 0 ? (
              <div className="apply-filter">
                {/* <h6>Applied filters</h6> */}
                <div className="filter-block">
                  <div className="filter-block-left full">
                    {Object.keys(filterObject)?.map((key, index) => {
                      return (
                        <>
                          {filterObject[key]?.length > 0 ? (
                            <div className="filter-div">
                              <div className="filter-div-title">
                                <span>{key} |</span>
                              </div>
                              <div className="filter-div-list">
                                {filterObject[key]?.map((item, index) => (
                                  <div
                                    className="filter-result"
                                    onClick={() =>
                                      removeindividualfilter(key, item)
                                    }
                                  >
                                    {key == "draft" && item == "0"
                                      ? "live"
                                      : key == "draft" && item == "1"
                                      ? "draft"
                                      : item}
                                    <img
                                      src={path_image + "filter-close.svg"}
                                      alt="Close-filter"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </>
                      );
                    })}
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
            ) : null}
            <div className="smart-list-result spc-delete">
              <div className="col smartlist-result-block spc-edit">
                {typeof spcData !== "undefined" && spcData.length > 0 ? (
                  spcData.map((data) => {
                    return (
                      <>
                        <div className="smartlist_box_block">
                          <div className="smartlist-view email_box">
                            <div className="mail-box-content">
                              <div className="mailbox-table">
                                <h5>{data?.title}</h5>

                                <Table>
                                  <tbody>
                                    <tr>
                                      <th>Country</th>
                                      <td>{data?.country}</td>
                                    </tr>
                                    <tr>
                                      <th>Language</th>
                                      <td>{data?.language}</td>
                                    </tr>
                                    <tr>
                                      <th>IBU</th>
                                      <td>{data?.IBU}</td>
                                    </tr>
                                    <tr>
                                      <th>Product</th>
                                      <td>
                                        {isJson(data?.product) ? (
                                          JSON.parse(data.product)?.map(
                                            (item, index) => {
                                              return (
                                                <span className="product_list">
                                                  {item}
                                                  {JSON.parse(data?.product)
                                                    ?.length -
                                                    1 ==
                                                  index
                                                    ? null
                                                    : ","}
                                                </span>
                                              );
                                            }
                                          )
                                        ) : (
                                          <div>{data?.product}</div>
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Creation date</th>
                                      <td>{data?.createdDate}</td>
                                    </tr>
                                    <tr>
                                      <th>Last edit</th>
                                      <td>
                                        {data?.last_edit
                                          ? data.last_edit
                                          : "N/A"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                              <div className="smartlist-buttons">
                                {
                                  <>
                                    {location?.state?.data != "delete" ? (
                                      <Link
                                        to="/spc-edit"
                                        state={{ spcId: data.id }}
                                        className="btn btn-primary btn-bordered edit_list"
                                      >
                                        Edit
                                      </Link>
                                    ) : null}

                                    <Link
                                      to="/spc-render"
                                      state={{
                                        file: data.file,
                                        title: data.title,
                                      }}
                                      className="btn btn-primary btn-filled view"
                                    >
                                      View
                                    </Link>
                                  </>
                                }
                              </div>
                              {location?.state?.data == "delete" ? (
                                <div className="dlt_btn">
                                  <button
                                    onClick={(e) => {
                                      setConfirmationPopup(true);
                                      setSpcDeletedId(data?.id);
                                    }}
                                  >
                                    <img
                                      src={path_image + "delete.svg"}
                                      alt="Delete Row"
                                    />
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : apiCallStatus ? (
                  <div className="no_found">
                    <p>No Data Found</p>
                  </div>
                ) : null}
              </div>
            </div>
          </Row>
        </div>
      </Col>

      <div className="delete">
        <CommonConfirmModel
          show={confirmationpopup}
          onClose={setConfirmationPopup}
          fun={deleteSpc}
          resetDataId={spcDeletedId}
          popupMessage={{
            message1: "The SPC file will be deleted.",
            message2: "Are you sure you want to delete it?",
            footerButton: "Yes Please!",
          }}
          path_image={path_image}
        />
      </div>
    </>
  );
};
export default SpcView;
