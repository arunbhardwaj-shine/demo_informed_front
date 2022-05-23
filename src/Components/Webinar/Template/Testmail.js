import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import ExportApi from "../../../Api/ExportApi";
import axios from "axios";
export const Testmail = (props) => {
  const [image, setimage] = useState("");
  const handeleimage = (e) => {
    setimage(e.target.files[0]);
  };
  const formik = useFormik({
    initialValues: {
      Email: "",
      Name: "",
      file: "",
      Selecttem: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string().required("Enter your name"),
      Email: Yup.string()
        .email("Invalid email address")
        .required("Enter your email"),
    }),
    enableReinitialize: true,

    onSubmit: (values) => {
      let formData = new FormData();
      formData.append("template_id", props.data1);
      formData.append("email", values.Email);
      formData.append("file", image);
      formData.append("name", values.Name);

      ExportApi.UserTemplateSandMail(formData)
        .then((resp) => {
          if (resp.data) {
            console.log(resp.data);
            if (resp.data.code == 200) {
              props.data(false);
              toast.success(resp.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              console.log(resp.data);
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
    <div>
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
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Name}
                type="text"
                placeholder="Name"
              />
              {formik.touched.Name && formik.errors.Name ? (
                <div style={{ color: "red" }}>{formik.errors.Name}</div>
              ) : null}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Email}
                type="email"
                placeholder="name@example.com"
              />
              {formik.touched.Email && formik.errors.Email ? (
                <div style={{ color: "red" }}>{formik.errors.Email}</div>
              ) : null}
            </Form.Group>
          </Col>
          <Row>
            <Col>
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Attachment</Form.Label>
                <Form.Control
                  name="file"
                  onChange={(e) => {
                    handeleimage(e);
                  }}
                  placeholder="name@example.com"
                  type="file"
                  size="md"
                />
              </Form.Group>
            </Col>
          </Row>
        </Row>
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};
