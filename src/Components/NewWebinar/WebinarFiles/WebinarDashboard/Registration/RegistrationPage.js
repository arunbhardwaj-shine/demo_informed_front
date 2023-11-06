import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import { loader } from "../../../../../loader";
import { getData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import CountryList from "./CountryList";

// import Question from "./AddQuestion";

const RegistrationPage = () => {
  const location = useLocation();
  const event_code = new URLSearchParams(location.search).get("event");
  const [formData, setFormData] = useState();
  const [formFieldData, setFormFieldData] = useState({});
  const [formErrors, setFormErrors] = useState({}); // Create a state to store form validation errors

  useEffect(() => {
    EventDataFun();
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
      console.log(hadData?.content);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = ValidateFormData();
    // console.log(formErrors);
    if (isValid) {
      console.log("Form is valid. Submitting data:", formFieldData);
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  const ValidateFormData = () => {
    const errors = {};

    formData?.content?.body?.forEach((form) => {
      const fieldValue = formFieldData[form.label];

      if (form.required=='yes' && !fieldValue) {
        errors[form.label] = `This field is required.`;
        // errors[form.label] = `This ${form.label} is required.`;
      } else {
        errors[form.label] = ``;
      }

      if (form.inputType === "email" && fieldValue) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailRegex.test(fieldValue)) {
          errors[form.label] = "Invalid email address.";
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  return (
    <>
 
        
          <Row>
            <div className="outer">
              <section className="webinarRegistrationBody">
                <div className="sec1">
                  <div className="add_hcp_boxes">
                    <>
                      <link
                        rel="stylesheet"
                        href="https://webinar.docintel.app/FVIIIrelevance2024/register/assets/css/style.css"
                      />
                      <link
                        rel="stylesheet"
                        href="https://webinar.docintel.app/FVIIIrelevance2024/register/assets/css/responsive.css"
                      />

                      <div className="wrapper">
                        <section className="factor-season">
                          <div className="container">
                            <div className="row">
                              <div className="factor-season-inner">
                                <div className="row">
                                  <div className="col-sm-8 col-md-8">
                                    <div className="factor-season-left">
                                      <img
                                        src={formData?.content?.headerImageUrl}
                                        alt="Header"
                                      />
                                      <div className="factor__logo">
                                        <img
                                          src="https://webinar.docintel.app/FVIIIrelevance2024/register/assets/images/factor-logo-europe.png"
                                          alt="Factor logo"
                                        />
                                      </div>
                                      <h2>
                                        5 February 2024
                                        <br />
                                        12:00-19:00
                                        <br />
                                        Frankfurt, Germany
                                      </h2>
                                    </div>
                                  </div>
                                  <div className="col-sm-4 col-md-4">
                                    <div className="factor-season-right">
                                      <h3>
                                        Robert F. Sidonio Jr.
                                        <br /> and Jan Astermark
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="consent-form">
                          <div className="container">
                            <div className="row">
                              <div className="consent-form-inner">
                                <form
                                  id="registration_form"
                                  onSubmit={handleSubmit}
                                >
                                  <div className="row" id="form_upper">
                                    <div className="col-sm-12 col-md-12 center-sided">
                                      <h2>{formData?.content?.pageTitle}</h2>
                                      <h3> {formData?.content?.bodyText}</h3>
                                    </div>
                                  </div>
                                  <div className="center-sided-inside">
                                    <div className="row">
                                      {formData?.content?.body?.map(
                                        (form, index) => (
                                          <FormField
                                            form={form}
                                            key={index}
                                            formFieldData={formFieldData}
                                            setFormFieldData={setFormFieldData}
                                            formErrors={formErrors}
                                          />
                                        )
                                      )}

                                      <button
                                        type="submit"
                                        className="btn btn-primary"
                                        id="submit_registration"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                    <div className="footer-sec">
                                      <span>
                                        * this consent is mandatory in order to
                                        register to the event.
                                      </span>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                      <footer>
                        <div className="container">
                          <div className="row">
                            <div className="footer-inner">
                              <div className="footer-left">
                                <img
                                  src={formData?.content?.footerImageUrl}
                                  alt="Footer"
                                />
                                <div className="footer-logo">
                                  <img
                                    src="https://webinar.docintel.app/FVIIIrelevance2024/register/assets/images/footer-logo.png"
                                    alt="footer-logo"
                                  />
                                </div>
                              </div>
                              <div className="footer-right"></div>
                              <div className="footer-copyright">
                                <span>© 2023 CP. All rights Reserved</span>
                                <ul>
                                  <li>
                                    <a
                                      target="_blank"
                                      href="https://albert.docintel.app/privacy_policy/"
                                    >
                                      Privacy Policy
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      target="_blank"
                                      href="https://albert.docintel.app/terms_of_use/"
                                    >
                                      Terms of Services
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </footer>
                      <div className="modal fade" id="myModal">
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                              >
                                ×
                              </button>
                            </div>
                            {/* Modal body */}
                            <div className="modal-body"></div>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </section>

              <div>
                {/* <button
                  className="fbutton"
                  onClick={(e) => handleFileSelect(e, "footer")}
                >
                  upload
                </button> */}

                {/* <img className="footer-img" src={foot} /> */}
              </div>
              {/* <div style={{marginTop:'35px',marginBottom:'50px'}}>  <img className="footer-img" src={foot} /></div> */}
            </div>
          </Row>
       
    </>
  );
};

export default RegistrationPage;

const FormField = ({ form, formFieldData, setFormFieldData, formErrors }) => {
  const [countryList, setCountryList] = useState(CountryList);
  console.log(form);
  const handleFieldChange = (value) => {
    // Update the formFieldData state with the new value
    setFormFieldData((prevData) => ({
      ...prevData,
      [form.label]: value,
    }));
  };

  if (form.label.toLowerCase() === "country") {
    form.inputType = "selection-country";
  }

  switch (form.inputType) {
    case "textarea":
      return (
        <div className="col-sm-12 col-md-12 consent-form-list">
          <label>
            {form.label}
            <span>{form.required=='yes' ? "*" : ""}</span>
          </label>
          <textarea
            className="form-control"
            placeholder={form.placeholder}
            cols="40"
            rows="4"
            onChange={(e) => handleFieldChange(e.target.value)}
          ></textarea>
          <div class="help-block">{formErrors[form.label]}</div>
        </div>
      );
    case "selection":
      return (
        <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
          <label>
            {form.label}
            <span>{form.required=='yes' ? "*" : ""}</span>
          </label>
          <Select
            options={form.option?.map((op) => ({
              label: op.optionLabel,
              value: op.optionLabel,
            }))}
            className="dropdown-basic-button split-button-dropup mr-2 btn-bigger"
            isClearable
            onChange={(selectedOption) => handleFieldChange(selectedOption)}
          />
          <div class="help-block">{formErrors[form.label]}</div>
        </div>
      );
    case "selection-country":
      return (
        <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
          <label style={{ textTransform: "capitalize" }}>
            {form.label}
            <span>{form.required=='yes' ? "*" : ""}</span>
          </label>
          <Select
            options={countryList}
            className="dropdown-basic-button split-button-dropup mr-2 btn-bigger"
            isClearable
            onChange={(selectedOption) =>
              handleFieldChange(selectedOption.value)
            }
          />
          <div class="help-block">{formErrors[form.label]}</div>
        </div>
      );
    case "checkbox":
      return (
        <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
          <p>
            {form.label}
            <span>{form.required=='yes' ? "*" : ""}</span>
          </p>
          {form.option?.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                id={form.label + index}
                name={form.label}
                className="organize_own_selection"
                onChange={() => handleFieldChange(item.optionLabel)}
              />
              <label htmlFor={form.label + index}>{item.optionLabel}</label>
              <span className="checkmark" />
            </li>
          ))}
          <div class="help-block">{formErrors[form.label]}</div>
        </div>
      );
    case "radio":
      return (
        <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
          <p>
            {form.label}
            <span>{form.required=='yes' ? "*" : ""}</span>
          </p>
          <ul>
            {form.option?.map((item, index) => (
              <li key={index}>
                <input
                  type="radio"
                  id={form.label + index}
                  name={form.label}
                  className="organize_own_selection"
                  onChange={() => handleFieldChange(item.optionLabel)}
                />
                <label htmlFor={form.label + index}>{item.optionLabel}</label>
                <span className="checkmark" />
              </li>
            ))}
          </ul>
          <div class="help-block">{formErrors[form.label]}</div>
        </div>
      );
    default:
      return (
        <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
          <label>
            {form.label}
            <span>{form.required=='yes' ? "*" : ""}</span>
          </label>
          <input
            type={form.type}
            className="form-control"
            id="usr"
            placeholder={form.placeholder}
            onChange={(e) => handleFieldChange(e.target.value)}
          />
          <div class="help-block">{formErrors[form.label]}</div>
        </div>
      );
  }
};
