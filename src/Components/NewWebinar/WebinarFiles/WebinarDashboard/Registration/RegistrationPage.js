import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import CommonAddQuestionModal from "./CommonAddQuestionModal";
import { toast } from "react-toastify";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import { loader } from "../../../../../loader";
import { getData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
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
                                <form id="registration_form">
                                  <div className="row" id="form_upper">
                                    <div className="col-sm-12 col-md-12 center-sided">
                                      <h2>{formData?.content?.pageTitle}</h2>
                                      <h3> {formData?.content?.bodyText}</h3>
                                    </div>
                                    {/*     <div class="col-sm-4 col-md-4 right-sided">
       <a href="#">Change</a>
      </div> */}
                                  </div>
                                  <div className="center-sided-inside">
                                    <div className="row">
                                      {formData?.content?.body?.map(
                                        (form, index) => (
                                          <div
                                            className="col-sm-12 col-md-12 consent-form-list"
                                            key={index}
                                          >
                                            <label>{form.label}</label>
                                            <input
                                              type={form.label}
                                              className="form-control"
                                              id="usr"
                                              placeholder={form.placeholder}
                                            />
                                          </div>
                                        )
                                      )}
                                      {/* <div className="col-sm-12 col-md-12 consent-form-list">
                                        <label>Name</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="usr"
                                          placeholder="Type Your Name"
                                        />
                                      </div> */}
                                      {/* <div className="col-sm-12 col-md-12 consent-form-list">
                                        <label>Email</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="email"
                                          placeholder="Type Your Email"
                                          name="email"
                                        />
                                      </div>
                                      <div className="col-sm-12 col-md-12 consent-form-list">
                                        <label>Your Country</label>
                                        <input
                                          type="hidden"
                                          name="country"
                                          defaultValue="America"
                                          id="hid_country"
                                        />
                                        <div className="btn-group state-dropdown custom-select-menu">
                                          <label
                                            className="dropdown-toggle dropdown-label"
                                            data-language-label=""
                                          >
                                            <span className="text">
                                              Select Your Country
                                            </span>
                                          </label>
                                          <div
                                            className="dropdown-menu custom-dropdown-menu state-menu"
                                            id="select_state"
                                            style={{ display: "none" }}
                                          >
                                            <div className="dropdown-menu-item">
                                              <a
                                                className="dropdown-item"
                                                data-value="USA"
                                              >
                                                <span className="text">
                                                  United States
                                                </span>
                                              </a>
                                            </div>
                                          </div>
                                          <input
                                            type="hidden"
                                            data-rule-required="true"
                                            name="state"
                                            id="hidden_state"
                                            defaultValue=""
                                          />
                                        </div>
                                      </div>
                                      <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
                                        <p>I will attend:</p>
                                        <ul>
                                          <li>
                                            <input
                                              type="radio"
                                              id="test1"
                                              name="radio_group"
                                              className="radio_group"
                                              defaultValue={1}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="test1"
                                            >
                                              Both Factor VIII Relevance Academy
                                              and EAHAD congress
                                            </label>
                                            <span className="checkmark" />
                                          </li>
                                          <li>
                                            <input
                                              type="radio"
                                              id="test2"
                                              name="radio_group"
                                              className="radio_group"
                                              defaultValue={2}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="test2"
                                            >
                                              Factor VIII Relevance Academy only
                                            </label>
                                            <span className="checkmark" />
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
                                        <p>
                                          I will join the Factor VIII Relevance
                                          Academy dinner (5
                                          <sup>th</sup> Feb) :
                                        </p>
                                        <ul>
                                          <li>
                                            <input
                                              type="radio"
                                              id="join_dinner1"
                                              name="radio_group2"
                                              className="radio_group"
                                              defaultValue={1}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="join_dinner1"
                                            >
                                              Yes
                                            </label>
                                            <span className="checkmark" />
                                            <div className="form">
                                              <div className="form-group">
                                                <input
                                                  className="form-control dietary"
                                                  id="dietary"
                                                  type="text"
                                                  placeholder="In case you have any dietary restrictions or allergies please specify here"
                                                  name="dietary"
                                                  defaultValue=""
                                                />
                                              </div>
                                            </div>
                                          </li>
                                          <li>
                                            <input
                                              type="radio"
                                              id="join_dinner2"
                                              name="radio_group2"
                                              className="radio_group"
                                              defaultValue={2}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="join_dinner2"
                                            >
                                              No
                                            </label>
                                            <span className="checkmark" />
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="col-sm-12 col-md-12 consent-form-list attend-sec additional-options">
                                        <p>I would like to:</p>
                                        <ul>
                                          <li>
                                            <input
                                              type="radio"
                                              id="organize-own"
                                              name="organize_own"
                                              className="organize_own_selection"
                                              defaultValue={1}
                                            />
                                            <label htmlFor="organize-own">
                                              Organize my own accomodation
                                            </label>
                                            <span className="checkmark" />
                                          </li>
                                          <li>
                                            <input
                                              type="radio"
                                              id="travel-arrangement"
                                              name="organize_own"
                                              className="organize_own_selection"
                                              defaultValue={2}
                                            />
                                            <label htmlFor="travel-arrangement">
                                              Have my accommodation organized
                                              for 1 night on the 4<sup>th</sup>{" "}
                                              of Feb
                                            </label>
                                            <span className="checkmark" />
                                          </li>
                                          <li>
                                            <input
                                              type="radio"
                                              id="travel-arranged"
                                              name="organize_own"
                                              className="organize_own_selection"
                                              defaultValue={4}
                                            />
                                            <label htmlFor="travel-arranged">
                                              Have my accommodation organized
                                              for 1 night only on the 5
                                              <sup>th</sup> of Feb
                                            </label>
                                            <span className="checkmark" />
                                          </li>
                                          <li>
                                            <input
                                              type="radio"
                                              id="accommodation-arranged"
                                              name="organize_own"
                                              className="organize_own_selection"
                                              defaultValue={3}
                                            />
                                            <label htmlFor="accommodation-arranged">
                                              Have my accommodation organized
                                              for 2 nights (4
                                              <sup>th</sup> and 5<sup>th</sup>{" "}
                                              Feb)
                                            </label>
                                            <span className="checkmark" />
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="col-sm-12 col-md-12 consent-form-list attend-sec being_connected">
                                        <p>I consent to:</p>
                                        <ul>
                                          <li className="mandatory_col">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              name="being_connected"
                                              id="being_connected"
                                              defaultValue="Being contacted by FVIII Academy"
                                            />
                                            <label htmlFor="being_connected">
                                              Being contacted by FVIII Academy
                                              organizing team for the purpose of
                                              this meeting<span>*</span>
                                            </label>
                                            <span className="checkmark" />
                                          </li>
                                          <li>
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              name="being_connected"
                                              id="future_material"
                                              defaultValue="Receive future materials from FVIII Academy"
                                            />
                                            <label htmlFor="future_material">
                                              Receive future materials from the
                                              FVIII Academy
                                            </label>
                                            <span className="checkmark" />
                                          </li>
                                        </ul>
                                      </div> */}
                                      {/* 	<div class="col-sm-12 col-md-12 consent-form-list">
                <div class="form-check">
          <label class="form-check-label">
              <input type="checkbox" class="form-check-input" name="optradio">Full consent
              <span class="checkmark"></span>
          </label>
          <div class="change-form"><h6><a href="#">edit opt-in</a></h6></div>
          
        </div>
      </div> */}
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
