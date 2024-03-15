import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { useSidebar } from '../../../../CommonComponent/LoginLayout';
import axios from 'axios'
import {connect} from 'react-redux'
import {getWebinarEmailData,getWebinarSelectedSmartListData,getWebinarSelected} from '../../../../../actions'

var old_object = {};

const WebinarSelectHCP=(props)=>{
    const navigate = useNavigate();
    let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const [userId, setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==");
    const { eventIdContext, handleEventId } = useSidebar()
    const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"))
    const [eventId, setEventId] = useState(
        eventIdContext?.eventId
            ? eventIdContext?.eventId
            : localStorageEvent?.eventId
    );
    const [selection, setSelection] = useState(0);

    const [templateId, setTemplateId] = useState(
        old_object?.selected
          ? old_object?.selected
          : props?.getWebinarDraftData?.campaign_data?.list_selection
          ? props?.getWebinarDraftData?.campaign_data?.list_selection
          : 0
      );
      const campaign_id = old_object
      ? old_object?.campaign_id
      : props?.getWebinarDraftData
      ? props?.getWebinarDraftData?.campaign_id
      : 0;
      const [campaign_id_st, setCampaign_id] = useState(campaign_id);

    const backClicked = () => {
        let event_Id =eventId
        navigate("/webinar/email/create-new-email", {
          state: { eventId: event_Id },
        });
      };

      const saveAsDraft = async () => {
        const body = {
          user_id: localStorage.getItem("user_id"),
          eventId:eventId,
          description: old_object?.emailDescription
            ? old_object?.emailDescription
            : props?.getWebinarDraftData?.description
            ? props?.getWebinarDraftData?.description
            : "",
          creator: old_object?.emailCreator
            ? old_object?.emailCreator
            : props?.getWebinarDraftData?.creator
            ? props?.getWebinarDraftData?.creator
            : "",
          campaign_name: old_object?.emailCampaign
            ? old_object?.emailCampaign
            : props?.getWebinarDraftData?.campaign,
          subject: old_object?.emailSubject
            ? old_object?.emailSubject
            : props?.getWebinarDraftData?.subject,
          route_location: "webinar/email/selectHCP",
          tags: old_object?.tags ? old_object?.tags : props?.getWebinarDraftData?.tags,
          campaign_data: {
            template_id: old_object?.templateId
              ? old_object?.templateId
              : props?.getWebinarDraftData?.campaign_data?.template_id,
            list_selection: templateId,
          },
          campaign_id: campaign_id_st,
          source_code: old_object?.template
            ? old_object?.template
            : props?.getWebinarDraftData?.source_code,
          status: 2,
        };
    
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        // loader("show");
        // await axios
        //   .post(`emailapi/save_draft`, body)
        //   .then((res) => {
        //     loader("hide");
        //     if (res?.data?.status_code === 200) {
        //       setCampaign_id(res?.data?.response?.data?.id);
        //       popup_alert({
        //         visible: "show",
        //         message: "Your changes has been saved <br />successfully !",
        //         type: "success",
        //         redirect: "/webinar/email",
        //       });
        //     } else {
        //       toast.warning(res?.data?.message);
        //     }
        //   })
        //   .catch((err) => {
        //     //console.log(err);
        //     toast.error("Something went wrong");
        //   });
      };

      const nextClicked = (selected) => {
        props.getWebinarEmailData(old_object);
        props.getWebinarSelected(null);
        if (selected == 1) {
          navigate("/webinar/email/selectSmartList", {
            state: { UserSelected: selected },
          });
        } else if (selected == 2) {
          navigate("/webinar/email/verifyHCP", {
            state: { UserSelected: selected },
          });
        }
      };

      const handleInputChange = (event, selectede) => {
        if (old_object) {
          old_object.selected = selectede;
          props.getWebinarEmailData(old_object);
        } else {
          props.getWebinarEmailData({ selected: selectede });
        }
    
        if (selectede === 2) {
          props.getWebinarSelectedSmartListData(null);
        }
    
        setSelection(event?.target?.children[0]?.value);
        const div = document.querySelector("div.active");
    
        if (div) {
          div.classList.remove("active");
        }
        event.target.classList.toggle("active");
        setTemplateId(selectede);
        nextClicked(selectede);
      };
    return(<>
     <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
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
                      <Link to="/webinar/email/create-new-email">Create Your Email</Link>
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
                        to={
                          templateId === 2 ? "/VerifyHCP" : "/SelectSmartList"
                        }
                        state={{ UserSelected: templateId }}
                      >
                        <button
                          className="btn btn-primary btn-filled next"
                          onClick={(event) => nextClicked(templateId)}
                        >
                          Next
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <section className="send-mail-options webinar">
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

                        <p>
                          {localStorage.getItem("user_id") == userId
                            ? "Group of Users"
                            : "Group of HCPs"}{" "}
                        </p>
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
                        <p>
                          {localStorage.getItem("user_id") == userId
                            ? "Single User"
                            : "Single HCP"}{" "}
                        </p>
                      </li>
                      <li>
                        <div
                          className={
                            templateId === 3
                              ? "send-option-img active"
                              : "send-option-img"
                          }
                          onClick={(e) => handleInputChange(e, 3)}
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
                        <p>
                         Internal Hcp
                        </p>
                      </li>
                      <li>
                        <div
                          className={
                            templateId === 4
                              ? "send-option-img active"
                              : "send-option-img"
                          }
                          onClick={(e) => handleInputChange(e, 4)}
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
                        <p>
                         US List
                        </p>
                      </li>
                      <li>
                        <div
                          className={
                            templateId === 5
                              ? "send-option-img active"
                              : "send-option-img"
                          }
                          onClick={(e) => handleInputChange(e, 5)}
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
                        <p>
                         No Register
                        </p>
                      </li>
                      <li>
                        <div
                          className={
                            templateId === 6
                              ? "send-option-img active"
                              : "send-option-img"
                          }
                          onClick={(e) => handleInputChange(e, 6)}
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
                        <p>
                         Register
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>)

}

const mapStateToProps = (state) => {
    old_object = state.getWebinarEmailData;
    return state;
  };
export default connect(mapStateToProps, {
    getWebinarEmailData,
    getWebinarSelected,
    getWebinarSelectedSmartListData,
  })(WebinarSelectHCP)