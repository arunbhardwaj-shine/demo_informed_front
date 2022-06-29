import React, { useState } from 'react'
import { useFormik } from "formik";
import { Button,  Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import AliceCarousel from "react-alice-carousel";
import { loader } from '../../../loader';
import ExportApi from '../../../Api/ExportApi';
const NewRegistration = () => {
    let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const [activeIndex, setActiveIndex] = useState(0);
    const syncActiveIndex = ({ item }) => setActiveIndex(item);
    const [TemplateIdActive, setTemplateIdActive] = useState();
    const [EventTime, setEventTime] = useState([
        {
          Hour: [
            { Hour: "01" },
            { Hour: "02" },
            { Hour: "03" },
            { Hour: "04" },
            { Hour: "05" },
            { Hour: "06" },
            { Hour: "07" },
            { Hour: "08" },
            { Hour: "09" },
            { Hour: "10" },
            { Hour: "11" },
            { Hour: "12" },
          ],
          mints: [
            { mints: "00" },
            { mints: "05" },
            { mints: 10 },
            { mints: 15 },
            { mints: 20 },
            { mints: 25 },
            { mints: 30 },
            { mints: 35 },
            { mints: 40 },
            { mints: 45 },
            { mints: 50 },
            { mints: 55 },
          ],
        },
      ]);
    const responsive = {
      0: { items: 1 },
      568: { items: 2 },
      1024: { items: 5 },
    };
    const templateClicked = (template, e) => {
      const div = document.querySelector("img.select_mm");
      if (div) {
        div.classList.remove("select_mm");
      }
      setTemplateIdActive(template);
      e.target.classList.toggle("select_mm");
    };
    const formik = useFormik({
        initialValues: {
          Title1: "",
          url: "",
          body: "",
          mode:''
        },
    
        enableReinitialize: true,
        onSubmit: (values) => {
          loader("show")
          let formData = new FormData();
          formData.append("event_id",localStorage.getItem("EventIdHeader") );
          formData.append("body", values.body);
          formData.append("title", values.RegistrationPageTitle);
          formData.append("url", values.url);
           formData.append("mode", values.mode);
          ExportApi.CreateRegistrationPage(formData).then((resp) => {
            if (resp.ok) {
              if (resp.data.code == 200) {
                loader("hide")
                toast.success(resp.data.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
              } else {
                loader("hide")
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
          });
        },
      });
  return (
    <> 
         <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
    <div class="right-sidebar col">
    <div class="top-header">
        <div class="page-title">
          <h3>Registration Page Form </h3>
        </div>
      </div>

      <section className="select-mail-template">
                <div className="row select-mail-template-slider">
                <AliceCarousel
                  mouseTracking
                  disableDotsControls
                  activeIndex={activeIndex}
                  responsive={responsive}
                  onSlideChanged={syncActiveIndex}
                >
                      <div
                        className="item"
                         onClick={(e) => templateClicked("virtual",e)}
                      >
                        <div class="item-list">
                          <div class="item-top-schedule">
                            <img  src={path_image + "webinar/mail-schedule.png"} alt="" />
                            </div>
                          <img
                            value={"virtual"}
                            src={path_image + "content_added1.png"}
                            alt=""
                            className={
                              typeof TemplateIdActive !== "undefined" &&
                              TemplateIdActive == "virtual"
                                ? "select_mm"
                                : ""
                            }
                          />
                        </div>
                        <p>{"Virtual"}</p>
                      </div>
                      <div
                        className="item"
                         onClick={(e) => templateClicked("onsite",e)}
                      >
                        <div class="item-list">
                          <div class="item-top-schedule">
                            <img  src={path_image + "webinar/mail-schedule.png"} alt="" />
                            </div>
                          <img
                            value={"onsite"}
                            src={path_image + "content_added1.png"}
                            alt=""
                            className={
                              typeof TemplateIdActive !== "undefined" &&
                              TemplateIdActive == "onsite"
                                ? "select_mm"
                                : ""
                            }
                          />
                        </div>
                        <p>{"Onsite"}</p>
                      </div>
                </AliceCarousel>
              </div>
              <br/>
              <br/>
     
              {TemplateIdActive=="onsite"?   <div className="webinar-modal-data create-registration">
              <div class="top-header">
        <div class="page-title">
          <h3>Onsite</h3>
        </div>
      </div>
        <form onSubmit={formik.handleSubmit}>
        <div className="modal-body-content">
        <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-8">
                <label> Title 1</label>
                <Form.Control
                  name="Title1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Subject}
                  type="text"
                  placeholder="Title 1"
                />
                <div className="error">
                {formik.touched.Title1 &&
                formik.errors.Title1 ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.Title1}
                  </div>
                ) : null}
            </div>
            </div>
            </div>
        <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-8">
                <label> Title 2</label>
                <Form.Control
                  name="Title2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Subject}
                  type="text"
                  placeholder="Title 2"
                />
            </div>
            </div>
        <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-8">
                <label> Title 3</label>
                <Form.Control
                  name="Title3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Subject}
                  type="text"
                  placeholder="Title 3"
                />
            </div>
            </div>
        <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-8">
                <label> Title Logo</label>
                <Form.Control
                  name="Headerlogo"
                  type="file"
                  placeholder="Header Title Logo"
                />
            </div>
            </div>


            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-8">
                <label> Speaker Name</label>
                <Form.Control
                  name="Speakername"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Speakername}
                  type="text"
                  placeholder="Speaker Name"
                />
            </div>
            </div>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-8">
                <label>Date</label>
                <Form.Control
                  name="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Date}
                  type="Date"
                  placeholder="Title 2"
                />
            </div>
            </div>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-12">
                <label for="exampleInputEmail1">
                  Event Start Time
                </label>
                <div className="row justify-content-between align-items-center select_time">
                  <div className="form-group col-12 col-md-4">
                    <select
                      className="form-control"
                      name="start_hour"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.start_hour}
                    >
                      {EventTime[0].Hour?.map((val, i) => (
                        <React.Fragment key={i}>
                          <option value={val.Hour}>
                            {val.Hour}
                          </option>
                        </React.Fragment>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-12 col-md-4">
                    <select
                      className="form-control"
                      name="start_min"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.start_min}
                    >
                      {EventTime[0].mints?.map((val, i) => (
                        <React.Fragment key={i}>
                          <option value={val.mints}>
                            {val.mints}
                          </option>
                        </React.Fragment>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-12 col-md-4">
                    <select
                      className="form-control"
                      name="start_am_pm"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.start_am_pm}
                    >
                      <React.Fragment >
                        <option value={"AM"}>AM</option>
                        <option value={"PM"}>PM</option>
                      </React.Fragment>
                    </select>
                  </div>
                </div>

                <div style={{ color: "red" }}>
                  
                </div>
              </div>

                               </div>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-7">
              <label>Body Text</label>
              <Form.Control
                as="textarea"
                rows={10}
                name="body"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.body}
                className="form-control"
                id="exampleFormControlTextarea1"
              />
              <div className="error">
              {formik.touched.body && formik.errors.body ? (
                <div style={{ color: "red" }}>{formik.errors.body}</div>
              ) : null}
           </div>
           </div>
           </div>
                 
          {/* <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Choice File</Form.Label>
                <Form.Control
                  name="file"
                  onChange={(e) => {
                    handeleimage(e);
                  }}
                  type="file"
                  size="md"
                />
                 <p style={{color:"red"}}>{errimage}</p>
              </Form.Group> */}

          <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
                :TemplateIdActive=="virtual"?<p>Virtual</p>:null}  
          </section>
      </div>
    </>
  )
}

export default NewRegistration