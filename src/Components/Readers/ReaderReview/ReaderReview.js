
import React, { useState } from 'react'
import { Button, Col, Dropdown, DropdownButton, Form, Modal, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loader } from "../../../loader";
import { postData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";

const ReaderReview = () => {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const [field, setField] = useState([]);
  const [readerData, setReaderData] = useState(
    typeof state?.data !== "undefined" ? state?.data : {}
  );

  const createUser = async() => {
    loader("show");
    try{
      await postData(ENDPOINT.READER_CREATE, readerData);
      loader("hide");
      navigate("/readers-view");
    }catch(err){
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
                    <button className="btn btn-primary btn-bordered back">
                      <Link to="/reader-add">Back</Link>
                    </button>
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
                    <Link
                    className="btn btn-primary btn-bordered move-draft"
                    to="/readers-view"
                    >
                      Cancel
                    </Link>
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
            {
              Object.keys(readerData).length > 0
              ?
              <div className="crm-detail">
                  <div className="crm-detail-content">
                    <h4>CRM Details</h4>
                    <div className="crm-review">
                      <div className="crm-review-detail">
                        <ul className="tab-mail-list">
                          <li>
                            <h6 className="tab-content-title">First name</h6>
                            <h6>{readerData?.firstName ? readerData?.firstName : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">Middle name</h6>
                            <h6>{readerData?.middleName ? readerData?.middleName : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">Last name</h6>
                            <h6>{readerData?.lastName ? readerData?.lastName : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">Primary email </h6>
                            <h6>{readerData?.email ? readerData?.email : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">Alternative email </h6>
                            <h6>{readerData?.alternativeEmail ? readerData?.alternativeEmail : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">Primary phone </h6>
                            <h6>{readerData?.primary_phone ? readerData?.primary_phone : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">Alternative phone </h6>
                            <h6>{readerData?.primary_phone ? readerData?.primary_phone : "N/A"}</h6>
                          </li>
                        </ul>
                      </div>
                       <div className="crm-review-detail">
                        <ul className="tab-mail-list">
                          <li>
                            <h6 className="tab-content-title">Country </h6>
                            <h6>{readerData?.country ? readerData?.country : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">Province</h6>
                            <h6>{readerData?.province ? readerData?.province : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">Hospital</h6>
                            <h6>{readerData?.hospital ? readerData?.hospital : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">Title</h6>
                            <h6>{readerData?.title ? readerData?.title : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">Speciality</h6>
                            <h6>{readerData?.speciality ? readerData?.speciality : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">Discipline</h6>
                            <h6>{readerData?.discipline ? readerData?.discipline : "N/A"}</h6>
                          </li>
                        </ul>
                      </div>
                      <div className="crm-review-detail">
                         <ul className="tab-mail-list">
                          <li>
                            <h6 className="tab-content-title">Product</h6>
                            <h6>{readerData?.product ? readerData?.product : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">Interest area</h6>
                            <h6>{readerData?.interestArea ? readerData?.interestArea : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">Rep contact</h6>
                            <h6>{readerData?.repContact ? readerData?.repContact : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">Notes</h6>
                            <h6>
                            {readerData?.notes ? readerData?.notes : "N/A"}
                            </h6>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
              </div>
              :
              <div className="no_found">
                <p>No Data found</p>
              </div>
            }

        </Row>

      </div>

    </Col>
  )
}

export default ReaderReview;
