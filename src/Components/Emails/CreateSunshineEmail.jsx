import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { getCampaignId, getEmailData, getSearched, getSelected } from "../../actions";
import { useNavigate } from "react-router-dom";
import { Modal, ModalDialog, Dropdown, OverlayTrigger, Tooltip, Button, Container, Row, Table, Form } from "react-bootstrap";
import { loader } from "../../loader";
import { popup_alert } from "../../popup_alert";
import { toast } from "react-toastify";
import Select, { createFilter } from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

var dxr = 0;
var state_object = {};
var searched_Data = {};
var selected_Data = [];
let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
const CreateSunshineEmail = (props) => {
  const navigate = useNavigate();
  const [validator] = React.useState(new SimpleReactValidator());
  const [isOpen, setIsOpen] = useState(false);
  const [modalCounter, setModalCounter] = useState(0);
  const [tagClickedFirst, setTagClickedFirst] = useState([]);
  const [tagsReRender, setTagsReRender] = useState(0);
  const [validationError, setValidationError] = useState({});
  const [isOpen_send, setIsOpensend] = useState(false);
  const [templateSaving, setTemplateSaving] = useState("");
  const [isOpenaddNewClient, setIsOpenAddNewClient] = useState(false);
  const [countryall, setCountryall] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchedUsers, setSearchedUsers] = useState(searched_Data?searched_Data:[]);
  const [tagsCounter, setTagsCounter] = useState(0);
  const [samplePopup, setSamplePopup] = useState(false);
  const [searchSampleUsers, setSearchSampleUsers] = useState([]);
  const [selectedHcp, setSelectedHcp] = useState([]);
  const [selectedClient, setSelectedClient] = useState(selected_Data ? selected_Data : []);
  const [uploadOrDownloadCount, setUploadOrDownloadCount] = useState(0);
  const [mailsIncrement, setMailsIncrement] = useState(0);
  const [showPreogressBar, setShowProgressBar] = useState(false);
  const [allTags, setAllTags] = useState({});
  const [newTag, setNewTag] = useState("");
  const PdfSelected = props.getEmailData ? dxr : props.getDraftData.pdf_id;
  const editorRef = useRef(null);
  const contactOptions = [
    {value :"Client", label :"Client"}
  ];
  const filterConfig = {
    matchFrom: "start",
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    country: "",
    company: "",
  })


  const [emailCampaign, setemailCampaign] = useState(
    state_object != null &&
      state_object != "undefined" &&
      state_object.emailCampaign
      ? state_object.emailCampaign
      : props.getDraftData
        ? props.getDraftData.campaign
        : ""
  );
  const [emailCreator, setEmailCreator] = useState(
    state_object != null &&
      state_object != "undefined" &&
      state_object?.emailCreator
      ? state_object?.emailCreator
      : props.getDraftData
        ? props.getDraftData.creator
        : ""
  );
  const [finalTags, setFinalTags] = useState(
    state_object != null && state_object != "undefined" && state_object.tags
      ? state_object.tags
      : props.getDraftData
        ? props.getDraftData.tags
        : []
  );

  const [emailSubject, setEmailSubject] = useState(
    state_object != null &&
      state_object != "undefined" &&
      state_object.emailSubject
      ? state_object.emailSubject
      : props.getDraftData
        ? props.getDraftData.subject
        : "Invitation to set up your account for Sunshine data collection"
  );

  const [templateId, setTemplateId] = useState(
    state_object != null &&
      state_object != "undefined" &&
      state_object.templateId
      ? state_object.templateId
      : props.getDraftData
        ? props.getDraftData.campaign_data.template_id
        : ""
  );

  const [template, setTemplate] = useState(
    state_object != null && state_object != "undefined" && state_object.template
      ? state_object.template
      : props.getDraftData
        ? props.getDraftData.source_code
        : ""
  );

  const templateIdRef = useRef(state_object != null &&
    state_object != "undefined" &&
    state_object.templateId
    ? state_object.templateId
    : props.getDraftData
      ? props.getDraftData?.campaign_data?.template_id
      : "");

  const [manualEmailSubject, setManualEmailSubject] = useState(
    state_object?.emailSubject ?? props.getDraftData?.subject ?? ""
  );

  const [manualEmailCampaign, setManualEmailCampaign] = useState(
    state_object?.emailCampaign ?? props.getDraftData?.campaign ?? ""
  );

  const [manualEmailCreator, setManualEmailCreator] = useState(
    state_object?.emailCreator ?? props.getDraftData?.creator ?? ""
  );

  useEffect(() => {
    getTemplateListData(0);
    getalCountry();
    getAllTags();
  }, []);

  const getTemplateListData = async (flag) => {
    let pdf_id = state_object?.PdfSelected
      ? state_object?.PdfSelected
      : props.getDraftData?.pdf_id;
    const body = {
      user_id: localStorage.getItem("user_id"),
      language: "",
      ibu: "",
    };
    loader("show");
    await axios
      .post(`emailapi/get_sunshine_invitation_template`, body)
      .then((res) => {
        setTemplate(res?.data?.response?.data?.source_code);
        setTemplateId(res?.data?.response?.data?.id);
      })
      .catch((err) => {
        console.log(err);
        loader("hide");
      });
    if (flag == 1) {
      loader("hide");
      toast.success("Template saved successfully");
    }
    loader("hide");
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

  const getAllTags = async () => {
    axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
    };
    await axios
      .post(`emailapi/get_tags`, body)
      .then((res) => {
        setAllTags(res?.data?.response?.data);
      })
      .catch((err) => {
        loader("hide");
        console.log(err);
      });
  };

  const tagClicked = (dd) => {
    if (!tagClickedFirst.includes(dd)) {
      setTagClickedFirst((oldArray) => [...oldArray, dd]);
    } else {
      toast.error("Tag already in list.");
    }
  };

  const removeTagFinal = (index) => {
    const tags = finalTags;
    const tagsClickedFirst = tagClickedFirst;
    tags.splice(index, 1);
    tagsClickedFirst.splice(index, 1);
    setFinalTags(tags);
    setTagClickedFirst(tagsClickedFirst);

    setTagsReRender(tagsReRender + 1);
  };

  const newTagChanged = (e) => {
    setNewTag(e.target.value);
    e.target.value = "";
    const new_atg = document.getElementById("new-tag");
    new_atg.value = "";
  
  };

  const saveButtonClicked = () => {
    if (typeof finalTags != "undefined" && finalTags.length > 0) {
      let prev_tags = finalTags;
      let new_tags = prev_tags.concat(tagClickedFirst);
      const uniqueTags = new_tags.filter((x, i, a) => a.indexOf(x) == i);
      setFinalTags(uniqueTags);
    } else {
      setFinalTags(tagClickedFirst);
    }
    setIsOpen(false);
  };

  const addTag = async() => {
    if (typeof newTag == "undefined" || newTag.trim().length == 0) {
      toast.error("Please input a tag");
    } else {
      let temp_tags = tagClickedFirst.map((data) => {
        return data.toLowerCase();
      });
      let alltemp_tags = [];

      if (typeof allTags != "undefined") {
        Object.entries(allTags)?.map((data) => {
          return alltemp_tags.push(...data);
        });
        alltemp_tags = alltemp_tags?.map((data) => {
          return data.toLowerCase();
        });
         
      }

      if (
        !temp_tags.includes(newTag.toLowerCase()) &&
        !alltemp_tags.includes(newTag.toLowerCase())
      ) {
        setTagClickedFirst((oldArray) => [...oldArray, newTag]);

        const body = {
          user_id: localStorage.getItem("user_id"),
          tags: newTag,
        };

    
        axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
        loader("show");
        await axios
          .post(`emailapi/save_tags`, body)
          .then((res) => {
            loader("hide");
          })
          .catch((err) => {
            loader("hide");
            console.log(err);
          });
      } else {
        toast.error("Tag already in list.");
      }
      setNewTag("");
      setTagsCounter(tagsCounter + 1);
    }
  }

  const tagButtonClicked = () => {
    setIsOpen(true);
    setModalCounter(modalCounter + 1);
  };

  const removeTag = (index) => {
    const tags = tagClickedFirst;
    tags.splice(index, 1);
    setTagClickedFirst(tags);
    setFinalTags(tags);
    setTagsReRender(tagsReRender + 1);
  };

  const updateTemplate = (e) => {
    e.preventDefault();
    let template_id = props?.getEmailData
      ? templateId
      : props.getDraftData.template_id;
    if (
      typeof template_id != "undefined" &&
      template_id != "" &&
      template_id != 0
    ) {
      if (editorRef.current) {
        setTemplate(editorRef.current.getContent());
        toast.success("Your changes saved successfully");
      }
    } else {
      toast.warning("Template not selected.");
    }
  };

  function LinkWithTooltip({ id, children, href, tooltip }) {
    return (
      <OverlayTrigger
        overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
        placement="top"
        delayShow={300}
        delayHide={150}
      >
        <a href={href}>{children}</a>
      </OverlayTrigger>
    );
  }

  const sendSample = (event) => {
    event.preventDefault();
    let error = {};
    if (templateId == "" || templateId == 0) {
      error.templateId = "Please select email template first";
    }
    if (emailSubject == "" || emailSubject == 0) {
      error.emailSubject = "The email subject field is required.";
    }
    if (Object.keys(error)?.length) {
      setValidationError(error);
      toast.error(error[Object.keys(error)[0]]);
      return;
    } else {
      setValidationError({});
      setSearchEmail('');
      setSearchName('');
      setIsOpensend(true);
    }
  };

  const addNewContactClicked = async () => {
    setIsOpensend(false);
    setIsOpenAddNewClient(true);
  }

  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
      if (validate()) {
        axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
        loader("show");
        formData.user_id = localStorage.getItem('user_id');
        console.log(formData,'formData');
        await axios
          .post(`emailapi/add_client`, formData)
          .then((res) => {
            if (res?.data?.success) {
              console.log("Form Submitted Successfully!", formData);
              setFormData({ firstName: "", lastName: "", email: "", contact: null, country: null });
              setIsOpenAddNewClient(false);
              let newUser = {
                'id'    : res?.data?.data?.user_id,
                'name'  : res?.data?.data?.name,
                'email' : res?.data?.data?.email,
                'country' : res?.data?.data?.country,
                'company' : res?.data?.data?.company,
                'contact_type' : formData?.contact,
                'pharma_registered' : res?.data?.data?.pharma_registered,
                'last_email' : res?.data?.data?.last_email,
              };
              if(samplePopup){
                setSelectedHcp((prevUsers) => [...prevUsers, newUser]);
                setIsOpensend(true);
              }else{
                // setSelectedClient((prevUsers) => [...prevUsers, newUser])
                setSelectedClient([newUser])
              }
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

  const validate = () => {
    let newErrors = {};
    if (!formData?.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!formData?.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!formData?.company?.trim()) newErrors.company = "Company is required";
    if (!formData?.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData?.contact) newErrors.contact = "Contact type is required";
    if (!formData?.country) newErrors.country = "Country is required";
    setValidationError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e,isSelectedName) => {
    setFormData({ ...formData, [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName ? e : e.target.value });
  };

  const searchPharma = async (e,type) => {
    try{
      if (searchName == "" && searchEmail == "") {
        let newErrors = {};
        newErrors.searchEmail = "Please enter email"
        newErrors.searchName = "Please enter name"
        setValidationError(newErrors);
        toast.warning("Please enter name or email first");
      }else{
        setValidationError({});
        const body = {
          user_id: localStorage.getItem("user_id"),
          name: searchName,
          email: searchEmail,
        };

        axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
        loader("show");
        await axios
          .post(`emailapi/search_pharma`, body)
          .then((res) => {
            if (res.data.response) {
              let newSearchUser = res?.data?.response?.data;
              if(type == 'sample'){
                setSearchSampleUsers((prevUsers) => {
                  const filteredUsers = prevUsers.filter(user => user.type !== "search");
                  return [...filteredUsers, ...newSearchUser];
                });
              }else{
                setSearchedUsers((prevUsers) => {
                  const filteredUsers = prevUsers.filter(user => user.type !== "search");
                  return [...filteredUsers, ...newSearchUser];
                });
              }
            } else {
              toast.warning(res.data.message);
            }
            loader("hide");
          })
          .catch((err) => {
            loader("hide");
            console.log(err);
          });
      }
    }catch(err){
      console.log(err);
    }
  }

  const closeTagModal = async() => {
    setIsOpen(false);
  }

  const handleScroll = (ev) => {
    if (ev.target.scrollTop > 20) {
      document
        .querySelector("#send-sample")
        .setAttribute("custom-atr", "scroll");
    } else {
      document
        .querySelector("#send-sample")
        .setAttribute("custom-atr", "non-scroll");
    }
  };

  const closeNewClientPopup = () => {
    setIsOpenAddNewClient(false);
    if(samplePopup){
      setIsOpensend(true);
    }
  }

  const selectHcp = (index, type) => {
    let arr = [];
    if(type == 'client'){
      arr = searchedUsers;
      let added_user_id = arr[index].id;
      let prev_obj = selectedClient.find((x) => x.id === added_user_id);
      if (typeof prev_obj == "undefined") {
        const removedArray = arr.splice(index, 1);
        // setSelectedClient((oldArray) => [...oldArray, removedArray[0]]);
        setSelectedClient([removedArray?.[0]]);
        setSearchedUsers(arr);
      } else {
        toast.error("User with same email already added in list.");
      }
    }else{
      arr = searchSampleUsers;
      let added_user_id = arr[index].id;
      let prev_obj = selectedHcp.find((x) => x.id === added_user_id);
      if (typeof prev_obj == "undefined") {
        const removedArray = arr.splice(index, 1);
        setSelectedHcp((oldArray) => [...oldArray, removedArray[0]]);
        setSearchSampleUsers(arr);
      } else {
        toast.error("User with same email already added in list.");
      }
    }
  };

  const deleteSelected = (index, type) => {
    if(type == 'client'){
      setSelectedClient((prev) => {
        const removedUser = prev[index];
        setSearchedUsers((prevUsers) => [...prevUsers, removedUser]);
        return prev.filter((_, i) => i !== index);
      });
    }else{
      setSelectedHcp((prev) => {
        const removedUser = prev[index];
        setSearchSampleUsers((prevUsers) => [...prevUsers, removedUser]);
        return prev.filter((_, i) => i !== index);
      });
    }
  };

  const sendSampleMail = async(event) => {
    try{
      let i = 0;
      const intervals_spend = (25 / 100) * selectedHcp.length;

      var intervals_increment = 100 / intervals_spend;
      var mails_increment = selectedHcp.length / intervals_spend;
      let adr = 0;
      let incr_msg = 0;
      const timer = setInterval(() => {
        adr = adr + intervals_increment;
        incr_msg = incr_msg + mails_increment;
        if (adr >= 98) {
          setUploadOrDownloadCount(98);
        } else {
          setUploadOrDownloadCount(parseInt(adr));
        }

        if (incr_msg >= selectedHcp.length) {
          setMailsIncrement(selectedHcp.length);
        } else {
          setMailsIncrement(parseInt(incr_msg));
        }
      }, 1000);

      let pdf_id = state_object?.PdfSelected ? state_object.PdfSelected : props.getDraftData.pdf_id;
      let selected_ids = selectedHcp.map((number) => number["id"]);
      setShowProgressBar(true);
      const body = {
        user_id: localStorage.getItem("user_id"),
        pdf_id: state_object?.PdfSelected
          ? state_object.PdfSelected
          : props.getDraftData.pdf_id,
        subject: emailSubject,
        template_id: templateId,
        user_list: selected_ids,
        smartlist_id: "",
        source_code: template,
      };
      console.log(body)
      axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;

      axios
        .post(`emailapi/send_sample_email`, body)
        .then((res) => {
          if (res.data.status_code === 200) {
            setUploadOrDownloadCount(100);
            setMailsIncrement(selectedHcp.length);
            clearInterval(timer);
            setTimeout(() => {
              popup_alert({
                visible: "show",
                message: "Email sent successfully",
                type: "success",
              });

              setShowProgressBar(false);
              setUploadOrDownloadCount(0);
              setMailsIncrement(0);
            }, 1000);
          } else {
            clearInterval(timer);
            setUploadOrDownloadCount(0);
            setMailsIncrement(0);

            setShowProgressBar(false);
            popup_alert({
              visible: "show",
              message: res.data.message,
              type: "error",
            });
          }
        }).catch((err) => {
          clearInterval(timer);
          setShowProgressBar(false);
          loader("hide");
          toast.error("Something went wrong");
          console.log(err);
        });
      setIsOpensend(false);
      setSelectedHcp([]);
      setSearchSampleUsers([]);
      setSearchEmail('');
      setSearchName('');
    }catch(err){
      console.log(err);
    }
  }

  const nextClicked = async() => {
    const tags = finalTags?.map((finalTags) => {
      return finalTags.innerHTML == null ? finalTags : finalTags.innerHTML;
    });
    if (validator.allValid()) {
        props.getSelected(selectedClient);
        props.getSearched(searchedUsers);
        props.getEmailData({
          emailCreator: emailCreator,
          emailCampaign: emailCampaign,
          emailSubject: emailSubject,
          templateId: templateId,
          tags: tags,
          template: template,
          PdfSelected: 6061,
        });
        navigate("/Verify-sunshine-mail");
    } else {
      validator.showMessages();
    }
  }

  const addTracking = function (editor) {
    editor.on("OpenWindow", function (e) {
      let dialog = document.getElementsByClassName("tox-dialog")[0];
      if (dialog) {
        let header = dialog?.querySelector(".tox-dialog__header");
        const closeButton = header?.querySelector('[aria-label="Close"]');
        let text = header?.querySelector(".tox-dialog__title");
        let url = dialog?.querySelector(".tox-control-wrap")
        let newLink = url?.querySelector(".tox-textfield")
        let newButton = document.createElement("button");
        const baseLink =
          "https://webinar.docintel.app/flow/webinar/track_multilinks?token=###updateid###&tracking_code=clicked_track_doc_";
        let payload = {}
        let apiLink = ""

        if (text?.innerText == "Insert/Edit Link") {
          let uploadIcon = document.querySelector(
            "body > div.tox.tox-silver-sink.tox-tinymce-aux > div > div.tox-dialog > div.tox-dialog__content-js > div > div > div > div:nth-child(1) > div > button > span"
          );
          uploadIcon.style.display = "none";
          // let newButton = document.createElement("button");
          if (newLink?.value?.includes(baseLink)) {
            newButton.innerText = "Remove Tracking";
            apiLink = `https://onesource.informed.pro/api/delete-track-links`;
          } else {
            newButton.innerText = "Add Tracking";
            apiLink = `https://onesource.informed.pro/api/track-links`;
          }
          newButton.classList.add("tox-button");
          newButton.classList.add("tox-button--icon");
          newButton.classList.add("tox-button--naked");
          newButton.classList.add("track");

          newButton.onclick = function () {
            if (templateIdRef.current == "") {
              alert("Please select the template first before adding the link");
              return;
            }
            let firstToxControlWrap = document.querySelector(
              "body > div.tox.tox-silver-sink.tox-tinymce-aux > div > div.tox-dialog > div.tox-dialog__content-js > div > div > div > div:nth-child(1) > div > div >input"
            );

            if (newLink?.value?.includes(baseLink) && newButton.innerText == "Remove Tracking") {
              if (!window.confirm("Are you sure you want to remove the tracking?")) {
                return;
              }
              const urlParams = new URLSearchParams(newLink.value);
              const redirectUrl = urlParams.get('redirect_url');
              const trackingCode = urlParams.get('tracking_code');
              firstToxControlWrap.value = redirectUrl;
              payload = {
                template_id: templateIdRef.current,
                url_code: trackingCode,
              };
            }

            if (!newLink?.value?.includes(baseLink) && newButton.innerText == "Add Tracking") {
              if (!newLink?.value) {
                alert("Please enter a link")
                return
              }
              if (!firstToxControlWrap.value) {
                alert("Please enter a link");
                return;
              }
              if (firstToxControlWrap.value.startsWith(baseLink)) {
                alert("Tracking already added");
                return;
              }
              let slugValue = prompt("Enter a slug value");

              const currentTimestamp = Date.now();
              payload = {
                slug_value: slugValue,
                template_id: templateIdRef.current,
                url_code: `clicked_track_doc_${currentTimestamp}`,
              };
              linkingPayload.current = payload;
              let link = `https://webinar.docintel.app/flow/webinar/track_multilinks?token=###updateid###&tracking_code=clicked_track_doc_${currentTimestamp}&redirect_url=${firstToxControlWrap.value}`;
              firstToxControlWrap.value = link;

            }

            var saveButton = document.querySelector(
              '.tox-button[title="Save"]'
            );
            saveButton.addEventListener("click", function () {
              axios
                .post(apiLink, payload)
                .then((res) => {
                  console.log("done");
                })
                .catch((err) => {
                  loader("hide");
                  console.log(err);
                });
            });
            if (newLink?.value?.includes(baseLink)) {
              alert("Tracking added");
            } else {
              saveButton.click()

              alert("Tracking removed");
            }
          };

          header.insertBefore(newButton, closeButton);
        } else if (text.innerText == "Insert/Edit Media") {
          document.querySelector(
            "body > div.tox.tox-silver-sink.tox-tinymce-aux > div.tox-dialog-wrap > div.tox-dialog > div.tox-dialog__content-js > div > div.tox-dialog__body-content > div > div:nth-child(1) > label"
          ).innerText += " (Max size: 1GB)";
        }
      }
    });
  };
  

  return (
    <>
      <div className="col right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav sticky">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-3"></div>
                <div className="col-12 col-md-6">
                  <ul className="tabnav-link">
                    <li className="active active-main">
                      <a href="">Create Your Email</a>
                    </li>
                    <li className="">
                      <a href="">Verify your Email</a>
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
                      className="btn btn-primary btn-filled next"
                      onClick={nextClicked}
                      disabled={
                        typeof emailSubject == "undefined" ||
                        emailSubject.trim().length == 0 ||
                        typeof emailCampaign == "undefined" ||
                        emailCampaign.trim().length == 0 ||
                        typeof emailCreator == "undefined" ||
                        emailCreator.trim().length == 0 ||
                        typeof templateId == "undefined" ||
                        templateId == "" ||
                        typeof selectedClient == "undefined" ||
                        selectedClient?.length == 0 
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
        <section className="select-mail-template sunshine-mail">
          <Container>
            <Row>
              <div className="page-title">
                <h4><span>1.</span> Select the client you wish to send this email to by either searching for an existing client or adding a new one:</h4>
              </div>
              <div className="email-form">
                <Form>
                  <>
                    <div className="form-inline sunshine-email-form d-flex justify-content-between align-items-start">
                      <div className="col-12 col-md-4 d-flex align-items-center">
                        <div className="form-group">
                          <label className="form-label">Name</label>
                          <input type="text"
                            className={validationError?.searchName ? "form-control error": "form-control"}
                            value={searchName}
                             onChange={(e) => setSearchName(e.target.value)} />

                            {/* {validationError?.searchName &&
                              <div className="login-validation">
                                {validationError?.searchName}
                              </div>
                            } */}
                        </div>
                      </div>
                      <div className="col-12 col-md-4 d-flex align-items-center">
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input type="text"
                          className={validationError?.searchEmail ? "form-control error": "form-control"}
                           value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
                            {/* {validationError?.searchEmail &&
                              <div className="login-validation">
                                {validationError?.searchEmail}
                              </div>
                            } */}
                        </div>
                      </div>
                      <div className="col-12 col-md-4 d-flex align-items-center justify-content-between">
                        <Button className="btn-filled" onClick={(e) => searchPharma(e,'client')}>Search</Button>
                        <span>- OR -</span>
                        <Button className="btn-bordered btn-voilet" onClick={addNewContactClicked}>Add New Client +</Button>
                      </div>
                    </div>
                  </>
                </Form>
              </div>
              <div className="d-flex justify-content-between search-client-list">
              <div className="sample_list_dt col">
              <form>
                <fieldset>
                  <legend>Search results | <span>{searchedUsers?.length}</span></legend>
                  {searchedUsers.length === 0 ? (
                    <div className="not-found">
                      <h4>No Search result found!</h4>
                    </div>
                  ) : (
                          <div className="search-hcp-box">
                            <Table>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Contact type</th>
                                  <th>&nbsp;</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  searchedUsers.map((data, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          {data.name}
                                        </td>
                                        <td>{data.email}</td>
                                        <td>{data.contact_type}</td>
                                        <td>
                                          <div className="add-new-field"
                                            onClick={() => selectHcp(index, 'client')}
                                          >
                                            {
                                              data?.pharma_registered == 0 
                                              ? 
                                              <img
                                                src={path_image + "add-row.png"}
                                                alt="Add More"
                                              />
                                              : null
                                            }
                                        </div>
                                        </td>
                                      </tr>

                                    );
                                  })
                                }
                              </tbody>
                            </Table>
                          </div>
                  )}
                </fieldset>
              </form>


              
                {/* <div className="search-hcp-table-inside sample_list_dt">
                
                 
                </div> */}
              </div>
              <div className="arrow-icon">
              <img src={path_image + "swap-arrow.svg"} alt="Double arrow" />
              </div>
              <div className="sample_list_dt col">
              <Form>
                <fieldset>
                  <legend>Selected client | <span>{selectedClient?.length}</span></legend>
                  {selectedClient?.length == 0 ? (
                    <div className="not-found">
                      <h4>No selected client yet!</h4>
                    </div>
                  ) : (
                    <>
                            <div className="search-hcp-box">
                              <Table>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact type</th>
                                    <th>&nbsp;</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedClient?.map((data, index2) => {
                                    return (
                                      <tr key={data?.id || index2}>
                                        <td>
                                          {data?.name}
                                        </td>
                                        <td>{data?.email}</td>
                                        <td>{data?.contact_type ? data?.contact_type : "N/A"}</td>
                                        <td><div className="remove-existing-field">
                                          <Button className="btn btn-outline-primary ">
                                            <img
                                              src={path_image + "delete.svg"}
                                              alt="Delete Row"
                                              onClick={() => deleteSelected(index2, 'client')}
                                            />
                                          </Button>

                                        </div></td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </Table>
                            </div>
                    </>
                  )}
                </fieldset>
              </Form>
              </div>
              </div>
            </Row>
          </Container>
        </section>
        <section className="select-mail-template sunshine-mail">
          <Container>
            <Row>
              <div className="page-title">
                <h4><span>2.</span> Create your email:</h4>
              </div>

              <div className="email-form padding-add">
                <form>
                  <>
                    <div className="form-inline d-flex justify-content-between align-items-center">
                      <div className="form-group col-12 col-md-7 d-flex align-items-center">
                        <label htmlFor="exampleInputEmail1">
                          Email Campaign <span>*</span>
                          <LinkWithTooltip
                            tooltip="Including details about the product, event, or subject of this email will facilitate filtering and locating a cluster of related emails."
                            href="#"
                          >
                            <img
                              src={
                                path_image +
                                "info_circle_icon.svg"
                              }
                              alt="refresh-btn"
                            />
                          </LinkWithTooltip>
                        </label>

                        <input
                          type="text"
                          className={
                            validator.message(
                              "emailCampaign",
                              emailCampaign,
                              "required"
                            )
                              ? "form-control error"
                              : "form-control"
                          }
                          id="email-campaign"
                          value={emailCampaign}
                          onChange={(e) => {
                            setemailCampaign(e?.target?.value);
                            setManualEmailCampaign(e?.target?.value)
                          }}
                        />
                        {validator.message(
                          "emailCampaign",
                          emailCampaign,
                          "required"
                        )}
                      </div>
                      <div className="form-group right-side col-12 col-md-5 d-flex align-items-center">
                        <label htmlFor="exampleInputEmail1">
                          Email Creator <span>*</span>
                        </label>

                        <input
                          onChange={(e) => {
                            setEmailCreator(e?.target?.value);
                            setManualEmailCreator(e?.target?.value)
                          }}
                          type="text"
                          className={
                            validator.message(
                              "creator",
                              emailCreator,
                              "required"
                            )
                              ? "form-control error"
                              : "form-control"
                          }
                          id="email-address"
                          value={emailCreator}
                        />
                        {validator.message(
                          "creator",
                          emailCreator,
                          "required"
                        )}
                      </div>
                    </div>
                  </>
                  <div className="input-group d-flex w-100">
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-bordered btn-primary"
                        type="button"
                        id="tags-add"
                        data-bs-toggle="modal"
                        data-bs-target="#tagsModal"
                        onClick={tagButtonClicked}
                      >
                        + Add Tag
                      </button>
                    </div>
                    <div className="tags_added">
                      <ul>
                      {finalTags.map((tag, index) => (
                        <li className="list1" key={index}>
                          {tag.innerHTML || tag}{" "}
                          <img
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                            onClick={() => removeTag(index)}
                          />
                        </li>
                      ))}
                      </ul>
                    </div>
                  </div>

                  <div className="form-inline d-flex justify-content-end align-items-center">
                    <div className="form-group col-12 col-md-6">
                      <label htmlFor="exampleInputEmail1">
                        Email Subject <span>*</span>
                      </label>

                      <input
                        type="text"
                        className={
                          validator.message(
                            "emailSubject",
                            emailSubject,
                            "required"
                          ) || validationError?.emailSubject
                            ? "form-control error"
                            : "form-control"
                        }
                        id="email-subject"
                        onChange={(e) => {
                          setEmailSubject(e?.target?.value);
                          setManualEmailSubject(e?.target?.value)
                        }}
                        value={emailSubject}
                      />
                      {validationError?.emailSubject ? (
                        <div className="login-validation">
                          {validationError?.emailSubject}
                        </div>
                      ) : validator.message(
                        "emailSubject",
                        emailSubject,
                        "required"
                      ) ? (
                        validator.message(
                          "emailSubject",
                          emailSubject,
                          "required"
                        )
                      ) : null}
                    </div>
                    <div className="form-buttons right-side col-12 col-md-6">
                      <button
                        className="btn btn-primary btn-bordered btn-large"
                        onClick={sendSample}
                      >
                        Send A Sample
                      </button>
                      <button
                        className="btn btn-primary btn-filled"
                        onClick={(e) => updateTemplate(e)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Row>
            <Row>

              <Editor
                apiKey="gpl"
                tinymceScriptSrc={window.location.origin + '/tinymce/tinymce.min.js'}
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={template}
                init={{
                  height: "100vh",
                  menubar: "file edit view insert format tools table help",
                  plugins:
                    "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
                  toolbar:
                    "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | ltr rtl",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  automatic_uploads: true,
                  image_caption: true,
                  contextmenu:
                    "link image imagetools table configurepermanentpen",
                  file_picker_types: "file image media",
                  init_instance_callback: (editor) => addTracking(editor),
                  file_picker_callback: function (callback, value, meta) {
                    const input = document.createElement("input");

                    if (meta.filetype === "media") {
                      input.setAttribute("type", "file");
                      input.setAttribute("accept", "video/*");

                      input.onchange = async () => {
                        const file = input.files[0];
                        if (file) {
                          let uploadedImageUrl;

                          try {
                            if (meta && meta.width && meta.height) {
                              uploadedImageUrl = await uploadImageToServer(
                                file,
                                meta.width,
                                meta.height
                              );
                            } else {
                              uploadedImageUrl = await uploadImageToServer(
                                file
                              );
                            }

                            if (uploadedImageUrl) {
                              callback(uploadedImageUrl, {
                                width: 500,
                                height: 500,
                              });
                            } else {
                              console.error("Failed to upload image");
                            }
                          } catch (error) {
                            console.error("Error uploading image:", error);
                          } finally {
                          }
                        }
                      };
                    } else {
                      input.setAttribute("type", "file");
                      input.setAttribute("accept", "image/*");
                      const loadingIndicator =
                        document.createElement("div");
                      loadingIndicator.className = "loading-indicator";
                      loadingIndicator.textContent = "Uploading..."; // You can use a spinner icon or any text you prefer

                      input.onchange = async () => {
                        document.body.appendChild(loadingIndicator); // Show loading indicator

                        const file = input.files[0];
                        if (file) {
                          let uploadedImageUrl;

                          try {
                            if (meta && meta.width && meta.height) {
                              uploadedImageUrl = await uploadImageToServer(
                                file,
                                meta.width,
                                meta.height
                              );
                            } else {
                              uploadedImageUrl = await uploadImageToServer(
                                file
                              );
                            }

                            if (uploadedImageUrl) {
                              callback(uploadedImageUrl, {
                                width: 500,
                                height: 500,
                              });
                              loader("hide");
                            } else {
                              console.error("Failed to upload image");
                            }
                          } catch (error) {
                            console.error("Error uploading image:", error);
                          } finally {
                            document.body.removeChild(loadingIndicator); // Hide loading indicator
                          }
                        }
                      };
                    }
                    input.click();
                  },
                }}
                onEditorChange={(content) => {
                  setTemplateSaving(content);
                }}
              />
            </Row>
          </Container>
        </section>
      </div>

       <Modal id="tagsModal" show={isOpen}>
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            Add Tags
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={closeTagModal}
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className="select-tags">
            <h6>Select Tag :</h6>
            <div className="tag-lists">
              <div className="tag-lists-view">
              {allTags
                ? Object.values(allTags).map((data, index) => {
                    return (
                      <div key={index} onClick={() => tagClicked(data)}>
                        {data}
                      </div>
                    );
                  })
                : ""}
              </div>
            </div>
          </div>
          <div className="selected-tags">
            <h6>
              Selected Tag <span>| {tagClickedFirst.length}</span>
            </h6>

            <div className="total-selected">
            {tagClickedFirst.map((data, index) => {
              return (
                <div className="tag-cross" key={index}>
                  {data.innerHTML || data}
                  <img
                    src={path_image + "filter-close.svg"}
                    alt="Close-filter"
                    onClick={() => removeTagFinal(index)}
                  />
                </div>
              );
            })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <form>
            <div className="form-group">
              <label htmlFor="new-tag">New Tag</label>
              <input
                type="text"
                className="form-control"
                id="new-tag"
                value={newTag}
                onChange={(e) => newTagChanged(e)}
              />

              <button
                onClick={addTag}
                type="button"
                className="btn btn-primary add btn-bordered"
              >
                Add
              </button>
            </div>
          </form>
          <button
            type="button"
            className="btn btn-primary save btn-filled"
            onClick={saveButtonClicked}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
              
      <Modal id="send-sample" show={isOpen_send} custom-atr="non-scroll" className="send-sample-sunshine">
        <Modal.Header>
          <h4>Send a Sample</h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              setIsOpensend(false);
              setSelectedHcp([]);
              setSearchSampleUsers([]);
              setValidationError({});
              setSearchEmail('');
              setSearchName('');
            }}
          ></button>
        </Modal.Header>
        <Modal.Body onScroll={handleScroll}>
          <div className="top-header">
            <div className="page-title">
              <h4>Search For Client By:</h4>
            </div>
          </div>
          <section className="search-hcp">
            <div className="form-search-hcp">
              {/* <form> */}
                <div className="form-inline row justify-content-between align-items-center">
                  <div className="col-12 col-md-10">
                    <div className="row justify-content-between align-items-center">
                      
                        <div className="form-group col-sm-5">
                          <label className="form-label">Name</label>
                          <input type="text"
                            className={validationError?.searchName ? "form-control error" : "form-control"}
                            value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                            {/* {validationError?.searchName &&
                              <div className="login-validation">
                                {validationError?.searchName}
                              </div>
                            } */}
                        </div>

                        <div className="form-group col-sm-5">
                          <label className="form-label">Email</label>
                          <input type="text"
                          className={validationError?.searchEmail ? "form-control error" : "form-control"}
                           value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
                            {/* {validationError?.searchEmail &&
                              <div className="login-validation">
                                {validationError?.searchEmail}
                              </div>
                            } */}
                        </div>
                        
                      <div className="form-group col-sm-2">
                        <button
                          className="btn btn-primary btn-filled"
                          onClick={(e) => searchPharma(e, 'sample')}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-button col-12 col-md-2">
                    <button
                      className="btn btn-primary btn-bordered m-0"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#add_hcp"
                      onClick={() => {
                        addNewContactClicked();
                        setSamplePopup(true);
                      }}
                    >
                      Add New Client +
                    </button>
                  </div>
                </div>
              {/* </form> */}
            </div>
            <div className="search-hcp-table sample_list_dt">
              <div className="search-hcp-table-inside sample_list_dt">
                {searchSampleUsers.length === 0 ? (
                  <div className="not-found">
                    <h4>No Record Found!</h4>
                  </div>
                ) : (
                  searchSampleUsers.map((data, index) => {
                    return (
                      <div className="search-hcp-box" key={index}>
                        <p className="send-hcp-box-title">
                          Name | <span>{data.name}</span>
                        </p>
                        <p className="send-hcp-box-title">
                          Email | <span>{data.email}</span>
                        </p>
                        <p className="send-hcp-box-title">
                          Contact type | <span>{data.contact_type}</span>
                        </p>
                        <div
                          className="add-new-field"
                          onClick={() => selectHcp(index,'sample')}
                        >
                          <img
                            src={path_image + "add-row.png"}
                            alt="Add More"
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="selected-hcp-table">
              <div className="table-title">
                <h4>
                  Selected contact <span>| 
                    {selectedHcp?.length}
                    </span>
                </h4>
              </div>
              <div className="selected-hcp-list">
                {selectedHcp?.length == 0 ? (
                  <div className="not-found">
                    <h4>No Contact selected yet!</h4>
                  </div>
                ) : (
                  <>
                    {selectedHcp?.map((data, index2) => {
                      return (
                        <div className="search-hcp-box" key={data?.id || index2}>
                          <p className="send-hcp-box-title">
                            Name | <span>{data?.name}</span>
                          </p>
                          <p className="send-hcp-box-title">
                            Email | <span>{data?.email}</span>
                          </p>
                          <p className="send-hcp-box-title">
                            Contact type | <span>{data?.contact_type ? data?.contact_type : "N/A"}</span>
                          </p>
                          <div className="remove-existing-field">
                            <img
                              src={path_image + "delete.svg"}
                              alt="Delete Row"
                              onClick={() => deleteSelected(index2,'client')}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </section>
        </Modal.Body>
        <Modal.Footer>
            <button
              type="button"
              className= {selectedHcp.length > 0 ? "btn btn-primary btn-filled" : "btn btn-primary btn-filled disabled"}
              data-bs-dismiss="modal"
              onClick={sendSampleMail}
            >
              Send
            </button>
        </Modal.Footer>
      </Modal>

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
                              className={
                                validationError?.email
                                  ? "form-control error"
                                  : "form-control"
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
                              value={contactOptions.find(option => option.value === formData.contact) || null} 
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
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        show={showPreogressBar}
        className="send-confirm"
        id="upload-confirm"
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div
            className="circular-progressbar"
            style={{
              width: 100,
              height: 100,
            }}
          >
            <CircularProgressbar
              value={uploadOrDownloadCount}
              text={`${uploadOrDownloadCount}%`}
              strokeWidth={5}
            />
          </div>
        </Modal.Body>
        <h4>
          {mailsIncrement} mails sent of {selectedHcp.length}
        </h4>
      </Modal>

    </>
  );
};

const mapStateToProps = (state) => {
  dxr = state.getEmailData?.PdfSelected;
  state_object = state.getEmailData;
  searched_Data = state.getSearched;
  selected_Data = state.getSelected;
  return state;
};

export default connect(mapStateToProps, {
  getEmailData: getEmailData,
  getSelected,
  getSearched,
})(CreateSunshineEmail);
