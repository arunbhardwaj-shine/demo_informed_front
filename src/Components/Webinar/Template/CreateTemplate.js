import React, { useEffect, useState } from 'react'
import ExportApi from '../../../Api/ExportApi';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Button, Col, Form, Row } from 'react-bootstrap';
function CreateTemplate(props) {
    const [event, setEvent] = useState([]);
    const handleGetEventlist = () => {
        ExportApi.GetEventList().then((resp) => {
          if (resp.ok) {
            setEvent(resp.data.data);
          }
        });
      };
    const formik = useFormik({
        initialValues: {
            Templatename:'',
            Selectevent:""
        },
        validationSchema: Yup.object({
            Templatename: Yup.string().required("Enter your template name"),
            Selectevent: Yup.string()
            .required("Please select event"),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            ExportApi.CreateTemplate(values.Templatename, values.Selectevent).then((resp) => {
                if (resp.ok) {
                 props.htTemplate(values.Selectevent)
                  if (resp.data.code == 200) {
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
      useEffect(() => {
        handleGetEventlist()
      }, [])
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
            <Col className="mb-3">
            <Form.Label>Select Event </Form.Label>
                  <Form.Select
                    name="Selectevent"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Selectevent}
                  >
                    <option> Select Event</option>
                    {event?.map((val, i) => (
                      <React.Fragment key={i}>
                        <option value={val.id}>{val.title}</option>
                      </React.Fragment>
                    ))}
                  </Form.Select>
                  {formik.touched.Selectevent && formik.errors.Selectevent ? (
                  <div style={{ color: "red" }}>{formik.errors.Selectevent}</div>
                ) : null}
            </Col>
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
          <Button
            type="submit"
          >
            Go
          </Button>
          </form>
    </div>
  )
}

export default CreateTemplate
