import React, { useEffect, useRef, useState } from "react";
import { Accordion, Button, Carousel, Col, Row, Table } from 'react-bootstrap';
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { loader } from "../../../../../loader";
import { postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";

const AnalyticsAttendees = () => {
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [indidualCompletionTableData, setIndividualCompletionTableData] =
    useState();
  const [individualCompletionShow, setIndividualCompletionShow] = useState();
  const [search, setSearch] = useState("")
  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  const [apifilterObject, setApifilterObject] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [filterdata, setFilterData] = useState({});
  const [appliedFilter, setAppliedFilter] = useState({});
  const [filterObject, setFilterObject] = useState({})
  const [emailListData, setEmailListData] = useState([])
  const [totalEmailListData, setTotalEmailListData] = useState([])

  const { eventIdContext, handleEventId } = useSidebar();
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const [eventId, setEventId] = useState(eventIdContext?.eventId || localStorageEvent?.eventId);
  const [attendeesData, setAttendeesData] = useState([]);
  useEffect(() => {
    const fetchAnalyticsData = async () => {
        try {
            loader("show");
            const body = { eventId };
            const response = await postData(ENDPOINT.ANALYTIC_ATTENDEES_DATA, body);
            const result = response?.data?.data;
            setAttendeesData(result?.attendeesData);

            loader("hide");
        } catch (error) {
            loader("hide");
            console.error('Error fetching analytics data:', error);
        }
    };

    fetchAnalyticsData();
}, [eventId]);
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
  const searchChange = (e) => {
    setSearch(e?.target?.value);

    if (e?.target?.value === "") {
      setEmailListData(totalEmailListData)
    }
  };

  const submitSearchHandler = (event) => {
    event.preventDefault();
    let searchData = totalEmailListData?.filter((item) => item?.subject?.includes(search))
    setEmailListData(searchData)
  };
    return (
        <>
        <Col className="right-sidebar">
          <div className="custom-container">
            <Row>
              <div className="top-header">
                <div className="page-title d-flex flex-column align-items-start">
                  <h2>Attendees</h2>
                </div>
                <div className="top-right-action">
                  <div className="search-bar">
                    <form className="d-flex" onSubmit={(e) => submitSearchHandler(e)}>
                      <input
                        className="form-control me-2"
                        type="search"
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
                  <div className="filter-by nav-item dropdown">
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
                  <div className="clear-search">
                  <Button
                    title="Download stats" className="download"
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
              </div>
              <div className="search-hcp smart-list-view anaytics-attended">
                <div className="result-hcp-table">
                  <div className="table-title">
                    <h4>Total Attendees |{" "}<span>203</span></h4>
                  </div>
                </div>
                <Table className="attended-table" id="individual_completion">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Region</th>
                      <th>Country</th>
                      <th>Live spend time</th>
                      <th>Asked question</th>
                      <th>Poll participate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={"view"}>
                      <td>
                        UserName
                      </td>
                      <td>
                        User@docintel.app
                      </td>
                      <td>
                        EU
                      </td>
                      <td>
                        United Kingdom
                      </td>
                      <td style={{color:"#0066be"}}>
                        45 min
                      </td>
                      <td>
                        Yes
                      </td>
                      <td className="infocol">
                        Yes
                      </td>
                    </tr>      
                    <tr className={"fold"}>

                  {attendeesData?.length ? (
                attendeesData.map((user, index) => (
                <>
                  <tr key={index} className={"view"}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.region}</td>
                    <td>{user.country}</td>
                    <td>{user.liveSpendTime} min</td>
                    <td>{user.askedQuestion}</td>
                    <td>{user.pollParticipate}</td>
                  </tr>
                  <tr className={"fold"}>
                      <td colspan="8">
                        <div className="fold-content d-flex justify-content-between">
                          <Col className="fold-content-left">
                            <Table>
                              <thead>
                                <tr>
                                  <th>
                                    Questions asked through the live stream
                                  </th>
                                  <th>
                                    Time
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>User question dolor sit amet consect ltrices vitae in eu cursus placuis lacus id faucibus nec quam?</td>
                                  <td>00:15:20</td>
                                </tr>
                                <tr>
                                  <td>User question vitae in eu cursus placuis lacus id faucibus?</td>
                                  <td>00:44:35</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                          <Col className="fold-content-right">
                            <Table>
                              <thead>
                                <tr>
                                  <th>
                                    Answered poll question
                                  </th>
                                  <th>
                                    Chosen answer
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>User question dolor sit amet consect ltrices vitae in eu cursus placuis lacus id faucibus nec quam?</td>
                                  <td>B. Semper et lectus pellentesque tincidunt. Purus purus amet facilisi tincidunt vitae luctus. Egestas sed nibh mattis convallis fames.</td>
                                </tr>
                                <tr>
                                  <td>User question dolor sit amet consect ltrices vitae in eu cursus placuis lacus id faucibus nec quam?</td>
                                  <td>D. Purus purus amet facilisi tincidunt vitae luctus. Egestased nibh mattis convallis fames.</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                        </div>
                      </td>
                    </tr>   
                    <tr className="blank">
                      <td colspan="7">
                        &nbsp;
                      </td>
                    </tr>
                    <tr className={"view"}>
                      <td>
                        UserName
                      </td>
                      <td>
                        User@docintel.app
                      </td>
                      <td>
                        EU
                      </td>
                      <td>
                        United Kingdom
                      </td>

                      <td style={{color:"#0066be"}}>
                        45 min
                      </td>

                      <td>
                        Yes
                      </td>

                      <td className="infocol">
                        Yes
                      </td>
                    </tr>

                    <tr className={"fold"}>
                      <td colspan="7">
                        <div className="fold-content">
                          
                        </div>
                      </td>
                    </tr> 
                    <tr className="blank">
                      <td colSpan="7">&nbsp;</td>
                    </tr>
                </>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <div className="no_found">
                    <p>No Data Found</p>
                  </div>
                </td>
              </tr>
            )}
            </tr>
                    <tr className="blank">
                      <td colspan="7">
                        &nbsp;
                      </td>
                    </tr>
                     
                  </tbody>
                </Table>
              </div>
            </Row>
          </div>
        </Col>
            
        </>
    )
}

export default AnalyticsAttendees