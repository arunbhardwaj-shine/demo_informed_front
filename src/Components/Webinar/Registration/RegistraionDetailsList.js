import React, { useEffect, useState } from 'react'
import ExportApi from '../../../Api/ExportApi';
import { loader } from '../../../loader';
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
const RegistrationDetailsList = () => {
    const [event, setEvent] = useState([]);
    const [show, setShow] = useState(false);
    const [List, setList] = useState([]);
    const [massage, setMassage] = useState("Please Select Event");
    const [eventId, setEventId] = useState();
    const [SingleData, setSingleData] = useState();
    const [flag, setFlag] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [fields, setFields] = useState();
    const [modalShow1, setModalShow1] = useState(false);
    const [image, setimage] = useState();
    const [field, setField] = useState("");
    const [errimage, setErrimage] = useState(false);
    const [selectedName, setSelectedName] = useState([]);
    let path_image = process.env.REACT_APP_ASSETS_PATH_WEBINAR;
    const [inputbox, setInputBox] = useState([
        { value: "Name", name: "Name", isActive: false },
        { value: "Email", name: "Email", isActive: false },
        { value: "Region", name: "Region", isActive: false },
        { value: "Dr Number", name: "Dr number", isActive: false },
        { value: "State", name: "State", isActive: false },
        { value: "Hospital", name: "Hospital", isActive: false },
        { value: "Profession", name: "Profession", isActive: false },
        { value: "ConSent", name: "ConSent", isActive: false },
      ]);
      const handeleimage = (e) => {
        if (e?.target?.files[0].type.match(/\/(jpg|jpeg|png)$/)) {
          setErrimage(false);
          let file = e.target.files[0];
          setimage(e.target.files[0]);
    
          if (file) {
            const preview = document.getElementById("imgVieww");
            const reader = new FileReader();
            reader.addEventListener(
              "load",
              function () {
                preview.src = reader.result;
              },
              false
            );
            reader.readAsDataURL(file);
          }
        } else {
          setErrimage(true);
          setErrimage("Only jpeg, png, jpg, are allowed");
        }
      };
      const saveClicked = () => {
        setShow(false);
        setInputBox((oldArray) => [...oldArray, { value: field, name: field,isActive: false }]);
        setField("");
      };
    const formik = useFormik({
        initialValues: {
          Title: "",
          Body: "",
          Selectevent:''
        },
        validationSchema: Yup.object({
          Title: Yup.string().required("Title is required"),
          Body: Yup.string().required("Body text is required"),
          Selectevent: Yup.string().required("Please select event"),
        }),
        onSubmit: (values) => {
          console.log(selectedName)
          let copyData = JSON.stringify(selectedName)
          let formData = new FormData();
          formData.append("body", values.Body);
           formData.append("file", image);
          formData.append("title", values.Title);
          formData.append("fields", copyData);
          formData.append("event_id", values.Selectevent);
          if(image){
            console.log("formData,",formData)
              ExportApi.CreateRegistrationPagedetail(formData)
                .then((resp) => {
                  if (resp.data) {
                    console.log(resp.data);
                    if (resp.data.code == 200) {
                      loader("hide");
                      toast.success(resp.data.message);
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
            }else{
              setErrimage("Please Choose file")
            }
          }
         
      });
    //   console.log(fields)
    const handleGetEventlist = () => {
        ExportApi.GetEventList().then((resp) => {
          if (resp.ok) {
            loader("hide");
            setEvent(resp.data.data);
            if(eventId==null||eventId==undefined){
                setEventId(resp.data.data[0].id)
                handleGetListData(resp.data.data[0].id)
             }

          }
        });
      };
const handleGetListData=(id)=>{
    ExportApi.RegistrationPageDetailList(id).then((resp) => {
        if (resp.ok) {
         console.log(resp.data)
         setList(resp.data.data);
         if (resp.data.code === 404) {
            setMassage("Data Not Found");
          }
        }
      });
}
const handleGetSingleData=(id)=>{
    ExportApi.RegistrationPageDetail(id).then((resp) => {
        if (resp.ok) {
          console.log(resp.data.data.fields)
        setSingleData(resp.data.data);
        setFields(JSON.parse(resp.data.data.fields))
        }
      });
}
const handleRadioChangedata = (e, i) => {
    const { checked, name } = e.target;
    const Index = selectedName.findIndex((v) => v.value == name);
    let copy = selectedName[Index];
    console.log(Index)
    copy.required = checked;

    setSelectedName([...selectedName]);
  };
  const handleRadioChange = (e, i) => {
    const { checked, name } = e.target;
    let data = { value: name, required: false };
    const Copyinputbox = inputbox[i];
    Copyinputbox.isActive = e.target.checked;
    setInputBox([...inputbox]);
    if (selectedName[i]?.value !== name && checked==true) {
      selectedName.push(data);
    } else {
      selectedName.splice(i, 1);
      setSelectedName([...selectedName]);
    }
  };
//   const handleGetEventlist = () => {
//     ExportApi.GetEventList().then((resp) => {
//       if (resp.ok) {
//         loader("hide");
//         setEvent(resp.data.data);
//       }
//     });
//   };
  const addData = () => {
    setField("");
    setShow(true);
    //console.log("add data");
  };
useEffect(() => {
    loader("show");
    handleGetEventlist();
  }, []);

  return (
    <div class="right-sidebar">
      <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
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
       
        <h2>Registration Page List</h2>
          <div>
            <Form.Select name="Selectevent" value={eventId}
              onChange={(e) => {
                  handleGetListData(e.target.value);
                setEventId(e.target.value);
              }} >
              <option value=""> Select Event</option>
              {event?.map((val, i) => (
                <React.Fragment key={i}>
                  <option value={val.id}>{val.title}</option>
                </React.Fragment>
              ))}
            </Form.Select>
         </div>
          <div class="table-responsive">
            <Table class="table" bordered hover>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {List ? (
                  List?.map((val, i) => (
                    <tr key={i}>
                      <td>{val.title}</td>
                      <td>
                        <Button onClick={(e) => {
                            handleGetSingleData(val.id);
                            setModalShow(true)
                          }} > Edit
                        </Button>
                        <Button variant='danger'
                          onClick={(e) => {
                            // handleGetRegistrationPagedata(val.id);
                            setModalShow1(true)
                            // setFlag(false);
                          }} > Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                    <tr><td>No Record Found</td></tr>
                )}
              </tbody>
            </Table>
          </div>
        
      <Modal show={modalShow} size="sm" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header onClick={()=>setModalShow(false)} closeButton> </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <Col xs={8}>
              <Col className="mb-3">
                <Form.Label>Select Event </Form.Label>
                <Form.Select
                  name="Selectevent"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Selectevent}
                >
                  <option value=""> Select Event</option>
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
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                  Registration Page  Title{" "}
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="Title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Title}
                  />
                  {formik.touched.Title && formik.errors.Title ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.Title}
                    </div>
                  ) : null}
                </Col>
              </Form.Group>
              <Form.Group  as={Row} className="mb-3" >
                <Form.Label column sm={3}>
                Body Text{" "}
                </Form.Label>
                <Col sm={9}>
                  <textarea name="Body" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Body} className="form-control" rows="6" ></textarea>
                  {formik.touched.Body && formik.errors.Body ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.Body}
                    </div>
                  ) : null}
                </Col>
              </Form.Group>

              <div>
                <h5>what data should be collected?</h5>
                <Row>
                  <div>
                  {inputbox?.map((data, i) => {
                    return (
                      <>
                        <Form.Label>{data.value}</Form.Label>
                        <Form.Check type="checkbox" onChange={(e) => handleRadioChange(e, i)} value={data.value} name={data.name}
                          //   checked={data.value==fields[i]?.value?fields[i]?.requred:data.isActive}
                        />
                        {data.isActive == true ? (
                          <>
                            <Form.Label >required</Form.Label>
                            <Form.Check name={data.name} type="checkbox" onChange={(e) => handleRadioChangedata(e, i)}
                              // name="required"
                            />
                          </>
                        ) : null}
                      </>
                    );
                  })}
                  </div>
                </Row>
                <button onClick={addData}>Add data field</button>
                <div>
                  {show == true ? (
                    <>
                      <input type="text" onChange={(e) => { setField(e.target.value);}}/>
                      <button type="button" onClick={saveClicked}>
                        Save
                      </button>
                      <button type="button" onClick={() => {setShow(false);setField("");}}>
                        Close
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </Col>
            <Col>
              <div>
                <img id="imgVieww" src="" alt="Viewing the registration page image" width={340} />
              </div>
            </Col>
            <input type="file" onChange={(e) => handeleimage(e)} />
            <div style={{ color: "red" }}>
              {errimage}
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={()=>{setTimeout(() => {
            setModalShow(false);
          }, 1000); }}>Update</Button>
          <Button onClick={()=>{setModalShow(false)}}>Close</Button>
        </Modal.Footer>
      </Modal>
              
      <Modal show={modalShow1} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header onClick={()=>setModalShow1(false)} closeButton>
        </Modal.Header>
        <Modal.Body>
          <img src={path_image + "alert.png"} alt="" />
          <h4>The Delete action will delete the registration details.</h4>
          <div className="modal-buttons">
            <Button  className="btn btn-primary btn-filled" onClick={()=>{setModalShow1(false)}}>Delete</Button>
            <Button  className="btn btn-primary btn-bordered light" onClick={()=>{setModalShow1(false)}}>Close</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default RegistrationDetailsList