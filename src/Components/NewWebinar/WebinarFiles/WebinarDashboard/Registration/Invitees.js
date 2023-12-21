import React, { useState, useEffect } from "react";
import { Button, Col, Modal } from "react-bootstrap";
import Select from "react-select";
import ConfirmationModal from "../../../../../Model/ConfirmationModel";
import CommonConfirmModel from "../../../../../Model/CommonConfirmModel";
import { popup_alert } from "../../../../../popup_alert";
import { loader } from "../../../../../loader";

const Invitees = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [userTypeOptions, setUserTypeOptions] = useState([
    { label: "HCP", value: "HCP" },
    { label: "Staff user", value: "Staff user" },
    { label: "Test user", value: "Test user" }
  ])

  const [userData, setUserData] = useState()
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [clickUserId, setClickUserId] = useState(0);

  useEffect(() => {
    getWebinarData();
  }, [])

  const getWebinarData = async () => {
    setUserData(tableData)
  }

  var tableData = [
    {
      Name: "UserName1",
      Email: "Username1@gmail.com",
      Country: "India",
      Registered: "12.19.2023",
      "Last Email": "Invite Email",
      user_type: "HCP"
    },

    {
      Name: "UserName2",
      Email: "Username2@gmail.com",
      Country: "USA",
      Registered: "12.20.2023",
      "Last Email": "Confirmation Email",
      user_type: "Staff user"

    },

    {
      Name: "UserName3",
      Email: "Username3@gmail.com",
      Country: "Canada",
      Registered: "12.21.2023",
      "Last Email": "Welcome Email",
      user_type: "Test user"

    },

    {
      Name: "UserName4",
      Email: "Username4@gmail.com",
      Country: "Canada",
      Registered: "12.21.2023",
      "Last Email": "Welcome Email",
      user_type: "HCP"

    },
  ];

  const handleChange = (e, user, index) => {
    let updateUserData = [...userData]

    let updateUser = { ...updateUserData[index] }
    updateUser.user_type = e?.value
    updateUserData[index] = updateUser
    setUserData(updateUserData)
  }

  const saveUserClicked = async (e, user) => {
    console.log("save user--->", user?.user_type)
  }

  const userEmailClicked = (e, user) => {
    console.log("email clicked-->", user?.Email)
  }

  const userBlockedClicked = (e, user) => {
    console.log("user blocked--->", user)
  }

  const handleConfirmModel = async (id) => {
    console.log("delete-->", id)
    setConfirmationPopup(false);

    try {
      loader("show");
      // await deleteMethod(`${ENDPOINT.SPC_PRO_DELETE}${id}`);
      loader("hide");
      setClickUserId(0);
      getWebinarData();
      popup_alert({
        visible: "show",
        message: "Your user has been deleted <br />successfully !",
        type: "success",
        redirect: "",
      });
    } catch (err) {
      console.log("--err", err);
      loader("hide");
    }
  };
  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="top-header regi-web">
              <div className="page-title">
                <h2>Invitees</h2>
              </div>
            </div>

            <div className="page-top-nav smart_list_names sticky">
              <div className="d-flex justify-content-between align-items-center add-padding">
                <div className="d-flex event-select align-items-center">
                  <label htmlFor="">Total Registrations</label>
                </div>
                <div className="search-bar">
                  <form
                    className="d-flex"
                  // onSubmit={(e) => submitSearchHandler(e)}
                  >
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Search by title"
                      aria-label="Search"
                      id="email_search"
                    //   onChange={(e) => searchChange(e)}
                    />
                    <button className="btn-outline-success" type="submit">
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
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <table className="table" id="table-to-xls">
                    <thead className="sticky-header">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Country</th>
                        <th scope="col">Registered</th>
                        <th scope="col">Last Email</th>
                        <th scope="col">User Type</th>
                      </tr>
                    </thead>

                    <tbody className="form-group">
                      {userData?.map((user, index) => (
                        <tr key={index}>
                          <td>{user?.Name}</td>
                          <td>{user?.Email}</td>
                          <td>{user?.Country}</td>
                          <td>{user?.Registered}</td>
                          <td>{user["Last Email"]}</td>
                          <td>
                            <tr>
                              <td>
                                <Select
                                  className="dropdown-basic-button split-button-dropup"
                                  options={userTypeOptions}
                                  placeholder="Select user type"
                                  value={userTypeOptions?.findIndex((item, i) => item?.value == user?.user_type) != -1 ?
                                    userTypeOptions[userTypeOptions?.findIndex((item, i) => item?.value == user?.user_type)]
                                    : ""
                                  }
                                  onChange={(e) => handleChange(e, user, index)}
                                />

                              </td>
                              <td>
                                <Button
                                  style={{ marginLeft: "10px" }}
                                  onClick={(e) => saveUserClicked(e, user)}
                                >
                                  Save
                                </Button>
                              </td>
                              <td>
                                <div className="clear-search">
                                  <button
                                    // style={{ marginLeft: "10px" }}
                                    className="btn-webinar"
                                    onClick={(e) => userEmailClicked(e, user)}
                                  >
                                    <img
                                      title="Email"
                                      src={path_image + "email-icon1.svg"}
                                      alt="Email"
                                    />
                                  </button>
                                </div>
                              </td>
                              <td>
                                <div className="clear-search">
                                  <button
                                    // style={{ marginLeft: "10px" }}
                                    className="btn-webinar"
                                    onClick={(e) => userBlockedClicked(e, user)}
                                  >
                                    <img
                                      title="Email"
                                      src={path_image + "user-blocked.svg"}
                                      alt="Email"
                                    />
                                  </button>
                                </div>
                              </td>
                              <td>
                                <div className="clear-search">
                                  <button
                                    className="btn btn-outline-primary"
                                    onClick={() => {
                                      setConfirmationPopup(true);
                                      setClickUserId(index);
                                    }}
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                                        fill="#0066BE"
                                      />
                                      <path
                                        d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                                        fill="#0066BE"
                                      />
                                      <path
                                        d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                                        fill="#0066BE"
                                      />
                                      <path
                                        d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                                        fill="#0066BE"
                                      />
                                      <path
                                        d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                                        fill="#0066BE"
                                      />
                                      <path
                                        d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                                        fill="#0066BE"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Col>
      {/* <Modal
        className="modal send-confirm"
        id="delete-confirm"
      // show={showModalPreview}
      // onHide={handleCloseModal}
      >
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
          // onClick={handleCloseModal}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <>
            <img src={path_image + "alert.png"} alt="" />
            <h4>The delete user will no longer access to One Source.</h4>
            <span>Are you sure you want to delete it?</span>
            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-bordered"
              // onClick={handleCloseModal}
              >
                Yes Please!
              </button>
              <button
                type="button"
                className="btn btn-primary btn-bordered"
              // onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </>
        </Modal.Body>
      </Modal> */}

      {/* <Modal
        className="modal send-confirm"
      // id="delete-confirm"
      // show={showModalPreview}
      // onHide={handleCloseModal}
      >
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
          // onClick={handleCloseModal}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <>
            <img src={path_image + "alert.png"} alt="" />
            <h4>The user has been deleted successfully!</h4>
            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-bordered"
              // onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </>
        </Modal.Body>
      </Modal> */}
      <CommonConfirmModel
        show={confirmationpopup}
        onClose={setConfirmationPopup}
        fun={handleConfirmModel}
        resetDataId={clickUserId}
        popupMessage={{
          message1: "You are about to remove this user forever.",
          message2: "Are you sure you want to do this?",
          footerButton: " Yes please!",
        }}
        path_image={path_image}
      />
    </>
  );
};

export default Invitees;
