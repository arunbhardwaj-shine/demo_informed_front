import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, CloseButton, Col, Form, Modal, Row, Table } from "react-bootstrap";
import * as Yup from "yup";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CreateRegistration from "./CreateRegistration";
const Registration = () => {


    const [event, setEvent] = useState([]);
    const [id, setId] = useState();
    const [registrationPageList, setRegistrationPageList] = useState();
    const [template, setTemplate] = useState();
    const [editdata, setEditdata] = useState();

    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
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
    const handleGetEventlist = () => {
        ExportApi.GetEventList().then((resp) => {
          if (resp.ok) {
            setEvent(resp.data.data);
          }
        });
      };

      const handleGetRegistrationPageList = (id) => {
      if(id==="Shine"){
        setId(null)
      }else{
        setId(id)
      }
          
         
        ExportApi.RegistrationPageList(id).then((resp) => {
          if (resp.ok) {
            console.log(resp.data.data);
            setRegistrationPageList(resp.data.data);
          }
        });
      };
      const handleGetRegistrationPagedata = (id) => {
        ExportApi.RegistrationPageData(id).then((resp) => {
          if (resp.ok) {
            console.log(resp.data.data);
            setEditdata(resp.data.data);
          }
        });
      };

      const formik = useFormik({
        initialValues: {
            RegistrationPageTitle:editdata?editdata[0].title:'',
        },
        validationSchema: Yup.object({
          RegistrationPageTitle: Yup.string().required("Enter your registration page title"),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {      
      let formData = new FormData();
      formData.append("event_id",id);
      formData.append("body", body);
      formData.append("file", image);
      formData.append("title", values.RegistrationPageTitle);
          ExportApi.CreateRegistrationPage(formData).then((resp) => {
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
      useEffect(() => {
        handleGetEventlist();
      }, []);
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
      <Col md={{ span: 6, offset: 3 }}>
      <h2>
      Registration page
          </h2>
          <Row>
          <Row>
          <Col className="mb-5">
          <Form.Label>Select Event </Form.Label>
                  <Form.Select
                    name="type"
                    onChange={(e) =>{handleGetRegistrationPageList(e.target.value);setModalShow2(true); setRegistrationPageList(null);setEditdata(null);}} >
                    <option value="Shine" > Select Event</option>
                    {event?.map((val, i) => (
                      <React.Fragment key={i}>
                        <option  value={val.id}>{val.title}</option>
                      </React.Fragment>
                    ))}
                  </Form.Select>
            </Col>
          </Row>
          {id?<Button
                onClick={() => {setModalShow(true); }}>
                Create New Registration
              </Button>:null}
          {registrationPageList!=undefined||registrationPageList!=null?
          <Row>
        
         <Col className="mb-5">
           {/* {console.log("templateList",templateList)} */}   
         <Table bordered hover>
              <thead>
                <tr>
                  <th>Template Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                  {registrationPageList?registrationPageList?.map((val,i) => (
                  <tr key={i}>  
                    <td>{val.title}</td>
                    <td><Button onClick={(e)=>{handleGetRegistrationPagedata(val.id)}}>Edit</Button> </td>
                  </tr>
                )):<h2>Data Not Found</h2>}
              </tbody>
            </Table>
         </Col>
       </Row>
       :<h2>Data Not Found</h2>}
    </Row>
    <Modal
        show={modalShow}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered >
            <Modal.Header onClick={()=>setModalShow(false)} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Create Registration Page
                </Modal.Title>
              </Modal.Header>
        <Modal.Body>
    <CreateRegistration call={handleGetRegistrationPageList} data={setModalShow} id={id} />
        </Modal.Body>
      </Modal>
                 {editdata?    <Row>
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
                      value={formik.values.RegistrationPageTitle}
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
                  <Col xs={9}>
                  <Form.Label>Body Text</Form.Label>
            <CKEditor
              editor={ClassicEditor}
              data={editdata?editdata[0].body:"heelo"}
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
         <Col xs={3}> 
         {/* <div>
          <img id="imgView" src="" alt="Viewing the registration page image" width={340}/>
    </div>    */}
     <div>
      <img  src={editdata[0].file} alt="Viewing the registration page image" width={340}/>
   </div>
       </Col>
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
      {/* {editdata[0].file} */}
          </Col>
      </Row>:null}
      </Col>
      </Row>
    </div>
  )
}

export default Registration