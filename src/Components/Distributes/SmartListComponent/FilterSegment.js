import axios from "axios";
import Table from "./Table";
import { Link, Navigate, useNavigate } from "react-router-dom";
import VerifySmartList from "./VerifySmartList";
import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { loader } from "../../../loader";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const FilterSegment = (props) => {
  const tableCompRef = useRef();
  const Navigate = useNavigate();
  const [filters, setFilters] = useState(props.filters);
  const [listname, setListName] = useState(props.listname);
  const [selectedcountry, setSelectedCountry] = useState([]);
  const [selectedprovince, setSelectedProvince] = useState([]);
  const [selectedterritory, setSelectedTerritory] = useState([]);
  const [selectedcontacttype, setSelectedContactType] = useState([]);
  const [selectedspeciality, setSelectedSpeciality] = useState([]);
  const [selectedreaderselection, setSelectedReaderSelection] = useState("");
  const [selectedibu, setSelectedIbu] = useState();
  const [selectedproduct, setSelectedProduct] = useState([]);
  const [selectedarticles, setSelectedArticles] = useState([]);
  const [selectedconsent, setConsent] = useState([]);
  const [selectedregister, setSelectedRegister] = useState("yes");
  const [selectedbounce, setSelectedBounce] = useState();
  const [showhidearticle, setShowHideArticle] = useState(1);
  const [getfilterdata, setFilterData] = useState();
  const [apifilterflag, setApiFilterFlag] = useState(0);
  const [getpayload, setPayload] = useState(0);
  const [updateflag, setUpdateFlag] = useState([]);
  const [getNewAddedUser, setNewAddedUser] = useState([]);
  const [confirmationPopupStatus, setConfirmationPopupStatus] = useState(false);
  const [getfilterapplied, setfilterapplied] = useState(0);
  const [getStorageState, setStorageState] = useState(false);
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  useEffect(() => {
    var x = localStorage.getItem("sd_i");
    if (x) {
      setStorageState(true);
    } else {
      setStorageState(false);
    }

    if (props.hasOwnProperty("selectedFilter")) {
      //Country
      if (typeof props.selectedFilter.country !== "undefined") {
        setSelectedCountry(props.selectedFilter.country);
      }

      //provience
      if (typeof props.selectedFilter.province !== "undefined") {
        setSelectedProvince(props.selectedFilter.province);
      }

      //provience
      if (typeof props.selectedFilter.territory !== "undefined") {
        setSelectedTerritory(props.selectedFilter.territory);
      }

      //Consent
      if (typeof props.selectedFilter.Consent !== "undefined") {
        let consent = props.selectedFilter.Consent.map((item) => {
          let val = filters.consent_type[item];
          return val;
        });
        setConsent(consent);
      }

      //Contact Type
      if (typeof props.selectedFilter.contactTypeList !== "undefined") {
        let contactTypeList = props.selectedFilter.contactTypeList.map(
          (item) => {
            let val = filters.contact_type[item];
            return val;
          }
        );
        setSelectedContactType(contactTypeList);
      }

      //Reader Selection
      if (typeof props.selectedFilter.reader_selection !== "undefined") {
        setSelectedReaderSelection(props.selectedFilter.reader_selection);
      }

      //IBu
      if (typeof props.selectedFilter.ibu !== "undefined") {
        setSelectedIbu(props.selectedFilter.ibu);
      }

      //Speciality
      if (typeof props.selectedFilter.speciality !== "undefined") {
        selectedspeciality(props.selectedFilter.speciality);
      }

      //product
      if (typeof props.selectedFilter.product !== "undefined") {
        setSelectedProduct(props.selectedFilter.product);
      }

      //Register Unregister
      if (typeof props.selectedFilter.registered_users !== "undefined") {
        let register_val =
          props.selectedFilter.registered_users == 1 ? "yes" : "no";
        setShowHideArticle(props.selectedFilter.registered_users);
        setSelectedRegister(register_val);
      }

      //Bounce Unbounce
      if (typeof props.selectedFilter.bounce !== "undefined") {
        let bounce = props.selectedFilter.bounce == 1 ? "yes" : "no";
        setSelectedBounce(bounce);
      }

      //Articles
      if (typeof props.selectedFilter.registered_on_article !== "undefined") {
        let article = props.selectedFilter.registered_on_article.map((item) => {
          let val = filters.articles[item];
          return val;
        });
        setSelectedArticles(article);
      }

      //Display table In case of update
      if (typeof props.data !== "undefined") {
        setFilterData(props.data);
        setApiFilterFlag(1);
      }

      let up = updateflag + 1;
      setUpdateFlag(up);
    }
  }, []);

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

  const handleOnTerritoryChange = (territory) => {
    let territory_index = selectedterritory.indexOf(territory);
    if (territory_index !== -1) {
      selectedterritory.splice(territory_index, 1);
      setSelectedTerritory(selectedterritory);
      let up = updateflag + 1;
      setUpdateFlag(up);
    } else {
      selectedterritory.push(territory);
      setSelectedTerritory(selectedterritory);
      let up = updateflag + 1;
      setUpdateFlag(up);
    }
  };

  const handleOnProvinceChange = (province) => {
    let province_index = selectedprovince.indexOf(province);
    if (province_index !== -1) {
      selectedprovince.splice(province_index, 1);
      setSelectedProvince(selectedprovince);
      let up = updateflag + 1;
      setUpdateFlag(up);
    } else {
      selectedprovince.push(province);
      setSelectedProvince(selectedprovince);
      let up = updateflag + 1;
      setUpdateFlag(up);
    }
  };

  const closeClicked = () => {
    Navigate("/SmartList");
  };

  const handleOnContactTypeChange = (contact_type) => {
    let contact_index = selectedcontacttype.indexOf(contact_type);
    if (contact_index !== -1) {
      selectedcontacttype.splice(contact_index, 1);
    } else {
      selectedcontacttype.push(contact_type);
    }
    setSelectedContactType(selectedcontacttype);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnSpecialityChange = (speciality) => {
    let speciality_index = selectedspeciality.indexOf(speciality);
    if (speciality_index !== -1) {
      selectedspeciality.splice(speciality_index, 1);
    } else {
      selectedspeciality.push(speciality);
    }
    setSelectedSpeciality(selectedspeciality);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnReaderSelectionChange = (reader_selection) => {
    if (selectedreaderselection == reader_selection) {
      setSelectedReaderSelection("");
    } else {
      setSelectedReaderSelection(reader_selection);
    }
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnIbuChange = (ibu) => {
    if (selectedibu == ibu) {
      setSelectedIbu("");
    } else {
      setSelectedIbu(ibu);
    }
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnProductChange = (product) => {
    let product_index = selectedproduct.indexOf(product);
    if (product_index !== -1) {
      selectedproduct.splice(product_index, 1);
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
    let article_index = selectedarticles.indexOf(article);
    if (article_index !== -1) {
      selectedarticles.splice(article_index, 1);
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
    setSelectedProvince([]);
    setSelectedTerritory([]);
    setSelectedContactType([]);
    setSelectedSpeciality([]);
    setSelectedProduct([]);
    setSelectedArticles([]);
    setConsent([]);
    setSelectedIbu();
    setSelectedReaderSelection();
    setSelectedRegister();
    setSelectedBounce();
    setFilterData([]);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const applyFilter = async () => {
    let flag_to_check_data = false;
    const payload = {
      user_id: localStorage.getItem("user_id"),
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
      flag_to_check_data = true;
    }

    //For Registered Articles
    if (typeof selectedarticles === "object" && selectedarticles.length > 0) {
      let registered_on_article = selectedarticles.map((item) => {
        let val = getKeyByValue(filters.articles, item);
        return val;
      });
      Object.assign(payload, { registered_on_article: registered_on_article });
      flag_to_check_data = true;
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
      flag_to_check_data = true;
    }

    //For Country
    if (typeof selectedcountry === "object" && selectedcountry.length > 0) {
      let country = selectedcountry.map((item) => {
        return item;
      });
      Object.assign(payload, { country: country });
      flag_to_check_data = true;
    }

    //For Province
    if (typeof selectedprovince === "object" && selectedprovince.length > 0) {
      let province = selectedprovince.map((item) => {
        return item;
      });
      Object.assign(payload, { province: province });
      flag_to_check_data = true;
    }

    //For territory
    if (typeof selectedterritory === "object" && selectedterritory.length > 0) {
      let territory = selectedterritory.map((item) => {
        return item;
      });
      Object.assign(payload, { territory: territory });
      flag_to_check_data = true;
    }

    //For Product
    if (typeof selectedproduct === "object" && selectedproduct.length > 0) {
      let product = selectedproduct.map((item) => {
        return item;
      });
      Object.assign(payload, { product: product });
      flag_to_check_data = true;
    }

    //For IBU
    if (selectedibu) {
      Object.assign(payload, { ibu: selectedibu });
      flag_to_check_data = true;
    }

    //For Register
    if (selectedregister) {
      if (selectedregister == "yes") {
        Object.assign(payload, { registered_users: 1 });
      } else {
        Object.assign(payload, { registered_users: 0 });
      }
      flag_to_check_data = true;
    }

    //For Bounce
    if (typeof selectedbounce !== "undefined") {
      if (selectedbounce == "yes") {
        Object.assign(payload, { bounce: 1 });
      } else {
        Object.assign(payload, { bounce: 0 });
      }
      flag_to_check_data = true;
      // Object.assign(payload, { bounce: 1 });
    }

    //For Reader Selection
    if (selectedreaderselection) {
      Object.assign(payload, { reader_selection: selectedreaderselection });
      flag_to_check_data = true;
    }

    //For Consent
    if (typeof selectedconsent === "object" && selectedconsent.length > 0) {
      let consent = selectedconsent.map((item) => {
        let val = getKeyByValue(filters.consent_type, item);
        return val;
      });
      Object.assign(payload, { Consent: consent });
      flag_to_check_data = true;
    }

    if (flag_to_check_data) {
      setfilterapplied(1);
      setPayload(payload);
      setApiFilterFlag(0);
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`distributes/get_smart_list_with_filter_data`, payload)
        .then((res) => {
          console.log(res.data.status_code);
          if (res.data.status_code == 200) {
            setFilterData(res.data.response.data);
          } else {
            setFilterData();
          }
          setApiFilterFlag(1);
          loader("hide");
        })
        .catch((err) => {
          loader("hide");
          console.log(err);
        });
    } else {
      toast.error("Please select any filter.");
    }
  };

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const sendDataToParent = (childData, flag) => {
    if (flag == "existing") {
      setFilterData(childData);
    } else if (flag == "new") {
      setNewAddedUser(childData);
    }
    setApiFilterFlag(1);
  };

  const showConfirmation = () => {
    setConfirmationPopupStatus(true);
  };

  const hideconfirmationpopup = () => {
    setConfirmationPopupStatus(false);
  };

  const createListWithFilters = (flag) => {
    setConfirmationPopupStatus(false);
    tableCompRef.current.createSmartList(getfilterdata, getNewAddedUser, flag);
  };

  const removeindividualfilter = (src, item) => {
    if (src == "country") {
      handleOnCountryChange(item);
    } else if (src == "province") {
      handleOnProvinceChange(item);
    } else if (src == "territory") {
      handleOnTerritoryChange(item);
    } else if (src == "contact_type") {
      handleOnContactTypeChange(item);
    } else if (src == "speciality") {
      handleOnSpecialityChange(item);
    } else if (src == "product") {
      handleOnProductChange(item);
    } else if (src == "article") {
      handleOnArticleChange(item);
    } else if (src == "consent") {
      handleOnConsentChange(item);
    } else if (src == "reader_selection") {
      handleOnReaderSelectionChange(item);
    } else if (src == "ibu") {
      handleOnIbuChange(item);
    } else if (src == "register") {
      setSelectedRegister();
    } else if (src == "bounce") {
      setSelectedBounce();
    }
  };

  const closeCancelClicked = () => {
    var x = localStorage.getItem("sd_i");
    if (x) {
      localStorage.removeItem("sd_i");
      Navigate("/SelectSmartList");
    } else {
      Navigate("/SmartList");
    }
  };

  return (
    <>
      {typeof props.action !== "undefined" && props.action == "edit" && (
        <div className="page-top-nav smart_list_names">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-6">
              <div className="page-title">
                <h2>{props.listname}</h2>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="header-btn">
                <button
                  className="btn btn-primary btn-bordered light"
                  onClick={closeClicked}
                >
                  Close
                </button>
                {/*<button className="btn btn-primary btn-bordered save-as">Save As</button>*/}
                <button
                  className="btn btn-primary btn-filled save"
                  onClick={() => showConfirmation()}
                  disabled={
                    typeof getfilterdata !== "undefined" &&
                    getfilterdata.length > 0
                      ? false
                      : typeof getNewAddedUser !== "undefined" &&
                        getNewAddedUser.length > 0
                      ? false
                      : true
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {typeof props.action !== "undefined" && props.action == "create" && (
        <div className="page-top-nav smart_list_names create_filter_list">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <button className="btn btn-primary btn-bordered back">
                  <NavLink to="/CreateSmartList" className="active">
                    Back
                  </NavLink>
                </button>
              </div>
            </div>
            <div className="col-12 col-md-8">
              <ul className="tabnav-link">
                <li className="">
                  <a href="javascript:void(0)">Create smart list</a>
                </li>
                <li className="active active-main">
                  <a href="javascript:void(0)">Select & Verify your HCPs</a>
                </li>
              </ul>
            </div>

            <div className="col-12 col-md-3">
              <div className="header-btn">
                <button
                  className="btn btn-primary btn-bordered light"
                  onClick={closeCancelClicked}
                >
                  Cancel
                  {/*
                     <NavLink to="/CreateSmartList">Cancel</NavLink>
                    */}
                </button>
                <button
                  className="btn btn-primary btn-bordered save-as"
                  onClick={() => createListWithFilters("create")}
                  disabled={
                    typeof getfilterdata !== "undefined" &&
                    getfilterdata.length > 0
                      ? false
                      : typeof getNewAddedUser !== "undefined" &&
                        getNewAddedUser.length > 0
                      ? false
                      : true
                  }
                >
                  {getStorageState ? "Create & go to email" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="search-hcp smart-list-name">
        <div className="smart-list-name-drop">
          <h5>
            Please select who to include to your smart list.You can pick one or
            more:
          </h5>
          <div className="smart-list-dropdown">
            <div className="dropdown-smart">
              <div id="accordion-smart">
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item className="card" eventKey="0">
                    <div className="card-header">
                      <Accordion.Header className="btn">
                        Segmentation
                      </Accordion.Header>
                    </div>
                    <Accordion.Body>
                      <div className="card-body">
                        {"contact_type" in filters &&
                          Object.keys(filters.contact_type).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Contact Type</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(filters.contact_type).map(
                                      ([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-contact_type-${index}`}
                                              name="contact_type[]"
                                              value={item}
                                              checked={
                                                typeof selectedcontacttype !==
                                                  "undefined" &&
                                                selectedcontacttype.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnContactTypeChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"speciality" in filters &&
                          Object.keys(filters.speciality).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Speciality</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(filters.speciality).map(
                                      ([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-speciality-${index}`}
                                              name="speciality[]"
                                              value={item}
                                              checked={
                                                typeof selectedspeciality !==
                                                  "undefined" &&
                                                selectedspeciality.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnSpecialityChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"ibu" in filters &&
                          Object.keys(filters.ibu).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>IBU</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(filters.ibu).map(
                                      ([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="radio"
                                              id={`custom-checkbox-ibu-${index}`}
                                              name="ibu[]"
                                              value={item}
                                              checked={selectedibu == item}
                                              onChange={() =>
                                                handleOnIbuChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"product" in filters &&
                          Object.keys(filters.product).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Product</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(filters.product).map(
                                      ([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-product-${index}`}
                                              name="ibu[]"
                                              value={item}
                                              checked={
                                                typeof selectedproduct !==
                                                  "undefined" &&
                                                selectedproduct.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnProductChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"country" in filters &&
                          Object.keys(filters.country).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Country</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(filters.country).map(
                                      ([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-country-${index}`}
                                              name="country[]"
                                              value={item}
                                              checked={
                                                typeof selectedcountry !==
                                                  "undefined" &&
                                                selectedcountry.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnCountryChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"province" in filters &&
                          Object.keys(filters.province).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Province</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(filters.province).map(
                                      ([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-province-${index}`}
                                              name="province[]"
                                              value={item}
                                              checked={
                                                typeof selectedprovince !==
                                                  "undefined" &&
                                                selectedprovince.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnProvinceChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"territory" in filters &&
                          Object.keys(filters.territory).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Territory</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(filters.territory).map(
                                      ([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-territory-${index}`}
                                              name="territory[]"
                                              value={item}
                                              checked={
                                                typeof selectedterritory !==
                                                  "undefined" &&
                                                selectedterritory.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnTerritoryChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"consent_type" in filters &&
                          filters.consent_type.length > 0 && (
                            <>
                              <div className="col block-smart-name consent-type">
                                <h6>Consent Type</h6>
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
                                            checked={
                                              typeof selectedconsent !==
                                                "undefined" &&
                                              selectedconsent.indexOf(item) !==
                                                -1
                                            }
                                            onChange={() =>
                                              handleOnConsentChange(item)
                                            }
                                          />
                                          <span className="checkmark"></span>
                                        </div>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"articles" in filters &&
                          Object.keys(filters.articles).length > 0 &&
                          showhidearticle == 1 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Articles</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(filters.articles).map(
                                      ([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-articles-${index}`}
                                              name="articles[]"
                                              value={index}
                                              checked={
                                                typeof selectedarticles !==
                                                  "undefined" &&
                                                selectedarticles.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnArticleChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"reader_selection" in filters &&
                          Object.keys(filters.reader_selection).length > 0 &&
                          showhidearticle == 1 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Reader Selection</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(
                                      filters.reader_selection
                                    ).map(([index, item]) => (
                                      <li>
                                        <div className="select-multiple-option">
                                          <input
                                            type="radio"
                                            id={`custom-checkbox-reader_selection-${index}`}
                                            name="reader_selection[]"
                                            value={item}
                                            checked={
                                              selectedreaderselection == item
                                            }
                                            onChange={() =>
                                              handleOnReaderSelectionChange(
                                                item
                                              )
                                            }
                                          />
                                          <span className="checkmark"></span>
                                        </div>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

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
                                  checked={
                                    typeof selectedregister !== "undefined" &&
                                    selectedregister == "yes"
                                  }
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
                                  checked={
                                    typeof selectedregister !== "undefined" &&
                                    selectedregister == "no"
                                  }
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
                                  checked={
                                    typeof selectedbounce !== "undefined" &&
                                    selectedbounce == "yes"
                                  }
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
                                  checked={
                                    typeof selectedbounce !== "undefined" &&
                                    selectedbounce == "no"
                                  }
                                  onChange={() => handleBounce("no")}
                                />
                                <span className="checkmark"></span>
                              </div>
                              No
                            </li>
                          </ul>
                        </div>
                        {/*Display only in case of create*/}

                        <div className="segmentation-button">
                          {typeof props.action !== "undefined" &&
                            props.action !== "edit" && (
                              <button
                                className="btn btn-bordered btn-primary"
                                onClick={clearFilter}
                              >
                                Clear
                              </button>
                            )}
                          <button
                            className="btn btn-filled btn-primary"
                            onClick={applyFilter}
                          >
                            Apply
                          </button>
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
          <h6>
            Selected Criterias{" "}
            <span>
              |
              {typeof getfilterdata !== "undefined" && getfilterdata.length > 0
                ? getfilterdata.length
                : 0}
            </span>
          </h6>
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
                        <div className="filter-result">
                          {item == "B&H" ? "Bosnia and Herzegovina" : item}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("country", item)
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedprovince === "object" &&
                selectedprovince.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Province |</span>
                    </div>
                    <div className="filter-div-list">
                      {Object.entries(selectedprovince).map(([index, item]) => (
                        <div className="filter-result">
                          {item}
                          <img
                            onClick={() =>
                              removeindividualfilter("province", item)
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedterritory === "object" &&
                selectedterritory.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Territory |</span>
                    </div>
                    <div className="filter-div-list">
                      {Object.entries(selectedterritory).map(
                        ([index, item]) => (
                          <div className="filter-result">
                            {item}
                            <img
                              onClick={() =>
                                removeindividualfilter("territory", item)
                              }
                              src={path_image + "filter-close.svg"}
                              alt="Close-filter"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedcontacttype === "object" &&
                selectedcontacttype.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Contact Type |</span>
                    </div>
                    <div className="filter-div-list">
                      {Object.entries(selectedcontacttype).map(
                        ([index, item]) => (
                          <div className="filter-result">
                            {item}{" "}
                            <img
                              onClick={() =>
                                removeindividualfilter("contact_type", item)
                              }
                              src={path_image + "filter-close.svg"}
                              alt="Close-filter"
                            />
                          </div>
                        )
                      )}
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
                      {Object.entries(selectedspeciality).map(
                        ([index, item]) => (
                          <div className="filter-result">
                            {item}{" "}
                            <img
                              onClick={() =>
                                removeindividualfilter("speciality", item)
                              }
                              src={path_image + "filter-close.svg"}
                              alt="Close-filter"
                            />
                          </div>
                        )
                      )}
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
                        <div className="filter-result">
                          {item}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("product", item)
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
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
                        <div className="filter-result">
                          {item}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("article", item)
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
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
                        <div className="filter-result">
                          {item}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("consent", item)
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
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
                      <div className="filter-result">
                        {selectedreaderselection}{" "}
                        <img
                          onClick={() =>
                            removeindividualfilter(
                              "reader_selection",
                              selectedreaderselection
                            )
                          }
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                        />
                      </div>
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
                      <div className="filter-result">
                        {selectedibu}{" "}
                        <img
                          onClick={() =>
                            removeindividualfilter("ibu", selectedibu)
                          }
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                        />
                      </div>
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                selectedregister ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Registered |</span>
                    </div>
                    <div className="filter-div-list">
                      <div className="filter-result">
                        {selectedregister}{" "}
                        <img
                          onClick={() =>
                            removeindividualfilter("register", selectedregister)
                          }
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                        />
                      </div>
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                selectedbounce ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Bounced |</span>
                    </div>
                    <div className="filter-div-list">
                      <div className="filter-result">
                        {selectedbounce}{" "}
                        <img
                          onClick={() =>
                            removeindividualfilter("bounce", selectedbounce)
                          }
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                        />
                      </div>
                    </div>
                  </div>
                ) : null
              ) : null}
            </div>
          </div>
        </div>

        {apifilterflag > 0 ? (
          (typeof getfilterdata === "object" && getfilterdata.length > 0) ||
          (typeof getNewAddedUser === "object" &&
            getNewAddedUser.length > 0) ? (
            <div className="box mt-2">
              <Table
                ref={tableCompRef}
                data={getfilterdata}
                newAddedUser={getNewAddedUser}
                smartListName={listname}
                upload_by_filter="1"
                filter_payload={getpayload}
                creator={props.creator}
                sendDataToParent={sendDataToParent}
              />
            </div>
          ) : (
            <div className="box mt-2 no-data">
              <p>No Data Found</p>
            </div>
          )
        ) : null}
      </section>

      {/*Confrimation Popup start*/}
      <Modal
        show={confirmationPopupStatus}
        className="send-confirm"
        id="resend-confirm"
      >
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              hideconfirmationpopup();
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <img src={path_image + "alert.png"} alt="" />
          <h4>Are you sure you want to save the changes?</h4>
          <div className="modal-buttons">
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              onClick={() => {
                createListWithFilters("update");
              }}
            >
              Yes Please!
            </button>
            <button
              type="button"
              className="btn btn-primary btn-bordered light"
              data-bs-dismiss="modal"
              onClick={() => {
                hideconfirmationpopup();
              }}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/*Confrimation Popup end*/}
    </>
  );
};

export default FilterSegment;
