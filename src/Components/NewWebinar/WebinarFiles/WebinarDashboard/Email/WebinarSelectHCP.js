import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { useSidebar } from '../../../../CommonComponent/LoginLayout';
import axios from 'axios'
import {connect} from 'react-redux'
import {getWebinarEmailData,getWebinarSelectedSmartListData,getWebinarSelected} from '../../../../../actions'
import { postData } from '../../../../../axios/apiHelper';
import { ENDPOINT } from '../../../../../axios/apiConfig';
import { loader } from '../../../../../loader';
import { popup_alert } from '../../../../../popup_alert';
import { toast } from 'react-toastify';

var old_object = {};
var new_object;
var draft_object;
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
 const sendOptions = [
    { id: 1, label: localStorage.getItem("user_id") == userId ? "Group of Users" : "Group of HCPs", alt: "Group HCPs", value: "group of HCPs", imageUrl: `${path_image}group-hcp.svg` },
    { id: 2, label: localStorage.getItem("user_id") == userId ? "Single User" : "Single HCP", alt: "Single HCP", value: "Single HCP", imageUrl: `${path_image}single-hcp.svg` },
    { id: 3, label: "Internal Hcp", alt: "Single HCP", value: "Single HCP", imageUrl: `${path_image}single-hcp.svg` },
    { id: 4, label: "US List", alt: "Single HCP", value: "Single HCP", imageUrl: `${path_image}single-hcp.svg` },
    { id: 5, label: "No Register", alt: "Single HCP", value: "Single HCP", imageUrl: `${path_image}single-hcp.svg` },
    { id: 6, label: "Register", alt: "Single HCP", value: "Single HCP", imageUrl: `${path_image}single-hcp.svg` }
  ];
    const backClicked = () => {
        let event_Id =eventId
        navigate("/webinar/email/create-new-email", {
          state: { eventId: event_Id },
        });
      };

      const saveAsDraft = async () => {
        const body = {
          pdf_id:0,

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
            campaign_name: "webinar",
          // campaign_name: old_object?.emailCampaign
          //   ? old_object?.emailCampaign
          //   : props?.getWebinarDraftData?.campaign,
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
          auto_responder_id: old_object?.templateId
          ? old_object?.templateId
          : props?.getWebinarDraftData?.campaign_data?.template_id
        };
    
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
          .post(`emailapi/save_draft`, body)
          .then((res) => {
            loader("hide");
            if (res?.data?.status_code === 200) {
              setCampaign_id(res?.data?.response?.data?.id);
              popup_alert({
                visible: "show",
                message: "Your changes has been saved <br />successfully !",
                type: "success",
                redirect: "/webinar/email",
              });
            } else {
              toast.warning(res?.data?.message);
            }
          })
          .catch((err) => {
            //console.log(err);
            toast.error("Something went wrong");
          });
      };

      const nextClicked = async (selected) => {
        props.getWebinarEmailData(old_object);
        props.getWebinarSelected(null);
        if (selected == 1) {
          navigate("/webinar/email/selectSmartList", {
            state: { UserSelected: selected },
          });
        } else if (selected === 2) {
          navigate("/webinar/email/verifyHCP", {
            state: { UserSelected: selected },
          });
        }
        else if (selected == 3) {
          loader("show")
          let body ={
            eventId:eventId
          }
          const response = await postData(ENDPOINT.INTERNAL_HCP,body)
        let data=response?.data?.data
        if(data?.length){
          if (new_object?.id) {
            if (data[0].id != new_object.id) {
              if (old_object?.removedHcp) {
                old_object.removedHcp = [];
              }
            }
          }
           props.getWebinarSelectedSmartListData( data[0]);
          
          navigate("/webinar/email/selectSmartListUsers", {
            state: { smartListSelected: data[0],flag: 1  ,selected},
          });
        }
        } 
         else if (selected == 4) {
          loader("show")
          let body ={
            eventId:eventId
          }
          const response = await postData(ENDPOINT.US_LIST,body)

          let data=response?.data?.data
          if(data?.length){
          if (new_object?.id) {
            if (data[0].id != new_object.id) {
              if (old_object?.removedHcp) {
                old_object.removedHcp = [];
              }
            }
          }
           props.getWebinarSelectedSmartListData( data[0]);
          
          navigate("/webinar/email/selectSmartListUsers", {
            state: { smartListSelected: data[0],flag: 1  ,selected},
          });
        }
        }
      };

      const handleInputChange = (event, selectede) => {
        if (old_object) {
          old_object.selected = selectede;
          props.getWebinarEmailData(old_object);
        } else {
          props.getWebinarEmailData({ selected: selectede });
        }
    
        if (selectede == 2) {
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
                      // <Link
                      //   to={
                      //     templateId === 2 ? "verifyHCP" : "selectSmartList"
                      //   }
                      //   state={{ UserSelected: templateId }}
                      // >
                        <button
                          className="btn btn-primary btn-filled next"
                          onClick={(event) => nextClicked(templateId)}
                        >
                          Next
                        </button>
                      // </Link>
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
              {sendOptions.map(option => (
                <li key={option.id}>
                  <div
                    className={templateId === option.id ? "send-option-img active" : "send-option-img"}
                    onClick={(e) => handleInputChange(e,option.id)}
                  >
                    <input type="radio" name="select-option-hcp" value={option.value} />
                    <img src={option.imageUrl} alt={option.alt} />
                  </div>
                  <p>{option.label}</p>
                </li>
              ))}
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
  new_object = state.getSelectedSmartListData;
  old_object = state.getWebinarEmailData ? state.getWebinarEmailData : {};
  draft_object = state.getWebinarDraftData ? state.getWebinarDraftData : {};
  return state;
};
export default connect(mapStateToProps, {
    getWebinarEmailData,
    getWebinarSelected,
    getWebinarSelectedSmartListData,
  })(WebinarSelectHCP)