import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { loader } from "../../../loader";
import ExportApi from "../../../Api/ExportApi";
import { Link } from "react-router-dom";
const RegistraionDetails = () => {
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
  const [event, setEvent] = useState([]);
  const [selectedName, setSelectedName] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [checkboxData, setcheckboxData] = useState([]);
  const [show, setShow] = useState(false);
  const [image, setimage] = useState();
  const [field, setField] = useState("");
  const [errimage, setErrimage] = useState(false);
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
  const handleGetEventlist = () => {
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
        loader("hide");
        setEvent(resp.data.data);
      }
    });
  };
  const addData = () => {
    setField("");
    setShow(true);
    //console.log("add data");
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
  useEffect(() => {
    loader("show");
    handleGetEventlist();
  }, []);
  const saveClicked = () => {
    setShow(false);
    setInputBox((oldArray) => [...oldArray, { value: field, name: field,isActive: false }]);
    setField("");
  };
  return (
    <div class="right-sidebar">
      <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
      <Row>
        <div className="page-title d-flex justify-content-between">
            <h2>Registration Page</h2>
            <Link to="/webinar/registrationdetailslist"><Button> List</Button> </Link>
        </div>
        <Col className="registration_left">
          <div>
            <Row>
              <form onSubmit={formik.handleSubmit}>
                <Col xs={8}>

                  <div className="form-inline row justify-content-between align-items-center">
                    <div className="form-group col-12 col-md-12">
                      <Col className="mb-3">
                        <Form.Label>Select Event </Form.Label>
                          <Form.Select
                            name="Selectevent"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Selectevent}
                            className="form-control"
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
                    </div>
                  </div>

                  <div className="form-inline row justify-content-between align-items-center">
                    <div className="form-group col-12 col-md-12">   
                      <Form.Label> Registration Page  Title</Form.Label>
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
                    </div>
                  </div>

                  <div className="form-inline row justify-content-between align-items-center">
                    <div className="form-group col-12 col-md-12">   
                      <Form.Label> Body Text</Form.Label>
                      <textarea name="Body" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Body} className="form-control" rows="6"></textarea>
                        {formik.touched.Body && formik.errors.Body ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.Body}
                          </div>
                        ) : null}
                    </div>
                  </div>

                  <h5>What data should be collected?</h5>
                  <div className="form-inline">
                    {inputbox.map((data, i) => {
                      return (
                        <>
                          <div class="form-check">
                            <Form.Label>{data.value}</Form.Label>
                            <Form.Control
                              type="checkbox"
                              onChange={(e) => handleRadioChange(e, i)}
                              value={data.value}
                              name={data.name}
                              className="form-check-input"
                            />
                          
                            {data.isActive == true ? (
                              <>
                                  <br/><span>Required</span>
                                  <Form.Control
                                    name={data.name}
                                    type="checkbox"
                                    className="form-check-input"
                                    onChange={(e) => handleRadioChangedata(e, i)}
                                    // name="required"
                                  />
                              </>
                            ) : null}
                          </div>

                        </>
                      );
                    })}
                  </div>

                  <button onClick={addData}>Add data field</button>

                  <div>
                    {show == true ? (
                      <>
                        <input type="text"  onChange={(e) => { setField(e.target.value); }} className="form-control" />
                        <button type="button" onClick={saveClicked}> Save </button>
                        <button type="button" onClick={() => { setShow(false);setField("");}}>
                          Close
                        </button>
                      </>
                    ) : null}
                  </div>

                </Col>

                {/* <Col>
                  <div>
                    <img id="imgVieww" src="" alt="Viewing the registration page image" width={340} />
                  </div>
                </Col> */}
                
                <input type="file" onChange={(e) => handeleimage(e)} />
                <div style={{ color: "red" }}>{errimage}</div>
                <button className="btn btn-primary" type="submit">Submit</button>
              </form>
            </Row>
          </div>
        </Col>
        <Col className="registration_right">
          <div>
              <img id="imgVieww" src="" alt="Viewing the registration page image" width={340} />
            </div>
        </Col>
      </Row>
      <div class="download-sample">
          <p>Download sample Excel file to upload new HCPs</p>
          <div class="upload-btn">
              <label for="input-file">Download File</label>
              <input id="input-file" type="file" />
          </div>
			</div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};
export default RegistraionDetails;
