import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ExportApi from "../../../Api/ExportApi";
import { toast, ToastContainer } from "react-toastify";
import { loader } from "../../../loader";
import { BaseUrlImage } from "../../../Api/BaseApi";
const SelectSmartList = () => {
  const [smartListData, setSmartListData] = useState([]);
  const [smartListDataId, setSmartListDataId] = useState();
  const [deletestatus, setDeleteStatus] = useState(false);
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [prevsmartListData, setPrevSmartListData] = useState([]);
  const [deletecardid, setDeleteCardId] = useState();
  let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  const showConfirmationPopup = (id) => {
    // console.log(id);
    if (confirmationpopup) {
      setConfirmationPopup(false);
    } else {
      setConfirmationPopup(true);
    }
    setDeleteCardId(id);
  };

  const handleEmailSCreateCollection = () => {
    loader("show");
    smartListDataId
      ? ExportApi.EmailSCreateCollectionnext(
          smartListDataId,
          localStorage.getItem("collection_id"),
          1
        ).then((resp) => {
          if (resp.ok) {
            //  console.log( resp.data)
            if (resp.data.code == 200) {
              loader("hide");
              toast.success(resp.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              loader("hide");
            }
            // localStorage.setItem("collection_id",resp.data.data.collection_id)
            //  navigate("/webinar/email/smart-list");
          }
        })
      : toast.warning("Please select smart list");
    loader("hide");
  };

  const getSmartListData = async (flag) => {
    // console.log(localStorage.getItem("Token"));
    const body = {
      search: search,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };

    console.log(headers);
    await axios
      // .post(`http://51.89.210.56:8000/api/smart-list/lists`, body, { headers })
      .post(`${BaseUrlImage}/api/smart-list/lists`, body, { headers })
      .then((res) => {
        loader("hide");
        // console.log("res.data.data", res.data.data);
        setSmartListData(res.data.data);
        if (flag == 0) {
          loader("hide");
          //setFilterData(res.data.response.filter);
          setPrevSmartListData(res.data.data);
        }
        // console.log(res);
        loader("hide");
      })
      .catch((err) => {
        // console.log(err);
        loader("hide");
      });
  };
  useEffect(() => {
    loader("show");
    getSmartListData(0);
  }, []);
  return (
    <>
      <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
      <div className="right-sidebar col">
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
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <Link to={"/webinar/email/SelectHCP"}>
                  <button className="btn btn-primary btn-filled ">
                       Back
                  </button>
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-8">
              <ul className="tabnav-link">
                <li className="active">
                  <a href="#">Prepare your email</a>
                </li>
                <li className="active active-main">
                  <a href="#">Select smart list</a>
                </li>
                <li className="">
                  <a href="#">Approve and send</a>
                </li>
              </ul>
            </div>

            <div className="col-12 col-md-3">
              <div className="header-btn">
                <button
                  type="button"
                  className="btn btn-primary btn-bordered move-draft"
                  onClick={() => handleEmailSCreateCollection()}
                >
                  Save As Draft
                </button>

                <Link
                  to={
                    smartListDataId
                      ? `/webinar/email/smart-list-users/${smartListDataId}`
                      : "/webinar/email/smart-list"
                  }
                >
                  <button
                    type="button"
                    className="btn btn-primary btn-filled next"
                    onClick={() => handleEmailSCreateCollection()}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.8403 12.0001C18.8403 12.4302 18.6761 12.8603 18.3483 13.1882L8.02877 23.5077C7.37232 24.1641 6.30799 24.1641 5.65181 23.5077C4.99562 22.8515 4.99562 21.7874 5.65181 21.1309L14.7831 12.0001L5.65213 2.86923C4.99594 2.21277 4.99594 1.14877 5.65213 0.492636C6.30831 -0.164135 7.37264 -0.164135 8.02909 0.492636L18.3486 10.8119C18.6765 11.14 18.8403 11.5701 18.8403 12.0001Z"
                        fill="#97B6CF"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="smart-list-result">
            <div className="custom-container">
              <div className="row">
                <div className="smartlist-result-block">
                  {typeof smartListData !== "undefined" &&
                  smartListData.length > 0
                    ? smartListData.map((data,i) => {
                        return (
                          <div key={i} className="smartlist_box_block">
                            <div className="smartlist-view email_box">
                              <div className="mail-box-content">
                                <div className="select-mail-option">
                                  <input
                                    type="radio"
                                    name="radio"
                                    onClick={() => {
                                      setSmartListDataId(data.id);
                                      localStorage.setItem(
                                        "SmartListId",
                                        data.id
                                      );
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                </div>
                                <h5>{data.name}</h5>
                                <div className="mail-time">
                                  <span>Nov 18 | 9:00 AM</span>
                                </div>
                                <div className="smart-list-added-user">
                                  <svg
                                    width="19"
                                    height="25"
                                    viewBox="0 0 19 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.63149 10.5145C12.5428 10.5145 14.9024 8.16048 14.9024 5.25705C14.9024 2.35362 12.5423 0 9.63149 0C6.72065 0 4.35968 2.35406 4.35968 5.2575C4.35968 8.16093 6.72065 10.5145 9.63149 10.5145ZM11.8673 10.8729H7.39476C3.67345 10.8729 0.645996 13.8931 0.645996 17.6049V23.0606L0.6599 23.146L1.03665 23.2637C4.58797 24.3705 7.67329 24.7396 10.2128 24.7396C15.1729 24.7396 18.0478 23.329 18.225 23.2391L18.5771 23.0615H18.6147V17.6049C18.6161 13.8931 15.5886 10.8729 11.8673 10.8729Z"
                                      fill="#0066BE"
                                    />
                                  </svg>
                                  {data.count}
                                </div>
                                <div className="mail-stats">
                                  <ul>
                                    <li>
                                      <div className="mail-status smartlist_view">
                                        <img
                                          src={
                                            path_image +
                                            "/webinar/user-group.png"
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <span>10%</span>
                                    </li>
                                    <li>
                                      <div className="mail-status mail_click">
                                        <img
                                          src={
                                            path_image +
                                            "/webinar/user-click.png"
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <span>60%</span>
                                    </li>
                                    <li>
                                      <div className="mail-status smartlist_view">
                                        <img
                                          src={
                                            path_image +
                                            "/webinar/user-mail-template.png"
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <span>60%</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SelectSmartList;
