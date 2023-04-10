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

const ReaderReview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [field, setField] = useState([]);
  const [openNotes, setOpenNotes] = useState(false);
  const [readerData, setReaderData] = useState(
    typeof state?.data !== "undefined" ? state?.data : {}
  );
  console.log("reader Data", readerData);

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
    <Col className="col right-sidebar">
      <div className="custom-container">
        <Row>
          <div className="page-top-nav">
            <Row className="row justify-content-end align-items-center">
              <Col md="1">
                <div className="header-btn-left">
                  <Link
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
                  </Link>
                  {/* <button className="btn btn-primary btn-bordered back">
                      <Link to="/reader-add">Back</Link>
                    </button> */}
                </div>
              </Col>
              <Col md="9">
                <ul className="tabnav-link">
                  <li className="">
                    <a href="">Create CRM</a>
                  </li>
                  <li className="active active-main">
                    <a href="">Review &amp; approve</a>
                  </li>
                </ul>
              </Col>
              <Col md="2">
                <div className="header-btn">
                  {/* <Link
                    className="btn btn-primary btn-bordered move-draft"
                    to="/readers-view"
                    >
                      Cancel
                    </Link> */}
                  <Button
                    className="btn btn-primary btn-filled next send_btn"
                    onClick={createUser}
                  >
                    Create
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
                        <th className="tab-content-title">Primary phone </th>
                        <td>
                          {readerData?.country_Code
                            ? readerData?.country_Code
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
                      {readerData?.province ? (
                        <tr>
                          <th className="tab-content-title">Province</th>
                          <td>
                            {readerData?.province
                              ? readerData?.province
                              : "N/A"}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}
                      <tr>
                        <th className="tab-content-title">Hospital</th>
                        <td>
                          {readerData?.hospital ? readerData?.hospital : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Title</th>
                        <td>{readerData?.title ? readerData?.title : "N/A"}</td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Speciality</th>
                        <td>
                          {readerData?.speciality
                            ? readerData?.speciality
                            : "N/A"}
                        </td>
                      </tr>
                      {readerData?.discipline ? (
                        <tr>
                          <th className="tab-content-title">Discipline</th>
                          <td>
                            {readerData?.discipline
                              ? readerData?.discipline
                              : "N/A"}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}
                      {readerData?.ibu ? (
                        <tr>
                          <th className="tab-content-title">Bussiness Unit</th>
                          <td>{readerData?.ibu ? readerData?.ibu : "N/A"}</td>
                        </tr>
                      ) : (
                        ""
                      )}
                    </table>
                  </div>
                  <div className="crm-review-detail">
                    <table className="tab-mail-list">
                      <tr>
                        <th className="tab-content-title">Product</th>
                        <td>
                          {readerData?.product ? readerData?.product : "N/A"}
                        </td>
                      </tr>
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
