import React, { useEffect, useState } from "react";
import { getEmailData } from "../../actions";
import { connect, connectAdvanced } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { compose } from "redux";
import { loader } from "../../loader";
//import { connect } from "react-redux";
import { getCampaignId } from "../../actions";
import { popup_alert } from "../../popup_alert";
import { toast } from "react-toastify";

const VerifyMAIL = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [campaign_id_st, setCampaign_id] = useState();
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [SendListData, setSendListData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [templateId, setTemplateId] = useState(0);
  const [tags, setTags] = useState([]);
  const [getSmartListData, setSmartListData] = useState([]);
  const [reRender, setReRender] = useState(0);
  const [template_source_code, setTemplate] = useState(
    props.getEmailData?.template
      ? props.getEmailData.template
      : props.getDraftData.source_code
  );

  var var_template_source_code = template_source_code.replaceAll("800", "450");
  var_template_source_code = var_template_source_code.replaceAll("600", "450");

  const selectedHcp = location.state
    ? location.state.selectedHcp
    : props.getDraftData.campaign_data.selectedHcp;
  const PdfSelected = location.state
    ? location.state.PdfSelected
    : props.getDraftData.PdfSelected;

  const [getpdfdata, setPdfData] = useState([]);

  const [getReaderDetails, setReaderDetails] = useState({});
  const [getSmartListName, setSmartListName] = useState("");
  const [getSmartListPopupStatus, setSmartListPopupStatus] = useState(false);
  const [showLessInfo, setShowLessInfo] = useState(true);

  useEffect(() => {
    console.log(props);

    let campaign_id =
      typeof props.getEmailData === "object" && props.getEmailData !== null && props.getEmailData?.campaign_id
        ? props.getEmailData.campaign_id
        : props.getDraftData?.campaign_id ? props.getDraftData.campaign_id : '';
    setCampaign_id(campaign_id);

    if (
      (typeof props.getSelectedSmartListData === "object" &&
        props.getSelectedSmartListData !== null) ||
      (props.getDraftData !== null && props.getDraftData.smart_list_data)
    ) {
      let smart_list_data =
        typeof props.getSelectedSmartListData === "object" &&
        props.getSelectedSmartListData !== null
          ? props.getSelectedSmartListData
          : props.getDraftData.smart_list_data;
      //console.log(smart_list_data);
      setSmartListData(smart_list_data);
    }

    getpdfData();
  }, []);

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const getpdfData = async () => {
    let pdf_id = props.getEmailData?.PdfSelected
      ? props.getEmailData.PdfSelected
      : props.getDraftData.pdf_id;
    if (typeof pdf_id !== "undefined" && pdf_id != 0) {
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      const body = {
        user_id: 18207,
        pdf_id: pdf_id,
      };
      loader("show");
      await axios
        .post(`emailapi/get_pdf`, body)
        .then((res) => {
          if (res.data.status_code == 200) {
            setPdfData(res.data.response.data);
          } else {
            toast.error(res.data.message);
          }
          loader("hide");
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }
  };

  const handleInputChange = (event, selected) => {
    const div = document.querySelector("div.active");

    if (div) {
      div.classNameNameList.remove("active");
    }
    event.target.classNameNameList.toggle("active");
    setTemplateId(selected);
  };

  const nextClicked = () => {
    console.log("next clicked");
  };

  const saveAsDraft = async () => {
    const body = {
      user_id: 18207,
      pdf_id: props.getEmailData?.PdfSelected
        ? props.getEmailData.PdfSelected
        : props.getDraftData.pdf_id,
      description: props.getEmailData?.emailDescription
        ? props.getEmailData.emailDescription
        : props.getDraftData?.description ? props.getDraftData.description : '',
      creator: props.getEmailData?.emailCreator
        ? props.getEmailData.emailCreator
        : props.getDraftData?.creator ? props.getDraftData.creator : '',
      campaign_name: props.getEmailData?.emailCampaign
        ? props.getEmailData.emailCampaign
        : props.getDraftData.campaign,
      subject: props.getEmailData?.emailSubject
        ? props.getEmailData.emailSubject
        : props.getDraftData.subject,
      route_location: "VerifyMAIL",
      tags: props.getEmailData?.tags
        ? props.getEmailData.tags
        : props.getDraftData.tags,
      campaign_data: {
        template_id: props.getEmailData?.templateId
          ? props.getEmailData.templateId
          : props.getDraftData.campaign_data.template_id,
        smart_list_id:
          typeof getSmartListData !== "undefined" &&
          getSmartListData.hasOwnProperty("id")
            ? getSmartListData.id
            : "",
        selectedHcp: selectedHcp,
        list_selection: props.getEmailData?.selected
          ? props.getEmailData.selected
          : props.getDraftData.campaign_data.list_selection,
      },
      campaign_id: campaign_id_st,
      status: 2,
    };
    // console.log(body);
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
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
        loader("hide");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const createEmail = async () => {
    let finalTags = props.getEmailData?.tags
      ? props.getEmailData.tags.map((tags) => {
          return tags.innerHTML || tags;
        })
      : props.getDraftData.tags.map((tags) => {
          return tags.innerHTML || tags;
        });

    let user_list =
      props.getEmailData?.selectedHcp || location.state
        ? selectedHcp.map((userId) => {
            return userId.profile_user_id || userId.user_id;
          })
        : props.getDraftData.campaign_data.selectedHcp.map((userId) => {
            return userId.profile_user_id || userId.user_id;
          });

    const body = {
      user_id: 18207,
      route_location: "VerifyMAIL",
      pdf_id: props.getEmailData?.PdfSelected
        ? props.getEmailData.PdfSelected
        : props.getDraftData.pdf_id,
      subject: props.getEmailData?.emailSubject
        ? props.getEmailData.emailSubject
        : props.getDraftData.subject,
        description: props.getEmailData?.emailDescription
        ? props.getEmailData.emailDescription
        : props.getDraftData?.description ? props.getDraftData.description : '',
      creator: props.getEmailData?.emailCreator
        ? props.getEmailData.emailCreator
        : props.getDraftData?.creator ? props.getDraftData.creator : '',
      campaign_name: props.getEmailData?.emailCampaign
        ? props.getEmailData.emailCampaign
        : props.getDraftData.campaign,
      tags: finalTags,
      template_source_code: props.getEmailData?.template
        ? props.getEmailData.template
        : props.getDraftData.source_code,
      // campaign_id: props.getEmailData ? "" : props.getDraftData.campaign_id,
      campaign_id: campaign_id_st,
      campaign_data: {
        user_list: user_list,
        smart_list_id:
          typeof getSmartListData !== "undefined" &&
          getSmartListData.hasOwnProperty("id")
            ? getSmartListData.id
            : "",
        template_id: props.getEmailData?.templateId
          ? props.getEmailData.templateId
          : props.getDraftData.campaign_data.template_id,
      },
    };
    // console.log(body);
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/send_email`, body)
      .then((res) => {
        loader("hide");
        if (res.data.status_code === 200) {
          popup_alert({
            visible: "show",
            message: "Mail sent successfully",
            type: "success",
            redirect: "/EmailList",
          });
        } else {
          popup_alert({
            visible: "show",
            message: res.data.message,
            type: "error",
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const removeTag = (i) => {
    const allTags = props.getEmailData?.tags
      ? props.getEmailData.tags
      : props.getDraftData.tags;
    console.log(allTags);
    allTags.splice(i, 1);
    console.log(allTags);
    setReRender(reRender + 1);
    console.log("props.tags");
    //  console.log(props.getEmailData.tags);

    //  props.getEmailData();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeButtonClicked = () => {
    setIsOpen(false);
    navigate("/EmailList");
  };

  const backClicked = () => {
    if (
      typeof getSmartListData !== "undefined" &&
      getSmartListData.hasOwnProperty("id")
    ) {
      navigate("/SelectSmartListUsers");
    } else {
      navigate("/VerifyHCP");
    }
  };

  const openSmartListPopup = async (smart_list_id) => {
    setShowLessInfo(true);
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: 18207,
      list_id: smart_list_id,
    };
    loader("show");
    await axios
      .post(`distributes/get_reders_list`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          setReaderDetails(res.data.response.data);
          setSmartListName(res.data.response.smart_list_name);
          setSmartListPopupStatus(true);
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        toast.warning("Something went wrong");
        loader("hide");
      });
  };

  const showMoreInfo = (e) => {
    e.preventDefault();
    setShowLessInfo(!showLessInfo);
  };

  return (
    <>
      <div className="right-sidebar">
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
                <li className="active">
                  <Link to="/SelectHCP">Select HCPs</Link>
                </li>
               
                {
                   typeof getSmartListData !== "undefined" &&
                   getSmartListData.hasOwnProperty("id")
                     ? <li className="active">
                     <Link to="/SelectSmartList">Select Smart List</Link>
                   </li>
                     :  ""

                }

                {
                   typeof getSmartListData !== "undefined" &&
                   getSmartListData.hasOwnProperty("id")
                     ? <li className="active">
                     <Link to="/SelectSmartListUsers">Verify Your List</Link>
                   </li>
                     :  <li className="active">
                     <Link to="/VerifyHCP">Verify Your List</Link>
                   </li>

                }

                

                <li className="active active-main">
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
                <button
                  className="btn btn-primary btn-filled next send_btn"
                  onClick={createEmail}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="verify_email">
          <div className="row">
            <div className="col-12 verify-left">
              <div className="verify-mail-box">
                <div className="verify-email-detail">
                  <h4>Email Details</h4>
                  <h6>
                    <strong>Campaign Title | </strong>
                    {props.getEmailData?.emailCampaign
                      ? props.getEmailData.emailCampaign
                      : props.getDraftData.campaign}
                  </h6>
                  <h6>
          
                    <strong>Creator | </strong>
                    {props.getEmailData?.emailCreator
        ? props.getEmailData.emailCreator
        : props.getDraftData?.creator ? props.getDraftData.creator : ''}
                  </h6>
                  <h6>
                    <strong>Tags | </strong>
                    <ul>
                      {props.getEmailData?.tags
                        ? props.getEmailData.tags.map((tags, i) => {
                            console.log(tags);
                            return (
                              <>
                                <li className="list1">
                                  {tags.innerHTML || tags}{" "}
                                  <img
                                    src={path_image + "filter-close.svg"}
                                    alt="Close-filter"
                                    onClick={() => removeTag(i)}
                                  />
                                </li>
                              </>
                            );
                          })
                        : props.getDraftData.tags.map((tags, i) => {
                            return (
                              <>
                                <li className="list1">
                                  {tags.innerHTML || tags}{" "}
                                  <img
                                    src={path_image + "filter-close.svg"}
                                    alt="Close-filter"
                                    onClick={() => removeTag(i)}
                                  />
                                </li>
                              </>
                            );
                          })}
                    </ul>
                  </h6>
                </div>
                <div className="mail-recipt">
                  <div className="row">
                    <div className="col-12 col-md-12 mail-recipt-right">
                      <h6>Content that will be send</h6>
                      <p>
                        Content <span>| 1</span>
                      </p>
                      {typeof getpdfdata !== "undefined" && (
                        <div className="mail-content-select-box">
                          <div className="mail-content-select-top">
                            <div className="mail-preview-img">
                              <img
                                src={path_image + "dummy-img.png"}
                                alt="Preview "
                              />
                            </div>
                            <div className="mail-box-content">
                              <h5>{getpdfdata.pdf_title}</h5>
                              <p>{getpdfdata.pdf_sub_title}</p>
                              <div className="mailbox-tags">
                                <ul>
                                  {typeof getpdfdata.pdf_tags !== "undefined" &&
                                  getpdfdata.pdf_tags.length > 0 ? (
                                    getpdfdata.pdf_tags.map((tag) => {
                                      return <li className="list1">{tag}</li>;
                                    })
                                  ) : (
                                    <li className="list1">N/A</li>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="mail-content-table">
                            <table>
                              <tbody>
                                <tr>
                                  <th>Upload Date</th>
                                  <td>{getpdfdata.pdf_created}</td>
                                </tr>
                                <tr>
                                  <th>Language</th>
                                  <td>{getpdfdata.pdf_language}</td>
                                </tr>
                                <tr>
                                  <th>SPC</th>
                                  <td>
                                    {getpdfdata.pdf_spc_included === 0
                                      ? "No"
                                      : "Yes"}
                                  </td>
                                </tr>
                                <tr>
                                  <th>Last Email</th>
                                  <td>
                                    {getpdfdata.pdf_last_sent == ""
                                      ? "N/A"
                                      : getpdfdata.pdf_last_sent}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mail-content-footer">
                            <a
                              href={getpdfdata.pdf_preview_link}
                              target="_blank"
                            >
                              <button className="btn btn-primary btn-filled">
                                Preview
                              </button>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-12 col-md-12 mail-recipt-left">
                      <h6>
                        The recipients <span>| {selectedHcp.length}</span>
                      </h6>
                      <p>{/* Single HCP <span>| 1</span> */}</p>

                      {getSmartListData.length !== 0 && (
                        <div className="smartlist-view email_box_outer">
                          <div className="smartlist-view email_box">
                            <div className="mail-box-content">
                              <h5>{getSmartListData.name}</h5>

                              <div className="mailbox-table">
                                <table>
                                  <tbody>
                                    <tr>
                                      <th>Contact Type</th>
                                      <td>NA</td>
                                    </tr>
                                    <tr>
                                      <th>Speciality</th>
                                      <td>NA</td>
                                    </tr>
                                    <tr>
                                      <th>Readers</th>
                                      <td>NA</td>
                                    </tr>
                                    <tr>
                                      <th>IBU</th>
                                      <td>NA</td>
                                    </tr>
                                    <tr>
                                      <th>Product</th>
                                      <td>NA</td>
                                    </tr>
                                    <tr>
                                      <th>Country</th>
                                      <td>NA</td>
                                    </tr>
                                    <tr>
                                      <th>Registered</th>
                                      <td>NA</td>
                                    </tr>
                                    <tr>
                                      <th>Created By</th>
                                      <td>
                                        <span>{getSmartListData.creator}</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>

                              <div className="mail-time">
                                <span>{getSmartListData.created_at}</span>
                              </div>
                              <div className="smart-list-added-user">
                                <img
                                  src={path_image + "smartlist-user.svg"}
                                  alt="User icon"
                                />
                                {getSmartListData.readers_count}
                              </div>
                              {/* <div className="mail-stats">
                              <ul>
                                <li>
                                  <div className="mail-status smartlist_view">
                                    <svg
                                      width="16"
                                      height="14"
                                      viewBox="0 0 16 14"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M9.65531 2.57856C10.3951 3.04241 10.9139 3.82733 11.0083 4.73845C11.31 4.87942 11.6449 4.96049 11.9999 4.96049C13.296 4.96049 14.3465 3.91 14.3465 2.6141C14.3465 1.31801 13.296 0.267517 11.9999 0.267517C10.7162 0.267916 9.67488 1.29964 9.65531 2.57856ZM8.11801 7.38316C9.4141 7.38316 10.4646 6.33246 10.4646 5.03657C10.4646 3.74067 9.4139 2.69018 8.11801 2.69018C6.82211 2.69018 5.77102 3.74087 5.77102 5.03677C5.77102 6.33266 6.82211 7.38316 8.11801 7.38316ZM9.11339 7.5431H7.12223C5.46552 7.5431 4.11771 8.89111 4.11771 10.5478V12.9829L4.1239 13.021L4.29163 13.0735C5.87266 13.5675 7.24622 13.7322 8.37679 13.7322C10.585 13.7322 11.8649 13.1027 11.9438 13.0625L12.1005 12.9833H12.1173V10.5478C12.1179 8.89111 10.7701 7.5431 9.11339 7.5431ZM12.9957 5.12063H11.0199C10.9985 5.91115 10.6611 6.62299 10.1273 7.13496C11.6 7.57285 12.6774 8.93843 12.6774 10.5514V11.3018C14.6282 11.2303 15.7524 10.6774 15.8265 10.6403L15.9832 10.5608H16V8.12495C16 6.46844 14.6522 5.12063 12.9957 5.12063ZM4.0005 4.96089C4.45955 4.96089 4.88666 4.82691 5.24847 4.59868C5.36348 3.8485 5.76563 3.19296 6.3401 2.74649C6.34249 2.70256 6.34669 2.65903 6.34669 2.6147C6.34669 1.31861 5.29599 0.268116 4.0005 0.268116C2.70421 0.268116 1.65391 1.31861 1.65391 2.6147C1.65391 3.9102 2.70421 4.96089 4.0005 4.96089ZM6.10787 7.13496C5.57674 6.62559 5.24048 5.91754 5.21592 5.13181C5.14264 5.12642 5.07016 5.12063 4.99548 5.12063H3.00452C1.34781 5.12063 0 6.46844 0 8.12495V10.5604L0.00618994 10.5979L0.173917 10.6508C1.44226 11.0468 2.57422 11.2293 3.55742 11.2868V10.5514C3.55782 8.93843 4.63487 7.57325 6.10787 7.13496Z"
                                        fill="#FAC755"
                                      ></path>
                                    </svg>
                                  </div>
                                  <span>10%</span>
                                </li>
                                <li>
                                  <div className="mail-status mail_click">
                                    <svg
                                      width="14"
                                      height="16"
                                      viewBox="0 0 14 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M2.96391 5.30631C2.85416 4.93468 2.74879 4.56243 2.6696 4.20577C2.14894 3.89774 1.79477 3.33718 1.79477 2.68932C1.79477 1.71473 2.58729 0.922837 3.56126 0.922837C4.53522 0.922837 5.32774 1.71535 5.32774 2.68932C5.32774 2.82338 5.30966 2.95246 5.2816 3.07779C5.45058 3.45004 5.58713 3.86906 5.70685 4.29493C6.04356 3.84599 6.25058 3.29415 6.25058 2.68932C6.25058 1.20343 5.04715 0 3.56126 0C2.07536 0 0.872559 1.20343 0.872559 2.68932C0.872559 3.96882 1.76734 5.03445 2.96391 5.30631Z"
                                        fill="#C8D1D9"
                                      ></path>
                                      <path
                                        d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z"
                                        fill="#C8D1D9"
                                      ></path>
                                    </svg>
                                  </div>
                                  <span>60%</span>
                                </li>
                              </ul>
                            </div> */}
                              <div className="smartlist-buttons">
                                <button
                                  className="btn btn-primary btn-bordered view"
                                  onClick={() =>
                                    openSmartListPopup(getSmartListData.id)
                                  }
                                >
                                  View
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 verify-right">
              <div className="preview_mail">
                <h4>Preview Your Email</h4>
                <p>
                  {props.getEmailData?.emailSubject
                    ? props.getEmailData.emailSubject
                    : props.getDraftData.subject}
                </p>
                <div
                  className="preview-mail-box"
                  dangerouslySetInnerHTML={{
                    __html: var_template_source_code,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Modal
        id="add_hcp"
        show={isOpen}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div
          //className="modal fade"
          //id="add_hcp"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          //aria-labelledby="add_hcp"
          aria-hidden="true"
        >
          {/* <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content"> */}
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Email Sent
            </h5>
          </div>
          <div className="modal-body">Email has been sent successfuly</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={closeButtonClicked}
              //  onClick={saveClicked}
            >
              Close
            </button>
          </div>
        </div>
        {/* </div>
        </div> */}
      </Modal>

      {/* Reader Details popup */}
      <Modal
        show={getSmartListPopupStatus}
        className="smart_list_popup"
        id="smart_list_popup_id"
      >
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            {typeof getReaderDetails !== "undefined" &&
              getReaderDetails.length > 0 &&
              getSmartListName}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() =>
              setSmartListPopupStatus(
                (getSmartListPopupStatus) => !getSmartListPopupStatus
              )
            }
          ></button>
        </Modal.Header>
        <Modal.Body>
          <section className="search-hcp">
            <div className="result-hcp-table">
              <div className="table-title">
                <h4>
                  HCPs{" "}
                  <span>
                    |
                    {typeof getReaderDetails !== "undefined" &&
                      getReaderDetails.length > 0 &&
                      getReaderDetails.length}
                  </span>
                </h4>
                <div className="selected-hcp-table-action">
                  <a
                    className="show-less-info"
                    onClick={(e) => showMoreInfo(e)}
                  >
                    {showLessInfo == true ? (
                      <p className="show_more">Show More information</p>
                    ) : (
                      <p className="show_less">Show less information</p>
                    )}{" "}
                  </a>
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
                      <th scope="col">Business Unit</th>
                      <th scope="col">Contact Type</th>
                      {showLessInfo == false ? (
                        <>
                          <th scope="col">Consent</th>
                          <th scope="col">Email Received</th>
                          <th scope="col">Openings</th>
                          <th scope="col">Registrations</th>
                          <th scope="col">Last Email</th>
                        </>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {typeof getReaderDetails !== "undefined" &&
                      getReaderDetails.length > 0 &&
                      getReaderDetails.map((rr, i) => {
                        return (
                          <>
                            <tr>
                              <td>{rr.first_name}</td>
                              <td>{rr.email}</td>
                              <td>{rr.bounce}</td>
                              <td>{rr.country}</td>
                              <td>{rr.ibu}</td>
                              <td>{rr.contact_type}</td>
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.consent}</span>{" "}
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.email_received}</span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.email_opening}</span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.registration}</span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr.last_email}</span>
                                </td>
                              ) : null}
                              <td className="add-new-hcp" colspan="12"></td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </Modal.Body>
      </Modal>
      {/*Reader Details popup end*/}
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state);

  //  let emailData = state.getEmailData;
  return state;
};
export default connect(mapStateToProps)(VerifyMAIL);
