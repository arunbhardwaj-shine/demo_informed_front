import { useState, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import { SurveyQuestionFormValidations } from "../Validations/SurveyFormValidations/SurveyQuestionFormValidations";

const SurveyCheck8Question = () => {
  const formRef = useRef(null);
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [formInputs, setFormInputs] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e, isSelectedName, rating) => {
    if (
      isSelectedName === "patient_case" ||
      isSelectedName === "clinical_practice" ||
      isSelectedName === "recommend"
    ) {
      const updateForm = {
        [isSelectedName]: {
          ...formInputs[isSelectedName],
          [e.target.name]:
            e?.target?.name == "others" ? e?.target?.value : rating,
        },
      };

      setFormInputs({ ...formInputs, ...updateForm });
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const error = SurveyQuestionFormValidations(formInputs);
      if (Object.keys(error)?.length) {
        setError(error);
        return;
      } else {
        let data = {

          suggestion: formInputs?.suggestion ? formInputs?.suggestion : "",

          patient_case: {
            patient_case_rating: formInputs?.patient_case?.patient_case_rating
              ? formInputs?.patient_case?.patient_case_rating
              : "",
          },

          clinical_practice: {
            future_clinical: formInputs?.clinical_practice?.future_clinical
              ? formInputs?.clinical_practice?.future_clinical
              : "",
          },
          
          recommend: {
            recommend_clinical: formInputs?.recommend?.recommend_clinical
              ? formInputs?.recommend?.recommend_clinical
              : "",
          },
        };

        let body = {
          surveyData: data,
          formType: 2
        }

        const response = await postData(ENDPOINT.STORE_SURVEY_DATA, body);
        setFormInputs({});
        setError();
        formRef.current.reset();
      }
    } catch (err) {
      console.log("--err", err);
    }
  };

  return (
    <>
      <div className="col right-sidebar full-width-survey">
        <div className="check-survey">
          <Container>
            <Row>
              <div className="survey-block">
                <div className="survey-header d-flex justify-content-center">
                  <Col>
                    <h1> Post Event Survey</h1>
                  </Col>
                </div>
                <div className="survey-question">
                  <Form onSubmit={handleSubmit} ref={formRef}>
                    <Form.Group className="mb-3">
                      <Form.Label column sm={12} className="label-main">
                        1. How relevant was this patient case to your clinical
                        practice?
                        <br />
                      </Form.Label>
                      <Col sm={12} className="d-flex flex-wrap">
                        <fieldset>
                          <div className="rating-wrapper">
                            <input
                              type="radio"
                              id="5-patient_case_rating"
                              name="patient_case_rating"
                              onChange={(e) =>
                                handleChange(e, "patient_case", "5")
                              }
                              checked={
                                formInputs?.patient_case?.patient_case_rating ==
                                "5"
                              }
                            />
                            <label
                              for="5-patient_case_rating"
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
                              id="4-patient_case_rating"
                              name="patient_case_rating"
                              onChange={(e) =>
                                handleChange(e, "patient_case", "4")
                              }
                              checked={
                                formInputs?.patient_case?.patient_case_rating ==
                                "4"
                              }
                            />
                            <label
                              for="4-patient_case_rating"
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
                              id="3-patient_case_rating"
                              name="patient_case_rating"
                              onChange={(e) =>
                                handleChange(e, "patient_case", "3")
                              }
                              checked={
                                formInputs?.patient_case?.patient_case_rating ==
                                "3"
                              }
                            />
                            <label
                              for="3-patient_case_rating"
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
                              id="2-patient_case_rating"
                              name="patient_case_rating"
                              onChange={(e) =>
                                handleChange(e, "patient_case", "2")
                              }
                              checked={
                                formInputs?.patient_case?.patient_case_rating ==
                                "2"
                              }
                            />
                            <label
                              for="2-patient_case_rating"
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
                              id="1-patient_case_rating"
                              name="patient_case_rating"
                              onChange={(e) =>
                                handleChange(e, "patient_case", "1")
                              }
                              checked={
                                formInputs?.patient_case?.patient_case_rating ==
                                "1"
                              }
                            />
                            <label
                              for="1-patient_case_rating"
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
                        </fieldset>
                        {error?.patient_case ? (
                          <div className="login-validation">
                            {error?.patient_case}
                          </div>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label column sm={12} className="label-main">
                        2. I plan to attend future Clinical Practice patient
                        cases:
                      </Form.Label>
                      <Col sm={12} className="d-flex flex-wrap mb-3">
                        <Form.Check
                          type="radio"
                          name="future_clinical"
                          label="Yes"
                          onChange={(e) =>
                            handleChange(e, "clinical_practice", "yes")
                          }
                          checked={
                            formInputs?.clinical_practice?.future_clinical ==
                            "yes"
                          }
                        />

                        <Form.Check
                          type="radio"
                          name="future_clinical"
                          label="No"
                          onChange={(e) =>
                            handleChange(e, "clinical_practice", "no")
                          }
                          checked={
                            formInputs?.clinical_practice?.future_clinical ==
                            "no"
                          }
                        />
                        {error?.future_clinical ? (
                          <div className="login-validation">
                            {error?.future_clinical}
                          </div>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label column sm={12} className="label-main">
                        3. Would you recommend Clinical Practice to a colleague?
                      </Form.Label>
                      <Col sm={12} className="d-flex flex-wrap mb-3">
                        <Form.Check
                          type="radio"
                          name="recommend_clinical"
                          label="Yes"
                          onChange={(e) => handleChange(e, "recommend", "yes")}
                          checked={
                            formInputs?.recommend?.recommend_clinical == "yes"
                          }
                        />

                        <Form.Check
                          type="radio"
                          name="recommend_clinical"
                          label="No"
                          onChange={(e) => handleChange(e, "recommend", "no")}
                          checked={
                            formInputs?.recommend?.recommend_clinical == "no"
                          }
                        />
                        {error?.recommend_clinical ? (
                          <div className="login-validation">
                            {error?.recommend_clinical}
                          </div>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label column sm={12} className="label-main">
                        4. Please suggest a topic for a future Clinical Practice
                        patient case:
                      </Form.Label>
                      <Col sm={12} className="d-flex flex-wrap">
                        <Form.Control
                          as="textarea"
                          aria-label="With textarea"
                          name="suggestion"
                          value={
                            formInputs?.suggestion ? formInputs?.suggestion : ""
                          }
                          onChange={(e) => handleChange(e)}
                        />
                         {error?.suggestion ? (
                        <div className="login-validation">
                          {error?.suggestion}
                        </div>
                      ) : (
                        ""
                      )}
                      </Col>
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

export default SurveyCheck8Question;
