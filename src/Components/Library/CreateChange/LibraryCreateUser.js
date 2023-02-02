import React from "react";
import Select from "react-select";
import { Form, Link } from "react-router-dom";

const LibraryCreateUser = () => {
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
                      <a href="">Approve Your Content & Publish</a>
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
                      <input
                        type="text"
                        className="form-control"
                        //onChange={(event) => onFirstNameChange(event, i)}
                        //value={val.firstname}
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Country</label>
                      <Select
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                    </div>
                     <div className="form-group">
                      <label for="">Client product</label>
                      <input
                        type="text"
                        className="form-control"/>
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
                  <div className="col-12 col-md-6 d-flex align-items-end">
                        <div className="form-group">
                           <label for="">Reseller</label>
                            <div className="form-check-group">
                              <div className="form-check">
                                <input className="form-check-input" value="" id="flexCheckDefault" type="checkbox" />
                                <label className="form-check-label" for="flexCheckDefault">N/A</label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" value="" id="flexCheckReseller" type="checkbox" />
                                <label className="form-check-label" for="flexCheckReseller">Reseller Name</label>
                              </div>
                              <div className="form-check">
                              <input className="form-check-input" value="" id="flexCheckReseller1" type="checkbox" />
                                  <label className="form-check-label" for="flexCheckReseller1">Reseller Name</label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" value="" id="flexCheckReseller2" type="checkbox" />
                                <label className="form-check-label" for="flexCheckReseller2">Reseller Name</label>
                              </div>
                            </div>
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
