import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { surveyAxiosInstance } from "./CommonFunctions/CommonFunction";
import { uploadImageToServer } from "./CommonFunctions/CommonFunction";
import { loader } from "../../loader";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import { saveAsDraft } from "./CommonFunctions/CommonFunction";
import { getSurveyData } from "../../actions";
import { connect } from "react-redux";

import QuestionEditor from "./SurveyComponents/QuestionEditor";
var surveyValues = {};
const ThanksPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [thanksPageData, setThanksPageData] = useState({
    thanksImgPath: surveyValues?.thanksPageData?.thanku_image_path || "",
    imageWidth: surveyValues?.thanksPageData?.thanku_image_width || 20,
    headline: surveyValues?.thanksPageData?.thanku_image_headline || "Thank You!",
    bodyText:
      surveyValues?.thanksPageData?.thanku_body_text ||
      "For taking the time for this survey. Your opinion matters greatly to us and we love learning from you",
  });

  const [headingToogle, setHeadingtoogle] = useState(true);

  const survey_id = surveyValues?.survey_id;

  const updatePageData = (key, value) => {
    setThanksPageData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateheadline = (index, field, value) => {
    setThanksPageData((prev) => ({
      ...prev,
      headline: value,
    }));
  };

  const nextButtonClicked = async (e) => {
    e.preventDefault();

    try {
  
      surveyValues = {
        ...surveyValues,
        thanksPageData: {
          thanku_image_path: headingToogle ? thanksPageData.thanksImgPath : "",
          thanku_image_width: headingToogle ? thanksPageData.imageWidth : 0,
          thanku_image_headline: thanksPageData.headline,
          thanku_body_text: thanksPageData.bodyText,
        },
      };
      props.getSurveyData({...surveyValues});
      
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };

 

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Col className="right-sidebar custom-change survey-builder">
        <div className="container-fluid">
          <Row>
            <div className="survey-engine d-flex w-100">
              <div className="left-setup">
                <div className="left-setup-options">
                  <div className="left-setup-format">
                    <div className="left-setup-heading">
                      <h5>Thank you</h5>
                      <p>
                        Thank you page will be shown after the user submits the
                        survey
                      </p>
                    </div>
                    <div className="live-stream-tabs-data thanks">
                      <div className="survey-active-data thank">
                        <div className="steps">
                          <div className="d-flex align-items-center justify-content-between">
                            <p class="option-heading">Image</p>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              checked={headingToogle}
                              onChange={() => setHeadingtoogle(!headingToogle)}
                            />
                          </div>
                          {headingToogle && (
                            <div className="d-flex align-items-center">
                              <div className="img-preview thank-img">
                                {thanksPageData.thanksImgPath != "" ? (
                                  <img
                                    src={thanksPageData.thanksImgPath}
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    src={path_image + "thanks-img.png"}
                                    alt=""
                                  />
                                )}
                              </div>

                              <div className="input-file-container">
                                <input
                                  type="file"
                                  name="file"
                                  className="input-file"
                                  onInput={async (e) => {
                                    const result = await uploadImageToServer(
                                      e.target.files[0]
                                    );
                                    updatePageData("thanksImgPath", result);
                                  }}
                                ></input>
                                <label
                                  tabindex="0"
                                  for="my-file"
                                  class="input-file-trigger"
                                >
                                  Change Image
                                </label>
                              </div>
                            </div>
                          )}
                          {headingToogle && (
                            <div className="words-limit">
                              <p class="option-heading">image Width (%)</p>
                              <input
                                placeholder="45"
                                type="number"
                                class="form-control"
                                value={thanksPageData.imageWidth}
                                onChange={(e) => {
                                  const value = Math.max(
                                    0,
                                    Math.min(100, parseInt(e.target.value, 10))
                                  );
                                  updatePageData("imageWidth", value);
                                }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="steps">
                          <div className="d-flex align-items-center justify-content-between">
                            <p class="option-heading">Headline</p>
                          </div>
                          <div className="toolbar-group">
                            <div className="text-editor">
                              <QuestionEditor
                                value={thanksPageData.headline}
                                handleUpdateElement={updateheadline}
                                index={"headline"}
                                Placeholder=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="steps">
                          <div className="w-100">
                            <Form.Label>Body Text</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              value={thanksPageData.bodyText}
                              placeholder="Enter text"
                              typeof="text"
                              onChange={(e) =>
                                updatePageData("bodyText", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="top-right-action preview">
                <div className="d-flex flex-column w-100">
                  <div className="page-top-nav sticky">
                    <Row className="justify-content-end align-items-center">
                      <Col md={1}>
                        <div className="header-btn-left">
                          <Link
                            className="btn btn-primary btn-bordered back"
                            to="/survey/form-builder"
                          >
                            Back
                          </Link>
                        </div>
                      </Col>
                      <Col md={8}>
                        <ul className="tabnav-link">
                          <li className="active">
                            <Link to="/survey/survey-builder"> Set-up</Link>
                          </li>
                          <li className="active">
                            <Link to="/survey/survey-configure">
                              {" "}
                              Survey config
                            </Link>
                          </li>
                          <li className="active">
                            <Link to="/survey/form-builder"> Build survey</Link>
                          </li>
                          <li className="active active-main">
                            <a href="#">Thank you</a>
                          </li>
                          <li className="">
                            <a href="">Preview</a>
                          </li>
                        </ul>
                      </Col>
                      <Col md={3}>
                        <div className="header-btn">
                          <Link
                            className="btn btn-primary btn-bordered move-draft"
                            to="/survey/survey-list"
                          >
                            Cancel
                          </Link>

                          <button
                            className="btn btn-primary btn-bordered next"
                            onClick={async (e) => {
                             await nextButtonClicked(e);
                              saveAsDraft(e, 0,location.pathname,navigate);
                             
                            }}
                          >
                            Save As Draft
                          </button>
                          <button
                            className="btn btn-primary btn-filled next "
                            onClick={(e) => {
                              nextButtonClicked(e);
                              navigate("/survey/survey-preview");
                            }}
                          >
                            Next
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="preview-survey">
                    <div className="survey-thanks">
                      {headingToogle && (
                        <div className="thanks-img">
                          {thanksPageData.thanksImgPath != "" ? (
                            <img
                              src={thanksPageData.thanksImgPath}
                              alt=""
                              style={{ width: thanksPageData.imageWidth + "%" }}
                            />
                          ) : (
                            <img
                              src={path_image + "thanks-img.png"}
                              alt=""
                              style={{ width: thanksPageData.imageWidth + "%" }}
                            />
                          )}
                        </div>
                      )}
                      <div
                        className="thanks-text"
                        style={{ textAlign: "center" }}
                      >
                   
                        <h2
                          style={{
                            fontWeight: "500",
                            color: "#004A89",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: thanksPageData.headline,
                          }}
                        />
                        <p
                          style={{
                            color: "#70899E"
                          }}
                        >
                          {thanksPageData.bodyText}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

const mapStateToProps = (state) => {
  surveyValues = state?.getSurveyData;
   
  return state;
};

export default connect(mapStateToProps, { getSurveyData: getSurveyData })(
  ThanksPage
);
