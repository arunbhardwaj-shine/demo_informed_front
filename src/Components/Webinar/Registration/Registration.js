import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import * as Yup from "yup";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import CreateRegistration from "./CreateRegistration";
import { Link, useNavigate } from "react-router-dom";
import { loader } from "../../../loader";
import AliceCarousel from "react-alice-carousel";
import { BaseApi, BaseUrlImage } from "../../../Api/BaseApi";
const Registration = () => {
  let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const baseURL = BaseApi.getBaseURL();
  const [modalShow, setModalShow] = useState(false);
  const [registrationPageList, setRegistrationPageList] = useState();
  const [template, setTemplate] = useState();
  const [editdata, setEditdata] = useState();
  const [format, setFormat] = useState();
  const [mode, setMode] = useState();
  const [eventCode, setEventCode] = useState();
  const [show, setShow] = useState(false);
  const [UrlAlias, setUrlAlias] = useState();
  const [massage, setMassage] = useState("Please Select Event");
  const [modalShow1, setModalShow1] = useState(false);

   
  // const handleGetTemplateList = (id) => {
  //   ExportApi.UserTemplateList(id).then((resp) => {
  //     if (resp.ok) {
  //       if (resp.data.code == 200) {
  //         loader("hide")
  //         console.log("resp.data.data",resp.data.data)
  //         setTemplateList(resp.data.data);
  //         // handleGetTemplate(resp.data.data[0].id);
  //         //  setTemplateIdActive(resp.data.data[0].id);
  //       } else {
  //         loader("hide")
  //       }
  //     }
  //   });
  // };
  let navigate = useNavigate();
  const handleGetRegistrationPageList = (id) => {
    ExportApi.RegistrationPageList(id).then((resp) => {
      if (resp.ok) {
        loader("hide");
        if(resp.data.code === 200){
          console.log(resp.data.data)
          setRegistrationPageList(resp.data.data);
          setMassage()
        }
        if (resp.data.code === 404) {
          setRegistrationPageList()
          setMassage("Data Not Found");
        }
      }
    });
  };
  const handleGetRegistrationPagedata = (id) => {
    ExportApi.RegistrationPageData(id).then((resp) => {
      if (resp.ok) {
        // handleGetTemplateList(localStorage.getItem("EventIdHeader"));
        setEditdata(resp.data.data);
        // setTemplateIdActive(resp.data.data.template_id)
        setEventCode(resp.data.data.event.code);
        setUrlAlias(resp.data.data.url);
      }
    });
  };
  const handleGetRegistrationDelete = (id) => {
    ExportApi.RegistrationPageDelete(id).then((resp) => {
      if (resp.ok) {
        localStorage.removeItem("registrationPageId")
        handleGetRegistrationPageList(localStorage.getItem("EventIdHeader"))
        toast.success(resp.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    });
  };
  useEffect(() => {
    loader("show")
    window.addEventListener("EventId", () =>{
      handleGetRegistrationPageList(localStorage.getItem("EventIdHeader"))
    }
    );
    handleGetRegistrationPageList(localStorage.getItem("EventIdHeader"));
    // handleGetTemplateList(localStorage.getItem("EventIdHeader"));
    if (localStorage.getItem("EventIdHeader")) {
      console.log("done");
    } else {
      loader("hide");
      // setMessage("Please create Event");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      RegistrationPageTitle: editdata ? editdata.title : "",
      url: editdata ? editdata.url : "",
      body: editdata ? editdata.body : "",
      mode:"" ,

    },
    validationSchema: Yup.object({
      RegistrationPageTitle: Yup.string().required(
        "Enter your registration page title"
      ),
      mode: Yup.string().required("Please  select mode"),
      body: Yup.string().required("Enter a Body text"),
      url: Yup.string()
        .matches(/^[a-zA-Z]+$/u, "Only alphabets are allowed")
        .required("Enter url alias"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      loader("show");
      let formData = new FormData();

      formData.append("registration_page_id",editdata.id);

      formData.append("body", values.body);

      formData.append("title", values.RegistrationPageTitle);

      // formData.append("file", image);
      formData.append("url", UrlAlias);
       formData.append("mode", values.mode);
      UrlAlias
        ? ExportApi.UpdateRegistrationPageData(formData).then((resp) => {
            if (resp.ok) {
              if (resp.data.code == 200) {
                loader("hide");
                handleGetRegistrationPageList();
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
                loader("hide");
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
        : console.log("errr");
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
          <h3>Registration Page </h3>
        </div>
        {registrationPageList===undefined||registrationPageList===null?<Link to="/webinar/portal/NewRegistration"><Button>Create Registration Page</Button></Link>:registrationPageList.length==1?(<> {registrationPageList?.length==2||registrationPageList?.length>2?null:  <div class="top-right-action">
            <Button onClick={()=>setModalShow1(true)}>Create Registration Page</Button>
        </div>}</>):null}
     
      </div>
  
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

            {registrationPageList ? (
              <Row>
                <Col className="mb-5">
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrationPageList?.map((val, i) => (
                        <tr key={i}>
                          <td>{val.mode}-Registration Page</td>
                          <td>
                              <Button onClick={()=>{setEventCode(val.code);setFormat(val.format);setMode(val.mode);setModalShow(true)}}>Preview</Button>
                            <Button
                              onClick={(e) => {
                               localStorage.setItem("EditRegistrationPageId",val.id);
                               setTimeout(() => {
                                navigate("/webinar/portal/NewRegistration");
                              }, 1000);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={(e) => {
                                handleGetRegistrationDelete(val.id);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            ) : (
              <div className="not_found">

                <h2>{massage}</h2>
              </div>
            )}
      

      </Row>
      <Modal
        show={modalShow}
        id="webinar_event"
        onHide={() => {
          setModalShow(false);
        }}
      >
        <Modal.Header closeButton>
          <h4>Preview Page </h4>
        </Modal.Header>
        <Modal.Body>
        <iframe src={`${BaseUrlImage}/SH2022/index${format}.php?event=${eventCode}&mode=${
               mode
              }`}></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              // setModalShow1(false);
              setModalShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modalShow1} className="send-confirm" id="resend-confirm">
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => setModalShow1(false)}
          ></button>
        </Modal.Header>
        <Modal.Body>
         {show?<select
                  name="Country"
                  onChange={(e)=>{localStorage.setItem("registrationPageId",e.target.value);localStorage.removeItem("EditRegistrationPageId"); setTimeout(() => {
                    localStorage.removeItem("EditRegistrationPageId")
                    navigate("/webinar/portal/NewRegistration");
                  }, 1000);}}
                  class="form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option selected>Select Registration Page</option>
                  {registrationPageList?.map((val, i) => (
                    <React.Fragment key={i}>
                      {console.log("val",val)}
                      <option  value={val.id}>
                      {val.mode}-Registration Page
                      </option>
                    </React.Fragment>
                  ))}
         </select>

          :null}
           {console.log("val",registrationPageList)}
          <div className="modal-buttons">
          <Link to="/webinar/portal/NewRegistration">
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              onClick={() => {
                localStorage.removeItem("registrationPageId");
                localStorage.removeItem("EditRegistrationPageId")
              }}
            >
            New Create
            </button>
          </Link>
            <button
              type="button"
              className="btn btn-primary btn-bordered light"
              data-bs-dismiss="modal"
              onClick={() =>setShow(true) }
            >
              Copy Existing 
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    </>
  );
};

export default Registration;
