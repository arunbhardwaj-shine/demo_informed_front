import React, { useEffect, useState } from 'react'
import Example from '../DrangAndDrop';
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loader } from '../../../loader';
import ExportApi from '../../../Api/ExportApi';

const Format2 = () => {
    let path_imagee = process.env.REACT_APP_ASSETS_PATH_WEBINAR;
    const [EditData, setEditData] = useState(false);
    const [questionUpdated, setQuestionUpdated] = useState(false);
    const [Data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const editDataCallBack=(data)=>{
      setQuestionUpdated(true)
  setShow(true)
      setEditData(data)
    }


   
      const handleCancel = () => {
        // setRerender(render+1)
        setEditData(false)
        setQuestionUpdated(false)
       setShow(false)
        // setRerender(render+1)
      };
    
      const formik = useFormik({
        initialValues: {
          Question: EditData ? EditData.question:"",
          AnswerType:EditData ? EditData.type:"text",
          QuestionType:EditData ? EditData.question_type:"Survey",
          eventid:localStorage.getItem("EventIdHeader")
        },
    
        validationSchema: Yup.object({
            Question: Yup.string().required("This field is required"),
            AnswerType: Yup.string().required("Answer Type is required"),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
          loader("show")
        if(values.AnswerType=="text"||values.AnswerType=="Country"||values.AnswerType=="textarea"){
            let previewData={
              event_id:localStorage.getItem("EventIdHeader"),
              question_type:values.QuestionType,
              status:1,
             type:values.AnswerType,
              question: values.Question, 
              format:2
            }  
            let previewData1={
              event_id:localStorage.getItem("EventIdHeader"),
              question_type:values.QuestionType,
              status:1,
             type:values.AnswerType,
              question: values.Question,
              id:EditData.id ,
              format:2
            }  
            if(questionUpdated==true) {
            ExportApi.orderlistFormPool_Survey_Edit(previewData1).then((resp) => {
              if (resp.ok) {
                setData([])
                setShow(false)
                  loader("hide")
                setQuestionUpdated(false)
                setEditData(false)
                console.log(resp.data)
                listData()

                formik.handleReset()
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
                console.log(resp.data)
                listData()
                formik.handleReset()
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
   
      const listData=()=>{

        ExportApi.listFormPool_Survey(localStorage.getItem("EventIdHeader"),formik.values.QuestionType,2).then((resp) => {
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
   


  return (
    <div>
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
                      <option value="text">
                      Text
                      </option>
                      <option value="textarea">
                      Textarea
                      </option>  
                      <option value="Country">
                      Country
                      </option>            
                </select>
                {formik.touched.AnswerType && formik.errors.AnswerType ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.AnswerType}
                  </div>
                ) : null}
              </div>          
 
          </div>
          <div className="modal-footer-btn">
          {questionUpdated?   <Button
              type="reset"
              className="btn btn-primary btn-filled"
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>:
            <Button
              type="reset"
              className="btn btn-primary btn-filled"
            >
              Reset
            </Button>}
         
            <Button
              type="submit"
              className="event-submit-button btn btn-primary btn-filled"
            >
              {questionUpdated?"Update":"Submit"}
            </Button>
          </div>
        </form>
</Col>
<Col>
<div className="survey-tab">{Data.length>0?
  <h4> <center>{Data[0]?.event?.title}</center> </h4>:null
}
<div className="Question">
  {Data.length>0?
  <Example editDataCallBack={editDataCallBack} handleCancel={handleCancel} listData={listData} QuestionType={formik.values.QuestionType} count={2+2} Data={Data}/>:null
}
</div>
</div>
</Col>
        </div></div>

            </div>
            <Modal
        id="webinar_event"
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          {" "}
          <h4>Edit Question</h4>
        </Modal.Header>
        <Modal.Body>
     
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
                      <option value="text">
                      Text
                      </option>
                      <option value="textarea">
                      Textarea
                      </option>  
                      <option value="Country">
                      Country
                      </option>            
                </select>
                {formik.touched.AnswerType && formik.errors.AnswerType ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.AnswerType}
                  </div>
                ) : null}
              </div>          
 
          </div>
          <div className="modal-footer-btn">
          {questionUpdated?   <Button
              type="reset"
              className="btn btn-primary btn-filled"
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>:
            <Button
              type="reset"
              className="btn btn-primary btn-filled"
            >
              Reset
            </Button>}
         
            <Button
              type="submit"
              className="event-submit-button btn btn-primary btn-filled"
            >
              {questionUpdated?"Update":"Submit"}
            </Button>
          </div>
        </form>
        </Modal.Body>
      </Modal>
            
    </div>
  )
}

export default Format2