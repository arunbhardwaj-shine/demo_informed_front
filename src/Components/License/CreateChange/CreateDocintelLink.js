import React from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const CreateDocintelLink = () => {
  const [startDate, setStartDate] = useState(new Date());
  console.log("in create docintel link");
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

                    <button
                      className="btn btn-primary btn-filled next"
                      //   onClick={nextButtonClicked}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-change-content">
              <div className="form_action">
                <h4>About the Docintel link you're making</h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="">Category</label>
                      <Select
                        // options={countryAll}
                        // onChange={(event) => onCountryChange(event)}
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                      {/* {error?.country ? (
                        <div className="login-validation">{error?.country}</div>
                      ) : null} */}
                    </div>

                    <div className="form-group">
                      <label htmlFor="">Format</label>
                      <Select
                        //options={productionAll}
                        // onChange={(event) => onProductionChange(event)}
                        className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                        isClearable
                      />
                      {/* {error?.production ? (
                        <div className="login-validation">
                          {error?.production}
                        </div>
                      ) : null} */}
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Product</label>
                      <Select
                        // options={salesAll}
                        // onChange={(event) => onSalesChange(event)}
                        className="dropdown-basic-button split-button-dropup edit-sales-dropdown"
                        isClearable
                      />
                      {/* {error?.sales ? (
                        <div className="login-validation">{error?.sales}</div>
                      ) : null} */}
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Business Unit</label>
                      <Select
                        // options={salesAll}
                        // onChange={(event) => onSalesChange(event)}
                        className="dropdown-basic-button split-button-dropup edit-sales-dropdown"
                        isClearable
                      />
                      {/* {error?.sales ? (
                        <div className="login-validation">{error?.sales}</div>
                      ) : null} */}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex justify-content-end align-items-end right-change">
                    <div className="form-group justify-content-end">
                      <label htmlFor="">Reseller</label>
                      <div className="form-check-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            value=""
                            id="flexCheckDefault"
                            type="checkbox"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            N/A
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            value=""
                            id="flexCheckReseller"
                            type="checkbox"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckReseller"
                          >
                            Reseller Name
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            value=""
                            id="flexCheckReseller1"
                            type="checkbox"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckReseller1"
                          >
                            Reseller Name
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            value=""
                            id="flexCheckReseller2"
                            type="checkbox"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckReseller2"
                          >
                            Reseller Name
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="create-change-content">
              <div className="form_action">
                <h4>Creating the Docintel Link</h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group val">
                      <label htmlFor="">Content title *</label>
                      <input
                        type="text"
                        className="form-control"
                        //  onChange={(e) => contentTitleChanged(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Sub title</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Author</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group val">
                      <label htmlFor="">Enable</label>
                      <Select
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                    </div>
                    <div className="form-group val">
                      <label htmlFor="">Docintel type</label>
                      <Select
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                    </div>
                    <div className="form-group val">
                      <label htmlFor="">Upload PDF</label>
                      <div className="upload-file-box">
                        <div className="box">
                          <input
                            type="file"
                            name="file-6[]"
                            id="file-6"
                            className="inputfile inputfile-6"
                            accept=".doc .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            //   onChange={(e) => handleFileChange(e)}
                          />
                          <label htmlFor="file-6">
                            <span>Choose Your File</span>
                          </label>
                          <p>Upload your PDF</p>
                        </div>
                      </div>
                    </div>
                    <div className="form-group val">
                      <label htmlFor="">Upload Cover Image</label>
                      <div className="upload-file-box">
                        <div className="box">
                          <input
                            type="file"
                            name="file-5[]"
                            id="file-5"
                            className="inputfile inputfile-5"
                            accept="image/png, image/jpeg"
                            //   onChange={handleImageChange}
                          />
                          <label htmlFor="file-5">
                            <span>Choose Your File</span>
                          </label>
                          <p>
                            Upload your cover image
                            <br />
                            <span>(Recommended size 00 X 00)</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex justify-content-end align-items-end right-change">
                    <div className="form-group justify-content-end">
                      <label htmlFor="">
                        Production notes to Docintel team
                      </label>
                      <textarea
                        className="form-control"
                        id="formControlTextarea"
                        rows="5"
                      ></textarea>
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
export default CreateDocintelLink;
