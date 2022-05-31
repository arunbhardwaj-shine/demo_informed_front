import React, { useEffect, useState } from "react";
import ExportApi from "../../../Api/ExportApi";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import { loader } from "../../../loader";
function Rehearsal() {
  const [render, setRerender] = useState(0);
  const [Speakername, setSpeakerName] = useState([
    {
      title: "",
      timezone: "",
      date: "",
      end_time: "",
      start_time: "",
      invites_data: [{ name: "", email: "" }],
      event_id: "",
    },
  ]);
  const [SpeakernameErr, setSpeakerNameErr] = useState([
    {
      title: "",
      timezone: "",
      date: "",
      end_time: "",
      start_time: "",
      invites_data: [{ name: "", email: "" }],
      event_id: "",
    },
  ]);
  const [Timezone, setTimezone] = useState([]);
  const [event, setEvent] = useState([]);

  const handleMultiInputAdd = () => {
    setSpeakerName([
      ...Speakername,
      {
        title: "",
        timezone: "",
        date: "",
        end_time: "",
        start_time: "",
        invites_data: [{ name: "", email: "" }],
        event_id: "",
      },
    ]);
    setSpeakerNameErr([
      ...SpeakernameErr,
      {
        title: "",
        timezone: "",
        date: "",
        end_time: "",
        start_time: "",
        invites_data: [{ name: "", email: "" }],
        event_id: "",
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
      validateRehearsalData(index, "end_time", " end time is required");
      validateRehearsalData(index, "start_time", " end time is required");
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
      validateRehearsalData(index, "event_id", "Please select event");
    }
    return err;
  };

  const handleOnChange = (e, i) => {
    const { name, value } = e.target;
    Speakername.splice(i, 1, Speakername[i]);
    setSpeakerName([...Speakername]);
    SpeakernameErr[i][name] = "";
    if(name=="event_id"){
    Speakername[i][name] = value;
    if (value.length == 0) {
    SpeakernameErr[i][name] = "Please select event" ;
    }
    } else if(name=="timezone"){
    Speakername[i][name] = value;
    if (value.length == 0) {
    SpeakernameErr[i][name] = "Please select timezone" ;
    }
    } else{
    Speakername[i][name] = value;
    if (value.length == 0) {
    SpeakernameErr[i][name] = name + " is required";
    }
    }
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
      copydataErr.invites_data[index].name = " name  is required";
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
      copydataErr.invites_data[index].email = " email  is required";
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
    <Row>
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
      <Col md={{ span: 6, offset: 3 }}>
        <div>
         <Link to="/webinar/rehearsallist"><Button>Rehearsals</Button> </Link>
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
              {Speakername.map((val, i) => (
                <div>
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
                   <h2> Rehearsal {i + 1}</h2>
                   <br />
                   <br />
                   <h2>Select the rehearsal information. </h2>
                   <br />
                  {event ? (
                    <Form.Group
                      className="mb-3"
                      as={Row}
                    >
                      <Form.Label column sm={2}>
                        Event{" "}
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Select
                          name="event_id"
                          onChange={(e) => handleOnChange(e, i)}
                          value={val.event_id}
                        >
                          <option value=""> Select Event</option>
                          {event?.map((val, i) => (
                            <React.Fragment key={i}>
                              <option value={val.id}>{val.title}</option>
                            </React.Fragment>
                          ))}
                        </Form.Select>
                        <div style={{ color: "red" }}>
                          {SpeakernameErr[i].event_id}
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
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                      Rehearsal Title{" "}
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        name="title"
                        onChange={(e) => handleOnChange(e, i)}
                        value={val.title}
                      />
                      <div style={{ color: "red" }}>
                        <p> {SpeakernameErr[i].title}</p>
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Row}>
                    <Form.Label column sm={2}>
                      Date
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        name="date"
                        type="date"
                        min={yyyy + "-" + mm + "-" + dd}
                        onChange={(e) => handleOnChange(e, i)}
                        value={val.date}
                      />
                      <div style={{ color: "red" }}>
                        {<p> {SpeakernameErr[i].date}</p>}
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Row}>
                    <Form.Label column sm={2}>
                      Timezone{" "}
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Select
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
                      </Form.Select>
                      <div style={{ color: "red" }}>
                        {SpeakernameErr[i].timezone}
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Row}>
                    <Form.Label column sm={2}>
                      Event Start Time
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        name="start_time"
                        type="time"
                        onChange={(e) => handleOnChange(e, i)}
                        value={val.start_time}
                      />
                      <div style={{ color: "red" }}>
                        {SpeakernameErr[i].start_time}
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Row}>
                    <Form.Label column sm={2}>
                      Event End Time{" "}
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        name="end_time"
                        type="time"
                        onChange={(e) => handleOnChange(e, i)}
                        value={val.end_time}
                      />
                      <div style={{ color: "red" }}>
                        {SpeakernameErr[i].end_time}
                      </div>
                    </Col>
                  </Form.Group>
                  <br />
                  {val.invites_data.map((malti, index) => (
                    <fieldset className="border p-2">
                      <div key={i}>
                      <p>Enter the speaker’s information's</p>
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
                        <Form.Group
                          as={Row}
                          className="mb-3"
                        >
                          <Form.Label column sm={2}>
                            Name
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="text"
                              value={malti.name}
                              onChange={(e) => {
                                handleSpeakerdata(e, i, index);
                              }}
                            />
                            <div style={{ color: "red" }}>
                              {SpeakernameErr[i].invites_data[index].name}
                            </div>
                          </Col>
                          <div className="mt-2"></div>
                          <Form.Label column sm={2}>
                            Email
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="email"
                              value={malti.email}
                              onChange={(e) => {
                                handleSpeakerdataEmail(e, i, index);
                              }}
                            />
                            <div style={{ color: "red" }}>
                              {SpeakernameErr[i].invites_data[index].email}
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
                      Add Speaker
                    </Button>
                  </Form.Group>
                  <div class="clearfix"></div>
                  <div class="mt-2"></div>
                </div>
              ))}
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
      </Col>
    </Row>
  );
}

export default Rehearsal;
