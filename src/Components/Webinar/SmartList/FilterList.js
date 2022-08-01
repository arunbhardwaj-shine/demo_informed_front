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
import { BaseApi } from "../../../Api/BaseApi";
import { popup_alert } from "../../../popup_alert";
import ExportApi from "../../../Api/ExportApi";

const FilterList = (props) => {
  const inputElement = useRef();
  const baseURL = BaseApi.getBaseURL();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCountryName, setSelectedCountryName] = useState([]);
  let { smartListName } ="" ;
  let { smartListId } ="";
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [totalData, setTotalData] = useState([])
  const [countryall, setCountryall] = useState([]);
  const [update, setUpdate] = useState(0);
  const [reRender, setReRender] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filterData, setFiltersData] = useState([]);
  const [selectedConsentVal, setSelectedConsentVal] = useState("");
  const [saveDataModal, setSaveDataModal] = useState(false);

  const [selectedBounceVal, setSelectedBounceVal] = useState("");

  const [indexToRemove, setIndexToRemove] = useState();

  const [updateFilterData, setUpdataFilterData] = useState(0);

  let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [filterList, setFilterList] = useState({
    profession: ["Doctor", "Nurse", "Engineer"],
    interest: ["Surgery", "Psychatrist", "Neuro"],
  });

  const [selectedProfession, setSelectedProfession] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState([]);
  const [selectedConsent, setSelectedConsent] = useState();
  const [selectedbounce, setSelectedBounce] = useState();

  const [api_flag, setapi_flag] = useState(0);
  const showConfirmation =()=>{
    popup_alert({
            visible: "show",
            message: "Data updated <br> successfully",
            type: "error",
            redirect: "/webinar/email/WebinarSmartList",
          });
  }
  const saveAlert=(data)=>{
    setSaveDataModal(data)
  }
  useEffect(() => {
    if(props.id&&props.name){
     smartListName  = props.name;
     smartListId  = props.id;
    }else{
   
    }
    // console.log(location.state.smartListId)
    // console.log(location.state.smartName)
    const getalCountry = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Token")}`,
      };
      await axios
        .get(baseURL + `/country`, { headers })
        .then((res) => {
          // console.log(res);
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
    setSelectedCountryName([]);
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
    // console.log(item);
    const { value, checked } = e.target;
    // console.log(value);
    // console.log(checked);

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
    // console.log(profession);
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
    // console.log(interest);
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

  const removeSelectedProfessionFilter = (index,name) => {
    console.log("1",index);
    let country_selected_name = selectedProfession;
    const data = country_selected_name.splice(index, 1);
    console.log("2",country_selected_name);
    setSelectedProfession(country_selected_name);

    document.getElementById(`custom-checkbox-Profession-${name}`).click()
    setReRender(reRender + 1);
   const ddd = countryall.find((item) => {
     return item.country == data;
   });
 };
  const removeSelectedInterestFilter = (index,name) => {
    console.log("1",index);
    let country_selected_name = selectedInterest;
    const data = country_selected_name.splice(index, 1);
    console.log("2",country_selected_name);
    setSelectedInterest(country_selected_name);

    document.getElementById(`custom-checkbox-Interest-${name}`).click()
    setReRender(reRender + 1);
   const ddd = countryall.find((item) => {
     return item.country == data;
   });
 };
  const removeSelectedConsentFilter = (name) => {
     if(name=="Yes"){
       setSelectedConsentVal("")
       document.getElementById(`register_yes`).checked=false
     }else{
      setSelectedConsentVal("")
      document.getElementById(`register_no`).checked=false
     }
    setReRender(reRender + 1);
 };
  const removeSelectedCountryFilter = (index,name) => {
     console.log("1",index);

     let country_selected_name = selectedCountryName;
     const data = country_selected_name.splice(index, 1);
     console.log("2",country_selected_name);
     setSelectedCountryName(country_selected_name);
     
     let selected_country = selectedCountry;
     selected_country.splice(index, 1);
     setSelectedCountry(selected_country);
     document.getElementById(`custom-checkbox-Country-${name}`).click()
     setReRender(reRender + 1);
    //  var elm = document.getElementById(`custom-checkbox-Country-${name}`).checked;
    //  console.log("elm",elm)
    //  if (true||false != elm.checked) {
    //    elm.click();
    //  }
    //  document.getElementById().checked=false
    //  console.log(data);

    const ddd = countryall.find((item) => {
      return item.country == data;
    });

    // console.log(ddd);

    // console.log(inputElement.currents);
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
    // console.log(filterData);
    const participants_id = filterData.map((data) => {
      return data.id;
    });

    // console.log(smartListId);
    // console.log(smartListName);
    // console.log(participants_id);
// console.log(participants_id)
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };

    const body = {
      id: props.id?JSON.stringify(smartListId):localStorage.getItem("SmartListIdView"),
      name:props.name? smartListName:localStorage.getItem("SmartListIdViewName"),
      participants: JSON.stringify(participants_id),
      creator:localStorage.getItem("username")
    };

    // loader("show");
    await axios
      .post(baseURL + `/smart-list/create`, body, {
        headers,
      })
      .then((res) => {
        // console.log(res);

        if (res.data.code == 200) {
          popup_alert({
            visible: "show",
            message: "Your Smart List has been created <br />successfully !",
            type: "success",
            redirect: "",
          });
          navigate("/webinar/email/WebinarSmartList");
          // loader("hide");
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
        loader("hide");
      });
  };

  const applyFilter = async () => {
    if (
      selectedCountry.length == 0 &&
      selectedProfession.length == 0 &&
      selectedInterest.length == 0
    ) {
      toast.error("Please select a filter");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };

    const body = {
      profession: selectedProfession,
      interest: selectedInterest,
      state: [],
      bounced: selectedbounce,
      consent: selectedConsent,
      country_id: selectedCountry
    };

    loader("show");
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

    await axios
      .post(baseURL + `/smart-list/filter`, body, {
        headers,
      })
      .then((res) => {
        // console.log(res);

        if (res.data.code == 200) {
          setFiltersData(res.data.data);
          // setFiltersData((oldArray) => [...oldArray, ...res.data.data]);
          loader("hide");
        } else {
          toast.error(res.data.message);
          // setFiltersData([]);
          loader("hide");
        }
      })
      .catch((err) => {
        loader("hide");
      });
  };

  const onDelete = async (index) => {
    setIsOpen(true);
    setIndexToRemove(index);
  };
  const closeClicked = () => {
    if(props.active=="0"){
      navigate("/webinar/email/WebinarSmartList");
    }else{
      navigate("/webinar/email/SmartListCreate");
    }
  };
  const getData=()=>{
    ExportApi.GetSmartListSingleRecord(props.id)
    .then((resp) => {
      if (resp.data.data) {
        setFiltersData(resp?.data?.data)
        console.log(resp.data.data)
         setTotalData((oldArray) => [...oldArray, ...resp.data.data]);
      }else{
        console.log(resp.data)
      }
    })
}
useEffect(() => {
getData()
}, [props.id])
  return (
    <>
        <div className="loader" id="custom_loader">
          <span className="loader-view"> </span>
        </div>
      {/* {console.log(selectedCountry)} */}
      <div className={props.active==0?"page-top-nav smart_list_names create_filter_list":"right-sidebar col"}>
        {props.active==0?
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-6">
              <div className="page-title">
                <h2>{props.name}</h2>
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
                <button
                  className="btn btn-primary btn-filled save"
                 onClick={() =>saveDataModal? showConfirmation():null}
                 disabled={
                  saveDataModal==false?true:false
                  }
                >
                  Save
                </button>
              </div>
            </div>  
     
          </div>
        : <div className="page-top-nav smart_list_names create_filter_list">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left back_btn">
                <a href="/webinar/email/SmartListCreate">
                  <button class="btn btn-primary btn-filled back">
                    <svg
                      width="12"
                      height="19"
                      viewBox="0 0 12 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.31557 17.82C8.97165 18.476 10.0354 18.476 10.6915 17.82C11.3475 17.1639 11.3475 16.1002 10.6915 15.4441L4.7522 9.50484L10.6927 3.56431C11.3488 2.90823 11.3488 1.84451 10.6927 1.18843C10.0367 0.532347 8.97294 0.532347 8.31686 1.18843L1.2212 8.28409C1.21 8.29469 1.19891 8.30548 1.18794 8.31646C0.531858 8.97254 0.531858 10.0363 1.18794 10.6923L8.31557 17.82Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </a>

                {/* <button className="btn btn-primary btn-filled back">
                  <NavLink to="/webinar/email/SmartListCreate">
                  <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M8.31557 17.82C8.97165 18.476 10.0354 18.476 10.6915 17.82C11.3475 17.1639 11.3475 16.1002 10.6915 15.4441L4.7522 9.50484L10.6927 3.56431C11.3488 2.90823 11.3488 1.84451 10.6927 1.18843C10.0367 0.532347 8.97294 0.532347 8.31686 1.18843L1.2212 8.28409C1.21 8.29469 1.19891 8.30548 1.18794 8.31646C0.531858 8.97254 0.531858 10.0363 1.18794 10.6923L8.31557 17.82Z" fill="white"/>
									</svg>
                  </NavLink>
                </button> */}
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
                {/* <a className="btn btn-primary btn-filled light" href="#">
                  <NavLink to="/webinar/email/SmartListCreate">
                    {" "}
                    <img
                      src={path_image + "arrow-left.svg"}
                      alt=""
                      //    onClick={closeClicked}
                    />
                  </NavLink>{" "}
                </a> */}
              </div>
            </div>
            <div className="col-12 col-md-9">
              <ul className="tabnav-link">
                <li className="">
                  <a href="javascript:void(0)">Create smart list</a>
                </li>
                <li className="active active-main">
                  <a href="javascript:void(0)">Select & Verify Your HCP</a>
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
        </div>}
        <ToastContainer />

        <section className="search-hcp smart-list-name">
        <div className="smart-list-name-drop">
        <h5>Please select who to include to your smart list.You can pick one or more:</h5>
        </div>
          <div className="smart-list-name-drop">
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
                          {countryall.length > 0 && (
                            <>
                            
                              <div className="col block-smart-name">
                                <h6>Country</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {countryall.map((item, index) => (
                                      <li>
                                     {/* {console.log("filterData",`custom-checkbox-Country-${item.name}`)}  */}
                                        <div className="select-multiple-option">
                                          <input
                                            ref={inputElement}
                                            type="checkbox"
                                            id={`custom-checkbox-Country-${item.country}`}
                                            name="contact_type[]"
                                            value={item.country_id}
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
                                              id={`custom-checkbox-Profession-${profession}`}
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
                                              id={`custom-checkbox-Interest-${interest}`}
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
                            {/* <h6>Bounced</h6>
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
                            </ul> */}
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
              Selected Criterias
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
                          {item}
                          <img
                            onClick={() => removeSelectedCountryFilter(index,item)}
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
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
                          <img
                            onClick={() => removeSelectedProfessionFilter(index,item)}
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
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
                          <img
                            onClick={() => removeSelectedInterestFilter(index,item)}
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
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
                        <img
                            onClick={() =>
                              removeSelectedConsentFilter(selectedConsentVal)
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                      </div>
                    </div>
                  </div>
                ) : null}
                  {/* {selectedBounceVal ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Bounce |</span>
                    </div>
                    <div className="filter-div-list">
                      <div className="filter-result">
                        {selectedBounceVal}{" "}
                        <img
                            onClick={() =>
                              // removeindividualfilter("ibu", selectedibu)
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                      </div>
                    </div>
                  </div>
                ) : null} */}
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
          {/* {console.log("filterData",filterData)} */}
         <TableView data={filterData} smartListId={props.active==0?props.id:smartListId} active={props.active==0?props.active:null} saveAlert={saveAlert} upload_by_filter="1" applyFilter={applyFilter} /> 
          {/* {filterData?.length > 0 ? (
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
          ) : null} */}
        </section>
      </div>

      <Modal show={isOpen} className="send-confirm" id="delete-smartlist">
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
