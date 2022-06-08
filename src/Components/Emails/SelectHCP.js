import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { loader } from "../../loader";
import { connect } from "react-redux";
import { getCampaignId, getEmailData,getSelectedSmartListData  } from "../../actions";
import { getDraftData } from "../../actions";
import { getSelected } from "../../actions";
import { toast } from "react-toastify";
import { popup_alert } from "../../popup_alert";
import { useNavigate } from "react-router-dom";

import { propTypes } from "react-bootstrap/esm/Image";

var old_object = {};

const SelectHCP = (props) => {
  //console.log(props);
  const navigate = useNavigate();
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [SendListData, setSendListData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [selection, setSelection] = useState(0);

  // const [templateId, setTemplateId] = useState(
  //   props.getDraftData ? props.getDraftData.campaign_data.list_selection : 0
  // );

  // console.log(props.getEmailData);

  // const [templateId, setTemplateId] = useState(
  //   old_object ? old_object.selected : 0
  // );

  const [templateId, setTemplateId] = useState(
    old_object?.selected
      ? old_object.selected
      : props.getDraftData?.campaign_data?.list_selection
      ? props.getDraftData.campaign_data.list_selection
      : 0
  );

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const campaign_id = old_object
    ? old_object.campaign_id
    : props.getDraftData
    ? props.getDraftData.campaign_id
    : 0;
  //console.log(campaign_id);
  const [campaign_id_st, setCampaign_id] = useState(campaign_id);

  const handleInputChange = (event, selectede) => {
    console.log(old_object);
    if (old_object) {
      old_object.selected = selectede;
      props.getEmailData(old_object);
    } else {
      props.getEmailData({ selected: selectede });
    }

    if(selectede===2){
      props.getSelectedSmartListData(null);
    }

    setSelection(event.target.children[0].value);
    //  console.log(event.target.children[0].value);
    const div = document.querySelector("div.active");

    if (div) {
      div.classList.remove("active");
    }
    event.target.classList.toggle("active");
    //alert(selectede);
    setTemplateId(selectede);
  };

  const backClicked = () => {
    let pdfSelectedId = props.getEmailData ? props.getEmailData.pdf_id : props.getDraftData.pdf_id;
    navigate("/CreateEmail", {
     state: { PdfSelected: pdfSelectedId},
   });
  };

  // console.log(props.getEmailData);
  // console.log(props.getDraftData);
  const saveAsDraft = async () => {
    
    const body = {
      user_id: 18207,
      pdf_id: old_object?.PdfSelected
        ? old_object.PdfSelected
        : props.getDraftData.pdf_id,
      description: old_object?.emailDescription
        ? old_object.emailDescription
        : props.getDraftData?.description ? props.getDraftData.description : '',
      creator: old_object?.emailCreator
        ? old_object.emailCreator
        : props.getDraftData?.creator ? props.getDraftData.creator : '',
      campaign_name: old_object?.emailCampaign
        ? old_object.emailCampaign
        : props.getDraftData.campaign,
      subject: old_object?.emailSubject
        ? old_object.emailSubject
        : props.getDraftData.subject,
      route_location: "SelectHCP",
      tags: old_object?.tags ? old_object.tags : props.getDraftData.tags,
      campaign_data: {
        template_id: old_object?.templateId
          ? old_object.templateId
          : props.getDraftData.campaign_data.template_id,
        list_selection: templateId,
      },
      campaign_id: campaign_id_st,
      status: 2,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        loader("hide");
        if (res.data.status_code === 200) {
          setCampaign_id(res.data.response.data.id);
          popup_alert({
            visible: "show",
            message: "Your changes has been saved <br />successfully !",
            type: "success",
            redirect: "/EmailList",
          });
        } else {
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        //console.log(err);
        toast.error("Something went wrong");
      });
  };

  const nextClicked = () => {
    console.log(old_object);
    props.getEmailData(old_object);
    props.getSelected(null);
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
                <li className="active">
                  <Link to="/EmailArticleSelect">Select Content</Link>
                </li>
                <li className="active">
                  <Link to="/CreateEmail">Create Your Email</Link>
                </li>
                <li className="active active-main">
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
                  <Link
                    to={templateId === 2 ? "/VerifyHCP" : "/SelectSmartList"}
                    state={{ UserSelected: templateId }}
                  >
                    <button
                      className="btn btn-primary btn-filled next"
                      onClick={nextClicked}
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

                        // onChange={(event) => handleInputChange(event)}
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
  

  old_object = state.getEmailData;
  console.log(old_object);
  return state;
};

export default connect(mapStateToProps, { getEmailData, getSelected,getSelectedSmartListData  })(
  SelectHCP
);
