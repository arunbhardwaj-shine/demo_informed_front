import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AliceCarousel from "react-alice-carousel";
import { Link, useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { loader } from "../../../loader";
import React, { useEffect, useState, useRef } from "react";
import { postData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import SimpleReactValidator from "simple-react-validator";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  Button,
  Col,
  Dropdown,
  Modal,
  DropdownButton,
  Form,
  Row,
  ProgressBar,
  Tab,
  Tabs,
} from "react-bootstrap";
import Select from "react-select";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const SetPopup = (props) => {
  const { state } = useLocation();
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [getTemplateLanguage, setTemplateLanguage] = useState([]);
  const [actualTemplateData, setActualTemplateData] = useState([]);
  const [isTemplateData, setIsTemplateData] = useState(true);
  const [isOnline, setIsOnline] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [countryOption, setCountryOption] = useState(0);
  const [templateSaving, setTemplateSaving] = useState("");
  const [templateClickedd, setTemplateClicked] = useState(false);
  const [newTemplateClicked, setNewTemplateClicked] = useState(false);
  const [templateList, setTemplateList] = useState([]);
  const [editableTemplate, setEdiatbleTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateId, setTemplateId] = useState();
  const [popupNo, setPopupNo] = useState();
  const [validator] = React.useState(new SimpleReactValidator());
  const [activeIndex, setActiveIndex] = useState(0);
  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const [selectedIbu, setSelectedIbu] = useState("");
  const syncActiveIndex = ({ item }) => setActiveIndex(item);
  const [template, setTemplate] = useState("");
  const [newTemplateName, setNewTemplateName] = useState("");
  const [getTemplatePopup, setTemplatePopup] = useState(false);
  const [getNewTemplatePopup, setNewTemplatePopup] = useState(false);
  const [articleId, setArticleId] = useState(
    typeof state?.pdfId !== "undefined" ? state?.pdfId : "3846"
  );
  const [selectOptions, setSelectOptions] = useState({
    consentType: "",
    language: "",
    time: "",
  });

  const [popupData, setPopupData] = useState();

  const [types, setTypes] = useState([
    { value: "Online", label: "Online" },
    { value: "Offline", label: "Offline" },
    { value: "Sunshine", label: "Sunshine" },
  ]);

  const [timeList, setTimeList] = useState([
    { value: "5", label: "5 Second" },
    { value: "10", label: "10 Second" },
    { value: "15", label: "15 Second" },
    { value: "20", label: "20 Second" },
    { value: "25", label: "25 Second" },
    { value: "2500", label: "No Pop-up" },
  ]);

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };

  useEffect(() => {
    getTemplateListData(0, "All", "");
    
    
   // div_img.click();
  }, []);

  const dropDownSelected = (label, e) => {
    if (label == "consentType") {
      loader("show");
      setSelectOptions({ ...selectOptions, consentType: e.value });
      getTemplateListData(1, selectOptions.language, e.value);
    } else if (label == "language") {
      loader("show");
      setSelectOptions({ ...selectOptions, language: e.value });
      getTemplateListData(2, e.value, selectOptions.consentType);
    } else {
      setSelectOptions({ ...selectOptions, time: e.value });
    }
    // setSelectedLanguage(e.value);
    // getTemplateListData(2, e.value, selectedIbu);
  };

  const getTemplateListData = async (flag = 1, lng, consent) => {
      console.log(lng);
      console.log(consent);
      loader("show");

      try {
        setTemplateClicked(false);
        let check_lng_index = 10;
        if (lng == "All") {
          check_lng_index = 10;
        } else if (lng == "English") {
          check_lng_index = 0;
        } else if (lng == "Italian") {
          check_lng_index = 1;
        } else if (lng == "Germany") {
          check_lng_index = 2;
        } else if (lng == "Spanish") {
          check_lng_index = 3;
        } else if (lng == "Russian") {
          check_lng_index = 4;
        }

        if (typeof articleId === "undefined") {
          if (state?.pdfId) {
            setArticleId(state?.pdfId);
          }
        }

        let res;
        if (flag === 1 || flag === 0) {
          if (isTemplateData) {
            // Fetch the template data from the server
            const body = {
              userId: localStorage.getItem("user_id"),
              language: check_lng_index,
              consentType: consent,
              pdfId:
                typeof state?.pdfId !== "undefined" ? state?.pdfId : articleId,
            };
            res = await postData(ENDPOINT.LIBRARYGETPOPUP, body);
            setActualTemplateData(res);
            setPopupData(res?.data?.data);
            setIsTemplateData(false);
            setSelectOptions({
              consentType: res?.data?.data?.linkType,
              language: res?.data?.data?.selectedLanguage,
              time: res?.data?.data?.time,
            });

            if (res?.data?.data) {
              let lang = res?.data?.data?.language;
              let lng_arr = [];
              Object.entries(lang).map(([index, item]) => {
                let label = item;
                lng_arr.push({
                  value: item,
                  label: label.toUpperCase(),
                });
              });
              setTemplateLanguage(lng_arr);
            }
            setTemplateId(res?.data?.data?.popupTempId);
          } else {
            res = actualTemplateData;
          }

          let data = [];
          if (consent == "Online") {
            setIsOnline(true);
            data = [];
          } else if (consent == "Offline") {
            setIsOnline(false);

            data.push(res?.data?.data?.popupData[0]);
            data.push(res?.data?.data?.popupData[3]);
          } else {
            setIsOnline(false);

            data = res?.data?.data?.popupData;
          }
          setTemplateList(data);
          loader("hide");
          const div_img = document.querySelector("#template_dyn1");
             div_img.click()
           
        } else if (flag === 2) {
          const body = {
            userId: localStorage.getItem("user_id"),

            language: check_lng_index,

            consentType: consent,

            pdfId: typeof state?.pdfId !== "undefined" ? state?.pdfId : articleId,
          };

          const res = await postData(ENDPOINT.LIBRARYGETPOPUP, body);

          setTemplateList(res?.data?.data?.popupData);
          loader("hide");
          setTemplateId(res?.data?.data?.popupTempId);
        }
      } catch (err) {
        loader("hide");
      }
    };

  const saveTemplateEdit = (e) => {
    console.log(e);
  };

  const closeTemplateEdit = (e) => {
    e.preventDefault();
  };

  const templateClicked = (template, e) => {
    const div = document.querySelector("img.select_mm");
    setNewTemplateClicked(false);
    if (div) {
      div.classList.remove("select_mm");
    }
    setTemplateClicked(true);
    setTemplateName(template.name);
    setNewTemplateName(template.name);
    setTemplate(template.source_code);
    setPopupNo(template.popupNo);
    e.target.classList.toggle("select_mm");
  };

  const updateTemplate = async (e) => {
    e.preventDefault();
    let findTemplateIndex = templateList.findIndex(
      (el) => el.popupNo === popupNo
    );
    templateList[findTemplateIndex].source_code = templateSaving;
    setTemplateList(templateList);
    toast.success("Popup Update successfully.");
  };

  const nextButtonClicked = async () => {
    loader("show");
    try {
      let first = templateList.findIndex((el) => el.popupNo === 1);
      let second = templateList.findIndex((el) => el.popupNo === 2);
      let third = templateList.findIndex((el) => el.popupNo === 3);
      let fourth = templateList.findIndex((el) => el.popupNo === 4);

      let body = {
        user_id: localStorage.getItem("user_id"),
        pdfId: articleId,
        language: selectOptions.language,
        firstPopupTime: selectOptions.time,
        consentType: selectOptions.consentType,
        htmlEditor1: templateList?.[first]?.source_code,
        htmlEditor2: templateList?.[second]?.source_code,
        htmlEditor3: templateList?.[third]?.source_code,
        htmlEditor4: templateList?.[fourth]?.source_code,
      };
      const res = await postData(ENDPOINT.LIBRARYSAVEPOPUP, body);
      loader("hide");
      if (state?.fileType != "video") {
        navigate("/preview-content", {
          state: { pdfId: articleId },
        });
      } else {
        navigate("/content-detail", {
          state: { pdfId: articleId },
        });
      }

      // navigate("/preview-content")
    } catch (err) {
      loader("hide");
    }
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

  return (
    <>
      <div className="col right-sidebar">
        {popupData ? (
          <div className="custom-container">
            <Row>
              {articleId ? (
                <>
                  <div className="page-top-nav">
                    <Row className="justify-content-end align-items-center">
                      <Col md="1">
                        <div className="header-btn-left">
                          <Link className="btn btn-primary btn-bordered back-btn" to="/library-create">
                            <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z" fill="#97B6CF"/>
                            </svg>
                          </Link>
                          {/* <Link
                            className="btn btn-primary btn-bordered back"
                            to="/library-create-user"
                          >
                            Back
                          </Link> */}
                        </div>
                      </Col>
                      <Col md="9">
                        <ul className="tabnav-link">
                          <li className="">
                            <a href="">Create Your Content</a>
                          </li>
                          <li className="active active-main">
                            <a href="">Edit Consent Option</a>
                          </li>
                          <li className="">
                            <a href="">Preview Your Content &amp; Publish</a>
                          </li>
                        </ul>
                      </Col>
                      <Col md="2">
                        <div className="header-btn">
                          <Link
                            className="btn btn-primary btn-bordered move-draft"
                            to="/library-content"
                          >
                            Cancel
                          </Link>

                          <Button
                            className="btn btn-primary btn-filled next"
                            onClick={nextButtonClicked}
                          >
                            Next
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </>
              ) : (
                <div className="top-header">
                  <div className="page-title">
                    <h2>Set Pop-up</h2>
                  </div>
                  <div className="top-right-action">
                    <div className="header-btn">
                      <Button
                        className="btn-bordered cancel"
                        onClick={() => navigate("/library-create")}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              <div className="template_builder-option library-cosent">
                <div className="d-flex justify-content-start align-items-center">
                  {articleId && types.length > 0 && (
                    <div className="template_language">
                      <span>
                        Consent type
                        <LinkWithTooltip tooltip="Select Popup Type." href="#">
                          <img
                            src={path_image + "info_circle_icon.svg"}
                            alt="refresh-btn"
                          />
                        </LinkWithTooltip>
                      </span>

                      <div className="form-group">
                        <Select
                          options={types}
                          defaultValue={
                            popupData?.linkType
                              ? {
                                  label: popupData?.linkType,
                                  value: popupData?.linkType,
                                }
                              : {
                                  label: "Select the Consent type",
                                  value: "",
                                }
                          }
                          onChange={(e) => dropDownSelected("consentType", e)}
                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                        />
                      </div>
                    </div>
                  )}

                  {getTemplateLanguage.length > 0 && (
                    <div className="template_language">
                      <span>
                        Language
                        <LinkWithTooltip
                          tooltip="Select Popup Language."
                          href="#"
                        >
                          <img
                            src={path_image + "info_circle_icon.svg"}
                            alt="refresh-btn"
                          />
                        </LinkWithTooltip>
                      </span>

                      <div className="form-group">
                        <Select
                          defaultValue={
                            popupData?.selectedLanguage
                              ? {
                                  label: popupData?.selectedLanguage,
                                  value: popupData?.selectedLanguage,
                                }
                              : {
                                  label: "Select Language",
                                  value: "",
                                  //  typeof getTemplateLanguage[countryOption] ===
                                  //   "undefined"
                                  //     ? "Select Language"
                                  //     : getTemplateLanguage[countryOption]
                                }
                          }
                          placeholder={
                            typeof getTemplateLanguage[countryOption] ===
                            "undefined"
                              ? "Select Language"
                              : getTemplateLanguage[countryOption]
                          }
                          onChange={(e) => dropDownSelected("language", e)}
                          options={getTemplateLanguage}
                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                        />
                      </div>
                    </div>
                  )}

                  {articleId && timeList.length > 0 && (
                    <div className="template_language">
                      <span>
                        Time
                        <LinkWithTooltip tooltip="Select Popup Time." href="#">
                          <img
                            src={path_image + "info_circle_icon.svg"}
                            alt="refresh-btn"
                          />
                        </LinkWithTooltip>
                      </span>

                      <div className="form-group">
                        <Select
                          defaultValue={
                            popupData?.time
                              ? timeList[
                                  timeList.findIndex(
                                    (el) => el.value == popupData?.time
                                  )
                                ]
                              : {
                                  label: "Select time (in seconds)",
                                  value: "",
                                }
                          }
                          onChange={(e) => dropDownSelected("time", e)}
                          options={timeList}
                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <section className="select-mail-template library-cosent">
                <div className="custom-container">
                  <Row>
                    {isOnline == false ? (
                      <>
                        <div className="page-title">
                          <h4>Select the Pop-up to edit</h4>
                        </div>

                        <AliceCarousel
                          mouseTracking
                          disableDotsControls
                          activeIndex={activeIndex}
                          responsive={responsive}
                          onSlideChanged={syncActiveIndex}
                        >
                          {templateList.map((template) => {
                            return (
                              <>
                                <div
                                  className="item"
                                  onClick={(e) => templateClicked(template, e)}
                                >
                                  <img
                                    id={"template_dyn" + template.popupNo}
                                    src={
                                      process.env.REACT_APP_API_KEY_NEW_DESIGN +
                                      "/" +
                                      template.template_img
                                    }
                                    alt=""
                                    className={
                                      typeof templateId !== "undefined" &&
                                      templateId == template.popupNo
                                        ? ""
                                        : ""
                                    }
                                  />
                                  <p>{template.name}</p>
                                </div>
                              </>
                            );
                          })}
                        </AliceCarousel>
                      </>
                    ) : null}
                    <input
                      type="hidden"
                      id="mail_template"
                      value={templateId}
                    />
                    <div className="email-form">
                      <Form>
                        <div className="form-inline row justify-content-between align-items-center"></div>
                        <div className="form-inline row justify-content-end align-items-center">
                          <div className="form-group template_builder_div col-12 col-md-12">
                            {templateName != "" && (
                              <>
                                {isOnline == false && (
                                  <div className="template_name">
                                    <h4>{templateName}</h4>
                                  </div>
                                )}
                              </>
                            )}
                            {editableTemplate ? (
                              <div className="form-buttons form-buttons-template right-sided">
                                <Button
                                  className="btn btn-primary btn-filled"
                                  onClick={(e) => saveTemplateEdit(e)}
                                >
                                  Save
                                </Button>
                                <Button
                                  className="btn btn-primary btn-bordered"
                                  onClick={(e) => closeTemplateEdit(e)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <div className="form-buttons form-buttons-template right-side">
                                {templateClickedd ? (
                                  <>
                                    <Button
                                      className="btn btn-primary btn-filled"
                                      onClick={(e) => {
                                        updateTemplate(e);
                                        e.preventDefault();
                                      }}
                                    >
                                      Save
                                    </Button>
                                  </>
                                ) : null}
                              </div>
                            )}
                          </div>
                        </div>
                      </Form>
                    </div>
                  </Row>

                  <Row>
                    {templateClickedd ? (
                      <Editor
                        apiKey="g2adjiwgk9zbu2xzir736ppgxzuciishwhkpnplf46rni4g8"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={template}
                        init={{
                          menubar:
                            "file edit view insert format tools table help",
                          plugins:
                            "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
                          toolbar:
                            "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          content_css: [
                            "https://docintel.app/react_informed.css",
                            "https://use.fontawesome.com/releases/v5.8.2/css/all.css",
                          ],
                        }}
                      
                        onEditorChange={(content) => {
                          setTemplateSaving(content);
                        }}
                      />
                    ) : null}
                  </Row>
                </div>
              </section>
            </Row>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SetPopup;
