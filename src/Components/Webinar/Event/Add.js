import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loader } from "../../../loader";
function Add(props) {
  const [render, setRerender] = useState(0);
  const [SpeakerErr, setSpeakerErr] = useState([{ name: "", email: "" }]);
  const [Speakername, setSpeakerName] = useState([{ name: "", email: "" }]);
  const [bu, setBu] = useState([]);
  const [index, setIndex] = useState();
  const [Timezone, setTimezone] = useState([]);
  const [message, setMassage] = useState();
  const [country, setCountry] = useState([]);
  const [Timezoneregion, setTimezoneregion] = useState([]);
  const handleMultiInputAdd = () => {
    setSpeakerName([...Speakername, { name: "", email: "" }]);
    setSpeakerErr([...SpeakerErr, { name: "", email: "" }]);
  };
  const [EventTime, setEventTime] = useState([
    {
      Hour: [
        { Hour: "01" },
        { Hour: "02" },
        { Hour: "03" },
        { Hour: "04" },
        { Hour: "05" },
        { Hour: "06" },
        { Hour: "07" },
        { Hour: "08" },
        { Hour: "09" },
        { Hour: "10" },
        { Hour: "11" },
        { Hour: "12" },
      ],
      mints: [
        { mints: "00" },
        { mints: "05" },
        { mints: 10 },
        { mints: 15 },
        { mints: 20 },
        { mints: 25 },
        { mints: 30 },
        { mints: 35 },
        { mints: 40 },
        { mints: 45 },
        { mints: 50 },
        { mints: 55 },
      ],
    },
  ]);
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const handleSpeakerName = (e, i) => {
    const { value } = e.target;
    Speakername.splice(i, 1, Speakername[i]);
    setSpeakerName([...Speakername]);
    if (e.target.name === `name${i}`) {
      Speakername[i].name = value;
      SpeakerErr[i].name = "";
      if (e.target.value.length == 0) {
        SpeakerErr[i].name = "Name is  requred";
      }
    } else if (e.target.name === `email${i}`) {
      Speakername[i].email = value;
      SpeakerErr[i].email = "";
      if (e.target.value.length == 0) {
        SpeakerErr[i].email = "Email is requred";
      } else if (
        !Speakername[i].email.match(
          /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i
        )
      ) {
        SpeakerErr[i].email = "Invalid email address";
      }
    }
    setSpeakerErr([...SpeakerErr]);
  };
  useEffect(() => {
    console.log("inside render");
  }, [render]);

  const handleMultiInputRemove = (i) => {
    let data1 = Speakername;
    let data1Err = SpeakerErr;
    Speakername.splice(i, 1);
    data1Err.splice(i, 1);
    setTimeout(() => setSpeakerName([...Speakername]), 1000);
    setTimeout(() => setSpeakerErr([...SpeakerErr]), 1000);
    setRerender(render + 1);
    setSpeakerName(data1);
    setSpeakerErr(data1Err);
  };
  const handleGetDataBu = () => {
    ExportApi.GetBuData(token).then((resp) => {
      if (resp.ok) {
        setBu(resp.data.data);
      }
    });
  };
  const handleGetTimezoneData = () => {
    ExportApi.GetTimezoneData().then((resp) => {
      if (resp.ok) {
        setTimezone(resp.data.data);
      }
    });
  };
  const handleGetTimezoneregionData = () => {
    ExportApi.GetTimezoneregionData().then((resp) => {
      if (resp.ok) {
        setTimezoneregion(resp.data.data);
      }
    });
  };
  const handleGetCountry = () => {
    ExportApi.GetCountryData().then((resp) => {
      if (resp.ok) {
        setCountry(resp.data.data);
      }
    });
  };

  const handleSubmit = (handele) => {
    let err = true;
    for (let index = 0; index < Speakername.length; index++) {
      if (Speakername[index].name.length == 0) {
        err = false;
        SpeakerErr[index].name = "Name is requred ";
        setSpeakerErr([...SpeakerErr]);
      }
      if (Speakername[index].email.length == 0) {
        err = false;
        SpeakerErr[index].email = "Email is requred  ";
        setSpeakerErr([...SpeakerErr]);
      }
    }
    return err;
  };
  const handleResetSp = () => {
    // setRerender(render+1)
    setSpeakerName([{ name: "", email: "" }]);
    setSpeakerErr([{ name: "", email: "" }]);
    // setRerender(render+1)
  };

  const formik = useFormik({
    initialValues: {
      EventTitle: "",
      Timezone: "",
      end_hour :"01",
      start_hour :"01",
      end_min :"00",
      start_min :"00",
      end_am_pm :"am",
      start_am_pm :"am",
      Region: "",
      Bu: "",
      event_date: "",
      Description: "",
      Country: "",
    },

    validationSchema: Yup.object({
      EventTitle: Yup.string()
        .max(30, "Event title must be at most 30 characters")
        .required("Event title is required"),
      Timezone: Yup.string().required("Timezone is required"),

      Region: Yup.string().required("Region is required"),
      Country: Yup.string().required("Country is required"),
      Bu: Yup.string().required("Bu is required"),

      event_date: Yup.string().required("Event date is required"),
      Description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {

      if (handleSubmit()) {
        var today = new Date(values.event_date);
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        let dateData = dd + "/" + mm + "/" + yyyy;
        let a = JSON.stringify(Speakername);
        setMassage(false);
        ExportApi.CreatEvent(
          values.EventTitle,
          Speakername[0].name && Speakername[0].email ? a : null,
          values.Timezone,
          values.Bu,
          dateData,
          values.Description,
          values.Region,
          values.Country,
          values.start_hour,
          values.end_hour,
          values.start_min,
          values.end_min,
          values.start_am_pm,
          values.end_am_pm
        )
          .then((resp) => {
            if (resp.data) {
              // console.log(resp.data);
              if (resp.data.code == 200) {
                loader("hide");
                props.getEventList();
                props.closePopup();
                // console.log(typeof resp.data.message);
                toast.success(resp.data.message);
              } else {
                toast.error(resp.data.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            }
          })
          .catch((err) => console.log(err));
      }

      // props.closePopup();
    },
  });
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  useEffect(() => {
    setToken(localStorage.getItem("Token"));
    handleGetDataBu();
    handleGetTimezoneData();
    handleGetTimezoneregionData();
    handleGetCountry();
  }, [props.token, localStorage.getItem("Token")]);
  useEffect(() => {
    setSpeakerName(Speakername);
  }, [Speakername]);

  return (
    <Row>
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
      <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
      <div className="webinar-modal-data">
        {/* <Link to="/webinar/event/edit"></Link> */}
        <form onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
          <div className="modal-body-content">
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-7">
                <label>
                  Event Title <span>*</span>
                </label>
                <input
                  name="EventTitle"
                  placeholder="Event Title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.EventTitle}
                />
                {formik.touched.EventTitle && formik.errors.EventTitle ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.EventTitle}
                  </div>
                ) : null}
              </div>
            </div>
            <fieldset class="border p-2">
              {Speakername.map((multi, i) => (
                <div
                  key={i}
                  className="form-inline row justify-content-between align-items-center"
                >
                  <div className="form-group col-12 col-md-6">
                    <label>Speaker's Name</label>
                    <input
                      type="text"
                      placeholder="Speaker's Name"
                      className="form-control"
                      name={Speakername.length === 0 ? "name" : "name" + i}
                      value={multi.name}
                      onChange={(e) => {
                        handleSpeakerName(e, i);
                      }}
                    />
                    <div className="error" style={{ color: "red" }}>
                      {SpeakerErr[i].name}
                    </div>
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <label>Speaker's Email</label>
                    <input
                      type="text"
                      placeholder="Speaker's Email"
                      className="form-control"
                      name={Speakername.length === 0 ? "email" : "email" + i}
                      value={multi.email}
                      onChange={(e) => {
                        handleSpeakerName(e, i);
                      }}
                    />
                    <div className="error" style={{ color: "red" }}>
                      {SpeakerErr[i].email}
                    </div>
                  </div>
                  {Speakername.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIndex(i);
                        handleMultiInputRemove(i);
                      }}
                      className="btn-close float-end"
                      aria-label="Close"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                          fill="#ffffff"
                        ></path>
                        <path
                          d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                          fill="#ffffff"
                        ></path>
                        <path
                          d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                          fill="#ffffff"
                        ></path>
                        <path
                          d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                          fill="#ffffff"
                        ></path>
                        <path
                          d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                          fill="#ffffff"
                        ></path>
                        <path
                          d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                          fill="#ffffff"
                        ></path>
                      </svg>
                    </button>
                  ) : null}
                </div>
              ))}
              <a
                href="#"
                onClick={handleMultiInputAdd}
                className="speaker-button"
              >
                Add Speaker <span>+</span>{" "}
              </a>
            </fieldset>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-12">
                <label>Region </label>
                <select
                  name="Region"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Region}
                  class="form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option defaultValue='' selected>Select Region</option>
                  {Timezoneregion?.map((val, i) => (
                    <React.Fragment key={i}>
                      <option key={i} value={val.values}>
                        {val.values}
                      </option>
                    </React.Fragment>
                  ))}
                </select>
                {formik.touched.Region && formik.errors.Region ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.Region}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-12">
                <label>Country </label>
                <select
                  name="Country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Country}
                  class="form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option selected>Select Country</option>
                  {country?.map((val, i) => (
                    <React.Fragment key={i}>
                      <option key={i} value={val.id}>
                        {val.country}
                      </option>
                    </React.Fragment>
                  ))}
                </select>
                {formik.touched.Country && formik.errors.Country ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.Country}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-12">
                <label>BU </label>
                <select
                  name="Bu"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Bu}
                  class="form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option selected>Select BU</option>
                  {bu?.map((val, i) => (
                    <React.Fragment key={i}>
                      <option key={i} value={val.values}>
                        {val.values}
                      </option>
                    </React.Fragment>
                  ))}
                </select>
                {formik.touched.Bu && formik.errors.Bu ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.Bu}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-12 time-zone">
                <label>Select Timezone </label>
                <select
                  name="Timezone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Timezone}
                  class="form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option selected>Select Timezone</option>
                  {Timezone?.map((val, i) => (
                    <React.Fragment key={i}>
                      <option key={i} value={val.values}>
                        {val.values}
                      </option>
                    </React.Fragment>
                  ))}
                </select>
                {formik.touched.Timezone && formik.errors.Timezone ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.Timezone}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-12">
                <label>Event Date </label>
                <Form.Control
                  name="event_date"
                  type="date"
                  min={yyyy + "-" + mm + "-" + dd}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.event_date}
                />
                {formik.touched.event_date && formik.errors.event_date ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.event_date}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-12">
                <label for="exampleInputEmail1">
                  Event Start Time
                </label>
                <div className="row justify-content-between align-items-center select_time">
                  <div className="form-group col-12 col-md-4">
                    <select
                      className="form-control"
                      name="start_hour"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.start_hour}
                    >
                      {EventTime[0].Hour?.map((val, i) => (
                        <React.Fragment key={i}>
                          <option value={val.Hour}>
                            {val.Hour}
                          </option>
                        </React.Fragment>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-12 col-md-4">
                    <select
                      className="form-control"
                      name="start_min"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.start_min}
                    >
                      {EventTime[0].mints?.map((val, i) => (
                        <React.Fragment key={i}>
                          <option value={val.mints}>
                            {val.mints}
                          </option>
                        </React.Fragment>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-12 col-md-4">
                    <select
                      className="form-control"
                      name="start_am_pm"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.start_am_pm}
                    >
                      <React.Fragment >
                        <option value={"AM"}>AM</option>
                        <option value={"PM"}>PM</option>
                      </React.Fragment>
                    </select>
                  </div>
                </div>

                <div style={{ color: "red" }}>
                  
                </div>
              </div>

                               </div>
                               <div className="form-inline row justify-content-between align-items-center">
                                <div className="form-group col-12 col-md-12">

                                    <label for="exampleInputEmail1">
                                      Event End Time
                                    </label>
                                    <div className="row justify-content-between align-items-center select_time">
                                      <div className="form-group col-12 col-md-4">
                                        <select
                                          className="form-control"
                                          name="end_hour"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.end_hour}
                                        >
                                          {EventTime[0].Hour?.map((val, i) => (
                                            <React.Fragment key={i}>
                                              <option value={val.Hour}>
                                                {val.Hour}
                                              </option>
                                            </React.Fragment>
                                          ))}
                                        </select>
                                      </div>
                                      <div className="form-group col-12 col-md-4">
                                        <select
                                          className="form-control"
                                          name="end_min"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.end_min}

                                        >
                                          {EventTime[0].mints?.map((val, i) => (
                                            <React.Fragment key={i}>
                                              <option value={val.mints}>
                                                {val.mints}
                                              </option>
                                            </React.Fragment>
                                          ))}
                                        </select>
                                      </div>
                                      <div className="form-group col-12 col-md-4">
                                        <select
                                          className="form-control"
                                          name="end_am_pm"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.end_am_pm}
                                        >
                                          <React.Fragment>
                                            <option value={"AM"}>AM</option>
                                            <option value={"PM"}>PM</option>
                                          </React.Fragment>
                                        </select>
                                      </div>
                                    </div>
                                    <div style={{ color: "red" }}>

                                    </div>
                                
              </div>
            </div>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-12">
                <label>Description </label>
                <textarea
                  name="Description"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Description}
                  className="form-control"
                  rows="3"
                ></textarea>
                {formik.touched.Description && formik.errors.Description ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.Description}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="modal-footer-btn">
            <Button
              type="reset"
              className="btn btn-primary btn-filled"
              onClick={() => handleResetSp()}
            >
              Reset
            </Button>
            <button
              type="button"
              className="btn btn-primary btn-bordered"
              data-dismiss="modal"
              onClick={() => props.closePopup()}
            >
              Close
            </button>
            <Button
              type="submit"
              className="event-submit-button btn btn-primary btn-filled"
              onClick={() => handleSubmit()}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </Row>
  );
}
export default Add;
