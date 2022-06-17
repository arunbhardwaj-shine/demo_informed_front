import React,{useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {  useParams } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ExportApi from "../../../Api/ExportApi";
import { Button, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { loader } from "../../../loader";
const SmartListUsers = () => {
	const [data , setData]=useState()
	const [dataCopy , setDataCopy]=useState()
	const [editable , setEditable]=useState(false)
	const [editShow , setEditShow]=useState(false)
	const [desktop , setDesktop]=useState(true)
	const [mobile , setMobile]=useState(false)
	const [template , setTemplate]=useState()
	const [deleteid , setdeleteid]=useState(false)
	const [modalShow1, setModalShow1] = useState(false);
	let navigate = useNavigate();
	let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
	let parms=useParams()
	const handleGetSmartListSingleRecord = (id) => {
		  ExportApi.GetSmartListSingleRecord(id).then((resp) => {
			if (resp.ok) {
			//  console.log(resp.data.data)
			 setData(resp.data.data)
			
			}
		  });
	  };
	  const handleGetTemplate = () => {
		console.log(localStorage.getItem("TEMPLATEID"))
		ExportApi.UserTemplate(localStorage.getItem("TEMPLATEID")).then((resp) => {
		  if (resp.ok) {

			// console.log(resp.data.data.description);
			document.getElementById("one").innerHTML = resp.data.data.description;  
			loader("hide");          
		  }
		});
	  };
	  const handleSendMail = () => {

		ExportApi.sandAllmaik(localStorage.getItem("collection_id")).then((resp) => {
		  if (resp.ok) {
			 console.log(resp.data)  
			 if (resp.data.code == 200) {
				toast.success(resp.data.message,{
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				  });
				  setTimeout(() => {
					navigate("/webinar/email/emails");
				  }, 2000);
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
		});
	  };
	  const handleEditText = (e,index,idd) => {
        let obj={
			id:"",
			name:"",
			email:"",
			country:"",
			hospital:"",
			profession:"",
			interest:"",
			consent:"",
		}
	 const { id} = e.target;
	console.log(id)
    if (id === `PersonName${index}`) {
		obj.id=idd
		obj.name = document.getElementById(
		id
	  ).innerText;
     }
	 else if (id === `Profession${index}`) {
      obj.participants.profession =document.getElementById(
		"Profession" + index
	  ).innerText;
	}

setDataCopy([obj])
	  };
	  const UpdateSmartList=()=>{
		ExportApi.UpdateSmartListData(parms.id,JSON.stringify(dataCopy)).then((resp) => {
			if (resp.ok) {
				if (resp.data.code == 200) {
					toast.success(resp.data.message,{
						position: "top-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					  });
				  }
			  handleGetSmartListSingleRecord(parms.id)
			  setEditShow(false)
			  setdeleteid(false)
			}
		  });
	  }
	  const DeleteSmartList=(id,i)=>{
		setdeleteid(id)
		let CopyData=data
		CopyData.splice(i,1)
		ExportApi.DeleteSmartListData(JSON.parse(parms.id),id).then((resp) => {
			if (resp.ok) {
			  console.log(resp.data)
			  if (resp.data.code == 200) {
				toast.success(resp.data.message,{
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				  });
				  setdeleteid(false)
			  }
			  setData(CopyData)
			}
		  });
	  }
	  useEffect(() => {
		loader("show");
		handleGetTemplate()
		handleGetSmartListSingleRecord(parms.id)
	  }, [])
  return ( 
	<>
	  <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
      <div className="right-sidebar">
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
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <Link to="/webinar/email/smart-list">
                <button class="btn btn-primary btn-filled back">
					<svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M8.31557 17.82C8.97165 18.476 10.0354 18.476 10.6915 17.82C11.3475 17.1639 11.3475 16.1002 10.6915 15.4441L4.7522 9.50484L10.6927 3.56431C11.3488 2.90823 11.3488 1.84451 10.6927 1.18843C10.0367 0.532347 8.97294 0.532347 8.31686 1.18843L1.2212 8.28409C1.21 8.29469 1.19891 8.30548 1.18794 8.31646C0.531858 8.97254 0.531858 10.0363 1.18794 10.6923L8.31557 17.82Z" fill="white"/>
					</svg>
				</button>
                </Link>
              </div>
            </div>
            
            <div className="col-12 col-md-8">
            <ul class="tabnav-link">
									<li class="active">
										<a href="javascript:void(0)">Prepare your email</a>
									</li>
									<li class="active">
										<a href="javascript:void(0)">Select smart list</a>
									</li>
									<li class="active active-main">
										<a href="javascript:void(0)">Approve and send</a>
									</li>
									
								</ul>
            </div>
            
            <div className="col-12 col-md-3">
              <div className="header-btn">
                <button className="btn btn-primary btn-bordered move-draft" >
                  Save As Draft
                </button>
				{editShow ?null:
                <button class="btn btn-primary btn-filled back send"  type="button" onClick={()=>{handleSendMail()}}>
                   Send
				</button>}
              
              </div>
            </div>
          </div>
        </div>
		{editShow ? <section class="verify_email">
							<div class="row">
								<div class="col-12 verify-left">
									<div class="verify-mail-box">
									<div class="preview_mail-inside">
										<div class="row">
											<div class="col d-flex align-items-center">
											
											</div>
											<div class="col d-flex align-items-center">
												<h4>Preview Your List</h4>
											</div>
											<div class="col d-flex align-items-center justify-content-end">
												<div class="mail-preview-action">
												<div class="col d-flex align-items-center justify-content-end">
												<div class="mail-preview-action">
													<button onClick={()=>{deleteid?setEditShow(false):UpdateSmartList()}}  type="button"class="btn btn-primary btn-filled save-btn">Save</button>
												</div>
											</div>
												</div>
											</div>
										</div>
									</div>
									<div class="list-tab">
										<div class="list-tab-view">
											{data?<>{data?.map((data,index)=>{
												return(
													<div class="list-tab-box">
													<div class="list-tab-box-inside">
										   <Tabs defaultActiveKey="personal_info1">
							   <Tab
								 eventKey="personal_info1"
								 id="personal_info1"
								 class={"tab1 tab-pane "}
								 title="Personal Info"
							   >
								 <h5
								 >
								
								   <span id={"PersonName"+index} onInput={(e)=>{handleEditText(e,index,data.id)}} contenteditable="true">{data.name}</span>
								 </h5>
	   
								 <div class="mailbox-table">
								   <table>
									 <tbody>
									   <tr>
										 <th>Country</th>
										 <td>NA</td>
									   </tr>
									   <tr>
										 <th>Profession</th>
										 <td id={"Profession"+ index}onInput={(e)=>{handleEditText(e,index,data.id)}} contenteditable="true">NA</td>
									   </tr>
									 </tbody>
								   </table>
								 </div>
							   </Tab>
							   <Tab
								 id="stats1"
								 eventKey="stats1"
								 class={"tab2 tab-pane "}
								 title="stats"
							   >
								 <div class="tabbing-stats">
								   <div class="mailbox-table">
									 <table>
									   <tbody>
										 <tr>
										   <th>Consent</th>
										   <td>{data.participants.consent==1?"Yes":"No"}</td>
										 </tr>
										 <tr>
										   <th>Bounced</th>
										   <td>{data.is_sent==1?"Yes":"No"} </td>
										 </tr>
										 <tr>
										   <th>Last Email</th>
										   <td> {data.stats.last_send} </td>
										 </tr>
									   </tbody>
									 </table>
								   </div>
								 </div>
							   </Tab>
							 </Tabs>
							 <div class="tab-content-delete" onClick={()=>{DeleteSmartList(data.id,index)}}>
							 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z" fill="#ffffff"/>
<path d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z" fill="#ffffff"/>
<path d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z" fill="#ffffff"/>
<path d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z" fill="#ffffff"/>
<path d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z" fill="#ffffff"/>
<path d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z" fill="#ffffff"/>
</svg>
														</div>
							 </div>
					  </div>
					)
					})}</>:<h4>No Data</h4>}
					  
					  </div>
					  </div>
											</div>
								</div>
								<div class="col-12 verify-right">
									<div class="preview_mail">
										<div class="preview_mail-inside">
											<div class="row">
												<div class="col">
												</div>
												<div class="col col-md-6">
													<h4>Preview Your Email</h4>
												</div>
												<div class="col d-flex justify-content-end">
													<div class="collection-view">
														  <a class={ desktop?"change-view active":"change-view" } id="grid" rel="tooltip" title="Grid view" onClick={()=>{setMobile(false);setDesktop(true)}}>
															<div class="togglelines"><img src={path_image+ "/webinar/desktop-view.png"} alt=""/></div>
														  </a>

														  <a class={mobile?"change-view active":"change-view" } id="list" rel="tooltip" title="List view"onClick={()=>{setMobile(true);setDesktop(false)}}>
															<div class="togglelines"><img src={path_image+ "/webinar/mobile-view.png"} alt=""/></div>
														  </a>      
													</div>
												</div>
											</div>
										</div>
										<div id="one" class="preview-mail-box">
											{/* <img src={path_image+ "/webinar/pdf-format.png"} alt="PDF View" /> */}
										</div>
									</div>
								</div>
							</div>
						</section>: 
						<section class="verify_email">
							<div class="row">
								<div class="col-12 verify-left">
									<div class="verify-mail-box">
									<div class="preview_mail-inside">
										<div class="row">
											<div class="col d-flex align-items-center">
											
											</div>
											<div class="col d-flex align-items-center">
												<h4>Preview Your List</h4>
											</div>

                                             

											<div class="col d-flex align-items-center justify-content-end">
												<div class="mail-preview-action">
													<div class="hcp-new-user">
														<button onClick={()=>{setModalShow1(true)}} class="btn btn-outline-primary btn-filled" data-bs-toggle="modal" data-bs-target="#modal-add"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path fill-rule="evenodd" clip-rule="evenodd" d="M3.57759 4.97873C3.57759 2.22712 5.81439 0 8.56771 0C11.3211 0 13.5571 2.22685 13.5571 4.97837C13.5571 6.51846 12.8567 7.89435 11.757 8.80733C13.072 9.11593 14.2256 9.84566 15.0658 10.8437C15.3499 11.1812 15.3066 11.685 14.9692 11.9691C14.6317 12.2532 14.1278 12.2099 13.8438 11.8725C13.0039 10.8748 11.7473 10.242 10.3453 10.242H6.78937C4.26999 10.242 2.22243 12.2875 2.22243 14.7956V19.0687L2.22312 19.0729C2.29397 19.5083 1.99845 19.9187 1.56305 19.9895C1.12766 20.0604 0.717271 19.7648 0.646423 19.3294L0.635369 19.2615C0.628467 19.2191 0.625 19.1762 0.625 19.1332V14.7956C0.625 11.8864 2.65748 9.44531 5.37797 8.8072C4.27826 7.89437 3.57759 6.51878 3.57759 4.97873ZM8.56771 1.59743C6.69244 1.59743 5.17503 3.11355 5.17503 4.97873C5.17503 6.84383 6.69235 8.35967 8.56771 8.35967C10.4431 8.35967 11.9597 6.84378 11.9597 4.97837C11.9597 3.1131 10.4429 1.59743 8.56771 1.59743Z" fill="#0066BE"/>
																<path d="M15.8269 13.2523C16.268 13.2523 16.6256 13.6098 16.6256 14.051V15.8259H18.4008C18.842 15.8259 19.1996 16.1835 19.1996 16.6246C19.1996 17.0657 18.842 17.4233 18.4008 17.4233H16.6256V19.2012C16.6256 19.6423 16.268 19.9999 15.8269 19.9999C15.3858 19.9999 15.0282 19.6423 15.0282 19.2012V17.4233H13.2441C12.803 17.4233 12.4454 17.0657 12.4454 16.6246C12.4454 16.1835 12.803 15.8259 13.2441 15.8259H15.0282V14.051C15.0282 13.6098 15.3858 13.2523 15.8269 13.2523Z" fill="#0066BE"/>
																</svg></button>
																</div>
																<div class="hcp-added">
																	<button onClick={()=>{setEditShow(true)}} class="btn btn-outline-primary btn-filled"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																<g clip-path="url(#clip0_698_2409)">
																<path d="M15.8333 10.0383C15.3725 10.0383 15 10.4117 15 10.8716V17.5383C15 17.9974 14.6266 18.3716 14.1667 18.3716H2.5C2.03995 18.3716 1.66672 17.9974 1.66672 17.5383V5.87158C1.66672 5.41245 2.03995 5.0383 2.5 5.0383H9.16672C9.62753 5.0383 10 4.66492 10 4.20502C10 3.74496 9.62753 3.37158 9.16672 3.37158H2.5C1.12167 3.37158 0 4.49326 0 5.87158V17.5383C0 18.9166 1.12167 20.0383 2.5 20.0383H14.1667C15.545 20.0383 16.6667 18.9166 16.6667 17.5383V10.8716C16.6667 10.4108 16.2941 10.0383 15.8333 10.0383Z" fill="#0066BE"/>
																<path d="M7.81344 9.27936C7.75515 9.33765 7.71594 9.4118 7.6993 9.49176L7.11016 12.4385C7.0827 12.5751 7.12603 12.7159 7.2243 12.8151C7.30349 12.8943 7.41015 12.9367 7.5194 12.9367C7.54595 12.9367 7.57357 12.9343 7.60104 12.9285L10.5469 12.3394C10.6285 12.3226 10.7027 12.2835 10.7602 12.2251L17.3535 5.63174L14.4077 2.68604L7.81344 9.27936Z" fill="#0066BE"/>
																<path d="M19.3901 0.64846C18.5778 -0.16407 17.256 -0.16407 16.4443 0.64846L15.291 1.80172L18.2369 4.74758L19.3901 3.59417C19.7835 3.20171 20.0002 2.67834 20.0002 2.1217C20.0002 1.56506 19.7835 1.04168 19.3901 0.64846Z" fill="#0066BE"/>
																</g>
																<defs>
																<clipPath id="clip0_698_2409">
																<rect width="20" height="20" fill="white"/>
																</clipPath>
																</defs>
																</svg></button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="list-tab">
										<div class="list-tab-view">
											{data?<>							{data?.map((data,index)=>{
												return(
													<div class="list-tab-box">
													<div class="list-tab-box-inside">
										   <Tabs defaultActiveKey="personal_info1">
							   <Tab
								 eventKey="personal_info1"
								 id="personal_info1"
								 class={"tab1 tab-pane "}
								 title="Personal Info"
							   >
								 <h5
								 >
								   <span>{data.name}</span>
								 </h5>
	   
								 <div class="mailbox-table">
								   <table>
									 <tbody>
									   <tr>
										 <th>Country</th>
										 <td contenteditable={editable}>NA</td>
									   </tr>
									   <tr>
										 <th>Profession</th>
										 <td contenteditable={editable}>NA</td>
									   </tr>
									 </tbody>
								   </table>
								 </div>
							   </Tab>
							   <Tab
								 id="stats1"
								 eventKey="stats1"
								 class={"tab2 tab-pane "}
								 title="stats"
							   >
								 <div class="tabbing-stats">
								   <div class="mailbox-table">
									 <table>
									   <tbody>
										 <tr>
										   <th>Consent</th>
										   <td>{data?.participants?.consent==1?"Yes":"No"}</td>
										 </tr>
										 <tr>
										   <th>Bounced</th>
										   <td>{data?.is_sent==1?"Yes":"No"} </td>
										 </tr>
										 <tr>
										   <th>Last Email</th>
										   <td> {data?.stats?.last_send} </td>
										 </tr>
									   </tbody>
									 </table>
								   </div>
								 </div>
							   </Tab>
							 </Tabs>
							 </div>
					  </div>
					)
					})}</>:<h4>No Data</h4>}
				
						
				<Modal
        show={modalShow1}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
			 	<h4 class="modal-title">Person Name</h4>
		<button type="button" class="btn-close" data-bs-dismiss="modal" onClick={() => setModalShow1(false)}></button></Modal.Header>
        <Modal.Body>
		<div class="mail-preview-action">
								<div class="hcp-added d-flex justify-content-end">
										<button class="btn btn-outline-primary btn-filled"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																<g clip-path="url(#clip0_698_2409)">
																<path d="M15.8333 10.0383C15.3725 10.0383 15 10.4117 15 10.8716V17.5383C15 17.9974 14.6266 18.3716 14.1667 18.3716H2.5C2.03995 18.3716 1.66672 17.9974 1.66672 17.5383V5.87158C1.66672 5.41245 2.03995 5.0383 2.5 5.0383H9.16672C9.62753 5.0383 10 4.66492 10 4.20502C10 3.74496 9.62753 3.37158 9.16672 3.37158H2.5C1.12167 3.37158 0 4.49326 0 5.87158V17.5383C0 18.9166 1.12167 20.0383 2.5 20.0383H14.1667C15.545 20.0383 16.6667 18.9166 16.6667 17.5383V10.8716C16.6667 10.4108 16.2941 10.0383 15.8333 10.0383Z" fill="#0066BE"/>
																<path d="M7.81344 9.27936C7.75515 9.33765 7.71594 9.4118 7.6993 9.49176L7.11016 12.4385C7.0827 12.5751 7.12603 12.7159 7.2243 12.8151C7.30349 12.8943 7.41015 12.9367 7.5194 12.9367C7.54595 12.9367 7.57357 12.9343 7.60104 12.9285L10.5469 12.3394C10.6285 12.3226 10.7027 12.2835 10.7602 12.2251L17.3535 5.63174L14.4077 2.68604L7.81344 9.27936Z" fill="#0066BE"/>
																<path d="M19.3901 0.64846C18.5778 -0.16407 17.256 -0.16407 16.4443 0.64846L15.291 1.80172L18.2369 4.74758L19.3901 3.59417C19.7835 3.20171 20.0002 2.67834 20.0002 2.1217C20.0002 1.56506 19.7835 1.04168 19.3901 0.64846Z" fill="#0066BE"/>
																</g>
																<defs>
																<clipPath id="clip0_698_2409">
																<rect width="20" height="20" fill="white"/>
																</clipPath>
																</defs>
																</svg>
																</button>
								</div>
								<div class="list-tab-box-inside">
										   <Tabs defaultActiveKey="personal_info1">
							   <Tab
								 eventKey="personal_info1"
								 id="personal_info1"
								 class={"tab1 tab-pane "}
								 title="Personal Info"
							   >
								 <h5
								 >
								   <span>Person Name</span>
								 </h5>
	   
								 <div class="mailbox-table">
								 <table>
											<tbody>
												<tr><th>Email</th><td contenteditable="true">Email@exaple.com</td></tr>
												<tr><th>Country</th><td contenteditable="true">Name of the country</td></tr>
												<tr><th>State</th><td contenteditable="true">Name of the state</td></tr>
												<tr><th>Profession</th><td contenteditable="true">Staff</td></tr>
												<tr><th>Interest</th><td contenteditable="true">Tech</td></tr>
												<tr><th>Hospital</th><td contenteditable="true">Name of the hospital</td></tr>
											</tbody>
										</table>
								 </div>
							   </Tab>
							   <Tab
								 id="stats1"
								 eventKey="stats1"
								 class={"tab2 tab-pane "}
								 title="stats"
							   >
								 <div class="tabbing-stats">
								   <div class="mailbox-table">
								   <table>
													<tbody>
														<tr><th>Consent</th><td>Yes</td></tr>
														<tr><th>Bounced</th><td>Yes</td></tr>
														<tr><th>Last Email</th><td>Nov 18 </td></tr>
													</tbody>
												</table>
								   </div>
								 </div>
							   </Tab>
							 </Tabs>
							 </div>
							</div>


        </Modal.Body>
        <Modal.Footer>
          {/* <Button
            onClick={() => {
              setModalShow1(false);
            }}
          >
            Delete
          </Button> */}
          <Button
            onClick={() => {
              setModalShow1(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
					  
					  </div>
					  </div>
											</div>
								</div>
								<div class="col-12 verify-right">
									<div class="preview_mail">
										<div class="preview_mail-inside">
											<div class="row">
												<div class="col">
												</div>
												<div class="col col-md-6">
													<h4>Preview Your Email</h4>
												</div>
												<div class="col d-flex justify-content-end">
													<div class="collection-view">
														  <a class={ desktop?"change-view active":"change-view" } id="grid" rel="tooltip" title="Grid view" onClick={()=>{setMobile(false);setDesktop(true)}}>
															<div class="togglelines"><img src={path_image+ "/webinar/desktop-view.png"} alt=""/></div>
														  </a>

														  <a class={mobile?"change-view active":"change-view" } id="list" rel="tooltip" title="List view"onClick={()=>{setMobile(true);setDesktop(false)}}>
															<div class="togglelines"><img src={path_image+ "/webinar/mobile-view.png"} alt=""/></div>
														  </a>      
													</div>
												</div>
											</div>
										</div>
										<div id="one" class="preview-mail-box">
											{/* <img src={path_image+ "/webinar/pdf-format.png"} alt="PDF View" /> */}
										</div>
									</div>
								</div>
							</div>
						</section>}

       
      </div>    
	  </>
	)
}
export default SmartListUsers;
