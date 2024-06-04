import React, { useState, useRef, useEffect } from "react";
import { Col } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import axios from "axios";
import { loader } from "../../../../../loader";
import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import AliceCarousel from "react-alice-carousel";
import { CircularProgressbar } from "react-circular-progressbar";
import { Editor } from "@tinymce/tinymce-react";
import { Modal } from "react-bootstrap";
import AddNewContactModal from "../../../../../Model/AddNewContactModal";
import { connect, useDispatch } from "react-redux";
import { getWebinarEmailData, getWebinarCampaignId, getWebinarDraftData } from '../../../../../actions'
import { postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { popup_alert } from '../../../../../popup_alert';
import SmartListTableLayout from "../../../../CommonComponent/SmartListTableLayout";
import SmartListLayout from "../../../../CommonComponent/SmartListLayout";
var dxr = 0;
var state_object = {};

const WebinarCreateNewEmail = (props) => {
    let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const switch_account_detail = JSON.parse(localStorage.getItem("switch_account_detail"))
    const [localStorageUserId,setLocalStorageUserId]=useState(switch_account_detail != null && switch_account_detail != "undefined" && switch_account_detail
    ? switch_account_detail?.user_id
    : localStorage.getItem("user_id"))
    const [percent, setPercent] = useState(0);
    const { eventIdContext, handleEventId } = useSidebar()
    const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"))
    const [eventId, setEventId] = useState(
        eventIdContext?.eventId
            ? eventIdContext?.eventId
            : localStorageEvent?.eventId
    );
    const [counter, setCounter] = useState(0);
    const [userId, setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==");
    const campaign_id = props?.getWebinarDraftData ? props?.getWebinarDraftData?.campaign_id : "";
    const [activeIndex, setActiveIndex] = useState(0);
    const syncActiveIndex = ({ item }) => setActiveIndex(item);
    const [selectedListId, setSelectedListId] = useState(0);
    const [templateList, setTemplateList] = useState([]);
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 5 },
    };
    const [finalTags, setFinalTags] = useState(
        state_object != null && state_object != "undefined" && state_object?.tags
            ? state_object?.tags
            : props?.getWebinarDraftData
                ? props?.getWebinarDraftData?.tags
                : []
    );
    const [emailCampaign, setemailCampaign] = useState(
        state_object != null &&
            state_object != "undefined" &&
            state_object?.emailCampaign
            ? state_object?.emailCampaign
            : props?.getWebinarDraftData
                ? props?.getWebinarDraftData?.campaign
                : ""
    );
    const [readers, setReaders] = useState([]);

    const [template, setTemplate] = useState(
        state_object != null && state_object != "undefined" && state_object?.template
            ? state_object?.template
            : props?.getWebinarDraftData
                ? props?.getWebinarDraftData?.source_code
                : ""
    );
    const editorRef = useRef(null);

    const [emailDescription, setEmailDescription] = useState(
        state_object != null &&
            state_object != "undefined" &&
            state_object?.emailDescription
            ? state_object?.emailDescription
            : props?.getWebinarDraftData
                ? props?.getWebinarDraftData?.description
                : ""
    );

    const [manualEmailDescription, setManualEmailDescription] = useState("")

    const [emailCreator, setEmailCreator] = useState(
        state_object != null &&
            state_object != "undefined" &&
            state_object?.emailCreator
            ? state_object?.emailCreator
            : props?.getWebinarDraftData
                ? props?.getWebinarDraftData?.creator
                : ""
    );

    const [emailSubject, setEmailSubject] = useState(
        state_object != null &&
            state_object != "undefined" &&
            state_object?.emailSubject
            ? state_object?.emailSubject
            : props?.getWebinarDraftData
                ? props?.getWebinarDraftData?.subject
                : ""
    );
    const [firstTimeLoad, setFirstTimeLoad] = useState(location?.state?.flag == 1 ? true : false)
    const [firstTimeEmailSubject, setFirstTimeEmailSubject] = useState(
        state_object != null &&
            state_object != "undefined" &&
            state_object?.emailSubject
            ? state_object?.emailSubject
            : props?.getWebinarDraftData
                ? props?.getWebinarDraftData?.subject
                : ""
    );
    const [templateId, setTemplateId] = useState(
        state_object != null &&
            state_object != "undefined" &&
            state_object?.templateId
            ? state_object?.templateId
            : props?.getWebinarDraftData
                ? props?.getWebinarDraftData?.campaign_data?.template_id
                : ""
    );
    const [campaign_id_st, setCampaign_id] = useState(campaign_id);
    const [validator] = React.useState(new SimpleReactValidator());
    const [validationError, setValidationError] = useState({});
    const [getIsApprovedStatus, setIsApprovedStatus] = useState(0);
    const [renderAfterValidation, setRenderAfterValidation] = useState(0);
    const templateIdRef = useRef("");
    const [templateName, setTemplateName] = useState("");
    const [isOpenTagModal, setIsOpenTagModal] = useState(false);
    const [modalCounter, setModalCounter] = useState(0);
    const [tagClickedFirst, setTagClickedFirst] = useState([]);
    const [tagsReRender, setTagsReRender] = useState(0);
    const [selectedHcp, setSelectedHcp] = useState([]);
    const [isOpensend, setIsOpensend] = useState(false);
    const [getTemplatePopup, setTemplatePopup] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const linkingPayload = useRef();
    const [progress, setProgress] = useState(0);
    const [templateSaving, setTemplateSaving] = useState("");
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [irtRole, setIrtRole] = useState([]);

    const [hpc, setHpc] = useState([
        {
            firstname: "",
            lastname: "",
            email: "",
            contact_type: "",
            country: "",
            countryIndex: "",
            role:
            localStorageUserId == "56Ek4feL/1A8mZgIKQWEqg=="
                    ? irtRole?.[0]?.value
                    : "",
            optIrt:
            localStorageUserId == "56Ek4feL/1A8mZgIKQWEqg=="
                    ? "yes"
                    : "",
            institutionType: "",
        },
    ]);
    const [activeManual, setActiveManual] = useState("active");
    const [activeExcel, setActiveExcel] = useState("");
    const [addListOpen, setAddListOpen] = useState(false);
    const [reRender, setReRender] = useState(0);
    const [hcpsSelected, setHcpsSelected] = useState([]);
    const [totalData, setTotalData] = useState({});
    const [countryall, setCountryall] = useState([]);
    const [irtCountry, setIRTCountry] = useState([]);
    const [role, setRole] = useState([]);
    const [institutionType, setInstitutionType] = useState([]);
    const [getNewTemplatePopup, setNewTemplatePopup] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [allTags, setAllTags] = useState({});
    const [newTag, setNewTag] = useState("");
    const [tagsCounter, setTagsCounter] = useState(0);
    const [smartListData, setSmartListData] = useState([]);
    const [prevsmartListData, setPrevSmartListData] = useState([]);
    const [getsearch, setSearch] = useState("");
    const [getSmartListId, setSmartListId] = useState(0);
    const [showLessInfo, setShowLessInfo] = useState(true);
    const [getSmartListPopupStatus, setSmartListPopupStatus] = useState(false);
    const [getReaderDetails, setReaderDetails] = useState({});
    const [getSmartListName, setSmartListName] = useState("");
    const [showPreogressBar, setShowProgressBar] = useState(false);
    const [uploadOrDownloadCount, setUploadOrDownloadCount] = React.useState(0);
    const [mailsIncrement, setMailsIncrement] = useState(0);
   

    useEffect(() => {
        if (addListOpen == true) {
            setIsOpensend(false);
        }
    }, [addListOpen]);

    useEffect(() => {
        getTemplateListData(0);
        getSmartListData(0);
    }, []);

    const getSmartListData = (flag) => {
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        const body = {
            user_id: localStorageUserId,
            search: getsearch,
            filter: "",
            event_id: eventId
        };
        loader("show");
        axios
            .post(`distributes/get_smart_list`, body)
            .then((res) => {
                setSmartListData(res?.data?.response?.data);
                if (flag == 0) {
                    setPrevSmartListData(res?.data?.response?.data);
                } else {
                    loader("hide");
                }
            })
            .catch((err) => {
                loader("hide");
                console.log(err);
            });
    };

    useEffect(() => {
        loader("show");
        if (localStorageUserId== "56Ek4feL/1A8mZgIKQWEqg==") {
            axiosFun();
        }
        getalCountry();

    }, []);

    useEffect(() => {

        if (
            typeof props !== "undefined" &&
            props !== null &&
            props.hasOwnProperty("getWebinarDraftData")
        ) {
            if (props?.getWebinarDraftData !== null) {
                setEmailDescription(props?.getWebinarDraftData?.description);
                setEmailCreator(props?.getWebinarDraftData?.creator);
                setemailCampaign(props?.getWebinarDraftData?.campaign);
                setEmailSubject(props?.getWebinarDraftData?.subject);
                setFirstTimeEmailSubject(props?.getWebinarDraftData?.subject);
                setFinalTags(props?.getWebinarDraftData?.tags);
                setTagClickedFirst(props?.getWebinarDraftData?.tags);
                setTemplateId(props?.getWebinarDraftData?.campaign_data?.template_id);
                templateIdRef.current = props?.getWebinarDraftData?.campaign_data?.template_id;
                setIsApprovedStatus(props?.getWebinarDraftData?.status);
                setTemplate(props?.getWebinarDraftData?.source_code);
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
                let getSpecificKeyData = dd?.find(
                    (e) => e?.id === props?.getWebinarDraftData?.campaign_data?.template_id
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
                        if (state_object?.template !== "") {
                            setTemplate("state_object.template");
                            setTemplate(state_object?.template);
                        } else {
                            setTemplate(getSpecificKeyData?.source_code);
                        }
                    } else if (
                        props.getWebinarDraftData != null &&
                        props.getWebinarDraftData?.source_code != ""
                    ) {
                        if (props.getWebinarDraftData?.source_code !== "") {
                            setTemplate("props.getDraftData.source_code");
                            setTemplate(props.getWebinarDraftData?.source_code);
                        } else {
                            setTemplate(getSpecificKeyData?.source_code);
                        }
                    } else {
                        setTemplate(getSpecificKeyData?.source_code);
                    }
                }
            }
        }
    };

    useEffect(() => {
        //console.log("sdsdsd");
    }, [selectedHcp]);

    useEffect(() => {
        const body = {
            user_id: localStorageUserId
        };

        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        const getAllTags = async () => {
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
        getAllTags();
    }, []);

    const axiosFun = async () => {
        try {
            const result = await axios.get(`emailapi/get_site`);

            let country = result?.data?.response?.data?.site_country_data;
            let arr = [];
            Object.entries(country)?.map(([index, item]) => {
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
    const getalCountry = async () => {
        const body = {
            user_id: localStorageUserId,
            language: "",
            ibu: "",
        };
        await axios
            .post(`distributes/filters_list`, body)
            .then((res) => {
                if (res?.data?.status_code == 200) {
                    let country = res?.data?.response?.data?.country;
                    let arr = [];
                    Object.entries(country)?.map(([index, item]) => {
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
                    if (localStorageUserId == "56Ek4feL/1A8mZgIKQWEqg==") {
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
                        setRole(newType);
                        setIrtRole(newIrtType);
                        let institution_type =
                            res?.data?.response?.data?.institution_type;
                        let newInstitution = [];
                        Object.keys(institution_type)?.map((item, i) => {
                            newInstitution.push({ label: item, value: item });
                        });
                        setInstitutionType(newInstitution);
                    }
                    setTotalData(res?.data?.response?.data);

                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getTemplateListData = async () => {
        try {
            loader("show")
            let body = {
                eventId: eventId
            }
            const response = await postData(ENDPOINT.WEBINAR_EMAIL_GET_TEMPLATE_LIST, body)
            //   setTemplate(response?.data?.data)
            setTemplateList(response?.data?.data)
            getSelectedTemplateSource(response?.data?.data);
            setCounter(counter + 1);

            setTimeout(function () {
                const div_img = document.querySelector("#template_dyn0");
                if (div_img !== null && typeof div_img != "undefined") {
                    div_img.click();
                }
            }, 400);
            loader("hide")
        } catch (err) {
            loader("hide")
            console.log("--err", err)
        }
    }



    const showMoreInfo = (e) => {
        e.preventDefault();
        setShowLessInfo(!showLessInfo);
    };

    const searchChange = (e) => {
        setSearch(e?.target?.value);
        if (e?.target?.value === "") {
            setSmartListData(prevsmartListData);
        }
    };

    const handleSmartListPopupScroll = (e) => {
        if (e?.target?.scrollTop > 20) {
            document.querySelector("#add-list").setAttribute("custom-atr", "scroll");
        } else {
            document
                .querySelector("#add-list")
                .setAttribute("custom-atr", "non-scroll");
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (getsearch !== "") {
            getSmartListData(1);
        } else {
            toast.error("Please enter text.");
        }

        return false;
    };

    const handleSelect = (data, e) => {
        setSmartListId(data?.id);
    };

    const openSmartListPopup = async (smart_list_id) => {
        console.log("in open smartlist pop up")
        setShowLessInfo(true);
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        const body = {
            user_id: localStorageUserId,
            list_id: smart_list_id,
            show_specific: 1,
        };
        loader("show");
        await axios
            .post(`distributes/get_reders_list`, body)
            .then((res) => {
                if (res?.data?.status_code == 200) {
                    setAddListOpen(false);
                    setReaderDetails(res?.data?.response?.data);
                    setSmartListName(res?.data?.response?.smart_list_name);
                    setSmartListPopupStatus(true);
                } else {
                    toast.warning(res?.data?.message);
                }
                loader("hide");
            })
            .catch((err) => {
                toast.warning("Something went wrong");
                loader("hide");
            });
    };

    const saveAsDraft = async (event) => {
        let tagss = [];
        finalTags?.map((tags) => {
            tagss?.push(tags?.innerText || tags);
        });

        let campaign = props?.getWebinarEmailData
            ? emailCampaign
            : props?.getWebinarDraftData?.campaign;

        // if (typeof campaign !== "undefined" && campaign !== "") {

        let up_temp = template;
        if (editorRef.current) {
            up_temp = editorRef.current.getContent();
        }

        const body = {
            pdf_id: 0,
            user_id: localStorageUserId,
            event_id: eventId,
            description: props?.getWebinarEmailData
                ? emailDescription
                : props?.getWebinarDraftData?.description,
            creator: props?.getWebinarEmailData ? emailCreator : props.getWebinarDraftData?.creator,
            // campaign_name: props?.getWebinarEmailData
            //     ? emailCampaign
            //     : props?.getWebinarDraftData?.campaign,
            campaign_name: "webinar",
            subject: props?.getWebinarEmailData ? emailSubject : props?.getWebinarDraftData?.subject,
            route_location: "webinar/email/create-new-email",
            tags: props?.getWebinarEmailData ? tagss : props?.getWebinarDraftData?.tags,
            campaign_data: {
                template_id: props?.getWebinarEmailData
                    ? templateId
                    : props?.getWebinarDraftData?.template_id,
            },

            campaign_id: campaign_id_st,
            source_code: up_temp,
            status: 2,
            auto_responder_id: props?.getWebinarEmailData
                ? templateId
                : props?.getWebinarDraftData?.template_id
        };
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
            .post(`emailapi/save_draft`, body)
            .then((res) => {
                if (res?.data?.status_code === 200) {
                    setCampaign_id(res?.data?.response?.data?.id);
                    popup_alert({
                        visible: "show",
                        message: "Your changes has been saved <br />successfully !",
                        type: "success",
                        redirect: "/webinar/email",
                    });
                    // toast.success("Draft saved");
                } else {
                    toast.warning(res?.data?.message);
                }
                loader("hide");
            })
            .catch((err) => {
                toast.error("Something went wrong");
            });
        // } else {
        // event.preventDefault();
        // toast.error("Plese select Email Campaign first");
        // }
    };
    const nextClicked = () => {
        const tags = finalTags?.map((finalTags) => {
            return finalTags?.innerHTML == null ? finalTags : finalTags?.innerHTML;
        });

        if (validator.allValid()) {

            props?.getWebinarEmailData({
                //uniqueId: uniqueId,
                status: getIsApprovedStatus,
                emailDescription: emailDescription,
                emailCreator: emailCreator,
                emailCampaign: emailCampaign,
                emailSubject: emailSubject,
                templateId: templateId,
                tags: tags,
                template: template,
                event_id: eventId,
                campaign_id: campaign_id_st,
            });

            navigate("/webinar/email/selectHCP");
        } else {
            validator.showMessages();
            setRenderAfterValidation(renderAfterValidation + 1);
        }
    };
    const templateClicked = (template, e,) => {
        console.log("in template clicked-->", template?.id)
        // const div = document.querySelector("img.select_mm");

        // if (div) {
        //     div.classList.remove("select_mm");
        // }


        if (firstTimeLoad) {
            const div = document.querySelector("img.select_mm");

            if (div) {
                div.classList.remove("select_mm");
            }
            setEmailSubject(template?.subject);
            setEmailDescription(manualEmailDescription ? manualEmailDescription : template?.description)
            setTemplateId(template?.id);
            templateIdRef.current = template?.id;

            setTemplateName(template?.subject);
            setTemplate(template?.template);
            e.target.classList.toggle("select_mm");

        }
        setFirstTimeLoad(true)
        // setTemplateId(template?.id);
        // templateIdRef.current = template?.id;

        // setTemplateName(template?.subject);
        // setTemplate(template?.template);
        // e.target.classList.toggle("select_mm");
    };
    const tagButtonClicked = () => {
        setIsOpenTagModal(true);
        setModalCounter(modalCounter + 1);
    };

    const removeTag = (index) => {
        const tags = tagClickedFirst;

        tags?.splice(index, 1);
        setTagClickedFirst(tags);
        setFinalTags(tags);
        setTagsReRender(tagsReRender + 1);

        // tagClickedFirst.splice(index, 1);
    };
    const emailSubjectChanged = (e) => {
        if (localStorageUserId == "56Ek4feL/1A8mZgIKQWEqg==") {
            setemailCampaign(e?.target?.value);
            setEmailCreator("Octapharma R&D");
            setEmailDescription(e?.target?.value);
        }
        setEmailSubject(e?.target?.value);
    };
    const updateTemplate = (e) => {
        e.preventDefault();
        let template_id = props?.getWebinarEmailData
            ? templateId
            : props?.getWebinarDraftData?.template_id;
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

    const approvedClicked = async (e) => {
        e.preventDefault();
        let ab = getIsApprovedStatus;
        if (getIsApprovedStatus === 3) {
            await setIsApprovedStatus(2);
            ab = 2;
        } else {
            await setIsApprovedStatus(3);
            ab = 3;
        }
        //setIsApprovedStatus(3);

        let tagss = [];
        finalTags?.map((tags) => {
            tagss?.push(tags?.innerText || tags);
        });

        const body = {
            pdf_id: 0,
            user_id: localStorageUserId,
            event_id: eventId,
            description: props?.getWebinarEmailData
                ? emailDescription
                : props?.getWebinarDraftData?.description,
            creator: props?.getWebinarEmailData ? emailCreator : props?.getWebinarDraftData?.creator,
            // campaign_name: props?.getWebinarEmailData
            //     ? emailCampaign
            //     : props?.getWebinarDraftData?.campaign,
            campaign_name: "webinar",
            subject: props?.getWebinarEmailData ? emailSubject : props?.getWebinarDraftData?.subject,
            route_location: "webinar/email/create-new-email",
            tags: props?.getWebinarEmailData ? tagss : props?.getWebinarDraftData?.tags,
            campaign_data: {
                template_id: props?.getWebinarEmailData
                    ? templateId
                    : props?.getWebinarDraftData?.template_id,
            },

            campaign_id: campaign_id_st,
            status: ab,
            approved_page: 1,
            auto_responder_id: props?.getWebinarEmailData
                ? templateId
                : props?.getWebinarDraftData?.template_id
        };

        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
            .post(`emailapi/save_draft`, body)
            .then((res) => {
                loader("hide");

                setCampaign_id(res?.data?.response?.data?.id);
                if (res?.data?.status_code === 200) {
                    dispatch(getWebinarDraftData({ ...props.getWebinarDraftData, status: ab }));
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

    const sendSample = (event) => {

        event.preventDefault();
        let error = {};

        // if (templateId == "" || templateId == 0) {
        //   error.templateId = "Please select email template first";
        // }
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
                    "https://webinar.docintel.app/flow/webinar/track_mail/##TOKEN##?is_ics=0&tracking_code=clicked_track_doc_";
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
                                email_autoresponder_id: templateIdRef.current,
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
                                alert("Traking already added");
                                return;
                            }
                            let slugValue = prompt("Enter a slug value");

                            const currentTimestamp = Date.now();
                            payload = {
                                slug_value: slugValue,
                                email_autoresponder_id: templateIdRef.current,
                                url_code: `clicked_track_doc_${currentTimestamp}`,
                            };
                            linkingPayload.current = payload;
                            let link = `https://webinar.docintel.app/flow/webinar/track_mail/##TOKEN##?is_ics=0&tracking_code=clicked_track_doc_${currentTimestamp}&redirect_url=${firstToxControlWrap.value}&url_type=new_webinar`; firstToxControlWrap.value = link;

                        }

                        var saveButton = document.querySelector(
                            '.tox-button[title="Save"]'
                        );
                        saveButton.addEventListener("click", function () {
                            axios
                                .post(apiLink, payload)
                                .then((res) => {
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
                    if (event?.lengthComputable) {
                        const percentComplete = (event?.loaded / event?.total) * 100;

                        setProgress(parseInt(event?.loaded / event?.total));
                        setPercent(parseInt(percentComplete));
                    }
                });

                xhr.addEventListener("load", () => {
                    if (xhr?.status === 200) {
                        try {
                            const uploadedData = JSON.parse(xhr?.responseText);
                            const imageUrl = uploadedData?.imageUrl;
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

                // xhr.open("POST", "https://onesource.informed.pro/api/upload-image");
                // xhr.send(formData);
            });
        } catch (error) {
            console.error("Image upload error:", error);
            return null;
        }
    };
    const handleScroll = (e) => {
        if (e?.target?.scrollTop > 20) {
            document
                .querySelector("#send-sample")
                .setAttribute("custom-atr", "scroll");
        } else {
            document
                .querySelector("#send-sample")
                .setAttribute("custom-atr", "non-scroll");
        }
    };
    const searchHcp = async (e) => {
        e.preventDefault();

        if (name == "" && email == "") {
            toast.warning("Please enter name or email first");
        } else {
            const body = {
                user_id: localStorageUserId,
                name: name,
                email: email,
            };
            axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
            loader("show");
            await axios
                .post(`emailapi/search_hcp`, body)
                .then((res) => {
                    if (res.data.response) {
                        setSearchedUsers(res?.data?.response?.data);
                    } else {
                        toast.warning(res?.data?.message);
                    }

                    loader("hide");
                })
                .catch((err) => {
                    console.log(err);
                });
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
                localStorageUserId == "56Ek4feL/1A8mZgIKQWEqg=="
                        ? irtRole?.[0]?.value
                        : "",
                optIrt:
                localStorageUserId == "56Ek4feL/1A8mZgIKQWEqg=="
                        ? "yes"
                        : "",
                institutionType: "",
            },
        ]);
        setActiveManual("active");
        setActiveExcel("");
    };

    const selectHcp = (index) => {
        let arr = [];
        arr = searchedUsers;
        let added_user_id = arr[index]?.profile_user_id;
        let prev_obj = selectedHcp?.find((x) => x?.profile_user_id === added_user_id);
        if (typeof prev_obj == "undefined") {
            const removedArray = arr.splice(index, 1);
            setSelectedHcp((oldArray) => [...oldArray, removedArray[0]]);
            setSearchedUsers(arr);
            setReRender(reRender + 1);
        } else {
            toast.error("User with same email already added in list.");
        }
    };
    const deleteSelected = (index) => {
        let arr = [];
        arr = selectedHcp;
        arr?.splice(index, 1);
        setSelectedHcp(arr);
        setReRender(reRender + 1);
    };

    const sendsampeap = (event) => {
        setHcpsSelected(selectedHcp);
        let i = 0;
        const intervals_spend = (25 / 100) * selectedHcp?.length;

        var intervals_increment = 100 / intervals_spend;
        var mails_increment = selectedHcp?.length / intervals_spend;
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
                setMailsIncrement(selectedHcp?.length);
            } else {
                setMailsIncrement(parseInt(incr_msg));
            }
        }, 1000);

        let pdf_id = state_object?.PdfSelected
            ? state_object?.PdfSelected
            : props?.getDraftData?.pdf_id;

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
            let selected_ids = selectedHcp?.map(
                (number) => number["user_id"] || number["profile_user_id"]
            );

            //  loader("show");
            setShowProgressBar(true);
            const body = {
                user_id: localStorageUserId,
                // pdf_id: state_object?.PdfSelected
                //   ? state_object?.PdfSelected
                //   : props?.getDraftData?.pdf_id,
                event_id: eventId,
                subject: emailSubject,
                template_id: templateId,
                user_list: selected_ids,
                smartlist_id: "",
                source_code: template,
            };


            axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

            axios
                .post(`webinar/send_sample_email`, body)
                .then((res) => {
                    loader("hide");
                    if (res?.data?.status_code === 200) {
                        setUploadOrDownloadCount(100);
                        setMailsIncrement(selectedHcp?.length);
                        clearInterval(timer);
                        setTimeout(() => {
                            popup_alert({
                                visible: "show",
                                message: "Email sent successfully",
                                type: "success",
                            });
                            setName("")
                            setEmail("")
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
                            message: res?.data?.message,
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

    const closeClicked = () => {
        setIsOpenAdd(false);
        setIsOpensend(true);
        setHpc([
            {
                firstname: "",
                lastname: "",
                email: "",
                contact_type: "",
                country: "",
                role:
                localStorageUserId ==
                        "56Ek4feL/1A8mZgIKQWEqg=="
                        ? irtRole?.[0]?.value
                        : "",
                optIrt:
                localStorageUserId ==
                        "56Ek4feL/1A8mZgIKQWEqg=="
                        ? "yes"
                        : "",
                institutionType: "",
            },
        ]);
        setActiveManual("active");
        setActiveExcel("");
        setValidationError({})
    }
    const setHpcList = (list) => {
        setHpc(list)
    }

    const saveClicked = async () => {
        if (activeManual == "active") {
            const body_data = hpc?.map((data) => {
                if (localStorageUserId == "56Ek4feL/1A8mZgIKQWEqg==") {
                    return {
                        first_name: data?.firstname,
                        last_name: data?.lastname,
                        email: data?.email,
                        country: data?.country,
                        // contact_type: data?.contact_type,
                        siteNumber: data?.siteNumber ? data?.siteNumber : "",
                        siteName: data?.siteName ? data?.siteName : "",
                        investigator_type: data?.role,
                        siteIrt: data?.optIrt == "yes" ? 1 : 0,
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
                user_id: localStorageUserId,
                smart_list_id: "",
            };

            const status = body?.data?.map((data, index) => {
                if (
                    data?.email == "" ||
                    data?.institution_type == "" ||
                    ((data?.last_name == "" ||
                        data?.first_name == "" ||
                        data?.country == "") &&
                        localStorageUserId == "56Ek4feL/1A8mZgIKQWEqg==")
                ) {
                    if (
                        data?.first_name == "" &&
                        localStorageUserId == "56Ek4feL/1A8mZgIKQWEqg=="
                    ) {
                        setValidationError({
                            newHcpFirstName: "Please enter the first name",
                            index: index,
                        });
                        return;
                    }
                    if (
                        data?.last_name == "" &&
                        localStorageUserId == "56Ek4feL/1A8mZgIKQWEqg=="
                    ) {
                        setValidationError({
                            newHcpLastName: "Please enter the last name",
                            index: index,
                        });
                        return;
                    }
                    if (data?.email == "") {
                        setValidationError({
                            newHcpEmail: "Please enter the email atleast",
                            index: index,
                        });

                        return;
                    }

                    if (data?.institution_type == "") {
                        setValidationError({
                            newHcpInstitution: "Please Select the institution ",
                            index: index,
                        });
                        return;
                    }

                    if (
                        data?.country == "" &&
                        (localStorageUserId == "56Ek4feL/1A8mZgIKQWEqg==")
                    ) {
                        setValidationError({
                            newHcpCountry: "Please select the country",
                            index: index,
                        });
                        return;
                    }

                    if (localStorageUserId == "56Ek4feL/1A8mZgIKQWEqg==") {
                        if (data?.institution_type == "") {
                            setValidationError({
                                newHcpInstitution: "Please enter the institution ",
                                index: index,
                            });
                            return;
                        }
                    }
                } else if (data?.country == "" && localStorageUserId == "m5JI5zEDY3xHFTZBnSGQZg==") {
                    setValidationError({
                        newHcpCountry: "Please select the country",
                        index: index,
                    });
                    return;
                }
                else if (data?.email != "") {
                    let email = data?.email;
                    let useremail = email?.trim();
                    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if (regex.test(String(useremail).toLowerCase())) {
                        let prev_obj = selectedHcp?.find((x) => x?.email?.toLowerCase() === useremail?.toLowerCase());
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
                        if (res?.data?.status_code === 200) {
                            toast.success("User added successfully");

                            res?.data?.response?.data?.map((data) => {
                                setSelectedHcp((oldArray) => [...oldArray, data]);
                            });

                            setIsOpenAdd(false);
                            setIsOpensend(true);
                            setValidationError({})
                        } else {
                            toast.warning(res?.data?.message);
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
                const filteredArray = status?.filter((value) => value !== "true");
                toast.warning(filteredArray?.[0]);
                // toast.warning(status[0]);
            }
        } else {
            let formData = new FormData();
            let user_id = localStorageUserId;
            formData.append("user_id", user_id);
            formData.append("smart_list_id", "");
            formData.append("reader_file", selectedFile);


            if (selectedFile) {
                axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
                loader("show");
                // await axios
                //     .post(`distributes/update_reader_list`, formData)
                //     .then((res) => {
                //         if (res?.data?.status_code === 200) {
                //             toast.success("User added successfully");

                //             res?.data?.response?.data?.map((data) => {
                //                 setSelectedHcp((oldArray) => [...oldArray, data]);
                //             });

                //             loader("hide");
                //             setIsOpenAdd(false);
                //             setActiveManual("active");
                //             setActiveExcel("");
                //             setSelectedFile(null);
                //             setIsOpensend(true);
                //         } else {
                //             toast.warning(res?.data?.message);
                //             loader("hide");
                //         }
                //     })
                //     .catch((err) => {
                //         console.log("something went wrong");
                //     });
                setIsOpenTagModal(false);
            } else {
                toast.error("Please add a excel file");
            }
        }
    };

    const hideTemplatePopup = () => {
        setTemplatePopup(false);
    };
    const saveAsTemplateButtonClicked = async () => {

        let template_id = props?.getWebinarEmailData
            ? templateId
            : props?.getWebinarDraftData.template_id;
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
                user_id: localStorageUserId,
                source_code: source,
                template_id: templateId,
                name: templateName,
                status: 2,
                event_id: eventId
            };

            axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
            loader("show");
            await axios
                .post(`webinar/add_update_template`, body)
                .then(async (res) => {
                    if (res.data.status_code === 200) {
                        await getTemplateListData(1);

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
    const clickNewTemplate = () => {
        setTemplatePopup(false);
        setNewTemplatePopup(true);
    };

    const hideNewTemplatePopup = () => {
        setNewTemplatePopup(false);
    };

    const savenewtemplate = async (e) => {
        e.preventDefault();

        let template_subject = document.getElementById("template_subject").value?.trim();
        let template_description = document.getElementById("template_description").value?.trim();
        let template_id = props?.getWebinarEmailData
            ? templateId
            : props?.getWebinarDraftData?.template_id;
        let source =
            typeof templateSaving != "undefined" && templateSaving != ""
                ? templateSaving
                : template;
        if (
            typeof template_id != "undefined" &&
            template_id != "" &&
            template_id != 0
        ) {
            if (template_description !== "" && template_description?.trim()?.length > 0 && template_subject !== "" && template_subject?.trim()?.length > 0) {
                const body = {
                    user_id: localStorageUserId,
                    source_code: source,
                    template_id: "",
                    name: template_subject,
                    subject: template_subject,
                    description: template_description,
                    status: 1,
                    event_id: eventId
                };

                axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
                loader("show");
                await axios
                    .post(`webinar/add_update_template`, body)
                    .then((res) => {
                        if (res?.data?.status_code === 200) {
                            getTemplateListData(1);
                            setTemplateId(res?.data?.response?.data?.last_id);
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
                let error = {}

                if (template_description == "" && template_description?.trim()?.length <= 0) {
                    toast.warning("Please enter template description.");
                    error.newTemplateDescription = "Please enter template description"


                }
                else {
                    toast.warning("Please enter template subject.");
                    error.newTemplateSubject = "Please enter template subject"


                }
                setValidationError(error)
            }
        } else {
            toast.warning("Template not selected.");
        }
    };
    const closeModal = () => {
        setIsOpenTagModal(false);
    };

    const tagClicked = (dd) => {
        if (!tagClickedFirst?.includes(dd)) {
            setTagClickedFirst((oldArray) => [...oldArray, dd]);
        } else {
            toast.error("Tag already in list.");
        }
    };

    const removeTagFinal = (index) => {
        const tags = finalTags;
        const tagsClickedFirst = tagClickedFirst;
        tags?.splice(index, 1);
        tagsClickedFirst?.splice(index, 1);
        setFinalTags(tags);
        setTagClickedFirst(tagsClickedFirst);
        setTagsReRender(tagsReRender + 1);
    };

    const newTagChanged = (e) => {
        setNewTag(e?.target?.value);
        e.target.value = "";
        const new_atg = document.getElementById("new-tag");
        new_atg.value = "";
        //console.log(new_atg);
    };

    const addTag = async () => {
        if (typeof newTag == "undefined" || newTag?.trim()?.length == 0) {
            toast.error("Please input a tag");
        } else {
            let temp_tags = tagClickedFirst?.map((data) => {
                return data?.toLowerCase();
            });
            let alltemp_tags = [];

            if (typeof allTags != "undefined") {
                Object.entries(allTags)?.map((data) => {
                    return alltemp_tags?.push(...data);
                });
                alltemp_tags = alltemp_tags?.map((data) => {
                    return data.toLowerCase();
                });
                // console.log(alltemp_tags);
            }

            if (
                !temp_tags?.includes(newTag?.toLowerCase()) &&
                !alltemp_tags?.includes(newTag?.toLowerCase())
            ) {
                setTagClickedFirst((oldArray) => [...oldArray, newTag]);

                const body = {
                    user_id: localStorageUserId,
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

    const saveButtonClicked = () => {
        if (typeof finalTags != "undefined" && finalTags?.length > 0) {
            let prev_tags = finalTags;
            let new_tags = prev_tags?.concat(tagClickedFirst);
            const uniqueTags = new_tags?.filter((x, i, a) => a?.indexOf(x) == i);
            setFinalTags(uniqueTags);
        } else {
            setFinalTags(tagClickedFirst);
        }
        closeModal();
    };

    const addClicked = (e) => {
        if (typeof getSmartListId != "undefined" && getSmartListId !== 0) {
            //   loader("show");
            const body = {
                user_id:localStorageUserId,
                list_id: getSmartListId,
                show_specific: 1,
            };
            axios
                .post(`distributes/get_reders_list`, body)
                .then((res) => {
                    if (res.data.status_code == 200) {
                        setReaders(res?.data?.response?.data);

                        res?.data?.response?.data?.map((data) => {
                            let prev_obj = selectedHcp?.find((x) => x?.email?.toLowerCase() === data?.email?.toLowerCase());
                            if (typeof prev_obj === "undefined") {
                                setSelectedHcp((oldArray) => [...oldArray, data]);
                            }
                        });
                        // setSelectedHcp(res.data.response.data);
                        loader("hide");
                    } else {
                        toast.warning(res?.data?.message);
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
        e.preventDefault();
        // setSelectedHcp((oldArray) => [...readers, ...oldArray]);
        setIsOpensend(true);
        setAddListOpen(false);
    };
    const viewSmartListData = async (id) => {
        setAddListOpen(false);
        setSelectedListId(id);
    }

    const closeSmartListPopup = async () => {
        setSelectedListId(0);
        setAddListOpen(true);
    }
    return (
        <>
            <Col className="right-sidebar custom-change">
                <div className="custom-container">
                    <div className="row">
                        {/* <div className="top-header regi-web sticky">
                            <div className="page-title">
                                <h2>Create new email</h2>
                            </div>
                        </div> */}
                        <div className="page-top-nav sticky">
                            <div className="row justify-content-end align-items-center">
                                <div className="col-12 col-md-1">
                                    <div className="header-btn-left">
                                        <button className="btn btn-primary btn-bordered back">
                                            <Link to="/webinar/email">Back</Link>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-12 col-md-9">
                                    <ul className="tabnav-link">
                                        <li className="active active-main">
                                            <a href="javascript:void(0)">Create Your Email</a>
                                        </li>
                                        <li className="">
                                            <a href="javascript:void(0)">
                                                {localStorageUserId == userId
                                                        ? "Select Users"
                                                        : "Select HCPs"}
                                            </a>
                                        </li>
                                        <li className="javascript:void(0)">
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

                                        <button
                                            className="btn btn-primary btn-filled next"
                                            onClick={nextClicked}
                                            disabled={
                                                typeof emailSubject == "undefined" ||
                                                emailSubject?.trim()?.length == 0 ||
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
                                        {templateList?.map((template, index) => {
                                            return (
                                                <>
                                                    <div
                                                        key={index}
                                                        className="item"
                                                        onClick={(e) => templateClicked(template, e)}
                                                    >
                                                        <img
                                                            id={"template_dyn" + index}
                                                            src={template?.template_img}
                                                            // src="https://webinar.informed.pro/template_images/default.png"
                                                            alt=""
                                                            className={
                                                                typeof templateId !== "undefined" &&
                                                                    templateId == template?.id
                                                                    ? "select_mm"
                                                                    : ""
                                                            }
                                                        />

                                                        <p>{template?.subject}</p>
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </AliceCarousel>

                                    <input type="hidden" id="mail_template" value={templateId} />
                                    {validator.message("Templates", templateId, "required")}

                                    <div className="email-form padding-add">
                                        <form>
                                            {localStorageUserId !=
                                                "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                                <>
                                                    <div className="form-inline d-flex justify-content-between align-items-center">
                                                        <div className="form-group col-12 col-md-7 d-flex align-items-center">
                                                            <label htmlFor="exampleInputEmail1">
                                                                Email Description <span>*</span>{" "}
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
                                                            {validator?.message(
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
                                                                onChange={(e) => setEmailCreator(e?.target?.value)}
                                                                type="text"
                                                                className={
                                                                    validator?.message(
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
                                                            {validator?.message(
                                                                "creator",
                                                                emailCreator,
                                                                "required"
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* <div className="form-inline row justify-content-between align-items-center">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">
                                                                Email Campaign <span>*</span>
                                                            </label>

                                                            <input
                                                                type="text"
                                                                className={
                                                                    validator?.message(
                                                                        "emailCampaign",
                                                                        emailCampaign,
                                                                        "required"
                                                                    )
                                                                        ? "form-control error"
                                                                        : "form-control"
                                                                }
                                                                id="email-campaign"
                                                                value={emailCampaign}
                                                                onChange={(e) => setemailCampaign(e?.target?.value)}
                                                            />
                                                            {validator?.message(
                                                                "emailCampaign",
                                                                emailCampaign,
                                                                "required"
                                                            )}
                                                        </div>
                                                    </div> */}
                                                </>
                                            ) : null}
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
                                                        {finalTags?.map((tags, index) => {
                                                            return (
                                                                <>
                                                                    <li className="list1" key={index}>
                                                                        {tags?.innerHTML || tags}{" "}
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

                                            <div className="form-inline d-flex justify-content-end align-items-center">
                                                <div className="form-group col-12 col-md-5 d-flex align-items-center">
                                                    <label htmlFor="exampleInputEmail1">
                                                        Email Subject <span>*</span>
                                                    </label>

                                                    <input
                                                        type="text"
                                                        className={
                                                            validator?.message(
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
                                                    ) : validator?.message(
                                                        "emailSubject",
                                                        emailSubject,
                                                        "required"
                                                    ) ? (
                                                        validator?.message(
                                                            "emailSubject",
                                                            emailSubject,
                                                            "required"
                                                        )
                                                    ) : null}

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

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </Col>
            <div>
                <Modal id="send-sample" show={isOpensend} custom-atr="non-scroll">
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
                                                        onChange={(e) => setName(e?.target?.value)}
                                                        id=""
                                                        value={name}
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
                                                        onChange={(e) => setEmail(e?.target?.value)}
                                                        className={
                                                            validationError?.email
                                                                ? "form-control error"
                                                                : "form-control"
                                                        }
                                                        id=""
                                                        value={email}
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
                                        searchedUsers?.map((data, index) => {
                                            return (
                                                <div className="search-hcp-box" key={index}>
                                                    <p className="send-hcp-box-title">
                                                        Name | <span>{data?.name}</span>
                                                    </p>
                                                    <p className="send-hcp-box-title">
                                                        Email | <span>{data?.email}</span>
                                                    </p>
                                                    <p className="send-hcp-box-title">
                                                        Contact type | <span>{data?.contact_type}</span>
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
                                        Selected contact <span>| {selectedHcp?.length}</span>
                                    </h4>
                                </div>
                                <div className="selected-hcp-list">
                                    {selectedHcp?.length === 0 ? (
                                        <div className="not-found">
                                            <h4>No Contact selected yet!</h4>
                                        </div>
                                    ) : (
                                        <>
                                            {selectedHcp?.map((data, index2) => {
                                                return (
                                                    <>
                                                        <div className="search-hcp-box" key={index2}>
                                                            <p className="send-hcp-box-title">
                                                                Name |{" "}
                                                                <span>{data?.name || data?.first_name}</span>
                                                            </p>
                                                            <p className="send-hcp-box-title">
                                                                Email | <span>{data?.email}</span>
                                                            </p>

                                                            {localStorageUserId ===
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
                                    )}
                                </div>
                            </div>
                        </section>
                    </Modal.Body>
                    <Modal.Footer>
                        {selectedHcp?.length === 0 ? (
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

                <AddNewContactModal
                    show={isOpenAdd}
                    closeClicked={closeClicked}
                    activeManual={activeManual}
                    hpc={hpc}
                    setHpc={setHpcList}
                    totalData={totalData}
                    countryall={countryall}
                    irtCountry={irtCountry}
                    irtRole={irtRole}
                    role={role}
                    institutionType={institutionType}
                    saveClicked={saveClicked}
                    validationError={validationError}
                />

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
                                    <label>Enter template subject<span>*</span> </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="template_subject"
                                    />
                                    {validationError?.newTemplateSubject ? (
                                        <div className="login-validation">
                                            {validationError?.newTemplateSubject}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label>Enter template description<span>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="template_description"
                                    />
                                    {validationError?.newTemplatedescription ? (
                                        <div className="login-validation">
                                            {validationError?.newTemplatedescription}
                                        </div>
                                    ) : null}
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

                <Modal id="tagsModal" show={isOpenTagModal}>
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
                                Selected Tag <span>| {tagClickedFirst?.length}</span>
                            </h6>

                            <div className="total-selected">
                                {tagClickedFirst?.map((data, index) => {
                                    return (
                                        <>
                                            <div className="tag-cross" key={index}>
                                                {data?.innerHTML || data}
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
                                        type="search"
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
                                smartListData?.map((data, index) => {
                                    return (
                                        <>
                                            <div className="smartlist_box_block new-smartlist" key={index}>
                                                <div className="smartlist-view email_box">
                                                    <div className="mail-box-content">
                                                        <div className="mail-box-conten-title">
                                                            <h5>{data.name}</h5>
                                                            <div className="select-mail-option">
                                                                <input
                                                                    type="radio"
                                                                    name="radio"
                                                                    onClick={(e) => handleSelect(data, e)}
                                                                    checked={
                                                                        typeof getSmartListId !== "undefined" &&
                                                                            getSmartListId !== 0 &&
                                                                            getSmartListId == data?.id
                                                                            ? "checked"
                                                                            : ""
                                                                    }
                                                                />
                                                                <span className="checkmark"></span>
                                                            </div>
                                                        </div>
                                                        <SmartListLayout data={data} iseditshow={0} isviewshow={1} deletestatus={0} viewSmartListData={viewSmartListData} webinarFlag={1} />

                                                        {/* <div className="mailbox-table">
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <th>Contact type</th>
                                                                        <td>{data?.contact_type}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Speciality</th>
                                                                        <td>{data?.speciality}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Readers</th>
                                                                        <td>{data?.reader_selection}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>IBU</th>
                                                                        <td>{data?.ibu}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Product</th>
                                                                        <td>{data?.product}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Country</th>
                                                                        <td>{data?.country}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Registered</th>
                                                                        <td>{data?.registered}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Created by</th>
                                                                        <td>
                                                                            <span>{data?.creator}</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                        <div className="mail-time">
                                                            <span>{data?.created_at}</span>
                                                        </div>
                                                        <div className="smart-list-added-user">
                                                            <img
                                                                src={path_image + "smartlist-user.svg"}
                                                                alt="User icon"
                                                            />
                                                            {data?.readers_count}
                                                        </div> */}

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
                                                        {/* <div className="smartlist-buttons">
                                                            <button className="btn btn-primary btn-bordered view">
                                                                <a onClick={() => openSmartListPopup(data?.id)}>
                                                                    View
                                                                </a>
                                                            </button>
                                                        </div> */}
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

                                                {localStorageUserId ==
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
                                                                    {localStorageUserId ==
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
                                                                    {localStorageUserId ==
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
            </div>
            {
                selectedListId ?
                    <SmartListTableLayout id={selectedListId} closeSmartListPopup={closeSmartListPopup} />
                    : null
            }
        </>)
}

const mapStateToProps = (state) => {
    dxr = state.getWebinarEmailData?.eventId;
    state_object = state.getWebinarEmailData;
    return state;
};

export default connect(mapStateToProps, {
    getWebinarEmailData: getWebinarEmailData,
    getWebinarCampaignId: getWebinarCampaignId,

})(WebinarCreateNewEmail);
