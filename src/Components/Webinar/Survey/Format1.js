import React, { useEffect, useState } from 'react'
import Example from '../DrangAndDrop';
import { Button, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loader } from '../../../loader';
import ExportApi from '../../../Api/ExportApi';
const Format1 = (props) => {
    const [render, setRerender] = useState(0);
    const [SpeakerErr, setSpeakerErr] = useState([{ name: "", colorCode: "" }]);
    const [Speakername, setSpeakerName] = useState([{ name: "", color: "" }]);
    const [SQ, setSQ] = useState([]);
    let path_imagee = process.env.REACT_APP_ASSETS_PATH_WEBINAR;
    const [EditData, setEditData] = useState(false);
  
    const [index, setIndex] = useState();
    const [questionUpdated, setQuestionUpdated] = useState(false);
    const [Data, setData] = useState([]);
    const editDataCallBack=(data)=>{
        console.log("first")
     if(data){
      setQuestionUpdated(true)
      if(data.label){
        data.label.map((val)=>{
          SpeakerErr.push({ name: "", colorCode: "" }) 
        })
        setSpeakerErr(SpeakerErr)
        setSpeakerName(data.label)
      }else{
      setSpeakerErr([{ name: "", colorCode: "" }]);
       setSpeakerName( [{ name: "", color: "" }])
      }
      if(data.sub_ques?.length>0){
        setSQ(data.sub_ques)
      }else{
        setSQ([])
      }
      setEditData(data)     
     }
     else{
        setEditData(false)
     }
   
    }
    // const handleMultiInputAdd = () => {
    //   setSpeakerName([...Speakername, { name: "", color: "" }]);
    //   setSpeakerErr([...SpeakerErr, { name: "", colorCode: "" }]);
    // };
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
      setSpeakerName([{ name: "", color: "" }]);
      setSQ([]);
      setSpeakerErr([{ name: "", colorCode: "" }]);
    };
    const handleCancel = () => {
        console.log("handleCancel")
      setEditData(false)
      setQuestionUpdated(false)
      setSpeakerName([{ name: "", color: "" }]);
      setSQ([]);
      setSpeakerErr([{ name: "", colorCode: "" }]);

    };
  
    const formik = useFormik({
        // enableReinitialize: true,
      initialValues: {
        Question: EditData ? EditData.question:"",
        AnswerType:EditData ? EditData.type:"checkbox",
        SubQuestion:SQ,
        QuestionType:EditData ? EditData.question_type:"Survey",
        labelQuestion:Speakername,
        eventid:localStorage.getItem("EventIdHeader")
      },
  
      validationSchema: Yup.object({
          Question: Yup.string().required("This field is required"),
          AnswerType: Yup.string().required("Answer Type is required"),

      }),
      onSubmit: (values) => {
        loader("show")
        if(SQ.length>0){
          let previewData={
            event_id:localStorage.getItem("EventIdHeader"),
            question_type:values.QuestionType,
            status:1,
           type:values.AnswerType,
            question: values.Question,
            sub_ques:SQ,
            label:Speakername,
            format:1
          } 
          let previewData1={
            event_id:localStorage.getItem("EventIdHeader"),
            question_type:values.QuestionType,
            status:1,
           type:values.AnswerType,
            question: values.Question,
            sub_ques:SQ,
            label:Speakername,
            id:EditData.id,
            format:1
          } 
          if(questionUpdated==true) {
            setQuestionUpdated(false)
            setEditData(false)
            ExportApi.orderlistFormPool_Survey_Edit(previewData1).then((resp) => {
              if (resp.ok) {
                setData([])
                loader("hide")
                handleResetSp()
                formik.handleReset()
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
          }else{
            ExportApi.CreateFormPool_Survey(previewData).then((resp) => {
              if (resp.ok) {
                setData([])
                loader("hide")
                handleResetSp()
                formik.handleReset()
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
          }

        }
        else{
          let previewData={
            event_id:localStorage.getItem("EventIdHeader"),
            question_type:values.QuestionType,
            status:1,
           type:values.AnswerType,
            question: values.Question,
            label:Speakername,
            format:1
 
          }  
          let previewData1={
            event_id:localStorage.getItem("EventIdHeader"),
            question_type:values.QuestionType,
            status:1,
           type:values.AnswerType,
            question: values.Question,
            label:Speakername,
            id:EditData.id,
            format:1
          }  
          if(questionUpdated==true) {
          ExportApi.orderlistFormPool_Survey_Edit(previewData1).then((resp) => {
            if (resp.ok) {
                setData([])
              loader("hide")
              setQuestionUpdated(false)
              setEditData(false)
              console.log(resp.data.data)
              listData()
              handleResetSp()
              formik.handleReset()
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
          ExportApi.CreateFormPool_Survey(previewData).then((resp) => {
            if (resp.ok) {
                setData([])
              loader("hide")
              console.log(resp.data.data)
              listData()
              handleResetSp()
              formik.handleReset()
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
        }
      },
    });
 

    useEffect(() => {
      setSpeakerName(Speakername);
    }, [Speakername]);
    const listData=()=>{
      ExportApi.listFormPool_Survey(localStorage.getItem("EventIdHeader"),formik.values.QuestionType,1).then((resp) => {
        if (resp.ok) {
     if(resp.data.message=="No Record Found"){
      setData([])
    }else{
     setData(resp.data.data)
    }
        }
      });
      loader("hide")
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
      loader("show")
      setData([])
      setTimeout(() => { 
        listData()
      }, 1500);
    }, [formik.values.QuestionType]);
    useEffect(() => {
      loader("show")
      setData([])
      setTimeout(() => { 
        listData()
      }, 1500);
    }, [render]);
    useEffect(() => {
        if(props.count!=0){
            console.log("first")
            loader("show")
            setData([])
            setTimeout(() => { 
              listData()
            }, 1500);
        }
    }, [props.count]);
  return (
    <>

<div className="custom-container">
        <div className="top-header">
        <div className="page-title">{
          questionUpdated? <h3>Edit Question </h3>:
        <h3>Create {formik.values.QuestionType} Form</h3>
        }
            </div>
            </div>


            <div className="webinar-modal-data">
              <div className="registration_form">
                <Col className="registration_left">

            <form onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
          <div className="modal-body-content">
            {questionUpdated?null: <div className="form-inline row justify-content-between align-items-center">
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
            </div>}
           
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

                      <option value="checkbox">
                      Checkbox
                      </option>
                      <option value="radio">
                      Radio
                      </option>               
                </select>
                {formik.touched.AnswerType && formik.errors.AnswerType ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.AnswerType}
                  </div>
                ) : null}
              </div>
          <fieldset className="border p-2">
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
                       <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                  fill="#0066BE"
                />
                <path
                  d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                  fill="#0066BE"
                />
                <path
                  d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                  fill="#0066BE"
                />
                <path
                  d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                  fill="#0066BE"
                />
                <path
                  d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                  fill="#0066BE"
                />
                <path
                  d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                  fill="#0066BE"
                />
              </svg>
                    </button>
                  ) : null}
                </div>
              ))}
              <button
             type='button'
                onClick={()=>{  setSpeakerName([...Speakername, { name: "", color: "" }]);
                setSpeakerErr([...SpeakerErr, { name: "", colorCode: "" }]);}}
                // className="speaker-button"
              >
                Add More <span>+</span>
              </button>
            </fieldset>
          
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
                      value={multi.question}
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
                      value={multi.order}
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
 <a
                   href="#"
                   onClick={handleMultiInputAdd1}
                   className="speaker-button"
                 >
                  Add Sub Question <span>+</span>
                 </a>
          </div>
          <div className="modal-footer-btn">
          {/* {questionUpdated?   <Button
              type="reset"
              className="btn btn-primary btn-filled"
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>:
            <Button
              type="reset"
              className="btn btn-primary btn-filled"
              onClick={() => handleResetSp()}
            >
              Reset
            </Button>} */}
            <Button
              type="submit"
              className="event-submit-button btn btn-primary btn-filled"
              // onClick={() => handleSubmit()}
            >
              {questionUpdated?"Update":"Submit"}
            </Button>
          </div>
        </form>
        {/* {  console.log("EditData,",EditData)} */}
</Col>
<Col>
<div className="survey-tab">{Data.length>0?
  <h4> <center>{Data[0]?.event?.title}</center> </h4>:null
}
<div className="Question">
  {/* {console.log(Data)}{<listData/>} */}
  {Data.length>0?
  <Example editDataCallBack={props.editDataCallBack} handleCancel={handleCancel} listData={listData} QuestionType={formik.values.QuestionType} count={2+2} Data={Data}/>:null
}
</div>
</div>
</Col>
</div></div>

            </div>
           
    </>
  )
}

export default Format1