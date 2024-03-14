import React, { useState, useRef, useEffect } from "react";
import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
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
import { connect } from "react-redux";
import { getWebinarEmailData, getWebinarCampaignId } from '../../../../../actions'
import { postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
var dxr = 0;
var state_object = {};

const WebinarCreateNewEmail = (props) => {
    let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const navigate = useNavigate();
    const [percent, setPercent] = useState(0);
    const { eventIdContext, handleEventId } = useSidebar()
    const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"))
    const [eventId, setEventId] = useState(
        eventIdContext?.eventId
            ? eventIdContext?.eventId
            : localStorageEvent?.eventId
    );
    const [userId, setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==");
    const campaign_id = props?.getWebinarDraftData ? props?.getWebinarDraftData?.campaign_id : "";
    const [activeIndex, setActiveIndex] = useState(0);
    const syncActiveIndex = ({ item }) => setActiveIndex(item);
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
    const [templateId, setTemplateId] = useState(
        state_object != null &&
            state_object != "undefined" &&
            state_object?.templateId
            ? state_object?.templateId
            : props?.getWebinarDraftData
                ? props?.getWebinarDraftData?.campaign_data.template_id
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
            optIrt:
                localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                    ? "yes"
                    : "",
            institutionType: "",
        },
    ]);
    const [irtRole, setIrtRole] = useState([]);
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
    let tempdata=[
        {
            "id": 674,
            "name": "Test article 22",
            "source_code": "<table style=\"margin: auto; width: 600px;\" role=\"presentation\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"padding: 16px 16px; border-radius: 8px; background-color: #f4f9fc;\" valign=\"top\">\n<table style=\"width: 100%; text-align: center;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"background: #009592  url('https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-header-bg-green.png'); background-size: cover; background-position: center; border-radius: 10px; height: 60px; width: 100%;\" valign=\"middle\" bgcolor=\"#009592\" width=\"568\" height=\"60\"><!-- [if gte mso 9]> <v:rect xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"true\" stroke=\"false\" style=\"width:600px;\"> <v:fill type=\"tile\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-header-bg-green.png\" color=\"#009592\" /> <v:textbox inset=\"0,0,0,0\"> <![endif]-->\n<table style=\"width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"padding: 10px 5px 10px 15px;\" align=\"left\" valign=\"middle\" width=\"60\"><img style=\"width: 56px; height: 44px;\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-logo.png\" alt=\"logo-img\" width=\"56\" height=\"44\"></td>\n<td style=\"font-weight: 500; font-size: 24px; line-height: 28px; color: #ffffff; font-family: 'Helvetica', 'Arial', 'sans-serif'; padding: 10px 25px 10px 0;\" align=\"center\" valign=\"middle\">One Source PURE TEXT</td>\n</tr>\n</tbody>\n</table>\n<!-- [if gte mso 9]> </v:textbox> </v:rect> <![endif]--></td>\n</tr>\n<tr>\n<td style=\"height: 15px;\" valign=\"top\" height=\"15\">&nbsp;</td>\n</tr>\n<tr>\n<td style=\"padding: 0px 0px;\" valign=\"middle\">\n<table style=\"width: 100%; background: rgb(255, 255, 255); border: 0.5px solid rgb(255, 255, 255); border-radius: 8px; padding: 0px 5px; height: 1691.54px; border-collapse: collapse; border-spacing: 0px;\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr style=\"height: 21.3333px;\">\n<td style=\"font-weight: 400; font-size: 15px; line-height: 20px; color: rgb(0, 74, 137); font-family: Roboto, sans-serif; padding: 24px 20px 0px; text-align: left; height: 21.3333px; border: 0;\"><span style=\"font-size: 14pt; font-family: arial, helvetica, sans-serif;\">Dear ###name###,</span></td>\n</tr>\n<tr style=\"height: 21.3333px;\">\n<td style=\"font-weight: 400; border: 0; font-size: 15px; line-height: 20px; color: rgb(0, 74, 137); font-family: Roboto, sans-serif; padding: 42px 20px 0px; text-align: left; height: 21.3333px;\">\n<p class=\"paragraph\" style=\"margin: 0cm; vertical-align: baseline;\"><span lang=\"EN-US\" style=\"font-family: Arial, sans-serif; font-size: 14pt;\">Do not miss the newest publication available in One Source:</span></p>\n</td>\n</tr>\n<tr style=\"height: 219px;\">\n<td style=\"font-weight: 400; border: 0; font-size: 15px; line-height: 20px; color: rgb(0, 74, 137); font-family: Roboto, sans-serif; padding: 4px 20px 0px; text-align: left; height: 219px;\">\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; mso-margin-bottom-alt: auto; mso-outline-level: 1; background: white;\"><span style=\"color: rgb(0, 0, 0);\"><strong><span lang=\"EN-US\" style=\"font-size: 18pt; line-height: 107%; font-family: Arial, sans-serif;\">Clinical efficacy of simoctocog alfa versus extended half-life recombinant FVIII concentrates in hemophilia A patients undergoing personalized prophylaxis using a matching-adjusted indirect comparison method</span></strong></span><span lang=\"EN-US\" style=\"font-size: 8.0pt; line-height: 107%; font-family: 'Arial',sans-serif; color: black; mso-color-alt: windowtext; mso-bidi-font-weight: bold;\"> </span></p>\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; mso-margin-bottom-alt: auto; mso-outline-level: 1; background: white;\"><span style=\"color: rgb(35, 111, 161); font-size: 12pt;\"><strong><span lang=\"EN-US\" style=\"line-height: 107%; font-family: Arial, sans-serif;\"><em><span lang=\"FR-CH\" style=\"font-family: 'Arial',sans-serif; color: black; mso-color-alt: windowtext; mso-ansi-language: FR-CH; mso-bidi-font-weight: bold;\">Craig Kessler et al, Eur J Haematology 2023</span></em></span></strong></span></p>\n</td>\n</tr>\n<tr style=\"height: 50px;\">\n<td style=\"font-weight: 400; border: 0; font-size: 15px; line-height: 20px; color: rgb(0, 74, 137); font-family: Roboto, sans-serif; padding: 4px 20px 20px; text-align: left; height: 50px;\">\n<p class=\"MsoNormal\" style=\"mso-margin-top-alt: auto; mso-margin-bottom-alt: auto; mso-outline-level: 1; background: white;\">&nbsp;<a href=\"https://webinar.docintel.app/flow/webinar/track_multilinks?token=###updateid###&amp;tracking_code=clicked_track_doc_1698836809013&amp;redirect_url=https://docintel.app/Haematology_Octapharma/rHjjUKWB\"><img src=\"https://onesourcedoc.s3.eu-west-1.amazonaws.com/images/rlmm1Nq9IEEsombxWIxK98RSZdkJrqk9YZ1FtmLY.png\" width=\"500\"></a></p>\n</td>\n</tr>\n<tr>\n<td style=\"font-weight: 400; border: 0; font-size: 15px; line-height: 20px; color: rgb(0, 74, 137); font-family: Roboto, sans-serif; padding: 12px 20px 0px; text-align: left;\">\n<p class=\"MsoNormal\"><span class=\"eop\" style=\"font-size: 14pt;\"><span lang=\"EN-US\" style=\"font-family: 'Arial',sans-serif;\">In the absence of head-to-head clinical studies, Craig Kessler and colleagues have used the matched-adjusted indirect comparison (MAIC), a well-established statistical method, to <strong>compare FVIII personalized prophylaxis outcomes across multiple clinical studies.</strong> </span></span></p>\n<p class=\"MsoNormal\">&nbsp;</p>\n<p class=\"MsoNormal\"><span style=\"color: rgb(0, 0, 0);\"><strong><span lang=\"EN-US\" style=\"font-size: 18pt; line-height: 107%; font-family: Arial, sans-serif;\">KEY TAKEAWAYS:</span></strong></span></p>\n<p class=\"MsoNormal\"><span lang=\"EN-US\" style=\"font-family: Arial, sans-serif; font-size: 14pt;\">Higher proportion of patients with ZERO bleeds was achieved with Nuwiq<sup>&reg; </sup><span style=\"mso-spacerun: yes;\">&nbsp;</span>PK-guided prophylaxis compared to Elocta<sup>&reg;</sup>, Jivi<sup>&reg;</sup> and Adynovate<sup>&reg;</sup></span></p>\n<p class=\"MsoNormal\"><span lang=\"EN-US\" style=\"font-family: Arial, sans-serif; font-size: 14pt;\">Significantly lower mean ABR for Nuw<span style=\"color: rgb(0, 74, 137);\">i</span>q<sup>&reg;</sup> was observed in comparison to Jivi<sup>&reg;</sup></span></p>\n</td>\n</tr>\n<tr>\n<td style=\"text-align: center; border: 0; padding-top: 24px; padding-right: 20px; padding-bottom: 24px;\"><img src=\"https://onesourcedoc.s3.eu-west-1.amazonaws.com/images/4RFyEvvZf0d3qVPCEXeQEsbc5XEvWrUxyO1RxbnR.jpg\" width=\"541\" height=\"371\"></td>\n</tr>\n<tr>\n<td style=\"text-align: center; padding: 12px 20px 0px; border: 0;\">\n<p class=\"MsoNormal\" style=\"text-align: left;\"><span style=\"color: rgb(0, 74, 137); font-size: 14pt;\"><span lang=\"EN-GB\" style=\"line-height: 107%; font-family: Arial, sans-serif;\">Additional MAIC analyses are expected comparing the efficacy of Nuwiq</span><sup><span lang=\"EN-US\" style=\"line-height: 107%; font-family: Arial, sans-serif;\">&reg;</span></sup><span lang=\"EN-GB\" style=\"line-height: 107%; font-family: Arial, sans-serif;\"> vs Hemlibra</span><sup><span lang=\"EN-US\" style=\"line-height: 107%; font-family: Arial, sans-serif;\">&reg;</span></sup><span lang=\"EN-GB\" style=\"line-height: 107%; font-family: Arial, sans-serif;\"> and Altuviiio</span><sup><span lang=\"EN-US\" style=\"line-height: 107%; font-family: Arial, sans-serif;\">&reg;</span></sup><span lang=\"EN-US\" style=\"line-height: 107%; font-family: Arial, sans-serif;\"> </span></span></p>\n<p class=\"MsoNormal\" style=\"text-align: left;\"><span style=\"color: rgb(0, 74, 137); font-size: 14pt;\"><strong><span lang=\"EN-US\" style=\"line-height: 107%; font-family: Arial, sans-serif;\">Stay tuned!</span></strong></span></p>\n</td>\n</tr>\n<tr style=\"height: 136.667px;\">\n<td style=\"padding: 28px 20px 10px; border: 0; font-weight: bold; font-size: 15px; font-family: Roboto, sans-serif; line-height: 20px; color: rgb(0, 169, 147); text-align: center; height: 136.667px;\">\n<p class=\"MsoNormal\" style=\"text-align: left;\"><span style=\"color: rgb(0, 74, 137); font-size: 14pt; font-family: arial, helvetica, sans-serif;\"><span lang=\"EN-GB\" style=\"line-height: 107%;\"><strong><span lang=\"EN-US\" style=\"line-height: 107%; color: rgb(0, 74, 137);\">Visit One Source, Octapharma&rsquo;s online haematology platform for healthcare professionals, to keep up to date with the latest news and events, and to hear leading experts share their opinions about treating patients with bleeding disorders.</span></strong></span></span></p>\n</td>\n</tr>\n<tr style=\"height: 54.9167px;\">\n<td style=\"padding: 0px 20px 20px; border: 0; font-weight: 400; font-size: 15px; font-family: Roboto, sans-serif; line-height: 20px; color: rgb(16, 85, 144); text-align: center; height: 54.9167px;\"><a style=\"text-decoration: none;\" href=\"https://webinar.docintel.app/flow/webinar/track_multilinks?token=###updateid###&amp;tracking_code=clicked_track_doc_1698830503183&amp;redirect_url=###url_ssi###\"><img style=\"width: 240px;\" src=\"https://docintel.app/img/octa/e-templates/one-source/btn-img2.png\" alt=\"read-btn\" width=\"240\"></a></td>\n</tr>\n<tr style=\"height: 19.6667px;\">\n<td style=\"font-weight: 600; border: 0; font-size: 13px; line-height: 17px; color: rgb(16, 85, 144); font-family: Roboto, sans-serif; padding: 24px 24px 0px; text-align: left; height: 19.6667px;\"><span style=\"font-size: 14pt;\">Kind Regards,</span></td>\n</tr>\n<tr style=\"height: 19.6667px;\">\n<td style=\"font-weight: 600; border: 0; font-size: 13px; line-height: 17px; color: rgb(16, 85, 144); font-family: Roboto, sans-serif; padding: 0px 24px 16px; text-align: left; height: 19.6667px;\"><span style=\"font-size: 14pt;\">Octapharma Global Haematology Team</span></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n<tr>\n<td style=\"height: 15px;\" valign=\"top\" height=\"15\">&nbsp;</td>\n</tr>\n<tr>\n<td style=\"background: #009592 url('https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-footer-bg-green.png'); background-size: cover; background-position: center; border-radius: 12px; padding: 7px; width: 100%; border: 0;\" valign=\"top\" bgcolor=\"#009592\" width=\"600\"><!-- [if gte mso 9]> <v:rect xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"true\" stroke=\"false\" style=\"width:600px;\"> <v:fill type=\"tile\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-footer-bg-green.png\" color=\"#009592\" /> <v:textbox inset=\"0,0,0,0\"> <![endif]-->\n<table style=\"width: 100%; text-align: center;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"padding: 0 35px 0 25px; border: 0;\" valign=\"middle\"><img style=\"width: 124px;\" src=\"https://docintel.app/img/octa/e-templates/octapharma/new_once_source.png\" alt=\"logo-img\" width=\"124\"></td>\n<td valign=\"top\">\n<table style=\"width: 100%; text-align: center; background-color: #b3d4de; border-radius: 8px;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td><img style=\"width: 129px;\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-mobile-img-green.png\" alt=\"google-btn-img\" width=\"129\"></td>\n<td>\n<table style=\"width: 100%; text-align: center;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"font-weight: 300; font-size: 11px; line-height: 12px; text-align: center; color: #427da8; padding: 8px 16px; font-family: 'Helvetica', 'Arial',                                                'sans-serif';\" colspan=\"2\">Your one source account is hosted in Docintel and can be accessed on any mobile device via browser or free app.</td>\n</tr>\n<tr>\n<td style=\"padding: 4px 0; text-align: right;\" valign=\"middle\"><a style=\"text-decoration: none;\" href=\"https://apps.apple.com/us/app/docintel/id1459624369?ls=1\"><img style=\"width: 80px;\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-app-store-green-btn.png\" alt=\"app-store-btn-img\" width=\"80\"> </a></td>\n<td style=\"padding: 4px 4px 4px 11px; text-align: left;\" valign=\"middle\"><a style=\"text-decoration: none;\" href=\"https://play.google.com/store/apps/details?id=com.docintel\"><img style=\"width: 80px;\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-green-google-btn.png\" alt=\"google-btn-img\" width=\"80\"> </a></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<!-- [if gte mso 9]> </v:textbox> </v:rect> <![endif]--></td>\n</tr>\n<tr>\n<td valign=\"top\">\n<table style=\"width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"font-weight: 400; font-size: 12px; line-height: 14px; padding: 19px 0px 14px; color: #105590; font-family: 'Roboto', sans-serif;\" align=\"left\" valign=\"top\">By registering to One Source you will gain access to the relevant content in accordance with the data privacy policy of <a style=\"color: #105590; font-family: 'Helvetica', 'Arial', 'sans-serif';\" href=\"https://onesource.octapharma.com/octapharma-privacy\"> Octapharma AG </a> and <a style=\"color: #105590; font-family: 'Helvetica', 'Arial', 'sans-serif';\" href=\"https://onesource.octapharma.com/docintel-privacy\">Docintel.app</a> operating this page.</td>\n</tr>\n<tr>\n<td style=\"font-weight: 400; font-size: 12px; line-height: 14px; color: #105590; padding: 0px 0px 14px; font-family: 'Helvetica', 'Arial', 'sans-serif';\" align=\"left\" valign=\"top\"><strong>One source </strong>is a free service from Octapharma for Health Care Professionals only.<br>The information in this asset has been developed for an international audience. Accordingly, it may contain information on products and/or indications that are not approved in your country. Please consult your local prescribing information.</td>\n</tr>\n<tr>\n<td style=\"font-weight: 400; font-size: 12px; line-height: 14px; color: #105590; font-family: 'Helvetica', 'Arial', 'sans-serif'; padding: 0 0px 20px;\" align=\"left\" valign=\"top\">If you no longer wish to receive emails from <strong> One Source </strong> please <a style=\"color: #105590; font-family: 'Helvetica', 'Arial', 'sans-serif';\" href=\"https://docintel.app/Pages/unsubscribe/###encryptedid###\">Unsubscribe</a></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<p><img style=\"display: none;\" src=\"https://webinar.informed.pro/Distributes/updatemailread/###updateid###/pdf_mail\" alt=\"\" width=\"1\" height=\"1\" border=\"0\"></p>",
            "template_img": "https://webinar.informed.pro/template_images/1694584704_748705580.png",
            "content_included": 0
        },
        {
            "id": 673,
            "name": "Testing 23",
            "source_code": "<p>Testing to check plain text to article</p>",
            "template_img": "https://webinar.informed.pro/template_images/default.png",
            "content_included": 0
        },
        {
            "id": 672,
            "name": "New Pure text template 24",
            "source_code": "<p>new</p>",
            "template_img": "https://webinar.informed.pro/template_images/default.png",
            "content_included": 0
        },
        {
            "id": 671,
            "name": "Save as HTML Pure Text Template 25",
            "source_code": "<table style=\"margin: auto; width: 600px;\" role=\"presentation\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"padding: 16px 16px; border-radius: 8px; background-color: #f4f9fc;\" valign=\"top\">\n<table style=\"width: 100%; text-align: center;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"background: #ff933f url('https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-header-bg1.png'); background-size: cover; background-position: center; border-radius: 10px; height: 60px;\" valign=\"middle\" bgcolor=\"#f4f9fc\" height=\"60\"><!-- [if gte mso 9]> <v:rect xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"true\" stroke=\"false\" style=\"width:600px;\"> <v:fill type=\"tile\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-header-bg1.png\" color=\"#ff933f\" /> <v:textbox inset=\"0,0,0,0\"> <![endif]-->\n<table style=\"width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"padding: 10px 5px 10px 15px;\" align=\"left\" valign=\"middle\" width=\"60\"><img style=\"width: 56px; height: 44px;\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-logo.png\" alt=\"logo-img\" width=\"56\" height=\"44\"></td>\n<td style=\"font-weight: bold; font-size: 24px; line-height: 28px; color: #ffffff; font-family: 'Helvetica', 'Arial', 'sans-serif'; padding: 10px 25px 10px 0;\" align=\"center\" valign=\"middle\">New Collection 12</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>",
            "template_img": "https://webinar.informed.pro/template_images/1701158378_1446670293.png",
            "content_included": 0
        },
        {
            "id": 664,
            "name": "Html Article template 26",
            "source_code": "<table style=\"margin: auto; width: 600px;\" role=\"presentation\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"padding: 16px 16px; border-radius: 8px; background-color: #f4f9fc;\" valign=\"top\">\n<table style=\"width: 100%; text-align: center;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"background: #ff933f url('https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-header-bg1.png'); background-size: cover; background-position: center; border-radius: 10px; height: 60px;\" valign=\"middle\" bgcolor=\"#f4f9fc\" height=\"60\"><!-- [if gte mso 9]> <v:rect xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"true\" stroke=\"false\" style=\"width:600px;\"> <v:fill type=\"tile\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-header-bg1.png\" color=\"#ff933f\" /> <v:textbox inset=\"0,0,0,0\"> <![endif]-->\n<table style=\"width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"padding: 10px 5px 10px 15px;\" align=\"left\" valign=\"middle\" width=\"60\"><img style=\"width: 56px; height: 44px;\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-logo.png\" alt=\"logo-img\" width=\"56\" height=\"44\"></td>\n<td style=\"font-weight: bold; font-size: 24px; line-height: 28px; color: #ffffff; font-family: 'Helvetica', 'Arial', 'sans-serif'; padding: 10px 25px 10px 0;\" align=\"center\" valign=\"middle\">New Collection 12</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>",
            "template_img": "https://webinar.informed.pro/template_images/1693890026_960102218.png",
            "content_included": 0
        },
        {
            "id": 663,
            "name": "Pure pay 27",
            "source_code": "<p>gagan test 123</p>",
            "template_img": "https://webinar.informed.pro/template_images/default.png",
            "content_included": 0
        },
        {
            "id": 662,
            "name": "Placeholder Template 28",
            "source_code": "<p>Visual test description</p>",
            "template_img": "https://webinar.informed.pro/template_images/default.png",
            "content_included": 0
        },
        {
            "id": 661,
            "name": "new pure 29",
            "source_code": "<p>Visual test description</p>",
            "template_img": "https://webinar.informed.pro/template_images/default.png",
            "content_included": 0
        },
        {
            "id": 660,
            "name": "new welcome 30",
            "source_code": "<p>gagan test 1</p>",
            "template_img": "https://webinar.informed.pro/template_images/default.png",
            "content_included": 0
        },
        {
            "id": 659,
            "name": "New templates 31",
            "source_code": "<p>Visual test description</p>",
            "template_img": "https://webinar.informed.pro/template_images/default.png",
            "content_included": 0
        },
        {
            "id": 553,
            "name": "new gagan test 22",
            "source_code": "<pre class=\"language-markup\"><code>\n</code></pre>\n<table style=\"margin: auto; width: 600px;\" role=\"presentation\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"padding: 16px 16px; border-radius: 8px; background-color: #f4f9fc;\" valign=\"top\">\n<table style=\"width: 100%; text-align: center;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"background: #01678f                        url('https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-header-bg-green.png'); background-size: cover; background-position: center; border-radius: 10px; height: 60px; width: 100%;\" valign=\"middle\" bgcolor=\"#01678f\" width=\"568\" height=\"60\"><!-- [if gte mso 9]> <v:rect xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"true\" stroke=\"false\" style=\"width:600px;\"> <v:fill type=\"tile\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-header-bg-green.png\" color=\"#01678f\" /> <v:textbox inset=\"0,0,0,0\"> <![endif]-->\n<table style=\"width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"padding: 10px 5px 10px 15px;\" align=\"left\" valign=\"middle\" width=\"60\"><img style=\"width: 56px; height: 44px;\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-logo.png\" alt=\"logo-img\" width=\"56\" height=\"44\"></td>\n<td style=\"font-weight: 500; font-size: 24px; line-height: 28px; color: #ffffff; font-family: 'Helvetica', 'Arial', 'sans-serif'; padding: 10px 25px 10px 0;\" align=\"center\" valign=\"middle\">One Source platform</td>\n</tr>\n</tbody>\n</table>\n<!-- [if gte mso 9]> </v:textbox> </v:rect> <![endif]--></td>\n</tr>\n<tr>\n<td style=\"height: 15px;\" valign=\"top\" height=\"15\">&nbsp;</td>\n</tr>\n<tr>\n<td style=\"padding: 0px 0px;\" valign=\"middle\">\n<table style=\"width: 100%; background: rgb(255, 255, 255); border: 0.5px solid rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 0px 5px; height: 848.636px;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr style=\"height: 20px;\">\n<td style=\"font-weight: 400; font-size: 15px; line-height: 20px; color: rgb(0, 74, 137); font-family: Roboto, sans-serif; padding: 24px 20px 0px; text-align: left; height: 20px;\">Dear ###name###,</td>\n</tr>\n<tr style=\"height: 20px;\">\n<td style=\"font-weight: 400; font-size: 15px; line-height: 20px; color: rgb(0, 74, 137); font-family: Roboto, sans-serif; padding: 42px 20px 0px; text-align: left; height: 20px;\">Is there a rationale for using FVIII and emicizumab in combination in PUPs?</td>\n</tr>\n<tr style=\"height: 40px;\">\n<td style=\"font-weight: 400; font-size: 15px; line-height: 20px; color: rgb(0, 74, 137); font-family: Roboto, sans-serif; padding: 4px 20px 0px; text-align: left; height: 40px;\">Is there a risk of inhibitor development PTPs on emicizumab prophylaxis, when exposed to FVII on-demand?</td>\n</tr>\n<tr style=\"height: 40px;\">\n<td style=\"font-weight: 400; font-size: 15px; line-height: 20px; color: rgb(0, 74, 137); font-family: Roboto, sans-serif; padding: 4px 20px 20px; text-align: left; height: 40px;\">What do current treatment guidelines recommend for the management of bleeding during surgery?</td>\n</tr>\n<tr style=\"height: 60px;\">\n<td style=\"font-weight: 400; font-size: 15px; line-height: 20px; color: rgb(0, 74, 137); font-family: Roboto, sans-serif; padding: 12px 20px 0px; text-align: left; height: 60px;\"><strong>Visit One Source, Octapharma&rsquo;s online haematology platform for healthcare professionals, to hear Guy Young and leading experts share their opinions about treating patients with bleeding disorders:</strong></td>\n</tr>\n<tr style=\"height: 520.028px;\">\n<td style=\"text-align: center; padding: 24px 20px; height: 520.028px;\"><a style=\"text-decoration: none;\" href=\"https://webinar.docintel.app/flow/webinar/track_multilinks?token=###updateid###&amp;tracking_code=clicked_track_doc_1693293518547&amp;redirect_url=https://docintel.app/img/octa/e-templates/one-source/guy-young-teaser_linkedin.mp4\" target=\"_blank\" rel=\"noopener\"><img style=\"width: 516px; display: block; margin: 0 auto;\" src=\"https://docintel.app/img/octa/e-templates/one-source/guy-youn.png\" alt=\"Guy Young video\" width=\"516\"> </a></td>\n</tr>\n<tr style=\"height: 54.6307px;\">\n<td style=\"text-align: center; height: 54.6307px;\"><a style=\"text-decoration: none;\" href=\"https://webinar.docintel.app/flow/webinar/track_multilinks?token=###updateid###&amp;tracking_code=clicked_track_doc_1693293531218&amp;redirect_url=https://onesource.octapharma.com/\"><img style=\"width: 240px;\" src=\"https://docintel.app/img/octa/e-templates/one-source/btn-img2.png\" alt=\"read-btn\" width=\"240\"></a></td>\n</tr>\n<tr style=\"height: 20px;\">\n<td style=\"padding: 28px 20px 10px; font-weight: bold; font-size: 15px; font-family: Roboto, sans-serif; line-height: 20px; color: rgb(0, 169, 147); text-align: center; height: 20px;\">You will be able to login directly using your existing Docintel account</td>\n</tr>\n<tr style=\"height: 40px;\">\n<td style=\"padding: 0px 20px 20px; font-weight: 400; font-size: 15px; font-family: Roboto, sans-serif; line-height: 20px; color: rgb(16, 85, 144); text-align: center; height: 40px;\">If you have forgotten your password<br>please reset it here: <a style=\"text-decoration: none; position: relative; top: 3px;\" href=\"https://webinar.docintel.app/flow/webinar/track_multilinks?token=###updateid###&amp;tracking_code=clicked_track_doc_1693293557103&amp;redirect_url=###url_pass_change###\"> <img style=\"width: 49px;\" src=\"https://docintel.app/img/octa/e-templates/one-source/reset.png\" alt=\"read-btn\" width=\"49\"> </a></td>\n</tr>\n<tr style=\"height: 16.9886px;\">\n<td style=\"font-weight: 600; font-size: 13px; line-height: 17px; color: rgb(16, 85, 144); font-family: Roboto, sans-serif; padding: 24px 24px 0px; text-align: left; height: 16.9886px;\">Kind Regards,</td>\n</tr>\n<tr style=\"height: 16.9886px;\">\n<td style=\"font-weight: 600; font-size: 13px; line-height: 17px; color: rgb(16, 85, 144); font-family: Roboto, sans-serif; padding: 0px 24px 16px; text-align: left; height: 16.9886px;\">Octapharma Global Haematology Team</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n<tr>\n<td style=\"height: 15px;\" valign=\"top\" height=\"15\">&nbsp;</td>\n</tr>\n<tr>\n<td style=\"background: #01678f                        url('https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-footer-bg-green.png'); background-size: cover; background-position: center; border-radius: 12px; padding: 7px; width: 100%;\" valign=\"top\" bgcolor=\"#01678f\" width=\"600\"><!-- [if gte mso 9]> <v:rect xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"true\" stroke=\"false\" style=\"width:600px;\"> <v:fill type=\"tile\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-footer-bg-green.png\" color=\"#01678f\" /> <v:textbox inset=\"0,0,0,0\"> <![endif]-->\n<table style=\"width: 100%; text-align: center;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"padding: 0 35px 0 25px;\" valign=\"middle\"><img style=\"width: 124px;\" src=\"https://docintel.app/img/octa/e-templates/octapharma/new_once_source.png\" alt=\"logo-img\" width=\"124\"></td>\n<td valign=\"top\">\n<table style=\"width: 100%; text-align: center; background-color: #b3d4de; border-radius: 8px;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td><img style=\"width: 129px;\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-mobile-img-green.png\" alt=\"google-btn-img\" width=\"129\"></td>\n<td>\n<table style=\"width: 100%; text-align: center;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"font-weight: 300; font-size: 11px; line-height: 12px; text-align: center; color: #427da8; padding: 8px 16px; font-family: 'Helvetica', 'Arial',                                                'sans-serif';\" colspan=\"2\">Your one source account is hosted in Docintel and can be accessed on any mobile device via browser or free app.</td>\n</tr>\n<tr>\n<td style=\"padding: 4px 0; text-align: right;\" valign=\"middle\"><a style=\"text-decoration: none;\" href=\"https://apps.apple.com/us/app/docintel/id1459624369?ls=1\"><img style=\"width: 80px;\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-app-store-green-btn.png\" alt=\"app-store-btn-img\" width=\"80\"> </a></td>\n<td style=\"padding: 4px 4px 4px 11px; text-align: left;\" valign=\"middle\"><a style=\"text-decoration: none;\" href=\"https://play.google.com/store/apps/details?id=com.docintel\"><img style=\"width: 80px;\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-green-google-btn.png\" alt=\"google-btn-img\" width=\"80\"> </a></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<!-- [if gte mso 9]> </v:textbox> </v:rect> <![endif]--></td>\n</tr>\n<tr>\n<td valign=\"top\">\n<table style=\"width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"font-weight: 400; font-size: 12px; line-height: 14px; padding: 19px 0px 14px; color: #105590; font-family: 'Roboto', sans-serif;\" align=\"left\" valign=\"top\">By registering to One Source you will gain access to the relevant content in accordance with the data privacy policy of <a style=\"color: #105590; font-family: 'Helvetica', 'Arial', 'sans-serif';\" href=\"https://onesource.octapharma.com/octapharma-privacy\"> Octapharma AG </a> and <a style=\"color: #105590; font-family: 'Helvetica', 'Arial', 'sans-serif';\" href=\"https://onesource.octapharma.com/docintel-privacy\">Docintel.app</a> operating this page.</td>\n</tr>\n<tr>\n<td style=\"font-weight: 400; font-size: 12px; line-height: 14px; color: #105590; padding: 0px 0px 14px; font-family: 'Helvetica', 'Arial', 'sans-serif';\" align=\"left\" valign=\"top\"><strong>One source </strong>is a free service from Octapharma for Health Care Professionals only.<br>The information in this asset has been developed for an international audience. Accordingly, it may contain information on products and/or indications that are not approved in your country. Please consult your local prescribing information.</td>\n</tr>\n<tr>\n<td style=\"font-weight: 400; font-size: 12px; line-height: 14px; color: #105590; font-family: 'Helvetica', 'Arial', 'sans-serif'; padding: 0 0px 20px;\" align=\"left\" valign=\"top\">If you no longer wish to receive emails from <strong> One Source </strong> please <a style=\"color: #105590; font-family: 'Helvetica', 'Arial', 'sans-serif';\" href=\"https://docintel.app/Pages/unsubscribe/###encryptedid###\">Unsubscribe</a></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<p><img style=\"display: none;\" src=\"https://webinar.informed.pro/Distributes/updatemailread/###updateid###/pdf_mail\" alt=\"\" width=\"1\" height=\"1\" border=\"0\"></p>",
            "template_img": "https://webinar.informed.pro/template_images/default.png",
            "content_included": 0
        },
        {
            "id": 549,
            "name": "gagan test 21",
            "source_code": "<p>gagan test 1</p>",
            "template_img": "https://webinar.informed.pro/template_images/1686563376_1428270665.png",
            "content_included": 0
        },
        {
            "id": 537,
            "name": "Visual test 20",
            "source_code": "<p>Visual test description</p>",
            "template_img": "https://webinar.informed.pro/template_images/1685343077_50362384.png",
            "content_included": 0
        },
        {
            "id": 536,
            "name": "Visual test 19",
            "source_code": "<p>Visual test description</p>",
            "template_img": "https://webinar.informed.pro/template_images/1686551704_388956162.png",
            "content_included": 0
        },
        {
            "id": 504,
            "name": "Testing 18",
            "source_code": "<p>Test</p>",
            "template_img": "https://webinar.informed.pro/template_images/1685337786_1236881401.png",
            "content_included": 0
        },
        {
            "id": 471,
            "name": "template 11",
            "source_code": "<p>new template 10<img src=\"componentAssets/images/inforMed_Logo_Blue_1.svg\" alt=\"\" width=\"217\" height=\"50\"></p>",
            "template_img": "https://webinar.informed.pro/template_images/1684823374_1237265947.png",
            "content_included": 0
        },
        {
            "id": 470,
            "name": "new template 12",
            "source_code": "<p>new</p>",
            "template_img": "https://webinar.informed.pro/template_images/1685422050_1174184468.png",
            "content_included": 0
        },
        {
            "id": 469,
            "name": "template 13",
            "source_code": "<table style=\"margin: auto; width: 600px;\" role=\"presentation\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"padding: 16px 16px; border-radius: 8px; background-color: #f4f9fc;\" valign=\"top\">\n<table style=\"width: 100%; text-align: center;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"background: #ff933f url('https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-header-bg1.png'); background-size: cover; background-position: center; border-radius: 10px; height: 60px;\" valign=\"middle\" bgcolor=\"#f4f9fc\" height=\"60\"><!-- [if gte mso 9]> <v:rect xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"true\" stroke=\"false\" style=\"width:600px;\"> <v:fill type=\"tile\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-temp-header-bg1.png\" color=\"#ff933f\" /> <v:textbox inset=\"0,0,0,0\"> <![endif]-->\n<table style=\"width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"padding: 10px 5px 10px 15px;\" align=\"left\" valign=\"middle\" width=\"60\"><img style=\"width: 56px; height: 44px;\" src=\"https://docintel.app/img/octa/e-templates/octapharma/octapahrma-wilate-canada-logo.png\" alt=\"logo-img\" width=\"56\" height=\"44\"></td>\n<td style=\"font-weight: bold; font-size: 24px; line-height: 28px; color: #ffffff; font-family: 'Helvetica', 'Arial', 'sans-serif'; padding: 10px 25px 10px 0;\" align=\"center\" valign=\"middle\">New Collection</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>",
            "template_img": "https://webinar.informed.pro/template_images/1693890035_1523605599.png",
            "content_included": 0
        },
        {
            "id": 468,
            "name": "new template 14",
            "source_code": "<p>new template 4</p>",
            "template_img": "https://webinar.informed.pro/template_images/default.png",
            "content_included": 0
        },
        {
            "id": 467,
            "name": "new template 15",
            "source_code": "<p>new template 3</p>",
            "template_img": "https://webinar.informed.pro/template_images/default.png",
            "content_included": 0
        },
        {
            "id": 466,
            "name": "new template 16",
            "source_code": "<p>new template 2</p>",
            "template_img": "https://webinar.informed.pro/template_images/default.png",
            "content_included": 0
        },
        {
            "id": 317,
            "name": "test 17",
            "source_code": "<p>Words only</p>",
            "template_img": "https://webinar.informed.pro/template_images/1693301084_1246012645.png",
            "content_included": 0
        }
    ]

    useEffect(() => {
        loader("show");
        if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
            axiosFun();
        }

        getalCountry();
        getTemplateListData()
        loader("hide");
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
                setFinalTags(props?.getWebinarDraftData?.tags);
                setTagClickedFirst(props?.getWebinarDraftData?.tags);
                setTemplateId(props?.getWebinarDraftData?.campaign_data?.template_id);
                templateIdRef.current = props?.getWebinarDraftData?.campaign_data?.template_id;
                setIsApprovedStatus(props?.getWebinarDraftData?.status);
                setTemplate(props?.getWebinarDraftData?.template);
            }
        }
    }, []);

    useEffect(() => {
        const body = {
          user_id: localStorage.getItem("user_id"),
        };
    
        // axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        // const getAllTags = async () => {
        //   await axios
        //     .post(`emailapi/get_tags`, body)
        //     .then((res) => {
        //       setAllTags(res?.data?.response?.data);
             
        //     })
        //     .catch((err) => {
        //       loader("hide");
        //       console.log(err);
        //     });
        // };
        // getAllTags();
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
          loader("hide")
        } catch (err) {
          loader("hide")
          console.log("--err", err)
        }
      }

    const saveAsDraft = async (event) => {
        let tagss = [];
        finalTags?.map((tags) => {
            tagss?.push(tags?.innerText || tags);
        });

        let campaign = props?.getWebinarEmailData
            ? emailCampaign
            : props?.getWebinarDraftData?.campaign;

        if (typeof campaign !== "undefined" && campaign !== "") {
            console.log(props?.getWebinarDraftData);

            let up_temp = template;
            if (editorRef.current) {
                up_temp = editorRef.current.getContent();
            }

            const body = {
                user_id: localStorage.getItem("user_id"),
                eventId: eventId,
                description: props?.getWebinarEmailData
                    ? emailDescription
                    : props?.getWebinarDraftData?.description,
                creator: props?.getWebinarEmailData ? emailCreator : props.getWebinarDraftData?.creator,
                campaign_name: props?.getWebinarEmailData
                    ? emailCampaign
                    : props?.getWebinarDraftData?.campaign,
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
            };

            axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
            loader("show");
            //   await axios
            //     .post(`emailapi/save_draft`, body)
            //     .then((res) => {
            //       if (res?.data?.status_code === 200) {
            //         setCampaign_id(res?.data?.response?.data?.id);
            //         popup_alert({
            //           visible: "show",
            //           message: "Your changes has been saved <br />successfully !",
            //           type: "success",
            //           redirect: "/EmailList",
            //         });
            //         // toast.success("Draft saved");
            //       } else {
            //         toast.warning(res.data.message);
            //       }
            loader("hide");
            //     })
            //     .catch((err) => {
            //       toast.error("Something went wrong");
            //     });
        } else {
            event.preventDefault();
            toast.error("Plese select Email Campaign first");
        }
    };
    const nextClicked = () => {
        const tags = finalTags?.map((finalTags) => {
            return finalTags?.innerHTML == null ? finalTags : finalTags?.innerHTML;
        });

        // if (validator.allValid()) {
            
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
                eventId: eventId,
                campaign_id: campaign_id_st,
            });

            navigate("/webinar/email/selectHCP");
        // } else {
        //     validator.showMessages();
        //     setRenderAfterValidation(renderAfterValidation + 1);
        // }
    };
    const templateClicked = (template, e) => {
        const div = document.querySelector("img.select_mm");

        if (div) {
            div.classList.remove("select_mm");
        }

        setTemplateId(template?.id);
        templateIdRef.current = template?.id;

        setTemplateName(template?.subject);
        setTemplate(template?.template);
        e.target.classList.toggle("select_mm");
    };
    const tagButtonClicked = () => {
        setIsOpenTagModal(true);
        setModalCounter(modalCounter + 1);
    };

    const removeTag = (index) => {
        const tags = tagClickedFirst;

        tags?.splice(index, 1);
        //console.log(tags);
        setTagClickedFirst(tags);
        setFinalTags(tags);
        setTagsReRender(tagsReRender + 1);

        // tagClickedFirst.splice(index, 1);
    };
    const emailSubjectChanged = (e) => {
        if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
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
                toast.success("Template update successfuly");
            }
        } else {
            toast.warning("Template not selected.");
        }
    };

    const approvedClicked = async (e) => {
        e.preventDefault();
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

        let tagss = [];
        finalTags?.map((tags) => {
            tagss?.push(tags?.innerText || tags);
        });

        const body = {
            user_id: localStorage.getItem("user_id"),
            eventId: eventId,
            description: props?.getWebinarEmailData
                ? emailDescription
                : props?.getWebinarDraftData?.description,
            creator: props?.getWebinarEmailData ? emailCreator : props?.getWebinarDraftData?.creator,
            campaign_name: props?.getWebinarEmailData
                ? emailCampaign
                : props?.getWebinarDraftData?.campaign,
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
        };

        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        console.log("in aproved clicked")
        // await axios
        //   .post(`emailapi/save_draft`, body)
        //   .then((res) => {
        //     loader("hide");

        //     setCampaign_id(res?.data?.response?.data?.id);
        //     if (res?.data?.status_code === 200) {
        //       if (ab === 3) {
        //         toast.success("Approved Draft saved");
        //       } else {
        //         toast.success("Draft saved");
        //       }
        //     } else {
        //       toast.warning(res.data.message);
        //     }
        //   })
        //   .catch((err) => {
        //     toast.error("Somwthing went wrong");
        //   });
    };

    const sendSample = (event) => {
        console.log("in send a sample", selectedHcp);

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

                            //   axios
                            //     .post(link, payload)
                            //     .then((res) => {
                            //       console.log("done");
                            //     })
                            //     .catch((err) => {
                            //       loader("hide");
                            //       console.log(err);
                            //     });
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
                user_id: localStorage.getItem("user_id"),
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
                    localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                        ? irtRole?.[0]?.value
                        : "",
                optIrt:
                    localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
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
        console.log("in send sample")
    }

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
                    localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg=="
                        ? irtRole?.[0]?.value
                        : "",
                optIrt:
                    localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg=="
                        ? "yes"
                        : "",
                institutionType: "",
            },
        ]);
        setActiveManual("active");
        setActiveExcel("");
    }
    const setHpcList = (list) => {
        setHpc(list)
    }

    const saveClicked = async () => {
        if (activeManual == "active") {
            const body_data = hpc?.map((data) => {
                if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
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
                user_id: localStorage.getItem("user_id"),
                smart_list_id: "",
            };

            const status = body?.data?.map((data, index) => {
                console.log(data);
                if (
                    data?.email == "" ||
                    data?.institution_type == "" ||
                    ((data?.last_name == "" ||
                        data?.first_name == "" ||
                        data?.country == "") &&
                        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==")
                ) {
                    if (
                        data?.first_name == "" &&
                        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                    ) {
                        setValidationError({
                            newHcpFirstName: "Please enter the first name",
                            index: index,
                        });
                        return;
                    }
                    if (
                        data?.last_name == "" &&
                        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
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
                        (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==")
                    ) {
                        setValidationError({
                            newHcpCountry: "Please select the country",
                            index: index,
                        });
                        return;
                    }

                    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
                        if (data?.institution_type == "") {
                            setValidationError({
                                newHcpInstitution: "Please enter the institution ",
                                index: index,
                            });
                            return;
                        }
                    }
                } else if (data?.country == "" && localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
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
                            toast.success("User added successfuly");

                            res?.data?.response?.data?.map((data) => {
                                setSelectedHcp((oldArray) => [...oldArray, data]);
                            });
                            setIsOpenAdd(false);
                            setIsOpensend(true);
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
                        if (res?.data?.status_code === 200) {
                            toast.success("User added successfuly");

                            res?.data?.response?.data?.map((data) => {
                                setSelectedHcp((oldArray) => [...oldArray, data]);
                            });

                            loader("hide");
                            setIsOpenAdd(false);
                            setActiveManual("active");
                            setActiveExcel("");
                            setSelectedFile(null);
                            setIsOpensend(true);
                        } else {
                            toast.warning(res?.data?.message);
                            loader("hide");
                        }
                    })
                    .catch((err) => {
                        console.log("something went wrong");
                    });
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
        console.log("in save as template buton clicked")
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
                user_id: localStorage.getItem("user_id"),
                source_code: source,
                template_id: templateId,
                name: templateName,
                status: 2,
                language: 2,
            };

            axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
            loader("show");
            //   await axios
            //     .post(`emailapi/add_update_template`, body)
            //     .then((res) => {
            //       if (res.data.status_code === 200) {
            //         loader("hide");
            //         toast.success("Template saved successfully");
            //       } else {
            //         loader("hide");
            //         toast.warning("Template not selected.");
            //       }
            //     })
            //     .catch((err) => {
            //       loader("hide");
            //       toast.error("Something went wrong");
            //     });
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
        let template_name = document.getElementById("template_name").value;
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
            if (template_name !== "" && template_name?.trim()?.length > 0) {
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
                // await axios
                //   .post(`emailapi/add_update_template`, body)
                //   .then((res) => {
                //     if (res.data.status_code === 200) {
                //       getTemplateListData(1);
                //       setTemplateId(res.data.response.data.last_id);
                //       templateIdRef.current = res.data.response.data.last_id;
                //     } else {
                //       loader("hide");
                //       toast.warning("Template not selected.");
                //     }
                //   })
                //   .catch((err) => {
                //     loader("hide");
                //     toast.error("Something went wrong");
                //   });
                setNewTemplatePopup(false);
                setTemplatePopup(false);
            } else {
                toast.warning("Please enter template name.");
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
                    user_id: localStorage.getItem("user_id"),
                    tags: newTag,
                };

                //console.log(body);
                axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
                // loader("show");
                // await axios
                //   .post(`emailapi/save_tags`, body)
                //   .then((res) => {
                //     loader("hide");
                //   })
                //   .catch((err) => {
                //     loader("hide");
                //     console.log(err);
                //   });

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
                                                {localStorage.getItem("user_id") == userId
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
                                            // disabled={
                                            //     typeof emailSubject == "undefined" ||
                                            //     emailSubject?.trim()?.length == 0 ||
                                            //     typeof templateId == "undefined" ||
                                            //     templateId == ""
                                            // }
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
                                                            // src={template?.template_img}
                                                            src="https://webinar.informed.pro/template_images/default.png"
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
                                                                onChange={(e) => setEmailDescription(e?.target?.value)}
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
                                                        <div className="form-group right-side col-12 col-md-5">
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

                                            <div className="form-inline row justify-content-end align-items-center">
                                                <div className="form-group col-12 col-md-5">
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
            </div>
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
