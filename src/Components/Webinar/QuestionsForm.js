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
    const [Hading, setHading] = useState();
    const [Data, setData] = useState([]);
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
        SubQuestion:SQ,
        QuestionOrder :"",
        QuestionType:"Survey",
        labelQuestion:Speakername,
        eventid:localStorage.getItem("EventIdHeader")

      },
  
      validationSchema: Yup.object({
        Speakername: Yup.string()
          .required("Speaker name is required"),
          Question: Yup.string().required("This field is required"),
          // Hading: Yup.string().required("Hading is required"),
  
          AnswerType: Yup.string().required("Answer Type is required"),
          QuestionOrder: Yup.string().required("This field is required."),
        // Bu: Yup.string().required("Bu is required"),
  
        // event_date: Yup.string().required("Event date is required"),
        // Description: Yup.string().required("Description is required"),
      }),
      onSubmit: (values) => {
         let previewData={
          Heading :Hading,
          Speakername: values.Speakername,
          Question: values.Question,
          AnswerType:values.AnswerType,
          SubQuestion:SQ,
          QuestionOrder :values.QuestionOrder,
          QuestionType:values.QuestionType,
          labelQuestion:Speakername,
          eventid:localStorage.getItem("EventIdHeader")
         }
        //  speaker:sdsdsdsds
        //  event_id:352
        //  question_type:poll
        //  status:1
        //  question:sdsdsdsdsdsds
        //  parent_id:0
        //  type:sdsdsdsd
        //  label:sdsdssdas
        //  color_code:asasasa
        //  order_of_question:2
         
         
           console.log(SQ)
            setData([...Data, previewData])
           console.log(Data);
           console.log(Speakername);
            // setMassage(false);
       
     
  
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
                     <option value="Pool">
                     Pool
                      </option>               
                </select>
              </div>
              <div className="form-group col-6 col-md-7">
                <label htmlFor="exampleInputEmail1">
                Heading <span>*</span>
                </label>
                <input
                  name="Hading"
                  placeholder="Heading"
                  onChange={(e)=>setHading(e.target.value)}
                 value={Hading}
                />
                {formik.touched.Hading && formik.errors.Hading ? (
                  <div className="error" style={{ color: "red" }}>
                    {formik.errors.Hading}
                  </div>
                ) : null}
              </div>
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
<div>
  <h4> <center>{Hading}</center> </h4>
<div className="Question">
  {/* {console.log(Data)} */}
{Data?.map((val,i)=>{
    return <div Key={i}>
      <div className="row">
      {/* {console.log(val.SubQuestion)} */}
      </div>
       <h6>{i+1 +" . "}{val.Question}</h6>
       {val.AnswerType=="textarea"?<textarea></textarea>:
       val.AnswerType=="text"?
       <input type="text"/>:null}{val.AnswerType=="checkbox"?<div>
       {val.SubQuestion?.map((data)=>{
         return<>
    <h6>{data.SubQuestion}</h6>
       { val.labelQuestion?.map((item,index)=>{
       return  <div key={index}> 
        <label htmlFor="exampleInputEmail1">{item.name} </label> 
        <input name={"name"+index} type="checkbox"/>  </div>
       })}
      </>  
       })}
      </div>:null}
       
       {val.AnswerType=="radio"?<div>
        <div>{val.SubQuestion>0?val.SubQuestion?.map((data)=>{
        //  alert(data.SubQuestion)
        return<>
        <h6>{data.SubQuestion}</h6>
           {val.labelQuestion.map((item,index)=>{
        // console.log(item)
       return <>
         <label htmlFor="exampleInputEmail1">{item.name} </label> 
        <input name={"item.name"+index} type="radio"/> 
       </>
      })}
           </>
          }):<> { val.labelQuestion?.map((item,index)=>{
            return  <div key={index}> 
             <label htmlFor="exampleInputEmail1">{item.name} </label> 
             <input name={"name"+index} type="checkbox"/>  </div>
            })}</>} </div></div>:null}
        {
       val.AnswerType=="date"?
       <input type="date"/>:null}
        {
       val.AnswerType=="Country"?
       <select className="country-list position-dropdown mobile-drop" name="country" id="country">
                                                   <option value="">Select State</option> 
                                                  
                                                      <option value="1">Afghanistan</option>
                                                   
                                                      <option value="2">Albania</option>
                                                   
                                                      <option value="3">Algeria</option>
                                                   
                                                      <option value="4">American Samoa</option>
                                                   
                                                      <option value="5">Andorra</option>
                                                   
                                                      <option value="6">Angola</option>
                                                   
                                                      <option value="7">Anguilla</option>
                                                   
                                                      <option value="8">Antarctica</option>
                                                   
                                                      <option value="9">Antigua and Barbuda</option>
                                                   
                                                      <option value="10">Argentina</option>
                                                   
                                                      <option value="11">Armenia</option>
                                                   
                                                      <option value="12">Aruba</option>
                                                   
                                                      <option value="13">Australia</option>
                                                   
                                                      <option value="14">Austria</option>
                                                   
                                                      <option value="15">Azerbaijan</option>
                                                   
                                                      <option value="16">Bahamas</option>
                                                   
                                                      <option value="17">Bahrain</option>
                                                   
                                                      <option value="18">Bangladesh</option>
                                                   
                                                      <option value="19">Barbados</option>
                                                   
                                                      <option value="20">Belarus</option>
                                                   
                                                      <option value="21">Belgium</option>
                                                   
                                                      <option value="22">Belize</option>
                                                   
                                                      <option value="23">Benin</option>
                                                   
                                                      <option value="24">Bermuda</option>
                                                   
                                                      <option value="25">Bhutan</option>
                                                   
                                                      <option value="26">Bolivia</option>
                                                   
                                                      <option value="27">Bosnia and Herzegovina</option>
                                                   
                                                      <option value="28">Botswana</option>
                                                   
                                                      <option value="29">Bouvet Island</option>
                                                   
                                                      <option value="30">Brazil</option>
                                                   
                                                      <option value="31">British Indian Ocean Territory</option>
                                                   
                                                      <option value="32">British Virgin Islands</option>
                                                   
                                                      <option value="33">Brunei Darussalam</option>
                                                   
                                                      <option value="34">Bulgaria</option>
                                                   
                                                      <option value="35">Burkina Faso</option>
                                                   
                                                      <option value="36">Burundi</option>
                                                   
                                                      <option value="37">Cambodia</option>
                                                   
                                                      <option value="38">Cameroon</option>
                                                   
                                                      <option value="39">Canada</option>
                                                   
                                                      <option value="40">Cape Verde</option>
                                                   
                                                      <option value="41">Cayman Islands</option>
                                                   
                                                      <option value="42">Central African Republic</option>
                                                   
                                                      <option value="43">Chad</option>
                                                   
                                                      <option value="44">Chile</option>
                                                   
                                                      <option value="45">China</option>
                                                   
                                                      <option value="46">Christmas Island</option>
                                                   
                                                      <option value="47">Cocos</option>
                                                   
                                                      <option value="48">Colombia</option>
                                                   
                                                      <option value="49">Comoros</option>
                                                   
                                                      <option value="50">Congo</option>
                                                   
                                                      <option value="51">Congo</option>
                                                   
                                                      <option value="52">Cook Islands</option>
                                                   
                                                      <option value="53">Costa Rica</option>
                                                   
                                                      <option value="54">Cote D'Ivoire</option>
                                                   
                                                      <option value="55">Cuba</option>
                                                   
                                                      <option value="56">Cyprus</option>
                                                   
                                                      <option value="57">Czech Republic</option>
                                                   
                                                      <option value="58">Denmark</option>
                                                   
                                                      <option value="59">Djibouti</option>
                                                   
                                                      <option value="60">Dominica</option>
                                                   
                                                      <option value="61">Dominican Republic</option>
                                                   
                                                      <option value="62">Ecuador</option>
                                                   
                                                      <option value="63">Egypt</option>
                                                   
                                                      <option value="64">El Salvador</option>
                                                   
                                                      <option value="65">Equatorial Guinea</option>
                                                   
                                                      <option value="66">Eritrea</option>
                                                   
                                                      <option value="67">Estonia</option>
                                                   
                                                      <option value="68">Ethiopia</option>
                                                   
                                                      <option value="69">Faeroe Islands</option>
                                                   
                                                      <option value="70">Falkland Islands</option>
                                                   
                                                      <option value="71">Fiji</option>
                                                   
                                                      <option value="72">Finland</option>
                                                   
                                                      <option value="73">France</option>
                                                   
                                                      <option value="74">French Guiana</option>
                                                   
                                                      <option value="75">French Polynesia</option>
                                                   
                                                      <option value="76">French Southern Territories</option>
                                                   
                                                      <option value="77">Gabon</option>
                                                   
                                                      <option value="78">Gambia</option>
                                                   
                                                      <option value="79">Georgia</option>
                                                   
                                                      <option value="80">Germany</option>
                                                   
                                                      <option value="81">Ghana</option>
                                                   
                                                      <option value="82">Gibraltar</option>
                                                   
                                                      <option value="83">Greece</option>
                                                   
                                                      <option value="84">Greenland</option>
                                                   
                                                      <option value="85">Grenada</option>
                                                   
                                                      <option value="86">Guadaloupe</option>
                                                   
                                                      <option value="87">Guam</option>
                                                   
                                                      <option value="88">Guatemala</option>
                                                   
                                                      <option value="89">Guinea</option>
                                                   
                                                      <option value="90">Guinea-Bissau</option>
                                                   
                                                      <option value="91">Guyana</option>
                                                   
                                                      <option value="92">Haiti</option>
                                                   
                                                      <option value="93">Heard and McDonald Islands</option>
                                                   
                                                      <option value="94">Holy See</option>
                                                   
                                                      <option value="95">Honduras</option>
                                                   
                                                      <option value="96">Hong Kong</option>
                                                   
                                                      <option value="97">Hrvatska</option>
                                                   
                                                      <option value="98">Hungary</option>
                                                   
                                                      <option value="99">Iceland</option>
                                                   
                                                      <option value="100">India</option>
                                                   
                                                      <option value="101">Indonesia</option>
                                                   
                                                      <option value="102">Iran</option>
                                                   
                                                      <option value="103">Iraq</option>
                                                   
                                                      <option value="104">Ireland</option>
                                                   
                                                      <option value="105">Israel</option>
                                                   
                                                      <option value="106">Italy</option>
                                                   
                                                      <option value="107">Jamaica</option>
                                                   
                                                      <option value="108">Japan</option>
                                                   
                                                      <option value="109">Jordan</option>
                                                   
                                                      <option value="110">Kazakhstan</option>
                                                   
                                                      <option value="111">Kenya</option>
                                                   
                                                      <option value="112">Kiribati</option>
                                                   
                                                      <option value="113">Korea</option>
                                                   
                                                      <option value="114">Korea</option>
                                                   
                                                      <option value="115">Kuwait</option>
                                                   
                                                      <option value="116">Kyrgyz Republic</option>
                                                   
                                                      <option value="117">Lao People's Democratic Republic</option>
                                                   
                                                      <option value="118">Latvia</option>
                                                   
                                                      <option value="119">Lebanon</option>
                                                   
                                                      <option value="120">Lesotho</option>
                                                   
                                                      <option value="121">Liberia</option>
                                                   
                                                      <option value="122">Libyan Arab Jamahiriya</option>
                                                   
                                                      <option value="123">Liechtenstein</option>
                                                   
                                                      <option value="124">Lithuania</option>
                                                   
                                                      <option value="125">Luxembourg</option>
                                                   
                                                      <option value="126">Macao</option>
                                                   
                                                      <option value="127">Macedonia</option>
                                                   
                                                      <option value="128">Madagascar</option>
                                                   
                                                      <option value="129">Malawi</option>
                                                   
                                                      <option value="130">Malaysia</option>
                                                   
                                                      <option value="131">Maldives</option>
                                                   
                                                      <option value="132">Mali</option>
                                                   
                                                      <option value="133">Malta</option>
                                                   
                                                      <option value="134">Marshall Islands</option>
                                                   
                                                      <option value="135">Martinique</option>
                                                   
                                                      <option value="136">Mauritania</option>
                                                   
                                                      <option value="137">Mauritius</option>
                                                   
                                                      <option value="138">Mayotte</option>
                                                   
                                                      <option value="139">Mexico</option>
                                                   
                                                      <option value="140">Micronesia</option>
                                                   
                                                      <option value="141">Moldova</option>
                                                   
                                                      <option value="142">Monaco</option>
                                                   
                                                      <option value="143">Mongolia</option>
                                                   
                                                      <option value="144">Montserrat</option>
                                                   
                                                      <option value="145">Morocco</option>
                                                   
                                                      <option value="146">Mozambique</option>
                                                   
                                                      <option value="147">Myanmar</option>
                                                   
                                                      <option value="148">Namibia</option>
                                                   
                                                      <option value="149">Nauru</option>
                                                   
                                                      <option value="150">Nepal</option>
                                                   
                                                      <option value="151">Netherlands Antilles</option>
                                                   
                                                      <option value="152">Netherlands</option>
                                                   
                                                      <option value="153">New Caledonia</option>
                                                   
                                                      <option value="154">New Zealand</option>
                                                   
                                                      <option value="155">Nicaragua</option>
                                                   
                                                      <option value="156">Niger</option>
                                                   
                                                      <option value="157">Nigeria</option>
                                                   
                                                      <option value="158">Niue</option>
                                                   
                                                      <option value="159">Norfolk Island</option>
                                                   
                                                      <option value="160">Northern Mariana Islands</option>
                                                   
                                                      <option value="161">Norway</option>
                                                   
                                                      <option value="162">Oman</option>
                                                   
                                                      <option value="163">Pakistan</option>
                                                   
                                                      <option value="164">Palau</option>
                                                   
                                                      <option value="165">Palestinian Territory</option>
                                                   
                                                      <option value="166">Panama</option>
                                                   
                                                      <option value="167">Papua New Guinea</option>
                                                   
                                                      <option value="168">Paraguay</option>
                                                   
                                                      <option value="169">Peru</option>
                                                   
                                                      <option value="170">Philippines</option>
                                                   
                                                      <option value="171">Pitcairn Island</option>
                                                   
                                                      <option value="172">Poland</option>
                                                   
                                                      <option value="173">Portugal</option>
                                                   
                                                      <option value="174">Puerto Rico</option>
                                                   
                                                      <option value="175">Qatar</option>
                                                   
                                                      <option value="176">Reunion</option>
                                                   
                                                      <option value="177">Romania</option>
                                                   
                                                      <option value="178">Russian Federation</option>
                                                   
                                                      <option value="179">Rwanda</option>
                                                   
                                                      <option value="180">St. Helena</option>
                                                   
                                                      <option value="181">St. Kitts and Nevis</option>
                                                   
                                                      <option value="182">St. Lucia</option>
                                                   
                                                      <option value="183">St. Pierre and Miquelon</option>
                                                   
                                                      <option value="184">St. Vincent and the Grenadines</option>
                                                   
                                                      <option value="185">Samoa</option>
                                                   
                                                      <option value="186">San Marino</option>
                                                   
                                                      <option value="187">Sao Tome and Principe</option>
                                                   
                                                      <option value="188">Saudi Arabia</option>
                                                   
                                                      <option value="189">Senegal</option>
                                                   
                                                      <option value="190">Serbia and Montenegro</option>
                                                   
                                                      <option value="191">Seychelles</option>
                                                   
                                                      <option value="192">Sierra Leone</option>
                                                   
                                                      <option value="193">Singapore</option>
                                                   
                                                      <option value="194">Slovakia</option>
                                                   
                                                      <option value="195">Slovenia</option>
                                                   
                                                      <option value="196">Solomon Islands</option>
                                                   
                                                      <option value="197">Somalia</option>
                                                   
                                                      <option value="198">South Africa</option>
                                                   
                                                      <option value="199">South Georgia and the South Sandwich Islands</option>
                                                   
                                                      <option value="200">Spain</option>
                                                   
                                                      <option value="201">Sri Lanka</option>
                                                   
                                                      <option value="202">Sudan</option>
                                                   
                                                      <option value="203">Suriname</option>
                                                   
                                                      <option value="204">Svalbard & Jan Mayen Islands</option>
                                                   
                                                      <option value="205">Swaziland</option>
                                                   
                                                      <option value="206">Sweden</option>
                                                   
                                                      <option value="207">Switzerland</option>
                                                   
                                                      <option value="208">Syrian Arab Republic</option>
                                                   
                                                      <option value="209">Taiwan</option>
                                                   
                                                      <option value="210">Tajikistan</option>
                                                   
                                                      <option value="211">Tanzania</option>
                                                   
                                                      <option value="212">Thailand</option>
                                                   
                                                      <option value="213">Timor-Leste</option>
                                                   
                                                      <option value="214">Togo</option>
                                                   
                                                      <option value="215">Tokelau</option>
                                                   
                                                      <option value="216">Tonga</option>
                                                   
                                                      <option value="217">Trinidad and Tobago</option>
                                                   
                                                      <option value="218">Tunisia</option>
                                                   
                                                      <option value="219">Turkey</option>
                                                   
                                                      <option value="220">Turkmenistan</option>
                                                   
                                                      <option value="221">Turks and Caicos Islands</option>
                                                   
                                                      <option value="222">Tuvalu</option>
                                                   
                                                      <option value="223">US Virgin Islands</option>
                                                   
                                                      <option value="224">Uganda</option>
                                                   
                                                      <option value="225">Ukraine</option>
                                                   
                                                      <option value="226">United Arab Emirates</option>
                                                   
                                                      <option value="227">United Kingdom of Great Britain & N. Ireland</option>
                                                   
                                                      <option value="228">United States Minor Outlying Islands</option>
                                                   
                                                      <option value="229">United States of America</option>
                                                   
                                                      <option value="230">Uruguay</option>
                                                   
                                                      <option value="231">Uzbekistan</option>
                                                   
                                                      <option value="232">Vanuatu</option>
                                                   
                                                      <option value="233">Venezuela</option>
                                                   
                                                      <option value="234">Viet Nam</option>
                                                   
                                                      <option value="235">Wallis and Futuna Islands</option>
                                                   
                                                      <option value="236">Western Sahara</option>
                                                   
                                                      <option value="237">Yemen</option>
                                                   
                                                      <option value="238">Zambia</option>
                                                   
                                                      <option value="239">Zimbabwe</option>
                                                </select>:null}
    </div>
})}
</div>
</div>
</Col>
</div></div>

            </div>
            
    </div>
  )
}

export default QuestionsForm
