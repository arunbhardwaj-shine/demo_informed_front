import React, { useEffect, useState, useRef } from "react";
import { Accordion, Button, Col, Container, Row, Table } from "react-bootstrap";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import AnalyticsRegistration from "./AnalyticsRegistration";
import AnalyticsOverview from "./AnalyticsOverview";
import AnalyticsEmail from "./AnalyticsEmail";
import AnalyticsLiveStream from "./AnalyticsLiveStream";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Analytics = (props) => {
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const {eventIdContext,handleEventId}=useSidebar()
  const localStorageEvent=JSON.parse(localStorage.getItem("EventIdContext"))
  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  const [apifilterObject, setApifilterObject] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [filterdata, setFilterData] = useState({});
  const [appliedFilter, setAppliedFilter] = useState({});
  const [filterObject, setFilterObject] = useState({})
  const clearFilter = () => {
    setAppliedFilter({});
    setApifilterObject({});
    setFilterObject({});
    // setEmailListData([]);
    // setTotalEmailListData([])
    // getWebinarCompaignList()
    setShowFilter(false);
  };
  const applyFilter = (e) => {
    e.preventDefault();
    // setEmailListData([]);
    setFilterObject(appliedFilter);
    // getWebinarCompaignList(appliedFilter);
    setShowFilter(false);
  };
  const handleOnFilterChange = (e, item, index, key, data = []) => {
    let newObj = JSON.parse(JSON.stringify(appliedFilter));
    if (!newObj[key]) {
      newObj[key] = [];
    }
    if (!apifilterObject[key]) {
      apifilterObject[key] = [];
    }

    if (e?.target?.checked == true) {
      newObj[key]?.push(item);
      apifilterObject[key]?.push(e?.target?.value);
    } else {
      const index = newObj[key]?.indexOf(item);
      if (index > -1) {
        newObj[key]?.splice(index, 1);
        if (newObj[key]?.length == 0) {
          delete newObj[key];
        }
      }
      const index2 = apifilterObject[key]?.indexOf(e.target.value);
      if (index2 > -1) {
        apifilterObject[key]?.splice(index2, 1);
        if (apifilterObject[key]?.length == 0) {
          delete apifilterObject[key];
        }
      }
    }
    setAppliedFilter(newObj);
    setApifilterObject(apifilterObject);
  }
  useEffect(() => {
    // props.getWebinarEmailData(null);
    // props.getWebinarDraftData(null);
    // props.getWebinarSelectedSmartListData(null);

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

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  useEffect(()=>{
    // if(!eventIdContext){
    //   handleEventId(localStorageEvent)  
    // }
  },[])
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title d-flex flex-column align-items-start">
                <h2>Event title facilisi vitae leo odio</h2>
                <p>April. 22. 2024</p>
              </div>
              <Button title="Download Site Engagements" className="download filled">Summary (Excel) 
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
                  ></path>
                  <path
                    d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                    fill="#0066BE"
                  ></path>
                </svg>
              </Button>
            </div>
            <div className="webinar-analytics-layout rd-analytics-content">
                <Row>
                  <Col md={9}>
                    <AnalyticsRegistration/>
                  </Col>
                  <Col md={3}>
                    <AnalyticsOverview/>
                  </Col>
                </Row>
                <Row>
                  <Col md={5} style={{ margin: '40px 0 0' }}>
                    <AnalyticsEmail/>
                  </Col>
                  <Col md={7} style={{ margin: '40px 0 0' }}>
                    <AnalyticsLiveStream/>
                  </Col>
                </Row>
            </div>
          </Row>
          <div className="rd-full-explain">
            <div className="rd-section-title">
              <h6>Registrations</h6>
            </div>
            <div className="rd-training-block">
              <div className="d-flex align-items-center justify-content-between">
                <div className="rd-training-block-left">
                  <h4>Total Registrations |{" "}<span>75</span></h4>
                </div>
                <div className="rd-training-block-right d-flex">
                  {/* <Button
                    // className={`sort_btn ${isActive ? "active" : ""}`}
                    // className={`sort_btn ${isActive == "dec"
                    //     ? "svg_active"
                    //     : isActive == "asc"
                    //       ? "svg_asc"
                    //       : ""
                    //   }`}
                    // onClick={sortIndividualCompletion}
                  >
                    Sort By{" "}
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
                  </Button> */}
                  <div className="filter-btn">
                    <button
                      ref={buttonRef}
                      className={
                        Object.keys(apifilterObject)?.length
                          ? "btn btn-secondary dropdown filter_applied"
                          : "btn btn-secondary dropdown"
                      }
                      type="button"
                      id="dropdownMenuButton2"
                      onClick={() => setShowFilter((showFilter) => !showFilter)}
                    >
                      Filter By
                      {showFilter ? (
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
                      )}
                    </button>
                    {showFilter && (
                      <div
                        ref={filterRef}
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
                                    className={
                                      key == "role" ? "card upper" : "card"
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
                                              <li key={index}>
                                                {item != "" ? (
                                                  <label className="select-multiple-option">
                                                    <input
                                                      type={"checkbox"}
                                                      id={`custom-checkbox-tags-${index}`}
                                                      value={
                                                        typeof item ==
                                                          "object"
                                                          ? item?.title
                                                          : item
                                                      }
                                                      name={key}
                                                      checked={
                                                        typeof item ==
                                                          "object"
                                                          ? appliedFilter[
                                                            key
                                                          ]?.includes(
                                                            item.id
                                                          )
                                                            ? true
                                                            : false
                                                          : appliedFilter[
                                                            key
                                                          ]?.includes(item)
                                                            ? true
                                                            : false
                                                      }
                                                      onChange={(e) =>
                                                        handleOnFilterChange(
                                                          e,
                                                          typeof item ==
                                                            "object"
                                                            ? item.id
                                                            : item,
                                                          index,
                                                          key,
                                                          [...filterdata[key]]
                                                        )
                                                      }
                                                    />
                                                    {typeof item == "object"
                                                      ? item?.title
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
                          <Button
                            className="btn btn-primary btn-bordered"
                            onClick={clearFilter}
                          >
                            Clear
                          </Button>
                          <Button
                            className="btn btn-primary btn-filled"
                            onClick={applyFilter}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    title="Download stats"
                  // onClick={() => handleExport("individual_completion")}
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
                      ></path>
                      <path
                        d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                        fill="#0066BE"
                      ></path>
                    </svg>
                  </Button>
                </div>
              </div>
              <Table className="fold-table registration-view" id="individual_completion">
                  <thead className="">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Region</th>
                        <th>Country</th>
                        <th>Registered</th>
                        <th>Last Email</th>
                        <th>User Type</th>
                      </tr>
                      
                  </thead>
                  <tbody>
                    <tr>
                      <td>UserName</td>
                      <td>User@docintel.app</td>
                      <td>EU</td>
                      <td>United Kingdom</td>
                      <td className="green">12.5.2023 | 05:15 pm</td>
                      <td>Invite email </td>
                      <td>HCP</td>
                    </tr>
                    <tr class="blank">
                      <td colSpan={7}>&nbsp;</td>
                    </tr>
                  <tr>
                    <td>UserName</td>
                    <td>User@docintel.app</td>
                    <td>EU</td>
                    <td>United Kingdom</td>
                    <td className="green">12.5.2023 | 05:15 pm</td>
                    <td>Invite email </td>
                    <td>HCP</td>
                  </tr>
                  <tr class="blank">
                    <td colSpan={7}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>UserName</td>
                    <td>User@docintel.app</td>
                    <td>EU</td>
                    <td>United Kingdom</td>
                    <td className="green">12.5.2023 | 05:15 pm</td>
                    <td>Invite email </td>
                    <td>HCP</td>
                  </tr>
                  <tr class="blank">
                    <td colSpan={7}>&nbsp;</td>
                  </tr>
                      
                  </tbody>
              </Table>
            </div>
          </div>

          {/* HCP registered */}
          <div className="rd-full-explain">
            <div className="rd-section-title">
              <h6>Registrations</h6>
            </div>
            <div className="rd-training-block">
              <div className="d-flex align-items-center justify-content-between">
                <div className="rd-training-block-left">
                  <h4>Registered HCPs According to Country |{" "}<span>75</span></h4>
                </div>
                <div className="rd-training-block-right d-flex">
                  <div className="switch6">
                    <label className="switch6-light">
                      <input
                        type="checkbox"
                        // ={graphType == "pie" ? true : false}
                        //onChange={onHandleDisplayResultChange}
                      />
                      <span>
                        <span>
                          <img src={path_image + "bar-graph-img.png"} style={{transform:'rotate(90deg)'}}/>
                        </span>
                        <span>
                          <img src={path_image + "pie-img.png"} />
                        </span>
                      </span>
                      <a className="btn"></a>
                    </label>
                  </div>
                  <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE"/>
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="graph-view">
                <img src={path_image + "hcps-registered-for-virt.png"} alt="" />
              </div>
            </div>
          </div>
          {/* HCP registered */}
          {/* Registered & attended HCPs According to Region */}
          <div className="rd-full-explain">
            <div className="rd-section-title">
              <h6>Registrations</h6>
            </div>
            <div className="rd-training-block">
              <div className="d-flex align-items-center justify-content-between">
                <div className="rd-training-block-left">
                  <h4>Registered & attended HCPs According to Region |{" "}<span>75</span></h4>
                </div>
                {/* <div className="rd-training-block-right d-flex">
                  <div className="switch6">
                    <label className="switch6-light">
                      <input
                        type="checkbox"
                        // ={graphType == "pie" ? true : false}
                        //onChange={onHandleDisplayResultChange}
                      />
                      <span>
                        <span>
                          <img src={path_image + "bar-graph-img.png"} style={{transform:'rotate(90deg)'}}/>
                        </span>
                        <span>
                          <img src={path_image + "pie-img.png"} />
                        </span>
                      </span>
                      <a className="btn"></a>
                    </label>
                  </div>
                  <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE"/>
                    </svg>
                  </Button>
                </div> */}
              </div>
              <div className="country_tabs">
                <Tabs
                  defaultActiveKey="mena"
                  className=""
                  fill
                >
                  <Tab eventKey="mena" title="MENA">
                    <img src={path_image + "attended-hcp.png"} alt="" />
                  </Tab>
                  <Tab eventKey="latam" title="LATAM">
                    <img src={path_image + "attended-hcp.png"} alt="" />
                  </Tab>
                  <Tab eventKey="eu" title="EU">
                    <img src={path_image + "attended-hcp.png"} alt="" />
                  </Tab>
                  <Tab eventKey="brazil" title="Brazil">
                    <img src={path_image + "attended-hcp.png"} alt="" />
                  </Tab>
                  <Tab eventKey="ee/cis" title="EE/CIS">
                    <img src={path_image + "attended-hcp.png"} alt="" />
                  </Tab>
                  <Tab eventKey="other" title="Other">
                    <img src={path_image + "attended-hcp.png"} alt="" />
                  </Tab>
                  <Tab eventKey="tinbs" title="TINBS">
                    <img src={path_image + "attended-hcp.png"} alt="" />
                  </Tab>
                  <Tab eventKey="mexico" title="Mexico">
                    <img src={path_image + "attended-hcp.png"} alt="" />
                  </Tab>
                  <Tab eventKey="russian" title="Russian Federation">
                    <img src={path_image + "attended-hcp.png"} alt="" />
                  </Tab>
                  <Tab eventKey="zaf" title="ZAF">
                    <img src={path_image + "attended-hcp.png"} alt="" />
                  </Tab>
                  <Tab eventKey="us" title="US">
                    <img src={path_image + "attended-hcp.png"} alt="" />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
          {/* Registered & attended HCPs According to Region */}
          {/*Overview */}
          <div className="rd-full-explain">
            <div className="rd-section-title">
              <h6>Overview</h6>
            </div>
            <div className="rd-training-block">
              <div className="d-flex align-items-center justify-content-between">
                <div className="rd-training-block-left">
                  <h4>Overview</h4>
                </div>
                <div className="rd-training-block-right d-flex">
                  <div className="filter-btn">
                    <button
                      ref={buttonRef}
                      className={
                        Object.keys(apifilterObject)?.length
                          ? "btn btn-secondary dropdown filter_applied"
                          : "btn btn-secondary dropdown"
                      }
                      type="button"
                      id="dropdownMenuButton2"
                      onClick={() => setShowFilter((showFilter) => !showFilter)}
                    >
                      Filter By
                      {showFilter ? (
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
                      )}
                    </button>
                    {showFilter && (
                      <div
                        ref={filterRef}
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
                                    className={
                                      key == "role" ? "card upper" : "card"
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
                                              <li key={index}>
                                                {item != "" ? (
                                                  <label className="select-multiple-option">
                                                    <input
                                                      type={"checkbox"}
                                                      id={`custom-checkbox-tags-${index}`}
                                                      value={
                                                        typeof item ==
                                                          "object"
                                                          ? item?.title
                                                          : item
                                                      }
                                                      name={key}
                                                      checked={
                                                        typeof item ==
                                                          "object"
                                                          ? appliedFilter[
                                                            key
                                                          ]?.includes(
                                                            item.id
                                                          )
                                                            ? true
                                                            : false
                                                          : appliedFilter[
                                                            key
                                                          ]?.includes(item)
                                                            ? true
                                                            : false
                                                      }
                                                      onChange={(e) =>
                                                        handleOnFilterChange(
                                                          e,
                                                          typeof item ==
                                                            "object"
                                                            ? item.id
                                                            : item,
                                                          index,
                                                          key,
                                                          [...filterdata[key]]
                                                        )
                                                      }
                                                    />
                                                    {typeof item == "object"
                                                      ? item?.title
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
                          <Button
                            className="btn btn-primary btn-bordered"
                            onClick={clearFilter}
                          >
                            Clear
                          </Button>
                          <Button
                            className="btn btn-primary btn-filled"
                            onClick={applyFilter}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    title="Download stats"
                  // onClick={() => handleExport("individual_completion")}
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
                      ></path>
                      <path
                        d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                        fill="#0066BE"
                      ></path>
                    </svg>
                  </Button>
                </div>
              </div>
              <Table className="fold-table registration-view" id="individual_completion">
                  <thead className="">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Region</th>
                        <th>Country</th>
                        <th>Registered</th>
                        <th>Attended</th>
                        <th>Post-event views</th>
                      </tr>
                      
                  </thead>
                  <tbody>
                    <tr>
                      <td>UserName</td>
                      <td>User@docintel.app</td>
                      <td>EU</td>
                      <td>United Kingdom</td>
                      <td className="green">12.5.2023 | 05:15 pm</td>
                      <td>Yes</td>
                      <td>No</td>
                    </tr>
                    <tr class="blank">
                      <td colSpan={7}>&nbsp;</td>
                    </tr>
                  <tr>
                    <td>UserName</td>
                    <td>User@docintel.app</td>
                    <td>EU</td>
                    <td>United Kingdom</td>
                    <td className="green">12.5.2023 | 05:15 pm</td>
                    <td>Yes</td>
                    <td>No</td>
                  </tr>
                  <tr class="blank">
                    <td colSpan={7}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>UserName</td>
                    <td>User@docintel.app</td>
                    <td>EU</td>
                    <td>United Kingdom</td>
                    <td className="green">12.5.2023 | 05:15 pm</td>
                    <td>Yes</td>
                    <td>No</td>
                  </tr>
                  <tr class="blank">
                    <td colSpan={7}>&nbsp;</td>
                  </tr>
                      
                  </tbody>
              </Table>
            </div>
          </div>
          {/* Overview End */}
        </div>
      </Col>
    </>
  );
};

export default Analytics;