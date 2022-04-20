import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button} from "react-bootstrap";
function Rehearsal() {
    const [Speaker, setSpeaker] = useState([
        { name: "SpeakersName", email: "SpeakesrEmail" },
      ]);
      const [addForm, setAddForm] = useState([
        { data: "SpeakersName"},
      ]);
      const [Speakername, setSpeakerName] = useState([{name: "", email: "" }]);
      const [Timezone, setTimezone] = useState([]);
      const [event, setEvent] = useState([]);
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
      const handleGetTimezoneData = () => {
        ExportApi.GetTimezoneData().then((resp) => {
          if (resp.ok) {
            //  console.log(resp.data)
            //  console.log(resp.data.data)
            setTimezone(resp.data.data);
          }
        });
      };
      const handleGetEventlist = () => {
        ExportApi.GetEventList().then((resp) => {
          if (resp.ok) {
             console.log(resp.data)
             console.log(resp.data.data)
            setEvent(resp.data.data);
          }
        });
      };
      useEffect(() => {
        handleGetTimezoneData();
        handleGetEventlist()
      },[]);
      const handleAddmore = () => {
        setAddForm([...addForm, { name: "SpeakersName", email: "SpeakesrEmail" }]);
      };
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
          let a=JSON.stringify(Speakername)
          console.log(a)
          ExportApi.CreatRehearsal(values.EventTitle,values.Timezone,values.event_start_time,
          values.eventendtime,values.event_date,values.type,values.Description,a)
            .then((resp) => {
              if (resp.data) {
                  console.log(resp.data);
                 }})
            .catch((err) => console.log(err));
          },
      });
  return (
    <div>
      <div style={{textAlign:"center"}}>
        {event.length>0? <div>
          <h2> Rehearsal</h2>
            <div>
              <form onSubmit={formik.handleSubmit}>
              <h4>Select the rehearsal Information:{1}</h4>
              <label>Rehearsal Title </label>
                <input
                  name="EventTitle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // value={formik.values.EventTitle}
                />
                {formik.touched.EventTitle && formik.errors.EventTitle ? (
                  <div style={{ color: "red" }}>{formik.errors.EventTitle}</div>
                ) : null}
              <label> Date </label>
                <input
                  name="event_date"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                /><br/>
                 <label>Timezone </label>
                 <select
                  name="Timezone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Timezone}
                >
                  {Timezone?.map((val, i) => (
                      <>
                        <option key={i} value={val.values}>
                          {val.values}
                        </option>
                      </>
                    ))}
                </select> 
                <br />
                <label>Event Start Time :</label>
                <input
                  name="event_start_time"
                  type="time"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label>Event End Time :</label>
                <input
                  name="eventendtime"
                  type="time"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <br />
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
                <br/>
                {event.length>0?<div>
                 <label>type </label>
                <select
                  name="type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {event?.map((val, i) => (
                      <>
                        <option key={i} value={val.id}>
                          {val.title}
                        </option>
                      </>
                    ))}
                </select></div>:null}
               
                <br />
                <label>Description </label>
                <textarea name="Description"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                <Button type="submit">Submit</Button>
              </form>
            </div>
             <button className="btn btn-success btn-block" onClick={handleAddmore}>
            Schedule another rehearsal
          </button>
          </div> :"no Data"}
        
    </div>
    </div>
  );
}

export default Rehearsal;
