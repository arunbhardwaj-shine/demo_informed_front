import axios from "axios";
import Table from "./Table";
import { Link } from "react-router-dom";
import VerifySmartList from "./VerifySmartList";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const FilterSegment = (props) => {
  const [filters, setFilters] = useState(props.filters);
  const [selectedcountry, setSelectedCountry] = useState([]);
  const [selectedcontacttype, setSelectedContactType] = useState([]);
  const [selectedspeciality, setSelectedSpeciality] = useState([]);
  const [selectedreaderselection, setSelectedReaderSelection] =
    useState("CIS Reader");
  const [selectedibu, setSelectedIbu] = useState();
  const [selectedproduct, setSelectedProduct] = useState([]);
  const [selectedarticles, setSelectedArticles] = useState([]);
  const [selectedconsent, setConsent] = useState([]);
  const [selectedregister, setSelectedRegister] = useState();
  const [selectedbounce, setSelectedBounce] = useState();
  const [showhidearticle, setShowHideArticle] = useState(0);
  const [getfilterdata, setFilterData] = useState();
  const [apifilterflag, setApiFilterFlag] = useState(0);

  const [updateflag, setUpdateFlag] = useState([]);

  const handleOnCountryChange = (country) => {
    let country_index = selectedcountry.indexOf(country);
    if (country_index !== -1) {
      selectedcountry.splice(country_index, 1);
      setSelectedCountry(selectedcountry);
      let up = updateflag + 1;
      setUpdateFlag(up);
    } else {
      selectedcountry.push(country);
      setSelectedCountry(selectedcountry);
      let up = updateflag + 1;
      setUpdateFlag(up);
    }
  };

  const handleOnContactTypeChange = (contact_type) => {
    let country_index = selectedcontacttype.indexOf(contact_type);
    if (country_index !== -1) {
      selectedcontacttype.splice(country_index, 1);
    } else {
      selectedcontacttype.push(contact_type);
    }
    setSelectedContactType(selectedcontacttype);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnSpecialityChange = (speciality) => {
    let country_index = selectedspeciality.indexOf(speciality);
    if (country_index !== -1) {
      selectedspeciality.splice(country_index, 1);
    } else {
      selectedspeciality.push(speciality);
    }
    setSelectedSpeciality(selectedspeciality);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnReaderSelectionChange = (reader_selection) => {
    setSelectedReaderSelection(reader_selection);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnIbuChange = (ibu) => {
    setSelectedIbu(ibu);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnProductChange = (product) => {
    let country_index = selectedproduct.indexOf(product);
    if (country_index !== -1) {
      selectedproduct.splice(country_index, 1);
    } else {
      selectedproduct.push(product);
    }
    setSelectedProduct(selectedproduct);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleRegister = (register_val) => {
    if (register_val == "yes") {
      setShowHideArticle(1);
    } else {
      setShowHideArticle(0);
    }
    setSelectedRegister(register_val);
  };

  const handleBounce = (bounce_val) => {
    setSelectedBounce(bounce_val);
  };

  const handleOnArticleChange = (article) => {
    let country_index = selectedarticles.indexOf(article);
    if (country_index !== -1) {
      selectedarticles.splice(country_index, 1);
    } else {
      selectedarticles.push(article);
    }
    setSelectedArticles(selectedarticles);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnConsentChange = (consent) => {
    let consent_index = selectedconsent.indexOf(consent);
    if (consent_index !== -1) {
      selectedconsent.splice(consent_index, 1);
    } else {
      selectedconsent.push(consent);
    }
    setConsent(selectedconsent);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const clearFilter = () => {
    document.querySelectorAll("input").forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedCountry([]);
    setSelectedContactType([]);
    setSelectedSpeciality([]);
    setSelectedProduct([]);
    setSelectedArticles([]);
    setConsent([]);
    setSelectedIbu();
    setSelectedReaderSelection();
    setSelectedRegister();
    setSelectedBounce();
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const applyFilter = async () => {
    const body = {
      user_id: 18207,
    };

    //For Contact Type
    if (
      typeof selectedcontacttype === "object" &&
      selectedcontacttype.length > 0
    ) {
      let contactTypeList = selectedcontacttype.map((item) => {
        let val = getKeyByValue(filters.contact_type, item);
        return val;
      });
      Object.assign(body, { contactTypeList: contactTypeList });
    }

    //For Registered Articles
    if (typeof selectedarticles === "object" && selectedarticles.length > 0) {
      let registered_on_article = selectedarticles.map((item) => {
        let val = getKeyByValue(filters.articles, item);
        return val;
      });
      Object.assign(body, { registered_on_article: registered_on_article });
    }

    //For Speciality
    if (
      typeof selectedspeciality === "object" &&
      selectedspeciality.length > 0
    ) {
      let speciality = selectedspeciality.map((item) => {
        return item;
      });
      Object.assign(body, { speciality: speciality });
    }

    //For Country
    if (typeof selectedcountry === "object" && selectedcountry.length > 0) {
      let country = selectedcountry.map((item) => {
        return item;
      });
      Object.assign(body, { country: country });
    }

    //For Product
    if (typeof selectedproduct === "object" && selectedproduct.length > 0) {
      let product = selectedproduct.map((item) => {
        return item;
      });
      Object.assign(body, { product: product });
    }

    //For IBU
    if (selectedibu) {
      Object.assign(body, { ibu: selectedibu });
    }

    //For Register
    if (selectedregister && selectedregister == "yes") {
      Object.assign(body, { registered_users: 1 });
    }

    //For Bounce
    if (selectedbounce && selectedbounce == "yes") {
      Object.assign(body, { bounce: 1 });
    }

    //For Reader Selection
    if (selectedreaderselection) {
      Object.assign(body, { reader_selection: selectedreaderselection });
    }
    console.log(body);
    console.log(typeof body);

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    await axios
      .post(`distributes/get_smart_list_with_filter_data`, body)
      .then((res) => {
        if ("response" in res.data) {
          setFilterData(res.data.response.data);
        } else {
          setFilterData();
        }
        let updated_flag = apifilterflag + 1;
        setApiFilterFlag(updated_flag);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  return (
    <>
      <NavLink to="/CreateSmartList" className="active">
        Go Back
      </NavLink>
      <div className="row">
        <button className="btn-cancel">Cancel</button>
        <Link to="/VerifySmartList" state={{ getfilterdata: getfilterdata }}>
          Next
        </Link>
      </div>
      <p>
        Please Select who to include to your smart list. You can pick one or
        more.
      </p>
      <div className="box">
        <div className="row" id="box_border">
          <p>Segmentation</p>
          {"contact_type" in filters &&
            Object.keys(filters.contact_type).length > 0 && (
              <div className="col-sm-2">
                <p>Contact Type</p>
                <ul className="toppings-list">
                  {Object.entries(filters.contact_type).map(([index, item]) => (
                    <li className="left-section">
                      <input
                        type="checkbox"
                        id={`custom-checkbox-contact_type-${index}`}
                        name="contact_type[]"
                        value={item}
                        onChange={() => handleOnContactTypeChange(item)}
                      />
                      <label htmlFor={`custom-checkbox-contact_type-${index}`}>
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          {"speciality" in filters &&
            Object.keys(filters.speciality).length > 0 && (
              <div className="col-sm-2">
                <p>Speciality</p>
                <ul className="toppings-list">
                  {Object.entries(filters.speciality).map(([index, item]) => (
                    <li className="left-section">
                      <input
                        type="checkbox"
                        id={`custom-checkbox-speciality-${index}`}
                        name="speciality[]"
                        value={item}
                        onChange={() => handleOnSpecialityChange(item)}
                      />
                      <label htmlFor={`custom-checkbox-speciality-${index}`}>
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          {"reader_selection" in filters &&
            Object.keys(filters.reader_selection).length > 0 && (
              <div className="col-sm-2">
                <p>Reader Selection</p>
                <ul className="toppings-list">
                  {Object.entries(filters.reader_selection).map(
                    ([index, item]) => (
                      <li className="left-section">
                        <input
                          type="radio"
                          id={`custom-checkbox-reader_selection-${index}`}
                          name="reader_selection[]"
                          value={item}
                          onChange={() => handleOnReaderSelectionChange(item)}
                        />
                        <label
                          htmlFor={`custom-checkbox-reader_selection-${index}`}
                        >
                          {item}
                        </label>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          {"ibu" in filters && Object.keys(filters.ibu).length > 0 && (
            <div className="col-sm-2">
              <p>Business Unit (IBU)</p>
              <ul className="toppings-list">
                {Object.entries(filters.ibu).map(([index, item]) => (
                  <li className="left-section">
                    <input
                      type="radio"
                      id={`custom-checkbox-ibu-${index}`}
                      name="ibu[]"
                      value={item}
                      onChange={() => handleOnIbuChange(item)}
                    />
                    <label htmlFor={`custom-checkbox-ibu-${index}`}>
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {"product" in filters && Object.keys(filters.product).length > 0 && (
            <div className="col-sm-2">
              <p>Product</p>
              <ul className="toppings-list">
                {Object.entries(filters.product).map(([index, item]) => (
                  <li className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-product-${index}`}
                      name="ibu[]"
                      value={item}
                      onChange={() => handleOnProductChange(item)}
                    />
                    <label htmlFor={`custom-checkbox-product-${index}`}>
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {"country" in filters && Object.keys(filters.country).length > 0 && (
            <div className="col-sm-2">
              <p>Country</p>
              <ul className="toppings-list">
                {Object.entries(filters.country).map(([index, item]) => (
                  <li className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-country-${index}`}
                      name="country[]"
                      value={item}
                      onChange={() => handleOnCountryChange(item)}
                    />
                    <label htmlFor={`custom-checkbox-country-${index}`}>
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {"consent_type" in filters && filters.consent_type.length > 0 && (
            <div className="col-sm-2">
              <p>Consent Type</p>
              <ul className="toppings-list">
                {filters.consent_type.map((item, index) => (
                  <li className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-consent_type-${index}`}
                      name="consent_type[]"
                      value={index}
                      onChange={() => handleOnConsentChange(index)}
                    />
                    <label htmlFor={`custom-checkbox-consent_type-${index}`}>
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="col-sm-2">
            <p>Registered</p>
            <ul className="toppings-list rm_border">
              <li className="left-section">
                <input
                  type="radio"
                  id="register_yes"
                  name="register"
                  value="yes"
                  onChange={() => handleRegister("yes")}
                />
                <label htmlFor="register_yes">Yes</label>
              </li>
              <li className="left-section">
                <input
                  type="radio"
                  id="register_no"
                  name="register"
                  value="no"
                  onChange={() => handleRegister("no")}
                />
                <label htmlFor="register_no">No</label>
              </li>
            </ul>
          </div>

          <div className="col-sm-2">
            <p>Bounced</p>
            <ul className="toppings-list rm_border">
              <li className="left-section">
                <input
                  type="radio"
                  id="bounce_yes"
                  name="bounce"
                  value="yes"
                  onChange={() => handleBounce("yes")}
                />
                <label htmlFor="bounce_yes">Yes</label>
              </li>
              <li className="left-section">
                <input
                  type="radio"
                  id="bounce_no"
                  name="bounce"
                  value="no"
                  onChange={() => handleBounce("no")}
                />
                <label htmlFor="bounce_no">No</label>
              </li>
            </ul>
          </div>

          {"articles" in filters &&
            Object.keys(filters.articles).length > 0 &&
            showhidearticle == 1 && (
              <div className="col-sm-2">
                <p>Country</p>
                <ul className="toppings-list">
                  {Object.entries(filters.articles).map(([index, item]) => (
                    <li className="left-section">
                      <input
                        type="checkbox"
                        id={`custom-checkbox-articles-${index}`}
                        name="articles[]"
                        value={index}
                        onChange={() => handleOnArticleChange(item)}
                      />
                      <label htmlFor={`custom-checkbox-articles-${index}`}>
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          <div className="row">
            <button className="btn-cancel" onClick={clearFilter}>
              Clear
            </button>
            <button className="btn-nxt" onClick={applyFilter}>
              Apply
            </button>
          </div>
        </div>
      </div>
      <div className="box mt-2">
        <p className="mt-2">Selected Creteria</p>
        <div className="row" id="box_border">
          {updateflag > 0 ? (
            typeof selectedcountry === "object" &&
            selectedcountry.length > 0 ? (
              <div className="col-md-2">
                <p>Country</p>
                {Object.entries(selectedcountry).map(([index, item]) => (
                  <p>{item}</p>
                ))}
              </div>
            ) : null
          ) : null}

          {updateflag > 0 ? (
            typeof selectedcontacttype === "object" &&
            selectedcontacttype.length > 0 ? (
              <div className="col-md-2">
                <p>contact Type</p>
                {Object.entries(selectedcontacttype).map(([index, item]) => (
                  <p>{item}</p>
                ))}
              </div>
            ) : null
          ) : null}

          {updateflag > 0 ? (
            typeof selectedspeciality === "object" &&
            selectedspeciality.length > 0 ? (
              <div className="col-md-2">
                <p>Speciality</p>
                {Object.entries(selectedspeciality).map(([index, item]) => (
                  <p>{item}</p>
                ))}
              </div>
            ) : null
          ) : null}

          {updateflag > 0 ? (
            typeof selectedproduct === "object" &&
            selectedproduct.length > 0 ? (
              <div className="col-md-2">
                <p>Products</p>
                {Object.entries(selectedproduct).map(([index, item]) => (
                  <p>{item}</p>
                ))}
              </div>
            ) : null
          ) : null}

          {updateflag > 0 ? (
            typeof selectedarticles === "object" &&
            selectedarticles.length > 0 ? (
              <div className="col-md-2">
                <p>Articles</p>
                {Object.entries(selectedarticles).map(([index, item]) => (
                  <p>{item}</p>
                ))}
              </div>
            ) : null
          ) : null}

          {updateflag > 0 ? (
            typeof selectedconsent === "object" &&
            selectedconsent.length > 0 ? (
              <div className="col-md-2">
                <p>Consent</p>
                {Object.entries(selectedconsent).map(([index, item]) => (
                  <p>{item}</p>
                ))}
              </div>
            ) : null
          ) : null}

          {updateflag > 0 ? (
            selectedreaderselection ? (
              <div className="col-md-2">
                <p>Reader Selection</p>
                <p>{selectedreaderselection}</p>
              </div>
            ) : null
          ) : null}

          {updateflag > 0 ? (
            selectedregister ? (
              <div className="col-md-2">
                <p>Register</p>
                <p>{selectedregister}</p>
              </div>
            ) : null
          ) : null}

          {updateflag > 0 ? (
            selectedbounce ? (
              <div className="col-md-2">
                <p>Bounce</p>
                <p>{selectedbounce}</p>
              </div>
            ) : null
          ) : null}

          {updateflag > 0 ? (
            selectedibu ? (
              <div className="col-md-2">
                <p>IBU</p>
                <p>{selectedibu}</p>
              </div>
            ) : null
          ) : null}
        </div>
      </div>

      {apifilterflag > 0 ? (
        typeof getfilterdata === "object" && getfilterdata.length > 0 ? (
          <div className="box mt-2">
            <p className="mt-2">Selected Hcp's for the smart list</p>
            {console.log("filtered data")}
            {console.log(getfilterdata)}
            <Table data={getfilterdata} />
          </div>
        ) : (
          <div className="box mt-2">
            <p>No Data Found</p>
          </div>
        )
      ) : null}
    </>
  );
};

export default FilterSegment;
