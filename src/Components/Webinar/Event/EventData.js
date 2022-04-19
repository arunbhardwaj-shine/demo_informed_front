import React, { useEffect, useState } from "react";
import { Button,  Modal,  Table } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { useFormik } from "formik";
const EventData = () => {
    const [event, setEvent] = useState([]);
    const [message, setMessage] = useState();
    const [eventdata, setEventData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [Speaker, setSpeaker] = useState([
        { name: "SpeakersName", email: "SpeakesrEmail" },
      ]);
      const [Speakername, setSpeakerName] = useState([{name: "", email: "" }]);
  const handleGetEventlist = () => {
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
           console.log(resp.data)
        setEvent(resp.data.data);
      }
    });
  };
  const handleGetEventlistEdidData = (val) => {
    ExportApi.GetEventListData(val).then((resp) => {
      if (resp.ok) {
        setModalShow(true)
          console.log(resp)
         setEventData(resp.data.data);
      }
    });
  };
  const handleMaltiInputAdd = () => {
    setSpeaker([...Speaker, {name: "SpeakersName", email: "SpeakesrEmail" }]);
    setSpeakerName([...Speakername,{name:'',email:""}])
  };
  const handleSpeakerName = (e, i) => {
    if (e.target.name === `SpeakersName${i}`) {
      const speker = Speakername[i];
      speker.name = e.target.value;
       Speakername.splice(i, 1,{...speker});
       setSpeakerName([...Speakername]);
    } else if (e.target.name === `SpeakesrEmail${i}`) {
      const speker = Speakername[i];
      speker.email = e.target.value;
      Speakername.splice(i, 1, { ...speker });
      setSpeakerName([...Speakername]);
    }
  };
  
  const handleMaltiInputRumove = (i) => {
    console.log("i",i);
    if (Speakername.length > 1) {
      Speaker.splice(i, 1);
      setSpeaker([...Speaker]);
      Speakername.splice(i, 1);
      console.log(Speakername.length);
    }
  };
  const formik = useFormik({
    initialValues: {
      EventTitle:eventdata?eventdata.title: "",
      Description:eventdata?eventdata.description: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      let a=JSON.stringify(Speakername)
    //   console.log(eventdata.id)
      //  console.log(Speakername)
      ExportApi.GetEventListDataUpdate(eventdata.id,values.EventTitle,a,values.Description,)
        .then((resp) => {
          if (resp.data) {
            setMessage(resp.data.message)
            handleGetEventlist()
              console.log(resp.data.message);
              if(resp.data.message==="Data saved successfully"){
                setModalShow(false)
              }
          }
        })
        .catch((err) => console.log(err));
     },
  });
  useEffect(() => {
    //   console.log("eventdata",eventdata)
    handleGetEventlist();
  }, []);
  return (
    <div style={{marginLeft:"220px"}}>
        <h2><center>Event Data</center></h2>
        <br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Event Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {event?.map((val,i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{val.title}</td>
              <td><Button onClick={()=>handleGetEventlistEdidData(val.id)}>Edit</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
       show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                <label>Event Title </label>
                <input
                  name="EventTitle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.EventTitle}
                />
                {formik.touched.EventTitle && formik.errors.EventTitle ? (
                  <div style={{ color: "red" }}>{formik.errors.EventTitle}</div>
                ) : null}
                {Speaker.map((malti, i) => (
                  <div key={i}>
                    {Speaker.length > 1 ? (
                      <Button onClick={() => handleMaltiInputRumove(i)}>
                        x 
                      </Button>
                    ) : null}
                    <label htmlFor="Name">Speaker’s Name</label>
                    <input
                   
                      name={Speaker.length === 0 ? malti.name : malti.name + i}
                      onChange={(e) => {
                        handleSpeakerName(e, i);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div style={{ color: "red" }}>{formik.errors.email}</div>
                    ) : null}
                    <label htmlFor="email">Speaker’s Email</label>
                    <input
                     type="email"
                      name={ Speaker.length === 0 ? malti.email : malti.email + i  }
                      onChange={(e) => {
                        handleSpeakerName(e, i);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div style={{ color: "red" }}>{formik.errors.email}</div>
                    ) : null}
                  </div>
                ))}
                <Button onClick={handleMaltiInputAdd}>Add Speaker’s +</Button>  
                <br />
                <label>Description </label>
                <textarea     name="Description"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Description} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                <br />
                
      <Modal.Footer>
        <Button variant="danger" onClick={()=>{setModalShow(false)}}>Close</Button>
        <Button type="submit" variant="success">Update</Button>
      </Modal.Footer>
              </form>
      </Modal.Body>
    </Modal>
  );
    </div>
  );
};

export default EventData;
