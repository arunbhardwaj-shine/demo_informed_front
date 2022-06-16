import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";
import Filters from "./Filters";
import { Accordion } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import TableView from "./TableView";
import { loader } from "../../../loader";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const FilterList = () => {
  const inputElement = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCountryName, setSelectedCountryName] = useState([]);
  const { smartListName } = location.state;
  const { smartListId } = location.state;
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [countryall, setCountryall] = useState([]);
  const [update, setUpdate] = useState(0);
  const [reRender, setReRender] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filterData, setFiltersData] = useState([]);
  const [selectedConsentVal, setSelectedConsentVal] = useState("");
  const [selectedBounceVal, setSelectedBounceVal] = useState("");

  const [indexToRemove, setIndexToRemove] = useState();

  const [updateFilterData, setUpdataFilterData] = useState(0);

  let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [filterList, setFilterList] = useState({
    profession: ["doctor", "nurse", "engineer"],
    interest: ["surgery", "psychatrist", "neuro"],
  });

  const [selectedProfession, setSelectedProfession] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState([]);
  const [selectedConsent, setSelectedConsent] = useState();
  const [selectedbounce, setSelectedBounce] = useState();

  const [api_flag, setapi_flag] = useState(0);
  useEffect(() => {
    const getalCountry = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Token")}`,
      };
      await axios
        .get(`http://51.89.210.56:8000/api/country`, { headers })
        .then((res) => {
          console.log(res);
          const countrys = res.data.data.map((data) => {
            return data;
          });
          setCountryall(countrys);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getalCountry();
  }, []);

  const clearFilter = () => {
    document.querySelectorAll("input").forEach((checkbox) => {
      checkbox.checked = false;
    });

    setSelectedBounce();
    setSelectedConsentVal();
    setSelectedBounceVal();
    setSelectedConsent();
    setSelectedCountry([]);
    setSelectedProfession([]);
    setSelectedInterest([]);

    setUpdate(update + 1);
  };

  const handleConsent = (consent_val) => {
    setSelectedConsent(consent_val);
    if (consent_val == 1) {
      setSelectedConsentVal("Yes");
    } else {
      setSelectedConsentVal("No");
    }
  };

  const handleBounce = (bounce_val) => {
    setSelectedBounce(bounce_val);

    if (bounce_val == 1) {
      setSelectedBounceVal("Yes");
    } else {
      setSelectedBounceVal("No");
    }
  };

  const handleOnCountryChange = (e, item) => {
    console.log(item);
    const { value, checked } = e.target;
    console.log(value);
    console.log(checked);

    if (checked) {
      setSelectedCountry((oldArray) => [...oldArray, item.id]);
      setSelectedCountryName((oldArray) => [...oldArray, item.country]);
    } else {
      const country_selected = selectedCountry.filter((data) => {
        return data != item.id;
      });

      const country_selected_name = selectedCountryName.filter((data) => {
        return data != item.country;
      });

      setSelectedCountry(country_selected);
      setSelectedCountryName(country_selected_name);
    }
  };

  const handleOnProfessionChange = (e, profession) => {
    console.log(profession);
    const { value, checked } = e.target;
    if (checked) {
      setSelectedProfession((oldArray) => [...oldArray, profession]);
    } else {
      const profession_selected = selectedProfession.filter((data) => {
        return data != profession;
      });

      setSelectedProfession(profession_selected);
    }
  };

  const handleOnInterestChange = (e, interest) => {
    console.log(interest);
    const { value, checked } = e.target;
    if (checked) {
      setSelectedInterest((oldArray) => [...oldArray, interest]);
    } else {
      const interest_selected = selectedInterest.filter((data) => {
        return data != interest;
      });

      setSelectedInterest(interest_selected);
    }
  };

  const removeSelectedCountryFilter = (index) => {
    console.log(selectedCountryName);

    let country_selected_name = selectedCountryName;
    const data = country_selected_name.splice(index, 1);
    console.log(country_selected_name);
    setSelectedCountryName(country_selected_name);

    let selected_country = selectedCountry;
    selected_country.splice(index, 1);
    setSelectedCountry(selected_country);
    setReRender(reRender + 1);

    console.log(data);

    const ddd = countryall.find((item) => {
      return item.country == data;
    });

    console.log(ddd);

    console.log(inputElement.currents);
    // document.querySelectorAll("input").forEach((checkbox) => {
    //   checkbox.checked = false;
    // });
  };

  const deleteReader = async (index) => {
    const data = filterData;
    data.splice(index, 1);

    setFiltersData(data);

    setUpdataFilterData(updateFilterData + 1);
  };

  const createListWithFilters = async () => {
    console.log(filterData);
    const participants_id = filterData.map((data) => {
      return data.id;
    });

    console.log(smartListId);
    console.log(smartListName);
    console.log(participants_id);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };

    const body = {
      id: JSON.stringify(smartListId),
      name: smartListName,
      participants: JSON.stringify(participants_id),
    };

    loader("show");
    await axios
      .post(`http://51.89.210.56:8000/api/smart-list/create`, body, { headers })
      .then((res) => {
        console.log(res);

        if (res.data.code == 200) {
          navigate("/webinar/email/WebinarSmartList");
          loader("hide");
        }
        //  console.log(res.data.status_code);
        //  if (res.data.status_code == 200) {
        //    setFilterData(res.data.response.data);
        //  setFiltersData(res.data.data);
        //  } else {
        //    setFilterData();
        //  }
        //  setApiFilterFlag(1);
        //  loader("hide");
      })
      .catch((err) => {
        //loader("hide");
        console.log(err);
      });
  };

  const applyFilter = async () => {
    if (
      selectedCountry.length == 0 &&
      selectedProfession.length == 0 &&
      selectedInterest.length == 0
    ) {
      toast.error("please select a filter");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };

    const body = {
      profession: JSON.stringify(selectedProfession),
      interest: JSON.stringify(selectedInterest),
      state: JSON.stringify([]),
      bounced: JSON.stringify(selectedbounce),
      consent: JSON.stringify(selectedConsent),
      country_id: JSON.stringify(selectedCountry),
    };

    loader("show");
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

    await axios
      .post(`http://51.89.210.56:8000/api/smart-list/filter`, body, { headers })
      .then((res) => {
        console.log(res);

        if (res.data.code == 200) {
          setFiltersData(res.data.data);
          loader("hide");
        } else {
          toast.error(res.data.message);
          setFiltersData([]);
          loader("hide");
        }
      })
      .catch((err) => {
        //loader("hide");
        console.log(err);
      });
  };

  const onDelete = async (index) => {
    setIsOpen(true);
    setIndexToRemove(index);
  };
  const closeClicked = () => {
    navigate("/webinar/email/SmartListCreate");
  };
  return (
    <>
      {console.log(selectedCountry)}
      <div className="right-sidebar">
        <div className="loader" id="custom_loader">
          <span className="loader-view"> </span>
        </div>
        <ToastContainer />
        <div className="page-top-nav smart_list_names create_filter_list">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-right back_btn">
                {/* <button className="btn btn-primary btn-bordered back">
                  <NavLink
                    to="/webinar/email/SmartListCreate"
                    className="active"
                  >
                   <img
                    src={path_image + "arrow-left.svg"}
                    alt=""
                    onClick={closeClicked}
                  />
                  </NavLink>
                </button> */}
                <a className="btn btn-primary btn-filled light" href="#">
                  <NavLink to="/webinar/email/SmartListCreate">
                    {" "}
                    <img
                      src={path_image + "arrow-left.svg"}
                      alt=""
                      //    onClick={closeClicked}
                    />
                  </NavLink>{" "}
                </a>
              </div>
            </div>
            <div className="col-12 col-md-9">
              <ul className="tabnav-link">
                <li className="">
                  <a href="javascript:void(0)">Create smart list</a>
                </li>
                <li className="active">
                  <a href="javascript:void(0)">Segmentation</a>
                </li>
              </ul>
            </div>

            <div className="col-12 col-md-2">
              <div className="header-btn">
                <button className="btn btn-primary btn-bordered light">
                  <NavLink to="/webinar/email/SmartListCreate">Cancel</NavLink>
                </button>
                <button
                  className="btn btn-primary btn-bordered save-as"
                  onClick={() => createListWithFilters()}
                  disabled={
                    typeof filterData !== "undefined" && filterData.length > 0
                      ? false
                      : true
                  }
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="search-hcp smart-list-name">
          <div className="smart-list-name-drop">
            <div className="smart-list-dropdown">
              <div className="dropdown-smart">
                <div id="accordion-smart">
                  <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item className="card" eventKey="0">
                      <div className="card-header">
                        <Accordion.Header className="btn">
                          Filter your list
                        </Accordion.Header>
                      </div>
                      <Accordion.Body>
                        <div className="card-body">
                          {countryall.length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Country</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {countryall.map((item, index) => (
                                      <li>
                                        <div className="select-multiple-option">
                                          <input
                                            ref={inputElement}
                                            type="checkbox"
                                            id={`custom-checkbox-contact_type-${index}`}
                                            name="contact_type[]"
                                            value={item.country}
                                            // checked={
                                            //   typeof selectedcontacttype !==
                                            //     "undefined" &&
                                            //   selectedcontacttype.indexOf(
                                            //     item
                                            //   ) !== -1
                                            // }
                                            onChange={(e) =>
                                              handleOnCountryChange(e, item)
                                            }
                                          />
                                          <span className="checkmark"></span>
                                        </div>
                                        {item.country}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                          {filterList.profession.length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Profession</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {filterList.profession.map(
                                      (profession, index) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-speciality-${index}`}
                                              name="speciality[]"
                                              value={profession}
                                              // checked={
                                              //   typeof selectedspeciality !==
                                              //     "undefined" &&
                                              //   selectedspeciality.indexOf(
                                              //     item
                                              //   ) !== -1
                                              // }
                                              onChange={(e) =>
                                                handleOnProfessionChange(
                                                  e,
                                                  profession
                                                )
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {profession}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                          {filterList.interest.length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Interest</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {filterList.interest.map(
                                      (interest, index) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-speciality-${index}`}
                                              name="speciality[]"
                                              value={interest}
                                              // checked={
                                              //   typeof selectedspeciality !==
                                              //     "undefined" &&
                                              //   selectedspeciality.indexOf(
                                              //     item
                                              //   ) !== -1
                                              // }
                                              onChange={(e) =>
                                                handleOnInterestChange(
                                                  e,
                                                  interest
                                                )
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {interest}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                          {/*   {"reader_selection" in filters &&
                            Object.keys(filters.reader_selection).length >
                              0 && (
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

                          {"ibu" in filters &&
                            Object.keys(filters.ibu).length > 0 && (
                              <>
                                <div className="col block-smart-name">
                                  <h6>Ibu</h6>
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

                          {"consent_type" in filters &&
                            filters.consent_type.length > 0 && (
                              <>
                                <div className="col block-smart-name">
                                  <h6>Consent Type</h6>
                                  <div className="smart-name-list">
                                    <ul>
                                      {filters.consent_type.map(
                                        (item, index) => (
                                          <li>
                                            <div className="select-multiple-option">
                                              <input
                                                type="checkbox"
                                                id={`custom-checkbox-consent_type-${index}`}
                                                name="consent_type[]"
                                                value={index}
                                                onChange={() =>
                                                  handleOnConsentChange(index)
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
*/}
                          <div className="col block-smart-name registered">
                            <h6>Consent</h6>
                            <ul>
                              <li>
                                <div className="select-multiple-option">
                                  <input
                                    type="radio"
                                    id="register_yes"
                                    name="register"
                                    value="yes"
                                    // checked={
                                    //   typeof selectedregister !== "undefined" &&
                                    //   selectedregister == "yes"
                                    // }
                                    onChange={() => handleConsent(1)}
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
                                    // checked={
                                    //   typeof selectedregister !== "undefined" &&
                                    //   selectedregister == "no"
                                    // }
                                    onChange={() => handleConsent(0)}
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
                                    // checked={
                                    //   typeof selectedbounce !== "undefined" &&
                                    //   selectedbounce == "yes"
                                    // }
                                    onChange={() => handleBounce(1)}
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
                                    // checked={
                                    //   typeof selectedbounce !== "undefined" &&
                                    //   selectedbounce == "no"
                                    // }
                                    onChange={() => handleBounce(0)}
                                  />
                                  <span className="checkmark"></span>
                                </div>
                                No
                              </li>
                            </ul>
                          </div>
                          {/*Display only in case of create*/}

                          <div className="segmentation-button">
                            {
                              <button
                                className="btn btn-bordered btn-primary"
                                onClick={clearFilter}
                              >
                                Clear
                              </button>
                            }
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
              {/* <span>
                |
                {typeof getfilterdata !== "undefined" &&
                getfilterdata.length > 0
                  ? getfilterdata.length
                  : 0}
              </span> */}
            </h6>
            <div className="filter-block">
              <div className="filter-block-left">
                {selectedCountryName.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Country |</span>
                    </div>
                    <div className="filter-div-list">
                      {selectedCountryName.map((item, index) => (
                        <div className="filter-result">
                          {item}{" "}
                          {/* <img
                            onClick={() => removeSelectedCountryFilter(index)}
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          /> */}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {selectedProfession.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Profession |</span>
                    </div>
                    <div className="filter-div-list">
                      {selectedProfession.map((item, index) => (
                        <div className="filter-result">
                          {item}{" "}
                          {/* <img
                            onClick={() => removeSelectedCountryFilter(index)}
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          /> */}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {selectedInterest.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Interest |</span>
                    </div>
                    <div className="filter-div-list">
                      {selectedInterest.map((item, index) => (
                        <div className="filter-result">
                          {item}{" "}
                          {/* <img
                            onClick={() => removeSelectedCountryFilter(index)}
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          /> */}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* {updateflag > 0 ? (
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

               /* {updateflag > 0 ? (
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
                        {Object.entries(selectedproduct).map(
                          ([index, item]) => (
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
                          )
                        )}
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
                        {Object.entries(selectedarticles).map(
                          ([index, item]) => (
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
                          )
                        )}
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
                        {Object.entries(selectedconsent).map(
                          ([index, item]) => (
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
                          )
                        )}
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
                ) : null} */}
              </div>
              <div className="filter-block-right">
                {selectedConsentVal ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Consent |</span>
                    </div>
                    <div className="filter-div-list">
                      <div className="filter-result">
                        {selectedConsentVal}{" "}
                        {/* <img
                            onClick={() =>
                              removeindividualfilter("ibu", selectedibu)
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          /> */}
                      </div>
                    </div>
                  </div>
                ) : null}

                {selectedBounceVal ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Bounce |</span>
                    </div>
                    <div className="filter-div-list">
                      <div className="filter-result">
                        {selectedBounceVal}{" "}
                        {/* <img
                            onClick={() =>
                              removeindividualfilter("ibu", selectedibu)
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          /> */}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              {/* <div className="filter-block-right">
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
                              removeindividualfilter(
                                "register",
                                selectedregister
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
              </div> */}
            </div>
          </div>

          {filterData?.length > 0 ? (
            <div className="box mt-2">
              <div class="selected-hcp-list">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Bounced</th>
                      <th scope="col">Country</th>
                      <th scope="col">Hospital</th>
                      <th scope="col">Profession</th>
                      <th scope="col">Interest</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData.map((item, index) => {
                      return (
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>NA</td>
                          <td>NA</td>
                          <td>NA</td>
                          <td>NA</td>
                          <td>NA</td>
                          <td
                            class="delete_row"
                            colspan="12"
                            onClick={() => onDelete(index)}
                          >
                            <img
                              src={path_image + "delete.svg"}
                              alt="Delete Row"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </section>
      </div>

      <Modal show={isOpen} className="send-confirm" id="resend-confirm">
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              setIsOpen(false);
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <img src={path_image + "alert.png"} alt="" />
          <h4>
            The record will be deleted from the list.
            <br />
            Are you sure you want to delete it?
          </h4>

          <div className="modal-buttons">
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              onClick={() => {
                deleteReader(indexToRemove);
                setIsOpen(false);

                //    setOpenDeleteConfirmation(true);
                // setUpdatedData(update + 1);
              }}
            >
              Yes Please!
            </button>

            <button
              type="button"
              className="btn btn-primary btn-bordered light"
              data-bs-dismiss="modal"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default FilterList;
