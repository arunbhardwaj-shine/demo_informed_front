import React from "react";
import Select from "react-select";
import { Form, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
// import Placeholder from "react-select/dist/declarations/src/components/Placeholder";
const today = new Date();

const LibraryCreateUser = () => {
  // const {
  //   values,
  //   setFieldValue,
  //   setFieldTouched
  // } = props;

  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
            <div className="page-top-nav">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    <button className="btn btn-primary btn-bordered back">
                      <Link to="/EmailArticleSelect">Back</Link>
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">
                    <li className="active active-main">
                      <a href="">Create Your Content</a>
                    </li>
                    <li className="">
                      <a href="">Edit Consent Option</a>
                    </li>
                    <li className="">
                      <a href="">Approve Your Content &amp; Publish</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <button
                      className="btn btn-primary btn-bordered move-draft"
                      // onClick={saveAsDraft}
                    >
                      Cancel
                    </button>

                    <button className="btn btn-primary btn-filled next">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-change-content">
              <div className="form_action">
                <h4>Who is involved</h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="">Company</label>
                        <input type="text" className="form-control"/>
                      </div>
                      <div className="form-group">
                        <label for="">Country</label>
                        <Select className="dropdown-basic-button split-button-dropup" isClearable />
                      </div>
                     <div className="form-group">
                      <label for="">Client product</label>
                      <input type="text" className="form-control"/>
                     </div>
                     <div className="form-group">
                        <label for="">Production</label>
                        <Select
                          className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                          isClearable />
                     </div>
                    <div className="form-group">
                      <label for="">Sales</label>
                      <Select
                        className="dropdown-basic-button split-button-dropup edit-sales-dropdown"
                        isClearable />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-end right-change">
                        <div className="form-group justify-content-end">
                           <label for="">Reseller</label>
                            <div className="form-check-group">
                              <div className="form-check">
                                <input className="form-check-input" name="group1" value="" id="flexCheckDefault" type="radio" />
                                <label className="form-check-label" for="flexCheckDefault">N/A</label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" name="group1" value="" id="flexCheckReseller" type="radio" />
                                <label className="form-check-label" for="flexCheckReseller">Reseller Name</label>
                              </div>
                              <div className="form-check">
                              <input className="form-check-input" name="group1" value="" id="flexCheckReseller1" type="radio" />
                                  <label className="form-check-label" for="flexCheckReseller1">Reseller Name</label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" name="group1" value="" id="flexCheckReseller2" type="radio" />
                                <label className="form-check-label" for="flexCheckReseller2">Reseller Name</label>
                              </div>
                            </div>
                        </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-change-content">
              <div className="form_action">
                <h4>Limits agreed</h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label for="">Cost centre</label>
                      <Select
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                    </div>
                     <div className="form-group">
                      <label for="">Expiration date</label>
                      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                    <div className="form-group">
                      <label for="">Set limit of usage</label>
                      <input
                        type="text"
                        className="form-control"/>
                    </div>
                    <div className="form-group">
                       <label for="">Enable</label>
                       <fieldset id="group2">
                        <input type="checkbox" value="value1" name="group2" id="limitagreed1"/><label for="limitagreed1">Print</label>
                        <input type="checkbox" value="value2" name="group2" id="limitagreed2"/><label for="limitagreed2">Download</label>
                        <input type="checkbox" value="value3" name="group2" id="limitagreed3"/><label for="limitagreed3">Share</label>
                      </fieldset>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-end right-change">
                        <div className="form-group justify-content-end">
                          <label for="">Invoice notes</label>
                          <textarea class="form-control" id="formControlTextarea" rows="3"></textarea>
                        </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-change-content">
              <div className="form_action">
                <h4>Creating the eprint</h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label for="">Content title *</label>
                        <input type="text" className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <label for="">Journal title</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label for="">Author</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label for="">ePrint type *</label>
                      <Select
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Upload PDF</label>
                      <div class="upload-file-box">
                        <div class="box">
                          <input
                            type="file"
                            name="file-6[]"
                            id="file-6"
                            class="inputfile inputfile-6"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                              <label for="file-6">
                                <span>Choose Your File</span>
                              </label>
                              <p>Upload your PDF</p>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="">Upload PDF</label>
                      <div class="upload-file-box">
                        <div class="box">
                          <input
                            type="file"
                            name="file-5[]"
                            id="file-5"
                            class="inputfile inputfile-5"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            />
                              <label for="file-5">
                                <span>Choose Your File</span>
                              </label>
                              <p>Upload your cover image
                                <br/><span>(Recommended size 00 X 00)</span>
                              </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-end right-change">
                    <div className="form-group justify-content-end">
                      <label for="">Production notes to Docintel team</label>
                      <textarea class="form-control" id="formControlTextarea" rows="5"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LibraryCreateUser;
