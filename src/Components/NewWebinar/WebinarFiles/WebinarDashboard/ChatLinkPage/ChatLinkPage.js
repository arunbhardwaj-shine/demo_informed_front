import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { postData, getData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { loader } from "../../../../../loader";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import dynamicEventData from "./events.json";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { toast } from "react-toastify";

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
  const [logo, setLogo] = useState("");
  const [defaultLogo, setDefaultLogo] = useState();
  const [isDataSaved, setIsDataSaved] = useState(true);

  const [dynamicContent, setDynamicContent] = useState(() => {
    const initialState = {};
    Object.entries(dynamicEventData).forEach(([field, value]) => {
      initialState[field] = value?.value;
    });
    return initialState;
  });
  const [formData, setFormData] = useState(() => {
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
    fetchApiData();
  }, []);

  const fetchApiData = async () => {
    try {
      loader("show");
      const response = await getData(
        `${ENDPOINT.GETCHATLINKDATA}/${eventData?.eventId}`
      );
      const { chatLinkData } = response?.data?.data;
      setIsDataSaved(false);
      // console.log(isDataSaved,'===>isdata1')
      if (chatLinkData && Object.keys(chatLinkData).length !== 0) {
        setDynamicContent(chatLinkData);
        setFormData(chatLinkData);
        setLogo(chatLinkData?.logoImageUrl);
      } else {
        setLogo(dynamicContent?.logoImageUrl);
      }
    } catch (error) {
      setLogo(dynamicContent?.logoImageUrl);
      console.error("Error fetching settings:", error);
    } finally {
      loader("hide");
    }
  };

  const handleFileSelect =  (e, isSelectedName) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";
    fileInput.accept = ".png, .jpeg, .jpg";

    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];

      if (file) {
        const extension = file.name.split(".").pop().toLowerCase();

        if (!validExtensions.includes(extension)) {
          if (isSelectedName === "logoImageUrl") {
            setErrorMsg(
              `Invalid file extension of logo. Please select a valid extension file.`
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
            // setLogo(uploadedImageUrl);
            setLogo(URL.createObjectURL(file));
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
    setIsDataSaved(false);
    // console.log(isDataSaved,'===>isdata')
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

  const handleSubmitForm = async () => {
    try {
      loader("show");
      const payload = {
        chatLinkData: dynamicContent,
        eventId: eventData?.eventId,
        companyId: eventData?.companyId,
      };
      // console.log(payload, "====>payload");
      const response = await postData(ENDPOINT.STORECHATLINKDATA, payload);
      setFormData(dynamicContent);
      setIsDataSaved(true);
      if (errorMsg && errorMsg !== "") {
        toast.error(errorMsg);
        return;
      }
      // console.log(isDataSaved,'===>isdata')
    } catch (error) {
      console.error("Error:", error);
    } finally {
      loader("hide");
    }
  };

  const handlePreviewInNewTab = async (e, newLink) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(
        `${`https://informed.pro/event?evnt=${eventData?.eventCode}`}`
      );

      // Open link in a new tab
      window.open(
        `${`https://informed.pro/event?evnt=${eventData?.eventCode}`}`,
        "_blank"
      );
    } catch (error) {
      console.error("Error preview in new window:", error);
    }
  };

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header regi-web">
              <div className="page-title">
                <h2>Chat Link</h2>
              </div>
              <div className="top-right-action">
                    <div className="d-flex justify-content-end header_btns">
         
          <a
            // className={`copy_link btn-voilet`}
            className={`copy_link btn-voilet ${
              !isDataSaved ? "disabled" : ""
            }`}
            href={`https://informed.pro/event?evnt=${eventData?.eventCode}`}
            onClick={(e) => {
              e.preventDefault();
              if (!isDataSaved) {
                return;
              }
              console.dir();
              let newLink = `${e.currentTarget.getAttribute("href")}`;
              copyToClipboard(newLink);
            }}
          >
            Copy Chat Link
          </a>
           <Button copy_link btn-bordered 
            onClick={(e) => {
              handlePreviewInNewTab(e);
            }}
          >
            Open Link
          </Button>
          </div>
              </div>
            </div>
          </Row>


        <div className="register-page create-change-content chatlink">
          <div className="row ">
            <div className="col-md-6 col-sm-6">
              <div className="chatlink-left">
                {Object.entries(dynamicEventData).map(([field, value]) => (
                  <div
                    key={field}
                    className="form-group d-flex align-items-center"
                  >
                    <label> {value.title}</label>
                    {value.type === "file" ? (
                      <>
                        <div className="logo-section header-section">
                          {!logo && (
                            <>
                              <div>
                                <h5>Upload your file</h5>
                              </div>
                              <Button
                                onClick={(e) => handleFileSelect(e, "logoImageUrl")}
                              >
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
                                    handleFileSelect(e, "logoImageUrl");
                                  }}
                                />
                              </button>
                            )}

                            {logo && (
                              <button
                                className="dlt_btn_event btn-voilet"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteLogoImage(e, "logoImageUrl");
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
                        <span className="suggestion">(Recommended size 300 x 140)</span>
                      </>
                    ) : value.type == "color" ? (
                      <>
                        <div className="color-pick">
                          <div className="color-pick-point">
                          <img src={path_image + "color-picker.svg"} alt="" />
                          </div>
                          <input
                            type="color"
                            title="Choose Your Color"
                            onChange={(e) =>
                              handleDynamicChange(field, e.target.value)
                            }
                            // defaultValue={dynamicEventData?.textColor?.value}
                            defaultValue={dynamicContent[field]}
                            value={dynamicContent[field]}
                          />
                        </div>
                      </>
                    ) : (
                      <input
                        type={value.type}
                        onChange={(e) =>
                          handleDynamicChange(field, e.target.value)
                        }
                        className="form-control"
                        value={dynamicContent[field]}
                      />
                    )}
                  </div>
                ))}
                <Button className="save-btn" onClick={handleSubmitForm}>Save</Button>
              </div>
            </div>

            <div className="col-md-6 col-sm-6">
              <div className="webinar-popup">
                <div className="loader" id="custom_loader">
                  <div className="loader_show">
                    <span className="loader-view"> </span>
                  </div>
                </div>
                <div className={`octa_events`}>
                  <div className="question-block">
                    <div className="header-logo">
                      <div>
                        <img
                          src={
                            formData?.logoImageUrl
                            // : path_image + "FVIII_logo.png"
                          }
                          alt="Factor logo"
                        />
                      </div>
                    </div>
                    <div className="question-block-form">
                      <div className="log-inner">
                        <div
                          className="head-sec"
                          style={{
                            background: formData?.headerBackgroundColor,
                            borderBottomColor: formData?.buttonColor,
                          }}
                        >
                          <h2
                            style={{ color: formData?.textColor }}
                            className="top-title"
                            dangerouslySetInnerHTML={{
                              __html: formData?.heading,
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
                              style={{ color: formData?.textColor }}
                              dangerouslySetInnerHTML={{
                                __html: formData?.nameLabel,
                              }}
                              // <i>
                              //   <small>(Optional)</small>
                              // </i>
                            />

                            <input  style={{
                                borderColor: formData?.textColor
                              }}
                              type="text"
                              id="name"
                              className="form-control "
                              placeholder={formData?.namePlaceholder}
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
                              style={{ color: formData?.textColor }}
                              dangerouslySetInnerHTML={{
                                __html: formData?.questionLabel,
                              }}
                              // <sup>*</sup>
                            />
                            <textarea  style={{
                                borderColor: formData?.textColor
                              }}
                              name="question"
                              id="question"
                              className="form-control"
                              placeholder={formData?.questionPlaceholder}
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
                              style={{
                                background: formData?.buttonColor,
                                borderColor: formData?.buttonColor,
                              }}
                              dangerouslySetInnerHTML={{
                                __html: formData?.buttonText,
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
                          style={{ color: formData?.textColor }}
                          dangerouslySetInnerHTML={{
                            __html: formData?.footerText,
                          }}
                        />
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
