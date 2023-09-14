import React, { useEffect, useState } from "react";
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

const MarketingReaderReview = () => {
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
      if (localStorage.getItem("user_id") == "90VIqoM675WT4/peSRnbSQ==") {
        await postData(ENDPOINT.CREATE_MARKETING_READER, readerData);
      } else {
        await postData(ENDPOINT.READER_CREATE, readerData);
      }

      loader("hide");
      navigate("/readers-view");
    } catch (err) {
      console.log(err);
      loader("hide");
    }
  };
  useEffect(() => {
    console.log("reader-->", readerData);
  }, []);

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
                        <th className="tab-content-title">Job title</th>
                        <td>
                          {readerData?.jobTitle ? readerData?.jobTitle : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Title</th>
                        <td>{readerData?.title ? readerData?.title : "N/A"}</td>
                      </tr>
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
                      <tr>
                        <th className="tab-content-title">LinkedIn </th>
                        <td>
                          {readerData?.linkedIn ? readerData?.linkedIn : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Prospect</th>
                        <td>
                          {readerData?.prospect ? readerData?.prospect : "N/A"}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className="crm-review-detail">
                    <table className="tab-mail-list">
                      <tr>
                        <th className="tab-content-title">
                          Contact ownership{" "}
                        </th>
                        <td>
                          {readerData?.contact_ownership
                            ? readerData?.contact_ownership
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Type of contact </th>
                        <td>
                          {readerData?.type_of_contact?.length
                            ? readerData?.type_of_contact?.map((item) => {
                                return (
                                  <>
                                    {item}
                                    {","}
                                  </>
                                );
                              })
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Customer type </th>
                        <td>
                          {readerData?.customerType
                            ? readerData?.customerType
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Company name </th>
                        <td>
                          {readerData?.company_name
                            ? readerData?.company_name
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Country </th>
                        <td>
                          {readerData?.country ? readerData?.country : "N/A"}
                        </td>
                      </tr>

                      <tr>
                        <th className="tab-content-title">Company website</th>
                        <td>
                          {readerData?.company_website
                            ? readerData?.company_website
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Company product</th>
                        <td>
                          {readerData?.company_product
                            ? readerData?.company_product
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">
                          Company therapy area
                        </th>
                        <td>
                          {readerData?.company_therapy_area
                            ? readerData?.company_therapy_area
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">
                          Local/International
                        </th>
                        <td>{readerData?.local ? readerData?.local : "N/A"}</td>
                      </tr>

                      <tr>
                        <th className="tab-content-title">Address</th>
                        <td>
                          {readerData?.address ? readerData?.address : "N/A"}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className="crm-review-detail">
                    <table className="tab-mail-list">
                      <tr>
                        <th className="tab-content-title">Log activity</th>
                        <td>
                          {readerData?.log_activity
                            ? readerData?.log_activity
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Task</th>
                        <td>{readerData?.task ? readerData?.task : "N/A"}</td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Next contact</th>
                        <td>
                          {readerData?.next_contact
                            ? readerData?.next_contact?.toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Title</th>
                        <td>
                          {readerData?.opportunity_title
                            ? readerData?.opportunity_title
                            : "N/A"}
                        </td>
                      </tr>

                      <tr>
                        <th className="tab-content-title">Our Product</th>
                        <td>
                          {readerData?.our_product
                            ? readerData?.our_product
                            : "N/A"}
                        </td>
                      </tr>

                      <tr>
                        <th className="tab-content-title">Contact total</th>
                        <td>
                          {readerData?.contact_total
                            ? readerData?.contact_total
                            : "N/A"}
                        </td>
                      </tr>

                      <tr>
                        <th className="tab-content-title">Pipeline Stage</th>
                        <td>
                          {readerData?.pipeline ? readerData?.pipeline : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Value</th>
                        <td>
                          {readerData?.opportunity_value
                            ? readerData?.opportunity_value
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Probability %</th>
                        <td>
                          {readerData?.probability
                            ? readerData?.probability
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Weighted value</th>
                        <td>
                          {readerData?.weighted_value
                            ? readerData?.weighted_value
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th className="tab-content-title">Quote Sent</th>
                        <td>
                          {readerData?.quote_sent == true
                            ? "Yes"
                            : readerData?.quote_sent == false
                            ? "No"
                            : "N/A"}
                        </td>
                      </tr>

                      <tr>
                        <th className="tab-content-title">Quote valid until</th>
                        <td>
                          {readerData?.quote_valid
                            ? readerData?.quote_valid?.toLocaleDateString()
                            : "N/A"}
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

export default MarketingReaderReview;
