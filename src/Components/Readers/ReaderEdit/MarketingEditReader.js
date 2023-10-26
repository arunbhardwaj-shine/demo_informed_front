import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CommonModel from "../../../Model/CommonModel";
import { loader } from "../../../loader";
import DatePicker from "react-datepicker";
import moment from "moment";
import { ENDPOINT } from "../../../axios/apiConfig";
import { getData, postData } from "../../../axios/apiHelper";
import { AddReaderValidation } from "../../Validations/ReaderValidation/AddReaderValidation";
import { toast } from "react-toastify";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { parsePhoneNumber } from "react-phone-number-input";

const MarketingEditReader = () => {
  const { state } = useLocation();
  const [id, setId] = useState(
    state?.id ? state?.id : state?.data?.user_id ? state?.data?.user_id : ""
  );
  const [typeOfContact, setTypeOfContact] = useState([]);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const primaryPhoneRef = useRef(null);
  const contactTotalRef = useRef(null);
  const countryRef = useRef(null);
  const postcodeRef = useRef(null);
  const alternativeEmailRef = useRef(null);
  const alternativePhoneRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  const [titleOptions, setTitleOptions] = useState([]);
  const [prospectOptions, setProspectOptions] = useState([]);
  const [ownershipOptions, setOwnershipOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [companyProductOptions, setCompanyProductOptions] = useState([]);
  const [therapyAreaOptions, setTherapyAreaOptions] = useState([]);
  const [localOptions, setLocalOptions] = useState([]);
  const [taskOptions, setTaskOptions] = useState([]);
  const [logActivityOptions, setLogActivityOptions] = useState([]);
  const [pipelineOptions, setPipelineOptions] = useState([]);
  const [probabilityOptions, setProbabilityOptions] = useState([]);

  const [error, setError] = useState({});
  const [countryAll, setCountryAll] = useState([]);

  const [commanShow, setCommanShow] = useState(false);
  const [data, setData] = useState([]);
  const [newProduct, setNewProduct] = useState({
    label: "",
    value: "",
  });
  const [commonHeader, setCommonHeader] = useState("");
  const [commonFooter, setCommonFooter] = useState("");
  const [lastnoteTime, setlastnoteTime] = useState("");
  const [userInputs, setUserInputs] = useState({
    jobTitle: "",
    title: { value: "" },
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    alternativeEmail: "",
    countryCode: "",
    primary_phone: "",
    alternativePhone: "",
    linkedIn: "",
    prospect: { value: "" },
    ownership: { value: "" },
    main: "",
    influencer: "",
    decisionMaker: "",
    introducer: "",
    customerType: { value: "" },
    companyName: { value: "" },
    companyWebsite: "",
    companyProduct: { value: "" },
    therapyArea: { value: "" },
    local: { value: "" },
    address: [],
    logActivity: "",
    task: { value: "" },
    nextContact: new Date(
      moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")
    ),
    opportunityTitle: "",
    ourProduct: "",
    contactTotal: "",
    pipeline: { value: "" },
    opportunityValue: "",
    probability: { value: "" },
    weighted_value: 0,
    quoteSent: "",
    typeContact: [],
    quoteValid: new Date(moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")),
  });

  const [userDetail, setUserDetail] = useState({
    title: [],
    prospect: [],
    ownership: [],
    company: [],
    companyProduct: [],
    therapyArea: [],
    local: [],
    logActivity: [],
    task: [],
    pipeline: [],
  });

  useEffect(() => {
    initalFun();
    if (state?.id) {
      getUserDetail();
    } else {
      getPreviewUserDetail();
    }
  }, []);

  useEffect(() => {}, [userInputs]);

  const initalFun = async () => {
    try {
      loader("show");
      const hasData = await getData(`${ENDPOINT.READER_MARKETING_USER_DROP}`);
      const response = hasData?.data?.data;

      setTitleOptions(response?.title);
      setProspectOptions(response?.prospect);
      setOwnershipOptions(response?.contact_ownership);
      setCustomerOptions(response?.customer_type);
      setCompanyOptions(response?.company_name);
      setCompanyProductOptions(response?.company_product);
      setTherapyAreaOptions(response?.company_therapy_area);
      setLocalOptions(response?.local);
      setLogActivityOptions(response?.log_activity);
      setTaskOptions(response?.task);
      setPipelineOptions(response?.pipeline);
      setProbabilityOptions(response?.probablity);
      setTypeOfContact(response?.type_of_contact);

      let country = [];
      hasData?.data?.data?.country.reduce((objEntries, key) => {
        country.push({
          label: key,
          value: key,
        });
      });

      setCountryAll(country);

      loader("hide");
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };
  const getUserDetail = async () => {
    try {
      loader("show");
      const usersData = await getData(
        `${ENDPOINT.GET_MARKETING_USER_DROP}/${id}`
      );
      const data = usersData?.data?.data;
      let phoneNumber = data?.primary_phone.split("-informed-");

      let note = "";
      if (data?.log_activity) {
        if (data?.log_activity != "") {
          let jsonString = data?.log_activity;
          const jsonObject = JSON.parse(jsonString);
          note = jsonObject?.value;
          const dateTime = new Date(jsonObject?.date);
          let lasttime = formatDate(dateTime);
          setlastnoteTime(lasttime);
        }
      }

      setUserInputs({
        ...userInputs,
        jobTitle: data?.jobTitle,
        title: { value: data?.title },
        firstName: data?.firstName,
        middleName: data?.middleName,
        lastName: data?.lastName,
        email: data?.email,
        alternativeEmail: data?.alternativeEmail,
        countryCode: phoneNumber[0],
        primary_phone: phoneNumber[1],
        alternativePhone: data?.alternativePhone,
        linkedIn: data?.linkedIn,
        prospect: { value: data?.prospect },
        ownership: { value: data?.contact_ownership },
        main: data?.type_of_contact.includes("Main"),
        decisionMaker: data?.type_of_contact.includes("Decision-maker"),
        influencer: data?.type_of_contact.includes("Influencer"),
        introducer: data?.type_of_contact.includes("Introducer"),
        customerType: { value: data?.customer_type },
        companyName: { value: data?.company_name },
        country: { value: data?.country },
        companyWebsite: data?.company_website,
        companyProduct: { value: data?.company_product },
        therapyArea: { value: data?.company_therapy_area },
        local: { value: data?.local },
        nextContact: data?.next_contact,
        address: JSON.parse(data?.address),
        logActivity: note,
        task: data?.task,
        opportunityTitle: data?.opportunity_title,
        ourProduct: data?.our_product,
        pipeline: { value: data?.pipeline },
        opportunityValue: data?.opportunity_value,
        probability: { value: data?.probability },
        weighted_value: data?.weighted_value,
        contactTotal: data?.contact_total,
        quoteSent: data?.quote_sent,
        quoteValid: data?.quote_valid_until,
        typeContact: data?.type_of_contact ? data?.type_of_contact : [],
      });

      loader("hide");
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  const getPreviewUserDetail = () => {
   
    let phoneNumber = state?.data?.primary_phone.split("-informed-");
    setUserInputs({
      ...userInputs,
      jobTitle: state?.data?.jobTitle,
      title: { value: state?.data?.title },
      firstName: state?.data?.firstName,
      middleName: state?.data?.middleName,
      lastName: state?.data?.lastName,
      email: state?.data?.email,
      alternativeEmail: state?.data?.alternativeEmail,
      countryCode: phoneNumber[0],
      primary_phone: phoneNumber[1],
      alternativePhone: state?.data?.alternativePhone,
      linkedIn: state?.data?.linkedIn,
      prospect: { value: state?.data?.prospect },
      ownership: { value: state?.data?.contact_ownership },
      main: state?.data?.type_of_contact.includes("Main"),
      decisionMaker: state?.data?.type_of_contact.includes("Decision-maker"),
      influencer: state?.data?.type_of_contact.includes("Influencer"),
      introducer: state?.data?.type_of_contact.includes("Introducer"),
      customerType: { value: state?.data?.customerType },
      companyName: { value: state?.data?.company_name },
      country: { value: state?.data?.country },
      companyWebsite: state?.data?.company_website,
      companyProduct: { value: state?.data?.company_product },
      therapyArea: { value: state?.data?.company_therapy_area },
      local: { value: state?.data?.local },
      nextContact: state?.data?.next_contact,
      address: state?.data?.address,
      logActivity: state?.data?.log_activity,
      task: state?.data?.task,
      opportunityTitle: state?.data?.opportunity_title,
      ourProduct: state?.data?.our_product,
      pipeline: { value: state?.data?.pipeline },
      opportunityValue: state?.data?.opportunity_value,
      probability: { value: state?.data?.probability },
      weighted_value: state?.data?.weighted_value,
      contactTotal: state?.data?.contact_total,
      quoteSent: state?.data?.quote_sent,
      quoteValid: state?.data?.quote_valid,
      typeContact: state?.data?.type_of_contact
        ? state?.data?.type_of_contact
        : [],
    });
  };
  const handleKeyDown = (e, isSelectedName) => {
    if (isSelectedName == "countryCode") {
      if (e.key === "Backspace" || e.key === "Delete") {
        setUserInputs({ ...userInputs, countryCode: "" });
      } else {
        e.preventDefault();
      }
    }
  };

  const handleChange = (e, isSelectedName, key) => {
    let weighted_Value = "";

    if (isSelectedName == "address") {
      if (e?.target?.name == "street1") {
        setUserInputs({
          ...userInputs,
          address: { ...userInputs?.address, street1: e?.target?.value },
        });
      } else if (e?.target?.name == "street2") {
        setUserInputs({
          ...userInputs,
          address: { ...userInputs?.address, street2: e?.target?.value },
        });
      } else if (e?.target?.name == "city") {
        setUserInputs({
          ...userInputs,
          address: { ...userInputs?.address, city: e?.target?.value },
        });
      } else if (key == "addressCountry") {
        setUserInputs({
          ...userInputs,
          address: { ...userInputs?.address, country: e?.value },
        });
      } else if (e?.target?.name == "postcode") {
        const cleanedValue = e?.target?.value?.replace(/[^a-zA-Z0-9]/g, "");
        if (cleanedValue?.length <= 12) {
          setUserInputs({
            ...userInputs,
            address: { ...userInputs?.address, postcode: cleanedValue },
          });

          setError(null);
        } else {
          setError({ postcode: "Postcode maximum of 12 Character long" });
        }
      }
    } else if (isSelectedName == "probability") {
      if (userInputs?.opportunityValue) {
        weighted_Value = (userInputs?.opportunityValue * e?.value) / 100;
        setUserInputs({
          ...userInputs,
          weighted_value: weighted_Value,
          [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
            ? e
            : e?.target?.value,
        });
      } else {
        setUserInputs({
          ...userInputs,
          [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
            ? e
            : e?.target?.value,
        });
      }
    } else if (e?.target?.name == "opportunityValue") {
      const cleanedValue = e?.target?.value?.replace(/\D/g, "");
      if (cleanedValue >= 0) {
        let weighted_Value = "";
        if (userInputs?.probability?.value) {
          weighted_Value =
            (userInputs?.probability?.value * cleanedValue) / 100;
          setUserInputs({
            ...userInputs,
            weighted_value: weighted_Value,
            [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
              ? e
              : cleanedValue,
          });
        } else {
          setUserInputs({
            ...userInputs,
            [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
              ? e
              : cleanedValue,
          });
        }
      } else {
        setError({
          opportunityValue: "Please enter valid amount",
        });
      }
    } else if (key == "typeContact") {
      const typeContactArray = [...(userInputs?.typeContact || [])];
      if (e == true) {
        typeContactArray.push(isSelectedName);
      } else {
        const index = typeContactArray.indexOf(isSelectedName);
        if (index !== -1) {
          typeContactArray.splice(index, 1);
        }
      }
      setUserInputs({
        ...userInputs,
        typeContact: typeContactArray,
      });
    } else if (e?.target?.name == "primary_phone") {
      const cleanedValue = e?.target?.value?.replace(/\D/g, "");
      // if (cleanedValue?.length <= 20) {
        setUserInputs({
          ...userInputs,

          [e?.target?.name]: cleanedValue,
        });
        setError(null);
      // } else {
      //   setError({
      //     primary_phone: "Number must be in between 10 to 20 digits",
      //   });
      // }
    } else if (e?.target?.name == "alternativePhone") {
      const cleanedValue = e?.target?.value?.replace(/\D/g, "");
      // if (cleanedValue?.length <= 20) {
        setUserInputs({
          ...userInputs,
          [e?.target?.name]: cleanedValue,
        });
        setError(null);
      // } else {
      //   setError({
      //     alternativePhone: "Number must be in between 10 to 20 digits",
      //   });
      // }
    } else if (e?.target?.name == "contactTotal") {
      const cleanedValue = e?.target?.value?.replace(/\D/g, "");
      if (cleanedValue > 500 || cleanedValue < 0) {
        setError({ contactTotal: "Contact total must be in between 0 to 500" });
      } else {
        setUserInputs({
          ...userInputs,
          [e?.target?.name]: cleanedValue,
        });
        setError(null);
      }
    } else if (isSelectedName == "taskValueChecked") {
      if (e) {
        setUserInputs({
          ...userInputs,
          task: {
            ...userInputs?.task,
            taskCheckClicked: e,
            taskDate: new Date(),
          },
        });
      } else {
        setUserInputs({
          ...userInputs,
          task: { ...userInputs?.task, taskCheckClicked: e },
        });
      }
    } else if (isSelectedName == "taskDate") {
      setUserInputs({
        ...userInputs,
        task: { ...userInputs?.task, taskDate: new Date(e) },
      });
    } else if (isSelectedName == "task") {
      setUserInputs({
        ...userInputs,
        task: { ...userInputs?.task, task: e?.value },
      });
    } else if (isSelectedName == "countryCode") {
      if (e == userInputs?.countryCode) {
        setUserInputs({
          ...userInputs,
          [isSelectedName]: "",
        });
      } else {
        setUserInputs({
          ...userInputs,
          [isSelectedName]: e,
        });
      }
    } else {
      setUserInputs({
        ...userInputs,

        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e
          : e?.target?.value,
      });
    }
  };

  const addNewProductClicked = (e, statusMsg) => {
    e.preventDefault();
    setCommanShow(true);
    if (statusMsg == "title") {
      setNewProduct("");
      setData(() => [
        {
          name: "title",
          label: "Title",
          type: "input",
          placeholder: "Type your title",
        },
      ]);
      setCommonHeader("Add New Title");
    }
    if (statusMsg == "prospect") {
      setNewProduct("");
      setData(() => [
        {
          name: "prospect",
          label: "Prospect",
          type: "input",
          placeholder: "Type your prospect",
        },
      ]);
      setCommonHeader("Add New Prospect");
    }
    if (statusMsg == "ownership") {
      setNewProduct("");
      setData(() => [
        {
          name: "ownership",
          label: "Ownership",
          type: "input",
          placeholder: "Type your contact ownership",
        },
      ]);
      setCommonHeader("Add New Contact Ownership");
    }
    if (statusMsg == "company") {
      setNewProduct("");
      setData(() => [
        {
          name: "company",
          label: "Company",
          type: "input",
          placeholder: "Type your company",
        },
      ]);
      setCommonHeader("Add New Company ");
    }
    if (statusMsg == "companyProduct") {
      setNewProduct("");
      setData(() => [
        {
          name: "companyProduct",
          label: "Company Product",
          type: "input",
          placeholder: "Type your company product",
        },
      ]);
      setCommonHeader("Add New Company Product ");
    }
    if (statusMsg == "therapyArea") {
      setNewProduct("");
      setData(() => [
        {
          name: "therapyArea",
          label: "Therapy Area",
          type: "input",
          placeholder: "Type company therapy area",
        },
      ]);
      setCommonHeader("Add New Company Therapy Area ");
    }
    if (statusMsg == "local") {
      setNewProduct("");
      setData(() => [
        {
          name: "local",
          label: "Local International",
          type: "input",
          placeholder: "Type Local International",
        },
      ]);
      setCommonHeader("Add New");
    }
    if (statusMsg == "logActivity") {
      setNewProduct("");
      setData(() => [
        {
          name: "logActivity",
          label: "log Activity",
          type: "input",
          placeholder: "Type log activity",
        },
      ]);
      setCommonHeader("Add New Log Activity");
    }
    if (statusMsg == "task") {
      setNewProduct("");
      setData(() => [
        {
          name: "task",
          label: "Task",
          type: "input",
          placeholder: "Type task",
        },
      ]);
      setCommonHeader("Add New Task");
    }
    if (statusMsg == "pipeline") {
      setNewProduct("");
      setData(() => [
        {
          name: "pipeline",
          label: "Pipeline",
          type: "input",
          placeholder: "Type pipeline",
        },
      ]);
      setCommonHeader("Add New Pipeline");
    }
    setCommonFooter("Add");
  };

  const handleModelFun = (e) => {
    setNewProduct({
      label: e?.target?.name?.trim(),
      value: e?.target?.value?.trim(),
    });
  };
  const handleSubmitModelFun = async (e) => {
    try {
      const obj = {
        title: "title",
        prospect: "prospect",
        ownership: "contact_ownership",
        company: "company_name",
        companyProduct: "company_product",
        therapyArea: "company_therapy_area",
        local: "local",
        task: "task",
        pipeline: "pipeline",
        logActivity: "log_activity",
      };
      loader("show");
      await postData(`${ENDPOINT.ADD_MARKETING_FEATURES}`, {
        label: obj[newProduct.label],
        value: newProduct.value,
      });

      if (newProduct.label == "title") {
        let title = titleOptions;
        title.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setTitleOptions(title);
      }
      if (newProduct.label == "prospect") {
        let prospect = prospectOptions;
        prospect.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setProspectOptions(prospect);
      }
      if (newProduct.label == "ownership") {
        let ownership = ownershipOptions;
        ownership.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setOwnershipOptions(ownership);
      }
      if (newProduct.label == "company") {
        let company = companyOptions;
        company.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setCompanyOptions(company);
      }

      if (newProduct.label == "companyProduct") {
        let companyProduct = companyProductOptions;
        companyProduct.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setCompanyProductOptions(companyProduct);
      }
      if (newProduct.label == "therapyArea") {
        let therapyArea = therapyAreaOptions;
        therapyArea.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setTherapyAreaOptions(therapyArea);
      }
      if (newProduct.label == "local") {
        let local = localOptions;
        local.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setLocalOptions(local);
      }
      if (newProduct.label == "logActivity") {
        let logActivity = logActivityOptions;
        logActivity.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setLogActivityOptions(logActivity);
      }

      if (newProduct.label == "task") {
        let task = taskOptions;
        task.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setTaskOptions(task);
      }
      if (newProduct.label == "pipeline") {
        let pipeline = pipelineOptions;
        pipeline.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setPipelineOptions(pipeline);
      }
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };
  const Main = () => {
    return (
      <>
        <div className="create-change-content reader_added  ">
          <div className="form_action">
            {/* <h4>Please fill the following details</h4> */}
            <div className="row">
              <div className="col-12 col-md-7">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Job title</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="jobTitle"
                    defaultValue={userInputs?.jobTitle}
                    value={userInputs?.jobTitle}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter job title here"
                  />
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Title</Form.Label>
                  <Select
                    options={titleOptions}
                    name="title"
                    value={
                      titleOptions?.findIndex(
                        (el) => el?.value == userInputs?.title?.value
                      ) == -1
                        ? ""
                        : titleOptions[
                            titleOptions?.findIndex(
                              (el) => el?.value == userInputs?.title?.value
                            )
                          ]
                    }
                    onChange={(e) => handleChange(e, "title")}
                    placeholder="Select title"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    isClearable
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "title")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New Title +
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">
                    First name <span>*</span>
                  </Form.Label>
                  <input
                    type="text"
                    className={
                      error?.firstName ? "form-control error" : "form-control"
                    }
                    name="firstName"
                    defaultValue={userInputs?.firstName}
                    value={userInputs?.firstName}
                    ref={nameRef}
                    onChange={(e) => handleChange(e)}
                    placeholder="First name"
                  />
                  {error?.firstName ? (
                    <div className="login-validation">{error?.firstName}</div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Middle name</Form.Label>
                  <input
                    type="text"
                    placeholder="Middle name"
                    className="form-control"
                    name="middleName"
                    defaultValue={userInputs?.middleName}
                    value={userInputs?.middleName}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Last name</Form.Label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="form-control"
                    name="lastName"
                    defaultValue={userInputs?.lastName}
                    value={userInputs?.lastName}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">
                    Primary email <span>*</span>
                  </Form.Label>
                  <input
                    type="email"
                    className={
                      error?.email ? "form-control error" : "form-control"
                    }
                    placeholder="example@email.com"
                    disabled="disabled"
                    ref={emailRef}
                    name="email"
                    defaultValue={userInputs?.email}
                    readOnly
                    // onInput={(e) => handleChange(e)}
                  />
                  {error?.email ? (
                    <div className="login-validation">{error?.email}</div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Alternative email </Form.Label>
                  <input
                    type="email"
                    className={
                      error?.alternativeEmail
                        ? "form-control error"
                        : "form-control"
                    }
                    ref={alternativeEmailRef}
                    placeholder="example@email.com"
                    name="alternativeEmail"
                    defaultValue={userInputs?.alternativeEmail}
                    value={userInputs?.alternativeEmail}
                    onChange={(e) => handleChange(e)}
                  />
                  {error?.alternativeEmail ? (
                    <div className="login-validation">
                      {error?.alternativeEmail}
                    </div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="form-group primary_phone">
                  <Form.Label htmlFor="">Primary phone </Form.Label>
                  {/* <Select
                    options={countryCode}
                    ref={primaryPhoneRef}
                    value={
                      countryCode?.findIndex(
                        (el) => el?.label == userInputs?.countryCode?.label
                      ) == -1
                        ? ""
                        : countryCode[
                            countryCode?.findIndex(
                              (el) =>
                                el?.label == userInputs?.countryCode?.label
                            )
                          ]
                    }
                    name="countryCode"
                    className={
                      error?.primary_phone
                        ? "dropdown-basic-button split-button-dropup error"
                        : "dropdown-basic-button split-button-dropup"
                    }
                   

                    placeholder="Select"
                    onChange={(e) => handleChange(e, "countryCode")}
                    isClearable
                  /> */}

                  {/* <ReactFlagsSelect
                    className={
                      error?.primary_phone
                        ? "dropdown-basic-button split-button-dropup error"
                        : "dropdown-basic-button split-button-dropup"
                    }
                    ref={primaryPhoneRef}
                    isClearable
                    
                    selected={
                      Object.values(countryCode)?.findIndex(
                        (el) => el == userInputs?.countryCode
                      ) != -1
                        ? Object.keys(countryCode)?.[
                            Object.values(countryCode)?.findIndex(
                              (el) => el == userInputs?.countryCode
                            )
                          ]
                        : ""
                    }
                   
                    onSelect={(e) => handleChange(e, "countryCode")}
                    customLabels={countryCode}
                    countries={country}
                    placeholder="Select"
                  /> */}

                  <PhoneInput
                    international
                    ref={primaryPhoneRef}
                    className={
                      error?.primary_phone
                        ? "dropdown-basic-button split-button-dropup error"
                        : "dropdown-basic-button split-button-dropup"
                    }
                    placeholder="Select"
                    value={userInputs?.countryCode}
                    name="primary_phone"
                    onChange={(e) => handleChange(e, "countryCode")}
                    onKeyDown={(e) => handleKeyDown(e, "countryCode")}
                  />

                  <input
                    type="tel"
                    className={
                      error?.primary_phone
                        ? "form-control error"
                        : "form-control"
                    }
                    name="primary_phone"
                    placeholder="Phone number"
                    defaultValue={userInputs?.primary_phone}
                    value={userInputs?.primary_phone}
                    onChange={(e) => handleChange(e)}
                  />

                  {error?.primary_phone ? (
                    <div className="login-validation">
                      {error?.primary_phone}
                    </div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Alternative phone</Form.Label>
                  <input
                    type="tel"
                    className={
                      error?.alternativePhone
                        ? "form-control error"
                        : "form-control"
                    }
                    ref={alternativePhoneRef}
                    name="alternativePhone"
                    placeholder="Alternative phone"
                    value={userInputs?.alternativePhone}
                    onChange={(e) => handleChange(e)}
                  />
                  {error?.alternativePhone ? (
                    <div className="login-validation">
                      {error?.alternativePhone}
                    </div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">LinkedIn</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter linkedIn"
                    className="form-control"
                    name="linkedIn"
                    defaultValue={userInputs?.linkedIn}
                    value={userInputs?.linkedIn}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Prospect</Form.Label>
                  <Select
                    options={prospectOptions}
                    name="prospect"
                    value={
                      prospectOptions?.findIndex(
                        (el) => el?.value == userInputs?.prospect?.value
                      ) == -1
                        ? ""
                        : prospectOptions[
                            prospectOptions?.findIndex(
                              (el) => el?.value == userInputs?.prospect?.value
                            )
                          ]
                    }
                    onChange={(e) => handleChange(e, "prospect")}
                    placeholder="Select prospect"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    isClearable
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "prospect")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New Prospect +
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Contact ownership</Form.Label>
                  <Select
                    options={ownershipOptions}
                    name="ownership"
                    value={
                      ownershipOptions?.findIndex(
                        (el) => el?.value == userInputs?.ownership?.value
                      ) == -1
                        ? ""
                        : ownershipOptions[
                            ownershipOptions?.findIndex(
                              (el) => el?.value == userInputs?.ownership?.value
                            )
                          ]
                    }
                    onChange={(e) => handleChange(e, "ownership")}
                    placeholder="Select contact ownership"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    isClearable
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "ownership")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New ownership +
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Type of contact</Form.Label>
                  <fieldset id="group2">
                    {typeOfContact?.length
                      ? typeOfContact?.map((item, index) => {
                          return (
                            <>
                              <input
                                type="checkbox"
                                value="value1"
                                name={item?.label}
                                checked={
                                  userInputs?.typeContact?.includes(item?.value)
                                    ? true
                                    : false
                                }
                                onClick={(e) =>
                                  handleChange(
                                    e.target?.checked,
                                    item?.value,
                                    "typeContact"
                                  )
                                }
                                id={`limitagreed${index}`}
                              />
                              <Form.Label htmlFor={`limitagreed${index}`}>
                                {item?.label}
                              </Form.Label>
                            </>
                          );
                        })
                      : ""}
                  </fieldset>
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Customer type</Form.Label>
                  <Select
                    options={customerOptions}
                    name="customerType"
                    value={
                      customerOptions?.findIndex(
                        (el) => el?.value == userInputs?.customerType?.value
                      ) == -1
                        ? ""
                        : customerOptions[
                            customerOptions?.findIndex(
                              (el) =>
                                el?.value == userInputs?.customerType?.value
                            )
                          ]
                    }
                    onChange={(e) => handleChange(e, "customerType")}
                    placeholder="Select customer type"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    isClearable
                  />
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Company name</Form.Label>
                  <Select
                    options={companyOptions}
                    name="companyName"
                    value={
                      companyOptions?.findIndex(
                        (el) => el?.value == userInputs?.companyName?.value
                      ) == -1
                        ? ""
                        : companyOptions[
                            companyOptions?.findIndex(
                              (el) =>
                                el?.value == userInputs?.companyName?.value
                            )
                          ]
                    }
                    onChange={(e) => handleChange(e, "companyName")}
                    placeholder="Select contact company"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    isClearable
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "company")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New Company +
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">
                    Country <span>*</span>
                  </Form.Label>
                  <Select
                    options={countryAll}
                    className={
                      error?.country
                        ? "dropdown-basic-button split-button-dropup error"
                        : "dropdown-basic-button split-button-dropup"
                    }
                    name="country"
                    placeholder="Select country"
                    value={
                      countryAll?.findIndex(
                        (el) => el?.value == userInputs?.country?.value
                      ) == -1
                        ? ""
                        : countryAll[
                            countryAll?.findIndex(
                              (el) => el?.value == userInputs?.country?.value
                            )
                          ]
                    }
                    ref={countryRef}
                    onChange={(e) => handleChange(e, "country")}
                    isClearable
                  />
                  {error?.country ? (
                    <div className="login-validation">{error?.country}</div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Company website</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter company website"
                    className="form-control"
                    name="companyWebsite"
                    value={userInputs?.companyWebsite}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Company product</Form.Label>
                  <Select
                    options={companyProductOptions}
                    name="companyProduct"
                    value={
                      companyProductOptions?.findIndex(
                        (el) => el?.value == userInputs?.companyProduct?.value
                      ) == -1
                        ? ""
                        : companyProductOptions[
                            companyProductOptions?.findIndex(
                              (el) =>
                                el?.value == userInputs?.companyProduct?.value
                            )
                          ]
                    }
                    onChange={(e) => handleChange(e, "companyProduct")}
                    placeholder="Select company product"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    isClearable
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "companyProduct")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New Product +
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Company therapy area</Form.Label>
                  <Select
                    options={therapyAreaOptions}
                    name="therapyArea"
                    onChange={(e) => handleChange(e, "therapyArea")}
                    value={
                      therapyAreaOptions?.findIndex(
                        (el) => el?.value == userInputs?.therapyArea?.value
                      ) == -1
                        ? ""
                        : therapyAreaOptions[
                            therapyAreaOptions?.findIndex(
                              (el) =>
                                el?.value == userInputs?.therapyArea?.value
                            )
                          ]
                    }
                    placeholder="Select therapy area"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    isClearable
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "therapyArea")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New Therapy Area +
                    </Button>
                  </div>
                </Form.Group>

                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Local/International</Form.Label>
                  <Select
                    options={localOptions}
                    name="local"
                    value={
                      localOptions?.findIndex(
                        (el) => el?.value == userInputs?.local?.value
                      ) == -1
                        ? ""
                        : localOptions[
                            localOptions?.findIndex(
                              (el) => el?.value == userInputs?.local?.value
                            )
                          ]
                    }
                    onChange={(e) => handleChange(e, "local")}
                    placeholder="Select "
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    isClearable
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "local")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New +
                    </Button>
                  </div>
                </Form.Group>

                {/* <Form.Group className="form-group">
                  <Form.Label htmlFor="">Address</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    className="form-control"
                    name="address"
                    value={userInputs?.address}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group> */}
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Street 1</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter street 1"
                    className="form-control"
                    name="street1"
                    defaultValue={userInputs?.address?.street1}
                    value={userInputs?.address?.street1}
                    onChange={(e) => handleChange(e, "address")}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Street 2</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter street 2"
                    className="form-control"
                    name="street2"
                    defaultValue={userInputs?.address?.street2}
                    value={userInputs?.address?.street2}
                    onChange={(e) => handleChange(e, "address")}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">City</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    className="form-control"
                    name="city"
                    defaultValue={userInputs?.address?.city}
                    value={userInputs?.address?.city}
                    onChange={(e) => handleChange(e, "address")}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Post code</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter post code"
                    className={
                      error?.postcode ? "form-control error" : "form-control"
                    }
                    name="postcode"
                    ref={postcodeRef}
                    defaultValue={userInputs?.address?.postcode}
                    value={userInputs?.address?.postcode}
                    onChange={(e) => handleChange(e, "address")}
                  />
                  {error?.postcode ? (
                    <div className="login-validation">{error?.postcode}</div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Country</Form.Label>

                  <Select
                    options={countryAll}
                    className="dropdown-basic-button split-button-dropup"
                    placeholder="Select country"
                    value={
                      countryAll?.findIndex(
                        (el) => el?.value == userInputs?.address?.country
                      ) == -1
                        ? ""
                        : countryAll[
                            countryAll?.findIndex(
                              (el) => el?.value == userInputs?.address?.country
                            )
                          ]
                    }
                    onChange={(e) =>
                      handleChange(e, "address", "addressCountry")
                    }
                    isClearable
                  />
                </Form.Group>

                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Task</Form.Label>
                  <Select
                    options={taskOptions}
                    name="task"
                    value={
                      taskOptions?.findIndex(
                        (el) => el?.value == userInputs?.task?.task
                      ) == -1
                        ? ""
                        : taskOptions[
                            taskOptions?.findIndex(
                              (el) => el?.value == userInputs?.task?.task
                            )
                          ]
                    }
                    onChange={(e) => handleChange(e, "task")}
                    placeholder="Select task"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    isClearable
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "task")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New Task +
                    </Button>
                  </div>
                </Form.Group>
                <div>
                  <Form.Group className="form-group margin-added">
                    <Form.Label></Form.Label>
                    <DatePicker
                      selected={
                        userInputs?.task?.taskDate
                          ? new Date(userInputs?.task?.taskDate)
                          : ""
                      }
                      name="taskDate"
                      onChange={(e) => handleChange(e, "taskDate")}
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                      placeholderText="Select task date"
                      // minDate={currentDate}
                      // onKeyDown={handleKeyDown}
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                    />
                    <div className="add_check">
                      <fieldset id="group2">
                        <>
                          <input
                            type="checkbox"
                            value="value1"
                            name="taskCheckClicked"
                            onClick={(e) =>
                              handleChange(
                                e.target?.checked,

                                "taskValueChecked"
                              )
                            }
                            checked={
                              userInputs?.task?.taskCheckClicked ? true : false
                            }
                            id={`taskCheckClicked`}
                          />
                          <Form.Label htmlFor="taskCheckClicked">
                            Completed
                          </Form.Label>
                        </>
                      </fieldset>
                    </div>
                  </Form.Group>
                </div>
                <Form.Group className="form-group">
                  <Form.Label>Next contact</Form.Label>
                  <DatePicker
                    selected={
                      userInputs?.nextContact
                        ? new Date(userInputs?.nextContact)
                        : new Date(
                            moment(new Date(), "MM/DD/YYYY").format(
                              "MM/DD/YYYY"
                            )
                          )
                    }
                    name="nextContact"
                    onChange={(e) => handleChange(e, "nextContact")}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    // minDate={currentDate}
                    // onKeyDown={handleKeyDown}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-12 col-md-5 right-change">
                <div className="form-group justify-content-end align-items-start new-change">
                  <label htmlFor="">Log activity </label>

                  <textarea
                    name="logActivity"
                    defaultValue={userInputs?.logActivity}
                    value={userInputs?.logActivity}
                    className="form-control"
                    id="formControlTextarea"
                    onChange={(e) =>
                      handleChange(e?.target?.value, "logActivity")
                    }
                    rows="5"
                    placeholder="Please type your notes here..."
                  ></textarea>
                  <span>
                    {typeof lastnoteTime !== "undefined" &&
                      lastnoteTime != "" && (
                        <span>
                          <>
                            Last Update:
                            {moment(lastnoteTime).format("DD MMMM YYYY")}
                          </>
                        </span>
                      )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const Opportunity = () => {
    return (
      <>
        <div className="create-change-content reader_added">
          <div className="form-action">
            <div className="row">
              <div className="col-12 col-md-7">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Title</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="opportunityTitle"
                    placeholder="Title"
                    value={userInputs?.opportunityTitle}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Our Product</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="ourProduct"
                    placeholder="Our Product"
                    value={userInputs?.ourProduct}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <div className="form-group">
                  <label htmlFor="">Contact total</label>
                  <input
                    type="tel"
                    name="contactTotal"
                    min="0"
                    value={userInputs?.contactTotal}
                    ref={contactTotalRef}
                    className={
                      error?.contactTotal
                        ? "form-control error"
                        : "form-control"
                    }
                    placeholder="Enter contact total"
                    onChange={(e) => handleChange(e)}
                  />
                  {error?.contactTotal ? (
                    <div className="login-validation">
                      {error?.contactTotal}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Pipeline Stage</Form.Label>
                  <Select
                    options={pipelineOptions}
                    placeholder="Select pipeline stage"
                    className="dropdown-basic-button split-button-dropup"
                    value={
                      pipelineOptions?.findIndex(
                        (el) => el?.value == userInputs?.pipeline?.value
                      ) == -1
                        ? ""
                        : pipelineOptions[
                            pipelineOptions?.findIndex(
                              (el) => el?.value == userInputs?.pipeline?.value
                            )
                          ]
                    }
                    onChange={(e) => handleChange(e, "pipeline")}
                    isClearable
                  />
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      className="btn-bordered btn-voilet"
                      onClick={(e) => addNewProductClicked(e, "pipeline")}
                    >
                      Add New Pipeline Stage +
                    </Button>
                  </div>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Value</Form.Label>
                  <input
                    type="tel"
                    min={0}
                    className="form-control"
                    name="opportunityValue"
                    placeholder="Amount"
                    value={userInputs?.opportunityValue}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Probability %</Form.Label>
                  <Select
                    options={probabilityOptions}
                    className="dropdown-basic-button split-button-dropup"
                    placeholder="Select probability"
                    name="probability"
                    value={
                      probabilityOptions?.findIndex(
                        (el) => el?.value == userInputs?.probability?.value
                      ) == -1
                        ? ""
                        : probabilityOptions[
                            probabilityOptions?.findIndex(
                              (el) =>
                                el?.value == userInputs?.probability?.value
                            )
                          ]
                    }
                    onChange={(e) => handleChange(e, "probability")}
                    isClearable
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label htmlFor=""> Weighted value</Form.Label>
                  <input
                    type="number"
                    className="form-control"
                    name="weighted_value"
                    placeholder="Weighted value"
                    value={
                      userInputs?.weighted_value
                        ? parseFloat(userInputs?.weighted_value).toFixed(2)
                        : ""
                    }
                    defaultValue={userInputs?.weighted_value}
                    // onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <div className="form-group">
                  <label htmlFor="setasdraft1">Quote Sent</label>
                  <fieldset id="group2">
                    <div className="switch">
                      <label className="switch-light">
                        <input
                          type="checkbox"
                          value="value1"
                          checked={userInputs?.quoteSent == 1 ? true : false}
                          name="quoteSent"
                          id="setasdraft1"
                          onChange={(e) => {
                            handleChange(e.target?.checked, "quoteSent");
                          }}
                        />
                        <span>
                          <span className="switch-btn active">No</span>
                          <span className="switch-btn ">Yes</span>
                        </span>
                        <a className="btn"></a>
                      </label>
                    </div>
                  </fieldset>
                </div>

                <div className="form-group">
                  <label htmlFor="">Quote valid until</label>
                  <DatePicker
                    selected={
                      userInputs?.quoteValid &&
                      userInputs?.quoteValid != "0000-00-00 00:00:00"
                        ? new Date(userInputs?.quoteValid)
                        : new Date(
                            moment(new Date(), "MM/DD/YYYY").format(
                              "MM/DD/YYYY"
                            )
                          )
                    }
                    name="quoteValid"
                    value={
                      userInputs?.quoteValid
                        ? new Date(userInputs?.quoteValid)
                        : new Date(
                            moment(new Date(), "MM/DD/YYYY").format(
                              "MM/DD/YYYY"
                            )
                          )
                    }
                    onChange={(e) => handleChange(e, "quoteValid")}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    // minDate={currentDate}
                    // onKeyDown={handleKeyDown}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const formatDate = (newDate) => {
    if (newDate != "") {
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const day = String(newDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
  };

  function isValidDateFormat(dateString) {
    const regex = /^\d{1,2} [A-Za-z]+ \d{4}$/;
    return regex.test(dateString);
  }

  function convertDate(dateString) {
    const formattedDate = moment(dateString, "DD MMMM YYYY").format(
      "YYYY-MM-DD"
    );
    return formattedDate;
  }
  const nextButtonClicked = (e) => {
    e.preventDefault();

    const result = AddReaderValidation(userInputs);
    if (Object?.keys(result)?.length) {
      if (Object?.keys(result)[0] == "firstName") {
        nameRef?.current?.focus();
      } else if (Object?.keys(result)[0] == "email") {
        emailRef?.current?.focus();
      } else if (Object.keys(result)[0] == "alternativeEmail") {
        alternativeEmailRef.current.focus();
      } else if (Object.keys(result)[0] == "primary_phone") {
        primaryPhoneRef.current.focus();
      } else if (Object.keys(result)[0] == "alternativePhone") {
        alternativePhoneRef.current.focus();
      } else if (Object?.keys(result)[0] == "country") {
        countryRef?.current?.focus();
      } else if (Object.keys(result)[0] == "postcode") {
        postcodeRef.current.focus();
      } else if (Object.keys(result)[0] == "contactTotal") {
        contactTotalRef.current.focus();
      }
      toast.error(result[Object?.keys(result)[0]]);
      setError(result);
      return;
    } else {
      try {
        loader("show");
        let nextContactDate = "";
        if (isValidDateFormat(userInputs?.nextContact)) {
          nextContactDate = convertDate(userInputs?.nextContact);
        } else {
          const dateTime = new Date(userInputs?.nextContact);
          nextContactDate = formatDate(dateTime);
        }
        let quoteValidDate = "";
        if (isValidDateFormat(userInputs?.quoteValid)) {
          quoteValidDate = convertDate(userInputs?.quoteValid);
        } else {
          const dateTime = new Date(userInputs?.quoteValid);
          // let lasttime = formatDate(dateTime);
          quoteValidDate = formatDate(dateTime);
        }
        let data = {
          jobTitle: userInputs?.jobTitle ? userInputs?.jobTitle : "",
          title: userInputs?.title?.value ? userInputs?.title?.value : "",
          firstName: userInputs?.firstName ? userInputs?.firstName : "",
          middleName: userInputs?.middleName ? userInputs?.middleName : "",
          lastName: userInputs?.lastName ? userInputs?.lastName : "",
          email: userInputs?.email ? userInputs?.email : "",
          alternativeEmail: userInputs?.alternativeEmail
            ? userInputs?.alternativeEmail
            : "",
          primary_phone: `${
            userInputs?.countryCode && userInputs?.countryCode != "Select"
              ? userInputs?.countryCode
              : ""
          }-informed-${
            userInputs?.primary_phone ? userInputs?.primary_phone : ""
          }`,

          alternativePhone: userInputs?.alternativePhone
            ? userInputs?.alternativePhone
            : "",
          linkedIn: userInputs?.linkedIn ? userInputs?.linkedIn : "",
          prospect: userInputs?.prospect?.value
            ? userInputs?.prospect?.value
            : "",
          type_of_contact: userInputs?.typeContact,
          contact_ownership: userInputs?.ownership?.value
            ? userInputs?.ownership?.value
            : "",

          customerType: userInputs?.customerType?.value
            ? userInputs?.customerType?.value
            : "",
          company_name: userInputs?.companyName?.value
            ? userInputs?.companyName?.value
            : "",
          country: userInputs?.country?.value ? userInputs?.country?.value : "",
          company_website: userInputs?.companyWebsite
            ? userInputs?.companyWebsite
            : "",
          company_product: userInputs?.companyProduct?.value
            ? userInputs?.companyProduct?.value
            : "",
          company_therapy_area: userInputs?.therapyArea?.value
            ? userInputs?.therapyArea?.value
            : "",
          local: userInputs?.local?.value ? userInputs?.local?.value : "",

          address: userInputs?.address ? userInputs?.address : "",
          log_activity: userInputs?.logActivity ? userInputs?.logActivity : "",
          task: userInputs?.task ? userInputs?.task : "",
          next_contact: nextContactDate,
          contact_total: userInputs?.contactTotal
            ? userInputs?.contactTotal
            : "",
          opportunity_title: userInputs?.opportunityTitle
            ? userInputs?.opportunityTitle
            : "",
          our_product: userInputs?.ourProduct ? userInputs?.ourProduct : "",
          pipeline: userInputs?.pipeline?.value
            ? userInputs?.pipeline?.value
            : "",
          opportunity_value: userInputs?.opportunityValue
            ? userInputs?.opportunityValue
            : "",
          probability: userInputs?.probability?.value
            ? userInputs?.probability?.value
            : "",
          weighted_value: userInputs?.weighted_value
            ? userInputs?.weighted_value
            : "",
          quote_sent: userInputs?.quoteSent,
          quote_valid: quoteValidDate,
          user_id: id,
        };
        loader("hide");

        navigate("/reader-review", {
          state: {
            data: data,
            flag: state?.id || state?.data?.user_id ? 1 : 0,
          },
        });
      } catch (err) {
        console.log(err);
        loader("hide");
      }
    }
  };

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav sticky">
              <Row className="justify-content-end align-items-center">
                <Col md={1}>
                  <div className="header-btn-left"></div>
                </Col>
                <Col md={9}>
                  <ul className="tabnav-link">
                    <li className="active active-main">
                      <a href="">Edit CRM</a>
                    </li>

                    <li className="">
                      <a href="">Review &amp; Approve</a>
                    </li>
                  </ul>
                </Col>
                <Col md={2}>
                  <div className="header-btn">
                    <Link
                      className="btn btn-primary btn-bordered move-draft"
                      to="/readers-view"
                    >
                      Cancel
                    </Link>

                    <button
                      className="btn btn-primary btn-filled next "
                      onClick={nextButtonClicked}
                    >
                      Next
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
            {Main()}
            {Opportunity()}
          </Row>
        </div>
      </Col>
      <CommonModel
        show={commanShow}
        onClose={setCommanShow}
        heading={commonHeader}
        data={data}
        footerButton={commonFooter}
        handleChange={handleModelFun}
        handleSubmit={handleSubmitModelFun}
      />
    </>
  );
};

export default MarketingEditReader;
