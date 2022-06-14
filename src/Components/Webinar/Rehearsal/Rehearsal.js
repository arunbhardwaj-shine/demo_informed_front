import React, { useEffect, useState } from "react";
import ExportApi from "../../../Api/ExportApi";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import { loader } from "../../../loader";
function Rehearsal() {
  const [render, setRerender] = useState(0);
  const [EventTime, setEventTime] = useState([
    {Hour:[{Hour:"01"},{Hour:"02"},{Hour:"03"},{Hour:"04"},{Hour:"05"},{Hour:"06"},{Hour:"07"},{Hour:"08"},{Hour:"09"},{Hour:"10"},{Hour:"11"},{Hour:"12"},],
      mints:[{mints:"00"},{mints:"05"},{mints:10},{mints:15},{mints:20},{mints:25},{mints:30},{mints:35},{mints:40},{mints:45},{mints:50},{mints:55}]}]);
  const [Speakername, setSpeakerName] = useState([
    {
      title: "",
      timezone: "",
      date: "",
      start_hour:"",
      start_min:"",
      start_am_pm:"",
      end_hour:"",
      end_min:"",
      end_am_pm:"",

      invites_data: [{ name: "", email: "" }],
      event_id: localStorage.getItem("EventIdHeader"),
    },
  ]);
  const [SpeakernameErr, setSpeakerNameErr] = useState([
    {
      title: "",
      timezone: "",
      date: "",
      start_hour:"",
      start_min:"",
      start_am_pm:"",
      end_hour:"",
      end_min:"",
      end_am_pm:"",
      invites_data: [{ name: "", email: "" }],
    },
  ]);
  const [Timezone, setTimezone] = useState([]);

  const handleMultiInputAdd = () => {
    setSpeakerName([
      ...Speakername,
      {
        title: "",
        timezone: "",
        date: "",
        start_hour:"",
        start_min:"",
        start_am_pm:"",
        end_hour:"",
        end_min:"",
        end_am_pm:"",
        invites_data: [{ name: "", email: "" }],
        event_id: localStorage.getItem("EventIdHeader"),
      },
    ]);
    setSpeakerNameErr([
      ...SpeakernameErr,
      {
        title: "",
        timezone: "",
        date: "",
        start_hour:"",
        start_min:"",
        start_am_pm:"",
        end_hour:"",
        end_min:"",
        end_am_pm:"",
        invites_data: [{ name: "", email: "" }],
      },
    ]);
  };
  const handleMultiInputRemove = (i) => {
    let data1 = Speakername;
    let dataErr = SpeakernameErr;
    Speakername.splice(i, 1);
    SpeakernameErr.splice(i, 1);
    setTimeout(() => setSpeakerName([...Speakername]), 1000);
    setTimeout(() => setSpeakerNameErr([...SpeakernameErr]), 1000);
    setSpeakerName(data1);
    setSpeakerNameErr(dataErr);
  };
  const handleGetTimezoneData = () => {
    ExportApi.GetTimezoneData().then((resp) => {
      if (resp.ok) {
        setTimezone(resp.data.data);
      }
    });
  };
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  useEffect(() => {
    handleGetTimezoneData();
  }, []);

  let err;
  function validateRehearsalData(index, field_name, message) {
    err = true;
    if (Speakername[index][field_name].length == 0) {
      SpeakernameErr[index][field_name] = message;
      setSpeakerNameErr([...SpeakernameErr]);
      err = false;
    }
    return err;
  }
  const handleError = () => {
    for (let index = 0; index < Speakername.length; index++) {
      validateRehearsalData(index, "title", "Title is required");
      validateRehearsalData(index, "timezone", "Please select  timezone");
      validateRehearsalData(index, "date", "Date is required");
      validateRehearsalData(index, "start_hour", " Start time is required ");
      validateRehearsalData(index, "start_min", " Start time is required ");
      validateRehearsalData(index, "start_am_pm", "Start time is required  ");
      validateRehearsalData(index, "end_hour", " End time is required");
      validateRehearsalData(index, "end_min", " End time is required");
      validateRehearsalData(index, "end_am_pm", "End time is required ");
      for (let i = 0; i < Speakername[index].invites_data.length; i++) {
        if (Speakername[index].invites_data[i].name.length == 0) {
          err = false;
          SpeakernameErr[index].invites_data[i].name = "Name is required";
          setSpeakerNameErr([...SpeakernameErr]);
        }
        const regex =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (
          Speakername[index].invites_data[i].email.length == 0 ||
          regex.test(Speakername[index].invites_data[i].email) === false
        ) {
          err = false;
          SpeakernameErr[index].invites_data[i].email =
            "Email address is required";
          setSpeakerNameErr([...SpeakernameErr]);
        }
      }
    }
    return err;
  };

  const handleOnChange = (e, i) => {
    const { name, value } = e.target;
    Speakername.splice(i, 1, Speakername[i]);
    setSpeakerName([...Speakername]);
    SpeakernameErr[i][name] = "";
    
    if(name=="start_hour"){
      Speakername[i][name] = value;
      if (value == "00"){
      SpeakernameErr[i][name] = "Please select start time" ;
      }
      }else if(name=="end_hour"){
        Speakername[i][name] = value;
        if (value == "00"){
        SpeakernameErr[i][name] = "Please select end time" ;
        }
      }
      else{
    if(name=="timezone"){
    Speakername[i][name] = value;
    if (value.length == 0){
    SpeakernameErr[i][name] = "Please select timezone" ;
    }
    } else{
    Speakername[i][name] = value;
    if (value.length == 0) {
    SpeakernameErr[i][name] = name + " is required";
    }
    }}
    setSpeakerNameErr([...SpeakernameErr]);
    }
  const handleSpeakerdata = (e, i, index) => {
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.invites_data[index].name = value;
    console.log(copydata.invites_data[index].name);
    Speakername.splice(i, 1, copydata);
    setSpeakerName([...Speakername]);
    if (value.length == 0) {
      const copydataErr = SpeakernameErr[i];
      copydataErr.invites_data[index].name = "Name  is required";
      setSpeakerNameErr([...SpeakernameErr]);
    } else {
      const copydataErr = SpeakernameErr[i];
      copydataErr.invites_data[index].name = "";
      setSpeakerNameErr([...SpeakernameErr]);
    }
  };
  const handleSpeakerdataEmail = (e, i, index) => {
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.invites_data[index].email = value;
    Speakername.splice(i, 1, copydata);
    setSpeakerName([...Speakername]);
    if (value.length == 0) {
      const copydataErr = SpeakernameErr[i];
      copydataErr.invites_data[index].email = " Email  is required";
      setSpeakerNameErr([...SpeakernameErr]);
    } else if (
      !Speakername[i].invites_data[index].email.match(
        /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i
      )
    ) {
      const copydataErr = SpeakernameErr[i];
      copydataErr.invites_data[index].email = "Invalid email address";
      setSpeakerNameErr([...SpeakernameErr]);
    } else {
      const copydataErr = SpeakernameErr[i];
      copydataErr.invites_data[index].email = "";
      setSpeakerNameErr([...SpeakernameErr]);
    }
  };
  const handleSpeakerdataInputAdd = (i) => {
    const copydata = Speakername[i];
    copydata.invites_data.push({ name: "", email: "" });
    setSpeakerName([...Speakername]);
    const copydataErr = SpeakernameErr[i];
    copydataErr.invites_data.push({ name: "", email: "" });
    console.log("copydataErr", copydataErr);
    setSpeakerNameErr([...SpeakernameErr]);
  };
  const handleSpeakerDataInputRemove = (i, index) => {
    const copydata = Speakername[i];
    const copydataErr = SpeakernameErr[i];
    copydata.invites_data.splice(index, 1);
    copydataErr.invites_data.splice(index, 1);
    console.log(copydata);
    setRerender(render + 1);
    setSpeakerName([...copydata]);
    setSpeakerNameErr([...copydataErr]);
  };
  return (
    <div class="right-sidebar">

    <Row >
      <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
      {console.log(Speakername)}
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
      <Col class="right-sidebar">
        <div >
         <Link to="/webinar/rehearsallist"><Button>Back</Button> </Link>
         <Row>

         <Col>
         <h3 className="title_create">Rehearsal</h3>
         </Col>
         <Col>
         <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Choice File</Form.Label>
                <Form.Control
                  name="file"
                  // onChange={(e) => {
                  //   handeleimage(e);
                  // }}
                  type="file"
                  size="md"
                />
                <p>Would you like upload any file to the speaker</p>
            {/* <p style={{color:"red"}}>{imageErr}</p>    */}
                <Button
                  // onClick={() => {
                  //   sendExcelFile();
                  // }}
                >
                  Upload
                </Button>
              </Form.Group>
         </Col>
         <Col>
         <Button>SpeakerZone</Button>
         </Col>
         </Row>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (handleError()) {
                  loader("show");
                  let rehearsalSpeakername = JSON.stringify(Speakername);
                  ExportApi.CreatRehearsal(rehearsalSpeakername)
                    .then((resp) => {
                      if (resp.data.code == 200) {
                        loader("hide");
                        toast.success(resp.data.message, {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      } else {
                        loader("hide");
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
                    })
                    .catch((err) => console.log(err));
                }
              }}
            >
               <div className="create_reheasal">
              {Speakername.map((val, i) => (
                <>
                  <div className="reheasal_info">
                  <div className="reheasal_info_inside">
                  <div className="reheasal-box">
                    <h4 className="reheasal-box-title">Select the rehearsal information.</h4>
                 <div key={i}>
                 <fieldset className="reheasal-box-first">
                  {Speakername.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        handleMultiInputRemove(i);
                      }}
                      className="btn-close float-end"
                      aria-label="Close">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z" fill="#ffffff"></path><path d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z" fill="#ffffff"></path><path d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z" fill="#ffffff"></path><path d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z" fill="#ffffff"></path><path d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z" fill="#ffffff"></path><path d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z" fill="#ffffff"></path></svg>
                      </button>
                  ) : null}
                   <br />
                   <div className="form-inline row justify-content-between align-items-center">

                   <div className="form-group col-12 col-md-12">
                      <label for="exampleInputEmail1"> Rehearsal Title </label>
                      <input
                         className="form-control"
                          name="title"
                          onChange={(e) => handleOnChange(e, i)}
                          value={val.title}
                       
                      />
                         <div style={{ color: "red" }}>
                        {SpeakernameErr[i]?.title}
                      </div>
                      </div>
                      </div>
                   <div className="form-inline row justify-content-between align-items-center">
                    <div className="form-group col-12 col-md-5">
                      <label for="exampleInputEmail1">Date </label>
                      <input
                       className="form-control"
                         name="date"
                         type="date"
                         min={yyyy + "-" + mm + "-" + dd}
                         onChange={(e) => handleOnChange(e, i)}
                         value={val.date}
                       
                      />
                       <div style={{ color: "red" }}>
                         {SpeakernameErr[i]?.date}
                      </div>
                      {/*validator.message(
                        "emailDesc",
                        emailDescription,
                        "required"
                      )*/}
                    </div>
                   
                    <div className="form-group right-side col-12 col-md-7">
                      <label for="exampleInputEmail1">Event Start Time</label>
                       <div className="form-inline row justify-content-between align-items-center">
                       <div className="form-group col-12 col-md-4">
                       <select
                    className="form-control"
                        name="start_hour"
                         onChange={(e) => handleOnChange(e, i)}
                         value={val.start_hour}
                      >
                        {EventTime[0].Hour?.map((val, i) => (
                          <React.Fragment key={i}>
                            <option value={val.Hour}>{val.Hour}</option>
                          </React.Fragment>
                        ))}
                      </select>
                         </div>
                       <div className="form-group col-12 col-md-4">
                       <select
                    className="form-control"
                        name="start_min"
                        onChange={(e) => handleOnChange(e, i)}
                         value={val.start_min}
                      >
                        {EventTime[0].mints?.map((val, i) => (
                          <React.Fragment key={i}>
                            <option value={val.mints}>{val.mints}</option>
                          </React.Fragment>
                        ))}
                      </select>
                         </div>
                       <div className="form-group col-12 col-md-4">
                       <select
                         className="form-control"
                        name="start_am_pm"
                         onChange={(e) => handleOnChange(e, i)}
                         value={val.start_am_pm}
                      >
                          <React.Fragment key={i}>
                            <option value={"AM"}>AM</option>
                            <option value={"PM"}>PM</option>
                          </React.Fragment>
                      </select>
                         </div>
                       </div>
                    
                       <div style={{ color: "red" }}>
                        {SpeakernameErr[i].start_hour}
                      </div>
                      </div>
                   
                  </div>
                   <div className="form-inline row justify-content-between align-items-center">
                  <div className="form-group col-12 col-md-5">
                  <label for="exampleInputEmail1">Select Timezone</label>
                  <select
                    className="form-control"
                        name="timezone"
                        onChange={(e) => handleOnChange(e, i)}
                        value={val.timezone}
                      >
                        <option value="">Select Timezone</option>
                        {Timezone?.map((val, i) => (
                          <React.Fragment key={i}>
                            <option value={val.values}>{val.values}</option>
                          </React.Fragment>
                        ))}
                      </select>
                      <div style={{ color: "red" }}>
                        {SpeakernameErr[i]?.timezone}
                      </div>
                      </div>
                      <div className="form-group right-side col-12 col-md-7">
                      <label for="exampleInputEmail1">Event End Time</label>
                      <div className="form-inline row justify-content-between align-items-center">
                       <div className="form-group col-12 col-md-4">
                       <select
                         className="form-control"
                        name="end_hour"
                         onChange={(e) => handleOnChange(e, i)}
                         value={val.end_hour}
                      >
                        {EventTime[0].Hour?.map((val, i) => (
                          <React.Fragment key={i}>
                            <option value={val.Hour}>{val.Hour}</option>
                          </React.Fragment>
                        ))}
                      </select>
                         </div>
                       <div className="form-group col-12 col-md-4">
                       <select
                    className="form-control"
                        name="end_min"
                        onChange={(e) => handleOnChange(e, i)}
                         value={val.end_min}
                      >
                        {EventTime[0].mints?.map((val, i) => (
                          <React.Fragment key={i}>
                            <option value={val.mints}>{val.mints}</option>
                          </React.Fragment>
                        ))}
                      </select>
                         </div>
                       <div className="form-group col-12 col-md-4">
                       <select
                         className="form-control"
                        name="end_am_pm"
                         onChange={(e) => handleOnChange(e, i)}
                         value={val.end_am_pm}
                      >
                          <React.Fragment key={i}>
                            <option value={"AM"}>AM</option>
                            <option value={"PM"}>PM</option>
                          </React.Fragment>
                      </select>
                         </div>
                       </div>
                       <div style={{ color: "red" }}>
                        {SpeakernameErr[i]?.end_hour}
                      </div>
                      </div>
                      </div>
                      <fieldset class="border p-2">
                      {val.invites_data.map((malti, index) => (
                     <div key={i} className="form-inline row justify-content-between align-items-center">

                      <label>Enter the speaker’s information's</label>
                   
                        <div className="form-group col-12 col-md-5">
                            <label>Name</label>
                          
                            <input type="text" placeholder="Speaker's Name" className="form-control"
                              value={malti.name}
                              onChange={(e) => {
                                handleSpeakerdata(e, i, index);
                              }}
                            />
                            <div style={{ color: "red" }}>
                              {SpeakernameErr[i]?.invites_data[index]?.name}
                            </div>
                       </div>
                       <div className="form-group col-12 col-md-5">
                          <div className="mt-2"></div>
                          <label column sm={2}>
                            Email
                          </label>
                         
                            <input  placeholder="Speaker's Name" className="form-control"
                              type="email"
                              value={malti.email}
                              onChange={(e) => {
                                handleSpeakerdataEmail(e, i, index);
                              }}
                            />
                            <div style={{ color: "red" }}>
                              {SpeakernameErr[i]?.invites_data[index]?.email}
                            </div>
                         
                        </div>
                        {/* {val.invites_data.length > 1 ? ( */}
                          <div className="form-group col-12 col-md-2">
                          <button
                            type="button"
                            onClick={() => {
                              handleSpeakerDataInputRemove(i, index);
                            }}
                            className="btn-close float-end"
                            aria-label="Close"
                          ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z" fill="#ffffff"></path><path d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z" fill="#ffffff"></path><path d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z" fill="#ffffff"></path><path d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z" fill="#ffffff"></path><path d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z" fill="#ffffff"></path><path d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z" fill="#ffffff"></path></svg></button>
                       { /* ) : null} */}
                       </div>
                      </div>
                  ))}
                  <Form.Group className="mb-3">
                    <Button
                      onClick={() => handleSpeakerdataInputAdd(i)}
                      className="speaker-button"
                    >
                      Add Speaker <span>+</span>
                    </Button>
                  </Form.Group>
                  </fieldset>
                  <div class="mt-2"></div>
                  {localStorage.getItem("EventIdHeader") ? null : (
                    <h4>
                      <Link to="/webinar/event/add" style={{ color: "red" }}>
                        Please create event
                      </Link>
                    </h4>
                  )}
                  <br />
                  <div className="title_create">
         <p>Click on invitation Email to customize the email</p><button><Link to="/webinar/customizerehearsalinvites">invitation Email</Link> </button>
        </div>
                  </fieldset>
                </div>
              </div>
              </div>
           <div className="reheasal_name">
           <h2>Rehearsal {i+1}</h2>
         </div>
              
           </div>
         </>
              ))}
                  <div className="schedule_reheasal"onClick={handleMultiInputAdd} >
               <h6>Schedule another rehearsal <span>+</span></h6>
                       
                  </div>
              </div>
              <Button type="submit" className="event-submit-button">
                Create
              </Button>
            </form>
          </div>
        </div>
       
      </Col>
    </Row>
    </div>
  );
}

export default Rehearsal;
