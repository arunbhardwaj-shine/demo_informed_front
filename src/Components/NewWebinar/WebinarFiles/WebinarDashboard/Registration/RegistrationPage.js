import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Select from "react-select";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loader } from "../../../../../loader";
import { getData, postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import CountryList from "./CountryList";
import DatePicker from "react-datepicker";
import moment from "moment";
import FormField from "./FormField";
import TemplateThree from "./TemplateThree";
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

};
// import Question from "./AddQuestion";

const RegistrationPage = () => {
  const location = useLocation();
  let params = useParams();
  let navigate = useNavigate();

  let prevData = useLocation();
  prevData = prevData?.state;
  // console.log(prevData,"prevData");
  const event_code = new URLSearchParams(location.search).get("event");
  const [formData, setFormData] = useState(prevData ? prevData : {});
  const [formFieldData, setFormFieldData] = useState({});
  const [formErrors, setFormErrors] = useState({}); // Create a state to store form validation errors
  const [pageColors, setPageColors] = useState(
    prevData
      ? {
          labelColor: prevData?.content?.labelColor,
          background: prevData?.content?.backgroundColor,
        }
      : { labelColor: "#fff000", background: "#000" }
  ); // Create a state to store form validation errors

  useEffect(() => {
    if (!prevData?.content) {
      EventDataFun();
    }
  }, []);
  const EventDataFun = async () => {
    try {
      loader("show");
      const response = await getData(
        `${ENDPOINT.GET_REGISTRATION_FORM}/${event_code}`
      );
      let hadData = response?.data?.data;
      hadData = { ...hadData, content: JSON.parse(hadData?.content) };
      setFormData(hadData);
      // console.log(hadData?.content);
      setPageColors({
        labelColor: hadData?.content?.labelColor,
        background: hadData?.content?.backgroundColor,
      });
      //   setEventData({
      //     ...eventData,
      //     event_id: hadData?.event_id,
      //     company_id: hadData?.company_id,
      //   });
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formFieldData);
    const isValid = ValidateFormData();

    if (isValid) {
      loader("show");

      let response = await postData(
        "https://webinar.docintel.app/flow/apis/register",
        {...formFieldData,companyId:formData?.company_id,eventId:formData?.event_id}
      );
      console.log(response);
      loader("hide");

      console.log("Form is valid. Submitting data:", formFieldData);
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  const ValidateFormData = () => {
    // console.log(formFieldData);
    // console.log(formErrors);
    const errors = {};

    formData?.content?.body?.forEach((form) => {
      const label = userData[form.label]?userData[form.label]:form?.label?.replace(/ /g, "_");

      const fieldValue = formFieldData[label];
      // console.log(label,form);

      if (form.required == "yes" && !fieldValue) {
        errors[label] = `This field is required.`;
        // errors[label] = `This ${label} is required.`;
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
  return (
    <TemplateThree formData={formData}>
       <section className="consent-form">
                <div className="container">
                  <div
                    className="consent-form-inner"
                    style={{ background: `${pageColors?.background}` }}
                  >
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
                            * This consent is mandatory in order to register for
                            the event.
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
    </TemplateThree>
  );
};

export default RegistrationPage;


