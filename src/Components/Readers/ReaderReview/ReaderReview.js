import React, { useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loader } from "../../../loader";
import { postData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { slice } from "@amcharts/amcharts4/.internal/core/utils/Array";

const ReaderReview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [field, setField] = useState([]);
  const [openNotes, setOpenNotes] = useState(false);
  const [readerData, setReaderData] = useState(
    typeof state?.data !== "undefined" ? state?.data : {}
  );
  const createUser = async () => {
    loader("show");
    try {
      await postData(ENDPOINT.READER_CREATE, readerData);
      loader("hide");
      navigate("/readers-view");
    } catch (err) {
      console.log(err);
      loader("hide");
    }
  };

  return (
    <Col className="right-sidebar custom-change">
      <div className="custom-container">
        <Row>
          <div className="page-top-nav sticky">
            <Row className="row justify-content-end align-items-center">
              <Col md="1">
                <div className="header-btn-left">
                  {/*<Link
                    className="btn btn-primary btn-bordered back-btn"
                    to="/readers-view"
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
                  </Link>*/}

                  {/* <button className="btn btn-primary btn-bordered back">
                      <Link to="/reader-add">Back</Link>
                    </button> */}
                </div>
              </Col>
              <Col md="9">
                <ul className="tabnav-link">
                  <li className="">
                    <a href="">{state?.flag ? "Edit " : "Create "} CRM</a>
                  </li>
                  <li className="active active-main">
                    <a href="">Review &amp; approve</a>
                  </li>
                </ul>
              </Col>
              <Col md="2">
                <div className="header-btn">
                  <Link
                    className="btn btn-primary btn-bordered move-draft"
                    to="/readers-view"
                  >
                    Close
                  </Link>
                  <Button
                    className="btn btn-primary btn-filled next send_btn"
                    onClick={createUser}
                  >
                    {state?.flag ? "Save " : "Create "}
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        
          {Object.keys(readerData).length > 0 ? (
            <div className="crm-detail">
              <div className="crm-detail-content">
                <h4>CRM Details</h4>
                <div className="crm-review">
                  <div className="crm-review-detail">
                    <table className="tab-mail-list">
                      <tr>
                        <th className="tab-content-title">First name</th>
                        <td>
                          {readerData?.firstName
                            ? readerData?.firstName
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Middle name</th>
                        <td>
                          {readerData?.middleName
                            ? readerData?.middleName
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Last name</th>
                        <td>
                          {readerData?.lastName ? readerData?.lastName : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Primary email </th>
                        <td>{readerData?.email ? readerData?.email : "N/A"}</td>
                      </tr>
                      {localStorage.getItem("user_id") ==
                      "56Ek4feL/1A8mZgIKQWEqg==" ? (
                        <>
                          <tr>
                            <th className="tab-content-title">
                              IRT mandatory training{" "}
                            </th>
                            <td>
                              {readerData?.irt || readerData?.irt == 0
                                ? readerData?.irt == 1 ||
                                  readerData?.irt == "Yes"
                                  ? "Yes"
                                  : readerData?.irt == 0 ||
                                    readerData?.irt == "No"
                                  ? "No"
                                  : "N/A"
                                : "N/A"}
                            </td>
                          </tr>
                          <tr></tr>
                        </>
                      ) : (
                        <>
                          <tr>
                            <th className="tab-content-title">
                              Alternative email{" "}
                            </th>
                            <td>
                              {readerData?.alternativeEmail
                                ? readerData?.alternativeEmail
                                : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th className="tab-content-title">
                              Primary phone{" "}
                            </th>
                            <td>
                              {readerData?.primary_phone !== "-informed-"
                                ? readerData?.primary_phone.replace(
                                    "-informed-",
                                    "-"
                                  )
                                : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th className="tab-content-title">
                              Alternative phone{" "}
                            </th>
                            <td>
                              {readerData?.alternativePhone
                                ? readerData?.alternativePhone
                                : "N/A"}
                            </td>
                          </tr>
                        </>
                      )}
                    </table>
                  </div>
                  <div className="crm-review-detail">
                    <table className="tab-mail-list">
                      <tr>
                        <th className="tab-content-title">Country </th>
                        <td>
                          {readerData?.country ? readerData?.country : "N/A"}
                        </td>
                      </tr>
                      {localStorage.getItem("user_id") ==
                      "56Ek4feL/1A8mZgIKQWEqg==" ? (
                        <>
                          <tr>
                            <th className="tab-content-title">IRT role</th>
                            <td>
                              {readerData?.role ? readerData?.role : "N/A"}
                            </td>
                          </tr>

                          <tr>
                            <th className="tab-content-title">Study role</th>
                            <td>
                              {readerData?.sub_role
                                ? readerData?.sub_role
                                : "N/A"}
                            </td>
                          </tr>

                          <tr>
                            <th className="tab-content-title">Blind type</th>
                            <td>
                              {readerData?.blind_type
                                ? readerData?.blind_type
                                    ?.charAt(0)
                                    ?.toUpperCase() +
                                  readerData?.blind_type?.slice(1)
                                :
                                 "N/A"}
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr>
                            <th className="tab-content-title">Province</th>
                            <td>
                              {readerData?.province
                                ? readerData?.province
                                : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th className="tab-content-title">Hospital</th>
                            <td>
                              {readerData?.hospital
                                ? readerData?.hospital
                                : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th className="tab-content-title">Title</th>
                            <td>
                              {readerData?.title ? readerData?.title : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th className="tab-content-title">Speciality</th>
                            <td>
                              {readerData?.speciality
                                ? readerData?.speciality
                                : "N/A"}
                            </td>
                          </tr>

                          <tr>
                            <th className="tab-content-title">Discipline</th>
                            <td>
                              {readerData?.discipline
                                ? readerData?.discipline
                                : "N/A"}
                            </td>
                          </tr>
                          {readerData?.ibu ? (
                            <tr>
                              <th className="tab-content-title">
                                Bussiness Unit
                              </th>
                              <td>
                                {readerData?.ibu ? readerData?.ibu : "N/A"}
                              </td>
                            </tr>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    </table>
                  </div>
                  <div className="crm-review-detail">
                    <table className="tab-mail-list">
                      {localStorage.getItem("user_id") ==
                      "56Ek4feL/1A8mZgIKQWEqg==" ? (
                        <>
                          <tr>
                            <th className="tab-content-title">Site number</th>
                            <td>
                              {readerData?.siteNumber &&
                              readerData?.siteNumber != 0
                                ? readerData?.siteNumber
                                : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th className="tab-content-title">Site name</th>
                            <td>
                              {readerData?.siteName
                                ? readerData?.siteName
                                : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th className="tab-content-title">Institution</th>
                            <td>
                              {readerData?.institute
                                ? readerData?.institute
                                : "N/A"}
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr>
                            <th className="tab-content-title">Product</th>
                            <td>
                              {readerData?.product
                                ? readerData?.product
                                : "N/A"}
                            </td>
                          </tr>
                          {readerData?.userType ? (
                            <tr>
                              <th className="tab-content-title">User Type</th>
                              <td>
                                {readerData?.userType
                                  ? readerData?.userType
                                  : "N/A"}
                              </td>
                            </tr>
                          ) : null}
                          <tr>
                            <th className="tab-content-title">Interest area</th>
                            <td>
                              {readerData?.interestArea
                                ? readerData?.interestArea
                                : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th className="tab-content-title">Rep contact</th>
                            <td>
                              {readerData?.repContact
                                ? readerData?.repContact
                                : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th className="tab-content-title">Notes</th>
                            <td>
                              {readerData?.notes
                                ? readerData?.notes.trim().length > 100
                                  ? readerData?.notes?.substring(0, 100)
                                  : readerData?.notes.trim()
                                : "N/A"}
                              <Collapse in={openNotes}>
                                <div id="collapse-text-view">
                                  {readerData?.notes
                                    ? readerData?.notes?.trim()
                                    : ""}
                                </div>
                              </Collapse>
                              {readerData?.notes ? (
                                readerData?.notes?.trim().length > 100 ? (
                                  <span
                                    className="show_more"
                                    onClick={() => setOpenNotes(!openNotes)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={openNotes}
                                  >
                                    ...
                                  </span>
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        </>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="no_found">
              <p>No Data found</p>
            </div>
          )}
        </Row>
      </div>
    </Col>
  );
};

export default ReaderReview;
