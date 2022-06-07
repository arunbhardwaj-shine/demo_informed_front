import React,{useState} from "react";
import { Link } from "react-router-dom";
const SendEmails = () => {
	let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
	return (
	    <>
	    <div className="right-sidebar">
	        <div className="top-header">
	          <div className="page-title">
	            <h2>Emails</h2>
	          </div>
	        </div>
	     	 

	      	<div className="top-right-action">
            	<div className="search-bar">
	              	<form className="d-flex">
	                <input
	                  className="form-control me-2"
	                  type="text"
	                  placeholder="Search"
	                  aria-label="Search"
	                  id="email_search"
	                />
	                <button className="btn btn-outline-success" type="submit">
	                  <svg
	                    width="16"
	                    height="16"
	                    viewBox="0 0 16 16"
	                    fill="none"
	                    xmlns="http://www.w3.org/2000/svg"
	                  >
	                    <path
	                      d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z"
	                      fill="#97B6CF"
	                    />
	                  </svg>
	                </button>
	              	</form>
            	</div>
            </div>


            <div className="apply-filter">
              <h6>Applied filters</h6>
              <div className="filter-block">
                <div className="filter-block-left full">
                    <div className="filter-div">
                      	<div className="filter-div-title">
                        	<span>Tags |</span>
                      	</div>
                      	<div className="filter-div-list">
                        	<div className="filter-result">A
                            	<img src={path_image + "filter-close.svg"} alt="Close-filter" />
                          	</div>
                        </div>
                    </div>
                  
				  	<div className="filter-div">
                      	<div className="filter-div-title">
                        	<span>Creator |</span>
                      	</div>
                      	<div className="filter-div-list">
                        	<div className="filter-result" >BB
                            	<img src={path_image + "filter-close.svg"} alt="Close-filter" />
                        	</div>
                        </div>
                    </div>
                  
				    <div className="filter-div">
                        <div className="filter-div-title">
                        	<span>Date |</span>
                        </div>
                        <div className="filter-div-list">
                          	<div className="filter-result">VVV
                            	<img src={path_image + "filter-close.svg"}alt="Close-filter"/>
                          	</div>
                        </div>
                    </div>
                  
					<div className="filter-div">
						<div className="filter-div-title">
							<span>Campaign |</span>
						</div>
						<div className="filter-div-list">
						  	<div className="filter-result">Save
						    <img src={path_image + "filter-close.svg"} alt="Close-filter" />
						  </div>
						</div>
                    </div>
                </div>
                <div class="clear-filter">
                  <button class="btn btn-outline-primary btn-bordered" >
                    Remove All
                  </button>
                </div>
              </div>
            </div>


            <div className="email-result">
          		<div className="col email-result-block">
	                <div className="email_box_block">
	                  	<div className="email-block-add">
	                    	<Link to="/webinar/emails/create">
	                      		<img src={path_image + "add-button.svg"} alt="" />
	                    	</Link>
	                    	<p>Create New Email</p>
	                  	</div>
	               	</div>
	            </div>
	        </div>      
	        
            
        </div>  
		</>
  	);    
}	

export default SendEmails;