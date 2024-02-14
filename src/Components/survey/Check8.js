import { useEffect, useState, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper"
import { SurveyFormValidations } from "../Validations/SurveyFormValidations/SurveyFormValidations"
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Check8 = () => {
  const formRef = useRef(null);
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [formInputs, setFormInputs] = useState({});
  const [error, setError] = useState("");
  const location = useLocation();
  const userId=new URLSearchParams(location.search).get("user_id")

  const handleChange = (e, isSelectedName, rating) => {
    if (
      isSelectedName === "rate_different_reasons" ||
      isSelectedName == "genotype_information_impacted_rate" ||
      isSelectedName === "satisfied_with_8check_service"
    ) {
      const updateForm = {
        [isSelectedName]: {
          ...formInputs[isSelectedName],
          [e.target.name]: e?.target?.name == "others"
            ? e?.target?.value
            : rating
        }
      }

      setFormInputs({ ...formInputs, ...updateForm });

    } else if (isSelectedName == "patients_with_severe_hemophilia_A" ||
      isSelectedName == "patients_with_non_severe_hemophilia_A" ||
      isSelectedName == "known_carrier_with_hemophilia_A" ||
      isSelectedName == "patient_with_FVIII_inhibitors"
    ) {
      const updateForm = {
        [isSelectedName]: {
          ...formInputs[isSelectedName],
          [e.target.name]: rating
        }
      }
      setFormInputs({ ...formInputs, ...updateForm });
    }

    else {
      if (e.target.name === "city" || e.target.name === "state"
     
      ) {
        setFormInputs((prevState) => ({
          ...prevState,
          location: {
            ...prevState.location,
            [e.target.name]: e?.target?.value,
          },
        }));
      }else if( e.target.name==="haematologist"||e.target.name==="practice_location"
   ){
        setFormInputs({...formInputs,[e.target.name]:isSelectedName=="other" ? e?.target?.value : isSelectedName})
      }else if(e.target.name==="interested_in_8check_activities"){
        setFormInputs({...formInputs,[e.target.name]:isSelectedName})
      }
      else {
        const isOther = isSelectedName === "other";
        const checkboxValue = isOther ? true : e.target.checked;
        const updateForm = isSelectedName
          ? {
            [e.target.name]: {
              [isSelectedName]: isOther ? e?.target?.value : checkboxValue,
            },
          }
          : { [e.target.name]: e?.target?.value };
        setFormInputs({ ...formInputs, ...updateForm });
      }

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const error = SurveyFormValidations(formInputs)
      if (Object.keys(error)?.length) {
        setError(error)
        return
      }
      else {
        let data = {
          location: {
            city: formInputs?.location?.city ? formInputs?.location?.city : "",
            state: formInputs?.location?.state ? formInputs?.location?.state : ""
          },
          provider: formInputs?.provider ? formInputs?.provider : "",
          haematologist: formInputs?.haematologist ? formInputs?.haematologist : "",
          practice_location: formInputs?.practice_location ? formInputs?.practice_location : "",
          rate_different_reasons: {
            to_confirm_diagnosis: formInputs?.rate_different_reasons?.to_confirm_diagnosis ? formInputs?.rate_different_reasons?.to_confirm_diagnosis : "",
            patient_inhibitor_development_risk: formInputs?.rate_different_reasons?.patient_inhibitor_development_risk ? formInputs?.rate_different_reasons?.patient_inhibitor_development_risk : "",
            guide_treatment_choice: formInputs?.rate_different_reasons?.guide_treatment_choice ? formInputs?.rate_different_reasons?.guide_treatment_choice : "",
            genotype_not_available: formInputs?.rate_different_reasons?.genotype_not_available ? formInputs?.rate_different_reasons?.genotype_not_available : "",
            no_insurance_reimbursement: formInputs?.rate_different_reasons?.no_insurance_reimbursement ? formInputs?.rate_different_reasons?.no_insurance_reimbursement : "",
            family_request: formInputs?.rate_different_reasons?.family_request ? formInputs?.rate_different_reasons?.family_request : ""
          },
          patients_with_severe_hemophilia_A: {
            not_recieved_FVIII_infusion: formInputs?.patients_with_severe_hemophilia_A?.not_recieved_FVIII_infusion ? formInputs?.patients_with_severe_hemophilia_A?.not_recieved_FVIII_infusion : "",
            recieved_FVIII_infusion: formInputs?.patients_with_severe_hemophilia_A?.recieved_FVIII_infusion ? formInputs?.patients_with_severe_hemophilia_A?.recieved_FVIII_infusion : "",
          },

          patients_with_non_severe_hemophilia_A: formInputs?.patients_with_non_severe_hemophilia_A ? formInputs?.patients_with_non_severe_hemophilia_A : "",
          known_carrier_with_hemophilia_A: {
            symptomatic: formInputs?.known_carrier_with_hemophilia_A?.symptomatic ? formInputs?.known_carrier_with_hemophilia_A?.symptomatic : "",
            asymptomatic: formInputs?.known_carrier_with_hemophilia_A?.asymptomatic ? formInputs?.known_carrier_with_hemophilia_A?.asymptomatic : "",
          },

          patient_with_FVIII_inhibitors: formInputs?.patient_with_FVIII_inhibitors ? formInputs?.patient_with_FVIII_inhibitors : "",
          genotype_information_impacted_rate: {
            improved_accuracy_diagnosis: formInputs?.genotype_information_impacted_rate?.improved_accuracy_diagnosis ? formInputs?.genotype_information_impacted_rate?.improved_accuracy_diagnosis : "",
            guided_treatment_choice: formInputs?.genotype_information_impacted_rate?.guided_treatment_choice ? formInputs?.genotype_information_impacted_rate?.guided_treatment_choice : "",
            changed_clinical_management: formInputs?.genotype_information_impacted_rate?.changed_clinical_management ? formInputs?.genotype_information_impacted_rate?.changed_clinical_management : "",
            impacted_family_planning: formInputs?.genotype_information_impacted_rate?.impacted_family_planning ? formInputs?.genotype_information_impacted_rate?.impacted_family_planning : "",
            informed_testing_of_family_members: formInputs?.genotype_information_impacted_rate?.informed_testing_of_family_members ? formInputs?.genotype_information_impacted_rate?.informed_testing_of_family_members : "",
            surgical_management: formInputs?.genotype_information_impacted_rate?.surgical_management ? formInputs?.genotype_information_impacted_rate?.surgical_management : "",
            improved_patients_quality_of_life: formInputs?.genotype_information_impacted_rate?.improved_patients_quality_of_life ? formInputs?.genotype_information_impacted_rate?.improved_patients_quality_of_life : ""
          },

          satisfied_with_8check_service: {
            satisfied_with_8check_service: formInputs?.satisfied_with_8check_service?.satisfied_with_8check_service ? formInputs?.satisfied_with_8check_service?.satisfied_with_8check_service : "",
            FVIII_infusion: formInputs?.satisfied_with_8check_service?.FVIII_infusion ? formInputs?.satisfied_with_8check_service?.FVIII_infusion : ""
          },

          service_improvement: formInputs?.service_improvement ? formInputs?.service_improvement : "",
          interested_in_8check_activities: formInputs?.interested_in_8check_activities ? formInputs?.interested_in_8check_activities : ""
        }
        let body={
          surveyData:data,
          formType:1,
          user_id:userId?userId:0
        }
        const response = await postData(ENDPOINT.STORE_SURVEY_DATA, body)
        if(response?.status==200){
          setFormInputs({});
          setError()
          formRef.current.reset();
          formRef.current.scrollIntoView({ behavior: 'smooth' });
          toast.success(response?.data?.message)
        }    
      }

    } catch (err) {
      console.log("--err", err)
    }
  };
  return (
    <>
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
      />
      <div className="col right-sidebar full-width-survey">
        <div className="check-survey">
          <Container>
            <Row>
              <div className="survey-block">
                <div className="survey-header d-flex align-items-center justify-content-between">
                  <Col>
                    <img src={path_image + "8checklogo.png"} alt="" />
                  </Col>
                  <Col>
                    <h1>User Survey</h1>
                  </Col>
                  <Col></Col>
                </div>
                <div className="survey-question">
                  <Form onSubmit={handleSubmit} ref={formRef} >
                    <Form.Group className="mb-3">
                      <Form.Label className="label-main">Location:</Form.Label>
                      <Row>
                        <Col sm={6}>
                          <Form.Label>City:</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            placeholder=""
                            value={formInputs?.location?.city}
                            onChange={(e) => handleChange(e)}
                          />
                          {error?.city ? (
                            <div className="login-validation">{error?.city}</div>
                          ) : (
                            ""
                          )}
                        </Col>
                        <Col sm={6}>
                          <Form.Label>State:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder=""
                            name="state"
                            value={formInputs?.location?.state}
                            onChange={(e) => handleChange(e)}
                          />
                          {error?.state ? (
                            <div className="login-validation">{error?.state}</div>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="label-main">
                        Type of Provider:
                      </Form.Label>

                      <Row>
                        <Col sm={12}>
                          <Form.Control
                            type="text"
                            placeholder=""
                            name="provider"
                            value={formInputs?.provider}
                            onChange={(e) => handleChange(e)}
                          />
                          {error?.provider ? (
                            <div className="login-validation">{error?.provider}</div>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="label-main">
                        Haematologist:
                      </Form.Label>

                      <Col sm={12} className="d-flex flex-wrap">
                        <div className="form-check-custom">
                          <Form.Check
                            type="radio"
                            name="haematologist"
                            label="Adult"
                            // value={formInputs?.adult}
                            checked={formInputs?.haematologist=="Adult"}
                            onChange={(e) => handleChange(e, "Adult")}
                          />
                          <span className="custom-radio" />
                        </div>
                        <div className="form-check-custom">
                          <Form.Check
                            type="radio"
                            name="haematologist"
                            label="Pediatric"
                            checked={formInputs?.haematologist=="Pediatric"}
                            onChange={(e) => handleChange(e, "Pediatric")}
                          />
                          <span className="custom-radio" />
                        </div>
                        <div className="form-check-custom">
                          <Form.Check
                            type="radio"
                            name="haematologist"
                            label="Obstetric/Gynecologist"
                            checked={formInputs?.haematologist=="Obstetric/Gynecologist"}
                            onChange={(e) => handleChange(e, "Obstetric/Gynecologist")}
                          />
                          <span className="custom-radio" />
                        </div>
                        <div className="form-check-custom">
                          <Form.Check
                            type="radio"
                            name="haematologist"
                            label="Genetic Counselor"
                            checked={formInputs?.haematologist=="Genetic Counselor"}
                            onChange={(e) => handleChange(e, "Genetic Counselor")}
                          />
                          <span className="custom-radio" />
                        </div>
                      </Col>
                      <div className="other-option">
                        <Form.Label>
                          Other <small>(please specify)</small>:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          name="haematologist"
                          value={(formInputs?.haematologist=="Adult"||
                          formInputs?.haematologist=="Pediatric"||
                          formInputs?.haematologist=="Obstetric/Gynecologist"||
                          formInputs?.haematologist=="Genetic Counselor")?"":formInputs?.haematologist
                        }
                          onChange={(e) => handleChange(e, "other")}
                        />

                      </div>
                      {error?.haematologist ? (
                        <div className="login-validation">{error?.haematologist}</div>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="label-main">
                        Location of Practice:
                      </Form.Label>
                      <Col sm={12} className="d-flex flex-wrap">
                        <Form.Check
                          type="radio"
                          name="practice_location"
                          label="HTCs"
                          checked={formInputs?.practice_location=="HTCs"}
                          onChange={(e) => handleChange(e, "HTCs")}
                        />
                        <Form.Check
                          type="radio"
                          name="practice_location"
                          label="Private Practice"
                          checked={formInputs?.practice_location=="Private Practice"}
                          onChange={(e) => handleChange(e, "Private Practice")}
                        />
                        <Form.Check
                          type="radio"
                          name="practice_location"
                          label="Academic Non-HTC"
                          checked={formInputs?.practice_location=="Academic Non-HTC"}
                          onChange={(e) => handleChange(e, "Academic Non-HTC")}
                        />
                      </Col>
                      <div className="other-option">
                        <Form.Label>
                          Other <small>(please specify)</small>:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          name="practice_location"
                          value={(formInputs?.practice_location=="HTCs"||
                          formInputs?.practice_location=="Private Practice"||
                          formInputs?.practice_location=="Academic Non-HTC")?"":formInputs?.practice_location
                          }
                          onChange={(e) => handleChange(e, "other")}
                        />
                      </div>
                      {error?.practice_location ? (
                        <div className="login-validation">{error?.practice_location}</div>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label column sm={12} className="label-main">
                        1. Rate the different reasons you have used the 8CHECK
                        service:
                        <br />
                        <small>
                          0 stars (not a reason) to 5 stars (major reason(s))
                        </small>
                      </Form.Label>
                      <Col sm={12} className="d-flex">
                        <fieldset>
                          <div className="star-rating">
                            <label>To confirm a diagnosis</label>

                            <div className="rating-wrapper">
                              <input
                                type="radio"
                                id="5-confirm_diagnosis"
                                name="to_confirm_diagnosis"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "5")
                                }
                                checked={formInputs?.rate_different_reasons?.to_confirm_diagnosis == "5"}
                              />
                              <label
                                for="5-confirm_diagnosis"
                                className="star-rating"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="4-confirm_diagnosis"
                                name="to_confirm_diagnosis"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "4")
                                }
                                checked={formInputs?.rate_different_reasons?.to_confirm_diagnosis == "4"}
                              />
                              <label
                                for="4-confirm_diagnosis"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="3-confirm_diagnosis"
                                name="to_confirm_diagnosis"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "3")
                                }
                                checked={formInputs?.rate_different_reasons?.to_confirm_diagnosis == "3"}
                              />
                              <label
                                for="3-confirm_diagnosis"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="2-confirm_diagnosis"
                                name="to_confirm_diagnosis"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "2")
                                }
                                checked={formInputs?.rate_different_reasons?.to_confirm_diagnosis == "2"}
                              />
                              <label
                                for="2-confirm_diagnosis"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="1-confirm_diagnosis"
                                name="to_confirm_diagnosis"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "1")
                                }
                                checked={formInputs?.rate_different_reasons?.to_confirm_diagnosis == "1"}
                              />
                              <label
                                for="1-confirm_diagnosis"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </Col>
                      <Col sm={12} className="d-flex">
                        <fieldset>
                          <div className="star-rating">
                            <label>Patient inhibitor development risk</label>
                            <div className="rating-wrapper">
                              <input
                                type="radio"
                                id="5-development_risk"
                                name="patient_inhibitor_development_risk"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "5")
                                }
                                checked={formInputs?.rate_different_reasons?.patient_inhibitor_development_risk == "5"}
                              />
                              <label
                                for="5-development_risk"
                                className="star-rating"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="4-development_risk"
                                name="patient_inhibitor_development_risk"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "4")
                                }
                                checked={formInputs?.rate_different_reasons?.patient_inhibitor_development_risk == "4"}
                              />
                              <label
                                for="4-development_risk"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="3-development_risk"
                                name="patient_inhibitor_development_risk"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "3")
                                }
                                checked={formInputs?.rate_different_reasons?.patient_inhibitor_development_risk == "3"}
                              />
                              <label
                                for="3-development_risk"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="2-development_risk"
                                name="patient_inhibitor_development_risk"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "2")
                                }
                                checked={formInputs?.rate_different_reasons?.patient_inhibitor_development_risk == "2"}
                              />
                              <label
                                for="2-development_risk"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="1-development_risk"
                                name="patient_inhibitor_development_risk"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "1")
                                }
                                checked={formInputs?.rate_different_reasons?.patient_inhibitor_development_risk == "1"}
                              />
                              <label
                                for="1-development_risk"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </Col>
                      <Col sm={12} className="d-flex">
                        <fieldset>
                          <div className="star-rating">
                            <label>Guide treatment choice</label>
                            <div className="rating-wrapper">
                              <input
                                type="radio"
                                id="5-treatment_choice"
                                name="guide_treatment_choice"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "5")
                                }
                                checked={formInputs?.rate_different_reasons?.guide_treatment_choice == "5"}
                              />
                              <label
                                for="5-treatment_choice"
                                className="star-rating"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="4-treatment_choice"
                                name="guide_treatment_choice"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "4")
                                }
                                checked={formInputs?.rate_different_reasons?.guide_treatment_choice == "4"}
                              />
                              <label
                                for="4-treatment_choice"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="3-treatment_choice"
                                name="guide_treatment_choice"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "3")
                                }
                                checked={formInputs?.rate_different_reasons?.guide_treatment_choice == "3"}
                              />
                              <label
                                for="3-treatment_choice"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="2-treatment_choice"
                                name="guide_treatment_choice"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "2")
                                }
                                checked={formInputs?.rate_different_reasons?.guide_treatment_choice == "2"}
                              />
                              <label
                                for="2-treatment_choice"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="1-treatment_choice"
                                name="guide_treatment_choice"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "1")
                                }
                                checked={formInputs?.rate_different_reasons?.guide_treatment_choice == "1"}
                              />
                              <label
                                for="1-treatment_choice"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </Col>
                      <Col sm={12} className="d-flex">
                        <fieldset>
                          <div className="star-rating">
                            <label>Genotype not available at my center</label>
                            <div className="rating-wrapper">
                              <input
                                type="radio"
                                id="5-genotype"
                                name="genotype_not_available"
                                onChange={(e) => handleChange(e, "rate_different_reasons", "5")}
                                checked={formInputs?.rate_different_reasons?.genotype_not_available == "5"}
                              />
                              <label for="5-genotype" className="star-rating">
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="4-genotype"
                                name="genotype_not_available"
                                onChange={(e) => handleChange(e, "rate_different_reasons", "4")}
                                checked={formInputs?.rate_different_reasons?.genotype_not_available == "4"}
                              />
                              <label
                                for="4-genotype"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="3-genotype"
                                name="genotype_not_available"
                                onChange={(e) => handleChange(e, "rate_different_reasons", "3")}
                                checked={formInputs?.rate_different_reasons?.genotype_not_available == "3"}
                              />
                              <label
                                for="3-genotype"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="2-genotype"
                                name="genotype_not_available"
                                onChange={(e) => handleChange(e, "rate_different_reasons", "2")}
                                checked={formInputs?.rate_different_reasons?.genotype_not_available == "2"}
                              />
                              <label
                                for="2-genotype"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="1-genotype"
                                name="genotype_not_available"
                                onChange={(e) => handleChange(e, "rate_different_reasons", "1")}
                                checked={formInputs?.rate_different_reasons?.genotype_not_available == "1"}
                              />
                              <label
                                for="1-genotype"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </Col>
                      <Col sm={12} className="d-flex">
                        <fieldset>
                          <div className="star-rating">
                            <label>No insurance reimbursement</label>
                            <div className="rating-wrapper">
                              <input
                                type="radio"
                                id="5-insurance_reimbursement"
                                name="no_insurance_reimbursement"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "5")
                                }
                                checked={formInputs?.rate_different_reasons?.no_insurance_reimbursement == "5"}
                              />
                              <label
                                for="5-insurance_reimbursement"
                                className="star-rating"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="4-insurance_reimbursement"
                                name="no_insurance_reimbursement"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "4")
                                }
                                checked={formInputs?.rate_different_reasons?.no_insurance_reimbursement == "4"}
                              />
                              <label
                                for="4-insurance_reimbursement"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="3-insurance_reimbursement"
                                name="no_insurance_reimbursement"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "3")
                                }
                                checked={formInputs?.rate_different_reasons?.no_insurance_reimbursement == "3"}
                              />
                              <label
                                for="3-insurance_reimbursement"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="2-insurance_reimbursement"
                                name="no_insurance_reimbursement"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "2")
                                }
                                checked={formInputs?.rate_different_reasons?.no_insurance_reimbursement == "2"}
                              />
                              <label
                                for="2-insurance_reimbursement"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="1-insurance_reimbursement"
                                name="no_insurance_reimbursement"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "1")
                                }
                                checked={formInputs?.rate_different_reasons?.no_insurance_reimbursement == "1"}
                              />
                              <label
                                for="1-insurance_reimbursement"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </Col>
                      <Col sm={12} className="d-flex">
                        <fieldset>
                          <div className="star-rating">
                            <label>Family/Individual request</label>
                            <div className="rating-wrapper">
                              <input
                                type="radio"
                                id="5-family_request"
                                name="family_request"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "5")
                                }
                                checked={formInputs?.rate_different_reasons?.family_request == "5"}
                              />
                              <label
                                for="5-family_request"
                                className="star-rating"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="4-family_request"
                                name="family_request"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "4")
                                }
                                checked={formInputs?.rate_different_reasons?.family_request == "4"}
                              />
                              <label
                                for="4-family_request"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="3-family_request"
                                name="family_request"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "3")
                                }
                                checked={formInputs?.rate_different_reasons?.family_request == "3"}
                              />
                              <label
                                for="3-family_request"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="2-family_request"
                                name="family_request"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "2")
                                }
                                checked={formInputs?.rate_different_reasons?.family_request == "2"}
                              />
                              <label
                                for="2-family_request"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="1-family_request"
                                name="family_request"
                                onChange={(e) =>
                                  handleChange(e, "rate_different_reasons", "1")
                                }
                                checked={formInputs?.rate_different_reasons?.family_request == "1"}
                              />
                              <label
                                for="1-family_request"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </Col>
                      <Col sm={12} className="d-flex flex-wrap">
                        <label>Others</label>
                        <Form.Control
                          as="textarea"
                          aria-label="With textarea"
                          name="others"
                          value={formInputs?.rate_different_reasons?.others?
                            formInputs?.rate_different_reasons?.others:""}
                          onChange={(e) => handleChange(e, "rate_different_reasons")}
                        />

                      {error?.rate_different_reasons ? (
                        <div className="login-validation">{error?.rate_different_reasons}</div>
                      ) : (
                        ""
                      )}
                      </Col>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label column sm={12} className="label-main">
                        2. How many patients in each patient group have used the
                        8CHECK service
                      </Form.Label>
                      <Form.Group className="mb-3">
                        <Form.Label className="label-main">
                          Patients with severe hemophilia A:
                        </Form.Label>
                        <Col sm={12} className="d-flex flex-wrap mb-3">
                          <label>Who have not received a FVIII infusion</label>
                          <Form.Check
                            type="radio"
                            name="not_recieved_FVIII_infusion"
                            label="0-5"
                            onChange={(e) => handleChange(e, "patients_with_severe_hemophilia_A", "0-5")}
                            checked={formInputs?.patients_with_severe_hemophilia_A?.not_recieved_FVIII_infusion == "0-5"}
                          />
                          <Form.Check
                            type="radio"
                            name="not_recieved_FVIII_infusion"
                            label="5-10"
                            onChange={(e) => handleChange(e, "patients_with_severe_hemophilia_A", "5-10")}
                            checked={formInputs?.patients_with_severe_hemophilia_A?.not_recieved_FVIII_infusion == "5-10"}
                          />
                          <Form.Check
                            type="radio"
                            name="not_recieved_FVIII_infusion"
                            label="10-15"
                            onChange={(e) => handleChange(e, "patients_with_severe_hemophilia_A", "10-15")}
                            checked={formInputs?.patients_with_severe_hemophilia_A?.not_recieved_FVIII_infusion == "10-15"}
                          />
                          <Form.Check
                            type="radio"
                            name="not_recieved_FVIII_infusion"
                            label="15-20"
                            onChange={(e) => handleChange(e, "patients_with_severe_hemophilia_A", "15-20")}
                            checked={formInputs?.patients_with_severe_hemophilia_A?.not_recieved_FVIII_infusion == "15-20"}
                          />
                          <Form.Check
                            type="radio"
                            name="not_recieved_FVIII_infusion"
                            label=">20"
                            onChange={(e) => handleChange(e, "patients_with_severe_hemophilia_A", ">20")}
                            checked={formInputs?.patients_with_severe_hemophilia_A?.not_recieved_FVIII_infusion == ">20"}
                          />
                          {error?.not_recieved_FVIII_infusion ? (
                            <div className="login-validation">{error?.not_recieved_FVIII_infusion
                            }</div>
                          ) : (
                            ""
                          )}
                        </Col>
                        <Col sm={12} className="d-flex flex-wrap mb-3">
                          <label>
                            Who have received more than 50 infusions FVIII
                            treatment
                          </label>
                          <Form.Check
                            type="radio"
                            name="recieved_FVIII_infusion"
                            label="0-5"
                            onChange={(e) => handleChange(e, "patients_with_severe_hemophilia_A", "0-5")}
                            checked={formInputs?.patients_with_severe_hemophilia_A?.recieved_FVIII_infusion == "0-5"}
                          />
                          <Form.Check
                            type="radio"
                            name="recieved_FVIII_infusion"
                            label="5-10"
                            onChange={(e) => handleChange(e, "patients_with_severe_hemophilia_A", "5-10")}
                            checked={formInputs?.patients_with_severe_hemophilia_A?.recieved_FVIII_infusion == "5-10"}
                          />
                          <Form.Check
                            type="radio"
                            name="recieved_FVIII_infusion"
                            label="10-15"
                            onChange={(e) => handleChange(e, "patients_with_severe_hemophilia_A", "10-15")}
                            checked={formInputs?.patients_with_severe_hemophilia_A?.recieved_FVIII_infusion == "10-15"}
                          />
                          <Form.Check
                            type="radio"
                            name="recieved_FVIII_infusion"
                            label="15-20"
                            onChange={(e) => handleChange(e, "patients_with_severe_hemophilia_A", "15-20")}
                            checked={formInputs?.patients_with_severe_hemophilia_A?.recieved_FVIII_infusion == "15-20"}
                          />
                          <Form.Check
                            type="radio"
                            name="recieved_FVIII_infusion"
                            label=">20"
                            onChange={(e) => handleChange(e, "patients_with_severe_hemophilia_A", ">20")}
                            checked={formInputs?.patients_with_severe_hemophilia_A?.recieved_FVIII_infusion == ">20"}
                          />
                          {error?.recieved_FVIII_infusion ? (
                            <div className="login-validation">{error?.recieved_FVIII_infusion
                            }</div>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="label-main">
                          Patients with non-severe hemophilia A
                        </Form.Label>
                        <Col sm={12} className="d-flex flex-wrap mb-3">
                          <Form.Check
                            type="radio"
                            name="non_severe_hemophilia_A"
                            label="0-5"
                            onChange={(e) => handleChange(e, "patients_with_non_severe_hemophilia_A", "0-5")}
                            checked={formInputs?.patients_with_non_severe_hemophilia_A?.non_severe_hemophilia_A == "0-5"}
                          />
                          <Form.Check
                            type="radio"
                            name="non_severe_hemophilia_A"
                            label="5-10"
                            onChange={(e) => handleChange(e, "patients_with_non_severe_hemophilia_A", "5-10")}
                            checked={formInputs?.patients_with_non_severe_hemophilia_A?.non_severe_hemophilia_A == "5-10"}
                          />
                          <Form.Check
                            type="radio"
                            name="non_severe_hemophilia_A"
                            label="10-15"
                            onChange={(e) => handleChange(e, "patients_with_non_severe_hemophilia_A", "10-15")}
                            checked={formInputs?.patients_with_non_severe_hemophilia_A?.non_severe_hemophilia_A == "10-15"}
                          />
                          <Form.Check
                            type="radio"
                            name="non_severe_hemophilia_A"
                            label="15-20"
                            onChange={(e) => handleChange(e, "patients_with_non_severe_hemophilia_A", "15-20")}
                            checked={formInputs?.patients_with_non_severe_hemophilia_A?.non_severe_hemophilia_A == "15-20"}
                          />
                          <Form.Check
                            type="radio"
                            name="non_severe_hemophilia_A"
                            label=">20"
                            onChange={(e) => handleChange(e, "patients_with_non_severe_hemophilia_A", ">20")}
                            checked={formInputs?.patients_with_non_severe_hemophilia_A?.non_severe_hemophilia_A == ">20"}
                          />
                        </Col>
                        {error?.patients_with_non_severe_hemophilia_A ? (
                          <div className="login-validation">{error?.patients_with_non_severe_hemophilia_A
                          }</div>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="label-main">
                          Known, or potential carriers/female with hemophilia A:
                        </Form.Label>
                        <Col sm={12} className="d-flex flex-wrap mb-3">
                          <label>Symptomatic</label>
                          <Form.Check
                            type="radio"
                            name="symptomatic"
                            label="0-5"
                            onChange={(e) => handleChange(e, "known_carrier_with_hemophilia_A", "0-5")}
                            checked={formInputs?.known_carrier_with_hemophilia_A?.symptomatic == "0-5"}
                          />
                          <Form.Check
                            type="radio"
                            name="symptomatic"
                            label="5-10"
                            onChange={(e) => handleChange(e, "known_carrier_with_hemophilia_A", "5-10")}
                            checked={formInputs?.known_carrier_with_hemophilia_A?.symptomatic == "5-10"}
                          />
                          <Form.Check
                            type="radio"
                            name="symptomatic"
                            label="10-15"
                            onChange={(e) => handleChange(e, "known_carrier_with_hemophilia_A", "10-15")}
                            checked={formInputs?.known_carrier_with_hemophilia_A?.symptomatic == "10-15"}
                          />
                          <Form.Check
                            type="radio"
                            name="symptomatic"
                            label="15-20"
                            onChange={(e) => handleChange(e, "known_carrier_with_hemophilia_A", "15-20")}
                            checked={formInputs?.known_carrier_with_hemophilia_A?.symptomatic == "15-20"}
                          />
                          <Form.Check
                            type="radio"
                            name="symptomatic"
                            label=">20"
                            onChange={(e) => handleChange(e, "known_carrier_with_hemophilia_A", ">20")}
                            checked={formInputs?.known_carrier_with_hemophilia_A?.symptomatic == ">20"}
                          />
                          {error?.symptomatic ? (
                            <div className="login-validation">{error?.symptomatic
                            }</div>
                          ) : (
                            ""
                          )}
                        </Col>
                        <Col sm={12} className="d-flex flex-wrap mb-3">
                          <label>Asymptomatic</label>
                          <Form.Check
                            type="radio"
                            name="asymptomatic"
                            label="0-5"
                            onChange={(e) => handleChange(e, "known_carrier_with_hemophilia_A", "0-5")}
                            checked={formInputs?.known_carrier_with_hemophilia_A?.asymptomatic == "0-5"}
                          />
                          <Form.Check
                            type="radio"
                            name="asymptomatic"
                            label="5-10"
                            onChange={(e) => handleChange(e, "known_carrier_with_hemophilia_A", "5-10")}
                            checked={formInputs?.known_carrier_with_hemophilia_A?.asymptomatic == "5-10"}
                          />
                          <Form.Check
                            type="radio"
                            name="asymptomatic"
                            label="10-15"
                            onChange={(e) => handleChange(e, "known_carrier_with_hemophilia_A", "10-15")}
                            checked={formInputs?.known_carrier_with_hemophilia_A?.asymptomatic == "10-15"}
                          />
                          <Form.Check
                            type="radio"
                            name="asymptomatic"
                            label="15-20"
                            onChange={(e) => handleChange(e, "known_carrier_with_hemophilia_A", "15-20")}
                            checked={formInputs?.known_carrier_with_hemophilia_A?.asymptomatic == "15-20"}
                          />
                          <Form.Check
                            type="radio"
                            name="asymptomatic"
                            label=">20"
                            onChange={(e) => handleChange(e, "known_carrier_with_hemophilia_A", ">20")}
                            checked={formInputs?.known_carrier_with_hemophilia_A?.asymptomatic == ">20"}
                          />
                          {error?.asymptomatic ? (
                            <div className="login-validation">{error?.asymptomatic
                            }</div>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="label-main">
                          Patients with current/past FVIII inhibitors
                        </Form.Label>
                        <Col sm={12} className="d-flex flex-wrap mb-3">
                          <Form.Check
                            type="radio"
                            name="FVIII_inhibitors"
                            label="0-5"
                            onChange={(e) => handleChange(e, "patient_with_FVIII_inhibitors", "0-5")}
                            checked={formInputs?.patient_with_FVIII_inhibitors?.FVIII_inhibitors == "0-5"}
                          />
                          <Form.Check
                            type="radio"
                            name="FVIII_inhibitors"
                            label="5-10"
                            onChange={(e) => handleChange(e, "patient_with_FVIII_inhibitors", "5-10")}
                            checked={formInputs?.patient_with_FVIII_inhibitors?.FVIII_inhibitors == "5-10"}
                          />
                          <Form.Check
                            type="radio"
                            name="FVIII_inhibitors"
                            label="10-15"
                            onChange={(e) => handleChange(e, "patient_with_FVIII_inhibitors", "10-15")}
                            checked={formInputs?.patient_with_FVIII_inhibitors?.FVIII_inhibitors == "10-15"}
                          />
                          <Form.Check
                            type="radio"
                            name="FVIII_inhibitors"
                            label="15-20"
                            onChange={(e) => handleChange(e, "patient_with_FVIII_inhibitors", "15-20")}
                            checked={formInputs?.patient_with_FVIII_inhibitors?.FVIII_inhibitors == "15-20"}
                          />
                          <Form.Check
                            type="radio"
                            name="FVIII_inhibitors"
                            label=">20"
                            onChange={(e) => handleChange(e, "patient_with_FVIII_inhibitors", ">20")}
                            checked={formInputs?.patient_with_FVIII_inhibitors?.FVIII_inhibitors == ">20"}
                          />
                        </Col>
                        {error?.patient_with_FVIII_inhibitors ? (
                          <div className="login-validation">{error?.patient_with_FVIII_inhibitors
                          }</div>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label column sm={12} className="label-main">
                        3. How has receiving the genotype information impacted
                        patient care? Rate the options below
                        <br />
                        <small>
                          0 stars (not a reason) to 5 stars (major reason(s))
                        </small>
                      </Form.Label>
                      <Col sm={12} className="d-flex">
                        <fieldset>
                          <div className="star-rating">
                            <label>Improved accuracy of diagnosis</label>
                            <div className="rating-wrapper">
                              <input
                                type="radio"
                                id="5-accuracy_diagnosis"
                                name="improved_accuracy_diagnosis"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "5")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.improved_accuracy_diagnosis == "5"}
                              />
                              <label
                                for="5-accuracy_diagnosis"
                                className="star-rating"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="4-accuracy_diagnosis"
                                name="improved_accuracy_diagnosis"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "4")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.improved_accuracy_diagnosis == "4"}
                              />
                              <label
                                for="4-accuracy_diagnosis"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="3-accuracy_diagnosis"
                                name="improved_accuracy_diagnosis"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "3")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.improved_accuracy_diagnosis == "3"}
                              />
                              <label
                                for="3-accuracy_diagnosis"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="2-accuracy_diagnosis"
                                name="improved_accuracy_diagnosis"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "2")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.improved_accuracy_diagnosis == "2"}
                              />
                              <label
                                for="2-accuracy_diagnosis"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="1-accuracy_diagnosis"
                                name="improved_accuracy_diagnosis"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "1")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.improved_accuracy_diagnosis == "1"}
                              />
                              <label
                                for="1-accuracy_diagnosis"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </Col>
                      <Col sm={12} className="d-flex">
                        <fieldset>
                          <div className="star-rating">
                            <label>Guided treatment choice</label>
                            <div className="rating-wrapper">
                              <input
                                type="radio"
                                id="5-guided_treatment"
                                name="guided_treatment_choice"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "5")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.guided_treatment_choice == "5"}
                              />
                              <label
                                for="5-guided_treatment"
                                className="star-rating"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="4-guided_treatment"
                                name="guided_treatment_choice"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "4")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.guided_treatment_choice == "4"}
                              />
                              <label
                                for="4-guided_treatment"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="3-guided_treatment"
                                name="guided_treatment_choice"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "3")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.guided_treatment_choice == "3"}
                              />
                              <label
                                for="3-guided_treatment"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="2-guided_treatment"
                                name="guided_treatment_choice"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "2")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.guided_treatment_choice == "2"}
                              />
                              <label
                                for="2-guided_treatment"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="1-guided_treatment"
                                name="guided_treatment_choice"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "1")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.guided_treatment_choice == "1"}
                              />
                              <label
                                for="1-guided_treatment"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </Col>
                      <Col sm={12} className="d-flex">
                        <fieldset>
                          <div className="star-rating">
                            <label>
                              Changed clinical management of the patient
                            </label>
                            <div className="rating-wrapper">
                              <input
                                type="radio"
                                id="5-clinical_management"
                                name="changed_clinical_management"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "5")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.changed_clinical_management == "5"}
                              />
                              <label
                                for="5-clinical_management"
                                className="star-rating"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="4-clinical_management"
                                name="changed_clinical_management"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "4")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.changed_clinical_management == "4"}
                              />
                              <label
                                for="4-clinical_management"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="3-clinical_management"
                                name="changed_clinical_management"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "3")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.changed_clinical_management == "3"}
                              />
                              <label
                                for="3-clinical_management"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="2-clinical_management"
                                name="changed_clinical_management"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "2")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.changed_clinical_management == "2"}
                              />
                              <label
                                for="2-clinical_management"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="1-clinical_management"
                                name="changed_clinical_management"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "1")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.changed_clinical_management == "1"}
                              />
                              <label
                                for="1-clinical_management"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </Col>
                      <Col sm={12} className="d-flex">
                        <fieldset>
                          <div className="star-rating">
                            <label>Impacted family planning</label>
                            <div className="rating-wrapper">
                              <input
                                type="radio"
                                id="5-impacted_family"
                                name="impacted_family_planning"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "5")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.impacted_family_planning == "5"}
                              />
                              <label
                                for="5-impacted_family"
                                className="star-rating"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="4-impacted_family"
                                name="impacted_family_planning"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "4")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.impacted_family_planning == "4"}
                              />
                              <label
                                for="4-impacted_family"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="3-impacted_family"
                                name="impacted_family_planning"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "3")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.impacted_family_planning == "3"}
                              />
                              <label
                                for="3-impacted_family"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="2-impacted_family"
                                name="impacted_family_planning"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "2")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.impacted_family_planning == "2"}
                              />
                              <label
                                for="2-impacted_family"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="1-impacted_family"
                                name="impacted_family_planning"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "1")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.impacted_family_planning == "1"}
                              />
                              <label
                                for="1-impacted_family"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </Col>
                      <Col sm={12} className="d-flex">
                        <fieldset>
                          <div className="star-rating">
                            <label>Informed testing of family members</label>
                            <div className="rating-wrapper">
                              <input
                                type="radio"
                                id="5-informed_testing"
                                name="informed_testing_of_family_members"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "5")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.informed_testing_of_family_members == "5"}
                              />
                              <label
                                for="5-informed_testing"
                                className="star-rating"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="4-informed_testing"
                                name="informed_testing_of_family_members"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "4")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.informed_testing_of_family_members == "4"}
                              />
                              <label
                                for="4-informed_testing"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="3-informed_testing"
                                name="informed_testing_of_family_members"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "3")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.informed_testing_of_family_members == "3"}
                              />
                              <label
                                for="3-informed_testing"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="2-informed_testing"
                                name="informed_testing_of_family_members"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "2")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.informed_testing_of_family_members == "2"}
                              />
                              <label
                                for="2-informed_testing"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="1-informed_testing"
                                name="informed_testing_of_family_members"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "1")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.informed_testing_of_family_members == "1"}
                              />
                              <label
                                for="1-informed_testing"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </Col>
                      <Col sm={12} className="d-flex">
                        <fieldset>
                          <div className="star-rating">
                            <label>Surgical management</label>
                            <div className="rating-wrapper">
                              <input
                                type="radio"
                                id="5-surgical_management"
                                name="surgical_management"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "5")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.surgical_management == "5"}
                              />
                              <label
                                for="5-surgical_management"
                                className="star-rating"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="4-surgical_management"
                                name="surgical_management"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "4")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.surgical_management == "4"}
                              />
                              <label
                                for="4-surgical_management"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="3-surgical_management"
                                name="surgical_management"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "3")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.surgical_management == "3"}
                              />
                              <label
                                for="3-surgical_management"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="2-surgical_management"
                                name="surgical_management"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "2")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.surgical_management == "2"}
                              />
                              <label
                                for="2-surgical_management"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="1-surgical_management"
                                name="surgical_management"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "1")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.surgical_management == "1"}
                              />
                              <label
                                for="1-surgical_management"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </Col>
                      <Col sm={12} className="d-flex">
                        <fieldset>
                          <div className="star-rating">
                            <label>Improved patients quality of life</label>
                            <div className="rating-wrapper">
                              <input
                                type="radio"
                                id="5-improved_patients"
                                name="improved_patients_quality_of_life"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "5")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.improved_patients_quality_of_life == "5"}
                              />
                              <label
                                for="5-improved_patients"
                                className="star-rating"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="4-improved_patients"
                                name="improved_patients_quality_of_life"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "4")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.improved_patients_quality_of_life == "4"}
                              />
                              <label
                                for="4-improved_patients"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="3-improved_patients"
                                name="improved_patients_quality_of_life"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "3")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.improved_patients_quality_of_life == "3"}
                              />
                              <label
                                for="3-improved_patients"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="2-improved_patients"
                                name="improved_patients_quality_of_life"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "2")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.improved_patients_quality_of_life == "2"}
                              />
                              <label
                                for="2-improved_patients"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="1-improved_patients"
                                name="improved_patients_quality_of_life"
                                onChange={(e) =>
                                  handleChange(e, "genotype_information_impacted_rate", "1")
                                }
                                checked={formInputs?.genotype_information_impacted_rate?.improved_patients_quality_of_life == "1"}
                              />
                              <label
                                for="1-improved_patients"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </Col>
                      <Col sm={12} className="d-flex flex-wrap">
                        <label>Others</label>
                        <Form.Control
                          as="textarea"
                          aria-label="With textarea"
                          name="others"
                          value={formInputs?.genotype_information_impacted_rate?.others?
                            formInputs?.genotype_information_impacted_rate?.others:""}
                          onChange={(e) => handleChange(e, "genotype_information_impacted_rate")}

                        />
                      {error?.genotype_information_impacted_rate ? (
                        <div className="login-validation">{error?.genotype_information_impacted_rate
                        }</div>
                      ) : (
                        ""
                      )}
                      </Col>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label column sm={12} className="label-main">
                        4. How satisfied are you with the 8CHECK service
                        <br />
                        <small>
                          0 stars (not a reason) to 5 stars (major reason(s))
                        </small>
                      </Form.Label>
                      <Col sm={12} className="d-flex flex-wrap">
                        <fieldset>
                          <div className="star-rating">
                            <div className="rating-wrapper">
                              <input
                                type="radio"
                                id="5-check_service"
                                name="satisfied_with_8check_service"
                                onChange={(e) =>
                                  handleChange(e, "satisfied_with_8check_service", "5")
                                }
                                checked={formInputs?.satisfied_with_8check_service?.satisfied_with_8check_service == "5"}
                              />
                              <label
                                for="5-check_service"
                                className="star-rating"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="4-check_service"
                                name="satisfied_with_8check_service"
                                onChange={(e) =>
                                  handleChange(e, "satisfied_with_8check_service", "4")
                                }
                                checked={formInputs?.satisfied_with_8check_service?.satisfied_with_8check_service == "4"}
                              />
                              <label
                                for="4-check_service"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="3-check_service"
                                name="satisfied_with_8check_service"
                                onChange={(e) =>
                                  handleChange(e, "satisfied_with_8check_service", "3")
                                }
                                checked={formInputs?.satisfied_with_8check_service?.satisfied_with_8check_service == "3"}
                              />
                              <label
                                for="3-check_service"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="2-check_service"
                                name="satisfied_with_8check_service"
                                onChange={(e) =>
                                  handleChange(e, "satisfied_with_8check_service", "2")
                                }
                                checked={formInputs?.satisfied_with_8check_service?.satisfied_with_8check_service == "2"}
                              />
                              <label
                                for="2-check_service"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>

                              <input
                                type="radio"
                                id="1-check_service"
                                name="satisfied_with_8check_service"
                                onChange={(e) =>
                                  handleChange(e, "satisfied_with_8check_service", "1")
                                }
                                checked={formInputs?.satisfied_with_8check_service?.satisfied_with_8check_service == "1"}
                              />
                              <label
                                for="1-check_service"
                                className="star-rating star"
                              >
                                <svg
                                  stroke="#019acc"
                                  stroke-width="1px"
                                  fill="#fff"
                                  width="800px"
                                  height="800px"
                                  viewBox="0 0 32 32"
                                >
                                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                        {error?.satisfied_with_8check_service ? (
                          <div className="login-validation">{error?.satisfied_with_8check_service
                          }</div>
                        ) : (
                          ""
                        )}
                      </Col>
                      <Col sm={12} className="d-flex flex-wrap mb-3">
                        <label>Who have not received a FVIII infusion</label>
                        <Form.Check
                          type="radio"
                          name="FVIII_infusion"
                          label="Yes"
                          onChange={(e) => handleChange(e, "satisfied_with_8check_service", "yes")}
                          checked={formInputs?.satisfied_with_8check_service?.FVIII_infusion == "yes"}
                        />
                        <Form.Check
                          type="radio"
                          name="FVIII_infusion"
                          label="No"
                          onChange={(e) => handleChange(e, "satisfied_with_8check_service", "no")}
                          checked={formInputs?.satisfied_with_8check_service?.FVIII_infusion == "no"}
                        />
                        {error?.FVIII_infusion ? (
                          <div className="login-validation">{error?.FVIII_infusion
                          }</div>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label column sm={12} className="label-main">
                        5. Suggestion for service improvement
                      </Form.Label>
                      <Col sm={12} className="d-flex flex-wrap">
                        <Form.Control
                          as="textarea"
                          aria-label="With textarea"
                          name="service_improvement"
                          value={formInputs?.service_improvement?formInputs?.service_improvement:""}
                          onChange={(e) => handleChange(e)}

                        />
                      {error?.service_improvement ? (
                        <div className="login-validation">{error?.service_improvement
                        }</div>
                      ) : (
                        ""
                      )}

                      </Col>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label column sm={12} className="label-main">
                        6. Would you be interested in participating in any of
                        the following 8CHECK activities
                      </Form.Label>
                      <Col sm={12} className="d-flex flex-wrap activity">
                        <Form.Check
                          type="radio"
                          name="interested_in_8check_activities"
                          label="Publication of 8CHECK data"
                          onChange={(e) =>
                            handleChange(e, "publication of 8check data")
                          }
                          checked={formInputs?.interested_in_8check_activities?.publication_of_8check_data}

                        />
                        <Form.Check
                          type="radio"
                          name="interested_in_8check_activities"
                          label="Future study in F8 genotyping"
                          onChange={(e) =>
                            handleChange(e, "future study in F8 genotyping")
                          }
                          checked={formInputs?.interested_in_8check_activities?.future_study_in_F8_genotyping}
                        />
                        {error?.interested_in_8check_activities ? (
                          <div className="login-validation">{error?.interested_in_8check_activities
                          }</div>
                        ) : (
                          ""
                        )}
                      </Col>
                      {/* <Col sm={12} className="d-flex flex-wrap activity">
                      <Form.Check
                            type="radio"
                            name="F8-genotyping"
                            label="Future study in F8 genotyping"
                            onChange={(e) => handleChange(e, "F8-genotyping")}
                            />
                        </Col> */}

                      
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                  </Form>
                </div>
              </div>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Check8;
