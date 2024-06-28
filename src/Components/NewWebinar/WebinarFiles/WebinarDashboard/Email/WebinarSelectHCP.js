import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../../../../CommonComponent/LoginLayout';
import axios from 'axios'
import { connect } from 'react-redux'
import { getWebinarEmailData, getWebinarSelectedSmartListData, getWebinarSelected } from '../../../../../actions'
import { postData } from '../../../../../axios/apiHelper';
import { ENDPOINT } from '../../../../../axios/apiConfig';
import { loader } from '../../../../../loader';
import { popup_alert } from '../../../../../popup_alert';
import { toast } from 'react-toastify';

var old_object = {};
var new_object;
var draft_object;
var old_object = {};
const WebinarSelectHCP = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const switch_account_detail = JSON.parse(localStorage.getItem("switch_account_detail"))
  const [localStorageUserId,setLocalStorageUserId]=useState(switch_account_detail != null && switch_account_detail != "undefined" && switch_account_detail
  ? switch_account_detail?.user_id
  : localStorage.getItem("user_id"))
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
  const campaign_id = old_object?.campaign_id
    ? old_object?.campaign_id
    : props?.getWebinarDraftData?.campaign_id
      ? props?.getWebinarDraftData?.campaign_id
      : 0;
  const [campaign_id_st, setCampaign_id] = useState(campaign_id);
  // const userIdArray =
  //   ["iSnEsKu5gB/DRlycxB6G4g==", "B7SHpAc XDXSH NXkN0rdQ==", "UbCJcnLM9fe HsRMgX8c1A==", "wW0geGtDPvig5gF 6KbJrg==", "z2TunmZQf3QwCsICFTLGGQ==", "qDgwPdToP05Kgzc g2VjIQ=="];
  const userIdArray =  ["iSnEsKu5gB/DRlycxB6G4g=="];
  const currentUserId = localStorageUserId
  let sendOptions = [];
  if(currentUserId == "iSnEsKu5gB/DRlycxB6G4g=="){
    sendOptions = [
      { id: 3, navigateUrl: "/webinar/email/selectSmartListUsers", label: "All HCPs", alt: "Internal HCPs", value: "Internal HCPs", imageUrl: `${path_image}all-hcps.svg`, tooltipMessage: "Everyone from your CRM" },
      { id: 4, navigateUrl: "/webinar/email/selectSmartListUsers", label: "US list", alt: "US List", value: "US List", imageUrl: `${path_image}us-list.svg` },
      { id: 6, navigateUrl: "/webinar/email/selectSmartListUsers", label: "Registered HCPs", alt: "Registered HCPs", value: "Registered HCPs", imageUrl: `${path_image}registred-hcps.svg`, tooltipMessage: "HCPs who HAVE registered to this event" },
      { id: 5, navigateUrl: "/webinar/email/selectSmartListUsers", label: "Non registered HCPs", alt: "Non Registered HCPs", value: "Non Registered HCPs", imageUrl: `${path_image}not-registred-hcps.svg`, tooltipMessage: "The remaining who have NOT yet registered" },
      { id: 2, navigateUrl: "/webinar/email/verifyHCP", 
      label: currentUserId == userId ? "Single User" : "Single HCP",
       alt: "Single HCP", value: "Single HCP", imageUrl: `${path_image}single-hcp.svg`, tooltipMessage: "Single HCP - Find or upload a new individual HCP (or a few)" },
      { id: 1, navigateUrl: "/webinar/email/selectSmartList", 
      label: "Group of HCPs", 
      alt: "Group HCPs", value: "group of HCPs", imageUrl: `${path_image}group-hcp.svg`, tooltipMessage: "Use an existing SmartList or create/upload a new segment of HCPs" }
    ];
  }else if(currentUserId == "z2TunmZQf3QwCsICFTLGGQ=="){
    sendOptions = [
      { id: 3, navigateUrl: "/webinar/email/selectSmartList", label: "Internal HCPs", alt: "Internal HCPs", value: "Internal HCPs", imageUrl: `${path_image}group-hcp.svg`, tooltipMessage: "List of all internal readers" },
      { id: 5, navigateUrl: "/webinar/email/selectSmartList", label: "IBU HCPs",alt: "IBU HCP", value: "IBU HCP", imageUrl: `${path_image}group-hcp.svg`, tooltipMessage: "IBU HCPs - List of all IBU readers from Mena region" },
      { id: 2, navigateUrl: "/webinar/email/verifyHCP", 
        label: currentUserId == userId ? "Single User" : "Single HCP",
         alt: "Single HCP", value: "Single HCP", imageUrl: `${path_image}single-hcp.svg`, tooltipMessage: "Single HCP - Find or upload a new individual HCP (or a few)" },
      { id: 1, navigateUrl: "/webinar/email/selectSmartList", 
      label: "Group of HCPs", 
      alt: "Group HCPs", value: "group of HCPs", imageUrl: `${path_image}group-hcp.svg`, tooltipMessage: "Use an existing SmartList or create/upload a new segment of HCPs" }
    ];
  }else{
    sendOptions = [
      { id: 2, navigateUrl: "/webinar/email/verifyHCP", 
        label: currentUserId == userId ? "Single User" : "Single HCP",
         alt: "Single HCP", value: "Single HCP", imageUrl: `${path_image}single-hcp.svg`, tooltipMessage: "Single HCP - Find or upload a new individual HCP (or a few)" },
        { id: 1, navigateUrl: "/webinar/email/selectSmartList", 
        label: "Group of HCPs", 
        alt: "Group HCPs", value: "group of HCPs", imageUrl: `${path_image}group-hcp.svg`, tooltipMessage: "Use an existing SmartList or create/upload a new segment of HCPs" }
    ];
  }

  const [typeOfHcp, setTypeOfHcp] = useState(null)

  const backClicked = () => {
    let event_Id = eventId
    navigate("/webinar/email/create-new-email", {
      state: { eventId: event_Id },
    });
  };

  const saveAsDraft = async () => {
    const body = {
      pdf_id: 0,
      user_id: localStorageUserId,
      event_id: eventId,
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
      status: old_object?.status ? old_object?.status
        : props?.getWebinarDraftData?.status
        ? props?.getWebinarDraftData?.status
        :2,
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

  const fetchDataAndNavigate = async (endpoint, body, selected) => {
    loader("show");
    const response = await postData(endpoint, body);
    loader("hide");
    const data = response?.data?.data;
    if (data?.length) {
      if (new_object?.id && data[0].id !== new_object.id) {
        if (old_object?.removedHcp) {
          old_object.removedHcp = [];
        }
      }
      props.getWebinarSelectedSmartListData(data[0]);
      navigate("/webinar/email/selectSmartListUsers", {
        state: { smartListSelected: data[0], flag: 1, typeOfHcp: selected },
      });
    } else {
      props.getWebinarSelectedSmartListData(null);
      toast.warning("No Data Found")
    }
  };

  const nextClicked = async (selected) => {
    setTypeOfHcp(selected)
    props.getWebinarEmailData(old_object);
    const option = sendOptions.find((item) => item?.id == selected);
    let url = option?.navigateUrl || "";

    props.getWebinarSelected(null);
    // props.getWebinarSelectedSmartListData(null);

    if (draft_object?.campaign_data?.typeOfHcp != selected) {
      if (old_object?.removedHcp) {
        old_object.removedHcp = [];
      }
      if (old_object?.addedHcp) {
        old_object.addedHcp = [];
      }
      if (old_object?.selectedHcp) {
        old_object.selectedHcp = [];
      }

      if (draft_object?.campaign_data?.removedHcp) {
        draft_object.campaign_data.removedHcp = [];
      }

      if (draft_object?.campaign_data?.addedHcp) {
        draft_object.campaign_data.addedHcp = [];
      }
      if (draft_object?.campaign_data?.selectedHcp) {
        draft_object.campaign_data.selectedHcp = [];
      }
    }

    if (selected == 1 || selected == 2) {
      // if(localStorageUserId == 'z2TunmZQf3QwCsICFTLGGQ=='){
      //   let endpoint = selected == 1 ? ENDPOINT.OWN_USERS_LISTING : ENDPOINT.IBU_USERS_LISTING;
      //   const body = { eventId: eventId };
      //   await fetchDataAndNavigate(endpoint, body, selected);
      // }else{
        navigate(url, {
          state: { typeOfHcp: selected, flag: 2, thisEventToggled: location?.state?.thisEventToggled },
        });
      // }
    } else if (selected == 3 || selected == 4 || selected == 5 || selected == 6) {
      let endpoint;
      switch (selected) {
        case 3:
          endpoint = ENDPOINT.INTERNAL_HCP;
          break;
        case 4:
          endpoint = ENDPOINT.US_LIST;
          break;
        case 5:
          endpoint = ENDPOINT.NO_REGISTERED_USERS;
          break;
        case 6:
          endpoint = ENDPOINT.REGISTERED_USERS;
          break;
        default:
          break
      }

      if(localStorageUserId == 'z2TunmZQf3QwCsICFTLGGQ==' && (selected == 3 || selected == 5)){
        endpoint = selected == 3 ? ENDPOINT.OWN_USERS_LISTING : ENDPOINT.IBU_USERS_LISTING;
      }

      const body = { eventId: eventId };
      await fetchDataAndNavigate(endpoint, body, selected);
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
  return (<>
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
                  {
                    // localStorage.getItem('user_id') != 'z2TunmZQf3QwCsICFTLGGQ==' ?
                    <ul className='send-option-new'>
                      {sendOptions?.filter((item) => {
                        if (item.id == 1 || item.id == 2) {
                          return false
                        }
                        return true

                      })?.map(option => {
                        if (option?.id == 4 && !userIdArray?.includes(currentUserId)) {
                          return null
                        } else {
                          return (<>
                            <li key={option?.id} className={`${localStorage.getItem("inviteFlag") !== "1" && option.id === 5 && localStorageUserId != 'z2TunmZQf3QwCsICFTLGGQ==' ? "disabled" : ''} ${localStorage.getItem("registerFlag") !== "1" && option.id === 6 ? "disabled" : ''}`}>
                              <div
                                className={templateId === option.id ? "send-option-img active" : "send-option-img"}
                                onClick={(e) => handleInputChange(e, option?.id)}
                              >
                                <input type="radio" name="select-option-hcp" value={option?.value} />
                                <img src={option?.imageUrl} alt={option.alt} />
                              </div>
                              <p>{option?.label} <img src={path_image + "info_circle_icon.svg"} alt={option?.tooltipMessage} title={option?.tooltipMessage} /></p>
                            </li>
                          </>)
                        }

                      }
                      )}
                    </ul>
                    // : null
                  }
                  <ul>

                    {sendOptions?.filter((item) => item.id == 1 || item.id == 2)?.map(option => {
                      if (option?.id == 4 && !userIdArray?.includes(currentUserId)) {
                        return null
                      } else {
                        return (<>
                          <li key={option?.id} >
                            <div
                              className={templateId === option.id ? "send-option-img active" : "send-option-img"}
                              onClick={(e) => handleInputChange(e, option?.id)}
                            >
                              <input type="radio" name="select-option-hcp" value={option?.value} />
                              <img src={option?.imageUrl} alt={option.alt} />
                            </div>
                            <p>{option?.label} <img src={path_image + "info_circle_icon.svg"} alt={option?.tooltipMessage} title={option?.tooltipMessage} /></p>
                          </li>
                        </>)
                      }

                    }
                    )}
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
  new_object = state.getWebinarSelectedSmartListData;
  old_object = state.getWebinarEmailData ? state.getWebinarEmailData : {};
  draft_object = state.getWebinarDraftData ? state.getWebinarDraftData : {};
  return state;
};
export default connect(mapStateToProps, {
  getWebinarEmailData,
  getWebinarSelected,
  getWebinarSelectedSmartListData,
})(WebinarSelectHCP)