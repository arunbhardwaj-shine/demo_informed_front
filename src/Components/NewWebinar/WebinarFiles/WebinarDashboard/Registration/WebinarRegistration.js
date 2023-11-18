import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  FormLabel,
  Modal,
} from "react-bootstrap";
import CommonAddQuestionModal from "./CommonAddQuestionModal";
import { toast } from "react-toastify";
import Select from "react-select";
import { loader } from "../../../../../loader";
import { getData, postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { Link, useLocation } from "react-router-dom";
import WebinarRegistrationValidation from "./WebinarRegistrationValidation";
import CountryList from "./CountryList";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import CommonExtensionModal from "./CommonExtensionModal";
import AliceCarousel from "react-alice-carousel";
import RegistrationPage from "./RegistrationPage";
import CommonConfirmModel from "../../../../../Model/CommonConfirmModel";
import templateData from './template.json';

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
let dynamicFieldNo = 0;
const WebinarRegistration = () => {
  const validExtensions = ["png", "jpeg", "jpg"];
  const [templateList, setTemplateList] = useState(templateData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPrevClicked, setIsPrevClicked] = useState(false);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };

  let navigate = useNavigate();
  const location = useLocation();

  let prevData = location?.state;

  const event_code = location?.state?.event_code
    ? location?.state?.event_code
    : "";
  const [logo, setLogo] = useState();
  const [file, setFile] = useState();
  const [foot, setFoot] = useState();
  const [showModal, setModal] = useState(false);
  const [showExtensionModal, setExtensionModal] = useState(false);
  const [isFormChange, setIsFormChange] = useState(false);
  const [commonConfirmModelFun, setCommonConfirmModelFun] = useState(() => {});
  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
  });
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [tempTemplate, setTempTemplate] = useState();
  const [apiStatus,setApiStatus]=useState(false)
  const [formData, setFormData] = useState({
    pageTitle: "",
    bodyText: "",
    logoImageUrl: "",
    headerImageUrl: "",
    body: [],
    footerImageUrl: "",
    labelColor: "",
    backgroundColor: "",
    totalFieldNo: 0,
    templateId: 0,
  });
  const [originalFormData, setOriginalFormData] = useState({
    pageTitle: "",
    bodyText: "",
    logoImageUrl: "",
    headerImageUrl: "",
    body: [],
    footerImageUrl: "",
    labelColor: "",
    backgroundColor: "",
    totalFieldNo: 0,
    templateId: 0,
  });

  const [eventData, setEventData] = useState({
    event_id: location?.state?.id,
    company_id: location?.state?.user_id,
  });
  const [error, setError] = useState({});
  const [countryList, setCountryList] = useState(CountryList);
  const [errorMsg, setErrorMsg] = useState("");
  const [index, setIndex] = useState();
  const [optIndex, setOptIndex] = useState();
  const [extIndex, setExtIndex] = useState();
  const [fieldData, setFieldData] = useState();
  const [formExtLabel, setFormExtLabel] = useState([]);
  const [extFieldData, setExtFieldData] = useState();
  const [stateOptions, setStateOptions] = useState([
    { label: "Alabama", value: "Alabama" },
    { label: "Alaska", value: "Alaska" },
    { label: "Arizona", value: "Arizona" },
    { label: "Arkansas", value: "Arkansas" },
    { label: "California", value: "California" },
    { label: "Colorado", value: "Colorado" },
    { label: "Connecticut", value: "Connecticut" },
    { label: "Delaware", value: "Delaware" },
    { label: "Florida", value: "Florida" },
    { label: "Georgia", value: "Georgia" },
    { label: "Hawaii", value: "Hawaii" },
    { label: "Ldaho", value: "Ldaho" },
    { label: "Illinois", value: "Illinois" },
    { label: "Indiana", value: "Indiana" },
    { label: "Lowa", value: "Lowa" },
    { label: "Kansas", value: "Kansas" },
    { label: "Kentucky", value: "Kentucky" },
    { label: "Louisiana", value: "Louisiana" },
    { label: "Maine", value: "Maine" },
    { label: "Maryland", value: "Maryland" },
    { label: "Massachusetts", value: "Massachusetts" },
    { label: "Michigan", value: "Michigan" },
    { label: "Minnesota", value: "Minnesota" },
    { label: "Mississippi", value: "Mississippi" },
    { label: "Missouri", value: "Missouri" },
    { label: "Montana", value: "Montana" },
    { label: "Nebraska", value: "Nebraska" },
    { label: "Nevada", value: "Nevada" },
    { label: "New Hampshire", value: "New Hampshire" },
    { label: "New Jersey", value: "New Jersy" },
    { label: "New Mexico", value: "New Mexico" },
    { label: "New York", value: "New York" },
    { label: "North Carolina", value: "North Carolina" },
    { label: "North Dakota", value: "North Dakota" },
    { label: "Ohio", value: "Ohio" },
    { label: "Oklahoma", value: "Oklahoma" },
    { label: "Oregon", value: "Oregon" },
    { label: "Pennsylvania", value: "Pennsylvania" },
    { label: "Rhode Island", value: "Rhode Island" },
    { label: "South Carolina", value: "South Carolina" },
    { label: "South Dakota", value: "South Dakota" },
    { label: "Tennessee", value: "Tennessee" },
    { label: "Texas", value: "Texas" },
    { label: "Utah", value: "Utah" },
    { label: "Vermont", value: "Vermont" },
    { label: "Wyoming", value: "Wyoming" },
    { label: "Wisconsin", value: "Wisconsin" },
    { label: "West Virginia", value: "West Virginia" },
    { label: "Washington", value: "Washington" },
    { label: "Virginia", value: "Virginia" },
  ]);

  const [dropDownData, setDropDownData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [showModalPreview, setShowModalPreview] = useState(false);
  // const [totalFieldNo, setTotalFieldNo] = useState(0);

  useEffect(() => {
    
    // if (prevData?.content) {
    //   setEventData({
    //     ...eventData,
    //     event_id: prevData?.event_id,
    //     company_id: prevData?.company_id,
    //   });
    //   const newFormData = prevData?.content;

    //   setFormData(newFormData);

    //   setFile(newFormData?.headerImageUrl ? newFormData?.headerImageUrl : "");
    //   setFoot(newFormData?.footerImageUrl ? newFormData?.footerImageUrl : "");
    // } else {
    //   getWebinarData();
    // }

    getAllEvents();
  }, []);

  const getWebinarData = async (event_code) => {
    try {
      loader("show");
      setApiStatus(false)
      const response = await getData(
        `${ENDPOINT.GET_REGISTRATION_FORM}/${event_code}`
      );
      const hadData = response?.data?.data;
      if (hadData?.event_id && hadData?.company_id) {
        setEventData({
          ...eventData,
          event_id: hadData?.event_id,
          company_id: hadData?.company_id,
        });
      }
      const newFormData = hadData?.content ? JSON.parse(hadData?.content) : [];
      dynamicFieldNo = newFormData?.totalFieldNo
        ? newFormData?.totalFieldNo
        : dynamicFieldNo;
      setFormData(newFormData);
      setOriginalFormData(JSON.parse(JSON.stringify(newFormData)));
      let tempId = newFormData?.templateId;
      if (tempId) {
        let templateListData = [...templateList];
        let tempData = templateListData[tempId - 1];
        templateListData[tempId - 1] = templateListData[0];
        templateListData[0] = tempData;
        setTemplateList(templateListData);
        // console.log(templateListData[tempId-1]);
   setLogo(newFormData?.logoImageUrl ? newFormData?.logoImageUrl : templateList[[tempId-1<0 ? 0:tempId-1]]?.logoImageUrl);

      }

      setActiveIndex(tempId ? tempId : 0);
      setFile(newFormData?.headerImageUrl ? newFormData?.headerImageUrl : "");
      setFoot(newFormData?.footerImageUrl ? newFormData?.footerImageUrl : "");
      setApiStatus(true)
    } catch (err) {
      setApiStatus(true)
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  const getAllEvents = async () => {
    try {
      loader("show");
      setApiStatus(false)
      const response = await getData(
        `${ENDPOINT.WEBINAR_GET_EVENT_LISTING}?limit=50`
      );
      const allevents = response?.data?.data?.data;
      if (allevents?.length > 0) {
        let dropDownDataTemp = allevents?.map((item) => ({
          value: item?.id,
          label: item?.title,
          code: item?.event_code,
          companyId: item?.user_id,
        }));
        setDropDownData(dropDownDataTemp);
        let index = 0;
        if (event_code != "") {
          index = dropDownDataTemp.findIndex((obj) => obj.code === event_code);
        }
        let selectedData = dropDownDataTemp.length
          ? dropDownDataTemp?.[index]
          : { value: "", label: "" };
        setSelectedItem(selectedData);
        if (selectedData) {
          getWebinarData(selectedData.code);
        }
      }
    } catch (err) {
      loader("hide");
      console.log(err);
    }
  };

  const handleSelectChange = async (event) => {
    // console.log(event);
    await getWebinarData(event.code);
    setSelectedItem(event);
    if (event?.id && event?.user_id) {
      setEventData({
        ...eventData,
        event_id: event?.id,
        company_id: event?.user_id,
      });
    }
  };

  const handleFileSelect = (e, isSelectedName) => {
    setIsFormChange(true);
    const fileInput = document.createElement("input");
    // const validExtensions = ["png", "jpeg"];
    fileInput.type = "file";
    fileInput.style.display = "none";
    fileInput.accept = ".png, .jpeg, .jpg";
    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];

      if (file) {
        const extension = file.name.split(".").pop().toLowerCase();

        if (!validExtensions.includes(extension)) {
          if (isSelectedName === "headerImageUrl") {
            setErrorMsg(
              `Invalid file extension of header. Please select a valid extension file.`
            );
          } else if (isSelectedName === "logoImageUrl") {
            setErrorMsg(
              `Invalid file extension of logo. Please select a valid extension file.`
            );
          } else if (isSelectedName === "footerImageUrl") {
            setErrorMsg(
              `Invalid file extension of footer. Please select a valid extension file.`
            );
          }
        } else {
          setErrorMsg("");
        }
        if (isSelectedName === "logoImageUrl") {
          setLogo(URL.createObjectURL(file));
          const imgElement = document.querySelector(".logo-img");
        }
        if (isSelectedName === "headerImageUrl") {
          setFile(URL.createObjectURL(file));
          const imgElement = document.querySelector(".header-img");
        }

        if (isSelectedName === "footerImageUrl") {
          const imgElement = document.querySelector(".footer-img");
          setFoot(URL.createObjectURL(file));
        }

        try {
          const uploadedImageUrl = await uploadImageToServer(file);
          setFormData({ ...formData, [isSelectedName]: uploadedImageUrl });
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    });
    fileInput.click();
  };

  const uploadImageToServer = async (file) => {
    try {
      // const validExtensions = ["png", "jpeg"];
      const extension = file.name.split(".").pop().toLowerCase();
      if (!validExtensions.includes(extension)) {
        throw new Error(
          "Invalid file extension. Please select a valid extension file."
        );
      }

      loader("show");
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch(
        "https://onesource.informed.pro/api/upload-image",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const uploadedData = await response.json();
        return uploadedData.imageUrl;
      } else {
        console.error("Image upload failed");
        return null;
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    } finally {
      loader("hide");
    }
  };

  const handleAddQuestionModalClose = () => {
    setIndex();
    setFieldData();
    setModal(false);
  };

  const handleModalSave = (form) => {
    setIsFormChange(true);
    let updateFormBody = formData?.body;
    if (fieldData) {
      updateFormBody[index] = form;
    } else {
      updateFormBody.push(form);
    }
    dynamicFieldNo = dynamicFieldNo + 1;
    setFormData({
      ...formData,
      body: updateFormBody,
      totalFieldNo: dynamicFieldNo,
    });
  };

  const editFieldData = (e, index) => {
    e.preventDefault();
    setIndex(index);
    setFieldData(formData?.body[index]);
    setModal(true);
  };

  const editExtendedFeildData = (e, index, optIndex, extIndex) => {
    e.preventDefault();
    setIndex(index);
    setOptIndex(optIndex);
    setExtIndex(extIndex);

    setExtFieldData(
      formData?.body[index]?.option[optIndex]?.extension[extIndex]
    );
    setExtensionModal(true);
  };

  const addExtension = (e, index, optIndex, extIndex) => {
    e.preventDefault();
    setIndex(index);
    setOptIndex(optIndex);
    setExtIndex(extIndex);
    setExtensionModal(true);
  };

  const handleExtensionModalClose = () => {
    setIndex();
    setExtFieldData();
    setOptIndex();
    setExtIndex();
    setExtensionModal(false);
  };

  const handleExtensionModalSave = (form) => {
    setIsFormChange(true);
    let newExtension = formData?.body;
    if (extFieldData) {
      newExtension[index].option[optIndex].extension[extIndex] = form;
    } else {
      newExtension[index]?.option?.[optIndex]?.extension?.push(form);
    }
    dynamicFieldNo = dynamicFieldNo + 1;
    setFormData({
      ...formData,
      body: newExtension,
      totalFieldNo: dynamicFieldNo,
    });
  };

  const deleteField = (e, data, index) => {
    e.preventDefault();
    let updatedFormBody = formData?.body;
    updatedFormBody?.splice(index, 1);
    setFormData({ ...formData, body: updatedFormBody });
  };

  const deleteExtField = (e, data, index, optIndex, extIndex) => {
    e.preventDefault();
    let updatedFormBody = formData?.body;

    updatedFormBody?.[index]?.option?.[optIndex]?.extension?.splice(
      extIndex,
      1
    );
    setFormData({ ...formData, body: updatedFormBody });
  };

  const handleChange = (e, isSelectedName) => {
    setIsFormChange(true);
    if (isSelectedName) {
      let updateFormBody = formData?.body;

      if (e?.target?.checked == true) {
        if (
          formData?.body?.find(
            (item, index) =>
              item?.label?.toLowerCase() == isSelectedName?.toLowerCase()
          )
        ) {
          toast.error("Label already exist");
          return;
        }
        if (isSelectedName == "name" || isSelectedName == "email") {
          let newObj = {
            // label: isSelectedName,
            label: isSelectedName.charAt(0).toUpperCase() + isSelectedName.slice(1),
            name: isSelectedName == "email" ? "userEmail" : "userName",
            inputType: isSelectedName == "email" ? "email" : "text",
            placeholder: `Please enter ${isSelectedName}`,
            option: [],
            required: "yes",
          };
          updateFormBody?.push(newObj);
        } else if (isSelectedName == "travel accomodation") {
          let newObj = {
            // label: isSelectedName,
            label: isSelectedName.charAt(0).toUpperCase() + isSelectedName.slice(1),
            name: isSelectedName,
            inputType: "radio",
            required: "yes",
            option: [
              { optionLabel: "Organize my own travel", extension: [] },
              {
                optionLabel:
                  "Have my travel arranged by the meeting organizers",

                extension: [
                  {
                    name: "departure",
                    label: "Airport of departure",
                    inputType: "text",
                    placeholder: "Airport of departure",
                  },
                  {
                    name: "air_departure_date",
                    label: "Preferred departure date",
                    inputType: "date",
                    placeholder: "dd-mm-yyyy",
                  },
                  {
                    name: "departure_time",
                    label: "Preferred departure time",
                    inputType: "radio",
                    option: [
                      { optionLabel: "Morning" },
                      { optionLabel: "Afternoon" },
                      { optionLabel: "Evening" },
                    ],
                  },
                  {
                    name: "air_return_date",
                    label: "Preferred return flight date",
                    inputType: "date",
                    placeholder: "dd-mm-yyyy",
                  },
                ],
              },
            ],
          };
          updateFormBody?.push(newObj);
        } else if (isSelectedName == "consent") {
          let newObj = {
            // label: isSelectedName,
            label: isSelectedName.charAt(0).toUpperCase() + isSelectedName.slice(1),
            name: isSelectedName,

            inputType: "checkbox",
            required: "yes",

            option: [
              {
                optionLabel:
                  "Being contacted by FVIII Academy organizing team for the purpose of this meeting*",
              },
              {
                optionLabel: "Receive future materials from the FVIII Academy",
              },
            ],
          };
          updateFormBody?.push(newObj);
        } else {
          let newObj = {
            name: isSelectedName,
            // label: isSelectedName,
            label: isSelectedName.charAt(0).toUpperCase() + isSelectedName.slice(1),
            inputType: "selection",
            placeholder: `Please enter ${isSelectedName}`,
            option: [],
            required: "yes",
          };
          updateFormBody?.push(newObj);
        }
        setFormData({ ...formData, body: updateFormBody });
      } else if (e?.target?.checked == false) {
        let index = updateFormBody?.findIndex((item, index) => {
          return item?.label?.toLowerCase() == isSelectedName;
        });

        if (index > -1) {
          updateFormBody?.splice(index, 1);
        }
        if (isSelectedName == "travel accomodation") {
          setFormExtLabel();
        }
        setFormData({ ...formData, body: updateFormBody });
      } else if (isSelectedName == "company_id") {
        setEventData({
          ...eventData,
          company_id: e?.company_id,
          event_id: e?.value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e?.target?.value,
        required: "yes",
      });
    }
  };

  // const handleExtensionChange = (e, index, optIndex, type) => {
  //   if (type == "radio") {
  //     let newForm = formData?.body;
  //     newForm[index]?.option?.forEach((item) => (item.checked = false));
  //     newForm[index].option[optIndex].checked = e?.target?.checked;
  //     setFormData({ ...formData, body: newForm });
  //   } else if (type == "checkbox") {
  //     let newForm = formData?.body;
  //     newForm[index].option[optIndex].checked = e?.target?.checked;
  //     setFormData({ ...formData, body: newForm });
  //   }
  // };

  const saveClicked = async (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log(formData,'====>formData')

    setFormData(formData);
    try {
      const error = WebinarRegistrationValidation(formData, eventData);
      if (Object.keys(error)?.length) {
        toast.error(error[Object.keys(error)[0]]);
        setError(error);
        return;
      }
      if (errorMsg) {
        toast.error(errorMsg);
        return;
      }

      loader("show");
      let data = {
        eventId: eventData?.event_id,
        companyId: eventData?.company_id,
        content: JSON.stringify(formData),
      };

      const response = await postData(
        ENDPOINT.CREATE_WEBINAR_REGISTRATION,
        data
      );
      setFormData({
        pageTitle: "",
        bodyText: "",
        logoImageUrl: "",
        headerImageUrl: "",
        body: [],
        footerImageUrl: "",
        labelColor: "",
        backgroundColor: "",
      });

      setFile("");
      setFoot("");
      setLogo("");
    } catch (err) {
      console.error("--err", err);
    } finally {
      loader("hide");
    }
    if (e) {
      navigate("/event-listing");
    } else {
      setIsFormChange(false);
      setConfirmationPopup(false);
      setOriginalFormData(JSON.parse(JSON.stringify(formData)));
      templateClicked(tempTemplate);
    }
  };

  const handlePreview = (e, index) => {
    if (!formData?.templateId) {
      setShowModalPreview(true); 
      return;
    }
 
    setIsPrevClicked(true);
 
    let prevObj = {
      eventId: eventData?.event_id,
      companyId: eventData?.company_id,
      content: formData,
    };
    // navigate("/event-registration", { state: prevObj });
  };

  const handleClose = () => {
    setIsPrevClicked(false);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("text/plain");
    const updatedBody = [...formData.body];
    const [draggedField] = updatedBody.splice(draggedIndex, 1);
    updatedBody.splice(newIndex, 0, draggedField);
    setFormData({ ...formData, body: updatedBody });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDeleteHeaderImage = () => {
    setFile("");
    setFormData({ ...formData, headerImageUrl: "" });
  };

  const handleDeleteFooterImage = () => {
    setFoot("");
    setFormData({ ...formData, footerImageUrl: "" });
  };

  const handleDeleteLogoImage = () => {
    setLogo("");
    setFormData({ ...formData, logoImageUrl: "" });
  };

  const onColorChange = (e, isSelectedName) => {
    if (isSelectedName == "labelColor") {
      setFormData({ ...formData, labelColor: e?.target?.value });
    } else if (isSelectedName == "backgroundColor") {
      setFormData({ ...formData, backgroundColor: e?.target?.value });
    }
  };

  const templateClicked = (template, e) => {
    if (isFormChange) {
      setTempTemplate(template);
      setPopupMessage({
        message1:
          "Do you want to save the changes in form otherwise they will vanish.",
        message2: "Are you sure you want to do this?",
        footerButton: "Yes please!",
      });
      setIsFormChange(false);
      if (confirmationpopup) {
        setConfirmationPopup(false);
      } else {
        setConfirmationPopup(true);
      }
    } else {
      if (originalFormData?.templateId == template?.templateId) {
        let updatedBody = JSON.parse(JSON.stringify(originalFormData));
        setLogo(updatedBody?.logoImageUrl?updatedBody?.logoImageUrl:template?.logoImageUrl);

        setFormData(updatedBody);
      } else {
        let updatedBody = JSON.parse(JSON.stringify(template));
        setLogo(updatedBody?.logoImageUrl ? updatedBody?.logoImageUrl : "");
        setFormData(updatedBody);
      }
      setActiveIndex(template?.templateId);
    }

    // if (originalFormData?.templateId == template?.templateId) {
    //   console.log("template  if--->", template);
    //   let updatedBody = JSON.parse(JSON.stringify(originalFormData));
    //   setFormData(updatedBody);
    // } else {
    //   console.log("template  else--->", template);
    //   let updatedBody = JSON.parse(JSON.stringify(template));
    //   setFormData(updatedBody);
    // }
    // setActiveIndex(template?.templateId);
  };

  const handleCommonConfirmModal = () => {
    setConfirmationPopup(false);
    templateClicked(tempTemplate);
  };

  const copyToClipboard = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      toast.success("content copied to the clipboard!");
    } else {
      unsecuredCopyToClipboard(content);
    }
  };

  const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      toast.success("content copied to the clipboard!");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  };

  const handleCloseModal = () => {
    setShowModalPreview(false);
  };

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="top-header regi-web">
              <div className="page-title">
              <Link
                  className="btn btn-primary btn-bordered back-btn"
                  to="/event-listing"
                >
                  <svg
                    width="14"
                    height="24"
                    viewBox="0 0 14 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z"
                      fill="#97B6CF"
                    />
                  </svg>
                </Link>
                <h2>Registration Page</h2>
              </div>
            </div>
            <div className="page-top-nav smart_list_names sticky">
              <div className="d-flex justify-content-between align-items-center add-padding">
                <div className="d-flex event-select align-items-center">
                  <label htmlFor="">Select Event</label>
                  <Select
                    options={dropDownData}
                    placeholder="Select Event"
                    name="province"
                    className="dropdown-basic-button split-button-dropup"
                    isClearable
                    onChange={handleSelectChange}
                    value={selectedItem}
                  />
                </div>
                <div className="top-right-action">
                  <div className="d-flex justify-content-center header_btns">
                    <a
                      className="copy_link btn-voilet"
                      href={`event-registration?event=${event_code}`}
                      onClick={(e) => {
                        e.preventDefault();
                        console.dir();
                        let newLink = `${
                          e.currentTarget.host
                        }/${e.currentTarget.getAttribute("href")}`;
                        copyToClipboard(newLink);
                      }}
                    >
                      Copy Link
                    </a>
                    <Button
                      type="button"
                      className="save btn-bordered"
                      onClick={handlePreview}
                    >
                      Preview
                    </Button>
                    <Button onClick={(e) => saveClicked(e)} className="save">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <section className="select-mail-template library-consent create-change-content">
              <div className="custom-container">
                <Row>
                  <div className="page-title">
                    <h4>Select Template</h4>
                  </div>

                  <AliceCarousel
                    mouseTracking
                    disableDotsControls
                    activeIndex={activeIndex}
                    responsive={responsive}
                    onSlideChanged={syncActiveIndex}
                  >
                    {templateList.map((template, index) => {
                      return (
                        <>
                          <div
                            className="item"
                            onClick={(e) => templateClicked(template, e)}
                          >
                            <img
                              id={`"template_dyn" + template?.popupNo`}
                              src={`${path_image}/template-${template?.templateId}.png`}
                              alt=""
                              className={
                                typeof activeIndex !== "undefined" &&
                                activeIndex == template?.templateId
                                  ? "select_mm"
                                  : ""
                              }
                            />
                            {/* <p>{template?.name}</p> */}
                          </div>
                        </>
                      );
                    })}
                  </AliceCarousel>
                </Row>{" "}
              </div>{" "}
            </section>

            {formData?.templateId ? (
              <div className="register-page create-change-content">
                <Row>
                  <Col md={8} sm={7}>
                    <div className="register-page-left">
                      <Form>
                        <div className="form-group d-flex align-items-center">
                          <FormLabel>
                            Registration Page Title <span>*</span>
                          </FormLabel>
                          <input
                            type="text"
                            name="pageTitle"
                            value={formData?.pageTitle}
                            onChange={handleChange}
                            className={
                              error?.pageTitle
                                ? "form-control error"
                                : "form-control"
                            }
                          />
                          {error?.pageTitle ? (
                            <div className="login-validation">
                              {error?.pageTitle}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="form-group d-flex align-items-center">
                          <FormLabel>Body Text</FormLabel>
                          <textarea
                            cols="40"
                            rows="3"
                            name="bodyText"
                            value={formData?.bodyText}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="what will be the placeholder?"
                          />
                        </div>
                        <div className="feilds-section">
                          <h5>What data should be collected?</h5>
                          <div className="select-collected">
                            <Form.Check
                              className="webinar-checkbox"
                              inline
                              label="Name"
                              name="name"
                              type="checkbox"
                              checked={
                                formData?.body?.findIndex(
                                  (item, index) =>
                                    item?.label?.toLowerCase() == "name"
                                ) != -1
                                  ? true
                                  : false
                              }
                              onChange={(e) => handleChange(e, "name")}
                            />

                            <Form.Check
                              className="webinar-checkbox"
                              inlin
                              label="Email"
                              name="email"
                              type="checkbox"
                              checked={
                                formData?.body?.findIndex(
                                  (item, index) =>
                                    item?.label?.toLowerCase() == "email"
                                ) != -1
                                  ? true
                                  : false
                              }
                              onChange={(e) => handleChange(e, "email")}
                            />

                            {/* <Form.Check
                            className="webinar-checkbox"
                            inline
                            label="Profession"
                            name="profession"
                            type="checkbox"
                            checked={
                              formData?.body?.findIndex(
                                (item, index) =>
                                  item?.label?.toLowerCase() == "profession"
                              ) != -1
                                ? true
                                : false
                            }
                            onChange={(e) => handleChange(e, "profession")}
                          /> */}

                            <Form.Check
                              className="webinar-checkbox"
                              inline
                              label="Country"
                              name="country"
                              type="checkbox"
                              checked={
                                formData?.body?.findIndex(
                                  (item, index) =>
                                    item?.label?.toLowerCase() == "country"
                                ) != -1
                                  ? true
                                  : false
                              }
                              onChange={(e) => handleChange(e, "country")}
                            />

                            <Form.Check
                              className="webinar-checkbox"
                              inline
                              label="State"
                              name="state"
                              type="checkbox"
                              checked={
                                formData?.body?.findIndex(
                                  (item, index) =>
                                    item?.label?.toLowerCase() == "state"
                                ) != -1
                                  ? true
                                  : false
                              }
                              onChange={(e) => handleChange(e, "state")}
                            />
                            <Form.Check
                              className="webinar-checkbox"
                              inline
                              label="State (US)"
                              name="State (US)"
                              type="checkbox"
                              checked={
                                formData?.body?.findIndex(
                                  (item, index) =>
                                    item?.label?.toLowerCase() == "state (us)"
                                ) != -1
                                  ? true
                                  : false
                              }
                              onChange={(e) => handleChange(e, "state (us)")}
                            />

                            <Form.Check
                              className="webinar-checkbox"
                              inline
                              label="Travel accomodation"
                              name="travel"
                              type="checkbox"
                              checked={
                                formData?.body?.findIndex(
                                  (item) =>
                                    item?.label?.toLowerCase() ==
                                    "travel accomodation"
                                ) !== -1
                                  ? true
                                  : false
                              }
                              onChange={(e) =>
                                handleChange(e, "travel accomodation")
                              }
                            />

                            <Form.Check
                              className="webinar-checkbox"
                              inline
                              label="Consent"
                              name="consent"
                              type="checkbox"
                              checked={
                                formData?.body?.findIndex(
                                  (item, index) =>
                                    item?.label?.toLowerCase() == "consent"
                                ) != -1
                                  ? true
                                  : false
                              }
                              onChange={(e) => handleChange(e, "consent")}
                            />

                            <span
                              className="add-choice"
                              onClick={() => setModal(true)}
                            >
                              Add data field
                              <img src={path_image + "add-choice.svg"} alt="" />
                            </span>
                          </div>
                          <section className="webinarRegistrationBody">
                            <div className="sec1">
                              <div className="add_hcp_boxes">
                                <div className="form_action">
                                  <div className="row">
                                    <div id="registration-form">
                                      {formData &&
                                      Object.keys(formData)?.length ? (
                                        <div>
                                          <div className="center-align-form">
                                            <div>
                                              {formData?.body?.map(
                                                (data, index) => (
                                                  <div
                                                    key={index}
                                                    className="centered-input"
                                                    draggable
                                                    onDragStart={(e) =>
                                                      handleDragStart(e, index)
                                                    }
                                                    onDrop={(e) =>
                                                      handleDrop(e, index)
                                                    }
                                                    onDragOver={handleDragOver}
                                                  >
                                                    <div className="form-group">
                                                      <label htmlFor="">
                                                        {data?.label
                                                          ? data?.label
                                                              ?.charAt(0)
                                                              .toUpperCase() +
                                                            data?.label
                                                              ?.slice(1)
                                                              ?.toLowerCase()
                                                          : ""}
                                                        {data?.required ===
                                                          "yes" && (
                                                          <span>*</span>
                                                        )}
                                                      </label>

                                                      {data?.inputType ===
                                                      "radio" ? (
                                                        <div className="btn-container">
                                                          {data?.option?.map(
                                                            (
                                                              item,
                                                              optIndex
                                                            ) => (
                                                              <div
                                                                className="check"
                                                                key={optIndex}
                                                              >
                                                                <input
                                                                  type={
                                                                    data?.inputType
                                                                  }
                                                                  name={`${
                                                                    data?.name
                                                                      ? data?.name
                                                                      : "dynamic_" +
                                                                        dynamicFieldNo
                                                                  }`}
                                                                  value={
                                                                    item?.optionValue
                                                                  }
                                                                  checked={
                                                                    item?.checked
                                                                  }
                                                                  // onChange={(e) =>
                                                                  //   handleExtensionChange(
                                                                  //     e,
                                                                  //     index,
                                                                  //     optIndex,
                                                                  //     data?.inputType
                                                                  //   )
                                                                  // }
                                                                />
                                                                <label
                                                                  htmlFor={
                                                                    item?.optionValue
                                                                  }
                                                                >
                                                                  {
                                                                    item?.optionLabel
                                                                  }
                                                                </label>
                                                                {data?.extension ==
                                                                true ? (
                                                                  <span
                                                                    className="add-choice"
                                                                    onClick={(
                                                                      e
                                                                    ) =>
                                                                      addExtension(
                                                                        e,
                                                                        index,
                                                                        optIndex
                                                                      )
                                                                    }
                                                                  >
                                                                    Add
                                                                    extension
                                                                    <img
                                                                      src={
                                                                        path_image +
                                                                        "add-choice-voilet.svg"
                                                                      }
                                                                      alt=""
                                                                    />
                                                                  </span>
                                                                ) : (
                                                                  ""
                                                                )}

                                                                {/* {item?.extension
                                                                ?.length > 0 &&
                                                              item?.checked ==
                                                                true ?  */}
                                                                {item?.extension
                                                                  ?.length >
                                                                0 ? (
                                                                  <div className="extension">
                                                                    {item?.extension?.map(
                                                                      (
                                                                        extItem,
                                                                        extIndex
                                                                      ) => (
                                                                        <div
                                                                          className="extItem"
                                                                          key={
                                                                            extIndex
                                                                          }
                                                                        >
                                                                          {extItem?.inputType ==
                                                                          "text" ? (
                                                                            <div className="extOption">
                                                                              <label
                                                                                htmlFor={
                                                                                  extItem?.label
                                                                                }
                                                                              >
                                                                                {
                                                                                  extItem?.label
                                                                                }
                                                                              </label>
                                                                              <input
                                                                                type={
                                                                                  extItem?.inputType
                                                                                }
                                                                                className="form-control"
                                                                                name={`${
                                                                                  extItem?.name
                                                                                    ? extItem?.name
                                                                                    : "dynamic_" +
                                                                                      dynamicFieldNo
                                                                                }`}
                                                                                placeholder={
                                                                                  extItem?.placeholder
                                                                                }
                                                                              />
                                                                            </div>
                                                                          ) : extItem?.inputType ==
                                                                            "radio" ? (
                                                                            <div className="extOption">
                                                                              <label
                                                                                htmlFor={
                                                                                  extItem?.label
                                                                                }
                                                                              >
                                                                                {
                                                                                  extItem?.label
                                                                                }
                                                                              </label>
                                                                              {extItem?.option?.map(
                                                                                (
                                                                                  optItem,
                                                                                  optItemIndex
                                                                                ) => (
                                                                                  <div
                                                                                    className="extOptionItem"
                                                                                    key={
                                                                                      optItemIndex
                                                                                    }
                                                                                  >
                                                                                    <input
                                                                                      type={
                                                                                        extItem?.inputType
                                                                                      }
                                                                                      name={`${
                                                                                        extItem?.name
                                                                                          ? extItem?.name
                                                                                          : "dynamic_" +
                                                                                            dynamicFieldNo
                                                                                      }`}
                                                                                      value={
                                                                                        optItem?.optionValue
                                                                                      }
                                                                                    />
                                                                                    <label
                                                                                      htmlFor={
                                                                                        optItem?.optionLabel
                                                                                      }
                                                                                    >
                                                                                      {
                                                                                        optItem?.optionLabel
                                                                                      }
                                                                                    </label>
                                                                                  </div>
                                                                                )
                                                                              )}
                                                                            </div>
                                                                          ) : extItem?.inputType ==
                                                                            "date" ? (
                                                                            <div className="extOption">
                                                                              <label
                                                                                htmlFor={
                                                                                  extItem?.label
                                                                                }
                                                                              >
                                                                                {" "}
                                                                                {
                                                                                  extItem?.label
                                                                                }
                                                                              </label>
                                                                              <DatePicker
                                                                                name={`${
                                                                                  extItem?.name
                                                                                    ? extItem?.name
                                                                                    : "dynamic_" +
                                                                                      dynamicFieldNo
                                                                                }`}
                                                                                dateFormat="dd/MM/yyyy"
                                                                                className="form-control"
                                                                                placeholderText="Select date"
                                                                                // minDate={currentDate}

                                                                                onKeyDown={(
                                                                                  e
                                                                                ) => {
                                                                                  e.preventDefault();
                                                                                }}
                                                                              />
                                                                            </div>
                                                                          ) : extItem?.inputType ==
                                                                            "checkbox" ? (
                                                                            <div className="extOption">
                                                                              <label
                                                                                htmlFor={
                                                                                  extItem?.label
                                                                                }
                                                                              >
                                                                                {
                                                                                  extItem?.label
                                                                                }
                                                                              </label>
                                                                              {extItem?.option?.map(
                                                                                (
                                                                                  optItem,
                                                                                  optItemIndex
                                                                                ) => (
                                                                                  <div
                                                                                    className="extOptionItem"
                                                                                    key={
                                                                                      optItemIndex
                                                                                    }
                                                                                  >
                                                                                    <input
                                                                                      type={
                                                                                        extItem?.inputType
                                                                                      }
                                                                                      name={`${
                                                                                        extItem?.name
                                                                                          ? extItem?.name
                                                                                          : "dynamic_" +
                                                                                            dynamicFieldNo
                                                                                      }`}
                                                                                      value={
                                                                                        optItem?.optionValue
                                                                                      }
                                                                                    />
                                                                                    <label
                                                                                      htmlFor={
                                                                                        optItem?.optionLabel
                                                                                      }
                                                                                    >
                                                                                      {
                                                                                        optItem?.optionLabel
                                                                                      }
                                                                                    </label>
                                                                                  </div>
                                                                                )
                                                                              )}
                                                                            </div>
                                                                          ) : extItem?.inputType ==
                                                                            "selection" ? (
                                                                            <div className="extOption">
                                                                              <label
                                                                                htmlFor={
                                                                                  extItem?.label
                                                                                }
                                                                              >
                                                                                {
                                                                                  extItem?.label
                                                                                }
                                                                              </label>
                                                                              <Select
                                                                                className="dropdown-basic-button split-button-dropup webinar-select"
                                                                                name={`${
                                                                                  extItem?.name
                                                                                    ? extItem?.name
                                                                                    : "dynamic_" +
                                                                                      dynamicFieldNo
                                                                                }`}
                                                                                options={
                                                                                  extItem?.label?.includes(
                                                                                    "country"
                                                                                  ) ||
                                                                                  extItem?.label?.includes(
                                                                                    "Country"
                                                                                  )
                                                                                    ? countryList
                                                                                    : extItem?.label?.includes(
                                                                                        "state"
                                                                                      ) ||
                                                                                      extItem?.label?.includes(
                                                                                        "State"
                                                                                      )
                                                                                    ? stateOptions
                                                                                    : extItem?.option?.map(
                                                                                        (
                                                                                          item
                                                                                        ) => ({
                                                                                          label:
                                                                                            item?.optionLabel,
                                                                                          value:
                                                                                            item?.optionLabel,
                                                                                        })
                                                                                      )
                                                                                }
                                                                                placeholder="Please select the value"
                                                                              />
                                                                            </div>
                                                                          ) : extItem?.inputType ==
                                                                            "textarea" ? (
                                                                            <div className="extOption">
                                                                              <label
                                                                                htmlFor={
                                                                                  extItem?.label
                                                                                }
                                                                              >
                                                                                {
                                                                                  extItem?.label
                                                                                }
                                                                              </label>

                                                                              <textarea
                                                                                className="form-control"
                                                                                name={`${
                                                                                  extItem?.name
                                                                                    ? extItem?.name
                                                                                    : "dynamic_" +
                                                                                      dynamicFieldNo
                                                                                }`}
                                                                                type={
                                                                                  extItem?.inputType
                                                                                }
                                                                                placeholder={
                                                                                  extItem?.placeholder
                                                                                }
                                                                              />
                                                                            </div>
                                                                          ) : (
                                                                            ""
                                                                          )}
                                                                          <button
                                                                            className="btn-edit btn-filled"
                                                                            onClick={(
                                                                              e
                                                                            ) =>
                                                                              editExtendedFeildData(
                                                                                e,
                                                                                index,
                                                                                optIndex,
                                                                                extIndex
                                                                              )
                                                                            }
                                                                          >
                                                                            <svg
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              width="20"
                                                                              height="20"
                                                                              viewBox="0 0 20 20"
                                                                              fill="none"
                                                                            >
                                                                              <path
                                                                                fill-rule="evenodd"
                                                                                clip-rule="evenodd"
                                                                                d="M3.15259 12.8329C2.97037 13.0151 2.84302 13.2448 2.78507 13.4959L1.90302 17.3182C1.72646 18.0833 2.41215 18.7689 3.17722 18.5924L6.99946 17.7103C7.25056 17.6524 7.48033 17.525 7.66255 17.3428L18.0346 6.97075C18.8157 6.1897 18.8157 4.92337 18.0346 4.14232L16.3531 2.46079C15.572 1.67974 14.3057 1.67974 13.5247 2.46079L3.15259 12.8329ZM3.52201 16.9734L4.2386 13.8682L12.2063 5.90046L14.5949 8.2891L6.62724 16.2568L3.52201 16.9734ZM15.6556 7.22844L13.267 4.8398L14.5853 3.52145C14.7806 3.32618 15.0972 3.32618 15.2924 3.52145L16.974 5.20298C17.1692 5.39824 17.1692 5.71483 16.974 5.91009L15.6556 7.22844Z"
                                                                                fill="#0066be"
                                                                              />
                                                                            </svg>
                                                                          </button>
                                                                          <button
                                                                            className="dlt_btn_event btn-filled"
                                                                            onClick={(
                                                                              e
                                                                            ) => {
                                                                              // setConfirmationPopup(true);
                                                                              deleteExtField(
                                                                                e,
                                                                                data,
                                                                                index,
                                                                                optIndex,
                                                                                extIndex
                                                                              );
                                                                            }}
                                                                          >
                                                                            <svg
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              width="40"
                                                                              height="40"
                                                                              viewBox="0 0 40 40"
                                                                              fill="none"
                                                                            >
                                                                              <path
                                                                                d="M24.8608 31.7609C25.1362 32.0343 25.5082 32.1901 25.8977 32.1951C26.2871 32.1901 26.6592 32.0343 26.9346 31.7609C27.21 31.4876 27.367 31.1183 27.3721 30.7317V15.122C27.3721 14.7338 27.2167 14.3616 26.9402 14.0872C26.6637 13.8127 26.2887 13.6585 25.8977 13.6585C25.5067 13.6585 25.1316 13.8127 24.8551 14.0872C24.5786 14.3616 24.4233 14.7338 24.4233 15.122V30.7317C24.4284 31.1183 24.5854 31.4876 24.8608 31.7609Z"
                                                                                fill="#0066be"
                                                                              />
                                                                              <path
                                                                                d="M14.1027 32.1951C13.7133 32.1901 13.3412 32.0343 13.0658 31.7609C12.7904 31.4876 12.6334 31.1183 12.6283 30.7317V15.122C12.6283 14.7338 12.7837 14.3616 13.0602 14.0872C13.3367 13.8127 13.7117 13.6585 14.1027 13.6585C14.4937 13.6585 14.8687 13.8127 15.1452 14.0872C15.4217 14.3616 15.5771 14.7338 15.5771 15.122V30.7317C15.572 31.1183 15.415 31.4876 15.1396 31.7609C14.8642 32.0343 14.4921 32.1901 14.1027 32.1951Z"
                                                                                fill="#0066be"
                                                                              />
                                                                              <path
                                                                                d="M18.9633 31.7609C19.2387 32.0343 19.6107 32.1901 20.0002 32.1951C20.3896 32.1901 20.7617 32.0343 21.0371 31.7609C21.3125 31.4876 21.4695 31.1183 21.4746 30.7317V15.122C21.4746 14.7338 21.3192 14.3616 21.0427 14.0872C20.7662 13.8127 20.3912 13.6585 20.0002 13.6585C19.6092 13.6585 19.2341 13.8127 18.9577 14.0872C18.6812 14.3616 18.5258 14.7338 18.5258 15.122V30.7317C18.5309 31.1183 18.6879 31.4876 18.9633 31.7609Z"
                                                                                fill="#0066be"
                                                                              />
                                                                              <path
                                                                                fill-rule="evenodd"
                                                                                clip-rule="evenodd"
                                                                                d="M27.3721 3.90252V5.85366H37.6923C38.0833 5.85366 38.4583 6.00784 38.7348 6.28228C39.0113 6.55673 39.1667 6.92895 39.1667 7.31707C39.1667 7.70519 39.0113 8.07742 38.7348 8.35186C38.4583 8.62631 38.0833 8.78049 37.6923 8.78049H35.1489L33.5251 34.4195C33.4302 35.9294 32.7595 37.3467 31.6494 38.3833C30.5393 39.4199 29.0731 39.998 27.5489 40H12.4512C10.9407 39.9783 9.49405 39.3915 8.40063 38.3569C7.30721 37.3222 6.64757 35.916 6.55362 34.4195L4.85518 8.78049H2.3077C1.91668 8.78049 1.54167 8.62631 1.26517 8.35186C0.988677 8.07742 0.833344 7.70519 0.833344 7.31707C0.833344 6.92895 0.988677 6.55673 1.26517 6.28228C1.54167 6.00784 1.91668 5.85366 2.3077 5.85366H12.6283V3.80495C12.6532 2.80361 13.0651 1.85011 13.7787 1.14183C14.4922 0.433555 15.4529 0.0247359 16.4617 0H23.5387C24.5643 0.0254581 25.5393 0.447827 26.2555 1.17695C26.9717 1.90607 27.3724 2.88419 27.3721 3.90252ZM24.4233 3.90252V5.85366H15.5771V3.90252C15.5771 3.66964 15.6703 3.4463 15.8362 3.28163C16.0021 3.11696 16.2271 3.02445 16.4617 3.02445H23.5387C23.7733 3.02445 23.9983 3.11696 24.1642 3.28163C24.3301 3.4463 24.4233 3.66964 24.4233 3.90252ZM9.40411 34.2439L7.8904 8.78049L32.1883 8.87805L30.596 34.2439C30.5414 35.0101 30.1971 35.7274 29.632 36.2522C29.0668 36.7769 28.3228 37.0702 27.5489 37.0732H12.4512C11.676 37.0748 10.9293 36.7831 10.3632 36.2574C9.7971 35.7318 9.45412 35.0117 9.40411 34.2439Z"
                                                                                fill="#0066be"
                                                                              />
                                                                            </svg>
                                                                          </button>
                                                                        </div>
                                                                      )
                                                                    )}
                                                                  </div>
                                                                ) : (
                                                                  ""
                                                                )}
                                                              </div>
                                                            )
                                                          )}
                                                        </div>
                                                      ) : data?.inputType ==
                                                        "checkbox" ? (
                                                        <div className="btn-container">
                                                          {data?.option?.map(
                                                            (
                                                              item,
                                                              optIndex
                                                            ) => (
                                                              <div
                                                                className="check"
                                                                key={optIndex}
                                                              >
                                                                <input
                                                                  type={
                                                                    data?.inputType
                                                                  }
                                                                  name={`${
                                                                    data?.name
                                                                      ? data?.name
                                                                      : "dynamic_" +
                                                                        dynamicFieldNo
                                                                  }`}
                                                                  checked={
                                                                    item?.checked
                                                                  }
                                                                  // onChange={(e) =>
                                                                  //   handleExtensionChange(
                                                                  //     e,
                                                                  //     index,
                                                                  //     optIndex,
                                                                  //     data?.inputType
                                                                  //   )
                                                                  // }
                                                                />
                                                                <label htmlFor="">
                                                                  {
                                                                    item?.optionLabel
                                                                  }
                                                                </label>
                                                                {data?.extension ==
                                                                true ? (
                                                                  <span
                                                                    className="add-choice"
                                                                    onClick={(
                                                                      e
                                                                    ) =>
                                                                      addExtension(
                                                                        e,
                                                                        index,
                                                                        optIndex
                                                                      )
                                                                    }
                                                                  >
                                                                    Add
                                                                    extension
                                                                    <img
                                                                      src={
                                                                        path_image +
                                                                        "add-choice.svg"
                                                                      }
                                                                      alt=""
                                                                    />
                                                                  </span>
                                                                ) : (
                                                                  ""
                                                                )}

                                                                {/* {item?.extension
                                                                ?.length > 0 &&
                                                              item?.checked ==
                                                                true ? */}
                                                                {item?.extension
                                                                  ?.length >
                                                                0 ? (
                                                                  <div className="extension">
                                                                    {item?.extension?.map(
                                                                      (
                                                                        extItem,
                                                                        extIndex
                                                                      ) => (
                                                                        <div className="extItem">
                                                                          {extItem?.inputType ==
                                                                          "text" ? (
                                                                            <div className="extOption">
                                                                              <label
                                                                                htmlFor={
                                                                                  extItem?.label
                                                                                }
                                                                              >
                                                                                {
                                                                                  extItem?.label
                                                                                }
                                                                              </label>
                                                                              <input
                                                                                type={
                                                                                  extItem?.inputType
                                                                                }
                                                                                className="form-control"
                                                                                name={`${
                                                                                  extItem?.name
                                                                                    ? extItem?.name
                                                                                    : "dynamic_" +
                                                                                      dynamicFieldNo
                                                                                }`}
                                                                                placeholder={
                                                                                  extItem?.placeholder
                                                                                }
                                                                              />
                                                                            </div>
                                                                          ) : extItem?.inputType ==
                                                                            "radio" ? (
                                                                            <div className="extOption">
                                                                              <label
                                                                                htmlFor={
                                                                                  extItem?.label
                                                                                }
                                                                              >
                                                                                {
                                                                                  extItem?.label
                                                                                }
                                                                              </label>
                                                                              {extItem?.option?.map(
                                                                                (
                                                                                  optItem,
                                                                                  optItemIndex
                                                                                ) => (
                                                                                  <div
                                                                                    className="extOptionItem"
                                                                                    key={
                                                                                      optItemIndex
                                                                                    }
                                                                                  >
                                                                                    <input
                                                                                      type={
                                                                                        extItem?.inputType
                                                                                      }
                                                                                      name={`${
                                                                                        extItem?.name
                                                                                          ? extItem?.name
                                                                                          : "dynamic_" +
                                                                                            dynamicFieldNo
                                                                                      }`}
                                                                                      value={
                                                                                        optItem?.optionValue
                                                                                      }
                                                                                    />
                                                                                    <label
                                                                                      htmlFor={
                                                                                        optItem?.optionLabel
                                                                                      }
                                                                                    >
                                                                                      {
                                                                                        optItem?.optionLabel
                                                                                      }
                                                                                    </label>
                                                                                  </div>
                                                                                )
                                                                              )}
                                                                            </div>
                                                                          ) : extItem?.inputType ==
                                                                            "date" ? (
                                                                            <div className="extOption">
                                                                              <label
                                                                                htmlFor={
                                                                                  extItem?.label
                                                                                }
                                                                              >
                                                                                {" "}
                                                                                {
                                                                                  extItem?.label
                                                                                }
                                                                              </label>
                                                                              <DatePicker
                                                                                name={`${
                                                                                  extItem?.name
                                                                                    ? extItem?.name
                                                                                    : "dynamic_" +
                                                                                      dynamicFieldNo
                                                                                }`}
                                                                                dateFormat="dd/MM/yyyy"
                                                                                className="form-control"
                                                                                placeholderText="Select date"
                                                                                // minDate={currentDate}

                                                                                onKeyDown={(
                                                                                  e
                                                                                ) => {
                                                                                  e.preventDefault();
                                                                                }}
                                                                              />
                                                                            </div>
                                                                          ) : extItem?.inputType ==
                                                                            "checkbox" ? (
                                                                            <div className="extOption">
                                                                              <label
                                                                                htmlFor={
                                                                                  extItem?.label
                                                                                }
                                                                              >
                                                                                {
                                                                                  extItem?.label
                                                                                }
                                                                              </label>
                                                                              {extItem?.option?.map(
                                                                                (
                                                                                  optItem,
                                                                                  optItemIndex
                                                                                ) => (
                                                                                  <div
                                                                                    className="extOptionItem"
                                                                                    key={
                                                                                      optItemIndex
                                                                                    }
                                                                                  >
                                                                                    <input
                                                                                      type={
                                                                                        extItem?.inputType
                                                                                      }
                                                                                      name={`${
                                                                                        extItem?.name
                                                                                          ? extItem?.name
                                                                                          : "dynamic_" +
                                                                                            dynamicFieldNo
                                                                                      }`}
                                                                                      value={
                                                                                        optItem?.optionValue
                                                                                      }
                                                                                    />
                                                                                    <label
                                                                                      htmlFor={
                                                                                        optItem?.optionLabel
                                                                                      }
                                                                                    >
                                                                                      {
                                                                                        optItem?.optionLabel
                                                                                      }
                                                                                    </label>
                                                                                  </div>
                                                                                )
                                                                              )}
                                                                            </div>
                                                                          ) : extItem?.inputType ==
                                                                            "selection" ? (
                                                                            <div className="extOption">
                                                                              <label
                                                                                htmlFor={
                                                                                  extItem?.label
                                                                                }
                                                                              >
                                                                                {
                                                                                  extItem?.label
                                                                                }
                                                                              </label>
                                                                              <Select
                                                                                name={`${
                                                                                  extItem?.name
                                                                                    ? extItem?.name
                                                                                    : "dynamic_" +
                                                                                      dynamicFieldNo
                                                                                }`}
                                                                                className="dropdown-basic-button split-button-dropup webinar-select"
                                                                                options={
                                                                                  extItem?.label?.includes(
                                                                                    "country"
                                                                                  ) ||
                                                                                  extItem?.label?.includes(
                                                                                    "Country"
                                                                                  )
                                                                                    ? countryList
                                                                                    : extItem?.label?.includes(
                                                                                        "state"
                                                                                      ) ||
                                                                                      extItem?.label?.includes(
                                                                                        "State"
                                                                                      )
                                                                                    ? stateOptions
                                                                                    : extItem?.option?.map(
                                                                                        (
                                                                                          item
                                                                                        ) => ({
                                                                                          label:
                                                                                            item?.optionLabel,
                                                                                          value:
                                                                                            item?.optionLabel,
                                                                                        })
                                                                                      )
                                                                                }
                                                                                placeholder="Please select the value"
                                                                              />
                                                                            </div>
                                                                          ) : extItem?.inputType ==
                                                                            "textarea" ? (
                                                                            <div className="extOption">
                                                                              <label
                                                                                htmlFor={
                                                                                  extItem?.label
                                                                                }
                                                                              >
                                                                                {
                                                                                  extItem?.label
                                                                                }
                                                                              </label>

                                                                              <textarea
                                                                                className="form-control"
                                                                                name={`${
                                                                                  extItem?.name
                                                                                    ? extItem?.name
                                                                                    : "dynamic_" +
                                                                                      dynamicFieldNo
                                                                                }`}
                                                                                type={
                                                                                  extItem?.inputType
                                                                                }
                                                                                placeholder={
                                                                                  extItem?.placeholder
                                                                                }
                                                                              />
                                                                            </div>
                                                                          ) : (
                                                                            ""
                                                                          )}
                                                                          <button
                                                                            className="btn-edit btn-filled"
                                                                            onClick={(
                                                                              e
                                                                            ) =>
                                                                              editExtendedFeildData(
                                                                                e,
                                                                                index,
                                                                                optIndex,
                                                                                extIndex
                                                                              )
                                                                            }
                                                                          >
                                                                            <svg
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              width="20"
                                                                              height="20"
                                                                              viewBox="0 0 20 20"
                                                                              fill="none"
                                                                            >
                                                                              <path
                                                                                fill-rule="evenodd"
                                                                                clip-rule="evenodd"
                                                                                d="M3.15259 12.8329C2.97037 13.0151 2.84302 13.2448 2.78507 13.4959L1.90302 17.3182C1.72646 18.0833 2.41215 18.7689 3.17722 18.5924L6.99946 17.7103C7.25056 17.6524 7.48033 17.525 7.66255 17.3428L18.0346 6.97075C18.8157 6.1897 18.8157 4.92337 18.0346 4.14232L16.3531 2.46079C15.572 1.67974 14.3057 1.67974 13.5247 2.46079L3.15259 12.8329ZM3.52201 16.9734L4.2386 13.8682L12.2063 5.90046L14.5949 8.2891L6.62724 16.2568L3.52201 16.9734ZM15.6556 7.22844L13.267 4.8398L14.5853 3.52145C14.7806 3.32618 15.0972 3.32618 15.2924 3.52145L16.974 5.20298C17.1692 5.39824 17.1692 5.71483 16.974 5.91009L15.6556 7.22844Z"
                                                                                fill="#0066be"
                                                                              />
                                                                            </svg>
                                                                          </button>
                                                                          <button
                                                                            className="dlt_btn_event btn-filled"
                                                                            onClick={(
                                                                              e
                                                                            ) => {
                                                                              // setConfirmationPopup(true);
                                                                              deleteExtField(
                                                                                e,
                                                                                data,
                                                                                index,
                                                                                optIndex,
                                                                                extIndex
                                                                              );
                                                                            }}
                                                                          >
                                                                            <svg
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              width="40"
                                                                              height="40"
                                                                              viewBox="0 0 40 40"
                                                                              fill="none"
                                                                            >
                                                                              <path
                                                                                d="M24.8608 31.7609C25.1362 32.0343 25.5082 32.1901 25.8977 32.1951C26.2871 32.1901 26.6592 32.0343 26.9346 31.7609C27.21 31.4876 27.367 31.1183 27.3721 30.7317V15.122C27.3721 14.7338 27.2167 14.3616 26.9402 14.0872C26.6637 13.8127 26.2887 13.6585 25.8977 13.6585C25.5067 13.6585 25.1316 13.8127 24.8551 14.0872C24.5786 14.3616 24.4233 14.7338 24.4233 15.122V30.7317C24.4284 31.1183 24.5854 31.4876 24.8608 31.7609Z"
                                                                                fill="#0066be"
                                                                              />
                                                                              <path
                                                                                d="M14.1027 32.1951C13.7133 32.1901 13.3412 32.0343 13.0658 31.7609C12.7904 31.4876 12.6334 31.1183 12.6283 30.7317V15.122C12.6283 14.7338 12.7837 14.3616 13.0602 14.0872C13.3367 13.8127 13.7117 13.6585 14.1027 13.6585C14.4937 13.6585 14.8687 13.8127 15.1452 14.0872C15.4217 14.3616 15.5771 14.7338 15.5771 15.122V30.7317C15.572 31.1183 15.415 31.4876 15.1396 31.7609C14.8642 32.0343 14.4921 32.1901 14.1027 32.1951Z"
                                                                                fill="#0066be"
                                                                              />
                                                                              <path
                                                                                d="M18.9633 31.7609C19.2387 32.0343 19.6107 32.1901 20.0002 32.1951C20.3896 32.1901 20.7617 32.0343 21.0371 31.7609C21.3125 31.4876 21.4695 31.1183 21.4746 30.7317V15.122C21.4746 14.7338 21.3192 14.3616 21.0427 14.0872C20.7662 13.8127 20.3912 13.6585 20.0002 13.6585C19.6092 13.6585 19.2341 13.8127 18.9577 14.0872C18.6812 14.3616 18.5258 14.7338 18.5258 15.122V30.7317C18.5309 31.1183 18.6879 31.4876 18.9633 31.7609Z"
                                                                                fill="#0066be"
                                                                              />
                                                                              <path
                                                                                fill-rule="evenodd"
                                                                                clip-rule="evenodd"
                                                                                d="M27.3721 3.90252V5.85366H37.6923C38.0833 5.85366 38.4583 6.00784 38.7348 6.28228C39.0113 6.55673 39.1667 6.92895 39.1667 7.31707C39.1667 7.70519 39.0113 8.07742 38.7348 8.35186C38.4583 8.62631 38.0833 8.78049 37.6923 8.78049H35.1489L33.5251 34.4195C33.4302 35.9294 32.7595 37.3467 31.6494 38.3833C30.5393 39.4199 29.0731 39.998 27.5489 40H12.4512C10.9407 39.9783 9.49405 39.3915 8.40063 38.3569C7.30721 37.3222 6.64757 35.916 6.55362 34.4195L4.85518 8.78049H2.3077C1.91668 8.78049 1.54167 8.62631 1.26517 8.35186C0.988677 8.07742 0.833344 7.70519 0.833344 7.31707C0.833344 6.92895 0.988677 6.55673 1.26517 6.28228C1.54167 6.00784 1.91668 5.85366 2.3077 5.85366H12.6283V3.80495C12.6532 2.80361 13.0651 1.85011 13.7787 1.14183C14.4922 0.433555 15.4529 0.0247359 16.4617 0H23.5387C24.5643 0.0254581 25.5393 0.447827 26.2555 1.17695C26.9717 1.90607 27.3724 2.88419 27.3721 3.90252ZM24.4233 3.90252V5.85366H15.5771V3.90252C15.5771 3.66964 15.6703 3.4463 15.8362 3.28163C16.0021 3.11696 16.2271 3.02445 16.4617 3.02445H23.5387C23.7733 3.02445 23.9983 3.11696 24.1642 3.28163C24.3301 3.4463 24.4233 3.66964 24.4233 3.90252ZM9.40411 34.2439L7.8904 8.78049L32.1883 8.87805L30.596 34.2439C30.5414 35.0101 30.1971 35.7274 29.632 36.2522C29.0668 36.7769 28.3228 37.0702 27.5489 37.0732H12.4512C11.676 37.0748 10.9293 36.7831 10.3632 36.2574C9.7971 35.7318 9.45412 35.0117 9.40411 34.2439Z"
                                                                                fill="#0066be"
                                                                              />
                                                                            </svg>
                                                                          </button>
                                                                        </div>
                                                                      )
                                                                    )}
                                                                  </div>
                                                                ) : (
                                                                  ""
                                                                )}
                                                              </div>
                                                            )
                                                          )}
                                                        </div>
                                                      ) : data?.inputType ==
                                                        "selection" ? (
                                                        <div
                                                          className="slt-opt"
                                                          key={index}
                                                        >
                                                          <Select
                                                            className="dropdown-basic-button split-button-dropup webinar-select"
                                                            name={`${
                                                              data?.name
                                                                ? data?.name
                                                                : "dynamic_" +
                                                                  dynamicFieldNo
                                                            }`}
                                                            options={
                                                              data?.label?.includes(
                                                                "country"
                                                              ) ||
                                                              data?.label?.includes(
                                                                "Country"
                                                              )
                                                                ? countryList
                                                                : data?.label?.includes(
                                                                    "state (us)"
                                                                  )
                                                                ? stateOptions
                                                                : data?.option?.map(
                                                                    (item) => ({
                                                                      label:
                                                                        item?.optionLabel,
                                                                      value:
                                                                        item?.optionLabel,
                                                                    })
                                                                  )
                                                            }
                                                            placeholder="Please select the value"
                                                          />
                                                        </div>
                                                      ) : data?.inputType ==
                                                        "textarea" ? (
                                                        <div
                                                          className="slt-opt"
                                                          key={index}
                                                        >
                                                          <textarea
                                                            className="form-control"
                                                            name={`${
                                                              data?.name
                                                                ? data?.name
                                                                : "dynamic_" +
                                                                  dynamicFieldNo
                                                            }`}
                                                            type={
                                                              data?.inputType
                                                            }
                                                            placeholder={
                                                              data?.placeholder
                                                            }
                                                          />
                                                        </div>
                                                      ) : (
                                                        <input
                                                          name={`${
                                                            data?.name
                                                              ? data?.name
                                                              : "dynamic_" +
                                                                dynamicFieldNo
                                                          }`}
                                                          className="form-control"
                                                          type={data?.inputType}
                                                          placeholder={
                                                            data?.placeholder
                                                          }
                                                        />
                                                      )}
                                                      <button
                                                        className="btn-edit btn-filled"
                                                        onClick={(e) =>
                                                          editFieldData(
                                                            e,
                                                            index
                                                          )
                                                        }
                                                      >
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          width="20"
                                                          height="20"
                                                          viewBox="0 0 20 20"
                                                          fill="none"
                                                        >
                                                          <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M3.15259 12.8329C2.97037 13.0151 2.84302 13.2448 2.78507 13.4959L1.90302 17.3182C1.72646 18.0833 2.41215 18.7689 3.17722 18.5924L6.99946 17.7103C7.25056 17.6524 7.48033 17.525 7.66255 17.3428L18.0346 6.97075C18.8157 6.1897 18.8157 4.92337 18.0346 4.14232L16.3531 2.46079C15.572 1.67974 14.3057 1.67974 13.5247 2.46079L3.15259 12.8329ZM3.52201 16.9734L4.2386 13.8682L12.2063 5.90046L14.5949 8.2891L6.62724 16.2568L3.52201 16.9734ZM15.6556 7.22844L13.267 4.8398L14.5853 3.52145C14.7806 3.32618 15.0972 3.32618 15.2924 3.52145L16.974 5.20298C17.1692 5.39824 17.1692 5.71483 16.974 5.91009L15.6556 7.22844Z"
                                                            fill="#0066be"
                                                          />
                                                        </svg>
                                                      </button>
                                                      <button
                                                        className="dlt_btn_event btn-filled"
                                                        onClick={(e) => {
                                                          deleteField(
                                                            e,
                                                            data,
                                                            index
                                                          );
                                                        }}
                                                      >
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          width="40"
                                                          height="40"
                                                          viewBox="0 0 40 40"
                                                          fill="none"
                                                        >
                                                          <path
                                                            d="M24.8608 31.7609C25.1362 32.0343 25.5082 32.1901 25.8977 32.1951C26.2871 32.1901 26.6592 32.0343 26.9346 31.7609C27.21 31.4876 27.367 31.1183 27.3721 30.7317V15.122C27.3721 14.7338 27.2167 14.3616 26.9402 14.0872C26.6637 13.8127 26.2887 13.6585 25.8977 13.6585C25.5067 13.6585 25.1316 13.8127 24.8551 14.0872C24.5786 14.3616 24.4233 14.7338 24.4233 15.122V30.7317C24.4284 31.1183 24.5854 31.4876 24.8608 31.7609Z"
                                                            fill="#0066be"
                                                          />
                                                          <path
                                                            d="M14.1027 32.1951C13.7133 32.1901 13.3412 32.0343 13.0658 31.7609C12.7904 31.4876 12.6334 31.1183 12.6283 30.7317V15.122C12.6283 14.7338 12.7837 14.3616 13.0602 14.0872C13.3367 13.8127 13.7117 13.6585 14.1027 13.6585C14.4937 13.6585 14.8687 13.8127 15.1452 14.0872C15.4217 14.3616 15.5771 14.7338 15.5771 15.122V30.7317C15.572 31.1183 15.415 31.4876 15.1396 31.7609C14.8642 32.0343 14.4921 32.1901 14.1027 32.1951Z"
                                                            fill="#0066be"
                                                          />
                                                          <path
                                                            d="M18.9633 31.7609C19.2387 32.0343 19.6107 32.1901 20.0002 32.1951C20.3896 32.1901 20.7617 32.0343 21.0371 31.7609C21.3125 31.4876 21.4695 31.1183 21.4746 30.7317V15.122C21.4746 14.7338 21.3192 14.3616 21.0427 14.0872C20.7662 13.8127 20.3912 13.6585 20.0002 13.6585C19.6092 13.6585 19.2341 13.8127 18.9577 14.0872C18.6812 14.3616 18.5258 14.7338 18.5258 15.122V30.7317C18.5309 31.1183 18.6879 31.4876 18.9633 31.7609Z"
                                                            fill="#0066be"
                                                          />
                                                          <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M27.3721 3.90252V5.85366H37.6923C38.0833 5.85366 38.4583 6.00784 38.7348 6.28228C39.0113 6.55673 39.1667 6.92895 39.1667 7.31707C39.1667 7.70519 39.0113 8.07742 38.7348 8.35186C38.4583 8.62631 38.0833 8.78049 37.6923 8.78049H35.1489L33.5251 34.4195C33.4302 35.9294 32.7595 37.3467 31.6494 38.3833C30.5393 39.4199 29.0731 39.998 27.5489 40H12.4512C10.9407 39.9783 9.49405 39.3915 8.40063 38.3569C7.30721 37.3222 6.64757 35.916 6.55362 34.4195L4.85518 8.78049H2.3077C1.91668 8.78049 1.54167 8.62631 1.26517 8.35186C0.988677 8.07742 0.833344 7.70519 0.833344 7.31707C0.833344 6.92895 0.988677 6.55673 1.26517 6.28228C1.54167 6.00784 1.91668 5.85366 2.3077 5.85366H12.6283V3.80495C12.6532 2.80361 13.0651 1.85011 13.7787 1.14183C14.4922 0.433555 15.4529 0.0247359 16.4617 0H23.5387C24.5643 0.0254581 25.5393 0.447827 26.2555 1.17695C26.9717 1.90607 27.3724 2.88419 27.3721 3.90252ZM24.4233 3.90252V5.85366H15.5771V3.90252C15.5771 3.66964 15.6703 3.4463 15.8362 3.28163C16.0021 3.11696 16.2271 3.02445 16.4617 3.02445H23.5387C23.7733 3.02445 23.9983 3.11696 24.1642 3.28163C24.3301 3.4463 24.4233 3.66964 24.4233 3.90252ZM9.40411 34.2439L7.8904 8.78049L32.1883 8.87805L30.596 34.2439C30.5414 35.0101 30.1971 35.7274 29.632 36.2522C29.0668 36.7769 28.3228 37.0702 27.5489 37.0732H12.4512C11.676 37.0748 10.9293 36.7831 10.3632 36.2574C9.7971 35.7318 9.45412 35.0117 9.40411 34.2439Z"
                                                            fill="#0066be"
                                                          />
                                                        </svg>
                                                      </button>
                                                    </div>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      ) : null}
                                    </div>
                                    <div className="d-flex align-items-center reg-color-set">
                                      <div className="form-group">
                                        <label>Select label color</label>
                                        <div className="option-action">
                                          <div className="color-pick">
                                            <img
                                              src={
                                                path_image + "color-picker.svg"
                                              }
                                              alt=""
                                            />
                                            <input
                                              type="color"
                                              title="Choose your color"
                                              onChange={(e) =>
                                                onColorChange(e, "labelColor")
                                              }
                                              value={
                                                formData?.labelColor
                                                  ? formData?.labelColor
                                                  : ""
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label>Select background color</label>
                                        <div className="option-action">
                                          <div className="color-pick">
                                            <img
                                              src={
                                                path_image + "color-picker.svg"
                                              }
                                              alt=""
                                            />
                                            <input
                                              type="color"
                                              title="Choose your color"
                                              onChange={(e) =>
                                                onColorChange(
                                                  e,
                                                  "backgroundColor"
                                                )
                                              }
                                              value={
                                                formData?.backgroundColor
                                                  ? formData?.backgroundColor
                                                  : ""
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                        {/* <div className="d-flex justify-content-center">
                          <Button
                            type="button"
                            className="save btn-bordered"
                            onClick={handlePreview}
                          >
                            Preview
                          </Button>
                          <Button type="submit" className="save">
                            Save
                          </Button>
                        </div> */}
                      </Form>
                    </div>
                  </Col>
                  <Col md={4} sm={5}>
                    <div className="registration-right">
                      <div
                        className="logo-section header-section"
                        onClick={(e) => handleFileSelect(e, "logoImageUrl")}
                      >
                        {!logo && (
                          <h4
                            className="logo-img-section header-img-section"
                            id="uploadButton"
                          >
                            Upload Logo
                          </h4>
                        )}
                        <img className="logo-img" src={logo} />
                        <div className="logo-text header-text">
                          {logo && (
                            <button
                              className="btn btn-outline-primary"
                              title="Edit user"
                            >
                              <img
                                src={path + "edit-button.svg"}
                                alt="Edit"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFileSelect(e, "logoImageUrl");
                                }}
                              />
                            </button>
                          )}

                          {logo && (
                            <button
                              className="dlt_btn_event btn-voilet"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteLogoImage(e, "logoImageUrl");
                              }}
                            >
                              <img
                                title="Delete"
                                src={path_image + "delete-icon.svg"}
                                alt="Delete Row"
                              />
                            </button>
                          )}
                        </div>
                      </div>

                      <div
                        className="header-section"
                        onClick={(e) => handleFileSelect(e, "headerImageUrl")}
                      >
                        {!file && (
                          <h4 className="header-img-section" id="uploadButton">
                            Upload header
                          </h4>
                        )}
                        <img className="header-img" src={file} />
                        <div className="header-text">
                          {file && (
                            <button
                              className="btn btn-outline-primary"
                              title="Edit user"
                            >
                              <img
                                src={path + "edit-button.svg"}
                                alt="Edit"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFileSelect(e, "headerImageUrl");
                                }}
                              />
                            </button>
                          )}

                          {file && (
                            <button
                              className="dlt_btn_event btn-voilet"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteHeaderImage(e, "headerImageUrl");
                              }}
                            >
                              <img
                                title="Delete"
                                src={path_image + "delete-icon.svg"}
                                alt="Delete Row"
                              />
                            </button>
                          )}
                        </div>
                      </div>

                      <div
                        className="footer-section"
                        onClick={(e) => handleFileSelect(e, "footerImageUrl")}
                      >
                        {!foot && (
                          <h4 className="footer-img-section">Upload footer</h4>
                        )}
                        <img className="footer-img" src={foot} />
                        <div className="footer-text">
                          {foot && (
                            <button
                              className="btn btn-outline-primary"
                              title="Edit user"
                            >
                              <img
                                src={path + "edit-button.svg"}
                                alt="Edit"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFileSelect(e, "footerImageUrl");
                                }}
                              />
                            </button>
                          )}
                          {foot && (
                            <button
                              className="dlt_btn_event btn-voilet"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFooterImage(e, "footerImageUrl");
                              }}
                            >
                              <img
                                title="Delete"
                                src={path_image + "delete-icon.svg"}
                                alt="Delete Row"
                              />
                            </button>
                          )}
                        </div>
                      </div>
                      {/* <div className="registration-preview">
                            <div className="registration-form-view">

                            </div>
                    </div> */}
                    </div>
                  </Col>
                </Row>
              </div>
            ) : apiStatus?(
              <div className="select-template">
                <h3>Please select the template first</h3>
              </div>
            ):""}
          </div>
        </div>
      </Col>
      <CommonAddQuestionModal
        show={showModal}
        onClose={handleAddQuestionModalClose}
        handleSave={handleModalSave}
        formLabel={formData?.body}
        fieldData={fieldData}
        dynamicFieldNo={dynamicFieldNo}
      />
      <CommonExtensionModal
        show={showExtensionModal}
        onClose={handleExtensionModalClose}
        handleSave={handleExtensionModalSave}
        formLabel={formData?.body}
        extensionData={extFieldData}
        dynamicFieldNo={dynamicFieldNo}
      />
      <CommonConfirmModel
        show={confirmationpopup}
        onClose={handleCommonConfirmModal}
        fun={saveClicked}
        popupMessage={popupMessage}
        path_image={path_image}
      />

      {isPrevClicked && (
        <Modal
          show={isPrevClicked}
          onHide={handleClose}
          id="add_hcp"
          className="event_edit"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Preview{" "}
              </h5>
              <button
                type="button"
                onClick={handleClose}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <>
              {/* <p>You are previewing the  saved data .</p> */}

              {/* <iframe
                src={`/event-registration?event=${event_code}`}
                width="100%"
                height="500px"
                title="Event Registration"
              /> */}
              <div className="webinar-popup">
              <RegistrationPage
                prevData={{
                  eventId: eventData?.event_id,
                  companyId: eventData?.company_id,
                  content: JSON.stringify(formData),
                  eventCode: event_code,
                }}
              />
              </div>
            </>
          </Modal.Body>
        </Modal>
      )}

      <Modal className="modal send-confirm" id="delete-confirm" show={showModalPreview} onHide={handleCloseModal}>
        <Modal.Header>
          <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleCloseModal}></button>
        </Modal.Header>
        <Modal.Body>
          <>
            <img src={path_image + "alert.png"} alt="" />
            <h4>Please Select Template First</h4>
            <div className="modal-buttons">
              <button type="button" className="btn btn-primary btn-bordered" onClick={handleCloseModal}>
                Okay
              </button>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WebinarRegistration;
