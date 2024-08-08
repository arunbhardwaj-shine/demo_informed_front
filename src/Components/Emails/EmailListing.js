import React, { useEffect, useRef, useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { loader } from "../../loader";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getDraftData, getEmailData, getSearched, getSelected } from "../../actions";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";

import { toast } from "react-toastify";
import { popup_alert } from "../../popup_alert";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import queryString from "query-string";
import { getSelectedSmartListData } from "../../actions";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import { ENDPOINT } from "../../axios/apiConfig";
import { getData as getApiData } from "../../axios/apiHelper";

const EmailList = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const isRND = (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem('user_id') == "sNl1hra39QmFk9HwvXETJA==")
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const colorArray = ['#0E9B8E', '#00003C', '#FFBE2C', '#FFBE2C', '#F58289', '#D61975', '#0066BE'];

  const [SendListData, setSendListData] = useState([]);
  const [getoriginalsendlistdata, setOriginalSendListData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [readerDetailsPopupStatus, setReaderDetailsPopupStatus] =
    useState(false);
  const [readerDetailsData, setReaderDetailsData] = useState([]);
  const [readerDetailsCount, setReaderDetailsCount] = useState(0);
  const [detailPopupName, setDetailPopupName] = useState("");
  const [ctrName, setCTRName] = useState("");
  const [popupHeadingColor, setPopupHeadingColor] = useState("");
  const [search, setSearch] = useState("");

  const [getreference, setReference] = useState("");
  const [campaign_id, setCampaignId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [viewEmailModal, setviewEmailModal] = useState(false);
  const [viewEmailData, setviewEmailData] = useState();
  const [deletestatus, setDeleteStatus] = useState(false);
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [showfilter, setShowFilter] = useState(false);
  const [deletecardid, setDeleteCardId] = useState();
  const [filtertags, setFilterTags] = useState([]);
  const [filtercreator, setFilterCreators] = useState([]);
  const [filterdate, setFilterDate] = useState([]);
  const [filterrole, setFilterRole] = useState([]);
  const [filtercampaign, setFilterCampaigns] = useState([]);
  const [updateflag, setUpdateFlag] = useState([]);
  const [filterapplied, setFilterApply] = useState(false);
  const [getDraftEmailSendStatus, setDraftEmailSendStatus] = useState(false);
  const [getDraftCamapignId, setDraftCamapignId] = useState(0);
  const [getloadmore, setloadmore] = useState(0);

  const [sortingCount, setSortingCount] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [sortNameDirection, setSortNameDirection] = useState(0);
  const [isActive, setIsActive] = useState({});
  const [functionParameter, setFunctionParameter] = useState({

  });
  const irtRoleObj =
    typeof state?.IrtObj !== "undefined" && location?.pathname == '/RD-EmailList' ? state?.IrtObj : {}

  const [filter, setFilter] = useState(
    state?.IrtObj?.IRTFlag == 1 ? { role: [state?.IrtObj?.siteRole] } : {}
  );
  // const [filter, setFilter] = useState(initialFilterProp || {});
  const deletButtonColor = (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") ? '#8A4E9C' : '#0066be'
  const [options_ch, setOptions_ch] = useState({
    chart: {
      type: "column",
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
      },
      //   events: {
      //     load: function() {
      //         var chart = this;
      //         chart.series.forEach(function(series) {
      //             series.data.forEach(function(point) {
      //                 point.onMouseOver(); // Trigger tooltip display
      //             });
      //         });
      //     }
      // }
    },
    title: {
      text: "Mail campaign stats",
    },
    plotOptions: {
      column: {
        depth: 25,
      },
    },
    xAxis: {
      categories: ["Emails sent", "Emails opened"],
      labels: {
        skew3d: true,
        style: {
          fontSize: "16px",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      series: {
        dataLabels: {
          allowOverlap: false,
          distance: 40,
          enabled: true,
          inside: false,
          overflow: "justify",
          crop: true,
          shape: "callout",
          size: "100%",
          backgroundColor: "rgba(255,255,255)",
          // borderColor: "rgba(0,0,0,0.9)",
          // borderColor:this.point.color,
          color: "rgba(0,0,0)",
          // borderWidth: 0.5,
          // borderRadius: 5,
          style: {
            fontFamily: "Helvetica, sans-serif",
            // fontSize: "13px",
            fontWeight: "normal",
            textShadow: "none",
          },
          formatter: function () {
            return (
              "<span ><div className=" +
              this.series.name +
              '><span style="font-weight: bold;">' +
              this.x +
              "</span><br/><strong>" +
              this.series.name +
              "</strong> <strong >" + ":" +
              Highcharts.numberFormat(this.y, 0) +
              "</strong></div></span>"
            );
          },
        },
      },
    },
    series: [
      {
        name: "Email campaign",
        data: [
          { y: 2, color: "#8a4e9c" },
          { y: 3, color: "#ffbe2c" },
          { y: 0, color: "#39cabc" },
        ],
      },
    ],
  });
  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  useEffect(() => {
    props.getEmailData(null);
    props.getDraftData(null);
    props.getSelectedSmartListData(null);

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

  const showViewEmailModal = async (data) => {
    let id = data;
    loader('show');
    const response = await getApiData(
      `${ENDPOINT.GET_CAMPAIGN_TEMPLATE}?id=${id}`
    );
    let template = response.data.data


    if (typeof SendListData !== "undefined") {
      let getSpecificKeyData = SendListData.filter((p) => p.id == id);
      let valueupdate = options_ch;
      valueupdate?.xAxis?.categories.push(getSpecificKeyData[0].click_name);

      if (getSpecificKeyData[0]?.multi_ctr?.length > 0) {
        getSpecificKeyData[0]?.multi_ctr.map((multilinkdata) => {
          valueupdate?.xAxis?.categories.push(multilinkdata?.click_name);
        });
      }
      setCTRName(getSpecificKeyData[0].click_name);
      valueupdate.series[0].data = [
        { y: getSpecificKeyData[0].total_Sent, color: "#8a4e9c" },
        { y: getSpecificKeyData[0].total_Opened, color: "#ffbe2c" },
        { y: getSpecificKeyData[0].total_Click, color: "#39cabc" },
      ];

      if (getSpecificKeyData[0]?.multi_ctr?.length > 0) {
        getSpecificKeyData[0]?.multi_ctr.map((multilinkdata, index) => {
          let obj = {
            y: multilinkdata?.total_Click,
            color: colorArray?.[index]
          }
          valueupdate.series[0].data.push(obj);
        });
      }
      if (getSpecificKeyData.length) {
        if (template) {
          const replacements = {
            '###pdftitle###': getSpecificKeyData[0].pdf_title,
            '###title###': getSpecificKeyData[0].pdf_title,
            '###subPdfTitle###': getSpecificKeyData[0].pdf_sub_title,
            '###subtitle###': getSpecificKeyData[0].pdf_sub_title,
            '###coverpath###': getSpecificKeyData[0].cover,
          };

          for (const [key, value] of Object.entries(replacements)) {
            template = template.replace(new RegExp(key, 'g'), value);
          }
          getSpecificKeyData[0].template = template
        }
      }
      setOptions_ch(valueupdate);
      setviewEmailData(getSpecificKeyData);
    }
    hideModal();
    setviewEmailModal(true);
    setCampaignId(id);
    loader('hide');

  };
  const hideEmailModal = () => {
    setviewEmailModal(false);
  };
  const showModal = (refernce, id) => {
    hideEmailModal();
    setReference(refernce);
    setCampaignId(id);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

  const getCampaignFiltereData = async () => {
    try {
      loader('show');
      const body = {
        user_id: localStorage.getItem("user_id"),
        flag: irtRoleObj?.IRTFlag,
        id: irtRoleObj?.pdfId
      };
      await axios
        .post(`emailapi/get_campaign_list_filter`, body)
        .then((res) => {
          setFilterData(res?.data?.response?.filter ? res?.data?.response?.filter : {});

          getData("initial");
        })
        .catch((err) => {
          loader("hide");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      loader('hide');
    }
  }


  const getData = (stage, page = 1) => {
    loader("show");
    const body = {
      user_id: localStorage.getItem("user_id"),
      search: page == 3 ? '' : search,
      filter: filter,
    };
    page = page == 3 ? 1 : page;
    axios
      .post(`emailapi/getlist?page=` + page, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          setSendListData(res.data.response.data.emails);
          if (stage == "initial") {
            setOriginalSendListData(res.data.response.data.emails);

            // setFilterData(res.data.response.data.filter);
          }
        } else if (res.data.status_code == 201) {
          setSendListData([]);
        } else {
          setSendListData([]);
          // toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        // toast.error("Something went wrong");
      });
  };

  const resendemail = () => {
    hideModal();
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      campaign_id: campaign_id,
    };
    loader("show");
    axios
      .post(`emailapi/resend_email`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          toast.success(res.data.message ?? "Email send successfully.");
        } else if (res.data.status_code == 201) {
          toast.warning(res.data.message);
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
      });
  };

  const submitHandler = (event) => {
    setloadmore(0);
    setShowFilter(false);
    getData("progress");
    event.preventDefault();
    return false;
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setloadmore(0);
      getData("progress", 3);
      // setSendListData(getoriginalsendlistdata);
    }
  };

  const draftNavigate = async (
    campaign_id,
    pdf_id,
    route,
    campaign,
    creator,
    discription,
    subject,
    tags
  ) => {
    // if (campaign_id != "" && route != "" && pdf_id != "") {
    // navigate("/" + route, {
    //   state: { campaign_id: campaign_id, PdfSelected: pdf_id },
    // });

    const body = {
      user_id: localStorage.getItem("user_id"),
      campaign_id: campaign_id,
    };
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/get_campaign_details`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          let campaign_data = res?.data?.response?.data;
          props.getDraftData(campaign_data);
          if (campaign_data?.smart_list_data) {
            if (
              typeof campaign_data.smart_list_data != "undefined" &&
              campaign_data.smart_list_data != ""
            ) {
              props.getSelectedSmartListData(campaign_data.smart_list_data);
            }
          }
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
      });

    //console.log(props);
    // navigate("/" + route);
    navigate("/" + route, {
      state: { IrtObj: irtRoleObj },
    });
    //  }
  };

  // data.id,
  //   data.pdf_id,
  //   data.route_location,
  //   data.campaign,
  //   data.creator,
  //   data.discription,
  //   data.subject,
  //   data.tags;



  useEffect(() => {
    getCampaignFiltereData();
  }, [location.pathname]);

  const showDeleteButtons = () => {
    if (deletestatus) {
      setDeleteStatus(false);
    } else {
      setDeleteStatus(true);
    }
  };

  const createNewEmail = async () => {
    props.getDraftData(null);
    props.getSelected(null);
    props.getSelectedSmartListData(null);
    props.getEmailData(null);
    props.getSearched(null)
    if (([3968, 3970, 4521].includes(irtRoleObj?.pdfId)) || irtRoleObj?.pdfId) {
      await navigateRole(irtRoleObj);
      // console.log(irtRoleObj?.pdfId,'irtRoleObj?.pdfId');
    } else {
      navigate("/EmailArticleSelect", {
        state: { IrtObj: irtRoleObj },
      });
    }

  };

  const showConfirmationPopup = (id) => {
    if (confirmationpopup) {
      setConfirmationPopup(false);
    } else {
      setConfirmationPopup(true);
    }
    setDeleteCardId(id);
  };

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };


  const deleteEmail = () => {
    hideConfirmationModal();
    const body = {
      user_id: localStorage.getItem("user_id"),
      campaign_id: deletecardid,
    };
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    axios
      .post(`emailapi/delete_campaign`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          hideConfirmationModal();
          var updatedArray = SendListData.filter(function (item) {
            return item["id"] != deletecardid;
          });
          if (typeof updatedArray !== "undefined") {
            setSendListData(updatedArray);
          }

          var newupdatedArray = getoriginalsendlistdata.filter(function (item) {
            return item["id"] != deletecardid;
          });
          if (typeof newupdatedArray !== "undefined") {
            setOriginalSendListData(newupdatedArray);
          }


          popup_alert({
            visible: "show",
            message: "The Email record has been deleted <br />successfully !",
            type: "success",
            redirect: "",
          });
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
      });
  };

  const handleScroll = (ev) => {
    if (ev.target.scrollTop > 20) {
      document.querySelector("#mail-view").setAttribute("custom-atr", "scroll");
    } else {
      document
        .querySelector("#mail-view")
        .setAttribute("custom-atr", "non-scroll");
    }
  };

  const handleOnFilterTags = (ftag) => {
    let tag_index = filtertags.indexOf(ftag);
    if (tag_index !== -1) {
      filtertags.splice(tag_index, 1);
      setFilterTags(filtertags);
    } else {
      filtertags.push(ftag);
      setFilterTags(filtertags);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("tags")) {
      getfilter.tags = filtertags;
    } else {
      getfilter = Object.assign({ tags: filtertags }, filter);
    }
    setFilter(getfilter);

    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnFilterCreator = (fcreator) => {
    let tag_index = filtercreator.indexOf(fcreator);
    if (tag_index !== -1) {
      filtercreator.splice(tag_index, 1);
      setFilterCreators(filtercreator);
    } else {
      filtercreator.push(fcreator);
      setFilterCreators(filtercreator);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("creator")) {
      getfilter.creator = filtercreator;
    } else {
      getfilter = Object.assign({ creator: filtercreator }, filter);
    }
    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnFilterDate = (fdate) => {
    let tag_index = filterdate.indexOf(fdate);
    if (tag_index !== -1) {
      filterdate.splice(tag_index, 1);
      setFilterDate(filterdate);
    } else {
      filterdate.push(fdate);
      setFilterDate(filterdate);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("date")) {
      getfilter.date = filterdate;
    } else {
      getfilter = Object.assign({ date: filterdate }, filter);
    }
    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnFilterRole = (role) => {
    let tag_index = filterrole.indexOf(role);
    if (role == "No IRT") {
      if (tag_index !== -1) {
        filterrole.splice(tag_index, 1);
        setFilterRole(filterrole);
      } else {
        filterrole.length = 0;
        filterrole.push(role);
        setFilterRole(filterrole);
      }
    } else {
      //TO REMOVE THE NO IRT OPTION
      const index = filterrole.indexOf('No IRT');
      if (index !== -1) {
        filterrole.splice(index, 1);
      }



      if (tag_index !== -1) {
        filterrole.splice(tag_index, 1);
        setFilterRole(filterrole);
      } else {
        filterrole.push(role);
        setFilterRole(filterrole);
      }
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("role")) {
      getfilter.role = filterrole;
    } else {
      getfilter = Object.assign({ role: filterrole }, filter);
    }
    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnFilterCampaign = (fcampaign) => {
    let tag_index = filtercampaign.indexOf(fcampaign);
    if (tag_index !== -1) {
      filtercampaign.splice(tag_index, 1);
      setFilterCampaigns(filtercampaign);
    } else {
      filtercampaign.push(fcampaign);
      setFilterCampaigns(filtercampaign);
    }

    let getfilter = filter;
    if (getfilter.hasOwnProperty("campaign")) {
      getfilter.campaign = filtercampaign;
    } else {
      getfilter = Object.assign({ campaign: filtercampaign }, filter);
    }
    setFilter(getfilter);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const clearFilter = () => {
    setloadmore(0);
    document.querySelectorAll("input").forEach((checkbox) => {
      checkbox.checked = false;
    });
    document.getElementById("email_search").value = "";
    setSearch("");
    setFilterTags([]);
    setFilterCreators([]);
    setFilterDate([]);
    setFilterRole([]);
    setFilterCampaigns([]);
    setFilter([]);
    let up = updateflag + 1;
    setUpdateFlag(up);
    if (filterapplied) {
      setSendListData(getoriginalsendlistdata);
    }
    setShowFilter(false);
  };

  const applyFilter = () => {
    setloadmore(0);
    setFilterApply(true);
    getData("progress");
    setShowFilter(false);
  };

  const removeindividualfilter = (src, item) => {
    // setRemoveFlag(true);
    loader("show");
    setloadmore(0);
    if (src == "tag") {
      handleOnFilterTags(item);
    } else if (src == "campaign") {
      handleOnFilterCampaign(item);
    } else if (src == "date") {
      handleOnFilterDate(item);
    } else if (src == "role") {
      handleOnFilterRole(item);
    } else if (src == "creator") {
      handleOnFilterCreator(item);
    }
    if (filterapplied) {
      getData("progress");
    } else {
      loader("hide");
    }
    setShowFilter(false);
  };

  const draftEmailCampaign = (draftContent) => {
    setDraftCamapignId(draftContent);
  };

  const sendDraftMail = async () => {
    setDraftEmailSendStatus(false);
    const body = {
      user_id: localStorage.getItem("user_id"),
      campaign_id: getDraftCamapignId,
    };
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/get_campaign_details`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          let draft_campaign = res.data.response.data;
          let finalTags = draft_campaign.tags.map((tags) => {
            return tags.innerHTML || tags;
          });

          let user_list = draft_campaign.campaign_data.selectedHcp.map(
            (userId) => {
              return userId.profile_user_id || userId.user_id;
            }
          );

          const body = {
            user_id: localStorage.getItem("user_id"),
            route_location: "VerifyMAIL",
            pdf_id: draft_campaign.pdf_id,
            subject: draft_campaign.subject,
            description: draft_campaign?.description
              ? draft_campaign.description
              : "",
            creator: draft_campaign?.creator ? draft_campaign.creator : "",
            campaign_name: draft_campaign.campaign,
            tags: finalTags,
            template_source_code: draft_campaign.source_code,
            campaign_id: getDraftCamapignId,
            campaign_data: {
              user_list: user_list,
              smart_list_id: draft_campaign.smart_list_data.id,
              template_id: draft_campaign.campaign_data.template_id,
            },
          };
          axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
          axios
            .post(`emailapi/send_email`, body)
            .then((res) => {
              loader("hide");
              if (res.data.status_code === 200) {
                getData("initial");
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
        } else {
          loader("hide");
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
      });
  };

  const load_more = () => {
    getData("progress", 2);
    setloadmore(1);
  };

  const getReaderData = async (type = "", name = "", color_code = "", dynamic_name = "", page = 1) => {
    const body = {
      user_id: localStorage.getItem("user_id"),
      campaign_id: viewEmailData?.[0]?.id,
      pdf_id: viewEmailData?.[0]?.pdf_id,
      name: dynamic_name,
      type: type,
      page: page
    };
    setviewEmailModal(false);
    setFunctionParameter({
      type, name, color_code, dynamic_name, page
    })
    // console.log(functionParameter?.page)
    // if(type == "ctr"){
    //   setDetailPopupName(name);
    // }else{
    setDetailPopupName(name);
    // }
    setPopupHeadingColor(color_code);
    loader("show");
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    await axios
      .post(`emailapi/get_article_readers`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          loader("hide");
          if (res?.data?.response?.data) {
            let temporaryUsers = [...readerDetailsData, ...res?.data?.response?.data];
            setReaderDetailsData(temporaryUsers);
          }
          setReaderDetailsCount(res?.data?.response?.count || 0);
          setReaderDetailsPopupStatus(true);
        } else {
          loader("hide");
          setReaderDetailsData([]);
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
      });
  };

  const dynamicSort = (key, direction) => (a, b) => {
    // Function to get the value of a nested key
    const getNestedValue = (obj, keys) => {
      for (const key of keys) {
        obj = obj?.[key];
      }
      return obj;
    };

    // If key is a string, split it into an array of keys
    // const keys = typeof key === 'string' ? key.split('.') : [key];
    const keys = [key]
    const valueA = getNestedValue(a, keys);
    const valueB = getNestedValue(b, keys);

    if (direction === 'asc') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  };

  const userSort = (e, key) => {
    const direction = sortNameDirection === 0 ? 'asc' : 'dec';

    const sortedUserData = [...readerDetailsData].sort(dynamicSort(key, direction));

    setReaderDetailsData(sortedUserData);
    setSortNameDirection(sortNameDirection === 0 ? 1 : 0);
    setIsActive({ [key]: direction === 'asc' ? 'dec' : 'asc' });
    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
  };

  const navigateRole = async (irtObj) => {
    try {
      const body = {
        user_id: localStorage.getItem("user_id"),
        pdf_id: irtObj?.pdfId,
        role: irtObj?.siteRole
      };
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`emailapi/get_rd_campaign_data`, body)
        .then((res) => {
          if (res.data.status_code == 200) {
            let campaign_data = res?.data?.response?.data;
            props.getEmailData(campaign_data);
          } else {
            toast.warning(res.data.message);
          }
          loader("hide");
        })
        .catch((err) => {
          loader("hide");
          toast.error("Something went wrong");
        });
      navigate("/VerifyHCP", {
        state: { IrtObj: irtRoleObj, NextFlag: 1 },
      });
    } catch (err) {
      loader("hide");
      console.log(err, 'err');
    }
  }


  return (
    <>

      <Col className="right-sidebar custom-change" key={location.pathname}>
        <div className="custom-container" key={location.pathname}>
          <Row>
            <div className="top-header sticky">
              <div className="page-title"> {irtRoleObj?.IRTFlag ?
                (<>
                  <Link
                    className="btn btn-primary btn-bordered back-btn"
                    to="/IRTRole"
                  >
                    <svg
                      width="14"
                      height="24"
                      viewBox="0 0 14 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z"
                        fill="#97B6CF"
                      />
                    </svg>
                  </Link>
                  <h2>{irtRoleObj?.siteRole}</h2>
                </>)
                : <h2>Emails</h2>}</div>
              <div className="top-right-action">
                <div className="search-bar">
                  <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search by campaign or creator"
                      aria-label="Search"
                      id="email_search"
                      onChange={(e) => searchChange(e)}
                    />
                    <button className="btn btn-outline-success" type="submit">
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
                    className="btn btn-secondary dropdown"
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
                  {/*Code for show filters*/}
                  {showfilter && (
                    <div
                      ref={filterRef}
                      className="dropdown-menu filter-options"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <h4>Filter By</h4>
                      <Accordion defaultActiveKey="0" flush>
                        {filterdata.hasOwnProperty("tags") &&
                          filterdata.tags.length > 0 && (
                            <Accordion.Item className="card" eventKey="0">
                              <Accordion.Header className="card-header">
                                Tags
                              </Accordion.Header>
                              <Accordion.Body className="card-body">
                                <ul>
                                  {Object.entries(filterdata.tags).map(
                                    ([index, item]) => (
                                      <li>
                                        {item != "" ? (
                                          <label className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-tags-${index}`}
                                              name="tags[]"
                                              value={item}
                                              checked={
                                                updateflag > 0 &&
                                                typeof filtertags !==
                                                "undefined" &&
                                                filtertags.indexOf(item) !== -1
                                              }
                                              onChange={() =>
                                                handleOnFilterTags(item)
                                              }
                                            />
                                            {item}
                                            <span className="checkmark"></span>
                                          </label>
                                        ) : null}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </Accordion.Body>
                            </Accordion.Item>
                          )}

                        {filterdata.hasOwnProperty("creators") &&
                          filterdata.creators.length > 0 && (
                            <Accordion.Item className="card" eventKey="1">
                              <Accordion.Header className="card-header">
                                Creator
                              </Accordion.Header>
                              <Accordion.Body className="card-body">
                                <ul>
                                  {Object.entries(filterdata.creators).map(
                                    ([index, item]) => (
                                      <li>
                                        <label className="select-multiple-option">
                                          <input
                                            type="checkbox"
                                            id={`custom-checkbox-creator-${index}`}
                                            name="creator[]"
                                            value={item}
                                            checked={
                                              updateflag > 0 &&
                                              typeof filtercreator !==
                                              "undefined" &&
                                              filtercreator.indexOf(item) !== -1
                                            }
                                            onChange={() =>
                                              handleOnFilterCreator(item)
                                            }
                                          />
                                          {item}
                                          <span className="checkmark"></span>
                                        </label>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </Accordion.Body>
                            </Accordion.Item>
                          )}
                        {filterdata.hasOwnProperty("created") &&
                          filterdata.created.length > 0 && (
                            <Accordion.Item className="card" eventKey="2">
                              <Accordion.Header className="card-header">
                                Date
                              </Accordion.Header>
                              <Accordion.Body className="card-body">
                                <ul>
                                  {Object.entries(filterdata.created).map(
                                    ([index, item]) => (
                                      <li>
                                        <label className="select-multiple-option">
                                          <input
                                            type="checkbox"
                                            id={`custom-checkbox-date-${index}`}
                                            name="date[]"
                                            value={item}
                                            checked={
                                              updateflag > 0 &&
                                              typeof filterdate !==
                                              "undefined" &&
                                              filterdate.indexOf(item) !== -1
                                            }
                                            onChange={() =>
                                              handleOnFilterDate(item)
                                            }
                                          />
                                          {item}
                                          <span className="checkmark"></span>
                                        </label>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </Accordion.Body>
                            </Accordion.Item>
                          )}
                        {
                          (localStorage.getItem('user_id') != '56Ek4feL/1A8mZgIKQWEqg==' && localStorage.getItem('user_id') !== "sNl1hra39QmFk9HwvXETJA==") ?
                            <Accordion.Item className="card" eventKey="3">
                              <Accordion.Header className="card-header">
                                Campaign
                              </Accordion.Header>
                              <Accordion.Body className="card-body">
                                <ul>
                                  <li>
                                    <label className="select-multiple-option">
                                      <input
                                        type="checkbox"
                                        id={`custom-checkbox-campaign-0`}
                                        name="campaign[]"
                                        value="Sent"
                                        checked={
                                          updateflag > 0 &&
                                          typeof filtercampaign !== "undefined" &&
                                          filtercampaign.indexOf(1) !== -1
                                        }
                                        onChange={() => handleOnFilterCampaign(1)}
                                      />
                                      Sent
                                      <span className="checkmark"></span>
                                    </label>
                                  </li>
                                  <li>
                                    <label className="select-multiple-option">
                                      <input
                                        type="checkbox"
                                        id={`custom-checkbox-campaign-1`}
                                        name="campaign[]"
                                        value="Draft"
                                        checked={
                                          updateflag > 0 &&
                                          typeof filtercampaign !== "undefined" &&
                                          filtercampaign.indexOf(2) !== -1
                                        }
                                        onChange={() => handleOnFilterCampaign(2)}
                                      />
                                      Draft
                                      <span className="checkmark"></span>
                                    </label>
                                  </li>
                                  <li>
                                    <label className="select-multiple-option">
                                      <input
                                        type="checkbox"
                                        id={`custom-checkbox-campaign-2`}
                                        name="campaign[]"
                                        value="draft-approved"
                                        checked={
                                          updateflag > 0 &&
                                          typeof filtercampaign !== "undefined" &&
                                          filtercampaign.indexOf(3) !== -1
                                        }
                                        onChange={() => handleOnFilterCampaign(3)}
                                      />
                                      Draft Approved
                                      <span className="checkmark"></span>
                                    </label>
                                  </li>
                                </ul>
                              </Accordion.Body>
                            </Accordion.Item>
                            :

                            filterdata.hasOwnProperty("IRT_roles") &&
                            filterdata.IRT_roles.length > 0 && (
                              <Accordion.Item className="card" eventKey="3">
                                <Accordion.Header className="card-header">
                                  IRT Roles
                                </Accordion.Header>
                                <Accordion.Body className="card-body">
                                  <ul>
                                    {Object.entries(filterdata.IRT_roles).map(
                                      ([index, item]) => (
                                        <li>
                                          <label className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-IRT_roles-${index}`}
                                              name="IRT_roles[]"
                                              value={item}
                                              checked={
                                                updateflag > 0 &&
                                                typeof filterrole !==
                                                "undefined" &&
                                                filterrole.indexOf(item) !== -1
                                              }
                                              onChange={() =>
                                                handleOnFilterRole(item)
                                              }
                                            />
                                            {item}
                                            <span className="checkmark"></span>
                                          </label>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </Accordion.Body>
                              </Accordion.Item>
                            )
                        }


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

                  {/*
                 <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                     <li><a className="dropdown-item" href="#">Filter1 <img src={path + "filter-close.svg"} alt="Close-filter" /></a></li>
                     <li><a className="dropdown-item" href="#">Filter2 <img src={path + "filter-close.svg"} alt="Close-filter" /></a></li>
                     <li><a className="dropdown-item" href="#">Filter3 <img src={path + "filter-close.svg"} alt="Close-filter" /></a></li>
                 </ul>
                 */}
                </div>
                <div className="clear-search">
                  {deletestatus ? (
                    <button
                      className="btn btn-outline-primary cancel"
                      onClick={(e) => showDeleteButtons()}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      // className="btn btn-outline-primary"
                      className={`btn btn-outline-primary ${isRND ? "rd" : ""}`}
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
                          fill={deletButtonColor}
                        />
                        <path
                          d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                          fill={deletButtonColor}
                        />
                        <path
                          d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                          fill={deletButtonColor}
                        />
                        <path
                          d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                          fill={deletButtonColor}
                        />
                        <path
                          d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                          fill={deletButtonColor}
                        />
                        <path
                          d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                          fill={deletButtonColor}
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            {updateflag > 0 &&
              (filtertags.length > 0 ||
                filtercreator.length > 0 ||
                filterdate.length > 0 ||
                filterrole.length > 0 ||
                filtercampaign.length > 0) && (
                <div className="apply-filter">
                  <h6>Applied filters</h6>
                  <div className="filter-block">
                    <div className="filter-block-left full">
                      {filtertags.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Tags |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(filtertags).map(([index, item]) => (
                              <div
                                className="filter-result"
                                onClick={(event) =>
                                  removeindividualfilter("tag", item)
                                }
                              >
                                {item}
                                <img
                                  src={path_image + "filter-close.svg"}
                                  alt="Close-filter"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {filtercreator.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Creator |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(filtercreator).map(
                              ([index, item]) => (
                                <div
                                  className="filter-result"
                                  onClick={(event) =>
                                    removeindividualfilter("creator", item)
                                  }
                                >
                                  {item}
                                  <img
                                    src={path_image + "filter-close.svg"}
                                    alt="Close-filter"
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {filterdate.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Date |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(filterdate).map(([index, item]) => (
                              <div
                                className="filter-result"
                                onClick={(event) =>
                                  removeindividualfilter("date", item)
                                }
                              >
                                {item}
                                <img
                                  src={path_image + "filter-close.svg"}
                                  alt="Close-filter"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {filterrole.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>IRT Roles |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(filterrole).map(([index, item]) => (
                              <div
                                className="filter-result"
                                onClick={(event) =>
                                  removeindividualfilter("role", item)
                                }
                              >
                                {item}
                                <img
                                  src={path_image + "filter-close.svg"}
                                  alt="Close-filter"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {filtercampaign.length > 0 && (
                        <div className="filter-div">
                          <div className="filter-div-title">
                            <span>Campaign |</span>
                          </div>
                          <div className="filter-div-list">
                            {Object.entries(filtercampaign).map(
                              ([index, item]) => (
                                <div
                                  className="filter-result"
                                  onClick={(event) =>
                                    removeindividualfilter("campaign", item)
                                  }
                                >
                                  {item == 3
                                    ? "Draft Approved"
                                    : item == 2
                                      ? "Draft"
                                      : "Sent"}
                                  <img
                                    src={path_image + "filter-close.svg"}
                                    alt="Close-filter"
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
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
              )}
            <div
              className={`email-result ${isRND ? "rd" : ""}`}
            >
              <div className="col email-result-block">
                {filtertags.length == 0 &&
                  filtercreator.length == 0 &&
                  filterdate.length == 0 &&
                  filterrole.length == 0 &&
                  filtercampaign.length == 0 &&
                  !deletestatus && (
                    <div className="email_box_block">
                      <div className="email-block-add">
                        {/* <Link to="/EmailArticleSelect" onClick={createNewEmail}> */}
                        <button onClick={createNewEmail}>
                          <img src={path_image + "add-button.svg"} alt="" />
                        </button>
                        {/* </Link> */}
                        <p>Create New Email</p>
                      </div>
                    </div>
                  )}

                {SendListData.length > 0 ? (
                  SendListData.map((data) => {
                    return (
                      <>
                        <div className="email_box_block">
                          <div
                            className={
                              "email_box " +
                              ((data?.status == 5)
                                ? "queue" :
                                data.status == 1
                                  ? "approved"
                                  : data.status == 2
                                    ? "email-draft"
                                    : "draft-approved")
                            }
                          >
                            <div className="mail-top-title">

                              <span>
                                {(data?.status == 5)
                                  ? "Sending in queue" :
                                  data.status == 2 ? "Draft" : "Approved Draft"
                                }
                              </span>
                            </div>
                            <div className="mail-box-content">
                              <div className="mail-box-content-top">
                                <div className="mail-box-content-top-view">
                                  {
                                    data?.resend_badge >= 2 ?
                                      <div className="mail-resend" title="Resend Emails">
                                        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g id="Glyph"><g data-name="Glyph" id="Glyph-2"><path d="M49,35a8,8,0,0,0-3.17.66l.12-.34a1,1,0,1,0-1.9-.64l-1,3a1,1,0,0,0,.58,1.25l2.5,1a1,1,0,0,0,.74-1.86l-.76-.3A6,6,0,1,1,43,43a1,1,0,0,0-2,0,8,8,0,1,0,8-8Z" fill="#0066be" /><path d="M56,32.06V16.23A8.24,8.24,0,0,0,47.77,8H10.23A8.24,8.24,0,0,0,2,16.23V37.77A8.24,8.24,0,0,0,10.23,46H36.36A13,13,0,1,0,56,32.06ZM34.19,27.64a8.11,8.11,0,0,1-10.37,0L6.63,42.86A6.38,6.38,0,0,1,5.2,41.45l17.09-15.1L5.52,12.15a6.56,6.56,0,0,1,1.57-1.3L25,26a6.14,6.14,0,0,0,8,0L50.91,10.85a6.56,6.56,0,0,1,1.57,1.3L35.74,26.33l6.51,5.56a12.46,12.46,0,0,0-1.67,1.21ZM49,54A11,11,0,1,1,60,43,11,11,0,0,1,49,54Z" fill="#0066be" /></g></g></svg>
                                        <span>{data?.resend_badge - 1}</span>
                                      </div>
                                      : null
                                  }
                                  <h5>{data.subject}</h5>
                                  <p>{data.description}</p>
                                  <div className="mailbox-table">
                                    <table>
                                      <tbody>
                                        <tr>
                                          <th>Campaign</th>
                                          <td>{data.campaign}</td>
                                        </tr>
                                        <tr>
                                          <th>Creator</th>
                                          <td>{data.creator}</td>
                                        </tr>
                                        <tr>
                                          <th>List</th>
                                          <td>{data.smart_list_name}</td>
                                        </tr>
                                        {(localStorage.getItem("user_id") ==
                                          "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem('user_id') == "sNl1hra39QmFk9HwvXETJA==") ? (<>
                                            <tr>
                                              <th>Site</th>
                                              {/* <td>
                                                {data?.unique_site_numbers && data?.unique_site_numbers.filter(item => item).length > 0 && data?.unique_site_numbers.filter(item => item).length <= 10
                                                  ? data?.unique_site_numbers.filter(item => item).join(', ')
                                                  : 'N/A'}
                                              </td> */}

                                              <td>
                                                {
                                                  data?.unique_site_numbers && data?.unique_site_numbers.filter(item => item).length === 0
                                                    ? 'N/A'
                                                    : data?.unique_site_numbers.filter(item => item).slice(0, 10).join(', ')
                                                }
                                              </td>
                                            </tr>
                                            {/* <tr>
                                        <th>IRTs</th>
                                        <td>
                                        {data?.unique_site_names && data?.unique_site_names.filter(item => item).length > 0 && data?.unique_site_names.filter(item => item).length <= 10 
                                          ? data?.unique_site_names.filter(item => item).join(', ') 
                                          : 'N/A'}
                                        </td>
                                      </tr> */}
                                            {/* <tr>
  <th>IRTs</th>
  <td>
    {data?.unique_user_types ? data.unique_user_types.length : 0}
  </td>
</tr> */}

                                          </>) : ''}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="mailbox-tags">
                                    <ul>
                                      {data.tags != "" ? (
                                        data.tags.map((tag) => {
                                          return <li className="list1">{tag}</li>;
                                        })
                                      ) : (
                                        <li className="list1">N/A</li>
                                      )}
                                    </ul>
                                  </div>
                                  <div className="mail-time">
                                    <span>{data.created_at}</span>
                                  </div>
                                </div>
                                <div className="mail-stats">
                                  <ul>
                                    {isRND && <li>
                                      <div
                                        className="mail-status irts"
                                        title="IRTs"
                                      >
                                        {
                                          irtRoleObj?.siteRole == 'Site User-Blinded' ?
                                            <svg width="16" height="16" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M22.1566 0.124657C22.2871 -0.0260567 22.5152 -0.0424006 22.6659 0.088152C22.8166 0.218705 22.8329 0.446716 22.7024 0.59743L21.9963 1.41251C22.7411 1.74814 23.4112 2.31381 23.964 3.0492C24.0395 3.14984 24.0395 3.28898 23.964 3.38962C23.0404 4.61664 21.7897 5.37002 20.4103 5.37002C19.8684 5.37002 19.3463 5.25353 18.8562 5.0376L18.1305 5.87534C18 6.02606 17.7719 6.0424 17.6212 5.91185C17.4705 5.7813 17.4542 5.55328 17.5847 5.40257L22.1566 0.124657ZM20.9576 2.61168L21.4168 2.08155C21.7536 2.37965 21.9569 2.82511 21.9259 3.3171C21.8771 4.07196 21.2643 4.68473 20.5094 4.73357C20.0967 4.75958 19.7167 4.62066 19.429 4.37638L19.8881 3.84631C20.0423 3.97451 20.2443 4.04715 20.4632 4.03334C20.8702 4.00818 21.2003 3.67811 21.2255 3.27108C21.242 3.00957 21.1351 2.77224 20.9576 2.61168ZM20.3126 1.70377C20.3478 1.70155 20.3827 1.70053 20.4174 1.70068L20.9401 1.10332C20.7659 1.07854 20.5892 1.06584 20.4103 1.06584C19.0308 1.06584 17.7801 1.81922 16.8565 3.04624C16.781 3.14688 16.781 3.28602 16.8565 3.38666C17.186 3.82498 17.5572 4.20301 17.961 4.50796L18.9071 3.42668C18.8935 3.32728 18.8895 3.22481 18.8961 3.12024C18.9435 2.36538 19.5562 1.75113 20.3126 1.70377ZM10.1885 13.8442C13.3208 13.8442 15.86 11.2823 15.86 8.12209C15.86 4.96187 13.3208 2.4 10.1885 2.4C7.05624 2.4 4.51702 4.96187 4.51702 8.12209C4.51702 11.2823 7.05624 13.8442 10.1885 13.8442ZM15.3671 13.8776C15.0171 13.7856 14.657 13.7193 14.2876 13.6859C14.2601 14.9246 10.2009 17.9823 10.2009 17.9823C10.2009 17.9823 6.14066 14.9256 6.11315 13.6854C5.70305 13.7234 5.30365 13.7995 4.91801 13.9079L3.69128 14.3911C1.5012 15.5095 -0.00012207 17.8029 -0.00012207 20.4509C-0.00012207 23.835 2.45028 24 5.65772 24C5.83006 24 6.0045 23.9995 6.18093 23.999L6.18294 23.999C6.36413 23.9985 6.5474 23.9979 6.73263 23.9979H13.6661C13.8509 23.9979 14.0338 23.9985 14.2148 23.999L14.2164 23.999C14.393 23.9995 14.5677 24 14.7405 24C17.9485 24 20.3999 23.835 20.3999 20.4509C20.4004 17.7757 18.867 15.4617 16.6387 14.3541L15.3671 13.8776ZM17.2852 20.2664C17.2852 20.3548 17.2062 20.4263 17.1084 20.4263H16.1491V21.3941C16.1491 21.4923 16.0783 21.573 15.9912 21.573H15.0447C14.9576 21.573 14.8868 21.4933 14.8868 21.3941V20.4263H13.9275C13.8307 20.4263 13.7512 20.3548 13.7512 20.2664V19.3119C13.7512 19.2235 13.8307 19.1526 13.9275 19.1526H14.8868V18.1843C14.8868 18.0861 14.9576 18.0054 15.0447 18.0054H15.9912C16.0778 18.0054 16.1491 18.0851 16.1491 18.1843V19.1526H17.1084C17.2062 19.1526 17.2852 19.2235 17.2852 19.3119V20.2664Z" fill="#C8D1D9" />
                                            </svg>
                                            : irtRoleObj?.siteRole == 'Investigator-Blinded' ?
                                              <svg width="16" height="16" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.1566 0.124657C22.2871 -0.0260567 22.5152 -0.0424006 22.6659 0.088152C22.8166 0.218705 22.8329 0.446716 22.7024 0.59743L21.9963 1.41251C22.7411 1.74814 23.4112 2.31381 23.964 3.0492C24.0395 3.14984 24.0395 3.28898 23.964 3.38962C23.0404 4.61664 21.7897 5.37002 20.4103 5.37002C19.8684 5.37002 19.3463 5.25353 18.8562 5.0376L18.1305 5.87534C18 6.02606 17.7719 6.0424 17.6212 5.91185C17.4705 5.7813 17.4542 5.55328 17.5847 5.40257L22.1566 0.124657ZM20.9576 2.61168L21.4168 2.08155C21.7536 2.37965 21.9569 2.82511 21.9259 3.3171C21.8771 4.07196 21.2643 4.68473 20.5094 4.73357C20.0967 4.75958 19.7167 4.62066 19.429 4.37638L19.8881 3.84631C20.0423 3.97451 20.2443 4.04715 20.4632 4.03334C20.8702 4.00818 21.2003 3.67811 21.2255 3.27108C21.242 3.00957 21.1351 2.77224 20.9576 2.61168ZM20.3126 1.70377C20.3478 1.70155 20.3827 1.70053 20.4174 1.70068L20.9401 1.10332C20.7659 1.07854 20.5892 1.06584 20.4103 1.06584C19.0308 1.06584 17.7801 1.81922 16.8565 3.04624C16.781 3.14688 16.781 3.28602 16.8565 3.38666C17.186 3.82498 17.5572 4.20301 17.961 4.50796L18.9071 3.42668C18.8935 3.32728 18.8895 3.22481 18.8961 3.12024C18.9435 2.36538 19.5562 1.75113 20.3126 1.70377ZM10.2794 13.8442C13.4396 13.8442 16.0015 11.2823 16.0015 8.12209C16.0015 4.96187 13.4396 2.4 10.2794 2.4C7.11918 2.4 4.55732 4.96187 4.55732 8.12209C4.55732 11.2823 7.11918 13.8442 10.2794 13.8442ZM16.7871 14.3541C17.0056 14.8572 17.1325 15.473 17.1603 16.1854C17.8958 16.3535 18.4468 17.0114 18.4468 17.7978C18.4468 18.7106 17.7041 19.4538 16.7912 19.4538C15.8784 19.4538 15.1357 18.7116 15.1357 17.7978C15.1357 17.0216 15.6743 16.3699 16.397 16.1926C16.3651 15.4848 16.196 14.4085 15.5042 13.8776C15.1511 13.7856 14.7877 13.7193 14.4151 13.6859C14.3873 14.9246 10.2919 17.9823 10.2919 17.9823C10.2919 17.9823 6.19544 14.9256 6.16769 13.6854C5.75393 13.7234 5.35097 13.7995 4.96188 13.9079C4.45664 14.3078 4.19553 15.0531 4.18217 16.136C4.33071 16.2214 4.45047 16.3545 4.52448 16.5154C5.06828 16.7724 5.54937 17.3131 5.91687 18.0825C5.97854 18.212 5.98625 18.3585 5.94102 18.4921C6.16152 19.0596 6.28745 19.681 6.28745 20.2006C6.28745 20.9315 6.28745 21.6218 5.4918 21.7986C5.40545 21.8711 5.29803 21.9101 5.18444 21.9101H4.65246C4.38571 21.9101 4.1688 21.6922 4.1688 21.4265L4.17035 21.3926C4.18834 21.1428 4.39958 20.9428 4.65246 20.9428H5.18444C5.23841 20.9428 5.29186 20.9526 5.34326 20.9701C5.37564 20.9608 5.38592 20.9541 5.38592 20.9541C5.44554 20.8493 5.44554 20.4119 5.44554 20.2022C5.44554 19.7792 5.33915 19.2683 5.1536 18.7928C5.05748 18.7389 4.97987 18.6551 4.93156 18.5554C4.60929 17.8805 4.17086 17.4441 3.81416 17.4441C3.45025 17.4441 2.98973 17.9155 2.66848 18.616C2.61606 18.7311 2.52405 18.8237 2.41098 18.8797C2.24342 19.3341 2.15142 19.8018 2.15142 20.2022C2.15142 20.3785 2.15142 20.8462 2.21875 20.9562L2.21975 20.9567C2.22371 20.9587 2.23977 20.9668 2.27631 20.9757C2.33131 20.9546 2.39042 20.9433 2.44953 20.9433H2.98201C3.22821 20.9433 3.43381 21.1289 3.46208 21.371L3.46465 21.3761L3.46567 21.4085C3.46567 21.6943 3.24877 21.9117 2.98201 21.9117H2.45004C2.34416 21.9117 2.24188 21.8767 2.1581 21.812C1.85382 21.7554 1.63949 21.6208 1.50328 21.4023C1.33932 21.1376 1.309 20.7917 1.309 20.2027C1.309 19.6861 1.42824 19.092 1.64463 18.5245C1.61276 18.4032 1.62304 18.2763 1.67649 18.1611C1.90162 17.6682 2.18894 17.2468 2.50555 16.9404C2.67928 16.7729 2.86688 16.6382 3.06271 16.539C3.13621 16.3673 3.26368 16.228 3.4189 16.1386C3.42713 15.4602 3.53146 14.8737 3.72421 14.3911C1.51459 15.5095 -0.00012207 17.8029 -0.00012207 20.4509C-0.00012207 23.835 2.47214 24 5.70819 24C5.88207 24 6.05807 23.9995 6.23607 23.999L6.2381 23.999C6.42091 23.9985 6.60581 23.9979 6.79269 23.9979H13.788C13.9745 23.9979 14.159 23.9985 14.3416 23.999C14.5203 23.9995 14.6971 24 14.872 24C18.1086 24 20.5819 23.835 20.5819 20.4509C20.5824 17.7757 19.0353 15.4617 16.7871 14.3541ZM15.6394 21.1664C15.6394 21.2548 15.5597 21.3263 15.461 21.3263H14.4932V22.2941C14.4932 22.3923 14.4218 22.473 14.3339 22.473H13.3789C13.291 22.473 13.2196 22.3933 13.2196 22.2941V21.3263H12.2517C12.1541 21.3263 12.0739 21.2548 12.0739 21.1664V20.2119C12.0739 20.1235 12.1541 20.0526 12.2517 20.0526H13.2196V19.0843C13.2196 18.9861 13.291 18.9054 13.3789 18.9054H14.3339C14.4212 18.9054 14.4932 18.9851 14.4932 19.0843V20.0526H15.461C15.5597 20.0526 15.6394 20.1235 15.6394 20.2119V21.1664ZM17.5545 17.7977C17.5545 18.2196 17.2125 18.5615 16.7907 18.5615C16.3689 18.5615 16.0269 18.2196 16.0269 17.7977C16.0269 17.3759 16.3689 17.034 16.7907 17.034C17.2125 17.034 17.5545 17.3759 17.5545 17.7977Z" fill="#C8D1D9" />
                                              </svg>
                                              : irtRoleObj?.siteRole == 'Site unblinded pharmacist' ?
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7795 6.35788C17.7795 9.86924 14.9329 12.7158 11.4216 12.7158C7.91022 12.7158 5.0637 9.86924 5.0637 6.35788C5.0637 2.84652 7.91022 0 11.4216 0C14.9329 0 17.7795 2.84652 17.7795 6.35788ZM5.51322 12.7866L4.13802 13.3234C1.68289 14.5661 -0.00012207 17.1143 -0.00012207 20.0566C-0.00012207 23.8167 2.74684 24 6.34245 24C6.53616 24 6.73292 23.9994 6.93124 23.9989C7.13435 23.9983 7.33981 23.9977 7.54745 23.9977H15.32C15.5273 23.9977 15.7323 23.9983 15.9351 23.9989H15.9354C16.1338 23.9994 16.3302 24 16.5245 24C16.7361 24 16.9449 23.9994 17.1503 23.9974C16.3084 23.7238 15.6999 22.9329 15.6999 21.9998V18.3998C15.6999 17.24 16.6401 16.2998 17.7999 16.2998C18.8524 16.2998 19.7241 17.0741 19.8763 18.0841C20.229 17.9647 20.6069 17.8999 20.9999 17.8999C21.6042 17.8999 22.1728 18.0531 22.6689 18.3227C22.1478 16.1059 20.6489 14.266 18.6524 13.2823L17.2269 12.7529C16.8346 12.6507 16.4308 12.577 16.0168 12.5399C15.9859 13.9162 11.4355 17.3136 11.4355 17.3136C11.4355 17.3136 6.88384 13.9173 6.853 12.5393C6.39327 12.5816 5.94554 12.6661 5.51322 12.7866ZM18.6009 23.9485L18.5808 23.9498L18.5959 23.9437L18.6009 23.9485ZM16.4999 18.3982C16.4999 17.6272 17.1019 17 17.8418 17C18.5817 17 19.1837 17.6272 19.1837 18.3982V20.1071H16.4999V18.3982ZM17.8418 23.5042C17.1019 23.5042 16.4999 22.877 16.4999 22.106V20.7078H19.1837V22.106C19.1837 22.877 18.5817 23.5042 17.8418 23.5042ZM19.6807 19.0482V22.222L22.6074 19.1726C21.74 18.5295 20.5852 18.4879 19.6807 19.0482ZM19.2595 23.4835L23.0009 19.5851C24.2581 21.4261 22.9963 24 20.8138 24C20.2681 24 19.723 23.8272 19.2595 23.4835Z" fill="#C8D1D9" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                  <path d="M15.6145 16.4772C17.9554 16.4772 19.8531 14.5795 19.8531 12.2386C19.8531 9.89768 17.9554 8 15.6145 8C13.2736 8 11.3759 9.89768 11.3759 12.2386C11.3759 14.5795 13.2736 16.4772 15.6145 16.4772Z" fill="#C8D1D9"></path>
                                                  <path fill-rule="evenodd" d="M20.435 16.8549C20.5968 17.2276 20.6908 17.6837 20.7114 18.2114C21.2562 18.3359 21.6644 18.8232 21.6644 19.4057C21.6644 20.0819 21.1142 20.6325 20.438 20.6325C19.7619 20.6325 19.2117 20.0827 19.2117 19.4057C19.2117 18.8308 19.6107 18.3481 20.146 18.2167C20.1224 17.6925 19.9972 16.8952 19.4847 16.5019C19.2231 16.4338 18.954 16.3847 18.6779 16.3599C18.6574 17.2775 15.6237 19.5424 15.6237 19.5424C15.6237 19.5424 12.5893 17.2782 12.5688 16.3595C12.2623 16.3877 11.9638 16.4441 11.6756 16.5244C11.3013 16.8206 11.1079 17.3727 11.098 18.1748C11.208 18.238 11.2967 18.3367 11.3516 18.4558C11.7544 18.6462 12.1107 19.0467 12.383 19.6167C12.4286 19.7126 12.4344 19.8211 12.4008 19.9201C12.5642 20.3404 12.6575 20.8007 12.6575 21.1857C12.6575 21.727 12.6575 22.2384 12.0681 22.3693C12.0041 22.423 11.9246 22.452 11.8404 22.452H11.4464C11.2488 22.452 11.0881 22.2905 11.0881 22.0937L11.0892 22.0686C11.1026 21.8835 11.259 21.7354 11.4464 21.7354H11.8404C11.8804 21.7354 11.92 21.7427 11.9581 21.7556C11.982 21.7488 11.9897 21.7438 11.9897 21.7438C12.0338 21.6661 12.0338 21.3421 12.0338 21.1868C12.0338 20.8735 11.955 20.495 11.8176 20.1428C11.7464 20.1029 11.6889 20.0408 11.6531 19.9669C11.4144 19.467 11.0896 19.1438 10.8254 19.1438C10.5558 19.1438 10.2147 19.4929 9.97675 20.0119C9.93791 20.0971 9.86976 20.1657 9.786 20.2072C9.66188 20.5437 9.59373 20.8902 9.59373 21.1868C9.59373 21.3174 9.59373 21.6638 9.64361 21.7453C9.64361 21.7453 9.64376 21.7454 9.64398 21.7455L9.64435 21.7457C9.64728 21.7472 9.65918 21.7532 9.68625 21.7598C9.72699 21.7442 9.77077 21.7358 9.81456 21.7358H10.209C10.3914 21.7358 10.5437 21.8732 10.5646 22.0526L10.5665 22.0564L10.5673 22.0804C10.5673 22.292 10.4066 22.4531 10.209 22.4531H9.81494C9.73651 22.4531 9.66074 22.4272 9.59868 22.3792C9.37329 22.3374 9.21453 22.2376 9.11363 22.0758C8.99218 21.8797 8.96972 21.6235 8.96972 21.1872C8.96972 20.8045 9.05805 20.3644 9.21833 19.9441C9.19473 19.8542 9.20234 19.7602 9.24194 19.6749C9.4087 19.3098 9.62153 18.9976 9.85606 18.7707C9.98474 18.6466 10.1237 18.5468 10.2688 18.4733C10.3232 18.3462 10.4176 18.243 10.5326 18.1767C10.5387 17.6742 10.616 17.2398 10.7588 16.8823C9.12201 17.7107 8 19.4095 8 21.3711C8 23.8778 9.83131 24 12.2284 24C12.3577 24 12.4885 23.9996 12.6209 23.9993C12.7563 23.9989 12.8933 23.9985 13.0317 23.9985H18.2134C18.3516 23.9985 18.4883 23.9989 18.6235 23.9993C18.7559 23.9996 18.8868 24 19.0164 24C21.4139 24 23.2459 23.8778 23.2459 21.3711C23.2463 19.3894 22.1003 17.6753 20.435 16.8549ZM19.5848 21.901C19.5848 21.9665 19.5258 22.0194 19.4527 22.0194H18.7358V22.7364C18.7358 22.8091 18.6829 22.8689 18.6178 22.8689H17.9104C17.8453 22.8689 17.7924 22.8098 17.7924 22.7364V22.0194H17.0754C17.0031 22.0194 16.9437 21.9665 16.9437 21.901V21.194C16.9437 21.1285 17.0031 21.076 17.0754 21.076H17.7924V20.3587C17.7924 20.286 17.8453 20.2262 17.9104 20.2262H18.6178C18.6825 20.2262 18.7358 20.2852 18.7358 20.3587V21.076H19.4527C19.5258 21.076 19.5848 21.1285 19.5848 21.194V21.901Z" fill="#C8D1D9"></path>
                                                  <path d="M20.4377 19.9715C20.7501 19.9715 21.0034 19.7182 21.0034 19.4057C21.0034 19.0933 20.7501 18.84 20.4377 18.84C20.1252 18.84 19.8719 19.0933 19.8719 19.4057C19.8719 19.7182 20.1252 19.9715 20.4377 19.9715Z" fill="#C8D1D9"></path>
                                                </svg>
                                        }



                                      </div>
                                      <span>    {data?.unique_user_types ? data.unique_user_types.length : 0}
                                      </span>
                                    </li>}
                                    <li>
                                      <div
                                        className="mail-status mail_send"
                                        title="Sent Emails"
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <g clipPath="url(#clip0_586_1145)">
                                            <path
                                              d="M9.52404 0.0444336C9.25621 0.125366 9.01122 0.27124 8.80846 0.473999L1.54639 7.73596C1.3396 7.94275 1.19666 8.18957 1.11719 8.45154L8.12279 7.05041L9.52404 0.0444336Z"
                                              fill="#C8D1D9"
                                            />
                                            <path
                                              d="M15.4959 4.72375L11.2462 0.473999C11.0314 0.259277 10.7691 0.108765 10.4826 0.03125L8.98073 7.54077C8.94362 7.72632 8.7986 7.87146 8.61305 7.90857L1.10341 9.41052C1.17958 9.69031 1.32692 9.95471 1.54628 10.1741L1.91957 10.5474L0.137222 12.3297C-0.0457611 12.5128 -0.0457611 12.8096 0.137344 12.9927C0.228897 13.0841 0.34877 13.1299 0.468765 13.1299C0.58876 13.1299 0.708633 13.0841 0.800186 12.9927L2.58253 11.2103L3.33961 11.9674L0.137222 15.1698C-0.0457611 15.3528 -0.0457611 15.6497 0.137344 15.8326C0.228897 15.9242 0.34877 15.97 0.468765 15.97C0.58876 15.97 0.708633 15.9242 0.800186 15.8326L4.00258 12.6302L4.75966 13.3875L2.97743 15.1698C2.79433 15.3528 2.79433 15.6497 2.97743 15.8326C3.06886 15.9242 3.18886 15.97 3.30885 15.97C3.42885 15.97 3.54872 15.9242 3.64027 15.8326L5.42262 14.0504L5.79591 14.4237C6.12062 14.7483 6.55348 14.9271 7.01491 14.9271C7.47633 14.9271 7.90932 14.7483 8.2339 14.4237L15.4959 7.16174C16.1681 6.4895 16.1681 5.39587 15.4959 4.72375Z"
                                              fill="#C8D1D9"
                                            />
                                          </g>
                                          <defs>
                                            <clipPath id="clip0_586_1145">
                                              <rect
                                                width="16"
                                                height="16"
                                                fill="white"
                                              />
                                            </clipPath>
                                          </defs>
                                        </svg>
                                      </div>
                                      <span>{data.total_Sent}</span>
                                    </li>
                                    <li>
                                      <div
                                        className="mail-status mail_view"
                                        title="Opened Emails"
                                      >
                                        <svg
                                          width="14"
                                          height="14"
                                          viewBox="0 0 14 14"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M6.9998 8.43003L0.0498047 4.68503C0.143433 4.30746 0.382451 3.98218 0.714804 3.78003L6.7648 0.560029C6.83687 0.520642 6.91767 0.5 6.9998 0.5C7.08193 0.5 7.16274 0.520642 7.2348 0.560029L13.2598 3.76503C13.4298 3.86532 13.5782 3.99824 13.6967 4.15613C13.8151 4.31402 13.9011 4.49377 13.9498 4.68503L6.9998 8.43003Z"
                                            fill="#C8D1D9"
                                          />
                                          <path
                                            d="M4.8 8.37992L0 11.7399V5.79492L4.8 8.37992Z"
                                            fill="#C8D1D9"
                                          />
                                          <path
                                            d="M8.21499 8.91016L13.77 12.8002C13.6338 13.0138 13.4462 13.1899 13.2243 13.3122C13.0024 13.4345 12.7534 13.4991 12.5 13.5002H1.49998C1.24661 13.4991 0.997559 13.4345 0.775664 13.3122C0.553768 13.1899 0.366136 13.0138 0.22998 12.8002L5.78499 8.91016L6.76499 9.44016C6.8371 9.47941 6.91789 9.49997 6.99999 9.49997C7.08209 9.49997 7.16288 9.47941 7.23499 9.44016L8.21499 8.91016Z"
                                            fill="#C8D1D9"
                                          />
                                          <path
                                            d="M14.0002 5.79492V11.7399L9.2002 8.37992L14.0002 5.79492Z"
                                            fill="#C8D1D9"
                                          />
                                        </svg>
                                      </div>
                                      <span>
                                        {data.total_Opened_pr > 0
                                          ? data.total_Opened_pr + "%"
                                          : 0}{" "}
                                      </span>
                                    </li>
                                    <li>
                                      <div
                                        className="mail-status mail_click"
                                        title="CTR Clicks"
                                      >
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
                                          />
                                          <path
                                            d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z"
                                            fill="#C8D1D9"
                                          />
                                        </svg>
                                      </div>
                                      <span>
                                        {data.total_Click_pr > 0
                                          ? data.total_Click_pr + "%"
                                          : 0}{" "}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              {data.status == 1 ? (
                                <div className="mailbox-buttons">
                                  {!deletestatus && (
                                    <>
                                      <div className="send_new">
                                        <button
                                          className="btn btn-primary btn-bordered send-new"
                                          onClick={() =>
                                            draftNavigate(
                                              data.id,
                                              data.pdf_id,
                                              "SelectHCP",
                                              data.campaign,
                                              data.creator,
                                              data.discription,
                                              data.subject,
                                              data.tags
                                            )
                                          }
                                        >
                                          Send New
                                        </button>
                                      </div>

                                      <div className="mailbox-buttons-list">
                                        {data.total_Opened_pr < 100 ? (
                                          <button
                                            className="btn btn-primary btn-bordered send"
                                            onClick={(e) =>
                                              showModal("resend", data.id)
                                            }
                                          >
                                            Resend
                                          </button>
                                        ) : (
                                          ""
                                        )}

                                        <button
                                          className="btn btn-primary btn-filled edit"
                                          onClick={(e) =>
                                            showViewEmailModal(data.id)
                                          }
                                        >
                                          View
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              ) :
                                data.status == 5 ? (
                                  <div className="mailbox-buttons d-flex justify-content-end">
                                    <button
                                      className="btn btn-primary btn-filled edit"
                                      onClick={(e) =>
                                        showViewEmailModal(data.id)
                                      }
                                    >
                                      View
                                    </button>
                                  </div>
                                ) : (
                                  <div className="mailbox-buttons">
                                    {!deletestatus && (
                                      <div className="mailbox-buttons-list">
                                        {data.route_location == "VerifyMAIL" &&
                                          data.pdf_id != 13 ? (
                                          <button
                                            className="btn btn-primary send btn-bordered"
                                            onClick={() => {
                                              getEmailData(null);
                                              draftEmailCampaign(data.id);
                                              setDraftEmailSendStatus(
                                                (getDraftEmailSendStatus) =>
                                                  !getDraftEmailSendStatus
                                              );
                                            }}
                                          // onClick={(e) => showModal("send", data.id)
                                          >
                                            Send
                                          </button>
                                        ) : (
                                          ""
                                        )}
                                        <button
                                          className="btn btn-primary edit btn-filled"
                                          onClick={() => {
                                            getEmailData(null);
                                            // getSelectedSmartListData(null);
                                            draftNavigate(
                                              data.id,
                                              data.pdf_id,
                                              data.route_location,
                                              data.campaign,
                                              data.creator,
                                              data.discription,
                                              data.subject,
                                              data.tags
                                            );
                                          }}
                                        >
                                          Edit
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              {deletestatus && (
                                <div className="dlt_btn">
                                  <button
                                    onClick={(e) =>
                                      showConfirmationPopup(data.id)
                                    }
                                  >
                                    <img
                                      src={path + "delete.svg"}
                                      alt="Delete Row"
                                    />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="email_box_block no_found">
                    <p>No Data Found</p>
                  </div>
                )}
              </div>
            </div>
          </Row>
        </div>
        {typeof SendListData !== "undefined" &&
          SendListData.length == 32 &&
          getloadmore === 0 && (
            <div className="load_more">
              <button
                className="btn btn-primary btn-filled"
                onClick={load_more}
              >
                Load More
              </button>
            </div>
          )}
      </Col>

      <div>
        <Modal className="modal send-confirm" id="resend-confirm" show={isOpen}>
          <Modal.Header>
            <button
              type="button"
              className="btn-close"
              onClick={hideModal}
            ></button>
          </Modal.Header>

          <Modal.Body>
            <img src={path + "alert.png"} alt="" />
            <h4>
              This email will be sent to everybody who has not opened the email{" "}
            </h4>

            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                data-bs-dismiss="modal"
                onClick={resendemail}
              >
                Yes Please!
              </button>
              {getreference == "resend" ? (
                <button
                  type="button"
                  className="btn btn-primary btn-bordered"
                  onClick={(e) => showViewEmailModal(campaign_id)}
                >
                  View Email
                </button>
              ) : (
                ""
              )}
              <button
                type="button"
                className="btn btn-primary btn-bordered light"
                onClick={hideModal}
              >
                Cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <div>
        <Modal
          id="mail-view"
          show={viewEmailModal}
          onHide={hideEmailModal}
          custom-atr="non-scroll"
        >
          <Modal.Header>
            <h4>Email View</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={hideEmailModal}
            ></button>
          </Modal.Header>

          <Modal.Body onScroll={handleScroll}>
            {typeof viewEmailData !== "undefined" && (
              <div className="modal-body-view">
                <div className="mail-box-content">
                  <div className="mail-box-heading-block">
                    <div className="mail-box-heading">
                      <h5>{viewEmailData[0].subject}</h5>
                      <p>{viewEmailData[0].description}</p>
                    </div>
                    {
                      viewEmailData[0].status != 5
                        ?
                        <div className="mail-view-btn">
                          <button
                            className="btn btn-primary btn-bordered"
                            onClick={(e) => showModal("send", campaign_id)}
                          >
                            Resend
                          </button>
                        </div>
                        : null
                    }
                  </div>
                  <div className="mailbox-table">
                    <table>
                      <tbody>
                        <tr>
                          <th>Campaign</th>
                          <td>{viewEmailData[0].campaign}</td>
                        </tr>
                        <tr>
                          <th>List</th>
                          <td>{viewEmailData[0].smart_list_name}</td>
                        </tr>
                        <tr>
                          <th>Content Title </th>
                          <td>{viewEmailData?.[0]?.article_title ? viewEmailData?.[0]?.article_title : viewEmailData?.[0]?.pdf_title}</td>
                        </tr>
                        <tr>
                          <th>Docintel Link </th>
                          <td>
                            <a
                              href={viewEmailData[0].docintel_link}
                              target="_blank"
                            >
                              {viewEmailData[0].docintel_link}
                            </a>
                          </td>
                        </tr>
                        {
                          (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem('user_id') == "sNl1hra39QmFk9HwvXETJA==") ?
                            <tr>
                              <th>IRTs </th>
                              <td>
                                {viewEmailData[0]?.unique_user_types && viewEmailData[0]?.unique_user_types.filter(item => item).length > 0
                                  ? viewEmailData[0]?.unique_user_types.filter(item => item).join(', ')
                                  : 'N/A'}

                              </td>
                            </tr>
                            : null
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className="mail-time">
                    <span>{viewEmailData[0].created_at}</span>
                  </div>
                  <div className="mailbox-tags">
                    <h6>Tags</h6>
                    <ul>
                      {viewEmailData[0].tags != "" ? (
                        viewEmailData[0].tags.map((tag) => {
                          return <li className="list1">{tag}</li>;
                        })
                      ) : (
                        <li className="list1">N/A</li>
                      )}
                    </ul>
                  </div>
                  <div className="mail-stats">
                    <ul className={viewEmailData[0]?.multi_ctr?.length > 0 ? "mail-stats-ul" : ""}>
                      <li
                        onClick={() => {
                          getReaderData("unique", "Emails sent", "#8a4e9c");
                        }}
                      >
                        <div className="mail_send">
                          <h6>Emails sent</h6>
                          <div className="mail-stats-list">
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="18.5"
                                stroke="#986CA5"
                                stroke-width="3"
                                stroke-linejoin="round"
                              />
                              <g clipPath="url(#clip0_698_88)">
                                <path
                                  d="M21.905 10.0557C21.5703 10.1568 21.264 10.3392 21.0106 10.5926L11.933 19.6701C11.6745 19.9286 11.4958 20.2371 11.3965 20.5645L20.1535 18.8131L21.905 10.0557Z"
                                  fill="#986CA5"
                                />
                                <path
                                  d="M29.3698 15.9047L24.0578 10.5925C23.7892 10.3241 23.4613 10.136 23.1032 10.0391L21.2259 19.426C21.1795 19.6579 20.9982 19.8393 20.7663 19.8857L11.3793 21.7632C11.4745 22.1129 11.6586 22.4434 11.9328 22.7176L12.3995 23.1842L10.1715 25.4121C9.9428 25.641 9.9428 26.012 10.1717 26.2408C10.2861 26.3551 10.436 26.4124 10.586 26.4124C10.736 26.4124 10.8858 26.3551 11.0002 26.2408L13.2282 24.0129L14.1745 24.9593L10.1715 28.9623C9.9428 29.191 9.9428 29.5621 10.1717 29.7908C10.2861 29.9052 10.436 29.9625 10.586 29.9625C10.736 29.9625 10.8858 29.9052 11.0002 29.7908L15.0032 25.7878L15.9496 26.7343L13.7218 28.9623C13.4929 29.191 13.4929 29.5621 13.7218 29.7908C13.8361 29.9052 13.9861 29.9625 14.1361 29.9625C14.2861 29.9625 14.4359 29.9052 14.5503 29.7908L16.7783 27.563L17.2449 28.0296C17.6508 28.4354 18.1919 28.6589 18.7686 28.6589C19.3454 28.6589 19.8866 28.4354 20.2924 28.0296L29.3698 18.9522C30.2101 18.1119 30.2101 16.7448 29.3698 15.9047Z"
                                  fill="#986CA5"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_698_88">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(10 10)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>

                            <span>{viewEmailData[0].total_Sent}</span>
                          </div>
                        </div>
                      </li>

                      <li
                        onClick={() => {
                          getReaderData("bounce", "Emails bounced", "#f58289");
                        }}
                      >
                        <div className="mail_view">
                          <h6>Emails bounced</h6>
                          <div className="mail-stats-list">
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="18.5"
                                stroke="#F58289"
                                stroke-width="3"
                                stroke-linejoin="round"
                              />
                              <g clipPath="url(#clip0_698_97)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M27.9098 12.283C27.5648 12.0981 27.1782 12.0001 26.7771 12.0001L12.4111 12C12.002 12 11.6165 12.1028 11.2788 12.2833L19.594 17.8268L27.9098 12.283ZM20.6461 25.1001C20.5929 24.8003 20.5651 24.4917 20.5651 24.1766C20.5651 21.2795 22.9136 18.931 25.8107 18.931C27.0975 18.931 28.2762 19.3944 29.1888 20.1634L29.1889 14.2817C29.1888 13.8568 29.0782 13.4485 28.8715 13.0884L19.9582 19.0308C19.738 19.1776 19.451 19.1777 19.2307 19.0309L10.3172 13.0886C10.1158 13.4407 10 13.8479 10 14.2819V15.0203V16.3318V17.8295L10.0001 19.1409L10 20.6387V21.9502V22.6886C10.0001 23.3309 10.2514 23.9359 10.7078 24.3923C11.1642 24.8487 11.7694 25.1001 12.4115 25.1001L20.6461 25.1001ZM25.804 28.3757C28.1216 28.3757 30.0004 26.4969 30.0004 24.1792C30.0004 21.8616 28.1216 19.9828 25.804 19.9828C23.4863 19.9828 21.6075 21.8616 21.6075 24.1792C21.6075 26.4969 23.4863 28.3757 25.804 28.3757ZM25.1052 26.6285C25.1052 26.2422 25.4184 25.9291 25.8047 25.9291C26.1909 25.9291 26.504 26.2422 26.504 26.6285C26.504 27.0148 26.1909 27.3279 25.8047 27.3279C25.4185 27.3279 25.1052 27.0148 25.1052 26.6285ZM25.8046 24.9097C26.1909 24.9097 26.504 24.583 26.504 24.1799V21.7623C26.504 21.3593 26.1909 21.0325 25.8046 21.0325C25.4183 21.0325 25.1052 21.3593 25.1052 21.7623V24.1799C25.1052 24.583 25.4183 24.9097 25.8046 24.9097Z"
                                  fill="#F58289"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_698_97">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(10 10)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <span>
                              {viewEmailData[0]?.bounce
                                ? viewEmailData[0].bounce
                                : 0}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li
                        onClick={() => {
                          getReaderData("open", "Emails opened", "#ffbe2c");
                        }}
                      >
                        <div className="mail_open">
                          <h6>Emails opened</h6>
                          <div className="mail-stats-list">
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="18.5"
                                stroke="#FAC755"
                                stroke-width="3"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M20 21.7875L11.3125 17.1063C11.4295 16.6343 11.7283 16.2277 12.1437 15.975L19.7062 11.95C19.7963 11.9008 19.8973 11.875 20 11.875C20.1027 11.875 20.2037 11.9008 20.2937 11.95L27.825 15.9563C28.0375 16.0817 28.2231 16.2478 28.3711 16.4452C28.5191 16.6425 28.6266 16.8672 28.6875 17.1063L20 21.7875Z"
                                fill="#FAC755"
                              />
                              <path
                                d="M17.25 21.7251L11.25 25.9251V18.4939L17.25 21.7251Z"
                                fill="#FAC755"
                              />
                              <path
                                d="M21.5189 22.3875L28.4626 27.25C28.2924 27.517 28.0579 27.7371 27.7805 27.89C27.5031 28.0429 27.1918 28.1237 26.8751 28.125H13.1251C12.8084 28.1237 12.4971 28.0429 12.2197 27.89C11.9423 27.7371 11.7078 27.517 11.5376 27.25L18.4814 22.3875L19.7064 23.05C19.7965 23.099 19.8975 23.1247 20.0001 23.1247C20.1027 23.1247 20.2037 23.099 20.2939 23.05L21.5189 22.3875Z"
                                fill="#FAC755"
                              />
                              <path
                                d="M28.75 18.4939V25.9251L22.75 21.7251L28.75 18.4939Z"
                                fill="#FAC755"
                              />
                            </svg>
                            <span>{viewEmailData[0].total_Opened_pr}%</span>
                          </div>
                        </div>
                      </li>
                      <li
                        onClick={() => {
                          getReaderData("ctr", viewEmailData[0]?.click_name, "#39cabc", viewEmailData[0]?.click_key);
                        }}
                      >
                        <div className="mail_click">
                          <div className="mail_click_box">
                            <h6>{ctrName}</h6>
                            <div className="mail_click_box_content">
                              <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="20"
                                  cy="20"
                                  r="18.5"
                                  stroke="#39CABC"
                                  stroke-width="3"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M14.955 16.6329C14.8178 16.1684 14.6861 15.703 14.5871 15.2572C13.9363 14.8722 13.4936 14.1715 13.4936 13.3617C13.4936 12.1434 14.4842 11.1535 15.7017 11.1535C16.9192 11.1535 17.9098 12.1442 17.9098 13.3617C17.9098 13.5292 17.8872 13.6906 17.8521 13.8472C18.0633 14.3125 18.234 14.8363 18.3837 15.3687C18.8046 14.8075 19.0633 14.1177 19.0633 13.3617C19.0633 11.5043 17.5591 10 15.7017 10C13.8443 10 12.3408 11.5043 12.3408 13.3617C12.3408 14.961 13.4593 16.2931 14.955 16.6329Z"
                                  fill="#39CABC"
                                />
                                <path
                                  d="M12.6329 24.5915C13.4615 23.696 14.3913 24.0467 15.6361 24.2361C16.7054 24.4006 17.7584 24.1005 17.6883 23.5229C17.5776 22.5884 17.4217 22.1706 17.0671 20.9602C16.7842 19.9976 16.2471 18.2626 15.7584 16.604C15.1037 14.385 14.9143 13.3546 15.7857 13.0974C16.7249 12.8238 17.2635 14.1582 17.7514 16.0085C18.3071 18.1145 18.5994 19.0444 18.7631 18.9953C19.0515 18.9127 18.6571 18.0116 19.4116 17.7895C20.3547 17.5152 20.5371 18.2525 20.8013 18.1784C21.0655 18.0989 20.9759 17.3523 21.728 17.1325C22.4841 16.9142 22.8637 17.8448 23.1754 17.7521C23.4841 17.6609 23.4771 17.325 23.9432 17.1917C24.41 17.053 26.1668 17.8394 27.1723 21.2743C28.4342 25.5931 27.0125 26.3959 27.4435 27.8581L21.8107 30C21.3547 28.9033 19.9424 28.8222 18.693 28.1231C17.4342 27.4146 16.5792 26.0342 13.2986 26.1013C12.0647 26.1262 12.1232 25.1426 12.6329 24.5915Z"
                                  fill="#39CABC"
                                />
                              </svg>
                              <span>{viewEmailData[0].total_Click_pr}%</span>
                            </div>
                          </div>
                        </div>
                      </li>

                      {
                        viewEmailData[0]?.multi_ctr && viewEmailData[0]?.multi_ctr?.length > 0
                          ?
                          viewEmailData[0]?.multi_ctr.map((ctr, index) => {
                            return (
                              <li
                                onClick={() => {
                                  getReaderData("ctr", ctr?.click_name, colorArray?.[index], ctr?.click_key);
                                }}
                              >
                                <div className="mail_click">
                                  <div className="mail_click_box">
                                    <h6 style={{ color: colorArray?.[index] }}>{ctr?.click_name}</h6>
                                    <div className="mail_click_box_content">
                                      <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <circle
                                          cx="20"
                                          cy="20"
                                          r="18.5"
                                          stroke={colorArray?.[index]}
                                          stroke-width="3"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M14.955 16.6329C14.8178 16.1684 14.6861 15.703 14.5871 15.2572C13.9363 14.8722 13.4936 14.1715 13.4936 13.3617C13.4936 12.1434 14.4842 11.1535 15.7017 11.1535C16.9192 11.1535 17.9098 12.1442 17.9098 13.3617C17.9098 13.5292 17.8872 13.6906 17.8521 13.8472C18.0633 14.3125 18.234 14.8363 18.3837 15.3687C18.8046 14.8075 19.0633 14.1177 19.0633 13.3617C19.0633 11.5043 17.5591 10 15.7017 10C13.8443 10 12.3408 11.5043 12.3408 13.3617C12.3408 14.961 13.4593 16.2931 14.955 16.6329Z"
                                          fill={colorArray?.[index]}
                                        />
                                        <path
                                          d="M12.6329 24.5915C13.4615 23.696 14.3913 24.0467 15.6361 24.2361C16.7054 24.4006 17.7584 24.1005 17.6883 23.5229C17.5776 22.5884 17.4217 22.1706 17.0671 20.9602C16.7842 19.9976 16.2471 18.2626 15.7584 16.604C15.1037 14.385 14.9143 13.3546 15.7857 13.0974C16.7249 12.8238 17.2635 14.1582 17.7514 16.0085C18.3071 18.1145 18.5994 19.0444 18.7631 18.9953C19.0515 18.9127 18.6571 18.0116 19.4116 17.7895C20.3547 17.5152 20.5371 18.2525 20.8013 18.1784C21.0655 18.0989 20.9759 17.3523 21.728 17.1325C22.4841 16.9142 22.8637 17.8448 23.1754 17.7521C23.4841 17.6609 23.4771 17.325 23.9432 17.1917C24.41 17.053 26.1668 17.8394 27.1723 21.2743C28.4342 25.5931 27.0125 26.3959 27.4435 27.8581L21.8107 30C21.3547 28.9033 19.9424 28.8222 18.693 28.1231C17.4342 27.4146 16.5792 26.0342 13.2986 26.1013C12.0647 26.1262 12.1232 25.1426 12.6329 24.5915Z"
                                          fill={colorArray?.[index]}
                                        />
                                      </svg>
                                      <span>{ctr?.total_Click_pr}%</span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )
                          })
                          : null
                      }
                    </ul>
                  </div>
                </div>
                <div className="chart-description">
                  <div className="chart-description-view">
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={options_ch}
                    />
                  </div>
                </div>

                <div
                  className="preview-mail-box"
                  dangerouslySetInnerHTML={{
                    __html: viewEmailData[0].template,
                  }}
                ></div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>

      {/* <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Email View</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={hideEmailModal}></button>
          </div>

        {typeof viewEmailData !== "undefined" && (

          <div className="modal-body">
          <div className="mail-box-content">
            <div className="mail-box-heading">
            <h5>{viewEmailData[0].subject}</h5>
            <p>{viewEmailData[0].description}</p>
            </div>
            <div className="mail-view-btn">
              <button className="btn btn-primary btn-bordered" onClick={(e) => showModal('send',campaign_id)}>Resend</button>
            </div>
            <div className="mailbox-table">
              <table>
              <tbody>
                <tr><th>Campaign</th><td>{viewEmailData[0].campaign}</td></tr>
                <tr><th>List</th><td>{viewEmailData[0].list}</td></tr>
                <tr><th>Content Title </th><td>{viewEmailData[0].article_title}</td></tr>
                <tr><th>Docintel Link </th><td><a href={viewEmailData[0].docintel_link} target="_blank">{viewEmailData[0].docintel_link}</a></td></tr>
              </tbody>
              </table>

            </div>
              <div className="mail-time"><span>{viewEmailData[0].created_at}</span></div>
            <div className="mailbox-tags">
              <h6>Tags</h6>
              <ul>
              { viewEmailData[0].tags != "" ?
                viewEmailData[0].tags.map((tag) => {
                  return ( <li className="list1">{tag}</li> );
                })
                : <li className="list1">N/A</li>
              }
              </ul>
            </div>
            <div className="mail-stats">
              <ul>
              <li>
                <div className="mail_send">
                <h6>Emails send</h6>
                <div className="mail-stats-list">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18.5" stroke="#986CA5" stroke-width="3" stroke-linejoin="round"/>
                  <g clipPath="url(#clip0_698_88)">
                  <path d="M21.905 10.0557C21.5703 10.1568 21.264 10.3392 21.0106 10.5926L11.933 19.6701C11.6745 19.9286 11.4958 20.2371 11.3965 20.5645L20.1535 18.8131L21.905 10.0557Z" fill="#986CA5"/>
                  <path d="M29.3698 15.9047L24.0578 10.5925C23.7892 10.3241 23.4613 10.136 23.1032 10.0391L21.2259 19.426C21.1795 19.6579 20.9982 19.8393 20.7663 19.8857L11.3793 21.7632C11.4745 22.1129 11.6586 22.4434 11.9328 22.7176L12.3995 23.1842L10.1715 25.4121C9.9428 25.641 9.9428 26.012 10.1717 26.2408C10.2861 26.3551 10.436 26.4124 10.586 26.4124C10.736 26.4124 10.8858 26.3551 11.0002 26.2408L13.2282 24.0129L14.1745 24.9593L10.1715 28.9623C9.9428 29.191 9.9428 29.5621 10.1717 29.7908C10.2861 29.9052 10.436 29.9625 10.586 29.9625C10.736 29.9625 10.8858 29.9052 11.0002 29.7908L15.0032 25.7878L15.9496 26.7343L13.7218 28.9623C13.4929 29.191 13.4929 29.5621 13.7218 29.7908C13.8361 29.9052 13.9861 29.9625 14.1361 29.9625C14.2861 29.9625 14.4359 29.9052 14.5503 29.7908L16.7783 27.563L17.2449 28.0296C17.6508 28.4354 18.1919 28.6589 18.7686 28.6589C19.3454 28.6589 19.8866 28.4354 20.2924 28.0296L29.3698 18.9522C30.2101 18.1119 30.2101 16.7448 29.3698 15.9047Z" fill="#986CA5"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_698_88">
                  <rect width="20" height="20" fill="white" transform="translate(10 10)"/>
                  </clipPath>
                  </defs>
                  </svg>

                  <span>{viewEmailData[0].total_Sent}</span>
                </div>
                </div>
              </li>

              <li>
                <div className="mail_view">
                <h6>Emails bounced</h6>
                <div className="mail-stats-list">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18.5" stroke="#F58289" stroke-width="3" stroke-linejoin="round"/>
                  <g clipPath="url(#clip0_698_97)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M27.9098 12.283C27.5648 12.0981 27.1782 12.0001 26.7771 12.0001L12.4111 12C12.002 12 11.6165 12.1028 11.2788 12.2833L19.594 17.8268L27.9098 12.283ZM20.6461 25.1001C20.5929 24.8003 20.5651 24.4917 20.5651 24.1766C20.5651 21.2795 22.9136 18.931 25.8107 18.931C27.0975 18.931 28.2762 19.3944 29.1888 20.1634L29.1889 14.2817C29.1888 13.8568 29.0782 13.4485 28.8715 13.0884L19.9582 19.0308C19.738 19.1776 19.451 19.1777 19.2307 19.0309L10.3172 13.0886C10.1158 13.4407 10 13.8479 10 14.2819V15.0203V16.3318V17.8295L10.0001 19.1409L10 20.6387V21.9502V22.6886C10.0001 23.3309 10.2514 23.9359 10.7078 24.3923C11.1642 24.8487 11.7694 25.1001 12.4115 25.1001L20.6461 25.1001ZM25.804 28.3757C28.1216 28.3757 30.0004 26.4969 30.0004 24.1792C30.0004 21.8616 28.1216 19.9828 25.804 19.9828C23.4863 19.9828 21.6075 21.8616 21.6075 24.1792C21.6075 26.4969 23.4863 28.3757 25.804 28.3757ZM25.1052 26.6285C25.1052 26.2422 25.4184 25.9291 25.8047 25.9291C26.1909 25.9291 26.504 26.2422 26.504 26.6285C26.504 27.0148 26.1909 27.3279 25.8047 27.3279C25.4185 27.3279 25.1052 27.0148 25.1052 26.6285ZM25.8046 24.9097C26.1909 24.9097 26.504 24.583 26.504 24.1799V21.7623C26.504 21.3593 26.1909 21.0325 25.8046 21.0325C25.4183 21.0325 25.1052 21.3593 25.1052 21.7623V24.1799C25.1052 24.583 25.4183 24.9097 25.8046 24.9097Z" fill="#F58289"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_698_97">
                  <rect width="20" height="20" fill="white" transform="translate(10 10)"/>
                  </clipPath>
                  </defs>
                  </svg>
                  <span>60%</span>
                </div>
                </div>
              </li>
              <li>
                <div className="mail_open">
                <h6>Emails opened</h6>
                <div className="mail-stats-list">

                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18.5" stroke="#FAC755" stroke-width="3" stroke-linejoin="round"/>
                  <path d="M20 21.7875L11.3125 17.1063C11.4295 16.6343 11.7283 16.2277 12.1437 15.975L19.7062 11.95C19.7963 11.9008 19.8973 11.875 20 11.875C20.1027 11.875 20.2037 11.9008 20.2937 11.95L27.825 15.9563C28.0375 16.0817 28.2231 16.2478 28.3711 16.4452C28.5191 16.6425 28.6266 16.8672 28.6875 17.1063L20 21.7875Z" fill="#FAC755"/>
                  <path d="M17.25 21.7251L11.25 25.9251V18.4939L17.25 21.7251Z" fill="#FAC755"/>
                  <path d="M21.5189 22.3875L28.4626 27.25C28.2924 27.517 28.0579 27.7371 27.7805 27.89C27.5031 28.0429 27.1918 28.1237 26.8751 28.125H13.1251C12.8084 28.1237 12.4971 28.0429 12.2197 27.89C11.9423 27.7371 11.7078 27.517 11.5376 27.25L18.4814 22.3875L19.7064 23.05C19.7965 23.099 19.8975 23.1247 20.0001 23.1247C20.1027 23.1247 20.2037 23.099 20.2939 23.05L21.5189 22.3875Z" fill="#FAC755"/>
                  <path d="M28.75 18.4939V25.9251L22.75 21.7251L28.75 18.4939Z" fill="#FAC755"/>
                  </svg>
                  <span>{viewEmailData[0].total_Opened_pr}%</span>
                </div>
                </div>
              </li>
              <li><div className="mail_click">
                <div className="mail_click_box">
                <h6>CTR 1</h6>
                <div className="mail_click_box_content">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18.5" stroke="#39CABC" stroke-width="3" stroke-linejoin="round"/>
                    <path d="M14.955 16.6329C14.8178 16.1684 14.6861 15.703 14.5871 15.2572C13.9363 14.8722 13.4936 14.1715 13.4936 13.3617C13.4936 12.1434 14.4842 11.1535 15.7017 11.1535C16.9192 11.1535 17.9098 12.1442 17.9098 13.3617C17.9098 13.5292 17.8872 13.6906 17.8521 13.8472C18.0633 14.3125 18.234 14.8363 18.3837 15.3687C18.8046 14.8075 19.0633 14.1177 19.0633 13.3617C19.0633 11.5043 17.5591 10 15.7017 10C13.8443 10 12.3408 11.5043 12.3408 13.3617C12.3408 14.961 13.4593 16.2931 14.955 16.6329Z" fill="#39CABC"/>
                    <path d="M12.6329 24.5915C13.4615 23.696 14.3913 24.0467 15.6361 24.2361C16.7054 24.4006 17.7584 24.1005 17.6883 23.5229C17.5776 22.5884 17.4217 22.1706 17.0671 20.9602C16.7842 19.9976 16.2471 18.2626 15.7584 16.604C15.1037 14.385 14.9143 13.3546 15.7857 13.0974C16.7249 12.8238 17.2635 14.1582 17.7514 16.0085C18.3071 18.1145 18.5994 19.0444 18.7631 18.9953C19.0515 18.9127 18.6571 18.0116 19.4116 17.7895C20.3547 17.5152 20.5371 18.2525 20.8013 18.1784C21.0655 18.0989 20.9759 17.3523 21.728 17.1325C22.4841 16.9142 22.8637 17.8448 23.1754 17.7521C23.4841 17.6609 23.4771 17.325 23.9432 17.1917C24.41 17.053 26.1668 17.8394 27.1723 21.2743C28.4342 25.5931 27.0125 26.3959 27.4435 27.8581L21.8107 30C21.3547 28.9033 19.9424 28.8222 18.693 28.1231C17.4342 27.4146 16.5792 26.0342 13.2986 26.1013C12.0647 26.1262 12.1232 25.1426 12.6329 24.5915Z" fill="#39CABC"/>
                    </svg>
                  <span>{viewEmailData[0].total_Click_pr}%</span>
                </div>
                </div>
              </div></li>
              </ul>
            </div>

            </div>
            <div className="chart-description">
            <div className="chart-description-view">
              <img src={path_image+"chart-description.png"} alt="" />
            </div>
            </div>
          </div>
        )}
        </div>
      </div> */}

      {/*Modal for delete Email listing*/}
      <div className="delete">
        <Modal
          className="modal send-confirm"
          id="delete-confirm"
          show={confirmationpopup}
        >
          <Modal.Header>
            {/* <Modal.Title>Heading Text</Modal.Title>*/}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={(e) => hideConfirmationModal()}
            ></button>
          </Modal.Header>

          <Modal.Body>
            <img src={path + "alert.png"} alt="" />
            <h4>
              This email will be deleted.
              <br />
              Are you sure you wish to go ahead?
            </h4>
            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                onClick={(e) => deleteEmail()}
              >
                Yes Please!
              </button>
              <button
                type="button"
                className="btn btn-primary btn-bordered light"
                onClick={(e) => hideConfirmationModal()}
              >
                Cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      {/*Modal for Verification
        <div className="delete-confirm">
          <Modal className="modal send-confirm" id="action-confirm" show={verificationpopup}>
              <Modal.Header>

              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={(e) => hideVerificationPopup()}></button>
            </Modal.Header>

            <Modal.Body>
              <img src={path_image+"success.png"} alt="" />
  						<h4>The HCP record has been deleted <br />successfully !</h4>
                <div className="modal-buttons">
                  <button type="button" className="btn btn-primary btn-bordered light" onClick={(e) => hideVerificationPopup()}>Close</button>
                </div>
            </Modal.Body>
          </Modal>
				</div>*/}

      {/*Modal start for send Draft Email*/}
      <div>
        <Modal
          className="modal send-confirm event_list"
          id="send-draft-mail"
          show={getDraftEmailSendStatus}
        >
          <Modal.Header>
            <button
              type="button"
              className="btn-close"
              onClick={() =>
                setDraftEmailSendStatus(
                  (getDraftEmailSendStatus) => !getDraftEmailSendStatus
                )
              }
            ></button>
          </Modal.Header>

          <Modal.Body>
            <img src={path + "alert.png"} alt="" />
            <h4>
              This will send the email.
              <br />
              Are you sure it's perfect?
            </h4>

            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                data-bs-dismiss="modal"
                onClick={sendDraftMail}
              >
                Yes Please!
              </button>

              <button
                type="button"
                className="btn btn-primary btn-bordered light"
                onClick={() =>
                  setDraftEmailSendStatus(
                    (getDraftEmailSendStatus) => !getDraftEmailSendStatus
                  )
                }
              >
                Cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      {/*Modal end for send Draft Email*/}

      {
        /*Modal for Reader Listing*/
        <div>
          <Modal
            className="modal modal-second"
            id="mail-view"
            show={readerDetailsPopupStatus}
          >
            <Modal.Header>
              <h4 style={{ color: popupHeadingColor }}>
                {detailPopupName != "" ? detailPopupName : null}
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  setReaderDetailsPopupStatus(false);
                  setReaderDetailsData([]);
                  setviewEmailModal(true);
                  setFunctionParameter({})
                }}
              ></button>
            </Modal.Header>
            <Modal.Body>
              {
                <div className="selected-hcp-list">
                  <table className="table" id="table-to-xls">
                    <thead className="sticky-header">
                      <tr>
                        {/* <th scope="col">Name</th> */}
                        <th scope="col" className="sort_option" >
                          <span onClick={(e) => userSort(e, "first_name")} >
                            Name
                            <button
                              className={`event_sort_btn ${isActive?.first_name == "dec"
                                ? "svg_active"
                                : isActive?.first_name == "asc"
                                  ? "svg_asc"
                                  : ""
                                }`}
                              onClick={(e) => userSort(e, "first_name")}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path
                                    d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                    fill="#97B6CF"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </span>

                        </th>
                        {/* <th scope="col">Email</th> */}
                        <th scope="col" className="sort_option" >
                          <span onClick={(e) => userSort(e, "email")} >
                            Email
                            <button
                              className={`event_sort_btn ${isActive?.email == "dec"
                                ? "svg_active"
                                : isActive?.email == "asc"
                                  ? "svg_asc"
                                  : ""
                                }`}
                              onClick={(e) => userSort(e, "email")}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path
                                    d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                    fill="#97B6CF"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </span>

                        </th>
                        {/* <th scope="col">Bounced</th> */}
                        {/* <th scope="col">Country</th> */}
                        <th scope="col" className="sort_option" >
                          <span onClick={(e) => userSort(e, "country")} >
                            Country
                            <button
                              className={`event_sort_btn ${isActive?.country == "dec"
                                ? "svg_active"
                                : isActive?.country == "asc"
                                  ? "svg_asc"
                                  : ""
                                }`}
                              onClick={(e) => userSort(e, "country")}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path
                                    d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                    fill="#97B6CF"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </span>

                        </th>
                        {(localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") ? (<>
                            <th scope="col" className="sort_option">
                              <span onClick={(e) => userSort(e, "site_number")}>
                                Site number
                                <button
                                  className={`event_sort_btn ${isActive?.site_number == "dec"
                                    ? "svg_active"
                                    : isActive?.site_number == "asc"
                                      ? "svg_asc"
                                      : ""
                                    }`}
                                  onClick={(e) => userSort(e, "site_number")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect width="8" height="8" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span></th>
                            <th scope="col" className="sort_option">
                              <span onClick={(e) => userSort(e, "irt")}>
                                IRT mandatory training
                                <button
                                  className={`event_sort_btn ${isActive?.irt == "dec"
                                    ? "svg_active"
                                    : isActive?.irt == "asc"
                                      ? "svg_asc"
                                      : ""
                                    }`}
                                  onClick={(e) => userSort(e, "irt")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect width="8" height="8" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                          </>) : (
                          // <th scope="col">Business Unit</th>
                          <th scope="col" className="sort_option" >
                            <span onClick={(e) => userSort(e, "ibu")} >
                              Business Unit
                              <button
                                className={`event_sort_btn ${isActive?.ibu == "dec"
                                  ? "svg_active"
                                  : isActive?.ibu == "asc"
                                    ? "svg_asc"
                                    : ""
                                  }`}
                                onClick={(e) => userSort(e, "ibu")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>

                          </th>
                        )}
                        {/* <th scope="col">Date</th> */}
                        <th scope="col" className="sort_option" >
                          <span onClick={(e) => userSort(e, "send_date")} >
                            Date
                            <button
                              className={`event_sort_btn ${isActive?.send_date == "dec"
                                ? "svg_active"
                                : isActive?.send_date == "asc"
                                  ? "svg_asc"
                                  : ""
                                }`}
                              onClick={(e) => userSort(e, "send_date")}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3722_6611)">
                                  <path
                                    d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                    fill="#97B6CF"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </span>

                        </th>
                        {/* <th scope="col">Contact Type</th> */}
                        {/* <th scope="col">Opened</th> */}
                        {/* <th scope="col"> Clicked</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {typeof readerDetailsData !== "undefined" &&
                        readerDetailsData.length > 0 ? (
                        <>
                          {readerDetailsData.map((item, index) => (
                            <>
                              <tr
                                key={"readers_" + index}
                                className="hcp"
                                id={`row-selected` + index}
                              >
                                <td>
                                  {" "}
                                  {item?.first_name + " " + item?.last_name}{" "}
                                </td>
                                <td> {item?.email ? item.email : "N/A"} </td>
                                {/* <td> {item?.bounce ? item.bounce : "N/A"}</td> */}
                                <td>
                                  {" "}
                                  <span>
                                    {item?.country ? item.country : "N/A"}
                                  </span>{" "}
                                </td>
                                {(localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
                                  && (<td>{item?.site_number ? item?.site_number : "N/A"}</td>)}
                                <td>
                                  {(localStorage.getItem("user_id") ==
                                    "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
                                    ? item.irt
                                      ? "Yes"
                                      : "No"
                                    : item.ibu
                                      ? item.ibu
                                      : "N/A"}
                                </td>
                                <td>
                                  {
                                    item?.recent_send?.length > 0 ? moment(item?.recent_send?.[0]?.sent_date, 'YYYY-MM-DD HH:mm:ss').format('DD-MMM-YY | hh:mm a')
                                      : null
                                  }
                                  {
                                    item?.recent_send?.length > 1 ?
                                      <div className="mail-resend" title="Resend Emails">
                                        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g id="Glyph"><g data-name="Glyph" id="Glyph-2"><path d="M49,35a8,8,0,0,0-3.17.66l.12-.34a1,1,0,1,0-1.9-.64l-1,3a1,1,0,0,0,.58,1.25l2.5,1a1,1,0,0,0,.74-1.86l-.76-.3A6,6,0,1,1,43,43a1,1,0,0,0-2,0,8,8,0,1,0,8-8Z" fill="#0066be" /><path d="M56,32.06V16.23A8.24,8.24,0,0,0,47.77,8H10.23A8.24,8.24,0,0,0,2,16.23V37.77A8.24,8.24,0,0,0,10.23,46H36.36A13,13,0,1,0,56,32.06ZM34.19,27.64a8.11,8.11,0,0,1-10.37,0L6.63,42.86A6.38,6.38,0,0,1,5.2,41.45l17.09-15.1L5.52,12.15a6.56,6.56,0,0,1,1.57-1.3L25,26a6.14,6.14,0,0,0,8,0L50.91,10.85a6.56,6.56,0,0,1,1.57,1.3L35.74,26.33l6.51,5.56a12.46,12.46,0,0,0-1.67,1.21ZM49,54A11,11,0,1,1,60,43,11,11,0,0,1,49,54Z" fill="#0066be" /></g></g></svg>
                                      </div>
                                      : null
                                  }
                                </td>
                              </tr>

                              {
                                item?.recent_send?.length > 1 ?

                                  <>
                                    {
                                      item?.recent_send?.map((subItem, subIndex) => (
                                        subIndex !== 0 ?
                                          <>
                                            <tr>
                                              <td>
                                                {item?.first_name + " " + item?.last_name}
                                              </td>
                                              <td> {item?.email ? item.email : "N/A"} </td>
                                              <td>
                                                <span>
                                                  {item?.country ? item.country : "N/A"}
                                                </span>
                                              </td>
                                              {(localStorage.getItem("user_id") ==
                                                "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
                                                && (<td>{item?.site_number ? item?.site_number : "N/A"}</td>)}
                                              <td>
                                                {(localStorage.getItem("user_id") ==
                                                  "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
                                                  ? item.irt
                                                    ? "Yes"
                                                    : "No"
                                                  : item.ibu
                                                    ? item.ibu
                                                    : "N/A"}
                                              </td>
                                              <td>
                                                {subItem?.sent_date ?
                                                  moment(subItem?.sent_date, 'YYYY-MM-DD HH:mm:ss').format('DD-MMM-YY | hh:mm a')
                                                  : null}
                                                {
                                                  item?.recent_send?.length - subIndex > 1 ?
                                                    <div className="mail-resend" title="Resend Emails">
                                                      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g id="Glyph"><g data-name="Glyph" id="Glyph-2"><path d="M49,35a8,8,0,0,0-3.17.66l.12-.34a1,1,0,1,0-1.9-.64l-1,3a1,1,0,0,0,.58,1.25l2.5,1a1,1,0,0,0,.74-1.86l-.76-.3A6,6,0,1,1,43,43a1,1,0,0,0-2,0,8,8,0,1,0,8-8Z" fill="#0066be" /><path d="M56,32.06V16.23A8.24,8.24,0,0,0,47.77,8H10.23A8.24,8.24,0,0,0,2,16.23V37.77A8.24,8.24,0,0,0,10.23,46H36.36A13,13,0,1,0,56,32.06ZM34.19,27.64a8.11,8.11,0,0,1-10.37,0L6.63,42.86A6.38,6.38,0,0,1,5.2,41.45l17.09-15.1L5.52,12.15a6.56,6.56,0,0,1,1.57-1.3L25,26a6.14,6.14,0,0,0,8,0L50.91,10.85a6.56,6.56,0,0,1,1.57,1.3L35.74,26.33l6.51,5.56a12.46,12.46,0,0,0-1.67,1.21ZM49,54A11,11,0,1,1,60,43,11,11,0,0,1,49,54Z" fill="#0066be" /></g></g></svg>
                                                    </div>
                                                    : null
                                                }
                                              </td>
                                            </tr>
                                          </>
                                          : null
                                      ))
                                    }
                                  </>

                                  : null
                              }

                            </>
                          ))}
                        </>
                      ) : readerDetailsData.length == 0 ? (
                        <tr className="table_no_data_found">
                          <td colspan="6">
                            <div className="no_found">
                              <p>No Data Found</p>
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                  {readerDetailsCount >= 50 && functionParameter?.page == 1 &&
                    (<div className="text-center load_more">
                      <button className="btn btn-primary btn-filled" onClick={() => getReaderData(functionParameter?.type, functionParameter?.name, functionParameter?.color_code, functionParameter?.dynamic_name, 2)}>
                        Load All
                      </button>
                    </div>)}
                </div>
              }
            </Modal.Body>
          </Modal>
        </div>
      }
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
  getSelected,
  getSearched
})(EmailList);
