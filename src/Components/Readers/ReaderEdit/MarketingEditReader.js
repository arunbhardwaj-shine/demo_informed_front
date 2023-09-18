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

const MarketingEditReader = () => {
  const { state } = useLocation();
  const [id, setId] = useState(state.id);
  const [typeOfContact, setTypeOfContact] = useState([]);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const countryRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [groupId, setGroupId] = useState();
  const navigate = useNavigate();
  // const [titleOptions, setTitleOptions] = useState([
  //   { label: "Mr", value: "mr" },
  //   { label: "Mrs", value: "mrs" },
  //   { label: "Ms", value: "ms" },
  //   { label: "Dr", value: "dr" },
  // ]);
  const [titleOptions, setTitleOptions] = useState([]);

  // const [prospectOptions, setProspectOptions] = useState([
  //   { label: "Customer", value: "customer" },
  //   { label: "High priority", value: "high priority" },
  //   { label: "Incoming enquiry", value: "incoming enquiry" },
  // ]);
  const [prospectOptions, setProspectOptions] = useState([]);

  // const [ownershipOptions, setOwnershipOptions] = useState([
  //   { label: "Jacob contact", value: "jacob contact" },
  //   { label: "Philip contact", value: "philip contact" },
  // ]);
  const [ownershipOptions, setOwnershipOptions] = useState([]);

  // const [customerOptions, setCustomerOptions] = useState([
  //   { label: "Publisher", value: "publiseher" },
  //   { label: "Pharma maker", value: "pharma maker" },
  //   { label: "Pharma R&D", value: "pharma r&d" },
  //   { label: "Other", value: "other" },
  // ]);

  const [customerOptions, setCustomerOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [companyProductOptions, setCompanyProductOptions] = useState([]);
  const [therapyAreaOptions, setTherapyAreaOptions] = useState([]);
  const [localOptions, setLocalOptions] = useState([]);
  const [taskOptions, setTaskOptions] = useState([]);
  // const [logActivityOptions, setLogActivityOptions] = useState([
  //   { label: "Call", value: "call" },
  //   { label: "Email", value: "email" },
  //   { label: "Incoming", value: "incoming" },
  //   { label: "LinkedIn", value: "linkedIn" },
  //   { label: "Event", value: "event" },
  // ]);
  const [logActivityOptions, setLogActivityOptions] = useState([]);

  // const [pipelineOptions, setPipelineOptions] = useState([
  //   { label: "New", value: "new" },
  //   { label: "Qualified", value: "qualified" },
  //   { label: "Meeting (initial intro)", value: "meetingInitialIntro" },
  //   { label: "Meeting (presentation)", value: "meetingPresentation" },
  //   { label: "Proposal", value: "proposal" },
  //   { label: "Negotiation", value: "negotiation" },
  //   { label: "Contract (closed)", value: "contract" },
  //   { label: "Long grass", value: "longGrass" },
  // ]);

  const [pipelineOptions, setPipelineOptions] = useState([]);

  // const [probabilityOptions, setProbabilityOptions] = useState([
  //   { label: "10%", value: ".1" },
  //   { label: "20%", value: ".2" },
  //   { label: "30%", value: ".3" },
  //   { label: "40%", value: ".4" },
  // ]);
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
  const [userInputs, setUserInputs] = useState({
    jobTitle: "",
    title: { value: "" },
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    alternativeEmail: "",
    countryCode: { value: "" },
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
    // country: { value: "" },
    companyWebsite: "",
    companyProduct: { value: "" },
    therapyArea: { value: "" },
    local: { value: "" },
    address: [],
    // stree1: "",
    // street2: "",
    // city: "",
    // postcode: "",
    // addressCountry: "",
    logActivity: { value: "" },
    task: { value: "" },
    nextContact: new Date(
      moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")
    ),
    opportunityTitle: "",
    ourProduct: "",
    contactTotal: "",
    pipeline: { value: "" },
    pipeline: "",
    opportunityValue: "",
    probability: { value: "" },
    weighted_value: 0,
    quoteSent: "",
    typeContact: [],
    quoteValid: new Date(moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")),
  });
  const [countryCode, setCountryCode] = useState([
    { value: "Afghanistan", label: "+93" },
    { value: "Albania", label: "+355" },
    { value: "Algeria", label: "+213" },
    { value: "American Samoa", label: "+1-684" },
    { value: "Andorra", label: "+376" },
    { value: "Angola", label: "+244" },
    { value: "Anguilla", label: "+1-264" },
    { value: "Antarctica", label: "+672" },
    { value: "Antigua and Barbuda", label: "+1-268" },
    { value: "Argentina", label: "+54" },
    { value: "Armenia", label: "+374" },
    { value: "India", label: "+91" },
    { value: "Azerbaijan", label: "+994" },
    { value: "Bahamas", label: "+1-242" },
    { value: "Bahrain", label: "+973" },
    { value: "Bangladesh", label: "+880" },
    { value: "Barbados", label: "+1-246" },
    { value: "Belarus", label: "+375" },
    { value: "Belgium", label: "+32" },
  ]);
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

  //   const handleChange = (e, isSelectedName) => {
  //     setUserInputs((prev) => ({
  //       ...prev,

  //       [isSelectedName ? isSelectedName : e.target.name]: isSelectedName
  //         ? e
  //         : e.target.value,
  //     }));
  //   };

  // useEffect(() => {
  //   console.log(userInputs, "===>userInputs");

  // }, [userInputs]);

  // useEffect(() => {
  //   console.log(userInputs, "===>userInputs");
  //   initalFun();
  // }, []);

  useEffect(() => {
    // console.log(userInputs, "===>userInputs");

    initalFun();
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

      const usersData = await getData(
        `${ENDPOINT.GET_MARKETING_USER_DROP}/${id}`
      );
      const data = usersData?.data?.data;

      console.log("data");

      let phoneNumber = data?.primary_phone.split("-informed-");

      setUserInputs({
        ...userInputs,
        jobTitle: data?.jobTitle,
        title: { value: data?.title },
        firstName: data?.firstName,
        middleName: data?.middleName,
        lastName: data?.lastName,
        email: data?.email,
        alternativeEmail: data?.alternativeEmail,
        countryCode: { label: phoneNumber[0], value: phoneNumber[0] },
        primary_phone: phoneNumber[1],
        alternativePhone: parseInt(data?.alternativePhone),
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
        //  address: `${data?.address}-${data?.stree1}-${data?.street2}-${data?.city}-${data?.postcode}-${data?.addressCountry}`,
address:JSON.parse(data?.address),
        // street1: data?.address.street1,
        // street2: data?.address.street2,
        // city: data?.address.city,
        // postcode: data?.address.postcode,
        // addressCountry: data?.address.country,
        logActivity: { value: data?.log_activity },
        task:  data?.task,
        opportunityTitle: data?.opportunity_title,
        ourProduct: data?.our_product,
        pipeline: { value: data?.pipeline },
        opportunityValue: data?.opportunity_value,
        probability: { value: data?.probability },
        weighted_value: data?.weighted_value,
        contactTotal: data?.contact_total,
        quoteSent: data?.quote_sent,
        quoteValid: data?.quote_valid_until,
        typeContact: data?.type_of_contact,
      });

      loader("hide");
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  const handleChange = (e, isSelectedName,key) => {
    let weighted_Value=""
    // if (userInputs?.opportunityValue && userInputs?.probability?.value) {
    //   weighted_Value =
    //     userInputs?.opportunityValue * userInputs?.probability?.value;
    // }
    if (isSelectedName == "address") {

    

      if (e.target?.name == "street1") {

        setUserInputs({
          ...userInputs,
          address: { ...userInputs?.address, street1: e?.target?.value },
        });
      } else if (e.target?.name == "street2") {
   
        setUserInputs({
          ...userInputs,
          address: { ...userInputs?.address, street2: e?.target?.value },
        });
      } else if (e.target?.name == "city") {
     
        setUserInputs({
          ...userInputs,
          address: { ...userInputs?.address, city: e?.target?.value },
        });
      } else if (key == "addressCountry") {
       
        setUserInputs({
          ...userInputs,
          address: { ...userInputs?.address, country: e?.value },
        });
      } else if (e.target?.name == "postcode") {
    
        setUserInputs({
          ...userInputs,
          address: { ...userInputs?.address, postcode: e?.target?.value },
        });
      }
    }
    else if (isSelectedName == "probability") {
      if (userInputs?.opportunityValue) {
        weighted_Value = (userInputs?.opportunityValue * e?.value) / 100;
        setUserInputs({
          ...userInputs,
          weighted_value: weighted_Value,
          [isSelectedName ? isSelectedName : e.target.name]: isSelectedName
            ? e
            : e?.target?.value,
        });
      } else {
        setUserInputs({
          ...userInputs,
          [isSelectedName ? isSelectedName : e.target.name]: isSelectedName
            ? e
            : e?.target?.value,
        });
      }
    } else if (e.target?.name == "opportunityValue") {
      let weighted_Value = "";
      if (userInputs?.probability?.value) {
        weighted_Value =
          (userInputs?.probability?.value * e?.target?.value) / 100;
        console.log(weighted_Value);

        setUserInputs({
          ...userInputs,
          weighted_value: weighted_Value,
          [isSelectedName ? isSelectedName : e.target.name]: isSelectedName
            ? e
            : e?.target?.value,
        });
      } else {
        setUserInputs({
          ...userInputs,
          [isSelectedName ? isSelectedName : e.target.name]: isSelectedName
            ? e
            : e?.target?.value,
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
    }

     else if (isSelectedName == "taskValueChecked") {
      // console.log();
      if(e){
      setUserInputs({
        ...userInputs,
        task: { ...userInputs?.task, taskCheckClicked: e,taskDate:new Date() }})
      // console.log(userInputs);
      }
      else{
        setUserInputs({
          ...userInputs,
          task: { ...userInputs?.task, taskCheckClicked: e }})
        // console.log(userInputs);
        
      }
    } 
    
    else if (isSelectedName == "taskDate") {

      // console.log(e);
      setUserInputs({
        ...userInputs,
        task: { ...userInputs?.task, taskDate:new Date(e) }})
      // console.log(userInputs);
   
    }
    else if (isSelectedName == "task") {

      setUserInputs({
        ...userInputs,
        task: { ...userInputs?.task,
        task: e?.value}
      });
      console.log(userInputs);
    }
     else {
      
      setUserInputs({
        ...userInputs,

        [isSelectedName ? isSelectedName : e.target.name]: isSelectedName
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

        companyName: "company_name",

        companyProduct: "company_product",

        therapyArea: "company_therapy_area",

        local: "local",

        task: "task",

        pipeline: "pipeline",

        logActivity: "log_activity",
      };
      loader("show");
      // const hasData = await postData(`${ENDPOINT.ADD_MARKETING_FEATURES}`, { label: newProduct.label, value: newProduct.value });
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
        let companyProduct = companyOptions;
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
            <h4>Please fill the following details</h4>
            <div className="row">
              <div className="col-12 col-md-7">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Job title</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="jobTitle"
                    defaultValue={userInputs?.jobTitle}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter job title here"
                  />
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Title</Form.Label>
                  <Select
                    options={titleOptions}
                    name="title"
                    //   value={userInputs?.title?.value}
                    value={{
                      label: userInputs?.title?.value,
                      value: userInputs?.title?.value,
                    }}
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
                    ref={emailRef}
                    name="email"
                    defaultValue={userInputs?.email}
                    onInput={(e) => handleChange(e)}
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
                    className="form-control"
                    placeholder="example@email.com"
                    name="alternativeEmail"
                    defaultValue={userInputs?.alternativeEmail}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="form-group primary_phone">
                  <Form.Label htmlFor="">Primary phone </Form.Label>
                  <Select
                    options={countryCode}
                    value={{
                      label: userInputs?.countryCode?.label,
                      value: userInputs?.countryCode?.value,
                    }}
                    name="countryCode"
                    className="dropdown-basic-button split-button-dropup"
                    isClearable
                    placeholder=""
                    onChange={(e) => handleChange(e, "countryCode")}
                  />

                  <input
                    type="number"
                    className={
                      error?.primary_phone
                        ? "form-control error"
                        : "form-control"
                    }
                    name="primary_phone"
                    placeholder="Phone number"
                    defaultValue={userInputs?.primary_phone}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Alternative phone</Form.Label>
                  <input
                    type="number"
                    className="form-control"
                    name="alternativePhone"
                    placeholder="Alternative phone"
                    value={userInputs?.alternativePhone}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">LinkedIn</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter linkedIn"
                    className="form-control"
                    name="linkedIn"
                    defaultValue={userInputs?.linkedIn}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Prospect</Form.Label>
                  <Select
                    options={prospectOptions}
                    name="prospect"
                    value={{
                      label: userInputs?.prospect?.value,
                      value: userInputs?.prospect?.value,
                    }}
                    //  value={userInputs?.prospect}
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
                    //  value={userInputs?.ownership}
                    value={{
                      label: userInputs?.ownership?.value,
                      value: userInputs?.ownership?.value,
                    }}
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
                {console.log("type-->", userInputs?.type_of_contact)}
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
                  {/* <fieldset id="group2">
                    <input
                      type="checkbox"
                      value="value1"
                      name="main"
                      checked={userInputs?.main}
                      onClick={(e) => handleChange(e.target?.checked, "main")}
                      id="limitagreed1"
                    />
                    <Form.Label htmlFor="limitagreed1">Main</Form.Label>
                    <input
                      type="checkbox"
                      value="value2"
                      name="influencer"
                      checked={userInputs?.influencer}
                      onClick={(e) =>
                        handleChange(e.target?.checked, "influencer")
                      }
                      id="limitagreed2"
                    />
                    <Form.Label htmlFor="limitagreed2">Influencer</Form.Label>
                    <input
                      type="checkbox"
                      value="value3"
                      checked={userInputs?.decisionMaker}
                      onClick={(e) =>
                        handleChange(e.target?.checked, "decisionMaker")
                      }
                      name="decisionMaker"
                      id="limitagreed3"
                    />
                    <Form.Label htmlFor="limitagreed3">
                      Decision maker
                    </Form.Label>
                    <input
                      type="checkbox"
                      value="value4"
                      name="introducer"
                      checked={userInputs?.introducer}
                      onClick={(e) =>
                        handleChange(e.target?.checked, "introducer")
                      }
                      id="limitagreed4"
                    />
                    <Form.Label htmlFor="limitagreed4">Introducer</Form.Label>
                  </fieldset> */}
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Customer type</Form.Label>
                  <Select
                    options={customerOptions}
                    name="customerType"
                    value={{
                      label: userInputs?.customerType?.value,
                      value: userInputs?.customerType?.value,
                    }}
                    // value={userInputs?.customerType}
                    onChange={(e) => handleChange(e, "customerType")}
                    placeholder="Select contact customer type"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    isClearable
                  />
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Company name</Form.Label>
                  <Select
                    options={companyOptions}
                    name="companyName"
                    value={{
                      label: userInputs?.companyName?.value,
                      value: userInputs?.companyName?.value,
                    }}
                    // value={userInputs?.company}
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
                    // className="dropdown-basic-button split-button-dropup"
                    className={
                      error?.country
                        ? "dropdown-basic-button split-button-dropup error"
                        : "dropdown-basic-button split-button-dropup"
                    }
                    name="country"
                    isClearable
                    placeholder="Select country"
                    value={{
                      label: userInputs?.country?.value,
                      value: userInputs?.country?.value,
                    }}
                    ref={countryRef}
                    onChange={(e) => handleChange(e, "country")}
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
                    //value={userInputs?.companyProduct}
                    value={{
                      label: userInputs?.companyProduct?.value,
                      value: userInputs?.companyProduct?.value,
                    }}
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
                    // value={userInputs?.therapyArea}
                    onChange={(e) => handleChange(e, "therapyArea")}
                    value={{
                      label: userInputs?.therapyArea?.value,
                      value: userInputs?.therapyArea?.value,
                    }}
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
                    // value={userInputs?.local}
                    value={{
                      label: userInputs?.local?.value,
                      value: userInputs?.local?.value,
                    }}
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
                    className="form-control"
                    name="postcode"
                    defaultValue={userInputs?.address?.postcode}
                    value={userInputs?.address?.postcode}
                    onChange={(e) => handleChange(e, "address")}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Country</Form.Label>

                  <Select
                    options={countryAll}
                    className="dropdown-basic-button split-button-dropup"
                    isClearable
                    placeholder="Select country"
                    // defaultValue={userInputs?.addressCountry}
                    value={userInputs?.address?.country?{value:userInputs?.address?.country,label:userInputs?.address?.country}:{value:"",label:""}}
         
                    onChange={(e) =>
                      handleChange(e, "address", "addressCountry")
                    }
                  />
                </Form.Group>
                {/* <Form.Group className="form-group">
                  <Form.Label htmlFor="">Country</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter country"
                    className="form-control"
                    name="addressCountry"
                    defaultValue={userInputs?.addressCountry}
                    onChange={(e) =>
                      handleChange(e, "address", "addressCountry")
                    }
                  />
                </Form.Group> */}
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Log activity</Form.Label>
                  <Select
                    options={logActivityOptions}
                    name="logActivity"
                    // value={userInputs?.logActivity}
                    value={{
                      label: userInputs?.logActivity?.value,
                      value: userInputs?.logActivity?.value,
                    }}
                    onChange={(e) => handleChange(e, "logActivity")}
                    placeholder="Select log activity"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    isClearable
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "logActivity")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New Log Activity +
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Task</Form.Label>
                  <Select
                    options={taskOptions}
                    name="task"
                    // value={userInputs?.task}
                    value={{
                      label: userInputs?.task?.task,
                      value: userInputs?.task?.task,
                    }}
                    onChange={(e) => handleChange(e, "task")}
                    placeholder="Select log activity"
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
                <Form.Group className="form-group">
                  {/* <Form.Label>Next contact</Form.Label> */}
                  <DatePicker
                    selected={
                      userInputs?.task?.taskDate
                        ? new Date(  userInputs?.task?.taskDate)
                        :""
                    }
                    name="taskDate"
                    onChange={(e) => handleChange(e, "taskDate")}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    // minDate={currentDate}
                  />
               
               <Form.Group className="form-group">
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
                                  userInputs?.task?.taskCheckClicked
                                    ? true
                                    : false
                                }
                                id={`taskCheckClicked`}
                              />
                       <Form.Label htmlFor="">Completed</Form.Label>
                            </>
                  </fieldset>
                  </Form.Group>
 
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
                  />
                </Form.Group>
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
                    type="number"
                    name="contactTotal"
                    min="0"
                    value={userInputs?.contactTotal}
                    // ref={limitFieldRef}
                    className={
                      error?.limit ? "form-control error" : "form-control"
                    }
                    placeholder="“0” value means unlimited limit"
                    onChange={(e) => handleChange(e)}
                  />
                  {error?.limit ? (
                    <div className="login-validation">{error?.limit}</div>
                  ) : null}
                </div>

                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Pipeline Stage</Form.Label>
                  <Select
                    options={pipelineOptions}
                    placeholder="Select pipeline stage"
                    className="dropdown-basic-button split-button-dropup"
                    // value={userInputs?.pipeline}
                    value={{
                      label: userInputs?.pipeline?.value,
                      value: userInputs?.pipeline?.value,
                    }}
                    isClearable
                    onChange={(e) => handleChange(e, "pipeline")}
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
                    type="number"
                    className="form-control"
                    name="opportunityValue"
                    placeholder="Value"
                    value={userInputs?.opportunityValue}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Probability %</Form.Label>
                  <Select
                    options={probabilityOptions}
                    className="dropdown-basic-button split-button-dropup"
                    isClearable
                    placeholder=""
                    name="probability"
                    value={{
                      label: userInputs?.probability?.value,
                      value: userInputs?.probability?.value,
                    }}
                    // value={userInputs?.probability}
                    onChange={(e) => handleChange(e, "probability")}
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
                    onChange={(e) => handleChange(e)}
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
                          checked={userInputs?.quoteSent}
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
                  {console.log( typeof userInputs?.quoteValid,"  userInputs?.quoteValid")}
                  <DatePicker
                  
                    selected={
                      userInputs?.quoteValid &&userInputs?.quoteValid !="0000-00-00 00:00:00"
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const nextButtonClicked = (e) => {
    e.preventDefault();
   
  
  
    const result = AddReaderValidation(userInputs);

    if (Object?.keys(result)?.length) {
      if (Object?.keys(result)[0] == "firstName") {
        nameRef?.current?.focus();
      } else if (Object?.keys(result)[0] == "email") {
        emailRef?.current?.focus();
      } else if (Object?.keys(result)[0] == "country") {
        countryRef?.current?.focus();
      }
      toast.error(result[Object?.keys(result)[0]]);
      setError(result);
      return;
    } else {
      try {
        loader("show");
        let data = {
          jobTitle: userInputs?.jobTitle,
          title: userInputs?.title?.value,
          firstName: userInputs?.firstName,
          middleName: userInputs?.middleName,
          lastName: userInputs?.lastName,
          email: userInputs?.email,
          alternativeEmail: userInputs?.alternativeEmail,
          primary_phone: `${
            userInputs?.countryCode?.label ? userInputs?.countryCode?.label : ""
          }-informed-${userInputs?.primary_phone}`,
          alternativePhone: userInputs?.alternativePhone,
          linkedIn: userInputs?.linkedIn,
          prospect: userInputs?.prospect?.value,
          type_of_contact: userInputs?.typeContact,
          contact_ownership: userInputs?.ownership?.value,
          // main: userInputs?.main,
          // influencer: userInputs?.influencer,
          // decision_maker: userInputs?.decisionMaker,
          // introducer: userInputs?.introducer,
          customerType: userInputs?.customerType?.value,
          company_name: userInputs?.companyName?.value,
          country: userInputs?.country?.value,
          company_website: userInputs?.companyWebsite,
          company_product: userInputs?.companyProduct?.value,
          company_therapy_area: userInputs?.therapyArea?.value,
          local: userInputs?.local?.value,
          // address: `${userInputs?.address}-${userInputs?.stree1}-${userInputs?.street2}-${userInputs?.city}-${userInputs?.postcode}-${userInputs?.addressCountry}`,
          address: userInputs?.address,
          log_activity: userInputs?.logActivity?.value,
          task: userInputs?.task,
          next_contact: userInputs?.nextContact.toString(),
          contact_total: userInputs?.contactTotal,
          opportunity_title: userInputs?.opportunityTitle,
          our_product: userInputs?.ourProduct,
          pipeline: userInputs?.pipeline?.value,
          opportunity_value: userInputs?.opportunityValue,
          probability: userInputs?.probability?.value,
          weighted_value: userInputs?.weighted_value
            ? userInputs?.weighted_value
            : "",
          quote_sent: userInputs?.quoteSent,
          quote_valid: userInputs?.quoteValid,
        };
        console.log("user inputs", data);
        loader("hide");
        // console.log(data);
        navigate("/reader-review", {
          state: {
            data: data,
            flag: 1,
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
