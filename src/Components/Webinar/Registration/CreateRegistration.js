import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, CloseButton, Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const CreateRegistration = (props) => {
    // console.log(props.id)
    const [body, setBody] = useState();
    const [err, setErr] = useState(false);
    const [image, setimage] = useState("");
    const handeleimage = (e) => {
        let file = e.target.files[0];
         setimage(e.target.files[0]);
         if (file) {
             const preview = document.getElementById('imgView');
             const reader = new FileReader();
             reader.addEventListener("load", function () {
             preview.src = reader.result;
             }, false);
             // console.log("profileImg",file)
             reader.readAsDataURL(file);
             }
     };
    const formik = useFormik({
        initialValues: {
            RegistrationPageTitle:'',
        },
        validationSchema: Yup.object({
          RegistrationPageTitle: Yup.string().required("Enter your registration page title"),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
           
      let formData = new FormData();
      formData.append("event_id",props.id);
      formData.append("body", body);
      formData.append("file", image);
      formData.append("title", values.RegistrationPageTitle);
          ExportApi.CreateRegistrationPage(formData).then((resp) => {
            if (resp.ok) {
              if (resp.data.code == 200) {
                  props.call()
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
      <Row>
      <Col>
          <form onSubmit={formik.handleSubmit}>
        <Row>
              <Col className="mb-5">
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Registration Page Title</Form.Label>
                    <Form.Control
                      name="RegistrationPageTitle"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Subject}
                      type="text"
                      placeholder="Title"
                    />
                         {formik.touched.RegistrationPageTitle && formik.errors.RegistrationPageTitle ? (
                <div style={{ color: "red" }}>{formik.errors.RegistrationPageTitle}</div>
              ) : null}
                  </Form.Group>
                </Col>
              </Col>
              <Row>          
                  <Col>
                  <Form.Label>Body Text</Form.Label>
            <CKEditor
              editor={ClassicEditor}
              data={""}
              onReady={(editor) => {
                editor.editing.view.change(writer => {
                  writer.setStyle(
                      "min-height",
                      '400px',
                      editor.editing.view.document.getRoot()
                  );
              });
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setBody(data)
                data?setErr(false):setErr("required")
              }}
              onBlur={(event, editor) => {
                const data = editor.getData();
                data?setErr(false):setErr("required")
                // console.log( 'Blur.', editor );
              }}
              onFocus={(event, editor) => {
                // const data = editor.getData();
                // data?setErr(false):setErr("required")
                // console.log( 'Focus.', editor );
              }}
            /> 
          <p style={{color:"red"}}>{err}</p>
                  </Col>
                  
         <Col> <div>
          <img id="imgView" src="" alt="Viewing the registration page image" width={340}/>
    </div></Col>
          </Row>

          <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Choice File</Form.Label>
                <Form.Control
                  name="file"
                  onChange={(e) => {
                    handeleimage(e);
                  }}
                  type="file"
                  size="md"
                />
              </Form.Group>

          <Button type="submit">
            Save
          </Button>
        </Row>
      </form> 
          </Col>
          <Col >   </Col> 
      </Row>
    </div>
  )
}

export default CreateRegistration