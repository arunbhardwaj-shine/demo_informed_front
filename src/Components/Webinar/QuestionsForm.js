import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import ExportApi from "../../Api/ExportApi";
import { loader } from "../../loader";
import Example from "./DrangAndDrop";


const QuestionsForm = () => {
    const [render, setRerender] = useState(0);
    const [SpeakerErr, setSpeakerErr] = useState([{ name: "", colorCode: "" }]);
    const [Speakername, setSpeakerName] = useState([{ name: "", color: "" }]);
    const [SQ, setSQ] = useState([]);
  
    const [index, setIndex] = useState();
    const [Hading, setHading] = useState();
    const [Data, setData] = useState([]);
    const [message, setMassage] = useState();
    const handleMultiInputAdd = () => {
      setSpeakerName([...Speakername, { name: "", color: "" }]);
      setSpeakerErr([...SpeakerErr, { name: "", colorCode: "" }]);
    };
    const handleMultiInputAdd1 = () => {
      setSQ([...SQ, { question: "", order
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
        Speakername[i].color = value;
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
          SQ[i].question = value;
        } else if (e.target.name === `colorCode${i}`) {
            SQ[i].order = value;
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
  
 
    const handleResetSp = () => {
      // setRerender(render+1)
      setSpeakerName([{ name: "", color: "" }]);
      setSQ([]);
      setSpeakerErr([{ name: "", colorCode: "" }]);
      // setRerender(render+1)
    };
  
    const formik = useFormik({
      initialValues: {
        Question: "",
        AnswerType:"",
        SubQuestion:SQ,
        QuestionType:"Survey",
        labelQuestion:Speakername,
        eventid:localStorage.getItem("EventIdHeader")

      },
  
      validationSchema: Yup.object({
          Question: Yup.string().required("This field is required"),
          // Hading: Yup.string().required("Hading is required"),
  
          AnswerType: Yup.string().required("Answer Type is required"),
          // QuestionOrder: Yup.string().required("This field is required."),
        // Bu: Yup.string().required("Bu is required"),
  
        // event_date: Yup.string().required("Event date is required"),
        // Description: Yup.string().required("Description is required"),
      }),
      onSubmit: (values) => {
        if(SQ.length>0){
          let previewData={
            event_id:localStorage.getItem("EventIdHeader"),
            question_type:values.QuestionType,
            status:1,
           type:values.AnswerType,
            question: values.Question,
            sub_ques:SQ,
            // QuestionOrder :values.QuestionOrder,
            label:Speakername,
 
          }  
          ExportApi.CreateFormPool_Survey(previewData).then((resp) => {
            if (resp.ok) {
              listData()
              setRerender(render+23)
              toast.success(resp.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          });      //  sub_ques[0][question]:AAAAAAAAAAAAA

        }else if(values.AnswerType=="text"||values.AnswerType=="date"||values.AnswerType=="Country"||values.AnswerType=="textarea"){
          let previewData={
            event_id:localStorage.getItem("EventIdHeader"),
            question_type:values.QuestionType,
            status:1,
           type:values.AnswerType,
            question: values.Question, 
          }  
          ExportApi.CreateFormPool_Survey(previewData).then((resp) => {
            if (resp.ok) {
              console.log(resp.data)
              listData()
              setRerender(render+23)
              toast.success(resp.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          });
        }else{
          let previewData={
            event_id:localStorage.getItem("EventIdHeader"),
            question_type:values.QuestionType,
            status:1,
           type:values.AnswerType,
            question: values.Question,
            // sub_ques:[{ question: "", order
            // : "" }],
            // QuestionOrder :values.QuestionOrder,
            label:Speakername,
 
          }  
          ExportApi.CreateFormPool_Survey(previewData).then((resp) => {
            if (resp.ok) {
              console.log(resp.data.data)
              listData()
              setRerender(render+23)
              toast.success(resp.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          });
        }
      },
    });
 

    useEffect(() => {
      setSpeakerName(Speakername);
    }, [Speakername]);
    const listData=()=>{
      // setData([])
      ExportApi.listFormPool_Survey(localStorage.getItem("EventIdHeader"),formik.values.QuestionType).then((resp) => {
        if (resp.ok) {
         console.log(resp.data.data)
     if(resp.data.message=="No Record Found"){
      setData([])
    }else{
     setData(resp.data.data)
    }
  

        }
      });
    }
    
    useEffect(() => {
      window.addEventListener("EventId", () =>
      listData(localStorage.getItem("EventIdHeader"))
    );
    listData(localStorage.getItem("EventIdHeader"));
    if (localStorage.getItem("EventIdHeader")) {
      console.log("done");
    } else {
      loader("hide");
    }
    }, []);

    useEffect(() => {
      listData()
    }, [formik.values.QuestionType]);
  return (
    <div class="right-sidebar col">

<div className="custom-container">
        <div className="top-header">
        <div className="page-title">
        <h3>Create Survey Form</h3>
            </div>
            </div>


            <div className="webinar-modal-data">
              <div className="registration_form">
                <Col className="registration_left">

            <form onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
          <div className="modal-body-content">
            <div className="form-inline row justify-content-between align-items-center">
            <div className="form-group col-6 col-md-6">
                <label htmlFor="exampleInputEmail1">Question Type</label>
                <select
                  name="QuestionType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.QuestionType}
                  className="form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                     <option value="Survey">
                     Survey
                      </option>               
                     <option value="Poll">
                     Poll
                      </option>               
                </select>
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
            {/* <button
              type="button"
              className="btn btn-primary btn-bordered"
              data-dismiss="modal"
            //   onClick={() => props.closePopup()}
            >
              Close
            </button> */}
            <Button
              type="submit"
              className="event-submit-button btn btn-primary btn-filled"
              // onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </form>
</Col>
<Col>
<div className="survey-tab">{Data.length>0?
  <h4> <center>{Data[0]?.event?.title}</center> </h4>:null
}
<div className="Question">
  {/* {console.log(Data)}{<listData/>} */}
  {Data.length>0?
  <Example listData={listData} QuestionType={formik.values.QuestionType} count={2+2} Data={Data}/>:null
}
</div>
</div>
</Col>
</div></div>

            </div>
            
    </div>
  )
}

export default QuestionsForm
