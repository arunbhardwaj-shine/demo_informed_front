import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { loader } from "../../loader";
import { connect } from "react-redux";
import { getCampaignId, getEmailData } from "../../actions";

import { propTypes } from "react-bootstrap/esm/Image";

const SelectHCP = (props) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [SendListData, setSendListData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [selection, setSelection] = useState(0);
  const [templateId, setTemplateId] = useState(0);

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

  const handleInputChange = (event, selected) => {
    setSelection(event.target.children[0].value);
    const div = document.querySelector("div.active");

    if (div) {
      div.classList.remove("active");
    }
    event.target.classList.toggle("active");
    setTemplateId(selected);
  };

  const backClicked = () => {
    window.history.go(-1);

    // return true;
  };

  const saveAsDraft = async () => {
    console.log(props);
    const body = {
      user_id: 18207,
      pdf_id: props.getDraftData.pdf_id,
      description: props.getDraftData.description,
      creator: props.getDraftData.creator,
      campaign_name: props.getDraftData.campaign,
      subject: props.getDraftData.subject,
      route_location: "SelectHCP",
      tags: props.getDraftData.tags,
      campaign_data: {
        template_id: props.getDraftData.campaign_data.template_id,
      },
      campaign_id: props.getDraftData.campaign_id,
    };

    console.log(body);
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        console.log(res);
        console.log(props.getCampaignId);
        loader("hide");
        if (props.getCampaignId == "") {
          props.getCampaignId(res.data.response.data.id);
        }

        // console.log(res);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  return (
    <>
      <div className="col right-sidebar">
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <button
                  className="btn btn-primary btn-bordered back"
                  onClick={backClicked}
                >
                  Back
                </button>
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
                <button
                  className="btn btn-primary btn-bordered move-draft"
                  onClick={saveAsDraft}
                >
                  Save As Draft
                </button>
                {templateId === 0 ? (
                  <button className="btn btn-primary btn-filled next disabled">
                    Next{" "}
                  </button>
                ) : (
                  <Link to=  {selection==='Single HCP' ? '/VerifyHCP' : '/SelectSmartList'}     state={{ UserSelected: templateId }}>
                    <button className="btn btn-primary btn-filled next">
                      Next
                    </button>
                  </Link>

                  // <Link
                  //   to="/SelectSmartList"
                  //   state={{ UserSelected: templateId }}
                  // >
                  //   <button className="btn btn-primary btn-filled next">
                  //     Next
                  //   </button>
                  // </Link>
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
                      className="send-option-img"
                      onClick={(event) => handleInputChange(event, 1)}
                    >
                      <input
                        type="radio"
                        name="select-option-hcp"
                        value="group of HCPs"

                        // onChange={(event) => handleInputChange(event)}
                      />

                      <img
                        src={path_image + "group-hcp.svg"}
                        alt="Group HCPs"
                      />
                    </div>
                    <p>Groupe of HCPs</p>
                  </li>
                  <li>
                    <div
                      className="send-option-img"
                      onClick={(e) => handleInputChange(e, 2)}
                    >
                      <input
                        type="radio"
                        name="select-option-hcp"
                        value="Single HCP"

                        // onChange={(event) => handleInputChange(event)}
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
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

export default connect(mapStateToProps)(SelectHCP);
