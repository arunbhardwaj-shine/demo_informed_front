
import React, { useState } from 'react'
import { Col, Dropdown, DropdownButton, Form, Modal, Row } from 'react-bootstrap';
import {Link } from 'react-router-dom';

const ReaderReview = () => {
  const [field, setField] = useState([]);
  return (
   <Col className="col right-sidebar">
      <div className="custom-container">
         <Row>
          <div className="page-top-nav">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    <button className="btn btn-primary btn-bordered back">
                      <Link to="/reader-add">Back</Link>
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">
                    <li className="">
                      <a href="">Create CRM</a>
                    </li>
                    <li className="active active-main">
                      <a href="">Review &amp; approve</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <Link
                    className="btn btn-primary btn-bordered move-draft"
                    to="/reader-view"
                    >
                      Cancel
                    </Link>
                    <button
                      className="btn btn-primary btn-filled next send_btn">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="crm-detail">
                <div className="crm-detail-content">
                  <h4>CRM Details</h4>
                  <div className="crm-review">
                    <div className="crm-review-detail">
                      <ul class="tab-mail-list">
                        <li>
                          <h6 class="tab-content-title">First name</h6>
                          <h6>User first name</h6>
                        </li>
                        <li>
                          <h6 class="tab-content-title">Middle name</h6>
                          <h6>User middle name</h6>
                        </li>
                        <li>
                          <h6 class="tab-content-title">Last name</h6>
                          <h6>User last name</h6>
                        </li>
                        <li>
                          <h6 class="tab-content-title">Primary email </h6>
                          <h6>example@gmail.com</h6>
                        </li>
                        <li>
                          <h6 class="tab-content-title">Alternative email </h6>
                          <h6>example@gmail.com</h6>
                        </li>
                        <li>
                          <h6 class="tab-content-title">Primary phone </h6>
                          <h6>+000 000000000</h6>
                        </li>
                        <li>
                          <h6 class="tab-content-title">Alternative phone </h6>
                          <h6>+000 000000000</h6>
                        </li>
                      </ul>
                    </div>
                     <div className="crm-review-detail">
                      <ul class="tab-mail-list">
                        <li>
                          <h6 class="tab-content-title">Country </h6>
                          <h6>United Kingdom</h6>
                        </li>
                        <li>
                          <h6 class="tab-content-title">Province</h6>
                          <h6>Province name</h6>
                        </li>
                        <li>
                          <h6 class="tab-content-title">Hospital</h6>
                          <h6>Hospital name</h6>
                        </li>
                        <li>
                          <h6 class="tab-content-title">Title</h6>
                          <h6>User title</h6>
                        </li>
                        <li>
                          <h6 class="tab-content-title">Speciality</h6>
                          <h6>User speciality</h6>
                        </li>
                        <li>
                          <h6 class="tab-content-title">Discipline</h6>
                          <h6>User Discipline</h6>
                        </li>
                      </ul>
                    </div>
                    <div className="crm-review-detail">
                       <ul class="tab-mail-list">
                        <li>
                          <h6 class="tab-content-title">Product</h6>
                          <h6>Product name</h6>
                        </li>
                        <li>
                          <h6 class="tab-content-title">Interest area</h6>
                          <h6>Interest area</h6>
                        </li>
                        <li>
                          <h6 class="tab-content-title">Rep contact</h6>
                          <h6>Rep name</h6>
                        </li>
                        <li>
                          <h6 class="tab-content-title">Notes</h6>
                          <h6>Condi ment zcsum dolor nibhdolor masa euismod phartra donec mas faucibus quisque nuneque ipsum</h6>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
            </div>
        </Row>

      </div>

    </Col>
  )
}

export default ReaderReview;
