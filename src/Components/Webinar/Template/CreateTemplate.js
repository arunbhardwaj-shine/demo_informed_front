import React, { useEffect, useState } from 'react'
import ExportApi from '../../../Api/ExportApi';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Button, Col, Form, Row } from 'react-bootstrap';
import { loader } from '../../../loader';
function CreateTemplate(props) {
    const formik = useFormik({
        initialValues: {
            Templatename:'',
            Selectevent:""
        },
        validationSchema: Yup.object({
            Templatename: Yup.string().required("Enter your template name"),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
          loader("show")
            ExportApi.CreateTemplate(values.Templatename, localStorage.getItem("EventIdHeader")).then((resp) => {
                if (resp.ok) {
                 props.htTemplate(localStorage.getItem("EventIdHeader"))
                  if (resp.data.code == 200) {
                    loader("hide")
                      props.data(false)
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
            <form onSubmit={formik.handleSubmit}>
           <Row>
            <Col className="mb-3">
              <Form.Label>Template Name </Form.Label>
              <Form.Control
                name="Templatename"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Templatename}
                placeholder="Template Name"
              />
                  {formik.touched.Templatename && formik.errors.Templatename ? (
                  <div style={{ color: "red" }}>{formik.errors.Templatename}</div>
                ) : null}
            </Col>
          </Row>
          <Button type="submit" className="btn-filled"> Go </Button>
          </form>
    </div>
  )
}

export default CreateTemplate
