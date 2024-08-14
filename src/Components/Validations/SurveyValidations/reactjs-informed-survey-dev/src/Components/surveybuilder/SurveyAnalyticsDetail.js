import React, { useEffect, useState, useRef } from "react";
import {
    Accordion,
    Button,
    Col,
    Container,
    Dropdown,
    Modal,
    Row,
    Table,
  } from "react-bootstrap";
const SurveyAnalyticsDetail = () => {
    let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const filterdata=[];
    const [showfilter, setShowFilter] = useState(false);
    const [deletestatus, setDeleteStatus] = useState(false);
    const [filtercampaign, setFilterCampaigns] = useState([]);
    const [filterrole, setFilterRole] = useState([]);
    const [filtertags, setFilterTags] = useState([]);
    const [filtercreator, setFilterCreators] = useState([]);
    const [filterdate, setFilterDate] = useState([]);
    const [updateflag, setUpdateFlag] = useState([]);
    const [filterapplied, setFilterApply] = useState(false);
    const [SendListData, setSendListData] = useState([]);
    const [currentAccordian,setCurrentAccordian] =useState(-1)
    const [filter, setFilter] = useState([]);
    const getoriginalsendlistdata= [];
    const [isData, setIsData] = useState([]);
    const clearFilter = () => {
        document.querySelectorAll("input").forEach((checkbox) => {
          checkbox.checked = false;
        });
        document.getElementById("email_search").value = "";
        // setSearch("");
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
        setFilterApply(true);
        //getData("progress");
        setShowFilter(false);
      };
      const showDeleteButtons = () => {
        if (deletestatus) {
          setDeleteStatus(false);
        } else {
          setDeleteStatus(true);
        }
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
          const index = filterrole.indexOf("No IRT");
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
      const buttonRef = useRef(null);
      const filterRef = useRef(null);
    return (
        <>
           <Col className="right-sidebar custom-change">
                <div className="custom-container">
                    <Row>
                        <div className="top-header analytics_header sticky">
                            <div className="page-title d-flex flex-column align-items-start">
                                <h2>Headline Lorem ipsum pretium id libero dolorsit amet consectetur Orci </h2>
                                <p>April. 22. 2024</p>
                            </div>
                            <Button title="Download Site Engagements" className="download filled">
                                Summary (Excel)
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" > {" "} <path d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z" fill="#0066BE" ></path>{" "} <path d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z" fill="#0066BE" ></path> </svg>
                            </Button>
                           
                        </div>
                        <div className="webinar-analytics-layout survey-analytics-content">
                            <Row>
                                <Col md={12}>
                                    <div className="survey-analytics-box">
                                        <div className="survey-analytics-top align-items-center d-flex">
                                            <h6>
                                                Overview
                                            </h6>
                                        </div>
                                        <div className="survey-analytics-layout row">
                                            <div className="survey-completion col">
                                                <p>Completion</p>
                                                <div className="survey-completion-info">
                                                    <div></div>
                                                    <h2>84</h2>
                                                    <div className="completed-survey">
                                                        <p>
                                                        <img src={path_image +"user-gray.svg"} alt=""/>Completed the survey
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="survey-takers col">
                                                <p>Survey Takers over time | Delivery channels</p>
                                                <img src={path_image + "survey-takers.png"} alt="" />
                                            </div>
                                            <div className="survey-takers-status col">
                                                <p>Survey Takers status</p>
                                                <img src={path_image + "survey-takers-status.png"} alt="" />
                                                <div class="rd-box-export">
                                                    <img src={path_image + "arrow-export.svg"} alt=""/>
                                                </div>
                                            </div>
                                            <div className="survey-full-info col d-flex flex-column">
                                                <div className="survey-info takers">
                                                    <div>
                                                        <img src={path_image + "user-blue.png"} alt=""/>Survey takers
                                                    </div>
                                                    <div className="survey-value">
                                                        84
                                                    </div>
                                                </div>
                                                <div className="survey-info avg">
                                                    <div>
                                                        <img src={path_image + "timer.png"} alt=""/>AVG completion time
                                                    </div>
                                                    <div className="survey-value">
                                                        1.5 <small>min</small>
                                                    </div>
                                                </div>

                                                <div className="survey-info question">
                                                    <div>
                                                        <img src={path_image + "question.png"} alt=""/>Survey Questions
                                                    </div>
                                                    <div className="survey-value">
                                                        10
                                                    </div>
                                                </div>
                                                <div className="survey-info no-answer">
                                                    <div>
                                                        <img src={path_image + "question-not.png"} alt=""/>Not answered Questions
                                                    </div>
                                                    <div className="survey-value">
                                                        2
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="survey-question-listing">
                                        <div className="survey-question-top d-flex align-items-center">
                                            <div className="survey-question-num">
                                                <div className="question-type">
                                                    <img src={path_image + "multiple-choices.png"} alt=""/>
                                                </div>
                                                <div className="question-number">
                                                    <h4>Q1</h4>
                                                </div>
                                            </div>
                                            <div className="question-view">
                                                <p>Lorem sollicitudin faucibus Pulvinar ultricies neque praesent mauris, arcu viverra aliquam massa pretium sit arcu curabitur fringilla egestas massa?</p>
                                            </div>
                                            <div className="question-status">
                                                <div className="total-answered">
                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M8.29511 6.80015C10.1732 6.80015 11.6953 5.27769 11.6953 3.39993C11.6953 1.52217 10.1729 0 8.29511 0C6.41736 0 4.89432 1.52246 4.89432 3.40022C4.89432 5.27797 6.41736 6.80015 8.29511 6.80015ZM9.73743 7.0319H6.85222C4.45164 7.0319 2.49866 8.98517 2.49866 11.3858V14.9141L2.50763 14.9694L2.75066 15.0455C5.04159 15.7613 7.0319 16 8.67009 16C11.8698 16 13.7244 15.0877 13.8387 15.0296L14.0658 14.9147H14.0901V11.3858C14.091 8.98517 12.138 7.0319 9.73743 7.0319Z" fill="#004A89"/>
                                                    </svg>
                                                    <span>83</span>
                                                </div>
                                                <div className="total-ignored">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M7.73272 13.788C8.08685 13.788 8.42759 13.7618 8.75493 13.7092L11.6037 16L13.3456 14.4885L11.1101 12.7182C11.3761 12.5177 11.6236 12.2906 11.8525 12.0369C12.0186 11.8507 12.172 11.6519 12.3127 11.4404C12.0475 11.4796 11.7761 11.5 11.5 11.5C10.7351 11.5 10.0067 11.3439 9.34492 11.0617C9.22713 11.1562 9.1014 11.2385 8.96774 11.3088C8.61137 11.4992 8.19969 11.5945 7.73272 11.5945C7.26575 11.5945 6.84793 11.4992 6.47926 11.3088C6.11674 11.1183 5.80952 10.8387 5.5576 10.47C5.31183 10.0952 5.12442 9.63748 4.99539 9.09677C4.86636 8.54992 4.80184 7.92319 4.80184 7.21659V6.56221C4.80184 5.84946 4.86636 5.22273 4.99539 4.68203C5.12442 4.14132 5.31183 3.68664 5.5576 3.31797C5.80338 2.94931 6.10753 2.67281 6.47005 2.48848C6.78028 2.32547 7.12877 2.23222 7.5155 2.20871C8.27075 1.41522 9.26058 0.847054 10.3738 0.615407C10.2611 0.556967 10.1457 0.502369 10.0276 0.451613C9.33333 0.150538 8.56221 0 7.71429 0C6.8725 0 6.10138 0.150538 5.40092 0.451613C4.70046 0.752688 4.09831 1.18894 3.59447 1.76037C3.09063 2.3318 2.69739 3.02304 2.41475 3.8341C2.13825 4.63902 2 5.55453 2 6.58065V7.21659C2 8.23656 2.13825 9.15207 2.41475 9.96313C2.69739 10.7742 3.0937 11.4654 3.60369 12.0369C4.11367 12.6022 4.71889 13.0353 5.41935 13.3364C6.11982 13.6375 6.89094 13.788 7.73272 13.788Z" fill="#F58289"/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 6C16 8.48528 13.9853 10.5 11.5 10.5C9.01472 10.5 7 8.48528 7 6C7 3.51472 9.01472 1.5 11.5 1.5C13.9853 1.5 16 3.51472 16 6ZM9.53612 3.96408C9.2552 4.23537 9.24738 4.68302 9.51867 4.96394L10.5109 5.99141L9.50008 7.00221C9.22393 7.27835 9.22393 7.72607 9.50008 8.00222C9.77622 8.27836 10.2239 8.27836 10.5001 8.00222L11.4934 7.00887L12.4659 8.01588C12.7372 8.2968 13.1848 8.30462 13.4657 8.03333C13.7467 7.76205 13.7545 7.3144 13.4832 7.03347L12.4936 6.00871L13.5001 5.00218C13.7763 4.72604 13.7763 4.27832 13.5001 4.00217C13.224 3.72602 12.7763 3.72602 12.5001 4.00217L11.511 4.99124L10.536 3.98154C10.2647 3.70061 9.81704 3.6928 9.53612 3.96408Z" fill="#F58289"/>
                                                    </svg>
                                                    <span>1</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="question-preview-block">
                                            <div className="question-preview">
                                                <div className="d-flex align-items-center justify-content-between question-preview-options">
                                                    <div>
                                                        Choices
                                                    </div>
                                                    <div>
                                                        Respondents
                                                    </div>
                                                </div>
                                                <div className="answer-options">
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#39CABC'}}>&nbsp;</span>
                                                            <div>Masuismod phartra donec faucibus</div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>8</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#FAC755'}}>&nbsp;</span>
                                                            <div>Masuismod phartra donec faucibus quisque nuneque </div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>12</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#F58289'}}>&nbsp;</span>
                                                            <div>Masuismod phartra donec faucibus quisque nuneque mote condi ment </div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>15</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#8A4E9C'}}>&nbsp;</span>
                                                            <div>Masuismod phartra donec faucibus quisque</div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>30</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#0066BE'}}>&nbsp;</span>
                                                            <div>Masuismod phartra donec faucibus quisque nuneque mote </div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>108</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="question-preview-right">
                                                <div className="rd-training-block-right d-flex justify-content-end align-items-center">
                                                <div className="switch6">
                                                    <label className="switch6-light">
                                                    <input
                                                        type="checkbox"
                                                        //checked={whichTypeGraph}
                                                        // onChange={() => {
                                                        // loader("show");

                                                        // setTimeout(() => {
                                                        //     setWhichTypeGraph(!whichTypeGraph);
                                                        //     loader("hide");
                                                        // }, 500);
                                                        // }}
                                                    />
                                                    <span>
                                                        <span>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_5227_2027)"><path d="M11.2048 1.54687C11.2048 1.27073 10.9808 1.04571 10.7049 1.05803C9.10037 1.12967 7.52788 1.54559 6.095 2.27982C4.51361 3.09016 3.14762 4.26499 2.10978 5.70733C1.07194 7.14967 0.39202 8.81816 0.126141 10.5751C-0.139738 12.332 0.0160486 14.127 0.580642 15.8118C1.14524 17.4966 2.10245 19.023 3.37326 20.265C4.64407 21.507 6.19204 22.4289 7.8894 22.9547C9.58676 23.4805 11.3848 23.595 13.1352 23.2889C14.7211 23.0115 16.2267 22.3959 17.5505 21.4863C17.7781 21.3299 17.8212 21.0154 17.6548 20.795L11.3057 12.3854C11.2402 12.2986 11.2048 12.1928 11.2048 12.0841V1.54687Z" fill="#39CABC"></path><path d="M23.5106 12.7847C23.7868 12.7847 24.0118 13.0087 23.9995 13.2846C23.9293 14.8565 23.5287 16.398 22.8216 17.8078C22.1141 19.2186 21.5564 19.844 20.4209 20.7231C20.2107 20.8858 19.9098 20.8496 19.7397 20.6452L13.8814 13.6045C13.6103 13.2788 13.842 12.7847 14.2657 12.7847H23.5106Z" fill="#0066BE"></path><path d="M22.9765 11.1825C23.2526 11.1825 23.4776 10.9586 23.4653 10.6827C23.4072 9.38195 23.1228 8.09995 22.6236 6.89467C22.0605 5.53524 21.2351 4.30004 20.1947 3.25958C19.1542 2.21912 17.919 1.39378 16.5596 0.830691C15.3595 0.333593 14.4241 0.057651 13.209 -0.000201631C12.9332 -0.0133342 12.709 0.212139 12.709 0.488281V10.6825C12.709 10.9587 12.9328 11.1825 13.209 11.1825H22.9765Z" fill="#8A4E9C"></path></g><defs><clipPath id="clip0_5227_2027"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
                                                        </span>
                                                        <span>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect x="24" width="6" height="24" rx="1" transform="rotate(90 24 0)" fill="#0066BE" /> <rect x="13.2617" y="9.14258" width="5.71429" height="13.2632" rx="1" transform="rotate(90 13.2617 9.14258)" fill="#8A4E9C" /> <rect x="19" y="18" width="6" height="19" rx="1" transform="rotate(90 19 18)" fill="#39CABC" /> </svg>
                                                        </span>
                                                    </span>
                                                    <a className="btn"></a>
                                                    </label>
                                                </div>
                                                <Dropdown>
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none" > <path fillRule="evenodd" clipRule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE" /> </svg>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "PNG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download PNG
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "JPEG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download JPEG
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "PDF",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download PDF
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "SVG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download SVG
                                                    </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                </div>
                                                <div className="question-preview-chart">
                                                    <img src={path_image + "dummy-pie.png"} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="survey-question-listing">
                                        <div className="survey-question-top d-flex align-items-center">
                                            <div className="survey-question-num">
                                                <div className="question-type">
                                                    <img src={path_image + "dropdown-choice.png"} alt=""/>
                                                </div>
                                                <div className="question-number">
                                                    <h4>Q2</h4>
                                                </div>
                                            </div>
                                            <div className="question-view">
                                                <p>Lorem sollicitudin faucibus Pulvinar ultricies neque praesent mauris, arcu viverra aliquam massa pretium sit arcu curabitur fringilla ?</p>
                                            </div>
                                            <div className="question-status">
                                                <div className="total-answered">
                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M8.29511 6.80015C10.1732 6.80015 11.6953 5.27769 11.6953 3.39993C11.6953 1.52217 10.1729 0 8.29511 0C6.41736 0 4.89432 1.52246 4.89432 3.40022C4.89432 5.27797 6.41736 6.80015 8.29511 6.80015ZM9.73743 7.0319H6.85222C4.45164 7.0319 2.49866 8.98517 2.49866 11.3858V14.9141L2.50763 14.9694L2.75066 15.0455C5.04159 15.7613 7.0319 16 8.67009 16C11.8698 16 13.7244 15.0877 13.8387 15.0296L14.0658 14.9147H14.0901V11.3858C14.091 8.98517 12.138 7.0319 9.73743 7.0319Z" fill="#004A89"/>
                                                    </svg>
                                                    <span>83</span>
                                                </div>
                                                <div className="total-ignored">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M7.73272 13.788C8.08685 13.788 8.42759 13.7618 8.75493 13.7092L11.6037 16L13.3456 14.4885L11.1101 12.7182C11.3761 12.5177 11.6236 12.2906 11.8525 12.0369C12.0186 11.8507 12.172 11.6519 12.3127 11.4404C12.0475 11.4796 11.7761 11.5 11.5 11.5C10.7351 11.5 10.0067 11.3439 9.34492 11.0617C9.22713 11.1562 9.1014 11.2385 8.96774 11.3088C8.61137 11.4992 8.19969 11.5945 7.73272 11.5945C7.26575 11.5945 6.84793 11.4992 6.47926 11.3088C6.11674 11.1183 5.80952 10.8387 5.5576 10.47C5.31183 10.0952 5.12442 9.63748 4.99539 9.09677C4.86636 8.54992 4.80184 7.92319 4.80184 7.21659V6.56221C4.80184 5.84946 4.86636 5.22273 4.99539 4.68203C5.12442 4.14132 5.31183 3.68664 5.5576 3.31797C5.80338 2.94931 6.10753 2.67281 6.47005 2.48848C6.78028 2.32547 7.12877 2.23222 7.5155 2.20871C8.27075 1.41522 9.26058 0.847054 10.3738 0.615407C10.2611 0.556967 10.1457 0.502369 10.0276 0.451613C9.33333 0.150538 8.56221 0 7.71429 0C6.8725 0 6.10138 0.150538 5.40092 0.451613C4.70046 0.752688 4.09831 1.18894 3.59447 1.76037C3.09063 2.3318 2.69739 3.02304 2.41475 3.8341C2.13825 4.63902 2 5.55453 2 6.58065V7.21659C2 8.23656 2.13825 9.15207 2.41475 9.96313C2.69739 10.7742 3.0937 11.4654 3.60369 12.0369C4.11367 12.6022 4.71889 13.0353 5.41935 13.3364C6.11982 13.6375 6.89094 13.788 7.73272 13.788Z" fill="#F58289"/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 6C16 8.48528 13.9853 10.5 11.5 10.5C9.01472 10.5 7 8.48528 7 6C7 3.51472 9.01472 1.5 11.5 1.5C13.9853 1.5 16 3.51472 16 6ZM9.53612 3.96408C9.2552 4.23537 9.24738 4.68302 9.51867 4.96394L10.5109 5.99141L9.50008 7.00221C9.22393 7.27835 9.22393 7.72607 9.50008 8.00222C9.77622 8.27836 10.2239 8.27836 10.5001 8.00222L11.4934 7.00887L12.4659 8.01588C12.7372 8.2968 13.1848 8.30462 13.4657 8.03333C13.7467 7.76205 13.7545 7.3144 13.4832 7.03347L12.4936 6.00871L13.5001 5.00218C13.7763 4.72604 13.7763 4.27832 13.5001 4.00217C13.224 3.72602 12.7763 3.72602 12.5001 4.00217L11.511 4.99124L10.536 3.98154C10.2647 3.70061 9.81704 3.6928 9.53612 3.96408Z" fill="#F58289"/>
                                                    </svg>
                                                    <span>1</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="question-preview-block">
                                            <div className="question-preview">
                                                <div className="d-flex align-items-center justify-content-between question-preview-options">
                                                    <div>
                                                        Choices
                                                    </div>
                                                    <div>
                                                        Respondents
                                                    </div>
                                                </div>
                                                <div className="answer-options">
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#39CABC'}}>&nbsp;</span>
                                                            <div>Masuismod phartra donec faucibus</div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>8</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#FAC755'}}>&nbsp;</span>
                                                            <div>Masuismod phartra donec faucibus quisque nuneque </div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>12</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#F58289'}}>&nbsp;</span>
                                                            <div>Masuismod phartra donec faucibus quisque nuneque mote condi ment </div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>15</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#8A4E9C'}}>&nbsp;</span>
                                                            <div>Masuismod phartra donec faucibus quisque</div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>30</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#0066BE'}}>&nbsp;</span>
                                                            <div>Masuismod phartra donec faucibus quisque nuneque mote </div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>108</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="question-preview-right">
                                                <div className="rd-training-block-right d-flex justify-content-end align-items-center">
                                                <div className="switch6">
                                                    <label className="switch6-light">
                                                    <input
                                                        type="checkbox"
                                                        //checked={whichTypeGraph}
                                                        // onChange={() => {
                                                        // loader("show");

                                                        // setTimeout(() => {
                                                        //     setWhichTypeGraph(!whichTypeGraph);
                                                        //     loader("hide");
                                                        // }, 500);
                                                        // }}
                                                    />
                                                    <span>
                                                        <span>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_5227_2027)"><path d="M11.2048 1.54687C11.2048 1.27073 10.9808 1.04571 10.7049 1.05803C9.10037 1.12967 7.52788 1.54559 6.095 2.27982C4.51361 3.09016 3.14762 4.26499 2.10978 5.70733C1.07194 7.14967 0.39202 8.81816 0.126141 10.5751C-0.139738 12.332 0.0160486 14.127 0.580642 15.8118C1.14524 17.4966 2.10245 19.023 3.37326 20.265C4.64407 21.507 6.19204 22.4289 7.8894 22.9547C9.58676 23.4805 11.3848 23.595 13.1352 23.2889C14.7211 23.0115 16.2267 22.3959 17.5505 21.4863C17.7781 21.3299 17.8212 21.0154 17.6548 20.795L11.3057 12.3854C11.2402 12.2986 11.2048 12.1928 11.2048 12.0841V1.54687Z" fill="#39CABC"></path><path d="M23.5106 12.7847C23.7868 12.7847 24.0118 13.0087 23.9995 13.2846C23.9293 14.8565 23.5287 16.398 22.8216 17.8078C22.1141 19.2186 21.5564 19.844 20.4209 20.7231C20.2107 20.8858 19.9098 20.8496 19.7397 20.6452L13.8814 13.6045C13.6103 13.2788 13.842 12.7847 14.2657 12.7847H23.5106Z" fill="#0066BE"></path><path d="M22.9765 11.1825C23.2526 11.1825 23.4776 10.9586 23.4653 10.6827C23.4072 9.38195 23.1228 8.09995 22.6236 6.89467C22.0605 5.53524 21.2351 4.30004 20.1947 3.25958C19.1542 2.21912 17.919 1.39378 16.5596 0.830691C15.3595 0.333593 14.4241 0.057651 13.209 -0.000201631C12.9332 -0.0133342 12.709 0.212139 12.709 0.488281V10.6825C12.709 10.9587 12.9328 11.1825 13.209 11.1825H22.9765Z" fill="#8A4E9C"></path></g><defs><clipPath id="clip0_5227_2027"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
                                                        </span>
                                                        <span>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect x="24" width="6" height="24" rx="1" transform="rotate(90 24 0)" fill="#0066BE" /> <rect x="13.2617" y="9.14258" width="5.71429" height="13.2632" rx="1" transform="rotate(90 13.2617 9.14258)" fill="#8A4E9C" /> <rect x="19" y="18" width="6" height="19" rx="1" transform="rotate(90 19 18)" fill="#39CABC" /> </svg>
                                                        </span>
                                                    </span>
                                                    <a className="btn"></a>
                                                    </label>
                                                </div>
                                                <Dropdown>
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none" > <path fillRule="evenodd" clipRule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE" /> </svg>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "PNG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download PNG
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "JPEG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download JPEG
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "PDF",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download PDF
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "SVG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download SVG
                                                    </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                </div>
                                                <div className="question-preview-chart">
                                                    <img src={path_image + "dummy-bar-chart.png"} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="survey-question-listing">
                                        <div className="survey-question-top d-flex align-items-center">
                                            <div className="survey-question-num">
                                                <div className="question-type">
                                                    <img src={path_image + "star-rating.png"} alt=""/>
                                                </div>
                                                <div className="question-number">
                                                    <h4>Q3</h4>
                                                </div>
                                            </div>
                                            <div className="question-view">
                                                <p>Lorem sollicitudin faucibus Pulvinar ultricies neque praesent mauris, arcu viverra aliquam massa pretium sit arcu ?</p>
                                            </div>
                                            <div className="question-status">
                                                <div className="total-answered">
                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M8.29511 6.80015C10.1732 6.80015 11.6953 5.27769 11.6953 3.39993C11.6953 1.52217 10.1729 0 8.29511 0C6.41736 0 4.89432 1.52246 4.89432 3.40022C4.89432 5.27797 6.41736 6.80015 8.29511 6.80015ZM9.73743 7.0319H6.85222C4.45164 7.0319 2.49866 8.98517 2.49866 11.3858V14.9141L2.50763 14.9694L2.75066 15.0455C5.04159 15.7613 7.0319 16 8.67009 16C11.8698 16 13.7244 15.0877 13.8387 15.0296L14.0658 14.9147H14.0901V11.3858C14.091 8.98517 12.138 7.0319 9.73743 7.0319Z" fill="#004A89"/>
                                                    </svg>
                                                    <span>83</span>
                                                </div>
                                                <div className="total-ignored">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M7.73272 13.788C8.08685 13.788 8.42759 13.7618 8.75493 13.7092L11.6037 16L13.3456 14.4885L11.1101 12.7182C11.3761 12.5177 11.6236 12.2906 11.8525 12.0369C12.0186 11.8507 12.172 11.6519 12.3127 11.4404C12.0475 11.4796 11.7761 11.5 11.5 11.5C10.7351 11.5 10.0067 11.3439 9.34492 11.0617C9.22713 11.1562 9.1014 11.2385 8.96774 11.3088C8.61137 11.4992 8.19969 11.5945 7.73272 11.5945C7.26575 11.5945 6.84793 11.4992 6.47926 11.3088C6.11674 11.1183 5.80952 10.8387 5.5576 10.47C5.31183 10.0952 5.12442 9.63748 4.99539 9.09677C4.86636 8.54992 4.80184 7.92319 4.80184 7.21659V6.56221C4.80184 5.84946 4.86636 5.22273 4.99539 4.68203C5.12442 4.14132 5.31183 3.68664 5.5576 3.31797C5.80338 2.94931 6.10753 2.67281 6.47005 2.48848C6.78028 2.32547 7.12877 2.23222 7.5155 2.20871C8.27075 1.41522 9.26058 0.847054 10.3738 0.615407C10.2611 0.556967 10.1457 0.502369 10.0276 0.451613C9.33333 0.150538 8.56221 0 7.71429 0C6.8725 0 6.10138 0.150538 5.40092 0.451613C4.70046 0.752688 4.09831 1.18894 3.59447 1.76037C3.09063 2.3318 2.69739 3.02304 2.41475 3.8341C2.13825 4.63902 2 5.55453 2 6.58065V7.21659C2 8.23656 2.13825 9.15207 2.41475 9.96313C2.69739 10.7742 3.0937 11.4654 3.60369 12.0369C4.11367 12.6022 4.71889 13.0353 5.41935 13.3364C6.11982 13.6375 6.89094 13.788 7.73272 13.788Z" fill="#F58289"/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 6C16 8.48528 13.9853 10.5 11.5 10.5C9.01472 10.5 7 8.48528 7 6C7 3.51472 9.01472 1.5 11.5 1.5C13.9853 1.5 16 3.51472 16 6ZM9.53612 3.96408C9.2552 4.23537 9.24738 4.68302 9.51867 4.96394L10.5109 5.99141L9.50008 7.00221C9.22393 7.27835 9.22393 7.72607 9.50008 8.00222C9.77622 8.27836 10.2239 8.27836 10.5001 8.00222L11.4934 7.00887L12.4659 8.01588C12.7372 8.2968 13.1848 8.30462 13.4657 8.03333C13.7467 7.76205 13.7545 7.3144 13.4832 7.03347L12.4936 6.00871L13.5001 5.00218C13.7763 4.72604 13.7763 4.27832 13.5001 4.00217C13.224 3.72602 12.7763 3.72602 12.5001 4.00217L11.511 4.99124L10.536 3.98154C10.2647 3.70061 9.81704 3.6928 9.53612 3.96408Z" fill="#F58289"/>
                                                    </svg>
                                                    <span>1</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="question-preview-block">
                                            <div className="question-preview">
                                                <div className="d-flex align-items-center justify-content-between question-preview-options">
                                                    <div>
                                                        Choices
                                                    </div>
                                                    <div>
                                                        Respondents
                                                    </div>
                                                </div>
                                                <div className="answer-options">
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#39CABC'}}>&nbsp;</span>
                                                            <div><img src={path_image +"star-rating-5.svg"} alt=""/></div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>70</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#FAC755'}}>&nbsp;</span>
                                                            <div><img src={path_image +"star-rating-4.svg"} alt=""/></div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>6</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#F58289'}}>&nbsp;</span>
                                                            <div><img src={path_image +"star-rating-3.svg"} alt=""/></div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>3</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#8A4E9C'}}>&nbsp;</span>
                                                            <div><img src={path_image +"star-rating-2.svg"} alt=""/></div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>2</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#0066BE'}}>&nbsp;</span>
                                                            <div><img src={path_image +"star-rating-1.svg"} alt=""/></div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>1</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="question-preview-right">
                                                <div className="rd-training-block-right d-flex justify-content-end align-items-center">
                                                <div className="switch6">
                                                    <label className="switch6-light">
                                                    <input
                                                        type="checkbox"
                                                        //checked={whichTypeGraph}
                                                        // onChange={() => {
                                                        // loader("show");

                                                        // setTimeout(() => {
                                                        //     setWhichTypeGraph(!whichTypeGraph);
                                                        //     loader("hide");
                                                        // }, 500);
                                                        // }}
                                                    />
                                                    <span>
                                                        <span>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_5227_2027)"><path d="M11.2048 1.54687C11.2048 1.27073 10.9808 1.04571 10.7049 1.05803C9.10037 1.12967 7.52788 1.54559 6.095 2.27982C4.51361 3.09016 3.14762 4.26499 2.10978 5.70733C1.07194 7.14967 0.39202 8.81816 0.126141 10.5751C-0.139738 12.332 0.0160486 14.127 0.580642 15.8118C1.14524 17.4966 2.10245 19.023 3.37326 20.265C4.64407 21.507 6.19204 22.4289 7.8894 22.9547C9.58676 23.4805 11.3848 23.595 13.1352 23.2889C14.7211 23.0115 16.2267 22.3959 17.5505 21.4863C17.7781 21.3299 17.8212 21.0154 17.6548 20.795L11.3057 12.3854C11.2402 12.2986 11.2048 12.1928 11.2048 12.0841V1.54687Z" fill="#39CABC"></path><path d="M23.5106 12.7847C23.7868 12.7847 24.0118 13.0087 23.9995 13.2846C23.9293 14.8565 23.5287 16.398 22.8216 17.8078C22.1141 19.2186 21.5564 19.844 20.4209 20.7231C20.2107 20.8858 19.9098 20.8496 19.7397 20.6452L13.8814 13.6045C13.6103 13.2788 13.842 12.7847 14.2657 12.7847H23.5106Z" fill="#0066BE"></path><path d="M22.9765 11.1825C23.2526 11.1825 23.4776 10.9586 23.4653 10.6827C23.4072 9.38195 23.1228 8.09995 22.6236 6.89467C22.0605 5.53524 21.2351 4.30004 20.1947 3.25958C19.1542 2.21912 17.919 1.39378 16.5596 0.830691C15.3595 0.333593 14.4241 0.057651 13.209 -0.000201631C12.9332 -0.0133342 12.709 0.212139 12.709 0.488281V10.6825C12.709 10.9587 12.9328 11.1825 13.209 11.1825H22.9765Z" fill="#8A4E9C"></path></g><defs><clipPath id="clip0_5227_2027"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
                                                        </span>
                                                        <span>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect x="24" width="6" height="24" rx="1" transform="rotate(90 24 0)" fill="#0066BE" /> <rect x="13.2617" y="9.14258" width="5.71429" height="13.2632" rx="1" transform="rotate(90 13.2617 9.14258)" fill="#8A4E9C" /> <rect x="19" y="18" width="6" height="19" rx="1" transform="rotate(90 19 18)" fill="#39CABC" /> </svg>
                                                        </span>
                                                    </span>
                                                    <a className="btn"></a>
                                                    </label>
                                                </div>
                                                <Dropdown>
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none" > <path fillRule="evenodd" clipRule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE" /> </svg>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "PNG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download PNG
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "JPEG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download JPEG
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "PDF",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download PDF
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "SVG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download SVG
                                                    </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                </div>
                                                <div className="question-preview-chart">
                                                    <img src={path_image + "star-rating-bar-chart.png"} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="survey-question-listing">
                                        <div className="survey-question-top d-flex align-items-center">
                                            <div className="survey-question-num">
                                                <div className="question-type">
                                                    <img src={path_image + "matrix.png"} alt=""/>
                                                </div>
                                                <div className="question-number">
                                                    <h4>Q4</h4>
                                                </div>
                                            </div>
                                            <div className="question-view">
                                                <p>Lorem sollicitudin faucibus Pulvinar ultricies neque praesent mauris, arcu viverra aliquam massa pretium sit arcu curabitur fringilla ?</p>
                                            </div>
                                            <div className="question-status">
                                                <div className="total-answered">
                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M8.29511 6.80015C10.1732 6.80015 11.6953 5.27769 11.6953 3.39993C11.6953 1.52217 10.1729 0 8.29511 0C6.41736 0 4.89432 1.52246 4.89432 3.40022C4.89432 5.27797 6.41736 6.80015 8.29511 6.80015ZM9.73743 7.0319H6.85222C4.45164 7.0319 2.49866 8.98517 2.49866 11.3858V14.9141L2.50763 14.9694L2.75066 15.0455C5.04159 15.7613 7.0319 16 8.67009 16C11.8698 16 13.7244 15.0877 13.8387 15.0296L14.0658 14.9147H14.0901V11.3858C14.091 8.98517 12.138 7.0319 9.73743 7.0319Z" fill="#004A89"/>
                                                    </svg>
                                                    <span>84</span>
                                                </div>
                                                <div className="total-ignored">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M7.73272 13.788C8.08685 13.788 8.42759 13.7618 8.75493 13.7092L11.6037 16L13.3456 14.4885L11.1101 12.7182C11.3761 12.5177 11.6236 12.2906 11.8525 12.0369C12.0186 11.8507 12.172 11.6519 12.3127 11.4404C12.0475 11.4796 11.7761 11.5 11.5 11.5C10.7351 11.5 10.0067 11.3439 9.34492 11.0617C9.22713 11.1562 9.1014 11.2385 8.96774 11.3088C8.61137 11.4992 8.19969 11.5945 7.73272 11.5945C7.26575 11.5945 6.84793 11.4992 6.47926 11.3088C6.11674 11.1183 5.80952 10.8387 5.5576 10.47C5.31183 10.0952 5.12442 9.63748 4.99539 9.09677C4.86636 8.54992 4.80184 7.92319 4.80184 7.21659V6.56221C4.80184 5.84946 4.86636 5.22273 4.99539 4.68203C5.12442 4.14132 5.31183 3.68664 5.5576 3.31797C5.80338 2.94931 6.10753 2.67281 6.47005 2.48848C6.78028 2.32547 7.12877 2.23222 7.5155 2.20871C8.27075 1.41522 9.26058 0.847054 10.3738 0.615407C10.2611 0.556967 10.1457 0.502369 10.0276 0.451613C9.33333 0.150538 8.56221 0 7.71429 0C6.8725 0 6.10138 0.150538 5.40092 0.451613C4.70046 0.752688 4.09831 1.18894 3.59447 1.76037C3.09063 2.3318 2.69739 3.02304 2.41475 3.8341C2.13825 4.63902 2 5.55453 2 6.58065V7.21659C2 8.23656 2.13825 9.15207 2.41475 9.96313C2.69739 10.7742 3.0937 11.4654 3.60369 12.0369C4.11367 12.6022 4.71889 13.0353 5.41935 13.3364C6.11982 13.6375 6.89094 13.788 7.73272 13.788Z" fill="#F58289"/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 6C16 8.48528 13.9853 10.5 11.5 10.5C9.01472 10.5 7 8.48528 7 6C7 3.51472 9.01472 1.5 11.5 1.5C13.9853 1.5 16 3.51472 16 6ZM9.53612 3.96408C9.2552 4.23537 9.24738 4.68302 9.51867 4.96394L10.5109 5.99141L9.50008 7.00221C9.22393 7.27835 9.22393 7.72607 9.50008 8.00222C9.77622 8.27836 10.2239 8.27836 10.5001 8.00222L11.4934 7.00887L12.4659 8.01588C12.7372 8.2968 13.1848 8.30462 13.4657 8.03333C13.7467 7.76205 13.7545 7.3144 13.4832 7.03347L12.4936 6.00871L13.5001 5.00218C13.7763 4.72604 13.7763 4.27832 13.5001 4.00217C13.224 3.72602 12.7763 3.72602 12.5001 4.00217L11.511 4.99124L10.536 3.98154C10.2647 3.70061 9.81704 3.6928 9.53612 3.96408Z" fill="#F58289"/>
                                                    </svg>
                                                    <span>0</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="question-preview-block matrix">
                                            <div className="question-preview">
                                                <span>Row label curabitur frin...</span>
                                                <div className="d-flex align-items-center justify-content-between question-preview-options">
                                                    <div>
                                                        Choices
                                                    </div>
                                                    <div>
                                                        Respondents
                                                    </div>
                                                </div>
                                                <div className="answer-options">
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#39CABC'}}>&nbsp;</span>
                                                            <div>Very Satisfied</div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>94</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#FAC755'}}>&nbsp;</span>
                                                            <div>Somewhat Satisfied</div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>84</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#F58289'}}>&nbsp;</span>
                                                            <div>Neutral</div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>43</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#8A4E9C'}}>&nbsp;</span>
                                                            <div>Somewhat Dissatisfied</div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>62</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#0066BE'}}>&nbsp;</span>
                                                            <div>Very Dissatisfied</div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>24</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="avg-view">
                                                    <div className="dispaly-avg-view d-flex justify-content-between align-items-center">
                                                        <p>Display the AVG  <img src={path_image + 'avg-arrow.svg'} /></p>
                                                        <div className="result-view">
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="question-preview-right">
                                                <div className="rd-training-block-right d-flex justify-content-end align-items-center">
                                                <div className="switch6">
                                                    <label className="switch6-light">
                                                    <input
                                                        type="checkbox"
                                                        //checked={whichTypeGraph}
                                                        // onChange={() => {
                                                        // loader("show");

                                                        // setTimeout(() => {
                                                        //     setWhichTypeGraph(!whichTypeGraph);
                                                        //     loader("hide");
                                                        // }, 500);
                                                        // }}
                                                    />
                                                    <span>
                                                        <span>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_5227_2027)"><path d="M11.2048 1.54687C11.2048 1.27073 10.9808 1.04571 10.7049 1.05803C9.10037 1.12967 7.52788 1.54559 6.095 2.27982C4.51361 3.09016 3.14762 4.26499 2.10978 5.70733C1.07194 7.14967 0.39202 8.81816 0.126141 10.5751C-0.139738 12.332 0.0160486 14.127 0.580642 15.8118C1.14524 17.4966 2.10245 19.023 3.37326 20.265C4.64407 21.507 6.19204 22.4289 7.8894 22.9547C9.58676 23.4805 11.3848 23.595 13.1352 23.2889C14.7211 23.0115 16.2267 22.3959 17.5505 21.4863C17.7781 21.3299 17.8212 21.0154 17.6548 20.795L11.3057 12.3854C11.2402 12.2986 11.2048 12.1928 11.2048 12.0841V1.54687Z" fill="#39CABC"></path><path d="M23.5106 12.7847C23.7868 12.7847 24.0118 13.0087 23.9995 13.2846C23.9293 14.8565 23.5287 16.398 22.8216 17.8078C22.1141 19.2186 21.5564 19.844 20.4209 20.7231C20.2107 20.8858 19.9098 20.8496 19.7397 20.6452L13.8814 13.6045C13.6103 13.2788 13.842 12.7847 14.2657 12.7847H23.5106Z" fill="#0066BE"></path><path d="M22.9765 11.1825C23.2526 11.1825 23.4776 10.9586 23.4653 10.6827C23.4072 9.38195 23.1228 8.09995 22.6236 6.89467C22.0605 5.53524 21.2351 4.30004 20.1947 3.25958C19.1542 2.21912 17.919 1.39378 16.5596 0.830691C15.3595 0.333593 14.4241 0.057651 13.209 -0.000201631C12.9332 -0.0133342 12.709 0.212139 12.709 0.488281V10.6825C12.709 10.9587 12.9328 11.1825 13.209 11.1825H22.9765Z" fill="#8A4E9C"></path></g><defs><clipPath id="clip0_5227_2027"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
                                                        </span>
                                                        <span>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect x="24" width="6" height="24" rx="1" transform="rotate(90 24 0)" fill="#0066BE" /> <rect x="13.2617" y="9.14258" width="5.71429" height="13.2632" rx="1" transform="rotate(90 13.2617 9.14258)" fill="#8A4E9C" /> <rect x="19" y="18" width="6" height="19" rx="1" transform="rotate(90 19 18)" fill="#39CABC" /> </svg>
                                                        </span>
                                                    </span>
                                                    <a className="btn"></a>
                                                    </label>
                                                </div>
                                                <Dropdown>
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none" > <path fillRule="evenodd" clipRule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE" /> </svg>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "PNG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download PNG
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "JPEG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download JPEG
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "PDF",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download PDF
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "SVG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download SVG
                                                    </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                </div>
                                                <div className="question-preview-chart">
                                                    <img src={path_image + "dummy-bar-chart.png"} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="question-preview-block matrix">
                                            <div className="question-preview">
                                                <span>Row label curabitur frin...</span>
                                                <div className="d-flex align-items-center justify-content-between question-preview-options">
                                                    <div>
                                                        Choices
                                                    </div>
                                                    <div>
                                                        Respondents
                                                    </div>
                                                </div>
                                                <div className="answer-options">
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#39CABC'}}>&nbsp;</span>
                                                            <div>Very Satisfied</div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>94</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#FAC755'}}>&nbsp;</span>
                                                            <div>Somewhat Satisfied</div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>84</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#F58289'}}>&nbsp;</span>
                                                            <div>Neutral</div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>43</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#8A4E9C'}}>&nbsp;</span>
                                                            <div>Somewhat Dissatisfied</div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>62</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                    <div className="answer">
                                                        <div className="choices">
                                                            <span class="bullet-color" style={{background: '#0066BE'}}>&nbsp;</span>
                                                            <div>Very Dissatisfied</div>
                                                        </div>
                                                        <div className="respondents">
                                                            <span>24</span>
                                                            <span className="respondents-percent">(<span>00%</span>)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="avg-view">
                                                    <div className="dispaly-avg-view d-flex justify-content-between align-items-center">
                                                        <p className="active">Display the AVG  <img src={path_image + 'avg-arrow.svg'} /></p>
                                                        <div className="result-view">
                                                            30.6
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="question-preview-right">
                                                <div className="rd-training-block-right d-flex justify-content-end align-items-center">
                                                <div className="switch6">
                                                    <label className="switch6-light">
                                                    <input
                                                        type="checkbox"
                                                        //checked={whichTypeGraph}
                                                        // onChange={() => {
                                                        // loader("show");

                                                        // setTimeout(() => {
                                                        //     setWhichTypeGraph(!whichTypeGraph);
                                                        //     loader("hide");
                                                        // }, 500);
                                                        // }}
                                                    />
                                                    <span>
                                                        <span>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_5227_2027)"><path d="M11.2048 1.54687C11.2048 1.27073 10.9808 1.04571 10.7049 1.05803C9.10037 1.12967 7.52788 1.54559 6.095 2.27982C4.51361 3.09016 3.14762 4.26499 2.10978 5.70733C1.07194 7.14967 0.39202 8.81816 0.126141 10.5751C-0.139738 12.332 0.0160486 14.127 0.580642 15.8118C1.14524 17.4966 2.10245 19.023 3.37326 20.265C4.64407 21.507 6.19204 22.4289 7.8894 22.9547C9.58676 23.4805 11.3848 23.595 13.1352 23.2889C14.7211 23.0115 16.2267 22.3959 17.5505 21.4863C17.7781 21.3299 17.8212 21.0154 17.6548 20.795L11.3057 12.3854C11.2402 12.2986 11.2048 12.1928 11.2048 12.0841V1.54687Z" fill="#39CABC"></path><path d="M23.5106 12.7847C23.7868 12.7847 24.0118 13.0087 23.9995 13.2846C23.9293 14.8565 23.5287 16.398 22.8216 17.8078C22.1141 19.2186 21.5564 19.844 20.4209 20.7231C20.2107 20.8858 19.9098 20.8496 19.7397 20.6452L13.8814 13.6045C13.6103 13.2788 13.842 12.7847 14.2657 12.7847H23.5106Z" fill="#0066BE"></path><path d="M22.9765 11.1825C23.2526 11.1825 23.4776 10.9586 23.4653 10.6827C23.4072 9.38195 23.1228 8.09995 22.6236 6.89467C22.0605 5.53524 21.2351 4.30004 20.1947 3.25958C19.1542 2.21912 17.919 1.39378 16.5596 0.830691C15.3595 0.333593 14.4241 0.057651 13.209 -0.000201631C12.9332 -0.0133342 12.709 0.212139 12.709 0.488281V10.6825C12.709 10.9587 12.9328 11.1825 13.209 11.1825H22.9765Z" fill="#8A4E9C"></path></g><defs><clipPath id="clip0_5227_2027"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
                                                        </span>
                                                        <span>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect x="24" width="6" height="24" rx="1" transform="rotate(90 24 0)" fill="#0066BE" /> <rect x="13.2617" y="9.14258" width="5.71429" height="13.2632" rx="1" transform="rotate(90 13.2617 9.14258)" fill="#8A4E9C" /> <rect x="19" y="18" width="6" height="19" rx="1" transform="rotate(90 19 18)" fill="#39CABC" /> </svg>
                                                        </span>
                                                    </span>
                                                    <a className="btn"></a>
                                                    </label>
                                                </div>
                                                <Dropdown>
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none" > <path fillRule="evenodd" clipRule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE" /> </svg>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "PNG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download PNG
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "JPEG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download JPEG
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "PDF",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download PDF
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "SVG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download SVG
                                                    </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                </div>
                                                <div className="question-preview-chart">
                                                    <img src={path_image + "dummy-bar-chart.png"} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="survey-question-listing">
                                        <div className="survey-question-top d-flex align-items-center">
                                            <div className="survey-question-num">
                                                <div className="question-type">
                                                    <img src={path_image + "free-text.png"} alt=""/>
                                                </div>
                                                <div className="question-number">
                                                    <h4>Q5</h4>
                                                </div>
                                            </div>
                                            <div className="question-view">
                                                <p>Lorem sollicitudin faucibus Pulvinar ultricies neque praesent mauris, arcu viverra aliquam massa pretium sit arcu curabitur fringilla ?</p>
                                            </div>
                                            <div className="question-status">
                                                <div className="total-answered">
                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M8.29511 6.80015C10.1732 6.80015 11.6953 5.27769 11.6953 3.39993C11.6953 1.52217 10.1729 0 8.29511 0C6.41736 0 4.89432 1.52246 4.89432 3.40022C4.89432 5.27797 6.41736 6.80015 8.29511 6.80015ZM9.73743 7.0319H6.85222C4.45164 7.0319 2.49866 8.98517 2.49866 11.3858V14.9141L2.50763 14.9694L2.75066 15.0455C5.04159 15.7613 7.0319 16 8.67009 16C11.8698 16 13.7244 15.0877 13.8387 15.0296L14.0658 14.9147H14.0901V11.3858C14.091 8.98517 12.138 7.0319 9.73743 7.0319Z" fill="#004A89"/>
                                                    </svg>
                                                    <span>83</span>
                                                </div>
                                                <div className="total-ignored">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M7.73272 13.788C8.08685 13.788 8.42759 13.7618 8.75493 13.7092L11.6037 16L13.3456 14.4885L11.1101 12.7182C11.3761 12.5177 11.6236 12.2906 11.8525 12.0369C12.0186 11.8507 12.172 11.6519 12.3127 11.4404C12.0475 11.4796 11.7761 11.5 11.5 11.5C10.7351 11.5 10.0067 11.3439 9.34492 11.0617C9.22713 11.1562 9.1014 11.2385 8.96774 11.3088C8.61137 11.4992 8.19969 11.5945 7.73272 11.5945C7.26575 11.5945 6.84793 11.4992 6.47926 11.3088C6.11674 11.1183 5.80952 10.8387 5.5576 10.47C5.31183 10.0952 5.12442 9.63748 4.99539 9.09677C4.86636 8.54992 4.80184 7.92319 4.80184 7.21659V6.56221C4.80184 5.84946 4.86636 5.22273 4.99539 4.68203C5.12442 4.14132 5.31183 3.68664 5.5576 3.31797C5.80338 2.94931 6.10753 2.67281 6.47005 2.48848C6.78028 2.32547 7.12877 2.23222 7.5155 2.20871C8.27075 1.41522 9.26058 0.847054 10.3738 0.615407C10.2611 0.556967 10.1457 0.502369 10.0276 0.451613C9.33333 0.150538 8.56221 0 7.71429 0C6.8725 0 6.10138 0.150538 5.40092 0.451613C4.70046 0.752688 4.09831 1.18894 3.59447 1.76037C3.09063 2.3318 2.69739 3.02304 2.41475 3.8341C2.13825 4.63902 2 5.55453 2 6.58065V7.21659C2 8.23656 2.13825 9.15207 2.41475 9.96313C2.69739 10.7742 3.0937 11.4654 3.60369 12.0369C4.11367 12.6022 4.71889 13.0353 5.41935 13.3364C6.11982 13.6375 6.89094 13.788 7.73272 13.788Z" fill="#F58289"/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 6C16 8.48528 13.9853 10.5 11.5 10.5C9.01472 10.5 7 8.48528 7 6C7 3.51472 9.01472 1.5 11.5 1.5C13.9853 1.5 16 3.51472 16 6ZM9.53612 3.96408C9.2552 4.23537 9.24738 4.68302 9.51867 4.96394L10.5109 5.99141L9.50008 7.00221C9.22393 7.27835 9.22393 7.72607 9.50008 8.00222C9.77622 8.27836 10.2239 8.27836 10.5001 8.00222L11.4934 7.00887L12.4659 8.01588C12.7372 8.2968 13.1848 8.30462 13.4657 8.03333C13.7467 7.76205 13.7545 7.3144 13.4832 7.03347L12.4936 6.00871L13.5001 5.00218C13.7763 4.72604 13.7763 4.27832 13.5001 4.00217C13.224 3.72602 12.7763 3.72602 12.5001 4.00217L11.511 4.99124L10.536 3.98154C10.2647 3.70061 9.81704 3.6928 9.53612 3.96408Z" fill="#F58289"/>
                                                    </svg>
                                                    <span>1</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="question-preview-block">
                                            
                                            <div className="question-preview-right">
                                                <div className="rd-training-block-right d-flex justify-content-end align-items-center">
                                                    <Dropdown>
                                                        <Dropdown.Toggle id="dropdown-basic">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none" > <path fillRule="evenodd" clipRule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE" /> </svg>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                        <Dropdown.Item
                                                            // onClick={() =>
                                                            // handleDownload(
                                                            //     "PNG",
                                                            //     whichTypeGraph == 0
                                                            //     ? countryBarRef
                                                            //     : countryPieRef
                                                            // )
                                                            // }
                                                        >
                                                            Download PNG
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            // onClick={() =>
                                                            // handleDownload(
                                                            //     "JPEG",
                                                            //     whichTypeGraph == 0
                                                            //     ? countryBarRef
                                                            //     : countryPieRef
                                                            // )
                                                            // }
                                                        >
                                                            Download JPEG
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            // onClick={() =>
                                                            // handleDownload(
                                                            //     "PDF",
                                                            //     whichTypeGraph == 0
                                                            //     ? countryBarRef
                                                            //     : countryPieRef
                                                            // )
                                                            // }
                                                        >
                                                            Download PDF
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            // onClick={() =>
                                                            // handleDownload(
                                                            //     "SVG",
                                                            //     whichTypeGraph == 0
                                                            //     ? countryBarRef
                                                            //     : countryPieRef
                                                            // )
                                                            // }
                                                        >
                                                            Download SVG
                                                        </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                <div className="free-text-section">
                                                    <div className="free-text-block">
                                                        <p>Username</p>
                                                        <div className="user-message">
                                                            <p>User messages masuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec mas faucibus quisque nuneque ipsum quamodio.........................</p>
                                                        </div>
                                                    </div>
                                                    <div className="free-text-block">
                                                        <p>Username</p>
                                                        <div className="user-message">
                                                            <p>User messages masuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec mas faucibus quisque nuneque ipsum quamodio.........................</p>
                                                        </div>
                                                    </div>
                                                    <div className="free-text-block">
                                                        <p>Username</p>
                                                        <div className="user-message">
                                                            <p>User messages masuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec mas faucibus quisque nuneque ipsum quamodio.........................</p>
                                                        </div>
                                                    </div>
                                                    <div className="free-text-block">
                                                        <p>Username</p>
                                                        <div className="user-message">
                                                            <p>User messages masuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec mas faucibus quisque nuneque ipsum quamodio.........................</p>
                                                        </div>
                                                    </div>
                                                    <div className="free-text-block">
                                                        <p>Username</p>
                                                        <div className="user-message">
                                                            <p>User messages masuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec mas faucibus quisque nuneque ipsum quamodio.........................</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                    <div className="question-preview-block survey-takers-state">
                                        <div className="top-header">
                                            <div className="page-title">
                                                {" "}
                                                <h4>Survey Takers status | <span>94</span></h4>
                                            </div>
                                            <div className="top-right-action">
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
                                                        {localStorage.getItem("user_id") !=
                                                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
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
                                                        ) : (
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
                                                        )}
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
                                                <div className="clear-search d-flex align-items-center">
                                                    <button className="btn print">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z" fill="#0066BE"></path><path d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z" fill="#0066BE"></path></svg>
                                                    </button>
    
                                                </div>
                                            </div>
                                        </div>
                                            <div className="survey_data_details">
                                                <div className="survey_data_accordion_heading">
                                                    <Table className="fold-table" id="survey-takers">
                                                        <thead className="header">
                                                        <tr>
                                                            <th className="sort_option">
                                                            <span>  
                                                                {/* onClick={(e) => userSort(e, "name")}> */}
                                                                Name
                                                            <button
                                                                // className={`event_sort_btn ${isActive?.name == "dec"
                                                                //     ? "svg_active"
                                                                //     : isActive?.name == "asc"
                                                                //     ? "svg_asc"
                                                                //     : ""
                                                                // }`}
                                                                // onClick={(e) => userSort(e, "name")}
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
                                                            </button></span></th>

                                                            <th className="sort_option">
                                                            <span> 
                                                            {/* onClick={(e) => userSort(e, "email")}> */}
                                                                Email
                                                            <button
                                                                // className={`event_sort_btn ${isActive?.email == "dec"
                                                                //     ? "svg_active"
                                                                //     : isActive?.email == "asc"
                                                                //     ? "svg_asc"
                                                                //     : ""
                                                                // }`}
                                                                // onClick={(e) => userSort(e, "email")}
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
                                                            </button></span></th>

                                                            <th className="sort_option">
                                                                <span> 
                                                                {/* onClick={(e) => userSort(e, "region")}> */}
                                                                Region
                                                                    <button
                                                                    // className={`event_sort_btn ${
                                                                    //     isActive?.region == "dec"
                                                                    //     ? "svg_active"
                                                                    //     : isActive?.region == "asc"
                                                                    //     ? "svg_asc"
                                                                    //     : ""
                                                                    // }`}
                                                                    // onClick={(e) => userSort(e, "region")}
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

                                                            <th className="sort_option"> 
                                                            <span> 
                                                                 {/* onClick={(e) => userSort(e, "country")}> */}
                                                                Country
                                                            <button
                                                                // className={`event_sort_btn ${isActive?.country == "dec"
                                                                //     ? "svg_active"
                                                                //     : isActive?.country == "asc"
                                                                //     ? "svg_asc"
                                                                //     : ""
                                                                // }`}
                                                                // onClick={(e) => userSort(e, "country")}
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
                                                            </button></span></th>

                                                            <th className="sort_option"> 
                                                            <span> 
                                                            {/* onClick={(e) => userSort(e, "created_at")}> */}
                                                                Date
                                                            <button
                                                                // className={`event_sort_btn ${isActive?.created_at == "dec"
                                                                //     ? "svg_active"
                                                                //     : isActive?.created_at == "asc"
                                                                //     ? "svg_asc"
                                                                //     : ""
                                                                // }`} onClick={(e) => userSort(e, "created_at")}
                                                                
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
                                                            </button></span></th>

                                                            <th className="sort_option">
                                                            <span>Status 
                                                            <button
                                                                // className={`event_sort_btn ${isActive?.survey_data?.patient_case
                                                                //     ?.patient_case_rating == "dec"
                                                                //     ? "svg_active"
                                                                //     : isActive?.survey_data?.patient_case
                                                                //     ?.patient_case_rating == "asc"
                                                                //     ? "svg_asc"
                                                                //     : ""
                                                                // }`}
                                                                // onClick={(e) => userSort(e, "survey_data.patient_case.patient_case_rating")}
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
                                                            </button></span></th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className='view show'>
                                                                <td>UserName</td>
                                                                <td>User@docintel.app</td>
                                                                <td>EU</td>
                                                                <td>United Kingdom</td>
                                                                <td>18 July. 2024</td>
                                                                <td className="completed">Completed</td>
                                                                   
                                                            </tr>
                                                                    
                                                            <tr className="fold">
                                                                <td colspan="6">
                                                                    <div className="survey-data">
                                                                        <div class="question-type">
                                                                            <img src={path_image +'multiple-choices.png'} alt=""/>
                                                                        </div>
                                                                        <div>
                                                                            <h6>
                                                                                Q1 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec mat?
                                                                            </h6>
                                                                            <p>
                                                                                Survey takers answer choice dolor sit amet consect ltrices vitae 
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="survey-data">
                                                                        <div class="question-type">
                                                                            <img src={path_image +'dropdown-choice.png'} alt=""/>
                                                                        </div>
                                                                        <div>
                                                                            <h6>
                                                                            Q2 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra?
                                                                            </h6>
                                                                            <p>
                                                                            Survey takers answer choice dolor 
                                                                            </p> 
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    <div className="survey-data">
                                                                        <div class="question-type">
                                                                            <img src={path_image +'star-rating.png'} alt=""/>
                                                                        </div>
                                                                        <div>
                                                                            <h6>
                                                                            Q3 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa?
                                                                            </h6>
                                                                            <p>
                                                                            Survey takers answer choice dolor 
                                                                            </p>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    <div className="survey-data">
                                                                        <div class="question-type">
                                                                            <img src={path_image +'matrix.png'} alt=""/>
                                                                        </div>
                                                                        <div>
                                                                            <h6>
                                                                            Q4 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec?
                                                                            </h6>
                                                                            <p>
                                                                            Survey takers answer choice dolor sit amet consect ltrices vitae 
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="survey-data">
                                                                        <div class="question-type">
                                                                            <img src={path_image +'free-text.png'} alt=""/>
                                                                        </div>
                                                                        <div>
                                                                            <h6>
                                                                            Q5 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor?
                                                                            </h6>
                                                                            <p>
                                                                            Survey takers answer choice dolor sit amet consect ltrices vitae  
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr className="blank">
                                                                <td colspan="6" style={{ height: "10px;" }}>
                                                                &nbsp;
                                                                </td>
                                                            </tr>
                                                            <tr className='view show'>
                                                                    <td>UserName</td>
                                                                    <td>User@docintel.app</td>
                                                                    <td>EU</td>
                                                                    <td>United Kingdom</td>
                                                                    <td>18 July. 2024</td>
                                                                    <td className="drop-off">Drop-off</td>
                                                                   
                                                            </tr>
                                                                    
                                                            <tr className="fold">
                                                                <td colspan="6">
                                                                    <div className="survey-data">
                                                                        <div class="question-type">
                                                                            <img src={path_image +'multiple-choices.png'} alt=""/>
                                                                        </div>
                                                                        <div>
                                                                            <h6>
                                                                                Q1 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec mat?
                                                                            </h6>
                                                                            <p>
                                                                                Survey takers answer choice dolor sit amet consect ltrices vitae 
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="survey-data">
                                                                        <div class="question-type">
                                                                            <img src={path_image +'dropdown-choice.png'} alt=""/>
                                                                        </div>
                                                                        <div>
                                                                            <h6>
                                                                            Q2 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra?
                                                                            </h6>
                                                                            <p>
                                                                            Survey takers answer choice dolor 
                                                                            </p> 
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    <div className="survey-data">
                                                                        <div class="question-type">
                                                                            <img src={path_image +'star-rating.png'} alt=""/>
                                                                        </div>
                                                                        <div>
                                                                            <h6>
                                                                            Q3 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa?
                                                                            </h6>
                                                                            <p>
                                                                            Survey takers answer choice dolor 
                                                                            </p>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    <div className="survey-data">
                                                                        <div class="question-type">
                                                                            <img src={path_image +'matrix.png'} alt=""/>
                                                                        </div>
                                                                        <div>
                                                                            <h6>
                                                                            Q4 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec?
                                                                            </h6>
                                                                            <p>
                                                                            Survey takers answer choice dolor sit amet consect ltrices vitae 
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="survey-data">
                                                                        <div class="question-type">
                                                                            <img src={path_image +'free-text.png'} alt=""/>
                                                                        </div>
                                                                        <div>
                                                                            <h6>
                                                                            Q5 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor?
                                                                            </h6>
                                                                            <p>
                                                                            Survey takers answer choice dolor sit amet consect ltrices vitae  
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr className="blank">
                                                                <td colspan="6" style={{ height: "10px;" }}>
                                                                &nbsp;
                                                                </td>
                                                            </tr>
                                                            <tr className='view show'>
                                                                    <td>UserName</td>
                                                                    <td>User@docintel.app</td>
                                                                    <td>EU</td>
                                                                    <td>United Kingdom</td>
                                                                    <td>18 July. 2024</td>
                                                                    <td className="ignored">Ignored</td>
                                                                   
                                                            </tr>
                                                                    
                                                            <tr className="fold">
                                                                <td colspan="6">
                                                                    <div className="survey-data ignore">
                                                                        <p>They have not opened the Survey and not answered any questions</p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr className="blank">
                                                                <td colspan="6" style={{ height: "10px;" }}>
                                                                &nbsp;
                                                                </td>
                                                            </tr>
                                                            <tr className='view show'>
                                                                    <td>UserName</td>
                                                                    <td>User@docintel.app</td>
                                                                    <td>EU</td>
                                                                    <td>United Kingdom</td>
                                                                    <td>18 July. 2024</td>
                                                                    <td className="ignored">Ignored</td>
                                                                   
                                                            </tr>
                                                                    
                                                            <tr className="fold">
                                                                <td colspan="6">
                                                                    <div className="survey-data ignore">
                                                                        <p>They have not opened the Survey and not answered any questions</p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                                
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                    </div>
                                    <div className="survey-question-listing country-by">
                                        <div className="survey-question-top d-flex align-items-center justify-content-between">
                                            <div className="page-title">
                                                <h4>Survey Takers (Completed) According to country</h4>
                                            </div>
                                            <div className="question-status">
                                                <div className="total-answered">
                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M8.29511 6.80015C10.1732 6.80015 11.6953 5.27769 11.6953 3.39993C11.6953 1.52217 10.1729 0 8.29511 0C6.41736 0 4.89432 1.52246 4.89432 3.40022C4.89432 5.27797 6.41736 6.80015 8.29511 6.80015ZM9.73743 7.0319H6.85222C4.45164 7.0319 2.49866 8.98517 2.49866 11.3858V14.9141L2.50763 14.9694L2.75066 15.0455C5.04159 15.7613 7.0319 16 8.67009 16C11.8698 16 13.7244 15.0877 13.8387 15.0296L14.0658 14.9147H14.0901V11.3858C14.091 8.98517 12.138 7.0319 9.73743 7.0319Z" fill="#004A89"/>
                                                    </svg>
                                                    <span>83</span>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="question-preview-block">
                                            <div className="question-preview-right">
                                                <div className="rd-training-block-right d-flex justify-content-end align-items-center">
                                                <div className="switch6">
                                                    <label className="switch6-light">
                                                    <input
                                                        type="checkbox"
                                                        //checked={whichTypeGraph}
                                                        // onChange={() => {
                                                        // loader("show");

                                                        // setTimeout(() => {
                                                        //     setWhichTypeGraph(!whichTypeGraph);
                                                        //     loader("hide");
                                                        // }, 500);
                                                        // }}
                                                    />
                                                    <span>
                                                        <span>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_5227_2027)"><path d="M11.2048 1.54687C11.2048 1.27073 10.9808 1.04571 10.7049 1.05803C9.10037 1.12967 7.52788 1.54559 6.095 2.27982C4.51361 3.09016 3.14762 4.26499 2.10978 5.70733C1.07194 7.14967 0.39202 8.81816 0.126141 10.5751C-0.139738 12.332 0.0160486 14.127 0.580642 15.8118C1.14524 17.4966 2.10245 19.023 3.37326 20.265C4.64407 21.507 6.19204 22.4289 7.8894 22.9547C9.58676 23.4805 11.3848 23.595 13.1352 23.2889C14.7211 23.0115 16.2267 22.3959 17.5505 21.4863C17.7781 21.3299 17.8212 21.0154 17.6548 20.795L11.3057 12.3854C11.2402 12.2986 11.2048 12.1928 11.2048 12.0841V1.54687Z" fill="#39CABC"></path><path d="M23.5106 12.7847C23.7868 12.7847 24.0118 13.0087 23.9995 13.2846C23.9293 14.8565 23.5287 16.398 22.8216 17.8078C22.1141 19.2186 21.5564 19.844 20.4209 20.7231C20.2107 20.8858 19.9098 20.8496 19.7397 20.6452L13.8814 13.6045C13.6103 13.2788 13.842 12.7847 14.2657 12.7847H23.5106Z" fill="#0066BE"></path><path d="M22.9765 11.1825C23.2526 11.1825 23.4776 10.9586 23.4653 10.6827C23.4072 9.38195 23.1228 8.09995 22.6236 6.89467C22.0605 5.53524 21.2351 4.30004 20.1947 3.25958C19.1542 2.21912 17.919 1.39378 16.5596 0.830691C15.3595 0.333593 14.4241 0.057651 13.209 -0.000201631C12.9332 -0.0133342 12.709 0.212139 12.709 0.488281V10.6825C12.709 10.9587 12.9328 11.1825 13.209 11.1825H22.9765Z" fill="#8A4E9C"></path></g><defs><clipPath id="clip0_5227_2027"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
                                                        </span>
                                                        <span>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect x="24" width="6" height="24" rx="1" transform="rotate(90 24 0)" fill="#0066BE" /> <rect x="13.2617" y="9.14258" width="5.71429" height="13.2632" rx="1" transform="rotate(90 13.2617 9.14258)" fill="#8A4E9C" /> <rect x="19" y="18" width="6" height="19" rx="1" transform="rotate(90 19 18)" fill="#39CABC" /> </svg>
                                                        </span>
                                                    </span>
                                                    <a className="btn"></a>
                                                    </label>
                                                </div>
                                                <Dropdown>
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none" > <path fillRule="evenodd" clipRule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE" /> </svg>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "PNG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download PNG
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "JPEG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download JPEG
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "PDF",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download PDF
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        // onClick={() =>
                                                        // handleDownload(
                                                        //     "SVG",
                                                        //     whichTypeGraph == 0
                                                        //     ? countryBarRef
                                                        //     : countryPieRef
                                                        // )
                                                        // }
                                                    >
                                                        Download SVG
                                                    </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                </div>
                                                <div className="question-preview-chart">
                                                    <img src={path_image + "dummy-pie.png"} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </div> 
            </Col>
        </>
    )
}
export default SurveyAnalyticsDetail
