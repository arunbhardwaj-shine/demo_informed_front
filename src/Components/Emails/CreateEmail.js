import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { getCampaignId, getEmailData } from "../../actions";
import { useNavigate } from "react-router-dom";
import { Modal, ModalDialog, Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import SimpleReactValidator from "simple-react-validator";
import { loader } from "../../loader";
import { popup_alert } from "../../popup_alert";
import { toast } from "react-toastify";
import { getSelectedSmartListData } from "../../actions";
import Select, { createFilter } from "react-select";
import { Editor } from "@tinymce/tinymce-react";

import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
var dxr = 0;
var state_object = {};

const CreateEmail = (props) => {
  const [progress, setProgress] = useState(0);
  const [percent, setPercent] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const editorRef = useRef(null);
  const [totalData, setTotalData] = useState({});
  const linkingPayload = useRef();
  const templateIdRef = useRef("");
  const [siteNumberAll, setSiteNumberAll] = useState([]);
  const [siteNameAll, setSiteNameAll] = useState([]);
  const [role, setRole] = useState([]);
  const [irtRole, setIrtRole] = useState([]);
  const [institutionType, setInstitutionType] = useState([]);
  const [optIRT, setoptIRT] = useState([
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ]);
  const filterConfig = {
    matchFrom: "start",
  };
  let file_name = useRef("");
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const navigate = useNavigate();
  const [showPreogressBar, setShowProgressBar] = useState(false);
  const [uploadOrDownloadCount, setUploadOrDownloadCount] = React.useState(0);
  const [mailsIncrement, setMailsIncrement] = useState(0);
  const [SendListData, setSendListData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const location = useLocation();
  const [uniqueId, setUniqueId] = useState("");
  const [getsearch, setSearch] = useState("");
  const PdfSelected = props.getEmailData ? dxr : props.getDraftData.pdf_id;

  const [hcpsSelected, setHcpsSelected] = useState([]);

  const [manualReRender, setManualReRender] = useState(0);
  const campaign_id = props.getDraftData ? props.getDraftData.campaign_id : "";
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeExcel, setActiveExcel] = useState("");
  const [addFileReRender, setAddFileReRender] = useState(0);
  const [counterFlag, setCounterFlag] = useState(0);
  const [activeManual, setActiveManual] = useState("active");
  const [templateList, setTemplateList] = useState([]);
  const [template, setTemplate] = useState(
    state_object != null && state_object != "undefined" && state_object.template
      ? state_object.template
      : props.getDraftData
        ? props.getDraftData.source_code
        : ""
  );
  const [userId, setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==");
  const [templateSaving, setTemplateSaving] = useState("");
  const [readers, setReaders] = useState([]);
  const [campaign_id_st, setCampaign_id] = useState(campaign_id);
  const [emailDescription, setEmailDescription] = useState(
    state_object != null &&
      state_object != "undefined" &&
      state_object.emailDescription
      ? state_object.emailDescription
      : props.getDraftData
        ? props.getDraftData.description
        : ""
  );
  const [emailCreator, setEmailCreator] = useState(
    state_object != null &&
      state_object != "undefined" &&
      state_object.emailCreator
      ? state_object.emailCreator
      : props.getDraftData
        ? props.getDraftData.creator
        : ""
  );
  const [counter, setCounter] = useState(0);
  const [modalCounter, setModalCounter] = useState(0);
  const [emailCampaign, setemailCampaign] = useState(
    state_object != null &&
      state_object != "undefined" &&
      state_object.emailCampaign
      ? state_object.emailCampaign
      : props.getDraftData
        ? props.getDraftData.campaign
        : ""
  );
  const [emailSubject, setEmailSubject] = useState(
    state_object != null &&
      state_object != "undefined" &&
      state_object.emailSubject
      ? state_object.emailSubject
      : props.getDraftData
        ? props.getDraftData.subject
        : ""
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
  const [templateName, setTemplateName] = useState("");
  const [renderAfterValidation, setRenderAfterValidation] = useState(0);
  const [tagClickedFirst, setTagClickedFirst] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen_send, setIsOpensend] = useState(false);
  const [allTags, setAllTags] = useState({});
  const [newTag, setNewTag] = useState("");
  const [finalTags, setFinalTags] = useState(
    state_object != null && state_object != "undefined" && state_object.tags
      ? state_object.tags
      : props.getDraftData
        ? props.getDraftData.tags
        : []
  );
  const [tagsReRender, setTagsReRender] = useState(0);
  const [tagsCounter, setTagsCounter] = useState(0);
  const [validator] = React.useState(new SimpleReactValidator());
  const [validationError, setValidationError] = useState({});

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [countryall, setCountryall] = useState([]);
  const [irtCountry, setIRTCountry] = useState([]);
  const [message, setMessage] = useState("");
  const [reRender, setReRender] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedHcp, setSelectedHcp] = useState([]);
  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const [getTemplatePopup, setTemplatePopup] = useState(false);
  const [getNewTemplatePopup, setNewTemplatePopup] = useState(false);

  const [getIsApprovedStatus, setIsApprovedStatus] = useState(0);

  const [hpc, setHpc] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      contact_type: "",
      country: "",
      countryIndex: "",
      role:
        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
          ? irtRole?.[0]?.value
          : "",
      optIRT:
        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
          ? "yes"
          : "",
      institutionType: "",
    },
  ]);

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [addListOpen, setAddListOpen] = useState(false);
  const [smartListData, setSmartListData] = useState([]);
  const [prevsmartListData, setPrevSmartListData] = useState([]);

  const [getReaderDetails, setReaderDetails] = useState({});
  const [getSmartListName, setSmartListName] = useState("");
  const [getSmartListPopupStatus, setSmartListPopupStatus] = useState(false);
  const [showLessInfo, setShowLessInfo] = useState(true);
  const [getSmartListId, setSmartListId] = useState(0);

  const newArr = [];

  useEffect(() => {
    if (addListOpen == true) {
      setIsOpensend(false);
    }
  }, [addListOpen]);

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    getTemplateListData(0);
    getSmartListData(0);
  }, []);

  const getSmartListData = (flag) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      search: getsearch,
      filter: "",
    };
    loader("show");
    axios
      .post(`distributes/get_smart_list`, body)
      .then((res) => {
        setSmartListData(res.data.response?.data);
        if (flag == 0) {
          setPrevSmartListData(res.data.response?.data);
        } else {
          loader("hide");
        }
      })
      .catch((err) => {
        loader("hide");
        console.log(err);
      });
  };
  const axiosFun = async () => {
    try {
      const result = await axios.get(`emailapi/get_site`);

      let country = result?.data?.response?.data?.site_country_data;
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
      setIRTCountry(arr);
    } catch (err) {
      console.log("-err", err);
    }
  };

  useEffect(() => {
    loader("show");
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
      axiosFun();
    }
    const getalCountry = async () => {
      const body = {
        user_id: localStorage.getItem("user_id"),
        language: "",
        ibu: "",
      };

      await axios
        .post(`distributes/filters_list`, body)
        .then((res) => {
          // setCountryall(res.data.response.data.country);
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
            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
              let investigator_type =
                res?.data?.response?.data?.investigator_type;
              let newType = [];
              Object.keys(investigator_type)?.map((item, i) => {
                newType.push({ label: item, value: item });
              });

              let irt_inverstigator_type =
                res?.data?.response?.data?.irt_inverstigator_type;
              let newIrtType = [];
              Object.keys(irt_inverstigator_type)?.map((item, i) => {
                newIrtType.push({ label: item, value: item });
              });

              let instution_type = res?.data?.response?.data?.institution_type;
              let newInstitutionType = [];
              Object.keys(instution_type)?.map((item, i) => {
                newInstitutionType.push({ label: item, value: item });
              });
              setInstitutionType(newInstitutionType);
              setRole(newType);
              setIrtRole(newIrtType);
            }

            setCountryall(arr);

            setTotalData(res.data.response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getalCountry();
  }, []);

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const getTemplateListData = async (flag) => {
    let pdf_id = state_object?.PdfSelected
      ? state_object?.PdfSelected
      : props.getDraftData?.pdf_id;

    let content_included = 1;
    if (pdf_id == 16) {
      content_included = 0;
    }

    let siteContent = 0;
    if (
      pdf_id == 14 &&
      localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
    ) {
      siteContent = 1;
      content_included = 0;
    }
    const body = {
      user_id: localStorage.getItem("user_id"),
      language: "",
      ibu: "",
      content_included: content_included,
      siteContent: siteContent,
      pdf: pdf_id,
    };

    loader("show");
    await axios
      .post(`emailapi/get_template_list`, body)
      .then((res) => {
        setTemplateList(res.data.response.data);
        getSelectedTemplateSource(res.data.response.data);
        setCounter(counter + 1);


        setTimeout(function () {
          const div_img = document.querySelector("#template_dyn0");
          if (div_img !== null && typeof div_img != "undefined") {
            div_img.click();
          }
        }, 400);


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

  useEffect(() => {
    //console.log("sdsdsd");
  }, [selectedHcp]);

  useEffect(() => {
    const body = {
      user_id: localStorage.getItem("user_id"),
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const getAllTags = async () => {
      await axios
        .post(`emailapi/get_tags`, body)
        .then((res) => {
          setAllTags(res?.data?.response?.data);
          // console.log(campaign_id_st);
          // if (typeof campaign_id_st === "undefined" || campaign_id_st == 0) {
          // loader("hide");
          // }
        })
        .catch((err) => {
          loader("hide");
          console.log(err);
        });
    };
    getAllTags();
    // getCampaignData();
  }, []);

  useEffect(() => {
    if (
      typeof props !== "undefined" &&
      props !== null &&
      props.hasOwnProperty("getDraftData")
    ) {
      if (props.getDraftData !== null) {
        setEmailDescription(props.getDraftData.description);
        setEmailCreator(props.getDraftData.creator);
        setemailCampaign(props.getDraftData.campaign);
        setEmailSubject(props.getDraftData.subject);
        setFinalTags(props.getDraftData.tags);
        setTagClickedFirst(props.getDraftData.tags);
        setTemplateId(props.getDraftData.campaign_data.template_id);
        templateIdRef.current = props.getDraftData.campaign_data.template_id;
        setIsApprovedStatus(props.getDraftData.status);
        setTemplate(props.getDraftData.source_code);
      }
    }
  }, []);

  const getSelectedTemplateSource = (dd) => {
    if (
      typeof props !== "undefined" &&
      props !== null &&
      props.hasOwnProperty("getDraftData")
    ) {
      if (typeof dd !== "undefined") {
        let getSpecificKeyData = dd.find(
          (e) => e.id === props?.getDraftData?.campaign_data?.template_id
        );
        if (
          getSpecificKeyData &&
          getSpecificKeyData.hasOwnProperty("source_code")
        ) {
          if (
            state_object != null &&
            state_object?.template != "" &&
            typeof state_object?.template !== "undefined"
          ) {
            if (state_object.template !== "") {
              setTemplate("state_object.template");
              setTemplate(state_object.template);
            } else {
              setTemplate(getSpecificKeyData.source_code);
            }
          } else if (
            props.getDraftData != null &&
            props.getDraftData?.source_code != ""
          ) {
            if (props.getDraftData.source_code !== "") {
              setTemplate("props.getDraftData.source_code");
              setTemplate(props.getDraftData.source_code);
            } else {
              setTemplate(getSpecificKeyData.source_code);
            }
          } else {
            setTemplate(getSpecificKeyData.source_code);
          }
        }
      }
    }
  };

  const addMoreHcp = () => {
    const status = hpc.map((data) => {
      if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
        if (
          data?.email == "" ||
          data?.lastname == "" ||
          data?.firstname == "" ||
          data?.country == "" ||
          data?.institutionType == ""
        ) {
          return "false";
        } else {
          return "true";
        }
      }
      else if (localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
        if (data.email == "" || data.country == "") {
          return "false"
        } else {
          return "true"
        }
      }
      else {
        if (data.email == "") {
          return "false";
        } else {
          return "true";
        }
      }
    });
    if (status.every((element) => element == "true")) {
      setHpc([
        ...hpc,
        {
          firstname: "",
          lastname: "",
          email: "",
          contact_type: "",
          country: "",
          countryIndex: "",
          optIRT:
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
              ? "yes"
              : "",
          role:
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
              ? irtRole?.[0]?.value
              : "",
          institutionType: "",
        },
      ]);
    } else {
      if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
        toast.warning("Please input the required fields.");
      } else {
        toast.warning("Please input the required fields.");
      }
    }
  };

  const deleteSelected = (index) => {
    let arr = [];
    arr = selectedHcp;
    arr.splice(index, 1);

    setSelectedHcp(arr);
    setReRender(reRender + 1);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const addClicked = (e) => {
    if (typeof getSmartListId != "undefined" && getSmartListId !== 0) {
      loader("show");
      const body = {
        user_id: localStorage.getItem("user_id"),
        list_id: getSmartListId,
        show_specific: 1,
      };
      axios
        .post(`distributes/get_reders_list`, body)
        .then((res) => {
          if (res.data.status_code == 200) {
            setReaders(res.data.response.data);

            res.data.response.data.map((data) => {
              let prev_obj = selectedHcp.find((x) => x.email === data.email);
              if (typeof prev_obj === "undefined") {
                setSelectedHcp((oldArray) => [...oldArray, data]);
              }
            });
            // setSelectedHcp(res.data.response.data);
            loader("hide");
          } else {
            toast.warning(res.data.message);
            loader("hide");
          }
          setIsOpensend(true);
          setAddListOpen(false);
        })
        .catch((err) => {
          toast.warning("Something went wrong");
          loader("hide");
        });
    } else {
      toast.warning("Please select smart list");
    }
    // e.preventDefault();
    // setSelectedHcp((oldArray) => [...readers, ...oldArray]);
    // setIsOpensend(true);
    // setAddListOpen(false);
  };

  const sendsampeap = (event) => {
    setHcpsSelected(selectedHcp);
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

    let pdf_id = state_object?.PdfSelected
      ? state_object.PdfSelected
      : props.getDraftData.pdf_id;

    setIsOpensend(false);
    setIsOpenAdd(false);
    if (pdf_id == 13) {
      popup_alert({
        visible: "show",
        message:
          "We can't send this email until you've chosen the right content. Please go back to 'Select Content' and pick something. ",
        type: "error",
      });
    } else {
      let selected_ids = selectedHcp.map(
        (number) => number["user_id"] || number["profile_user_id"]
      );

      //  loader("show");
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

      //console.log(body);
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

      axios
        .post(`emailapi/send_sample_email`, body)
        .then((res) => {
          //console.log(res);
          loader("hide");
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
        })
        .catch((err) => {
          clearInterval(timer);
          setShowProgressBar(false);
          loader("hide");
          toast.error("Something went wrong");
          console.log(err);
        });

      setSelectedHcp([]);
      setSearchedUsers([]);
    }
  };

  const selectHcp = (index) => {
    let arr = [];
    arr = searchedUsers;
    let added_user_id = arr[index].profile_user_id;
    let prev_obj = selectedHcp.find((x) => x.profile_user_id === added_user_id);
    if (typeof prev_obj == "undefined") {
      const removedArray = arr.splice(index, 1);
      setSelectedHcp((oldArray) => [...oldArray, removedArray[0]]);
      setSearchedUsers(arr);
      setReRender(reRender + 1);
    } else {
      toast.error("User with same email already added in list.");
    }
  };

  const saveAsTemplateButtonClicked = async () => {
    let template_id = props.getEmailData
      ? templateId
      : props.getDraftData.template_id;
    let source =
      typeof templateSaving != "undefined" && templateSaving != ""
        ? templateSaving
        : template;
    if (
      typeof template_id != "undefined" &&
      template_id != "" &&
      template_id != 0
    ) {
      const body = {
        user_id: localStorage.getItem("user_id"),
        source_code: source,
        template_id: templateId,
        name: templateName,
        status: 2,
        language: 2,
      };

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`emailapi/add_update_template`, body)
        .then((res) => {
          if (res.data.status_code === 200) {
            loader("hide");
            toast.success("Template saved successfully");
          } else {
            loader("hide");
            toast.warning("Template not selected.");
          }
        })
        .catch((err) => {
          loader("hide");
          toast.error("Something went wrong");
        });
      setNewTemplatePopup(false);
      setTemplatePopup(false);
    } else {
      toast.warning("Template not selected.");
    }
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
    closeModal();
  };

  const nameChanged = (e) => {
    setName(e.target.value);
  };

  const emailChanged = (e) => {
    setEmail(e.target.value);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const saveAsDraft = async (event) => {
    let tagss = [];
    finalTags.map((tags) => {
      tagss.push(tags.innerText || tags);
    });

    let campaign = props.getEmailData
      ? emailCampaign
      : props.getDraftData.campaign;

    if (typeof campaign !== "undefined" && campaign !== "") {
      console.log(props.getDraftData);

      let up_temp = template;
      if (editorRef.current) {
        up_temp = editorRef.current.getContent();
      }

      const body = {
        user_id: localStorage.getItem("user_id"),
        pdf_id: state_object?.PdfSelected
          ? state_object.PdfSelected
          : props.getDraftData.pdf_id,
        description: props.getEmailData
          ? emailDescription
          : props.getDraftData.description,
        creator: props.getEmailData ? emailCreator : props.getDraftData.creator,
        campaign_name: props.getEmailData
          ? emailCampaign
          : props.getDraftData.campaign,
        subject: props.getEmailData ? emailSubject : props.getDraftData.subject,
        route_location: "CreateEmail",
        tags: props.getEmailData ? tagss : props.getDraftData.tags,
        campaign_data: {
          template_id: props.getEmailData
            ? templateId
            : props.getDraftData.template_id,
        },

        campaign_id: campaign_id_st,
        source_code: up_temp,
        status: 2,
      };

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
            // toast.success("Draft saved");
          } else {
            toast.warning(res.data.message);
          }
          loader("hide");
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    } else {
      event.preventDefault();
      toast.error("Plese select Email Campaign first");
    }
  };

  const templateClicked = (template, e) => {
    const div = document.querySelector("img.select_mm");

    if (div) {
      div.classList.remove("select_mm");
    }

    setTemplateId(template.id);
    templateIdRef.current = template.id;

    setTemplateName(template.name);
    setTemplate(template.source_code);
    e.target.classList.toggle("select_mm");
  };

  const emailSubjectChanged = (e) => {
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
      setemailCampaign(e.target.value);
      setEmailCreator("Octapharma R&D");
      setEmailDescription(e.target.value);
    }
    setEmailSubject(e.target.value);
  };

  const nextClicked = () => {
    const tags = finalTags.map((finalTags) => {
      return finalTags.innerHTML == null ? finalTags : finalTags.innerHTML;
    });

    if (validator.allValid()) {
      // console.log(PdfSelected);
      props.getEmailData({
        //uniqueId: uniqueId,
        status: getIsApprovedStatus,
        emailDescription: emailDescription,
        emailCreator: emailCreator,
        emailCampaign: emailCampaign,
        emailSubject: emailSubject,
        templateId: templateId,
        tags: tags,
        template: template,
        PdfSelected: PdfSelected,
        campaign_id: campaign_id_st,
      });

      navigate("/SelectHCP");
    } else {
      validator.showMessages();
      setRenderAfterValidation(renderAfterValidation + 1);
    }
  };

  const approvedClicked = async (e) => {
    let ab = getIsApprovedStatus;
    console.log(ab);
    if (getIsApprovedStatus === 3) {
      await setIsApprovedStatus(2);
      ab = 2;
    } else {
      await setIsApprovedStatus(3);
      ab = 3;
    }
    //setIsApprovedStatus(3);
    e.preventDefault();
    let tagss = [];
    finalTags.map((tags) => {
      tagss.push(tags.innerText || tags);
    });

    const body = {
      user_id: localStorage.getItem("user_id"),
      pdf_id: state_object?.PdfSelected
        ? state_object.PdfSelected
        : props.getDraftData.pdf_id,
      description: props.getEmailData
        ? emailDescription
        : props.getDraftData.description,
      creator: props.getEmailData ? emailCreator : props.getDraftData.creator,
      campaign_name: props.getEmailData
        ? emailCampaign
        : props.getDraftData.campaign,
      subject: props.getEmailData ? emailSubject : props.getDraftData.subject,
      route_location: "CreateEmail",
      tags: props.getEmailData ? tagss : props.getDraftData.tags,
      campaign_data: {
        template_id: props.getEmailData
          ? templateId
          : props.getDraftData.template_id,
      },

      campaign_id: campaign_id_st,
      status: ab,
      approved_page: 1,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        loader("hide");

        setCampaign_id(res.data.response.data.id);
        if (res.data.status_code === 200) {
          if (ab === 3) {
            toast.success("Approved Draft saved");
          } else {
            toast.success("Draft saved");
          }
        } else {
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Somwthing went wrong");
      });
  };

  const tagButtonClicked = () => {
    setIsOpen(true);
    setModalCounter(modalCounter + 1);
  };
  const onSiteNumberChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];

      list[i].siteNumber = "";

      setHpc(list);
    } else {
      let getSiteData = totalData.site_data;
      let site_name_value = getSiteData[e.value];
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].siteNumber;
      list[i].siteNumber = value;
      list[i].siteName = site_name_value;
      let snameindex = siteNameAll.findIndex(
        (x) => x.value === site_name_value
      );
      list[i].siteNameIndex = snameindex;
      let index = siteNumberAll.findIndex((x) => x.value === value);
      list[i].siteNumberIndex = index;
      setHpc(list);
    }

    // e.preventDefault();

    // if (index != 0) {

    //   const { value } = e.target;

    //   const old_hpc = hpc;

    //   old_hpc[i].siteDetails[index].siteNumber = value;

    //   setHpc(old_hpc);

    //   setUpdate(update + 1);

    // } else if (index == 0) {

    //   const { value } = e;

    //   const old_hpc = hpc;

    //   old_hpc[i].siteDetails[index].siteNumber = value;

    //   setHpc(old_hpc);

    //   setUpdate(update + 1);

    // }
  };

  const onSiteNameChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];

      list[i].siteName = "";

      setHpc(list);
    } else {
      const value = e.value;

      let getSiteData = totalData.site_data;

      let site_number_value = Object.keys(getSiteData).find(
        (key) => getSiteData[key] === e.value
      );

      const list = [...hpc];

      const name = hpc[i].siteName;

      list[i].siteName = value;

      list[i].siteNumber = site_number_value;

      let snameindex = siteNumberAll.findIndex(
        (x) => x.value === site_number_value
      );

      list[i].siteNumberIndex = snameindex;

      let index = siteNameAll.findIndex((x) => x.value === value);

      list[i].siteNameIndex = index;

      setHpc(list);
    }
  };

  const onRoleChange = (e, i, statemsg) => {
    if (e == "") {
      const list = [...hpc];
      list[i].role = "";
      setHpc(list);
    } else {
      const value = e?.value;
      const list = [...hpc];
      const name = hpc[i].role;
      list[i].role = value;

      setHpc(list);
    }
  };
  const onInstitutionChange = (e, i) => {
    if (e == "") {
      const list = [...hpc];
      list[i].institutionType = "";
      list[i].optIRT = "";
      list[i].role = "";
      list[i].country = "";
      setHpc(list);
    } else {
      const value = e?.value;
      const list = [...hpc];
      const name = hpc[i].institutionType;
      list[i].institutionType = value;
      setHpc(list);
      if (e?.value == "Study site") {
        onIRTChange("yes", i);
      } else {
        onIRTChange("no", i);
      }
    }
  };
  const onIRTChange = (e, i) => {
    if (e == "") {
      const list = [...hpc];
      list[i].optIRT = "";
      list[i].role = "";
      list[i].country = "";
      setHpc(list);
    } else {
      const value = e;
      const list = [...hpc];
      const name = hpc[i].optIRT;
      list[i].optIRT = value;
      list[i].role = e == "yes" ? irtRole[0]?.value : "Other";
      list[i].country = "";
      list[i].siteNumberIndex = "";
      list[i].siteNameIndex = "";
      list[i].siteName = "";
      list[i].siteNumber = "";
      setHpc(list);
    }
    let arr = [];
    setSiteNumberAll(arr);
    setSiteNameAll(arr);
    setCounterFlag(counterFlag + 1);
  };

  const newTagChanged = (e) => {
    setNewTag(e.target.value);
    e.target.value = "";
    const new_atg = document.getElementById("new-tag");
    new_atg.value = "";
    //console.log(new_atg);
  };

  const emailDescriptionChange = (e) => {
    setEmailDescription(e.target.value);
  };

  const emailCreatorChange = (e) => {
    setEmailCreator(e.target.value);
  };

  const changeEmailCampaign = (e) => {
    setemailCampaign(e.target.value);
  };

  const addTag = async () => {
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
        // console.log(alltemp_tags);
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

        //console.log(body);
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
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
  };

  const tagClicked = (dd) => {
    if (!tagClickedFirst.includes(dd)) {
      setTagClickedFirst((oldArray) => [...oldArray, dd]);
    } else {
      toast.error("Tag already in list.");
    }
  };

  const sendSample = (event) => {
    //  console.log(selectedHcp);

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
      setIsOpensend(true);
    }
  };

  const addNewContactClicked = () => {
    setIsOpenAdd(true);
    setIsOpensend(false);
    setValidationError({});
    setHpc([
      {
        firstname: "",
        lastname: "",
        email: "",
        contact_type: "",
        country: "",
        countryIndex: "",
        role:
          localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
            ? irtRole?.[0]?.value
            : "",
        optIRT:
          localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
            ? "yes"
            : "",
        institutionType: "",
      },
    ]);
    setActiveManual("active");
    setActiveExcel("");
  };

  const removeTag = (index) => {
    const tags = tagClickedFirst;

    tags.splice(index, 1);
    //console.log(tags);
    setTagClickedFirst(tags);
    setFinalTags(tags);
    setTagsReRender(tagsReRender + 1);

    // tagClickedFirst.splice(index, 1);
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
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };

  const searchHcp = async (e) => {
    e.preventDefault();

    if (name == "" && email == "") {
      toast.warning("Please enter name or email first");
    } else {
      const body = {
        user_id: localStorage.getItem("user_id"),
        name: name,
        email: email,
      };
      // let error = {};
      // if (name == "") {
      //   error.name = "Please enter name";
      // }
      // if (email == "") {
      //   error.email = "Please enter email";
      // }
      // if (Object.keys(error)?.length) {
      //   toast.error(error[Object.keys(error)[0]]);
      //   setValidationError(error);
      //   return;
      // } else {
      //   const body = {
      //     user_id: localStorage.getItem("user_id"),
      //     name: name,
      //     email: email,
      //   };
      //console.log(body);
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`emailapi/search_hcp`, body)
        .then((res) => {
          console.log(res);
          // console.log(res.data.response.data);
          if (res.data.response) {
            setSearchedUsers(res.data.response.data);
          } else {
            toast.warning(res.data.message);
          }
          // if (res.data.message) {
          //   setMessage(res.data.message);
          // }
          loader("hide");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addFile = (e) => {
    const addfile_btn = document.getElementById("add_file_btn");
    if (document.querySelector("#add_file_btn .active") !== null) {
      addfile_btn.classList.remove("active");
    } else {
      addfile_btn.classList.add("active");
    }
    document.querySelector("#add_hcp_btn").classList.remove("active");

    e.preventDefault();
    setActiveExcel("active");
    setActiveManual("");
    setAddFileReRender(addFileReRender + 1);
  };

  const onFirstNameChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].firstname;
    list[i].firstname = value;
    setHpc(list);
    // console.log(hpc);
  };

  const onLastNameChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].lastname;
    list[i].lastname = value;
    setHpc(list);
    //console.log(hpc);
  };

  const onEmailChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].email;
    list[i].email = value;
    setHpc(list);
    // setEmailData(e.target.value);
    //console.log(hpc);
  };

  const onContactTypeChange = (e, i) => {
    const value = e;
    const list = [...hpc];
    const name = hpc[i].contact_type;
    list[i].contact_type = value;
    setHpc(list);
  };

  const onCountryChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].country = "";
      list[i].countryIndex = "";
      setHpc(list);
    } else {
      if (localStorage.getItem("user_id") === "56Ek4feL/1A8mZgIKQWEqg==") {
        let consetValue = e.value;
        if (e.value == "B&H") {
          consetValue = "Bosnia and Herzegovina";
        }
        const matchingKeys = Object.entries(totalData.site_country_data)
          .filter(([key, value]) => value === consetValue)
          .map(([key, value]) => key);
        const filteredSiteNames = matchingKeys.map((key) => ({
          label: totalData.site_data[key],
          value: totalData.site_data[key],
        }));
        const siteNumbers = matchingKeys.map((key) => ({
          label: key,
          value: key,
        }));
        setSiteNumberAll(siteNumbers);
        setSiteNameAll(filteredSiteNames);
      }
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].country;
      list[i].country = value;

      let index = countryall.findIndex((x) => x.value === value);
      list[i].countryIndex = index;
      list[i].siteNumberIndex = "";
      list[i].siteNameIndex = "";
      list[i].siteName = "";
      list[i].siteNumber = "";
      setHpc(list);
    }
  };

  const deleteRecord = (i) => {
    const list = hpc;
    list.splice(i, 1);
    setHpc(list);
    setCounterFlag(counterFlag + 1);
  };

  const addHcp = (e) => {
    const addhcp_btn = document.getElementById("add_hcp_btn");
    if (document.querySelector("#add_hcp_btn .active") !== null) {
      addhcp_btn.classList.remove("active");
    } else {
      addhcp_btn.classList.add("active");
    }
    document.querySelector("#add_file_btn").classList.remove("active");

    e.preventDefault();
    setActiveExcel("");
    setActiveManual("active");
    setManualReRender(manualReRender + 1);
  };

  const handleSelect = (data, e) => {
    setSmartListId(data.id);
  };

  const saveClicked = async () => {
    if (activeManual == "active") {
      const body_data = hpc.map((data) => {
        if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
          return {
            first_name: data?.firstname,
            last_name: data?.lastname,
            email: data?.email,
            country: data?.country,
            // contact_type: data?.contact_type,
            siteNumber: data?.siteNumber ? data.siteNumber : "",
            siteName: data?.siteName ? data.siteName : "",
            investigator_type: data?.role,
            siteIrt: data?.optIRT == "yes" ? 1 : 0,
            institution_type: data?.institutionType
              ? data?.institutionType
              : "",
          };
        } else {
          return {
            first_name: data?.firstname,
            last_name: data?.lastname,
            email: data?.email,
            country: data?.country,
            contact_type: data?.contact_type,
          };
        }
      });

      const body = {
        data: body_data,
        user_id: localStorage.getItem("user_id"),
        smart_list_id: "",
      };

      const status = body.data.map((data, index) => {
        console.log(data);
        if (
          data.email == "" ||
          data?.institution_type == "" ||
          ((data?.last_name == "" ||
            data?.first_name == "" ||
            data?.country == "") &&
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==")
        ) {
          if (
            data.first_name == "" &&
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
          ) {
            setValidationError({
              newHcpFirstName: "Please enter the first name",
              index: index,
            });
            return;
          }
          if (
            data.last_name == "" &&
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
          ) {
            setValidationError({
              newHcpLastName: "Please enter the last name",
              index: index,
            });
            return;
          }
          if (data.email == "") {
            setValidationError({
              newHcpEmail: "Please enter the email atleast",
              index: index,
            });

            return;
          }

          if (data.institution_type == "") {
            setValidationError({
              newHcpInstitution: "Please Select the institution ",
              index: index,
            });
            return;
          }

          if (
            data.country == "" &&
            (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==")
          ) {
            setValidationError({
              newHcpCountry: "Please select the country",
              index: index,
            });
            return;
          }

          if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
            if (data.institution_type == "") {
              setValidationError({
                newHcpInstitution: "Please enter the institution ",
                index: index,
              });
              return;
            }
          }
        } else if (data.country == "" && localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
          setValidationError({
            newHcpCountry: "Please select the country",
            index: index,
          });
          return;
        }
        else if (data.email != "") {
          let email = data.email;
          let useremail = email.trim();
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regex.test(String(useremail).toLowerCase())) {
            let prev_obj = selectedHcp.find((x) => x.email === useremail);
            if (typeof prev_obj != "undefined") {
              setValidationError({
                newHcpEmail: "User with same email already added in list.",
                index: index,
              });

              return;
            }
          } else {
            setValidationError({
              newHcpEmail: "Email format is not valid",
              index: index,
            });

            return;
          }
          return "true";
        } else {
          return "true";
        }
      });
      status.sort();
      if (status.every((element) => element == "true")) {
        loader("show");
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        await axios
          .post(`distributes/add_new_readers_in_list`, body)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfuly");

              res.data.response.data.map((data) => {
                setSelectedHcp((oldArray) => [...oldArray, data]);
              });
              setIsOpenAdd(false);
              setIsOpensend(true);
            } else {
              toast.warning(res.data.message);
              loader("hide");
            }
            loader("hide");
            //setSelectedHcp(res.data.response.data);
          })
          .catch((err) => {
            toast.error("Something went wrong");
            loader("hide");
          });
      } else {
        const filteredArray = status.filter((value) => value !== "true");
        toast.warning(filteredArray?.[0]);
        // toast.warning(status[0]);
      }
    } else {
      let formData = new FormData();
      let user_id = localStorage.getItem("user_id");
      formData.append("user_id", user_id);
      formData.append("smart_list_id", "");
      formData.append("reader_file", selectedFile);

      console.log(formData);

      if (selectedFile) {
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
          .post(`distributes/update_reader_list`, formData)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfuly");

              res.data.response.data.map((data) => {
                setSelectedHcp((oldArray) => [...oldArray, data]);
              });

              loader("hide");
              setIsOpenAdd(false);
              setActiveManual("active");
              setActiveExcel("");
              setSelectedFile(null);
              setIsOpensend(true);
            } else {
              toast.warning(res.data.message);
              loader("hide");
            }
          })
          .catch((err) => {
            console.log("something went wrong");
          });
        setIsOpen(false);
      } else {
        toast.error("Please add a excel file");
      }
    }
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setSmartListData(prevsmartListData);
    }
  };

  const submitHandler = (event) => {
    if (getsearch !== "") {
      getSmartListData(1);
    } else {
      toast.error("Please enter text.");
    }
    event.preventDefault();
    return false;
  };

  const hideTemplatePopup = () => {
    setTemplatePopup(false);
  };

  const clickNewTemplate = () => {
    setTemplatePopup(false);
    setNewTemplatePopup(true);
  };

  const hideNewTemplatePopup = () => {
    setNewTemplatePopup(false);
  };

  const savenewtemplate = async (e) => {
    e.preventDefault();
    let template_name = document.getElementById("template_name").value;
    let template_id = props.getEmailData
      ? templateId
      : props.getDraftData.template_id;
    let source =
      typeof templateSaving != "undefined" && templateSaving != ""
        ? templateSaving
        : template;
    if (
      typeof template_id != "undefined" &&
      template_id != "" &&
      template_id != 0
    ) {
      if (template_name !== "" && template_name.trim().length > 0) {
        const body = {
          user_id: localStorage.getItem("user_id"),
          source_code: source,
          template_id: "",
          name: template_name,
          status: 1,
          language: 2,
        };

        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
          .post(`emailapi/add_update_template`, body)
          .then((res) => {
            if (res.data.status_code === 200) {
              getTemplateListData(1);
              setTemplateId(res.data.response.data.last_id);
              templateIdRef.current = res.data.response.data.last_id;
            } else {
              loader("hide");
              toast.warning("Template not selected.");
            }
          })
          .catch((err) => {
            loader("hide");
            toast.error("Something went wrong");
          });
        setNewTemplatePopup(false);
        setTemplatePopup(false);
      } else {
        toast.warning("Please enter template name.");
      }
    } else {
      toast.warning("Template not selected.");
    }
  };

  const downloadFile = () => {
    let link = document.createElement("a");
    link.href = "https://webinar.informed.pro/sample.xlsx";
    link.setAttribute("download", "file.xlsx");
    document.body.appendChild(link);
    link.download = "";
    link.click();
    document.body.removeChild(link);
  };

  const showMoreInfo = (e) => {
    e.preventDefault();
    setShowLessInfo(!showLessInfo);
  };
  const openSmartListPopup = async (smart_list_id) => {
    setShowLessInfo(true);
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      list_id: smart_list_id,
      show_specific: 1,
    };
    loader("show");
    await axios
      .post(`distributes/get_reders_list`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          setAddListOpen(false);
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

  const handleSmartListPopupScroll = (ev) => {
    if (ev.target.scrollTop > 20) {
      document.querySelector("#add-list").setAttribute("custom-atr", "scroll");
    } else {
      document
        .querySelector("#add-list")
        .setAttribute("custom-atr", "non-scroll");
    }
  };

  const updateTemplate = (e) => {
    e.preventDefault();
    let template_id = props.getEmailData
      ? templateId
      : props.getDraftData.template_id;
    if (
      typeof template_id != "undefined" &&
      template_id != "" &&
      template_id != 0
    ) {
      if (editorRef.current) {
        setTemplate(editorRef.current.getContent());
        toast.success("Template update successfuly");
      }
    } else {
      toast.warning("Template not selected.");
    }
  };
  const addTracking = function (editor) {
    editor.on("OpenWindow", function (e) {
      let dialog = document.getElementsByClassName("tox-dialog")[0];

      if (dialog) {
        let header = dialog.querySelector(".tox-dialog__header");
        const closeButton = header.querySelector('[aria-label="Close"]');
        let text = header.querySelector(".tox-dialog__title");

        if (text.innerText == "Insert/Edit Link") {
          let uploadIcon = document.querySelector(
            "body > div.tox.tox-silver-sink.tox-tinymce-aux > div > div.tox-dialog > div.tox-dialog__content-js > div > div > div > div:nth-child(1) > div > button > span"
          );
          uploadIcon.style.display = "none";
          let newButton = document.createElement("button");
          newButton.innerText = "Add Tracking";
          newButton.classList.add("tox-button");
          newButton.classList.add("tox-button--icon");
          newButton.classList.add("tox-button--naked");
          newButton.classList.add("track");
          newButton.onclick = function () {
            if (templateIdRef.current == "") {
              alert("Please select the template first before adding the link");
              return;
            }
            // alert(templateId);
            let firstToxControlWrap = document.querySelector(
              "body > div.tox.tox-silver-sink.tox-tinymce-aux > div > div.tox-dialog > div.tox-dialog__content-js > div > div > div > div:nth-child(1) > div > div >input"
            );

            // let text =dialog.querySelector(".tox-form__group");
            if (!firstToxControlWrap.value) {
              alert("Please enter a link");
              return;
            }

            const baseLink =
              "https://webinar.docintel.app/flow/webinar/track_multilinks?token=###updateid###&tracking_code=clicked_track_doc_";
            if (firstToxControlWrap.value.startsWith(baseLink)) {
              alert("Traking already added");
              return;
            }
            let slugValue = prompt("Enter a slug value");

            const currentTimestamp = Date.now();
            // const redirectUrl = encodeURIComponent(firstToxControlWrap.value)
            let payload = {
              slug_value: slugValue,
              template_id: templateIdRef.current,
              url_code: `clicked_track_doc_${currentTimestamp}`,
            };
            linkingPayload.current = payload;
            let link = `https://webinar.docintel.app/flow/webinar/track_multilinks?token=###updateid###&tracking_code=clicked_track_doc_${currentTimestamp}&redirect_url=${firstToxControlWrap.value}`;
            firstToxControlWrap.value = link;
            var saveButton = document.querySelector(
              '.tox-button[title="Save"]'
            );

            saveButton.addEventListener("click", function () {
              let link = `https://onesource.informed.pro/api/track-links`;

              axios
                .post(link, payload)
                .then((res) => {
                  console.log("done");
                })
                .catch((err) => {
                  loader("hide");
                  console.log(err);
                });
            });
            alert("Traking added");
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
  const uploadImageToServer = async function uploadImageToServer(file) {
    try {
      const formData = new FormData();
      formData.append("image", file);

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        let tox = document.querySelector(
          "body > div.tox.tox-silver-sink.tox-tinymce-aux > div.tox-dialog-wrap > div.tox-dialog"
        );
        let tox1 = document.querySelector(
          "body > div.tox.tox-silver-sink.tox-tinymce-aux > div.tox-dialog-wrap > div.tox-dialog-wrap__backdrop"
        );
        let aux = document.querySelector(
          "body > div.tox.tox-silver-sink.tox-tinymce-aux > div > div"
        );
        xhr.upload.addEventListener("progress", (event) => {
          setShowProgress(true);
          tox.style.opacity = 0;
          tox1.style.opacity = 0;
          aux.style.opacity = 0;
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;

            setProgress(parseInt(event.loaded / event.total));
            setPercent(parseInt(percentComplete));
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status === 200) {
            try {
              const uploadedData = JSON.parse(xhr.responseText);
              const imageUrl = uploadedData.imageUrl;
              resolve(imageUrl);
            } catch (parseError) {
              console.error("Failed to parse response JSON:", parseError);
              reject(null);
            } finally {
              setShowProgress(false);
              tox1.style.opacity = 1;
              tox.style.opacity = 1;
              aux.style.opacity = 1;

              setProgress(0);
              setPercent(0);
            }
          } else {
            console.error("Image upload failed");
            reject(null);
          }
        });

        xhr.addEventListener("error", (error) => {
          console.error("Image upload error:", error);
          reject(null);
        });

        xhr.open("POST", "https://onesource.informed.pro/api/upload-image");
        xhr.send(formData);
      });
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
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
                    <button className="btn btn-primary btn-bordered back">
                      <Link to="/EmailArticleSelect">Back</Link>
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">
                    <li className="active">
                      <Link to="/EmailArticleSelect">Select Content</Link>
                    </li>
                    <li className="active active-main">
                      <a href="">Create Your Email</a>
                    </li>
                    <li className="">
                      <a href="">
                        {localStorage.getItem("user_id") == userId
                          ? "Select Users"
                          : "Select HCPs"}
                      </a>
                    </li>
                    <li className="">
                      <a href="">Verify your list</a>
                    </li>
                    <li className="">
                      <a href="">Verify your Email</a>
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
                      className="btn btn-primary btn-filled next"
                      onClick={nextClicked}
                      disabled={
                        typeof emailSubject == "undefined" ||
                        emailSubject.trim().length == 0 ||
                        typeof templateId == "undefined" ||
                        templateId == ""
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="top-header">
              <div className="custom-container">
                <div className="row">
                  <div className="page-title">
                    <h4>Select your Template</h4>
                  </div>
                </div>
              </div>
            </div>

            <section className="select-mail-template">
              <div className="custom-container">
                <div className="row">
                  <AliceCarousel
                    mouseTracking
                    disableDotsControls
                    activeIndex={activeIndex}
                    responsive={responsive}
                    onSlideChanged={syncActiveIndex}
                  >
                    {templateList.map((template, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="item"
                            onClick={(e) => templateClicked(template, e)}
                          >
                            <img
                              id={"template_dyn" + index}
                              src={template.template_img}
                              alt=""
                              className={
                                typeof templateId !== "undefined" &&
                                  templateId == template.id
                                  ? "select_mm"
                                  : ""
                              }
                            />
                            <p>{template.name}</p>
                          </div>
                        </>
                      );
                    })}
                  </AliceCarousel>

                  <input type="hidden" id="mail_template" value={templateId} />
                  {validator.message("Templates", templateId, "required")}

                  <div className="email-form">
                    <form>
                      {localStorage.getItem("user_id") !=
                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
                        <>
                          <div className="form-inline row justify-content-between align-items-center">
                            <div className="form-group col-12 col-md-7">
                              <label htmlFor="exampleInputEmail1">
                                Email Description <span>*</span>{" "}
                              </label>

                              <input
                                onChange={(e) => emailDescriptionChange(e)}
                                type="text"
                                className={
                                  validator?.message(
                                    "emailDesc",
                                    emailDescription,
                                    "required"
                                  )
                                    ? "form-control error"
                                    : "form-control"
                                }
                                id="email-desc"
                                value={emailDescription}
                              />
                              {validator.message(
                                "emailDesc",
                                emailDescription,
                                "required"
                              )}
                            </div>
                            <div className="form-group right-side col-12 col-md-5">
                              <label htmlFor="exampleInputEmail1">
                                Email Creator <span>*</span>
                              </label>

                              <input
                                onChange={(e) => emailCreatorChange(e)}
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
                          <div className="form-inline row justify-content-between align-items-center">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Email Campaign <span>*</span>
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
                                onChange={changeEmailCampaign}
                              />
                              {validator.message(
                                "emailCampaign",
                                emailCampaign,
                                "required"
                              )}
                            </div>
                          </div>
                        </>
                      ) : null}
                      <div className="input-group w-100">
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
                            {finalTags.map((tags, index) => {
                              return (
                                <>
                                  <li className="list1" key={index}>
                                    {tags.innerHTML || tags}{" "}
                                    <img
                                      src={path_image + "filter-close.svg"}
                                      alt="Close-filter"
                                      onClick={() => removeTag(index)}
                                    />
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </div>
                      </div>

                      <div className="form-inline row justify-content-end align-items-center">
                        <div className="form-group col-12 col-md-5">
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
                            onChange={(e) => emailSubjectChanged(e)}
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
                          {/* {validator.message(
                            "emailSubject",
                            emailSubject,
                            "required"
                          )} */}
                        </div>
                        <div className="form-buttons right-side col-12 col-md-7">
                          <button
                            className="btn btn-primary btn-filled"
                            onClick={(e) => updateTemplate(e)}
                          >
                            Save
                          </button>
                          <button
                            className={
                              typeof getIsApprovedStatus !== "undefined" &&
                                getIsApprovedStatus == 3
                                ? "btn btn-primary approved-btn btn-bordered checked"
                                : "btn btn-primary approved-btn btn-bordered"
                            }
                            onClick={(e) => approvedClicked(e)}
                          >
                            {typeof getIsApprovedStatus !== "undefined" &&
                              getIsApprovedStatus == 3
                              ? "Approved"
                              : "Approve?"}
                            <img
                              src={path_image + "approved-btn.svg"}
                              className="approve_btn"
                              alt=""
                            />
                            <img
                              src={path_image + "/approved-by-btn.svg"}
                              className="approved_btn"
                              alt=""
                            />
                          </button>
                          <button
                            className="btn btn-primary btn-filled btn-large"
                            onClick={sendSample}
                          >
                            Send A Sample
                          </button>
                          <button
                            className="btn btn-primary btn-filled"
                            onClick={(e) => {
                              setTemplatePopup(
                                (getTemplatePopup) => !getTemplatePopup
                              );
                              e.preventDefault();
                            }}
                          >
                            Save As template
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row">
                  {showProgress ? (
                    <div className="progressloader">
                      {" "}
                      <div
                        className="circular-progressbar"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "0",
                          right: "0",
                          margin: "0 auto",
                          width: 200,
                          height: 200,
                          zIndex: "999999",
                        }}
                      >
                        {" "}
                        <CircularProgressbar
                          value={percent}
                          text={`${percent}%`}
                          strokeWidth={5}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}{" "}
                  <Editor
                    apiKey="g2adjiwgk9zbu2xzir736ppgxzuciishwhkpnplf46rni4g8"
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

                          // Create a loading indicator element (e.g., a spinner)
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
                  {/*

              <CKEditor
              editor={ClassicEditor}
              data={template}
              readOnly={true}
              onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
            }}
            onChange={(event, editor) => {
            const data = editor.getData();
            setTemplate(data);
          }}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
          />
              */}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div>
        <Modal id="tagsModal" show={isOpen}>
          <Modal.Header>
            <h5 className="modal-title" id="staticBackdropLabel">
              Add Tags
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
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
                    ? Object.values(allTags)?.map((data, index) => {
                      return (
                        <>
                          <div key={index} onClick={() => tagClicked(data)}>
                            {data}{" "}
                          </div>
                        </>
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
                    <>
                      <div className="tag-cross" key={index}>
                        {data.innerHTML || data}
                        <img
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                          onClick={() => removeTagFinal(index)}
                        />
                      </div>
                    </>
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

        <Modal id="send-sample" show={isOpen_send} custom-atr="non-scroll">
          <Modal.Header>
            <h4>Send a Sample</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => {
                setIsOpensend(false);
                setSelectedHcp([]);
                setSearchedUsers([]);
                setValidationError({});
              }}
            ></button>
          </Modal.Header>
          <Modal.Body onScroll={handleScroll}>
            <div className="top-header">
              <div className="page-title">
                <h4>Search For Contact By:</h4>
              </div>
            </div>
            <section className="search-hcp">
              <div className="form-search-hcp">
                <form>
                  <div className="form-inline row justify-content-between align-items-center">
                    <div className="col-12 col-md-8">
                      <div className="row justify-content-between align-items-center">
                        <div className="form-group col-sm-5">
                          <label htmlFor="hcp-name">Name</label>
                          <input
                            type="text"
                            className={
                              validationError?.name
                                ? "form-control error"
                                : "form-control"
                            }
                            onChange={(e) => nameChanged(e)}
                            id=""
                          />
                          {validationError?.name ? (
                            <div className="login-validation">
                              {validationError?.name}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-sm-5">
                          <label htmlFor="hcp-email">Email</label>
                          <input
                            type="mail"
                            onChange={(e) => emailChanged(e)}
                            className={
                              validationError?.email
                                ? "form-control error"
                                : "form-control"
                            }
                            id=""
                          />
                          {validationError?.email ? (
                            <div className="login-validation">
                              {validationError?.email}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-sm-2">
                          <button
                            className="btn btn-primary btn-filled"
                            onClick={(e) => searchHcp(e)}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="form-button col-12 col-md-4">
                      <button
                        className="btn btn-primary btn-bordered"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#add_hcp"
                        onClick={addNewContactClicked}
                      >
                        Add New Contact +
                      </button>
                      <button
                        className="btn btn-primary btn-bordered"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#add_hcp"
                        onClick={() => setAddListOpen(true)}
                      >
                        Add Smart List +
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="search-hcp-table sample_list_dt">
                <div className="search-hcp-table-inside sample_list_dt">
                  {searchedUsers.length === 0 ? (
                    <div className="not-found">
                      <h4>No Record Found!</h4>
                    </div>
                  ) : (
                    searchedUsers.map((data, index) => {
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
                            onClick={() => selectHcp(index)}
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
                    Selected contact <span>| {selectedHcp.length}</span>
                  </h4>
                </div>
                <div className="selected-hcp-list">
                  {selectedHcp.length === 0 ? (
                    <div className="not-found">
                      <h4>No Contact selected yet!</h4>
                    </div>
                  ) : (
                    <>
                      {selectedHcp.map((data, index2) => {
                        return (
                          <>
                            <div className="search-hcp-box" key={index2}>
                              <p className="send-hcp-box-title">
                                Name |{" "}
                                <span>{data.name || data.first_name}</span>
                              </p>
                              <p className="send-hcp-box-title">
                                Email | <span>{data.email}</span>
                              </p>

                              {localStorage.getItem("user_id") ===
                                "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <p className="send-hcp-box-title">
                                  {" "}
                                  Role |{" "}
                                  <span>
                                    {data?.user_type != 0
                                      ? data?.user_type
                                      : "N/A"}
                                  </span>
                                </p>
                              ) : (
                                <p className="send-hcp-box-title">
                                  {" "}
                                  Contact type |{" "}
                                  <span>
                                    {data?.contact_type
                                      ? data?.contact_type
                                      : "N/A"}
                                  </span>
                                </p>
                              )}

                              <div className="remove-existing-field">
                                <img
                                  src={path_image + "delete.svg"}
                                  alt="Delete Row"
                                  onClick={() => deleteSelected(index2)}
                                />
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>

                    // <table className="table">
                    //   <thead>
                    //     <tr>
                    //       <th scope="col">Name</th>
                    //       <th scope="col">Email</th>
                    //       <th scope="col">Country</th>
                    //       <th scope="col"></th>
                    //     </tr>
                    //   </thead>
                    //   <tbody>
                    //     {selectedHcp.map((data, index2) => {
                    //       return (
                    //         <>
                    //           <tr key={index2}>
                    //             <td>{data.name || data.first_name}</td>
                    //             <td>{data.email}</td>
                    //
                    //             <td>{data.country}</td>
                    //
                    //             <td className="delete_row" colSpan="12">
                    //               <img
                    //                 src={path_image + "delete.svg"}
                    //                 alt="Delete Row"
                    //                 onClick={() => deleteSelected(index2)}
                    //               />
                    //             </td>
                    //           </tr>
                    //         </>
                    //       );
                    //     })}
                    //   </tbody>
                    // </table>
                  )}
                </div>
              </div>
            </section>
          </Modal.Body>
          <Modal.Footer>
            {selectedHcp.length === 0 ? (
              <button
                type="button"
                className="btn btn-primary btn-filled disabled"
                data-bs-dismiss="modal"
              >
                Send
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-filled"
                data-bs-dismiss="modal"
                onClick={sendsampeap}
              >
                Send
              </button>
            )}
          </Modal.Footer>
        </Modal>
      </div>

      <div className="modal">
        <Modal id="add-list" show={addListOpen} custom-atr="non-scroll">
          <Modal.Header>
            <h4>Add List</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => {
                setAddListOpen(false);
                setIsOpensend(true);
                // setSelectedHcp([]);
                // setSearchedUsers([]);
              }}
            ></button>
          </Modal.Header>
          <Modal.Body onScroll={handleSmartListPopupScroll}>
            <div className="top-right-action">
              <div className="search-bar">
                <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                  <input
                    className="form-control me-2"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => searchChange(e)}
                  />
                  <button
                    className="btn btn-outline-success"
                    onClick={(e) => submitHandler(e)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z"
                        fill="#97B6CF"
                      ></path>
                    </svg>
                  </button>
                </form>
              </div>
              {/*
                <div className="filter-by">
                  <button className="btn btn-outline-primary" type="submit">
                    Filter By{" "}
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                        fill="#97B6CF"
                      ></path>
                      <path
                        d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                        fill="#97B6CF"
                      ></path>
                      <path
                        d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                        fill="#97B6CF"
                      ></path>
                    </svg>
                  </button>
                </div>
              */}
            </div>
            <div className="col smartlist-result-block">
              {typeof smartListData !== "undefined" &&
                smartListData.length > 0 ? (
                smartListData.map((data, index) => {
                  return (
                    <>
                      <div className="smartlist_box_block" key={index}>
                        <div className="smartlist-view email_box">
                          <div className="mail-box-content">
                            <h5>{data.name}</h5>
                            <div className="select-mail-option">
                              <input
                                type="radio"
                                name="radio"
                                onClick={(e) => handleSelect(data, e)}
                                checked={
                                  typeof getSmartListId !== "undefined" &&
                                    getSmartListId !== 0 &&
                                    getSmartListId == data.id
                                    ? "checked"
                                    : ""
                                }
                              />
                              <span className="checkmark"></span>
                            </div>
                            <div className="mailbox-table">
                              <table>
                                <tbody>
                                  <tr>
                                    <th>Contact type</th>
                                    <td>{data.contact_type}</td>
                                  </tr>
                                  <tr>
                                    <th>Speciality</th>
                                    <td>{data.speciality}</td>
                                  </tr>
                                  <tr>
                                    <th>Readers</th>
                                    <td>{data.reader_selection}</td>
                                  </tr>
                                  <tr>
                                    <th>IBU</th>
                                    <td>{data.ibu}</td>
                                  </tr>
                                  <tr>
                                    <th>Product</th>
                                    <td>{data.product}</td>
                                  </tr>
                                  <tr>
                                    <th>Country</th>
                                    <td>{data.country}</td>
                                  </tr>
                                  <tr>
                                    <th>Registered</th>
                                    <td>{data.registered}</td>
                                  </tr>
                                  <tr>
                                    <th>Created by</th>
                                    <td>
                                      <span>{data.creator}</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div className="mail-time">
                              <span>{data.created_at}</span>
                            </div>
                            <div className="smart-list-added-user">
                              <img
                                src={path_image + "smartlist-user.svg"}
                                alt="User icon"
                              />
                              {data.readers_count}
                            </div>
                            {/*
                                  <div className="mail-stats">
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
                                  </div>
                                */}
                            <div className="smartlist-buttons">
                              <button className="btn btn-primary btn-bordered view">
                                <a onClick={() => openSmartListPopup(data.id)}>
                                  View
                                </a>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="no_found">
                  <p>No Data Found</p>
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              onClick={(e) => addClicked(e)}
            >
              Add
            </button>
          </Modal.Footer>
        </Modal>
      </div>

      <Modal
        id="add_hcp"
        show={isOpenAdd}
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
              Add New Contact
            </h5>
            <button
              onClick={() => {
                setIsOpenAdd(false);
                setIsOpensend(true);
                setValidationError({});
                setHpc([
                  {
                    firstname: "",
                    lastname: "",
                    email: "",
                    contact_type: "",
                    country: "",
                    countryIndex: "",
                    role:
                      localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg=="
                        ? irtRole?.[0]?.value
                        : "",
                    optIRT:
                      localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg=="
                        ? "yes"
                        : "",
                    institutionType: "",
                  },
                ]);
                if (document.querySelector("#file-4")) {
                  document.querySelector("#file-4").value = "";
                }
                setActiveManual("active");
                setActiveExcel("");
              }}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="hcp-add-box">
              <div className="hcp-add-form tab-content" id="upload-confirm">
                <form id="add_hcp_form" className={"tab-pane" + activeManual}>
                  {hpc.map((val, i) => {
                    const fieldName = `hpc[${i}]`;
                    return (
                      <>
                        <div className="add_hcp_boxes" key={i}>
                          <div className="form_action">
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    First name{" "}
                                    {localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg==" && (
                                        <span>*</span>
                                      )}{" "}
                                  </label>
                                  <input
                                    type="text"
                                    className={
                                      validationError?.newHcpFirstName &&
                                        validationError?.index == i
                                        ? "form-control error"
                                        : "form-control"
                                    }
                                    onChange={(event) =>
                                      onFirstNameChange(event, i)
                                    }
                                    value={val.firstname}
                                  />
                                  {validationError?.newHcpFirstName &&
                                    validationError?.index == i ? (
                                    <div className="login-validation">
                                      {validationError?.newHcpFirstName}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Last name{" "}
                                    {localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg==" && (
                                        <span>*</span>
                                      )}
                                  </label>
                                  <input
                                    type="text"
                                    className={
                                      validationError?.newHcpLastName &&
                                        validationError?.index == i
                                        ? "form-control error"
                                        : "form-control"
                                    }
                                    onChange={(event) =>
                                      onLastNameChange(event, i)
                                    }
                                    value={val.lastname}
                                  />
                                  {validationError?.newHcpLastName &&
                                    validationError?.index == i ? (
                                    <div className="login-validation">
                                      {validationError?.newHcpLastName}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Email <span>*</span>
                                  </label>
                                  <input
                                    type="email"
                                    className={
                                      validationError?.newHcpEmail &&
                                        validationError?.index == i
                                        ? "form-control error"
                                        : "form-control"
                                    }
                                    id="email-desc"
                                    name={`${fieldName}.email`}
                                    onChange={(event) =>
                                      onEmailChange(event, i)
                                    }
                                    value={val.email}
                                  />
                                  {validationError?.newHcpEmail &&
                                    validationError?.index == i ? (
                                    <div className="login-validation">
                                      {validationError?.newHcpEmail}
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              {localStorage.getItem("user_id") ===
                                "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <>
                                  {" "}
                                  <div className="col-12 col-md-6">
                                    <div className="form-group bottom">
                                      <label for="">
                                        Institution <span>*</span>
                                      </label>
                                      <Select
                                        options={institutionType}
                                        className={
                                          validationError?.index == i &&
                                            validationError?.newHcpInstitution
                                            ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                            : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        }
                                        onChange={(event) =>
                                          onInstitutionChange(event, i)
                                        }
                                        defaultValue={
                                          val?.institutionType
                                            ? {
                                              label: val?.institutionType,
                                              value: val?.institutionType,
                                            }
                                            : ""
                                        }
                                        placeholder="Select institution"
                                      />
                                      {validationError?.newHcpInstitution &&
                                        validationError?.index == i ? (
                                        <div className="login-validation">
                                          {validationError?.newHcpInstitution}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">
                                        IRT mandatory training
                                      </label>

                                      <Select
                                        options={optIRT}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onIRTChange(event?.value, i)
                                        }
                                        defaultValue={
                                          val?.optIRT == "yes"
                                            ? {
                                              label: "Yes",
                                              value: val?.optIRT,
                                            }
                                            : ""
                                        }
                                        value={
                                          optIRT.findIndex(
                                            (el) => el.value == val?.optIRT
                                          ) == -1
                                            ? ""
                                            : optIRT[
                                            optIRT.findIndex(
                                              (el) =>
                                                el.value == val?.optIRT
                                            )
                                            ]
                                        }
                                        placeholder="Select IRT"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">IRT role</label>
                                      {val.optIRT == "yes" ? (
                                        <Select
                                          options={irtRole}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onRoleChange(event, i, "role")
                                          }
                                          value={
                                            irtRole.findIndex(
                                              (el) => el.value == val?.role
                                            ) == -1
                                              ? ""
                                              : irtRole[
                                              irtRole.findIndex(
                                                (el) =>
                                                  el.value == val?.role
                                              )
                                              ]
                                          }
                                          isClearable
                                          placeholder="Select Role"
                                        />
                                      ) : val.optIRT == "no" ? (
                                        <Select
                                          options={role}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onRoleChange(event, i, "irtRole")
                                          }
                                          value={
                                            role.findIndex(
                                              (el) => el.value == val?.role
                                            ) == -1
                                              ? ""
                                              : role[
                                              role.findIndex(
                                                (el) =>
                                                  el.value == val?.role
                                              )
                                              ]
                                          }
                                          isClearable
                                          placeholder="Select Role"
                                        />
                                      ) : (
                                        <Select
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          placeholder="Select Role"
                                        />
                                      )}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="">Contact type</label>
                                      <DropdownButton
                                        className="dropdown-basic-button split-button-dropup"
                                        title={
                                          hpc[i].contact_type != "" &&
                                            hpc[i].contact_type != "undefined"
                                            ? hpc[i].contact_type
                                            : "Select Type"
                                        }
                                        onSelect={(event) =>
                                          onContactTypeChange(event, i)
                                        }
                                      >
                                        <Dropdown.Item
                                          eventKey="HCP"
                                          className={
                                            hpc[i].contact_type == "HCP"
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          HCP
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          eventKey="Staff"
                                          className={
                                            hpc[i].contact_type == "Staff"
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          Staff
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          eventKey="Test Users"
                                          className={
                                            hpc[i].contact_type == "Test Users"
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          Test Users
                                        </Dropdown.Item>
                                      </DropdownButton>
                                    </div>
                                  </div>
                                </>
                              )}
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Country{" "}
                                    {(localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") ==
                                      "m5JI5zEDY3xHFTZBnSGQZg==") && (
                                        <span>*</span>
                                      )}
                                  </label>
                                  {val.optIRT == "yes" ? (
                                    <>
                                      <Select
                                        options={irtCountry}
                                        className={
                                          validationError?.index == i &&
                                            validationError?.newHcpCountry
                                            ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                            : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        }
                                        onChange={(event) =>
                                          onCountryChange(event, i)
                                        }
                                        value={
                                          irtCountry.findIndex(
                                            (el) => el.value == val?.country
                                          ) == -1
                                            ? ""
                                            : irtCountry[
                                            irtCountry.findIndex(
                                              (el) =>
                                                el.value == val?.country
                                            )
                                            ]
                                        }
                                        placeholder="Select Country"
                                        filterOption={createFilter(
                                          filterConfig
                                        )}
                                        isClearable
                                      />
                                      {validationError?.newHcpCountry &&
                                        validationError?.index == i && (
                                          <div className="login-validation">
                                            {validationError?.newHcpCountry}
                                          </div>
                                        )}
                                    </>
                                  ) : (
                                    <>
                                      <Select
                                        options={countryall}
                                        className={
                                          validationError?.index == i &&
                                            validationError?.newHcpCountry
                                            ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                            : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        }
                                        onChange={(event) =>
                                          onCountryChange(event, i)
                                        }
                                        value={
                                          countryall.findIndex(
                                            (el) => el.value == val?.country
                                          ) == -1
                                            ? ""
                                            : countryall[
                                            countryall.findIndex(
                                              (el) =>
                                                el.value == val?.country
                                            )
                                            ]
                                        }
                                        placeholder="Select Country"
                                        filterOption={createFilter(
                                          filterConfig
                                        )}
                                        isClearable
                                      />
                                      {validationError?.newHcpCountry &&
                                        validationError?.index == i && (
                                          <div className="login-validation">
                                            {validationError?.newHcpCountry}
                                          </div>
                                        )}
                                    </>
                                  )}

                                  {/*<DropdownButton className="dropdown-basic-button split-button-dropup country"
                                   title= {hpc[i].country != "" &&  hpc[i].country != "undefined" ? hpc[i].country == "B&H" ? "Bosnia and Herzegovina" : hpc[i].country : "Select Country" }
                                   onSelect={(event) => onCountryChange(event, i)}
                                   >
                                    <div className="scroll_div">
                                    {countryall.length === 0
                                     ? ""
                                     : Object.entries(countryall).map(
                                         ([index, item]) => {
                                           return (
                                             <>
                                              <Dropdown.Item eventKey={index} className = {hpc[i].country == index ? "active" : "" }>{item == "B&H" ? "Bosnia and Herzegovina" : item}</Dropdown.Item>
                                             </>
                                           );
                                         }
                                       )}
                                    </div>

                                  </DropdownButton>

                                    <select
                                      className="country-form"
                                      aria-label="select"
                                      onChange={(event) =>
                                        onCountryChange(event, i)
                                      }
                                    >
                                      <option value="" selected>
                                        Select Country
                                      </option>

                                      {countryall.length === 0
                                        ? ""
                                        : Object.entries(countryall).map(
                                            ([index, item]) => {
                                              return (
                                                <>
                                                  <option value={index} key={index}>
                                                    {item}
                                                  </option>
                                                </>
                                              );
                                            }
                                          )}
                                    </select>
                                    */}
                                </div>
                              </div>
                              {/*<div className="col-12 col-md-6 btn_rmv">
                                <div className="form-group">
                                  {i !== 0 && (
                                    <button
                                      type="button"
                                      className="btn btn-filled"
                                      onClick={() => deleteRecord(i)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              </div>*/}
                              {localStorage.getItem("user_id") ===
                                "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <>
                                  {" "}
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site number</label>

                                      <Select
                                        options={siteNumberAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteNumberChange(event, i)
                                        }
                                        value={
                                          siteNumberAll[hpc[i]?.siteNumberIndex]
                                            ? siteNumberAll[
                                            hpc[i]?.siteNumberIndex
                                            ]
                                            : ""
                                        }
                                        placeholder={"Select Site Number"}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site name</label>

                                      <Select
                                        options={siteNameAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteNameChange(event, i)
                                        }
                                        value={
                                          siteNameAll[hpc[i].siteNameIndex]
                                            ? siteNameAll[hpc[i].siteNameIndex]
                                            : ""
                                        }
                                        placeholder={"Select Site Name"}
                                      />
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          <div className="hcp-modal-action">
                            <div className="hcp-action-block">
                              {activeManual == "active" ? (
                                <>
                                  {hpc.length > 1 && (
                                    <div className="hcp-remove">
                                      <button
                                        type="button"
                                        className="btn btn-filled"
                                        onClick={() => deleteRecord(i)}
                                      >
                                        <img
                                          src={path_image + "delete.svg"}
                                          alt="Delete Row"
                                        />
                                      </button>
                                    </div>
                                  )}
                                </>
                              ) : null}
                              <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item add_hcp">
                                  <a
                                    id="add_hcp_btn"
                                    onClick={addMoreHcp}
                                    className="nav-link btn-bordered"
                                    data-bs-toggle="tab"
                                    href="javascipt:;"
                                  >
                                    {localStorage.getItem("user_id") == userId
                                      ? "Add User +"
                                      : "Add HCP +"}
                                  </a>
                                </li>
                                {/*<li className="nav-item add-file">
                                    <a
                                      id="add_file_btn"
                                      onClick={(e) => addFile(e)}
                                      className="nav-link btn-filled"
                                      data-bs-toggle="tab"
                                      href="javascipt:;"
                                    >
                                      Add File
                                    </a>
                                  </li>*/}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </form>
                {/*<form id="add_file" className={"tab-pane" + activeExcel}>
                  <div className="upload-file-box">
                    <div className="form-group files">
                      <div className="box">
                        <input
                          type="file"
                          id="file-4"
                          className="form-control inputfile"
                          multiple=""
                          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                          onChange={onFileChange}
                          ref={file_name}
                        />
                        {(file_name.current?.files===undefined || file_name.current.files?.length===0 )? <><label htmlFor="file-4"><span>Choose Your File</span></label>
                        <p>Upload your excel file</p></> : <h5>{file_name.current.files[0].name}</h5> }



                      </div>
                    </div>
                    </div>

                    <div className="download-sample sample-file"><p>Download sample Excel file to upload new HCPs</p><div className="upload-btn" onClick={downloadFile}>Download File</div></div>
                  </form>*/}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={saveClicked}
            >
              Save
            </button>
          </div>
        </div>
        {/* </div>
        </div> */}
      </Modal>

      {/*Modal for Template action start*/}
      <div className="template_action">
        <Modal
          className="modal send-confirm"
          id="template_action_modal"
          show={getTemplatePopup}
        >
          <Modal.Header>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={hideTemplatePopup}
            ></button>
          </Modal.Header>

          <Modal.Body>
            <img src={path_image + "alert.png"} alt="" />
            <h4>Do you want to :</h4>

            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                onClick={saveAsTemplateButtonClicked}
              >
                Update the current template
              </button>
              <button
                type="button"
                className="btn btn-primary btn-bordered"
                onClick={clickNewTemplate}
              >
                Save as new template
              </button>
              <button
                type="button"
                className="btn btn-primary btn-bordered light"
                onClick={hideTemplatePopup}
              >
                Cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      {/*Modal for Template action end*/}

      {/*Modal for save new template start*/}
      <div className="save_new_template_action">
        <Modal
          className="modal send-confirm"
          id="save_new_template_action_modal"
          show={getNewTemplatePopup}
        >
          <Modal.Header>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={hideNewTemplatePopup}
            ></button>
          </Modal.Header>

          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Enter new template name</label>
                <input
                  type="text"
                  className="form-control"
                  id="template_name"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-filled"
                onClick={savenewtemplate}
              >
                Save
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
      {/*Modal for save new template end*/}

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
            onClick={() => {
              setAddListOpen(true);
              setSmartListPopupStatus(
                (getSmartListPopupStatus) => !getSmartListPopupStatus
              );
            }}
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
                  <thead className="sticky-header">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Bounced</th>
                      <th scope="col">Country</th>

                      {localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
                        <>
                          <th scope="col">IRT mandatory training</th>
                          <th scope="col">IRT role</th>
                        </>
                      ) : (
                        <>
                          <th scope="col">Business unit</th>
                          <th scope="col">Contact type</th>
                        </>
                      )}

                      {showLessInfo == false ? (
                        <>
                          <th scope="col">Consent</th>
                          <th scope="col">Email received</th>
                          <th scope="col">Openings</th>
                          <th scope="col">Registrations</th>
                          <th scope="col">Last email</th>
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
                            <tr key={i}>
                              <td>{rr?.first_name ? rr?.first_name : "N/A"}</td>
                              <td>{rr?.email ? rr?.email : "N/A"}</td>
                              <td>{rr?.bounce ? rr.bounce : "N/A"}</td>
                              <td>{rr?.country ? rr?.country : "N/A"}</td>
                              <td>
                                {localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg=="
                                  ? rr.irt
                                    ? "Yes"
                                    : "No"
                                  : rr.ibu
                                    ? rr.ibu
                                    : "N/A"}
                                {/*rr?.ibu ? rr?.ibu : "N/A"*/}
                              </td>
                              <td>
                                {localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg=="
                                  ? rr?.user_type != 0
                                    ? rr?.user_type
                                    : "N/A"
                                  : rr?.contact_type
                                    ? rr?.contact_type
                                    : "N/A"}
                              </td>
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr?.consent ? rr?.consent : "N/A"}
                                  </span>{" "}
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr?.email_received
                                      ? rr?.email_recieved
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr?.email_opening
                                      ? rr?.email_opening
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr?.registration
                                      ? rr?.registration
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr?.last_email ? rr?.last_email : "N/A"}
                                  </span>
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
          {" "}
          {mailsIncrement} mails sent of {hcpsSelected.length}
        </h4>
      </Modal>

      {/*Reader Details popup end*/}
    </>
  );
};

const mapStateToProps = (state) => {
  dxr = state.getEmailData?.PdfSelected;
  state_object = state.getEmailData;
  return state;
};

export default connect(mapStateToProps, {
  getEmailData: getEmailData,
  getCampaignId: getCampaignId,
})(CreateEmail);
