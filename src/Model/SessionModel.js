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
const SessionModel = ({ show, onClose, data, eventData }) => {
  const [searchParams] = useSearchParams();
  let parms=searchParams.get('evnt');
  const [user, setUser] = useState([]);
  const [userValid, setUserValid] = useState({});
  const [userSpeaker, setSpeaker] = useState({});

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

  const handleChange = (questionId, data, type = "") => {
    try {
      
      if(typeof data === 'string'){
        if(data?.trim() == ''){
          data = 0;
        }
      }
      if (type) {
        setUserValid({
          ...userValid,
          [questionId]: data ? data : userRequired[questionId],
        });

        return;
      }
      setUserValid({ ...userValid, [questionId]: data });
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
      keys.forEach((item) => {
        let obj = {};
        // user_answer:typeof userValid[item] != "number"?userValid[item]:"",
        if (typeof userValid[item] != "number" && userValid[item]) {
          obj = {
            speakerName: userSpeaker[item],
            poll_question_id: item,
            poll_answer_id:
              typeof userValid[item] == "number" ? userValid[item] : "",
            user_answer: userValid[item],
            guest_id: Cookies.get("events"),
          };
        }

        if (typeof userValid[item] == "number" && userValid[item]) {
          obj = {
            speakerName: userSpeaker[item],
            poll_question_id: item,
            poll_answer_id:
              typeof userValid[item] == "number" ? userValid[item] : "",
            guest_id: Cookies.get("events"),
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
      const eventQuestion = Cookies.get("eventQuestion");
      if (!eventQuestion?.includes(eventData?.question_id)) {
        let newAr = eventQuestion?.length ? JSON.parse(eventQuestion) : [];
        newAr.push(eventData?.question_id);
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        Cookies.set("eventQuestion", JSON.stringify(newAr), {
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
  return (
    <Modal
      id="pollModel"
      show={show}
      // onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      // className="session-modal"
      className={`session-modal ${shouldAddClass ? "eahad_2024" : ""}`}
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* <img
            // src="https://webinar.docintel.app/Event/webinar-assets/images/octa-logo.svg"
            src={path_image+'FVIII_logo.png'} 
            alt="logo"
          /> */}
          <img  src={`${parms?.includes("eahad_2024")?"https://webinar.docintel.app/EAHAD2022/images/Octapharma_blue.png":path_image+'FVIII_logo.png'}`}alt="Factor logo" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="popup-content">
          {user?.map((item, index) => (
            <>
              {
                item?.groupId == 0 && item?.canCustomAnswer == 1 ?
                <p className="event_sub_heading">Please consider the overall meeting when answering the following questions</p>
                :
                <p className="event_sub_heading">Thank you for attending the Factor VIII Relevance Academy. We would be very grateful if you would complete and return this evaluation form. Your feedback will help us in our efforts to provide high-quality scientific meetings in the future.</p>
              }
              <h4
                  dangerouslySetInnerHTML={{
                    __html: item?.parentQuestion,
                  }}
                ></h4>

              {item?.groupId == 0 && item?.canCustomAnswer == 1 ? (
                <>
                <textarea
                  className="custom-answer-area"
                  onChange={(e) =>
                    handleChange(item?.parentId, e.target.value, "input")
                  }
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
                          {value?.answerData?.map((item, index) => {
                            return (
                              <>
                                <span>{item?.answer}</span>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}

                    <div className={item?.hasParent ? "form-group" : "form-group no_child"}>
                      {
                        item?.hasParent ? 
                          <label
                            dangerouslySetInnerHTML={{ __html: value?.question }}
                          />
                        : null  
                      }
                      
                      <div className="check-group">
                        {value?.answerData?.length ? (
                          value?.answerData?.map((childValue) => {
                            return (
                              <>
                                {value?.groupId == 0 &&
                                value?.canCustomAnswer == 1 ? (
                                  <textarea
                                    className="custom-answer-area"
                                    name="w3review"
                                    rows="4"
                                    cols="50"
                                  />
                                ) : (
                                  <div className="check-values">
                                    <input
                                      type="radio"
                                      onChange={(e) =>
                                        handleChange(value?.id, childValue.id)
                                      }
                                      name={value?.question}
                                      value={childValue?.answer}
                                    />
                                    <span className="checkmark"></span>
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
                            name="w3review"
                            rows="4"
                            cols="50"
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
