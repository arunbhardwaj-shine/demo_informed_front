import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, CloseButton, Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import '../webinar.css';

function Add(props) {
  //  console.log("ppp",props.token)
  const [Speaker, setSpeaker] = useState([
    { name: "SpeakersName", email: "SpeakesrEmail" },
  ]);

  const[render,setRerender]=useState(0)
  const [Speakername, setSpeakerName] = useState([{ name: "", email: "" }]);
  const [bu, setBu] = useState([]);
  const [Timezone, setTimezone] = useState([]);
  const [Timezoneregion, setTimezoneregion] = useState([]);
  const handleMaltiInputAdd = () => {
    setSpeaker([...Speaker, { name: "SpeakersName", email: "SpeakesrEmail" }]);
    setSpeakerName([...Speakername, { name: "", email: "" }]);
  };
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const handleSpeakerName = (e, i) => {
    if (e.target.name === `SpeakersName${i}`) {
      const speker = Speakername[i];
      speker.name = e.target.value;
      Speakername.splice(i, 1, { ...speker });
      setSpeakerName([...Speakername]);
    } else if (e.target.name === `SpeakesrEmail${i}`) {
      const speker = Speakername[i];
      speker.email = e.target.value;
      Speakername.splice(i, 1, { ...speker });
      setSpeakerName([...Speakername]);
    }
  };
  useEffect(()=>{
    console.log("inside render");
  },[render])

  const handleMaltiInputRumove = (i) => {
    console.log("i", i);
    if (Speakername.length > 1) {
      Speaker.splice(i, 1);
      setSpeaker([...Speaker]);
      Speakername.splice(i, 1);
      console.log(Speakername.length);
      setRerender(render+1);
    }
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
        // console.log(resp);
        setTimezoneregion(resp.data.data);
      }
    });
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
    },
    validationSchema: Yup.object({
      EventTitle: Yup.string().required("Event title is required"),
      Timezone: Yup.string().required("Timezone is required"),
      event_start_time: Yup.string().required("Event start time is required"),
      Region: Yup.string().required("Region is required"),
      Bu: Yup.string().required("Bu is required"),
      eventendtime: Yup.string().required("Event ent time is required"),
      event_date: Yup.string().required("Event date is required"),
      Description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      let a = JSON.stringify(Speakername);
      console.log(values);
      ExportApi.CreatEvent(
        values.EventTitle,
        a,
        values.event_start_time,
        values.eventendtime,
        values.Timezone,
        values.Bu,
        values.event_date,
        values.Description,
        values.Region
      )
        .then((resp) => {
          if (resp.data) {
            console.log(resp.data);
          }
        })
        .catch((err) => console.log(err));
    },
  });
  const handlegetallapicall = (data) => {
    handleGetDataBu();
    handleGetTimezoneData();
    handleGetTimezoneregionData();
  };
  useEffect(() => {
    setToken(localStorage.getItem("Token"));
    handleGetDataBu();
    handleGetTimezoneData();
    handleGetTimezoneregionData();
    handlegetallapicall();
  }, [props.token, localStorage.getItem("Token")]);
  return (
    <Row>
    <Col md={{ span: 6, offset: 3 }}>
      <div>
        <h2>Create Event </h2>
        <div>
          <form  onSubmit={formik.handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label column sm={2}>Event Title </Form.Label>
              <Col sm={10}>
              <Form.Control
                name="EventTitle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.EventTitle}
              />
              {formik.touched.EventTitle && formik.errors.EventTitle ? (
                <div style={{ color: "red" }}>{formik.errors.EventTitle}</div>
              ) : null}
              </Col>
            </Form.Group>
            {Speaker.map((malti, i) => (
                <fieldset class="border p-2">
                <div key={i}>
                  {Speaker.length > 1 ? (
                      <button type="button" onClick={() => handleMaltiInputRumove(i)}  class="btn-close float-end" aria-label="Close" />
                    ) : null}
                  <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label column sm={2}>Speaker Name</Form.Label>
                  <Col sm={10}>
                  <Form.Control
                    name={Speaker.length === 0 ? malti.name : malti.name + i}
                    onChange={(e) => {
                      handleSpeakerName(e, i);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  /></Col>
                  {formik.touched.email && formik.errors.email ? (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                  ) : null}
                  <div class="mt-2"></div>
                  <Form.Label column sm={2}>Speaker Email</Form.Label>
                  <Col sm={10}>
                  <Form.Control
                    type="email"
                    name={Speaker.length === 0 ? malti.email : malti.email + i}
                    onChange={(e) => {
                      handleSpeakerName(e, i);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  </Col>
                  {formik.touched.email && formik.errors.email ? (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                  ) : null}
                  </Form.Group>
                </div></fieldset>
            ))}
            <div class="mt-2"></div>
            <Form.Group className="mb-3">
                <Button onClick={handleMaltiInputAdd} className="speaker-button">Add More Speaker</Button>
            </Form.Group>
            <div class="clearfix"></div>
            <div class="mt-2"></div>
            <Form.Group className="mb-3"as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label column sm={2}>Region </Form.Label>
              <Col sm={10}>
              <Form.Select
                name="Region"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Region}
              ><option>Select Region</option>
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
            <Form.Group as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
            <Form.Label column sm={2}>Bu </Form.Label>
            <Col sm={10}>
            <Form.Select
              name="Bu"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Bu}
            ><option>Select Bu</option>
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
            <Form.Group className="mb-3"as={Row} controlId="exampleForm.ControlInput1">
            <Form.Label column sm={2}>Timezone </Form.Label>
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
            <Form.Group className="mb-3" as={Row} controlId="exampleForm.ControlInput1">
            <Form.Label column sm={2}>Event Start Time </Form.Label>
            <Col sm={10}>
            <Form.Control
              name="event_start_time"
              type="time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.event_start_time}
            />
            {formik.touched.event_start_time && formik.errors.event_start_time ? (
              <div style={{ color: "red" }}>{formik.errors.event_start_time}</div>
            ) : null}
            </Col>
            </Form.Group>
            <Form.Group className="mb-3"as={Row} controlId="exampleForm.ControlInput1">
            <Form.Label column sm={2}>Event End Time </Form.Label>
            <Col sm={10}>
            <Form.Control
              name="eventendtime"
              type="time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.eventendtime}
            />
            {formik.touched.eventendtime && formik.errors.eventendtime ? (
              <div style={{ color: "red" }}>{formik.errors.eventendtime}</div>
            ) : null}
            </Col>
            </Form.Group>
            <br />
            <Form.Group className="mb-3"as={Row} controlId="exampleForm.ControlInput1">
            <Form.Label column sm={2}>Event Date </Form.Label>
            <Col sm={10}>
            <Form.Control
              name="event_date"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.event_date}
            />
            {formik.touched.event_date && formik.errors.event_date ? (
                <div style={{ color: "red" }}>{formik.errors.event_date}</div>
              ) : null}
              </Col>
              </Form.Group>
            <Form.Group as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >   
            <Form.Label column sm={2}>Description </Form.Label>
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
                <div style={{ color: "red" }}>{formik.errors.Description}</div>
              ) : null}
             </Col> 
            </Form.Group>
            <Button type="reset">Reset</Button>
            <Button type="submit" class="event-submit-button">Submit</Button>
          </form>
        </div>
      </div>
    </Col>
  </Row>
    
  );
}
export default Add;