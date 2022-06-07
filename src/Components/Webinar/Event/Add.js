import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loader } from "../../../loader";
function Add(props) {
  const [render, setRerender] = useState(0);
  const [SpeakerErr, setSpeakerErr] = useState([{ name: "", email: "" }]);
  const [Speakername, setSpeakerName] = useState([{ name: "", email: "" }]);
  const [bu, setBu] = useState([]);
  const [index, setIndex] = useState();
  const [Timezone, setTimezone] = useState([]);
  const [message, setMassage] = useState();
  const [country, setCountry] = useState([]);
  const [Timezoneregion, setTimezoneregion] = useState([]);
  const handleMultiInputAdd = () => {
    setSpeakerName([...Speakername, { name: "", email: "" }]);
    setSpeakerErr([...SpeakerErr, { name: "", email: "" }]);
  };
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const handleSpeakerName = (e, i) => {
    const { value } = e.target;
    Speakername.splice(i, 1, Speakername[i]);
    setSpeakerName([...Speakername]);
    if (e.target.name === `name${i}`) {
      Speakername[i].name = value
      SpeakerErr[i].name=""
      if (e.target.value.length == 0) {
        SpeakerErr[i].name = "Name is  requred";
      } 
    } else if (e.target.name === `email${i}`) {
      Speakername[i].email =value
      SpeakerErr[i].email=""
      if (e.target.value.length == 0) {
        SpeakerErr[i].email = "Email is requred";
      } else if ( !Speakername[i].email.match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i)) {
        SpeakerErr[i].email = "Invalid email address";
      } 
    }
    setSpeakerErr([...SpeakerErr]);

  };
  useEffect(() => {
    console.log("inside render");
  }, [render]);

  const handleMultiInputRemove = (i) => {
    let data1 = Speakername;
    let data1Err = SpeakerErr;
    Speakername.splice(i, 1);
    data1Err.splice(i, 1);
    setTimeout(() => setSpeakerName([...Speakername]), 1000);
    setTimeout(() => setSpeakerErr([...SpeakerErr]), 1000);
    setRerender(render + 1);
    setSpeakerName(data1);
    setSpeakerErr(data1Err);
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
        setTimezoneregion(resp.data.data);
      }
    });
  };
  const handleGetCountry = () => {
    ExportApi.GetCountryData().then((resp) => {
      if (resp.ok) {
        setCountry(resp.data.data);
      }
    });
  };

  const handleSubmit = (handele) => {
    let err = true;
    for (let index = 0; index < Speakername.length; index++) {
      if (Speakername[index].name.length == 0) {
        err = false;
        SpeakerErr[index].name = "Name is requred ";
        setSpeakerErr([...SpeakerErr]);
      }
      if (Speakername[index].email.length == 0) {
        err = false;
        SpeakerErr[index].email = "Email is requred  ";
        setSpeakerErr([...SpeakerErr]);
      }
    }
    return err;
  };
  const handleResetSp = () => {
    // setRerender(render+1)
    setSpeakerName([{name: "", email:"" }])
    setSpeakerErr([{name: "", email:"" }])
    // setRerender(render+1)
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
      Country: "",
    },

    validationSchema: Yup.object({
      EventTitle: Yup.string().required("Event title is required"),
      Timezone: Yup.string().required("Timezone is required"),
      event_start_time: Yup.string().required("Event start time is required"),
      Region: Yup.string().required("Region is required"),
      Country: Yup.string().required("Country is required"),
      Bu: Yup.string().required("Bu is required"),
      eventendtime: Yup.string().required("Event end time is required"),
      event_date: Yup.string().required("Event date is required"),
      Description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      if (handleSubmit()) {
        var today = new Date(values.event_date);
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        let dateData = dd + "/" + mm + "/" + yyyy;

        let a = JSON.stringify(Speakername);

        if (values.event_start_time >= values.eventendtime) {
          setMassage("End time has to be greater start time");
        } else {
          setMassage(false);
          ExportApi.CreatEvent(
            values.EventTitle,
            Speakername[0].name && Speakername[0].email ? a : null,
            values.event_start_time,
            values.eventendtime,
            values.Timezone,
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
                  loader("hide");
                  console.log(typeof resp.data.message);
                  toast.success(resp.data.message);
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

        props.closePopup();
        props.getEventList();
      }
    },
  });
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  useEffect(() => {
    setToken(localStorage.getItem("Token"));
    handleGetDataBu();
    handleGetTimezoneData();
    handleGetTimezoneregionData();
    handleGetCountry();
  }, [props.token, localStorage.getItem("Token")]);
  useEffect(() => {
    setSpeakerName(Speakername);
  }, [Speakername]);

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
      <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
      <div className="webinar-modal-data">
        <Link to="/webinar/event/edit"></Link>
        <form onReset={formik.handleReset} onSubmit={formik.handleSubmit} > 
          <div className="modal-body-content">
          <div className="form-inline row justify-content-between align-items-center">
            <div className="form-group col-12 col-md-7">
              <label>Event Title <span>*</span></label>
              <input name="EventTitle" placeholder="Event Title" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.EventTitle} />
              {formik.touched.EventTitle && formik.errors.EventTitle ? (
                <div className="error" style={{ color: "red" }}>
                  {formik.errors.EventTitle}
                </div>
              ) : null}
            </div>  
          </div>
          <fieldset class="border p-2">
          {Speakername.map((multi, i) => (
            <div key={i} className="form-inline row justify-content-between align-items-center">
            {Speakername.length > 1 ? (
              <button
                type="button"
                onClick={() => {
                  setIndex(i);
                  handleMultiInputRemove(i);
                }}
                className="btn-close float-end"
                aria-label="Close"
              />
              ) : null}
              <div className="form-group col-12 col-md-6">
                <label>Speaker's Name</label>
                <input type="text" placeholder="Speaker's Name" className="form-control" name={Speakername.length === 0 ? "name" : "name" + i} value={multi.name}
                  onChange={(e) => {
                    handleSpeakerName(e, i);
                  }}
                />
                <div className="error" style={{ color: "red" }}>{SpeakerErr[i].name}</div>
              </div>
              <div className="form-group col-12 col-md-6">
                <label>Speaker's Email</label>
                <input type="text" placeholder="Speaker's Email" className="form-control" name={Speakername.length === 0 ? "email" : "email" + i} value={multi.email}
                  onChange={(e) => {
                    handleSpeakerName(e, i);
                  }}
                />
                <div className="error" style={{ color: "red" }}>{SpeakerErr[i].email}</div>
              </div>
            </div>
          ))}
          <a href="javascript:void(0);" onClick={handleMultiInputAdd} className="speaker-button">Add Speaker <span>+</span> </a>
          
          </fieldset>
          <div className="form-inline row justify-content-between align-items-center">
            <div className="form-group col-12 col-md-12">
              <label>Region </label>
              <select name="Region" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Region} class="form-select-lg mb-3" aria-label=".form-select-lg example">
                <option selected>Select Region</option>
                {Timezoneregion?.map((val, i) => (
                  <React.Fragment key={i}>
                    <option key={i} value={val.values}>
                      {val.values}
                    </option>
                  </React.Fragment>
                ))}
              </select>
              {formik.touched.Region && formik.errors.Region ? (
                <div className="error" style={{ color: "red" }}>{formik.errors.Region}</div>
              ) : null}
            </div>
          </div>
          <div className="form-inline row justify-content-between align-items-center">
            <div className="form-group col-12 col-md-12">
              <label>Country </label>
              <select name="Country" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Country} class="form-select-lg mb-3" aria-label=".form-select-lg example">
                <option selected>Select Country</option>
                {country?.map((val, i) => (
                  <React.Fragment key={i}>
                    <option key={i} value={val.id}>
                      {val.country}
                    </option>
                  </React.Fragment>
                ))}
              </select>
              {formik.touched.Country && formik.errors.Country ? (
                <div className="error" style={{ color: "red" }}>{formik.errors.Country}</div>
              ) : null}
            </div>
          </div>
          <div className="form-inline row justify-content-between align-items-center">
            <div className="form-group col-12 col-md-12">
              <label>Bu </label>
              <select name="Bu" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Bu} class="form-select-lg mb-3" aria-label=".form-select-lg example">
                <option selected>Select Bu</option>
                {bu?.map((val, i) => (
                  <React.Fragment key={i}>
                    <option key={i} value={val.values}>
                      {val.values}
                    </option>
                  </React.Fragment>
                ))}
              </select>
              {formik.touched.Bu && formik.errors.Bu ? (
                <div className="error" style={{ color: "red" }}>{formik.errors.Bu}</div>
              ) : null}
            </div>
          </div>
          <div className="form-inline row justify-content-between align-items-center">
            <div className="form-group col-12 col-md-12">
              <label>Select Timezone </label>
              <select name="Timezone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Timezone} class="form-select-lg mb-3" aria-label=".form-select-lg example">
                <option selected>Select Timezone</option>
                {Timezone?.map((val, i) => (
                  <React.Fragment key={i}>
                    <option key={i} value={val.values}>
                      {val.values}
                    </option>
                  </React.Fragment>
                ))}
              </select>
              {formik.touched.Timezone && formik.errors.Timezone ? (
                <div className="error" style={{ color: "red" }}>{formik.errors.Timezone}</div>
              ) : null}
            </div>
          </div>
          <div className="form-inline row justify-content-between align-items-center">
            <div className="form-group col-12 col-md-12">
              <label>Event Date </label>
              <Form.Control
                name="event_date"
                type="date"
                min={yyyy + "-" + mm + "-" + dd}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.event_date}
              />
              {formik.touched.event_date && formik.errors.event_date ? (
                <div className="error" style={{ color: "red" }}>
                  {formik.errors.event_date}
                </div>
              ) : null}
            </div>
          </div>
          <div className="form-inline row justify-content-between align-items-center">
            <div className="form-group col-12 col-md-12">
              <label>Event Start Time </label>
              <Form.Control
                name="event_start_time"
                type="time"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.event_start_time}
              />
              {formik.touched.event_start_time && formik.errors.event_start_time ? (
                <div className="error" style={{ color: "red" }}>
                  {formik.errors.event_start_time}
                </div>
              ) : null}
            </div>
          </div>
          <div className="form-inline row justify-content-between align-items-center">
            <div className="form-group col-12 col-md-12">
              <label>Event End Time </label>
              <Form.Control
                name="eventendtime"
                type="time"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.eventendtime}
              />
              {formik.touched.eventendtime && formik.errors.eventendtime ? (
                <div className="error" style={{ color: "red" }}>
                  {formik.errors.eventendtime}
                </div>
              ) : null}
            </div>
          </div>
          <div className="form-inline row justify-content-between align-items-center">
            <div className="form-group col-12 col-md-12">
              <label>Description </label>
              <textarea
                name="Description"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Description}
                className="form-control"
                rows="3"
              ></textarea>
               {formik.touched.Description && formik.errors.Description ? (
                <div className="error" style={{ color: "red" }}>
                  {formik.errors.Description}
                </div>
              ) : null}
            </div>
          </div>
          </div>
          <div className="modal-footer-btn">
              <Button type="reset" className="btn btn-primary btn-filled"onClick={()=>handleResetSp()}>Reset</Button>
              <button type="button" className="btn btn-primary btn-bordered" data-dismiss="modal">Close</button>
              <Button type="submit" className="event-submit-button btn btn-primary btn-filled" onClick={() => handleSubmit()} >Create</Button>
          </div>
        </form>
      </div>
    </Row>
  );
}
export default Add;
