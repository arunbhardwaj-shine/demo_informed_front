import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, Col,  Modal, Row, Table } from "react-bootstrap";
import * as Yup from "yup";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loader } from "../../../loader";
import { BaseUrlImage } from "../../../Api/BaseApi";
const Registration = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_WEBINAR;
  const [modalShow, setModalShow] = useState(false);
  const [registrationPageList, setRegistrationPageList] = useState();
  const [editdata, setEditdata] = useState();
  const [format, setFormat] = useState();
  const [mode, setMode] = useState();
  const [eventCode, setEventCode] = useState();
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [massage, setMassage] = useState("Please Select Event");
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [copy, setCopy] = useState();

  let navigate = useNavigate();
  const handleGetRegistrationPageList = (id) => {
    ExportApi.RegistrationPageList(id).then((resp) => {
      if (resp.ok) {
        loader("hide");
        if(resp.data.code === 200){
          localStorage.removeItem("registrationPageId")
        localStorage.removeItem("EditRegistrationPageId")
          // console.log(resp.data.data)
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

  const handleGetRegistrationDelete = () => {
    ExportApi.RegistrationPageDelete(deleteId).then((resp) => {
      if (resp.ok) {
        localStorage.removeItem("registrationPageId")
        localStorage.removeItem("EditRegistrationPageId")
        setModalShow3(false)
        handleGetRegistrationPageList(localStorage.getItem("EventIdHeader"))
        toast.success(resp.data.message)
      }
    });
  };
  useEffect(() => {
    loader("show")
    window.addEventListener("EventId", () =>{
      localStorage.removeItem("registrationPageId")
        localStorage.removeItem("EditRegistrationPageId")
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

  return (
    <>
      <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
    <div className="right-sidebar col">
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
    <div className="top-header">
        <div className="page-title">
          <h2>Registration Page </h2>
        </div>
        {registrationPageList===undefined||registrationPageList===null?<Link to="/webinar/portal/NewRegistration"><Button>Create Registration Page</Button></Link>:registrationPageList.length==1?(<> {registrationPageList?.length==2||registrationPageList?.length>2?null:  <div className="top-right-action">
            <Button onClick={()=>setModalShow1(true)}>Create Registration Page</Button>
        </div>}</>):null}
      </div>
      <br/>
      <br/>
      <Row>
       
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
                      {registrationPageList?<>{registrationPageList?.map((val, i) => (
                        <tr key={i}>
                          <td>{val.mode}-Registration Page</td>
                          <td>
                          <ul className="hcp-table-content-right">
                            <div className="user-type-action">
                              <button   onClick={(e) => {
                               localStorage.setItem("EditRegistrationPageId",val.id);
                               setTimeout(() => {
                                navigate("/webinar/portal/NewRegistration");
                              }, 1000);
                              }} className="btn btn-primary btn-filled">
                              <img
                               
                                alt="edit"
                                src={path_image + "edit-btn.png"}
                                />
                                </button>
                             <button onClick={()=>{loader("show"); setEventCode(val.code);setFormat(val.format);setMode(val.mode);setModalShow(true); setTimeout(() => {
                              loader("hide")
                             }, 1500);}} className="btn btn-primary btn-filled back">
                              <img
                                alt="Preview"
                                src={path_image + "eye-svgrepo-com.svg"}
                                style={{height:"25px",width:"25px"}}
                                />
                                </button>
                                  <button  onClick={(e) => {
                                setDeleteId(val.id)
                                setModalShow3(true)
                              }} className="btn btn-primary btn-filled">
                              <img
                                alt="Delete"
                                src={path_image + "delete-btn.png"}
                                />
                                </button>
                                <button onClick={(e)=>{setCopy(i);setTimeout(() => {
                                  setCopy()
                                }, 1000); navigator.clipboard.writeText(`${BaseUrlImage}/SH2022/index${val.format}.php?event=${val.code}&mode=${val.mode}`)}} className="btn btn-primary btn-filled back">
                              <img                                    
                                alt="Preview"
                                src={path_image + "copy-link.svg"}
                                
                                />
                                </button>{
                                  copy==i?<p>Copied</p>:null
                                }
                                
                                </div>
                                </ul>
                          </td>
                        </tr>
                      ))}</>:  <div className="hcp-table-content">
                        <br/>
                      {massage}
                    </div>}
                     
                    </tbody>
                  </Table>
                </Col>
              </Row>
           
      

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
                  onChange={(e)=>{localStorage.setItem("registrationPageId",e.target.value);localStorage.removeItem("EditRegistrationPageId"); setTimeout(() => {
                    localStorage.removeItem("EditRegistrationPageId")
                    navigate("/webinar/portal/NewRegistration");
                  }, 1000);}}
                  className="form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option selected>Select Registration Page</option>
                  {registrationPageList?.map((val, i) => (
                    <React.Fragment key={i}>
                      {/* {console.log("val",val)} */}
                      <option  value={val.id}>
                      {val.mode}-Registration Page
                      </option>
                    </React.Fragment>
                  ))}
         </select>

          :null}
           {/* {console.log("val",registrationPageList)} */}
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
            Create new
            </button>
          </Link>
            <button
              type="button"
              className="btn btn-primary btn-bordered light"
              data-bs-dismiss="modal"
              onClick={() =>setShow(true) }
            >
              Copy from existing   
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={modalShow3} className="send-confirm" id="resend-confirm">
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => setModalShow3(false)}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <img src={path_image + "alert.png"} alt="" />
          <h4>
            The record will be deleted from the list.
            <br />
            Are you sure you want to delete it?
          </h4>

          <div className="modal-buttons">
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              onClick={() => {
                handleGetRegistrationDelete();
              }}
            >
              Yes Please!
            </button>

            <button
              type="button"
              className="btn btn-primary btn-bordered light"
              data-bs-dismiss="modal"
              onClick={() => setModalShow3(false)}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    </>
  );
};

export default Registration;
