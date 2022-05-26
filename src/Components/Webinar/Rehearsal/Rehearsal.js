import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
function Rehearsal() {
  const [render, setRerender] = useState(0);
  const [Err, setErr] = useState(false);

  const [addForm, setAddForm] = useState([{ data: "SpeakersName" }]);
  // const [Speakername, setSpeakerName] = useState([{name: "", email: "" }]);
  const [Speakername, setSpeakerName] = useState([
    {
      EventTitle: "",
      Timezone: "",
      event_date: "",
      eventendtime: "",
      event_start_time: "",
      speakerdata: [{ name: "", email: "" }],
      type: "",
      Description: "",
    },
  ]);
  const [Timezone, setTimezone] = useState([]);
  const [event, setEvent] = useState([]);
 
  
  const handleMaltiInputAdd = () => {
    setSpeakerName([
      ...Speakername,
      {
        EventTitle: "",
        Timezone: "",
        event_date: "",
        eventendtime: "",
        event_start_time: "",
        speakerdata:[{ name: "", email: "" }],
        type: "",
        Description: "",
      },
    ]);
  };
  const handleSpeakerName = (e, i) => {
    if (e.target.name === `name${i}`) {
      const speker = Speakername[i];
      speker.name = e.target.value;
      Speakername.splice(i, 1, { ...speker });
      setSpeakerName([...Speakername]);
    } else if (e.target.name === `email${i}`) {
      const speker = Speakername[i];
      speker.email = e.target.value;
      Speakername.splice(i, 1, { ...speker });
      setSpeakerName([...Speakername]);
    }
  };

  const handleMaltiInputRumove = (i) => {
    let data1 = Speakername;
    Speakername.splice(i, 1);
    setTimeout(() => setSpeakerName([...Speakername]), 1000);
   

    setSpeakerName(data1);
  };
  const handleGetTimezoneData = () => {
    ExportApi.GetTimezoneData().then((resp) => {
      if (resp.ok) {
        setTimezone(resp.data.data);
      }
    });
  };
  const handleGetEventlist = () => {
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
        setEvent(resp.data.data);
      }
    });
  };
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  useEffect(() => {
    handleGetTimezoneData();
    handleGetEventlist();
  }, []);

  const formik = useFormik({
    initialValues: {
      EventTitle: "",
      Timezone: "",
      event_start_time: "",
      eventendtime: "",
      event_date: "",
      type: "",
      Description: "",
    },
    onSubmit: (values) => {
      handleValidation()
      // var today = new Date(values.event_date);
      // var dd = String(today.getDate()).padStart(2, "0");
      // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      // var yyyy = today.getFullYear();
      // let dateData = dd + "-" + mm + "-" + yyyy;
      // let a = JSON.stringify(Speakername);
      // ExportApi.CreatRehearsal(
      //   values.EventTitle,
      //   values.Timezone,
      //   values.event_start_time,
      //   values.eventendtime,
      //   dateData,
      //   values.type,
      //   values.Description,
      //   Speakername[0].name && Speakername[0].email ? a : null
      // )
      //   .then((resp) => {
      //     if (resp.data.code == 200) {
      //       toast.success(resp.data.message, {
      //         position: "top-right",
      //         autoClose: 5000,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //       });
      //     } else {
      //       toast.error(resp.data.message, {
      //         position: "top-right",
      //         autoClose: 5000,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //       });
      //     }
      //   })
      //   .catch((err) => console.log(err));
    },
  });

  const handeleEventTitle = (e, i) => {
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.EventTitle = value;
    Speakername.splice(i,1,copydata)
     setSpeakerName([...Speakername])
  };
  const handeledate = (e, i) => {
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.event_date = value;
    Speakername.splice(i,1,copydata)
     setSpeakerName([...Speakername])
  };
  const handleTimezone=(e,i)=>{
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.Timezone = value;
    Speakername.splice(i,1,copydata)
     setSpeakerName([...Speakername])
  }
  const handleStartTime=(e,i)=>{
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.event_start_time = value;
    Speakername.splice(i,1,copydata)
     setSpeakerName([...Speakername])
  }
  const handleEndTime=(e,i)=>{
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.eventendtime = value;
    Speakername.splice(i,1,copydata)
     setSpeakerName([...Speakername])
  }
  const handleChangeevent=(e,i)=>{
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.type = value;
    Speakername.splice(i,1,copydata)
     setSpeakerName([...Speakername])
  }
  const handleChangeDecription=(e,i)=>{
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.Description = value;
    Speakername.splice(i,1,copydata)
     setSpeakerName([...Speakername])
  }
  const handleSpeakerdata=(e,i,index)=>{
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.speakerdata[index].name = value;
    Speakername.splice(i,1,copydata)
     setSpeakerName([...Speakername])
  }
  const handleSpeakerdataEmail=(e,i,index)=>{
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.speakerdata[index].email = value;
    Speakername.splice(i,1,copydata)
     setSpeakerName([...Speakername])
  }
  const handleSpeakerdataInputAdd=(i)=>{
    const copydata = Speakername[i];
    copydata.speakerdata.push({name:'',email:''})
    console.log(copydata)
      setSpeakerName([...Speakername])
  };
  const handleSpeakerdataInputRumove=(i,index)=>{
    const copydata = Speakername[i];
    copydata.speakerdata.splice(index, 1)
    console.log(copydata)
    setRerender(render + 1);
      setSpeakerName([...copydata])
  };
  
  const handleValidation=()=>{
     Speakername.map((data) => {
      if (data.EventTitle == ""||data.EventTitle==null||data.EventTitle==undefined) {
        setErr("Please enter title")
      } else if(data.Timezone == ""||data.Timezone==null||data.Timezone==undefined){
        setErr("Please select timezone")
      }
    });
    // if (Speakername.every((element) => element == "true")) {
    //   setHpc([
    //     ...hpc,
    //     {
    //       firstname: "",
    //       lastname: "",
    //       email: "",
    //       contact_type: "",
    //       country: "",
    //     },
    //   ]);
    // } else {
    //   toast.warning("Please input the email atleast");
    // }
  }
  return (
    <Row>
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
      <Col md={{ span: 6, offset: 3 }}>
        <div>
          <h2> Rehearsal</h2>
          <div>
            <form onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
              {Speakername.map((val, i) => (
                <div>
                          {Speakername.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => {
                          // setIndex(i);
                          handleMaltiInputRumove(i);
                        }}
                        className="btn-close float-end"
                        aria-label="Close"
                      />
                    ) : null}
                  <h4>Select the rehearsal Information:{i+1}</h4>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label column sm={2}>
                      Event Title{" "}
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        // name="EventTitle"
                        onChange={(e) => handeleEventTitle(e, i)}
                        // onBlur={formik.handleBlur}
                        value={val.EventTitle}
                      />
                      {Speakername[i].EventTitle == ""||Speakername[i].EventTitle==null||Speakername[i].EventTitle==undefined?(
                        <div style={{ color: "red" }}>
                          {Err}
                        </div>
                      ) : null}
                    </Col>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    as={Row}
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label column sm={2}>
                      Date{" "}
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        name="event_date"
                        type="date"
                        min={yyyy + "-" + mm + "-" + dd}
                        onChange={(e)=>handeledate(e,i)}
                        // onBlur={formik.handleBlur}
                        value={val.event_date}
                      />
                      {formik.touched.event_date && formik.errors.event_date ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.event_date}
                        </div>
                      ) : null}
                    </Col>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    as={Row}
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label column sm={2}>
                      Timezone{" "}
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Select
                        name="Timezone"
                        onChange={(e)=>handleTimezone(e,i)}
                        // onBlur={formik.handleBlur}
                        value={val.Timezone}
                      >
                        <option>Select Timezone</option>
                        {Timezone?.map((val, i) => (
                          <React.Fragment key={i}>
                            <option value={val.values}>{val.values}</option>
                          </React.Fragment>
                        ))}
                      </Form.Select>
                      {formik.touched.Timezone && formik.errors.Timezone ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.Timezone}
                        </div>
                      ) : null}
                    </Col>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    as={Row}
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label column sm={2}>
                      Event Start Time{" "}
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        // name="event_start_time"
                        type="time"
                        onChange={(e)=>handleStartTime(e,i)}
                        // onBlur={formik.handleBlur}
                        value={val.event_start_time}
                      />
                      {formik.touched.event_start_time &&
                      formik.errors.event_start_time ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.event_start_time}
                        </div>
                      ) : null}
                    </Col>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    as={Row}
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label column sm={2}>
                      Event End Time{" "}
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        name="eventendtime"
                        type="time"
                        onChange={(e)=>handleEndTime(e,i)}
                        // onBlur={formik.handleBlur}
                        value={val.eventendtime}
                      />
                      {formik.touched.eventendtime &&
                      formik.errors.eventendtime ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.eventendtime}
                        </div>
                      ) : null}
                    </Col>
                  </Form.Group>
                  <br />

                  {val.speakerdata.map((malti, index) => (
                    <fieldset className="border p-2">
                      <div key={i}>
                        {val.speakerdata.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => {
                              handleSpeakerdataInputRumove(i,index);
                            }}
                            className="btn-close float-end"
                            aria-label="Close"
                          />
                        ) : null}
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label column sm={2}>
                            Speaker Name
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="text"
                              // name={
                              //   Speakername.length === 0 ? "name" : "name" + i
                              // }
                              value={malti.name}
                              onChange={(e) => {
                                handleSpeakerdata(e, i,index);
                              }}
                            />
                          </Col>
                          <div className="mt-2"></div>
                          <Form.Label column sm={2}>
                            Speaker Email
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="email"
                              value={malti.email}
                              // name={
                              //   .speakerdata.length === 0 ? "email" : "email" + i
                              // }
                              onChange={(e) => {
                                handleSpeakerdataEmail(e, i,index);
                              }}
                            />
                          </Col>
                        </Form.Group>
                      </div>
                    </fieldset>
                  ))}
                  <div class="mt-2"></div>
                  <Form.Group className="mb-3">
                    <Button
                      onClick={()=>handleSpeakerdataInputAdd(i)}
                      className="speaker-button"
                    >
                      Add More Speaker
                    </Button>
                  </Form.Group>
                  <div class="clearfix"></div>
                  <div class="mt-2"></div>

                  <br />
                  {event ? (
                    <Form.Group
                      className="mb-3"
                      as={Row}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label column sm={2}>
                        Event{" "}
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Select
                          name="type"
                          onChange={(e)=>handleChangeevent(e,i)}
                          onBlur={formik.handleBlur}
                          value={val.type}
                        >
                          <option> Select Event</option>
                          {event?.map((val, i) => (
                            <React.Fragment key={i}>
                              <option value={val.id}>{val.title}</option>
                            </React.Fragment>
                          ))}
                        </Form.Select>

                        {formik.touched.Timezone && formik.errors.Timezone ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.Timezone}
                          </div>
                        ) : null}
                      </Col>
                    </Form.Group>
                  ) : (
                    <h4>
                      <Link to="/webinar/event/add" style={{ color: "red" }}>
                        Please create event{" "}
                      </Link>
                    </h4>
                  )}

                  <br />
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label column sm={2}>
                      Description{" "}
                    </Form.Label>
                    <Col sm={10}>
                      <textarea
                        // name="Description"
                        type="text"
                        onChange={(e)=>handleChangeDecription(e,i)}
                        onBlur={formik.handleBlur}
                        value={val.Description}
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </Col>
                  </Form.Group>
                </div>
              ))}
              <Button type="submit" className="event-submit-button">
                Submit
              </Button>
            </form>
          </div>
          <button
            className="btn btn-success btn-block"
            onClick={handleMaltiInputAdd}
          >
            Schedule another rehearsal
          </button>
        </div>
      </Col>
    </Row>
  );
}

export default Rehearsal;
