import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
const EmailSand = () => {
  const [event, setEvent] = useState([]);
  const [eventId, setEventId] = useState();
  const [eventName, setEventName] = useState();
  const [Show, setShow] = useState(false);
  const [EmailData, setEmailData] = useState();
  const [templateList, setTemplateList] = useState();
  const [templateId, setTemplateId] = useState();
  const [type, setType] = useState();
  const [checked, setChecked] = React.useState([1]);
  const [Checkbox, setCheckbox] = React.useState([]);
  const [data, setData] = useState([]);
  const [image, setimage] = useState("");
  const [errimage, setErrimage] = useState(false);
  const handeleimage = (e) => {
    console.log(e?.target?.files[0].name)
    // if (e?.target?.files[0].name.match(`/(\.xls|\.xlsx)$/i`)){
      setErrimage(false)
      console.log("e.target.files[0]",e.target.files[0])
      setimage(e.target.files[0]);
    // } 
    //   else{
    //     setErrimage(true)
    //     setErrimage("Only xls are allowed")
    //   }
    }
  const handleGetEventlist = () => {
      ExportApi.GetEventList().then((resp) => {
        if (resp.ok) {
          setEvent(resp.data.data);
        }
      });
  };
  const sendExcelFile = () => {
    let formData = new FormData();
    formData.append("file", image);
    if(image){
      
      ExportApi.Excelsend(formData).then((resp) => {
        if (resp.ok) {
          if (resp.data.code == 200) {
            setShow(false);
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
          console.log(resp.data) 
        }
      });
    }
  };
  const handleGetTemplateList = (id) => {
    ExportApi.UserTemplateList(id).then((resp) => {
      if (resp.ok) {
        setTemplateList(resp.data.data);
      }
    });
  };
  const handleGSendEmail = (id) => {
    let a = JSON.stringify(data);
    ExportApi.sandAllmaik(templateId,a).then((resp) => {
      if (resp.ok) {
        if (resp.data.code == 200) {
          setShow(false);
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
         console.log(resp.data.data);
      }
    });
  };
  const handleGetEmaildataRegistered = (value) => {
    ExportApi.EmailSandRegistered(value, eventId).then((resp) => {
      if (resp.ok) {
        console.log(resp.data.data);
        let a = resp.data.data;
        for (let index = 0; index < a.length; index++) {
          if (a.length !== Checkbox.length) Checkbox.push({ Check: false });
        }
        setEmailData(resp.data.data);
      }
    });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().required("Email is required"),
    }),
    onSubmit: (values) => {
      ExportApi.EmailSand(eventId, values.name, values.email)
        .then((resp) => {
          if (resp.data) {
            if (resp.data.code == 200) {
              setShow(false);
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
  useEffect(() => {
    handleGetEventlist();
  }, []);
  const Checkboxhandle = (e) => {
    // for (let index = 0; index < EmailData.length; index++) {
    //   data.splice(index, 1);
    //   setData([...data])
    //   console.log("first",data)
    // }
      for (let index = 0; index < EmailData.length; index++) {
        const obj = EmailData[index];
        const Check = Checkbox[index];
        Check.Check = e.target.checked;
        Checkbox.splice(index, 1, Check);
        setChecked([...Checkbox]);
        console.log(obj)
         data.push(obj);
        // console.log("omg",data)
        
      }
   
      //  setTotalSelectedCheckboxes(document.querySelectorAll('input[type=checkbox]:checked').length);
    
    if (e.target.checked === false) {
      setData([]);
    }
  };
  const Checkboxhandlebox = (e, val,i) => {
    const index=EmailData.findIndex((v)=>v.id==val.id)
    console.log(index)
    const Check = Checkbox[index];
    Check.Check = e.target.checked;
    Checkbox.splice(index, 1, Check);
    setChecked([...Checkbox]);
   if( e.target.checked == true){
    setData([...data, val])
   }
   else{
    data.splice(index, 1);
    setData([...data]);
    setTimeout(()=>{setData([...data])},1000)
   } 
    
    // setTotalSelectedCheckboxes(document.querySelectorAll('input[type=checkbox]:checked').length);
  };
  useEffect(() => {
    console.log(data);
  }, [checked, data]);
  return (
    <Row>
      {/* {console.log("Speakername",Speakername)} */}
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
        <h2>EmailSand</h2>
        <Row style={{ paddingTop: "20px" }}>
          <Col>
            {" "}
            <Button onClick={() => setShow(true)}>Add User</Button>
          </Col>
          <Col>
            {" "}
            <Button onClick={()=>{handleGSendEmail()}}>Send Mail</Button>
          </Col>
        </Row>
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <Form.Label>Select Event </Form.Label>
            <Form.Select
              name="type"
              onChange={(e) => {
                handleGetTemplateList(e.target.value);
                setEventId(e.target.value);

                setEventName(e.target.options[e.target.selectedIndex].text);
              }}
            >
              <option> Select Event</option>
              {event?.map((val, i) => (
                <React.Fragment key={i}>
                  <option value={val.id}>{val.title}</option>
                </React.Fragment>
              ))}
            </Form.Select>
          </Col>
          <Col>
            {templateList != undefined || templateList != null ? (
              <>
                <Form.Label>Select Template </Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setTemplateId(e.target.value);
                  }}

                  name="type"
                >
                  <option> Select Template</option>
                  {templateList
                    ? templateList?.map((val, i) => (
                        <React.Fragment key={i}>
                          <option value={val.id}>{val.name}</option>
                        </React.Fragment>
                      ))
                    : null}
                </Form.Select>
              </>
            ) : null}
          </Col>
          <Col>
            {templateList != undefined || templateList != null ? (
              <>
                <Form.Label>Select Users </Form.Label>
                <Form.Select
                  onChange={(e) => {
                    handleGetEmaildataRegistered(e.target.value);
                  }}
                  aria-label="Default select example"
                >
                  <option>Select User</option>
                  <option value={0}>All Registered</option>
                  <option value={1}>All Non Registered</option>
                </Form.Select>
              </>
            ) : null}
          </Col>
          <Col>
            <Form.Label>Select User Type </Form.Label>
            <Form.Select
              onChange={(e) => {
                // handleGetReadersType(e.target.value);
                setType(e.target.value);
              }}
            >
              <option>Select User Type</option>
              <option value="HCP">HCP</option>
              <option value="Staff User">Staff User</option>
              <option value="Test User">Test User</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
             <Form.Group controlId="formFileLg" className="mb-3">
             <Form.Label>Choice File</Form.Label>
             <Form.Control
               name="file"
               onChange={(e) => {
                 handeleimage(e);
               }}
               type="file"
               size="md"
               accept="application/vnd.ms-excel"
             />
              <p>excel file should contain first_name, last_name and  email</p>
              <Button onClick={()=>{sendExcelFile()}}>Upload</Button>
           </Form.Group>
          <h6>Selected User {data.length>0?data.length:0}</h6>
          {EmailData ? (<>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={(e) =>{Checkboxhandle(e)}}
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {EmailData
                  ? EmailData?.map((val, i) => (
                      <tr key={i}>
                        <td>
                          <input
                            type="checkbox"
                            value={Checkbox[i].Check}
                            checked={Checkbox[i].Check}
                            onChange={(e) => Checkboxhandlebox(e, val, i)}
                          />
                        </td>
                        <td>{val.name}</td>
                        <td>{val.email}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
            </>
          ) : null}
        </Row>
      </Col>
      <Modal
        size="sm"
        show={Show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body>
          <div>
            <h2 style={{ fontWeight: "bold" }}>
              <center>{eventName ? eventName : null}</center>
            </h2>
            <center>
              <h5 style={{ color: "gray" }}>Add User</h5>
            </center>
          </div>
          <br />
          <form onSubmit={formik.handleSubmit}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label column sm={2}>
                Name{" "}
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div style={{ color: "red" }}>{formik.errors.name}</div>
                ) : null}
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label column sm={2}>
                Email{" "}
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                ) : null}
              </Col>
            </Form.Group>
            <Button type="submit" className="event-submit-button">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </Row>
  );
};

export default EmailSand;
