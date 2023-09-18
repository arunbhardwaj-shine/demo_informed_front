import React, { useState, useEffect } from "react";
import { Col, Row, Table,Button, ProgressBar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { postData, getData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import moment from "moment";
import { loader } from "../../../loader";
import Select from "react-select";
import DatePicker from "react-datepicker";
import CommonModel from "../../../Model/CommonModel";
import { popup_alert } from "../../../popup_alert";
import "react-datepicker/dist/react-datepicker.css";
// import {
//   Accordion,
//   Col,
//   Row,
//   Modal,
//   Tab,
//   Tabs,
//   ProgressBar,
//   Button,
// } from "react-bootstrap";

const MarketingTimeLineDetail = (props) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const BrokenImage =
    "https://docintel.s3-eu-west-1.amazonaws.com/cover/default/default.png";
  const { state } = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [channel, setChannelAll] = useState([]);
  const [pipelineStage, setPipelineStageAll] = useState([]);
  const [probablity, setProbablityAll] = useState([]);
  const [logactivity, setLogactivityAll] = useState([]);
  const [changePipelineStage, setChangePipelineStage] = useState('');
  const [changeProbablity, setChangeProbablity] = useState('');  
  const [commonHeader, setCommonHeader] = useState("");
  const [commonFooter, setCommonFooter] = useState("");
  const [data, setData] = useState([]);
  const [readerId, setReaderId] = useState(
    localStorage.getItem("myData")
  );
  const [newProduct, setNewProduct] = useState({
    label: "",
    value: "",
  });
  const [commanShow, setCommanShow] = useState(false);
   let obj = {
     "em":"Email",
     "Email":"Email",
     "Peer":"Peer",
     "peer":"Peer",
     "QRcode":"QR Code",
     "QRcode.":"QR Code",
     "GO_code":"GO CODE",
     "InforMedGo":"InforMedGo",
     "re":"Email",
     "Reparkive":"GO CODE",
     "Web":"Direct Link"

   }
   const deviceObj = {
     "Ios":"iOS APP",
     "IOS":"iOS APP",
     "ios":"iOS APP",
     "i":"iOS APP",
     "I":"iOS APP",
     "Android":"Android APP",
     "a":"Android APP",
     "A":"Android APP",
     "android":"Android APP",
     "Web":"Web",
     "web":"Web"
   }
   const [userInputs, setUserInputs] = useState({
    pipeline: "",
    channel : "",
    opportunity_value: "",
    probability: "",
    log_activity:"",
    next_contact: "",
   })
  const [ebookData, setEbookData] = useState([]);
  function isJSONValid(jsonString) {
    try {
        JSON.parse(jsonString);
        return true; // JSON is valid
    } catch (error) {
        return false; // JSON is not valid
    }
}

  const handleClick = async (index, pdf_id, cdate,detail ={}) => {
    if (index == activeIndex) {
      setIsActive((current) => !current);
    } else {
      setActiveIndex(index);
      try {
        setIsActive(false);
        loader("show");
        let crdate = moment(cdate).format("YYYY/MM/DD");

        let body = {
          pdfId: pdf_id,
          userId: readerId,
          cdate: crdate,
          staticpdfId:detail?.staticpdf_id
        };
        const res = await postData(ENDPOINT.GETREADERTIMELINEDETAIL, body);
        if (res?.data?.data) {
          setEbookData(res?.data?.data);
        }
        loader("hide");
        setIsActive(true);
      } catch (err) {
        loader("hide");
        setEbookData([]);
      }
    }
  };
  const handleLoadMore = () =>{
    // alert("hi")
    // console.log(" im here")
    setPage(page+1)
    getUserTimelineData(page+1)
  }

  const [timeLineData, setTimeLineData] = useState({});
  const [timeLineStatsData, setTimeLineStatsData] = useState({});
  const [apiFlag, setApiFlag] = useState(0);

  useEffect(() => {
    getUsersFilters();
    getUserTimelineData();
  }, []);

  const getUsersFilters = async() => {
    try{
        let body = {
        user_id: localStorage.getItem("user_id"),
        };
        const res_data = await getData(ENDPOINT.MARKETING_READER_USER_DROP, body);
        let pipeline = [];
        let probablity = [];
        let channel = [];
        let log = [];
    
        Object.entries(res_data?.data?.data?.pipeline).map(([index, item]) => {
        pipeline.push({
            value: item.value,
            label: item.label,
        });
        setPipelineStageAll(pipeline);
        });

        Object.entries(res_data?.data?.data?.probablity).map(([index, item]) => {
        probablity.push({
            value: item.value,
            label: item.label,
        });
        setProbablityAll(probablity);
        });

        Object.entries(res_data?.data?.data?.chanel).map(([index, item]) => {
            channel.push({
                value: item.value,
                label: item.label,
            });
            setChannelAll(channel);
        });

        Object.entries(res_data?.data?.data?.log_activity).map(([index, item]) => {
            log.push({
                value: item.value,
                label: item.label,
            });
            setLogactivityAll(log);
        });
        }catch(err){
        console.log(err);
    }
  }

  const getTimeLineStatsData = async() => {
    try {
        if (typeof readerId === "undefined") {
            if (state?.readerId) {
                setReaderId(state?.readerId);
            }
        }
        let body = {
          readerId: readerId,
        };
        const res = await postData(ENDPOINT.MARKETINGREADERACTIVITY, body);
        if (res?.data?.data) {
          let new_data = res?.data?.data;
          setTimeLineStatsData(new_data);
        }
    } catch (err) {
    console.log(err);
    }
  }

  const getUserTimelineData = async (pageNo = 1) => {
    try {
      loader("show");
      if (typeof readerId === "undefined") {
        if (state?.readerId) {
          setReaderId(state?.readerId);
        }
      }
      const res = await postData(ENDPOINT.MARKETINGUSERTIMELINE, {
        userId: readerId,
        page:pageNo?pageNo:page,
         loadMoreId:timeLineData?.loadMore?.[0]?.id
      });
      await getTimeLineStatsData();
      if(Object.keys(timeLineData)?.length){

        console.log("First");
        // let newAr = [...timeLineData?.timeline,...res?.data?.data?.timeline]
        const data = {
          timeline:res?.data?.data?.timeline,
          user:timeLineData?.user,
          loadMore:res?.data?.data?.loadMore
        }
        setTimeLineData(data);

      }else{
        setTimeLineData(res?.data?.data);
      }
      setUserInputs({
        ...userInputs,
        pipeline: res?.data?.data?.user?.pipeline,
        channel : res?.data?.data?.user?.chanel,
        opportunity_value: res?.data?.data?.user?.opportunity_value,
        probability: res?.data?.data?.user?.probability,
        log_activity:res?.data?.data?.user?.log_activity,
        next_contact: res?.data?.data?.user?.next_contact,
      });
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("err",err);
    }
    setApiFlag(1);
  };

  const printPage = () => {
    window.print();
  };

  const imageOnError = (event) => {
    event.currentTarget.src = BrokenImage;
    event.currentTarget.className = "error";
  };

  const handleChange = async(e, isSelectedName) => {
    if(isSelectedName == "opportunity_value"){
        setUserInputs({
            ...userInputs,
            [isSelectedName ? isSelectedName : e.target.name]: isSelectedName ? e?.target?.value : e?.target?.value,
          });
    }else{
        setUserInputs({
            ...userInputs,
            [isSelectedName ? isSelectedName : e.target.name]: isSelectedName ? e : e?.target?.value,
          });
    }
  }

  const updateReaderDetails = async() => {
    try{
        loader("show");
        let payload = userInputs;
        let getDate = payload?.next_contact;
        let new_date = "";
        if(isValidDateFormat(getDate)){
            new_date = convertDate(getDate);
        }else if(issecondValidDateFormat(getDate)){
            new_date = getDate;
        }else{
            new_date = formatDate(getDate);
        }
        payload.next_contact = new_date;
        payload.user_id = readerId;
        
        const res = await postData(ENDPOINT.UPDATETIMELINEMARKETINGDETAILS, payload);
        loader("hide");
        popup_alert({
            visible: "show",
            message: "Your Profile has been updated successfully!",
            type: "success",
            redirect: "",
          });
    }catch(err){
        loader("hide");
        console.log(err);
    }
  }

  const formatDate = (newDate) => {
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const day = String(newDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    function isValidDateFormat(dateString) {
        //30 September 2023
        const regex = /^\d{1,2} [A-Za-z]+ \d{4}$/;
        return regex.test(dateString);
    }

    function issecondValidDateFormat(dateString) {
        //2023-09-30
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(dateString);
    }

    function convertDate(dateString) {
        const formattedDate = moment(dateString, 'DD MMMM YYYY').format('YYYY-MM-DD');
        return formattedDate;
    }

    const addNewProductClicked = async(e, statusMsg) => {
        e.preventDefault();
        setCommanShow(true);
        if (statusMsg == "pipeline") {
            setNewProduct("");
            setData(() => [
              {
                name: "pipeline",
                label: "Pipeline",
                type: "input",
                placeholder: "Type pipeline",
              },
            ]);
            setCommonHeader("Add New Pipeline");
        }

        if (statusMsg == "chanel") {
            setNewProduct("");
            setData(() => [
              {
                name: "chanel",
                label: "chanel",
                type: "input",
                placeholder: "Type chanel",
              },
            ]);
            setCommonHeader("Add New chanel");
        }
        setCommonFooter("Add");
    }

    const handleModelFun = (e) => {
        setNewProduct({
          label: e?.target?.name?.trim(),
          value: e?.target?.value?.trim(),
        });
    };

    const handleSubmitModelFun = async (e) => {
        try {
          const obj = {
            title: "title",
    
            prospect: "prospect",
    
            ownership: "contact_ownership",
    
            companyName: "company_name",
    
            companyProduct: "company_product",
    
            therapyArea: "company_therapy_area",
    
            local: "local",
    
            task: "task",
    
            pipeline: "pipeline",
    
            logActivity: "log_activity",

            chanel: "chanel",
          };
          loader("show");
          // const hasData = await postData(`${ENDPOINT.ADD_MARKETING_FEATURES}`, { label: newProduct.label, value: newProduct.value });
          await postData(`${ENDPOINT.ADD_MARKETING_FEATURES}`, {
            label: obj[newProduct.label],
            value: newProduct.value,
          });
            if (newProduct.label == "pipeline") {
                let pipeline = pipelineStage;
                pipeline.unshift({
                label: newProduct.value,
                value: newProduct.value,
                });
                setPipelineStageAll(pipeline);
            }
            if (newProduct.label == "chanel") {
                let pipeline = channel;
                channel.unshift({
                label: newProduct.value,
                value: newProduct.value,
                });
                setChannelAll(pipeline);
            }
        } catch (err) {
          console.log("--err", err);
        } finally {
          loader("hide");
        }
      };

  return (
    <>
      <Col className="right-sidebar col">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav">
              <Row className="justify-content-end align-items-center">
                <Col md="6">
                  <div className="page-title d-flex align-items-center">
                    <Link
                      className="btn btn-primary btn-bordered back-btn"
                      to="/readers-view"
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
                    <h2>Timeline</h2>
                  </div>
                </Col>
                <Col md="4"></Col>
                <Col md="2">
                  <div className="header-btn">
                    <button className="btn print" onClick={(e) => printPage()}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <mask
                          id="mask0_1144_989"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="24"
                          height="24"
                        >
                          <path
                            d="M0 1.90735e-06H24V24H0V1.90735e-06Z"
                            fill="white"
                          />
                        </mask>
                        <g mask="url(#mask0_1144_989)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.51562 17.4023C2.29226 17.4023 1.30078 16.4109 1.30078 15.1875V9.5625C1.30078 8.33914 2.29226 7.34766 3.51562 7.34766H20.4844C21.7077 7.34766 22.6992 8.33914 22.6992 9.5625V15.1875C22.6992 16.4109 21.7077 17.4023 20.4844 17.4023H19.125C18.7949 17.4023 18.5273 17.6699 18.5273 18C18.5273 18.3301 18.7949 18.5977 19.125 18.5977H20.4844C22.3679 18.5977 23.8945 17.071 23.8945 15.1875V9.5625C23.8945 7.67899 22.3679 6.15234 20.4844 6.15234H3.51562C1.63211 6.15234 0.105469 7.67899 0.105469 9.5625V15.1875C0.105469 17.071 1.63211 18.5977 3.51562 18.5977H4.875C5.20508 18.5977 5.47266 18.3301 5.47266 18C5.47266 17.6699 5.20508 17.4023 4.875 17.4023H3.51562Z"
                            fill="#0066BE"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.15234 14.25C3.15234 14.5801 3.41992 14.8477 3.75 14.8477H20.25C20.5801 14.8477 20.8477 14.5801 20.8477 14.25C20.8477 13.9199 20.5801 13.6523 20.25 13.6523H3.75C3.41992 13.6523 3.15234 13.9199 3.15234 14.25Z"
                            fill="#0066BE"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.28125 22.6992C5.8347 22.6992 5.47266 22.3372 5.47266 21.8906V14.8477H18.5273V21.8906C18.5273 22.3372 18.1653 22.6992 17.7187 22.6992H6.28125ZM4.27734 21.8906C4.27734 22.9973 5.17455 23.8945 6.28125 23.8945H17.7187C18.8254 23.8945 19.7227 22.9973 19.7227 21.8906V14.25C19.7227 13.9199 19.4551 13.6523 19.125 13.6523H4.875C4.54492 13.6523 4.27734 13.9199 4.27734 14.25V21.8906Z"
                            fill="#0066BE"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.52734 17.25C9.52734 17.5801 9.79492 17.8477 10.125 17.8477H13.875C14.2051 17.8477 14.4727 17.5801 14.4727 17.25C14.4727 16.9199 14.2051 16.6523 13.875 16.6523H10.125C9.79492 16.6523 9.52734 16.9199 9.52734 17.25Z"
                            fill="#0066BE"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.52734 20.25C9.52734 20.5801 9.79492 20.8477 10.125 20.8477H13.875C14.2051 20.8477 14.4727 20.5801 14.4727 20.25C14.4727 19.9199 14.2051 19.6523 13.875 19.6523H10.125C9.79492 19.6523 9.52734 19.9199 9.52734 20.25Z"
                            fill="#0066BE"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.15234 9.75C3.15234 10.0801 3.42029 10.3477 3.75081 10.3477H4.23543C4.56595 10.3477 4.8339 10.0801 4.8339 9.75C4.8339 9.41992 4.56595 9.15234 4.23543 9.15234H3.75081C3.42029 9.15234 3.15234 9.41992 3.15234 9.75Z"
                            fill="#0066BE"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.27734 6.75C4.27734 7.08008 4.54492 7.34766 4.875 7.34766H19.125C19.4551 7.34766 19.7227 7.08008 19.7227 6.75V3.51562C19.7227 1.63225 18.1959 0.105469 16.3125 0.105469H7.6875C5.80413 0.105469 4.27734 1.63225 4.27734 3.51562V6.75ZM5.47266 6.15234V3.51562C5.47266 2.2924 6.46428 1.30078 7.6875 1.30078H16.3125C17.5357 1.30078 18.5273 2.2924 18.5273 3.51562V6.15234H5.47266Z"
                            fill="#0066BE"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
            <div></div>
            {apiFlag > 0 ? (
              typeof timeLineData !== "undefined" &&
              Object.keys(timeLineData).length > 0 ? (
                <>
                  <div className="vertical-timeline d-flex align-items-start">
                    <div>
                        <div className="timeline-left-user mb-3">
                            <div className="timeline-left-user-detail">
                            <h5>
                                Name: &nbsp;
                                {timeLineData?.user?.name
                                ? timeLineData?.user?.name
                                : "N/A"}
                            </h5>
                            <Table>
                                <tbody>
                                <tr>
                                    <th>Company</th>
                                    <td>{timeLineData?.user?.company ? timeLineData?.user?.company : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{timeLineData?.user?.phone ? timeLineData?.user?.phone.split("-informed-") : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Product</th>
                                    <td>{timeLineData?.user?.product ? timeLineData?.user?.product : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Country</th>
                                    <td>
                                    {timeLineData?.user?.country
                                        ? timeLineData?.user?.country
                                        : "N/A"}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Primary Email </th>
                                    <td>{timeLineData?.user?.email}</td>
                                </tr>
                                <tr>
                                    <th>Customer type</th>
                                    <td>{timeLineData?.user?.customer_type ? timeLineData?.user?.customer_type : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Contact ownership</th>
                                    <td>{timeLineData?.user?.contact_ownership ? timeLineData?.user?.contact_ownership : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Pipeline stage</th>
                                    <td>{timeLineData?.user?.pipeline ? timeLineData?.user?.pipeline : "N/A"}</td>
                                </tr>
                                </tbody>
                            </Table>
                            </div>
                        </div>

                        {/*Change Div Start */}
                        <div className="timeline-left-user mb-3">
                            <div className="timeline-left-user-detail">
                                <ul>
                                    <li>
                                        <h6 class="tab-content-title">Chanel</h6>
                                        <div className="select-dropdown-wrapper">
                                                <div className="select">
                                                    <>
                                                    <Select
                                                        options={channel}
                                                        defaultValue={
                                                            channel[
                                                            channel.findIndex(
                                                            (el) =>
                                                                el.value.toLowerCase() ==
                                                                userInputs?.channel?.toLowerCase()
                                                            )
                                                        ]
                                                        }
                                                        name="channel"
                                                        onChange={(e) => handleChange(e?.value, "channel")}
                                                        id={"channel"}
                                                        className="dropdown-basic-button split-button-dropup"
                                                        isClearable
                                                    />
                                                    </>
                                                    
                                                </div>
                                                <div className="add_product">
                                                    <Button
                                                    className="btn-bordered btn-voilet"
                                                    onClick={(e) => addNewProductClicked(e, "chanel")}
                                                    >
                                                    Add +
                                                    </Button>
                                                </div>
                                            </div>
                                    </li>
                                    <li>
                                        <h6 class="tab-content-title">Value</h6>
                                        <div className="select-dropdown-wrapper">
                                                <div className="select">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="opportunity_value"
                                                    placeholder="value"
                                                    value={userInputs?.opportunity_value}
                                                    onChange={(e) => handleChange(e, "opportunity_value")}
                                                />
                                                </div>
                                            </div>
                                    </li>
                                    <li>
                                        <h6 class="tab-content-title">Pipeline stage</h6>
                                        <div className="select-dropdown-wrapper">
                                                <div className="select">
                                                    <Select
                                                        options={pipelineStage}
                                                        defaultValue={
                                                            pipelineStage[
                                                                pipelineStage.findIndex(
                                                                (el) =>
                                                                    el.value.toLowerCase() ==
                                                                    userInputs?.pipeline?.toLowerCase()
                                                                )
                                                            ]
                                                        }
                                                        name="pipeline"
                                                        onChange={(e) => handleChange(e?.value, "pipeline")}
                                                        id={"pipeline_stage"}
                                                        className="dropdown-basic-button split-button-dropup"
                                                        isClearable
                                                    />
                                                </div>
                                                <div className="add_product">
                                                    <Button
                                                    className="btn-bordered btn-voilet"
                                                    onClick={(e) => addNewProductClicked(e, "pipeline")}
                                                    >
                                                    Add +
                                                    </Button>
                                                </div>
                                            </div>
                                    </li>
                                    <li>
                                        <h6 class="tab-content-title">Probablity (%)</h6>
                                        <div className="select-dropdown-wrapper">
                                                <div className="select">
                                                    <Select
                                                        options={probablity}
                                                        defaultValue={
                                                            probablity[
                                                                probablity.findIndex(
                                                            (el) =>
                                                                el.value ==
                                                                userInputs?.probability
                                                            )
                                                        ]
                                                        }
                                                        name="probability"
                                                        id={"probability"}
                                                        onChange={(e) => handleChange(e?.value, "probability")}
                                                        className="dropdown-basic-button split-button-dropup"
                                                        isClearable
                                                    />
                                                </div>
                                            </div>
                                    </li>
                                    <li>
                                        <h6 class="tab-content-title">Note</h6>
                                        <div className="select-dropdown-wrapper">
                                                <div className="select">
                                                    <Select
                                                        options={logactivity}
                                                        defaultValue={
                                                            logactivity[
                                                                logactivity.findIndex(
                                                            (el) =>
                                                                el.value.toLowerCase() ==
                                                                userInputs?.log_activity?.toLowerCase()
                                                            )
                                                        ]
                                                        }
                                                        name="log_activity"
                                                        id={"note"}
                                                        onChange={(e) => handleChange(e?.value, "log_activity")}
                                                        className="dropdown-basic-button split-button-dropup"
                                                        isClearable
                                                    />
                                                </div>
                                            </div>
                                    </li>
                                    <li>
                                        <h6 class="tab-content-title">Next step</h6>
                                        <div className="crm_picker">
                                            <DatePicker
                                                selected={
                                                    userInputs?.next_contact
                                                    ? new Date(userInputs?.next_contact)
                                                    : new Date(
                                                    moment(new Date(), "MM/DD/YYYY")
                                                    .format("MM/DD/YYYY")
                                                    )
                                                }
                                                name="expDatetime"
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                                onChange={(e) => handleChange(e, "next_contact")}
                                                id={"date_change"}
                                                />
                                        </div>
                                    </li>
                                </ul>

                                <div className="data-main-footer-sec">
                                    <div className="footer-btn d-flex justify-content-end">
                                    <Button className="btn btn-primary btn-filled update" onClick={(e) =>updateReaderDetails()}>
                                        Update
                                    </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Change Div End */}

                        {/*Stats Div Start */}
                        <div className="timeline-left-user">
                            <div className="timeline-left-user-detail">
                            <Table>
                                <tbody>
                                <tr>
                                    <th>Contact total</th>
                                    <td>
                                        <div className="data-progress delivered">
                                            <ProgressBar
                                            variant="default"
                                            now={2}
                                            label={
                                                timeLineStatsData?.TouchPoint
                                                ? timeLineStatsData?.TouchPoint
                                                : 0
                                            }
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Email sent</th>
                                    <td>
                                        <div className="data-progress send">
                                            <ProgressBar
                                            variant="default"
                                            now={2}
                                            label={
                                                timeLineStatsData?.emailSent
                                                ? timeLineStatsData?.emailSent
                                                : 0
                                            }
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Email opened</th>
                                    <td>
                                        <div className="data-progress open">
                                            <ProgressBar
                                            variant="default"
                                            now={2}
                                            label={
                                                timeLineStatsData?.emailOpen
                                                ? timeLineStatsData?.emailOpen
                                                : 0
                                            }
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Content with RTR</th>
                                    <td>
                                        <div className="data-progress rtr">
                                            <ProgressBar
                                            variant="default"
                                            now={2}
                                            label={
                                                timeLineStatsData?.rtr
                                                ? timeLineStatsData?.rtr
                                                : 0
                                            }
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Calls</th>
                                    <td>
                                        <div className="data-progress content-opening">
                                            <ProgressBar
                                            variant="default"
                                            now={2}
                                            label={
                                                timeLineStatsData?.calls
                                                ? timeLineStatsData?.calls
                                                : 0
                                            }
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>First touch point</th>
                                    <td>{timeLineData?.user?.first_touch_point ? timeLineData?.user?.first_touch_point : "N/A"}</td>
                                </tr>
                                </tbody>
                            </Table>
                            </div>
                        </div>
                        {/*Stats Div End */}
                    </div>
                    {
                      timeLineData?.timeline?.length? <div className="timeline-right-list">
                      <div className="timeline-right-list-view">
                        {timeLineData?.timeline.map((details, index) => {
                          return (
                            <>
               
                              {( details.action == "Article opened") && (
                                <div className="timeline-box">
                                  <div className="timeline_date">
                                    {details?.date == moment("1970-01-01").format("DD MMM YYYY")?"N/A":details?.date}
                                  </div>
                                  <div className="timeline-block">
                                    <div className="timeline-block-head read">
                                      <div className="timeline-block-title">
                                        <div className="timeline-block-img">
                                          <img
                                            src={
                                              path_image + "read-content.png"
                                            }
                                            alt=""
                                          />
                                        </div>
                                        <h6>Content Opened</h6>
                                      </div>
                                      <div className="timeline-time-view">
                                        <div className="timeline-time">
                                          {details?.time}
                                        </div>
                                        |
                                        <div className="timeline-timezone">
                                          {details?.timezone}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="timeline-article d-flex">
                                      <div className="timeline-article-image">
                                        <img
                                          src={path_image + "dummy-img1.png"}
                                          alt=""
                                        />
                                      </div>
                                      <div className="timeline-article-detail">
                                        <div className="timeline-title">
                                          <p>{details?.pdfTitle}</p>
                                        </div>
                                        <div className="timeline-subtitle">
                                          <p>{details?.pdf_sub_title}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="timeline-article-device">
                                      <Table>
                                        <tbody>
                                          <tr>
                                            <th className="device-title">
                                              Source
                                            </th>
                                            <td className="device-name">
                                              {details?.webinar != ""
                                                ? details.webinar
                                                : deviceObj[details?.device_used]?deviceObj[details?.device_used]:details?.device_used}
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="device-title">
                                              Medium
                                            </th>
                                            <td className="device-name">
                                                 {
                                                  details?.campaign_name ==0 ||details?.campaign_name == "" || details?.campaign_name == null?"N/A": obj[details.campaign_name]?obj[details.campaign_name] :details.campaign_name 
                                                 }
                                                 </td>
                                          </tr>
                                          <tr>
                                            <th className="device-title">
                                              Article Read
                                            </th>
                                            <td className="device-name">
                                                 {
                                                  details?.pdfTimeTracks 
                                                 }
                                                 </td>
                                          </tr>
                                              
                                        </tbody>
                                      </Table>
                                    </div>
                                    {/* details.file_type && details.file_type == "ebook"? "": */}
                                    {
                                        details?.pdfTimeTracks == "No"?""
                                       :<div
                                     className={
                                       isActive && details.id == activeIndex
                                         ? "timeline-article-detail-full active"
                                         : "timeline-article-detail-full"
                                     }
                                     onClick={(e) => {
                                       handleClick(
                                         details.id,
                                         details.pdf_id,
                                         details.Created,
                                         details
                                       );
                                     }}
                                   >
                                     
                                     <div className="timeline-article-details-heading">
                                       <p>
                                         Details{" "}
                                         <img
                                           src={path_image + "down-arrow.png"}
                                           alt=""
                                         />
                                       </p>
                                     </div>
                                     <div className="timeline-article-details-overall">
                                       <div className="data-main-box tab-panel">
                                         {/* <div className="timeline-article-details-boxes"> */}
                                           {typeof ebookData !== "undefined" &&
                                           ebookData.length > 0 ? (
                                             <>
                                               {ebookData.map(
                                                 (data, index) => {
                                                return (
                                                      <div className="timeline-article-details-boxes d-flex">
                                                       {data?.chapter?<h3 >Chapter name: {data?.chapter}</h3>:""} 
                                                          {data?.data?.length? data?.data.map(item =>{
                                                    return (
                                                      <div className={`media media-${item?.flag}`}>
                                                            <div className="media-left">
                                                              {
                                                                item?.image ?<img src={item?.image}  />:<p>
                                                                Page: {item?.page}
                                                              </p>
                                                              }
                                                             
                                                            </div>
                                                            <div className="media-right">
                                                              <p>
                                                                <span>
                                                                  Time Needed:{" "}
                                                                  {item?.minimum}{" "}
                                                                  seconds
                                                                </span>{" "}
                                                                <span>
                                                                  Time Spent:{" "}
                                                                  {
                                                                    item?.timeSpend
                                                                  }{" "}
                                                                  seconds
                                                                </span>
                                                              </p>
                                                              <div className="content-type">{item?.readContent}</div>
                                                            </div>
                                                          </div>
                                                       
                                                       )
                                                    }):""}

                                                     </div>
                                                ) 
                                                  //  return (
                                                  //    <>
                                                           
                                                     
                                                  
                                                  //    </>
                                                  //  );
                                                 }
                                               )}
                                             </>
                                           ) : (
                                             <div className="no_found">
                                               <p>No Data Found</p>
                                             </div>
                                           )}
                                         {/* </div> */}
                                       </div>
                                     </div>
                                   </div>
                                    }
                                   
                                  </div>
                                </div>
                              )}
                              {["Immunology library opened in Docintel App","Haematology library opened in Docintel App","Critical Care library opened in Docintel App" ].includes(details?.action)
                                && (
                                <div className="timeline-box">
                                  <div className="timeline_date">
                                    {details?.date}
                                  </div>
                                  <div className="timeline-block">
                                    <div className="timeline-block-head opened">
                                      <div className="timeline-block-title">
                                        <div className="timeline-block-img">
                                          <img
                                            src={
                                              path_image + "open-content.png"
                                            }
                                            alt=""
                                          />
                                        </div>
                                        <h6>Opened Library</h6>
                                      </div>
                                      <div className="timeline-time-view">
                                        <div className="timeline-time">
                                          {details?.time}
                                        </div>
                                        |
                                        <div className="timeline-timezone">
                                          {details?.timezone}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="timeline-article d-flex">
                                      <div className="timeline-article-image">
                                        <img
                                          src={path_image + "dummy-img1.png"}
                                          alt=""
                                        />
                                      </div>
                                      <div className="timeline-article-detail">
                                        <div className="timeline-title">
                                          <p>{details?.action}</p>
                                        </div>
                                        <div className="timeline-subtitle">
                                          <p>{details?.pdf_sub_title}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="timeline-article-device">
                                      <Table>
                                        <tbody>
                                          <tr>
                                            <th className="device-title">
                                              Source
                                            </th>
                                            <td className="device-name">
                                              {details?.webinar != ""
                                                ? details.webinar
                                                : deviceObj[details?.device_used]?deviceObj[details?.device_used]:details?.device_used}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </Table>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {details?.action ==
                                "Checked Library in Docintel app" && (
                                <div className="timeline-box">
                                  <div className="timeline_date">
                                    {details?.date}
                                  </div>
                                  <div className="timeline-block">
                                    <div className="timeline-block-head library">
                                      <div className="timeline-block-title">
                                        <div className="timeline-block-img">
                                          <img
                                            src={
                                              path_image +
                                              "checked-docintel.png"
                                            }
                                            alt=""
                                          />
                                        </div>
                                        <h6>Checked Docintel Library</h6>
                                      </div>
                                      <div className="timeline-time-view">
                                        <div className="timeline-time">
                                          {details?.time}
                                        </div>
                                        |
                                        <div className="timeline-timezone">
                                          {details?.timezone}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="timeline-article-device">
                                      <Table>
                                        <tbody>
                                          <tr>
                                            <th className="device-title">
                                              Source
                                            </th>
                                            <td className="device-name">
                                              {details?.webinar != ""
                                                ? details.webinar
                                                : deviceObj[details?.device_used]?deviceObj[details?.device_used]:details?.device_used}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </Table>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {details?.action == "Login to docintel" && (
                                <div className="timeline-box">
                                  <div className="timeline_date">
                                    {details?.date}
                                  </div>
                                  <div className="timeline-block">
                                    <div className="timeline-block-head library">
                                      <div className="timeline-block-title">
                                        <div className="timeline-block-img">
                                          <img
                                            src={
                                              path_image + "log-docintel.png"
                                            }
                                            alt=""
                                          />
                                        </div>
                                        <h6>User logged into Docintel</h6>
                                      </div>
                                      <div className="timeline-time-view">
                                        <div className="timeline-time">
                                          {details?.time}
                                        </div>
                                        |
                                        <div className="timeline-timezone">
                                          {details?.timezone}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="timeline-article-device">
                                      <Table>
                                        <tbody>
                                          <tr>
                                            <th className="device-title">
                                              Source
                                            </th>
                                            <td className="device-name">
                                              {details?.webinar != ""
                                                ? details.webinar
                                                : deviceObj[details?.device_used]?deviceObj[details?.device_used]:details?.device_used}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </Table>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {details?.action ==
                                "New docintel account is created" && (
                                <div className="timeline-box">
                                  <div className="timeline_date">
                                    {details?.date}
                                  </div>
                                  <div className="timeline-block">
                                    <div className="timeline-block-head library">
                                      <div className="timeline-block-title">
                                        <div className="timeline-block-img">
                                          <img
                                            src={
                                              path_image + "account-create.png"
                                            }
                                            alt=""
                                          />
                                        </div>
                                        <h6>{details?.action}</h6>
                                      </div>
                                      <div className="timeline-time-view">
                                        <div className="timeline-time">
                                          {details?.time}
                                        </div>
                                        |
                                        <div className="timeline-timezone">
                                          {details?.timezone}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="timeline-article-device">
                                      <Table>
                                        <tbody>
                                          <tr>
                                            <th className="device-title">
                                              Source
                                            </th>
                                            <td className="device-name">
                                              {details?.webinar != ""
                                                ? details.webinar
                                                : deviceObj[details?.device_used]?deviceObj[details?.device_used]:details?.device_used}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </Table>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {details?.action == "New mail received" || details?.action == "New Mail Received" ? (
                                <div className="timeline-box">
                                  <div className="timeline_date">
                                    {details?.date}
                                  </div>
                                  <div className="timeline-block">
                                    <div className="timeline-block-head received">
                                      <div className="timeline-block-title">
                                        <div className="timeline-block-img">
                                          <img
                                            src={
                                              path_image + "email-received.png"
                                            }
                                            alt=""
                                          />
                                        </div>
                                        <h6>Email Sent</h6> 
                                        
                                      </div>
                                      <div className="timeline-time-view">
                                        <div className="timeline-time">
                                          {details?.time}
                                        </div>
                                        |
                                        <div className="timeline-timezone">
                                          {details?.timezone}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="timeline-article-device">
                                      <Table>
                                        <tbody>
                                        {
                                              details?.pdfTitle && details?.pdfTitle == "Webinar sample"?"":<tr>
                                              <th className="device-title">
                                                Title
                                              </th>
                                             
                                              <td className="device-name">
                                                { details?.pdfTitle === null ||
                                                details?.pdfTitle === ""
                                                  ? "New mail received"
                                                  : details?.pdfTitle}
                                              </td>
                                            </tr>
                                         }
                                         
                                          <tr>
                                            <th className="device-title">
                                              Subject
                                            </th>
                                            <td className="device-name">
                                              {details?.mailContent != ""
                                                ? isJSONValid(  details?.mailContent)?
                                                JSON.parse(
                                                    details?.mailContent
                                                  )?.subject:"N/A"
                                                : "N/A"}
                                            </td>
                                          </tr>
                                          {/* <tr>
                                            <th className="device-title">
                                              Device
                                            </th>
                                            <td className="device-name">
                                              {details?.webinar != ""
                                                ? details.webinar
                                                : details?.device_used}
                                            </td>
                                          </tr> */}
                                              <tr>
                                       

                                            <th className="device-title">
                                              Email Opened
                                            </th>
                                            <td className="device-name">
                                              {details?.status == 1?`Yes (${moment(details.updated).format("DD MMM YYYY")})`:"No"
                                              }
                                            </td>
                                           </tr>
                                        </tbody>
                                      </Table>
                                    </div>
                                  </div>
                                </div>
                              ): null}

                              {details?.action &&
                                details.action.includes("shared") && (
                                  <div className="timeline-box">
                                    <div className="timeline_date">
                                      {details?.date}
                                    </div>
                                    <div className="timeline-block">
                                      <div className="timeline-block-head shared">
                                        <div className="timeline-block-title">
                                          <div className="timeline-block-img">
                                            <img
                                              src={
                                                path_image +
                                                "share-materials.png"
                                              }
                                              alt=""
                                            />
                                          </div>
                                          <h6>Shared Content</h6>
                                        </div>
                                        <div className="timeline-time-view">
                                          <div className="timeline-time">
                                            {details?.time}
                                          </div>
                                          |
                                          <div className="timeline-timezone">
                                            {details?.timezone}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="timeline-article d-flex">
                                        <div className="timeline-article-image">
                                          <img
                                            src={path_image + "dummy-img1.png"}
                                            alt=""
                                          />
                                        </div>
                                        <div className="timeline-article-detail">
                                          <div className="timeline-title">
                                            <p>
                                              {details?.pdfTitle === null ||
                                              details?.pdfTitle === ""
                                                ? details?.action
                                                : details?.pdfTitle}
                                            </p>
                                          </div>
                                          <div className="timeline-subtitle">
                                            <p>
                                              {details?.pdfTitle === null ||
                                              details?.pdfTitle === ""
                                                ? ""
                                                : details?.pdfTitle}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="timeline-article-device">
                                        <Table>
                                          <tbody>
                                            <tr>
                                              <th className="device-title">
                                                Source
                                              </th>
                                              <td className="device-name">
                                                {details?.webinar != ""
                                                  ? details.webinar
                                                  : deviceObj[details?.device_used]?deviceObj[details?.device_used]:details?.device_used}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </Table>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              {details?.action &&
                                details.action.includes("Saved") ||  details.action.includes("Non Mandatory") && (
                                  <div className="timeline-box">
                                    <div className="timeline_date">
                                      {details?.date}
                                    </div>
                                    <div className="timeline-block">
                                      <div className="timeline-block-head saved">
                                        <div className="timeline-block-title">
                                          <div className="timeline-block-img">
                                            <img
                                              src={
                                                path_image + "saved-content.png"
                                              }
                                              alt=""
                                            />
                                          </div>
                                          <h6>Saved Content</h6>
                                        </div>
                                        <div className="timeline-time-view">
                                          <div className="timeline-time">
                                            {details?.time}
                                          </div>
                                          |
                                          <div className="timeline-timezone">
                                            {details?.timezone}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="timeline-article d-flex">
                                        <div className="timeline-article-image">
                                          <img
                                            src={path_image + "dummy-img1.png"}
                                            alt=""
                                          />
                                        </div>
                                        <div className="timeline-article-detail">
                                          <div className="timeline-title">
                                            <p>
                                              {details?.pdfTitle === null ||
                                              details?.pdfTitle === ""
                                                ? details?.action
                                                : details?.pdfTitle}
                                            </p>
                                          </div>
                                          <div className="timeline-subtitle">
                                            <p>
                                              {details?.pdf_sub_title ===
                                                null ||
                                              details?.pdf_sub_title === ""
                                                ? details?.action
                                                : details?.pdf_sub_title}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="timeline-article-device">
                                        <Table>
                                          <tbody>
                                            <tr>
                                              <th className="device-title">
                                                Source
                                              </th>
                                              <td className="device-name">
                                                {details?.webinar != ""
                                                  ? details.webinar
                                                  : deviceObj[details?.device_used]?deviceObj[details?.device_used]:details?.device_used}
                                              </td>
                                            </tr>
                                            <tr>
                                              <th className="device-title">
                                                Medium
                                              </th>

                                              <td className="device-name">
                                                 {
                                                  details?.staticpdf_id? obj[details?.campaign_name]?obj[details?.campaign_name]:details?.campaign_name:details?.medium !=0 ||details?.medium != "" || details?.medium != null?"N/A":obj[details?.medium]?obj[details?.medium]:details?.medium  
                                                 }
                                              </td>
                                            </tr>
                                          </tbody>
                                        </Table>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                  {details?.action == "ipData" && (
                                <div className="timeline-box">
                                  <div className="timeline_date">
                                    {details?.date}
                                  </div>
                                  <div className="timeline-block">
                                    <div className="timeline-article-device">
                                      <Table>
                                        <tbody>
                                          <tr>
                                            <th className="device-title">
                                              Title
                                            </th>
                                            <td className="device-name">
                                              {details?.pdfTitle === null ||
                                              details?.pdfTitle === ""
                                                ? "New mail received"
                                                : details?.pdfTitle}
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="device-title">
                                              Source
                                            </th>
                                            <td className="device-name">
                                              Web Browser
                                            </td>
                                          </tr>
                                        </tbody>
                                      </Table>
                                    </div>
                                  </div>
                                </div>
                              )}
                                
                            </>
                          );
                        })}
                        {timeLineData?.loadMore?.length?<div className="load_more">
                        <Button
                          className="btn btn-primary btn-filled"
                          onClick={handleLoadMore}
                        >
                          Load More
                        </Button>
                
                       </div>:null}
                      </div>
                    </div>:(
                <div className="no_found">
                  <p>No Data Found</p>
                </div>
              )
                    }
                   
                  </div>
                </>
              ) : (
                <div className="no_found">
                  <p>No Data Found</p>
                </div>
              )
            ) : null}
          </Row>
        </div>
      </Col>

      <CommonModel
        show={commanShow}
        onClose={setCommanShow}
        heading={commonHeader}
        data={data}
        footerButton={commonFooter}
        handleChange={handleModelFun}
        handleSubmit={handleSubmitModelFun}
      />
    </>
  );
};

export default MarketingTimeLineDetail;
