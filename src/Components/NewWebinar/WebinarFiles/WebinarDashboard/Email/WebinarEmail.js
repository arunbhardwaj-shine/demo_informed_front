import React, { useEffect, useState, useRef } from "react";
import { Col, Accordion, Button, Modal } from "react-bootstrap";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { Link, useNavigate } from "react-router-dom";
import { loader } from "../../../../../loader";
import { postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import CommonConfirmModel from "../../../../../Model/CommonConfirmModel";
import { popup_alert } from "../../../../../popup_alert";
import { connect } from "react-redux";
import { getWebinarEmailData, getWebinarSelectedSmartListData, getWebinarDraftData } from '../../../../../actions'
import axios from "axios";
import { toast } from "react-toastify";
import domtoimage from "dom-to-image";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const WebinarEmail = (props) => {
  const navigate = useNavigate();
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const colorArray = ['#0E9B8E', '#00003C', '#FFBE2C', '#FFBE2C', '#F58289', '#D61975', '#0066BE'];
  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  const { eventIdContext, handleEventId } = useSidebar()
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"))
  const [search, setSearch] = useState("")
  const [emailListData, setEmailListData] = useState([])
  const [totalEmailListData, setTotalEmailListData] = useState([])
  const [appliedFilter, setAppliedFilter] = useState({})
  const [filterObject, setFilterObject] = useState({})
  const [apifilterObject, setApifilterObject] = useState({});
  const [showFilter, setShowFilter] = useState(false)
  const [filterdata, setFilterData] = useState({});
  const [deletestatus, setDeleteStatus] = useState(false);
  const [viewEmailModal, setviewEmailModal] = useState(false);
  const [eventId, setEventId] = useState(
    eventIdContext?.eventId
      ? eventIdContext?.eventId
      : localStorageEvent?.eventId
  );
  const [campaignId, setCampaignId] = useState("");
  const [viewEmailData, setviewEmailData] = useState();
  const [getreference, setReference] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [ctrName, setCTRName] = useState("");
  const [readerDetailsData, setReaderDetailsData] = useState([])
  const [functionParameter, setFunctionParameter] = useState({

  })
  const [getDraftEmailSendStatus, setDraftEmailSendStatus] = useState(false);
  const [getDraftCamapignId, setDraftCamapignId] = useState(0);
  const [readerDetailsPopupStatus, setReaderDetailsPopupStatus] =
    useState(false);
  const [detailPopupName, setDetailPopupName] = useState("");
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
  });

  const [sortingCount, setSortingCount] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [sortNameDirection, setSortNameDirection] = useState(0);
  const [isActive, setIsActive] = useState({});

  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
      },

    },
    title: {
      text: "Mail campaign stats",
    },
    xAxis: {
      categories: [],

    },
    yAxis: {
      title: {
        text: null,
      },
    },
    exporting: {
      enabled: true,
    },
    tooltip: {

      formatter: function () {
        return (
          "<span ><div className=" +
          this.series.name +
          '>'
          // <span style="font-weight: bold">'
          +
          this.x +
          " <strong >" + ":" +
          Highcharts.numberFormat(this.y, 0) +
          "</strong></div></span>"
        );
      },
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
          // backgroundColor: "rgba(255,255,255)",
          // borderColor: "rgba(0,0,0,0.9)",
          // borderColor:this.point.color,
          // color: "rgba(0,0,0)",
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
              // '><span style="font-weight: 400">' +  
              this.x
              + " <strong >" +
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
        data: [],
      },
    ],
  });

  useEffect(() => {
    getWebinarCompaignList()
  }, [])

  useEffect(() => {
    props.getWebinarEmailData(null);
    props.getWebinarDraftData(null);
    props.getWebinarSelectedSmartListData(null);

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

  const getWebinarCompaignList = async (filter = "") => {
    try {
      loader("show")
      let body = {
        user_id: localStorage.getItem("user_id"),
        event_id: eventId,
        search: '',
        filter: filter
      };
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      let response = []
      await axios
        .post(`/webinar/get_webinar_campaign`, body)
        .then((res) => {
          response = res?.data
        })
        .catch((err) => {
          loader("hide");
          console.log(err);
        });
      // const response = await postData(ENDPOINT.WEBINAR_EMAIL_COMPAIGN_LIST, body)
      let filterData = []
      if (search != "") {
        filterData = response?.response?.data?.filter((item, index) => item?.subject?.includes(search))
      } else {
        filterData = response?.response?.data
      }
      setEmailListData(filterData)
      setTotalEmailListData(response?.response?.data)
      if (Object.keys(filterdata)?.length == 0) {
        getFilterList()
      }
      loader("hide")
    } catch (err) {
      loader("hide")
      console.log("--err", err)
    }
  }
  const getFilterList = async () => {
    try {
      const response = await postData(ENDPOINT.WEBINAR_EMAIL_GET_FILTER_LIST, { eventId })
      setFilterData(response?.data?.data)
    } catch (err) {
      console.log("--err", err)
    }
  }

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
          let campaign_data = res.data.response.data;
          props.getWebinarDraftData(campaign_data);
          if (campaign_data?.smart_list_data) {
            if (
              typeof campaign_data.smart_list_data != "undefined" &&
              campaign_data.smart_list_data != ""
            ) {
              props.getWebinarSelectedSmartListData(campaign_data.smart_list_data);
            }
          }
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        console.log(err);

        toast.error("Something went wrong");
      });

    //console.log(props);
    navigate("/" + route);
    //  }
  };

  const searchChange = (e) => {
    setSearch(e?.target?.value);

    if (e?.target?.value === "") {
      setEmailListData(totalEmailListData)
    }
  };

  const submitSearchHandler = (event) => {
    event.preventDefault();
    let searchData = totalEmailListData?.filter((item) => item?.subject?.includes(search))
    setEmailListData(searchData)
  };

  const handleOnFilterChange = (e, item, index, key, data = []) => {
    let newObj = JSON.parse(JSON.stringify(appliedFilter));
    if (!newObj[key]) {
      newObj[key] = [];
    }
    if (!apifilterObject[key]) {
      apifilterObject[key] = [];
    }

    if (e?.target?.checked == true) {
      newObj[key]?.push(item);
      apifilterObject[key]?.push(e?.target?.value);
    } else {
      const index = newObj[key]?.indexOf(item);
      if (index > -1) {
        newObj[key]?.splice(index, 1);
        if (newObj[key]?.length == 0) {
          delete newObj[key];
        }
      }
      const index2 = apifilterObject[key]?.indexOf(e.target.value);
      if (index2 > -1) {
        apifilterObject[key]?.splice(index2, 1);
        if (apifilterObject[key]?.length == 0) {
          delete apifilterObject[key];
        }
      }
    }
    setAppliedFilter(newObj);
    setApifilterObject(apifilterObject);
  }

  const applyFilter = (e) => {
    e.preventDefault();
    setEmailListData([]);
    setFilterObject(appliedFilter);
    getWebinarCompaignList(appliedFilter);
    setShowFilter(false);
  };

  const removeindividualfilter = (key, item) => {
    let old_object = filterObject;
    const index = old_object[key]?.indexOf(item);
    if (index > -1) {
      old_object[key]?.splice(index, 1);
      if (old_object[key]?.length == 0) {
        delete old_object[key];
      }
    }
    if (Object.keys(old_object)?.length !== 0) {
      setFilterObject(old_object);
      setEmailListData([]);
      setTotalEmailListData([]);
      setAppliedFilter(old_object);
      getWebinarCompaignList(old_object)
    } else {
      let obj = {};
      setFilterObject({});
      setAppliedFilter({});
      setApifilterObject({});
      setEmailListData([]);
      setTotalEmailListData([]);
      getWebinarCompaignList("");
    }
  }

  const clearFilter = () => {
    setSearch("");
    setAppliedFilter({});
    setApifilterObject({});
    setFilterObject({});
    setEmailListData([]);
    setTotalEmailListData([])
    getWebinarCompaignList()
    setShowFilter(false);
  };
  const createNewEmail = () => {
    props.getWebinarDraftData(null);
    props.getWebinarSelectedSmartListData(null);
    props.getWebinarEmailData(null);
  }

  const hideEmailModal = () => {
    setviewEmailModal(false);
  };
  const handleScroll = (e) => {
    if (e?.target?.scrollTop > 20) {
      document.querySelector("#mail-view").setAttribute("custom-atr", "scroll");
    } else {
      document
        .querySelector("#mail-view")
        .setAttribute("custom-atr", "non-scroll");
    }
  };

  const showViewEmailModal = (data) => {
    let id = data?.auto_id;
    if (typeof data !== "undefined") {
      // let valueupdate =JSON.parse(JSON.stringify(options)) ;
      let valueupdate = options;
      valueupdate.xAxis.categories = ["Emails sent", "Emails opened"]
      valueupdate.series[0].data = [
        { y: data?.email_sent, color: "#8a4e9c" },
        { y: data?.email_read, color: "#ffbe2c" },
      ];
      Object.keys(data?.labels_value)?.map((item, index) => {
        valueupdate?.xAxis?.categories?.push(data?.labels[item]);

        let obj = {
          y: data?.labels_value[item],
          color: colorArray?.[index]
        }
        valueupdate.series[0].data.push(obj);
      })
      setCTRName(data?.labels_value);
      setOptions(valueupdate);
      setviewEmailData(data);
    }
    setviewEmailModal(true);
    setCampaignId(data);
  };

  const getReaderData = async (type = "", dynamic_name = "", popup_name = "", loadAll = 1) => {
    try {
      loader("show")
      const body = {
        eventId: eventId,
        autoId: campaignId?.auto_id,
        campaign_id: campaignId?.id || 0,
        type: type,
        name: dynamic_name,
        loadAll: loadAll
      }
      const response = await postData(ENDPOINT.WEBINAR_EMAIL_GET_READERS_LIST, body)
      setviewEmailModal(false);
      setFunctionParameter({
        type, dynamic_name, popup_name, loadAll
      })
      let temporaryUsers = [...readerDetailsData, ...response?.data?.data];
      setReaderDetailsData(temporaryUsers);
      setDetailPopupName(popup_name)
      setReaderDetailsPopupStatus(true);
      loader("hide")
    } catch (err) {
      loader("hide")
      console.log("--err", err)
    }
  }

  const downloadUsers = (readerDetailsData) => {
    try {
      if (readerDetailsData?.length == 0) {
        toast.warning("No data found");
        return;
      }


      readerDetailsData = readerDetailsData?.map((item, index) => {
        let finalData = {};
        finalData.Name = item?.name ? item?.name.trim() : "N/A";
        finalData.Email = item?.email ? item?.email.trim() : "N/A";
        finalData.Country = item?.country ? item?.country.trim() : "N/A";
        finalData.Date = item?.formatted_date ? item?.formatted_date.trim() : "N/A";
        return finalData;
      });
      const worksheet = XLSX.utils.json_to_sheet(readerDetailsData);
      // Specify column widths (in Excel units, 1 unit = 1/256th of the width of a character)
      const columnWidths = [
        { wch: 20 }, // Width of column A (Name)
        { wch: 25 }, // Width of column B (Email)
        { wch: 15 }, // Width of column C (Country)
        { wch: 15 }, // Width of column D (Date)
      ];

      // Apply column widths
      worksheet["!cols"] = columnWidths;
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      let fileName = (viewEmailData?.campaign ? viewEmailData?.campaign : viewEmailData?.subject + " " + detailPopupName).replaceAll(" ", "_")
      saveAs(blob, `${fileName}.xlsx`);
    } catch (error) {
      console.error(
        "An error occurred while downloading the Excel file:",
        error
      );
    }
  };

  const showConfirmationPopup = (item) => {
    setCampaignId(item);
    setPopupMessage({
      message1: "You are about to remove this compaign.",
      message2: "Are you sure you want to do this?",
      footerButton: "Yes please!",
    });
    if (confirmationpopup) {
      setConfirmationPopup(false);
    } else {
      setConfirmationPopup(true);
    }
  };

  const deleteCompaign = async (item) => {
    loader("show");
    try {
      let body = {
        eventId: eventId,
        emailAutoresponserId: item?.auto_id
      }

      if (item?.previous_campaign != 1) {
        const body = {
          user_id: localStorage.getItem("user_id"),
          campaign_id: item?.id,
        };
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        axios
          .post(`emailapi/delete_campaign`, body)
          .then((res) => {
            if (res.data.status_code == 200) {

            } else {
              toast.warning(res.data.message);
            }
            loader("hide");
          })
          .catch((err) => {
            loader("hide");
            toast.error("Something went wrong");
          });
        let filterId = item?.id
        const updatedRes = emailListData?.filter((item) => item?.id !== filterId);
        setEmailListData(updatedRes);
      }
      else {
        const res = await postData(ENDPOINT.WEBINAR_EMAIL_DELETE_COMPAIGN, body);
        let filterId = item?.auto_id
        const updatedRes = emailListData?.filter((item) => item?.auto_id !== filterId);
        setEmailListData(updatedRes);

      }
      loader("hide");
      popup_alert({
        visible: "show",
        message: "Compaign has been deleted <br />successfully !",
        type: "success",
        redirect: "",
      });

      hideConfirmationModal();
      loader("hide");

    } catch (err) {
      loader("hide");
      console.log("--err", err)
    }
  }




  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };

  const showModal = (refernce, item) => {
    hideEmailModal();
    setReference(refernce);
    setCampaignId(item);
    setIsOpen(true);
  };

  const draftEmailCampaign = (draftContent) => {
    setDraftCamapignId(draftContent);
  };
  const handleParent = async () => {
    try {
      loader("show");
      const element = document.getElementById("chart-description");
      // add padding to the element
      const dataUrl = await domtoimage.toPng(element, { cacheBust: true });
      let fileName= (viewEmailData?.campaign ? viewEmailData?.campaign : viewEmailData?.subject).replaceAll(" ","_")
      const link = document.createElement("a");
      // link.download = `${Math.random()}.png`;
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log(err);
    }
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
    const keys = typeof key === 'string' ? key.split('.') : [key];
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

  // const handleSort = (key) => {
  //   setSortBy(key);
  //   setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); 
  // };

  const resendemail = () => {
    hideModal();
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      campaign_id: campaignId?.id,
      event_id:eventId
    };
    loader("show");
    axios
      .post(`webinar/resend_webinar_email`, body)
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

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="top-header regi-web sticky">
              <div className="page-title">
                <h2>Emails</h2>
              </div>
              <div className="top-right-action">
                <div className="search-bar">
                  <form className="d-flex" onSubmit={(e) => submitSearchHandler(e)}>
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
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
                <div className="filter-by nav-item dropdown">
                  <button
                    ref={buttonRef}
                    className={
                      Object.keys(apifilterObject)?.length
                        ? "btn btn-secondary dropdown filter_applied"
                        : "btn btn-secondary dropdown"
                    }
                    type="button"
                    id="dropdownMenuButton2"
                    onClick={() => setShowFilter((showFilter) => !showFilter)}
                  >
                    Filter By
                    {showFilter ? (
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
                    )}
                  </button>
                  {showFilter && (
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
                              {filterdata[key]?.length > 0 ? (
                                <Accordion.Item
                                  className={
                                    key == "role" ? "card upper" : "card"
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
                                            <li key={index}>
                                              {item != "" ? (
                                                <label className="select-multiple-option">
                                                  <input
                                                    type={"checkbox"}
                                                    id={`custom-checkbox-tags-${index}`}
                                                    value={
                                                      typeof item ==
                                                        "object"
                                                        ? item?.title
                                                        : item
                                                    }
                                                    name={key}
                                                    checked={
                                                      typeof item ==
                                                        "object"
                                                        ? appliedFilter[
                                                          key
                                                        ]?.includes(
                                                          item.id
                                                        )
                                                          ? true
                                                          : false
                                                        : appliedFilter[
                                                          key
                                                        ]?.includes(item)
                                                          ? true
                                                          : false
                                                    }
                                                    onChange={(e) =>
                                                      handleOnFilterChange(
                                                        e,
                                                        typeof item ==
                                                          "object"
                                                          ? item.id
                                                          : item,
                                                        index,
                                                        key,
                                                        [...filterdata[key]]
                                                      )
                                                    }
                                                  />
                                                  {typeof item == "object"
                                                    ? item?.title
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
                        <Button
                          className="btn btn-primary btn-bordered"
                          onClick={clearFilter}
                        >
                          Clear
                        </Button>
                        <Button
                          className="btn btn-primary btn-filled"
                          onClick={applyFilter}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="clear-search">
                  {deletestatus ? (
                    <button
                      className="btn btn-outline-primary cancel"
                      onClick={() => setDeleteStatus((deletestatus) => !deletestatus)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-primary"
                      onClick={(e) => setDeleteStatus((deletestatus) => !deletestatus)}
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
              </div>
            </div>
            {Object.keys(filterObject)?.length ? (
              <div className="apply-filter">
                {/* <h6>Applied filters</h6> */}
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
                                      key == "role"
                                        ? "filter-result upper"
                                        : "filter-result"
                                    }
                                    id={item}
                                    rt={index}
                                    b
                                  >
                                    {item}
                                    <img
                                      src={
                                        path_image + "filter-close.svg"
                                      }
                                      onClick={(event) => {
                                        removeindividualfilter(key, item);
                                      }}
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
                    <Button
                      className="btn btn-outline-primary btn-bordered"
                      onClick={clearFilter}
                    >
                      Remove All
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="email-result">
              <div className="col email-result-block">
                {!deletestatus && (
                  <div className="email_box_block">
                    <div className="email-block-add">
                      <Link
                        to="/webinar/email/create-new-email"
                        onClick={createNewEmail}>
                        <img src={path_image + "add-button.svg"} alt="" />
                      </Link>
                      <p>Create New Email</p>
                    </div>
                  </div>
                )}
                {emailListData?.length > 0 ? (
                  emailListData?.map((data) => {
                    return (
                      <div className="email_box_block">
                        <div
                          className={
                            "email_box " +
                            ((data?.status == 5)
                              ? "queue" :
                              data?.status == 1
                                ? "approved"
                                : data?.status == 2
                                  ? "email-draft"
                                  : data?.status == 3
                                    ? "draft-approved"
                                    : "approved")
                          }
                        >
                          <div className="mail-top-title">

                            <span>
                              {(data?.status == 5)
                                ? "Sending in queue" :
                                data?.status == 2 ? "Draft" : "Approved Draft"
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
                                <h5>{data?.subject ? data?.subject : ""}</h5>
                                <p>{data?.event}</p>
                                <div className="mailbox-table">
                                  <table>
                                    <tbody>
                                      <tr>
                                        <th>Campaign</th>
                                        <td>{data?.campaign ? data?.campaign : data?.subject}</td>
                                      </tr>
                                      <tr>
                                        <th>Creator</th>
                                        <td>{data?.creator ? data?.creator : "N/A"}</td>
                                      </tr>
                                      <tr>
                                        <th>List</th>
                                        <td>{data?.smart_list_name ? data?.smart_list_name : "N/A"}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="mailbox-tags">
                                  <ul>
                                    {data?.tags != "" ? (
                                      data?.tags?.map((tag) => {
                                        return <li className="list1">{tag}</li>;
                                      })
                                    ) : (
                                      <li className="list1">N/A</li>
                                    )}
                                  </ul>
                                </div>
                                <div className="mail-time">
                                  <span>{data?.created_at ? data?.created_at : "N/A"}</span>
                                </div>
                              </div>
                              <div className="mail-stats">
                                <ul>
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
                                    <span>{data?.email_sent ? data?.email_sent : 0}</span>
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
                                      {data?.read_precent != "0.00%"
                                        ? data?.read_precent
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
                                      {(data?.labels_value[Object.keys(data?.labels_value)[0]] > 0 && data?.email_read > 0)
                                        ? ((data?.labels_value[Object.keys(data?.labels_value)[0]] / data?.email_read) * 100)?.toFixed(2) + "%"
                                        : 0}{" "}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {
                              data?.previous_campaign != 1 && data?.status != 5 ?
                                (<>
                                  {data?.status == 1 ? (
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
                                                    "webinar/email/selectHCP",
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
                                            {(data?.status == 1) && (data?.email_read != data?.email_sent) ? (
                                                <button
                                                  className="btn btn-primary btn-bordered send"
                                                  onClick={(e) =>
                                                    showModal("resend", data)
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
                                                showViewEmailModal(data)
                                              }
                                            >
                                              View
                                            </button>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    // ) : 
                                    // data.status == 5 ? (
                                    //     <div className="mailbox-buttons d-flex justify-content-end">
                                    //       <button
                                    //             className="btn btn-primary btn-filled edit"
                                    //             onClick={(e) =>
                                    //               showViewEmailModal(data)
                                    //             }
                                    //           >
                                    //             View
                                    //           </button>
                                    //     </div>
                                  ) : (
                                    <div className="mailbox-buttons">
                                      {!deletestatus && (
                                        <div className="mailbox-buttons-list">
                                          {data?.route_location == "VerifyMAIL" &&
                                            data?.pdf_id != 13 ? (
                                            <button
                                              className="btn btn-primary send btn-bordered"
                                              onClick={() => {
                                                getWebinarEmailData(null);
                                                draftEmailCampaign(data?.id);
                                                setDraftEmailSendStatus(
                                                  (getDraftEmailSendStatus) =>
                                                    !getDraftEmailSendStatus
                                                );
                                              }}
                                            >
                                              Send
                                            </button>
                                          ) : (
                                            ""
                                          )}
                                          <button
                                            className="btn btn-primary edit btn-filled"
                                            onClick={() => {
                                              getWebinarEmailData(null);
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
                                  )
                                  }
                                </>)
                                : data?.status != 5 ? (<>
                                  <div className="mailbox-buttons">
                                    {!deletestatus && (
                                      // <div className="mailbox-buttons">
                                      <div className="mailbox-buttons-list">
                                        <button
                                          className="btn btn-primary btn-filled edit"
                                          onClick={(e) =>
                                            showViewEmailModal(data)
                                          }
                                        >
                                          View
                                        </button>
                                      </div>
                                      // </div>
                                    )
                                    } </div>
                                </>) : ""
                            }
                            {deletestatus && (
                              <div className="dlt_btn">
                                <button
                                  onClick={(e) =>
                                    showConfirmationPopup(data)
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
                    );
                  })
                ) : (
                  <div className="email_box_block no_found">
                    <p>No Data Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Col>
      <div>
        <Modal
          id="mail-view"
          show={viewEmailModal}
          onHide={hideEmailModal}
          custom-atr="non-scroll"
          className="mail-view-webinar"
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
                <div className="mail-box-wrap" id="chart-description">
                <div className="mail-box-content">
                  <div className="mail-box-heading-block">
                    <div className="mail-box-heading">
                      <h5>{viewEmailData?.subject}</h5>
                      <p>{viewEmailData?.event}</p>
                    </div>
                    <div className="clear-search top-right-action">
                      {
                        (viewEmailData?.status == 1) && (viewEmailData?.email_read != viewEmailData?.email_sent)
                        ? 
                        <div className="mail-view-btn">
                          <button
                            className="btn btn-primary btn-bordered"
                            onClick={(e) => showModal("send", campaignId)}
                          >
                            Resend
                          </button>
                        </div>
                        : null
                      }
                      <button
                        className="btn print"
                        title="Print Stats"
                        onClick={handleParent}>
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M2 4C2 2.89543 2.89543 2 4 2H7.41667C7.96895 2 8.41667 1.55228 8.41667 1C8.41667 0.447715 7.96895 0 7.41667 0H4C1.79086 0 0 1.79086 0 4V7.41667C0 7.96895 0.447715 8.41667 1 8.41667C1.55228 8.41667 2 7.96895 2 7.41667V4Z" fill="#0066BE"/>
                        <path d="M16.5833 0C16.031 0 15.5833 0.447715 15.5833 1C15.5833 1.55228 16.031 2 16.5833 2H20C21.1046 2 22 2.89543 22 4V7.41667C22 7.96895 22.4477 8.41667 23 8.41667C23.5523 8.41667 24 7.96895 24 7.41667V4C24 1.79086 22.2091 0 20 0H16.5833Z" fill="#0066BE"/>
                        <path d="M2 16.5833C2 16.031 1.55228 15.5833 1 15.5833C0.447715 15.5833 0 16.031 0 16.5833V20C0 22.2091 1.79086 24 4 24H8.33333C8.88562 24 9.33333 23.5523 9.33333 23C9.33333 22.4477 8.88562 22 8.33333 22H4C2.89543 22 2 21.1046 2 20V16.5833Z" fill="#0066BE"/>
                        <path d="M24 16.5833C24 16.031 23.5523 15.5833 23 15.5833C22.4477 15.5833 22 16.031 22 16.5833V20C22 21.1046 21.1046 22 20 22H16.5833C16.031 22 15.5833 22.4477 15.5833 23C15.5833 23.5523 16.031 24 16.5833 24H20C22.2091 24 24 22.2091 24 20V16.5833Z" fill="#0066BE"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 12.5004C9 10.8449 10.344 9.5 11.9996 9.5C13.6551 9.5 15 10.8449 15 12.5004C15 14.156 13.6551 15.5 11.9996 15.5C10.344 15.5 9 14.156 9 12.5004ZM13.7991 12.5004C13.7991 11.5073 12.9927 10.7 11.9996 10.7C11.0064 10.7 10.2 11.5073 10.2 12.5004C10.2 13.4936 11.0064 14.3 11.9996 14.3C12.9927 14.3 13.7991 13.4936 13.7991 12.5004Z" fill="#0066BE"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5963 8.3H18.4615C18.8952 8.3 19.3118 8.46771 19.6194 8.7676C19.927 9.06757 20.1 9.47489 20.1 9.9V16.5C20.1 17.3862 19.3642 18.1 18.4615 18.1H5.53846C4.63579 18.1 3.9 17.3862 3.9 16.5V9.9C3.9 9.47489 4.07298 9.06757 4.38065 8.7676C4.68823 8.46771 5.10478 8.3 5.53846 8.3H7.4037C7.47384 8.3 7.53879 8.26556 7.57717 8.2097L8.67004 6.61137C8.97401 6.16652 9.48587 5.9 10.0326 5.9H13.9674C14.5141 5.9 15.026 6.1665 15.33 6.61137L16.4228 8.20961C16.4611 8.26552 16.5261 8.3 16.5963 8.3ZM9.85906 7.3904L8.76624 8.98866C8.46169 9.43342 7.94989 9.7 7.4037 9.7H5.53846C5.48265 9.7 5.42956 9.72164 5.39042 9.7592C5.35199 9.79727 5.33077 9.84786 5.33077 9.9V16.5C5.33077 16.608 5.42144 16.7 5.53846 16.7H18.4615C18.5786 16.7 18.6692 16.608 18.6692 16.5V9.9C18.6692 9.84787 18.648 9.79729 18.6096 9.75923C18.5705 9.72165 18.5174 9.7 18.4615 9.7H16.5963C16.0501 9.7 15.5383 9.43347 15.2338 8.98871L14.1409 7.3904C14.1026 7.33449 14.0376 7.3 13.9674 7.3H10.0326C9.96249 7.3 9.89744 7.33457 9.85906 7.3904Z" fill="#0066BE"/>
                       </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mailbox-table">
                    <table>
                      <tbody>
                        <tr>
                          <th>Campaign</th>
                          <td>{viewEmailData?.campaign ? viewEmailData?.campaign : viewEmailData?.subject}</td>
                        </tr>
                        <tr>
                          <th>List</th>
                          <td>{viewEmailData?.smart_list_name ? viewEmailData?.smart_list_name : "N/A"}</td>
                        </tr>
                        {/* <tr>
                          <th>Content Title </th>
                          <td>{viewEmailData?.article_title ? viewEmailData?.article_title : "N/A"}</td>
                        </tr> */}
                        {/* <tr>
                          <th>Docintel Link </th>
                          <td>
                            <a
                              href={viewEmailData?.docintel_link ? viewEmailData?.docintel_link : ""}
                              target="_blank"
                            >
                              {viewEmailData?.docintel_link ? viewEmailData?.docintel_link : ""}
                            </a>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                  <div className="mail-time">
                    <span>{viewEmailData?.created_at}</span>
                  </div>
                  <div className="mailbox-tags">
                    <h6>Tags</h6>
                    <ul>
                      {viewEmailData?.tags != "" ? (
                        viewEmailData?.tags?.map((tag) => {
                          return <li className="list1">{tag}</li>;
                        })
                      ) : (
                        <li className="list1">N/A</li>
                      )}
                    </ul>
                  </div>

                </div>
                <div className="chart-description">
                  <div className="mail-stats webinar-mail-stats">
                    <ul className={viewEmailData?.multi_ctr?.length > 0 ? "mail-stats-ul" : ""}>
                      <li
                        onClick={() => {
                          getReaderData("sent", "", "Email sent");
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
                            <span>{viewEmailData?.email_sent}</span>
                          </div>
                        </div>
                      </li>
                      <li
                        onClick={() => {
                          getReaderData("open", "", "Email open");
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

                            <span>{(viewEmailData?.read_precent && viewEmailData?.read_precent != "0.00%")
                              ? viewEmailData?.read_precent
                              : 0}
                            </span>
                          </div>
                        </div>
                      </li>

                      {Object.keys(ctrName)?.length > 0 ? Object.keys(ctrName)?.map((item, index) => (<>
                        <li
                          onClick={() => {
                            getReaderData("ctr", item, viewEmailData?.labels[item]);
                          }}
                        >
                          <div className="mail_click">
                            <div className="mail_click_box">
                              <h6>{viewEmailData?.labels[item]}</h6>
                              <div className="mail_click_box_content">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" > <circle cx="20" cy="20" r="18.5" stroke="#39CABC" stroke-width="3" stroke-linejoin="round" /> <path d="M14.955 16.6329C14.8178 16.1684 14.6861 15.703 14.5871 15.2572C13.9363 14.8722 13.4936 14.1715 13.4936 13.3617C13.4936 12.1434 14.4842 11.1535 15.7017 11.1535C16.9192 11.1535 17.9098 12.1442 17.9098 13.3617C17.9098 13.5292 17.8872 13.6906 17.8521 13.8472C18.0633 14.3125 18.234 14.8363 18.3837 15.3687C18.8046 14.8075 19.0633 14.1177 19.0633 13.3617C19.0633 11.5043 17.5591 10 15.7017 10C13.8443 10 12.3408 11.5043 12.3408 13.3617C12.3408 14.961 13.4593 16.2931 14.955 16.6329Z" fill="#39CABC" /> <path d="M12.6329 24.5915C13.4615 23.696 14.3913 24.0467 15.6361 24.2361C16.7054 24.4006 17.7584 24.1005 17.6883 23.5229C17.5776 22.5884 17.4217 22.1706 17.0671 20.9602C16.7842 19.9976 16.2471 18.2626 15.7584 16.604C15.1037 14.385 14.9143 13.3546 15.7857 13.0974C16.7249 12.8238 17.2635 14.1582 17.7514 16.0085C18.3071 18.1145 18.5994 19.0444 18.7631 18.9953C19.0515 18.9127 18.6571 18.0116 19.4116 17.7895C20.3547 17.5152 20.5371 18.2525 20.8013 18.1784C21.0655 18.0989 20.9759 17.3523 21.728 17.1325C22.4841 16.9142 22.8637 17.8448 23.1754 17.7521C23.4841 17.6609 23.4771 17.325 23.9432 17.1917C24.41 17.053 26.1668 17.8394 27.1723 21.2743C28.4342 25.5931 27.0125 26.3959 27.4435 27.8581L21.8107 30C21.3547 28.9033 19.9424 28.8222 18.693 28.1231C17.4342 27.4146 16.5792 26.0342 13.2986 26.1013C12.0647 26.1262 12.1232 25.1426 12.6329 24.5915Z" fill="#39CABC" /> </svg>
                                <span>{ctrName[item] + "(" + ((ctrName[item] / viewEmailData?.email_read) * 100)?.toFixed(2) + "%)"}</span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </>))
                        : ""}
                    </ul>
                  </div>
                  <div className="chart-description-view">
                    <HighchartsReact
                      key={campaignId?.auto_id}
                      highcharts={Highcharts}
                      options={options}
                    />
                  </div>
                </div>
                </div>
                {viewEmailData?.template ? (<> <div className="preview-mail-box" dangerouslySetInnerHTML={{ __html: viewEmailData?.template, }} ></div> </>) : ""}
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Modal
          className="modal modal-second"
          id="mail-view"
          show={readerDetailsPopupStatus}
        >
          <Modal.Header>
            <h4
            // style={{ color: popupHeadingColor }}
            >
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
                <div className="d-flex justify-content-end">
                  <div className="clear-search mx-3">
                    <button
                      className="btn print"
                      title="Download data"
                      onClick={() => {
                        downloadUsers(readerDetailsData);
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                          fill="#0066BE"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <table className="table" id="table-to-xls">
                  <thead className="sticky-header">
                    <tr>
                      {/* <th scope="col">Name</th> */}
                      <th scope="col" className="sort_option" >
                        <span onClick={(e) => userSort(e, "name")} >
                          Name
                          <button
                            className={`event_sort_btn ${isActive?.name == "dec"
                              ? "svg_active"
                              : isActive?.name == "asc"
                                ? "svg_asc"
                                : ""
                              }`}
                            onClick={(e) => userSort(e, "name")}
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

                      {/* <th scope="col" className="sort_option" >
                                <span onClick={() => handleSort('name')} >
                                Name
                                <button
                                className={`event_sort_btn ${sortBy == "name" ?
                                sortOrder == "asc"
                                ? "svg_asc"
                                : "svg_active"
                                : "" 
                                }`}
                                onClick={() => handleSort('name')}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_3722_6611">
                                        <rect width="8" height="8" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                </button>
                                </span>
                            
                            </th> */}
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
                      {/* <th scope="col">Country</th> */}
                      <th scope="col" className="sort_option" >
                        <span onClick={(e) => userSort(e, "country")}>
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
                      {/* <th scope="col">Date</th> */}
                      <th scope="col" className="sort_option" >
                        <span onClick={(e) => userSort(e, "formatted_date")}>
                          Date
                          <button
                            className={`event_sort_btn ${isActive?.formatted_date == "dec"
                              ? "svg_active"
                              : isActive?.formatted_date == "asc"
                                ? "svg_asc"
                                : ""
                              }`}
                            onClick={(e) => userSort(e, "formatted_date")}
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
                    </tr>

                  </thead>
                  <tbody>
                    {typeof readerDetailsData !== "undefined" &&
                      readerDetailsData?.length > 0 ? (<>
                        {readerDetailsData?.map((item, index) => (
                          <>
                            <tr
                              key={"readers_" + index}
                              className="hcp"
                              id={`row-selected` + index}
                            >
                              <td>
                                {item?.name}
                              </td>
                              <td> {item?.email ? item?.email : "N/A"}
                              </td>
                              <td>
                                <span>
                                  {item?.country ? item?.country : "N/A"}
                                </span>
                              </td>
                              <td>
                                <span>
                                  {item?.formatted_date ? item?.formatted_date : "N/A"}
                                </span>
                              </td>
                            </tr>
                          </>
                        ))}
                     
                  </>) : readerDetailsData?.length == 0 ? (
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
                  {  readerDetailsData?.length >= 50 && functionParameter?.loadAll==1 &&    (<div className="text-center load_more">
                    <button className="btn btn-primary btn-filled" onClick={()=>getReaderData(functionParameter?.type,functionParameter?.dynamic_name,functionParameter?.popup_name,2)}>
                      Load All
                    </button>
                  </div>)}
              </div>
            }
          </Modal.Body>
        </Modal>
      </div>

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
                  onClick={(e) => showViewEmailModal(campaignId)}
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

      <CommonConfirmModel
        show={confirmationpopup}
        onClose={hideConfirmationModal}
        fun={deleteCompaign}
        popupMessage={popupMessage}
        path_image={path_image}
        resetDataId={campaignId}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {
  getWebinarEmailData: getWebinarEmailData,
  getWebinarSelectedSmartListData: getWebinarSelectedSmartListData,
  getWebinarDraftData: getWebinarDraftData,
})(WebinarEmail);;