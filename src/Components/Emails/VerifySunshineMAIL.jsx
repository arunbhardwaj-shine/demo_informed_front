import React, { useEffect, useState } from "react";
 
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Modal,Tab,Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Select, { createFilter } from "react-select";
import {getSelected } from "../../actions";
import { loader } from "../../loader";
 
import { popup_alert } from "../../popup_alert";
import { toast } from "react-toastify";

var selected_Data = [];
const VerifySunshineMAIL = (props) => {
  const groupId= localStorage.getItem("group_id")
  const location = useLocation();
  const navigate = useNavigate();
  const [campaign_id_st, setCampaign_id] = useState();
  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [templateId, setTemplateId] = useState(0);
  const [isOpenaddNewClient, setIsOpenAddNewClient] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [countryall, setCountryall] = useState([]);
  const contactOptions = [
    {value :"Client", label :"Client"}
  ];
  const filterConfig = {
    matchFrom: "start",
  };
  const [template_source_code, setTemplate] = useState(
    props?.getEmailData?.template
      ? props?.getEmailData?.template
      : props?.getDraftData?.source_code
  );

  var var_template_source_code = template_source_code?.replaceAll("800", "450");
  var_template_source_code = var_template_source_code?.replaceAll("600", "450");

//   let selectedHcp = (location?.state?.selectedHcp&&location?.state?.selectedHcp!="undefined")
//     ? location?.state?.selectedHcp
//     : props?.getDraftData?.campaign_data?.selectedHcp ?
//       props?.getDraftData?.campaign_data?.selectedHcp
//     : props?.getSelected ? 
//       props?.getSelected
//     : [];


    const [selectedUser, setSelectedUser] = useState(selected_Data ? selected_Data : []);
     
    const searchedUsers = location?.state
    ? location?.state?.searchedUsers
    : props?.getDraftData?.campaign_data?.searchedUsers
    ?props?.getDraftData?.campaign_data?.searchedUsers
    :[];

  const PdfSelected = location?.state
    ? location?.state?.PdfSelected
    : props?.getDraftData?.PdfSelected;
    
    const [formData, setFormData] = useState({
        id: "",
        name:"",
        firstName: "",
        lastName: "",
        email: "",
        contact_type: "",
        country: "",
        company: "",
    });

  const [getpdfdata, setPdfData] = useState([]);
  const [getSelectedPdfId, setSelectedPdfId] = useState(PdfSelected);
  const BrokenImage =
    "https://docintel.s3-eu-west-1.amazonaws.com/cover/default/default.png";

  useEffect(() => {
    let campaign_id =
      typeof props?.getEmailData === "object" &&
      props?.getEmailData !== null &&
      props?.getEmailData?.campaign_id
        ? props?.getEmailData?.campaign_id
        : props?.getDraftData?.campaign_id
        ? props?.getDraftData?.campaign_id
        : "";
    setCampaign_id(campaign_id);

    if (
      (typeof props?.getSelectedSmartListData === "object" &&
        props?.getSelectedSmartListData !== null) ||
      (props?.getDraftData !== null && props?.getDraftData?.smart_list_data)
    ) {
      let smart_list_data =
        typeof props?.getSelectedSmartListData === "object" &&
        props?.getSelectedSmartListData !== null
          ? props?.getSelectedSmartListData
          : props?.getDraftData?.smart_list_data;
      setSmartListData(smart_list_data);
    }

    if (location.state?.removedHcp) {
      if (
        typeof location.state.removedHcp != "undefined" &&
        location.state.removedHcp != ""
      ) {
        setRemovedHcp(location.state.removedHcp);
      }
    } else {
      if (props?.getDraftData?.campaign_data) {
        if (props?.getDraftData?.campaign_data?.removedHcp) {
          if (
            typeof props?.getDraftData?.campaign_data.removedHcp != "undefined" &&
            props?.getDraftData?.campaign_data.removedHcp != ""
          ) {
            setRemovedHcp(props?.getDraftData?.campaign_data.removedHcp);
          }
        }
      }
    }

    getpdfData();
    getalCountry();

  }, []);

  axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
  const getpdfData = async () => {
    let pdf_id = props?.getEmailData?.PdfSelected
      ? props?.getEmailData?.PdfSelected
      : props?.getDraftData?.pdf_id;
    setSelectedPdfId(pdf_id);
    if (
      typeof pdf_id !== "undefined" &&
      pdf_id != 0 &&
      pdf_id != 13 &&
      pdf_id != 14 &&
      pdf_id != 16
    ) {
      axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
      const body = {
        user_id: localStorage.getItem("user_id"),
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

  const getalCountry = async () => {
    const body = {
      user_id: localStorage.getItem("user_id"),
      language: "",
      ibu: "",
    };

    await axios
      .post(`distributes/filters_list`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          let country = res.data.response.data.country;

          let arr = [];
          Object.entries(country).map(([index, item]) => {
            let label = item;
            if (index == "B&H") {
              label = "Bosnia and Herzegovina";
            }
            arr.push({
              value: item,
              label: label,
            });
          });
          setCountryall(arr);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  const createEmail = async () => {
      let finalTags = props?.getEmailData?.tags
        ? props?.getEmailData?.tags.map((tags) => {
            return tags.innerHTML || tags;
          })
        : props?.getDraftData?.tags.map((tags) => {
            return tags.innerHTML || tags;
          });

      let user_list = selectedUser.map((userId) => {return userId.id || userId.id});
      const body = {
        user_id: localStorage.getItem("user_id"),
        route_location: "Verify-sunshine-mail",
        pdf_id: props?.getEmailData?.PdfSelected
          ? props?.getEmailData?.PdfSelected
          : props?.getDraftData?.pdf_id,
        subject: props?.getEmailData?.emailSubject
          ? props?.getEmailData?.emailSubject
          : props?.getDraftData?.subject,
        description: props?.getEmailData?.emailDescription
          ? props?.getEmailData?.emailDescription
          : props?.getDraftData?.description
          ? props?.getDraftData?.description
          : "",
        creator: props?.getEmailData?.emailCreator
          ? props?.getEmailData?.emailCreator
          : props?.getDraftData?.creator
          ? props?.getDraftData?.creator
          : "",
        campaign_name: props?.getEmailData?.emailCampaign
          ? props?.getEmailData?.emailCampaign
          : props?.getDraftData?.campaign,
        tags: finalTags,
        template_source_code: props?.getEmailData?.template
          ? props?.getEmailData?.template
          : props?.getDraftData?.source_code,
        campaign_id: campaign_id_st,
        campaign_data: {
          user_list: user_list,
          template_id: props?.getEmailData?.templateId
            ? props?.getEmailData?.templateId
            : props?.getDraftData?.campaign_data.template_id,
          list_selection: props?.getEmailData?.selected
            ? props?.getEmailData?.selected
            : props?.getDraftData?.campaign_data?.list_selection,
        },
      };
      console.log(body,'body');
      axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
    //   loader("show");
    //   if(localStorage.getItem('user_id') == 'rjiGlqA9DXJVH7bDDTX0Lg=='){
    //     await axios
    //       .post(`emailapi/send_email_new`, body)
    //       .then((res) => {
    //         loader("hide");
    //         if (res.data.status_code === 200) {
    //           popup_alert({
    //             visible: "show",
    //             message: res?.data?.message ?res?.data?.message:"Mail sent successfully",
    //             type: "success",
    //             redirect: "/EmailList",
    //           });
    //         } else {
    //           popup_alert({
    //             visible: "show",
    //             message: res.data.message,
    //             type: "error",
    //           });
    //         }
    //       })
    //       .catch((err) => {
    //         loader("hide");
    //         toast.error("Something went wrong");
    //         console.log(err);
    //       });
    //   }else{
    //     await axios
    //       .post(`emailapi/send_email`, body)
    //       .then((res) => {
    //         loader("hide");
    //         if (res.data.status_code === 200) {

    //           if(irtRoleObj?.IRTFlag){
    //             // setSearchedUsers(searchedUsers)
    //             popup_alert({
    //               visible: "show",
    //               message:  res?.data?.message ?  res?.data?.message : "Your changes has been saved <br />successfully !",
    //               type: "success",
    //               redirect: "/IRTRole",
    //             });
    //           }else
    //         {  popup_alert({
    //             visible: "show",
    //             message: res?.data?.message ?res?.data?.message:"Mail sent successfully",
    //             type: "success",
    //             redirect: "/EmailList",
    //           });}
    //         } else {
    //           popup_alert({
    //             visible: "show",
    //             message: res.data.message,
    //             type: "error",
    //           });
    //         }
    //       })
    //       .catch((err) => {
    //         toast.error("Something went wrong");
    //         loader("hide");
    //         console.log(err);
    //       });
    //   }
  };

  const backClicked = () => {
    navigate("/create-sunshine-email");
  };

  const handleCreateMail = () => {
    navigate("/create-sunshine-email");
  };

  const imageOnError = (event) => {
    event.currentTarget.src = BrokenImage;
    event.currentTarget.className = "error";
  };

  const Edit = (e, data) => {
      const userName = data?.name;
      const nameParts = userName.split(" ");
      const firstName = nameParts?.[0];
      const lastName = nameParts.slice(1).join(" ");
      data.firstName = firstName;
      data.lastName = lastName;
      setFormData(data);
      setIsOpenAddNewClient(true);
  }

  const closeNewClientPopup = () => {
    setIsOpenAddNewClient(false);
  }

  const handleChange = (e,isSelectedName) => {
    setFormData({ ...formData, [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName ? e : e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.contact_type) newErrors.contact = "Contact type is required";
    if (!formData.country) newErrors.country = "Country is required";
    setValidationError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
      if (validate()) {
        axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
        loader("show");
        formData.user_id = localStorage.getItem('user_id');
        console.log(formData,'formData');
        await axios
          .post(`emailapi/update_client`, formData)
          .then((res) => {
            if (res?.data?.success) {
              console.log("Form Submitted Successfully!", formData);
              setFormData({ firstName: "", lastName: "", email: "", contact_type: null, country: null });
              setIsOpenAddNewClient(false);
              let newUser = [
                  {
                    'id'    : res?.data?.data?.user_id,
                    'name'  : res?.data?.data?.name,
                    'email' : res?.data?.data?.email,
                    'country' : res?.data?.data?.country,
                    'company' : res?.data?.data?.company,
                    'contact_type' : formData?.contact_type,
                  }
              ]
                setSelectedUser(newUser);
                props.getSelected(newUser);
            } else {
              setIsOpenAddNewClient(false);
              toast.warning(res.data.message);
            }
            loader("hide");
          })
          .catch((err) => {
            setIsOpenAddNewClient(false);
            loader("hide");
            console.log(err);
          });
      }
    }catch(err){
      setIsOpenAddNewClient(false);
      loader("hide");
      console.log(err);
    }
  };
  

  return (
    <>
      <div className="col right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="page-top-nav sticky">
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
                <div className="col-12 col-md-8">
                  <ul className="tabnav-link">
                    <li className="active" onClick={handleCreateMail}>
                      Create Your Email
                    </li>
                    <li className="active active-main">
                      <a href="#">Verify your Email</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-3">
                  <div className="header-btn">
                    <Link to={"/Emaillist-publisher"}
                        className="btn btn-primary btn-bordered move-draft">
                        Cancel
                    </Link>
                    <button
                      className={
                        getSelectedPdfId == 13
                          ? "btn btn-primary btn-filled next send_btn send_disabled"
                          : "btn btn-primary btn-filled next send_btn"
                      }
                      onClick={createEmail}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <section className="verify_email sunshine_mail_verify">
              <div className="row">
                <div className="col-12 verify-left">
                  <div className="verify-mail-box">
                    <div className="verify-email-detail">
                      <div>
                        <h4>Email Details</h4>
                        <h6>
                          <strong>Client Company | </strong>
                          {selectedUser?.[0]?.company}
                        </h6>
                        {/* <h6>
                          <strong>Creator | </strong>
                          {props?.getEmailData?.emailCreator
                            ? props?.getEmailData?.emailCreator
                            : props?.getDraftData?.creator
                            ? props?.getDraftData?.creator
                            : ""}
                        </h6> */}
                        {/* <h6>
                          <strong>Tags | </strong>
                          <ul>
                            {props?.getEmailData?.tags
                              ? props?.getEmailData?.tags.map((tags, i) => {
                                  return (
                                    <React.Fragment key={i+1}>
                                      <li className="list1">
                                        {tags.innerHTML || tags}{" "}
                                        <img
                                          src={path_image + "filter-close.svg"}
                                          alt="Close-filter"
                                          onClick={() => removeTag(i)}
                                        />
                                      </li>
                                    </React.Fragment>
                                  );
                                })
                              : props?.getDraftData?.tags.map((tags, i) => {
                                  return (
                                    <React.Fragment key={i}>
                                      <li className="list1">
                                        {tags?.innerHTML || tags}{" "}
                                        <img
                                          src={path_image + "filter-close.svg"}
                                          alt="Close-filter"
                                          onClick={() => removeTag(i)}
                                        />
                                      </li>
                                    </React.Fragment>
                                  );
                                })}
                          </ul>
                        </h6> */}
                      </div>
                    </div>
                    <div className="mail-recipt sunshine-mail-recipt">
                      <div className="d-flex justify-content-between">
                      <Col className="mail-recipt-left">
                          <h6>
                            The recipients 
                            {/* <span>| {selectedUser?.length}</span> */}
                          </h6>
                            {selectedUser?.length > 0
                                ? 
                                <Col md={12}>
                                    <div className="mail-content-select-box">
                                        <div className="mail-content-select-top">
                                            <div className="mail-box-content">
                                                <h5>{selectedUser?.[0]?.name}</h5>
                                            </div>
                                        </div>
                                        <div className="mail-content-table">
                                            <table>
                                            <tbody>
                                                <tr>
                                                <th>Email</th>
                                                <td>{selectedUser?.[0]?.email}</td>
                                                </tr>
                                                <tr>
                                                <th>Country</th>
                                                <td>{selectedUser?.[0]?.country}</td>
                                                </tr>
                                                <tr>
                                                <th>Contact type</th>
                                                <td>{selectedUser?.[0]?.contact_type}</td>
                                                </tr>
                                                <tr>
                                                <th>Last Email</th>
                                                <td>{selectedUser?.[0]?.last_email ? selectedUser?.[0]?.last_email : "N/A"}</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                        <div className="mail-content-footer">
                                            <button className="btn btn-primary btn-filled"
                                            onClick={(e) => Edit(e,selectedUser?.[0])}>Edit</button>
                                        </div>
                                    </div>
                                </Col>
                                : null
                            }
                        </Col>
                        <Col className="mail-recipt-right">
                          <h6>Content that will be send</h6>
                          {/* <p>
                            Content 
                            <span>| 1</span>
                          </p> */}
                          
                          {typeof getpdfdata !== "undefined" && getpdfdata.hasOwnProperty('pdf_title') &&
                            getSelectedPdfId != 13 &&
                            getSelectedPdfId != 14 &&
                            getSelectedPdfId != 16 && (
                              <Col md={12}>
                                    <div className="mail-content-select-box">
                                        <div className="mail-content-select-top">
                                            <div className="mail-preview-img">
                                                <img
                                                    alt="doc-logo"
                                                    src={getpdfdata?.pdf_cover_img}
                                                    onError={imageOnError}
                                                    style={{ width: "67px" }}
                                                />
                                            </div>
                                            <div className="mail-box-content">
                                                <h5
                                                    dangerouslySetInnerHTML={{
                                                        __html: getpdfdata?.pdf_title,
                                                    }}
                                                ></h5>
                                                <p>{getpdfdata?.pdf_sub_title}</p>
                                            <div className="mailbox-tags">
                                                <ul>
                                                {
                                                    props?.getEmailData?.tags.map((tags, i) => {
                                                        return (
                                                            <React.Fragment key={i+1}>
                                                            <li className="list1">
                                                                {tags.innerHTML || tags}
                                                            </li>
                                                            </React.Fragment>
                                                        );
                                                    })
                                                }
                                                </ul>
                                            </div>
                                            </div>
                                        </div>

                                        <div className="mail-content-table">
                                            <table>
                                            <tbody>
                                                <tr>
                                                <th>Upload date</th>
                                                <td>{getpdfdata?.pdf_created}</td>
                                                </tr>
                                                <tr>
                                                <th>Language</th>
                                                <td>{getpdfdata?.pdf_language}</td>
                                                </tr>
                                                <tr>
                                                <th>Last email</th>
                                                <td>
                                                    {getpdfdata.last_sent == ""
                                                    ? "N/A"
                                                    : getpdfdata.last_sent}
                                                </td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                        <div className="mail-content-footer">
                                            <a href={getpdfdata?.pdf_preview_link} target="_blank">
                                                <button className="btn btn-primary btn-filled">
                                                Preview
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </Col>
                            )}
                        </Col>
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 verify-right">
                  <div className="preview_mail">
                    <h4>
                      {props?.getEmailData?.emailSubject
                        ? props?.getEmailData?.emailSubject
                        : props?.getDraftData?.subject}
                    </h4>
                   

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
        </div>
      </div>



      <Modal
        id="add_hcp"
        show={isOpenaddNewClient}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Add New Client
            </h5>
            <button
              onClick={closeNewClientPopup}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="hcp-add-box">
              <div className="hcp-add-form tab-content" id="upload-confirm">
                <form id="add_hcp_form" className={"tab-pane active"}>
                  <div className="add_hcp_boxes">
                    <div className="form_action">
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label htmlFor="">
                              First name <span>*</span>
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              className={
                                validationError?.firstName
                                  ? "form-control error"
                                  : "form-control"
                              }
                              onChange={handleChange}
                              value={formData.firstName}
                              placeholder="First name"
                            />
                            {validationError?.firstName &&
                              <div className="login-validation">
                                {validationError?.firstName}
                              </div>
                            }
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label htmlFor="">
                              Last name <span>*</span>
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              className={
                                validationError?.lastName
                                  ? "form-control error"
                                  : "form-control"
                              }
                              onChange={handleChange}
                              value={formData.lastName}
                              placeholder="Last name"
                            />
                            {validationError?.lastName &&
                              <div className="login-validation">
                                {validationError?.lastName}
                              </div>
                            }
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label htmlFor="">
                              Email <span>*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              disabled
                              className={
                                validationError?.email
                                  ? "form-control disabled error"
                                  : "form-control disabled"
                              }
                              onChange={handleChange}
                              value={formData.email}
                              placeholder="example@email.com"
                            />
                            {validationError?.email &&
                              <div className="login-validation">
                                {validationError?.email}
                              </div>
                            }
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label htmlFor="">
                              Company <span>*</span>
                            </label>
                            <input
                              type="text"
                              name="company"
                              className={
                                validationError?.company
                                  ? "form-control error"
                                  : "form-control"
                              }
                              onChange={handleChange}
                              value={formData?.company}
                              placeholder="Company"
                            />
                            {validationError?.company &&
                              <div className="login-validation">
                                {validationError?.company}
                              </div>
                            }
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Contact type</label>
                            <Select
                              options={contactOptions}
                              name="contact"
                              className={
                                validationError?.contact
                                  ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                  : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                              }
                              onChange={(e) => handleChange(e?.value, "contact")}
                              value={contactOptions.find(option => option.value === formData.contact_type) || null} 
                              placeholder="Select Contact type"
                              filterOption={createFilter(filterConfig)}
                              isClearable
                            />
                            {validationError?.contact &&
                                <div className="login-validation">
                                  {validationError?.contact}
                                </div>
                              }
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Country</label>
                            <Select
                              options={countryall}
                              name="country"
                              className={
                                validationError?.country
                                  ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                  : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                              }
                              // onChange={handleSelectChange}
                              onChange={(e) => handleChange(e?.value, "country")}
                              value={countryall.find(option => option.value === formData.country) || null}
                              placeholder="Select Country"
                              filterOption={createFilter(
                                filterConfig
                              )}
                              isClearable
                            />
                            {validationError?.country && (
                              <div className="login-validation">
                                {validationError?.country}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" onClick={handleSubmit} className="btn btn-primary save btn-filled">
              Update
            </button>
          </div>
        </div>
      </Modal>
      {/* <Modal
        id="add_hcp"
        show={isOpen}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div
          
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          
          aria-hidden="true"
        >
            
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Email Sent
            </h5>
          </div>
          <div className="modal-body">Email has been sent successfully</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={closeButtonClicked}
               
            >
              Close
            </button>
          </div>
        </div>
         
      </Modal> */}

    </>
  );
};

const mapStateToProps = (state) => {
  selected_Data = state.getSelected;
  return state;
};
export default connect(mapStateToProps,{getSelected})(VerifySunshineMAIL);
