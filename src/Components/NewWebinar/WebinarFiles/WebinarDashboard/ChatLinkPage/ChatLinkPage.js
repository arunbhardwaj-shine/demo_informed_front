
import { useEffect, useState } from "react";
import { useLocation,useSearchParams } from "react-router-dom";
import { postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
// import "./custom.css";
import { loader } from "../../../../../loader";
// import "./style.css";
import axios from "axios";
import { Button, Col } from "react-bootstrap";
import dynamicEventData from "./events.json";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";

const validExtensions = ["png", "jpeg", "jpg"];
let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const ChatLinkPage = () => {
  const { eventIdContext, handleEventId } = useSidebar();

  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));

  const [eventData, setEventData] = useState(
    eventIdContext ? eventIdContext : localStorageEvent
  );
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [logo, setLogo] = useState();
  const [defaultLogo, setDefaultLogo] = useState();
  const [dynamicContent, setDynamicContent] = useState(() => {
    const initialState = {};
    Object.entries(dynamicEventData).forEach(([field, value]) => {
      initialState[field] = value?.value;
    });
    return initialState;
  });

  useEffect(() => {
    const initialState = {};
    Object.entries(dynamicEventData).forEach(([field, value]) => {
      initialState[field] = value?.value;
    });
    setLogo(initialState?.logoImageUrl);
    fetchSettings();
  }, []);


  const fetchSettings = async () => {
    try {
      loader("show");
      //   const response = await getData(
      //     `${ENDPOINT.WEBINAR_SETTINGS_GET}/${eventId}`
      //   );
      //   const { dynamicContent } = response?.data?.data;
      setDynamicContent(dynamicContent);
      // console.log(response?.data?.data, "===>response");
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      loader("hide");
    }
  };

  const handleFileSelect = async (e, isSelectedName) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";
    fileInput.accept = ".png, .jpeg, .jpg";

    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];

      if (file) {
        const extension = file.name.split(".").pop().toLowerCase();

        if (!validExtensions.includes(extension)) {
          if (isSelectedName === "headerImageUrl") {
            setErrorMsg(
              `Invalid file extension of header. Please select a valid extension file.`
            );
          }
        } else {
          setErrorMsg("");
        }

        if (isSelectedName === "logoImageUrl") {
          try {
            const uploadedImageUrl = await uploadImageToServer(file);
            setDynamicContent((prevContent) => ({
              ...prevContent,
              [isSelectedName]: uploadedImageUrl,
            }));
            setDefaultLogo(dynamicContent?.logoImageUrl);
            setLogo(uploadedImageUrl);
          } catch (error) {
            console.error("Error uploading logo image:", error);
          }
        }
      }
    });

    fileInput.click();
  };

  const handleDeleteLogoImage = () => {
    const currentLogo = logo;

    if (currentLogo !== defaultLogo) {
      setLogo("");
      setDynamicContent((prevContent) => ({
        ...prevContent,
        logoImageUrl: "",
      }));
    } else {
      setLogo("");
      setDynamicContent((prevContent) => ({
        ...prevContent,
        logoImageUrl: "",
      }));

      setDefaultLogo("");
    }
  };

  const uploadImageToServer = async (file) => {
    try {
      // const validExtensions = ["png", "jpeg"];
      const extension = file.name.split(".").pop().toLowerCase();
      if (!validExtensions.includes(extension)) {
        throw new Error(
          "Invalid file extension. Please select a valid extension file."
        );
      }

      loader("show");
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch(
        "https://onesource.informed.pro/api/upload-image",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const uploadedData = await response.json();
        return uploadedData.imageUrl;
      } else {
        console.error("Image upload failed");
        return null;
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    } finally {
      loader("hide");
    }
  };

  const handleDynamicChange = (field, value) => {
    setDynamicContent((prevContent) => ({
      ...prevContent,
      [field]: value,
    }));
  };


  const handleSubmitForm = async () => {
    try {
      loader("show");
      const payload = {
        chatLinkData: dynamicContent,
        eventId:eventData?.eventId,
        companyId:eventData?.companyId,
      };
      console.log(payload, "====>payload");
      const response = await postData(
        // ENDPOINT.WEBINAR_SETTINGS_UPDATE,
        payload
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      loader("hide");
    }
  };

//   const handleSubmitForm = async () => {
//     try {
//       loader("show");
//         const payload = {
//             chatLinkData: dynamicContent,
//             eventId:eventData?.eventId,
//             companyId:eventData?.companyId,
//         };
  
//       console.log(payload, "====>payload");
//       const response = await postData(
//         // ENDPOINT.WEBINAR_SETTINGS_UPDATE,
//         payload
//       );
  
//       // Update the dynamicContent state with the new data
//       setDynamicContent((prevContent) => ({
//         ...prevContent,
//         ...response?.data, // Assuming your API response contains the updated data
//       }));
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       loader("hide");
//     }
//   };
  

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row register-page create-change-content">
            <div className="col-md-4 col-sm-5">
              <div className="register-page-left">
                {Object.entries(dynamicEventData).map(([field, value]) => (
                  <div
                    key={field}
                    className="form-group d-flex align-items-center"
                  >
                    <label> {value.title}</label>
                    {value.type === "file" ? (
                      <div className="logo-section header-section">
                        {!logo && (
                          <>
                            <div>
                              <h5>Upload your file</h5>
                            </div>
                            <Button onClick={(e) => handleFileSelect(e, field)}>
                              Choose Your File
                            </Button>
                          </>
                        )}

                        <img className="logo-img" src={logo} />

                        <div className="logo-text header-text">
                          {logo && (
                            <button
                              className="btn btn-outline-primary"
                              title="Edit user"
                            >
                              <img
                                src={path + "edit-button.svg"}
                                alt="Edit"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFileSelect(e, field);
                                }}
                              />
                            </button>
                          )}

                          {logo && (
                            <button
                              className="dlt_btn_event btn-voilet"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteLogoImage(e, field);
                              }}
                            >
                              <img
                                title="Delete"
                                src={path_image + "delete-icon.svg"}
                                alt="Delete Row"
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <input
                        type="text"
                        onChange={(e) =>
                          handleDynamicChange(field, e.target.value)
                        }
                        className="form-control"
                        value={dynamicContent[field]}
                      />
                    )}
                  </div>
                ))}
                <Button onClick={handleSubmitForm}>Save</Button>
              </div>
            </div>

            <div className="col-md-8 col-sm-7">
              <div className="webinar-popup">
                <div className="loader" id="custom_loader">
                  <div className="loader_show">
                    <span className="loader-view"> </span>
                  </div>
                </div>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <div className={`octa_events`}>
                  <div className="container">
                    <div className="question-block">
                      <div className="header-logo">
                        <div>
                          <img
                            src={
                              dynamicContent?.logoImageUrl
                              // : path_image + "FVIII_logo.png"
                            }
                            alt="Factor logo"
                          />
                        </div>
                      </div>
                      <div className="question-block-form">
                        <div className="log-inner">
                          <div className="head-sec">
                            <h2
                              className="top-title"
                              dangerouslySetInnerHTML={{
                                __html: dynamicContent?.heading,
                              }}
                            ></h2>
                          </div>
                        </div>

                        <form>
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
                                dangerouslySetInnerHTML={{
                                  __html: dynamicContent?.nameLabel,
                                }}
                                // <i>
                                //   <small>(Optional)</small>
                                // </i>
                              />

                              <input
                                type="text"
                                id="name"
                                className="form-control "
                                placeholder={dynamicContent?.namePlaceholder}
                                name="name"
                                // value={user?.name}
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
                                Your question
                    
                                <sup>*</sup>
                              </label> */}
                              <label
                                htmlFor="fname"
                                className="form-label"
                                dangerouslySetInnerHTML={{
                                  __html: dynamicContent?.questionLabel,
                                }}
                                // <sup>*</sup>
                              />
                              <textarea
                                name="question"
                                id="question"
                                className="form-control"
                                placeholder={
                                  dynamicContent?.questionPlaceholder
                                }
                                cols="40"
                                rows="4"
                                // value={user?.question}
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
                                    : dynamicContent?.buttonText
                                }
                              /> */}

                              <Button
                                // type="submit"
                                className="btn btn-success"
                                dangerouslySetInnerHTML={{
                                  __html: dynamicContent?.buttonText,
                                }}
                              ></Button>
                            </div>

                            {/* {parms?.includes("eahad_2024") && (
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
                                    , Octapharma’s online haematology platform
                                    for healthcare professionals, to be up to
                                    date with the latest news and events, and to
                                    hear leading experts share their opinions
                                    about treating patients with bleeding
                                    disorders.
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
                            )} */}
                          </div>
                        </form>

                        <div className="copy-right-bottom-text">
                          {/* <p>
                             
                              Preparation date: 7-8 December 2023
                            </p> */}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: dynamicContent?.footerText,
                            }}
                          />
                        </div>
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
                          <button
                            type="submit"
                            name="cpd_tab"
                            id="submitPollAnswerGuest"
                            className="submit_btn btn-primary"
                            title="Submit"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade"
                    id="pollAnswerModel"
                    role="dialog"
                  >
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};
export default ChatLinkPage;
