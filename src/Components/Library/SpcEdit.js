import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { popup_alert } from "../../popup_alert";

const SpcEdit = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [confirmationpopup, setConfirmationPopup] = useState(false);

  console.log(location);
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  return (
    <>
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
            <div className="top-header">
              <div className="page-title">
                <h2>
                  {location?.state?.data == "edit"
                    ? "View | Edit SPC"
                    : "Delete SPC"}
                </h2>
              </div>
              <div className="top-right-action">
                <div className="search-bar">
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
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

                {/* <div className="filter-by nav-item dropdown">
                  <button
                    className="btn btn-secondary dropdown"
                    type="button"
                    id="dropdownMenuButton2"
                   
                  >
                    Filter By
         
                  </button>
                </div> */}
                 <button
                    className="btn-bordered cancel btn btn-primary"
                    type="button"
                    onClick={() => navigate("/spc")}>
                    Close
                  </button>
                {/* <div className="filter-by nav-item dropdown">
                  <button
                    className="btn btn-secondary dropdown"
                    type="button"
                    id="dropdownMenuButton2"
                    onClick={() => navigate("/spc")}
                  >
                    Close
                  </button>
                </div> */}
              </div>
            </div>

            {/* {updateflag > 0 &&
              (getfiltername.length > 0 ||
                getFilterCreator.length > 0 ||
                filterdate.length > 0) && (
                <div className="apply-filter">
                  <h6>Applied filters</h6>
                  <div className="filter-block">
                    <div className="filter-block-left full">
                      {getfiltername.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Name |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(getfiltername).map(
                              ([index, item]) => (
                                <div
                                  className="filter-result"
                                  onClick={(event) =>
                                    removeindividualfilter("name", item)
                                  }
                                >
                                  {item}
                                  <img
                                    src={path_image + "filter-close.svg"}
                                    alt="Close-filter"
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {getFilterCreator.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Creator |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(getFilterCreator).map(
                              ([index, item]) => (
                                <div
                                  className="filter-result"
                                  onClick={(event) =>
                                    removeindividualfilter("creator", item)
                                  }
                                >
                                  {item}
                                  <img
                                    src={path_image + "filter-close.svg"}
                                    alt="Close-filter"
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {filterdate.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Created |</span>
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
                        //onClick={clearFilter}
                      >
                        Remove All
                      </button>
                    </div>
                  </div>
                </div>
              )} */}

            <div className="smart-list-result spc-delete">
              <div className="col smartlist-result-block spc-edit">
                <div className="smartlist_box_block">
                  <div className="smartlist-view email_box">
                    <div className="mail-box-content">
                      <div className="mailbox-table">
                        <h5>
                          SPC Title mote condi ment zcsum dolor nihibdolor masa
                          euismod pharta donec mas faucibus quisque
                        </h5>

                        <table>
                          <tbody>
                            <tr>
                              <th>Country</th>
                              <td>United Kingdom</td>
                            </tr>
                            <tr>
                              <th>Language</th>
                              <td>English</td>
                            </tr>
                            <tr>
                              <th>IBU</th>
                              <td>Hameatology</td>
                            </tr>
                            <tr>
                              <th>Product</th>
                              <td>Product name</td>
                            </tr>
                            <tr>
                              <th>Creation date</th>
                              <td>5 July,2022</td>
                            </tr>
                            <tr>
                              <th>Last edit</th>
                              <td>7 February 2023</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* <div className="mail-stats">
                            <ul>

                              <li><div className="mail-status smartlist_view">
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.65531 2.57856C10.3951 3.04241 10.9139 3.82733 11.0083 4.73845C11.31 4.87942 11.6449 4.96049 11.9999 4.96049C13.296 4.96049 14.3465 3.91 14.3465 2.6141C14.3465 1.31801 13.296 0.267517 11.9999 0.267517C10.7162 0.267916 9.67488 1.29964 9.65531 2.57856ZM8.11801 7.38316C9.4141 7.38316 10.4646 6.33246 10.4646 5.03657C10.4646 3.74067 9.4139 2.69018 8.11801 2.69018C6.82211 2.69018 5.77102 3.74087 5.77102 5.03677C5.77102 6.33266 6.82211 7.38316 8.11801 7.38316ZM9.11339 7.5431H7.12223C5.46552 7.5431 4.11771 8.89111 4.11771 10.5478V12.9829L4.1239 13.021L4.29163 13.0735C5.87266 13.5675 7.24622 13.7322 8.37679 13.7322C10.585 13.7322 11.8649 13.1027 11.9438 13.0625L12.1005 12.9833H12.1173V10.5478C12.1179 8.89111 10.7701 7.5431 9.11339 7.5431ZM12.9957 5.12063H11.0199C10.9985 5.91115 10.6611 6.62299 10.1273 7.13496C11.6 7.57285 12.6774 8.93843 12.6774 10.5514V11.3018C14.6282 11.2303 15.7524 10.6774 15.8265 10.6403L15.9832 10.5608H16V8.12495C16 6.46844 14.6522 5.12063 12.9957 5.12063ZM4.0005 4.96089C4.45955 4.96089 4.88666 4.82691 5.24847 4.59868C5.36348 3.8485 5.76563 3.19296 6.3401 2.74649C6.34249 2.70256 6.34669 2.65903 6.34669 2.6147C6.34669 1.31861 5.29599 0.268116 4.0005 0.268116C2.70421 0.268116 1.65391 1.31861 1.65391 2.6147C1.65391 3.9102 2.70421 4.96089 4.0005 4.96089ZM6.10787 7.13496C5.57674 6.62559 5.24048 5.91754 5.21592 5.13181C5.14264 5.12642 5.07016 5.12063 4.99548 5.12063H3.00452C1.34781 5.12063 0 6.46844 0 8.12495V10.5604L0.00618994 10.5979L0.173917 10.6508C1.44226 11.0468 2.57422 11.2293 3.55742 11.2868V10.5514C3.55782 8.93843 4.63487 7.57325 6.10787 7.13496Z" fill="#FAC755"/>
                                  </svg>
                              </div><span>10%</span></li>
                              <li><div className="mail-status mail_click">
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2.96391 5.30631C2.85416 4.93468 2.74879 4.56243 2.6696 4.20577C2.14894 3.89774 1.79477 3.33718 1.79477 2.68932C1.79477 1.71473 2.58729 0.922837 3.56126 0.922837C4.53522 0.922837 5.32774 1.71535 5.32774 2.68932C5.32774 2.82338 5.30966 2.95246 5.2816 3.07779C5.45058 3.45004 5.58713 3.86906 5.70685 4.29493C6.04356 3.84599 6.25058 3.29415 6.25058 2.68932C6.25058 1.20343 5.04715 0 3.56126 0C2.07536 0 0.872559 1.20343 0.872559 2.68932C0.872559 3.96882 1.76734 5.03445 2.96391 5.30631Z" fill="#C8D1D9"/>
                                  <path d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z" fill="#C8D1D9"/>
                                  </svg>
                              </div><span>60%</span></li>
                            </ul>
                          </div> */}
                      <div className="smartlist-buttons">
                        {
                          <>
                            {location?.state?.data == "edit" ? (
                              <Link className="btn btn-primary btn-bordered edit_list">
                                Edit
                              </Link>
                            ) : null}

                            <Link className="btn btn-primary btn-filled view">
                              View
                            </Link>
                          </>
                        }
                      </div>
                      {location?.state?.data != "edit" ? (
                        <div className="dlt_btn">
                          <button onClick={(e) => setConfirmationPopup(true)}>
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
                <div className="smartlist_box_block">
                  <div className="smartlist-view email_box">
                    <div className="mail-box-content">
                      <div className="mailbox-table">
                        <h5>
                          SPC Title mote condi ment zcsum dolor nihibdolor masa
                          euismod pharta donec mas faucibus quisque
                        </h5>
                        <table>
                          <tbody>
                            <tr>
                              <th>Country</th>
                              <td>United Kingdom</td>
                            </tr>
                            <tr>
                              <th>Language</th>
                              <td>English</td>
                            </tr>
                            <tr>
                              <th>IBU</th>
                              <td>Hameatology</td>
                            </tr>
                            <tr>
                              <th>Product</th>
                              <td>Product name</td>
                            </tr>
                            <tr>
                              <th>Creation date</th>
                              <td>5 July,2022</td>
                            </tr>
                            <tr>
                              <th>Last edit</th>
                              <td>7 February 2023</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* <div className="mail-stats">
                            <ul>

                              <li><div className="mail-status smartlist_view">
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.65531 2.57856C10.3951 3.04241 10.9139 3.82733 11.0083 4.73845C11.31 4.87942 11.6449 4.96049 11.9999 4.96049C13.296 4.96049 14.3465 3.91 14.3465 2.6141C14.3465 1.31801 13.296 0.267517 11.9999 0.267517C10.7162 0.267916 9.67488 1.29964 9.65531 2.57856ZM8.11801 7.38316C9.4141 7.38316 10.4646 6.33246 10.4646 5.03657C10.4646 3.74067 9.4139 2.69018 8.11801 2.69018C6.82211 2.69018 5.77102 3.74087 5.77102 5.03677C5.77102 6.33266 6.82211 7.38316 8.11801 7.38316ZM9.11339 7.5431H7.12223C5.46552 7.5431 4.11771 8.89111 4.11771 10.5478V12.9829L4.1239 13.021L4.29163 13.0735C5.87266 13.5675 7.24622 13.7322 8.37679 13.7322C10.585 13.7322 11.8649 13.1027 11.9438 13.0625L12.1005 12.9833H12.1173V10.5478C12.1179 8.89111 10.7701 7.5431 9.11339 7.5431ZM12.9957 5.12063H11.0199C10.9985 5.91115 10.6611 6.62299 10.1273 7.13496C11.6 7.57285 12.6774 8.93843 12.6774 10.5514V11.3018C14.6282 11.2303 15.7524 10.6774 15.8265 10.6403L15.9832 10.5608H16V8.12495C16 6.46844 14.6522 5.12063 12.9957 5.12063ZM4.0005 4.96089C4.45955 4.96089 4.88666 4.82691 5.24847 4.59868C5.36348 3.8485 5.76563 3.19296 6.3401 2.74649C6.34249 2.70256 6.34669 2.65903 6.34669 2.6147C6.34669 1.31861 5.29599 0.268116 4.0005 0.268116C2.70421 0.268116 1.65391 1.31861 1.65391 2.6147C1.65391 3.9102 2.70421 4.96089 4.0005 4.96089ZM6.10787 7.13496C5.57674 6.62559 5.24048 5.91754 5.21592 5.13181C5.14264 5.12642 5.07016 5.12063 4.99548 5.12063H3.00452C1.34781 5.12063 0 6.46844 0 8.12495V10.5604L0.00618994 10.5979L0.173917 10.6508C1.44226 11.0468 2.57422 11.2293 3.55742 11.2868V10.5514C3.55782 8.93843 4.63487 7.57325 6.10787 7.13496Z" fill="#FAC755"/>
                                  </svg>
                              </div><span>10%</span></li>
                              <li><div className="mail-status mail_click">
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2.96391 5.30631C2.85416 4.93468 2.74879 4.56243 2.6696 4.20577C2.14894 3.89774 1.79477 3.33718 1.79477 2.68932C1.79477 1.71473 2.58729 0.922837 3.56126 0.922837C4.53522 0.922837 5.32774 1.71535 5.32774 2.68932C5.32774 2.82338 5.30966 2.95246 5.2816 3.07779C5.45058 3.45004 5.58713 3.86906 5.70685 4.29493C6.04356 3.84599 6.25058 3.29415 6.25058 2.68932C6.25058 1.20343 5.04715 0 3.56126 0C2.07536 0 0.872559 1.20343 0.872559 2.68932C0.872559 3.96882 1.76734 5.03445 2.96391 5.30631Z" fill="#C8D1D9"/>
                                  <path d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z" fill="#C8D1D9"/>
                                  </svg>
                              </div><span>60%</span></li>
                            </ul>
                          </div> */}
                      <div className="smartlist-buttons">
                        {
                          <>
                            {location?.state?.data == "edit" ? (
                              <Link className="btn btn-primary btn-bordered edit_list">
                                Edit
                              </Link>
                            ) : null}

                            <Link className="btn btn-primary btn-filled view">
                              View
                            </Link>
                          </>
                        }
                      </div>
                      {location?.state?.data != "edit" ? (
                        <div className="dlt_btn">
                          <button
                            onClick={(e) => setConfirmationPopup(true)}
                            // onClick={(e) => showConfirmationPopup(data.id)}
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
                <div className="smartlist_box_block">
                  <div className="smartlist-view email_box">
                    <div className="mail-box-content">
                      <div className="mailbox-table">
                        <h5>
                          SPC Title mote condi ment zcsum dolor nihibdolor masa
                          euismod pharta donec mas faucibus quisque
                        </h5>
                        <table>
                          <tbody>
                            <tr>
                              <th>Country</th>
                              <td>United Kingdom</td>
                            </tr>
                            <tr>
                              <th>Language</th>
                              <td>English</td>
                            </tr>
                            <tr>
                              <th>IBU</th>
                              <td>Hameatology</td>
                            </tr>
                            <tr>
                              <th>Product</th>
                              <td>Product name</td>
                            </tr>
                            <tr>
                              <th>Creation date</th>
                              <td>5 July,2022</td>
                            </tr>
                            <tr>
                              <th>Last edit</th>
                              <td>7 February 2023</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* <div className="mail-stats">
                            <ul>

                              <li><div className="mail-status smartlist_view">
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.65531 2.57856C10.3951 3.04241 10.9139 3.82733 11.0083 4.73845C11.31 4.87942 11.6449 4.96049 11.9999 4.96049C13.296 4.96049 14.3465 3.91 14.3465 2.6141C14.3465 1.31801 13.296 0.267517 11.9999 0.267517C10.7162 0.267916 9.67488 1.29964 9.65531 2.57856ZM8.11801 7.38316C9.4141 7.38316 10.4646 6.33246 10.4646 5.03657C10.4646 3.74067 9.4139 2.69018 8.11801 2.69018C6.82211 2.69018 5.77102 3.74087 5.77102 5.03677C5.77102 6.33266 6.82211 7.38316 8.11801 7.38316ZM9.11339 7.5431H7.12223C5.46552 7.5431 4.11771 8.89111 4.11771 10.5478V12.9829L4.1239 13.021L4.29163 13.0735C5.87266 13.5675 7.24622 13.7322 8.37679 13.7322C10.585 13.7322 11.8649 13.1027 11.9438 13.0625L12.1005 12.9833H12.1173V10.5478C12.1179 8.89111 10.7701 7.5431 9.11339 7.5431ZM12.9957 5.12063H11.0199C10.9985 5.91115 10.6611 6.62299 10.1273 7.13496C11.6 7.57285 12.6774 8.93843 12.6774 10.5514V11.3018C14.6282 11.2303 15.7524 10.6774 15.8265 10.6403L15.9832 10.5608H16V8.12495C16 6.46844 14.6522 5.12063 12.9957 5.12063ZM4.0005 4.96089C4.45955 4.96089 4.88666 4.82691 5.24847 4.59868C5.36348 3.8485 5.76563 3.19296 6.3401 2.74649C6.34249 2.70256 6.34669 2.65903 6.34669 2.6147C6.34669 1.31861 5.29599 0.268116 4.0005 0.268116C2.70421 0.268116 1.65391 1.31861 1.65391 2.6147C1.65391 3.9102 2.70421 4.96089 4.0005 4.96089ZM6.10787 7.13496C5.57674 6.62559 5.24048 5.91754 5.21592 5.13181C5.14264 5.12642 5.07016 5.12063 4.99548 5.12063H3.00452C1.34781 5.12063 0 6.46844 0 8.12495V10.5604L0.00618994 10.5979L0.173917 10.6508C1.44226 11.0468 2.57422 11.2293 3.55742 11.2868V10.5514C3.55782 8.93843 4.63487 7.57325 6.10787 7.13496Z" fill="#FAC755"/>
                                  </svg>
                              </div><span>10%</span></li>
                              <li><div className="mail-status mail_click">
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2.96391 5.30631C2.85416 4.93468 2.74879 4.56243 2.6696 4.20577C2.14894 3.89774 1.79477 3.33718 1.79477 2.68932C1.79477 1.71473 2.58729 0.922837 3.56126 0.922837C4.53522 0.922837 5.32774 1.71535 5.32774 2.68932C5.32774 2.82338 5.30966 2.95246 5.2816 3.07779C5.45058 3.45004 5.58713 3.86906 5.70685 4.29493C6.04356 3.84599 6.25058 3.29415 6.25058 2.68932C6.25058 1.20343 5.04715 0 3.56126 0C2.07536 0 0.872559 1.20343 0.872559 2.68932C0.872559 3.96882 1.76734 5.03445 2.96391 5.30631Z" fill="#C8D1D9"/>
                                  <path d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z" fill="#C8D1D9"/>
                                  </svg>
                              </div><span>60%</span></li>
                            </ul>
                          </div> */}
                      <div className="smartlist-buttons">
                        {
                          <>
                            {location?.state?.data == "edit" ? (
                              <Link className="btn btn-primary btn-bordered edit_list">
                                Edit
                              </Link>
                            ) : null}

                            <Link className="btn btn-primary btn-filled view">
                              View
                            </Link>
                          </>
                        }
                      </div>
                      {location?.state?.data != "edit" ? (
                        <div className="dlt_btn">
                          <button
                            onClick={(e) => setConfirmationPopup(true)}
                            // onClick={(e) => showConfirmationPopup(data.id)}
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
                <div className="smartlist_box_block">
                  <div className="smartlist-view email_box">
                    <div className="mail-box-content">
                      <h5>
                        SPC Title mote condi ment zcsum dolor nihibdolor masa
                        euismod pharta donec mas faucibus quisque
                      </h5>

                      <div className="mailbox-table">
                        <table>
                          <tbody>
                            <tr>
                              <th>Country</th>
                              <td>United Kingdom</td>
                            </tr>
                            <tr>
                              <th>Language</th>
                              <td>English</td>
                            </tr>
                            <tr>
                              <th>IBU</th>
                              <td>Hameatology</td>
                            </tr>
                            <tr>
                              <th>Product</th>
                              <td>Product name</td>
                            </tr>
                            <tr>
                              <th>Creation date</th>
                              <td>5 July,2022</td>
                            </tr>
                            <tr>
                              <th>Last edit</th>
                              <td>7 February 2023</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* <div className="mail-stats">
                            <ul>

                              <li><div className="mail-status smartlist_view">
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.65531 2.57856C10.3951 3.04241 10.9139 3.82733 11.0083 4.73845C11.31 4.87942 11.6449 4.96049 11.9999 4.96049C13.296 4.96049 14.3465 3.91 14.3465 2.6141C14.3465 1.31801 13.296 0.267517 11.9999 0.267517C10.7162 0.267916 9.67488 1.29964 9.65531 2.57856ZM8.11801 7.38316C9.4141 7.38316 10.4646 6.33246 10.4646 5.03657C10.4646 3.74067 9.4139 2.69018 8.11801 2.69018C6.82211 2.69018 5.77102 3.74087 5.77102 5.03677C5.77102 6.33266 6.82211 7.38316 8.11801 7.38316ZM9.11339 7.5431H7.12223C5.46552 7.5431 4.11771 8.89111 4.11771 10.5478V12.9829L4.1239 13.021L4.29163 13.0735C5.87266 13.5675 7.24622 13.7322 8.37679 13.7322C10.585 13.7322 11.8649 13.1027 11.9438 13.0625L12.1005 12.9833H12.1173V10.5478C12.1179 8.89111 10.7701 7.5431 9.11339 7.5431ZM12.9957 5.12063H11.0199C10.9985 5.91115 10.6611 6.62299 10.1273 7.13496C11.6 7.57285 12.6774 8.93843 12.6774 10.5514V11.3018C14.6282 11.2303 15.7524 10.6774 15.8265 10.6403L15.9832 10.5608H16V8.12495C16 6.46844 14.6522 5.12063 12.9957 5.12063ZM4.0005 4.96089C4.45955 4.96089 4.88666 4.82691 5.24847 4.59868C5.36348 3.8485 5.76563 3.19296 6.3401 2.74649C6.34249 2.70256 6.34669 2.65903 6.34669 2.6147C6.34669 1.31861 5.29599 0.268116 4.0005 0.268116C2.70421 0.268116 1.65391 1.31861 1.65391 2.6147C1.65391 3.9102 2.70421 4.96089 4.0005 4.96089ZM6.10787 7.13496C5.57674 6.62559 5.24048 5.91754 5.21592 5.13181C5.14264 5.12642 5.07016 5.12063 4.99548 5.12063H3.00452C1.34781 5.12063 0 6.46844 0 8.12495V10.5604L0.00618994 10.5979L0.173917 10.6508C1.44226 11.0468 2.57422 11.2293 3.55742 11.2868V10.5514C3.55782 8.93843 4.63487 7.57325 6.10787 7.13496Z" fill="#FAC755"/>
                                  </svg>
                              </div><span>10%</span></li>
                              <li><div className="mail-status mail_click">
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2.96391 5.30631C2.85416 4.93468 2.74879 4.56243 2.6696 4.20577C2.14894 3.89774 1.79477 3.33718 1.79477 2.68932C1.79477 1.71473 2.58729 0.922837 3.56126 0.922837C4.53522 0.922837 5.32774 1.71535 5.32774 2.68932C5.32774 2.82338 5.30966 2.95246 5.2816 3.07779C5.45058 3.45004 5.58713 3.86906 5.70685 4.29493C6.04356 3.84599 6.25058 3.29415 6.25058 2.68932C6.25058 1.20343 5.04715 0 3.56126 0C2.07536 0 0.872559 1.20343 0.872559 2.68932C0.872559 3.96882 1.76734 5.03445 2.96391 5.30631Z" fill="#C8D1D9"/>
                                  <path d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z" fill="#C8D1D9"/>
                                  </svg>
                              </div><span>60%</span></li>
                            </ul>
                          </div> */}
                      <div className="smartlist-buttons">
                        {
                          <>
                            {location?.state?.data == "edit" ? (
                              <Link className="btn btn-primary btn-bordered edit_list">
                                Edit
                              </Link>
                            ) : null}

                            <Link className="btn btn-primary btn-filled view">
                              View
                            </Link>
                          </>
                        }
                      </div>
                      {location?.state?.data != "edit" ? (
                        <div className="dlt_btn">
                          <button
                            onClick={(e) => setConfirmationPopup(true)}
                            // onClick={(e) => showConfirmationPopup(data.id)}
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
                <div className="smartlist_box_block">
                  <div className="smartlist-view email_box">
                    <div className="mail-box-content">
                      <h5>
                        SPC Title mote condi ment zcsum dolor nihibdolor masa
                        euismod pharta donec mas faucibus quisque
                      </h5>

                      <div className="mailbox-table">
                        <table>
                          <tbody>
                            <tr>
                              <th>Country</th>
                              <td>United Kingdom</td>
                            </tr>
                            <tr>
                              <th>Language</th>
                              <td>English</td>
                            </tr>
                            <tr>
                              <th>IBU</th>
                              <td>Hameatology</td>
                            </tr>
                            <tr>
                              <th>Product</th>
                              <td>Product name</td>
                            </tr>
                            <tr>
                              <th>Creation date</th>
                              <td>5 July,2022</td>
                            </tr>
                            <tr>
                              <th>Last edit</th>
                              <td>7 February 2023</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* <div className="mail-stats">
                            <ul>

                              <li><div className="mail-status smartlist_view">
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.65531 2.57856C10.3951 3.04241 10.9139 3.82733 11.0083 4.73845C11.31 4.87942 11.6449 4.96049 11.9999 4.96049C13.296 4.96049 14.3465 3.91 14.3465 2.6141C14.3465 1.31801 13.296 0.267517 11.9999 0.267517C10.7162 0.267916 9.67488 1.29964 9.65531 2.57856ZM8.11801 7.38316C9.4141 7.38316 10.4646 6.33246 10.4646 5.03657C10.4646 3.74067 9.4139 2.69018 8.11801 2.69018C6.82211 2.69018 5.77102 3.74087 5.77102 5.03677C5.77102 6.33266 6.82211 7.38316 8.11801 7.38316ZM9.11339 7.5431H7.12223C5.46552 7.5431 4.11771 8.89111 4.11771 10.5478V12.9829L4.1239 13.021L4.29163 13.0735C5.87266 13.5675 7.24622 13.7322 8.37679 13.7322C10.585 13.7322 11.8649 13.1027 11.9438 13.0625L12.1005 12.9833H12.1173V10.5478C12.1179 8.89111 10.7701 7.5431 9.11339 7.5431ZM12.9957 5.12063H11.0199C10.9985 5.91115 10.6611 6.62299 10.1273 7.13496C11.6 7.57285 12.6774 8.93843 12.6774 10.5514V11.3018C14.6282 11.2303 15.7524 10.6774 15.8265 10.6403L15.9832 10.5608H16V8.12495C16 6.46844 14.6522 5.12063 12.9957 5.12063ZM4.0005 4.96089C4.45955 4.96089 4.88666 4.82691 5.24847 4.59868C5.36348 3.8485 5.76563 3.19296 6.3401 2.74649C6.34249 2.70256 6.34669 2.65903 6.34669 2.6147C6.34669 1.31861 5.29599 0.268116 4.0005 0.268116C2.70421 0.268116 1.65391 1.31861 1.65391 2.6147C1.65391 3.9102 2.70421 4.96089 4.0005 4.96089ZM6.10787 7.13496C5.57674 6.62559 5.24048 5.91754 5.21592 5.13181C5.14264 5.12642 5.07016 5.12063 4.99548 5.12063H3.00452C1.34781 5.12063 0 6.46844 0 8.12495V10.5604L0.00618994 10.5979L0.173917 10.6508C1.44226 11.0468 2.57422 11.2293 3.55742 11.2868V10.5514C3.55782 8.93843 4.63487 7.57325 6.10787 7.13496Z" fill="#FAC755"/>
                                  </svg>
                              </div><span>10%</span></li>
                              <li><div className="mail-status mail_click">
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2.96391 5.30631C2.85416 4.93468 2.74879 4.56243 2.6696 4.20577C2.14894 3.89774 1.79477 3.33718 1.79477 2.68932C1.79477 1.71473 2.58729 0.922837 3.56126 0.922837C4.53522 0.922837 5.32774 1.71535 5.32774 2.68932C5.32774 2.82338 5.30966 2.95246 5.2816 3.07779C5.45058 3.45004 5.58713 3.86906 5.70685 4.29493C6.04356 3.84599 6.25058 3.29415 6.25058 2.68932C6.25058 1.20343 5.04715 0 3.56126 0C2.07536 0 0.872559 1.20343 0.872559 2.68932C0.872559 3.96882 1.76734 5.03445 2.96391 5.30631Z" fill="#C8D1D9"/>
                                  <path d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z" fill="#C8D1D9"/>
                                  </svg>
                              </div><span>60%</span></li>
                            </ul>
                          </div> */}
                      <div className="smartlist-buttons">
                        {
                          <>
                            {location?.state?.data == "edit" ? (
                              <Link className="btn btn-primary btn-bordered edit_list">
                                Edit
                              </Link>
                            ) : null}

                            <Link className="btn btn-primary btn-filled view">
                              View
                            </Link>
                          </>
                        }
                      </div>
                      {location?.state?.data != "edit" ? (
                        <div className="dlt_btn">
                          <button
                            onClick={(e) => setConfirmationPopup(true)}
                            // onClick={(e) => showConfirmationPopup(data.id)}
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
                <div className="smartlist_box_block">
                  <div className="smartlist-view email_box">
                    <div className="mail-box-content">
                      <h5>
                        SPC Title mote condi ment zcsum dolor nihibdolor masa
                        euismod pharta donec mas faucibus quisque
                      </h5>

                      <div className="mailbox-table">
                        <table>
                          <tbody>
                            <tr>
                              <th>Country</th>
                              <td>United Kingdom</td>
                            </tr>
                            <tr>
                              <th>Language</th>
                              <td>English</td>
                            </tr>
                            <tr>
                              <th>IBU</th>
                              <td>Hameatology</td>
                            </tr>
                            <tr>
                              <th>Product</th>
                              <td>Product name</td>
                            </tr>
                            <tr>
                              <th>Creation date</th>
                              <td>5 July,2022</td>
                            </tr>
                            <tr>
                              <th>Last edit</th>
                              <td>7 February 2023</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* <div className="mail-stats">
                            <ul>

                              <li><div className="mail-status smartlist_view">
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.65531 2.57856C10.3951 3.04241 10.9139 3.82733 11.0083 4.73845C11.31 4.87942 11.6449 4.96049 11.9999 4.96049C13.296 4.96049 14.3465 3.91 14.3465 2.6141C14.3465 1.31801 13.296 0.267517 11.9999 0.267517C10.7162 0.267916 9.67488 1.29964 9.65531 2.57856ZM8.11801 7.38316C9.4141 7.38316 10.4646 6.33246 10.4646 5.03657C10.4646 3.74067 9.4139 2.69018 8.11801 2.69018C6.82211 2.69018 5.77102 3.74087 5.77102 5.03677C5.77102 6.33266 6.82211 7.38316 8.11801 7.38316ZM9.11339 7.5431H7.12223C5.46552 7.5431 4.11771 8.89111 4.11771 10.5478V12.9829L4.1239 13.021L4.29163 13.0735C5.87266 13.5675 7.24622 13.7322 8.37679 13.7322C10.585 13.7322 11.8649 13.1027 11.9438 13.0625L12.1005 12.9833H12.1173V10.5478C12.1179 8.89111 10.7701 7.5431 9.11339 7.5431ZM12.9957 5.12063H11.0199C10.9985 5.91115 10.6611 6.62299 10.1273 7.13496C11.6 7.57285 12.6774 8.93843 12.6774 10.5514V11.3018C14.6282 11.2303 15.7524 10.6774 15.8265 10.6403L15.9832 10.5608H16V8.12495C16 6.46844 14.6522 5.12063 12.9957 5.12063ZM4.0005 4.96089C4.45955 4.96089 4.88666 4.82691 5.24847 4.59868C5.36348 3.8485 5.76563 3.19296 6.3401 2.74649C6.34249 2.70256 6.34669 2.65903 6.34669 2.6147C6.34669 1.31861 5.29599 0.268116 4.0005 0.268116C2.70421 0.268116 1.65391 1.31861 1.65391 2.6147C1.65391 3.9102 2.70421 4.96089 4.0005 4.96089ZM6.10787 7.13496C5.57674 6.62559 5.24048 5.91754 5.21592 5.13181C5.14264 5.12642 5.07016 5.12063 4.99548 5.12063H3.00452C1.34781 5.12063 0 6.46844 0 8.12495V10.5604L0.00618994 10.5979L0.173917 10.6508C1.44226 11.0468 2.57422 11.2293 3.55742 11.2868V10.5514C3.55782 8.93843 4.63487 7.57325 6.10787 7.13496Z" fill="#FAC755"/>
                                  </svg>
                              </div><span>10%</span></li>
                              <li><div className="mail-status mail_click">
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2.96391 5.30631C2.85416 4.93468 2.74879 4.56243 2.6696 4.20577C2.14894 3.89774 1.79477 3.33718 1.79477 2.68932C1.79477 1.71473 2.58729 0.922837 3.56126 0.922837C4.53522 0.922837 5.32774 1.71535 5.32774 2.68932C5.32774 2.82338 5.30966 2.95246 5.2816 3.07779C5.45058 3.45004 5.58713 3.86906 5.70685 4.29493C6.04356 3.84599 6.25058 3.29415 6.25058 2.68932C6.25058 1.20343 5.04715 0 3.56126 0C2.07536 0 0.872559 1.20343 0.872559 2.68932C0.872559 3.96882 1.76734 5.03445 2.96391 5.30631Z" fill="#C8D1D9"/>
                                  <path d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z" fill="#C8D1D9"/>
                                  </svg>
                              </div><span>60%</span></li>
                            </ul>
                          </div> */}
                      <div className="smartlist-buttons">
                        {
                          <>
                            {location?.state?.data == "edit" ? (
                              <Link className="btn btn-primary btn-bordered edit_list">
                                Edit
                              </Link>
                            ) : null}

                            <Link className="btn btn-primary btn-filled view">
                              View
                            </Link>
                          </>
                        }
                      </div>

                      {location?.state?.data != "edit" ? (
                        <div className="dlt_btn">
                          <button
                            onClick={(e) => setConfirmationPopup(true)}
                            // onClick={(e) => showConfirmationPopup(data.id)}
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="delete">
        <Modal
          className="modal send-confirm"
          id="delete-confirm"
          show={confirmationpopup}
        >
          <Modal.Header>
            {/* <Modal.Title>Heading Text</Modal.Title>*/}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={(e) => setConfirmationPopup(false)}
            ></button>
          </Modal.Header>

          <Modal.Body>
            <img src={path_image + "alert.png"} alt="" />
            <h4>
              The SPC be deleted from the list.
              <br />
              Are you sure you want to delete it?
            </h4>
            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                onClick={(e) => {
                  setConfirmationPopup(false);
                  popup_alert({
                    visible: "show",
                    message: "The SPC has been deleted <br />successfully !",
                    type: "success",
                    redirect: "",
                  });
                }}
              >
                Yes Please!
              </button>
              <button
                type="button"
                className="btn btn-primary btn-bordered light"
                onClick={(e) => setConfirmationPopup(false)}
              >
                Cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
export default SpcEdit;
