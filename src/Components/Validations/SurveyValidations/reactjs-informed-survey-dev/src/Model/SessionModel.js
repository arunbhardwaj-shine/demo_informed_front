import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import axios from "axios";
import { postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import { loader } from "../loader";
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const SessionModel = ({ show, onClose, data, eventData, designData }) => {
  const [searchParams] = useSearchParams();
  let parms = searchParams.get('evnt');
  const [user, setUser] = useState([]);
  const [userValid, setUserValid] = useState({});
  const [userSpeaker, setSpeaker] = useState({});
const [comment,setComment]=useState("")
  const [error, setError] = useState({});
  const [userRequired, setUserRequired] = useState({});

  const initiFun = () => {
    try {
      setUser(data?.questionListing);
      setUserValid(data?.totalQuestion);
      setUserRequired(data?.totalQuestion);
      setSpeaker(data?.speakerData);

    } catch (err) {
      console.log("-err", err);
    }
  };
  // console.log(data,'user')

  // const handleChange = (questionId, data, type = "") => {
  //   try {

  //     if(typeof data === 'string'){
  //       if(data?.trim() == ''){
  //         data = 0;
  //       }
  //     }
  //     if (type) {
  //       setUserValid({
  //         ...userValid,
  //         [questionId]: data ? data : userRequired[questionId],
  //       });

  //       return;
  //     }
  //     setUserValid({ ...userValid, [questionId]: data });
  //   } catch (err) {
  //     console.log("-err", err);
  //   }
  // };



  // const handleSubmit = async () => {
  //   try {
  //     const errorValue = Object.values(userValid);

  //     if (errorValue?.includes(0)) {
  //       setError({ msg: "This field is required" });
  //       return;
  //     }
  //     let newAr = [];
  //     const keys = Object.keys(userValid);
  //     keys.forEach((item) => {
  //       let obj = {};
  //       // user_answer:typeof userValid[item] != "number"?userValid[item]:"",
  //       if (typeof userValid[item] != "number" && userValid[item]) {
  //         obj = {
  //           speakerName: userSpeaker[item],
  //           poll_question_id: item,
  //           poll_answer_id:
  //             typeof userValid[item] == "number" ? userValid[item] : "",
  //           user_answer: userValid[item],
  //           guest_id: Cookies.get("events"),
  //         };
  //       }

  //       if (typeof userValid[item] == "number" && userValid[item]) {
  //         obj = {
  //           speakerName: userSpeaker[item],
  //           poll_question_id: item,
  //           poll_answer_id:
  //             typeof userValid[item] == "number" ? userValid[item] : "",
  //           guest_id: Cookies.get("events"),
  //         };
  //       }
  //       if (Object.keys(obj)?.length) {
  //         newAr.push(obj);
  //       }
  //     });
  //     loader("show");

  //     await postData(ENDPOINT.ADD_EVENT_DATA, {
  //       eventData: newAr,
  //       eventId: eventData?.event_id,
  //       poll_question_id: eventData?.question_id,
  //     });
  //     const eventQuestion = Cookies.get("eventQuestion");
  //     if (!eventQuestion?.includes(eventData?.question_id)) {
  //       let newAr = eventQuestion?.length ? JSON.parse(eventQuestion) : [];
  //       newAr.push(eventData?.question_id);
  //       const expirationDate = new Date();
  //       expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  //       Cookies.set("eventQuestion", JSON.stringify(newAr), {
  //         expires: expirationDate,
  //       });
  //     }
  //     setError({});
  //     onClose(false);
  //     loader("hide");
  //   } catch (err) {
  //     loader("hide");
  //     console.log("-err", err);
  //   }
  // };

  const handleChangeCheckbox = (questionId, data, type = "") => {
    try {
      if (typeof data === 'string') {
        if (data?.trim() === '') {
          data = 0;
        }
      }

      if (type) {
        setUserValid({
          ...userValid,
          [questionId]: data ? [data] : userRequired[questionId],
        });
        return;
      }

      if (Array.isArray(userValid[questionId])) {
        const updatedArray = [...userValid[questionId]];

        if (updatedArray.includes(data)) {
          updatedArray.splice(updatedArray.indexOf(data), 1);
        } else {
          updatedArray.push(data);
        }

        // setUserValid({
        //   ...userValid,
        //   [questionId]: updatedArray,
        // });

        setUserValid({
          ...userValid,
          [questionId]: updatedArray?.length>0?updatedArray:0,
        });
      } else {
        setUserValid({
          ...userValid,
          [questionId]: [data],
        });
      }
    } catch (err) {
      console.log("-err", err);
    }
  };

  const handleChange = (questionId, data, type = "") => {

    try {
      if (typeof data === 'string') {
        if (data?.trim() === '') {
          data = 0;
        }
      }

      if (type) {
        setUserValid({
          ...userValid,
          [questionId]: data ? [data] : userRequired[questionId],
        });
        setComment(data?.trim())
        return;
      }

      setUserValid((prevUserValid) => {
        const updatedValue = data === prevUserValid[questionId] ? null : data;
        return {
          ...prevUserValid,
          [questionId]: updatedValue,
        };
      });

    } catch (err) {
      console.log("-err", err);
    }
  };

  const handleSubmit = async () => {
    try {
      const errorValue = Object.values(userValid);

      if (errorValue?.includes(0)) {
        setError({ msg: "This field is required" });
        return;
      }

      let newAr = [];
      const keys = Object.keys(userValid);

      let getIp = localStorage.getItem('ip');
      let ipaddress = '';
      if (getIp) {
        ipaddress = getIp;
      }else{
        const response  = await axios.get('https://api.ipify.org?format=json');
        ipaddress = response?.data?.ip ? response?.data?.ip : '';
        localStorage.setItem('ip',ipaddress);
      }

      keys.forEach((item) => {
        let obj = {};

        if (typeof userValid[item] !== "number" && userValid[item]?.length > 0) {         
          obj = {
            speakerName: userSpeaker[item],
            poll_question_id: item,
            // poll_answer_ids: userValid[item],
            poll_answer_id: (user[0]?.canCustomAnswer==1 || user[0]?.parentId == 1660) ?"": userValid[item].join(','),
            // poll_answer_id: "",
            user_answer:user[0]?.parentId == 1660 ? userValid[item].join(',') :comment,
            guest_id: Cookies.get("events"),
           'ipAddress': ipaddress,
           
          };
          // console.log(obj,'obj')
        }

        if (typeof userValid[item] === "number" && userValid[item]) {
          obj = {
            speakerName: userSpeaker[item],
            poll_question_id: item,
            poll_answer_id: userValid[item],
            // user_answer: userValid[item],
            user_answer:comment,
            guest_id: Cookies.get("events"),
           'ipAddress': ipaddress,
          };
        
        }
       
       
        if (Object.keys(obj)?.length) {
          newAr.push(obj);
        }
      });
    
      loader("show");

      await postData(ENDPOINT.ADD_EVENT_DATA, {
        eventData: newAr,
        eventId: eventData?.event_id,
        poll_question_id: eventData?.question_id,
      });

      let userResetCounter
      let eventQuestion

      if (Object.keys(user).length > 0) {
        userResetCounter = user && Object.keys(user).length > 0 ? user[0]?.resetCounter : 0;
        eventQuestion = Cookies.get("eventQuestion" + eventData?.event_id + '_' + userResetCounter);
      }

      // const userResetCounter = user && user.length > 0 ? user[0]?.resetCounter : 0;
      // const eventQuestion = Cookies.get("eventQuestion"+eventData?.event_id+'_'+userResetCounter);
      // console.log(eventQuestion,'user')

      if (!eventQuestion?.includes(eventData?.question_id)) {
        let newAr = eventQuestion?.length ? JSON.parse(eventQuestion) : [];
        newAr.push(eventData?.question_id);
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        Cookies.set("eventQuestion" + eventData?.event_id + '_' + user[0]?.resetCounter, JSON.stringify(newAr), {
          expires: expirationDate,
        });
      }

      setError({});
      onClose(false);
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };

  useEffect(() => {
    initiFun();
    setError({});
  }, [show]);
  const shouldAddClass = parms && parms.includes("eahad_2024");
  const addClass = parms && parms.includes("GTH2024") || parms.includes("WFH2024") ;
  return (
    <Modal
      id="pollModel"
      show={show}
      // onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      // className="session-modal"
      className={`session-modal ${shouldAddClass ? "eahad_2024" : ""}${addClass ? "gth-2024" : ""
            }`}
      centered
    >
      <Modal.Header style={{ background: designData?.headerBackgroundColor }}>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* <img
            // src="https://webinar.docintel.app/Event/webinar-assets/images/octa-logo.svg"
            src={path_image+'FVIII_logo.png'} 
            alt="logo"
          /> */}
          <img src={designData?.logoImageUrl} alt="logo" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="popup-content">
          {user?.map((item, index) => (
            <>
              {/* {
                item?.groupId == 0 && item?.canCustomAnswer == 1 ?
                <p className="event_sub_heading">Please consider the overall meeting when answering the following questions</p>
                :
                <p className="event_sub_heading">Thank you for attending the Factor VIII Relevance Academy. We would be very grateful if you would complete and return this evaluation form. Your feedback will help us in our efforts to provide high-quality scientific meetings in the future.</p>
              } */}
              {
               item?.parentId != 1660 ?
                <h4
                  style={{ color: item?.questionColor }}
                  dangerouslySetInnerHTML={{
                    __html: item?.parentQuestion,
                  }}
                ></h4>
                : null
              }
             

              {item?.groupId == 0 && item?.canCustomAnswer == 1 ? (
                <>
                  <textarea
                    className="custom-answer-area"
                    onChange={(e) =>
                      handleChange(item?.parentId, e.target.value, "input")
                    }
                    style={{
                      borderColor: item?.answerColor,
                    }}
                    name="w3review"
                    rows="4"
                    cols="50"
                  />
                  {
                    userValid?.[item?.parentId] === 0 ?
                      error?.msg ? <span className="error">{error.msg}</span> : ""
                      : null
                  }
                </>
              ) : (
                ""
              )}

              {item?.childData?.map((value, index) => {
                return (
                  <>
                    {value?.answerData?.length > 0 &&
                      (index == 0 ||
                        item?.childData?.[index]?.answerData?.[0].answer !=
                        item?.childData?.[index - 1]?.answerData?.[0]
                          ?.answer) ? (
                      <div className={item?.hasParent ? "form-group head" : "form-group head no_child"}>
                        <label></label>
                        <div className="check-group">
                          {value?.answerData?.map((newitem, index) => {
                            return (
                              <>
                                <span
                                  style={{ color: item?.questionColor }}
                                  dangerouslySetInnerHTML={{
                                    __html: newitem?.answer
                                  }}
                                ></span>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}

                    <div className={item?.hasParent && item?.parentId == 1660  ? "form-group custom_ans" : item?.hasParent ? "form-group" : "form-group no_child"}>
                      {
                        item?.hasParent ?
                          <label
                            style={{ color: item?.questionColor }}
                            dangerouslySetInnerHTML={{ __html: value?.question }}
                          />
                          : null
                      }

                      <div className="check-group">
                        {value?.answerData?.length ? (
                          value?.answerData?.map((childValue, index) => {
                            return (
                              <>
                                {value?.groupId == 0 &&
                                  value?.canCustomAnswer == 1 ? (
                                  <textarea
                                    className="custom-answer-area"
                                    name="w3review"
                                    rows="4"
                                    cols="50"
                                    style={{
                                      borderColor: item?.answerColor,
                                    }}
                                  />
                                ) : (
                                  // <div className="check-values">
                                  //   {console.log(value?.answerType,'value')}
                                  //   <input
                                  //     type="radio"
                                  //     onChange={(e) =>
                                  //       handleChange(value?.id, childValue.id)
                                  //     }
                                  //     name={value?.question}
                                  //     value={childValue?.answer}
                                  //     id={"ans_"+index}

                                  //   />
                                  //   <span className="checkmark" style={{
                                  //       // background: designData?.headerBackgroundColor,
                                  //       background: item?.answerColor,
                                  //       borderColor: item?.answerColor,
                                  //     }}></span>
                                  //   {
                                  //     !item?.hasParent ? <label style={{color: item?.answerColor}} for={"ans_"+index}>{childValue?.answer}</label> : null
                                  //   }
                                  // </div>

                                  <div className="check-values">
                                    {value?.answerType === 'MULTIPLE' ? (
                                      <input
                                        type="checkbox"
                                        onChange={(e) => handleChangeCheckbox(value?.id, childValue.id)}
                                        name={value?.question}
                                        value={childValue?.answer}
                                        id={"ans_" + index}
                                      />
                                    ) : (
                                      <input
                                        type="radio"
                                        onChange={(e) => handleChange(value?.id, childValue.id)}
                                        name={value?.question}
                                        value={childValue?.answer}
                                        id={"ans_" + index}
                                      />
                                    )}
                                    <span
                                      className="checkmark"
                                      style={{
                                        background: item?.answerColor,
                                        borderColor: item?.answerColor,
                                      }}
                                    ></span>
                                    {!item?.hasParent ? (
                                      <label style={{ color: item?.answerColor }} htmlFor={"ans_" + index}>
                                        {childValue?.answer}
                                      </label>
                                    ) : null}
                                  </div>

                                )}
                              </>
                            );
                          })
                        ) : value?.groupId == 0 &&
                          value?.canCustomAnswer == 1 ? (
                          <textarea
                            className="custom-answer-area"
                            onChange={(e) =>
                              handleChange(value?.id, e.target.value, "input")
                            }
                            name={"w3review_"+index}
                            rows="4"
                            cols="50"
                            style={{
                              borderColor: item?.answerColor,
                            }}
                          />
                        ) : (
                          ""
                        )}

                      </div>
                      {
                        userValid?.[value?.id] === 0 ?
                          error?.msg ? <span className="error">{error.msg}</span> : ""
                          : null
                      }
                    </div>
                  </>
                );
              })}
               {item?.addComment == 1 ? (
                <textarea
                  className="custom-answer-area"
                  placeholder="Enter your comment"
                  onChange={(e) =>setComment(e?.target?.value?.trim())
                  }
                  style={{
                    borderColor: item?.answerColor,
                  }}
                  name="w3review"
                  rows="4"
                  cols="50"
                />
              ) : ""}
            </>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SessionModel;
