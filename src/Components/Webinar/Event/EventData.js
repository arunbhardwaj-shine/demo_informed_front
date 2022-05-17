import React, { useEffect, useState } from "react";
import { Button, Col,  Form,  Modal,  Row,  Table } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { useFormik } from "formik";
import '../webinar.css';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const EventData = () => {
    const [event, setEvent] = useState([]);
    const [message, setMessage] = useState();
    const [eventdata, setEventData] = useState([]);
    const [SpDataSingle, setSpDataSingle] = useState();

    const [modalShow, setModalShow] = useState(false);
      const [Speakername, setSpeakerName] = useState([{name: "", email: "" }]);
  const handleGetEventlist = () => {
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
          //  console.log(resp.data)
        setEvent(resp.data.data);
      }
    });
  };
  const handleGetEventlistSerch = (data) => {
    ExportApi.GetEventListSerch(data).then((resp) => {
      if (resp.ok) {
          //  console.log(resp.data)
        setEvent(resp.data.data);
      }
    });
  };
  const handleGetEventlistEdidData = (val) => {
    ExportApi.GetEventListData(val).then((resp) => {
      if (resp.ok) {
        setModalShow(true)
        setSpDataSingle(resp.data.data.speaker_data)
          // console.log(resp.data.data.speaker_data)
          console.log(resp.data[0])
         setEventData(resp.data.data);
      }
    });
  };
  const handleMaltiInputAdd = () => {
    setSpeakerName([...Speakername,{name:'',email:""}])
  };
  const handleSpeakerName = (e, i) => {
    if (e.target.name === `name${i}`) {
      const speker = Speakername[i];
      speker.name = e.target.value;
       Speakername.splice(i, 1,{...speker});
       setSpeakerName([...Speakername]);
    } else if (e.target.name === `email${i}`) {
      const speker = Speakername[i];
      speker.email = e.target.value;
      Speakername.splice(i, 1, { ...speker });
      setSpeakerName([...Speakername]);
    }
  };
  
  const handleMaltiInputRumove = (i) => {
    console.log("i",i);
      Speakername.splice(i, 1);
      setSpeakerName([...Speakername])
      console.log(Speakername.length);
    
  };
  const formik = useFormik({
    initialValues: {
      EventTitle:eventdata?eventdata.title: "",
      Description:eventdata?eventdata.description: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      let a=JSON.stringify(Speakername)
      ExportApi.GetEventListDataUpdate(eventdata.id,values.EventTitle,Speakername[0].name&&Speakername[0].email?a:null,values.Description,)
        .then((resp) => {
          if (resp.data) {
            if (resp.data.code == 200) {
              setModalShow(false)
              handleGetEventlist()
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
     },
  });
  useEffect(() => {
    handleGetEventlist();
  }, []);
  return (
    <div>
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
            <h2>Events</h2>
          <Row>
            <Col>
            <Link to="/webinar/event/add"><Button>Create Event</Button></Link>
            </Col>
            <Col>
            <Form.Control
            onChange={(e)=>{handleGetEventlistSerch(e.target.value)}}
                    name="Search"
                    placeholder="Search......"
                  />
            </Col>
          </Row>
        
            <br/>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Event Date</th>
                  <th>Event Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {event?<>
                  {event?event?.map((val,i) => (
                  <tr key={i}>  
                    <td>{val.event_date}</td>
                    <td>{val.title}</td>
                    <td><Button onClick={()=>handleGetEventlistEdidData(val.id)}>Edit</Button></td>
                  </tr>
                )):  <Table bordered hover>
                <thead>
                  <tr>
                    <th>Event Date</th>
                    <th>Event Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tr>
                  </tr><tr>Data Not Found <Link to="/webinar/event/add" style={{color:"red"}}>Please create event </Link></tr></Table>}
                </>:<h2>Data Not Found <Link to="/webinar/event/add" style={{color:"red"}}>Please create event </Link></h2>}
              </tbody>
               
            </Table>
            <Modal show={modalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
              <Modal.Header onClick={()=>{setSpeakerName([{name: "", email: "" }]); setModalShow(false)}} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Edit Event 
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
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
                  <fieldset className="border p-2">
                  {SpDataSingle?.map((malti, i) => (
                      <Form.Group className="edit-event" key={i}>
                        <Form.Label column sm={3}>Name <h6>{malti.name}</h6></Form.Label>
                        <Form.Label column sm={3}>Email <h6>{malti.email}</h6></Form.Label>
                      </Form.Group>
                  ))}
                  </fieldset>
                  <div class="mt-2 clearfix"></div>

                    {Speakername.map((malti, i) => (

                    <fieldset class="border p-2">
                    <div key={i}>
                      
                  
                      {Speakername.length > 1 ? (
                           <button type="button" onClick={() => handleMaltiInputRumove(i)}  className="btn-close float-end" aria-label="Close" />
                      ) : null}
                      <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label column sm={3}>Speaker Name</Form.Label>
                      <Col sm={9}>
                      <Form.Control
                        name={Speakername.length === 0 ? "name" : "name" + i}
                        value={malti.name}
                        onChange={(e) => {
                          handleSpeakerName(e, i);
                        }}
                      /></Col>
                      <div class="mt-2 clearfix"></div>
                      <Form.Label column sm={3}>Speaker Email</Form.Label>
                      <Col sm={9}>
                      <Form.Control
                        type="email"
                        name={Speakername.length === 0 ? "email" : "email" + i}
                        onChange={(e) => {
                          handleSpeakerName(e, i);
                        }}
                        value={malti.email}
                      />
                      </Col>
                      </Form.Group>
                    </div></fieldset>
                ))}
                <div class="mt-2"></div>
                <Form.Group className="mb-3">
                    <Button onClick={handleMaltiInputAdd} className="speaker-button">Add More Speaker</Button>
                </Form.Group>
                <div className="clearfix"></div>
                <div className="mt-2"></div>
                <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label column sm={2}>Description</Form.Label> 
                     <Col sm={10}>                <textarea     name="Description"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Description} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </Col>
                    </Form.Group>
                    
              <Modal.Footer>
                <Button variant="danger" onClick={()=>{setSpeakerName([{name: "", email: "" }]);setModalShow(false)}}>Close</Button>
                <Button type="submit" variant="success">Update</Button>
              </Modal.Footer>
            </form>
              </Modal.Body>
            </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default EventData;