import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loader } from "../../../../../loader";
import { getData, postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import TemplateThree from "./TemplateThree";
import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";
import moment from "moment";
import CountryList from "./CountryList";
import DatePicker from "react-datepicker";
import Select from "react-select";
const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const userData = {
  name: "userName",
  email: "userEmail",
  country: "country",
  "Your Country": "country",
  state: "state",
  consent: "consent",
  websiteFolder: "websiteFolder",
  companyId: "companyId",
  eventId: "eventId",
  speaker: "speaker",
  companyEmail: "companyEmail",
  virtual_or_live: "virtual_or_live",
  radio_group: 1,
  radio_group2: 1,
  organize_own: 4,
  being_connected: "being_connected",
  "Airport of departure": "departure",
  "Preferred departure date": "air_departure_date",
  "Preferred departure time": "departure_time",
  "Preferred return flight date": "air_return_date",
  "I consent to:": "consent",
};
const stateOptions = [
  { label: "Alabama", value: "Alabama" },
  { label: "Alaska", value: "Alaska" },
  { label: "Arizona", value: "Arizona" },
  { label: "Arkansas", value: "Arkansas" },
  { label: "California", value: "California" },
  { label: "Colorado", value: "Colorado" },
  { label: "Connecticut", value: "Connecticut" },
  { label: "Delaware", value: "Delaware" },
  { label: "Florida", value: "Florida" },
  { label: "Georgia", value: "Georgia" },
  { label: "Hawaii", value: "Hawaii" },
  { label: "Ldaho", value: "Ldaho" },
  { label: "Illinois", value: "Illinois" },
  { label: "Indiana", value: "Indiana" },
  { label: "Lowa", value: "Lowa" },
  { label: "Kansas", value: "Kansas" },
  { label: "Kentucky", value: "Kentucky" },
  { label: "Louisiana", value: "Louisiana" },
  { label: "Maine", value: "Maine" },
  { label: "Maryland", value: "Maryland" },
  { label: "Massachusetts", value: "Massachusetts" },
  { label: "Michigan", value: "Michigan" },
  { label: "Minnesota", value: "Minnesota" },
  { label: "Mississippi", value: "Mississippi" },
  { label: "Missouri", value: "Missouri" },
  { label: "Montana", value: "Montana" },
  { label: "Nebraska", value: "Nebraska" },
  { label: "Nevada", value: "Nevada" },
  { label: "New Hampshire", value: "New Hampshire" },
  { label: "New Jersey", value: "New Jersy" },
  { label: "New Mexico", value: "New Mexico" },
  { label: "New York", value: "New York" },
  { label: "North Carolina", value: "North Carolina" },
  { label: "North Dakota", value: "North Dakota" },
  { label: "Ohio", value: "Ohio" },
  { label: "Oklahoma", value: "Oklahoma" },
  { label: "Oregon", value: "Oregon" },
  { label: "Pennsylvania", value: "Pennsylvania" },
  { label: "Rhode Island", value: "Rhode Island" },
  { label: "South Carolina", value: "South Carolina" },
  { label: "South Dakota", value: "South Dakota" },
  { label: "Tennessee", value: "Tennessee" },
  { label: "Texas", value: "Texas" },
  { label: "Utah", value: "Utah" },
  { label: "Vermont", value: "Vermont" },
  { label: "Wyoming", value: "Wyoming" },
  { label: "Wisconsin", value: "Wisconsin" },
  { label: "West Virginia", value: "West Virginia" },
  { label: "Washington", value: "Washington" },
  { label: "Virginia", value: "Virginia" },
];

const RegistrationPage = ({ prevData }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const event_code = new URLSearchParams(location.search).get("event");

  const [formData, setFormData] = useState(prevData || {});
  const [formFieldData, setFormFieldData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [pageColors, setPageColors] = useState(
    prevData
      ? {
          labelColor: prevData?.content?.labelColor,
          background: prevData?.content?.backgroundColor,
          optionColor: prevData?.content?.optionColor,
        }
      : { labelColor: "#fff000", background: "#000",optionColor:"#000" }
  );

  useEffect(() => {
    EventDataFun();
  }, []);

  const EventDataFun = async () => {
    try {
      loader("show");

      const response = await getData(
        `${ENDPOINT.GET_REGISTRATION_FORM}/${
          prevData?.eventCode ? prevData?.eventCode : event_code
        }`
      );
      let hadData = {};
      if (!prevData?.content) {
        hadData = {
          ...response?.data?.data,
          content: JSON.parse(response?.data?.data?.content),
          raw_description: JSON.parse(response?.data?.data?.raw_description),
        };
      } else {
       let raw=response?.data?.data?.raw_description? JSON.parse(response?.data?.data?.raw_description):{
        "title": "",
        "location": "",
        "type": "",
        "timezone": "",
        "countryTimezone": "",
        "isClientStream": 0,
        "clientStreamUrl": "",
        "dateStart": "",
        "dateStartHour": "",
        "dateStartMin": "",
        "dateEndHour": "",
        "dateEndMin": "",
        "eventCode": "",
        "description": "",
        "speaker_name": "",
        "speaker_email": "",
        "meeting_type": ""
      }
      
        hadData = {
          ...response?.data?.data,
          content: JSON.parse(prevData?.content),
          raw_description: raw,
        };
      }
      setFormData(hadData);
      setPageColors({
        labelColor: hadData?.content?.labelColor,
        background: hadData?.content?.backgroundColor,
        optionColor: hadData?.content?.optionColor,
      });
      loader("hide");
    } catch (err) {
      loader("hide");
      console.error("-err", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = ValidateFormData();

    if (isValid) {
      loader("show");
      try {
        let raw = formData?.raw_description;
        const response = await postData(
          "https://webinar.docintel.app/flow/apis/register",
          {
            ...formFieldData,
            companyId: formData?.company_id,
            eventId: formData?.event_id,
            speaker: raw?.speaker_name,
            companyEmail: raw?.speaker_email,
            virtual_or_live: raw?.meeting_type,
            websiteFolder: "new_webinar",
          }
        );
      } catch (error) {
        console.error("Error submitting data:", error);
      } finally {
        loader("hide");
      }
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  const ValidateFormData = () => {
    const errors = {};

    formData?.content?.body?.forEach((form) => {
      const label = userData[form.label]
        ? userData[form.label]
        : form?.label?.replace(/ /g, "_");
      const fieldValue = formFieldData[label];

      if (form.required === "yes" && !fieldValue) {
        errors[label] = `This field is required.`;
      } else {
        delete errors[label];
      }

      if (form.inputType === "email" && fieldValue) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailRegex.test(fieldValue)) {
          errors[label] = "Invalid email address.";
        } else {
          delete errors[label];
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBackClicked = () => {
    navigate("/webinar-registration", { state: prevData });
  };
  const handleSubmit1 = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <h2>Welcome {username}!</h2>;
  }
  const myContent1 = (
    <>
      {/* {prevData && (
        <button
          type="submit"
          className="btn btn-primary"
          id="submit_registration"
          onClick={handleBackClicked}
        >
          Back
        </button>
      )} */}
      {/* <div className="App">
      <h2>Login</h2>
      <form onSubmit={handleSubmit1}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div> */}
      <section className="consent-form">
        <div className="container">
          <div
            className="consent-form-inner"
            style={{ background: `${pageColors?.background}` }}
          >
            <form id="registration_form" onSubmit={handleSubmit}>
              <div className="row" id="form_upper">
                <div className="col-sm-12 col-md-12 center-sided">
                <h2 style={{
                    color: formData?.content?.eventDetails?.pageTitle?.color,

                  }} >{formData?.content?.eventDetails?.pageTitle?.value}</h2>
                  <h3 style={{
                    color: formData?.content?.eventDetails?.bodyText?.color,

                  }}> {formData?.content?.eventDetails?.bodyText?.value}</h3>
                </div>
              </div>
              <div className="center-sided-inside">
                <div className="row">
                  {formData?.content?.body?.map((form, index) => (
                    <FormField1
                      form={form}
                      key={index}
                      formFieldData={formFieldData}
                      setFormFieldData={setFormFieldData}
                      formErrors={formErrors}
                      pageColors={pageColors}
                      level="root"
                      templateId={formData?.content?.templateId}
                    />
                  ))}
                  {!prevData && (
                    <button type="submit" className="btn btn-primary" id="submit_registration">Submit</button>
                  )}
                </div>
                <div className="footer-sec">
                  <span>* This consent is mandatory in order to register for the event.</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
  const myContent2 = (
    <>
      {/* {prevData && (
        <button
          type="submit"
          className="btn btn-primary"
          id="submit_registration"
          onClick={handleBackClicked}
        >
          Back
        </button>
      )} */}
      {/* <div className="App">
      <h2>Login</h2>
      <form onSubmit={handleSubmit1}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div> */}
      <section className="consent-form" >
        <div className="container">
          <div
            className="consent-form-inner"
            
          >
            <form id="registration_form" onSubmit={handleSubmit}>
              <div className="row" id="form_upper">
                <div className="col-sm-12 col-md-12 center-sided">
                  <h2 style={{
                    color: formData?.content?.eventDetails?.pageTitle?.color,

                  }}>{formData?.content?.eventDetails?.pageTitle?.value || "These meetings are for healthcare professionals only."}</h2>
                  <h3 style={{
                    color: formData?.content?.eventDetails?.bodyText?.color,

                  }}> {formData?.content?.bodyText}</h3>
                </div>
              </div>
              <div className="center-sided-inside">
                <div className="row">
                  {formData?.content?.body?.map((form, index) => (
                    <FormField2
                      form={form}
                      key={index}
                      formFieldData={formFieldData}
                      setFormFieldData={setFormFieldData}
                      formErrors={formErrors}
                      pageColors={pageColors}
                      level="root"
                      templateId={formData?.content?.templateId}
                    />
                  ))}
                  {!prevData && (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      id="submit_registration"
                    >
                      Submit
                    </button>
                  )}
                </div>
                <div className="footer-sec">
                  <span>
                    * This consent is mandatory in order to register for the
                    event.
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
  const myContent3 = (
    <>
      {/* {prevData && (
        <button
          type="submit"
          className="btn btn-primary"
          id="submit_registration"
          onClick={handleBackClicked}
        >
          Back
        </button>
      )} */}
      {/* <div className="App">
      <h2>Login</h2>
      <form onSubmit={handleSubmit1}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div> */}
      <section className="consent-form">
        <div className="container">
          <div
            className="consent-form-inner"
            style={{ background: `${pageColors?.background}` }}
          >
            <form id="registration_form" onSubmit={handleSubmit}>
              <div className="row" id="form_upper">
                <div className="col-sm-12 col-md-12 center-sided">
                  <h2 style={{
                    color: formData?.content?.eventDetails?.pageTitle?.color,

                  }}>{formData?.content?.eventDetails?.pageTitle?.value}</h2>
                  <h3  style={{
                    color: formData?.content?.eventDetails?.bodyText?.color,
                    
                  }}> {formData?.content?.eventDetails?.bodyText?.value}</h3>
                </div>
              </div>
              <div className="center-sided-inside">
                <div className="row">
                  {formData?.content?.body?.map((form, index) => (
                    <FormField3
                      form={form}
                      key={index}
                      formFieldData={formFieldData}
                      setFormFieldData={setFormFieldData}
                      formErrors={formErrors}
                      pageColors={pageColors}
                      level="root"
                      templateId={formData?.content?.templateId}
                    />
                  ))}
                  {!prevData && (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      id="submit_registration"
                    >
                      Submit
                    </button>
                  )}
                </div>
                <div className="footer-sec">
                  <span>
                    * This consent is mandatory in order to register for the
                    event.
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
  return (
    <>
      <div className="loader" id="custom_loader">
        <div className="loader_show">
          <span className="loader-view"> </span>
        </div>
      </div>

      {formData?.content?.templateId === 1 && (
        <TemplateOne formData={formData}>{myContent1}</TemplateOne>
      )}

      {formData?.content?.templateId === 2 && (
        <TemplateTwo formData={formData}>{myContent2}</TemplateTwo>
      )}

      {(formData?.content?.templateId === 3 ||
        formData?.content?.templateId <= 0) && (
        <TemplateThree formData={formData}>{myContent3}</TemplateThree>
      )}
    </>
  );
};

export default RegistrationPage;

const FormField1 = ({
  form,
  formFieldData,
  setFormFieldData,
  formErrors,
  pageColors,
  level,
  templateId,
}) => {
  const [countryList, setCountryList] = useState(CountryList);
  const [extensionData, setExtensionData] = useState({});
  const label = userData[form.label]
    ? userData[form.label]
    : form?.label?.replace(/ /g, "_");

  const handleFieldChange = (value, e = "") => {
    const newData = { ...formFieldData };

    if (form?.inputType === "datepicker") {
      newData[label] = moment(value).format("YYYY-MM-DD");
    } else if (form?.inputType === "checkbox") {
      newData[label] = Array.isArray(newData[label]) ? newData[label] : [];

      if (e.target.checked) {
        newData[label] = [...newData[label], value];
      } else {
        newData[label] = newData[label].filter((item) => item !== value);
      }
    } else {
      newData[label] = value;
    }
    setFormFieldData(newData);
  };

  if (label?.includes("country") || label?.includes("Country")) {
    form.inputType = "selection-country";
  } else if (label?.includes("state") || label?.includes("state")) {
    form.inputType = "selection-state";
  }

  const isRequired = form.required === "yes";

  let fieldInput = null;

  if (form.inputType === "textarea") {
    fieldInput = (
      <textarea
        className="form-control"
        placeholder={form.placeholder}
        cols="40"
        rows="4"
        onChange={(e) => handleFieldChange(e.target.value)}
      ></textarea>
    );
  } else if (
    form.inputType === "selection" ||
    form.inputType === "selection-country" ||
    form.inputType === "selection-state"
  ) {
    const options = form.option?.map((op) => ({
      label: op.optionLabel,
      value: op.optionLabel,
    }));

    fieldInput = (
      <Select
        options={
          form.inputType === "selection-country"
            ? countryList
            : form.inputType === "selection-state"
            ? stateOptions
            : options
        }
        placeholder="Select country"
        className="dropdown-basic-button split-button-dropup mr-2 btn-bigger"
        isClearable
        onChange={(selectedOption) => handleFieldChange(selectedOption.value)}
      />
    );
  } else if (form.inputType === "datepicker") {
    fieldInput = (
      <DatePicker
        selected={formFieldData[label] ? new Date(formFieldData[label]) : null}
        name={form.label}
        dateFormat="dd/MM/yyyy"
        className="form-control"
        placeholderText="Select task date"
        onChange={(date) => handleFieldChange(date)}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
      />
    );
  } else if (form.inputType === "radio") {
    fieldInput = (
      <ul>
        {form.option?.map((item, index) => (
          <>
            <li key={index}>
              <input
                type={form.inputType}
                id={label + index}
                name={label}
                className="organize_own_selection"
                onChange={() => {
                  handleFieldChange(item.optionLabel);
                  // if (item.extension) {
                  setExtensionData({
                    [item.optionLabel]: item.extension ? item.extension : [],
                  });
                  // }
                }}
              />
              <label
                style={{
                  color: pageColors?.optionColor,
                }}
                htmlFor={label + index}
              >
                {item.optionLabel}
              </label>
              <span className="checkmark" />
            </li>
            {extensionData[item.optionLabel]?.length > 0 &&
              extensionData[item.optionLabel]?.map((opt, i) => (
                <FormField1
                  form={opt}
                  key={i}
                  formFieldData={formFieldData}
                  setFormFieldData={setFormFieldData}
                  formErrors={formErrors}
                  pageColors={pageColors}
                  level={form.label}
                />
              ))}
          </>
        ))}
      </ul>
    );
  } else if (form.inputType === "checkbox") {
    fieldInput = (
      <ul>
        {form.option?.map((item, index) => (
          <>
            <li key={index}>
              <input
                type={form.inputType}
                id={label + index}
                name={label}
                className="organize_own_selection"
                onChange={(e) => {
                  handleFieldChange(item.optionLabel, e);
                  // console.log(item,"");
                  // console.log();
                  if (!extensionData[label + index]) {
                    setExtensionData({
                      ...extensionData,
                      [label + index]: item.extension ? item.extension : [],
                    });
                  } else {
                    const updatedExtensionData = { ...extensionData };
                    delete updatedExtensionData[label + index];
                    setExtensionData(updatedExtensionData);
                  }
                }}
              />
              <label
                style={{
                  color: pageColors?.optionColor,
                }}
                htmlFor={label + index}
              >
                {item.optionLabel}
              </label>
              <span className="checkmark" />
            </li>
            {extensionData[label + index]?.length > 0 &&
              extensionData[label + index]?.map((opt, i) => (
                <FormField1
                  form={opt}
                  key={i}
                  formFieldData={formFieldData}
                  setFormFieldData={setFormFieldData}
                  formErrors={formErrors}
                  pageColors={pageColors}
                  level={form.label}
                />
              ))}
          </>
        ))}
      </ul>
    );
  } else {
    fieldInput = (
      <>
      <input
        type={form.inputType}
        className="form-control"
id={label. replace(/[A-Z]/g, m => "-" + m. toLowerCase())}        placeholder={form.placeholder}
        onChange={(e) => handleFieldChange(e.target.value)}/>
        <div className="field-icon">
          <img src={path_image + "form-mail.svg"} alt="" />
        </div>
        </>
      
    );
  }

  return (
    <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
      <label
        style={{
          color: pageColors?.labelColor,
        }}
      >
        {form.label}
        {isRequired ? "*" : ""}
      </label>
      {fieldInput}
      <div className="help-block">{formErrors[label]}</div>
    </div>
  );
};

const FormField2 = ({
  form,
  formFieldData,
  setFormFieldData,
  formErrors,
  pageColors,
  level,
  templateId,
}) => {

  const [countryList, setCountryList] = useState(CountryList);
  const [extensionData, setExtensionData] = useState({});
  const label = userData[form.label]
    ? userData[form.label]
    : form?.label?.replace(/ /g, "_");

  const handleFieldChange = (value, e = "") => {
    const newData = { ...formFieldData };

    if (form?.inputType === "datepicker") {
      newData[label] = moment(value).format("YYYY-MM-DD");
    } else if (form?.inputType === "checkbox") {
      newData[label] = Array.isArray(newData[label]) ? newData[label] : [];

      if (e.target.checked) {
        newData[label] = [...newData[label], value];
      } else {
        newData[label] = newData[label].filter((item) => item !== value);
      }
    } else {
      newData[label] = value;
    }
    setFormFieldData(newData);
  };

  if (label?.includes("country") || label?.includes("Country")) {
    form.inputType = "selection-country";
  } else if (label?.includes("state") || label?.includes("state")) {
    form.inputType = "selection-state";
  }

  const isRequired = form.required === "yes";

  let fieldInput = null;

  if (form.inputType === "textarea") {
    fieldInput = (
      <textarea
        className="form-control"
        placeholder={form.placeholder}
        cols="40"
        rows="4"
        onChange={(e) => handleFieldChange(e.target.value)}
      ></textarea>
    );
  } else if (
    form.inputType === "selection" ||
    form.inputType === "selection-country" ||
    form.inputType === "selection-state"
  ) {
    const options = form.option?.map((op) => ({
      label: op.optionLabel,
      value: op.optionLabel,
    }));

    fieldInput = (
      <Select
        options={
          form.inputType === "selection-country"
            ? countryList
            : form.inputType === "selection-state"
            ? stateOptions
            : options
        }
        className="dropdown-basic-button split-button-dropup mr-2 btn-bigger"
        isClearable
        onChange={(selectedOption) => handleFieldChange(selectedOption.value)}
      />
    );
  } else if (form.inputType === "datepicker") {
    fieldInput = (
      <DatePicker
        selected={formFieldData[label] ? new Date(formFieldData[label]) : null}
        name={form.label}
        dateFormat="dd/MM/yyyy"
        className="form-control"
        placeholderText="Select task date"
        onChange={(date) => handleFieldChange(date)}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
      />
    );
  } else if (form.inputType === "radio") {
    fieldInput = (
      <ul>
        {form.option?.map((item, index) => (
          <>
            <li key={index}>
              {/* {console.log(item,"oppppp")} */}

              <input
                type={form.inputType}
                id={label + index}
                name={label}
                className="organize_own_selection"
                onChange={() => {
                  handleFieldChange(item.optionLabel);
                  // if (item.extension) {
                  setExtensionData({
                    [item.optionLabel]: item.extension ? item.extension : [],
                  });
                  // }
                }}
              />
              <label
                style={{
                  color: pageColors?.optionColor,
                }}
                htmlFor={label + index}
              >
                {item.optionLabel}
              </label>
              <span className="checkmark" />
            </li>
            {extensionData[item.optionLabel]?.length > 0 &&
              extensionData[item.optionLabel]?.map((opt, i) => (
                <FormField2
                  form={opt}
                  key={i}
                  formFieldData={formFieldData}
                  setFormFieldData={setFormFieldData}
                  formErrors={formErrors}
                  pageColors={pageColors}
                  level={form.label}
                />
              ))}
          </>
        ))}
      </ul>
    );
  } else if (form.inputType === "checkbox") {
    fieldInput = (
      <ul>
        {form.option?.map((item, index) => (
          <>
            <li key={index}>
              {/* {console.log(item,"oppppp")} */}

              <input
                type={form.inputType}
                id={label + index}
                name={label}
                className="organize_own_selection"
                onChange={(e) => {
                  handleFieldChange(item.optionLabel, e);
                  // console.log(item,"");
                  // console.log();
                  if (!extensionData[label + index]) {
                    setExtensionData({
                      ...extensionData,
                      [label + index]: item.extension ? item.extension : [],
                    });
                  } else {
                    const updatedExtensionData = { ...extensionData };
                    delete updatedExtensionData[label + index];
                    setExtensionData(updatedExtensionData);
                  }
                }}
              />
              <label
                style={{
                  color: pageColors?.optionColor,
                }}
                htmlFor={label + index}
              >
                {item.optionLabel}
              </label>
              <span className="checkmark" />
            </li>
            {extensionData[label + index]?.length > 0 &&
              extensionData[label + index]?.map((opt, i) => (
                <FormField2
                  form={opt}
                  key={i}
                  formFieldData={formFieldData}
                  setFormFieldData={setFormFieldData}
                  formErrors={formErrors}
                  pageColors={pageColors}
                  level={form.label}
                />
              ))}
          </>
        ))}
      </ul>
    );
  } else {
    fieldInput = (
      <>
      <input
        type={form.inputType}
        className="form-control"
        id={label. replace(/[A-Z]/g, m => "-" + m. toLowerCase())} placeholder={form.label}
        onChange={(e) => handleFieldChange(e.target.value)}/>
      <div className="field-icon">
        <img src={path_image + "form-mail.svg"} alt="" />
      </div>
      </>
    );
  }
console.log(form.inputType);
  return (
    <div className={`col-sm-12 col-md-12 consent-form-list attend-sec ${label?.includes("country") || label?.includes("Country")?"country":""}`}>
      {(form.inputType !="text" && form.inputType !="email")  ?
        <label
        style={{
          color: pageColors?.labelColor,
        }}>
        {form.label}
        {isRequired ? "*" : ""}
      </label>:null
      }
      
      {fieldInput} 
      <div className="help-block">{formErrors[label]}</div>
    </div>
  );
};
const FormField3 = ({
  form,
  formFieldData,
  setFormFieldData,
  formErrors,
  pageColors,
  level,
  templateId,
}) => {
  const [countryList, setCountryList] = useState(CountryList);
  const [extensionData, setExtensionData] = useState({});
  const label = userData[form.label]
    ? userData[form.label]
    : form?.label?.replace(/ /g, "_");

  const handleFieldChange = (value, e = "") => {
    const newData = { ...formFieldData };

    if (form?.inputType === "datepicker") {
      newData[label] = moment(value).format("YYYY-MM-DD");
    } else if (form?.inputType === "checkbox") {
      newData[label] = Array.isArray(newData[label]) ? newData[label] : [];

      if (e.target.checked) {
        newData[label] = [...newData[label], value];
      } else {
        newData[label] = newData[label].filter((item) => item !== value);
      }
    } else {
      newData[label] = value;
    }
    setFormFieldData(newData);
  };

  if (label?.includes("country") || label?.includes("Country")) {
    form.inputType = "selection-country";
  } else if (label?.includes("state") || label?.includes("state")) {
    form.inputType = "selection-state";
  }

  const isRequired = form.required === "yes";

  let fieldInput = null;

  if (form.inputType === "textarea") {
    fieldInput = (
      <textarea
        className="form-control"
        placeholder={form.placeholder}
        cols="40"
        rows="4"
        onChange={(e) => handleFieldChange(e.target.value)}
      ></textarea>
    );
  } else if (
    form.inputType === "selection" ||
    form.inputType === "selection-country" ||
    form.inputType === "selection-state"
  ) {
    const options = form.option?.map((op) => ({
      label: op.optionLabel,
      value: op.optionLabel,
    }));

    fieldInput = (
      <Select
        options={
          form.inputType === "selection-country"
            ? countryList
            : form.inputType === "selection-state"
            ? stateOptions
            : options
        }
        className="dropdown-basic-button split-button-dropup mr-2 btn-bigger"
        isClearable
        onChange={(selectedOption) => handleFieldChange(selectedOption.value)}
      />
    );
  } else if (form.inputType === "datepicker") {
    fieldInput = (
      <DatePicker
        selected={formFieldData[label] ? new Date(formFieldData[label]) : null}
        name={form.label}
        dateFormat="dd/MM/yyyy"
        className="form-control"
        placeholderText="Select task date"
        onChange={(date) => handleFieldChange(date)}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
      />
    );
  } else if (form.inputType === "radio") {
    fieldInput = (
      <ul>
        {form.option?.map((item, index) => (
          <>
            <li key={index}>
              {/* {console.log(item,"oppppp")} */}

              <input
                type={form.inputType}
                id={label + index}
                name={label}
                className="organize_own_selection"
                onChange={() => {
                  handleFieldChange(item.optionLabel);
                  // if (item.extension) {
                  setExtensionData({
                    [item.optionLabel]: item.extension ? item.extension : [],
                  });
                  // }
                }}
              />
              <label
                style={{
                  color: pageColors?.optionColor,
                }}
                htmlFor={label + index}
              >
                {item.optionLabel}
              </label>
              <span className="checkmark" />
            </li>
            {extensionData[item.optionLabel]?.length > 0 &&
              extensionData[item.optionLabel]?.map((opt, i) => (
                <FormField3
                  form={opt}
                  key={i}
                  formFieldData={formFieldData}
                  setFormFieldData={setFormFieldData}
                  formErrors={formErrors}
                  pageColors={pageColors}
                  level={form.label}
                />
              ))}
          </>
        ))}
      </ul>
    );
  } else if (form.inputType === "checkbox") {
    fieldInput = (
      <ul>
        {form.option?.map((item, index) => (
          <>
            <li key={index}>
              {/* {console.log(item,"oppppp")} */}

              <input
                type={form.inputType}
                id={label + index}
                name={label}
                className="organize_own_selection"
                onChange={(e) => {
                  handleFieldChange(item.optionLabel, e);
                  // console.log(item,"");
                  // console.log();
                  if (!extensionData[label + index]) {
                    setExtensionData({
                      ...extensionData,
                      [label + index]: item.extension ? item.extension : [],
                    });
                  } else {
                    const updatedExtensionData = { ...extensionData };
                    delete updatedExtensionData[label + index];
                    setExtensionData(updatedExtensionData);
                  }
                }}
              />
              <label
                style={{
                  color: pageColors?.optionColor,
                }}
                htmlFor={label + index}
              >
                {item.optionLabel}
              </label>
              <span className="checkmark" />
            </li>
            {extensionData[label + index]?.length > 0 &&
              extensionData[label + index]?.map((opt, i) => (
                <FormField3
                  form={opt}
                  key={i}
                  formFieldData={formFieldData}
                  setFormFieldData={setFormFieldData}
                  formErrors={formErrors}
                  pageColors={pageColors}
                  level={form.label}
                />
              ))}
          </>
        ))}
      </ul>
    );
  } else {
    fieldInput = (
      <input
        type={form.inputType}
        className="form-control"
        id={label. replace(/[A-Z]/g, m => "-" + m. toLowerCase())}
        placeholder={form.placeholder}
        onChange={(e) => handleFieldChange(e.target.value)}
      />
    );
  }

  return (
    <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
      <label
        style={{
          color: pageColors?.labelColor,
        }}
      >
        {form.label}
        {isRequired ? "*" : ""}
      </label>
      {fieldInput}
      <div className="help-block">{formErrors[label]}</div>
    </div>
  );
};
