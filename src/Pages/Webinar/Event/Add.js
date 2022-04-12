import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, Col, Row } from "react-bootstrap";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";

function Add(props) {
  const [Speaker, setSpeaker] = useState([
    { name: "SpeakersName", email: "SpeakesrEmail" },
  ]);
  const [Speakername, setSpeakerName] = useState([{name: "", email: "" }]);
  const [bu, setBu] = useState([]);
  const [Timezone, setTimezone] = useState([]);
  const [Timezoneregion, setTimezoneregion] = useState([]);
  const handleMaltiInputAdd = () => {
    setSpeaker([...Speaker, {name: "SpeakersName", email: "SpeakesrEmail" }]);
    setSpeakerName([...Speakername,{name:'',email:""}])
  };
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const handleSpeakerName = (e, i) => {
    if (e.target.name === `SpeakersName${i}`) {
      const speker = Speakername[i];
      speker.name = e.target.value;
      // console.log(speker)
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
    console.log("i", i);
    if (Speakername.length > 1) {
      Speaker.splice(i, 1);
      setSpeaker([...Speaker]);
      Speakername.splice(i, 1);
      console.log(Speakername.length);
    }
  };
  const handleGetDataBu = () => {
    ExportApi.GetBuData().then((resp) => {
      if (resp.ok) {
        // console.log(resp.data.data);
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
      eventendtime : "",
      event_date : "",
      Description: "",
    },
    onSubmit: (values) => {
      //speaker_data
      console.log(values)
       console.log(Speakername)
      ExportApi.CreatEvent(values.EventTitle,Speakername,values.event_start_time,values.eventendtime,values.Timezone,values.Bu,values.event_date,values.Description,values.Region)
        .then((resp) => {
          if (resp.data) {
              console.log(resp.data.data);
          }
        })
        .catch((err) => console.log(err));
     },
  });
  useEffect(() => {
    setToken(localStorage.getItem("Token"));
    handleGetDataBu();
    handleGetTimezoneData();
    handleGetTimezoneregionData();
  },[localStorage.getItem("Token")]);
  return (
    <div>
      <Header />
      <Row>
        <Col xs={2}>
          <Sidebar />
        </Col>
        <Col>
          <div>
            <h2> Event Details</h2>
            <div>
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
                        x {"===>" + i}
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
                <label>Region </label>
                <select
                  name="Region"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Region}
                >
                  { Timezoneregion?.map((val, i) => (
                      <>
                        <option key={i} value={val.values}>
                          {val.values}
                        </option>
                      </>
                  ))}
                </select>
                <br />
                <label>Bu </label>
                <select
                  name="Bu"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Bu}
                >
                  { bu?.map((val, i) => (
                      <>
                        <option key={i} value={val.values}>
                          {val.values}
                        </option>
                      </>
                   ))}
                 
                </select>
                <br />
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
                <label>Event Start Time </label>
                <input
                  name="event_start_time"
                  type="time"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.event_start_time}
                />{" "}
                <br />
                <label>Event End Time </label>
                <input
                  name="eventendtime"
                  type="time"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.eventendtime}
                />
                <br />
                <label>Event Date </label>
                <input
                  name="event_date"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.event_date}
                />{" "}
                <br />
                <label>Description </label>
                <textarea     name="Description"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Description} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                <br />
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default Add;
