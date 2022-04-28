import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { Link,useLocation } from "react-router-dom";

import TableOnly from "./TableOnly";

const SelectSmartListUsers = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const location = useLocation();
  const [readers, setReaders] = useState([]);
  const [SendListData, setSendListData] = useState([]);
  const [PdfSelected, setPdfSelected] = useState(0);
  const [TemplateId, setTemplateId] = useState(0);
  const { smartListSelected } = location.state;

  const inputElement = useRef();
  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  useEffect(() => {

    const body = {
      user_id: 18207,
      list_id: smartListSelected.id
    };
    axios
      .post(`distributes/get_reders_list`, body)
      .then((res) => {
     //   console.log(res)
        setReaders(res.data.response.data);
        
      })
      .catch((err) => {
        console.log(err);
      });


}, []);



useEffect(() => {
  if(PdfSelected!==0){
    inputElement.current.classNameList.remove("disabled");
  }

}, [PdfSelected]);

 const handleSelect = (e)=>{
    setPdfSelected(e.target.value);
}

  const handleInputChange = (event, selected) => {
    const div = document.querySelector("div.active");

    if (div) {
      div.classNameList.remove("active");
    }
    event.target.classNameList.toggle("active");
    setTemplateId(selected);
  };

  return (
    <>
        
        <div className="right-sidebar">
					<div className="page-top-nav">
						<div className="row justify-content-end align-items-center">
							<div className="col-12 col-md-1">
								<div className="header-btn-left">
								<button className="btn btn-primary btn-bordered back">Back</button>
							  </div>
							</div>
							<div className="col-12 col-md-9">
								<ul className="tabnav-link">
									<li className="">
										<a href="javascript:void(0)">Select Content</a>
									</li>
									<li className="">
										<a href="javascript:void(0)">Create Your Email</a>
									</li>
									<li className="active">
										<a href="javascript:void(0)">Select Verify Your HCPs</a>
									</li>
									
									<li className="">
										<a href="javascript:void(0)">Verify your Email</a>
									</li>
								</ul>
							</div>
							<div className="col-12 col-md-2">
							  <div className="header-btn">
								<button className="btn btn-primary btn-bordered move-draft">Save As Draft</button>
								<button className="btn btn-primary btn-filled next">Next</button>
							  </div>
							</div>
						 </div>
					</div>

					<section className="search-hcp">
						<div className="result-hcp-table">
							<div className="table-title">
								<h4>HCPs <span>| 203</span></h4>
								<div className="selected-hcp-table-action">
									<a className="show-less-info" href="#">Show Less information </a>
									<div className="hcp-new-user">
										<button className="btn btn-outline-primary"><img src="assets/images/new-user.svg" alt="New User" /></button>
									</div>
									<div className="hcp-added">
										<button className="btn btn-outline-primary"><img src="assets/images/edit.svg" alt="Edit" /></button>
									</div>
									<div className="hcp-sort">
										<button className="btn btn-outline-primary">Sort By <img src="assets/images/sort.svg" alt="Shorting" /></button>
									</div>
								</div>
							</div>
							<div className="selected-hcp-list">
								<table className="table">
								  <thead>
									<tr>
									  <th scope="col">Name</th>
									  <th scope="col">Email</th>
									  <th scope="col">Bounced</th>
									  <th scope="col">Country</th>
									  <th scope="col">Readers</th>
									  <th scope="col">Business Unit</th>
									  <th scope="col">Interest</th>
									  <th scope="col">Consent</th>
									  <th scope="col">Email Received</th>
									  <th scope="col">Openings</th>
									  <th scope="col">Registrations</th>
									  <th scope="col">Last Email</th>
									  <th scope="col"></th>
									</tr>
								  </thead>
								  <tbody>
                    {readers.map((readers)=>{
                        return(<>
                           	<tr className="hcps-added">
                             <td>Jacob Flindt</td>
                             <td>User@docintel.app</td>
                             <td>No</td>
                             <td>United Kingdom</td>
                             <td>CIS</td>
                             <td>Haematology</td>
                             <td>Tech</td>
                             <td><span>Yes</span></td>
                             <td><span>43</span></td>
                             <td><span>30</span></td>
                             <td><span>28</span></td>
                             <td><span>Nov 18</span></td>
                             <td className="add-new-hcp" colspan="12"><img src="assets/images/add-row.png" alt="Add Row" /></td>
                           </tr>
                        
                        </>)
                          
                    })}
								
									{/* <tr className="hcps-added">
									  <td>Jacob Flindt</td>
									  <td>User@docintel.app</td>
									  <td>No</td>
									  <td>United Kingdom</td>
									  <td>CIS</td>
									  <td>Haematology</td>
									  <td>Tech</td>
									  <td><span>Yes</span></td>
									  <td><span>43</span></td>
									  <td><span>30</span></td>
									  <td><span>28</span></td>
									  <td><span>Nov 18</span></td>
									  <td className="delete_row" colspan="12"><img src="assets/images/delete.svg" alt="Delete Row" /></td>
									</tr>
									<tr>
									  <td>Jacob Flindt</td>
									  <td>User@docintel.app</td>
									  <td>No</td>
									  <td>United Kingdom</td>
									  <td>CIS</td>
									  <td>Haematology</td>
									  <td>Tech</td>
									  <td><span>Yes</span></td>
									  <td><span>43</span></td>
									  <td><span>30</span></td>
									  <td><span>28</span></td>
									  <td><span>Nov 18</span></td>
									  <td className="delete_row" colspan="12"><img src="assets/images/delete.svg" alt="Delete Row" /></td>
									</tr>
									<tr>
									  <td>Jacob Flindt</td>
									  <td>User@docintel.app</td>
									  <td>No</td>
									  <td>United Kingdom</td>
									  <td>CIS</td>
									  <td>Haematology</td>
									  <td>Tech</td>
									  <td><span>Yes</span></td>
									  <td><span>43</span></td>
									  <td><span>30</span></td>
									  <td><span>28</span></td>
									  <td><span>Nov 18</span></td>
									  <td className="delete_row" colspan="12"><img src="assets/images/delete.svg" alt="Delete Row" /></td>
									</tr>
									<tr>
									  <td>Jacob Flindt</td>
									  <td>User@docintel.app</td>
									  <td>No</td>
									  <td>United Kingdom</td>
									  <td>CIS</td>
									  <td>Haematology</td>
									  <td>Tech</td>
									  <td><span>Yes</span></td>
									  <td><span>43</span></td>
									  <td><span>30</span></td>
									  <td><span>28</span></td>
									  <td><span>Nov 18</span></td>
									  <td className="delete_row" colspan="12"><img src="assets/images/delete.svg" alt="Delete Row" /></td>
									</tr> */}
								  </tbody>
								</table>
								
							</div>
						</div>
					</section>

				
				</div>
		
      
		
    </>
  );
};

export default SelectSmartListUsers;
