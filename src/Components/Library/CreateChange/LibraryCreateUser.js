import React, { useState } from "react";
import Select from "react-select";
import { Form, Link } from "react-router-dom";
import { createContent } from "../../CommonComponent/Validations";
import { useSSRSafeId } from "@react-aria/ssr";

const LibraryCreateUser = () => {
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
          </div>
        </div>
      </div>
    </>
  );
};
export default LibraryCreateUser;
