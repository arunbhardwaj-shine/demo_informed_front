import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Row, Tab, Tabs, Tooltip } from "react-bootstrap";
import { saveAsDraft } from "./CommonFunctions/CommonFunction";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import { connect } from "react-redux";
import { getSurveyData } from "../../actions";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { loader } from "../../loader";
import { surveyAxiosInstance } from "./CommonFunctions/CommonFunction";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
var surveyValues = {};
const SurveyConfig = (props) => {
  const [elements, setElements] = useState([]);
  // let path = process.env.REACT_APP_ASSETS_PATH_INFORMED;
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [surveyLink, setSurveyLink] = useState("");
  const navigate = useNavigate();

  const selectOptions = [
    { value: 1, label: "Prefill registered user consent data" },
    { value: 2, label: "Don’t prefill registered user consent data" },
  ];

  const [formData, setFormData] = useState({
    selectedThumbnailFilePath: null,
    surveyLinkTitle:  surveyValues?.setUpData?.survey_title,
    surveyLinkDescription: "",
    consentType: "No consent needed (anonymous)", // default value
    informedEmail:selectOptions[0],
    informedGo:selectOptions[1],
  });

  const fileInputRef = useRef(null);

  const location = useLocation();
  const survey_id = surveyValues?.survey_id;

  const fetchSurveyListing = () => {
    setSurveyLink(surveyValues?.unique_code ?? "");
    if (surveyValues.surveyConfigData) {
      setFormData((prevData) => ({
        ...prevData,
        surveyLinkTitle:
          surveyValues?.surveyConfigData?.survey_link_title ||
          surveyValues?.setUpData?.survey_title,
        selectedThumbnailFilePath:
          surveyValues?.surveyConfigData?.survey_thumbnail || "",
        surveyLinkDescription:
          surveyValues?.surveyConfigData?.survey_link_description || "",
        consentType: surveyValues?.surveyConfigData?.survey_consent,
        informedEmail: surveyValues?.surveyConfigData?.informedEmail == 1 ? selectOptions[0] : selectOptions[1],
        informedGo: surveyValues?.surveyConfigData?.informedGo == 1 ? selectOptions[0] : selectOptions[1]
      }));
    }
  };

  useEffect(() => {
    fetchSurveyListing();
  }, []);

  const addElement = (type) => {
    const newElement = {
      type: type,
      id: elements.length,
      questionType: type,
      questionLabel: "",
      questionDescriptionEnabled: false,
      questionDescription: "",
      isOptional: false,
      addOtherChoice: false,
      questionOptions: [""],
      fontSize: 12,
      isBold: false,
      isItalic: false,
      isUnderline: false,
    };
    setElements([...elements, newElement]);
  };

  const handleDrop = (e) => {
    const type = e.dataTransfer.getData("type");
    addElement(type);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleThumbnailFileChange = async (e) => {
    const file = e.target.files[0];
    try {
      if (file && file.type.startsWith("image/")) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        loader("show");
        const response = await surveyAxiosInstance.post(
          "/survey/image-uploadaws",
          uploadFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setFormData((prevData) => ({
          ...prevData,
          selectedThumbnailFilePath: response?.data?.data,
        }));
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error("Please select valid image file");
      }
      loader("hide");
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
      // Handle error
    }
  };

  const copyHandler = () => {
    navigator.clipboard
      .writeText(`https://survey.docintel.app/survey.html?Utmde=${surveyLink}`)
      .then(() => {
        toast.success("Survey Link Copied");
      })
      .catch((err) => {
        toast.error("Failed to copy Survey Link");
      });
  };

  const handleInputChange = (e, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };
  function LinkWithTooltip({ id, children, href, tooltip }) {
    return (
      <OverlayTrigger
        overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
        placement="top"
        delayShow={300}
        delayHide={150}
      >
        <a href={href}>{children}</a>
      </OverlayTrigger>
    );
}
//   const handleDropdownchange=(e,selectType)=>{
// console.log(e)
//     if(selectType === "informed Email"){
//       if(e.value === 1){
//         setFormData((prevData) => ({
//           ...prevData,
//           informedEmail: e.value,
//         }));
//       }else{
//         setFormData((prevData) => ({
//           ...prevData,
//           informedEmail: 0,
//         }));
//       }
//     }else{
//       if(e.value === 1){
//         setFormData((prevData) => ({
//           ...prevData,
//           informedGo: e.value,
//         }));
//       }else{
//         setFormData((prevData) => ({
//           ...prevData,
//           informedGo: 0,
//         }));
//       }
//     }

//   }

const handleDropdownchange=(e,selectType)=>{
 
      if(selectType === "informed Email"){
       
          setFormData((prevData) => ({
            ...prevData,
            informedEmail: e,
          }));
        
      }else{
       
          setFormData((prevData) => ({
            ...prevData,
            informedGo: e,
          }));
       
      }
  
    }

  const nextButtonClicked = async (e) => {
    e.preventDefault();
    console.log(formData)

    try {
      surveyValues = {
        ...surveyValues,
        surveyConfigData: {
          survey_consent: formData.consentType,
          survey_thumbnail: formData.selectedThumbnailFilePath,
          survey_link_description: formData.surveyLinkDescription,
          survey_link_title: formData.surveyLinkTitle,
          informedEmail: formData.consentType === "No consent needed (anonymous)" ?2 : formData.informedEmail.value,
          informedGo: formData.consentType === "No consent needed (anonymous)" ?2 :formData.informedGo.value
        },
      };
      props.getSurveyData(surveyValues);
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
      // Handle error, e.g., show error message to user
    }
  };


  return (
    <Col className="right-sidebar custom-change survey-builder">
      <div className="container-fluid">
        <div className="row">
          <div className="survey-engine d-flex w-100">
            <div className="left-setup">
              {/* {currentTemplate ? */}
              <div className="left-setup-options">
                <div className="left-setup-format">
                  <div className="left-setup-heading">
                    <h5>Survey Config</h5>
                    <p>
                      Customize your survey link thumbnail to match your brand{" "}
                    </p>
                  </div>
                  <div className="live-stream-tabs-data">
                    <Tabs defaultActiveKey="link-thumbnail">
                      <Tab eventKey="link-thumbnail" title="Link Thumbnail">
                        <div className="survey-active-data">
                          <div className="steps">
                            <p className="option-heading">
                              Survey Link{" "}
                              <LinkWithTooltip tooltip="The link of the survey will work after publishing the survey.">
                                  <img
                                    src={
                                        path_image +
                                        "info_circle_icon.svg"
                                    }
                                    alt="refresh-btn"
                                    />
                                </LinkWithTooltip>
                            </p>
                            <div className="tab-content-links">
                              <a
                                href={`https://survey.docintel.app/survey?Utmde=${surveyLink}`}
                                className="doc-link"
                                target="_blank"
                              >
                                https://survey.docintel.app/survey?Utmde={surveyLink}
                              </a>
                              <span className="copy-content">
                                <img
                                  src={path_image + "copy-content.svg"}
                                  alt="Copy"
                                  onClick={copyHandler}
                                />
                              </span>
                            </div>
                          </div>
                          <div className="steps">
                            <p className="option-heading">Thumbnail Image</p>
                            <div className="header-added">
                              <div className="d-flex align-items-center">
                                <div className="img-added">
                                  {formData?.selectedThumbnailFilePath ? (
                                    <img
                                      src={formData?.selectedThumbnailFilePath}
                                      alt=""
                                    />
                                  ) : (
                                    <img
                                      src={path_image + "add-thumbnail.png"}
                                      alt=""
                                    />
                                  )}
                                </div>

                                <div className="input-file-container">
                                  <input
                                    type="file"
                                    name="file"
                                    className="input-file"
                                    onChange={handleThumbnailFileChange}
                                    ref={fileInputRef} // Attach ref to the input element
                                  ></input>
                                  <label
                                    tabindex="0"
                                    for="my-file"
                                    className="input-file-trigger"
                                  >
                                    {formData?.selectedThumbnailFilePath
                                      ? "Change Thumbnail"
                                      : "+ Add Thumbnail"}
                                  </label>
                                  {formData?.selectedThumbnailFilePath && (
                                    <Button
                                      className="remove"
                                      onClick={() => {
                                        setFormData((prevData) => ({
                                          ...prevData,
                                          selectedThumbnailFilePath: "",
                                        }));
                                      }}
                                    >
                                      <img
                                        src={path_image + "delete-icon.svg"}
                                        alt=""
                                      />
                                    </Button>
                                  )}
                                  <br />
                                  <span>
                                    The way you see your link thumbnail it may
                                    different in other platform it depends on
                                    the platform that you will share it in{" "}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="w-100">
                              <Form.Label>Survey Link title</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Survey Link title"
                                value={formData.surveyLinkTitle}
                                onChange={(e) =>
                                  handleInputChange(e, "surveyLinkTitle")
                                }
                              />
                            </div>
                            <div className="w-100">
                              <Form.Label>Survey Link Description</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Survey Link Description"
                                value={formData.surveyLinkDescription}
                                onChange={(e) =>
                                  handleInputChange(e, "surveyLinkDescription")
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="survey-consent" title="Survey Consent">
                        <div className="survey-setup">
                          <div className="steps">
                            <div className="d-flex align-items-start flex-column">
                              <p className="option-heading survey-consent">
                                Survey Consent Type{" "}
                                <LinkWithTooltip tooltip="You choose whether you want HCPs to register or not. You can also choose to require registration based on the delivery channel they use to access.">
                                  <img
                                    src={
                                        path_image +
                                        "info_circle_icon.svg"
                                    }
                                    alt="refresh-btn"
                                    />
                                </LinkWithTooltip>
                              </p>
                              <div className="check-group">
                                <Form.Group className="d-flex flex-column">
                                  <label className="check" checked>
                                    Mandatory consent
                                    <input
                                      type="radio"
                                      name="group1"
                                      value="Mandatory consent"
                                      checked={
                                        formData.consentType ===
                                        "Mandatory consent"
                                      }
                                      onChange={(e) =>
                                        handleInputChange(e, "consentType")
                                      }
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                  <label className="check">
                                    Optional consent
                                    <input
                                      type="radio"
                                      name="group1"
                                      value="Optional consent"
                                      checked={
                                        formData.consentType ===
                                        "Optional consent"
                                      }
                                      onChange={(e) =>
                                        handleInputChange(e, "consentType")
                                      }
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                  <label className="check">
                                    No consent needed (anonymous)
                                    <input
                                      type="radio"
                                      name="group1"
                                      value="No consent needed (anonymous)"
                                      checked={
                                        formData.consentType ===
                                        "No consent needed (anonymous)"
                                      }
                                      onChange={(e) =>
                                        handleInputChange(e, "consentType")
                                      }
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                </Form.Group>
                              </div>
                            </div>
                          </div>
                          <div className="steps">
                            <p className="option-heading">
                              Survey delivery channels:{" "}
                              {/* <img
                                src={path_image + "info_circle_icon.svg"}
                                alt=""
                              /> */}
                            </p>
                            <div className="choice-option consent-listed">
                              <div className="consent-choice d-flex align-items-center">
                                <Form.Label>
                                  InforMed Email{" "}
                                  {/* <img
                                    src={path_image + "info_circle_icon.svg"}
                                    alt=""
                                  /> */}
                                </Form.Label>
                                {formData.consentType ===
                                "No consent needed (anonymous)" ? (
                                  <p>{formData.consentType}</p>
                                ) : (
                                  <Select
                                    aria-label="Survey consent"
                                    className="dropdown-basic-button split-button-dropup"
                                    name="surveyConsent"
                                    value={formData.informedEmail}
                                    options={selectOptions}
                                  
                                    onChange={(e) =>
                                      handleDropdownchange(e, "informed Email")
                                      }
                                  />
                                )}
                              </div>
                              <div className="consent-choice d-flex align-items-center">
                                <Form.Label>
                                  InforMedGo{" "}
                                  {/* <img
                                    src={path_image + "info_circle_icon.svg"}
                                    alt=""
                                  /> */}
                                </Form.Label>
                                {formData.consentType ===
                                "No consent needed (anonymous)" ? (
                                  <p>{formData.consentType}</p>
                                ) : (
                                  <Select
                                    aria-label="Survey consent"
                                    className="dropdown-basic-button split-button-dropup"
                                    name="surveyConsent"
                                    options={selectOptions}
                                    value={formData.informedGo}
                                     onChange={(e) =>
                                      handleDropdownchange(e)
                                      }
                                  />
                                )}
                              </div>
                              <div className="consent-choice d-flex align-items-center">
                                <Form.Label>
                                  QR{" "}
                                  {/* <img
                                    src={path_image + "info_circle_icon.svg"}
                                    alt=""
                                  /> */}
                                </Form.Label>
                                <p>{formData.consentType}</p>
                              </div>
                              <div className="consent-choice d-flex align-items-center">
                                <Form.Label>
                                  Webpage{" "}
                                  {/* <img
                                    src={path_image + "info_circle_icon.svg"}
                                    alt=""
                                  /> */}
                                </Form.Label>
                                <p>{formData.consentType}</p>
                              </div>
                              <div className="consent-choice d-flex align-items-center">
                                <Form.Label>
                                  Direct{" "}
                                  {/* <img
                                    src={path_image + "info_circle_icon.svg"}
                                    alt=""
                                  /> */}
                                </Form.Label>
                                <p>{formData.consentType}</p>
                              </div>
                              <div className="consent-choice d-flex align-items-center">
                                <Form.Label>
                                  Social media{" "}
                                  {/* <img
                                    src={path_image + "info_circle_icon.svg"}
                                    alt=""
                                  /> */}
                                </Form.Label>
                                <p>{formData.consentType}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`top-right-action preview `}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="d-flex flex-column w-100">
                <div className="page-top-nav sticky">
                  <Row className="justify-content-end align-items-center">
                    <Col md={1}>
                      <div className="header-btn-left">
                        <button
                          className="btn btn-primary btn-bordered back"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/survey/survey-builder", {
                              state: { survey_id: survey_id },
                            });
                          }}
                        >
                          Back
                        </button>
                      </div>
                    </Col>
                    <Col md={8}>
                      <ul className="tabnav-link">
                        <li className="active ">
                          <Link to="/survey/survey-builder"> Set-up</Link>
                        </li>
                        <li className="active active-main">
                          <Link to="">Survey config</Link>
                        </li>
                        <li className="">
                          <Link to="">Build survey</Link>
                        </li>

                        <li className="">
                          <Link to="">Thank you</Link>
                        </li>
                        <li className="">
                          <Link to="">Preview</Link>
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
                            saveAsDraft(e, 0, location.pathname, navigate);
                          }}
                        >
                          Save As Draft
                        </button>
                        <button
                          className="btn btn-primary btn-filled next "
                          onClick={async (e) => {
                            await nextButtonClicked(e);
                            navigate("/survey/form-builder", {
                              state: { survey_id: survey_id },
                            });
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="preview-survey">
                  {/* <div className="informed-survey">
                                        <div className="informed-survey-header">
                                            <img src={path_image + "informed_logo.svg"} alt="" />
                                            <h2>Headline Lorem ipsum dolorsit amet consectetur Orci</h2>
                                        </div>
                                        <div className="informed-survey-body">
                                            <div className="informed-survey-text">
                                                <p>Welcome to our survey! Your opinions matter. Help us improve by sharing your thoughts on [topic]. Your honest responses are invaluable. Thank you for your time!</p>
                                            </div>
                                            <div className="informed-survey-question">
                                                <form>
                                                    <p>
                                                        How is the weather today?
                                                    </p>
                                                    <label className="check">Sunny
                                                        <input type="radio" name="radio" />
                                                        <span className="checkmark"></span>
                                                    </label>

                                                    <label className="check">Rainy
                                                        <input type="radio" name="radio" />
                                                        <span className="checkmark"></span>
                                                    </label>

                                                    <label className="check">Snowy
                                                        <input type="radio" name="radio" />
                                                        <span className="checkmark"></span>
                                                    </label>

                                                    <label className="check">Cloudy
                                                        <input type="radio" name="radio" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <div className="form-footer">
                                                        <button type="button">Submit</button>
                                                        <span>Lorem ipsum dolor sit amet consectetur 2024</span>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div> */}
                  <div className="survey-config d-flex align-items-start">
                    <div className="survey-config-img">
                      {formData?.selectedThumbnailFilePath ? (
                        <img src={formData?.selectedThumbnailFilePath} alt="" />
                      ) : (
                        <img src={path_image + "add-thumbnail.png"} alt="" />
                      )}
                    </div>
                    <div className="survey-config-content">
                      <p className="survey-config-title">
                        {formData.surveyLinkTitle}
                      </p>
                      <p className="survey-config-discription">
                        {formData.surveyLinkDescription}
                      </p>
                      <a
                        className="survey-config-link no-click"
                        href={`https://survey.docintel.app/survey?Utmde=${surveyLink}`}
                      >
                       https://survey.docintel.app/survey?Utmde={surveyLink}
                      </a>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

const mapStateToProps = (state) => {
  surveyValues = state?.getSurveyData;
  return state;
};

export default connect(mapStateToProps, { getSurveyData: getSurveyData })(
  SurveyConfig
);
