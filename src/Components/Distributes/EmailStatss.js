import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useCallback } from "react";
import { loader } from "../../loader";
import { getDraftData, getEmailData, getSelectedSmartListData } from "../../actions";

const EmailStatss = (props) => {
  const [totalCount, setTotalCount] = useState([]);
  const [update, setUpdate] = useState(0);
  const navigate = useNavigate();
  const [campaignData, setData] = useState([]);
  const [showLessInfo, setShowLessInfo] = useState(true);

  useEffect(() => {
    getCampaignList();
  }, []);

  const getCampaignList = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      page: 1,
    };
    loader("show");
    await axios
      .post(`distributes/get_send_campaign_list`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          setData(res.data.response.data);
        }else{
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

  const sendCampaign = (dist_id,type) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    const body = {
      user_id: 'rjiGlqA9DXJVH7bDDTX0Lg==',
      distribute_id: dist_id,
      send_status: type,
    };

    axios
      .post(`distributes/resend_campaign_with_all_pending_readers`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          console.log(res.data.response.data.campaign_id);
          draftNavigate(res.data.response.data.campaign_id);
        }else {
          toast.warning(res.data.message);
          loader("hide");
        }
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
    });
  }



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
          if(campaign_data?.smart_list_data){
            if(typeof campaign_data.smart_list_data != "undefined" && campaign_data.smart_list_data != ""){
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

  const showMoreInfo = (e) => {
    e.preventDefault();
    setShowLessInfo(!showLessInfo);
  };

  return (
    <>
      <div class="right-sidebar">
        <div class="page-top-nav smart_list_names">
          <div class="row justify-content-end align-items-center">
          {
            /*
            <div class="col-12 col-md-1">
              <div class="header-btn-left">
                <button class="btn btn-primary btn-bordered back">Back</button>
              </div>
            </div>
            */
          }

            <div class="col-12 col-md-11">
              <div class="smart-list-btns">
              {
                /*
                <div class="smart-list-download">
                  <button class="btn btn-outline-primary"><img src="assets/images/download.svg" alt="Download List" /></button>
                </div>
                <div class="hcp-new-user">
                  <button class="btn btn-outline-primary"><img src="assets/images/new-user.svg" alt="New User" /></button>
                </div>
                <div class="hcp-added">
                  <button class="btn btn-outline-primary"><img src="assets/images/edit-button.svg" alt="Edit" /></button>
                </div>
                */
              }


                <div class="top-right-action">
                {
                  /*
                  <div class="search-bar">
                    <form class="d-flex">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                      <button class="btn btn-outline-success" type="submit"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z" fill="#97B6CF"></path>
                      </svg>
                      </button>
                    </form>
                  </div>


                    <div class="filter-by">
                      <button class="btn btn-outline-primary" type="submit">
                      Filter By <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z" fill="#97B6CF"></path>
                        <path d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z" fill="#97B6CF"></path>
                        <path d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z" fill="#97B6CF"></path>
                        </svg>
                      </button>
                    </div>
                    */
                  }
                </div>
              </div>
            </div>
           </div>
        </div>

        <section class="search-hcp smart-list-view">
          <div class="result-hcp-table">
            <div class="table-title">
              <h4>Total Result <span>| {campaignData.length > 0 ? campaignData.length : 0}</span></h4>

              <div class="selected-hcp-table-action">
                <a
                  className="show-less-info"
                  onClick={(e) => showMoreInfo(e)}
                >
                  {showLessInfo == true ? (
                    <p className="show_more">Show More information</p>
                  ) : (
                    <p className="show_less">Show less information</p>
                  )}
                </a>

              </div>
            </div>
            <div class="selected-hcp-list" id="analytics-hcp-table">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Campaign ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Article Title</th>
                      <th scope="col">Smart List</th>
                      <th scope="col">Total mail sent</th>
                      <th scope="col">Email Read</th>
                      <th scope="col">Pending Read Email</th>
                      {showLessInfo == false ? (
                        <>
                        <th scope="col">Bounce Count</th>
                        <th scope="col">Details</th>
                        <th scope="col">Sent to pending</th>
                        <th scope="col">Sent to all</th>
                        </>
                      ) : null}

                    </tr>
                  </thead>
                  <tbody>
                  {
                    typeof campaignData !== "undefined" && campaignData.length > 0 && campaignData.map((item, index) => (
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
                          {showLessInfo == false ? (
                            <>
                            <td> {item.total_bouns_count}</td>
                            <td>
                              <button type="button" className="btn btn-primary btn-bordered" onClick={(e) => getDetails(item.distribute_id)}>
                                Details
                              </button>
                            </td>
                            <td>
                            <button type="button" className="btn btn-primary btn-bordered" onClick={(e) => sendCampaign(item.distribute_id,2)}>
                              Send pending
                            </button>
                            </td>
                            <td>
                              <button type="button" className="btn btn-primary btn-bordered" onClick={(e) => sendCampaign(item.distribute_id,1)}>
                                Send all
                              </button>
                            </td>
                            </>
                          ) : null}

                        </tr>
                      </>
                    ))
                  }
                  </tbody>
                </table>
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
