import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ExportApi from "../Api/ExportApi";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
function ForgotPassword(props) {
    const [err, setErr] = useState(false);
    const [modalShow, setmodalShow] = useState(false);
    const [message, setMessage] = useState(false);
    let navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        email: "",

      },
      validationSchema: Yup.object({
        email: Yup.string().email("Invalid email address").required("Enter your email"),
      }),
      onSubmit: (values) => {
        ExportApi.UserForgot(values.email)
          .then((resp) => {
            if (resp.data) {
              if (resp.data.code == 200) {
                localStorage.removeItem('showPage')
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
    <div><form onSubmit={formik.handleSubmit}>
    <center>
       <h3>Forgot Password</h3>
    </center>
<hr/>
     <Form.Group className="mb-3">
  <Form.Label>Email address</Form.Label>
  <Form.Control  name="email" onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.email} type="email" placeholder="name@example.com" />
       {formik.touched.email && formik.errors.email ? (
      <div style={{ color: "red" }}>{formik.errors.email}</div>
    ) : null} 
  <p style={{color:"red"}}>  {err?err:null}</p>
</Form.Group>
    
    <Button type="submit">Submit</Button>
  </form></div>
  </Col>
  <Modal
       show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
          <center><h2 style={{color:"#09a391",fontWeight:"bold",padding:"30px"}}>{message}</h2>
            <Button style={{backgroundColor:"#09a391" ,padding:"20px"}} onClick={()=>{setmodalShow(false);navigate("/webinar/dashboard");}}>OK</Button>    
          </center>
      </Modal.Body>
    </Modal>
  </Row>
  )
}

export default ForgotPassword