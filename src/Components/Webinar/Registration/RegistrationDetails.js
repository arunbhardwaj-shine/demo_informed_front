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
        <Col md={{ span: 7, offset: 3 }}>
          <h2>Registration Details</h2>
          <div>
            <Link to="/webinar/registrationdetailslist"><Button> List</Button> </Link>
            <Row>
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
                <Form.Group
                as={Row}
                className="mb-3"
              >
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
              <Form.Group
                as={Row}
                className="mb-3"
              
              >
                <Form.Label column sm={3}>
                Body Text{" "}
                </Form.Label>
                <Col sm={9}>
                  <textarea
                    name="Body"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Body}
                    className="form-control"
                    rows="6"
                  ></textarea>
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
                    {inputbox.map((data, i) => {
                      return (
                        <>
                         <Form.Label>{data.value}</Form.Label>
                          <Form.Check
                            type="checkbox"
                            onChange={(e) => handleRadioChange(e, i)}
                            value={data.value}
                            name={data.name}
                          />
                          {data.isActive == true ? (
                            <>
                              <Form.Label >required</Form.Label>
                              <Form.Check
                                name={data.name}
                                type="checkbox"
                                onChange={(e) => handleRadioChangedata(e, i)}
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
                        <input
                          type="text"
                          onChange={(e) => {
                            setField(e.target.value);
                          }}
                        />
                        <button type="button" onClick={saveClicked}>
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShow(false);
                            setField("");
                          }}
                        >
                          Close
                        </button>

                      </>
                    ) : null}
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  <img
                    id="imgVieww"
                    src=""
                    alt="Viewing the registration page image"
                    width={340}
                  />
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
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default RegistraionDetails;
