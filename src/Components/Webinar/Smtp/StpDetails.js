import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import ExportApi from "../../../Api/ExportApi";
import { loader } from "../../../loader";
const StpDetails = () => {
const [smtpData, setSmtpData] = useState()
  const handleGetsmtpdata = () => {
    loader("show")
    ExportApi.getSMTP().then((resp) => {
      if (resp.ok) {
        loader("hide")
        setSmtpData(resp.data.data);
      }
    });
  };
  const formik = useFormik({
    initialValues: {
      smtp_host:smtpData?smtpData.smtp_host:"",
      smtp_port: smtpData?smtpData.smtp_port:"",
      smtp_from_name: smtpData?smtpData.smtp_from_name:"",
      smtp_email: smtpData?smtpData.smtp_email:"",
      smtp_password: smtpData?smtpData.smtp_password:"",
      encryption_type: smtpData?smtpData.encryption_type:"",
      tls:true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
        smtp_host: Yup.string()
        .required("Host  is required"),
        smtp_port: Yup.string()
        .max(4,"Port must be at most 4 characters")
        .required("Port  is required"),
        smtp_from_name: Yup.string().required("From Name  is required"),
        smtp_email: Yup.string()
        .email("Invalid email address")
        .required("Email  is required"),
        smtp_password: Yup.string().required("Password  is required"),
        encryption_type: Yup.string().required( "Encryption is required"),
         tls: Yup.boolean().oneOf([true], "TLS is required"),
    }), 
    onSubmit: (values) => {
      loader("show")
      setTimeout(() => {
        
        if(smtpData){
          ExportApi.UpdateSMTP(values.smtp_host,values.smtp_port,values.smtp_from_name,values.smtp_email,values.smtp_password,values.encryption_type,values.tls).then((resp) => {
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
          });
        }else{
          ExportApi.PostSMTP(values.smtp_host,values.smtp_port,values.smtp_from_name,values.smtp_email,values.smtp_password,values.encryption_type,values.tls).then((resp) => {
            if (resp.ok) {
              if (resp.data.code == 200) {
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
          });
        }
      }, 1000);
    },
  });
  useEffect(() => {
    handleGetsmtpdata()
  }, [])
  return (
    <div class="right-sidebar">
       <div className="loader" id="custom_loader">
	        <span className="loader-view"> </span>
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
        <Col md={{ span: 9, offset: 2 }}>
          <h2 className="mt-3 mb-5" style={{ fontWeight: "bold" }}>
            SMTP Details 
          </h2>
          <Row>
            <form onSubmit={formik.handleSubmit}>
              <Form.Group
                as={Row}
                className="mb-3"
              >
                <Form.Label column sm={2}>
                   Host
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="smtp_host"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.smtp_host}
                  />
                  {formik.touched.smtp_host && formik.errors.smtp_host ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.smtp_host}
                    </div>
                  ) : null}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
              >
                <Form.Label column sm={2}>
                   Port
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="smtp_port"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.smtp_port}
                    type="number"
                  />
                  {formik.touched.smtp_port && formik.errors.smtp_port ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.smtp_port}
                    </div>
                  ) : null}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
              >
                <Form.Label column sm={2}>
                    Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="smtp_from_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.smtp_from_name}
                  />
                  {formik.touched.smtp_from_name &&
                  formik.errors.smtp_from_name ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.smtp_from_name}
                    </div>
                  ) : null}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
              >
                <Form.Label column sm={2}>
                   Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="smtp_email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.smtp_email}
                  />
                  {formik.touched.smtp_email && formik.errors.smtp_email ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.smtp_email}
                    </div>
                  ) : null}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
              >
                <Form.Label column sm={2}>
                   Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="Password"
                    name="smtp_password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.smtp_password}
                  />
                  {formik.touched.smtp_password &&
                  formik.errors.smtp_password ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.smtp_password}
                    </div>
                  ) : null}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
              >
                <Form.Label column sm={2}>
                   Encryption
                </Form.Label>
                <Col >
                  <Form.Control
                    name="encryption_type"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.encryption_type}
                  />
                  {formik.touched.encryption_type &&
                  formik.errors.encryption_type ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.encryption_type}
                    </div>
                  ) : null}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
              >
                <Form.Label column sm={2}>
                TLS
                </Form.Label>
                <Col >
                  <Form.Check
                    name="tls"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    //  value={formik.values.tls}
                     checked={formik.values.tls}
                  />
                   {/* {console.log(formik.values.tls,"true")} */}
                  {formik.touched.tls &&
                  formik.errors.tls ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.tls}
                    </div>
                  ) : null}
                </Col>
              </Form.Group>
              <Button type="submit" className="event-submit-button">
                Submit
              </Button>
            </form>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default StpDetails;
