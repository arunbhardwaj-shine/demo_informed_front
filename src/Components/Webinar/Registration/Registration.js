import React, { useEffect, useState,useRef  } from "react";
import { useFormik } from "formik";
import ExportApi from "../../../Api/ExportApi";
import { Button, CloseButton, Col, Form, Modal, Row, Table } from "react-bootstrap";
import * as Yup from "yup";
import "../webinar.css";
import { render } from 'react-dom';
import EmailEditor from 'react-email-editor';
import { toast, ToastContainer } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CreateRegistration from "./CreateRegistration";
import { Link } from "react-router-dom";


const Registration = () => {


    const [event, setEvent] = useState([]);
    const [id, setId] = useState();
    const [registrationPageList, setRegistrationPageList] = useState();
    const [template, setTemplate] = useState();
    const [editdata, setEditdata] = useState();
    const [errimage, setErrimage] = useState(false);
    const[massage,setMassage]  = useState("Please Select Event")
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [body, setBody] = useState();
    const [err, setErr] = useState(false);
    const [image, setimage] = useState();
    const [flag, setFlag] = useState(false);

    const emailEditorRef = useRef(null);

    const saveDesign = () => {
      emailEditorRef.current.editor.saveDesign((design) => {
        console.log('saveDesign', design);
        alert('Design JSON has been logged in your developer console.');
      });
    };
  
    const exportHtml = () => {
      emailEditorRef.current.editor.exportHtml((data) => {
        const { design, html } = data;
        console.log('exportHtml', design);
        alert('Output HTML has been logged in your developer console.');
      });
    };
  
    const onDesignLoad = (data) => {
      console.log('onDesignLoad', data);
    };
  
    const onLoad = () => {
      console.log('onLoad');
  
     /* emailEditorRef.current.editor.addEventListener(
        'design:loaded',
        onDesignLoad
      );
      */
     console.log(JSON.parse(editdata[0].body))
      emailEditorRef.current.editor.loadDesign(JSON.parse(editdata[0].body));
    }
  
    const onReady = () => {
      console.log('onReady');
    }
    const handeleimage = (e) => {
      if (e?.target?.files[0].type.match(/\/(jpg|jpeg|png)$/)){
        setErrimage(false)
        let file = e.target.files[0];
        setimage(e.target.files[0]);
       
        if (file) {
            setFlag(true)
            const preview = document.getElementById('imgVieww');
            const reader = new FileReader();
            reader.addEventListener("load", function () {
              preview.src = reader.result;
            }, false);
             console.log("profileImg",file)
            reader.readAsDataURL(file);
            }
      }else{
        setErrimage(true)
        setErrimage("Only jpeg, png, jpg, are allowed")
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
            if(resp.data.data===undefined){
              setMassage("Data Not Found")
            }
          }
        });
      };
      const handleGetRegistrationPagedata = (id) => {
        ExportApi.RegistrationPageData(id).then((resp) => {
          if (resp.ok) {
            setimage(null)
            console.log(resp.data.data);
            setEditdata(resp.data.data);
          }
        });
      };

      const formik = useFormik({
        initialValues: {
            RegistrationPageTitle:editdata?editdata[0].title:'',
              url:editdata?editdata[0].url:""
        },
        validationSchema: Yup.object({
          RegistrationPageTitle: Yup.string().required("Enter your registration page title"),
          url: Yup.string().required("Enter url alias"),
        }),
        enableReinitialize: true,
        onSubmit: (values) => { 
          
          let formData = new FormData();

          formData.append("form_id", editdata[0].id);
    
          formData.append("body", JSON.stringify(body));
    
          formData.append("title", values.RegistrationPageTitle);

          formData.append("file", image);
          formData.append("url", values.url);
  
          ExportApi.UpdateRegistrationPageData(formData).then((resp) => {
            if (resp.ok) {
              if (resp.data.code == 200) {
                handleGetRegistrationPageList(id)
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
      {/* {console.log(editdata[0].id)} */}
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
                    onChange={(e) =>{handleGetRegistrationPageList(e.target.value);setModalShow2(true);setEditdata(null);}} >
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
                Create New Registration page
              </Button>:null}
          {registrationPageList?
          <Row>
         <Col className="mb-5">
           {/* {console.log("templateList",templateList)} */}   
         <Table bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                  {registrationPageList?.map((val,i) => (
                  <tr key={i}>  
                    <td>{val.title}</td>
                    <td><Link to={`/webinar/register/${val.code}/${val.url}`}><Button>Preview</Button></Link><Button onClick={(e)=>{handleGetRegistrationPagedata(val.id);setFlag(false)}}>Edit</Button> </td>
                  </tr>
                ))}
              </tbody>
            </Table>
         </Col>
       </Row>
       :<h2>{massage}</h2>}
    </Row>
    <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered >
            <Modal.Header onClick={()=>setModalShow(false)} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Create Registration Page
                </Modal.Title>
              </Modal.Header>
        <Modal.Body>
    <CreateRegistration  data={setModalShow} id={id} />
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
       
                  <Form.Group className="mb-3">
                    <Form.Label>Url Alias </Form.Label>
                    <Form.Control
                      name="url"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.url}
                      type="text"
                      placeholder="url"
                    />
                    <div>(Url will be like: https://abc.com/event-name/url-alias<br/>
                         Example: https://informed.pro/WFH-2022/virtual-symposium)</div>
                         {formik.touched.url  && formik.errors.url  ? (
                <div style={{ color: "red" }}>{formik.errors.url }</div>
              ) : null}
                  </Form.Group>
              <Row>          
                  <Col xs={9}>
                  <Form.Label>Body Text</Form.Label>
            

        <h1>React Email Editor (Demo)</h1>

        <button onClick={saveDesign}>Save Design</button>
        <button onClick={exportHtml}>Export HTML</button>
     

      <React.StrictMode>
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      </React.StrictMode>

            {/* <CKEditor
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
            />  */}

          <p style={{color:"red"}}>{err}</p>
                  </Col>
         
      
          </Row>
         <div><img id="imgVieww" src={flag==false?`http://51.89.210.56:8000${editdata[0].file}`:""}  alt="Viewing the registration page image" width={340}/> 
    </div>   
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
                <p style={{color:"red"}}>{errimage}</p>
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