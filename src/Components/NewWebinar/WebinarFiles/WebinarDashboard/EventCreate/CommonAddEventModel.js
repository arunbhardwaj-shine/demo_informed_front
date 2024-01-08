import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import EventModelValidation from "./EventModelValidation";
import { toast } from "react-toastify";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { loader } from "../../../../../loader";
import { postData, updateConsent } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { object } from "@amcharts/amcharts4/core";
import {debounce} from 'lodash'

const CommonAddEventModel = ({
  show,
  onClose,
  webinarDetail,
  data,
  eventId,
  apiData,
  handleSubmit,
}) => {
  const path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [timeHours, setTimeHours] = useState([
    { label: "Hour", value: "Hour" },
    { label: "00 ", value: "00" },
    { label: "01 ", value: "01" },
    { label: "02 ", value: "02" },
    { label: "03 ", value: "03" },
    { label: "04 ", value: "04" },
    { label: "05 ", value: "05" },
    { label: "06 ", value: "06" },
    { label: "07 ", value: "07" },
    { label: "08 ", value: "08" },
    { label: "09 ", value: "09" },
    { label: "10 ", value: "10" },
    { label: "11 ", value: "11" },
    { label: "12 ", value: "12" },
    { label: "13 ", value: "13" },
    { label: "14 ", value: "14" },
    { label: "15 ", value: "15" },
    { label: "16 ", value: "16" },
    { label: "17 ", value: "17" },
    { label: "18 ", value: "18" },
    { label: "19 ", value: "19" },
    { label: "20 ", value: "20" },
    { label: "21 ", value: "21" },
    { label: "22 ", value: "22" },
    { label: "23 ", value: "23" },
  ]);
  const [timeMinutes, setTimeMinutes] = useState([
    { label: "Min", value: "Min" },
    { label: "00 ", value: "00" },
    { label: "05 ", value: "05" },
    { label: "10 ", value: "10" },
    { label: "15 ", value: "15" },
    { label: "20 ", value: "20" },
    { label: "25 ", value: "25" },
    { label: "30 ", value: "30" },
    { label: "35 ", value: "35" },
    { label: "40 ", value: "40" },
    { label: "45 ", value: "45" },
    { label: "50 ", value: "50" },
    { label: "55 ", value: "55" },
  ]);
  const [error, setError] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [countryTimezone, setCountryTimezone] = useState([]);
  const [clientStreamOptions, setClientStreamOptions] = useState([
    { label: "Yes", value: "1" },
    { label: "No", value: "0" },
  ]);
  const [timezoneOptions, setTimezoneOptions] = useState([]);
  const [ibuOptions, setIBUOptions] = useState([]);
  const [meetingOptions, setMeetingOptions] = useState([
    { label: "Live", value: "Live" },
    { label: "Virtual", value: "Virtual" },
  ]);
  const [eventOptions, setEventOptions] = useState([
    { label: "Webinar", value: "Webinar" },
    { label: "Conference", value: "Conference" }
  ])
  const [eventInputs, setEventInputs] = useState({
    dateStart: new Date(moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")),
    dateEnd: new Date(moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")),
    title: "",
    location: "",
    type: "",
    timezone: "",
    country_timezone: "",
    is_client_stream: "",
    client_stream_url: "",
    dateStartHour: "",
    dateStartMin: "",
    dateEndHour: "",
    dateEndMin: "",
    event_code: "",
    event_type:"",
    description: "",
    speaker_name: [{ speakerName: "" }],
    speaker_email: "",
    meeting_type: "",
  });
  useEffect(() => {
    setIBUOptions(webinarDetail?.ibu);
    setTimezoneOptions(webinarDetail?.timezoneName);
    if (data?.id) {
      let speaker_name = "";
      let speaker_email = "";
      let meeting_type = "";
      let event_type="";
      let countryTimeZoneOptions=[]
      if (data?.raw_description) {
        let parseData = JSON.parse(data?.raw_description);
        try {
          speaker_name = JSON.parse(parseData?.speaker_name)
        } catch
        { speaker_name = parseData?.speaker_name ? [{ speakerName: parseData?.speaker_name }] : [{ speakerName: "" }] }

        speaker_email = parseData?.speaker_email;
        meeting_type = parseData?.meeting_type;
        event_type=parseData?.event_type;
      }
       countryTimeZoneOptions=webinarDetail?.timezoneName?.map((item)=>(item?.label==data?.timezone?{label:item?.value,value:item?.value}:null)).filter(Boolean);

      setCountryTimezone(countryTimeZoneOptions)
      setEventInputs({
        ...data,
        title: data?.title,
        location: data?.location,
        type: data?.type ? data?.type : "",
        timezone: data?.timezone,
        country_timezone: data?.country_timezone,
        is_client_stream: data?.is_client_stream == 1 ? "Yes" : "No",
        client_stream_url: data?.client_stream_url
          ? data?.client_stream_url
          : "",
        dateStart: data?.dateStart,
        dateEnd: data?.dateEnd,
        dateStartHour: data?.dateStartHour?data?.dateStartHour:"",
        dateStartMin: data?.dateStartMin?data?.dateStartMin:"",
        dateEndHour: data?.dateEndHour ? data?.dateEndHour : "",
        dateEndMin: data?.dateEndMin ? data?.dateEndMin : "",
        event_code: data?.event_code,
        event_type:event_type,
        description: data?.description ? data?.description : "",
        // speaker_name: JSON.parse(speaker_name),
        speaker_name: speaker_name,
        speaker_email: speaker_email,
        meeting_type: meeting_type,
      });
    } else {
      setCountryTimezone([])
      setEventInputs({
        dateStart: new Date(moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")),
        dateEnd: new Date(
          moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")
        ),
        title: "",
        location: "",
        type: "",
        timezone: "",
        country_timezone: "",
        is_client_stream: "",
        client_stream_url: "",
        dateStartHour: "",
        dateStartMin: "",
        dateEndHour: "",
        dateEndMin: "",
        event_code: "",
        event_type:"",
        description: "",
        speaker_name: [{ speakerName: "" }],
        speaker_email: "",
        meeting_type: "",
        
      });
    }
  }, [show]);
  const handleClose = () => {
    setError({});
    setEventInputs({
      dateStart: new Date(
        moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")
      ), dateEnd: new Date(
        moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")
      ),
      speaker_name: [{ speakerName: "" }]
    });
    onClose(false);
  };

  
  const handleChange = (e, isSelectedName, index) => {
    const { name, value } = e?.target || {};
    if (isSelectedName == "speaker_name") {
      let updateOption = eventInputs?.speaker_name;
      updateOption[index].speakerName = e?.target?.value;
      setEventInputs({ ...eventInputs, speaker_name: updateOption });
    }
    else if (name === 'event_code') {
      setEventInputs({
        ...eventInputs,
        [isSelectedName || name]: isSelectedName ? e : value?.trim(),
      });
      handleDebouncedChange(value);
    } else if (isSelectedName == "timezone") {

      let countryTimeZoneOptions=timezoneOptions?.map((item)=>(item?.label==e?.label?{label:item?.value,value:item?.value}:null)).filter(Boolean);
        setCountryTimezone(countryTimeZoneOptions)
      setEventInputs({ ...eventInputs, timezone: e?.label })
    }

    else {
      const updatedInputs = {
        ...eventInputs,
        [isSelectedName || name]: isSelectedName ? e : value,
      };

      if (isSelectedName === 'dateStart') {
        updatedInputs.dateEnd = isSelectedName ? e : value;
      }
      setEventInputs(updatedInputs);

    }
  };

  const handleDebouncedChange=debounce(async (value)=>{
try{
  let error={}
  let eventCode=value;
const response=await postData(ENDPOINT.EVENT_ID,{eventCode})
if(response?.data?.data?.id){
  error.event_code="Event code already exist"
  setError(error)
  return
}else{
  setError(error)
}
}
catch(err){
  console.log("--err",err)
}
},500)

  const addNewSpeakerClicked = (e, isSelectedName) => {
    let speakerObj = {
      speakerName: ""
    }
    let error = {}
    if (eventInputs?.speaker_name?.length) {
      let index = eventInputs?.speaker_name?.findIndex(
        (data, index) => data?.speakerName == ""
      );
      if (index > -1) {
        // toast.error(`Please fill the speaker name ${index + 1}`);
        error = { speaker_name: "Please enter speaker name", index: index }
        setError(error)
        return;
      } else {
        setEventInputs({ ...eventInputs, speaker_name: [...eventInputs?.speaker_name, speakerObj] })
      }
    }
  }
  const deleteSpeaker = (e, index) => {
    e.preventDefault();
    let error = {}
    if (Object.keys(eventInputs?.speaker_name)?.length > 1) {
      let updatedEventInputs = eventInputs?.speaker_name;
      updatedEventInputs?.splice(index, 1);
      setEventInputs({ ...eventInputs, speaker_name: updatedEventInputs });
      setError();
    } else {
      error = { speaker_name: "Atleast one Speaker must be required", index: index }
      setError(error)
      return
    }

  };

  const formatDate = (newDate) => {

    if (newDate != "") {
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const day = String(newDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }

  };

  function isValidDateFormat(dateString) {
    const regex = /^\d{1,2} [A-Za-z]+ \d{4}$/;
    return regex.test(dateString);
  }

  function convertDate(dateString) {
    const formattedDate = moment(dateString, "DD MMMM YYYY").format(
      "YYYY-MM-DD"
    );
    return formattedDate;
  }

  const saveClicked = async (e) => {
    try {
      const error = EventModelValidation(eventInputs);
      if (Object.keys(error)?.length) {
        // toast.error(error[Object.keys(error)[0]]);
        setError(error);
        return;
      } else {
        loader("show");
        let dateStart = "";
        if (isValidDateFormat(eventInputs?.dateStart)) {
          dateStart = convertDate(eventInputs?.dateStart);
        } else {
          const dateTime = new Date(eventInputs?.dateStart)
          dateStart = formatDate(dateTime);
        }
        let dateEnd = "";
        if (isValidDateFormat(eventInputs?.dateEnd)) {
          dateEnd = convertDate(eventInputs?.dateEnd);
        } else {
          const dateTime = new Date(eventInputs?.dateEnd)
          dateEnd = formatDate(dateTime);
        }
        let dataObj = {
          title: eventInputs?.title,
          location: eventInputs?.location,
          type: eventInputs?.type ? eventInputs?.type : "",
          event_type: eventInputs?.event_type ? eventInputs?.event_type : "",
          timezone: eventInputs?.timezone,
          countryTimezone: eventInputs?.country_timezone,
          isClientStream: eventInputs?.is_client_stream == "Yes" ? 1 : 0,
          clientStreamUrl: eventInputs?.client_stream_url ? eventInputs?.client_stream_url : "",
          dateStart: dateStart,
          dateEnd: dateEnd,
          dateStartHour: eventInputs?.dateStartHour,
          dateStartMin: eventInputs?.dateStartMin,
          dateEndHour: eventInputs?.dateEndHour,
          dateEndMin: eventInputs?.dateEndMin,
          eventCode: eventInputs?.event_code,
          description: eventInputs?.description ? eventInputs?.description : "",
          speaker_name: eventInputs?.speaker_name ? JSON.stringify(eventInputs?.speaker_name) : "",
          speaker_email: eventInputs?.speaker_email ? eventInputs?.speaker_email : "",
          meeting_type: eventInputs?.meeting_type ? eventInputs?.meeting_type : "",
        };

        if (data?.id) {
          const res = await updateConsent(
            `${ENDPOINT.WEBINAR_UPDATE_EVENT}/${data?.id}`,
            dataObj
          );
        } else {
          const res = await postData(ENDPOINT.WEBINAR_ADD_NEW_EVENT, dataObj);
        }

        // onClose(false);
        setEventInputs({
          dateStart: new Date(
            moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")
          ), dateEnd: new Date(
            moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")
          ),
          speaker_name: [{ speakerName: "" }]
        });
        handleSubmit();
        setError({});
      }
    } catch (err) {
      console.log("--err", err);
      if(err?.response?.data?.message=="Event code already exist"){
        let error={}
        error.event_code=err?.response?.data?.message
        setError(error)
      }
    } finally {
      loader("hide");
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        id="add_hcp"
        className="event_edit"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
      >
        <Modal.Header>
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {data?.id ? "Edit Event" : "New Event"}
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
          <div
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-hidden="true">
            <div className="hcp-add-box">
              <div className="hcp-add-form tab-content" id="upload-confirm">
                <form id="add_hcp_form" className={"tab-pane" + "active"}>
                  <>
                    <div className="add_hcp_boxes">
                      <div className="form_action">
                        <div className="row">
                          <div className="col-12 col-md-12">
                            <div className="form-group d-flex align-items-center">
                              <label htmlFor="">
                                Event Title <span> *</span>
                              </label>
                              <input
                                type="text"
                                name="title"
                                placeholder="Event title"
                                className={error?.title ? "form-control error" : "form-control"}
                                onChange={(e) => handleChange(e)}
                                value={eventInputs?.title ? eventInputs?.title : ""} />
                              {error?.title ? (
                                <div className="login-validation">
                                  {error?.title}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-12 col-md-12">
                            <div className="form-group d-flex align-items-center">
                              <label htmlFor="">
                                Event Location <span> *</span>
                              </label>
                              <input
                                type="text"
                                name="location"
                                placeholder="Event location"
                                className={
                                  error?.location
                                    ? "form-control error"
                                    : "form-control"
                                }
                                onChange={(e) => handleChange(e)}
                                value={
                                  eventInputs?.location
                                    ? eventInputs?.location
                                    : ""
                                }
                              />
                              {error?.location ? (
                                <div className="login-validation">
                                  {error?.location}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-12 col-md-12">
                            <div className="form-group d-flex align-items-center">
                              <label htmlFor="">
                                Event Type <span>*</span>
                              </label>

                              <Select
                                options={eventOptions}
                                className={
                                  error?.event_type
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                placeholder="Select event type"
                                onChange={(e) =>
                                  handleChange(e?.value, "event_type")
                                }
                                value={
                                  eventOptions
                                    ? eventOptions.findIndex(
                                      (item) =>
                                        item?.value ==
                                        eventInputs?.event_type
                                    ) != -1
                                      ? eventOptions[
                                      eventOptions.findIndex(
                                        (item) =>
                                          item?.value ==
                                          eventInputs?.event_type
                                      )
                                      ]
                                      : ""
                                    : ""
                                }
                                isClearable
                              />
                              {error?.event_type ? (
                                <div className="login-validation">
                                  {error?.event_type}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-12 col-md-12 speaker-name">
                            <div className="row">
                              <div className="col-12 col-md-6">
                                {Object.keys(eventInputs?.speaker_name)?.map((item, index) => (
                                  <div className="form-group d-flex align-items-center">
                                    <label htmlFor="">
                                      {`Speaker's name ${index + 1
                                        }`} <span> *</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="speaker_name"
                                      placeholder="Enter speaker's name"
                                      className={
                                        (error?.speaker_name && error?.index == index)
                                          ? "form-control error"
                                          : "form-control"
                                      }
                                      onChange={(e) => handleChange(e, 'speaker_name', index)}
                                      value={
                                        eventInputs?.speaker_name[item]?.speakerName

                                      }

                                    />
                                    <button onClick={(e) => { deleteSpeaker(e, index) }}>

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
                                    {(error?.speaker_name && error?.index == index) ? (
                                      <div className="login-validation">
                                        {error?.speaker_name}
                                      </div>
                                    ) : null}
                                  </div>
                                ))}

                                <span
                                  className="add-choice"
                                  onClick={(e) => addNewSpeakerClicked(e, "speaker")}
                                >
                                  Add speaker
                                  <img src={path_image + "add-choice.svg"} alt="" />
                                </span>
                              </div>

                              {/* <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Speaker's Email <span> *</span>{" "}
                                  </label>
                                  <input
                                    type="email"
                                    name="speaker_email"
                                    placeholder="Enter speaker's email"
                                    className={
                                      error?.speaker_email
                                        ? "form-control error"
                                        : "form-control"
                                    }
                                    onChange={(e) => handleChange(e)}
                                    value={
                                      eventInputs?.speaker_email
                                        ? eventInputs?.speaker_email
                                        : ""
                                    }
                                  />
                                  {error?.speaker_email ? (
                                    <div className="login-validation">
                                      {error?.speaker_email}
                                    </div>
                                  ) : null}
                                </div>
                              </div> */}
                              {/* <div className="col-12 col-md-12">
                                  <span class="add-choice">Add Speaker<img src={path_image+"add-choice.svg"} alt=""/></span>
                                </div> */}
                            </div>
                          </div>

                          {/* <div className="col-12 col-md-12">
                            <div className="form-group">
                              <label htmlFor="">
                                Meeting Type <span> *</span>
                              </label>

                              <Select
                                options={meetingOptions}
                                className={
                                  error?.meeting_type
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                placeholder="Select meeting type"
                                onChange={(e) =>
                                  handleChange(e?.value, "meeting_type")
                                }
                                value={
                                  meetingOptions
                                    ? meetingOptions.findIndex(
                                      (item) =>
                                        item?.value ==
                                        eventInputs?.meeting_type
                                    ) != -1
                                      ? meetingOptions[
                                      meetingOptions.findIndex(
                                        (item) =>
                                          item?.value ==
                                          eventInputs?.meeting_type
                                      )
                                      ]
                                      : ""
                                    : ""
                                }
                                isClearable
                              />
                              {error?.meeting_type ? (
                                <div className="login-validation">
                                  {error?.meeting_type}
                                </div>
                              ) : null}
                            </div>
                          </div> */}
                      {localStorage.getItem("user_id")=="B7SHpAc XDXSH NXkN0rdQ=="?
                          <div className="col-12 col-md-12">
                            <div className="form-group d-flex align-items-center">
                              <label htmlFor="">IBU</label>

                              <Select
                                options={ibuOptions}
                                className={
                                  error?.type
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) => handleChange(e?.value, "type")}
                                placeholder="Select IBU"
                                value={
                                  ibuOptions
                                    ? ibuOptions.findIndex(
                                      (item) =>
                                        item?.value == eventInputs?.type
                                    ) != -1
                                      ? ibuOptions[
                                      ibuOptions.findIndex(
                                        (item) =>
                                          item?.value == eventInputs?.type
                                      )
                                      ]
                                      : ""
                                    : ""
                                }
                                isClearable
                              />
                              {error?.type ? (
                                <div className="login-validation">
                                  {error?.type}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          :""}

                        

                          <div className="col-12 col-md-12">
                            <div className="form-group d-flex align-items-center">
                              <label htmlFor="">
                                {" "}
                                Timezone<span>*</span>
                              </label>
                              <Select
                                options={timezoneOptions}
                                className={
                                  error?.timezone
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) =>
                                  handleChange(e, "timezone")
                                }
                                placeholder="Select timezone"
                                value={
                                  timezoneOptions
                                    ? timezoneOptions?.findIndex(
                                      (item) =>
                                        item?.label ==
                                        eventInputs?.timezone
                                    ) != -1
                                      ? timezoneOptions[
                                      timezoneOptions?.findIndex(
                                        (item) =>
                                          item?.label ==
                                          eventInputs?.timezone
                                      )
                                      ]
                                      : ""
                                    : ""
                                }
                                isClearable
                              />
                              {error?.timezone ? (
                                <div className="login-validation">
                                  {error?.timezone}
                                </div>
                              ) : null}
                            </div>
                          </div>

                            <div className="col-12 col-md-12">
                            <div className="form-group">
                              <label htmlFor="">
                                Country Timezone <span> *</span>
                              </label>
                              <Select
                                options={countryTimezone}
                                className={
                                  error?.country_timezone
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) =>
                                  handleChange(e?.value, "country_timezone")
                                }
                                placeholder="Select country timezone"
                                value={
                                  countryTimezone
                                    ? countryTimezone?.findIndex(
                                      (item) =>
                                        item?.value == eventInputs?.country_timezone
                                    ) != -1
                                      ? countryTimezone[
                                        countryTimezone?.findIndex(
                                        (item) =>
                                          item?.value ==
                                          eventInputs?.country_timezone
                                      )
                                      ]
                                      : ""
                                    : ""
                                }
                                isClearable
                              />
                              {error?.country_timezone ? (
                                <div className="login-validation">
                                  {error?.country_timezone}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          {/* <div className="col-12 col-md-12">
                            <div className="form-group">
                              <label htmlFor="">
                                {" "}
                                Is Client Stream <span> *</span>
                              </label>
                              <Select
                                options={clientStreamOptions}
                                className={
                                  error?.is_client_stream
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) =>
                                  handleChange(e?.label, "is_client_stream")
                                }
                                placeholder="Select stream"
                                value={
                                  clientStreamOptions?.findIndex(
                                    (item) =>
                                      item?.label ==
                                      eventInputs?.is_client_stream
                                  ) != -1
                                    ? clientStreamOptions[
                                    clientStreamOptions?.findIndex(
                                      (item) =>
                                        item?.label ==
                                        eventInputs?.is_client_stream
                                    )
                                    ]
                                    : ""
                                }
                                isClearable
                              />
                              {error?.is_client_stream ? (
                                <div className="login-validation">
                                  {error?.is_client_stream}
                                </div>
                              ) : null}
                            </div>
                          </div> */}
                          {eventInputs?.is_client_stream == "Yes" ? (
                            <div className="col-12 col-md-12">
                              <div className="form-group d-flex align-items-center">
                                <label htmlFor="">
                                  Client Stream URL <span> *</span>
                                </label>
                                <input
                                  type="text"
                                  name="client_stream_url"
                                  placeholder="Event url"
                                  className={
                                    error?.client_stream_url
                                      ? "form-control error"
                                      : "form-control"
                                  }
                                  onChange={(e) => handleChange(e)}
                                  value={
                                    eventInputs?.client_stream_url
                                      ? eventInputs?.client_stream_url
                                      : ""
                                  }
                                />
                                {error?.client_stream_url ? (
                                  <div className="login-validation">
                                    {error?.client_stream_url}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="col-12 col-md-12">
                            <div className="form-group d-flex align-items-center">
                              <label htmlFor="">
                                Event Start Date <span> *</span>
                              </label>

                              <DatePicker
                                name="dateStart"
                                className={
                                  error?.dateStart
                                    ? "form-control error"
                                    : "form-control"
                                }
                                placeholderText="Event date"
                                selected={
                                  eventInputs?.dateStart
                                    ? new Date(eventInputs?.dateStart)
                                    : new Date(
                                      moment(new Date(), "MM/DD/YYYY").format(
                                        "MM/DD/YYYY"
                                      )
                                    )
                                }
                                onChange={(date) =>
                                  handleChange(date, "dateStart")
                                }
                                minDate={currentDate}
                                dateFormat="dd/MM/yyyy"
                              />
                              {error?.dateStart ? (
                                <div className="login-validation">
                                  {error?.dateStart}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-12 col-md-12">
                            <div className="form-group d-flex align-items-center">
                              <label htmlFor="">
                                Event End Date <span> *</span>
                              </label>

                              <DatePicker
                                name="dateEnd"
                                className={
                                  error?.dateEnd
                                    ? "form-control error"
                                    : "form-control"
                                }
                                placeholderText="Event date"
                                selected={
                                  eventInputs?.dateEnd
                                    ? new Date(eventInputs?.dateEnd)
                                    : new Date(
                                      moment(new Date(), "MM/DD/YYYY").format(
                                        "MM/DD/YYYY"
                                      )
                                    )
                                }
                                onChange={(date) =>
                                  handleChange(date, "dateEnd")
                                }
                                minDate={eventInputs.dateStart || currentDate}
                                dateFormat="dd/MM/yyyy"
                              />
                              {error?.dateEnd ? (
                                <div className="login-validation">
                                  {error?.dateEnd}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-12 col-md-12">
                            <div className="form-group double-select d-flex align-items-center">
                              <label htmlFor="">
                                Event Start Time <span> *</span>
                              </label>
                              <Select
                                options={timeHours}
                                className={
                                  error?.dateStartHour
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) =>
                                  handleChange(e?.value, "dateStartHour")
                                }
                                placeholder="Hour"
                                value={
                                  timeHours?.findIndex(
                                    (item) =>
                                      item?.value == eventInputs?.dateStartHour
                                  ) != -1
                                    ? timeHours[
                                    timeHours?.findIndex(
                                      (item) =>
                                        item?.value ==
                                        eventInputs?.dateStartHour
                                    )
                                    ]
                                    : timeHours[0]
                                }
                                isClearable
                              />

                              <Select
                                options={timeMinutes}
                                className={
                                  error?.dateStartHour
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) =>
                                  handleChange(e?.value, "dateStartMin")
                                }
                                placeholder="Min"
                                value={
                                  timeMinutes?.findIndex(
                                    (item) =>
                                      item?.value == eventInputs?.dateStartMin
                                  ) != -1
                                    ? timeMinutes[
                                    timeMinutes?.findIndex(
                                      (item) =>
                                        item?.value ==
                                        eventInputs?.dateStartMin
                                    )
                                    ]
                                    : timeMinutes[0]
                                }
                                isClearable
                              />
                              {error?.dateStartHour ? (
                                <div className="login-validation">
                                  {error?.dateStartHour}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-12 col-md-12">
                            <div className="form-group double-select d-flex align-items-center">
                              <label htmlFor="">
                                {" "}
                                Event End Time <span> *</span>
                              </label>
                              <Select
                                options={timeHours}
                                className={
                                  error?.dateEndHour
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) =>
                                  handleChange(e?.value, "dateEndHour")
                                }
                                value={
                                  timeHours?.findIndex(
                                    (item) =>
                                      item?.value == eventInputs?.dateEndHour
                                  ) != -1
                                    ? timeHours[
                                    timeHours?.findIndex(
                                      (item) =>
                                        item?.value ==
                                        eventInputs?.dateEndHour
                                    )
                                    ]
                                    : timeHours[0]
                                }
                                isClearable
                              />

                              <Select
                                options={timeMinutes}
                                // className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                className={
                                  error?.dateEndHour
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) =>
                                  handleChange(e?.value, "dateEndMin")
                                }
                                value={
                                  timeMinutes?.findIndex(
                                    (item) =>
                                      item?.value == eventInputs?.dateEndMin
                                  ) != -1
                                    ? timeMinutes[
                                    timeMinutes?.findIndex(
                                      (item) =>
                                        item?.value ==
                                        eventInputs?.dateEndMin
                                    )
                                    ]
                                    : timeMinutes[0]
                                }
                                isClearable
                              />

                              {error?.dateEndHour ? (
                                <div className="login-validation">
                                  {error?.dateEndHour}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-12 col-md-12">
                            <div className="form-group d-flex align-items-center">
                              <label htmlFor="">
                                Event Code <span>*</span>
                              </label>
                              <input
                                type="text"
                                name="event_code"
                                placeholder="Event code"
                                className={error?.event_code? "form-control error":"form-control"}
                                // className={
                                //   error?.event_code
                                //     ? "form-control error"
                                //     : data?.id? "form-control disabled":"form-control"
                                // }
                                // readOnly={data?.id?true:false}
                                // disabled={data?.id?true:false}
                                onChange={(e) => handleChange(e)}
                               
                                value={
                                  eventInputs?.event_code
                                    ? eventInputs?.event_code
                                    : ""
                                }
                              />
                              {error?.event_code ? (
                                <div className="login-validation">
                                  {error?.event_code}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          {/* <div className="col-12 col-md-12">
                            <div className="form-group">
                              <label htmlFor="">Event Description</label>
                              <textarea
                                type="text"
                                name="description"
                                placeholder="Event Description"
                                className="form-control"
                                onChange={(e) => handleChange(e)}
                                value={
                                  eventInputs?.description
                                    ? eventInputs?.description
                                    : ""
                                }
                              />
                            </div>
                          </div> */}
                        </div>
                      </div>

                      {/* <div className="hcp-modal-action">
                          <div className="hcp-action-block">
                            <>
                              <div className="hcp-remove">
                                <button
                                  type="button"
                                  className="btn btn-filled"
                                  // onClick={() => deleteRecord(i)}
                                >
                                  <img
                                    src={path_image + "delete.svg"}
                                    alt="Add More"
                                  />
                                </button>
                              </div>
                            </>
                          </div>
                        </div> */}
                    </div>
                  </>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary save btn-bordered"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary save btn-filled"
            onClick={(e) => {
              saveClicked(e);
            }}
          >
            Save
          </button>
        </div>
      </Modal>

    </>
  );
};
export default CommonAddEventModel;
