import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, CloseButton, Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
function Add(props) {
  //  console.log("ppp",props.token)
  const [Speaker, setSpeaker] = useState([
    { name: "SpeakersName", email: "SpeakesrEmail" },
  ]);

  const [render, setRerender] = useState(0);
  const [Speakername, setSpeakerName] = useState([{ name: "", email: "" }]);
  const [bu, setBu] = useState([]);
  const [index, setIndex] = useState();
  const [Timezone, setTimezone] = useState([]);
  const [massage, setMassage] = useState();
  const [country, setCountry] = useState([]);
  const [Timezoneregion, setTimezoneregion] = useState([]);
  const handleMaltiInputAdd = () => {
    setSpeakerName([...Speakername, { name: "", email: "" }]);
  };
  const [token, setToken] = useState(localStorage.getItem("Token"));
  let navigate = useNavigate();
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
  useEffect(() => {
    console.log("inside render");
  }, [render]);

  const handleMaltiInputRumove = (i) => {  
    console.log("first,",i) 
       let data1=Speakername
       console.log("before,",data1)
       console.log("before1,",Speakername)
    
       Speakername.splice(0, 1);
      setTimeout(()=>setSpeakerName([...Speakername]),1000) 
        
      setRerender(render+1)      
     
     console.log("after,",data1.length)
    //  if () {
       
    //  }
        setSpeakerName(data1)
      // setRerender(render+1); 
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
         console.log(resp.data.data);
        setTimezoneregion(resp.data.data);
      }
    });
  };
  const handleGetCountry = () => {
    ExportApi.GetCountryData().then((resp) => {
      if (resp.ok) {
         console.log(resp.data.data);
         setCountry(resp.data.data);
      }
    });
  };
  const handleReset = (resetForm) => {
    
      resetForm();
  
  };
  const formik = useFormik({
    initialValues: {
      EventTitle: "",
      Timezone: "",
      event_start_time: "",
      Region: "",
      Bu: "",
      eventendtime: "",
      event_date: "",
      Description: "",
      code:'',
      Country:''
    },
    validationSchema: Yup.object({
      EventTitle: Yup.string().required("Event title is required"),
      Timezone: Yup.string().required("Timezone is required"),
      code: Yup.string().required("Code is required"),
      event_start_time: Yup.string().required("Event start time is required"),
      Region: Yup.string().required("Region is required"),
      Country: Yup.string().required("Country is required"),
      Bu: Yup.string().required("Bu is required"),
      eventendtime: Yup.string()
      .required("Event ent time is required"),
      event_date: Yup.string()
      .required("Event date is required"),
      Description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      var today = new Date(values.event_date);
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      let dateData=dd + '-'+ mm +'-'+yyyy
      console.log()
      let a = JSON.stringify(Speakername);
      console.log(dateData);
if(values.event_start_time>=values.eventendtime){
  setMassage("End time has to be greater start time")
}else{
setMassage(false)
  ExportApi.CreatEvent(
       values.EventTitle,
       Speakername[0].name&&Speakername[0].email?a:null,
       values.event_start_time,
       values.eventendtime,
       values.Timezone,
       values.code,
       values.Bu,
       dateData,
       values.Description,
       values.Region,
       values.Country
     )
       .then((resp) => {
         if (resp.data) {
           console.log(resp.data);
           if (resp.data.code == 200) {
             toast.success(resp.data.message, {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               });
               setTimeout(function(){
                 navigate("/webinar/event/edit")
               }, 5000);
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
}
  });
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
  useEffect(() => {
    setToken(localStorage.getItem("Token"));
    handleGetDataBu();
    handleGetTimezoneData();
    handleGetTimezoneregionData();
    handleGetCountry()
  }, [props.token, localStorage.getItem("Token")]);
  useEffect(() => {
   console.log(Speakername)
   setSpeakerName(Speakername)
  }, [Speakername]);

  return (
    <Row>
      {/* {console.log("Speakername",Speakername)} */}
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
          <Link to="/webinar/event/edit"><Button>Event List</Button></Link>
        <div>
          <h2>Create Event </h2>
          <div>
            <form onSubmit={formik.handleSubmit}>
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
                    name="EventTitle"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.EventTitle}
                  />
                  {formik.touched.EventTitle && formik.errors.EventTitle ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.EventTitle}
                    </div>
                  ) : null}
                </Col>
              </Form.Group>
              {Speakername.map((malti, i) => (
                <fieldset className="border p-2">
                  <div key={i}>
                    {Speakername.length > 1 ? (
                      <button
                        type="button"
                        onClick={() =>{setIndex(i); handleMaltiInputRumove(i)}}
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
                          name={
                            Speakername.length === 0 ? "name" : "name" + i
                          }
                          value={malti.name}
                          onChange={(e) => {
                            handleSpeakerName(e, i);
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
                          name={
                            Speakername.length === 0 ? "email" : "email" + i
                          }
                          onChange={(e) => {
                            handleSpeakerName(e, i);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </div>
                </fieldset>
              ))}
              <div className="mt-2"></div>
              <Form.Group className="mb-3">
                <Button
                  onClick={handleMaltiInputAdd}
                  className="speaker-button"
                >
                  Add More Speaker
                </Button>
              </Form.Group>
              <div className="clearfix"></div>
              <div className="mt-2"></div>
              <Form.Group
                className="mb-3"
                as={Row}
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label column sm={2}>
                  Region{" "}
                </Form.Label>
                <Col sm={10}>
                  <Form.Select
                    name="Region"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Region}
                  >
                    <option>Select Region</option>
                    {Timezoneregion?.map((val, i) => (
                      <React.Fragment key={i}>
                        <option key={i} value={val.values}>
                          {val.values}
                        </option>
                      </React.Fragment>
                    ))}
                  </Form.Select>
                  {formik.touched.Region && formik.errors.Region ? (
                    <div style={{ color: "red" }}>{formik.errors.Region}</div>
                  ) : null}
                </Col>
                <br />
              </Form.Group>
              <Form.Group
                className="mb-3"
                as={Row}
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label column sm={2}>
                 Country
                </Form.Label>
                <Col sm={10}>
                  <Form.Select
                    name="Country"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Country}
                  >
                    <option>Select Country</option>
                    {country?.map((val, i) => (
                      <React.Fragment key={i}>
                        <option key={i} value={val.country}>
                          {val.country}
                        </option>
                      </React.Fragment>
                    ))}
                  </Form.Select>
                  {formik.touched.Country && formik.errors.Country ? (
                    <div style={{ color: "red" }}>{formik.errors.Country}</div>
                  ) : null}
                </Col>
                <br />
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label column sm={2}>
                  Bu{" "}
                </Form.Label>
                <Col sm={10}>
                  <Form.Select
                    name="Bu"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Bu}
                  >
                    <option>Select Bu</option>
                    {bu?.map((val, i) => (
                      <React.Fragment key={i}>
                        <option key={i} value={val.values}>
                          {val.values}
                        </option>
                      </React.Fragment>
                    ))}
                  </Form.Select>
                  {formik.touched.Bu && formik.errors.Bu ? (
                    <div style={{ color: "red" }}>{formik.errors.Bu}</div>
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Timezone}
                  >
                    <option>Select Timezone</option>
                    {Timezone?.map((val, i) => (
                      <React.Fragment key={i}>
                        <option key={i} value={val.values}>
                          {val.values}
                        </option>
                      </React.Fragment>
                    ))}
                  </Form.Select>

                  {formik.touched.Timezone && formik.errors.Timezone ? (
                    <div style={{ color: "red" }}>{formik.errors.Timezone}</div>
                  ) : null}
                </Col>
              </Form.Group>
              <Form.Group
                className="mb-3"
                as={Row}
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label column sm={2}>
                  Event Date
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="event_date"
                    type="date"
                    min={yyyy + '-'+ mm +'-'+dd}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.event_date}
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
                  Event Start Time
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="event_start_time"
                    type="time"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.event_start_time}
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
                  Event End Time
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="eventendtime"
                    type="time"
                    // min={formik.values.event_start_time}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.eventendtime}
                  />
                  {formik.touched.eventendtime && formik.errors.eventendtime ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.eventendtime}
                    </div>
                  ) : null}
                    <div style={{ color: "red" }}>
                      { massage}
                    </div>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label column sm={2}>
                  Code
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="code"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.code}
                  />
                  {formik.touched.code && formik.errors.code ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.code}
                    </div>
                  ) : null}
                </Col>
              </Form.Group>
              <br/>
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
                    name="Description"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Description}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                  {formik.touched.Description && formik.errors.Description ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.Description}
                    </div>
                  ) : null}
                </Col>
              </Form.Group>
              <Button type="reset" onClick={handleReset.bind(null, formik.resetForm)}>Reset</Button>
              <Button type="submit" className="event-submit-button">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Col>
    </Row>
  );
}
export default Add;
