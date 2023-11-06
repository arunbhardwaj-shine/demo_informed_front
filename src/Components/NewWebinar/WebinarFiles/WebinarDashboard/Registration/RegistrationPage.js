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
  };
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
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
                                <img
                                  src={formData?.content?.headerImageUrl}
                                  alt="No image"
                                />
                                <div className="row">
                                  <div className="col-sm-8 col-md-8">
                                    <div className="factor-season-left">
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
                                          <FormField form={form} key={index} />
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
                              <img
                                src={formData?.content?.footerImageUrl}
                                alt="No image"
                              />
                              <div className="footer-left">
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
        </div>
      </Col>
    </>
  );
};

export default RegistrationPage;

const FormField = ({ form }) => {
  const [countryList, setCountryList] = useState(CountryList);
  if (form.label.toLowerCase() == "country") {
    form.inputType = "selection-country";
  }
  switch (form.inputType) {
    case "textarea":
      return (
        <>
          <div className="col-sm-12 col-md-12 consent-form-list">
            <label>{form.label}</label>
            <textarea
              className="form-control"
              placeholder={form.placeholder}
              cols="40"
              rows="4"
            ></textarea>
          </div>
        </>
      );
    case "selection":
      return (
        <>
          <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
            <label>{form.label}</label>
            <Select
              options={form.option?.map((op) => ({
                label: op.optionLabel,
                value: op.optionLabel,
              }))}
              className="dropdown-basic-button split-button-dropup mr-2 btn-bigger"
              isClearable
            />
          </div>
        </>
      );
    case "selection-country":
      return (
        <>
          <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
            <label>{form.label}</label>
            <Select
              options={countryList}
              className="dropdown-basic-button split-button-dropup mr-2 btn-bigger"
              isClearable
            />
          </div>
        </>
      );
    case "checkbox":
      return (
        <>
          <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
            <p>{form.label}</p>
            {form.option?.map((item, index) => (
              <li>
                <input
                  type={form.inputType}
                  id={form.label + index}
                  name={form.label}
                  className="organize_own_selection"
                />
                <label htmlFor="organize-own">{item.optionLabel}</label>
                <span className="checkmark" />
              </li>
            ))}
          </div>
        </>
      );
    case "radio":
      return (
        <>
          <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
            <p>{form.label}</p>
            <ul>
              {form.option?.map((item, index) => (
                <li>
                  <input
                    type={form.inputType}
                    id={form.label + index}
                    name={form.label}
                    className="organize_own_selection"
                  />
                  <label htmlFor="organize-own">{item.optionLabel}</label>
                  <span className="checkmark" />
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    default:
      return (
        <>
          <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
            <label>{form.label}</label>
            <input
              type={form.type}
              className="form-control"
              id="usr"
              placeholder={form.placeholder}
            />
          </div>
        </>
      );
  }
};
