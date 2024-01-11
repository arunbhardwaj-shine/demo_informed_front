import React, { useEffect, useRef, useState } from "react";
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
import templateData from "./template.json";
import moment from "moment";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
let currentDate = new Date(
  moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")
);
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
let dynamicFieldNo = 0;
const template = {
  1:["logo","header"],
  2:['logo'],
  3:['logo','header','footer'],
  4:[]
}
const WebinarRegistration = () => {
  const { eventIdContext, handleEventId } = useSidebar();
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
  const resizeTextArea = (index) => {
    const textAreaRef = textAreaRefs.current[index];
    // console.log(textAreaRef);

    if (textAreaRef) {
      // console.log(textAreaRef);
      textAreaRef.style.height = "auto";
      textAreaRef.style.height = textAreaRef.scrollHeight + "px";
    }
  };
  // location?.state?.event_code ? location?.state?.event_code : ""
  const [event_code, setEventCode] = useState(
    location?.state?.eventCode
      ? location?.state?.eventCode
      : eventIdContext?.eventCode
      ? eventIdContext?.eventCode
      : JSON.parse(localStorage.getItem("EventIdContext"))?.eventCode
  );
  const [logo, setLogo] = useState();
  const [file, setFile] = useState();
  const [foot, setFoot] = useState();
  const [showModal, setModal] = useState(false);
  const [showExtensionModal, setExtensionModal] = useState(false);
  const [isFormChange, setIsFormChange] = useState(false);
  const [isDataSaved, setIsDataSaved] = useState(true);
  const [save, setSave] = useState(0);
  const [isSavedClicked, setIsSavedClicked] = useState(false);
  const [rawData, setRawData] = useState({});
  const [commonConfirmModelFun, setCommonConfirmModelFun] = useState(() => {});
  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
  });
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [tempTemplate, setTempTemplate] = useState();
  const [apiStatus, setApiStatus] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    pageTitle: "",
    bodyText: "",
    logoImageUrl: "",
    headerImageUrl: "",
    body: [],
    footerImageUrl: "",
    typedTextColor: "",
    placeholderTextColor: "",
    dropdownOptionColor: "",
    dropdownHoveringColor: "",
    selectedTextColor: "",
    labelColor: "",
    optionColor: "",
    backgroundColor: "",
    totalFieldNo: 0,
    templateId: 0,
  });
  const [originalFormData, setOriginalFormData] = useState({
    title: "",
    pageTitle: "",
    bodyText: "",
    logoImageUrl: "",
    headerImageUrl: "",
    body: [],
    footerImageUrl: "",
    labelColor: "",
    typedTextColor: "",
    placeholderTextColor: "",
    dropdownOptionColor: "",
    dropdownHoveringColor: "",
    selectedTextColor: "",
    optionColor: "",
    backgroundColor: "",
    totalFieldNo: 0,
    templateId: 0,
  });
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const [eventData, setEventData] = useState({
    event_id: location?.state?.eventId
      ? location?.state?.eventId
      : eventIdContext?.eventId
      ? eventIdContext?.eventId
      : localStorageEvent?.eventId,
    company_id: location?.state?.companyId
      ? location?.state?.companyId
      : eventIdContext?.companyId
      ? eventIdContext?.companyId
      : localStorageEvent?.companyId,
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
  const textAreaRefs = useRef(null);

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

    // getAllEvents();

    // if(!eventIdContext){
    //   handleEventId(localStorageEvent)
    // }
    if (event_code) {
      getWebinarData(event_code);
    }
  }, []);
  const getWebinarData = async (event_code) => {
    // console.log(event_code,'event_code')
    try {
      loader("show");
      setApiStatus(false);
      const response = await getData(
        `${ENDPOINT.GET_REGISTRATION_FORM}/${event_code}`
      );
      const hadData = response?.data?.data;
      let raw = hadData?.raw_description
        ? JSON.parse(hadData?.raw_description)
        : {};
      let parseSpeakerName = "";
      try {
        parseSpeakerName = JSON.parse(raw?.speaker_name);
      } catch {
        parseSpeakerName = raw?.speaker_name
          ? [{ speakerName: raw?.speaker_name }]
          : [{ speakerName: "" }];
      }
      parseSpeakerName = parseSpeakerName
        ?.map((item) => item?.speakerName)
        .join(" , ");
      setRawData({ ...raw, speaker_name: parseSpeakerName });
      if (hadData?.event_id != undefined && hadData?.company_id != undefined) {
        setEventData({
          ...eventData,
          event_id: hadData?.event_id,
          company_id: hadData?.company_id,
        });
      }
      const newFormData = hadData?.content ? JSON.parse(hadData?.content) : [];

      if (newFormData?.length == 0) {
        setIsDataSaved(false);
      }
      dynamicFieldNo = newFormData?.totalFieldNo
        ? newFormData?.totalFieldNo
        : dynamicFieldNo;

      let tempId = newFormData?.templateId;
      if (tempId) {
        let templateListData = [...templateList];
        let tempData = templateListData[tempId - 1];
        templateListData[tempId - 1] = templateListData[0];
        templateListData[0] = tempData;
        if (!newFormData?.eventDetails) {
          tempData.eventDetails.eventStartDate.value = new Date(raw?.dateStart);
          tempData.eventDetails.eventEndDate.value = new Date(raw?.dateEnd);
          tempData.eventDetails.eventStartTime.value = `${raw?.dateStartHour}:${raw?.dateStartMin}`;
          tempData.eventDetails.eventEndTime.value = `${raw?.dateEndHour}:${raw?.dateEndMin}`;
          tempData.eventDetails.eventLocation.value = raw?.location || "";
          tempData.eventDetails.speakerName.value = raw?.speaker_name || "";
          newFormData.eventDetails = tempData.eventDetails;
        } else {
          if (
            newFormData.eventDetails.eventStartDate?.value == "" &&
            newFormData.eventDetails.eventStartDate?.value != undefined
          ) {
            newFormData.eventDetails.eventStartDate.value = new Date(
              raw?.dateStart
            );
          }
          if (
            newFormData.eventDetails.eventEndDate?.value == "" &&
            newFormData.eventDetails.eventEndDate?.value != undefined
          ) {
            newFormData.eventDetails.eventEndDate.value = new Date(
              raw?.dateEnd
            );
          }

          if (
            newFormData.eventDetails.eventStartTime?.value == "" &&
            newFormData.eventDetails.eventStartTime?.value != undefined
          ) {
            newFormData.eventDetails.eventStartTime.value = `${raw?.dateStartHour}:${raw?.dateStartMin}`;
          }

          if (
            newFormData.eventDetails.eventEndTime?.value == "" &&
            newFormData.eventDetails.eventEndTime?.value != undefined
          ) {
            newFormData.eventDetails.eventEndTime.value = `${raw?.dateEndHour}:${raw?.dateEndMin}`;
          }

          if (
            newFormData.eventDetails.eventLocation?.value == "" &&
            newFormData.eventDetails.eventLocation?.value != undefined
          ) {
            newFormData.eventDetails.eventLocation.value = `${raw?.location}`;
          }

          if (
            newFormData?.eventDetails?.speakerName?.value == "" &&
            newFormData?.eventDetails?.speakerName?.value != undefined
          ) {
            newFormData.eventDetails.speakerName.value = `${raw?.speaker_name}`;
          }
        }
        setTemplateList(templateListData);
        setLogo(
          newFormData?.logoImageUrl
            ? newFormData?.logoImageUrl
            : templateList[[tempId - 1 < 0 ? 0 : tempId - 1]]?.logoImageUrl
        );
      }
      setFormData(newFormData);
      // console.log(newFormData);
      if(Object.keys(newFormData.eventDetails)?.length>0){        
        textAreaRefs.current=Array(Object.keys(newFormData.eventDetails)?.length).fill(null)
      }
      setOriginalFormData(JSON.parse(JSON.stringify(newFormData)));
      setActiveIndex(tempId ? tempId : 0);
      setFile(newFormData?.headerImageUrl ? newFormData?.headerImageUrl : "");
      setFoot(newFormData?.footerImageUrl ? newFormData?.footerImageUrl : "");
      setApiStatus(true);
    } catch (err) {
      setApiStatus(true);
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  const getAllEvents = async () => {
    try {
      loader("show");
      setApiStatus(false);
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
          setEventData({
            ...eventData,
            event_id: selectedData?.value,
            company_id: selectedData?.companyId,
          });
          setEventCode(selectedData.code);
          getWebinarData(selectedData.code);
        }
      }
    } catch (err) {
      loader("hide");
      console.log(err);
    }
  };

  const handleSelectChange = async (event) => {
    console.log(event);
    setIsDataSaved(false);
    await getWebinarData(event.code);
    setEventCode(event.code);
    setSelectedItem(event);
    if (event?.value && event?.companyId) {
      setEventData({
        ...eventData,
        event_id: event?.value,
        company_id: event?.companyId,
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
    if (isSelectedName && !isSelectedName?.includes("eventDetails")) {
      let updateFormBody = formData?.body;

      if (e?.target?.checked == true) {
        if (
          formData?.body?.find(
            (item, index) =>
              item?.name?.toLowerCase() == isSelectedName?.toLowerCase()
          )
        ) {
          toast.error("Label already exist");
          return;
        }
        if (isSelectedName == "userEmail" || isSelectedName == "userName") {
          let newObj = {
            // label: isSelectedName,
            label: isSelectedName == "userEmail" ? "Email" : "Name",
            name: isSelectedName,
            inputType: isSelectedName == "userEmail" ? "email" : "text",
            placeholder: `Please enter ${
              isSelectedName == "userEmail" ? "Email" : "Name"
            }`,
            option: [],
            required: "yes",
            addSpace: 10,
          };
          updateFormBody?.push(newObj);
        } else if (isSelectedName == "travel accomodation") {
          let newObj = {
            // label: isSelectedName,
            label:
              isSelectedName.charAt(0).toUpperCase() + isSelectedName.slice(1),
            name: isSelectedName,
            inputType: "radio",
            required: "yes",
            addSpace: 10,

            option: [
              {
                optionLabel: "Organize my own travel",
                extension: [],
                checked: "",
              },
              {
                optionLabel:
                  "Have my travel arranged by the meeting organizers",
                checked: "",

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
                      { optionLabel: "Morning", checked: "" },
                      { optionLabel: "Afternoon", checked: "" },
                      { optionLabel: "Evening", checked: "" },
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
        } else if (isSelectedName == "eventDetails") {
          let newObj = {};
          updateFormBody?.push(newObj);
        } else if (isSelectedName == "consent") {
          let newObj = {
            // label: isSelectedName,
            label:
              isSelectedName.charAt(0).toUpperCase() + isSelectedName.slice(1),
            name: isSelectedName,

            inputType: "checkbox",
            required: "yes",
            addSpace: 10,

            option: [
              {
                optionLabel:
                  "Being contacted by FVIII Academy organizing team for the purpose of this meeting*",
                checked: "",
              },
              {
                optionLabel: "Receive future materials from the FVIII Academy",
                checked: "",
              },
            ],
          };
          updateFormBody?.push(newObj);
        } else if (isSelectedName == "onesource_consent") {
          let newObj = {
            // label: isSelectedName,
            label: "I also consent to: ",
            name: "onesource_consent",

            inputType: "checkbox",
            required: "yes",
            addSpace: 10,

            option: [
              {
                optionLabel:
                  "Receive One Source updates and new materials from Octapharma.",
                checked: "",
              },
              {
                optionLabel: "Receive invitations to future events.",
                checked: "",
              },
              {
                optionLabel: "Both of the options above.",
                checked: "",
              },
              {
                optionLabel: "None of the options above.",
                checked: "",
              },
            ],
          };
          updateFormBody?.push(newObj);
        } else {
          let newObj = {
            name: isSelectedName,
            // label: isSelectedName,
            label:
              isSelectedName.charAt(0).toUpperCase() + isSelectedName.slice(1),
            inputType: "selection",
            placeholder: `Please enter ${isSelectedName}`,
            option: [],
            required: "yes",
            addSpace: 10,

            showAllCountries: false,
          };
          updateFormBody?.push(newObj);
        }
        setFormData({ ...formData, body: updateFormBody });
      } else if (e?.target?.checked == false) {
        let index = updateFormBody?.findIndex((item, index) => {
          return item?.name == isSelectedName;
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
      let name = e?.target?.name;
      if (name?.includes("eventDetails")) {
        const fieldName = e.target.name.split("-")[1];
        let isColor = name.includes("color");
        if (isColor) {
          setFormData({
            ...formData,
            eventDetails: {
              ...formData.eventDetails,
              [fieldName]: {
                ...formData.eventDetails?.[fieldName],
                color: e.target.value,
              },
            },
            addSpace: 10,
            required: "yes",
          });
        } else {
          setFormData({
            ...formData,
            eventDetails: {
              ...formData.eventDetails,
              [fieldName]: {
                ...formData.eventDetails?.[fieldName],
                value: e.target.value,
              },
            },
            addSpace: 10,
            required: "yes",
          });
        }
      } else if (isSelectedName?.includes("eventDetails")) {
        const fieldName = isSelectedName.split("-")[1];
        let isColor = e?.target?.name.includes("color");
        if (isColor) {
          setFormData({
            ...formData,
            eventDetails: {
              ...formData.eventDetails,
              [fieldName]: {
                ...formData.eventDetails?.[fieldName],
                color: e,
              },
            },
            addSpace: 10,

            required: "yes",
          });
        } else {
          if (fieldName == "eventStartDate") {
            setFormData({
              ...formData,
              eventDetails: {
                ...formData.eventDetails,
                [fieldName]: {
                  ...formData.eventDetails?.[fieldName],
                  value: e,
                },
                ["eventEndDate"]: {
                  ...formData.eventDetails?.eventEndDate,
                  value: e,
                },
              },
              addSpace: 10,

              required: "yes",
            });
          } else {
            setFormData({
              ...formData,
              eventDetails: {
                ...formData.eventDetails,
                [fieldName]: {
                  ...formData.eventDetails?.[fieldName],
                  value: e,
                },
              },
              addSpace: 10,
              required: "yes",
            });
          }
        }
      } else {
        setFormData({
          ...formData,
          [e.target.name]: e?.target?.value,
          required: "yes",
        });
      }
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
    if (!formData?.templateId) {
      setShowModalPreview(true);
      return;
    }

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
      // setFormData({
      //   title: "",
      //   pageTitle: "",
      //   bodyText: "",
      //   logoImageUrl: "",
      //   headerImageUrl: "",
      //   body: [],
      //   footerImageUrl: "",
      //   labelColor: "",
      //   optionColor: "",
      //   backgroundColor: "",
      // });

      // setFile("");
      // setFoot("");
      // setLogo("");
      setSave((save)=>save+1);
      setIsDataSaved(true);
    } catch (err) {
      console.error("--err", err);
    } finally {
      loader("hide");
    }
    if (e) {
      // navigate("/webinar/event-listing");
      // setIsSavedClicked(true)
      toast.success("Your changes has been saved successfully !");
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
  const handlePreviewInNewTab = async (e, newLink) => {
    e.preventDefault();
    if (!formData?.templateId) {
      setShowModalPreview(true);
      return;
    }

    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/event-registration?event=${event_code}`
      );

      // Open link in a new tab
      window.open(
        `${window.location.origin}/event-registration?event=${event_code}`,
        "_blank"
      );
    } catch (error) {
      console.error("Error preview in new window:", error);
    }
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
    } else if (isSelectedName == "typedTextColor") {
      setFormData({ ...formData, typedTextColor: e?.target?.value });
    } else if (isSelectedName == "placeholderTextColor") {
      setFormData({ ...formData, placeholderTextColor: e?.target?.value });
    } else if (isSelectedName == "dropdownOptionColor") {
      setFormData({ ...formData, dropdownOptionColor: e?.target?.value });
    } else if (isSelectedName == "dropdownHoveringColor") {
      setFormData({ ...formData, dropdownHoveringColor: e?.target?.value });
    } else if (isSelectedName == "selectedTextColor") {
      setFormData({ ...formData, selectedTextColor: e?.target?.value });
    } else if (isSelectedName == "backgroundColor") {
      setFormData({ ...formData, backgroundColor: e?.target?.value });
    } else if (isSelectedName == "OptionColor") {
      setFormData({ ...formData, optionColor: e?.target?.value });
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
      setSave((save)=>save+1);

      if (originalFormData?.templateId == template?.templateId) {
        let updatedBody = JSON.parse(JSON.stringify(originalFormData));
        setLogo(
          updatedBody?.logoImageUrl
            ? updatedBody?.logoImageUrl
            : template?.logoImageUrl
        );
        // console.log(Object.keys(updatedBody.eventDetails)?.length>0);

        if(Object.keys(updatedBody.eventDetails)?.length>0){
        
          textAreaRefs.current=Array(Object.keys(updatedBody.eventDetails)?.length).fill(null)
        }
        setFormData(updatedBody);
      } else {
        let updatedBody = JSON.parse(JSON.stringify(template));

        if (!updatedBody?.eventDetails) {
          updatedBody.eventDetails.eventStartDate.value = new Date(
            rawData?.dateStart
          );
          updatedBody.eventDetails.eventEndDate.value = new Date(
            rawData?.dateEnd
          );
          updatedBody.eventDetails.eventStartTime.value = `${rawData?.dateStartHour}:${rawData?.dateStartMin}`;
          updatedBody.eventDetails.eventEndTime.value = `${rawData?.dateEndHour}:${rawData?.dateEndMin}`;
          updatedBody.eventDetails.eventLocation.value =
            rawData?.location || "";
          updatedBody.eventDetails.speakerName.value =
            rawData?.speaker_name || "";
        } else {
          if (
            updatedBody?.eventDetails?.eventStartDate?.value == "" &&
            updatedBody?.eventDetails?.eventStartDate?.value != undefined
          ) {
            updatedBody.eventDetails.eventStartDate.value = new Date(
              rawData?.dateStart
            );
          }

          if (
            updatedBody?.eventDetails?.eventEndDate?.value == "" &&
            updatedBody?.eventDetails?.eventEndDate?.value != undefined
          ) {
            updatedBody.eventDetails.eventEndDate.value = new Date(
              rawData?.dateEnd
            );
          }

          if (
            updatedBody?.eventDetails?.eventStartTime?.value == "" &&
            updatedBody?.eventDetails?.eventStartTime?.value != undefined
          ) {
            updatedBody.eventDetails.eventStartTime.value = `${rawData?.dateStartHour}:${rawData?.dateStartMin}`;
          }

          if (
            updatedBody?.eventDetails?.eventEndTime?.value == "" &&
            updatedBody?.eventDetails?.eventEndTime?.value != undefined
          ) {
            updatedBody.eventDetails.eventEndTime.value = `${rawData?.dateEndHour}:${rawData?.dateEndMin}`;
          }

          if (
            updatedBody?.eventDetails?.eventLocation?.value == "" &&
            updatedBody?.eventDetails?.eventLocation?.value != undefined
          ) {
            updatedBody.eventDetails.eventLocation.value =
              originalFormData?.eventDetails?.eventLocation?.value ||
              `${rawData?.location}` ||
              " ";
          }

          if (
            updatedBody?.eventDetails?.speakerName?.value == "" &&
            updatedBody?.eventDetails?.speakerName?.value != undefined
          ) {
            updatedBody.eventDetails.speakerName.value =
              originalFormData?.eventDetails?.speakerName?.value ||
              `${rawData?.speaker_name}` ||
              " ";
          }
        }

        setLogo(updatedBody?.logoImageUrl ? updatedBody?.logoImageUrl : "");
        // console.log(updatedBody);
        if(Object.keys(updatedBody.eventDetails)?.length>0){
        
          textAreaRefs.current=Array(Object.keys(updatedBody.eventDetails)?.length).fill(null)
        }
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
    

console.log(textAreaRefs.current);
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
                <h2>Registration Page</h2>
              </div>
              <div className="top-right-action">
                  <div className="d-flex justify-content-center header_btns">
                    <a
                      className={`copy_link btn-bordered ${
                        !isDataSaved ? "disabled" : ""
                      }`}
                      href={`event-registration?event=${event_code}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!isDataSaved) {
                          return;
                        }
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
                      className={`save btn-filled ${!isDataSaved? "disabled":""}`}
                      disabled={isDataSaved?false:true}
                      onClick={(e) => {
                        handlePreviewInNewTab(e);
                      }}
                    >
                      Preview In New Tab
                    </Button>
                  </div>
            </div>
          </div>
            <section className="select-mail-template library-consent create-change-content">
              <div className="custom-container">
                <Row>
                  <div className="page-title">
                    <h6>Select Template</h6>
                  </div>

                  <AliceCarousel
                    mouseTracking
                    disableButtonsControls
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
                  <Col md={7} sm={7}>
                    <div className="register-page-left">
                      <Form>
                        <div>
                          {formData?.eventDetails &&
                            Object.keys(formData.eventDetails)?.map(
                              (key, index) => {
                                const field = formData.eventDetails[key];
                                const isEventEndDate = key === "eventEndDate";
                                const isEventEndTime = key === "eventEndTime";
                                return field.type == "date" ? (
                                  <div
                                    key={index}
                                    className="form-group d-flex align-items-center "
                                  >
                                    <label>
                                      {field.title} <span>*</span>
                                    </label>
                                    <DatePicker
                                      name={`eventDetails-${key}`}
                                      dateFormat="dd/MM/yyyy"
                                      className="form-control disabled"
                                      placeholderText="Select date"
                                      readOnly={true}
                                      disabled
                                      minDate={
                                        key == "eventEndDate"
                                          ? new Date(
                                              formData?.eventDetails?.eventStartDate?.value
                                            )
                                          : currentDate
                                      }
                                      selected={
                                        field.value &&
                                        field.value >= currentDate
                                          ? new Date(field.value)
                                          : currentDate
                                      }
                                      onChange={(v, e) => {
                                        handleChange(v, `eventDetails-${key}`);
                                      }}
                                      onKeyDown={(e) => {
                                        e.preventDefault();
                                      }}
                                    />
                                    {isEventEndDate ? (
                                      <div className="event-endDate"></div>
                                    ) : (
                                      ""
                                    )}
                                    {field.color && (
                                      <div className="color-pick">
                                        <img
                                          src={path_image + "color-picker.svg"}
                                          alt=""
                                        />
                                        <input
                                          type="color"
                                          title="Choose your color"
                                          name={`eventDetails-${key}-color`}
                                          onChange={handleChange}
                                          value={field.color}
                                        />
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div
                                    key={index}
                                    className="form-group d-flex align-items-center"
                                  >
                                    <label>
                                      {field.title}
                                      {/* <span>*</span> */}
                                    </label>
                                   { field.type == 'textArea'?<textarea className={`form-control ${
                                        key == "eventEndTime" ||
                                        key == "eventStartTime"
                                          ? "disabled"
                                          : ""
                                      }`}
                                      ref={(ref) => (textAreaRefs.current[index] = ref)}

                                      // className="form-control"
                                      onChange={(e)=>{handleChange(e)
                                      
    
                                        resizeTextArea(index);
                                      }} name={`eventDetails-${key}`}>{field.value}</textarea>:<input
                                      type={field.type}
                                      name={`eventDetails-${key}`}
                                      value={field.value}
                                      readOnly={
                                        key == "eventEndTime" ||
                                        key == "eventStartTime"
                                          ? true
                                          : false
                                      }
                                      disabled={
                                        key == "eventEndTime" ||
                                        key == "eventStartTime"
                                          ? true
                                          : false
                                      }
                                      className={`form-control ${
                                        key == "eventEndTime" ||
                                        key == "eventStartTime"
                                          ? "disabled"
                                          : ""
                                      }`}
                                      // className="form-control"
                                      onChange={handleChange}
                                      // disabled
                                      // readOnly={true}
                                    />}
                                    {isEventEndTime ? (
                                      <div className="event-endTime"></div>
                                    ) : (
                                      ""
                                    )}
                                    {field.color && (
                                      <div className="color-pick">
                                        <img
                                          src={path_image + "color-picker.svg"}
                                          alt=""
                                        />
                                        <input
                                          type="color"
                                          title="Choose your color"
                                          name={`eventDetails-${key}-color`}
                                          onChange={handleChange}
                                          value={field.color}
                                        />
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            )}
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
                                  (item, index) => item?.name == "userName"
                                ) != -1
                                  ? true
                                  : false
                              }
                              onChange={(e) => handleChange(e, "userName")}
                            />

                            <Form.Check
                              className="webinar-checkbox"
                              label="Email"
                              name="email"
                              type="checkbox"
                              checked={
                                formData?.body?.findIndex(
                                  (item, index) => item?.name == "userEmail"
                                ) != -1
                                  ? true
                                  : false
                              }
                              onChange={(e) => handleChange(e, "userEmail")}
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
                                    item?.name?.toLowerCase() == "country"
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
                                    item?.name?.toLowerCase() == "state"
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
                                    item?.name?.toLowerCase() == "state (us)"
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
                                    item?.name?.toLowerCase() ==
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
                                    item?.name?.toLowerCase() == "consent"
                                ) != -1
                                  ? true
                                  : false
                              }
                              onChange={(e) => handleChange(e, "consent")}
                            />
                            <Form.Check
                              className="webinar-checkbox"
                              inline
                              label="Onesource Consent"
                              name="onesource_consent"
                              type="checkbox"
                              checked={
                                formData?.body?.findIndex(
                                  (item, index) =>
                                    item?.name?.toLowerCase() ==
                                    "onesource_consent"
                                ) != -1
                                  ? true
                                  : false
                              }
                              onChange={(e) =>
                                handleChange(e, "onesource_consent")
                              }
                            />

                            <span
                              className="add-choice"
                              onClick={() => setModal(true)}
                            >
                              Add data field
                              <img src={path_image + "add-choice-voilet.svg"} alt="" />
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
                                                                                className="form-control disabled"
                                                                                name={`${
                                                                                  extItem?.name
                                                                                    ? extItem?.name
                                                                                    : "dynamic_" +
                                                                                      dynamicFieldNo
                                                                                }`}
                                                                                placeholder={
                                                                                  extItem?.placeholder
                                                                                }
                                                                                disabled
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
                                                                                      checked={
                                                                                        optItem?.checked
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
                                                                                className="form-control disabled"
                                                                                placeholderText="Select date"
                                                                                // minDate={currentDate}
                                                                                disabled
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
                                                                                      checked={
                                                                                        optItem?.checked
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
                                                                                className="dropdown-basic-button split-button-dropup webinar-select disabled"
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
                                                                                placeholder={
                                                                                  extItem?.placeholder
                                                                                    ? extItem?.placeholder
                                                                                    : `Select`
                                                                                }
                                                                                isDisabled={
                                                                                  true
                                                                                }
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
                                                                                className="form-control disabled"
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
                                                                                disabled
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
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
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
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
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
                                                                                className="form-control disabled"
                                                                                name={`${
                                                                                  extItem?.name
                                                                                    ? extItem?.name
                                                                                    : "dynamic_" +
                                                                                      dynamicFieldNo
                                                                                }`}
                                                                                placeholder={
                                                                                  extItem?.placeholder
                                                                                }
                                                                                disabled
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
                                                                                      checked={
                                                                                        optItem?.checked
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
                                                                                className="form-control disabled"
                                                                                placeholderText="Select date"
                                                                                // minDate={currentDate}

                                                                                disabled
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
                                                                                      checked={
                                                                                        optItem?.checked
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
                                                                                className="dropdown-basic-button split-button-dropup webinar-select disabled"
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
                                                                                placeholder={
                                                                                  extItem?.placeholder
                                                                                    ? extItem?.placeholder
                                                                                    : `Select`
                                                                                }
                                                                                isDisabled={
                                                                                  true
                                                                                }
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
                                                                                className="form-control disabled"
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
                                                                                disabled
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
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
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
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
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
                                                            className="dropdown-basic-button split-button-dropup webinar-select disabled"
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
                                                            placeholder={
                                                              data?.placeholder
                                                                ? data?.placeholder
                                                                : `Select`
                                                            }
                                                            isDisabled={true}
                                                            readOnly={true}
                                                          />
                                                        </div>
                                                      ) : data?.inputType ==
                                                        "textarea" ? (
                                                        <div
                                                          className="slt-opt"
                                                          key={index}
                                                        >
                                                          <textarea
                                                            className="form-control disabled"
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
                                                            disabled
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
                                                          className="form-control disabled"
                                                          type={data?.inputType}
                                                          placeholder={
                                                            data?.placeholder
                                                          }
                                                          disabled
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
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
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
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
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
                                    <div>
                                      <h5>Select color of:</h5>
                                      <div className="d-flex align-items-center reg-color-set">
                                        <div className="form-group d-flex align-items-center">
                                          <label>Typed text</label>
                                          <div className="option-action">
                                            <div className="color-pick">
                                              <img
                                                src={
                                                  path_image +
                                                  "color-picker.svg"
                                                }
                                                alt=""
                                              />
                                              <input
                                                type="color"
                                                title="Choose your color"
                                                onChange={(e) =>
                                                  onColorChange(
                                                    e,
                                                    "typedTextColor"
                                                  )
                                                }
                                                value={
                                                  formData?.typedTextColor
                                                    ? formData?.typedTextColor
                                                    : ""
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="form-group d-flex align-items-center">
                                          <label>Placeholder text</label>
                                          <div className="option-action">
                                            <div className="color-pick">
                                              <img
                                                src={
                                                  path_image +
                                                  "color-picker.svg"
                                                }
                                                alt=""
                                              />
                                              <input
                                                type="color"
                                                title="Choose your color"
                                                onChange={(e) =>
                                                  onColorChange(
                                                    e,
                                                    "placeholderTextColor"
                                                  )
                                                }
                                                value={
                                                  formData?.placeholderTextColor
                                                    ? formData?.placeholderTextColor
                                                    : ""
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="form-group d-flex align-items-center">
                                          <label> Label </label>
                                          <div className="option-action">
                                            <div className="color-pick">
                                              <img
                                                src={
                                                  path_image +
                                                  "color-picker.svg"
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
                                        {/* <div className="form-group">
                                          <label>Select Option color</label>
                                          <div className="option-action">
                                            <div className="color-pick">
                                              <img
                                                src={
                                                  path_image +
                                                  "color-picker.svg"
                                                }
                                                alt=""
                                              />
                                              <input
                                                type="color"
                                                title="Choose your color"
                                                onChange={(e) =>
                                                  onColorChange(
                                                    e,
                                                    "OptionColor"
                                                  )
                                                }
                                                value={
                                                  formData?.optionColor
                                                    ? formData?.optionColor
                                                    : ""
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div> */}

                                        {/* <div className="form-group">
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
                                      </div> */}
                                      </div>
                                    </div>
                                    {/* <div className="dropdown-style">
                                      <h5>Select color of dropdown list:</h5>
                                      <div className="d-flex align-items-center reg-color-set">
                                        <div className="form-group d-flex align-items-center">
                                          <label>Options text color</label>
                                          <div className="option-action">
                                            <div className="color-pick">
                                              <img
                                                src={
                                                  path_image +
                                                  "color-picker.svg"
                                                }
                                                alt=""
                                              />
                                              <input
                                                type="color"
                                                title="Choose your color"
                                                onChange={(e) =>
                                                  onColorChange(
                                                    e,
                                                    "dropdownOptionColor"
                                                  )
                                                }
                                                value={
                                                  formData?.dropdownOptionColor
                                                    ? formData?.dropdownOptionColor
                                                    : ""
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="form-group d-flex align-items-center">
                                          <label>Hovering bar</label>
                                          <div className="option-action">
                                            <div className="color-pick">
                                              <img
                                                src={
                                                  path_image +
                                                  "color-picker.svg"
                                                }
                                                alt=""
                                              />
                                              <input
                                                type="color"
                                                title="Choose your color"
                                                onChange={(e) =>
                                                  onColorChange(
                                                    e,
                                                    "dropdownHoveringColor"
                                                  )
                                                }
                                                value={
                                                  formData?.dropdownHoveringColor
                                                    ? formData?.dropdownHoveringColor
                                                    : ""
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="form-group d-flex align-items-center">
                                          <label>Selected text</label>
                                          <div className="option-action">
                                            <div className="color-pick">
                                              <img
                                                src={
                                                  path_image +
                                                  "color-picker.svg"
                                                }
                                                alt=""
                                              />
                                              <input
                                                type="color"
                                                title="Choose your color"
                                                onChange={(e) =>
                                                  onColorChange(
                                                    e,
                                                    "selectedTextColor"
                                                  )
                                                }
                                                value={
                                                  formData?.selectedTextColor
                                                    ? formData?.selectedTextColor
                                                    : ""
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
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
                     
                    {template[formData?.templateId]?.includes("logo")?
                    <div className="form-group d-flex align-items-center less-spacer">
                    <label>Upload Logo</label>
                    <div
                      className="logo-section"
                      // onClick={(e) => handleFileSelect(e, "logoImageUrl")}
                    >
                      {!logo && (
                        <>
                          <div>
                            <h5>Upload your file</h5>
                            <h6>(Recommended size 300 x 140)</h6>
                          </div>
                          <Button className="upload-img"
                            onClick={(e) =>
                              handleFileSelect(e, "logoImageUrl")
                            }
                          >
                            Choose Your File
                          </Button>
                        </>
                      )}

                      <img className="logo-img" src={logo} />
                      <div className="logo-text header-text">
                        {logo && (
                          <button
                            className="btn btn-outline-primary"
                            title="Edit user"
                            type="button"
                          >
                            <img
                              src={path + "edit-button.svg"}
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
                    </div>
                    :''}
                      

                      {template[formData?.templateId]?.includes("header") ? <div className="form-group d-flex align-items-center less-spacer">
                      <label>Upload Header</label>
                      <div
                        className="header-section"
                        // onClick={(e) => handleFileSelect(e, "headerImageUrl")}
                      >
                        {!file && (
                          <>
                            <div>
                              <h5>Upload your file</h5>
                              <h6>(Recommended size 1170 x 323)</h6>
                            </div>
                            <Button className="upload-img"
                              onClick={(e) =>
                                handleFileSelect(e, "headerImageUrl")
                              }
                            >
                              Choose Your File
                            </Button>
                          </>
                        )}

                        <img className="header-img" src={file} />
                        <div className="header-text">
                          {file && (
                            <button
                              className="btn btn-outline-primary"
                              title="Edit user"
                              type="button"
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
                      </div> : 
                      ''
                       }

                      {template[formData?.templateId]?.includes("footer")?
                      <div className="form-group d-flex align-items-center less-spacer">
                        <label>Upload Footer</label>
                      <div
                        className="footer-section"
                        // onClick={(e) => handleFileSelect(e, "footerImageUrl")}
                      >
                        {!foot && (
                          <>
                            <div>
                              <h5>Upload your file</h5>
                              <h6>(Recommended size 1170 x 300)</h6>
                            </div>
                            <Button className="upload-img"
                              onClick={(e) =>
                                handleFileSelect(e, "footerImageUrl")
                              }
                            >
                              Choose Your File
                            </Button>
                          </>
                        )}

                        <img className="footer-img" src={foot} />
                        <div className="footer-text">
                          {foot && (
                            <button
                              className="btn btn-outline-primary"
                              title="Edit user"
                              type="button"
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
                      </div>:''}

                      {/* <div className="form-group d-flex align-items-center less-spacer">
                        <label>Upload Footer</label>
                      <div
                        className="footer-section"
                        // onClick={(e) => handleFileSelect(e, "footerImageUrl")}
                      >
                        {!foot && (
                          <>
                            <div>
                              <h5>Upload your file</h5>
                              <h6>(Recommended size 000 x 000)</h6>
                            </div>
                            <Button className="upload-img"
                              onClick={(e) =>
                                handleFileSelect(e, "footerImageUrl")
                              }
                            >
                              Choose Your File
                            </Button>
                          </>
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
                      </div> */}

                      {/* <div className="registration-preview">
                            <div className="registration-form-view">

                            </div>
                    </div> */}
                     </Form>
                    </div>
                  </Col>
                  <Col md={5} sm={5}>
                    <div className="register-page-right-view">
                      <div className="register-page-action d-flex align-items-center justify-content-between">
                          <p>Preview <span>(save it to see the changes)</span></p>
                          <Button onClick={(e) => saveClicked(e)} className="save">
                            Save
                          </Button>
                      </div>
                   
                      <div className="register-popup">
                        <div className="register-popup-view">
                        <RegistrationPage
                          type="preview"
                          prevData={{
                            eventId: eventData?.event_id,
                            companyId: eventData?.company_id,
                            content: JSON.stringify(formData),
                            eventCode: event_code,
                            isDataSaved: save,
                          }}
                        />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ) : apiStatus ? (
              <div className="select-template">
                <h3>Please select the template first</h3>
              </div>
            ) : (
              ""
            )}
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
        onCloseCross={() => {
          setConfirmationPopup(false);
          setIsFormChange(true);
        }}
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
                  type="preview"
                  prevData={{
                    eventId: eventData?.event_id,
                    companyId: eventData?.company_id,
                    content: JSON.stringify(formData),
                    eventCode: event_code,
                    isDataSaved: save,
                  }}
                />
              </div>
            </>
          </Modal.Body>
        </Modal>
      )}

      <Modal
        className="modal send-confirm"
        id="delete-confirm"
        show={showModalPreview}
        onHide={handleCloseModal}
      >
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={handleCloseModal}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <>
            <img src={path_image + "alert.png"} alt="" />
            <h4>Please Select Template First</h4>
            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-bordered"
                onClick={handleCloseModal}
              >
                Okay
              </button>
            </div>
          </>
        </Modal.Body>
      </Modal>

      {/* <Modal
        className="modal send-confirm"
        id="delete-confirm"
        show={isSavedClicked}
        onHide={()=>{
          setIsSavedClicked(false)
        }}
      >
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={()=>{
              setIsSavedClicked(false)
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <>
            <img src={path_image + "success.png"} alt="" />
            <h4>Data saved successfully!</h4>
            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-bordered"
                onClick={()=>{
                  setIsSavedClicked(false)
                }}
              >
                Okay
              </button>
            </div>
          </>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default WebinarRegistration;
