import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loader } from "../../../../../loader";
import { getData, postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import FormField from "./FormField";
import TemplateThree from "./TemplateThree";
import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";

const userData = {
  name: "userName",
  email: "userEmail",
  country: "country",
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
  'I consent to:': "consent",
};

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [isSubmitted, setIsSubmitted] = useState(false);

  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const prevData = useLocation()?.state;
  const event_code = new URLSearchParams(location.search).get("event");

  const [formData, setFormData] = useState(prevData || {});
  const [formFieldData, setFormFieldData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [pageColors, setPageColors] = useState(
    prevData
      ? {
          labelColor: prevData?.content?.labelColor,
          background: prevData?.content?.backgroundColor,
        }
      : { labelColor: "#fff000", background: "#000" }
  );

  useEffect(() => {
    if (!prevData?.content) {
      EventDataFun();
    }

    
  }, []);

  const EventDataFun = async () => {
    try {
      loader("show");
      const response = await getData(`${ENDPOINT.GET_REGISTRATION_FORM}/${event_code}`);
      const hadData = {
        ...response?.data?.data,
        content: JSON.parse(response?.data?.data?.content),
        raw_description: JSON.parse(response?.data?.data?.raw_description),
      };
      console.log(hadData);
      setFormData(hadData);
      setPageColors({
        labelColor: hadData?.content?.labelColor,
        background: hadData?.content?.backgroundColor,
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
        let raw=formData?.raw_description
        const response = await postData("https://webinar.docintel.app/flow/apis/register", {
          ...formFieldData,
          companyId: formData?.company_id,
          eventId: formData?.event_id,
          speaker: raw?.speaker_name,
          companyEmail: raw?.speaker_email,
          virtual_or_live: raw?.meeting_type,
          websiteFolder: "new_webinar",
        });
        console.log(response);
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
      const label = userData[form.label] || form?.label?.replace(/ /g, "_");
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
const myContent=(
<>

  {prevData && (
    <button
      type="submit"
      className="btn btn-primary"
      id="submit_registration"
      onClick={handleBackClicked}
    >
      Back
    </button>
  )}
   <div className="App">
      <h2>Login</h2>
      <form onSubmit={handleSubmit1}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
<section className="consent-form">

<div className="container">

<div className="consent-form-inner" style={{ background: `${pageColors?.background}` }}>
<form id="registration_form" onSubmit={handleSubmit}>
  <div className="row" id="form_upper">
    <div className="col-sm-12 col-md-12 center-sided">
      <h2>{formData?.content?.pageTitle}</h2>
      <h3> {formData?.content?.bodyText}</h3>
    </div>
  </div>
  <div className="center-sided-inside">
    <div className="row">
      {formData?.content?.body?.map((form, index) => (
        <FormField
          form={form}
          key={index}
          formFieldData={formFieldData}
          setFormFieldData={setFormFieldData}
          formErrors={formErrors}
          pageColors={pageColors}
          level="root"
        />
      ))}
      {!prevData && (
        <button type="submit" className="btn btn-primary" id="submit_registration">
          Submit
        </button>
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
)
  return (
    <>
    <div class="loader" id="custom_loader"><div class="loader_show"><span class="loader-view"> </span></div></div>
    
    {formData?.content?.templateId === 1 &&  <TemplateOne formData={formData}>
     {myContent}
    </TemplateOne>}  
    
    {formData?.content?.templateId === 2 &&  <TemplateTwo formData={formData}>
     {myContent}
    </TemplateTwo>}  
    
    {formData?.content?.templateId ===3   && formData?.content?.templateId <=0 &&  <TemplateThree formData={formData}>ww
     {myContent}
    </TemplateThree>}

   
    
  
    
    </>
   
  );
};

export default RegistrationPage;
