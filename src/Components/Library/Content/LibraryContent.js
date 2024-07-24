import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { popup_alert } from "../../../popup_alert";
import {
  deleteData,
  postData,
  updateConsent,
  resetStats,
  updateTags,
} from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import Select from "react-select";
import { Spinner } from "react-activity";
import CommonModel from "../../../Model/CommonModel";
import CommonConfirmModel from "../../../Model/CommonConfirmModel";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {
  Accordion,
  Col,
  Row,
  Modal,
  Tab,
  Tabs,
  ProgressBar,
  Button,
} from "react-bootstrap";

import "react-toastify/dist/ReactToastify.css";
import "react-activity/dist/library.css";

import { loader } from "../../../loader";
import { toast } from "react-toastify";
import moment from "moment";
import QRCode from "qrcode.react";
import { connect } from "react-redux";
import {
  getEmailData,
  getDraftData,
  getSelectedSmartListData,
} from "../../../actions";

const LibraryContent = (props) => {
  //-----All States-----//

  const [flag, setFlag] = useState(0);
  const [types, setTypes] = useState([
    { value: "Online Offer", label: "Online Offer" },
  ]);
  const statusOptions=[
    { label: "Sold", value: "sold" },
    { label: "Unsold", value: "unsold" }
  ]
  const [filterApplyflag, setFilterApplyflag] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [update, setUpdate] = useState(0);
  const location = useLocation();
  const [pageAll, setPageAll] = useState(false);
  const [search, setSearch] = useState("");
  const [apiCallStatus, setApiCallStatus] = useState(false);
  const [opening_details, setOpeningDetails] = useState([]);
  const [tagClickedFirst, setTagClickedFirst] = useState([]);
  const [finalTags, setFinalTags] = useState([]);
  const [tagsReRender, setTagsReRender] = useState(0);
  const [tagsCounter, setTagsCounter] = useState(0);
  const [pdftagsid, setpdftagsid] = useState();
  const [appliedFilter, setAppliedFilter] = useState({});
  const [otherFilter, setOtherFilter] = useState({});
  const [filterObject, setFilterObject] = useState({});
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [show, setShow] = useState(false);
  const irtData = 
    ["All",
    "Site User-Blinded",
    "Investigator-Blinded",
    "Site unblinded pharmacist",
  ]
  const roleData=[
    "All",
    "Principal Investigator",
    "Sub-Investigator",
    "Study Coordinator",
    "Study Nurse",
    "Other",
  ];

  const [filterdata, setFilterData] = useState({
    language: ["English", "Russian"],
  });
  const [originalFilterData, setOriginalFilterData] = useState({
    Role: "",
  });
  const [deletestatus, setDeleteStatus] = useState(false);
  const [page, setPage] = useState(1);
  const type="";
  const [showfilter, setShowFilter] = useState(false);
  const [qrValue, setQrValue] = useState("QR-code");
  const [newTag, setNewTag] = useState("");
  const [libraryData, setLibraryData] = useState([]);
  const [changeConsent, setchangeConsent] = useState([]);
  const [changeStatus, setChangeStatus] = useState([])
  const [updateflag, setupdateFlag] = useState(0);
  const [qrState, setQr] = useState({
    value: "",
  });
  const [heading, setHeading] = useState("");
  const [footerButton, setFooterButton] = useState("");
  const [modelData, setModelData] = useState();
  const [articleLanguage, setArticleLanguage] = useState();
  const [qrSize, setQrSize] = useState(290);
  const [isOpen, setIsOpen] = useState(false);
  const [modalCounter, setModalCounter] = useState(0);
  const [allTags, setAllTags] = useState({});
  const [resetDataId, setResetDataId] = useState("");
  const [forceRender, setForceRender] = useState(false);
  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
  });
  const [commonConfirmModelFun, setCommonConfirmModelFun] = useState(() => { });
  const [totalLibraryRecord, setTotalLibraryRecord] = useState([]);
  const [loadData, setLoadData] = useState({ limit: 24, nextLimit: 0 });
  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  const navigate = useNavigate();
  const BrokenImage =
    "https://docintel.s3-eu-west-1.amazonaws.com/cover/default/default.png";

  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  let obj = {};
  const limit = 24;

  const downloadQRData = [
    {
      label: "Select Size",
      type: "dropdown",
      dropdown: [
        {
          key: "Tiny",
          value: "M",
        },
        {
          key: "Article",
          value: "H",
        },
        {
          key: "Large Print",
          value: "L",
        },
      ],
    },
  ];
  const articleLanguages = [
    {
      label: "Select Language",
      type: "dropdown",
      dropdown: [
        {
          key: "English",
          value: "0",
        },
        {
          key: "Russian",
          value: "4",
        },
        {
          key: "Spanish",
          value: "3",
        },
      ],
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("user_id") != "56Ek4feL/1A8mZgIKQWEqg==") {
      let linktype = types;
      linktype.push(
        { value: "Offline Offer", label: "Offline Offer" },
        { value: "Sunshine", label: "Sunshine" }
      );
      setTypes(linktype);
    }
    applyFilters();
    props.getDraftData(null);
    props.getSelectedSmartListData(null);
    props.getEmailData(null);

    if (localStorage.getItem("user_id") == "b3APser7L8OELDIG8ee2HQ==") {
      const newObj = { value: "Sunshine USA", label: "Sunshine USA" };
      const updatedArray = [...types, newObj];
      setTypes(updatedArray);
    }

    function handleOutsideClick(event) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setShowFilter(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleSpcFun = (data) => {
    let newWindow = "";
    newWindow = window.open("/article_preview");
    newWindow.data = data;
  };

  const applyFilters = async () => {
    try {
      loader("show");
      const res = await postData(ENDPOINT.FILTERS, {
        user_id: localStorage.getItem("user_id"),
      });

      if (res?.data?.data) {
        setFilterData(res?.data?.data);
        setOriginalFilterData({
          ...originalFilterData,
          Role: res?.data?.data?.Role,
        });

        let tagData = res?.data?.data?.tags?.length
          ? res?.data?.data?.tags
          : res?.data?.data?.topic?.length
            ? res?.data?.data?.topic
            : [];
        if (tagData?.length) {
          let indexNo = tagData.indexOf("All");
          if (!indexNo > -1) {
            tagData.splice(indexNo, 1);
          }
          setAllTags(tagData);
        }

        getLibraryData(page, obj, search);
      }
    } catch (err) {
      loader("hide");
      console.log("err");
    }
  };

  // const loadMoreClicked = async() => {
  //   let sp = page + 1;
  //    let data=await getLibraryData(sp, filterObject, "");
  //    console.log(data);

  //   let totalRecord = loadData.limit * sp;
  //   let newData = [];

  //   if (data?.length >= totalRecord) {
  //     newData = data.slice(loadData.nextLimit, totalRecord);
  //     setLoadData({ ...loadData, nextLimit: totalRecord });
  //   } else {
  //     newData = data.slice(loadData.nextLimit);
  //     setIsLoaded(false);
  //   }

  //   setLibraryData((oldArray) => [...oldArray, ...newData]);
  //   setPage(sp);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    setLibraryData([]);
    setPage(1);
    getLibraryData(1, filterObject, search);
    return false;
  };

  const handleOnFilterChange = (e, item, index, key, data = []) => {
    let newObj = JSON.parse(JSON.stringify(appliedFilter));
    let otherObj = JSON.parse(JSON.stringify(otherFilter));

    if (!newObj[key]) {
      newObj[key] = [];
    }
    if (!otherObj[key]) {
      otherObj[key] = [];
    }

    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
      if (key == "IRT mandatory training") {
        if (newObj["Role"]) {
          delete newObj["Role"];
          delete otherObj["Role"];
        }
        if (item == "Yes") {
          setFilterData({ ...filterdata, Role: irtData });
        } else {
          setFilterData({ ...filterdata, Role: roleData });
        }
      }
    }

    if (e?.target?.checked == true) {
      if (
        key == "draft" ||
        key == "ibu" ||
        key == "Selected By Articles" ||
        key == "SPC Included" ||
        key == "Blinded" ||
        key == "Mandatory" ||
        key == "List" ||
        key == "Content Owners" ||
        key == "IRT mandatory training" ||
        key == "language" ||
        key == "Business Unit" ||
        key == "Platform"
      ) {
        newObj[key] = [];
        newObj[key]?.push(item);
        otherObj[key] = [];
        otherObj[key]?.push(item);
      } else {
        if (item == "All") {
          newObj[key] = ["All"];
          otherObj[key] = data;
        } else {
          newObj[key]?.push(item);
          otherObj[key]?.push(item);

          if (data?.length - 1 == newObj[key]?.length) {
            newObj[key]?.push("All");
            otherObj[key]?.push(item);
          }
        }
      }
    } else {
      if (item == "All") {
        newObj[key] = [];
        otherObj[key] = [];
      } else {
        if (newObj[key].includes("All")) {
          newObj[key] = newObj[key].filter((item) => item != "All");
          otherObj[key] = otherObj[key].filter((item) => item != "All");
        }
        const index = newObj[key]?.indexOf(item);
        if (index > -1) {
          newObj[key]?.splice(index, 1);
          if (newObj[key]?.length == 0) {
            delete otherObj[key];
            delete newObj[key];
          }
        }
      }

      const otherIndex = otherObj[key]?.indexOf(item);
      if (otherIndex > -1) {
        otherObj[key]?.splice(otherIndex, 1);
        if (otherObj[key]?.length == 0) {
          delete otherObj[key];
        }
        newObj[key] = otherObj[key];
      }
    }

    setOtherFilter(otherObj);
    setAppliedFilter(newObj);
    setForceRender(!forceRender);
  };

  const tabClicked = async (event, id) => {
    setFlag(0);

    if (event == "data-tab") {
      let index = opening_details.findIndex((el) => el.pdfId == id);
      if (index === -1) {
        let normal_data = opening_details;
        try {
          let body = {
            pdfId: [id],
          };
          const res = await postData(ENDPOINT.LIBRARYSTATS, body);
          if (res?.data?.data?.[0]) {
            let new_data = res?.data?.data?.[0];
            normal_data.push(new_data);
            setOpeningDetails(normal_data);
            setFlag(flag + 1);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };

  const clearFilter = () => {
    document.querySelectorAll("input")?.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setOtherFilter({});
    setAppliedFilter({});

    obj = {};
    if (Object.keys(filterObject)?.length) {
      setFilterObject({});
      setLibraryData([]);
      getLibraryData(1, {}, search);
      setPage(1);
      setSearch("");
    }
    if (originalFilterData?.Role?.length) {
      setFilterData({ ...filterdata, Role: originalFilterData.Role });
    }

    setShowFilter(false);
    setForceRender(!forceRender);
  };

  const applyFilter = (e) => {
    e.preventDefault();
    setFilterApplyflag(1);
    setLibraryData([]);
    setFilterObject(appliedFilter);
    setPage(1);
    getLibraryData(1, otherFilter, search);
    setShowFilter(false);
  };
  const handleQR = (e) => {
    if (e == "H") {
      setQrSize(390);
    }
    if (e == "L") {
      setQrSize(490);
    }
    setQr({ ...qrState, level: e });
  };
  const handleLanguage = (e) => {
    setArticleLanguage(e);
  };

  const saveArticle = async () => {
    try {
      loader("show");
      let body = {
        id: resetDataId,
        language: articleLanguage,
      };
      const res = await postData(ENDPOINT.LIBRARY_CLONE_ARTICLE, body);
      loader("hide");
    } catch (err) {
      loader("hide");
    }
    setShow(false);
  };

  const showDeleteButtons = () => {
    if (deletestatus) {
      setDeleteStatus(false);
    } else {
      setDeleteStatus(true);
    }
  };

  const getLibraryData = async (page, obj, search, load = 0) => {
    try {
      loader("show");
      setIsLoaded(false);
      if (load) {
        setPageAll(true);
      }
      setApiCallStatus(false);
      let data = {
        user_id: localStorage.getItem("user_id"),
        page: page,
        license: 0,
        search: search,
        type: type,
        limit: limit,
      };
      let body = { ...data, filter: obj };
      const res = await postData(ENDPOINT.LIBRARY_CONTENT, body);
      let allData = [...totalLibraryRecord, ...res?.data?.data?.library]
      setTotalLibraryRecord(allData);
      if (res?.data?.data?.library?.length) {
        if (res?.data?.data?.library?.length > 24) {
          setLoadData({ ...loadData, nextLimit: 24 });
          setIsLoaded(true);
        }
      }
      setLibraryData(allData);

      setPageAll(false);
      setApiCallStatus(true);
      setPage(page);

      loader("hide");
      return [...totalLibraryRecord, ...res?.data?.data?.library]
    } catch (err) {
      console.log("err");
      loader("hide");
    }
  };

  const searchChange = (e) => {
    setIsLoaded(false);
    setSearch(e?.target?.value);
    if (e?.target?.value === "") {
      setLibraryData([]);
      getLibraryData(page, filterObject, "");
    }
  };

  const showConfirmationPopup = (stateMsg, e, id) => {
    if (stateMsg == "delete") {
      setResetDataId(id);
      setCommonConfirmModelFun(() => deleteUser);
      setPopupMessage({
        message1:
          "You are about to remove this content from any reader and every device forever.",
        message2: "Are you sure you want to do this?",
        footerButton: "Yes please!",
      });
      if (confirmationpopup) {
        setConfirmationPopup(false);
      } else {
        setConfirmationPopup(true);
      }
    } else if (stateMsg == "reset") {
      setResetDataId(id);
      setCommonConfirmModelFun(() => resetCollection);
      setPopupMessage({
        message1: " You are about to reset the collected data.",
        message2: "Are you sure you want to do this?",
        footerButton: "Delete all data",
      });
      if (confirmationpopup) {
        setConfirmationPopup(false);
      } else {
        setConfirmationPopup(true);
      }
    }
  };

  const deleteUser = async (id) => {
    loader("show");
    try {
      const res = await deleteData(ENDPOINT.DELETE, id);
      if (res?.data?.message == "Library deleted successfully") {
        loader("hide");
        popup_alert({
          visible: "show",
          message: "Your content has been deleted <br />successfully !",
          type: "success",
          redirect: "",
        });
        const updatedRes = libraryData.filter((item) => item.id !== id);
        setLibraryData(updatedRes);
      }

      loader("hide");
    } catch (err) {
      loader("hide");
    }
    hideConfirmationModal();
  };

  const commonModelFun = (e, id, stateMsg) => {
    if (stateMsg == "downloadQR") {
      setHeading("Download QR");
      setFooterButton("Download");
      setModelData(downloadQRData);
      setResetDataId("");
    } else if (stateMsg == "clone") {
      setResetDataId(id);
      setHeading("Clone Article");
      setFooterButton("Save");
      setModelData(articleLanguages);
    }
    setShow(true);
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

  const removeindividualfilter = (key, item) => {
    let old_object = filterObject;
    let otherFilterObj = otherFilter;
    const index = old_object[key]?.indexOf(item);
    if (index > -1) {
      if (old_object[key].includes("All")) {
        const allIndex = old_object[key]?.indexOf("All");
        old_object[key]?.splice(allIndex, 1);
        delete otherFilterObj[key];
      }
      old_object[key]?.splice(index, 1);
      otherFilterObj[key]?.splice(index, 1);

      if (old_object[key]?.length == 0) {
        delete old_object[key];
      }
    }
    setAppliedFilter(old_object);
    setOtherFilter(otherFilterObj);
    setFilterObject(old_object);
    setLibraryData([]);
    getLibraryData(page, old_object, search);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrValue}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setShow(false);
  };

  const onConsentChange = (e, i) => {
    let consetValue = e.value;
    let consent = {
      index: i,
      value: consetValue,
    };

    const found = changeConsent.some((el) => el.index === i);
    if (!found) {
      setchangeConsent((oldarray) => [...oldarray, consent]);
    } else {
      const index = changeConsent.findIndex((el) => el.index === i);
      changeConsent[index].value = consetValue;
    }
  };

  const onStatusChange = (e, i) => {
    let statusValue = e?.value;
    let status = {
      index: i,
      value: statusValue
    }
    const found = changeStatus.some((el) => el?.index === i);
    if (!found) {
      setChangeStatus((oldArray) => [...oldArray, status])
    } else {
      const index = changeStatus.findIndex((el) => el?.index === i);
      changeStatus[index].value = statusValue;
    }
  }

  const updateChanges = async (pdf_id, index) => {
    loader("show");
    try {
      let body = {}
      let consent_value = "";
      let status_value = "";
      const consentIndex = changeConsent.findIndex((el) => el.index === pdf_id);
      if (consentIndex != -1) {
        consent_value = changeConsent[consentIndex]?.value;
      } else {
        const consentIndex = libraryData.findIndex((el) => el?.id === pdf_id)
        consent_value = libraryData[consentIndex]?.linkType;
      }

      if (localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
        const statusIndex = changeStatus?.findIndex((el) => el?.index === pdf_id);
        if (statusIndex != -1) {
          status_value = changeStatus[statusIndex]?.value;
        } else {
          const statusIndex = libraryData?.findIndex((el) => el?.id === pdf_id)
          status_value = libraryData[statusIndex]?.sold_unsold;
        }
        body = {
          pdfId: pdf_id,
          consentType: consent_value,
          sold_unsold: status_value
        };
      } else {
        body = {
          pdfId: pdf_id,
          consentType: consent_value,
        };
      }
      const res = await updateConsent(ENDPOINT.LIBRARYCHANGECONSENT, body);
      const lib_data_index = libraryData.findIndex((el) => el.id === pdf_id);
      libraryData[lib_data_index].linkType = consent_value;
      if (localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
        libraryData[lib_data_index].sold_unsold = status_value;
      }

      const new_data = libraryData;
      setLibraryData(new_data);
      setupdateFlag(updateflag + 1);
      loader("hide");
      popup_alert({
        visible: "show",
        message: "Your content has been update <br />successfully !",
        type: "success",
        redirect: "",
      });
    } catch (err) {
      console.log("err", err);
      loader("hide");
    }
  };


  const resetCollection = async (pdf_id) => {
    try {
      loader("show");

      await resetStats(ENDPOINT.LIBRARYRESETSTATS, {
        user_id: localStorage.getItem("user_id"),
        pdfId: pdf_id,
      });
      let normal_data = opening_details;
      const lib_data_index = normal_data.findIndex((el) => el.pdfId === pdf_id);
      if (lib_data_index != -1) {
        normal_data[lib_data_index].unique = 0;
        normal_data[lib_data_index].opening = 0;
        normal_data[lib_data_index].reader = 0;
        normal_data[lib_data_index].download = 0;
        normal_data[lib_data_index].print = 0;
        normal_data[lib_data_index].subLink = 0;

        setOpeningDetails(normal_data);
        setFlag(1);
        setUpdate(update + 1);
        loader("hide");
        popup_alert({
          visible: "show",
          message: "Your stats has been reset <br />successfully !",
          type: "success",
          redirect: "",
        });
      } else {
        loader("hide");
        popup_alert({
          visible: "show",
          message: "Something went wrong, Please try again.",
          type: "error",
          redirect: "",
        });
      }
    } catch (err) {
      console.log("err", err);
      loader("hide");
    }
    hideConfirmationModal();
  };

  const tagButtonClicked = (pdf_id) => {
    const lib_data_index = libraryData.findIndex((el) => el.id === pdf_id);
    let get_tags = libraryData[lib_data_index]?.tags;
    if (get_tags != "") {
      let parsed_tag = JSON.parse(get_tags);
      setTagClickedFirst(parsed_tag);
    } else {
      setTagClickedFirst([]);
    }
    setFinalTags([]);
    setpdftagsid(pdf_id);
    setIsOpen(true);
    setModalCounter(modalCounter + 1);
  };

  const closeModal = () => {
    setNewTag("");
    setIsOpen(false);
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

  const addTag = async () => {
    try {
      if (typeof newTag == "undefined" || newTag.trim().length == 0) {
        toast.error("Please input a tag");
      } else {
        loader("show");
        const hadData = await postData(ENDPOINT.ADD_TAGS, {
          product: newTag,
          type: 2,
        });
        loader("hide");
        let temp_tags = tagClickedFirst.map((data) => {
          return data.toLowerCase();
        });
        let alltemp_tags = [];
        Object.entries(allTags).map((data) => {
          return alltemp_tags.push(...data);
        });
        alltemp_tags = alltemp_tags.map((data) => {
          return data.toLowerCase();
        });

        let prevtag = allTags;
        prevtag.push(newTag);
        setAllTags(prevtag);

        if (
          !temp_tags.includes(newTag.toLowerCase()) &&
          !alltemp_tags.includes(newTag.toLowerCase())
        ) {
          setTagClickedFirst((oldArray) => [...oldArray, newTag]);

          const body = {
            user_id: localStorage.getItem("user_id"),
            tags: newTag,
          };
        } else {
          toast.error("Tag already in list.");
        }
        setNewTag("");
        setTagsCounter(tagsCounter + 1);
      }
    } catch (err) {
      loader("hide");
      console.log(err);
    }
  };

  const imageOnError = (event) => {
    event.currentTarget.src = BrokenImage;
    event.currentTarget.className = "error";
  };

  const saveButtonClicked = async () => {
    loader("show");
    let payload = {
      pdfId: pdftagsid,
    };
    if (typeof finalTags != "undefined" && finalTags.length > 0) {
      let prev_tags = finalTags;
      let new_tags = prev_tags.concat(tagClickedFirst);
      const uniqueTags = new_tags.filter((x, i, a) => a.indexOf(x) == i);
      setFinalTags(uniqueTags);
      payload.tags = JSON.stringify(uniqueTags);
      if (pdftagsid != "") {
        const lib_data_index = libraryData.findIndex(
          (el) => el.id === pdftagsid
        );
        libraryData[lib_data_index].tags = JSON.stringify(uniqueTags);
      }
    } else {
      setFinalTags(tagClickedFirst);
      payload.tags = JSON.stringify(tagClickedFirst);
      if (pdftagsid != "") {
        const lib_data_index = libraryData.findIndex(
          (el) => el.id === pdftagsid
        );
        libraryData[lib_data_index].tags = JSON.stringify(tagClickedFirst);
      }
    }
    try {
      const res = await updateTags(ENDPOINT.LIBRARYREUPDATETAGS, payload);
    } catch (err) {
      loader("hide");
    }

    setLibraryData(libraryData);
    setupdateFlag(updateflag + 1);
    closeModal();
    loader("hide");
  };

  const copyToClipboard = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      toast.success("content copied to the clipboard!");
    } else {
      unsecuredCopyToClipboard(content);
    }
  };

  const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      toast.success("content copied to the clipboard!");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  };

  const changeFormatForPrint = (value) => {
    let data = "";
    if (value?.allow_print) {
      data += "Print | ";
    }
    if (value?.allow_download) {
      data += "Download | ";
    }
    if (value?.allow_share) {
      data += "Share | ";
    }
    if (value?.chat_box) {
      data += "Request | ";
    }
    if (data) {
      data = data.trim().slice(0, -1);
    } else {
      data = "N/A";
    }
    return data;
  };

  const nextClicked = (id) => {
    props.getEmailData({ PdfSelected: id });
  };

  return (
    <>
      <Col className="right-sidebar custom-change">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <div className="custom-container">
          <Row>
            <div className="top-sticky">
              <div className="top-header">
                <div className="page-title">
                  <h2>{location?.state?.data == "edit" ? "Edit" : ""}</h2>
                </div>
                <div className="top-right-action">
                  <div className="search-bar">
                    <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search by title"
                        aria-label="Search"
                        id="email_search"
                        onChange={(e) => searchChange(e)}
                      />
                      <button className="btn-outline-success" type="submit">
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
                          />
                        </svg>
                      </button>
                    </form>
                  </div>
                  <div
                    className={
                      showfilter
                        ? "filter-by nav-item dropdown highlight"
                        : "filter-by nav-item dropdown"
                    }
                  >
                    <button
                      ref={buttonRef}
                      className={
                        Object.keys(filterObject).length > 0
                          ? "btn btn-secondary dropdown filter_applied"
                          : "btn btn-secondary dropdown"
                      }
                      type="button"
                      id="dropdownMenuButton2"
                      onClick={() => setShowFilter((showfilter) => !showfilter)}
                    >
                      Filter By
                      {showfilter ? (
                        <svg
                          className="close-arrow"
                          width="13"
                          height="12"
                          viewBox="0 0 13 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="2.09896"
                            height="15.1911"
                            rx="1.04948"
                            transform="matrix(0.720074 0.693897 -0.720074 0.693897 11.0977 0)"
                            fill="#0066BE"
                          />
                          <rect
                            width="2.09896"
                            height="15.1911"
                            rx="1.04948"
                            transform="matrix(0.720074 -0.693897 0.720074 0.693897 0 1.45898)"
                            fill="#0066BE"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="filter-arrow"
                          width="16"
                          height="14"
                          viewBox="0 0 16 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                            fill="#97B6CF"
                          />
                          <path
                            d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                            fill="#97B6CF"
                          />
                          <path
                            d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                            fill="#97B6CF"
                          />
                        </svg>
                      )}
                    </button>
                    {showfilter && (
                      <div
                        ref={filterRef}
                        className="dropdown-menu filter-options"
                        aria-labelledby="dropdownMenuButton2"
                      >
                        <h4>Filter By</h4>

                        <Accordion defaultActiveKey="0" flush>
                          {Object.keys(filterdata)?.map(function (key, index) {
                            return (
                              <>
                                {filterdata[key]?.length ? (
                                  <Accordion.Item
                                    className={
                                      key == "Role" ? "card upper" : "card"
                                    }
                                    eventKey={index}
                                  >
                                    <Accordion.Header className="card-header">
                                      {key}
                                    </Accordion.Header>
                                    <Accordion.Body className="card-body">
                                      <ul>
                                        {filterdata[key]?.length
                                          ? filterdata[key]?.map(
                                            (item, index) => (
                                              <li>
                                                {item != "" ? (
                                                  <label className="select-multiple-option">
                                                    <input
                                                      type={
                                                        key == "draft" ||
                                                          key == "ibu" ||
                                                          key ==
                                                          "Selected By Articles" ||
                                                          key ==
                                                          "SPC Included" ||
                                                          key == "Blinded" ||
                                                          key == "Mandatory" ||
                                                          key == "List" ||
                                                          key == "language" ||
                                                          key ==
                                                          "IRT mandatory training" ||
                                                          key ==
                                                          "Business Unit" ||
                                                          key ==
                                                          "Content Owners" ||
                                                          key == "Platform"
                                                          ? "radio"
                                                          : "checkbox"
                                                      }
                                                      id={`custom-checkbox-tags-${index}`}
                                                      value={item}
                                                      name={key}
                                                      checked={
                                                        otherFilter[
                                                          key
                                                        ]?.includes(item)
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={(e) =>
                                                        handleOnFilterChange(
                                                          e,
                                                          item,
                                                          index,
                                                          key,
                                                          [...filterdata[key]]
                                                        )
                                                      }
                                                    />

                                                    {key == "draft" &&
                                                      item == "0"
                                                      ? "live"
                                                      : key == "draft" &&
                                                        item == "1"
                                                        ? "draft"
                                                        : item}
                                                    <span className="checkmark"></span>
                                                  </label>
                                                ) : null}
                                              </li>
                                            )
                                          )
                                          : null}
                                      </ul>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                ) : null}
                              </>
                            );
                          })}
                        </Accordion>

                        <div className="filter-footer">
                          <button
                            className="btn btn-primary btn-bordered"
                            onClick={clearFilter}
                          >
                            Clear
                          </button>
                          <button
                            className="btn btn-primary btn-filled"
                            onClick={applyFilter}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {location?.state?.data !== "edit" ? (
                    <div className="clear-search">
                      {deletestatus ? (
                        <button
                          className="btn btn-outline-primary cancel"
                          title="Cancel delete"
                          onClick={(e) => showDeleteButtons()}
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-primary"
                          title="Delete "
                          onClick={(e) => showDeleteButtons()}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                              fill="#0066BE"
                            />
                            <path
                              d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                              fill="#0066BE"
                            />
                            <path
                              d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                              fill="#0066BE"
                            />
                            <path
                              d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                              fill="#0066BE"
                            />
                            <path
                              d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                              fill="#0066BE"
                            />
                            <path
                              d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                              fill="#0066BE"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  ) : null}

                  {location?.state?.data == "edit" ? (
                    <div className="clear-search">
                      <button
                        className="btn btn-outline-primary cancel"
                        onClick={(e) => navigate("/library-create")}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
              {Object.keys(filterObject)?.length !== 0 &&
                filterApplyflag > 0 ? (
                <div className="apply-filter">
                  <div className="filter-block">
                    <div className="filter-block-left full">
                      {Object.keys(filterObject)?.map((key, index) => {
                        return (
                          <>
                            {filterObject[key]?.length ? (
                              <div className="filter-div">
                                <div className="filter-div-title">
                                  <span>{key} |</span>
                                </div>

                                <div className="filter-div-list">
                                  {filterObject[key]?.map((item, index) => (
                                    <div
                                      className={
                                        key == "Role"
                                          ? "filter-result upper"
                                          : "filter-result"
                                      }
                                    >
                                      {key == "draft" && item == "0"
                                        ? "live"
                                        : key == "draft" && item == "1"
                                          ? "draft"
                                          : item}
                                      <img
                                        src={path_image + "filter-close.svg"}
                                        onClick={() =>
                                          removeindividualfilter(key, item)
                                        }
                                        alt="Close-filter"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                          </>
                        );
                      })}
                    </div>
                    <div className="clear-filter">
                      <button
                        className="btn btn-outline-primary btn-bordered"
                        onClick={clearFilter}
                      >
                        Remove All
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <QRCode
              style={{ display: "none" }}
              id="qr-gen"
              value={qrState?.value}
              size={qrSize}
              level={qrState?.level}
              includeMargin={true}
            />
            {/* {Object.keys(filterObject)?.length !== 0 && filterApplyflag > 0 ? (
              <div className="apply-filter">

                <div className="filter-block">
                  <div className="filter-block-left full">
                    {Object.keys(filterObject)?.map((key, index) => {
                      return (
                        <>
                          {filterObject[key]?.length ? (
                            <div className="filter-div">
                              <div className="filter-div-title">
                                <span>{key} |</span>
                              </div>

                              <div className="filter-div-list">
                                {filterObject[key]?.map((item, index) => (
                                  <div className="filter-result">
                                    {key == "draft" && item == "0"
                                      ? "live"
                                      : key == "draft" && item == "1"
                                      ? "draft"
                                      : item}
                                    <img
                                      src={path_image + "filter-close.svg"}
                                      onClick={() =>
                                        removeindividualfilter(key, item)
                                      }
                                      alt="Close-filter"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </>
                      );
                    })}
                  </div>
                  <div className="clear-filter">
                    <button
                      className="btn btn-outline-primary btn-bordered"
                      onClick={clearFilter}
                    >
                      Remove All
                    </button>
                  </div>
                </div>
              </div>
            ) : null} */}
            <div className="library-content-box-layuot d-flex">
              <>
                {libraryData?.length || updateflag ? (
                  libraryData?.map((data, index) => {
                    return (
                      <>
                        <div className="doc-content-main-box col">
                          <div className="doc-content-header">
                            <div className="doc-content-header-logo">
                              <a href="#">
                                <img
                                  alt="doc-logo"
                                  src={data?.coverImage}
                                  onError={imageOnError}
                                  style={{ width: "67px" }}
                                />
                              </a>
                            </div>
                            <div className="doc-content">
                              <h5
                                dangerouslySetInnerHTML={{
                                  __html: data?.title,
                                }}
                              ></h5>
                              <h6>
                                {data?.pdf_sub_title
                                  ? data.pdf_sub_title
                                  : data?.folder_name}
                              </h6>
                              <p>{data?.key_author}</p>
                              <div className="select-tags">
                                {data?.tags?.length
                                  ? JSON.parse(data.tags)?.map((data) => {
                                    return <div>{data}</div>;
                                  })
                                  : ""}
                              </div>
                            </div>
                            {location?.state?.data == "edit" ? (
                              <div className="dlt_btn">
                                <button>
                                  <img
                                    src={path_image + "edit-white.svg"}
                                    alt="Delete Row"
                                  />
                                </button>
                              </div>
                            ) : deletestatus ? (
                              <div className="dlt_btn">
                                <button
                                  onClick={(e) =>
                                    showConfirmationPopup("delete", e, data?.id)
                                  }
                                >
                                  <img
                                    src={path_image + "delete.svg"}
                                    alt="Delete Row"
                                  />
                                </button>
                              </div>
                            ) : null}
                          </div>
                          <div className="tabs-data">
                            <Tabs
                              onSelect={(key) => tabClicked(key, data?.id)}
                              defaultActiveKey="docintel-link"
                              fill
                            >
                              <Tab
                                eventKey="docintel-link"
                                title="Docintel Link"
                                className="flex-column justify-content-between"
                              >
                                <div className="tab-panel d-flex flex-column justify-content-between">
                                  <div className="tab-content-links">
                                    <a
                                      href={data?.docintelLink}
                                      className="doc-link"
                                      target="_blank"
                                    >
                                      {data?.docintelLink}
                                    </a>
                                    <span
                                      className="copy-content"
                                      onClick={() => {
                                        copyToClipboard(data?.docintelLink);
                                      }}
                                    >
                                      <img
                                        src={path_image + "copy-content.svg"}
                                        alt="Copy"
                                      />
                                    </span>
                                  </div>
                                  <ul className="tab-mail-list">
                                    <li>
                                      <h6 className="tab-content-title">
                                        Upload date
                                      </h6>
                                      <h6>
                                        {moment(data?.created).format(
                                          "DD MMM, YYYY"
                                        )}
                                      </h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        inforMedGO code
                                      </h6>
                                      <h6>
                                        {data?.rep_code}
                                        <span
                                          className="copy-content"
                                          onClick={() => {
                                            copyToClipboard(data?.rep_code);
                                          }}
                                        >
                                          <img
                                            src={
                                              path_image + "copy-content.svg"
                                            }
                                            alt="Copy"
                                          />
                                        </span>
                                      </h6>
                                    </li>
                                    <li>
                                      <h6 className="tab-content-title">
                                        Docintel code
                                      </h6>
                                      <h6>
                                        {data.docintel_code}
                                        {
                                          <span
                                            className="copy-content"
                                            onClick={() => {
                                              copyToClipboard(
                                                data?.docintel_code
                                              );
                                            }}
                                          >
                                            <img
                                              src={
                                                path_image + "copy-content.svg"
                                              }
                                              alt="Copy"
                                            />
                                          </span>
                                        }
                                      </h6>
                                    </li>
                                    {/* <li>
                                      <h6 className="tab-content-title">
                                        SPC included
                                      </h6>
                                      <h6>
                                        {data?.spc_included == 0 ? "No" : "Yes"}
                                      </h6>
                                    </li> */}
                                    <li>
                                      <h6 className="tab-content-title">
                                        Language
                                      </h6>
                                      <h6>
                                        {data?.popup_email_content_language
                                          ? data?.popup_email_content_language
                                          : "No"}
                                      </h6>
                                    </li>
                                    {localStorage.getItem("user_id") !=
                                      "56Ek4feL/1A8mZgIKQWEqg==" && localStorage.getItem("user_id") != "sNl1hra39QmFk9HwvXETJA==" ? (
                                      <>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Link type
                                          </h6>
                                          <h6>{data?.linkType}</h6>
                                        </li>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Enhanced
                                          </h6>
                                          <div className="include-links">
                                            {data?.spc_included ? (
                                              <img
                                                src={path_image + "spc-img.png"}
                                                alt=""
                                              />
                                            ) : (
                                              ""
                                            )}

                                            {data?.linkRelations ? (
                                              <img
                                                src={
                                                  path_image + "video-img.png"
                                                }
                                                alt=""
                                              />
                                            ) : (
                                              ""
                                            )}
                                            {data?.pdfLinks ? (
                                              <img
                                                src={
                                                  path_image + "link-img.png"
                                                }
                                                alt=""
                                              />
                                            ) : (
                                              ""
                                            )}

                                            {data.spc_included == 0 &&
                                              data.linkRelations == 0 &&
                                              data.pdfLinks == 0 && <h6>No</h6>}
                                          </div>
                                        </li>
                                      </>
                                    ) : null}
                                    {localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==" ? (
                                      <>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Status
                                          </h6>
                                          <h6>{data?.sold_unsold
                                            ? data?.sold_unsold
                                            : "N/A"}</h6>
                                        </li>
                                      </>
                                    ) : null}
                                  </ul>
                                </div>

                                {location?.state?.data != "edit" &&
                                  deletestatus == false ? (
                                  <div className="data-main-footer-sec">
                                    <div
                                      className={`footer-btn-wrapper ${[
                                        "wW0geGtDPvig5gF 6KbJrg==",
                                        "B7SHpAc XDXSH NXkN0rdQ==",
                                        "z2TunmZQf3QwCsICFTLGGQ==",
                                        "qDgwPdToP05Kgzc g2VjIQ==",
                                        "UbCJcnLM9fe HsRMgX8c1A==",
                                      ].includes(
                                        localStorage.getItem("user_id")
                                      ) &&
                                        filterObject["Content Owners"] ==
                                        "IBU Owner"
                                        ? "clone"
                                        : ""
                                        }`}
                                    >
                                      {data?.spc_included ? (
                                        <>
                                          <button
                                            className="footer-btn"
                                            onClick={() =>
                                              handleSpcFun(data?.spcFile)
                                            }
                                          >
                                            Preview article
                                          </button>
                                        </>
                                      ) : (
                                        <a
                                          className="footer-btn"
                                          href={data?.previewArticle}
                                          target="_blank"
                                        >
                                          Preview article
                                        </a>
                                      )}

                                      <Button
                                        onClick={(e) => {
                                          commonModelFun(
                                            e,
                                            data?.docintelLink,
                                            "downloadQR"
                                          );
                                          setQr({
                                            ...qrState,
                                            value: data?.docintelLink + `~QRcode`,
                                          });
                                        }}
                                        className="footer-btn"
                                      >
                                        Download QR
                                      </Button>

                                      <Link
                                        to="/CreateEmail"
                                        state={{ PdfSelected: data.id }}
                                        onClick={() => {
                                          nextClicked(data.id);
                                        }}
                                        className="footer-btn"
                                      >
                                        Send in email
                                      </Link>
                                      {[
                                        "wW0geGtDPvig5gF 6KbJrg==",
                                        "B7SHpAc XDXSH NXkN0rdQ==",
                                        "z2TunmZQf3QwCsICFTLGGQ==",
                                        "qDgwPdToP05Kgzc g2VjIQ==",
                                        "UbCJcnLM9fe HsRMgX8c1A==",
                                      ].includes(
                                        localStorage.getItem("user_id")
                                      ) &&
                                        filterObject["Content Owners"] ==
                                        "IBU Owner" ? (
                                        <Button
                                          onClick={(e) => {
                                            commonModelFun(
                                              e,
                                              data?.id,
                                              "clone"
                                            );
                                          }}
                                          className="footer-btn"
                                        >
                                          Clone Article
                                        </Button>
                                      ) : null}
                                    </div>
                                  </div>
                                ) : null}
                              </Tab>
                              <Tab
                                eventKey="data-tab"
                                title="Data"
                                className="flex-column justify-content-between"
                              >
                                <div className="data-main-box tab-panel d-flex flex-column justify-content-between">
                                  <ul className="tab-mail-list data">
                                    <li>
                                      <h6 className="tab-content-title">
                                        Openings (total){" "}
                                        <LinkWithTooltip tooltip="Number of opening counts for specific article.">
                                          <img
                                            src={
                                              path_image +
                                              "info_circle_icon.svg"
                                            }
                                            alt="refresh-btn"
                                          />
                                        </LinkWithTooltip>
                                      </h6>
                                      <div className="data-progress limited">
                                        <ProgressBar
                                          variant={
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? opening_details[
                                                opening_details.findIndex(
                                                  (el) => el.pdfId == data?.id
                                                )
                                              ].opening > 0
                                                ? "success"
                                                : "default"
                                              : "default"
                                          }
                                          now={
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? opening_details[
                                                opening_details.findIndex(
                                                  (el) => el.pdfId == data?.id
                                                )
                                              ].opening
                                              : "100"
                                          }
                                          label={
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? opening_details[
                                                opening_details.findIndex(
                                                  (el) => el.pdfId == data?.id
                                                )
                                              ].opening
                                              : "Loading"
                                          }
                                        />
                                      </div>
                                    </li>

                                    {
                                      data?.lastRomanNumber == 2 || data?.lastRomanNumber == 3 ?
                                        (
                                          <>
                                            <li className="d-flex align-center">
                                              <h6 className="tab-content-title">
                                                Unique reader (total)
                                                <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on IP address, device &amp; browser).">
                                                  <img
                                                    src={
                                                      path_image +
                                                      "info_circle_icon.svg"
                                                    }
                                                    alt="refresh-btn"
                                                  />
                                                </LinkWithTooltip>
                                              </h6>
                                              <div className="data-progress send">
                                                <ProgressBar
                                                  variant={
                                                    opening_details.findIndex(
                                                      (el) => el.pdfId == data?.id
                                                    ) !== -1
                                                      ? opening_details[
                                                        opening_details.findIndex(
                                                          (el) => el.pdfId == data?.id
                                                        )
                                                      ]?.unique > 0
                                                        ? "warning"
                                                        : "default"
                                                      : "default"
                                                  }
                                                  now={
                                                    opening_details.findIndex(
                                                      (el) => el.pdfId == data?.id
                                                    ) !== -1
                                                      ? (opening_details[
                                                        opening_details.findIndex(
                                                          (el) => el.pdfId == data?.id
                                                        )
                                                      ]?.unique)
                                                      : "100"
                                                  }
                                                  label={
                                                    opening_details.findIndex(
                                                      (el) => el.pdfId == data?.id
                                                    ) !== -1
                                                      ? opening_details[
                                                        opening_details.findIndex(
                                                          (el) => el.pdfId == data?.id
                                                        )
                                                      ]?.unique
                                                      : "Loading"
                                                  }
                                                />
                                              </div>
                                            </li>
                                            <li>
                                              <h6 className="tab-content-title">
                                                Article Usage
                                                <LinkWithTooltip tooltip="Number of usage on the content.">
                                                  <img
                                                    src={
                                                      path_image +
                                                      "info_circle_icon.svg"
                                                    }
                                                    alt="refresh-btn"
                                                  />
                                                </LinkWithTooltip>
                                              </h6>
                                              <div className="data-progress">
                                                <ProgressBar
                                                  variant={
                                                    opening_details.findIndex(
                                                      (el) => el.pdfId == data?.id
                                                    ) !== -1
                                                      ? opening_details[
                                                        opening_details.findIndex(
                                                          (el) =>
                                                            el.pdfId == data?.id
                                                        )
                                                      ]?.pinReaders
                                                        ? "pin_usage"
                                                        : "default"
                                                      : "default"
                                                  }
                                                  now={
                                                    opening_details.findIndex(
                                                      (el) => el.pdfId == data?.id
                                                    ) !== -1
                                                      ? (opening_details[
                                                        opening_details.findIndex(
                                                          (el) =>
                                                            el.pdfId == data?.id
                                                        )
                                                      ]?.pinReaders /
                                                        opening_details[
                                                          opening_details.findIndex(
                                                            (el) =>
                                                              el.pdfId == data?.id
                                                          )
                                                        ]?.limit) *
                                                      100
                                                      : "100"
                                                  }
                                                  label={
                                                    opening_details.findIndex(
                                                      (el) => el.pdfId == data?.id
                                                    ) !== -1
                                                      ? opening_details[
                                                        opening_details.findIndex(
                                                          (el) =>
                                                            el.pdfId == data?.id
                                                        )
                                                      ].pinReaders
                                                      : "Loading"
                                                  }
                                                />
                                                <span>
                                                  Agreed Limit :&nbsp;
                                                  <strong>
                                                    {opening_details.findIndex(
                                                      (el) => el.pdfId == data?.id
                                                    ) !== -1
                                                      ? opening_details[
                                                        opening_details.findIndex(
                                                          (el) => el.pdfId == data?.id
                                                        )
                                                      ]?.limit == 1000
                                                        ? "Unlimited"
                                                        : opening_details[
                                                          opening_details.findIndex(
                                                            (el) =>
                                                              el.pdfId == data?.id
                                                          )
                                                        ]?.limit
                                                      : "Unlimited"}
                                                  </strong>
                                                </span>
                                              </div>
                                              <span className="total-left">
                                                {opening_details.findIndex(
                                                  (el) => el.pdfId == data?.id
                                                ) !== -1
                                                  ? opening_details[
                                                    opening_details.findIndex(
                                                      (el) => el.pdfId == data?.id
                                                    )
                                                  ]?.limit == 1000
                                                    ? null
                                                    : opening_details[
                                                      opening_details.findIndex(
                                                        (el) => el.pdfId == data?.id
                                                      )
                                                    ]?.limit -
                                                    opening_details[
                                                      opening_details.findIndex(
                                                        (el) => el.pdfId == data?.id
                                                      )
                                                    ]?.pinReaders
                                                  : null}

                                                {opening_details.findIndex(
                                                  (el) => el.pdfId == data?.id
                                                ) !== -1 ? (
                                                  opening_details[
                                                    opening_details.findIndex(
                                                      (el) => el.pdfId == data?.id
                                                    )
                                                  ]?.limit != 1000 ? (
                                                    <small>Left</small>
                                                  ) : null
                                                ) : null}
                                              </span>
                                            </li>
                                          </>
                                        )
                                        :
                                        <li className="d-flex align-center">
                                          <h6 className="tab-content-title">
                                            Unique reader (total)
                                            <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on IP address, device &amp; browser).">
                                              <img
                                                src={
                                                  path_image +
                                                  "info_circle_icon.svg"
                                                }
                                                alt="refresh-btn"
                                              />
                                            </LinkWithTooltip>
                                          </h6>
                                          <div className="data-progress send">
                                            <ProgressBar
                                              variant={
                                                opening_details.findIndex(
                                                  (el) => el.pdfId == data?.id
                                                ) !== -1
                                                  ? opening_details[
                                                    opening_details.findIndex(
                                                      (el) => el.pdfId == data?.id
                                                    )
                                                  ]?.unique > 0
                                                    ? "warning"
                                                    : "default"
                                                  : "default"
                                              }
                                              now={
                                                opening_details.findIndex(
                                                  (el) => el.pdfId == data?.id
                                                ) !== -1
                                                  ? (opening_details[
                                                    opening_details.findIndex(
                                                      (el) => el.pdfId == data?.id
                                                    )
                                                  ]?.unique /
                                                    opening_details[
                                                      opening_details.findIndex(
                                                        (el) =>
                                                          el.pdfId == data?.id
                                                      )
                                                    ]?.limit) *
                                                  100
                                                  : "100"
                                              }
                                              label={
                                                opening_details.findIndex(
                                                  (el) => el.pdfId == data?.id
                                                ) !== -1
                                                  ? opening_details[
                                                    opening_details.findIndex(
                                                      (el) => el.pdfId == data?.id
                                                    )
                                                  ]?.unique
                                                  : "Loading"
                                              }
                                            />
                                            <span>
                                              Agreed Limit :&nbsp;
                                              <strong>
                                                {opening_details.findIndex(
                                                  (el) => el.pdfId == data?.id
                                                ) !== -1
                                                  ? opening_details[
                                                    opening_details.findIndex(
                                                      (el) => el.pdfId == data?.id
                                                    )
                                                  ]?.limit == 1000
                                                    ? "Unlimited"
                                                    : opening_details[
                                                      opening_details.findIndex(
                                                        (el) =>
                                                          el.pdfId == data?.id
                                                      )
                                                    ]?.limit
                                                  : "Unlimited"}
                                              </strong>
                                            </span>
                                          </div>
                                          <span className="total-left">
                                            {opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1
                                              ? opening_details[
                                                opening_details.findIndex(
                                                  (el) => el.pdfId == data?.id
                                                )
                                              ]?.limit == 1000
                                                ? null
                                                : opening_details[
                                                  opening_details.findIndex(
                                                    (el) => el.pdfId == data?.id
                                                  )
                                                ]?.limit -
                                                opening_details[
                                                  opening_details.findIndex(
                                                    (el) => el.pdfId == data?.id
                                                  )
                                                ]?.unique
                                              : null}

                                            {opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            ) !== -1 ? (
                                              opening_details[
                                                opening_details.findIndex(
                                                  (el) => el.pdfId == data?.id
                                                )
                                              ]?.limit != 1000 ? (
                                                <small>Left</small>
                                              ) : null
                                            ) : null}
                                          </span>
                                        </li>
                                    }

                                    {data?.linkType != "Online" ? (
                                      <li>
                                        <h6 className="tab-content-title">
                                          Registered readers{" "}
                                          <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content.">
                                            <img
                                              src={
                                                path_image +
                                                "info_circle_icon.svg"
                                              }
                                              alt="refresh-btn"
                                            />
                                          </LinkWithTooltip>
                                        </h6>
                                        <div className="data-progress">
                                          <ProgressBar
                                            variant={
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              ) !== -1
                                                ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ]?.reader > 0
                                                  ? "danger"
                                                  : "default"
                                                : "default"
                                            }
                                            now={
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              ) !== -1
                                                ? (opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ]?.reader /
                                                  opening_details[
                                                    opening_details.findIndex(
                                                      (el) =>
                                                        el.pdfId == data?.id
                                                    )
                                                  ]?.limit) *
                                                100
                                                : "100"
                                            }
                                            label={
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              ) !== -1
                                                ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ].reader
                                                : "Loading"
                                            }
                                          />
                                        </div>
                                      </li>
                                    ) : null}

                                    {data?.subLinkAdded ? (
                                      <li>
                                        <h6 className="tab-content-title">
                                          SubLinks
                                          <LinkWithTooltip tooltip="Number of sublinks with content.">
                                            <img
                                              src={
                                                path_image +
                                                "info_circle_icon.svg"
                                              }
                                              alt="refresh-btn"
                                            />
                                          </LinkWithTooltip>
                                        </h6>
                                        <div className="data-progress">
                                          <ProgressBar
                                            variant={
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              ) !== -1
                                                ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ]?.subLink > 0
                                                  ? "sublink"
                                                  : "default"
                                                : "default"
                                            }
                                            now={
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              ) !== -1
                                                ? (opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ]?.subLink /
                                                  opening_details[
                                                    opening_details.findIndex(
                                                      (el) =>
                                                        el.pdfId == data?.id
                                                    )
                                                  ]?.limit) *
                                                100
                                                : "100"
                                            }
                                            label={
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              ) !== -1
                                                ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ].subLink
                                                : "Loading"
                                            }
                                          />
                                        </div>
                                      </li>
                                    ) : null}

                                    {data?.allow_print ? (
                                      <li>
                                        <h6 className="tab-content-title">
                                          Printed
                                          <LinkWithTooltip tooltip="Number of HCPs who have print the content.">
                                            <img
                                              src={
                                                path_image +
                                                "info_circle_icon.svg"
                                              }
                                              alt="refresh-btn"
                                            />
                                          </LinkWithTooltip>
                                        </h6>
                                        <div className="data-progress">
                                          <ProgressBar
                                            variant={
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              ) !== -1
                                                ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ]?.print > 0
                                                  ? "print"
                                                  : "default"
                                                : "default"
                                            }
                                            now={
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              ) !== -1
                                                ? (opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ]?.print /
                                                  opening_details[
                                                    opening_details.findIndex(
                                                      (el) =>
                                                        el.pdfId == data?.id
                                                    )
                                                  ]?.limit) *
                                                100
                                                : "100"
                                            }
                                            label={
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              ) !== -1
                                                ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ].print
                                                : "Loading"
                                            }
                                          />
                                        </div>
                                      </li>
                                    ) : null}

                                    {data?.allow_download ? (
                                      <li>
                                        <h6 className="tab-content-title">
                                          Downloaded
                                          <LinkWithTooltip tooltip="Number of HCPs who have download the content.">
                                            <img
                                              src={
                                                path_image +
                                                "info_circle_icon.svg"
                                              }
                                              alt="refresh-btn"
                                            />
                                          </LinkWithTooltip>
                                        </h6>
                                        <div className="data-progress">
                                          <ProgressBar
                                            variant={
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              ) !== -1
                                                ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ]?.download > 0
                                                  ? "download"
                                                  : "default"
                                                : "default"
                                            }
                                            now={
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              ) !== -1
                                                ? (opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ]?.download /
                                                  opening_details[
                                                    opening_details.findIndex(
                                                      (el) =>
                                                        el.pdfId == data?.id
                                                    )
                                                  ]?.limit) *
                                                100
                                                : "100"
                                            }
                                            label={
                                              opening_details.findIndex(
                                                (el) => el.pdfId == data?.id
                                              ) !== -1
                                                ? opening_details[
                                                  opening_details.findIndex(
                                                    (el) =>
                                                      el.pdfId == data?.id
                                                  )
                                                ].download
                                                : "Loading"
                                            }
                                          />
                                        </div>
                                      </li>
                                    ) : null}
                                  </ul>
                                </div>
                                <div className="data-main-footer-sec">
                                  <div className="footer-btn-wrapper">
                                    {/*<Button className="footer-btn">
                                        Analytics
                                      </Button>*/}
                                    <Link
                                      className="footer-btn"
                                      to="/content-analytics"
                                      state={{ pdfId: data.id }}
                                    >
                                      Analytics
                                    </Link>
                                    <Button
                                      className="footer-btn reset"
                                      onClick={(e) =>
                                        showConfirmationPopup(
                                          "reset",
                                          e,
                                          data?.id
                                        )
                                      }
                                    >
                                      Reset the collected data
                                    </Button>
                                  </div>
                                </div>
                              </Tab>
                              <Tab
                                className="change-tab flex-column justify-content-between"
                                eventKey="change-tab"
                                title="Change"
                              >
                                <div className="data-main-box change-tab-main-box tab-panel">
                                  <ul className="tab-mail-list data change">
                                    {/* <div className="form-group d-flex align-items-center"> */}
                                    <li>
                                      <h6 className="tab-content-title">
                                        Consent type
                                      </h6>
                                      <div className="select-dropdown-wrapper">
                                        <div className="select">
                                          <Select
                                            options={types}
                                            defaultValue={
                                              data.linkType == "Online"
                                                ? types[0]
                                                : data.linkType == "Offline"
                                                  ? types[1]
                                                  : data.linkType == "Sunshine"
                                                    ? types[2]
                                                    : data.linkType == "Sunshine USA"
                                                      ? types?.[3]
                                                      : "Select"
                                            }
                                            onChange={(event) =>
                                              onConsentChange(event, data?.id)
                                            }
                                            id={"consent_dropdown_" + index}
                                            className="dropdown-basic-button split-button-dropup"
                                            isClearable
                                          />
                                        </div>
                                      </div>
                                    </li>

                                    {localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==" ?
                                      (<>
                                        <li>
                                          {/* <div className="form-group d-flex align-items-center"> */}

                                          <h6 className="tab-content-title">
                                            Status
                                          </h6>
                                          <div className="select-dropdown-wrapper">
                                            <div className="select">
                                              <Select
                                                options={statusOptions}
                                                defaultValue={
                                                  data.sold_unsold == "sold"
                                                    ? statusOptions[0]
                                                    : data.sold_unsold == "unsold"
                                                      ? statusOptions[1]
                                                      : "Select"
                                                }
                                                onChange={(event) =>
                                                  onStatusChange(event, data?.id)
                                                }
                                                id={"status_dropdown_" + index}
                                                className="dropdown-basic-button split-button-dropup"
                                                isClearable
                                              />
                                            </div>
                                          </div>
                                        </li>
                                      </>) : ""}

                                  </ul>

                                  <div className="data-main-footer-sec">
                                    <div className="footer-btn d-flex justify-content-end">
                                      <Button
                                        onClick={(e) =>
                                          updateChanges(data.id, index)
                                        }
                                      >
                                        Update
                                      </Button>

                                    </div>
                                  </div>
                                </div>

                                <div className="data-main-footer-sec">
                                  <div className="footer-btn-wrapper">
                                    {/* <Button className="footer-btn">
                                        Edit Docintel Link
                                      </Button> */}
                                    <Link
                                      to="/library-edit"
                                      state={{ pdfid: data.id }}
                                      className="footer-btn"
                                    >
                                      Edit link
                                    </Link>
                                    {localStorage.getItem("group_id") == 3 ? (
                                      <Button
                                        className="footer-btn"
                                        onClick={(e) =>
                                          tagButtonClicked(data.id)
                                        }
                                      >
                                        Tags
                                      </Button>
                                    ) : null}

                                    {localStorage.getItem("user_id") !=
                                      "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") != "sNl1hra39QmFk9HwvXETJA==" && (
                                        <Link
                                          to="/library-sublink"
                                          state={{ pdfid: data.id }}
                                          className="footer-btn"
                                        >
                                          New sublink
                                        </Link>
                                      )}
                                  </div>
                                </div>
                              </Tab>
                              <Tab
                                eventKey="sales"
                                title={
                                  localStorage.getItem("group_id") == "3"
                                    ? "About"
                                    : "Sales"
                                }
                                className="flex-column justify-content-between"
                              >
                                <div className="tab-panel">
                                  <ul className="tab-mail-list">
                                    {localStorage.getItem("group_id") == 2 && (
                                      <>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Production person
                                          </h6>
                                          <h6>
                                            {data?.productName
                                              ? data.productName
                                              : "N/A"}
                                          </h6>
                                        </li>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Publisher
                                          </h6>
                                          <h6>
                                            {data?.publisherName
                                              ? data.publisherName
                                              : "N/A"}
                                          </h6>
                                        </li>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Country
                                          </h6>
                                          <h6>
                                            {data?.country
                                              ? data.country
                                              : "N/A"}
                                          </h6>
                                        </li>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Cost Center
                                          </h6>
                                          <h6>
                                            {data?.cost_center &&
                                              data?.cost_center != 0
                                              ? data.cost_center
                                              : "N/A"}
                                          </h6>
                                        </li>
                                        {/*
                                          <li>
                                            <h6 className="tab-content-title">
                                              Sales person
                                            </h6>
                                            <h6>{data?.saleName}</h6>
                                          </li>

                                          <li>
                                            <h6 className="tab-content-title">
                                              Client name
                                            </h6>
                                            <h6>{data?.company}</h6>
                                          </li>
                                          <li>
                                            <h6 className="tab-content-title">
                                              Client product
                                            </h6>
                                            <h6>{data?.product}</h6>
                                          </li>

                                          */}
                                      </>
                                    )}
                                    {localStorage.getItem("group_id") == "3" &&
                                      localStorage.getItem("user_id") !=
                                      "56Ek4feL/1A8mZgIKQWEqg==" && localStorage.getItem("user_id") != "sNl1hra39QmFk9HwvXETJA==" ? (
                                      <>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Product
                                          </h6>
                                          <h6>
                                            {data?.product
                                              ? data.product
                                              : "N/A"}
                                          </h6>
                                        </li>
                                      </>
                                    ) : null}

                                    {localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" &&
                                      localStorage.getItem("group_id") == "3" ? (
                                      <>
                                        {/*<li>
                                            <h6 className="tab-content-title">
                                              Blind Type
                                            </h6>
                                            <h6>{ data?.blindType ? data.blindType == "blinded" ? "Yes" : "No"  : "No" }</h6>
                                          </li>*/}

                                        <li>
                                          <h6 className="tab-content-title">
                                            Mandatory
                                          </h6>
                                          <h6>
                                            {data?.reader_mandatory
                                              ? "Yes"
                                              : "No"}
                                          </h6>
                                        </li>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Roles
                                          </h6>
                                          <h6 className="upper">
                                            {data?.trail_user_type
                                              ? typeof data?.trail_user_type ==
                                                "string" &&
                                                data?.trail_user_type != ""
                                                ? JSON.parse(
                                                  data?.trail_user_type
                                                ).join(", ")
                                                : "N/A"
                                              : "N/A"}
                                          </h6>
                                        </li>
                                      </>
                                    ) : null}

                                    {localStorage.getItem("user_id") !=
                                      "56Ek4feL/1A8mZgIKQWEqg==" && localStorage.getItem("user_id") != "sNl1hra39QmFk9HwvXETJA==" ? (
                                      <>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Usage limit
                                          </h6>
                                          <h6>
                                            {data?.limit > 0
                                              ? data?.limit
                                              : "Unlimited"}
                                          </h6>
                                        </li>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Allowed
                                          </h6>
                                          <h6>{changeFormatForPrint(data)}</h6>
                                        </li>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Link type
                                          </h6>
                                          <h6>{data?.linkType}</h6>
                                        </li>
                                      </>
                                    ) : null}

                                    {
                                      localStorage.getItem('user_id') == 'iSnEsKu5gB/DRlycxB6G4g=='
                                        ?
                                        <li>
                                          <h6 className="tab-content-title">
                                            <img className="library_go" src={path_image + "library_move.svg"} />
                                          </h6>
                                          <h6>
                                            {
                                              data?.sync_onesource ? "Yes" : "No"
                                            }
                                          </h6>
                                        </li>
                                        : null
                                    }

                                    {/*
                                      <li>
                                        <h6 className="tab-content-title">
                                          Download
                                        </h6>
                                        <h6>
                                          {data?.allow_download ? "Yes" : "No"}
                                        </h6>
                                      </li>
                                      */}
                                    <li>
                                      <h6 className="tab-content-title">
                                        Upload date
                                      </h6>
                                      <h6>{data?.uploadedDate}</h6>
                                    </li>

                                    {localStorage.getItem("group_id") == "2" ? (
                                      <li>
                                        <h6 className="tab-content-title">
                                          Expiration date
                                        </h6>
                                        <h6>
                                          {data?.expireDate
                                            ? data.expireDate
                                            : "N/A"}
                                        </h6>
                                      </li>
                                    ) : null}
                                  </ul>
                                </div>
                              </Tab>
                            </Tabs>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : apiCallStatus ? (
                  <div className="no_found">
                    <p>No Data Found</p>
                  </div>
                ) : null}

                <div className="load_more">
                  {(isLoaded == true || libraryData.length >= 24) ? (
                    <Button
                      className="btn btn-primary btn-filled"
                      onClick={async () => {
                        await getLibraryData(page + 1, filterObject, "");
                      }}
                    >
                      Load More
                    </Button>
                  ) : null}
                </div>

                {pageAll == true ? (
                  <div
                    className="load_more"
                    style={{
                      margin: "0 auto",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Spinner
                      color="#53aff4"
                      size={32}
                      speed={1}
                      animating={true}
                    />
                  </div>
                ) : null}
              </>
            </div>
          </Row>
        </div>
      </Col>

      <CommonModel
        show={show}
        onClose={setShow}
        heading={heading}
        data={modelData}
        footerButton={footerButton}
        handleSubmit={resetDataId ? saveArticle : downloadQRCode}
        handleQR={resetDataId ? handleLanguage : handleQR}
      />

      <CommonConfirmModel
        show={confirmationpopup}
        onClose={hideConfirmationModal}
        fun={commonConfirmModelFun}
        popupMessage={popupMessage}
        path_image={path_image}
        resetDataId={resetDataId}
      />

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
                {allTags?.length
                  ? Object?.values(allTags).map((data) => {
                    return (
                      <>
                        <div onClick={(event) => tagClicked(data)}>
                          {data}{" "}
                        </div>
                      </>
                    );
                  })
                  : null}
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
                    <div className="tag-cross">
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
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  getDraftData: getDraftData,
  getSelectedSmartListData: getSelectedSmartListData,
  getEmailData: getEmailData,
})(LibraryContent);
