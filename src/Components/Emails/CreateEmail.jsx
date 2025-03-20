import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { getCampaignId, getEmailData, getSearched, getSelected, getSelectedSmartListData } from "../../actions";
import { useNavigate } from "react-router-dom";
import { Modal,   Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import SimpleReactValidator from "simple-react-validator";
import { loader } from "../../loader";
import { popup_alert } from "../../popup_alert";
import { toast } from "react-toastify";
import Select, { createFilter } from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import SmartListLayout from "../CommonComponent/SmartListLayout";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { surveyEndpoints } from "../surveybuilder/SurveyEndpoints/SurveyEndpoints";
import { surveyAxiosInstance } from "../surveybuilder/CommonFunctions/CommonFunction";
import { ENDPOINT } from "../../axios/apiConfig";
 
// import "bootstrap/dist/css/bootstrap.min.css";
import SmartListTableLayout from "../CommonComponent/SmartListTableLayout";
var dxr = 0;
var state_object = {};
var trainingUser = {};
var searchedUser = {};
var stateListData = {};
const CreateEmail = (props) => {
  const routeTypeSurvey = props?.type == 'survey' ? 1 : 0;
  const accountMapping={"56Ek4feL/1A8mZgIKQWEqg==":2147501188,"bWmUjqX7J011   WUTYn9g==":298217,"MXl8m36VZFYXpgFVz3Pg0g==":2147537506}
    const{FETCH_ALL_TOPICS}=surveyEndpoints;
  const rdLikeArray=["56Ek4feL/1A8mZgIKQWEqg==","bWmUjqX7J011   WUTYn9g==","MXl8m36VZFYXpgFVz3Pg0g=="]
  const isLikeRdAccount= rdLikeArray.includes(localStorage.getItem("user_id"))
  const groupId= localStorage.getItem("group_id")

  const [progress, setProgress] = useState(0);
  const [percent, setPercent] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const editorRef = useRef(null);
  const [totalData, setTotalData] = useState({});
  const linkingPayload = useRef();
  const templateIdRef = useRef(state_object != null &&
    state_object != "undefined" &&
    state_object.templateId
    ? state_object.templateId
    : props.getDraftData
      ? props.getDraftData?.campaign_data?.template_id
      : "");
  const [siteNumberAll, setSiteNumberAll] = useState([]);
  const [siteNameAll, setSiteNameAll] = useState([]);
  const [role, setRole] = useState([]);
  const [irtRole, setIrtRole] = useState([]);
  const [irtInstitutionType, setIrtInstitutionType] = useState([]);
  const [nonIrtInstitutionType, setNonIrtInstitutionType] = useState([]);
  const [optIRT, setoptIRT] = useState([
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ]);
  const filterConfig = {
    matchFrom: "start",
  };
  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
  const navigate = useNavigate();
  const [showPreogressBar, setShowProgressBar] = useState(false);
  const [uploadOrDownloadCount, setUploadOrDownloadCount] = React.useState(0);
  const [mailsIncrement, setMailsIncrement] = useState(0);
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();  
  let type=searchParams.get('type')
  const [getsearch, setSearch] = useState("");
  const PdfSelected = props.getEmailData ? dxr : props.getDraftData.pdf_id;
  const surveyid = state_object?.survey_id ? state_object?.survey_id : props?.getDraftData?.campaign_data?.survey_id ? props?.getDraftData?.campaign_data?.survey_id : 0;
  const surveySubLinkId = state_object?.sublink_id ? state_object?.sublink_id : props?.getDraftData?.campaign_data?.sublink_id ? props?.getDraftData?.campaign_data?.sublink_id : 0;
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
  const [manualEmailDescription, setManualEmailDescription] = useState(
    state_object?.emailDescription ?? props.getDraftData?.description ?? ""
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
  
  const [manualEmailCreator, setManualEmailCreator] = useState(
    state_object?.emailCreator ?? props.getDraftData?.creator ?? ""
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
  const [manualEmailCampaign, setManualEmailCampaign] = useState(
    state_object?.emailCampaign ?? props.getDraftData?.campaign ?? ""
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
  const [manualEmailSubject, setManualEmailSubject] = useState(
    state_object?.emailSubject ?? props.getDraftData?.subject ?? ""
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
 
  const [reRender, setReRender] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedHcp, setSelectedHcp] = useState([]);
 
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const [getTemplatePopup, setTemplatePopup] = useState(false);
  const [getNewTemplatePopup, setNewTemplatePopup] = useState(false);

  const [sortBy, setSortBy] = useState('first_name'); // Initial sort key
  const [sortOrder, setSortOrder] = useState('asc');
  const [getIsApprovedStatus, setIsApprovedStatus] = useState(0);
  const [selectedListId, setSelectedListId] = useState(0);

  const [irtRoleObj,setIRTRoleObj] = useState(
    typeof state?.IrtObj !== "undefined" ? state?.IrtObj : {}
  );
  
  const [IRTTraining, setIRTTraining] = useState(state_object?.startTraining  ? state_object?.startTraining : 0);

  const [hpc, setHpc] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      contact_type: "",
      country: "",
      countryIndex: "",
      role:
        (isLikeRdAccount)
          ? irtRole?.[0]?.value
          : "",
      optIRT:
        (isLikeRdAccount)
          ? "yes"
          : "",
      institutionType: "",
      siteNumber:""
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

 

  useEffect(() => {
    if (addListOpen == true) {
      setIsOpensend(false);
    }
  }, [addListOpen]);

  axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    getTemplateListData(0);
    getSmartListData(0);
  }, []);

  const getSmartListData = (flag) => {
    axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      search: getsearch,
      filter: "",
      type : routeTypeSurvey
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
      const result = await axios.get(`emailapi/get_site?uid=${accountMapping[localStorage.getItem("user_id")] || 2147501188}`);

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
    if (isLikeRdAccount) {
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
            if (isLikeRdAccount) {
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

              


              let non_irt_institution_type =
              res?.data?.response?.data?.non_mandatory_institution_type;

              let nonIrtInstitution = [];
              Object.keys(non_irt_institution_type)?.map((item, i) => {
              nonIrtInstitution.push({ label: item, value: item });
              });

              setNonIrtInstitutionType(nonIrtInstitution);

            let irt_institution_type =
            res?.data?.response?.data?.irt_institution_type;

            let newIrtInstitution = [];
            Object.keys(irt_institution_type)?.map((item, i) => {
              newIrtInstitution.push({ label: item, value: item });
            });

            setIrtInstitutionType(newIrtInstitution);


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

  axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
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
      (isLikeRdAccount)
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
      is_survey: routeTypeSurvey
    };
    type = type || state_object?.type;
    if(type){
      body.type = type
    }

    loader("show");
    await axios
      .post(`emailapi/get_template_list`, body)
      .then((res) => {
        setTemplateList(res.data.response.data);
        getSelectedTemplateSource(res.data.response.data);
        setCounter(counter + 1);


        setTimeout(function () {
          if ((isLikeRdAccount)
          && [3968, 3970, 4521, '3968', '3970', '4521'].includes(pdf_id)) {
            let div_img = '';
            if (pdf_id == '3968') {
              div_img = document.querySelector('[data-id="template_dyn_data_id554"]');
            } else if (pdf_id == '3970') {
              div_img = document.querySelector('[data-id="template_dyn_data_id555"]');
            } else if (pdf_id == '4521') {
              div_img = document.querySelector('[data-id="template_dyn_data_id556"]');
            }
            if (div_img !== '' && div_img !== null && typeof div_img != "undefined") {
              div_img.click();
            } else {
              const new_div = document.querySelector("#template_dyn0");
              if (new_div !== null && typeof new_div != "undefined") {
                new_div.click();
              }
            }
          } else {
            if(templateId == '' || templateId?.length == 0){
              const div_img = document.querySelector("#template_dyn0");
              if (div_img !== null && typeof div_img != "undefined") {
                div_img.click();
              }
            }
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
    const body = {
      user_id: localStorage.getItem("user_id"),
    };

    axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
    const getAllTags = async () => {
      await surveyAxiosInstance
        .post(FETCH_ALL_TOPICS, body)
        .then((res) => {
          setAllTags(res?.data?.data);
           
        })
        .catch((err) => {
          loader("hide");
          console.log(err);
        });
    };
    getAllTags();
   
  }, []);

  useEffect(() => {
    if (
      typeof props !== "undefined" &&
      props !== null &&
      props.hasOwnProperty("getDraftData")
    ) {
      if (props.getDraftData !== null) {
        setEmailDescription(state_object?.emailDescription || props?.getDraftData?.description);
        setManualEmailDescription(state_object?.emailDescription || props?.getDraftData?.description);
        setEmailCreator(state_object?.emailCreator || props?.getDraftData?.creator);
        setManualEmailCreator(state_object?.emailCreator || props?.getDraftData?.creator);
        setemailCampaign(state_object?.emailCampaign || props?.getDraftData?.campaign);
        setManualEmailCampaign(state_object?.emailCampaign || props?.getDraftData?.campaign);
        setEmailSubject(state_object?.emailSubject || props?.getDraftData?.subject);
        setManualEmailSubject(state_object?.emailSubject || props?.getDraftData?.subject);
        setFinalTags(state_object?.tags || props?.getDraftData?.tags);
        setTagClickedFirst(props?.getDraftData?.tags);
        setTemplateId(state_object?.templateId || props?.getDraftData?.campaign_data.template_id);
        templateIdRef.current = state_object?.templateId || props?.getDraftData?.campaign_data?.template_id;
        setIsApprovedStatus(state_object?.status || props?.getDraftData?.status);
        setTemplate(state_object?.template || props?.getDraftData?.source_code);
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
      if (isLikeRdAccount) {
        if (
          data?.email == "" ||
          data?.lastname == "" ||
          data?.firstname == "" ||
          data?.country == "" ||
          data?.institutionType == ""||
          (data?.optIRT === 'yes' && (data?.siteNumber === "" || data?.siteName === ""))
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
            (isLikeRdAccount)
              ? "yes"
              : "",
          role:
            (isLikeRdAccount)
              ? irtRole?.[0]?.value
              : "",
          institutionType: "",
          
        },
      ]);
    } else {
      if (isLikeRdAccount) {
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
        sublink_id: state_object?.sublink_id
            ? state_object.sublink_id
            : surveySubLinkId,
        survey_id: state_object?.survey_id
        ? state_object.survey_id
        : surveyid,
      };

 
      axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;

      axios
        .post(`emailapi/send_sample_email`, body)
        .then((res) => {
          
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

      axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
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
      

      let up_temp = template;
      if (editorRef.current) {
        up_temp = editorRef.current.getContent();
      }

      let redirectPath = routeTypeSurvey ? "/survey/email" :"/EmailList";
 
      if (irtRoleObj?.IRTFlag) {
        redirectPath = "/IRTRole";
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
        route_location: routeTypeSurvey ? "survey/email/create-email" : "CreateEmail",
        tags: props.getEmailData ? tagss : props.getDraftData.tags,
        campaign_data: {
          template_id: props.getEmailData
            ? templateId
            : props.getDraftData.template_id,
          sublink_id: state_object?.sublink_id
            ? state_object.sublink_id
            : surveySubLinkId,
          survey_id: state_object?.survey_id
          ? state_object.survey_id
          : surveyid,
        },
        campaign_id: campaign_id_st,
        source_code: up_temp,
        status: 2,
      };

      axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
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
             
              redirect: redirectPath
            });
            
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

  const templateIRTClicked = (template, e) => {
    const div = document.querySelector("img.select_mm");

    if (div) {
      div.classList.remove("select_mm");
    }
    
    const templateDescriptions = {
      "E-Mail IRT: Site User": "IRT Training Site User",
      "E-mail IRT: Investigator": "IRT Training Investigator_blinded",
      "E-Mail IRT: Site Pharmacist (Unblinded)": "IRT Training_Site Pharmacist Unblinded",
    };
    setEmailDescription(manualEmailDescription ? manualEmailDescription : templateDescriptions[template?.name])

    const templateSubject = {
      "E-Mail IRT: Site User": "LEX-210 Mandatory IRT training blinded site user",
      "E-mail IRT: Investigator": "LEX-210 Mandatory IRT training blinded Investigator",
      "E-Mail IRT: Site Pharmacist (Unblinded)": "LEX-210 Mandatory IRT training unblinded site pharmacist",
    };
    setEmailSubject(manualEmailSubject ? manualEmailSubject : templateSubject[template?.name])

    const templateCampaign = {
      "E-Mail IRT: Site User": "IRT Training Site User",
      "E-mail IRT: Investigator": "IRT Training Investigator_blinded",
      "E-Mail IRT: Site Pharmacist (Unblinded)": "IRT Training_Site Pharmacist Unblinded",
    };
    setemailCampaign(manualEmailCampaign ? manualEmailCampaign : templateCampaign[template?.name])
    setEmailCreator(manualEmailCreator ? manualEmailCreator : 'LEX')
    setTemplateId(template.id);
    templateIdRef.current = template?.id;

    setTemplateName(template.name);
    setTemplate(template.source_code);
    e.target.classList.toggle("select_mm");
  };

  const templateClicked = (template, e) => {
    const div = document.querySelector("img.select_mm");

    if (div) {
      div.classList.remove("select_mm");
    }

    setTemplateId(template.id);
    templateIdRef.current = template?.id;

    setTemplateName(template.name);
    setTemplate(template.source_code);
    e.target.classList.toggle("select_mm");
  };

  const emailSubjectChanged = (e) => {
    setEmailSubject(e.target.value);
  };

  const nextClicked = () => {
    const tags = finalTags?.map((finalTags) => {
      return finalTags.innerHTML == null ? finalTags : finalTags.innerHTML;
    });
    if (validator.allValid()) {
      if(irtRoleObj?.IRTFlag){
        let existingObj = {
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
          selected: state_object?.selected ? state_object?.selected : 0,
          removedHcp : state_object?.removedHcp ? state_object?.removedHcp : [],
          addedHcp : state_object?.addedHcp ? state_object?.addedHcp : [],
          selectedHcp : state_object?.selectedHcp ? state_object?.selectedHcp : [],
          fromSurveyLanding:state_object?.fromSurveyLanding ? state_object?.fromSurveyLanding : false,
          sublink_id : surveySubLinkId,
          survey_id : surveyid,
        };
        
        if(state_object?.startTraining == 1){
          existingObj['startTraining'] = 1;
          const mergedObject = { ...existingObj, ...irtRoleObj };
          props.getSelectedSmartListData(stateListData)
          props.getEmailData(mergedObject);
          props.getSelected(trainingUser)
          props.getSearched(null)
          navigate("/VerifyHCP", {
            state: {IrtObj:irtRoleObj,NextFlag:1},
          });
        }else{
          const mergedObject = { ...existingObj, ...irtRoleObj };
          props.getSelectedSmartListData(stateListData)
          props.getEmailData(mergedObject);
          props.getSelected(trainingUser)
          props.getSearched(searchedUser)
          navigate("/VerifyHCP", {
            state: {IrtObj:irtRoleObj,NextFlag:1},
          });
        }
      }else{
        props.getSelectedSmartListData(stateListData)
        props.getSelected(trainingUser)
        props.getSearched(searchedUser)
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
          selected: state_object?.selected ? state_object?.selected : 0,
          removedHcp : state_object?.removedHcp ? state_object?.removedHcp : [],
          addedHcp : state_object?.addedHcp ? state_object?.addedHcp : [],
          selectedHcp : state_object?.selectedHcp ? state_object?.selectedHcp : [],
          fromSurveyLanding:state_object?.fromSurveyLanding ? state_object?.fromSurveyLanding : false,
          sublink_id : surveySubLinkId,
          survey_id : surveyid,
        });
        const nextRouteName = routeTypeSurvey ? "/survey/email/select-hcp" : "/SelectHCP";
        navigate(nextRouteName);
      }
    } else {
      validator.showMessages();
      setRenderAfterValidation(renderAfterValidation + 1);
    }
  };

  const approvedClicked = async (e) => {
    let ab = getIsApprovedStatus;
     
    if (getIsApprovedStatus === 3) {
      await setIsApprovedStatus(2);
      ab = 2;
    } else {
      await setIsApprovedStatus(3);
      ab = 3;
    }
    
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
      route_location: routeTypeSurvey ? "survey/email/create-email" : "CreateEmail",
      tags: props.getEmailData ? tagss : props.getDraftData.tags,
      campaign_data: {
        template_id: props.getEmailData
          ? templateId
          : props.getDraftData.template_id,
        sublink_id: state_object?.sublink_id
          ? state_object.sublink_id
          : surveySubLinkId,
        survey_id: state_object?.survey_id
        ? state_object.survey_id
        : surveyid,
      },

      campaign_id: campaign_id_st,
      status: ab,
      approved_page: 1,
    };

    axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
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
        toast.error("Something went wrong");
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
      list[i].institutionType = "";
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
  
  };

 

  const emailCreatorChange = (e) => {
    setEmailCreator(e.target.value);
  };

  const changeEmailCampaign = (e) => {
    setemailCampaign(e.target.value);
  };

  const addTag = async () => {
    if (typeof newTag == "undefined" || newTag.trim().length == 0) {
      toast.error("Please enter a Topic");
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
      

        // const body = {
        //   user_id: localStorage.getItem("user_id"),
        //   tags: newTag,
        // };

    
        axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
         

                       try {
                                  loader("show");
                                   await surveyAxiosInstance.post(ENDPOINT.ADD_SPC_PRODUCT, {
                                     user_id: localStorage.getItem("user_id"),
                                     product: newTag?.trim(),
                                     category: 0,
                                     type: 2,
                                   });

                                   setTagClickedFirst((oldArray) => [...oldArray, newTag]);
                                   setAllTags((oldArray) => [...oldArray, newTag]);

                                   loader("hide");
                                
                                 } catch (err) {
                                   loader("hide");
                                 }

        
        // await axios
        //   .post(`emailapi/save_tags`, body)
        //   .then((res) => {
        //     loader("hide");
        //   })
        //   .catch((err) => {
        //     loader("hide");
        //     console.log(err);
        //   });
      } 
      else {
        toast.error("Topic already in list.");
      }
      setNewTag("");
      setTagsCounter(tagsCounter + 1);
    }
  };

  const tagClicked = (dd) => {
    if (!tagClickedFirst.includes(dd)) {
      setTagClickedFirst((oldArray) => [...oldArray, dd]);
    } else {
      toast.error("Topic already in list.");
    }
  };

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
          (isLikeRdAccount)
            ? irtRole?.[0]?.value
            : "",
        optIRT:
          (isLikeRdAccount)
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
  
    setTagClickedFirst(tags);
    setFinalTags(tags);
    setTagsReRender(tagsReRender + 1);

    
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
     
      axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
      loader("show");
      await axios
        .post(`emailapi/search_hcp`, body)
        .then((res) => {
         
          if (res.data.response) {
            setSearchedUsers(res.data.response.data);
          } else {
            toast.warning(res.data.message);
          }
           
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
     
  };

  const onLastNameChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].lastname;
    list[i].lastname = value;
    setHpc(list);
    
  };

  const onEmailChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].email;
    list[i].email = value;
    setHpc(list);
     
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
      if (isLikeRdAccount) {
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
 
 
     const  isRdAndNorgianAcount=isLikeRdAccount
      const body_data = hpc.map((data) => {
        if (isRdAndNorgianAcount) {
 
          if(data?.optIRT == "yes"){
            return {
              first_name: data?.firstname,
              last_name: data?.lastname,
              email: data?.email,
              country: data?.country,
               
              siteNumber: data?.siteNumber ? data.siteNumber : "",
              siteName: data?.siteName ? data.siteName : "",
              investigator_type: data?.role,
              siteIrt:1,
              institution_type: data?.institutionType
                ? data?.institutionType
                : "",
            };
          }
          else{
            return {
              first_name: data?.firstname,
              last_name: data?.lastname,
              email: data?.email,
              country: data?.country,
              investigator_type: data?.role,
              siteIrt: 0,
              institution_type: data?.institutionType
                ? data?.institutionType
                : "",
            };
          }
       
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
        if (isRdAndNorgianAcount ) {
          if (
            data.first_name == "" &&
            (isRdAndNorgianAcount)
          ) {
            setValidationError({
              newHcpFirstName: "Please enter the first name",
              index: index,
            });
            return;
          }
          else if (
            data.last_name == "" &&
            (isRdAndNorgianAcount)
          ) {
            setValidationError({
              newHcpLastName: "Please enter the last name",
              index: index,
            });
            return;
          }
          else if (data.email == "") {
            setValidationError({
              newHcpEmail: "Please enter the email",
              index: index,
            });
 
            return;
          }
 
          else if (data.institution_type == "") {
            setValidationError({
              newHcpInstitution: "Please Select the institution type",
              index: index,
            });
            return;
          }
          else if (
            data.country == "" &&
            (isRdAndNorgianAcount)
          ) {
            setValidationError({
              newHcpCountry: "Please select the country",
              index: index,
            });
            return;
          }
 
          
       else if(data?.siteIrt == 1 ){
        if ( data.siteNumber === "" &&
          (isRdAndNorgianAcount)) {
          setValidationError({
            newSiteNumber: "Please select the site number ",
            index: index,
          });
          return;
        }
        if (data.siteName === "" &&
          (isRdAndNorgianAcount)) {
          setValidationError({
            newSiteName: "Please select the site name",
            index: index,
          });
          return;
        }
       }
           
         
        }else if(data.email==""){
          setValidationError({
            newHcpEmail: "Please enter the email",
            index: index,
          });

          return;
        }else if (data.country == "" && localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
          setValidationError({
            newHcpCountry: "Please select the country",
            index: index,
          });
          return;
        }      
         if (data.email != "") {
 
          let email = data.email;
          let useremail = email.trim();
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regex.test(String(useremail).toLowerCase())) {
            let prev_obj = selectedHcp.find((x) => x?.email?.toLowerCase() === useremail?.toLowerCase());
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
        axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
        await axios
          .post(`distributes/add_new_readers_in_list`, body)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfully");
 
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
            
          })
          .catch((err) => {
            toast.error("Something went wrong");
            loader("hide");
          });
      }
    } else {
      let formData = new FormData();
      let user_id = localStorage.getItem("user_id");
      formData.append("user_id", user_id);
      formData.append("smart_list_id", "");
      formData.append("reader_file", selectedFile);
 
 
 
      if (selectedFile) {
        axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
        loader("show");
        await axios
          .post(`distributes/update_reader_list`, formData)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfully");
 
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
          type: routeTypeSurvey,
          content_included: 1
        };

        axios.defaults.baseURL = import.meta.env.VITE_APP_API_KEY;
        loader("show");
        await axios
          .post(`emailapi/add_update_template`, body)
          .then((res) => {
            if (res.data.status_code === 200) {
              getTemplateListData(1);
              setTemplateId(res.data.response.data.last_id);
              templateIdRef.current = res?.data?.response?.data?.last_id;
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
    link.href = "https://webinar.docintel.app/lmn/excel/sample.xlsx";
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
        toast.success("Your changes saved successfully");
      }
    } else {
      toast.warning("Template not selected.");
    }
  };
  
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
          "https://webinar.docintel.app/lmn/api/track_multilinks?token=###updateid###&tracking_code=clicked_track_doc_";
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
              let link = `https://webinar.docintel.app/lmn/api/track_multilinks?token=###updateid###&tracking_code=clicked_track_doc_${currentTimestamp}&redirect_url=${firstToxControlWrap.value}`;
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

  const handleSort = (key) => {
    setSortBy(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortData = (data, key, order) => {
    return data.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      // Handle different data types (numbers, strings)
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return order === 'asc'
          ? valueA?.localeCompare(valueB) // Handle string sorting with locale awareness
          : valueB?.localeCompare(valueA);
      }
    });
  };


  const viewSmartListData = async (id) => {
    setAddListOpen(false);
    setSelectedListId(id);
  }

  const closeSmartListPopup = async () => {
    setSelectedListId(0);
    setAddListOpen(true);
  }

  const handleBackClick = () => {
    const tags = finalTags.map((finalTags) => {
      return finalTags.innerHTML == null ? finalTags : finalTags.innerHTML;
    });

    let emailExistingObj = {
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
      selected: state_object?.selected ? state_object?.selected : 0,
      removedHcp : state_object?.removedHcp ? state_object?.removedHcp : [],
      addedHcp : state_object?.addedHcp ? state_object?.addedHcp : [],
      selectedHcp : state_object?.selectedHcp ? state_object?.selectedHcp : [],
      fromSurveyLanding:state_object?.fromSurveyLanding ? state_object?.fromSurveyLanding : false,
      sublink_id : surveySubLinkId,
      survey_id : surveyid,
    };

    if(type){
      emailExistingObj.type = type;
    }
      if(irtRoleObj?.IRTFlag){
        if(state_object?.startTraining == 1){
          emailExistingObj['startTraining'] = 1;
        }
        const mergedObject = { ...emailExistingObj, ...irtRoleObj };
        // console.log(mergedObject,"mergedObject");
        
        props.getEmailData(mergedObject);
      }else{
        props.getEmailData(emailExistingObj);
      }
      props.getSelected(trainingUser)
      props.getSearched(searchedUser)
      props.getSelectedSmartListData(stateListData)
      if(routeTypeSurvey){
        navigate("/survey/email/selectsurvey", {
          state: {IrtObj:irtRoleObj},
        });
      }else{
        navigate("/EmailArticleSelect", {
          state: {IrtObj:irtRoleObj},
        });
      }
  };

  const handleSelectUsers = () => {
    if(routeTypeSurvey){
      navigate("/survey/email/selectsurvey", {
        state: {IrtObj:irtRoleObj},
      });
    }else{
      navigate("/EmailArticleSelect", {
        state: {IrtObj:irtRoleObj},
      });
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
                    <button className="btn btn-primary btn-bordered back" onClick={handleBackClick}>
                       Back
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <ul className="tabnav-link">
                    <li className="active" onClick={handleSelectUsers}>
                      {
                        routeTypeSurvey ?
                        <Link to="/survey/email/selectsurvey">Select Survey</Link>
                        :
                        <Link to="/EmailArticleSelect">Select Content</Link>
                      }
                      {/* {
                        routeTypeSurvey ? "Select Survey" : "Select Content"
                      } */}
                    </li>
                    <li className="active active-main">
                      <a href="">Create Your Email</a>
                    </li>
                 
                     {!irtRoleObj?.IRTFlag && (
                        <li className="">
                          <a href="">
                            {(isLikeRdAccount) ? "Select Users" : "Select HCPs"}
                          </a>
                        </li>
                      )}
                    <li className="">
                      <a href="">
                        {
                          IRTTraining ? "Verify Your IRT" : "Verify your list"
                        }
                      </a>
                    </li>
                    <li className="">
                      <a href="">Verify your Email</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-3">
                  <div className="header-btn">
                    {
                      IRTTraining ? 
                        <Link to = {"/new-readers-reviews"}
                           
                          state= {irtRoleObj}
                          className="btn btn-primary btn-bordered move-draft">
                          Cancel
                        </Link>
                      :
                      <>
                        {
                          (isLikeRdAccount)
                          ? 
                            <>
                              {
                                irtRoleObj?.IRTFlag ? 
                                  <Link to = {"/RD-EmailList"}
                                    state= {{IrtObj: irtRoleObj}}
                                    className="btn btn-primary btn-bordered move-draft engine_cancel">
                                    Cancel
                                  </Link>
                                :
                                <Link to = {"/EmailList"}
                                  className="btn btn-primary btn-bordered move-draft engine_cancel">
                                  Cancel
                                </Link>
                              }
                              
                              <button
                                  className="btn btn-primary btn-bordered" state={{IrtObj:irtRoleObj }}
                                  onClick={saveAsDraft}
                                >
                                  Save As Draft
                                </button>
                            </>    
                          :
                            <button
                              className="btn btn-primary btn-bordered move-draft"  state={{IrtObj:irtRoleObj }}
                              onClick={saveAsDraft}
                            >
                              Save As Draft
                            </button>
                        }
                      </>

                    }

                    <button
                      className="btn btn-primary btn-filled next"  state={{ PdfSelected: PdfSelected,IrtObj:irtRoleObj }}
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
                        <React.Fragment key={index}>
                          <div
                           
                            className="item"
                            // onClick={(e) => templateClicked(template, e)}
                            onClick={(e) => irtRoleObj?.IRTFlag ? templateIRTClicked(template, e) : templateClicked(template, e)}
                          >
                            <img
                              id={"template_dyn" + index}
                              src={template.template_img}
                              data-id={"template_dyn_data_id" + template.id}
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
                        </React.Fragment>
                      );
                    })}
                  </AliceCarousel>

                  <input type="hidden" id="mail_template" value={templateId} />
                  {validator.message("Templates", templateId, "required")}

                  <div className="email-form padding-add">
                    <form>
        
                      <>
                        <div className="form-inline d-flex justify-content-between align-items-center">
                          <div className="form-group col-12 col-md-7 d-flex align-items-center">
                            <label htmlFor="exampleInputEmail1">
                              Email Description <span>*</span>
                              <LinkWithTooltip
                                tooltip="About this specific email, this description will aid in distinguishing it from others."
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
                         
                              onChange={(e) => {
                                setEmailDescription(e?.target?.value);
                                setManualEmailDescription(e?.target?.value)
                            }}
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
                            + Add Topics
                          </button>
                        </div>
                        <div className="tags_added">
                          <ul>
                            {finalTags.map((tags, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <li className="list1" >
                                    {tags.innerHTML || tags}{" "}
                                    <img
                                      src={path_image + "filter-close.svg"}
                                      alt="Close-filter"
                                      onClick={() => removeTag(index)}
                                    />
                                  </li>
                                </React.Fragment>
                              );
                            })}
                          </ul>
                        </div>
                      </div>

                      <div className="form-inline d-flex justify-content-end align-items-center">
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
                        <div className="form-buttons right-side col-12 col-md-7">
                          
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
                            className="btn btn-primary btn-bordered btn-large"
                            onClick={sendSample}
                          >
                            Send A Sample
                          </button>
                          <button
                            className="btn btn-primary btn-bordered"
                            onClick={(e) => {
                              setTemplatePopup(
                                (getTemplatePopup) => !getTemplatePopup
                              );
                              e.preventDefault();
                            }}
                          >
                            Save As template
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
                    apiKey="gpl"
                          tinymceScriptSrc={window.location.origin+ '/tinymce/tinymce.min.js'}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={template}
                    init={{
                      height: "100vh",
                      menubar: "file edit view insert format tools table help",
                      plugins:
                        "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
                      toolbar:
                        "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed link anchor codesample | ltr rtl",
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
              Add Topics
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
              <h6>Select Topics :</h6>
              <div className="tag-lists">
                <div className="tag-lists-view">
                  {allTags
                    ? Object.values(allTags)?.map((data, index) => {
                      return (
                        <React.Fragment key={index}>
                          <div  onClick={() => tagClicked(data)}>
                            {data}{" "}
                          </div>
                        </React.Fragment>
                      );
                    })
                    : ""}
                </div>
              </div>
            </div>
            <div className="selected-tags">
              <h6>
                Selected Topics <span>| {tagClickedFirst.length}</span>
              </h6>

              <div className="total-selected">
                {tagClickedFirst.map((data, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="tag-cross" >
                        {data.innerHTML || data}
                        <img
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                          onClick={() => removeTagFinal(index)}
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <form>
              <div className="form-group">
                <label htmlFor="new-tag">New Topic</label>
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
                          <React.Fragment key={index2}>
                            <div className="search-hcp-box" key={index2}>
                              <p className="send-hcp-box-title">
                                Name |{" "}
                                <span>{data.name || data.first_name}</span>
                              </p>
                              <p className="send-hcp-box-title">
                                Email | <span>{data.email}</span>
                              </p>

                              {(isLikeRdAccount)
                                ? (
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
                          </React.Fragment>
                        );
                      })}
                    </>

                  
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
                
              }}
            ></button>
          </Modal.Header>
          <Modal.Body onScroll={handleSmartListPopupScroll}>
            <div className="top-right-action">
              <div className="search-bar">
                <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    onChange={(e) => searchChange(e)}
                  />
                  <button
                    className="btn btn-outline"
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
              
            </div>
            <div className="col smartlist-result-block new-smartlist">
              {typeof smartListData !== "undefined" &&
                smartListData.length > 0 ? (
                smartListData.map((data, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="smartlist_box_block"  >
                        <div className="smartlist-view email_box">
                          <div className="mail-box-content">
                            <div className="mail-box-conten-title">
                              <h5>{data.name}</h5>
                              <div className="select-mail-option">
                                <input
                                  type="radio"
                                  name="radio"
                                  onClick={(e) => handleSelect(data, e)}
                                  onChange={() => {}}
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
                            </div>
                            <SmartListLayout data={data} iseditshow={0} isviewshow={1} deletestatus={0} viewSmartListData={viewSmartListData} />
                           
                            
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
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
          
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
        
          aria-hidden="true"
        >
         
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
                      (isLikeRdAccount)
                        ? irtRole?.[0]?.value
                        : "",
                    optIRT:
                      (isLikeRdAccount)
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
                      <React.Fragment key={fieldName}>
                        <div className="add_hcp_boxes" key={i}>
                          <div className="form_action">
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    First name{" "}
                                    {(isLikeRdAccount)
                                      && (
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
                                    placeholder="First name"
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
                                    {isLikeRdAccount
                                      && (
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
                                    placeholder="Last name"
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
                                    placeholder="example@email.com"
                                  />
                                  {validationError?.newHcpEmail &&
                                    validationError?.index == i ? (
                                    <div className="login-validation">
                                      {validationError?.newHcpEmail}
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              {(isLikeRdAccount)
                                ? (
                                <>
                                  {" "}

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
                                    <div className="form-group bottom">
                                      <label for="">
                                        Institution <span>*</span>
                                      </label>
                                      {val.optIRT == "yes" ? (
                                      <Select
                                        options={irtInstitutionType}
                                        className={
                                          validationError?.index == i &&
                                            validationError?.newHcpInstitution
                                            ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                            : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        }
                                        onChange={(event) =>
                                          onInstitutionChange(event, i)
                                        }
                                        
                                        value={
                                          irtInstitutionType.findIndex(
                                            (el) => el.value == val?.institutionType
                                          ) == -1
                                            ? ""
                                            : irtInstitutionType[
                                              irtInstitutionType.findIndex(
                                              (el) =>
                                                el.value == val?.institutionType
                                            )
                                            ]
                                        }
                                        isClearable
                                        placeholder="Select institution"
                                      /> 
                                      ): 
                                      val.optIRT == "no" ? ( <Select
                                        options={nonIrtInstitutionType}
                                        className={
                                          validationError?.index == i &&
                                            validationError?.newHcpInstitution
                                            ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                            : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        }
                                        onChange={(event) =>
                                          onInstitutionChange(event, i)
                                        }
                                        
                                        
                                        value={
                                          nonIrtInstitutionType.findIndex(
                                            (el) => el.value == val?.institutionType
                                          ) == -1
                                            ? ""
                                            : nonIrtInstitutionType[
                                              nonIrtInstitutionType.findIndex(
                                              (el) =>
                                                el.value == val?.institutionType
                                            )
                                            ]
                                        }
                                        isClearable
                                        placeholder="Select institution"
                                      />
                                       ): null}
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
                                      <label for="">IRT role <span>*</span></label>
                                      {val.optIRT == "yes" ? (
                                        <Select
                                          options={irtRole}
                                          className={(validationError?.role &&
                                            validationError?.index == i)
                                            ?"dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                            :"dropdown-basic-button split-button-dropup edit-country-dropdown"}
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
                                          className={(validationError?.role &&
                                            validationError?.index == i)
                                            ?"dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                            :"dropdown-basic-button split-button-dropup edit-country-dropdown"}
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
                                      {(validationError?.role &&
                                        validationError?.index == i) ? (
                                        <div className="login-validation">
                                          {validationError?.role}
                                        </div>
                                      ) : null}
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
                                    {(isLikeRdAccount || localStorage.getItem("user_id") ==
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

                               
                                </div>
                              </div>
                              
                              {(isLikeRdAccount)
                                ? (
                                <>
                                  {" "}
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site number
                                     { val.optIRT == "yes" ? <span> *</span>: null}
                                      </label>

                                      <Select
                                        options={siteNumberAll}
                                        // className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        className={
                                          validationError?.index == i &&
                                            validationError?.newSiteNumber
                                            ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                            : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        }
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
                                       {validationError?.newSiteNumber &&
                                        validationError?.index == i ? (
                                        <div className="login-validation">
                                          {validationError?.newSiteNumber}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site name  { val.optIRT == "yes" ? <span> *</span>: null}</label>
                                      

                                      <Select
                                        options={siteNameAll}
                                        
                                        className={
                                          validationError?.index == i &&
                                            validationError?.newSiteName
                                            ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                            : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        }
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
                                       {validationError?.newSiteName &&
                                        validationError?.index == i ? (
                                        <div className="login-validation">
                                          {validationError?.newSiteName}
                                        </div>
                                      ) : null}
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
                                    {(isLikeRdAccount)
                                      ? "Add User +"
                                      : "Add HCP +"}
                                  </a>
                                </li>
                                
                              </ul>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </form>
               
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
       
      </Modal>

      
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
                  HCPs {" "}
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
                      <th scope="col" >
                        Name
                        <button
                          className={`event_sort_btn ${sortBy == "first_name" ?
                            sortOrder == "asc"
                              ? "svg_asc"
                              : "svg_active"
                            : ""
                            }`}
                          onClick={() => handleSort('first_name')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <g clip-path="url(#clip0_3722_6611)">
                              <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                            </g>
                            <defs>
                              <clipPath id="clip0_3722_6611">
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </th>
                      <th scope="col">Email
                        <button
                          className={`event_sort_btn ${sortBy == "email" ?
                            sortOrder == "asc"
                              ? "svg_asc"
                              : "svg_active"
                            : ""
                            }`}
                          onClick={() => handleSort('email')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <g clip-path="url(#clip0_3722_6611)">
                              <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                            </g>
                            <defs>
                              <clipPath id="clip0_3722_6611">
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </th>
                      <th scope="col">Bounced</th>
                      <th scope="col">Country
                        <button
                          className={`event_sort_btn ${sortBy == "country" ?
                            sortOrder == "asc"
                              ? "svg_asc"
                              : "svg_active"
                            : ""
                            }`}
                          onClick={() => handleSort('country')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <g clip-path="url(#clip0_3722_6611)">
                              <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                            </g>
                            <defs>
                              <clipPath id="clip0_3722_6611">
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </th>

                      {(isLikeRdAccount)
                        ? (
                        <><th scope="col">Site number</th>
                          <th scope="col">IRT mandatory training</th>
                          <th scope="col">IRT role</th>
                        </>
                      ) : (
                        <>
                         {groupId !=2 && <th scope="col">Business unit
                            <button
                              className={`event_sort_btn ${sortBy == "ibu" ?
                                sortOrder == "asc"
                                  ? "svg_asc"
                                  : "svg_active"
                                : ""
                                }`}
                              onClick={() => handleSort('ibu')}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </th>}
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
                      sortData(getReaderDetails, sortBy, sortOrder).map((rr, i) => {
                        return (
                          <React.Fragment key={i}>
                            <tr>
                              <td>{rr?.first_name ? rr?.first_name : "N/A"}</td>
                              <td>{rr?.email ? rr?.email : "N/A"}</td>
                              <td>{rr?.bounce ? rr.bounce : "N/A"}</td>
                              <td>{rr?.country ? rr?.country : "N/A"}</td>
                              {(isLikeRdAccount) && (<><td>{rr?.site_number ? rr?.site_number : "N/A"}</td></>)}
                           { groupId !=2 &&  <td>
                                {(isLikeRdAccount)
                                  ? rr.irt
                                    ? "Yes"
                                    : "No"
                                  : rr.ibu
                                    ? rr.ibu
                                    : "N/A"}
                                {/*rr?.ibu ? rr?.ibu : "N/A"*/}
                              </td>}
                              <td>
                                {(isLikeRdAccount)
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
                          </React.Fragment>
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

      {
        selectedListId ?
          <SmartListTableLayout id={selectedListId} closeSmartListPopup={closeSmartListPopup} />
          : null
      }
    </>
  );
};

const mapStateToProps = (state) => {
  dxr = state.getEmailData?.PdfSelected;
  state_object = state.getEmailData;
  trainingUser = state.getSelected;
  searchedUser = state.getSearched;
  stateListData = state.getSelectedSmartListData
  return state;
};

export default connect(mapStateToProps, {
  getEmailData: getEmailData,
  getCampaignId: getCampaignId,
  getSelected,
  getSearched,
  getSelectedSmartListData,
})(CreateEmail);
