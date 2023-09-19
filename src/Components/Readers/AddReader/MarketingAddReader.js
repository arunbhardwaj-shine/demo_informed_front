import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Form, FormGroup } from "react-bootstrap";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import CommonModel from "../../../Model/CommonModel";
import { loader } from "../../../loader";
import DatePicker from "react-datepicker";
import moment from "moment";
import { ENDPOINT } from "../../../axios/apiConfig";
import { getData, postData } from "../../../axios/apiHelper";
import { AddReaderValidation } from "../../Validations/ReaderValidation/AddReaderValidation";
import { toast } from "react-toastify";

const MarketingAddReader = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const primaryPhoneRef = useRef(null);
  const countryRef = useRef(null);
  const postcodeRef = useRef(null);
  const contactTotalRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [titleOptions, setTitleOptions] = useState([]);
  const [groupId, setGroupId] = useState();
  const navigate = useNavigate();
  const [prospectOptions, setProspectOptions] = useState([]);
  const [ownershipOptions, setOwnershipOptions] = useState([]);
  const [companyProductOptions, setCompanyProductOptions] = useState([]);
  const [therapyAreaOptions, setTherapyAreaOptions] = useState([]);
  const [localOptions, setLocalOptions] = useState([]);
  const [taskOptions, setTaskOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [logActivityOptions, setLogActivityOptions] = useState([]);
  const [pipelineOptions, setPipelineOptions] = useState([]);
  const [probabilityOptions, setProbabilityOptions] = useState([]);
  const [countryAll, setCountryAll] = useState([]);
  const [typeOfContact, setTypeOfContact] = useState([]);
  const [error, setError] = useState({});
  const [commanShow, setCommanShow] = useState(false);
  const [data, setData] = useState([]);
  const [newProduct, setNewProduct] = useState({
    label: "",
    value: "",
  });
  const [commonHeader, setCommonHeader] = useState("");
  const [commonFooter, setCommonFooter] = useState("");
  const [showTaskExtra, setShowTaskExtra] = useState(false);
  const [userInputs, setUserInputs] = useState({
    jobTitle: "",
    title: { value: "" },
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    alternativeEmail: "",
    primary_phone: "",
    alternativePhone: "",
    linkedIn: "",
    prospect: { value: "" },
    ownership: { value: "" },
    typeContact: [],
    customerType: { value: "" },
    companyName: { value: "" },
    country: { value: "" },
    companyWebsite: "",
    companyProduct: { value: "" },
    therapyArea: { value: "" },
    local: { value: "" },
    address: { street1: "", street2: "", city: "", postcode: "", country: "" },
    logActivity: "",
    task: { task: "", taskCheckClicked: false, taskDate: "" },
    nextContact:
      // `${
      //   currentDate.getMonth() + 1
      // }/${currentDate.getDate()}/${currentDate.getFullYear()}`,
      new Date(moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")),
    opportunityTitle: "",
    ourProduct: "",
    contactTotal: "",
    pipeline: { value: "" },
    opportunityValue: "",
    probability: { value: "" },
    weightedValue: "",
    quoteSent: false,
    quoteValid:
      // `${
      //   currentDate.getMonth() + 1
      // }/${currentDate.getDate()}/${currentDate.getFullYear()}`,
      new Date(moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")),
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

  useEffect(() => {
    initalFun();
  }, []);
  useEffect(() => {}, [userInputs]);
  const initalFun = async () => {
    try {
      loader("show");
      const hasData = await getData(`${ENDPOINT.READER_MARKETING_USER_DROP}`);
      if (Object.keys(hasData?.data?.data)?.length) {
        let country = [];
        hasData?.data?.data?.country.reduce((objEntries, key) => {
          country.push({
            label: key,
            value: key,
          });
        });
        setCountryAll(country);
        setTitleOptions(hasData?.data?.data?.title);
        setProspectOptions(hasData?.data?.data?.prospect);
        setOwnershipOptions(hasData?.data?.data?.contact_ownership);
        setCustomerOptions(hasData?.data?.data?.customer_type);
        setCompanyOptions(hasData?.data?.data?.company_name);
        setCompanyProductOptions(hasData?.data?.data?.company_product);
        setTherapyAreaOptions(hasData?.data?.data?.company_therapy_area);
        setLocalOptions(hasData?.data?.data?.local);
        setTaskOptions(hasData?.data?.data?.task);
        setPipelineOptions(hasData?.data?.data?.pipeline);
        setProbabilityOptions(hasData?.data?.data?.probablity);
        setTypeOfContact(hasData?.data?.data?.type_of_contact);
        setLogActivityOptions(hasData?.data?.data?.log_activity);
      }
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  const handleChange = (e, isSelectedName, key) => {
    if (isSelectedName == "task") {
      setShowTaskExtra(true);
    }
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
        const cleanedValue = e.target?.value;
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
    } else if (isSelectedName == "probability") {
      let weighted_Value = "";
      if (userInputs?.opportunityValue) {
        weighted_Value = (userInputs?.opportunityValue * e?.value) / 100;
        setUserInputs({
          ...userInputs,
          weightedValue: weighted_Value,
          [isSelectedName ? isSelectedName : e.target?.name]: isSelectedName
            ? e
            : e?.target?.value,
        });
      } else {
        setUserInputs({
          ...userInputs,
          [isSelectedName ? isSelectedName : e.target?.name]: isSelectedName
            ? e
            : e?.target?.value,
        });
      }
    } else if (e.target?.name == "opportunityValue") {
      let weighted_Value = "";
      if (userInputs?.probability?.value) {
        weighted_Value =
          (userInputs?.probability?.value * e?.target?.value) / 100;

        setUserInputs({
          ...userInputs,
          weightedValue: weighted_Value,
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
    } else if (e?.target?.name == "primary_phone") {
      const cleanedValue = e.target?.value?.replace(/\D/g, "");
      if (cleanedValue?.length <= 12) {
        setUserInputs({
          ...userInputs,

          [e.target.name]: cleanedValue,
        });
        setError(null);
      } else {
        setError({ primary_phone: "Number must be 12 digits or less" });
      }
    } else if (e?.target?.name == "alternativePhone") {
      const cleanedValue = e.target?.value?.replace(/\D/g, "");
      if (cleanedValue?.length <= 12) {
        setUserInputs({
          ...userInputs,
          [e.target.name]: cleanedValue,
        });
        setError(null);
      } else {
        setError({ alternativePhone: "Number must be 12 digits or less" });
      }
    } else if (e.target?.name == "contactTotal") {
      const cleanedValue = e.target?.value?.replace(/\D/g, "");
      if (cleanedValue > 500 || cleanedValue < 0) {
        setError({ contactTotal: "Contact total must be inbetween 0 to 500" });
      } else {
        setUserInputs({
          ...userInputs,
          [e.target.name]: cleanedValue,
        });
        setError(null);
      }
    } else if (isSelectedName == "task") {
      setUserInputs({
        ...userInputs,
        task: { ...userInputs?.task, task: e?.value },
      });
    } else {
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
      loader("show");
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
        <div className="create-change-content reader_added">
          <div className="form_action">
            {/* <h4>About CRM you're creating</h4> */}
            <div className="row">
              <div className="col-12 col-md-7">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Job title</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="jobTitle"
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter job title here"
                  />
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Title</Form.Label>
                  <Select
                    options={titleOptions}
                    name="title"
                    value={userInputs?.title?.value ? userInputs?.title : ""}
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
                    className={
                      error?.alternativeEmail
                        ? "form-control error"
                        : "form-control"
                    }
                    placeholder="example@email.com"
                    name="alternativeEmail"
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
                  <Form.Label htmlFor="">
                    Primary phone<span>*</span>{" "}
                  </Form.Label>
                  <Select
                    options={countryCode}
                    className="dropdown-basic-button split-button-dropup"
                    isClearable
                    value={
                      userInputs?.countryCode?.value
                        ? userInputs?.countryCode
                        : ""
                    }
                    ref={primaryPhoneRef}
                    placeholder="Select "
                    onChange={(e) => handleChange(e, "countryCode")}
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
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Prospect</Form.Label>
                  <Select
                    options={prospectOptions}
                    name="prospect"
                    value={
                      userInputs?.prospect?.value ? userInputs?.prospect : ""
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
                      userInputs?.ownership?.value ? userInputs?.ownership : ""
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
                      userInputs?.customerType?.value
                        ? userInputs?.customerType
                        : ""
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
                      userInputs?.companyName?.value
                        ? userInputs?.companyName
                        : ""
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
                    Country <span>*</span>{" "}
                  </Form.Label>
                  <Select
                    options={countryAll}
                    className={
                      error?.country
                        ? "dropdown-basic-button split-button-dropup error"
                        : "dropdown-basic-button split-button-dropup"
                    }
                    isClearable
                    value={
                      userInputs?.country?.value ? userInputs?.country : ""
                    }
                    placeholder="Select country"
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
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Company product</Form.Label>
                  <Select
                    options={companyProductOptions}
                    name="companyProduct"
                    value={
                      userInputs?.companyProduct?.value
                        ? userInputs?.companyProduct
                        : ""
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
                    value={
                      userInputs?.therapyArea?.value
                        ? userInputs?.therapyArea
                        : ""
                    }
                    onChange={(e) => handleChange(e, "therapyArea")}
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
                    value={userInputs?.local?.value ? userInputs?.local : ""}
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
                    isClearable
                    value={
                      userInputs?.address?.country
                        ? {
                            label: userInputs?.address?.country,
                            value: userInputs?.address?.country,
                          }
                        : ""
                    }
                    placeholder="Select country"
                    onChange={(e) =>
                      handleChange(e, "address", "addressCountry")
                    }
                  />
                </Form.Group>
                {/* <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Log activity</Form.Label>
                  <Select
                    options={logActivityOptions}
                    name="logActivity"
                    value={userInputs?.logActivity}
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
                </Form.Group> */}
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Task</Form.Label>
                  <Select
                    options={taskOptions}
                    name="task"
                    value={
                      userInputs?.task?.task
                        ? {
                            value: userInputs?.task?.task,
                            label: userInputs?.task?.task,
                          }
                        : ""
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

                {showTaskExtra && (
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
                              id={`taskCheckClicked`}
                            />
                            <Form.Label htmlFor="taskCheckClicked">Completed</Form.Label>
                          </>
                        </fieldset>
                      </div>
                    </Form.Group>
                  </div>
                )}
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
              <div className="col-12 col-md-5 d-flex justify-content-end right-change">
                <div className="form-group justify-content-end align-items-start">
                  <label htmlFor="">Log activity </label>

                  <textarea
                    name="logActivity"
                    value={userInputs?.logActivity}
                    className="form-control"
                    id="formControlTextarea"
                    onChange={(e) =>
                      handleChange(e?.target?.value, "logActivity")
                    }
                    rows="5"
                    placeholder="Please type your notes here..."
                  ></textarea>
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
          <div className="form_action">
            {/* <h4>Opportunity</h4> */}
            <div className="row">
              <div className="col-12 col-md-7">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Title</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="opportunityTitle"
                    placeholder="Title"
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
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <div className="form-group">
                  <label htmlFor="">Contact total</label>
                  <input
                    type="number"
                    name="contactTotal"
                    min="0"
                    max="500"
                    ref={contactTotalRef}
                    className={
                      error?.contactTotal
                        ? "form-control error"
                        : "form-control"
                    }
                    value={userInputs?.contactTotal}
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
                    // className="dropdown-basic-button split-button-dropup"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    value={
                      userInputs?.pipeline?.value ? userInputs?.pipeline : ""
                    }
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
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="form-group ">
                  <Form.Label htmlFor="">Probability %</Form.Label>
                  <Select
                    options={probabilityOptions}
                    className="dropdown-basic-button split-button-dropup"
                    isClearable
                    value={
                      userInputs?.probability?.value
                        ? userInputs?.probability
                        : ""
                    }
                    placeholder="Select probability"
                    onChange={(e) => handleChange(e, "probability")}
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label htmlFor=""> Weighted value</Form.Label>
                  <input
                    type="number"
                    className="form-control"
                    name="weightedValue"
                    placeholder="Weighted value"
                    value={
                      userInputs?.weightedValue
                        ? (userInputs?.weightedValue).toFixed(2)
                        : ""
                    }
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
                      userInputs?.quoteValid
                        ? new Date(userInputs?.quoteValid)
                        : new Date(
                            moment(new Date(), "MM/DD/YYYY").format(
                              "MM/DD/YYYY"
                            )
                          )
                    }
                    name="quoteValid"
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

  const formatDate = (newDate) => {
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
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
    const result = AddReaderValidation(userInputs, groupId);

    if (Object.keys(result)?.length) {
      if (Object.keys(result)[0] == "firstName") {
        nameRef.current.focus();
      } else if (Object.keys(result)[0] == "email") {
        emailRef.current.focus();
      } else if (Object.keys(result)[0] == "primary_phone") {
        primaryPhoneRef.current.focus();
      } else if (Object.keys(result)[0] == "country") {
        countryRef.current.focus();
      } else if (Object.keys(result)[0] == "postcode") {
        postcodeRef.current.focus();
      } else if (Object.keys(result)[0] == "contactTotal") {
        contactTotalRef.current.focus();
      }
      toast.error(result[Object.keys(result)[0]]);
      setError(result);
      return;
    } else {
      try {
        loader("show");
        let nextContactDate = "";
        if (isValidDateFormat(userInputs?.nextContact)) {
          nextContactDate = convertDate(userInputs?.nextContact);
        } else {
          nextContactDate = formatDate(userInputs?.nextContact);
        }
        let quoteValidDate = "";
        if (isValidDateFormat(userInputs?.quoteValid)) {
          quoteValidDate = convertDate(userInputs?.quoteValid);
        } else {
          quoteValidDate = formatDate(userInputs?.quoteValid);
        }
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
          contact_ownership: userInputs?.ownership?.value,
          type_of_contact: userInputs?.typeContact,
          customerType: userInputs?.customerType?.value,
          company_name: userInputs?.companyName?.value,
          country: userInputs?.country?.value,
          company_website: userInputs?.companyWebsite,
          company_product: userInputs?.companyProduct?.value,
          company_therapy_area: userInputs?.therapyArea?.value,
          local: userInputs?.local?.value,
          // address: `${userInputs?.street1}-${userInputs?.street2}-${userInputs?.city}-${userInputs?.postcode}-${userInputs?.addressCountry?.value}`,
          address: userInputs?.address,
          log_activity: userInputs?.logActivity,
          task: {
            task: userInputs?.task?.task,
            taskCheckClicked: userInputs?.task?.taskCheckClicked,
            taskDate: userInputs?.task?.taskDate,
          },
          next_contact: nextContactDate,
          opportunity_title: userInputs?.opportunityTitle,
          our_product: userInputs?.ourProduct,
          contact_total: userInputs?.contactTotal,
          pipeline: userInputs?.pipeline?.value,
          opportunity_value: userInputs?.opportunityValue,
          probability: userInputs?.probability?.value,
          weighted_value: userInputs?.weightedValue
            ? userInputs?.weightedValue
            : "",
          quote_sent: userInputs?.quoteSent,
          quote_valid: quoteValidDate,
        };
        loader("hide");
        navigate("/reader-review", {
          state: {
            data: data,
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
                      <a href="">Create Your Content</a>
                    </li>

                    <li className="">
                      <a href="">Approve Your Content &amp; Publish</a>
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
export default MarketingAddReader;
