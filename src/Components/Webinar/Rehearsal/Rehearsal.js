import React, { useEffect, useState } from "react";
import {  useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, Col, Form, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import '../webinar.css';
import { toast, ToastContainer } from "react-toastify";
function Rehearsal() {
  const [render, setRerender] = useState(0);
      const [addForm, setAddForm] = useState([
        { data: "SpeakersName"},
      ]);
      const [Speakername, setSpeakerName] = useState([{name: "", email: "" }]);
      const [Timezone, setTimezone] = useState([]);
      const [event, setEvent] = useState([]);
      const handleMaltiInputAdd = () => {
        setSpeakerName([...Speakername, { name: "", email: "" }]);
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
        let data1=Speakername
        Speakername.splice(0, 1);
       setTimeout(()=>setSpeakerName([...Speakername]),1000) 
       setRerender(render+1)      
      console.log("after,",data1.length)
         setSpeakerName(data1) 
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
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      useEffect(() => {
        handleGetTimezoneData();
        handleGetEventlist()
      },[]);
   
      const formik = useFormik({
        initialValues: {
          EventTitle:'',
          Timezone: "",
          event_start_time: "",
          eventendtime : "",
          event_date : "",
          type:"",
          Description:''
        },
        onSubmit: (values) => {
          var today = new Date(values.event_date);
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          let dateData=dd + '-'+ mm +'-'+yyyy
          let a=JSON.stringify(Speakername)
          console.log(a)
          ExportApi.CreatRehearsal(values.EventTitle,values.Timezone,values.event_start_time,
          values.eventendtime,dateData,values.type,values.Description,Speakername[0].name&&Speakername[0].email?a:null,)
            .then((resp) => {
              if (resp.data.code == 200) {
                toast.success(resp.data.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });;
                 }else{
                  toast.error(resp.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                 }})
            .catch((err) => console.log(err));
          },
      });
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
    <Col md={{ span: 6, offset: 3 }}>
    <div>
          <h2> Rehearsal</h2>
            <div>
              <form onSubmit={formik.handleSubmit}>
              <h4>Select the rehearsal Information:{1}</h4>
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
            <Form.Group className="mb-3"as={Row} controlId="exampleForm.ControlInput1">
            <Form.Label column sm={2}>Date </Form.Label>
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
                <div style={{ color: "red" }}>{formik.errors.event_date}</div>
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
                  <option  value={val.values}> 
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
           
            {Speakername.map((malti, i) => (
                <fieldset className="border p-2">
                  <div key={i}>
                    {Speakername.length > 1 ? (
                      <button
                        type="button"
                        onClick={() =>{ handleMaltiInputRumove(i)}}
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
            <div class="mt-2"></div>
            <Form.Group className="mb-3">
                <Button onClick={handleMaltiInputAdd} className="speaker-button">Add More Speaker</Button>
            </Form.Group>
            <div class="clearfix"></div>
            <div class="mt-2"></div>


          <br/>
                {event?  <Form.Group className="mb-3"as={Row} controlId="exampleForm.ControlInput1">
            <Form.Label column sm={2}>Event </Form.Label>
            <Col sm={10}>
            <Form.Select
                name="type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              value={formik.values.type}
            >
              <option> Select Event</option>
              {event?.map((val, i) => (
                   <React.Fragment key={i}>
                        <option value={val.id}>
                          {val.title}
                        </option>
                        </React.Fragment>
              ))}
            </Form.Select>
            
            {formik.touched.Timezone && formik.errors.Timezone ? (
              <div style={{ color: "red" }}>{formik.errors.Timezone}</div>
            ) : null}
            </Col>
            </Form.Group>
               :<h4 ><Link to="/webinar/event/add" style={{color:"red"}}>Please create event </Link></h4>}
               
                <br />
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
            <Button type="submit" className="event-submit-button">Submit</Button>
              </form>
            </div>
             <button className="btn btn-success btn-block" onClick={handleMaltiInputAdd}>
            Schedule another rehearsal
          </button>
          </div> 
          </Col>
          </Row>
  );
}

export default Rehearsal;
