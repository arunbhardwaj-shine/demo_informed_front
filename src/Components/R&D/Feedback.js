import React, { useEffect, useRef, useState } from "react";
import { ENDPOINT } from "../../axios/apiConfig";
import axios from "axios";
import { loader } from "../../loader";
import moment from "moment";

const Feedback = () => {
    const [data, setData] = useState([]);
    const [feedbackData, setFeedback] = useState([]);
    const [search, setSearch] = useState("");
    const [apiStatus, setApiStatus] = useState(true);

    useEffect(() => {
        setApiStatus(false);
        getFeedbackData();
    },[]);

    const getFeedbackData = async() => {
        try{
            loader(true);
            await axios
            .get(ENDPOINT.FEEDBACKLISTING)
            .then((response) => {
                setData(response?.data?.data);
                setFeedback(response?.data?.data);
            });
            setApiStatus(true);
            loader(false);
        }catch(err){
            console.log(err);
            setApiStatus(true);
            loader(false);
        }
    }

    const searchChange = (e) => {
        setSearch(e.target.value.trim());
        if (e.target.value === "") {
            setFeedback(data);
            setSearch("");
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const filteredData = data.filter(item =>
            item.message.toLowerCase().includes(search.toLowerCase())
        );
        setFeedback(filteredData);
    };

    return (
        <>
          <div className="right-sidebar">
            <div className="page-top-nav smart_list_names">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-11"></div>
              </div>
            </div>
    
            <section className="search-hcp smart-list-view">
              <div className="result-hcp-table">
                <div className="table-title">
                  <h4>
                    Total Feedbacks <span>| {data?.length}</span>
                  </h4>
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
                <div className="selected-hcp-list search_view">
                    <div className="feedback-block">
                    {typeof feedbackData !== "undefined" &&
                        feedbackData.length > 0 ? (
                            feedbackData.map((item, index) => (
                            <>
                            <div className="timeline-block" key={index}>
                                <div className="timeline-block-head library">
                                    <div className="timeline-block-title d-flex flex-column align-items-start">
                                        <h6>{item?.email}</h6>
                                    </div>
                                    <div className="timeline-time-view">
                                    <div className="timeline-time">{moment(item?.createdAt).format('D MMMM YYYY')}</div>|<div className="timeline-timezone">{moment(item?.createdAt).format('h:mm A')}</div>
                                    </div>
                                </div>
                                <div className="feedback-detail">
                                    <p> {item?.message}</p>
                                </div>
                            </div>
                            </>
                          ))
                        ) : (
                            <>
                            {
                                apiStatus ? 
                                <h4 className="not-found" style={{color:'#004A89'}}>No Data Found</h4> : null
                            }
                            </>
                        )
                    }
                    </div>
                </div>
              </div>
            </section>
          </div>
        </>
      );   
};
export default Feedback;