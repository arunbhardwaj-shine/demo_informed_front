import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import ExportApi from "../../../Api/ExportApi";
import { Checkbox } from "@material-ui/core";
const StpDetails = () => {
  const formik = useFormik({
    initialValues: {
      smtp_host: "",
      smtp_port: "",
      smtp_from_name: "",
      smtp_email: "",
      smtp_password: "",
      encryption_type: "",
      tls :false
    },
    validationSchema: Yup.object({
      // tls: Yup.boolean().oneOf(
      //   [true],
      //   "You must accept the terms and conditions"
      //   ),
        smtp_host: Yup.string()
        .required("SMTP host  is required"),
        smtp_port: Yup.string().required("SMTP port  is required"),
        smtp_from_name: Yup.string().required("SMTP from Name  is required"),
        smtp_email: Yup.string()
        .email("Invalid email address")
        .required("SMTP email  is required"),
        smtp_password: Yup.string().required("SMTP password  is required"),
        encryption_type: Yup.string().required( "SMTP encryption is required"),
         tls: Yup.boolean().oneOf([true], "TLS is required"),
    }), 
    onSubmit: (values) => {
      console.log(values)
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
    },
  });
  return (
    <div>
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
            SMTP
          </h2>
          <Row>
            <form onSubmit={formik.handleSubmit}>
              <Form.Group
                as={Row}
                className="mb-3"
              >
                <Form.Label column sm={2}>
                  SMTP Host
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
                  SMTP Port
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
                  SMTP From Name
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
                  SMTP Email
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
                  SMTP Password
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
                  SMTP Encryption
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
                     value={formik.values.tls}
                  />
                   
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
