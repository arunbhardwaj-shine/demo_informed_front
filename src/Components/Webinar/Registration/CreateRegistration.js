import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button,  Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import AliceCarousel from "react-alice-carousel";
import { loader } from "../../../loader";
const CreateRegistration = (props) => {
  let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  let navigate = useNavigate();
  const [templateList, setTemplateList] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);
  const [TemplateIdActive, setTemplateIdActive] = useState();
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
    setTemplateIdActive(template.id);
    e.target.classList.toggle("select_mm");
  };
  // const handleGetTemplateList = (id) => {
  //   ExportApi.UserTemplateList(id).then((resp) => {
  //     if (resp.ok) {
  //       if (resp.data.code == 200) {
  //         loader("hide")
  //         console.log("resp.data.data",resp.data.data)
  //         setTemplateList(resp.data.data);
  //         // handleGetTemplate(resp.data.data[0].id);
  //          setTemplateIdActive(resp.data.data[0].id);
  //       } else {
  //         loader("hide")
  //       }
  //     }
  //   });
  // };
  // useEffect(() => {
  //   loader("show")
  //   window.addEventListener("EventId", () =>
  //     // handleGetTemplateList(localStorage.getItem("EventIdHeader"))
  //   );
  //   // handleGetTemplateList(localStorage.getItem("EventIdHeader"));
  //   if (localStorage.getItem("EventIdHeader")) {
  //     console.log("done");
  //   } else {
  //     loader("hide");
  //     // setMessage("Please create Event");
  //   }
  // }, []);
  const formik = useFormik({
    initialValues: {
      RegistrationPageTitle: "",
      url: "",
      body: "",
      mode:''
    },
    validationSchema: Yup.object({
      RegistrationPageTitle: Yup.string().required(
        "Enter your registration page title"
      ),
      body: Yup.string().required("Enter a body text"),
      mode: Yup.string().required("Please  select mode"),
      url: Yup.string()
        .matches(/^[a-zA-Z]+$/u, "Only alphabets are allowed")
        .required("Enter url alias"),
    }),
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
            });
            setTimeout(() => {
              navigate("/webinar/portal/Registrations")
            }, 2000);
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
          <h3>Create Registration Page </h3>
        </div>
      </div>
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
        <div className="webinar-modal-data create-registration">
        <form onSubmit={formik.handleSubmit}>
        <div className="modal-body-content">
        <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-8">
                <label> Title</label>
                <Form.Control
                  name="RegistrationPageTitle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Subject}
                  type="text"
                  placeholder="Title"
                />
                <div className="error">
                {formik.touched.RegistrationPageTitle &&
                formik.errors.RegistrationPageTitle ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.RegistrationPageTitle}
                  </div>
                ) : null}
            </div>
            </div>
            </div>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-8">
                <label>Mode </label>
                <div className="form-inline">
                            <div class="form-check">
                              <Form.Label>Onsite</Form.Label>
                              <Form.Control
                                 name="mode"
                                 type="radio"
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value="onsite"
                                 />
                            </div>
                            <div class="form-check">
                              <Form.Label> Virtual</Form.Label>
                              <Form.Control
                               name="mode"
                                type="radio"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={"virtual"}
                              />
                            </div>
                              {formik.touched.mode &&
                              formik.errors.mode? (
                                <div style={{ color: "red" }}>
                                  {formik.errors.mode}
                                </div>
                              ) : null}
                            {/* <div class="form-check">
                              <Form.Label> B</Form.Label>
                              <Form.Control
                                type="radio"
                              />
                            </div> */}
                    </div>
                </div>
                </div>
          {/* <section className="select-mail-template">
                <div className="row select-mail-template-slider">
                <AliceCarousel
                  mouseTracking
                  disableDotsControls
                  activeIndex={activeIndex}
                  responsive={responsive}
                  onSlideChanged={syncActiveIndex}
                >
                  {templateList ? (
                    templateList?.map((val, i) => (
                      <div
                        key={i}
                        className="item"
                         onClick={(e) => templateClicked(val, e)}
                      >
                        <div class="item-list">
                          <div class="item-top-schedule">
                            <img  src={path_image + "webinar/mail-schedule.png"} alt="" />
                            </div>
                          <img
                            value={val.id}
                            src={path_image + "content_added1.png"}
                            alt=""
                            className={
                              typeof TemplateIdActive !== "undefined" &&
                              TemplateIdActive == val.id
                                ? "select_mm"
                                : ""
                            }
                          />
                        </div>
                        <p>{val.name}</p>
                      </div>
                    ))
                  ) : (
                    <h2>{null}</h2>
                  )}
                </AliceCarousel>
              </div>

            
          </section> */}
           <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-12 col-md-8">
                <label>Url Alias </label>
                <Form.Control
                  name="url"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.url}
                  type="text"
                  placeholder="url"
                />
              <div className="error">
                  {formik.touched.url && formik.errors.url ? (
                    <div style={{ color: "red" }}>{formik.errors.url}</div>
                    ) : null}
              </div>
                <div>
                </div>
            <div className="form-alias">
                  (Url will be like: https://abc.com/event-name/url-alias
                  <br />
                  Example: https://informed.pro/WFH-2022/virtual-symposium)
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
    </div>
    </>
  );
};

export default CreateRegistration;
