import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const WebinarSelectHCP = () => {
    let path_image =process.env.REACT_APP_ASSETS_PATH_WEBINAR;
    const[templateId,setTemplateId]=useState(1)
    const navigate = useNavigate();
    const backClicked = () => { 
        navigate("/webinar/email/create");
      };
    const handleInputChange = (e,i) => { 
        if(i==1){
        setTemplateId(1)
            const div = document.querySelector("div.active");
            if (div) {
                div.classList.remove("active");
              }
              e.target.classList.toggle("active")
             navigate("/webinar/email/smart-list");
        }else{
            setTemplateId(2)
            const div = document.querySelector("div.active");
            if (div) {
                div.classList.remove("active");
              }
              e.target.classList.toggle("active")
             navigate('/webinar/email/SelectVerifyHCP');
        }
      };
  return (
  <>
  <div className="col right-sidebar">
      <div className="custom-container">
        <div className="row">
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <button
                  className="btn btn-primary btn-bordered"
                   onClick={backClicked}
                >
                  Back
                </button>
              </div>
            </div>
            <div className="col-12 col-md-8">
              <ul className="tabnav-link">
                <li className="active">
                  <a href="#">Prepare Your Email</a>
                </li>
                <li className="active active-main">
                  <a href="javascript:void(0)">Select HCPs</a>
                </li>
                <li className="">
                  <a href="#">Select Smart List</a>
                </li>
                <li className="">
                  <a href="#">Approve And Send</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-3">
              <div className="header-btn">
                
                {1 === 0 ? (
                  <button className="btn btn-primary btn-filled next disabled">
                    Next{" "}
                  </button>
                ) : (
                 <Link
                 to={`/webinar/email/smart-list`}  
                  >
                    <button
                      className="btn btn-primary btn-filled "
                    //   onClick={(event) => nextClicked(templateId)}
                    >
                      Next
                    </button>
                  </Link>
                )}
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
                  <li>
                    <div
                  className={
                        templateId === 1
                          ? "send-option-img active"
                          : "send-option-img"
                     }
                   onClick={(event) => handleInputChange(event, 1)}
                    >
                      <input
                        type="radio"
                        name="select-option-hcp"
                        value="group of HCPs"
                      />

                      <img
                        src={path_image + "group-hcp.svg"}
                        alt="Group HCPs"
                      />
                    </div>
                    <p>Group of HCPs</p>
                  </li>
                  <li>
                    <div
                      className={
                        templateId === 2
                          ? "send-option-img active"
                          : "send-option-img"
                      }
                       onClick={(e) => handleInputChange(e, 2)}
                    >
                      <input
                        type="radio"
                        name="select-option-hcp"
                        value="Single HCP"

                         onChange={(event) => handleInputChange(event)}
                      />
                      <img
                        src={path_image + "single-hcp.svg"}
                        alt="Single HCP"
                      />
                    </div>
                    <p>Single HCP</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
      </div>
  </>
  )
}

export default WebinarSelectHCP