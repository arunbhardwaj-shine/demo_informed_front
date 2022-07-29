import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useCallback } from "react";
import { loader } from "../../loader";

import {
  getDraftData,
  getEmailData,
  getSelectedSmartListData,
} from "../../actions";
import { popup_alert } from "../../popup_alert";

const EmailStatss = (props) => {
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
  const [perPageData, setPerPageData] = useState();

  useEffect(() => {
    getCampaignList();
  }, []);

  const getCampaignList = async (page) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      page: page,
    };
    loader("show");
    await axios
      .post(`distributes/get_send_campaign_list`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          console.log(res);
          //setData(res.data.response.data);

          setCampaignDataLength(res.data.response.data.length);
          setData((oldArray) => [...oldArray, ...res.data.response.data]);
          //setUpdatedData(res.data.response.data);
          setUpdatedData((oldArray) => [
            ...oldArray,
            ...res.data.response.data,
          ]);

          setLoadMore(1);

          setLastPage(res.data.response.pegination.lastPage);
          setPerPageData(res.data.response.pegination.perPage);
        } else {
          toast.warning(res.data.message);
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
          console.log(res.data.response.data.campaign_id);
          draftNavigate(res.data.response.data.campaign_id);
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

  const draftNavigate = async (campaign_id) => {
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
    // console.log(sortedData);
    setSortingCount(0);
    setData(sortedData);
    setSortDate(1 - sortDatee);
    setSortingCountDate(sortingCountDate + 1);
  };

  const searchChange = (e) => {
    setSearch(e.target.value);

    if (e.target.value === "") {
      setData(updatedData);
      setSearchStarted(0);
    }
  };

  const submitHandler = (event) => {
    let r_table = [];
    setSearchStarted(1);
    updatedData.find(function (item) {
      if (
        item.pdf_title.includes(search) ||
        item.subject.includes(search) ||
        item.list.includes(search)
      ) {
        r_table.push(item);
      }
    });
    if (r_table.length > 0) {
      setData(r_table);
      setSearchData(r_table);
    } else {
      // popup_alert({
      //   visible: "show",
      //   message: "Data not found",
      //   type: "error",
      // });

      setData([]);
    }
    event.preventDefault();
    return false;
  };

  const load_more = () => {
    //  getContentData(0, 2);
    setloadmore(1);

    getCampaignList(page + 1);
    setPage(page + 1);
  };

  return (
    <>
      <div class="right-sidebar">
        <div class="page-top-nav smart_list_names">
          <div class="row justify-content-end align-items-center">
            <div class="col-12 col-md-11"></div>
          </div>
        </div>

        <section class="search-hcp smart-list-view">
          <div class="result-hcp-table">
            <div class="table-title">
              <h4>
                Total Result{" "}
                <span>
                  | {campaignData.length > 0 ? campaignData.length : 0}
                </span>
              </h4>
            </div>
            <div class="selected-hcp-list search_view" id="analytics-hcp-table">
              <div className="table_xls search_view">
                <div className="smart-list-btns">
                  <div className="top-right-action">
                    <div className="search-bar">
                      <form
                        className="d-flex"
                        onSubmit={(e) => submitHandler(e)}
                      >
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search"
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
                </div>
              </div>
              <div className="table_xls">
                <table class="table">
                  <thead className="sticky-header">
                    <tr>
                      <th scope="col">Campaign ID</th>
                      <th scope="col">
                        Date{" "}
                        <div className="hcp-sort">
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
                        </div>
                      </th>
                      <th scope="col">Subject</th>
                      <th scope="col">
                        Article Title{" "}
                        <div className="hcp-sort">
                          {sortingCount == 0 ? (
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
                          )}
                        </div>
                      </th>

                      <th scope="col">Smart List</th>
                      <th scope="col">Total mail sent</th>
                      <th scope="col">Email Read</th>
                      <th scope="col">Pending Read Email</th>

                      <th scope="col">Bounce Count</th>
                      <th scope="col">Details</th>
                      <th scope="col">Sent to pending</th>
                      <th scope="col">Sent to all</th>
                    </tr>
                  </thead>

                  <tbody>
                    {typeof campaignData !== "undefined" &&
                    campaignData.length > 0 ? (
                      campaignData.map((item, index) => (
                        <>
                          <tr>
                            <td> {item.c_id}</td>
                            <td> {item.sent_data}</td>
                            <td> {item.subject}</td>
                            <td> {item.pdf_title}</td>
                            <td> {item.list}</td>
                            <td> {item.total_sent_count}</td>
                            <td> {item.total_read_count}</td>
                            <td> {item.total_pending_count}</td>

                            <td> {item.total_bouns_count}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-primary btn-bordered"
                                onClick={(e) => getDetails(item.distribute_id)}
                              >
                                Details
                              </button>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-primary btn-bordered"
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
                                className="btn btn-primary btn-bordered"
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

                {typeof campaignData !== "undefined" &&
                  page !== lastPage &&
                  searchStarted == 0 &&
                  loadmore && (
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
})(EmailStatss);
