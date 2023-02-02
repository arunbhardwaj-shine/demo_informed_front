import React from "react";
import Select from "react-select";
import { Link } from "react-router-dom";

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
            <div className="form_action">
              <div className="row">
                <div className="col-12 col-md-12">
                  <div className="form-group">
                    <label for="">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      //onChange={(event) => onFirstNameChange(event, i)}
                      //value={val.firstname}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label for="">Country</label>
                    <Select
                      // options={countryall}
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                      isClearable
                    />
                    {/*
                                    <DropdownButton className="dropdown-basic-button split-button-dropup country"
                                        title= {hpc[i].country != "" &&  hpc[i].country != "undefined" ? hpc[i].country == "B&H" ? "Bosnia and Herzegovina" : hpc[i].country : "Select Country" }
                                        onSelect={(event) => onCountryChange(event, i)}
                                        >
                                        <div className="scroll_div">
                                        {countryall.length === 0
                                        ? ""
                                        : Object.entries(countryall).map(
                                        ([index, item]) => {
                                        return (
                                        <>
                                        <Dropdown.Item eventKey={index} className = {hpc[i].country == index ? "active" : "" }>{item == "B&H" ? "Bosnia and Herzegovina" : item}</Dropdown.Item>
                                        </>
                                      );
                                    }
                                  )}
                                  </div>
                                  </DropdownButton>
                                    */}
                  </div>
                </div>
                {/*
                              <div className="col-12 col-md-6 btn_rmv">
                                <div className="form-group">
                                  {i !== 0 && (
                                    <button
                                      type="button"
                                      className="btn btn-filled"
                                      onClick={() => deleteRecord(i)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              </div>
                              */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LibraryCreateUser;
