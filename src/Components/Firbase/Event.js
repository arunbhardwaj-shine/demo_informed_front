import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { postData, getData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import EventModel from "../../Model/EventModel";
import SessionModel from "../../Model/SessionModel";
import Cookies from "js-cookie";
import DisplayAnswer from "../../Model/DisplayAnswer";
import "./custom.css";
import { loader } from "../../loader";
import "./style.css";
import { v4 as uuid } from "uuid";
import dynamicEventData from "../NewWebinar/WebinarFiles/WebinarDashboard/ChatLinkPage/events.json";

import axios from "axios";
import { db } from "../../config/firebaseConfig";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CommonPageLinkNotFound from "../CommonComponent/CommonPageLinkNotFound";
let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const Event = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  let parms = searchParams.get("evnt");
  const queryParams = new URLSearchParams(location.search);
  const [eventId, setEvent] = useState({
    id: 0,
    companyId: 0,
  });
  const [error, setError] = useState({});

  const q = query(
    collection(db, "chat"),
    where("triggered", "!=", 0),
    where("event_id", "==", eventId?.id?eventId?.id:0)
  );
  const [data, setData] = useState(0);
  const [user, setUser] = useState({});
  const [value, setValue] = useState({});

  const [show, setShow] = useState(false);
  const [sessionShow, setSessionShow] = useState(false);

  const [apiData, setApiData] = useState([]);
  const [answerPop, setAnswerPopup] = useState(false);
  const [totalReaders, setTotalReaders] = useState(0);
  const [customAnswer, setCustomAnswer] = useState(0);
  const [graphType, setGraphType] = useState(0);

  const [dynamicContent, setDynamicContent] = useState({});
  const [formData, setFormData] = useState({});
  const [prevData, setPrevData] = useState({});
  const [logo, setLogo] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isDataSaved, setIsDataSaved] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    EventDataFun();
    fetchApiData();
  }, []);

  const fetchApiData = async () => {
    try {
      loader("show");
      const response = await getData(`${ENDPOINT.GETCHATLINKDATA}/${parms}`);
      const { chatLinkData } = response?.data?.data;
      console.log(response?.data?.data, "data");

      if (chatLinkData && Object.keys(chatLinkData).length !== 0) {
        setDynamicContent(chatLinkData);
        setFormData(chatLinkData);
        setLogo(chatLinkData?.logoImageUrl);
      } else {
        setLogo(dynamicContent?.logoImageUrl);
      }
      setIsDataLoaded(true);
    } catch (error) {
      setLogo(dynamicContent?.logoImageUrl);

      console.error("Error fetching settings:", error);
    } finally {
      loader("hide");
    }
  };

  const EventDataFun = async () => {
    try {
      loader("show");
      const result = await postData(ENDPOINT.EVENT_ID, {
        eventCode: queryParams.get("evnt"),
      });
     
      setEvent(result.data.data);
      loader("hide");
      // const isInEventRegistration = window.location.pathname.includes('event');
      // document.title = isInEventRegistration ? result?.data?.data?.title : '';
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      // console.log(formData?.templateId,'formData?.templateId')
      e.preventDefault();
      if ((Object.keys(user).length === 0 || !user.question?.trim()) && formData?.templateId === 2 )   {
        setError({ question: "Por favor escriba su pregunta" });
        return;
      } 
      else if (Object.keys(user).length === 0 || !user.question?.trim()) {
        setError({ question: "Please enter your question" });
        return;
      }
      
   
      else {
        setError({});
      }
      loader("show");
      let events = Cookies.get("events");

      let body = {
        company_id: eventId?.companyId,
        event_id: eventId?.id,
        user_id: 2147533104,
        question: user?.question,
        portal: "web",
        name: user?.name,
      };
      await postData(ENDPOINT.ADD_WEBINAR_QUESTION, body);
      if (data) {
        setData(0);
      }
      if (show) {
        setShow(false);
      }
      if (Object.keys(value)?.length) {
        setValue({});
      }
      setUser({ question: "", name: "" });
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };

  onSnapshot(q, (querySnapshot) => {
   
    let newData = {};
    querySnapshot.forEach((doc) => {
      if (doc.data()) {
        newData = doc.data();
      }
    });
    if (Object.keys(newData)?.length) {
      // console.log(newData,"newDatanewDatanewData")
      /* Check already submit question  */
      let userResetCounter = newData?.resetFlag ? newData?.resetFlag : 0;
      let eventQuestion = Cookies.get(
        "eventQuestion" + newData?.event_id + "_" + userResetCounter
      );
      if (
        eventQuestion?.includes(newData?.question_id) &&
        newData?.triggered == 1
      ) {
        if (data) {
          setData(0);
        }
        if (show) {
          setShow(false);
        }
        if (answerPop) {
          setAnswerPopup(false);
        }
        if (sessionShow) {
          setSessionShow(false);
        }

        if (Object.keys(value)?.length) {
          setValue({});
        }
        return;
      }
      //  else if (
      //   !eventQuestion?.includes(newData?.question_id) &&
      //   newData?.triggered == 2
      // ) {
      //   if (data) {
      //     setData(0);
      //   }
      //   if (show) {
      //     setShow(false);
      //   }
      //   if (answerPop) {
      //     setAnswerPopup(false);
      //   }
      //   if (sessionShow) {
      //     setSessionShow(false);
      //   }
      //   if (Object.keys(value)?.length) {
      //     setValue({});
      //   }
      //   return;
      // }

      if (newData?.triggered == 1) {
        if (Object.keys(value)?.length) {
          if (
            (newData?.question_id != value?.question_id &&
              newData?.event_id != value?.event_id) ||
            newData?.triggered != value?.triggered
          ) {
            setValue(newData);
            setData(newData?.triggered);
          }
        } else {
          setValue(newData);
          setData(newData?.triggered);
        }
      } else if (newData?.triggered == 2) {
        if (Object.keys(value)?.length) {
          if (
            (newData?.question_id != value?.question_id &&
              newData?.event_id != value?.event_id) ||
            newData?.triggered != value?.triggered
          ) {
            setValue(newData);
            setData(newData?.triggered);
          }
        } else {
          setValue(newData);
          setData(newData?.triggered);
        }
      } else if (newData?.triggered == 3) {
        if (Object.keys(value)?.length) {
          if (
            (newData?.question_id != value?.question_id &&
              newData?.event_id != value?.event_id) ||
            newData?.triggered != value?.triggered
          ) {
            setValue(newData);
            setData(newData?.triggered);
          }
        } else {
          setValue(newData);
          setData(newData?.triggered);
        }
      } else {
        if (show) {
          setShow(false);
        }
        if (answerPop) {
          setAnswerPopup(false);
        }
        setValue({});
        setData(0);
        setSessionShow(false);
      }
    } else {
      if (show) {
        setValue({});
        setData(0);
        setShow(false);
      }
      if (answerPop) {
        setAnswerPopup(false);
      }
      setSessionShow(false);
    }
  });
  const handleEvent = async () => {
    try {
      if (data == 1) {
        if (Object.keys(value)?.length) {
          const result = await postData(ENDPOINT.SESSION_LIST, {
            id: value?.question_id,
          });
          setApiData(result?.data?.data);
          setAnswerPopup(false);
          setShow(true);
          //   setSessionShow(true)
          setData(0);

          // const result = await postData(ENDPOINT.WEBINAR_QUESTION,{
          //       eventId:value?.event_id,
          //       companyId:value?.question_id
          //   })
          //   setApiData(result?.data?.data)
          //   setShow(true)
          //   setAnswerPopup(false)
          //   setData(0)
          //   setSessionShow(false)
        }
      } else if (data == 2) {
        const result = await postData(ENDPOINT.POLL_ANSWER, {
          eventId: value?.event_id,
          companyId: value?.question_id,
        });
        setApiData(result?.data?.data);
        setTotalReaders(result?.data?.totalReader);
        setCustomAnswer(result?.data?.custom_answer);
        setGraphType(result?.data?.graphType);
        setAnswerPopup(true);
        setShow(false);
        setData(0);
        setSessionShow(false);
      } else if (data == 3) {
        const result = await postData(ENDPOINT.SESSION_LIST, {
          id: value?.question_id,
        });
        setApiData(result?.data?.data);
        setAnswerPopup(false);
        setShow(false);
        setSessionShow(true);
        setData(0);
      }
    } catch (err) {
      console.log("-er", err);
    }
  };
  useEffect(() => {
    let events = Cookies.get("events");
    if (!events) {
      const unique_id = uuid();
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      Cookies.set("events", `${unique_id}`, { expires: expirationDate });
    }
    console.log("data in use effect->",data)
    if (data) {
      handleEvent();
    }
  }, [data]);

  const shouldAddClass = parms && parms.includes("eahad_2024")  || parms.includes("THSNA2024");
  const addClass =
    (parms && parms.includes("GTH2024")) || parms.includes("WFH2024");

  return (
    <>
      <div className="webinar-popup">
        
        <div className="loader" id="custom_loader">
          <div className="loader_show">
            <span className="loader-view"> </span>
          </div>
        </div>
        {Object.keys(formData)?.length>0?(<>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
       
        {isDataLoaded&&(parms && parms.includes("eahad_2024") || parms.includes("THSNA2024") || parms && parms.includes("GTH2024") || parms.includes("WFH2024")) ? (
          <div
            // className={`octa_events ${
            //   shouldAddClass ? "eahad_2024" : ""
            // }`}
            className={`octa_events ${shouldAddClass ? "eahad_2024" : ""}${
              addClass ? "gth-2024" : ""
            }`}
          >
            {/* <div className="octa_events"> */}
            <div className="container">
              <div className="question-block">
                <div className="header-logo">
                  <div>
                    {/* <img src="https://webinar.docintel.app/EAHAD2022/images/Octapharma_blue.png" /> */}
                    {/* <img src={path_image+'FVIII_logo.png'} alt="Logo" /> */}
                    <img
                      // src={`${
                      //   parms?.includes("eahad_2024")
                      //     ? "https://webinar.docintel.app/EAHAD2022/images/Octapharma_blue.png"
                      //     : formData?.logoImageUrl?formData?.logoImageUrl:"https://onesourcedoc.s3.eu-west-1.amazonaws.com/images/3BOf8GjoyBykieysOxBPUPNfeXFV4YBT1i3M3T01.png"
                      //     // path_image + "FVIII_logo.png"
                      // }`}
                      src={`${
                        parms?.includes("eahad_2024")  || parms.includes("THSNA2024")
                          ? "https://webinar.docintel.app/EAHAD2022/images/Octapharma_blue.png"
                          : parms?.includes("GTH2024") || parms.includes("WFH2024")
                          ? "https://webinar.docintel.app/EAHAD2022/images/Octapharma_blue.png"
                          : formData?.logoImageUrl
                          ? formData?.logoImageUrl
                          : "https://onesourcedoc.s3.eu-west-1.amazonaws.com/images/3BOf8GjoyBykieysOxBPUPNfeXFV4YBT1i3M3T01.png"
                      }`}
                      alt="Factor logo"
                    />
                  </div>
                </div>
                <div className="question-block-form">
                  <div className="log-inner">
                    {/* {parms?.includes("eahad_2024") ? (
                      <div
                        className="head-sec"
                      >
                        {parms?.includes("eahad_2024") ? (
                          <div>
                            <img
                              classname="header-img"
                              src={path_image + "underspotlight-new1.png"}
                              alt=""
                            />
                            <div className="right-side-img">
                              <img
                                src={path_image + "underspot-lady.png"}
                                alt=""
                              />
                            </div>
                          </div>
                        ) : (
                          <h2
                            className="top-title"
                            style={{ color: formData?.textColor }}
                            dangerouslySetInnerHTML={{
                              __html: formData?.heading,
                            }}
                          >
                           
                          </h2>
                        )}
           
                      </div>
                    ) : (
                      <div
                        className="head-sec"
                        style={{
                          background: formData?.headerBackgroundColor,
                          borderBottomColor: formData?.buttonColor,
                        }}
                      >
                        {parms?.includes("eahad_2024") ? (
                          <div>
                            <img
                              classname="header-img"
                              src={path_image + "underspotlight-new1.png"}
                              alt=""
                            />
                            <div className="right-side-img">
                              <img
                                src={path_image + "underspot-lady.png"}
                                alt=""
                              />
                            </div>
                          </div>
                        ) : (
                          <h2
                            className="top-title"
                            style={{ color: formData?.textColor }}
                            dangerouslySetInnerHTML={{
                              __html: formData?.heading
                                ? formData?.heading
                                : " Write your question here!",
                            }}
                          >
                          </h2>
                        )}
           
                      </div>
                    )} */}

                    {parms?.includes("eahad_2024") ? (
                      <div className="head-sec">
                        {parms?.includes("eahad_2024") ? (
                          <div>
                            <img
                              className="header-img"
                              src={path_image + "underspotlight-new1.png"}
                              alt=""
                            />
                            <div className="right-side-img">
                              <img
                                src={path_image + "underspot-lady.png"}
                                alt=""
                              />
                            </div>
                          </div>
                        ) : (
                          <h2
                            className="top-title"
                            style={{ color: formData?.textColor }}
                            dangerouslySetInnerHTML={{
                              __html: formData?.heading,
                            }}
                          ></h2>
                        )}
                      </div>
                    ) : 
                    parms?.includes("THSNA2024")  ? (
                      <div className="head-sec thsna-header">
                        {parms?.includes("THSNA2024")  ? (
                          <img
                          className="header-img"
                          src={path_image + "thsna2024.png"}
                          alt=""
                        />
                        ) : (
                          <h2
                            className="top-title"
                            style={{ color: formData?.textColor }}
                            dangerouslySetInnerHTML={{
                              __html: formData?.heading,
                            }}
                          ></h2>
                        )}
                      </div>
                    ) :parms?.includes("WFH2024")  ? (
                      <div className="head-sec">
                        {parms?.includes("WFH2024")  ? (
                          <div>
                            <img
                              className="header-img"
                                src={path_image + "spotlight-logo.png"}
                              alt=""
                            />
                            <div className="right-side-img">
                              <img
                                  src={path_image + "gth-banner2.png"}
                                alt=""
                              />
                            </div>
                          </div>
                        ) : (
                          <h2
                            className="top-title"
                            style={{ color: formData?.textColor }}
                            dangerouslySetInnerHTML={{
                              __html: formData?.heading,
                            }}
                          ></h2>
                        )}
                      </div>
                    )  :  parms?.includes("GTH2024")  ? (
                      <div className="head-sec gth-header">
                        {parms?.includes("GTH2024")  ? (
                          <div>
                            <img
                              className="header-img"
                                src={path_image + "spotlight-logo.png"}
                              alt=""
                            />
                            <div className="right-side-img">
                              <img
                                  src={path_image + "gth-banner1.png"}
                                alt=""
                              />
                            </div>
                          </div>
                        ) : (
                          <h2
                            className="top-title"
                            style={{ color: formData?.textColor }}
                            dangerouslySetInnerHTML={{
                              __html: formData?.heading,
                            }}
                          ></h2>
                        )}
                      </div>
                    ) : (
                      <div
                        className="head-sec"
                        style={{
                          background: formData?.headerBackgroundColor,
                          borderBottomColor: formData?.buttonColor,
                        }}
                      >
                        {parms?.includes("eahad_2024") ? (
                          <div>
                            <img
                              className="header-img"
                              src={path_image + "underspotlight-new1.png"}
                              alt=""
                            />
                            <div className="right-side-img">
                              <img
                                src={path_image + "underspot-lady.png"}
                                alt=""
                              />
                            </div>
                          </div>
                        ) : (
                          <h2
                            className="top-title"
                            style={{ color: formData?.textColor }}
                            dangerouslySetInnerHTML={{
                              __html: formData?.heading
                                ? formData?.heading
                                : " Write your question here!",
                            }}
                          ></h2>
                        )}
                      </div>
                    )}
                  </div>
                  {parms?.includes("eahad_2024") || parms.includes("THSNA2024") ? (
                    <div className="event_title">
                      <h2 className="top-title">Type your question here!</h2>
                    </div>
                  ) : null}
                  {parms?.includes("GTH2024") || parms.includes("WFH2024")? (
                    <div className="event_title">
                      <h2 className="top-title">Type your question here!</h2>
                    </div>
                  ) : null}
                  <form onSubmit={handleSubmit}>
                    <input
                      type="hidden"
                      className="form-control"
                      id="guest_id"
                      name="guest_id"
                      value="lji3sjpsdc21tux2st"
                    />

                    <div className="row">
                      <div className="col-md-12">
                        {/* <label htmlFor="fname" className="form-label">
                      Name{" "}
                      <i>
                        <small>(Optional)</small>
                      </i>
                    </label> */}
                        <label
                          htmlFor="fname"
                          className="form-label"
                          style={{ color: formData?.textColor }}
                          dangerouslySetInnerHTML={{
                            __html: formData?.nameLabel
                              ? formData?.nameLabel
                              : "Name",
                          }}
                          // <i>
                          //   <small>(Optional)</small>
                          // </i>
                        />
                        {/* <input
                      type="text"
                      id="name"
                      onChange={handleChange}
                      className="form-control"
                      placeholder={
                        parms?.includes("eahad_2024")
                          ? "Type your name"
                          : "Write your name"
                      }
                      name="name"
                      value={user?.name}
                    /> */}

                        <input
                          type="text"
                          id="name"
                          onChange={handleChange}
                          className="form-control "
                          placeholder={
                            parms?.includes("eahad_2024") || parms.includes("THSNA2024")
                              ? "Type your name"
                              : parms?.includes("GTH2024") || parms.includes("WFH2024")
                              ? "Type your name"
                              : formData?.namePlaceholder
                              ? formData?.namePlaceholder
                              : "Write your name"
                          }
                          name="name"
                          value={user?.name}
                          style={{
                            borderColor: formData?.textColor,
                          }}
                        />
                        <input
                          type="hidden"
                          className="form-control"
                          value="Question submitted successfully"
                          name="succ_message"
                        />
                        <input
                          type="hidden"
                          className="form-control"
                          value="Please enter message"
                          name="err_message"
                        />
                        <input
                          type="hidden"
                          className="form-control"
                          value="index.php?evnt=octa-academy-2023"
                          name="page"
                        />
                      </div>
                      <div className="col-md-12">
                        {/* <label htmlFor="question" className="form-label">
                      Your question<sup>*</sup>
                    </label> */}
                        <label
                          htmlFor="fname"
                          className="form-label"
                          style={{ color: formData?.textColor }}
                          dangerouslySetInnerHTML={{
                            __html: formData?.questionLabel
                              ? formData?.questionLabel
                              : "Your question",
                          }}
                          // <sup>*</sup>
                        />
                        {/* <textarea
                      name="question"
                      id="question"
                      onChange={handleChange}
                      className="form-control"
                      placeholder={
                        parms?.includes("eahad_2024")
                          ? "Type your question"
                          : "Write your question"
                      }
                      cols="40"
                      rows="4"
                      value={user?.question}
                    ></textarea> */}

                        <textarea
                          name="question"
                          id="question"
                          onChange={handleChange}
                          className="form-control"
                          placeholder={
                            parms?.includes("eahad_2024")  || parms.includes("THSNA2024")
                              ? "Type your question"
                              : parms?.includes("GTH2024") || parms.includes("WFH2024")
                              ? "Type your question"
                              : formData?.questionPlaceholder
                              ? formData?.questionPlaceholder
                              : "Write your question"
                          }
                          cols="40"
                          rows="4"
                          value={user?.question}
                          style={{
                            borderColor: formData?.textColor,
                          }}
                        ></textarea>

                        {error?.question ? (
                          <span className="event-validation">
                            {error?.question}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="col-md-12">
                        {/* <input
                      type="submit"
                      className="btn btn-success"
                      value={
                        parms?.includes("eahad_2024")
                          ? "SUBMIT"
                          : "SEND"
                      }
                    /> */}

                        {/* {parms?.includes("eahad_2024") ? (
                          <input
                            type="submit"
                            className="btn btn-success"
                            value={
                              parms?.includes("eahad_2024") ? "SUBMIT" : "SEND"
                            }
                          />
                        ) :  (
                          <Button
                            type="submit"
                            className="btn btn-success"
                            style={{
                              background: formData?.buttonColor,
                              borderColor: formData?.buttonColor,
                            }}
                            dangerouslySetInnerHTML={{
                              __html: formData?.buttonText
                                ? formData?.buttonText
                                : "SEND",
                            }}
                          ></Button>
                        )} */}

                        {parms?.includes("eahad_2024") || parms.includes("THSNA2024")? (
                          <input
                            type="submit"
                            className="btn btn-success"
                            value={
                              parms?.includes("eahad_2024")  || parms.includes("THSNA2024") ? "SUBMIT" : "SEND"
                            }
                          />
                        ) : parms?.includes("GTH2024") || parms.includes("WFH2024") ? (
                          <input
                            type="submit"
                            className="btn btn-success"
                            value={
                              parms?.includes("GTH2024") || parms.includes("WFH2024") ? "SUBMIT" : "SEND"
                            }
                          />
                        ) : (
                          <Button
                            type="submit"
                            className="btn btn-success"
                            style={{
                              background: formData?.buttonColor,
                              borderColor: formData?.buttonColor,
                            }}
                            dangerouslySetInnerHTML={{
                              __html: formData?.buttonText
                                ? formData?.buttonText
                                : "SEND",
                            }}
                          ></Button>
                        )}
                      </div>

                      {parms?.includes("eahad_2024") && (
                        <div className="eahad-footer">
                          <img
                            src="https://docintel.app/img/octa/e-templates/one-source/onesource-logo-org.gif"
                            alt=""
                          />
                          <div className="footer-msg">
                            <p>
                              Visit{" "}
                              <a
                                target="_blank"
                                href="https://onesource.octapharma.com"
                              >
                                One Source
                              </a>
                              , Octapharma’s online haematology platform for
                              healthcare professionals, to be up to date with
                              the latest news and events, and to hear leading
                              experts share their opinions about treating
                              patients with bleeding disorders.
                            </p>
                            <p>
                              To visit One Source click here:{" "}
                              <a
                                target="_blank"
                                href="https://onesource.octapharma.com"
                              >
                                https://onesource.octapharma.com
                              </a>
                            </p>
                            <span>
                              One Source platform is for healthcare
                              professionals only.
                            </span>
                          </div>
                        </div>
                      )}
                         {parms?.includes("THSNA2024") && (
                        <div className="eahad-footer">
                          <img
                            src="https://docintel.app/img/octa/e-templates/one-source/onesource-logo-org.gif"
                            alt=""
                          />
                          <div className="footer-msg">
                            <p>
                              Visit{" "}
                              <a
                                target="_blank"
                                href="https://onesource.octapharma.com"
                              >
                                One Source
                              </a>
                              , Octapharma’s online haematology platform for
                              healthcare professionals, to be up to date with
                              the latest news and events, and to hear leading
                              experts share their opinions about treating
                              patients with bleeding disorders.
                            </p>
                            <p>
                              To visit One Source click here:{" "}
                              <a
                                target="_blank"
                                href="https://onesource.octapharma.com"
                              >
                                https://onesource.octapharma.com
                              </a>
                            </p>
                            <span>
                              One Source platform is for healthcare
                              professionals only.
                            </span>
                          </div>
                        </div>
                      )}
                      {parms?.includes("GTH2024")  && (
                        <div className="eahad-footer">
                          <img
                            src="https://docintel.app/img/octa/e-templates/one-source/onesource-logo.gif"
                            alt=""
                          />
                          <div className="footer-msg">
                            <p>
                              Visit{" "}
                              <a
                                target="_blank"
                                href="https://onesource.octapharma.com"
                              >
                                One Source
                              </a>
                              , Octapharma’s online haematology platform for
                              healthcare professionals, to be up to date with
                              the latest news and events, and to hear leading
                              experts share their opinions about treating
                              patients with bleeding disorders.
                            </p>
                            <p>
                              To visit One Source click here:{" "}
                              <a
                                target="_blank"
                                href="https://onesource.octapharma.com"
                              >
                                https://onesource.octapharma.com
                              </a>
                            </p>
                            <span>
                              One Source platform is for healthcare
                              professionals only.
                            </span>
                          </div>
                        </div>
                      )}
                      {parms?.includes("WFH2024")  && (
                        <div className="eahad-footer">
                          <img
                            src="https://docintel.app/img/octa/e-templates/one-source/onesource-logo.gif"
                            alt=""
                          />
                          <div className="footer-msg">
                            <p>
                              Visit{" "}
                              <a
                                target="_blank"
                                href="https://onesource.octapharma.com"
                              >
                                One Source
                              </a>
                              , Octapharma’s online haematology platform for
                              healthcare professionals, to be up to date with
                              the latest news and events, and to hear leading
                              experts share their opinions about treating
                              patients with bleeding disorders.
                            </p>
                            <p>
                              To visit One Source click here:{" "}
                              <a
                                target="_blank"
                                href="https://onesource.octapharma.com"
                              >
                                https://onesource.octapharma.com
                              </a>
                            </p>
                            <span>
                              One Source platform is for healthcare
                              professionals only.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                  {parms?.includes("eahad_2024") ? (
                    <div className="copy-right-bottom-text">
                      <p>
                        591_HAEQUE_EAHAD 2024
                        <br />
                        Preparation date: December 2023
                      </p>
                    </div>
                  ) :
                  parms?.includes("THSNA2024")  ? (
                    <div className="copy-right-bottom-text">
                      <p>
                        Preparation date: February 2024
                      </p>
                    </div>
                  ): parms?.includes("GTH2024")  ? (
                    <div className="copy-right-bottom-text">
                      <p>
                        Preparation date: February 2024
                      </p>
                    </div>
                  )  : parms?.includes("WFH2024")  ? (
                    <div className="copy-right-bottom-text">
                      <p>
                      618_HAEQUE_WFH 2024 <br/> Preparation date: February 2024
                      </p>
                    </div>
                  ) : (
                    // <div className="copy-right-bottom-text">
                    //   <p>Preparation date: 7-8 December 2023</p>
                    // </div>
                    <div className="copy-right-bottom-text">
                      <p
                        style={{ color: formData?.textColor }}
                        // dangerouslySetInnerHTML={{
                        //   __html: formData?.footerText?.includes('xxx') ? "Preparation date:  "+eventId?.eventDate : formData?.footerText,
                        // }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.footerText
                            ? formData?.footerText
                            : "Preparation date: xx xxx 2024",
                        }}
                      />
                    </div>
                  )}

                  {/* <div className="copy-right-bottom-text">
  <p>Preparation date: 7-8 December 2023</p>
</div> */}
                </div>
              </div>
            </div>
            <div className="modal fade" id="pollModel" role="dialog">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <img
                      src="../webinar-assets/images/octa-logo.svg"
                      className="modal-title"
                      width="210"
                    />
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body" id="poll-content"></div>
                  <div className="modal-footer">
                    {/* <!--<button type="button" id="submitPollAnswer" className="submit_btn btn-primary" >Submit</button>--> */}
                    <button
                      type="submit"
                      name="cpd_tab"
                      id="submitPollAnswerGuest"
                      className="submit_btn btn-primary"
                      title="Submit"
                    >
                      Submit
                    </button>
                    {/* <!-- <button type="button" className="btn btn-default"  onclick="closePollPopup()">Close</button>--> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade" id="pollAnswerModel" role="dialog">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <img
                      src="../webinar-assets/images/octa-logo.svg"
                      className="modal-title"
                      width="210"
                    />
                    <button
                      type="button"
                      className="close"
                      onclick="closeAnswerModel()"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body" id="poll-answer-content">
                    <div className="row">
                      <div className="col-md-12 col-sm-12">
                        <div className="detail-box form_box">
                          <p id="questionText"></p>
                          <div id="container1"></div>
                          <p id="totalCountText"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <EventModel
show={show}
onClose={setShow}
data={apiData}
eventId={eventId}
/> */}
            {show && (
              <SessionModel
                show={show}
                onClose={setShow}
                data={apiData}
                eventData={value}
                designData={formData}
              />
            )}

            {answerPop && (
              <DisplayAnswer
                show={answerPop}
                data={apiData}
                readerCount={totalReaders}
                customAnswer={customAnswer}
                graphType={graphType}
                designData={formData}
                onClose={() => setAnswerPopup(false)}
              />
            )}
          </div>
        ):isDataLoaded&&
       ( <div
        className={`octa_events ${shouldAddClass ? "eahad_2024" : ""} ${
          addClass ? "gth-2024" : ""
        }`}
      >
        
        {formData?.templateId === 11 && (
          <div className="container">
            <div className="question-block">
              <div className="header-logo">
                <div>
                  <img
                    src={`${
                      formData?.logoImageUrl
                        ? formData?.logoImageUrl
                        : ""
                    }`}
                    alt="OneSource logo"
                  />
                </div>
              </div>
              <div className="question-block-form small-temp">
                <div className="log-inner">
                  <div className="head-sec" style={{
                      background: formData?.headerBackgroundColor,
                      borderBottomColor: formData?.buttonColor,
                    }}>
                    <h2
                      className="top-title"
                      style={{ color: formData?.textColor }}
                      dangerouslySetInnerHTML={{
                        __html: formData?.heading
                          ? formData?.heading
                          : "",
                      }}
                    ></h2>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    className="form-control"
                    id="guest_id"
                    name="guest_id"
                    value="lji3sjpsdc21tux2st"
                  />

                  <div className="row">
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.nameLabel
                            ? formData?.nameLabel
                            : "",
                        }}
                      />

                      <input
                        type="text"
                        id="name"
                        onChange={handleChange}
                        className="form-control "
                        placeholder={
                          formData?.namePlaceholder
                            ? formData?.namePlaceholder
                            : ""
                        }
                        name="name"
                        value={user?.name}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Question submitted successfully"
                        name="succ_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Please enter message"
                        name="err_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="index.php?evnt=octa-academy-2023"
                        name="page"
                      />
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.questionLabel
                            ? formData?.questionLabel
                            : "",
                        }}
                      />

                      <textarea
                        name="question"
                        id="question"
                        onChange={handleChange}
                        className="form-control"
                        placeholder={
                          formData?.questionPlaceholder
                            ? formData?.questionPlaceholder
                            : ""
                        }
                        cols="40"
                        rows="4"
                        value={user?.question}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      ></textarea>

                      {error?.question ? (
                        <span className="event-validation">
                          {error?.question}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-success"
                        style={{
                          background: formData?.buttonColor,
                          borderColor: formData?.buttonColor,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.buttonText
                            ? formData?.buttonText
                            : "",
                        }}
                      ></Button>
                    </div>
                  </div>
                </form>

                <div className="copy-right-bottom-text">
                  <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerText
                        ? formData?.footerText
                        : "",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {formData?.templateId === 12 && (
          <div className="container">
            <div className="question-block">
              <div className="header-logo">
                <div>
                  <img
                    src={`${
                      formData?.logoImageUrl
                        ? formData?.logoImageUrl
                        : ""
                    }`}
                    alt="OneSource logo"
                  />
                </div>
              </div>
              <div className="question-block-form small-temp">
                <div className="log-inner">
                  <div className="head-sec"
                    style={{
                      background: formData?.headerBackgroundColor,
                      borderBottomColor: formData?.buttonColor,
                    }}
                  >
                    <h2
                      className="top-title"
                      style={{ color: formData?.textColor }}
                      dangerouslySetInnerHTML={{
                        __html: formData?.heading
                          ? formData?.heading
                          : "",
                      }}
                    ></h2>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    className="form-control"
                    id="guest_id"
                    name="guest_id"
                    value="lji3sjpsdc21tux2st"
                  />

                  <div className="row">
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.nameLabel
                            ? formData?.nameLabel
                            : "",
                        }}
                      />

                      <input
                        type="text"
                        id="name"
                        onChange={handleChange}
                        className="form-control "
                        placeholder={
                          formData?.namePlaceholder
                            ? formData?.namePlaceholder
                            : ""
                        }
                        name="name"
                        value={user?.name}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Question submitted successfully"
                        name="succ_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Please enter message"
                        name="err_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="index.php?evnt=octa-academy-2023"
                        name="page"
                      />
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.questionLabel
                            ? formData?.questionLabel
                            : "",
                        }}
                      />

                      <textarea
                        name="question"
                        id="question"
                        onChange={handleChange}
                        className="form-control"
                        placeholder={
                          formData?.questionPlaceholder
                            ? formData?.questionPlaceholder
                            : ""
                        }
                        cols="40"
                        rows="4"
                        value={user?.question}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      ></textarea>

                      {error?.question ? (
                        <span className="event-validation">
                          {error?.question}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-success"
                        style={{
                          background: formData?.buttonColor,
                          borderColor: formData?.buttonColor,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.buttonText
                            ? formData?.buttonText
                            : "",
                        }}
                      ></Button>
                    </div>
                  </div>
                </form>

                <div className="copy-right-bottom-text">
                  <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerText
                        ? formData?.footerText
                        : "",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {formData?.templateId === 2 && (
          <div className="container">
            <div className="question-block">
              <div className="header-logo">
                <div>
                  <img
                    src={`${
                      formData?.logoImageUrl
                        ? formData?.logoImageUrl
                        : ""
                    }`}
                    alt="OneSource logo"
                  />
                </div>
              </div>
              <div className="question-block-form small-temp">
                <div className="log-inner">
                  <div className="head-sec template2">
                    <img
                      src={`${
                        formData?.headerBackgroundImage
                          ? formData?.headerBackgroundImage
                          : ""
                      }`}
                      alt="OneSource logo"
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    className="form-control"
                    id="guest_id"
                    name="guest_id"
                    value="lji3sjpsdc21tux2st"
                  />

                  <div className="row">
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.nameLabel
                            ? formData?.nameLabel
                            : "",
                        }}
                      />

                      <input
                        type="text"
                        id="name"
                        onChange={handleChange}
                        className="form-control "
                        placeholder={
                          formData?.namePlaceholder
                            ? formData?.namePlaceholder
                            : ""
                        }
                        name="name"
                        value={user?.name}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Question submitted successfully"
                        name="succ_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Please enter message"
                        name="err_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="index.php?evnt=octa-academy-2023"
                        name="page"
                      />
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.questionLabel
                            ? formData?.questionLabel
                            : "",
                        }}
                      />

                      <textarea
                        name="question"
                        id="question"
                        onChange={handleChange}
                        className="form-control"
                        placeholder={
                          formData?.questionPlaceholder
                            ? formData?.questionPlaceholder
                            : ""
                        }
                        cols="40"
                        rows="4"
                        value={user?.question}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      ></textarea>

                      {error?.question ? (
                        <span className="event-validation">
                          {error?.question}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-success"
                        style={{
                          background: formData?.buttonColor,
                          borderColor: formData?.buttonColor,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.buttonText
                            ? formData?.buttonText
                            : "",
                        }}
                      ></Button>
                    </div>
                  </div>
                </form>

                <div className="copy-right-bottom-text">
                  <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerText
                        ? formData?.footerText
                        : "",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}      

        {formData?.templateId === 4 && (
          <div className="container">
            <div className="question-block">
              <div className="header-logo">
                <div>
                  <img
                    src={
                      formData?.logoImageUrl
                        ? formData?.logoImageUrl
                        : ""
                    }
                    alt="OneSource logo"
                  />
                </div>
              </div>
              <div className="question-block-form">
                <div className="log-inner">
                  <div 
                  // className="head-sec "
                  className="head-sec template2">
                    <img
                      src={
                        formData?.headerImage
                          ? formData?.headerImage
                          : ""
                      }
                      alt="OneSource logo"
                    />
                  </div>
                </div>
                <div className="event_title">
                <h2 className="top-title"   style={{ color: formData?.textColor }} dangerouslySetInnerHTML={{
                          __html: formData?.formHeading
                            ? formData?.formHeading
                            : "",
                        }}/>
              </div>

                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    className="form-control"
                    id="guest_id"
                    name="guest_id"
                    value="lji3sjpsdc21tux2st"
                  />

                  <div className="row">
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.nameLabel
                            ? formData?.nameLabel
                            : "",
                        }}
                      />

                      <input
                        type="text"
                        id="name"
                        onChange={handleChange}
                        className="form-control "
                        placeholder={
                          formData?.namePlaceholder
                            ? formData?.namePlaceholder
                            : ""
                        }
                        name="name"
                        value={user?.name}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Question submitted successfully"
                        name="succ_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Please enter message"
                        name="err_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="index.php?evnt=octa-academy-2023"
                        name="page"
                      />
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.questionLabel
                            ? formData?.questionLabel
                            : "",
                        }}
                      />

                      <textarea
                        name="question"
                        id="question"
                        onChange={handleChange}
                        className="form-control"
                        placeholder={
                          formData?.questionPlaceholder
                            ? formData?.questionPlaceholder
                            : ""
                        }
                        cols="40"
                        rows="4"
                        value={user?.question}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      ></textarea>

                      {error?.question && (
                        <span className="event-validation">
                          {error?.question}
                        </span>
                      )}
                    </div>

                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-success"
                        style={{
                          background: formData?.buttonColor,
                          borderColor: formData?.buttonColor,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.buttonText
                            ? formData?.buttonText
                            : "",
                        }}
                      ></Button>
                    </div>
                  </div>
                </form>

                <div className="eahad-footer">
                    <img
                      
                       src={
                         formData?.footerImage
                           ? formData?.footerImage
                           : ""
                       }
                      alt=""
                    />
                    <div className="footer-msg">
                    <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerTextOne
                        ? formData?.footerTextOne
                        : "",
                    }}
                  />
                    </div>
                  </div>

                <div className="copy-right-bottom-text">
                  <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerText
                        ? formData?.footerText
                        : "",
                    }}
                  />
                </div>

                
              </div>
            </div>
          </div>
        )}

        {formData?.templateId === 5 && (
          <div className="container">
            <div className="question-block">
              <div className="header-logo">
                <div>
                  <img
                    src={
                      formData?.logoImageUrl
                        ? formData?.logoImageUrl
                        : ""
                    }
                    alt="OneSource logo"
                  />
                </div>
              </div>
              <div className="question-block-form">
                <div className="log-inner">
                  <div 
                  // className="head-sec "
                  className="head-sec template2">
                    <img
                      src={
                        formData?.headerImage
                          ? formData?.headerImage
                          : ""
                      }
                      alt="OneSource logo"
                    />
                  </div>
                </div>
                <div className="event_title">
                <h2 className="top-title"   style={{ color: formData?.textColor }} dangerouslySetInnerHTML={{
                          __html: formData?.formHeading
                            ? formData?.formHeading
                            : "",
                        }}/>
              </div>

                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    className="form-control"
                    id="guest_id"
                    name="guest_id"
                    value="lji3sjpsdc21tux2st"
                  />

                  <div className="row">
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.nameLabel
                            ? formData?.nameLabel
                            : "",
                        }}
                      />

                      <input
                        type="text"
                        id="name"
                        onChange={handleChange}
                        className="form-control "
                        placeholder={
                          formData?.namePlaceholder
                            ? formData?.namePlaceholder
                            : ""
                        }
                        name="name"
                        value={user?.name}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Question submitted successfully"
                        name="succ_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Please enter message"
                        name="err_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="index.php?evnt=octa-academy-2023"
                        name="page"
                      />
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.questionLabel
                            ? formData?.questionLabel
                            : "",
                        }}
                      />

                      <textarea
                        name="question"
                        id="question"
                        onChange={handleChange}
                        className="form-control"
                        placeholder={
                          formData?.questionPlaceholder
                            ? formData?.questionPlaceholder
                            : ""
                        }
                        cols="40"
                        rows="4"
                        value={user?.question}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      ></textarea>

                      {error?.question && (
                        <span className="event-validation">
                          {error?.question}
                        </span>
                      )}
                    </div>

                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-success"
                        style={{
                          background: formData?.buttonColor,
                          borderColor: formData?.buttonColor,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.buttonText
                            ? formData?.buttonText
                            : "",
                        }}
                      ></Button>
                    </div>
                  </div>
                </form>

                <div className="eahad-footer">
                    <img
                      
                       src={
                         formData?.footerImage
                           ? formData?.footerImage
                           : ""
                       }
                      alt=""
                    />
                    <div className="footer-msg">
                    <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerTextOne
                        ? formData?.footerTextOne
                        : "",
                    }}
                  />
                    </div>
                  </div>

                <div className="copy-right-bottom-text">
                  <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerText
                        ? formData?.footerText
                        : "",
                    }}
                  />
                </div>

                
              </div>
            </div>
          </div>
        )}

        {formData?.templateId === 6 && (
          <div className="container">
            <div className="question-block">
              <div className="header-logo">
                <div>
                  <img
                    src={
                      formData?.logoImageUrl
                        ? formData?.logoImageUrl
                        : ""
                    }
                    alt="OneSource logo"
                  />
                </div>
              </div>
              <div className="question-block-form">
                <div className="log-inner">
                  <div 
                  // className="head-sec "
                  className="head-sec template2">
                    <img
                      src={
                        formData?.headerImage
                          ? formData?.headerImage
                          : ""
                      }
                      alt="OneSource logo"
                    />
                  </div>
                </div>
                <div className="event_title">
                <h2 className="top-title"   style={{ color: formData?.textColor }} dangerouslySetInnerHTML={{
                          __html: formData?.formHeading
                            ? formData?.formHeading
                            : "",
                        }}/>
              </div>

                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    className="form-control"
                    id="guest_id"
                    name="guest_id"
                    value="lji3sjpsdc21tux2st"
                  />

                  <div className="row">
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.nameLabel
                            ? formData?.nameLabel
                            : "",
                        }}
                      />

                      <input
                        type="text"
                        id="name"
                        onChange={handleChange}
                        className="form-control "
                        placeholder={
                          formData?.namePlaceholder
                            ? formData?.namePlaceholder
                            : ""
                        }
                        name="name"
                        value={user?.name}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Question submitted successfully"
                        name="succ_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Please enter message"
                        name="err_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="index.php?evnt=octa-academy-2023"
                        name="page"
                      />
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.questionLabel
                            ? formData?.questionLabel
                            : "",
                        }}
                      />

                      <textarea
                        name="question"
                        id="question"
                        onChange={handleChange}
                        className="form-control"
                        placeholder={
                          formData?.questionPlaceholder
                            ? formData?.questionPlaceholder
                            : ""
                        }
                        cols="40"
                        rows="4"
                        value={user?.question}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      ></textarea>

                      {error?.question && (
                        <span className="event-validation">
                          {error?.question}
                        </span>
                      )}
                    </div>

                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-success"
                        style={{
                          background: formData?.buttonColor,
                          borderColor: formData?.buttonColor,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.buttonText
                            ? formData?.buttonText
                            : "",
                        }}
                      ></Button>
                    </div>
                  </div>
                </form>

                <div className="eahad-footer">
                    <img
                      
                       src={
                         formData?.footerImage
                           ? formData?.footerImage
                           : ""
                       }
                      alt=""
                    />
                    <div className="footer-msg">
                    <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerTextOne
                        ? formData?.footerTextOne
                        : "",
                    }}
                  />
                    </div>
                  </div>

                <div className="copy-right-bottom-text">
                  <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerText
                        ? formData?.footerText
                        : "",
                    }}
                  />
                </div>

                
              </div>
            </div>
          </div>
        )}

        {formData?.templateId === 7 && (
          <div className="container">
            <div className="question-block">
              <div className="header-logo">
                <div>
                  <img
                    src={
                      formData?.logoImageUrl
                        ? formData?.logoImageUrl
                        : ""
                    }
                    alt="OneSource logo"
                  />
                </div>
              </div>
              <div className="question-block-form">
                <div className="log-inner">
                  <div 
                  // className="head-sec "
                  className="head-sec template2" >
                    <img
                      src={
                        formData?.headerImage
                          ? formData?.headerImage
                          : ""
                      }
                      alt="OneSource logo"
                    />
                  </div>
                </div>
                <div className="event_title">
                <h2 className="top-title"   style={{ color: formData?.textColor }} dangerouslySetInnerHTML={{
                          __html: formData?.formHeading
                            ? formData?.formHeading
                            : "",
                        }}/>
              </div>

                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    className="form-control"
                    id="guest_id"
                    name="guest_id"
                    value="lji3sjpsdc21tux2st"
                  />

                  <div className="row">
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.nameLabel
                            ? formData?.nameLabel
                            : "",
                        }}
                      />

                      <input
                        type="text"
                        id="name"
                        onChange={handleChange}
                        className="form-control "
                        placeholder={
                          formData?.namePlaceholder
                            ? formData?.namePlaceholder
                            : ""
                        }
                        name="name"
                        value={user?.name}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Question submitted successfully"
                        name="succ_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Please enter message"
                        name="err_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="index.php?evnt=octa-academy-2023"
                        name="page"
                      />
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.questionLabel
                            ? formData?.questionLabel
                            : "",
                        }}
                      />

                      <textarea
                        name="question"
                        id="question"
                        onChange={handleChange}
                        className="form-control"
                        placeholder={
                          formData?.questionPlaceholder
                            ? formData?.questionPlaceholder
                            : ""
                        }
                        cols="40"
                        rows="4"
                        value={user?.question}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      ></textarea>

                      {error?.question && (
                        <span className="event-validation">
                          {error?.question}
                        </span>
                      )}
                    </div>

                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-success"
                        style={{
                          background: formData?.buttonColor,
                          borderColor: formData?.buttonColor,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.buttonText
                            ? formData?.buttonText
                            : "",
                        }}
                      ></Button>
                    </div>
                  </div>
                </form>

                <div className="eahad-footer">
                    <img
                      
                       src={
                         formData?.footerImage
                           ? formData?.footerImage
                           : ""
                       }
                      alt=""
                    />
                    <div className="footer-msg">
                    <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerTextOne
                        ? formData?.footerTextOne
                        : "",
                    }}
                  />
                    </div>
                  </div>

                <div className="copy-right-bottom-text">
                  <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerText
                        ? formData?.footerText
                        : "",
                    }}
                  />
                </div>

                
              </div>
            </div>
          </div>
        )}

        {formData?.templateId === 8 && (
          <div className="container">
            <div className="question-block">
              <div className="header-logo">
                <div>
                  <img
                    src={
                      formData?.logoImageUrl
                        ? formData?.logoImageUrl
                        : ""
                    }
                    alt="OneSource logo"
                  />
                </div>
              </div>
              <div className="question-block-form">
                <div className="log-inner">
                  <div 
                  // className="head-sec "
                  className="head-sec template2" >
                    <img
                      src={
                        formData?.headerImage
                          ? formData?.headerImage
                          : ""
                      }
                      alt="OneSource logo"
                    />
                  </div>
                </div>
                <div className="event_title">
                <h2 className="top-title"   style={{ color: formData?.textColor }} dangerouslySetInnerHTML={{
                          __html: formData?.formHeading
                            ? formData?.formHeading
                            : "",
                        }}/>
              </div>

                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    className="form-control"
                    id="guest_id"
                    name="guest_id"
                    value="lji3sjpsdc21tux2st"
                  />

                  <div className="row">
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.nameLabel
                            ? formData?.nameLabel
                            : "",
                        }}
                      />

                      <input
                        type="text"
                        id="name"
                        onChange={handleChange}
                        className="form-control "
                        placeholder={
                          formData?.namePlaceholder
                            ? formData?.namePlaceholder
                            : ""
                        }
                        name="name"
                        value={user?.name}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Question submitted successfully"
                        name="succ_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Please enter message"
                        name="err_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="index.php?evnt=octa-academy-2023"
                        name="page"
                      />
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.questionLabel
                            ? formData?.questionLabel
                            : "",
                        }}
                      />

                      <textarea
                        name="question"
                        id="question"
                        onChange={handleChange}
                        className="form-control"
                        placeholder={
                          formData?.questionPlaceholder
                            ? formData?.questionPlaceholder
                            : ""
                        }
                        cols="40"
                        rows="4"
                        value={user?.question}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      ></textarea>

                      {error?.question && (
                        <span className="event-validation">
                          {error?.question}
                        </span>
                      )}
                    </div>

                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-success"
                        style={{
                          background: formData?.buttonColor,
                          borderColor: formData?.buttonColor,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.buttonText
                            ? formData?.buttonText
                            : "",
                        }}
                      ></Button>
                    </div>
                  </div>
                </form>

                <div className="eahad-footer">
                    <img
                      
                       src={
                         formData?.footerImage
                           ? formData?.footerImage
                           : ""
                       }
                      alt=""
                    />
                    <div className="footer-msg">
                    <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerTextOne
                        ? formData?.footerTextOne
                        : "",
                    }}
                  />
                    </div>
                  </div>

                <div className="copy-right-bottom-text">
                  <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerText
                        ? formData?.footerText
                        : "",
                    }}
                  />
                </div>

                
              </div>
            </div>
          </div>
        )}

        {formData?.templateId === 9 && (
          <div className="container">
            <div className="question-block">
              <div className="header-logo">
                <div>
                  <img
                    src={
                      formData?.logoImageUrl
                        ? formData?.logoImageUrl
                        : ""
                    }
                    alt="OneSource logo"
                  />
                </div>
              </div>
              <div className="question-block-form">
                <div className="log-inner">
                  <div 
                  // className="head-sec "
                  className="head-sec template2" >
                    <img
                      src={
                        formData?.headerImage
                          ? formData?.headerImage
                          : ""
                      }
                      alt="OneSource logo"
                    />
                  </div>
                </div>
                <div className="event_title">
                <h2 className="top-title"   style={{ color: formData?.textColor }} dangerouslySetInnerHTML={{
                          __html: formData?.formHeading
                            ? formData?.formHeading
                            : "",
                        }}/>
              </div>

                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    className="form-control"
                    id="guest_id"
                    name="guest_id"
                    value="lji3sjpsdc21tux2st"
                  />

                  <div className="row">
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.nameLabel
                            ? formData?.nameLabel
                            : "",
                        }}
                      />

                      <input
                        type="text"
                        id="name"
                        onChange={handleChange}
                        className="form-control "
                        placeholder={
                          formData?.namePlaceholder
                            ? formData?.namePlaceholder
                            : ""
                        }
                        name="name"
                        value={user?.name}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Question submitted successfully"
                        name="succ_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Please enter message"
                        name="err_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="index.php?evnt=octa-academy-2023"
                        name="page"
                      />
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.questionLabel
                            ? formData?.questionLabel
                            : "",
                        }}
                      />

                      <textarea
                        name="question"
                        id="question"
                        onChange={handleChange}
                        className="form-control"
                        placeholder={
                          formData?.questionPlaceholder
                            ? formData?.questionPlaceholder
                            : ""
                        }
                        cols="40"
                        rows="4"
                        value={user?.question}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      ></textarea>

                      {error?.question && (
                        <span className="event-validation">
                          {error?.question}
                        </span>
                      )}
                    </div>

                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-success"
                        style={{
                          background: formData?.buttonColor,
                          borderColor: formData?.buttonColor,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.buttonText
                            ? formData?.buttonText
                            : "",
                        }}
                      ></Button>
                    </div>
                  </div>
                </form>

                <div className="eahad-footer">
                    <img
                      
                       src={
                         formData?.footerImage
                           ? formData?.footerImage
                           : ""
                       }
                      alt=""
                    />
                    <div className="footer-msg">
                    <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerTextOne
                        ? formData?.footerTextOne
                        : "",
                    }}
                  />
                    </div>
                  </div>

                <div className="copy-right-bottom-text">
                  <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerText
                        ? formData?.footerText
                        : "",
                    }}
                  />
                </div>

                
              </div>
            </div>
          </div>
        )}

{formData?.templateId === 10 && (
          <div className="container">
            <div className="question-block">
              <div className="header-logo">
                <div>
                  <img
                    src={
                      formData?.logoImageUrl
                        ? formData?.logoImageUrl
                        : ""
                    }
                   
                  />
                </div>
              </div>
              <div className="question-block-form">
                <div className="log-inner">
                  <div 
                  // className="head-sec "
                  className="head-sec template2" >
                    <img
                      src={
                        formData?.headerImage
                          ? formData?.headerImage
                          : ""
                      }
                      alt="OneSource logo"
                    />
                  </div>
                </div>
                <div className="event_title">
                <h2 className="top-title"   style={{ color: formData?.textColor }} dangerouslySetInnerHTML={{
                          __html: formData?.formHeading
                            ? formData?.formHeading
                            : "",
                        }}/>
              </div>

                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    className="form-control"
                    id="guest_id"
                    name="guest_id"
                    value="lji3sjpsdc21tux2st"
                  />

                  <div className="row">
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.nameLabel
                            ? formData?.nameLabel
                            : "",
                        }}
                      />

                      <input
                        type="text"
                        id="name"
                        onChange={handleChange}
                        className="form-control "
                        placeholder={
                          formData?.namePlaceholder
                            ? formData?.namePlaceholder
                            : ""
                        }
                        name="name"
                        value={user?.name}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Question submitted successfully"
                        name="succ_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Please enter message"
                        name="err_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="index.php?evnt=octa-academy-2023"
                        name="page"
                      />
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.questionLabel
                            ? formData?.questionLabel
                            : "",
                        }}
                      />

                      <textarea
                        name="question"
                        id="question"
                        onChange={handleChange}
                        className="form-control"
                        placeholder={
                          formData?.questionPlaceholder
                            ? formData?.questionPlaceholder
                            : ""
                        }
                        cols="40"
                        rows="4"
                        value={user?.question}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      ></textarea>

                      {error?.question && (
                        <span className="event-validation">
                          {error?.question}
                        </span>
                      )}
                    </div>

                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-success"
                        style={{
                          background: formData?.buttonColor,
                          borderColor: formData?.buttonColor,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.buttonText
                            ? formData?.buttonText
                            : "",
                        }}
                      ></Button>
                    </div>
                  </div>
                </form>

                <div className="eahad-footer">
                    <img
                      
                       src={
                         formData?.footerImage
                           ? formData?.footerImage
                           : ""
                       }
                      alt=""
                    />
                    <div className="footer-msg">
                    <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerTextOne
                        ? formData?.footerTextOne
                        : "",
                    }}
                  />
                    </div>
                  </div>

                <div className="copy-right-bottom-text">
                  <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerText
                        ? formData?.footerText
                        : "",
                    }}
                  />
                </div>

                
              </div>
            </div>
          </div>
        )}

        {formData?.templateId === 1 && (
          <div className="container">
            <div className="question-block">
              <div className="header-logo">
                <div>
                  <img
                    src={`${
                      formData?.logoImageUrl
                        ? formData?.logoImageUrl
                        : ""
                    }`}
                    alt="OneSource logo"
                  />
                </div>
              </div>
              <div className="question-block-form small-temp">
                <div className="log-inner">
                  <div className="head-sec">
                    <h2
                      className="top-title"
                      style={{ color: formData?.textColor }}
                      dangerouslySetInnerHTML={{
                        __html: formData?.heading
                          ? formData?.heading
                          : "",
                      }}
                    ></h2>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    className="form-control"
                    id="guest_id"
                    name="guest_id"
                    value="lji3sjpsdc21tux2st"
                  />

                  <div className="row">
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.nameLabel
                            ? formData?.nameLabel
                            : "",
                        }}
                      />

                      <input
                        type="text"
                        id="name"
                        onChange={handleChange}
                        className="form-control "
                        placeholder={
                          formData?.namePlaceholder
                            ? formData?.namePlaceholder
                            : ""
                        }
                        name="name"
                        value={user?.name}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Question submitted successfully"
                        name="succ_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="Please enter message"
                        name="err_message"
                      />
                      <input
                        type="hidden"
                        className="form-control"
                        value="index.php?evnt=octa-academy-2023"
                        name="page"
                      />
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="fname"
                        className="form-label"
                        style={{ color: formData?.textColor }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.questionLabel
                            ? formData?.questionLabel
                            : "",
                        }}
                      />

                      <textarea
                        name="question"
                        id="question"
                        onChange={handleChange}
                        className="form-control"
                        placeholder={
                          formData?.questionPlaceholder
                            ? formData?.questionPlaceholder
                            : ""
                        }
                        cols="40"
                        rows="4"
                        value={user?.question}
                        style={{
                          borderColor: formData?.textColor,
                        }}
                      ></textarea>

                      {error?.question ? (
                        <span className="event-validation">
                          {error?.question}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-success"
                        style={{
                          background: formData?.buttonColor,
                          borderColor: formData?.buttonColor,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formData?.buttonText
                            ? formData?.buttonText
                            : "",
                        }}
                      ></Button>
                    </div>
                  </div>
                </form>

                <div className="copy-right-bottom-text">
                  <p
                    style={{ color: formData?.textColor }}
                    dangerouslySetInnerHTML={{
                      __html: formData?.footerText
                        ? formData?.footerText
                        : "",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        </div>)
        }
      
       

        {/* Modal for Poll */}
        <div className="modal fade" id="pollModel" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <img
                src="../webinar-assets/images/octa-logo.svg"
                className="modal-title"
                width="210"
              />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>
            <div className="modal-body" id="poll-content"></div>
            <div className="modal-footer">
              {/* <!--<button type="button" id="submitPollAnswer" className="submit_btn btn-primary" >Submit</button>--> */}
              <button
                type="submit"
                name="cpd_tab"
                id="submitPollAnswerGuest"
                className="submit_btn btn-primary"
                title="Submit"
              >
                Submit
              </button>
              {/* <!-- <button type="button" className="btn btn-default"  onclick="closePollPopup()">Close</button>--> */}
            </div>
          </div>
        </div>
      </div>

        {/* Modal for Poll Answer */}
       
      <div className="modal fade" id="pollAnswerModel" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <img
                src="../webinar-assets/images/octa-logo.svg"
                className="modal-title"
                width="210"
              />
              <button
                type="button"
                className="close"
                onclick="closeAnswerModel()"
              >
                &times;
              </button>
            </div>
            <div className="modal-body" id="poll-answer-content">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="detail-box form_box">
                    <p id="questionText"></p>
                    <div id="container1"></div>
                    <p id="totalCountText"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {show && (
          <SessionModel
            show={show}
            onClose={setShow}
            data={apiData}
            eventData={value}
            designData={formData}
          />
        )}

        {answerPop && (
          <DisplayAnswer
            show={answerPop}
            data={apiData}
            readerCount={totalReaders}
            customAnswer={customAnswer}
            graphType={graphType}
            designData={formData}
            onClose={() => setAnswerPopup(false)}
          />
        )}
         </>):
        isDataLoaded?(<>
      <CommonPageLinkNotFound/>
      </>)
    :""}
      
        
      </div>
    </>
  );
};
export default Event;
