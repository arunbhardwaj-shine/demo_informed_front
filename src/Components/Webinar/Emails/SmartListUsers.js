import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
const SelectSmartListUsers = () => {

  return ( 
	  <>
      <div className="right-sidebar">
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <Link to="/webinar/emails/create">
                  <button className="btn btn-primary btn-bordered back">
                    Back
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="col-12 col-md-9">
              <ul className="tabnav-link">
                <li className="active">
                  <Link to="/EmailArticleSelect">Prepare Your Email</Link>
                </li>
                <li className="active active-main">
                  <Link to="/SelectHCP">Select Smart List</Link>
                </li>
                <li className="">
                  <a href="javascript:void(0)">Approve And Send</a>
                </li>
							</ul>
            </div>
            
            <div className="col-12 col-md-2">
              <div className="header-btn">
                <button className="btn btn-primary btn-bordered move-draft" >
                  Save As Draft
                </button>
                <Link to="/webinar/emails/smart-list-users">
                  <button className="btn btn-primary btn-filled next" >
                      Next
                  </button>
                </Link>
              </div>
            </div>

            <div class="col smartlist-result-block search-hcp">
                Smart Listing users will come here
            </div>

          </div>
        </div>
      </div>    
    </>
	)
}
export default SelectSmartListUsers;
