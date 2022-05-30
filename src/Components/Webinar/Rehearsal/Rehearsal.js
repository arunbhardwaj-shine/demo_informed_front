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
  const [SpeakernameErr, setSpeakerNameErr] = useState([
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
        speakerdata: [{ name: "", email: "" }],
        type: "",
        Description: "",
      },
    ]);
    setSpeakerNameErr([
      ...SpeakernameErr,
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
  };
  const handleMaltiInputRumove = (i) => {
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

  const handeleErr = () => {
    let err;
    for (let index = 0; index < Speakername.length; index++) {
    if (Speakername[index].EventTitle.length == 0) {
    err = false;
    const copydataErr = SpeakernameErr[index];
    copydataErr.EventTitle = "Title is required";
    setSpeakerNameErr([...SpeakernameErr]);
    }
    if (Speakername[index].Timezone.length == 0) {
    err = false;
    const copydataErr = SpeakernameErr[index];
    copydataErr.Timezone = "Timezone is required";
    setSpeakerNameErr([...SpeakernameErr]);
    }
    if (!Speakername[index].event_date) {
    err = false;
    const copydataErr = SpeakernameErr[index];
    copydataErr.event_date = "Event date is required";
    setSpeakerNameErr([...SpeakernameErr]);
    }
    if (Speakername[index].eventendtime.length == 0) {
    err = false;
    const copydataErr = SpeakernameErr[index];
    copydataErr.eventendtime = "Event end time is required";
    setSpeakerNameErr([...SpeakernameErr]);
    }
    if (Speakername[index].event_start_time.length == 0) {
    err = false;
    const copydataErr = SpeakernameErr[index];
    copydataErr.event_start_time = "Event end time is required";
    setSpeakerNameErr([...SpeakernameErr]);
    }
    
    
    
    for (let i = 0; i < Speakername[index].speakerdata.length; i++) {
    if (Speakername[index].speakerdata[i].name.length == 0) {
    err = false;
    const copydataErr = SpeakernameErr[index];
    copydataErr.speakerdata[i].name = "Name is required";
    setSpeakerNameErr([...SpeakernameErr]);
    }
    
    
    
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(Speakername[index].speakerdata[i].email.length == 0 || regex.test(Speakername[index].speakerdata[i].email) === false){
    
    
    
    err = false;
    const copydataErr = SpeakernameErr[index];
    copydataErr.speakerdata[i].email = "Email address is required";
    setSpeakerNameErr([...SpeakernameErr]);
    }
    }
    
    
    
    
    if (Speakername[index].type.length == 0) {
    err = false;
    const copydataErr = SpeakernameErr[index];
    copydataErr.type = "Type is required";
    setSpeakerNameErr([...SpeakernameErr]);
    }
    if (Speakername[index].Description.length == 0) {
    err = false;
    const copydataErr = SpeakernameErr[index];
    copydataErr.Description = "Description is required";
    setSpeakerNameErr([...SpeakernameErr]);
    }
    }
    return err
    };
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
      if (handeleErr()) {
        alert(true);
      }

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
    Speakername.splice(i, 1, copydata);
    setSpeakerName([...Speakername]);
    if (value.length == 0) {
      const copydataErr = SpeakernameErr[i];
      copydataErr.EventTitle = "requred Field EventTitle";
      setSpeakerNameErr([...SpeakernameErr]);
    } else {
      const copydataErr = SpeakernameErr[i];
      copydataErr.EventTitle = "";
      setSpeakerNameErr([...SpeakernameErr]);
    }
  };
  const handeledate = (e, i) => {
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.event_date = value;
    Speakername.splice(i, 1, copydata);
    setSpeakerName([...Speakername]);

    if (value.length == 0) {
      const copydataErr = SpeakernameErr[i];
      copydataErr.event_date = "requred Field Date";
      setSpeakerNameErr([...SpeakernameErr]);
    } else {
      const copydataErr = SpeakernameErr[i];
      copydataErr.event_date = "";
      setSpeakerNameErr([...SpeakernameErr]);
    }
  };
  const handleTimezone = (e, i) => {
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.Timezone = value;
    Speakername.splice(i, 1, copydata);
    setSpeakerName([...Speakername]);
    if (value.length == 0) {
      const copydataErr = SpeakernameErr[i];
      copydataErr.Timezone = "requred Field time Zone";
      setSpeakerNameErr([...SpeakernameErr]);
    } else {
      const copydataErr = SpeakernameErr[i];
      copydataErr.Timezone = "";
      setSpeakerNameErr([...SpeakernameErr]);
    }
  };
  const handleStartTime = (e, i) => {
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.event_start_time = value;
    Speakername.splice(i, 1, copydata);
    setSpeakerName([...Speakername]);
    if (value.length == 0) {
      const copydataErr = SpeakernameErr[i];
      copydataErr.event_start_time = "requred Field start time";
      setSpeakerNameErr([...SpeakernameErr]);
    } else {
      const copydataErr = SpeakernameErr[i];
      copydataErr.event_start_time = "";
      setSpeakerNameErr([...SpeakernameErr]);
    }
  };
  const handleEndTime = (e, i) => {
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.eventendtime = value;
    Speakername.splice(i, 1, copydata);
    setSpeakerName([...Speakername]);
    if (value.length == 0) {
      const copydataErr = SpeakernameErr[i];
      copydataErr.eventendtime = "requred Field eventendtime";
      setSpeakerNameErr([...SpeakernameErr]);
    } else {
      const copydataErr = SpeakernameErr[i];
      copydataErr.eventendtime = "";
      setSpeakerNameErr([...SpeakernameErr]);
    }
  };
  const handleChangeevent = (e, i) => {
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.type = value;
    Speakername.splice(i, 1, copydata);
    setSpeakerName([...Speakername]);

    if (value.length == 0) {
      const copydataErr = SpeakernameErr[i];
      copydataErr.type = "requred Field type";
      setSpeakerNameErr([...SpeakernameErr]);
    } else {
      const copydataErr = SpeakernameErr[i];
      copydataErr.type = "";
      setSpeakerNameErr([...SpeakernameErr]);
    }
  };
  const handleChangeDecription = (e, i) => {
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.Description = value;
    Speakername.splice(i, 1, copydata);
    setSpeakerName([...Speakername]);
    if (value.length == 0) {
      const copydataErr = SpeakernameErr[i];
      copydataErr.Description = "requred Field Description";
      setSpeakerNameErr([...SpeakernameErr]);
    } else {
      const copydataErr = SpeakernameErr[i];
      copydataErr.Description = "";
      setSpeakerNameErr([...SpeakernameErr]);
    }
  };
  const handleSpeakerdata = (e, i, index) => {
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.speakerdata[index].name = value;
    console.log(copydata.speakerdata[index].name);
    Speakername.splice(i, 1, copydata);
    setSpeakerName([...Speakername]);
    if (value.length == 0) {
      const copydataErr = SpeakernameErr[i];
      copydataErr.speakerdata[index].name = "requred Field name";
      setSpeakerNameErr([...SpeakernameErr]);
    } else {
      const copydataErr = SpeakernameErr[i];
      copydataErr.speakerdata[index].name = "";
      setSpeakerNameErr([...SpeakernameErr]);
    }
  };
  const handleSpeakerdataEmail = (e, i, index) => {
    const { value } = e.target;
    const copydata = Speakername[i];
    copydata.speakerdata[index].email = value;
    Speakername.splice(i, 1, copydata);
    setSpeakerName([...Speakername]);
    if (value.length == 0) {
      const copydataErr = SpeakernameErr[i];
      copydataErr.speakerdata[index].email = "requred Field email";
      setSpeakerNameErr([...SpeakernameErr]);
    } else if (
      !Speakername[i].speakerdata[index].email.match(
        /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i
      )
    ) {
      const copydataErr = SpeakernameErr[i];
      copydataErr.speakerdata[index].email = "Invalid email address";
      setSpeakerNameErr([...SpeakernameErr]);
    } else {
      const copydataErr = SpeakernameErr[i];
      copydataErr.speakerdata[index].email = "";
      setSpeakerNameErr([...SpeakernameErr]);
    }
  };
  const handleSpeakerdataInputAdd = (i) => {
    const copydata = Speakername[i];
    copydata.speakerdata.push({ name: "", email: "" });
    setSpeakerName([...Speakername]);
    const copydataErr = SpeakernameErr[i];
    copydataErr.speakerdata.push({ name: "", email: "" });
    console.log("copydataErr", copydataErr);
    setSpeakerNameErr([...SpeakernameErr]);
  };
  const handleSpeakerdataInputRumove = (i, index) => {
    const copydata = Speakername[i];
    const copydataErr = SpeakernameErr[i];
    copydata.speakerdata.splice(index, 1);
    copydataErr.speakerdata.splice(index, 1);
    console.log(copydata);
    setRerender(render + 1);
    setSpeakerName([...copydata]);
    setSpeakerNameErr([...copydataErr]);
  };

  const handleValidation = () => {
    Speakername.map((data) => {
      if (
        data.EventTitle == "" ||
        data.EventTitle == null ||
        data.EventTitle == undefined
      ) {
        setErr("Please enter title");
      } else if (
        data.Timezone == "" ||
        data.Timezone == null ||
        data.Timezone == undefined
      ) {
        setErr("Please select timezone");
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
  };
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
                  <h4>Select the rehearsal Information:{i + 1}</h4>
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
                      <div style={{ color: "red" }}>
                        <p> {SpeakernameErr[i].EventTitle}</p>
                      </div>
                      {/* {Speakername[i].EventTitle == "" ||
                      Speakername[i].EventTitle == null ||
                      Speakername[i].EventTitle == undefined ? (
                        <div style={{ color: "red" }}>{Err}</div>
                      ) : null} */}
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
                        onChange={(e) => handeledate(e, i)}
                        // onBlur={formik.handleBlur}
                        value={val.event_date}
                      />

                      <div style={{ color: "red" }}>
                        {<p> {SpeakernameErr[i].event_date}</p>}
                      </div>
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
                        onChange={(e) => handleTimezone(e, i)}
                        // onBlur={formik.handleBlur}
                        value={val.Timezone}
                      >
                        <option value="">Select Timezone</option>
                        {Timezone?.map((val, i) => (
                          <React.Fragment key={i}>
                            <option value={val.values}>{val.values}</option>
                          </React.Fragment>
                        ))}
                      </Form.Select>

                      <div style={{ color: "red" }}>
                        {/* {formik.errors.Timezone} */}
                        {SpeakernameErr[i].Timezone}
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    as={Row}
                    controlId="exampleForm.ControlInput1"
                  >
                    {console.log(SpeakernameErr)}
                    <Form.Label column sm={2}>
                      Event Start Time{" "}
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        // name="event_start_time"
                        type="time"
                        onChange={(e) => handleStartTime(e, i)}
                        // onBlur={formik.handleBlur}
                        value={val.event_start_time}
                      />
                      {formik.touched.event_start_time &&
                      formik.errors.event_start_time ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.event_start_time}
                        </div>
                      ) : null}
                      <div style={{ color: "red" }}>
                        {/* {formik.errors.Timezone} */}
                        {SpeakernameErr[i].event_start_time}
                      </div>
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
                        onChange={(e) => handleEndTime(e, i)}
                        // onBlur={formik.handleBlur}
                        value={val.eventendtime}
                      />
                      {formik.touched.eventendtime &&
                      formik.errors.eventendtime ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.eventendtime}
                        </div>
                      ) : null}
                      <div style={{ color: "red" }}>
                        {/* {formik.errors.Timezone} */}
                        {SpeakernameErr[i].eventendtime}
                      </div>
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
                              handleSpeakerdataInputRumove(i, index);
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
                                handleSpeakerdata(e, i, index);
                              }}
                            />

                            <div style={{ color: "red" }}>
                              {/* {formik.errors.Timezone} */}
                              {SpeakernameErr[i].speakerdata[index].name}
                            </div>
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
                                handleSpeakerdataEmail(e, i, index);
                              }}
                            />

                            <div style={{ color: "red" }}>
                              {/* {formik.errors.Timezone} */}
                              {SpeakernameErr[i].speakerdata[index].email}
                            </div>
                          </Col>
                        </Form.Group>
                      </div>
                    </fieldset>
                  ))}
                  <div class="mt-2"></div>
                  <Form.Group className="mb-3">
                    <Button
                      onClick={() => handleSpeakerdataInputAdd(i)}
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
                          onChange={(e) => handleChangeevent(e, i)}
                          onBlur={formik.handleBlur}
                          value={val.type}
                        >
                          <option value=""> Select Event</option>
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
                        <div style={{ color: "red" }}>
                          {/* {formik.errors.Timezone} */}
                          {SpeakernameErr[i].type}
                        </div>
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
                        onChange={(e) => handleChangeDecription(e, i)}
                        onBlur={formik.handleBlur}
                        value={val.Description}
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      <div style={{ color: "red" }}>
                        {/* {formik.errors.Timezone} */}
                        {SpeakernameErr[i].Description}
                      </div>
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
