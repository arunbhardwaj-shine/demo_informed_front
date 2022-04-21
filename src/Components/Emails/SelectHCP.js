import React, { useEffect, useState } from "react";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const SelectHCP = () => {
  
  let path_image= process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [SendListData, setSendListData] = useState([]);
  const [UserData, setUserData] = useState([]);

   axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
   useEffect(() => {

        const body = {
          user_id: 18207,
        };
        axios
          .post(`emailapi/get_template_list`, body)
          .then((res) => {
            setSendListData(res.data.response.data.emails);
            setUserData(res.data.response.data.user);
            
          })
          .catch((err) => {
            console.log(err);
          });

    
   }, []);


    return (
      <>
     				<div className="col right-sidebar">
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
										<a href="javascript:void(0)">Select HCPs</a>
									</li>
									<li className="">
										<a href="javascript:void(0)">Verify your list</a>
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
					<section className="send-mail-options">
						<div className="container">
							<div className="row">
								<div className="send-option-list">
									<h5>Do you want to send to</h5>
									<ul>
										<li><div className="send-option-img"><input type="radio" name="select-option-hcp" /><img src={path_image+"group-hcp.svg"} alt="Group HCPs" /></div><p>Groupe of HCPs</p></li>
										<li><div className="send-option-img"><input type="radio" name="select-option-hcp" /><img src={path_image+"single-hcp.svg"} alt="Single HCP" /></div><p>Single HCP</p></li>
									</ul>
								</div>
							</div>
						</div>
					</section>

				
				</div>
		

      </>
    );
};


export default SelectHCP;
