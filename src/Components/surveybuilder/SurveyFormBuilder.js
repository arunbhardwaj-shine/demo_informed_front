import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import SurveyTemplates from "./SurveyTemplates/SurveyTemplates";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loader } from "../../loader";
import { connect } from "react-redux";
import { getSurveyData } from "../../actions";
import QuestionEditor from "./SurveyComponents/QuestionEditor";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { saveAsDraft } from "./CommonFunctions/CommonFunction";
import { surveyAxiosInstance } from "./CommonFunctions/CommonFunction";
import { uploadImageToServer } from "./CommonFunctions/CommonFunction";
import html2canvas from "html2canvas";
const validExtensions = ["png", "jpeg", "jpg", "gif"];

var surveyValues = {};

const SurveyFormBuilder = (props) => {
  const [elements, setElements] = useState([]);
  // let path = process.env.REACT_APP_ASSETS_PATH_INFORMED;
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [templateDefaultValues, setTemplateDefaultValues] = useState({});

  const [index, setIndex] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setError({});
    setNewSavedTemplateName("")
  };
  const handleShow = () => setShow(true);

  const [templates, setTemplates] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [originalSelectedTemplate, setOriginalSelectedTemplate] = useState("");
  const [selectedTemplateHtml, setSelectedTemplateHtml] = useState("");
  const location = useLocation();
  const survey_id = surveyValues?.survey_id;
  const navigate = useNavigate();
  let customHtmlData = surveyValues?.formBuilderData?.custom_html?.[0];
  // console.log(customHtmlData);
  //edit portion
  const [customHtml, setCustomHtml] = useState({});
  const [dynamicValues, setDynamicValues] = useState({});
  const [header_background_type, setHeaderBackgroundType] = useState(null);
  const [userMadeChanges, setUserMadeChanges] = useState(true);
  const [changeLogoToggle, setChangeLogoToggle] = useState(
    customHtmlData?.changeLogoToggle ?? true
  );
  const [changeTitleToggle, setChangeTitleToggle] = useState(
    customHtmlData?.changeTitleToggle ?? true
  );
  const [changeFooterToggle, setChangeFooterToggle] = useState(true);
  const [changeBodyToggle, setChangeBodyToggle] = useState(true);
  const [headerImgPath, setHeaderImgPath] = useState("");
  const [headerLogoImgPath, setHeaderLogoImgPath] = useState("");
  const [newSavedTemplateName, setNewSavedTemplateName] = useState("");
  const [error, setError] = useState({});
  const [savednewCustomTempflag, setsavednewCustomTempflag] = useState(0);

  const updateTemplatesData = (updatedTemp, saveNewTemplate) => {
    if (customHtmlData && Object.keys(customHtmlData).length > 0) {
     
        const updatedData = updatedTemp.map((template) => {
      

          if (surveyValues?.formBuilderData?.template_id == template.id) {
     
            return { ...template, default_values: customHtmlData };
          } else {
       
            let updatedcustomhtmldata = {
              ...customHtmlData,
              header_background_image:
                template.default_values.header_background_image,
              header_background_type:
                template.default_values.header_background_type,
              header_background_color:
                template.default_values.header_background_color,
              template_name: template.default_values.template_name,
            };
            return { ...template, default_values: updatedcustomhtmldata };
          }
        });
        setTemplates(updatedData);
        setSelectedTemplateId(surveyValues?.formBuilderData?.template_id);
        setUserMadeChanges(true);
        customHtmlData = "";
        // setCustomHtml(customHtmlData ?? {});
      // }
    } else {
      setTemplates(updatedTemp);
      if (saveNewTemplate != 2 && !saveNewTemplate) {
        setSelectedTemplateId(1);
      }
    }
  };

  const fetchTemplate = async (saveNewTemplate) => {
    try {
      loader("show");

      const body = { account_id: 18207 };
      const response = await surveyAxiosInstance.post(
        "/survey/fetch-saved-template",
        body
      );

      if (response.status == 200) {
        var customTemplates = [];
        if (response.data.data.length > 0) {
          customTemplates = response.data.data.map((template) => {
            return {
              default_values: JSON.parse(template.custom_html)[0],
              template_html: template.raw_html,
              id: template.custom_saved_template_id,
              template_fileName: template.preview_thumbnail,
              template_uniquecode: template.random_String,
            };
          });
        }
        const updatedTemp = [...SurveyTemplates, ...customTemplates];
        updateTemplatesData(updatedTemp, saveNewTemplate);
      }
      if (!header_background_type) {
        setHeaderBackgroundType("color");
      }
      if (saveNewTemplate === 1) {
        setsavednewCustomTempflag(1);
      }
      loader("hide");
    } catch (error) {
      loader("hide");

      toast.error("Something went wrong");
    }
  };

  const handleNewTemplateName = (e) => {
    e.preventDefault();
    setNewSavedTemplateName(e.target.value);
    setError({});
  };

  useEffect(() => {
    fetchTemplate();
  }, [survey_id]);

  useEffect(() => {
    if (originalSelectedTemplate != "") {
      updateTemplateValues();
    }
  }, [
    dynamicValues,
    templateDefaultValues,
    changeFooterToggle,
    header_background_type,
    changeBodyToggle,
    changeTitleToggle,
    changeLogoToggle,
  ]);

  useEffect(() => {
    if (templates) {
      handleChoiceChange(selectedTemplateId); // Assuming 1 is a valid id you want to start
    }
  }, [selectedTemplateId]);

  useEffect(() => {
    if (savednewCustomTempflag) {
      setDynamicValues({});
      setTemplateDefaultValues({});
      setCustomHtml({});
      const getTemplateId = templates[templates.length - 1].id;
      setSelectedTemplateId(getTemplateId);
      handleChoiceChange(getTemplateId);
      setsavednewCustomTempflag(0);
    }
  }, [templates]);

  const updateDynamicValues = (templateDefaults) => {
    let customValues = { ...templateDefaults, ...dynamicValues };

    setHeaderBackgroundType(customValues?.header_background_type);

    const newValues = {
      template_name:
        customValues.template_name ?? templateDefaults.template_name,
      header_background_color:
        customValues?.header_background_color ??
        templateDefaults.header_background_color,
      header_background_image:
        customValues?.header_background_image ??
        templateDefaults.header_background_image,
      main_heading: customValues?.main_heading ?? templateDefaults.main_heading,
      title_color: customValues?.title_color ?? templateDefaults.title_color,
      main_footer: customValues?.main_footer ?? templateDefaults.main_footer,
      bodyText: customValues?.bodyText ?? templateDefaults.bodyText,
      logo: customValues?.logo ?? templateDefaults.logo,
      button_text: customValues?.button_text ?? templateDefaults.button_text,
      button_color: customValues?.button_color ?? templateDefaults.button_color,
      question_answer_color:
        customValues?.question_answer_color ??
        templateDefaults.question_answer_color,
      bodyTextColor:
        customValues?.bodyTextColor ?? templateDefaults.bodyTextColor,
      page_background_color:
        customValues?.page_background_color ??
        templateDefaults.page_background_color,
      logoWidth: customValues?.logoWidth ?? templateDefaults?.logoWidth,
      header_background_type: customValues?.header_background_type,
    };

    setTemplateDefaultValues(newValues);
    // setCustomHtml({})
  };

  const editHandler = (e, tempId) => {
    e.preventDefault();
    if (tempId == selectedTemplateId) {
      setCurrentTemplate(true);
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


  const dataURLToFile = (dataURL, filename) => {
    const [header, base64] = dataURL.split(",");
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(base64);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new File([new Uint8Array(array)], filename, { type: mime });
  };
 
  
  const TemplatePreviewUpload = async (file) => {
    if (file) {
      try {
        const extension = file.name.split(".").pop().toLowerCase();
        if (!validExtensions.includes(extension)) {
          throw new Error(
            "Invalid file extension. Please select a valid extension file."
          );
        }
        const formData = new FormData();
        formData.append("file", file);

        const res = await surveyAxiosInstance.post(
          "/survey/image-uploadaws",
          formData
        );
        if (res) {
          return res.data.data;
        }
      } catch (error) {
        loader("hide");
        toast.error("Something went wrong");
      }
    }
  };


  const updateBackgroundUrl=async  (element, newUrl) =>{
  // Get the current background property
  const currentBackground = element.style.background;
  // Extract the URL using regex
  const urlMatch = currentBackground.match(/url\(["']?([^"']*)["']?\)/);
  if (urlMatch) {
    const oldUrl = urlMatch[1];
     return await convertUrlToBase64(oldUrl)
  } else {
    console.log('No URL found in the background property');
  }
}




const convertUrlToBase64 = async (url) => {
  try {
    // Fetch the image from the URL
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    // Convert the response to a Blob
    const blob = await response.blob();
    const reader = new FileReader();
    
    // Create a promise to handle the FileReader
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        // Extract Base64 string from the Data URL
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading the file'));
      };
      
      // Read the Blob as a Data URL
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting URL to Base64:', error.message);
    throw error; // Optionally rethrow the error to be handled by the caller
  }
};



  const captureScreenshot = async () => {
    const element = document.getElementById("templatecapture");
    const logoElement= document.getElementById("surveyLogo")
    const backgroundImageElement = document.getElementById('surveyBackgroundImage');

    let base64backgroundImg="";
    let base64logoimg="";

    if(backgroundImageElement){
 
      const rawImage=await updateBackgroundUrl(backgroundImageElement);
      if(rawImage){
        base64backgroundImg=`data:image/png;base64,${rawImage}`;
      }
      
    }

    if(logoElement){
      const rawImage= await convertUrlToBase64(logoElement.src)
       base64logoimg = `data:image/png;base64,${rawImage}`;
     }

    if(base64backgroundImg){

      backgroundImageElement.style.background = `url(${base64backgroundImg}); background-size: cover`
    }

     if(base64logoimg){
     
      logoElement.src=base64logoimg
     }
  


    if (element) {
      try {
   

        // Capture screenshot with html2canvas
        const canvas = await html2canvas(element, {
          allowTaint: true,
          useCORS: true,
          proxy: "https://docintel.s3-eu-west-1.amazonaws.com",
          backgroundColor: null,
        });

        if (canvas) {
          const imgData = canvas.toDataURL("image/png");

          if (imgData) {
            const file = dataURLToFile(imgData, "screenshot.png");

            // Simulated upload function (replace with your actual implementation)
            const imgpath = await TemplatePreviewUpload(file);
            if (imgpath) {
              return imgpath;
            }
          }
        } else {
          console.error("Canvas is null or undefined");
        }
      } catch (error) {
        console.error("Error capturing screenshot:", error);
      }
    } else {
      console.error(`Element with ID "templatecapture" is not found`);
    }
    return null;
  };
  
  const handleChoiceChange = (id) => {
    if (id && templates) {
      const selectedTemplate = templates.find((temp) => temp.id === id);
      if (selectedTemplate) {
        setSelectedTemplateId(id);
        setOriginalSelectedTemplate(selectedTemplate);
        const templateDefaults = selectedTemplate.default_values;
        updateDynamicValues(templateDefaults);
      } else {
        setCustomHtml({});
        customHtmlData = {};
        setSelectedTemplateId(1);
        console.error("Template not found for the given id:", id);
      }
    } else {
      console.error("Invalid id or templates not loaded");
    }
  };

  const deleteTemplate = async (e, id) => {
    e.preventDefault();
    try {
      loader("show");
      if (id) {
        const body = {
          template_id: id,
          delete_status: 1,
          survey_id: survey_id ?? 0,
        };
        const response = await surveyAxiosInstance.post(
          "/survey/delete-survey-template",
          body
        );
 

        if (selectedTemplateId == id) {
          const storedData = localStorage.getItem("getSurveyData");
          const data = JSON.parse(storedData);
          delete data.formBuilderData;
          const updatedData = JSON.stringify(data);
          localStorage.setItem("getSurveyData", updatedData);
          setDynamicValues({});
          setTemplateDefaultValues({});
          setOriginalSelectedTemplate("");
          setCurrentTemplate("");
          setCustomHtml({});
          customHtmlData = {};
        }
        setCustomHtml({});
        customHtmlData = {};
        setTimeout(async () => {
          if (templates[templates.length - 1].id == selectedTemplateId) {
            await fetchTemplate();
          } else {
            await fetchTemplate(2);
          }
        }, 2000);
      }
    } catch (error) {
      loader("hide");
      toast.error(error.response.data.message);
      console.log("Something went wrong", error);
    }
  };

  const updateTemplateValues = () => {
    const values = { ...templateDefaultValues, ...dynamicValues };

    let dynamicHeaderBackgroundStyle = "";

    if (
      header_background_type === "image" &&
      values.header_background_image != ""
    ) {
      dynamicHeaderBackgroundStyle = `background: url(${values.header_background_image}); background-size: cover`;
    } else {
      dynamicHeaderBackgroundStyle = `background: ${values.header_background_color}`;
    }

    let updatedHtml = originalSelectedTemplate.template_html
      .replace(/^"|"$/g, "")
      .replace("{#dynamic_header_background#}", dynamicHeaderBackgroundStyle)
      .replace("{#main_heading#}", changeTitleToggle ? values.main_heading : "")
      .replace("{#title_color#}", values.title_color)
      .replace("{#main_footer#}", changeFooterToggle ? values.main_footer : "")
      .replace("{#bodyText#}", changeBodyToggle ? values.bodyText : "")
      .replace("{#button_text#}", values.button_text)
      .replace("{#button_color#}", values.button_color)
      .replaceAll("{#question_answer_color#}", values.question_answer_color)
      .replaceAll("{#bodyTextColor#}", values.bodyTextColor)
      .replace(
        "{#logo#}",
        changeLogoToggle
          ? `<img  id="surveyLogo" src="${values.logo}" style="background-size: cover; width: ${values.logoWidth}%;"/>`
          : ""
      );
    // document.getElementById("template-container").innerHTML = updatedHtml;
    setSelectedTemplateHtml(updatedHtml);
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "image") {
      setChangeTitleToggle(false);
      setChangeLogoToggle(false);
    }
    if (selectedValue === "color") {
      setChangeTitleToggle(true);
      setChangeLogoToggle(true);
    }
    setDynamicValues((prevState) => ({
      ...prevState,
      header_background_type: selectedValue,
    }));
    setTemplateDefaultValues((prevState) => ({
      ...prevState,
      header_background_type: selectedValue,
    }));
    setHeaderBackgroundType(selectedValue);
  };

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

  const handleWidthChange = (e, value) => {
    e.preventDefault();

    setTemplateDefaultValues({
      ...templateDefaultValues,
      logoWidth: value,
    });
  };
  const handleDrop = (e) => {
    const type = e.dataTransfer.getData("type");
    addElement(type);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const updateElement = (index, field, value) => {
    setDynamicValues((prev) => ({
      ...prev,
      main_heading: value,
    }));
  };

  const updateFooter = (index, field, value) => {
    setDynamicValues((prev) => ({
      ...prev,
      main_footer: value,
    }));
  };

  const updateBody = (index, field, value) => {
    setDynamicValues((prev) => ({
      ...prev,
      bodyText: value,
    }));
  };

  const handleImgFileChange = async (e) => {
    const file = e.target.files[0];
    handleUpload(file, setHeaderImgPath);
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    handleUpload(file, setHeaderLogoImgPath);
  };

  const handleUpload = async (file, setPath) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        loader("show");
        const res = await surveyAxiosInstance.post(
          "/survey/image-uploadaws",
          formData
        );
        setPath(res.data.data);

        setUserMadeChanges(true);
        loader("hide");
      } catch (error) {
        loader("hide");
        toast.error("Something went wrong");
      }
    }
  };

  const backHandler = () => {
    setCurrentTemplate(false);
  };

  useEffect(() => {
    if (headerImgPath || headerLogoImgPath) {
      setDynamicValues((prevState) => ({
        ...prevState,
        ...(headerImgPath && { header_background_image: headerImgPath }),
        ...(headerLogoImgPath && { logo: headerLogoImgPath }),
      }));
    }
  }, [headerImgPath, headerLogoImgPath]);

  const handleInputChange = (e, key) => {
    const newValue = e.target.value;
    setDynamicValues((prevState) => ({ ...prevState, [key]: newValue }));
    setTemplateDefaultValues((prevState) => ({
      ...prevState,
      [key]: newValue,
    }));
    setUserMadeChanges(true);
  };

  const titleSwitchToogle = () => {
    setChangeTitleToggle(!changeTitleToggle);

    if (changeTitleToggle && dynamicValues.main_heading === "") {
      setDynamicValues((prev) => ({
        ...prev,
        main_heading: originalSelectedTemplate.default_values.main_heading,
      }));
    }
  };

  const footerSwitchToogle = () => {
    setChangeFooterToggle(!changeFooterToggle);
  };
  const bodySwitchToogle = () => {
    setChangeBodyToggle(!changeBodyToggle);
  };

  const logoSwitchToogle = () => {
    setChangeLogoToggle(!changeLogoToggle);

    if (changeLogoToggle && dynamicValues.logo === "") {
      // setHeaderLogoImgPath(originalSelectedTemplate.default_values.logo);
      setDynamicValues((prev) => ({
        ...prev,
        logo: originalSelectedTemplate.default_values.logo,
      }));
    }

    // if (changeLogoToggle && headerLogoImgPath === "") {
    //   setHeaderLogoImgPath(originalSelectedTemplate.default_values.logo);
    // }
  };

  const nextButtonClicked = async (e, newTemplateStatus) => {
    e.preventDefault();

    let custom_html = null;

    const temporaryValues = { ...templateDefaultValues, ...dynamicValues };

    if (templates.length > 0) {
      custom_html = [
        {
          template_name: newSavedTemplateName
            ? newSavedTemplateName
            : temporaryValues.template_name,
          main_footer: changeFooterToggle ? temporaryValues.main_footer : "",
          bodyText: changeBodyToggle ? temporaryValues.bodyText : "",
          header_background_color: temporaryValues.header_background_color,
          header_background_image: temporaryValues.header_background_image,
          logo: changeLogoToggle ? temporaryValues.logo : "",
          main_heading: changeTitleToggle ? temporaryValues.main_heading : "",
          title_color: temporaryValues.title_color,
          button_text: temporaryValues.button_text,
          button_color: temporaryValues.button_color,
          question_answer_color: temporaryValues.question_answer_color,
          bodyTextColor: temporaryValues.bodyTextColor,
          page_background_color: temporaryValues.page_background_color,
          logoWidth: temporaryValues.logoWidth,
          changeLogoToggle,
          changeTitleToggle,
          header_background_type: header_background_type,
        },
      ];
    } else {
      custom_html = "0";
    }

    const body = {
      account_id: "18207",
      template_id: originalSelectedTemplate.id,
      custom_html: custom_html,
      template_status: newTemplateStatus ?? 0,
      template_uniquecode: originalSelectedTemplate.template_uniquecode ?? "",
    };

    let updatedTemplateData = {
      ...surveyValues,
      formBuilderData: { ...body },
    };

    if (newTemplateStatus == 1) {
      try {
        loader("show");

        const imgData = await captureScreenshot();
        if (!imgData) {
          throw new Error("Failed to capture screenshot");
        }

        const response = await surveyAxiosInstance.post(
          "/survey/insert-custom-template",
          {
            ...body,
            survey_id: 0,
            raw_html: originalSelectedTemplate.template_html,
            preview_thumbnail: imgData,
            template_uniquecode:
              originalSelectedTemplate.template_uniquecode ?? "",
          }
        );
        setCurrentTemplate(null);
        await fetchTemplate(1);
        setNewSavedTemplateName("");
        handleClose();
        loader("hide");
      } catch (error) {
        toast.error("Something went wrong");
        loader("hide");
      }
    }
    if (newTemplateStatus != 1) {

      await props.getSurveyData(updatedTemplateData);
    }
  };

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Col className="right-sidebar custom-change survey-builder">
        <div className="container-fluid">
          <div className="row">
            <div className="survey-engine d-flex w-100">
              <div className="left-setup">
                {currentTemplate ? (
                  <div className="left-setup-options">
                    <div className="left-setup-format">
                      <div className="left-setup-heading">
                        <div className="d-flex align-items-center justify-content-between">
                          <Button className="back-btn" onClick={backHandler}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1228_29755)">
                                <path
                                  d="M5.16113 12.0024C5.16113 11.5722 5.32536 11.1422 5.65313 10.8142L15.9727 0.494781C16.6291 -0.161672 17.6935 -0.161672 18.3497 0.494781C19.0058 1.15097 19.0058 2.21508 18.3497 2.87159L9.21834 12.0024L18.3493 21.1332C19.0055 21.7897 19.0055 22.8537 18.3493 23.5098C17.6932 24.1666 16.6288 24.1666 15.9724 23.5098L5.65281 13.1905C5.32499 12.8624 5.16113 12.4323 5.16113 12.0024Z"
                                  fill="#97B6CF"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1228_29755">
                                  <rect width="24" height="24" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </Button>
                          <Button className="btn-bordered" onClick={handleShow}>
                            Save As New Template
                          </Button>
                        </div>
                      </div>
                      <div className="live-stream-tabs-data">
                        <Tabs defaultActiveKey="header">
                          <Tab eventKey="header" title="Header & Footer">
                            <div className="survey-active-data">
                              <div className="steps">
                                <div className="d-flex align-items-center">
                                  <p className="option-heading">
                                    Header background:
                                  </p>
                                  <div className="check-group">
                                    <Form.Group>
                                      <label className="check">
                                        Color
                                        <input
                                          type="radio"
                                          name="headerBackType"
                                          value="color"
                                          onChange={handleOptionChange}
                                          checked={
                                            header_background_type === "color"
                                          }
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <label className="check">
                                        Image
                                        <input
                                          type="radio"
                                          name="headerBackType"
                                          checked={
                                            header_background_type === "image"
                                          }
                                          value="image"
                                          onChange={handleOptionChange}
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                    </Form.Group>
                                  </div>
                                </div>
                                {header_background_type === "image" ? (
                                  <div className="header-added">
                                    <div className="d-flex align-items-center">
                                      <div className="img-added">
                                        {templateDefaultValues?.header_background_image ? (
                                          <img
                                            src={
                                              templateDefaultValues.header_background_image
                                            }
                                            alt=""
                                          />
                                        ) : (
                                          <img
                                            src={path_image + "add-img.png"}
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
                                            const result =
                                              await uploadImageToServer(
                                                e.target.files[0]
                                              );
                                            setDynamicValues((prevState) => ({
                                              ...prevState,
                                              header_background_image: result,
                                            }));
                                            setTemplateDefaultValues(
                                              (prevState) => ({
                                                ...prevState,
                                                header_background_image: result,
                                              })
                                            );
                                            setUserMadeChanges(true);
                                          }}
                                        ></input>
                                        <label
                                          tabindex="0"
                                          for="my-file"
                                          class="input-file-trigger"
                                        >
                                          + Add image
                                        </label>
                                        <br />
                                        <span>Width: 724px | Height: Auto</span>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <Form.Group>
                                    {/* <Form.Label>Text Color</Form.Label> */}
                                    <div className="color-picker">
                                      <div className="color-pick">
                                        <div className="color-pick-point">
                                          <img
                                            src={
                                              path_image + "color-picker.svg"
                                            }
                                            alt=""
                                          />
                                        </div>
                                        <input
                                          type="color"
                                          title="Choose your color"
                                          name="color"
                                          value={
                                            templateDefaultValues.header_background_color ??
                                            dynamicValues.header_background_color
                                          }
                                          onChange={(e) =>
                                            handleInputChange(
                                              e,
                                              "header_background_color"
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </Form.Group>
                                )}
                              </div>
                              <div className="steps">
                                <div className="d-flex align-items-center justify-content-between">
                                  <p class="option-heading">Header Logo</p>
                                  <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    checked={changeLogoToggle}
                                    onChange={logoSwitchToogle}
                                  />
                                </div>

                                {changeLogoToggle && (
                                  <div className="d-flex align-items-center">
                                    <div className="img-preview header-logo">
                                      {templateDefaultValues.logo != "" ||
                                      dynamicValues.logo ? (
                                        <img
                                          src={
                                            templateDefaultValues.logo
                                              ? templateDefaultValues.logo
                                              : dynamicValues.logo
                                          }
                                          alt=""
                                        />
                                      ) : (
                                        <img
                                          src={path_image + "dummy-img.png"}
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
                                          const result =
                                            await uploadImageToServer(
                                              e.target.files[0]
                                            );
                                          setDynamicValues((prevState) => ({
                                            ...prevState,
                                            logo: result,
                                          }));
                                          setTemplateDefaultValues(
                                            (prevState) => ({
                                              ...prevState,
                                              logo: result,
                                            })
                                          );
                                          setUserMadeChanges(true);
                                        }}
                                      ></input>
                                      <label
                                        tabindex="0"
                                        for="my-file"
                                        class="input-file-trigger"
                                      >
                                        Change Logo
                                      </label>
                                      <br />
                                      <span>
                                        The recommended color is white
                                      </span>
                                    </div>
                                  </div>
                                )}
                                {changeLogoToggle && (
                                  <div className="words-limit">
                                    <p class="option-heading">Logo Width (%)</p>
                                    <input
                                      placeholder="20"
                                      type="number"
                                      class="form-control"
                                      value={templateDefaultValues.logoWidth}
                                      onChange={(e) => {
                                        const value = Math.max(
                                          0,
                                          Math.min(
                                            100,
                                            parseInt(e.target.value, 10)
                                          )
                                        );
                                        handleWidthChange(e, value);
                                      }}
                                    />
                                    {/* {isValid && (
                                    <p>please enter width in percentage</p>
                                  )} */}
                                  </div>
                                )}
                              </div>
                              <div className="steps">
                                <div className="d-flex align-items-center justify-content-between">
                                  <p class="option-heading">Header Title</p>
                                  <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    checked={changeTitleToggle}
                                    onChange={titleSwitchToogle}
                                  />
                                </div>

                                {changeTitleToggle && (
                                  <div className="text-editor">
                                    <QuestionEditor
                                      value={templateDefaultValues.main_heading}
                                      handleUpdateElement={updateElement}
                                      index={index}
                                      Placeholder=""
                                      headingBoldFlag={1}
                                    />
                                  </div>
                                )}
                                {changeTitleToggle && (
                                  <Form.Group>
                                    <Form.Label>Title Color</Form.Label>
                                    <div className="color-picker">
                                      <div className="color-pick">
                                        <div className="color-pick-point">
                                          <img
                                            src={
                                              path_image + "color-picker.svg"
                                            }
                                            alt=""
                                          />
                                        </div>
                                        <input
                                          type="color"
                                          title="Choose your color"
                                          name="color"
                                          value={
                                            templateDefaultValues.title_color
                                          }
                                          onChange={(e) =>
                                            handleInputChange(e, "title_color")
                                          }
                                        />
                                      </div>
                                    </div>
                                  </Form.Group>
                                )}
                              </div>
                              <div className="steps">
                                <div className="d-flex align-items-center justify-content-between">
                                  <p class="option-heading">
                                    Body Text{" "}
                                    <LinkWithTooltip
                                      tooltip="In the Body , you add more information about survey"
                                      href="#"
                                    >
                                      <img
                                        src={
                                          path_image + "info_circle_icon.svg"
                                        }
                                        alt="refresh-btn"
                                      />
                                    </LinkWithTooltip>
                                  </p>
                                  <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    checked={changeBodyToggle}
                                    onChange={bodySwitchToogle}
                                  />
                                </div>
                                {changeBodyToggle && (
                                  <div className="text-editor">
                                    <QuestionEditor
                                      value={templateDefaultValues.bodyText}
                                      handleUpdateElement={updateBody}
                                      index={index}
                                      Placeholder=""
                                      headingBoldFlag={0}
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="steps">
                                <div className="d-flex align-items-center justify-content-between">
                                  <p class="option-heading">
                                    Footer Text{" "}
                                    <LinkWithTooltip
                                      tooltip="In the footer, you can include links ex. privacy policy links"
                                      href="#"
                                    >
                                      <img
                                        src={
                                          path_image + "info_circle_icon.svg"
                                        }
                                        alt="refresh-btn"
                                      />
                                    </LinkWithTooltip>
                                  </p>
                                  <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    checked={changeFooterToggle}
                                    onChange={footerSwitchToogle}
                                  />
                                </div>
                                {changeFooterToggle && (
                                  <div className="text-editor">
                                    <QuestionEditor
                                      value={templateDefaultValues.main_footer}
                                      handleUpdateElement={updateFooter}
                                      index={index}
                                      Placeholder=""
                                      headingBoldFlag={0}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </Tab>
                          <Tab eventKey="survey" title="Survey Page">
                            <div className="survey-setup">
                              <div className="steps">
                                <Form.Group>
                                  <Form.Label>
                                    Headlines, Questions & answers color
                                  </Form.Label>
                                  <div className="color-picker">
                                    <div className="color-pick">
                                      <div className="color-pick-point">
                                        <img
                                          src={path_image + "color-picker.svg"}
                                          alt=""
                                        />
                                      </div>
                                      <input
                                        type="color"
                                        title="Choose your color"
                                        name="color"
                                        value={
                                          templateDefaultValues.question_answer_color
                                        }
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            "question_answer_color"
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </Form.Group>
                              </div>
                              <div className="steps">
                                <Form.Group>
                                  <Form.Label>Body text color</Form.Label>
                                  <div className="color-picker">
                                    <div className="color-pick">
                                      <div className="color-pick-point">
                                        <img
                                          src={path_image + "color-picker.svg"}
                                          alt=""
                                        />
                                      </div>
                                      <input
                                        type="color"
                                        title="Choose your color"
                                        name="color"
                                        value={
                                          templateDefaultValues.bodyTextColor
                                        }
                                        onChange={(e) =>
                                          handleInputChange(e, "bodyTextColor")
                                        }
                                      />
                                    </div>
                                  </div>
                                </Form.Group>
                              </div>
                              <div className="steps">
                                <div className="d-flex align-items-center button-style">
                                  <Form.Group>
                                    <Form.Label>Button color</Form.Label>
                                    <div className="color-picker">
                                      <div className="color-pick">
                                        <div className="color-pick-point">
                                          <img
                                            src={
                                              path_image + "color-picker.svg"
                                            }
                                            alt=""
                                          />
                                        </div>
                                        <input
                                          type="color"
                                          title="Choose your color"
                                          name="color"
                                          value={
                                            templateDefaultValues.button_color ??
                                            dynamicValues.button_color
                                          }
                                          onChange={(e) =>
                                            handleInputChange(e, "button_color")
                                          }
                                        />
                                      </div>
                                    </div>
                                  </Form.Group>
                                  <Form.Group>
                                    <Form.Label>Button Text</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Button Text"
                                      value={templateDefaultValues.button_text}
                                      onChange={(e) =>
                                        handleInputChange(e, "button_text")
                                      }
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                              <div className="steps">
                                <Form.Group>
                                  <Form.Label>
                                    The Page Background Color{" "}
                                    <LinkWithTooltip
                                      tooltip="This is the colour of the survey the colour behind the survey page. You can only see the colour change in the preview step (last step)"
                                      href="#"
                                    >
                                      <img
                                        src={
                                          path_image + "info_circle_icon.svg"
                                        }
                                        alt=""
                                      />
                                    </LinkWithTooltip>
                                  </Form.Label>
                                  <div className="color-picker">
                                    <div className="color-pick">
                                      <div className="color-pick-point">
                                        <img
                                          src={path_image + "color-picker.svg"}
                                          alt=""
                                        />
                                      </div>
                                      <input
                                        type="color"
                                        title="Choose your color"
                                        name="color"
                                        value={
                                          templateDefaultValues.page_background_color
                                        }
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            "page_background_color"
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </Form.Group>
                              </div>
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="left-setup-heading">
                      <h5>Set-up</h5>
                      <p>
                        Select your survey template and customize it to match
                        your brand{" "}
                      </p>
                    </div>
                    <div className="left-setup-template">
                      <div className="setup-template-title">
                        <span>Template</span>
                      </div>
                      <div className="template-selection d-flex">
                        {templates &&
                          templates?.map((temp, index) => {
                            return (
                              <div key={index} className="template-option ">
                                <div
                                  className={
                                    temp.id === selectedTemplateId
                                      ? "templete-select selected"
                                      : "templete-select"
                                  }
                                >
                                  <div className="template-preview ">
                                    {temp?.id > 3 ? (
                                      <img
                                        src={temp.template_fileName}
                                        onClick={(e) => {
                                          handleChoiceChange(temp.id);
                                        }}
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        src={
                                          path_image + temp.template_fileName
                                        }
                                        onClick={(e) => {
                                          handleChoiceChange(temp.id);
                                        }}
                                        alt=""
                                      />
                                    )}
                                  </div>
                                  <div className="d-flex justify-content-between flex-row-reverse">
                                    <button
                                      className="btn-edit btn-voilet"
                                      onClick={(e) => editHandler(e, temp.id)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                      >
                                        {" "}
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M2.15259 11.8329C1.97037 12.0151 1.84302 12.2448 1.78507 12.4959L0.903019 16.3182C0.726463 17.0833 1.41215 17.7689 2.17722 17.5924L5.99946 16.7103C6.25056 16.6524 6.48033 16.525 6.66255 16.3428L17.0346 5.97075C17.8157 5.1897 17.8157 3.92337 17.0346 3.14232L15.3531 1.46079C14.572 0.679739 13.3057 0.679736 12.5247 1.46079L2.15259 11.8329ZM2.52201 15.9734L3.2386 12.8682L11.2063 4.90046L13.5949 7.2891L5.62724 15.2568L2.52201 15.9734ZM14.6556 6.22844L12.267 3.8398L13.5853 2.52145C13.7806 2.32618 14.0972 2.32618 14.2924 2.52145L15.974 4.20298C16.1692 4.39824 16.1692 4.71483 15.974 4.91009L14.6556 6.22844Z"
                                          fill="#0066BE"
                                        />{" "}
                                      </svg>
                                    </button>
                                    {temp?.id > 3 && (
                                      <button
                                        class="btn btn-outline-primary"
                                        onClick={(e) =>
                                          deleteTemplate(e, temp.id)
                                        }
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                        >
                                          {" "}
                                          <g clip-path="url(#clip0_1228_25554)">
                                            {" "}
                                            <path
                                              d="M10.2075 12.7044C10.3169 12.8137 10.4646 12.876 10.6192 12.8781C10.7738 12.876 10.9215 12.8137 11.0309 12.7044C11.1402 12.595 11.2025 12.4473 11.2046 12.2927V6.04878C11.2046 5.89353 11.1429 5.74464 11.0331 5.63487C10.9233 5.52509 10.7744 5.46342 10.6192 5.46342C10.4639 5.46342 10.3151 5.52509 10.2053 5.63487C10.0955 5.74464 10.0338 5.89353 10.0338 6.04878V12.2927C10.0358 12.4473 10.0982 12.595 10.2075 12.7044Z"
                                              fill="#8A4E9C"
                                            />{" "}
                                            <path
                                              d="M5.93626 12.8781C5.78164 12.876 5.63392 12.8137 5.52458 12.7044C5.41524 12.595 5.35292 12.4473 5.3509 12.2927V6.04878C5.3509 5.89353 5.41257 5.74464 5.52235 5.63487C5.63212 5.52509 5.78101 5.46342 5.93626 5.46342C6.09151 5.46342 6.2404 5.52509 6.35018 5.63487C6.45996 5.74464 6.52163 5.89353 6.52163 6.04878V12.2927C6.51961 12.4473 6.45729 12.595 6.34794 12.7044C6.2386 12.8137 6.09088 12.876 5.93626 12.8781Z"
                                              fill="#8A4E9C"
                                            />{" "}
                                            <path
                                              d="M7.86604 12.7044C7.97539 12.8137 8.12311 12.876 8.27773 12.8781C8.43235 12.876 8.58006 12.8137 8.68941 12.7044C8.79875 12.595 8.86107 12.4473 8.86309 12.2927V6.04878C8.86309 5.89353 8.80142 5.74464 8.69164 5.63487C8.58186 5.52509 8.43297 5.46342 8.27773 5.46342C8.12248 5.46342 7.97359 5.52509 7.86381 5.63487C7.75403 5.74464 7.69236 5.89353 7.69236 6.04878V12.2927C7.69438 12.4473 7.7567 12.595 7.86604 12.7044Z"
                                              fill="#8A4E9C"
                                            />{" "}
                                            <path
                                              fill-rule="evenodd"
                                              clip-rule="evenodd"
                                              d="M11.2046 1.56101V2.34146H15.302C15.4572 2.34146 15.6061 2.40314 15.7159 2.51291C15.8257 2.62269 15.8873 2.77158 15.8873 2.92683C15.8873 3.08208 15.8257 3.23097 15.7159 3.34075C15.6061 3.45052 15.4572 3.5122 15.302 3.5122H14.2929L13.6483 13.7678C13.6106 14.3718 13.3443 14.9387 12.9035 15.3533C12.4628 15.768 11.8807 15.9992 11.2755 16H5.28133C4.68161 15.9913 4.10727 15.7566 3.67315 15.3427C3.23903 14.9289 2.97714 14.3664 2.93984 13.7678L2.26551 3.5122H1.25333C1.09808 3.5122 0.949193 3.45052 0.839417 3.34075C0.72964 3.23097 0.667969 3.08208 0.667969 2.92683C0.667969 2.77158 0.72964 2.62269 0.839417 2.51291C0.949193 2.40314 1.09808 2.34146 1.25333 2.34146H5.3509V1.52198C5.36079 1.12144 5.52432 0.740043 5.80762 0.456732C6.09092 0.173422 6.47232 0.00989435 6.87285 0H9.68261C10.0898 0.0101833 10.4769 0.179131 10.7612 0.47078C11.0456 0.762429 11.2047 1.15368 11.2046 1.56101ZM10.0338 1.56101V2.34146H6.52163V1.56101C6.52163 1.46786 6.55863 1.37852 6.6245 1.31265C6.69036 1.24678 6.7797 1.20978 6.87285 1.20978H9.68261C9.77575 1.20978 9.86509 1.24678 9.93095 1.31265C9.99682 1.37852 10.0338 1.46786 10.0338 1.56101ZM4.07156 13.6976L3.47057 3.5122L13.1175 3.55122L12.4853 13.6976C12.4636 14.004 12.3269 14.291 12.1026 14.5009C11.8782 14.7108 11.5828 14.8281 11.2755 14.8293H5.28133C4.97355 14.8299 4.6771 14.7132 4.45234 14.503C4.22758 14.2927 4.09141 14.0047 4.07156 13.6976Z"
                                              fill="#8A4E9C"
                                            />{" "}
                                          </g>{" "}
                                          <defs>
                                            {" "}
                                            <clipPath id="clip0_1228_25554">
                                              {" "}
                                              <rect
                                                width="16"
                                                height="16"
                                                fill="white"
                                              />{" "}
                                            </clipPath>{" "}
                                          </defs>{" "}
                                        </svg>
                                      </button>
                                    )}
                                  </div>
                                </div>
                                <p>{temp.default_values.template_name}</p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </>
                )}
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
                              setTemplates(null);
                              navigate("/survey/survey-setup", {});
                            }}
                          >
                            Back
                          </button>
                        </div>
                      </Col>
                      <Col md={8}>
                        <ul className="tabnav-link">
                          <li className="active active-main">
                            <Link to="">Set-up</Link>
                          </li>
                          <li className="">
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
                              await nextButtonClicked(e, 0);
                              saveAsDraft(e, 0, location.pathname, navigate);
                            }}
                          >
                            Save As Draft
                          </button>

                          <button
                            className="btn btn-primary btn-filled next "
                            onClick={(e) => {
                              nextButtonClicked(e, 0);
                              navigate("/survey/survey-configure", {
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
                    {selectedTemplateHtml != "" && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedTemplateHtml,
                        }}
                      />
                    )}
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          className="send-confirm"
          id="download-qr"
          shouldCloseOnOverlayClick={false}
          backdrop="static"
        >
          <Modal.Header>
            <h5 className="modal-title">Save as new template</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={handleClose}
            ></button>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="form-group creator">
                <Form.Label>Template name</Form.Label>
                <Form.Control
                  type="text"
                  name="template"
                  placeholder="Type template name"
                  value={newSavedTemplateName}
                  onChange={(e) => {
                    handleNewTemplateName(e);
                  }}
                />
                <div className="login-validation">
                  {" "}
                  {error.addTemplateName ? (
                    <span>Please enter template name</span>
                  ) : (
                    ""
                  )}
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={(e) => {
                if (newSavedTemplateName === "") {
                  setError({
                    addTemplateName: "Please add template Name",
                  });
                  return;
                }
                nextButtonClicked(e, 1);
              }}
            >
              Save
            </button>
          </div>
        </Modal>
      </Col>
    </>
  );
};

const mapStateToProps = (state) => {
  surveyValues = state?.getSurveyData;

  return state;
};

export default connect(mapStateToProps, { getSurveyData: getSurveyData })(
  SurveyFormBuilder
);