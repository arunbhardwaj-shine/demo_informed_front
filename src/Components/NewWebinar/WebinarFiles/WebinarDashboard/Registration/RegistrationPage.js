import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loader } from "../../../../../loader";
import { getData, postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import TemplateThree from "./TemplateThree";
import TemplateSeven from "./TemplateSeven";
import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";
import TemplateFive from "./TemplateFive";
import TemplateSix from "./TemplateSix";
import moment from "moment";
import CountryList from "./CountryList";
import DatePicker from "react-datepicker";
import Select from "react-select";
import axios from "axios";
import TemplateFour from "./TemplateFour";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { options } from "@amcharts/amcharts4/core";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import CommonPageLinkNotFound from "../../../../CommonComponent/CommonPageLinkNotFound";

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
let icons = {
  Email: "form-mail",
  Name: "form-user",
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

const RegistrationPage = ({ prevData,type }) => {
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
        typedTextColor: prevData?.content?.typedTextColor,
        placeholderTextColor: prevData?.content?.placeholderTextColor,
        dropdownOptionColor: prevData?.content?.dropdownOptionColor,
        dropdownHoveringColor: prevData?.content?.dropdownHoveringColor,
        selectedTextColor: prevData?.content?.selectedTextColor,
        background: prevData?.content?.backgroundColor,
        optionColor: prevData?.content?.optionColor,
      }
      : {
        labelColor: "#fff000", background: "#000", optionColor: "#000",
        typedTextColor: "#000", placeholderTextColor: "#000", dropdownOptionColor: "#000", dropdownHoveringColor: "#000", selectedTextColor: "#000"
      }
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [apiCallStatus,setApiCallStatus]=useState(false)


  useEffect(() => {
    EventDataFun();
  }, [prevData?.isDataSaved]);



  const EventDataFun = async () => {
    try {
      loader("show");
      const response = await getData(
        `${ENDPOINT.GET_REGISTRATION_FORM}/${prevData?.eventCode ? prevData?.eventCode : event_code
        }`
      );      
      let hadData = {};
      if (!prevData?.content) {
        if (response?.data?.data?.content) {
          hadData = {
            ...response?.data?.data,
            content: JSON.parse(response?.data?.data?.content),
            raw_description: JSON.parse(response?.data?.data?.raw_description),
          };
        }
      } else {
        let raw = response?.data?.data?.raw_description
          ? JSON.parse(response?.data?.data?.raw_description)
          : {
            title: "",
            location: "",
            type: "",
            timezone: "",
            countryTimezone: "",
            isClientStream: 0,
            clientStreamUrl: "",
            dateStart: "",
            dateStartHour: "",
            dateStartMin: "",
            dateEndHour: "",
            dateEndMin: "",
            eventCode: "",
            description: "",
            speaker_name: "",
            speaker_email: "",
            meeting_type: "",
          };

        hadData = {
          ...response?.data?.data,
          content: JSON.parse(prevData?.content),
          raw_description: raw,
        };
      }
      
      setFormData(hadData);
      setApiCallStatus(true)
      
      setPageColors({
        labelColor: hadData?.content?.labelColor,
        typedTextColor: hadData?.content?.typedTextColor,
        placeholderTextColor: hadData?.content?.placeholderTextColor,
        dropdownOptionColor: hadData?.content?.dropdownOptionColor,
        dropdownHoveringColor: hadData?.content?.dropdownHoveringColor,
        selectedTextColor: hadData?.content?.selectedTextColor,
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
        const response = await axios.post(
          "https://webinar.docintel.app/flow/apis/register",
          {
            ...formFieldData,
            companyId: formData?.company_id,
            eventId: formData?.event_id,
            speaker: raw?.speaker_name,
            companyEmail: raw?.speaker_email,
            virtual_or_live: raw?.meeting_type,
            websiteFolder: "new_webinar",
            consent: formFieldData.consent ? formFieldData.consent.join("~") : formFieldData.onesource_consent ? formFieldData.onesource_consent.join("~") : "",
          }
        );
        if (response?.data?.status === 1) {
          setModalIsOpen(true);
        } else {
          toast.error(`${response?.data?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
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
      const label = form?.name?.replace(/ /g, "_");
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
    navigate("/webinar/registration", { state: prevData });
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
                  <h2
                    style={{
                      color: formData?.content?.eventDetails?.pageTitle?.color,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.content?.eventDetails?.pageTitle?.value,
                    }}
                  />
                  {/* {formData?.content?.eventDetails?.pageTitle?.value}</h2> */}
                  <h3
                    style={{
                      color: formData?.content?.eventDetails?.bodyText?.color,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.content?.eventDetails?.bodyText?.value,
                    }}
                  />
                  {/* {formData?.content?.eventDetails?.bodyText?.value}</h3> */}
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
      <section className="consent-form">
        <div className="container">
          <div className="consent-form-inner">
            <form id="registration_form" onSubmit={handleSubmit}>
              <div className="row" id="form_upper">
                <div className="col-sm-12 col-md-12 center-sided">
                  <h2
                    style={{
                      color: formData?.content?.eventDetails?.pageTitle?.color,
                    }}
                    dangerouslySetInnerHTML={{
                      __html:
                        formData?.content?.eventDetails?.pageTitle?.value ||
                        "These meetings are for healthcare professionals only.",
                    }}
                  />
                  {/* {formData?.content?.eventDetails?.pageTitle?.value || "These meetings are for healthcare professionals only."}</h2> */}
                  <h3
                    style={{
                      color: formData?.content?.eventDetails?.bodyText?.color,
                    }}
                  >
                    {" "}
                    {formData?.content?.bodyText}
                  </h3>
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
                  <h2
                    style={{
                      color: formData?.content?.eventDetails?.pageTitle?.color,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.content?.eventDetails?.pageTitle?.value,
                    }}
                  >
                    {/* {formData?.content?.eventDetails?.pageTitle?.value} */}
                  </h2>

                  <h3
                    style={{
                      color: formData?.content?.eventDetails?.bodyText?.color,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.content?.eventDetails?.bodyText?.value,
                    }}
                  >
                    {/* {formData?.content?.eventDetails?.bodyText?.value} */}
                  </h3>
                </div>
              </div>
              <div className="center-sided-inside">
                <div className="row">
                  {formData?.content?.body?.map((form, index) => (
                    <FormField3
                      key={`${form.label}_${index}`}
                      form={form}
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

  const myContent4 = (
    <>
      <section className="consent-form">
        <div className="container">
          <div
            // className="consent-form-inner"
            style={{ background: `${pageColors?.background}` }}
          >
            <form id="registration_form" onSubmit={handleSubmit}>
              {/* <div className="row" id="form_upper">
                <div className="col-sm-12 col-md-12 center-sided">
                  <h2 style={{
                    color: formData?.content?.eventDetails?.pageTitle?.color,

                  }}>{formData?.content?.eventDetails?.pageTitle?.value}</h2>
                  <h3  style={{
                    color: formData?.content?.eventDetails?.bodyText?.color,
                    
                  }}> {formData?.content?.eventDetails?.bodyText?.value}</h3>
                </div>
              </div> */}
              <div className="center-sided-inside">
                <div className="row">
                  {formData?.content?.body?.map((form, index) => (
                    <FormField4
                      key={`${form.label}_${index}`}
                      form={form}
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
                {/* <div className="footer-sec">
                  <span>
                    * This consent is mandatory in order to register for the
                    event.
                  </span>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );

  const myContent5 = (
    <>
      <section className="consent-form">
        <div className="container">
          <div className="consent-form-inner">
            <form id="registration_form" onSubmit={handleSubmit}>
              <div className="row" id="form_upper">
                <div className="col-sm-12 col-md-12 center-sided">
                  {/* <h2
                    style={{
                      color: formData?.content?.eventDetails?.pageTitle?.color,
                    }}
                    dangerouslySetInnerHTML={{
                      __html:
                        formData?.content?.eventDetails?.pageTitle?.value ||
                        "These meetings are for healthcare professionals only.",
                    }}
                  /> */}
                  {/* {formData?.content?.eventDetails?.pageTitle?.value || "These meetings are for healthcare professionals only."}</h2> */}
                  {/* <h3
                    style={{
                      color: formData?.content?.eventDetails?.bodyText?.color,
                    }}
                  >
                    {" "}
                    {formData?.content?.bodyText}
                  </h3> */}
                </div>
              </div>
              <div className="center-sided-inside">
                <div className="row">
                  {formData?.content?.body?.map((form, index) => (
                    <FormField5
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
                      Send
                    </button>
                  )}
                </div>
                <div className="footer-sec">
                  <span>
                  Preparation date: March 2024
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );

  const myContent6 = (
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
                  <h2
                    style={{
                      color: formData?.content?.eventDetails?.pageTitle?.color,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.content?.eventDetails?.pageTitle?.value,
                    }}
                  >
                    {/* {formData?.content?.eventDetails?.pageTitle?.value} */}
                  </h2>

                  <h3
                    style={{
                      color: formData?.content?.eventDetails?.bodyText?.color,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.content?.eventDetails?.bodyText?.value,
                    }}
                  >
                    {/* {formData?.content?.eventDetails?.bodyText?.value} */}
                  </h3>
                </div>
              </div>
              <div className="center-sided-inside">
                <div className="row">
                  {formData?.content?.body?.map((form, index) => (
                    <FormField6
                      key={`${form.label}_${index}`}
                      form={form}
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
                  {/* <span>
                    * This consent is mandatory in order to register for the
                    event.
                  </span> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );

  const myContent7 = (
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
                  <h2
                    style={{
                      color: formData?.content?.eventDetails?.pageTitle?.color,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.content?.eventDetails?.pageTitle?.value,
                    }}
                  >
                    {/* {formData?.content?.eventDetails?.pageTitle?.value} */}
                  </h2>

                  <h3
                    style={{
                      color: formData?.content?.eventDetails?.bodyText?.color,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.content?.eventDetails?.bodyText?.value,
                    }}
                  >
                    {/* {formData?.content?.eventDetails?.bodyText?.value} */}
                  </h3>
                </div>
              </div>
              <div className="center-sided-inside">
                <div className="row">
                  {formData?.content?.body?.map((form, index) => (
                    <FormField7
                      key={`${form.label}_${index}`}
                      form={form}
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
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <div className="loader" id="custom_loader">
        <div className="loader_show">
          <span className="loader-view"> </span>
        </div>
      </div>
      { type !="preview" && 
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />}
     
      {Object.keys(formData)?.length?(<>

      {formData?.content?.templateId === 1 && (
        <TemplateOne formData={formData}>{myContent1}</TemplateOne>
      )}

      {formData?.content?.templateId === 2 && (
        <TemplateTwo formData={formData}>{myContent2}</TemplateTwo>
      )}

      {formData?.content?.templateId === 5 && (
        <TemplateFive formData={formData}>{myContent5}</TemplateFive>
      )}

    {formData?.content?.templateId === 6 && (
        <TemplateSix formData={formData}>{myContent6}</TemplateSix>
      )}

      {(formData?.content?.templateId === 3 ||
        formData?.content?.templateId <= 0) && (
          <TemplateThree formData={formData}>{myContent3}</TemplateThree>
        )}

      {formData?.content?.templateId === 4 && (
        <TemplateFour formData={formData}>{myContent4}</TemplateFour>
      )}

{formData?.content?.templateId === 7 && (
        <TemplateSeven formData={formData}>{myContent7}</TemplateSeven>
      )}
</>)

:apiCallStatus?
<CommonPageLinkNotFound/>
:""
}

      <Modal
        className="modal send-confirm registration-popup"
        show={modalIsOpen}
        centered
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {window.location.reload();setModalIsOpen(false)}}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <>

            <h4 dangerouslySetInnerHTML={{
              __html:
                formData?.content?.eventDetails?.Message?.value ? formData.content.eventDetails.Message.value : "Thank you for registering!"
            }} />


            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-bordered"
                onClick={() => {
                  window.location.reload();
                  setModalIsOpen(false);
                }}
              >
                Okay
              </button>
            </div>
          </>
        </Modal.Body>
      </Modal>
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
  const label = form?.name?.replace(/ /g, "_");

  useEffect(()=>{
    // const placeholderElements = document.querySelectorAll("#registration_form > div  .css-1jqq78o-placeholder");
  
    // placeholderElements.forEach((placeholderElement) => {
    //   placeholderElement.style.color = pageColors?.placeholderTextColor || "defaultColor";
    // });
    },[form])

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
        style={{
          color: pageColors?.typedTextColor,
        }}
        data-placeholder-color={pageColors?.placeholderTextColor}
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
        placeholder={form.placeholder ? form.placeholder : "Select"}
        className="dropdown-basic-button split-button-dropup mr-2 btn-bigger"
        isClearable
        onChange={(selectedOption) => handleFieldChange(selectedOption?.value)}
        data-placeholder-color={pageColors?.placeholderTextColor}
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
          id={label.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}
          placeholder={form.placeholder}
          onChange={(e) => handleFieldChange(e.target.value)}
          style={{
            color: pageColors?.typedTextColor,
          }}
          data-placeholder-color={pageColors?.placeholderTextColor}
        />
        <div className="field-icon">
          <img src={`${path_image}${icons[form.label]}.svg`} alt="" />
        </div>
      </>
    );
  }
  return (
    <div
      className="col-sm-12 col-md-12 consent-form-list attend-sec"
      style={{ marginBottom: `${form?.addSpace ? form?.addSpace : 10}px` }}
    >
      {form.inputType != "text" && form.inputType != "email" ? (
        <label
          style={{
            color: pageColors?.labelColor,
          }}
        >
          {form.label}
          {isRequired ? "" : ""}
        </label>
      ) : null}
      {fieldInput}
      <div className="help-block">{formErrors[label]}</div>
      <style>
      {`
        #registration_form > div .form-control::placeholder {
          color: ${pageColors?.placeholderTextColor};
        }
        
      `}
    </style>
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
  // { console.log(form, 'form') }
  const [countryList, setCountryList] = useState(CountryList);
  const [extensionData, setExtensionData] = useState({});
  const label = form?.name?.replace(/ /g, "_");
  useEffect(() => {
    // const placeholderElements = document.querySelectorAll("#registration_form > div  .css-1jqq78o-placeholder");

    // placeholderElements.forEach((placeholderElement) => {
    //   placeholderElement.style.color = pageColors?.placeholderTextColor || "defaultColor";
    // });
  }, [form])
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
        style={{
          color: pageColors?.typedTextColor,
        }}
        data-placeholder-color={pageColors?.placeholderTextColor}
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
        onChange={(selectedOption) => handleFieldChange(selectedOption?.value)}
        placeholder={form.placeholder ? form.placeholder : "Select"}
        data-placeholder-color={pageColors?.placeholderTextColor}
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
              <input
                type={form.inputType}
                id={label + index}
                name={label}
                className="organize_own_selection"
                onChange={(e) => {
                  handleFieldChange(item.optionLabel, e);
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
  }
  else if (form.label === "Dietary restrictions or allergies:" && form.inputType === "text") {
    fieldInput = (

      <input
        type={form.inputType}
        className="form-control"
        id={label.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}
        placeholder={form.placeholder}
        onChange={(e) => handleFieldChange(e.target.value)}
        style={{
          color: pageColors?.typedTextColor,
        }}
        data-placeholder-color={pageColors?.placeholderTextColor}
      />

    );
  }
  else {
    fieldInput = (
      <>
        <input
          type={form.inputType}
          className="form-control"
          id={label.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}
          placeholder={form.placeholder}
          onChange={(e) => handleFieldChange(e.target.value)}
          style={{
            color: pageColors?.typedTextColor,
          }}
          data-placeholder-color={pageColors?.placeholderTextColor}
        />
        <div className="field-icon">
          <img src={`${path_image}${icons[form.label]}.svg`} alt="" />
        </div>
      </>
    );
  }

  return (
    <div
      // className={`col-sm-12 col-md-12 consent-form-list attend-sec ${label?.includes("country") || label?.includes("Country")
      //   ? "country"
      //   : ""
      //   }`}
      className={`col-sm-12 col-md-12 consent-form-list attend-sec ${(label?.includes("country") || label?.includes("Country")) ? "country" : ""
        }  ${(label?.includes("restrictions")) ? "restrictions" : ""
        } ${(label?.includes("name") || label?.includes("Name") || label?.includes("email") || label?.includes("Email")) ? "static" : ""
        }`}

      style={{ marginBottom: `${form?.addSpace ? form?.addSpace : 10}px` }}
    >
      {form.label != "Name" && form.inputType != "email" ? (
        <label
          style={{
            color: pageColors?.labelColor,
          }}
        >
          {form.label}
          {
            // isRequired ? "*" : ""
          }
        </label>
      ) : null}

      {fieldInput}
      <div className="help-block">{formErrors[label]}</div>
      <style>
        {`
        #registration_form > div .form-control::placeholder {
          color: ${pageColors?.placeholderTextColor};
        }
       
      `}
      </style>
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
  const label = form?.name?.replace(/ /g, "_");

  useEffect(()=>{
    const placeholderElements = document.querySelectorAll("#registration_form > div  .css-1jqq78o-placeholder");
  
    placeholderElements.forEach((placeholderElement) => {
      placeholderElement.style.color = pageColors?.placeholderTextColor || "defaultColor";
    });
    },[form])

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
        style={{
          color: pageColors?.typedTextColor,
        }}
        data-placeholder-color={pageColors?.placeholderTextColor}
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
        placeholder={form.placeholder ? form.placeholder : "Select"}
        data-placeholder-color={pageColors?.placeholderTextColor}
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
              <input
                type={form.inputType}
                id={label + index}
                name={label}
                className="organize_own_selection"
                onChange={(e) => {
                  handleFieldChange(item.optionLabel, e);

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
        id={label.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}
        placeholder={form.placeholder}
        onChange={(e) => handleFieldChange(e.target.value)}
        style={{
          color: pageColors?.typedTextColor,
        }}
        data-placeholder-color={pageColors?.placeholderTextColor}
      />  
    );
  }

  return (
    <div
      className="col-sm-12 col-md-12 consent-form-list attend-sec"
      style={{ marginBottom: `${form?.addSpace ? form?.addSpace : 10}px` }}
    >
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
      <style>
      {`
        #registration_form > div .form-control::placeholder {
          color: ${pageColors?.placeholderTextColor};
        }
        
      `}
    </style>
    </div>
  );
};

const FormField4 = ({
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
  const label = form?.name?.replace(/ /g, "_");
  const isConsentField = form?.label?.toLowerCase().includes("consent");
  const consentFieldClass = isConsentField ? "consent-feild" : "";

  useEffect(()=>{
  const placeholderElements = document.querySelectorAll("#registration_form > div  .css-1jqq78o-placeholder");

  placeholderElements.forEach((placeholderElement) => {
    placeholderElement.style.color = pageColors?.placeholderTextColor || "defaultColor";
  });
  },[form])

  const handleFieldChange = (value, e = "") => {
   
    const newData = { ...formFieldData };

    if (form?.inputType === "datepicker") {
      newData[label] = moment(value).format("YYYY-MM-DD");
    } else if (form?.inputType === "checkbox") {
      newData[label] = Array.isArray(newData[label]) ? newData[label] : [];
      if (e.target.checked) {
        if (label == "onesource_consent") {
          let options = form?.option;

          const checkboxes = document.querySelectorAll(
            `input[name="${label}"]`
          );
          // console.dir(checkboxes,'checkboxes');
          // console.log(e ,'checkboxes');

          if (e.target.id == "onesource_consent0") {
            checkboxes[0].checked = true;
            checkboxes[2].checked = checkboxes[1].checked ? true : false;
            checkboxes[3].checked = false;

            newData[label] = [];
            newData[label] = [options[0?.optionLabel]];
            if (checkboxes[1].checked) {
              newData[label] = [...newData[label], options[1]?.optionLabel];
              newData[label] = [...newData[label], options[2]?.optionLabel];
            }
          } else if (e.target.id == "onesource_consent1") {
            checkboxes[1].checked = true;
            newData[label] = [];
            newData[label] = [options[1]?.optionLabel];
            if (checkboxes[0].checked) {
              newData[label] = [...newData[label], options[0]?.optionLabel];
              newData[label] = [...newData[label], options[2]?.optionLabel];
            }
            checkboxes[2].checked = checkboxes[0].checked ? true : false;
            checkboxes[3].checked = false;
          } else if (e.target.id == "onesource_consent2") {
            checkboxes[0].checked = true;
            checkboxes[1].checked = true;
            checkboxes[2].checked = true;
            checkboxes[3].checked = false;
            newData[label] = [];
            newData[label] = [...newData[label], options[0]?.optionLabel];
            newData[label] = [...newData[label], options[1]?.optionLabel];
            newData[label] = [...newData[label], options[2]?.optionLabel];
          } else if (e.target.id == "onesource_consent3") {
            checkboxes[0].checked = false;
            checkboxes[1].checked = false;
            checkboxes[2].checked = false;
            checkboxes[3].checked = true;
            newData[label] = [options[3]?.optionLabel];
          }

          // checkbox.checked = !checkbox.checked;
        } else {
          newData[label] = [...newData[label], value];
        }
      } else {
        if (label == "onesource_consent") {

          let options = form?.option;

          const checkboxes = document.querySelectorAll(`input[name="${label}"]`);
          // console.dir(checkboxes,'checkboxes');
          // console.log(e ,'checkboxes');
          for (const checkbox of checkboxes) {
            if (e.target.id == "onesource_consent0") {
              checkboxes[0].checked = false;
              // checkboxes[1].checked = false;
              checkboxes[2].checked = false;
              checkboxes[3].checked = false;
              newData[label] = [];
              if (checkboxes[1].checked) {
                newData[label] = [options[1]?.optionLabel];
              }


            } else if (e.target.id == "onesource_consent1") {
              // checkboxes[0].checked = false;
              checkboxes[1].checked = false;
              checkboxes[2].checked = false;
              checkboxes[3].checked = false;
              newData[label] = [];
              newData[label] = [];
              if (checkboxes[0].checked) {
                newData[label] = [options[0]?.optionLabel];
              }


            } else if (e.target.id == "onesource_consent2") {
              checkboxes[0].checked = false;
              checkboxes[1].checked = false;
              checkboxes[2].checked = false;
              checkboxes[3].checked = false;
              newData[label] = [];
            } else if (e.target.id == "onesource_consent3") {
              checkboxes[0].checked = false;
              checkboxes[1].checked = false;
              checkboxes[2].checked = false;
              checkboxes[3].checked = false;
              newData[label] = [];

              newData[label] = [];
            }
          }
        }
        else {

          newData[label] = newData[label].filter((item) => item !== value);
        }
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
        style={{
          color: pageColors?.typedTextColor,
        }}
        data-placeholder-color={pageColors?.placeholderTextColor}
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
      data-placeholder-color={pageColors?.placeholderTextColor}

        options={
          form.inputType === "selection-country"
            ? countryList
            : form.inputType === "selection-state"
              ? stateOptions
              : options
        }
        className="dropdown-basic-button split-button-dropup mr-2 btn-bigger"
        isClearable
        onChange={(selectedOption) => handleFieldChange(selectedOption?.value)}
        placeholder={form.placeholder ? form.placeholder : "Select"}
        style={{
          color: pageColors?.dropdownOptionColor,
        }}
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
                <FormField4
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
                <FormField4
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
        id={label.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}
        placeholder={form.placeholder}
        onChange={(e) => handleFieldChange(e.target.value)}
        style={{
          color: pageColors?.typedTextColor,
        }}
        data-placeholder-color={pageColors?.placeholderTextColor}
      />
      </>
    );
  }

  return (
    <div
      className={`col-sm-12 col-md-12 consent-form-list attend-sec ${consentFieldClass}`}
      style={{ marginBottom: `${form?.addSpace ? form?.addSpace : 10}px` }}
    >
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
      <style>
      {`
        #registration_form > div .form-control::placeholder {
          color: ${pageColors?.placeholderTextColor};
        }
        
      `}
    </style>
    </div>
  );
};

const FormField5 = ({
  form,
  formFieldData,
  setFormFieldData,
  formErrors,
  pageColors,
  level,
  templateId,
}) => {
  { console.log(form, 'form') }
  const [countryList, setCountryList] = useState(CountryList);
  const [extensionData, setExtensionData] = useState({});
  const label = form?.name?.replace(/ /g, "_");
  useEffect(() => {
    // const placeholderElements = document.querySelectorAll("#registration_form > div  .css-1jqq78o-placeholder");

    // placeholderElements.forEach((placeholderElement) => {
    //   placeholderElement.style.color = pageColors?.placeholderTextColor || "defaultColor";
    // });
  }, [form])
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
        style={{
          color: pageColors?.typedTextColor,
        }}
        data-placeholder-color={pageColors?.placeholderTextColor}
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
        onChange={(selectedOption) => handleFieldChange(selectedOption?.value)}
        placeholder={form.placeholder ? form.placeholder : "Select"}
        data-placeholder-color={pageColors?.placeholderTextColor}
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
                <FormField5
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
                <FormField5
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
  }

  else {
    fieldInput = (
      <>
        <input
          type={form.inputType}
          className="form-control"
          id={label.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}
          placeholder={form.placeholder}
          onChange={(e) => handleFieldChange(e.target.value)}
          style={{
            color: pageColors?.typedTextColor,
          }}
          data-placeholder-color={pageColors?.placeholderTextColor}
        />
        <div className="field-icon">
          <img src={`${path_image}${icons[form.label]}.svg`} alt="" />
        </div>
      </>
    );
  }

  return (
    <div
      // className={`col-sm-12 col-md-12 consent-form-list attend-sec ${label?.includes("country") || label?.includes("Country")
      //   ? "country"
      //   : ""
      //   }`}
      className={`col-sm-12 col-md-12 consent-form-list attend-sec ${(label?.includes("country") || label?.includes("Country")) ? "country" : ""
        }  ${(label?.includes("restrictions")) ? "restrictions" : ""
        } ${(label?.includes("name") || label?.includes("Name") || label?.includes("email") || label?.includes("Email")) ? "static" : ""
        }`}

      style={{ marginBottom: `${form?.addSpace ? form?.addSpace : 10}px` }}
    >
      {form.label != "Name" && form.inputType != "email" ? (
        <label
          style={{
            color: pageColors?.labelColor,
          }}
        >
          {form.label}
          {
            // isRequired ? "*" : ""
          }
        </label>
      ) : null}

      {fieldInput}
      <div className="help-block">{formErrors[label]}</div>
      <style>
        {`
        #registration_form > div .form-control::placeholder {
          color: ${pageColors?.placeholderTextColor};
        }
       
      `}
      </style>
    </div>
  );
};

const FormField6 = ({
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
  const label = form?.name?.replace(/ /g, "_");

  useEffect(()=>{
    const placeholderElements = document.querySelectorAll("#registration_form > div  .css-1jqq78o-placeholder");
  
    placeholderElements.forEach((placeholderElement) => {
      placeholderElement.style.color = pageColors?.placeholderTextColor || "defaultColor";
    });
    },[form])

  // const handleFieldChange = (value, e = "") => {
  //   const newData = { ...formFieldData };

  //   if (form?.inputType === "datepicker") {
  //     newData[label] = moment(value).format("YYYY-MM-DD");
  //   } else if (form?.inputType === "checkbox") {
  //     newData[label] = Array.isArray(newData[label]) ? newData[label] : [];

  //     if (e.target.checked) {
  //       newData[label] = [...newData[label], value];
  //     } else {
  //       newData[label] = newData[label].filter((item) => item !== value);
  //     }
  //   } else {
  //     newData[label] = value;
  //   }
  //   setFormFieldData(newData);
  // };

  const handleFieldChange = (value, e = "") => {
   
    const newData = { ...formFieldData };
    if (form?.inputType === "datepicker") {
      newData[label] = moment(value).format("YYYY-MM-DD");
    } 


    // else if (form?.inputType === "checkbox") {
    //   newData[label] = Array.isArray(newData[label]) ? newData[label] : [];
    //   if (e.target.checked) {
    //     if (label == "isth_consent") {
    //       let options = form?.option;
 
    //       const checkboxes = document.querySelectorAll(
    //         `input[name="${label}"]`
    //       );
 
    //       if (e.target.id == "isth_consent2") {
    //         checkboxes[2].checked = true;
    //         checkboxes[0].checked = checkboxes[1].checked ? true : false;
 
    //         newData[label] = [];
    //         newData[label] = [options[2]?.key];
    //         if (checkboxes[1].checked) {
    //           // newData[label] = [...newData[label], options[1]?.key];
    //           newData[label] = [...newData[label], options[0]?.key];
             
    //         }
    //       } else if (e.target.id == "isth_consent1") {
    //         checkboxes[1].checked = true;
    //         checkboxes[0].checked = checkboxes[2].checked ? true : false;
 
    //         newData[label] = [];
    //         newData[label] = [options[1]?.key];
    //         if (checkboxes[0].checked) {
    //           newData[label] = [...newData[label], options[0]?.key];
    //           // newData[label] = [...newData[label], options[2]?.key];
              
    //         }
    //         } else if (e.target.id == "isth_consent0") {
    //         checkboxes[0].checked = true;
    //         checkboxes[1].checked = true;
    //         checkboxes[2].checked = true;
    //         newData[label] = [];
    //         newData[label] = [...newData[label], options[0]?.key];
    //         // newData[label] = [...newData[label], options[1]?.key];
    //         // newData[label] = [...newData[label], options[2]?.key];
    //       }
    //     } else {
    //       newData[label] = [...newData[label], value];
    //     }
    //   } else {
    //     if (label == "isth_consent") {
    //       let options = form?.option;
    //       const checkboxes = document.querySelectorAll(`input[name="${label}"]`);
    //       for (const checkbox of checkboxes) {
    //       if (e.target.id == "isth_consent2") {
    //           checkboxes[2].checked = false;
    //           checkboxes[0].checked = false;
    //           // newData[label] = [];
    //           if (checkboxes[1].checked) {
    //             newData[label] = [options[1]?.key];
    //           }
 
    //       } else if (e.target.id == "isth_consent1") {
    //           checkboxes[1].checked = false;
    //           checkboxes[0].checked = false;
    //           // newData[label] = [];
    //           // newData[label] = [];
    //           if (checkboxes[2].checked) {
    //             newData[label] = [options[2]?.key];
    //           }

    //         } else if (e.target.id == "isth_consent0") {
    //           checkboxes[0].checked = false;
    //           checkboxes[1].checked = false;
    //           checkboxes[2].checked = false;
    //           newData[label] = [];
    //         }
    //       }
    //     }
    //     else {
 
    //       newData[label] = newData[label].filter((item) => item !== value);
    //     }
    //   }
    // } 

    else if (form?.inputType === "checkbox") {
      if (e.target.checked) {
        if (label == "isth_consent") {
          let options = form?.option;
          const checkboxes = document.querySelectorAll(`input[name="${label}"]`);
    
          if (e.target.id == "isth_consent2") {
            checkboxes[2].checked = true;
            checkboxes[0].checked = checkboxes[1].checked ? true : false;
    
            newData[label] = options[2]?.key;
            if (checkboxes[1].checked) {
              newData[label] += ', ' + options[0]?.key;
            }
          } else if (e.target.id == "isth_consent1") {
            checkboxes[1].checked = true;
            checkboxes[0].checked = checkboxes[2].checked ? true : false;
    
            newData[label] = options[1]?.key;
            if (checkboxes[0].checked) {
              newData[label] += ', ' + options[0]?.key;
            }
          } else if (e.target.id == "isth_consent0") {
            checkboxes[0].checked = true;
            checkboxes[1].checked = true;
            checkboxes[2].checked = true;
            newData[label] = options[0]?.key;
          }
        } else {
          newData[label] = [...newData[label], value];
        }
      } else {
        if (label == "isth_consent") {
          let options = form?.option;
          const checkboxes = document.querySelectorAll(`input[name="${label}"]`);
    
          if (e.target.id == "isth_consent2") {
            checkboxes[2].checked = false;
            checkboxes[0].checked = false;
    
            if (checkboxes[1].checked) {
              newData[label] = options[1]?.key;
            }
          } else if (e.target.id == "isth_consent1") {
            checkboxes[1].checked = false;
            checkboxes[0].checked = false;
    
            if (checkboxes[2].checked) {
              newData[label] = options[2]?.key;
            }
          } else if (e.target.id == "isth_consent0") {
            checkboxes[0].checked = false;
            checkboxes[1].checked = false;
            checkboxes[2].checked = false;
            newData[label] = '';
          }
        } else {
          newData[label] = newData[label].filter((item) => item !== value);
        }
      }
    }
    


     else {
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
        style={{
          color: pageColors?.typedTextColor,
        }}
        data-placeholder-color={pageColors?.placeholderTextColor}
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
        placeholder={form.placeholder ? form.placeholder : "Select"}
        data-placeholder-color={pageColors?.placeholderTextColor}
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
                <FormField6
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
  } 

  // else if (form.inputType === "checkbox") {
  //   fieldInput = (
  //     <ul>
  //       {form.option?.map((item, index) => (
  //         <>
  //           <li key={index}>
  //             <input
  //               type={form.inputType}
  //               id={label + index}
  //               name={label}
  //               className="organize_own_selection"
  //               onChange={(e) => {
  //                 handleFieldChange(item.optionLabel, e);

  //                 if (!extensionData[label + index]) {
  //                   setExtensionData({
  //                     ...extensionData,
  //                     [label + index]: item.extension ? item.extension : [],
  //                   });
  //                 } else {
  //                   const updatedExtensionData = { ...extensionData };
  //                   delete updatedExtensionData[label + index];
  //                   setExtensionData(updatedExtensionData);
  //                 }
  //               }}
  //             />
  //             <label
  //               style={{
  //                 color: pageColors?.optionColor,
  //               }}
  //               htmlFor={label + index}
  //             >
  //               {item.optionLabel}
  //             </label>
  //             <span className="checkmark" />
  //           </li>
  //           {extensionData[label + index]?.length > 0 &&
  //             extensionData[label + index]?.map((opt, i) => (
  //               <FormField6
  //                 form={opt}
  //                 key={i}
  //                 formFieldData={formFieldData}
  //                 setFormFieldData={setFormFieldData}
  //                 formErrors={formErrors}
  //                 pageColors={pageColors}
  //                 level={form.label}
  //               />
  //             ))}
  //         </>
  //       ))}
  //     </ul>
  //   );
  // }


  else if (form.inputType === "checkbox") {
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
                <FormField6
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
  }

   else {
    fieldInput = (
      <input
        type={form.inputType}
        className="form-control"
        id={label.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}
        placeholder={form.placeholder}
        onChange={(e) => handleFieldChange(e.target.value)}
        style={{
          color: pageColors?.typedTextColor,
        }}
        data-placeholder-color={pageColors?.placeholderTextColor}
      />  
    );
  }
// console.log(label,'label')
  return (
    <div
      // className="col-sm-12 col-md-12 consent-form-list attend-sec"
      className={`${(label?.includes("consent") ? `col-sm-12 col-md-12 consent-form-list attend-sec` : "col-sm-6 col-md-6 consent-form-list attend-sec"
   ) }
        `}
      style={{ marginBottom: `${form?.addSpace ? form?.addSpace : 10}px` }}
    >
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
      <style>
      {`
        #registration_form > div .form-control::placeholder {
          color: ${pageColors?.placeholderTextColor};
        }
        
      `}
    </style>
    </div>
  );
};

const FormField7 = ({
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
  const label = form?.name?.replace(/ /g, "_");

  useEffect(()=>{
    const placeholderElements = document.querySelectorAll("#registration_form > div  .css-1jqq78o-placeholder");
  
    placeholderElements.forEach((placeholderElement) => {
      placeholderElement.style.color = pageColors?.placeholderTextColor || "defaultColor";
    });
    },[form])

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
        style={{
          color: pageColors?.typedTextColor,
        }}
        data-placeholder-color={pageColors?.placeholderTextColor}
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
        placeholder={form.placeholder ? form.placeholder : "Select"}
        data-placeholder-color={pageColors?.placeholderTextColor}
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
                <FormField7
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
                <FormField7
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
        id={label.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}
        placeholder={form.placeholder}
        onChange={(e) => handleFieldChange(e.target.value)}
        style={{
          color: pageColors?.typedTextColor,
        }}
        data-placeholder-color={pageColors?.placeholderTextColor}
      />  
    );
  }

  return (
    <div
      className="col-sm-12 col-md-12 consent-form-list attend-sec"
      style={{ marginBottom: `${form?.addSpace ? form?.addSpace : 10}px` }}
    >
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
      <style>
      {`
        #registration_form > div .form-control::placeholder {
          color: ${pageColors?.placeholderTextColor};
        }
        
      `}
    </style>
    </div>
  );
};