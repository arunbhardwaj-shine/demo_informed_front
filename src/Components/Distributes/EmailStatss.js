import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useCallback } from "react";
import { loader } from "../../loader";
import Accordion from "react-bootstrap/Accordion";

import {
  getDraftData,
  getEmailData,
  getSelectedSmartListData,
} from "../../actions";
import { popup_alert } from "../../popup_alert";

const EmailStats = (props) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [sortingCount, setSortingCount] = useState(0);
  const [totalCount, setTotalCount] = useState([]);
  const [update, setUpdate] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [sorting, setSorting] = useState(0);
  const [sortDatee, setSortDate] = useState(0);
  const [campaignData, setData] = useState([]);
  const [showLessInfo, setShowLessInfo] = useState(true);
  const [getloadmore, setloadmore] = useState(0);
  const [lastPage, setLastPage] = useState();
  const [campaignDataLength, setCampaignDataLength] = useState();
  const [updatedData, setUpdatedData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchStarted, setSearchStarted] = useState(0);
  const [searchData, setSearchData] = useState([]);
  const [sortingCountDate, setSortingCountDate] = useState(0);
  const [loadmore, setLoadMore] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoader, setShowLoader] = useState(0);
  const [sortTitleStarted, setSortTitleStarted] = useState(0);

  const [perPageData, setPerPageData] = useState();

  useEffect(() => {
    getCampaignList(1, "");
  }, []);

  const getCampaignList = async (page, search) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      page: page,
      search: search,
    };
    loader("show");
    await axios
      .post(`distributes/get_send_campaign_list_new`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          // console.log(res);
          setShowLoader(1);

          setData((oldArray) => [...oldArray, ...res.data.response.data]);
          setCurrentPage(res.data.response.pegination.currentPage);
          setTotalCount(res.data.response.pegination.totalCount);
          setLastPage(res.data.response.pegination.lastPage);
          setPerPageData(res.data.response.pegination.perPage);
        } else {
          setShowLoader(0);
          // toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const getDetails = (id) => {
    navigate("/get-details", {
      state: { distribute_id: id },
    });
  };

  const sendCampaign = (dist_id, type) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    const body = {
      user_id: localStorage.getItem("user_id"),
      distribute_id: dist_id,
      send_status: type,
    };

    axios
      .post(`distributes/resend_campaign_with_all_pending_readers`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          draftNavigate(res.data.response.data.campaign_id, res?.data?.response?.data?.user_data);
        } else {
          toast.warning(res.data.message);
          loader("hide");
        }
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
      });
  };

  const draftNavigate = async (campaign_id,readerData) => {
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
          campaign_data.campaign_data.selectedHcp =  readerData;
          let route = res.data.response.data.route_location;
          props.getDraftData(campaign_data);
          if (campaign_data?.smart_list_data) {
            if (
              typeof campaign_data.smart_list_data != "undefined" &&
              campaign_data.smart_list_data != ""
            ) {
              props.getSelectedSmartListData(campaign_data.smart_list_data);
            }
          }
          navigate("/" + route);
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

  const sortTitle = () => {
    // setSortTitleStarted(1);
    let normalArr = [];
    normalArr = campaignData;
    if (sorting === 0) {
      normalArr.sort((a, b) =>
        a.pdf_title.toLowerCase() > b.pdf_title.toLowerCase()
          ? 1
          : b.pdf_title.toLowerCase() > a.pdf_title.toLowerCase()
          ? -1
          : 0
      );
    } else {
      normalArr.sort((a, b) =>
        a.pdf_title.toLowerCase() < b.pdf_title.toLowerCase()
          ? 1
          : b.pdf_title.toLowerCase() < a.pdf_title.toLowerCase()
          ? -1
          : 0
      );
    }
    setSortingCountDate(0);
    setData(normalArr);
    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
  };

  const sortDate = () => {
    let normalArr = [];
    normalArr = campaignData;
    let sortedData;
    if (sortDatee == 0) {
      sortedData = normalArr.sort(function (a, b) {
        var aa = a.sent_data.split("/").reverse().join(),
          bb = b.sent_data.split("/").reverse().join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      });
    } else {
      sortedData = normalArr.sort(function (a, b) {
        var aa = a.sent_data.split("/").reverse().join(),
          bb = b.sent_data.split("/").reverse().join();
        return aa > bb ? -1 : aa < bb ? 1 : 0;
      });
    }

    setSortingCount(0);
    setData(sortedData);
    setSortDate(1 - sortDatee);
    setSortingCountDate(sortingCountDate + 1);
  };

  const searchChange = (e) => {
    setSearch(e.target.value.trim());

    if (e.target.value === "") {
      setData([]);
      setSearch("");
      getCampaignList(1, "");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setData([]);
    getCampaignList(1, search);
  };

  const load_more = () => {
    setSorting(0);
    setSortDate(0);
    setSortingCountDate(0);
    setSortingCount(0);
    getCampaignList(currentPage + 1, search);
  };

  return (
    <>
      <div className="right-sidebar">
        <section className="search-hcp smart-list-view">
          <div className="result-hcp-table">
            <div className="table-title">
              <h4>
                Total Result <span>| {totalCount}</span>
              </h4>
              <div className="search-bar">
                      <form
                        className="d-flex"
                        onSubmit={(e) => submitHandler(e)}
                      >
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search Campaign"
                          aria-label="Search"
                          onChange={(e) => searchChange(e)}
                        />
                        {!search ? (
                          <button
                            className="btn btn-outline-success"
                            type="submit"
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
                              ></path>
                            </svg>
                          </button>
                        ) : null}
                      </form>
                    </div>
            </div>
            <div
              className="selected-hcp-list search_view  email_stats"
              id="analytics-hcp-table"
            >
              <div className="email_stats_title_heading">
                <table>
                  <thead>
                    <tr>
                      <th>
                      Subject
                      </th>
                      <th>
                      Description
                      </th>
                      <th>
                      Campaign       
                      </th>
                      <th>
                      Creator
                      </th>
                      <th>
                      Date
                      </th>
                    </tr>
                  </thead>
                </table>
                </div>
              {/* <div className="table_xls search_view">
                <div className="smart-list-btns">
                  <div className="top-right-action">

                  </div>
                </div>
              </div> */}
              <Accordion defaultActiveKey="0">
                {
                  typeof campaignData !== "undefined" && campaignData.length > 0 ?
                  campaignData.map((campaignItem, index) => {
                    return(
                      <>
                          <Accordion.Item eventKey={index}>
                            <Accordion.Header>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>
                                      {campaignItem?.subject}
                                      </td>
                                      <td>
                                      {campaignItem?.description}
                                      </td>
                                      <td>
                                      {campaignItem?.title}
                                      </td>
                                      <td>
                                      {campaignItem?.creator}
                                      </td>
                                      <td>
                                      <div className="last-activity">
                                        <span className="last-activity-date ">{campaignItem?.lastactivity}</span>
                                          {
                                          campaignItem?.campaignSend && campaignItem?.campaignSend.length > 1 ?
                                            <div className="mail-resend" title="Resend Emails">
                                              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g id="Glyph"><g data-name="Glyph" id="Glyph-2"><path d="M49,35a8,8,0,0,0-3.17.66l.12-.34a1,1,0,1,0-1.9-.64l-1,3a1,1,0,0,0,.58,1.25l2.5,1a1,1,0,0,0,.74-1.86l-.76-.3A6,6,0,1,1,43,43a1,1,0,0,0-2,0,8,8,0,1,0,8-8Z" fill="#0066be" /><path d="M56,32.06V16.23A8.24,8.24,0,0,0,47.77,8H10.23A8.24,8.24,0,0,0,2,16.23V37.77A8.24,8.24,0,0,0,10.23,46H36.36A13,13,0,1,0,56,32.06ZM34.19,27.64a8.11,8.11,0,0,1-10.37,0L6.63,42.86A6.38,6.38,0,0,1,5.2,41.45l17.09-15.1L5.52,12.15a6.56,6.56,0,0,1,1.57-1.3L25,26a6.14,6.14,0,0,0,8,0L50.91,10.85a6.56,6.56,0,0,1,1.57,1.3L35.74,26.33l6.51,5.56a12.46,12.46,0,0,0-1.67,1.21ZM49,54A11,11,0,1,1,60,43,11,11,0,0,1,49,54Z" fill="#0066be" /></g></g></svg>
                                              <span>{campaignItem?.campaignSend.length - 1}</span>
                                            </div>
                                            : null
                                          }
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                
                                
                            </Accordion.Header>
                            <Accordion.Body className="card-body">
                              <>
                              <div className="table_xls">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Campaign ID</th>
                                      <th scope="col">
                                        Date{" "}
                                        {/* <div className="hcp-sort">
                                          {sortingCountDate == 0 ? (
                                            <>
                                              <button
                                                className="btn btn-outline-primary"
                                                onClick={sortDate}
                                              >
                                                <img
                                                  src={path_image + "sort.svg"}
                                                  alt="Shorting"
                                                />
                                              </button>
                                            </>
                                          ) : sortDatee == 0 ? (
                                            <>
                                              <button
                                                className="btn btn-outline-primary desc"
                                                onClick={sortDate}
                                              >
                                                <img
                                                  src={path_image + "sort-decending.svg"}
                                                  alt="Shorting"
                                                />
                                              </button>
                                            </>
                                          ) : (
                                            <>
                                              <button
                                                className="btn btn-outline-primary asc"
                                                onClick={sortDate}
                                              >
                                                <img
                                                  src={path_image + "sort-assending.svg"}
                                                  alt="Shorting"
                                                />
                                              </button>
                                            </>
                                          )}
                                        </div> */}
                                      </th>
                                      <th scope="col">Subject</th>
                                      <th scope="col">
                                        Article title{" "}
                                        <div className="hcp-sort">
                                          {/* {sortingCount == 0 ? (
                                            <>
                                              <button
                                                className="btn btn-outline-primary"
                                                onClick={sortTitle}
                                              >
                                                <img
                                                  src={path_image + "sort.svg"}
                                                  alt="Shorting"
                                                />
                                              </button>
                                            </>
                                          ) : sorting == 0 ? (
                                            <>
                                              <button
                                                className="btn btn-outline-primary desc"
                                                onClick={sortTitle}
                                              >
                                                <img
                                                  src={path_image + "sort-decending.svg"}
                                                  alt="Shorting"
                                                />
                                              </button>
                                            </>
                                          ) : (
                                            <>
                                              <button
                                                className="btn btn-outline-primary asc"
                                                onClick={sortTitle}
                                              >
                                                <img
                                                  src={path_image + "sort-assending.svg"}
                                                  alt="Shorting"
                                                />
                                              </button>
                                            </>
                                          )} */}
                                        </div>
                                      </th>

                                      <th className="smartlistth" scope="col">
                                        Smart list
                                      </th>
                                      <th scope="col">Total mail sent</th>
                                      <th scope="col">Email read</th>
                                      <th scope="col">Pending read email</th>

                                      <th scope="col">Bounce count</th>
                                      <th scope="col">Details</th>
                                      <th scope="col">Sent to pending</th>
                                      <th scope="col">Sent to all</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {typeof campaignItem?.campaignSend !== "undefined" &&
                                    campaignItem?.campaignSend.length > 0 ? (
                                      campaignItem?.campaignSend.map((item, index) => (
                                        <>
                                          <tr className={item?.campaign_status == 5 ? "queue_row" : "campaign_row"} key={index}>
                                            <td> {item.c_id}</td>
                                            <td> {item.sent_data}</td>
                                            <td className="smartlistth"> {item.subject}</td>
                                            <td className="smartlistth"> {item.pdf_title}</td>
                                            <td className="smartlistth"> {item.list}</td>
                                            <td> {item.total_sent_count}</td>
                                            <td> {item.total_read_count}</td>
                                            <td> {item.total_pending_count}</td>

                                            <td> {item.total_bouns_count}</td>
                                            <td>
                                              <button
                                                type="button"
                                                className={item?.campaign_status == 5 ? "btn btn-primary btn-bordered disabled" : "btn btn-primary btn-bordered" }
                                                onClick={(e) => getDetails(item.distribute_id)}
                                              >
                                                Details
                                              </button>
                                            </td>
                                            <td>
                                              <button
                                                type="button"
                                                className={item?.campaign_status == 5 ? "btn btn-primary btn-bordered disabled" : "btn btn-primary btn-bordered" }
                                                onClick={(e) =>
                                                  sendCampaign(item.distribute_id, 2)
                                                }
                                              >
                                                Send pending
                                              </button>
                                            </td>
                                            <td>
                                              <button
                                                type="button"
                                                className={item?.campaign_status == 5 ? "btn btn-primary btn-bordered disabled" : "btn btn-primary btn-bordered" }
                                                onClick={(e) =>
                                                  sendCampaign(item.distribute_id, 1)
                                                }
                                              >
                                                Send all
                                              </button>
                                            </td>
                                          </tr>
                                        </>
                                      ))
                                    ) : (
                                      <tr className="data-not-found">
                                        <td colspan="12">
                                          <h4>No Data Found</h4>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              </>
                            </Accordion.Body>
                          </Accordion.Item>
                      </>
                    )
                  })
                  : <div className="no_found"><p>No Data Found</p></div>
                }
              </Accordion>
              
              {typeof campaignData !== "undefined" &&
              currentPage !== lastPage &&
              showLoader ? (
                <div className="load_more">
                  <button
                    className="btn btn-primary btn-filled"
                    onClick={load_more}
                  >
                    Load More
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
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
})(EmailStats);
