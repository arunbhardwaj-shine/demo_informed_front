import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import ExportApi from '../../Api/ExportApi';
// import './App.css';
 
const Example = (props) => {
  // console.log("props",props)
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState(props.Data);
  const [list1, setList1] = useState(1);
 
  const dragStart = (e, position) => {
    dragItem.current = position;
    // console.log(e.target.innerHTML);
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    setList1(list1+2)
  
  };
 
  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
    ExportApi.orderlistFormPool_Survey(copyListItems).then((resp) => {
                  if (resp.ok) {
                   console.log(resp.data.data)
                    // this.setState({ items: resp.data.data })
                  }
                });

  };
  function deleteQuestion(id,i) {
    ExportApi.deletelistFormPool_Survey(id).then((resp) => {
      if (resp.ok) {
        toast.success(resp.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // console.log(this.props)
       list.splice(i,1)
       setList1(list1+23)
       setList(list)
      }
    })
  }
  return (
    <>
    {
    list &&
    list.map((item, index) => (
      <div 
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragEnd={drop}
        key={index}
        draggable>
           <div>
      <div className="question">
      {/* {console.log(item)} */}
       <h6 >{index+1 +" . "}{item.question}</h6>
      </div>
       <button
       onClick={()=>{deleteQuestion(item.id,index)}}
              className="btn btn-outline-primary">
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
       {item.type=="textarea"?<textarea></textarea>:
       item.type=="text"?
       <input type="text"/>:null}
       {item.sub_ques==null?<>   { item.label?.map((item,index)=>{
       return  <div className='question-lab' key={index}> 
        <label htmlFor="exampleInputEmail1">{item.name}</label> 
        <input name={"name"+index} type="checkbox"/> 
         </div>
       })}</>:<>
       
       {item.type=="checkbox"?<div>
        { item.label?.map((item,index)=>{
       return  <div className='green' key={index}> 
        <label htmlFor="exampleInputEmail1">{item.name} </label> 
       
        {/* <input name={"name"+index} type="checkbox"/>  */}
         </div>
       })}
        <br/>
       
       {item.sub_ques?.map((data)=>{
        // console.log("data",data)
         return<>
        
         <div className='SubQue'>

    <h6 className='question'>{data.question}</h6>
       { item.label?.map((item,index)=>{
       return  <div style={{float:"right"}} key={index}> 
        {/* <label htmlFor="exampleInputEmail1">{item.name} </label>  */}
        <input name={"name"+index} type="checkbox"/></div>
       })}
         </div>
      </>  
       })}
      </div>:null}
       
       {item.type=="radio"?<div>
       { item.label?.map((item,index)=>{
       return  <div key={index}> 
        <label htmlFor="exampleInputEmail1">{item.name} </label> 
        {/* <input name={"name"+index} type="checkbox"/>  */}
         </div>
       })}
        <div>{item.sub_ques>0?item.sub_ques?.map((data)=>{
        //  alert(data.SubQuestion)
        return<>
        <h6>{data.question}</h6>

           {item.label.map((item,index)=>{
        // console.log(item)
       return <>
         {/* <label htmlFor="exampleInputEmail1">{item.name} </label>  */}
        <input name={"item.name"+index} type="radio"/> 
       </>
      })}
           </>
          }):<> { item.label?.map((item,index)=>{
            return  <div className='question'  key={index}> 
             <label htmlFor="exampleInputEmail1">{item.name}</label> 
             <input name={"name"+index} type="checkbox"/>  </div>
            })}</>} </div></div>:null}
       </>}

        {
       item.type=="date"?
       <input type="date"/>:null}
        {
       item.type=="Country"?
       <select className="question-select" >
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
      </div>
      ))}
     { console.log(list)}
    </>
  );
};
export default Example;