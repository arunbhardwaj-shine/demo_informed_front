import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import ExportApi from "../../Api/ExportApi";

const QuestionsForm = () => {
    const [render, setRerender] = useState(0);
    const [SpeakerErr, setSpeakerErr] = useState([{ name: "", colorCode: "" }]);
    const [Speakername, setSpeakerName] = useState([{ name: "", colorCode: "" }]);
    const [SQ, setSQ] = useState([]);
  
    const [index, setIndex] = useState();
    const [Timezone, setTimezone] = useState([]);
    const [message, setMassage] = useState();
    const handleMultiInputAdd = () => {
      setSpeakerName([...Speakername, { name: "", colorCode: "" }]);
      setSpeakerErr([...SpeakerErr, { name: "", colorCode: "" }]);
    };
    const handleMultiInputAdd1 = () => {
      setSQ([...SQ, { SubQuestion: "", OrderofQuestion
      : "" }]);
    };
  
    const handleSpeakerName = (e, i) => {
      const { value } = e.target;
      Speakername.splice(i, 1, Speakername[i]);
      setSpeakerName([...Speakername]);
      if (e.target.name === `name${i}`) {
        Speakername[i].name = value;
        SpeakerErr[i].name = "";
        if (e.target.value.length == 0) {
          SpeakerErr[i].name = "This field is required";
        }
      } else if (e.target.name === `colorCode${i}`) {
        Speakername[i].colorCode = value;
        SpeakerErr[i].colorCode = "";
        if (e.target.value.length == 0) {
        //   SpeakerErr[i].email = "Email is requred";
        } 
      }
      setSpeakerErr([...SpeakerErr]);
    };
    const handleSpeakerName1 = (e, i) => {
      const { value } = e.target;
      SQ.splice(i, 1, SQ[i]);
      if (e.target.name === `name${i}`) {
          SQ[i].SubQuestion = value;
        } else if (e.target.name === `colorCode${i}`) {
            SQ[i].OrderofQuestion = value;
        }
        setSQ([...SQ]);
    };
    useEffect(() => {
      console.log("inside render");
    }, [render]);
  
    const handleMultiInputRemove = (i) => {
      let data1 = Speakername;
      let data1Err = SpeakerErr;
      Speakername.splice(i, 1);
      data1Err.splice(i, 1);
      setSpeakerName([...Speakername])
      setSpeakerErr([...SpeakerErr])
      setRerender(render + 1);
      setSpeakerName(data1);
      setSpeakerErr(data1Err);
    };
    const handleMultiInputRemove1 = (i) => {
      let data1 = SQ;
      SQ.splice(i, 1);
      setSQ([...SQ])
      setRerender(render + 1);
      setSQ(data1);
    };
  
    const handleSubmit = (handele) => {
      let err = true;
      for (let index = 0; index < Speakername.length; index++) {
        if (Speakername[index].name.length == 0) {
          err = false;
          SpeakerErr[index].name = "This field is required ";
          setSpeakerErr([...SpeakerErr]);
        }
      }
      return err;
    };
    const handleResetSp = () => {
      // setRerender(render+1)
      setSpeakerName([{ name: "", colorCode: "" }]);
      setSQ([]);
      setSpeakerErr([{ name: "", colorCode: "" }]);
      // setRerender(render+1)
    };
  
    const formik = useFormik({
      initialValues: {
        Speakername: "",
        Question: "",
        AnswerType:"",
        QuestionOrder :"",
      },
  
      validationSchema: Yup.object({
        Speakername: Yup.string()
          .required("Speaker name is required"),
          Question: Yup.string().required("This field is required"),
  
          AnswerType: Yup.string().required("Answer Type is required"),
          QuestionOrder: Yup.string().required("This field is required."),
        // Bu: Yup.string().required("Bu is required"),
  
        // event_date: Yup.string().required("Event date is required"),
        // Description: Yup.string().required("Description is required"),
      }),
      onSubmit: (values) => {
  
        if (handleSubmit()) {
           console.log(values)
           console.log(Speakername);
            setMassage(false);
       
        }
  
        // props.closePopup();
      },
    });


    useEffect(() => {
      setSpeakerName(Speakername);
    }, [Speakername]);
  return (
    <div class="right-sidebar col">

<div className="custom-container">
        <div className="top-header">
        <div className="page-title">
        <h3>Create Survey Form</h3>
            </div>
            </div>


            <form onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
          <div className="modal-body-content">
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-6 col-md-7">
                <label htmlFor="exampleInputEmail1">
                Speaker Name <span>*</span>
                </label>
                <input
                  name="Speakername"
                  placeholder="Speaker Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Speakername}
                />
                {formik.touched.Speakername && formik.errors.Speakername ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.Speakername}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-6 col-md-7">
                <label htmlFor="exampleInputEmail1">
                Enter Your Question <span>*</span>
                </label>
                <input
                  name="Question"
                  placeholder="Enter Your Question"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Question}
                />
                {formik.touched.Question && formik.errors.Question ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.Question}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-group col-6 col-md-6">
                <label htmlFor="exampleInputEmail1">Answer Type </label>
                <select
                  name="AnswerType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.AnswerType}
                  className="form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option defaultValue='' selected>Select </option>


                      <option value="Dropdown">
                      Dropdown
                      </option>
                      <option value="text">
                      Text
                      </option>
                      <option value="textarea">
                      Textarea
                      </option>
                      <option value="checkbox">
                      Checkbox
                      </option>
                      <option value="radio">
                      Radio
                      </option>
                      <option value="Country">
                      Country
                      </option>
                      <option value="date">
                      Date
                      </option>

               
                </select>
                {formik.touched.AnswerType && formik.errors.AnswerType ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.AnswerType}
                  </div>
                ) : null}
              </div>
              <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group col-6 col-md-7">
                <label htmlFor="exampleInputEmail1">
                Question Order<span>*</span>
                </label>
                <input
                  name="QuestionOrder"
                  placeholder="Question Order"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.QuestionOrder}
                />
                {formik.touched.QuestionOrder && formik.errors.QuestionOrder ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.QuestionOrder}
                  </div>
                ) : null}
              </div>
            </div>
            {formik.values.AnswerType=="radio"||formik.values.AnswerType=="checkbox"|| formik.values.AnswerType=="Dropdown" ?  <fieldset className="border p-2">
              {Speakername.map((multi, i) => (
                <div
                  key={i}
                  className="form-inline row justify-content-between align-items-center"
                >
                  <div className="form-group col-6 col-md-6">
                    <label htmlFor="exampleInputEmail1">Option Labels<span>*</span></label>
                    <input
                      type="text"
                      placeholder="Option Labels"
                      className="form-control"
                      name={Speakername.length === 0 ? "name" : "name" + i}
                      value={multi.name}
                      onChange={(e) => {
                        handleSpeakerName(e, i);
                      }}
                    />
                    <div className="error" style={{ color: "red" }}>
                      {SpeakerErr[i].name}
                    </div>
                  </div>
                  <div className="form-group col-6 col-md-6">
                    <label htmlFor="exampleInputEmail1">Color<span></span></label>
                    <input
                      type="color"
                      
                      className="form-control"
                      name={Speakername.length === 0 ? "colorCode" : "colorCode" + i}
                      value={multi.colorCode}
                      onChange={(e) => {
                        handleSpeakerName(e, i);
                      }}
                    />
                    <div className="error" style={{ color: "red" }}>
                      {SpeakerErr[i].colorCode}
                    </div>
                  </div>
                  {Speakername.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIndex(i);
                        handleMultiInputRemove(i);
                      }}
                      className="btn-close float-end"
                      aria-label="Close"
                    >
                     
                    </button>
                  ) : null}
                </div>
              ))}
              <a
                href="#"
                onClick={handleMultiInputAdd}
                className="speaker-button"
              >
                Add More <span>+</span>
              </a>
            </fieldset>:null}
          
            {SQ?.map((multi, i) => (
                <div
                  key={i}
                  className="form-inline row justify-content-between align-items-center"
                >
                  <div className="form-group col-6 col-md-6">
                    <label htmlFor="exampleInputEmail1">Sub Question</label>
                    <input
                      type="text"
                      placeholder="Option Labels"
                      className="form-control"
                      name={SQ.length === 0 ? "name" : "name" + i}
                      value={multi.SubQuestion}
                      onChange={(e) => {
                        handleSpeakerName1(e, i);
                      }}
                    />
                    {/* <div className="error" style={{ color: "red" }}>
                     {SpeakerErr[i].name}
                    </div> */}
                  </div>
                  <div className="form-group col-6 col-md-6">
                    <label htmlFor="exampleInputEmail1">Order of Questio<span></span></label>
                    <input
                      type="number"
                      
                      className="form-control"
                      name={SQ.length === 0 ? "colorCode" : "colorCode" + i}
                      value={multi.OrderofQuestion}
                      onChange={(e) => {
                        handleSpeakerName1(e, i);
                      }}
                    />
                    {/* <div className="error" style={{ color: "red" }}>
                      {SpeakerErr[i].colorCode}
                    </div> */}
                  </div>
                  
                    <button
                      type="button"
                      onClick={() => {
                        setIndex(i);
                        handleMultiInputRemove1(i);
                      }}
                      className="btn-close float-end"
                      aria-label="Close"
                    >
                     
                    </button>
               
                </div>
              ))}
              { formik.values.AnswerType=="radio"||formik.values.AnswerType=="checkbox"|| formik.values.AnswerType=="Dropdown" ? <a
                   href="#"
                   onClick={handleMultiInputAdd1}
                   className="speaker-button"
                 >
                  Add Sub Question <span>+</span>
                 </a>:null}
          </div>
          <div className="modal-footer-btn">
            <Button
              type="reset"
              className="btn btn-primary btn-filled"
              onClick={() => handleResetSp()}
            >
              Reset
            </Button>
            <button
              type="button"
              className="btn btn-primary btn-bordered"
              data-dismiss="modal"
            //   onClick={() => props.closePopup()}
            >
              Close
            </button>
            <Button
              type="submit"
              className="event-submit-button btn btn-primary btn-filled"
              onClick={() => handleSubmit()}
            >
              Create
            </Button>
          </div>
        </form>


            </div>
            
    </div>
  )
}

export default QuestionsForm
