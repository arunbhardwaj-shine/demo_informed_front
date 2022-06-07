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
                      aria-label="Close"
                    />
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
                        <p> {SpeakernameErr[i]?.title}</p>
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
                        {<p> {SpeakernameErr[i]?.date}</p>}
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
                        {val.invites_data.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => {
                              handleSpeakerDataInputRemove(i, index);
                            }}
                            className="btn-close float-end"
                            aria-label="Close"
                          />
                        ) : null}
                        <div className="form-group col-12 col-md-6">
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
                       <div className="form-group col-12 col-md-6">
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
                      </div>
                  ))}
                  </fieldset>
                  <div class="mt-2"></div>
                  <Form.Group className="mb-3">
                    <Button
                      onClick={() => handleSpeakerdataInputAdd(i)}
                      className="speaker-button"
                    >
                      Add Speaker
                    </Button>
                  </Form.Group>
                  {localStorage.getItem("EventIdHeader") ? null : (
                    <h4>
                      <Link to="/webinar/event/add" style={{ color: "red" }}>
                        Please create event
                      </Link>
                    </h4>
                  )}
                  <br />
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
              </div>
              <Button type="submit" className="event-submit-button">
                Create
              </Button>
            </form>
          </div>
          <button
            className="btn btn-success btn-block"
            onClick={handleMultiInputAdd}
          >
            Schedule another rehearsal
          </button>
        </div>
        <div className="title_create">
         <p>Click on invitation Email to customize the email</p><button><Link to="/webinar/customizerehearsalinvites">invitation Email</Link> </button>
        </div>
      </Col>
    </Row>
    </div>
  );
}

export default Rehearsal;
