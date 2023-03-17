import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AliceCarousel from "react-alice-carousel";
import { Link, useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { loader } from "../../../loader";
import React, { useEffect, useState, useRef } from "react";
import {postData} from "../../../axios/apiHelper";
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
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [getTemplateLanguage, setTemplateLanguage] = useState([]);
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
  const [articleId, setArticleId] = useState("3982");
  const [selectOptions, setSelectOptions] = useState({
    consentType: "",
    language: "",
    time: "",
  });

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
  }, []);

  const dropDownSelected = (label,e) => {
    if(label == "consentType"){
      loader("show");
      setSelectOptions({ ...selectOptions, consentType: e.value });
      getTemplateListData(2, selectOptions.language,e.value);
    }else if(label == "language"){
      loader("show");
      setSelectOptions({ ...selectOptions, language: e.value });
      getTemplateListData(2, e.value, selectOptions.consentType);
    }else{
      setSelectOptions({ ...selectOptions, time: e.value });
    }
    // setSelectedLanguage(e.value);
    // getTemplateListData(2, e.value, selectedIbu);
  };

  const getTemplateListData = async (flag, lng, consent) => {
    loader("show");
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

      const body = {
        userId: "18207",
        language: check_lng_index,
        consentType: consent,
        pdfId: ''
      };
      const res = await postData(ENDPOINT.LIBRARYGETPOPUP, body);
      setTemplateList(res?.data?.data?.popupData);
      setTemplateId(res?.data?.data?.popupTempId);
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
      loader("hide");
  };

  const saveTemplateEdit = (e) => {

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
    let findTemplateIndex = templateList.findIndex(el => el.popupNo === popupNo);
    if(findTemplateIndex){
        templateList[findTemplateIndex].source_code = templateSaving;
        setTemplateList(templateList);
        toast.success("Popup Update successfully.");
    }
  };

  const nextButtonClicked = async() => {
      let first  = templateList.findIndex(el => el.popupNo === 1);
      let second = templateList.findIndex(el => el.popupNo === 2);
      let third  = templateList.findIndex(el => el.popupNo === 3);
      let fourth = templateList.findIndex(el => el.popupNo === 4);

      let body = {
        userId : '18207',
        pdfId   : articleId,
        language    : selectOptions.language,
        firstPopupTime : selectOptions.time,
        consentType : selectOptions.consentType,
        htmlEditor1 : templateList?.[first]?.source_code,
        htmlEditor2 : templateList?.[second]?.source_code,
        htmlEditor3 : templateList?.[third]?.source_code,
        htmlEditor4 : templateList?.[fourth]?.source_code
      }
      console.log(body);
  }

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
        <div className="custom-container">
          <div className="row">

          {
            articleId ?
            <>
            <div className="page-top-nav">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    <button className="btn btn-primary btn-bordered back"
                    onClick={(e) => navigate("/library-create-user")}
                    >
                      Back
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-9">
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
                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <button className="btn btn-primary btn-bordered move-draft"
                    onClick={(e) => navigate("/library-create")}
                    >
                      Cancel
                    </button>

                    <button
                      className="btn btn-primary btn-filled next"
                      onClick={nextButtonClicked}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </>
            :
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
          }
            <div className="template_builder-option">
              <div className="d-flex justify-content-start align-items-center">

                {articleId && types.length > 0 && (
                  <div className="template_language">
                    <span>Consent type
                    <LinkWithTooltip
                      tooltip="Select Popup Type."
                      href="#"
                    >
                      <img
                        src={
                          path_image +
                          "info_circle_icon.svg"
                        }
                        alt="refresh-btn"
                      />
                    </LinkWithTooltip>
                    </span>

                    <div className="form-group">
                      <Select
                        defaultValue={{label: "Select your eprint type", value: ""}}
                        onChange={(e) => dropDownSelected("consentType",e)}
                        options={types}
                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                      />
                    </div>
                  </div>
                )}

                {getTemplateLanguage.length > 0 && (
                  <div className="template_language">
                    <span>Language
                    <LinkWithTooltip
                      tooltip="Select Popup Language."
                      href="#"
                    >
                      <img
                        src={
                          path_image +
                          "info_circle_icon.svg"
                        }
                        alt="refresh-btn"
                      />
                    </LinkWithTooltip>
                    </span>

                    <div className="form-group">
                      <Select
                        defaultValue={
                          typeof getTemplateLanguage[countryOption] ===
                          "undefined"
                            ? "Select Language"
                            : getTemplateLanguage[countryOption]
                        }
                        placeholder={
                          typeof getTemplateLanguage[countryOption] ===
                          "undefined"
                            ? "Select Language"
                            : getTemplateLanguage[countryOption]
                        }
                        onChange={(e) => dropDownSelected("language",e)}
                        options={getTemplateLanguage}
                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                      />
                    </div>
                  </div>
                )}

                {articleId && timeList.length > 0 && (
                  <div className="template_language">
                    <span>Time
                    <LinkWithTooltip
                      tooltip="Select Popup Time."
                      href="#"
                    >
                      <img
                        src={
                          path_image +
                          "info_circle_icon.svg"
                        }
                        alt="refresh-btn"
                      />
                    </LinkWithTooltip>
                    </span>

                    <div className="form-group">
                      <Select
                        defaultValue={{label: "Select time (in seconds)", value: ""}}
                        onChange={(e) => dropDownSelected("time",e)}
                        options={timeList}
                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="top-header">
              <div className="custom-container">
                <div className="row">
                  <div className="page-title">
                    <h5>Select the Pop-up to edit</h5>
                  </div>
                </div>
              </div>
            </div>

            <section className="select-mail-template">
              <div className="custom-container">
                <div className="row">
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
                              src={process.env.REACT_APP_API_KEY_NEW_DESIGN +"/"+ template.template_img}
                              alt=""
                              className={
                                typeof templateId !== "undefined" &&
                                templateId == template.popupNo
                                  ? "select_mm"
                                  : ""
                              }
                            />
                            <p>{template.name}</p>
                          </div>
                        </>
                      );
                    })}
                  </AliceCarousel>

                  <input type="hidden" id="mail_template" value={templateId} />
                  <div className="email-form">
                    <form>
                      <div className="form-inline row justify-content-between align-items-center"></div>
                      <div className="form-inline row justify-content-end align-items-center">
                        <div className="form-group template_builder_div col-12 col-md-12">
                          {templateName != "" && (
                            <>
                              { (
                                <div className="template_name">
                                  <h4>{templateName}</h4>
                                </div>
                              )}
                            </>
                          )}
                          {editableTemplate ? (
                            <div className="form-buttons form-buttons-template right-sided">
                              <button
                                className="btn btn-primary btn-filled"
                                onClick={(e) => saveTemplateEdit(e)}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-primary btn-bordered"
                                onClick={(e) => closeTemplateEdit(e)}
                              >
                                Cancel
                              </button>
                            </div>
                          ) :
                          <div className="form-buttons form-buttons-template right-side">
                                {templateClickedd ? (
                                  <>
                                    <button
                                      className="btn btn-primary btn-filled"
                                      onClick={(e) => {
                                        updateTemplate(e);
                                        e.preventDefault();
                                      }}
                                    >
                                      Save
                                    </button>
                                  </>
                                ) : null}
                              </div>
                        }
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="row">
                  {templateClickedd ? (
                    <Editor
                      apiKey="g2adjiwgk9zbu2xzir736ppgxzuciishwhkpnplf46rni4g8"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={template}
                      init={{
                        height: "100vh",
                        menubar:
                          "file edit view insert format tools table help",
                        plugins:
                          "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
                        toolbar:
                          "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        content_css: ['https://docintel.app/angular_cs.css','https://use.fontawesome.com/releases/v5.8.2/css/all.css'],
                      }}
                      onEditorChange={(content) => {
                        setTemplateSaving(content);
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      </>
  )
}


export default SetPopup;
