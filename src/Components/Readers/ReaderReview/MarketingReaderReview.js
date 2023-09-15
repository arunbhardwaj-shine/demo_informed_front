import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { loader } from "../../../loader";
import { postData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";

const MarketingReaderReview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [field, setField] = useState([]);
  const [openNotes, setOpenNotes] = useState(false);
  const [readerData, setReaderData] = useState(
    typeof state?.data !== "undefined" ? state?.data : {}
  );
  const [flag,setFlag]= useState(
    typeof state?.flag !== "undefined" ? state?.flag : {}
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
                <div className="header-btn-left"></div>
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
                          {/* {Object.keys(readerData?.primary_phone)?.length
                            ? ` ${readerData?.primary_phone?.cc} - ${readerData?.primary_phone?.ph}`
                            : "N/A"} */}
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
                    </table>
                  </div>
                  <div className="crm-review-detail">
                    <table className="tab-mail-list">
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
                          {Object.keys(readerData?.address)?.length
                            ? Object.keys(readerData?.address)?.map((item) => {
                                return (
                                  <>
                                    {readerData?.address[item]
                                      ? `${readerData?.address[item]},`
                                      : null}
                                  </>
                                );
                              })
                            : "N/A"}
                        </td>
                      </tr>
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
                    </table>
                  </div>
                  <div className="crm-review-detail">
                    <table className="tab-mail-list">
                      <tr>
                        <th className="tab-content-title">Next contact</th>
                        {flag==1?
                         <td>
                         {readerData?.next_contact
                           ? readerData?.next_contact
                           : "N/A"}
                       </td>
                        :
                        <td>
                        {readerData?.next_contact
                          ? readerData?.next_contact?.toLocaleDateString()
                          : "N/A"}
                      </td>
                        }
                       
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
                      {/* <tr>
                        <th className="tab-content-title">Quote Update</th>
                        <td>
                          {readerData?.quote_update
                            ? readerData?.quote_update?.toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr> */}
{flag==1?
 <tr>
 <th className="tab-content-title">Quote valid until</th>
 <td>
   {readerData?.quote_valid 
     ? readerData?.quote_valid
     :
      "N/A"}
 </td>
</tr>
:
<tr>
 <th className="tab-content-title">Quote valid until</th>
 <td>
   {readerData?.quote_valid 
     ? readerData?.quote_valid?.toLocaleDateString()
     :
      "N/A"}
 </td>
</tr>
}
                      {/* <tr>
                        <th className="tab-content-title">Quote valid until</th>
                        <td>
                          {readerData?.quote_valid 
                            ? readerData?.quote_valid?.toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr> */}
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
