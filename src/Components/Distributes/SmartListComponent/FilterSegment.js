import axios from "axios";
import Table from "./Table";
import { Link } from "react-router-dom";
import VerifySmartList from "./VerifySmartList";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { loader } from "../../../loader";

const FilterSegment = (props) => {
  const [filters, setFilters] = useState(props.filters);
  const [listname, setListName] = useState(props.listname);
  const [selectedcountry, setSelectedCountry] = useState([]);
  const [selectedcontacttype, setSelectedContactType] = useState([]);
  const [selectedspeciality, setSelectedSpeciality] = useState([]);
  const [selectedreaderselection, setSelectedReaderSelection] = useState("");
  const [selectedibu, setSelectedIbu] = useState();
  const [selectedproduct, setSelectedProduct] = useState([]);
  const [selectedarticles, setSelectedArticles] = useState([]);
  const [selectedconsent, setConsent] = useState([]);
  const [selectedregister, setSelectedRegister] = useState();
  const [selectedbounce, setSelectedBounce] = useState();
  const [showhidearticle, setShowHideArticle] = useState(0);
  const [getfilterdata, setFilterData] = useState();
  const [apifilterflag, setApiFilterFlag] = useState(0);
  const [getpayload, setPayload] = useState(0);
  const [updateflag, setUpdateFlag] = useState([]);
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  useEffect(() => {
    if(props.hasOwnProperty('selectedFilter')  && typeof props.selectedFilter.country !== "undefined"){

      //Country
      if(typeof props.selectedFilter.country !== "undefined"){
        setSelectedCountry(props.selectedFilter.country);
      }

      //Contact Type
      if(typeof props.selectedFilter.contactTypeList !== "undefined"){
        let contactTypeList = props.selectedFilter.contactTypeList.map((item) => {
          let val = filters.contact_type[item];
          return val;
        });
        setSelectedContactType(contactTypeList);
      }

      //Reader Selection
      if(typeof props.selectedFilter.reader_selection !== "undefined"){
            setSelectedReaderSelection(props.selectedFilter.reader_selection);
      }

      //IBu
      if(typeof props.selectedFilter.ibu !== "undefined"){
            setSelectedIbu(props.selectedFilter.ibu);
      }

      //Speciality
      if(typeof props.selectedFilter.speciality !== "undefined"){
            selectedspeciality(props.selectedFilter.speciality);
      }

      //product
      if(typeof props.selectedFilter.product !== "undefined"){
            setSelectedProduct(props.selectedFilter.product);
      }

      //Register Unregister
      if(typeof props.selectedFilter.registered_users !== "undefined"){
          let register_val = props.selectedFilter.registered_users == 1 ? "yes" : "no";
            setShowHideArticle(props.selectedFilter.registered_users);
            setSelectedRegister(register_val);
      }

      //Bounce Unbounce
      if(typeof props.selectedFilter.bounce !== "undefined"){
          let bounce = props.selectedFilter.bounce == 1 ? "yes" : "no";
            setSelectedBounce(bounce);
      }

      //Articles
      if(typeof props.selectedFilter.registered_on_article !== "undefined"){
        let article = props.selectedFilter.registered_on_article.map((item) => {
          let val = filters.articles[item];
          return val;
        });
        setSelectedArticles(article);
      }


      //Display table In case of update
      if(typeof props.data !== "undefined"){
          setFilterData(props.data);
          setApiFilterFlag(1);
      }

        let up = updateflag + 1;
        setUpdateFlag(up);
    }
  },[]);

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
    const payload = {
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
      Object.assign(payload, { contactTypeList: contactTypeList });
    }

    //For Registered Articles
    if (typeof selectedarticles === "object" && selectedarticles.length > 0) {
      let registered_on_article = selectedarticles.map((item) => {
        let val = getKeyByValue(filters.articles, item);
        return val;
      });
      Object.assign(payload, { registered_on_article: registered_on_article });
    }

    //For Speciality
    if (
      typeof selectedspeciality === "object" &&
      selectedspeciality.length > 0
    ) {
      let speciality = selectedspeciality.map((item) => {
        return item;
      });
      Object.assign(payload, { speciality: speciality });
    }

    //For Country
    if (typeof selectedcountry === "object" && selectedcountry.length > 0) {
      let country = selectedcountry.map((item) => {
        return item;
      });
      Object.assign(payload, { country: country });
    }

    //For Product
    if (typeof selectedproduct === "object" && selectedproduct.length > 0) {
      let product = selectedproduct.map((item) => {
        return item;
      });
      Object.assign(payload, { product: product });
    }

    //For IBU
    if (selectedibu) {
      Object.assign(payload, { ibu: selectedibu });
    }

    //For Register
    if (selectedregister) {
        if(selectedregister == "yes"){
            Object.assign(payload, { registered_users: 1 });
        }else{
            Object.assign(payload, { registered_users: 0 });
        }
    }

    //For Bounce
    if (typeof selectedbounce !== "undefined") {
      if(selectedbounce == "yes"){
          Object.assign(payload, { bounce: 1 });
      }else{
          Object.assign(payload, { bounce: 0 });
      }
      // Object.assign(payload, { bounce: 1 });
    }

    //For Reader Selection
    if (selectedreaderselection) {
      Object.assign(payload, { reader_selection: selectedreaderselection });
    }

    //For Consent
    if (typeof selectedconsent === "object" && selectedconsent.length > 0) {
      let consent = selectedconsent.map((item) => {
        return item;
      });
      Object.assign(payload, { Consent: consent });
    }
    setPayload(payload);
    console.log(payload);
    console.log(typeof payload);
    setApiFilterFlag(0);
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`distributes/get_smart_list_with_filter_data`, payload)
      .then((res) => {
        if ("response" in res.data) {
          setFilterData(res.data.response.data);
        } else {
          setFilterData();
        }
        // let updated_flag = apifilterflag + 1;
        setApiFilterFlag(1);
        loader("hide");
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
      <div className="page-top-nav smart_list_names">
        <div className="row justify-content-end align-items-center">
          <div className="col-12 col-md-6">
            <div className="page-title"><h2>Smart List Name</h2></div>
          </div>
          <div className="col-12 col-md-6">
            <div className="header-btn">
            <button className="btn btn-primary btn-bordered light">Close</button>
            <button className="btn btn-primary btn-bordered save-as">Save As</button>
            <button className="btn btn-primary btn-filled save">Save</button>
            </div>
          </div>
         </div>
      </div>

      <div className="page-top-nav smart_list_names create_filter_list">
        <div className="row justify-content-end align-items-center">
          <div className="col-12 col-md-6">
            <NavLink to="/CreateSmartList" className="active">
              Go Back
            </NavLink>
          </div>
          <div className="col-12 col-md-6">
            <div className="header-btn">
              <button className="btn btn-primary btn-bordered light">Cancel</button>
              <button className="btn btn-primary btn-bordered save-as">
                <Link
                  to="/VerifySmartList"
                  state={{
                    getfilterdata: getfilterdata,
                    listname: listname,
                    contact_type: selectedcontacttype,
                    filter_payload: getpayload,
                  }}
                >
                  Create
                </Link>
            </button>
            </div>
          </div>
         </div>
      </div>

      <section className="search-hcp smart-list-name">
        <div className="smart-list-name-drop">
            <h5>Please select who to include to your smart list.You can pick one or more:</h5>
             <div className="smart-list-dropdown">
                <div className="dropdown-smart">
                  <div id="accordion-smart">
                      <Accordion flush>
                        <Accordion.Item className="card" eventKey="0">
                          <div className="card-header">
                            <Accordion.Header className="btn">Segmentation</Accordion.Header>
                          </div>
                          <Accordion.Body>
                          <div className="card-body">

                          <div className="col block-smart-name">
                              {"contact_type" in filters &&
                                Object.keys(filters.contact_type).length > 0 && (
                                  <>
                                    <p>Contact Type</p>
                                    <div className="smart-name-list">
                                    <ul>
                                      {Object.entries(filters.contact_type).map(([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-contact_type-${index}`}
                                              name="contact_type[]"
                                              value={item}
                                              checked={typeof selectedcontacttype !== 'undefined' && selectedcontacttype.indexOf(item) !== -1}
                                              onChange={() => handleOnContactTypeChange(item)}
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </>
                              )}
                            </div>

                            <div className="col block-smart-name">
                                {"speciality" in filters &&
                                  Object.keys(filters.speciality).length > 0 && (
                                    <>
                                      <p>Speciality</p>
                                      <div className="smart-name-list">
                                      <ul>
                                        {Object.entries(filters.speciality).map(([index, item]) => (
                                          <li>
                                            <div className="select-multiple-option">
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-speciality-${index}`}
                                                name="speciality[]"
                                                value={item}
                                                checked={typeof selectedspeciality !== 'undefined' && selectedspeciality.indexOf(item) !== -1}
                                                onChange={() => handleOnSpecialityChange(item)}
                                              />
                                              <span className="checkmark"></span>
                                            </div>
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </>
                                )}
                              </div>

                              <div className="col block-smart-name">
                                  {"reader_selection" in filters &&
                                    Object.keys(filters.reader_selection).length > 0 && (
                                      <>
                                        <p>Reader Selection</p>
                                        <div className="smart-name-list">
                                        <ul>
                                          {Object.entries(filters.reader_selection).map(([index, item]) => (
                                            <li>
                                              <div className="select-multiple-option">
                                              <input
                                                type="radio"
                                                id={`custom-checkbox-reader_selection-${index}`}
                                                name="reader_selection[]"
                                                value={item}
                                                checked={selectedreaderselection == item}
                                                onChange={() => handleOnReaderSelectionChange(item)}
                                              />
                                                <span className="checkmark"></span>
                                              </div>
                                              {item}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </>
                                  )}
                                </div>

                                <div className="col block-smart-name">
                                    {"ibu" in filters &&
                                      Object.keys(filters.ibu).length > 0 && (
                                        <>
                                          <p>Ibu</p>
                                          <div className="smart-name-list">
                                          <ul>
                                            {Object.entries(filters.ibu).map(([index, item]) => (
                                              <li>
                                                <div className="select-multiple-option">
                                                <input
                                                    type="radio"
                                                    id={`custom-checkbox-ibu-${index}`}
                                                    name="ibu[]"
                                                    value={item}
                                                    checked={selectedibu == item}
                                                      onChange={() => handleOnIbuChange(item)}
                                                  />
                                                  <span className="checkmark"></span>
                                                </div>
                                                {item}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </>
                                    )}
                                  </div>


                                  <div className="col block-smart-name">
                                      {"product" in filters &&
                                        Object.keys(filters.product).length > 0 && (
                                          <>
                                            <p>Product</p>
                                            <div className="smart-name-list">
                                            <ul>
                                              {Object.entries(filters.product).map(([index, item]) => (
                                                <li>
                                                  <div className="select-multiple-option">
                                                  <input
                                                      type="checkbox"
                                                      id={`custom-checkbox-product-${index}`}
                                                      name="ibu[]"
                                                      value={item}
                                                      checked={typeof selectedproduct !== 'undefined' && selectedproduct.indexOf(item) !== -1}
                                                      onChange={() => handleOnProductChange(item)}
                                                    />
                                                    <span className="checkmark"></span>
                                                  </div>
                                                  {item}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </>
                                      )}
                                    </div>


                                    <div className="col block-smart-name">
                                        {"country" in filters &&
                                          Object.keys(filters.country).length > 0 && (
                                            <>
                                              <p>Country</p>
                                              <div className="smart-name-list">
                                              <ul>
                                                {Object.entries(filters.country).map(([index, item]) => (
                                                  <li>
                                                    <div className="select-multiple-option">
                                                    <input
                                                        type="checkbox"
                                                        id={`custom-checkbox-country-${index}`}
                                                        name="country[]"
                                                        value={item}
                                                        checked={typeof selectedcountry !== 'undefined' && selectedcountry.indexOf(item) !== -1}
                                                        onChange={() => handleOnCountryChange(item)}
                                                      />
                                                      <span className="checkmark"></span>
                                                    </div>
                                                    {item}
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          </>
                                        )}
                                      </div>


                                      <div className="col block-smart-name">
                                          {"consent_type" in filters && filters.consent_type.length > 0 && (
                                              <>
                                                <p>Consent Type</p>
                                                <div className="smart-name-list">
                                                <ul>
                                                  {filters.consent_type.map((item, index) => (
                                                    <li>
                                                      <div className="select-multiple-option">
                                                      <input
                                                          type="checkbox"
                                                          id={`custom-checkbox-consent_type-${index}`}
                                                          name="consent_type[]"
                                                          value={index}
                                                          onChange={() => handleOnConsentChange(index)}
                                                        />
                                                        <span className="checkmark"></span>
                                                      </div>
                                                      {item}
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            </>
                                          )}
                                        </div>

                                        <div className="col block-smart-name">
                                        {"articles" in filters && Object.keys(filters.articles).length > 0 && showhidearticle == 1 && (
                                                <>
                                                  <p>Articles</p>
                                                  <div className="smart-name-list">
                                                  <ul>
                                                    {Object.entries(filters.articles).map(([index, item]) => (
                                                      <li>
                                                        <div className="select-multiple-option">
                                                        <input
                                                            type="checkbox"
                                                            id={`custom-checkbox-articles-${index}`}
                                                            name="articles[]"
                                                            value={index}
                                                            checked={typeof selectedarticles !== 'undefined' && selectedarticles.indexOf(item) !== -1}
                                                            onChange={() => handleOnArticleChange(item)}
                                                          />
                                                          <span className="checkmark"></span>
                                                        </div>
                                                        {item}
                                                      </li>
                                                    ))}
                                                  </ul>
                                                </div>
                                              </>
                                            )}
                                          </div>

                             <div className="col block-smart-name registered">
                              <h6>Registered</h6>
                              <ul>
                              <li>
                                <div className="select-multiple-option">
                                <input
                                    type="radio"
                                    id="register_yes"
                                    name="register"
                                    value="yes"
                                    checked={typeof selectedregister !== 'undefined' && selectedregister == "yes"}
                                    onChange={() => handleRegister("yes")}
                                  />
                                  <span className="checkmark"></span>
                                </div>
                                Yes
                              </li>
                              <li>
                                <div className="select-multiple-option">
                                <input
                                    type="radio"
                                    id="register_no"
                                    name="register"
                                    value="no"
                                    checked={typeof selectedregister !== 'undefined' && selectedregister == "no"}
                                    onChange={() => handleRegister("no")}
                                  />
                                  <span className="checkmark"></span>
                                </div>
                                No
                              </li>
                              </ul>
                              <h6>Bounced</h6>
                              <ul>
                              <li>
                                <div className="select-multiple-option">
                                <input
                                    type="radio"
                                    id="bounce_yes"
                                    name="bounce"
                                    value="yes"
                                    checked={typeof selectedbounce !== 'undefined' && selectedbounce == "yes"}
                                    onChange={() => handleBounce("yes")}
                                  />
                                  <span className="checkmark"></span>
                                </div>
                                Yes
                              </li>
                              <li>
                                <div className="select-multiple-option">
                                <input
                                    type="radio"
                                    id="bounce_no"
                                    name="bounce"
                                    value="no"
                                    checked={typeof selectedbounce !== 'undefined' && selectedbounce == "no"}
                                    onChange={() => handleBounce("no")}
                                  />
                                  <span className="checkmark"></span>
                                </div>
                                No
                              </li>
                              </ul>
                             </div>
                          <div className="segmentation-button">
                            <button className="btn btn-bordered btn-primary" onClick={clearFilter}>Clear</button>
                            <button className="btn btn-filled btn-primary" onClick={applyFilter}>Apply</button>
                          </div>
                          </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                  </div>
    					  </div>
    					</div>
  				</div>
				<div className="apply-filter">
					<h6>Selected Criterias <span>| 333</span></h6>
					<div className="filter-block">
						<div className="filter-block-left">

            {updateflag > 0 ? (
              typeof selectedcountry === "object" &&
              selectedcountry.length > 0 ? (
  							<div className="filter-div">
  								<div className="filter-div-title">
  									<span>Country |</span>
  								</div>
  								<div className="filter-div-list">
                    {Object.entries(selectedcountry).map(([index, item]) => (
                      <div className="filter-result">{item == "B&H" ? "Bosnia and Herzegovina" : item} <img src={path_image + "filter-close.svg"} alt="Close-filter" /></div>
                    ))}
  								</div>
  							</div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedcontacttype === "object" &&
                selectedcontacttype.length > 0 ? (
                  <div className="filter-div">
    								<div className="filter-div-title">
    									<span>contact Type |</span>
    								</div>
    								<div className="filter-div-list">
                      {Object.entries(selectedcontacttype).map(([index, item]) => (
                          <div className="filter-result">{item} <img src={path_image + "filter-close.svg"} alt="Close-filter" /></div>
                      ))}
                      </div>
      							</div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedspeciality === "object" &&
                selectedspeciality.length > 0 ? (
                  <div className="filter-div">
    								<div className="filter-div-title">
                      <span>Speciality |</span>
                    </div>
                    <div className="filter-div-list">
                      {Object.entries(selectedspeciality).map(([index, item]) => (
                        <div className="filter-result">{item} <img src={path_image + "filter-close.svg"} alt="Close-filter" /></div>
                      ))}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedproduct === "object" &&
                selectedproduct.length > 0 ? (
                  <div className="filter-div">
    								<div className="filter-div-title">
                      <span>Products |</span>
                    </div>
                    <div className="filter-div-list">
                      {Object.entries(selectedproduct).map(([index, item]) => (
                        <div className="filter-result">{item} <img src={path_image + "filter-close.svg"} alt="Close-filter" /></div>
                      ))}
                    </div>
                  </div>
                ) : null
              ) : null}


              {updateflag > 0 ? (
                  typeof selectedarticles === "object" &&
                  selectedarticles.length > 0 ? (
                    <div className="filter-div">
      								<div className="filter-div-title">
      									<span>Articles |</span>
      								</div>
                      <div className="filter-div-list">
                        {Object.entries(selectedarticles).map(([index, item]) => (
                          <div className="filter-result">{item} <img src={path_image + "filter-close.svg"} alt="Close-filter" /></div>
                        ))}
                      </div>
                    </div>
                  ) : null
                ) : null}


            {updateflag > 0 ? (
              typeof selectedconsent === "object" &&
              selectedconsent.length > 0 ? (
                <div className="filter-div">
  								<div className="filter-div-title">
  									<span>Consent |</span>
  								</div>
                  <div className="filter-div-list">
                    {Object.entries(selectedconsent).map(([index, item]) => (
                      <div className="filter-result">{item} <img src={path_image + "filter-close.svg"} alt="Close-filter" /></div>
                    ))}
                  </div>
                </div>
              ) : null
            ) : null}


            {updateflag > 0 ? (
              selectedreaderselection ? (
                <div className="filter-div">
                  <div className="filter-div-title">
                    <span>Reader Selection |</span>
                  </div>
                  <div className="filter-div-list">
                    <div className="filter-result">{selectedreaderselection} <img src={path_image + "filter-close.svg"} alt="Close-filter" /></div>
                  </div>
                </div>
              ) : null
            ) : null}

						</div>

            {/*Right Block*/}
						<div className="filter-block-right">
                {updateflag > 0 ? (
                  selectedibu ? (
                    <div className="filter-div">
                      <div className="filter-div-title">
                        <span>IBU |</span>
                      </div>
                      <div className="filter-div-list">
                        <div className="filter-result">{selectedibu} <img src={path_image + "filter-close.svg"} alt="Close-filter" /></div>
                      </div>
                    </div>
                  ) : null
                ) : null}

                {updateflag > 0 ? (
                    selectedregister ? (
                      <div className="filter-div">
                        <div className="filter-div-title">
                          <span>Register |</span>
                        </div>
                        <div className="filter-div-list">
                          <div className="filter-result">{selectedregister} <img src={path_image + "filter-close.svg"} alt="Close-filter" /></div>
                        </div>
                      </div>
                    ) : null
                  ) : null}

                  {updateflag > 0 ? (
                    selectedbounce ? (
                      <div className="filter-div">
                        <div className="filter-div-title">
                          <span>Bounce |</span>
                        </div>
                        <div className="filter-div-list">
                          <div className="filter-result">{selectedbounce} <img src={path_image + "filter-close.svg"} alt="Close-filter" /></div>
                        </div>
                      </div>
                    ) : null
                  ) : null}

						 </div>

					</div>
				</div>
				<div className="result-hcp-table">
					<div className="table-title">
						<h6>Selected HCPs for the smart list </h6>
						<div className="selected-hcp-table-action">
							<a className="show-less-info" href="#">Show Less information </a>
							<div className="hcp-new-user">
								<button className="btn btn-outline-primary"><img src={path_image + "new-user.svg"} alt="New User" /></button>
							</div>
							<div className="hcp-added">
								<button className="btn btn-outline-primary"><img src={path_image + "edit-button.svg"} alt="Edit" /></button>
							</div>
						</div>
					</div>
					<div className="selected-hcp-list">
						<table className="table">
						  <thead>
							<tr>
							  <th scope="col">Name</th>
							  <th scope="col">Email</th>
							  <th scope="col">Bounced</th>
							  <th scope="col">Country</th>
							  <th scope="col">Readers</th>
							  <th scope="col">Business Unit</th>
							  <th scope="col">Interest</th>
							  <th scope="col"></th>
							</tr>
						  </thead>
						  <tbody>
							<tr>
							  <td>Jacob Flindt</td>
							  <td>User@docintel.app</td>
							  <td>No</td>
							  <td>United Kingdom</td>
							  <td>CIS</td>
							  <td>Haematology</td>
							  <td>Tech</td>
							  <td className="delete_row" colspan="12"><img src={path_image + "delete.svg"} alt="Delete Row" /></td>
							</tr>
						  </tbody>
						</table>
					</div>
				</div>
			</section>
    </>
  );
};

export default FilterSegment;
