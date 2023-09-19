import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  ModalTitle,
  Row,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { rdregistration } from "../Validations/RegisterValidation/Rdregistration";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import { loader } from "../../loader";
import Select from "react-select";
import axios from "axios";

const RDRegister = () => {
  window.location.href = 'https://docintel.app/LEX-210-Registration/';
  // const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  // const [show, setShow] = useState(false);
  // const [siteCountry, setSiteCountry] = useState([]);
  // const [siteNumber, setSiteNumber] = useState([]);
  // const [siteName, setSiteName] = useState([]);
  // const [siteCity, setSiteCity] = useState([]);
  // const [apiData, setApiData] = useState([]);
  // const [error, setError] = useState({});
  // const [institutionFlag, setInstitutionFlag] = useState(false);
  // const [siteInstitution, setSiteInstitution] = useState([
  //   { value: "institution", label: "Study site" },
  //   { value: "cro", label: "Premier Research" },
  //   { value: "comac", label: "Comac" },
  //   { value: "octapharma", label: "Octapharma" },
  // ]);
  // const [userInputs, setInputs] = useState({
  //   name: "",
  //   email: "",
  //   country: "",
  //   institution: "",
  //   sitenumber: "",
  //   sitename: "",
  //   sitecity: "",
  // });

  // useEffect(() => {
  //   window.location.href = 'https://docintel.app/LEX-210-Registration/';
  //   getData();
  // }, []);

  // const handleClose = () => setShow(false);

  // const getData = async () => {
  //   loader("show");
  //   try {
  //     let body = {
  //       user_id: "56Ek4feL/1A8mZgIKQWEqg==",
  //     };
  //     await axios.post(ENDPOINT.FILTERLIST, body).then((response) => {
  //       let site_number = response?.data?.response?.data?.site_number;
  //       let country = response?.data?.response?.data?.country;
  //       let siteNumber = createSelectObj(site_number);
  //       let siteCountries = createSelectObj(country);
  //       setApiData(response?.data?.response?.data);
  //       setSiteCountry(siteCountries);
  //       setSiteNumber(siteNumber);
  //       loader("hide");
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     loader("hide");
  //   }
  // };

  // const handleChange = (e, isSelectedName) => {
  //   if (isSelectedName == "country") {
  //     setInputs({
  //       name: userInputs?.name,
  //       email: userInputs?.email,
  //       country: e,
  //       institution: userInputs?.institution,
  //       sitenumber: "",
  //       sitename: "",
  //       sitecity: "",
  //     });
  //   } else if (isSelectedName == "institution") {
  //     // if(e == "site_name") {
  //     setInputs({
  //       name: userInputs?.name,
  //       email: userInputs?.email,
  //       country: "",
  //       institution: e,
  //       sitenumber: "",
  //       sitename: "",
  //       sitecity: "",
  //     });
  //     // }
  //   } else if (isSelectedName == "sitenumber") {
  //     let site_name_value = "";
  //     Object.entries(apiData?.site_data).forEach(([key, value]) => {
  //       if (e == key) {
  //         site_name_value = value;
  //       }
  //     });

  //     let site_city_value = "";
  //     Object.entries(apiData?.site_city_data).forEach(([key, value]) => {
  //       if (e == key) {
  //         site_city_value = value;
  //       }
  //     });

  //     setInputs({
  //       name: userInputs?.name,
  //       email: userInputs?.email,
  //       country: userInputs?.country,
  //       institution: userInputs?.institution,
  //       sitenumber: e,
  //       sitename: site_name_value,
  //       sitecity: site_city_value,
  //     });
  //   } else if (isSelectedName == "sitename") {
  //     let site_number_value = "";
  //     let siteValue = e.split("=+")?.[1];
  //     // Object.entries(apiData?.site_data).forEach(([key, value]) => {
  //     //   if (e == value) {
  //     //     site_number_value = key;
  //     //   }
  //     // });

  //     let site_city_value = "";
  //     Object.entries(apiData?.site_city_data).forEach(([key, value]) => {
  //       if (siteValue == key) {
  //         site_city_value = value;
  //       }
  //     });

  //     setInputs({
  //       name: userInputs?.name,
  //       email: userInputs?.email,
  //       country: userInputs?.country,
  //       institution: userInputs?.institution,
  //       sitenumber: siteValue,
  //       sitename: e,
  //       sitecity: site_city_value,
  //     });
  //   } else if (isSelectedName == "rdChecheckbox") {
  //     setInputs({
  //       ...userInputs,
  //       [isSelectedName]: e?.target?.checked,
  //     });
  //   } else {
  //     setInputs({
  //       ...userInputs,
  //       [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
  //         ? e?.target?.files
  //           ? e?.target?.files
  //           : e
  //         : e?.target?.value,
  //     });
  //   }

  //   if (isSelectedName == "institution") {
  //     if (e == "institution") {
  //       setInstitutionFlag(true);
  //       let objcountry = Object.values(apiData?.site_country_data);
  //       let countryValuesSet = new Set(objcountry);
  //       const sortedArray = [...countryValuesSet].sort();
  //       // (optional) convert the sorted array back to a Set object
  //       let countryValues = new Set(sortedArray);
  //       let country = [];
  //       countryValues?.forEach((element) => {
  //         country.push({
  //           label: element,
  //           value: element == "Bosnia and Herzegovina" ? "B&H" : element,
  //         });
  //       });
  //       setSiteCountry(country);
  //     } else {
  //       let updatedCountry = createSelectObj(apiData?.country);
  //       setSiteCountry(updatedCountry);
  //       setInstitutionFlag(false);
  //     }
  //   }

  //   if (isSelectedName == "country") {
  //     let newSite = [],
  //       newAr = [];
  //     let sitenumb = [];
  //     setSiteCity([]);
  //     Object.entries(apiData?.site_country_data).forEach(([key, value]) => {
  //       if (e == "B&H") {
  //         e = "Bosnia and Herzegovina";
  //       }
  //       if (value == e) {
  //         newSite.push({ label: key, value: key });
  //         if (apiData?.site_data[key]) {
  //           let newValue = `${apiData?.site_data[key]} =+${key}`;
  //           let newLabel = `${apiData?.site_data[key]} (${key})`;
  //           newAr.push({ label: newLabel, value: newValue });
  //         }
  //         sitenumb.push(key);
  //       }
  //     });
  //     setSiteNumber(newSite);

  //     // let siteName = [];
  //     // Object.entries(apiData?.site_data).forEach(([key, value]) => {
  //     //   if (sitenumb.includes(key)) {

  //     //     siteName.push({ label: value, value: value });
  //     //   }
  //     // });
  //     setSiteName(newAr);

  //     //
  //     // let siteCity = [];
  //     // Object.entries(apiData?.site_city_data).forEach(([key, value]) => {
  //     //     if(sitenumb.includes(key)){
  //     //       if(siteCity.length > 0){
  //     //         if(siteCity.findIndex((el) => el.value == value) == -1){
  //     //           siteCity.push({label:value,value:value})
  //     //         }
  //     //       }else{
  //     //         siteCity.push({label:value,value:value})
  //     //       }
  //     //     }
  //     // });
  //     // setSiteCity(siteCity);
  //   }

  //   if (isSelectedName == "sitenumber" || isSelectedName == "sitename") {
  //     // let siteName = [];
  //     // Object.entries(apiData?.site_data).forEach(([key, value]) => {
  //     //     if(e == key){
  //     //       siteName.push({label:value,value:value})
  //     //     }
  //     // });
  //     // setSiteName(siteName);
  //     let siteValue = e.split("=+")?.[1];
  //     let site_value = "";
  //     if (isSelectedName == "sitename") {
  //       // Object.entries(apiData?.site_data).forEach(([key, value]) => {
  //       site_value = siteValue;
  //       //   if (siteValue == value) {
  //       //     site_value = key;
  //       //   }
  //       // });
  //     } else {
  //       site_value = e;
  //     }
  //     let siteCity = [];
  //     Object.entries(apiData?.site_city_data).forEach(([key, value]) => {
  //       if (site_value == key) {
  //         siteCity.push({ label: value, value: value });
  //       }
  //     });
  //     setSiteCity(siteCity);
  //   }
  // };

  // const createSelectObj = (data) => {
  //   let objData = [];
  //   Object.entries(data).map(([index, item]) => {
  //     let label = item;
  //     if (index == "B&H") {
  //       label = "Bosnia and Herzegovina";
  //     }
  //     objData.push({
  //       value: item,
  //       label: label,
  //     });
  //   });
  //   return objData;
  // };

  // const submitHandler = async () => {
  //   const err = rdregistration(userInputs);
  //   if (Object.keys(err)?.length) {
  //     console.log(err);
  //     setError(err);
  //     return;
  //   } else {
  //     delete userInputs.rdChecheckbox;
  //     loader("show");
  //     try {
  //       const options = {
  //         headers: { "Content-Type": "application/json" },
  //       };

  //       await axios
  //         .post(ENDPOINT.REGISTERRD, userInputs, options)
  //         .then((response) => {
  //           if (response?.data?.status_code == 200) {
  //             setInputs({
  //               name: "",
  //               email: "",
  //               country: "",
  //               institution: "",
  //               sitenumber: "",
  //               sitename: "",
  //               sitecity: "",
  //             });
  //             document.getElementById("myForm").reset();
  //             setError({});
  //             setShow(true);
  //             setTimeout(() => {
  //               window.location.href =
  //                 "https://albert.docintel.app/redirect?user-id=" +
  //                 response?.data?.id +
  //                 "&encf=1";
  //             }, 2000);
  //           } else {
  //             let obj = { Api: response?.data?.message };
  //             setError(obj);
  //           }
  //           loader("hide");
  //         });
  //     } catch (err) {
  //       console.log(err);
  //       loader("hide");
  //     }
  //   }
  // };

  // return (
  //   <>
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  //     {/*Loader code*/}
  //     <div className="loader" id="custom_loader">
  //       <div className="loader_show">
  //         <span className="loader-view"> </span>
  //       </div>
  //     </div>
  //     <div className="rd-main-wrapper">
  //       <Container>
  //         <div className="container-sm">
  //           <div className="header-sec d-flex">
  //             <div className="header-left">
  //               <span>Welcome to the</span>
  //               <h1>
  //                 LEX-210 <span>Study</span>
  //               </h1>
  //             </div>
  //             <div className="header-right">
  //               <p>
  //                 Study of{" "}
  //                 <img
  //                   className="text-img"
  //                   src={path_image + "text-img.png"}
  //                   alt="text-img"
  //                 />
  //                 in patients with acute major bleeding on DOAC therapy with
  //                 factor xa inhibitor
  //               </p>
  //             </div>
  //           </div>
  //           <div className="form-wrapper">
  //             {error?.Api ? (
  //               <div className="common-login-validation">{error?.Api}</div>
  //             ) : null}
  //             <div className="form-head-sec">
  //               <h3>
  //               We provide here study-related training material and contents to healthcare professionals participating in the LEX-210 study.<br/><br/>
  //               Please provide your details to register and access the contents.<br/><br/>
  //               Octapharma will <u>not</u> track potential engagement on the provided contents on an individual user basis. Please refer to the "Octapharma privacy statement" in the link below.
  //               </h3>
  //             </div>
  //             <Form className="form" id="myForm">
  //               <Row>
  //                 <Col md={6}>
  //                   <div className="form-group">
  //                     <label>
  //                       Name <span>*</span>
  //                     </label>
  //                     <input
  //                       type="text"
  //                       placeholder="Enter your name"
  //                       name="name"
  //                       onChange={handleChange}
  //                     />

  //                     {error?.name ? (
  //                       <div className="login-validation">{error?.name}</div>
  //                     ) : null}
  //                   </div>
  //                 </Col>
  //                 <Col md={6}>
  //                   <div className="form-group">
  //                     <label>
  //                       Email <span>*</span>
  //                     </label>
  //                     <input
  //                       type="email"
  //                       placeholder="Enter your email"
  //                       name="email"
  //                       onChange={handleChange}
  //                     />

  //                     {error?.email ? (
  //                       <div className="login-validation">{error?.email}</div>
  //                     ) : null}
  //                   </div>
  //                 </Col>

  //                 <Col md={6}>
  //                   <div className="form-group">
  //                     <label>
  //                       I work at <span>*</span>
  //                     </label>
  //                     <Select
  //                       options={siteInstitution}
  //                       placeholder="Select"
  //                       name="institution"
  //                       value={
  //                         siteInstitution.findIndex(
  //                           (el) => el.value == userInputs?.institution
  //                         ) == -1
  //                           ? ""
  //                           : siteInstitution[
  //                               siteInstitution.findIndex(
  //                                 (el) => el.value == userInputs?.institution
  //                               )
  //                             ]
  //                       }
  //                       onChange={(e) => handleChange(e?.value, "institution")}
  //                       className="dropdown-basic-button split-button-dropup edit-country-dropdown"
  //                     />
  //                     {error?.institution ? (
  //                       <div className="login-validation">
  //                         {error?.institution}
  //                       </div>
  //                     ) : null}
  //                   </div>
  //                 </Col>

  //                 {userInputs?.institution ? (
  //                   <Col md={6}>
  //                     <div className="form-group">
  //                       <label>
  //                         Country
  //                         {userInputs?.institution == "site_name" ? (
  //                           <span>*</span>
  //                         ) : (
  //                           ""
  //                         )}
  //                       </label>
  //                       <Select
  //                         options={siteCountry}
  //                         placeholder="Select country"
  //                         name="country"
  //                         value={
  //                           siteCountry.findIndex(
  //                             (el) => el.value == userInputs?.country
  //                           ) == -1
  //                             ? ""
  //                             : siteCountry[
  //                                 siteCountry.findIndex(
  //                                   (el) => el.value == userInputs?.country
  //                                 )
  //                               ]
  //                         }
  //                         onChange={(e) => handleChange(e?.value, "country")}
  //                         className="dropdown-basic-button split-button-dropup edit-country-dropdown"
  //                       />
  //                       {error?.country ? (
  //                         <div className="login-validation">
  //                           {error?.country}
  //                         </div>
  //                       ) : null}
  //                     </div>
  //                   </Col>
  //                 ) : null}

  //                 {institutionFlag && userInputs?.country ? (
  //                   <>
  //                     {/* <Col md={6}>
  //                       <div className="form-group">
  //                         <label>
  //                           Site number <span>*</span>
  //                         </label>
  //                         <Select
  //                           options={siteNumber}
  //                           placeholder="Select site number"
  //                           name="sitenumber"
  //                           value={
  //                             siteNumber.findIndex(
  //                               (el) => el.value == userInputs?.sitenumber
  //                             ) == -1
  //                               ? ""
  //                               : siteNumber[
  //                                   siteNumber.findIndex(
  //                                     (el) => el.value == userInputs?.sitenumber
  //                                   )
  //                                 ]
  //                           }
  //                           onChange={(e) =>
  //                             handleChange(e?.value, "sitenumber")
  //                           }
  //                           className="dropdown-basic-button split-button-dropup edit-country-dropdown"
  //                           isClearable={true}
  //                         />
  //                         {error?.sitenumber ? (
  //                           <div className="login-validation">
  //                             {error?.sitenumber}
  //                           </div>
  //                         ) : null}
  //                       </div>
  //                     </Col> */}

  //                     <Col md={6}>
  //                       <div className="form-group">
  //                         <label>
  //                           Site name <span>*</span>
  //                         </label>
  //                         <Select
  //                           options={siteName}
  //                           placeholder="Select site name"
  //                           name="sitename"
  //                           value={
  //                             siteName.findIndex(
  //                               (el) => el.value == userInputs?.sitename
  //                             ) == -1
  //                               ? ""
  //                               : siteName[
  //                                   siteName.findIndex(
  //                                     (el) => el.value == userInputs?.sitename
  //                                   )
  //                                 ]
  //                           }
  //                           onChange={(e) => handleChange(e?.value, "sitename")}
  //                           className="dropdown-basic-button split-button-dropup edit-country-dropdown"
  //                           isClearable={true}
  //                         />
  //                         {error?.sitename ? (
  //                           <div className="login-validation">
  //                             {error?.sitename}
  //                           </div>
  //                         ) : null}
  //                       </div>
  //                     </Col>

  //                     {
  //                       userInputs?.sitename?   <Col md={6}>
  //                       <div className="form-group">
  //                         <label>
  //                           Site city <span>*</span>
  //                         </label>
  //                         <Select
  //                           options={siteCity}
  //                           placeholder="Select site city"
  //                           name="sitecity"
  //                           value={
  //                             siteCity.findIndex(
  //                               (el) => el.value == userInputs?.sitecity
  //                             ) == -1
  //                               ? ""
  //                               : siteCity[
  //                                   siteCity.findIndex(
  //                                     (el) => el.value == userInputs?.sitecity
  //                                   )
  //                                 ]
  //                           }
  //                           onChange={(e) => handleChange(e?.value, "sitecity")}
  //                           className="dropdown-basic-button split-button-dropup edit-country-dropdown"
  //                           isClearable={true}
  //                         />
  //                         {error?.sitecity ? (
  //                           <div className="login-validation">
  //                             {error?.sitecity}
  //                           </div>
  //                         ) : null}
  //                       </div>
  //                     </Col>:null
  //                     }

                   
  //                   </>
  //                 ) : null}
  //               </Row>
  //               <div className="d-flex align-items-start">
  //                 <div className="consent">
  //                   <div className="text-group">
  //                     <input
  //                       type="checkbox"
  //                       id="rdChecheckbox"
  //                       name="rdChecheckbox"
  //                       value="rdChecheckbox"
  //                       onChange={(e) => handleChange(e, "rdChecheckbox")}
  //                     />
  //                     <span class="checkmark"></span>
  //                   </div>
  //                   {/* <input
  //                     type="checkbox"
  //                     id="rdChecheckbox"
  //                     name="rdChecheckbox"
  //                     value="rdChecheckbox"
  //                     onChange={(e) => handleChange(e, "rdChecheckbox")}
  //                   /> */}
  //                   <label for="rdChecheckbox">
  //                     I also consent to receive invitations to participate in surveys and other potential engagement through Docintel, which are study related.
  //                   </label>
  //                   {error?.rdChecheckbox ? (
  //                     <div className="login-validation">
  //                       {error?.rdChecheckbox}
  //                     </div>
  //                   ) : null}
  //                 </div>

  //                 <div className="submit-btn">
  //                   <Button
  //                     className="btn btn-filled"
  //                     onClick={submitHandler}
  //                     role="button"
  //                   >
  //                     Submit
  //                   </Button>
  //                 </div>
  //               </div>
  //             </Form>
  //             <div className="copyright-links">
  //               <Link
  //                 to="https://albert.docintel.app/octapharma-trail-privacy"
  //                 target="_blank"
  //               >
  //                 Octapharma privacy statement
  //               </Link>
  //               <Link
  //                 to="https://albert.docintel.app/docintel-privacy"
  //                 target="_blank"
  //               >
  //                 Docintel privacy policy
  //               </Link>
  //               <Link
  //                 to="https://albert.docintel.app/docintel-terms"
  //                 target="_blank"
  //               >
  //                 Docintel term of use
  //               </Link>
  //             </div>
  //           </div>
  //           <div className="footer-content">
              
             
  //             <div className="footer-logo">
  //               <img
  //                 src={path_image + "octapharma-footer-logo.png"}
  //                 alt="footer-logo"
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </Container>
  //       <Modal
  //         show={show}
  //         onHide={handleClose}
  //         className="success_modal rd-modal"
  //         centered
  //       >
  //         <div className="modal-wrapper">
  //           <Modal.Header closeButton></Modal.Header>
  //           <Modal.Body>
  //             <h3 className="popup-title" id="exampleModalCenterTitle">
  //               Thank You For Register Here.
  //             </h3>
  //             <p className="popup_subtitle">
  //               An email is on the way with your login details.
  //             </p>
  //           </Modal.Body>
  //         </div>
  //       </Modal>
  //     </div>
  //   </>
  // );
};

export default RDRegister;
