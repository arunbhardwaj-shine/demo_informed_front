import React, { useState } from "react";
import Select from "react-select";
import { Form, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { createContent } from "../../CommonComponent/Validations";
import { useSSRSafeId } from "@react-aria/ssr";
// import Placeholder from "react-select/dist/declarations/src/components/Placeholder";
const today = new Date();

  const LibraryCreateUser = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState({});
  const [company, setCompany] = useState("");
  const [clientProduct, setClientProduct] = useState("");

  const [countryAll, setCountryAll] = useState([
    { value: "India", label: "India" },
    { value: "Australia", label: "Australia" },
    { value: "Russia", label: "Russia" },
  ]);

  const [productionAll, setProductionAll] = useState([
    { value: "production1", label: "production1" },
    { value: "production2", label: "production2" },
    { value: "production3", label: "production3" },
  ]);

  const [sales, setSales] = useState("");
  const [salesAll, setSalesAll] = useState([
    { value: "sales1", label: "sales1" },
    { value: "sales2", label: "sales2" },
    { value: "sales3", label: "sales3" },
  ]);

  const onSalesChange = (event) => {
    setSales(event.value);
  };

  const [production, setProduction] = useState("");
  const [country, setCountry] = useState("");
  const onCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const onClientProductChange = (event) => {
    setClientProduct(event.target.value);
  };

  const onCountryChange = (event) => {
    console.log(event);
    setCountry(event.value);
  };
  const onProductionChange = (event) => {
    console.log(event);
    setProduction(event.value);
  };

  const nextButtonClicked = (e) => {
    e.preventDefault();

    const data = {
      company: company,
      country: country,
      clientProduct: clientProduct,
      production: production,
      sales: sales,
    };

    const err = createContent(data);
    if (Object.keys(err)?.length) {
      setError(err);
      console.log(err);
      return;
    } else {
      setError(err);
      console.log("no error");
    }
  };
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
                      onClick={nextButtonClicked}
                    >
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
                        onChange={(event) => onCompanyChange(event)}
                        //value={val.firstname}
                      />
                      {error?.company ? (
                        <div className="login-validation">{error?.company}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label for="">Country</label>
                      <Select
                        options={countryAll}
                        onChange={(event) => onCountryChange(event)}
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                      {error?.country ? (
                        <div className="login-validation">{error?.country}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label for="">Client product</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => onClientProductChange(e)}
                      />
                      {error?.clientProduct ? (
                        <div className="login-validation">
                          {error?.clientProduct}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label for="">Production</label>
                      <Select
                        options={productionAll}
                        onChange={(event) => onProductionChange(event)}
                        className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                        isClearable
                      />
                      {error?.production ? (
                        <div className="login-validation">
                          {error?.production}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label for="">Sales</label>
                      <Select
                        options={salesAll}
                        onChange={(event) => onSalesChange(event)}
                        className="dropdown-basic-button split-button-dropup edit-sales-dropdown"
                        isClearable
                      />
                      {error?.sales ? (
                        <div className="login-validation">{error?.sales}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-end">
                    <div className="form-group">
                      <label for="">Reseller</label>
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
                            for="flexCheckDefault"
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
                            for="flexCheckReseller"
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
                            for="flexCheckReseller1"
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
                            for="flexCheckReseller2"
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
