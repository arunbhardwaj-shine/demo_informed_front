import React, { useState } from 'react'
import { useFormik } from "formik";
import { Button,  Col, Form, Modal, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { loader } from '../../../loader';
import ExportApi from '../../../Api/ExportApi';
import { BaseUrlImage } from '../../../Api/BaseApi';
import { useNavigate } from 'react-router-dom';

const Format2 = (props) => {
  let navigate=useNavigate();
    const [TemplateIdActive, setTemplateIdActive] = useState(props.TemplateIdActive);
    const [titleLogo, setTitleLogo] = useState("");
    const [data, setData] = useState();
    const [mode, setMode] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [render, setRender] = useState(1);
    const handleGetRegistrationPageSingleData = () => {
      ExportApi.RegistrationPageSingleData(localStorage.getItem("EditRegistrationPageId")).then((resp) => {
        if (resp.ok&&resp.data.code==200) {
          // console.log(resp.data.data)
            setMode(resp.data.data)
            setRender(render+2)
            // setTemplateIdActive(resp.data.data.format)
            //  console.log(JSON.parse(resp.data.data?.json_data))
            // setData(JSON.parse(resp.data.data?.json_data))
          }
      });
    };
    const uploadImageTitleLogo=(e)=>{
      let file = e;
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
      let formData = new FormData();
  
         formData.append("file", e);
      ExportApi.RegistrationPageUplodImage(formData) .then((resp) => {
        if (resp.ok) {
          let Path=BaseUrlImage+resp.data.data
          setTitleLogo(Path)
          if(Path){
            formik.handleSubmit()
          }
        }
      });
    }
    // console.log(titleLogo)
    const formik = useFormik({
        initialValues: {
          Title1:props.data?.Title1?props.data?.Title1: "",
          Title2:props.data?.Title2?props.data?.Title2: "",
          Title3:props.data?.Title3?props.data?.Title3: "",
          mode:mode?.mode,
          Address:props.data?.Address?props.data?.Address:'',
          eventdate:props.data?.eventdate?props.data?.eventdate:'',
          eventtime:props.data?.eventtime?props.data?.eventtime:'',
          content1:props.data?.content1?props.data?.content1:'',
          content2:props.data?.content2?props.data?.content2:'',
          BodyFootercontent1:props.data?.BodyFootercontent1?props.data?.BodyFootercontent1:'',
          BodyFootercontent2:props.data?.BodyFooterLeftcontent1?props.data?.BodyFooterLeftcontent1:'',
          BodyFootercontent3:props.data?.BodyFooterLeftcontent2?props.data?.BodyFooterLeftcontent2:'',
          RadioButton:props.data?.RadioButton?props.data?.RadioButton:'',
          name:props.data?.name?props.data?.name:"",
          country:props.data?.country?props.data?.country:"",
          titleColor:props.data?.titleColor?props.data?.titleColor:"",
          backgroundColor:props.data?.backgroundColor?props.data?.backgroundColor:"",
          borderColor:props.data?.borderColor?props.data?.borderColor:"",
          textColor:props.data?.textColor?props.data?.textColor:"",
        },

        enableReinitialize: true,
        onSubmit: (values) => {
          // loader("show")
          let jsonData ={
            Title1: values.Title1,
            Title2: values.Title2,
            Title3: values.Title3,
            content1:values.content1,
            content2:values.content2,
            Address:values.Address,
            BodyFootercontent1:values.BodyFootercontent1,
            BodyFooterLeftcontent1:values.BodyFootercontent2,
            BodyFooterLeftcontent2:values.BodyFootercontent3,
            eventdate:values.eventdate,
            eventtime:values.eventtime,
            RadioButton:values.RadioButton,
            name:values.name,
            countryLabel:values.countryLabel,
            country:values.country,
            titleColor :values.titleColor,
            textColor:values.textColor,
            backgroundColor:values.backgroundColor,
            borderColor:values.borderColor,
            titleLogo:titleLogo?titleLogo:props.data?.titleLogo?props.data?.titleLogo:''
          }
          // console.log("titleLogo",titleLogo)
            ExportApi.RegistrationPageUpdate(localStorage.getItem("EditRegistrationPageId"),localStorage.getItem("EventIdHeader"),values.mode, JSON.stringify(jsonData),TemplateIdActive).then((resp) => {
              if (resp.ok) {
                if (resp.data.code == 200) {
                  handleGetRegistrationPageSingleData()
                  // toast.success(resp.data.message)
                  // localStorage.removeItem("EditRegistrationPageId")
                  // localStorage.removeItem("registrationPageId")
                  setData(resp.data.data)
                  // setTimeout(() => {
                  //   navigate("/webinar/portal/Registrations")
                  // }, 1500);
                } else {
                  toast.error(resp.data.message);
                }
                // loader("hide")
              }
            });
          
        },
      });
  return (
   <>
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
       <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
    </div>
    <Row>
            <div className="webinar-modal-data">
              <div className="registration_form">
                <Col onChange={formik.handleSubmit} className="registration_left">
       <form onSubmit={formik.handleSubmit}>
        {/* Middle content */}
        <div className="modal-body-content">
        <div className="reg-middle-div">
        <div className="form-inline row justify-content-between align-items-center">
              <div className="form-group ">
                <label> Title 1</label>
                <Form.Control
                  name="Title1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Title1}
                  type="text"
                  placeholder="Title 1"
                />
            </div>
            <div className="form-group">
                <label> Title 2</label>
                <Form.Control
                  name="Title2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Title2}
                  type="text"
                  placeholder="Title 2"
                />
            </div>
           <div className="form-group">
                <label> Title 3</label>
                <Form.Control
                  name="Title3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Title3}
                  type="text"
                  placeholder="Title 3"
                />
            </div>
              <div className="form-group">
                <label> Title Logo</label>
                <Form.Control
                  name="Headerlogo"
                  onChange={(e)=>{uploadImageTitleLogo(e.target.files[0])}}
                  type="file"
                  placeholder="Header Title Logo"
                />
            </div>
                <div className="form-group">
                      <label>Address</label>
                      <Form.Control
                        name="Address"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Address}
                        className="form-control"
                        placeholder="Address"
                      />
                   </div>
              <div className="form-group">
                <label>Event Date</label>
                <Form.Control
                  name="eventdate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.eventdate}
                  type="text"
                  placeholder="Event Date"
                />
            </div>
              <div className="form-group">
                <label>Event Time</label>
                <Form.Control
                  name="eventtime"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.eventtime}
                  type="text"
                  placeholder="Event Time"
                />
            </div>
              <div className="form-group">
              <label>Content 1</label>
              <textarea
                name="content1"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content1}
                className="form-control"
                placeholder="Content 1"
              />
           </div>
         
              <div className="form-group">
              <label>Content 2</label>
              <Form.Control
                name="content2"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content2}
                className="form-control"
                placeholder="Content 2"
              />
           </div>
           <div className="form-group">
                        <label>Radio Button Title</label>
                       
                        <Form.Control
                          name="RadioButton"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.RadioButton}
                          type="text"
                        />
                      </div>
                  
                      <fieldset>
    <legend>Footer:</legend>
              <div className="form-group">
              <label>Content </label>
              <textarea
                name="BodyFootercontent1"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.BodyFootercontent1}
                className="form-control"
              />
           </div>
              <div className="form-group">
              <label>Left Content 1</label>
              <Form.Control
                name="BodyFootercontent2"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.BodyFootercontent2}
                className="form-control"
                id="exampleFormControlTextarea1"
              />
           </div>
              <div className="form-group">
              <label>Left Content 2</label>
              <Form.Control
                name="BodyFootercontent3"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.BodyFootercontent3}
                className="form-control"
                id="exampleFormControlTextarea1"
              />
           </div> 
              
         </fieldset>
        {/* end of middle content*/}
        

        {/* right sidebar */}
        <div className="reg-center-checkbox">
        {/* fields content */}
        <div className="reg-fields-div">
        <div className="email-result">
        <div className={"reg-fields-div-block"}>
                      <div className="mail-box-content">
                      <div className="mail-box-content-top">
                        <div className="mail-box-content-top-view">
                          <h5>{"Fields"}</h5>
              <div className="form-group">
                <label>Name</label>
                <div className="form-inline-option">
                <div className="form-check">
                <Form.Control
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  checked={formik.values.name}
                  type="checkbox"
                />
              </div>
              </div>
            </div>
              <div className="form-group">
                <label>Country</label>
                <div className="form-check">
                <Form.Control
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  checked={formik.values.country}
                  type="checkbox"
                />
                </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>
        {/* end of fields content */}
        
        {/* color div content */}
        <div  className="reg-fields-div">
        <div className="email-result">
        <div className={"reg-fields-div-block"}>
                    <div className="mail-box-content">
                      <div className="mail-box-content-top">
                        <div className="mail-box-content-top-view">
                          <h5>{"Color"}</h5>
                      <div className="form-group">
                      <label>Title</label>
                      <Form.Control
                      name='titleColor'
                       type="color"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.titleColor}
                       title="Choose your color"
	                   />
                   </div>
                      <div className="form-group">
                      <label>Text</label>
                      <Form.Control
                      name='textColor'
                       type="color"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.textColor}
                       title="Choose your color"
	                   />
                   </div>
                      <div className="form-group">
                      <label >Background</label>
                      <Form.Control
                      name='backgroundColor'
                       type="color"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.backgroundColor}
                       title="Choose your color"
	                   />
                   </div>
                      <div className="form-group">
                      <label >Border</label>
                      <Form.Control
                      name='borderColor'
                       type="color"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.borderColor}
                       title="Choose your color"
	                   />
                   </div>
                   </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
        {/* end of color div content */}
        </div>
        </div>
        </div>
        </div>
        {/* end of right sidebar */}    
        </form>
        </Col>
        <Col>
        <div className="login-wrapper" style={{backgroundColor:formik.values.backgroundColor, border:"2px solid "+formik.values.borderColor}}>
      <div className="login-wrapper-inside" >
                  <div className="log-inner">
                     <div className="head-sec">
                        <h2 className="top-title"style={{color:formik?.values?.titleColor}} >
                        {formik?.values?.Title1}                       </h2>                           <div className="motivate_logo"><img id="imgVieww" src={props?.data?.titleLogo?props?.data?.titleLogo:""} alt="Logo" style={{width:"250px"}}/></div>
                         <h2 className="top-title-green" style={{color:formik?.values?.titleColor}}>{formik?.values?.Title2}</h2>
                         <h2 className="top-title-green" style={{color:formik?.values?.titleColor}}>{formik?.values?.Title3}</h2>
                        <div className="mid-section" style={{color:formik?.values?.textColor}}>
                           <div className="mid-section-center">
                                {/* <p>{formik?.values?.Speakername}</p> */}
                                <p>{formik?.values?.eventdate}</p>
                               <p>{formik?.values?.eventtime}</p>
                               <p>{formik?.values?.Address}</p>
                        </div>
                        </div>
                        <hr style={{color:formik?.values?.titleColor}} size={10}/>
                        <div className="head-sec-boxes" style={{color:formik?.values?.textColor}}>
                           <div className="boxes-col-center">
                              <p id="uppper_text" className="boldText"> 
                               {formik?.values?.content1}<br /><br/>
                               {formik?.values?.content2}<br/>
                               </p>
                            </div>
                        </div>
                     <div id="log-tabs">
                        <div className="" id="nav-profile">
                           <div className="login-from newaccount">
                              <form id="hcp-form">
                               <div>
                                 <div className="form-group">
                                    <div className="radio">
                                       <div className="form-group Consent">
                                          <div className="form-group-left">
                                             <input type="checkbox"  id="fullconsent1" value="option1" name="fullconsent"/>
                                             <label htmlFor="fullconsent1"  id="consent-label">{formik?.values?.RadioButton}</label>  
                                             <input type="hidden" className="fl_cnt_val" value="Full consent*"/>                 
                                             {/* <a href="javascript:;" className="change-btn">Change</a> */}
                                             {/* <div className="options">
                                                <p>I consent to</p>
                                                <a href="javascript:;" className="slec_op" id="close_consent"style={{float:"right"}}>Done</a>
                                              </div>*/}
                                             </div> 
                                          </div>
                                       </div>
                                         <div className="form-group-align">
                                          <br/>
                                          {formik?.values?.country==true?<div className="radio">
                                             <p>
                                                <label>
                                                Country</label> 
                                                <select className="country-list position-dropdown mobile-drop" name="country" id="country" style={{margin:"-31px 0px 0px 18px"}}>
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
                                                </select>
                                             </p>
                                          </div>:null}
                                          
                                       </div>
                                                                              
                                    </div>
                                 </div>{
                                  formik?.values?.name?<div className="form-group position-relative">
                                  <input type="text" className="form-control" name="name" id="name" value="" placeholder="Name" />
                               </div>:null
                                 }                     
                                          <div className="form-group position-relativee">
                                            <input type="text" className="form-control" name="email" id="email" value="" placeholder="Email" />
                                          </div>
                                           <button className="sumit-btn" type="submit" id="signup_submit">Submit</button> 
                                          </form>
                                          <div className='FooterContent'>
                                               <p>{formik?.values?.BodyFootercontent1}</p>
                                               <br/>
                                               <br/>
                                               <Row>
                                                <Col>
                                                <div style={{textAlign:"left"}}>
                                                  <p>{formik?.values?.BodyFootercontent2}</p>
                                                  <p>{formik?.values?.BodyFootercontent3}</p>
                                                </div>
                                                </Col>
                                                <Col>
                                                <div style={{textAlign:"right"}}>
                                                  <a href="">Privacy policy</a>
                                                  <img style={{width:"170px"}} src="https://webinar.docintel.app/EAHAD2022/images/Octapharma_blue.png"/>
                                                  </div>
                                                </Col>
                                               </Row>
                                          </div>
                                          </div>
                                          </div>
                           </div>
                     </div>
                        </div>
                     </div>
         </div>
         
                </Col>
        </div>
        </div>
        
        </Row>
        <Modal
        show={modalShow}
        id="webinar_event"
        onHide={() => {
          setModalShow(false);
        }}
      >
        <Modal.Header closeButton>
          <h4>Preview Page </h4>
        </Modal.Header>
        <Modal.Body>
        <iframe src={`${BaseUrlImage}/SH2022/index${data?.format?data?.format:props?.mode?.format}.php?event=${data?.event.code?data?.event.code:props?.mode?.event?.code}&mode=${
                data?.mode?data?.mode:props?.mode?.mode
              }`}></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              // setModalShow1(false);
              setModalShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
   
   </>
  )
}

export default Format2