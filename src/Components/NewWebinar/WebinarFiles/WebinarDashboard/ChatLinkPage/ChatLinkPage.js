import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { postData, getData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { loader } from "../../../../../loader";
import { Button, Col, Row } from "react-bootstrap";
import dynamicEventData from "./events.json";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { toast } from "react-toastify";
import AliceCarousel from "react-alice-carousel";
import CommonConfirmModel from "../../../../../Model/CommonConfirmModel";

const validExtensions = ["png", "jpeg", "jpg", "gif"];
let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const ChatLinkPage = () => {
  const { eventIdContext, handleEventId } = useSidebar();
  const [activeIndex, setActiveIndex] = useState(1);
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
  };
  const syncActiveIndex = ({ item }) => setActiveIndex(item);
  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
  });
  const [isFormChange, setIsFormChange] = useState(false);

  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));

  const [eventData, setEventData] = useState(
    eventIdContext ? eventIdContext : localStorageEvent
  );
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [logo, setLogo] = useState("");
  const [secondHeaderImage, setSecondHeaderImage] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [footerImage, setFooterImage] = useState("");
  const [defaultLogo, setDefaultLogo] = useState();
  const [defaultHeaderImage, setDefaultHeaderImage] = useState();
  const [defaultFooterImage, setDefaultFooterImage] = useState();
  const [defaultSecondHeaderImage, setDefaultSecondHeaderImage] = useState();
  const [isDataSaved, setIsDataSaved] = useState(true);
  const [templateData, setTemplateData] = useState(dynamicEventData[0]);
  const [apiData, setApiData] = useState({});

  const [dynamicContent, setDynamicContent] = useState(() => {
    const initialState = {};
    initialState.templateId = dynamicEventData[0]?.templateId;
    Object.entries(dynamicEventData[0]?.fieldData).forEach(([field, value]) => {
      initialState[field] = value?.value;
    });
    return initialState;
  });
  const [formData, setFormData] = useState(() => {
    const initialState = {};
    initialState.templateId = dynamicEventData[0]?.templateId;
    Object.entries(dynamicEventData).forEach(([field, value]) => {
      initialState[field] = value?.value;
    });
    return initialState;
  });

  useEffect(() => {
    fetchApiData();
  }, []);

  const fetchApiData = async () => {
    try {
      loader("show");
      const response = await getData(
        `${ENDPOINT.GETCHATLINKDATA}/${eventData?.eventId}`
      );
      const { chatLinkData } = response?.data?.data;
      if (chatLinkData && Object.keys(chatLinkData).length !== 0) {
        setTemplateData(
          dynamicEventData[
            chatLinkData?.templateId ? chatLinkData?.templateId - 1 : 1
          ]
        );
        setActiveIndex(chatLinkData?.templateId);
        setDynamicContent(chatLinkData);
        setApiData(chatLinkData);
        setFormData(chatLinkData);
        setLogo(chatLinkData?.logoImageUrl);
        setHeaderImage(chatLinkData?.headerBackgroundImage);
        setFooterImage(chatLinkData?.footerImage);
        setSecondHeaderImage(chatLinkData?.headerImage)
        setIsDataSaved(true);
      } else {
        setFormData(dynamicContent);
        setLogo(dynamicContent?.logoImageUrl);
        setHeaderImage(dynamicContent?.headerBackgroundImage);
        setFooterImage(dynamicContent?.footerImage);
        setSecondHeaderImage(chatLinkData?.headerImage)

        setIsDataSaved(false);
      }
    } catch (error) {
      setLogo(dynamicContent?.logoImageUrl);
      setHeaderImage(dynamicContent?.headerBackgroundImage);
      setFooterImage(dynamicContent?.footerImage);
      setSecondHeaderImage(dynamicContent?.headerImage)

      setIsDataSaved(false);
      console.error("Error fetching settings:", error);
    } finally {
      loader("hide");
    }
  };

  const handleFileSelect = (e, isSelectedName) => {
    setIsFormChange(true);
    // return;
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";
    fileInput.accept = ".png, .jpeg, .jpg, .gif";

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
          if (isSelectedName === "headerBackgroundImage") {
            setErrorMsg(
              `Invalid file extension of header image. Please select a valid extension file.`
            );
          }
          if (isSelectedName === "headerImage") {
            setErrorMsg(
              `Invalid file extension of header image. Please select a valid extension file.`
            );
          }
          if (isSelectedName === "footerImage") {
            setErrorMsg(
              `Invalid file extension of footer image. Please select a valid extension file.`
            );
          }
        } else {
          setErrorMsg("");
        }

        if (
          isSelectedName === "logoImageUrl" 
         
        ) {
          try {
            const uploadedImageUrl = await uploadImageToServer(file);
            setDynamicContent((prevContent) => ({
              ...prevContent,
              [isSelectedName]: uploadedImageUrl,
            }));
            setDefaultLogo(dynamicContent?.logoImageUrl);
            setDefaultHeaderImage(dynamicContent?.headerBackgroundImage);
            // setLogo(uploadedImageUrl);
            if (isSelectedName === "logoImageUrl") {
              setLogo(URL.createObjectURL(file));
            }
          } catch (error) {
            console.error("Error uploading logo image:", error);
          }
        }
        if (
         
          isSelectedName === "headerBackgroundImage"
        ) {
          try {
            const uploadedImageUrl = await uploadImageToServer(file);
            setDynamicContent((prevContent) => ({
              ...prevContent,
              [isSelectedName]: uploadedImageUrl,
            }));
           
            setDefaultHeaderImage(dynamicContent?.headerBackgroundImage);
           
            if (isSelectedName === "headerBackgroundImage") {
              setHeaderImage(URL.createObjectURL(file));
            }
          } catch (error) {
            console.error("Error uploading header image:", error);
          }
        }

        if (
         
          isSelectedName === "headerImage"
        ) {
          try {
            const uploadedImageUrl = await uploadImageToServer(file);
            setDynamicContent((prevContent) => ({
              ...prevContent,
              [isSelectedName]: uploadedImageUrl,
            }));
           
            setDefaultSecondHeaderImage(dynamicContent?.headerImage);
           
            if (isSelectedName === "headerImage") {
              setSecondHeaderImage(URL.createObjectURL(file));
            }
          } catch (error) {
            console.error("Error uploading header image:", error);
          }
        }
        if (
         
          isSelectedName === "footerImage"
        ) {
          try {
            const uploadedImageUrl = await uploadImageToServer(file);
            setDynamicContent((prevContent) => ({
              ...prevContent,
              [isSelectedName]: uploadedImageUrl,
            }));
           
            setDefaultHeaderImage(dynamicContent?.footerImage);
           
            if (isSelectedName === "footerImage") {
              setFooterImage(URL.createObjectURL(file));
            }
          } catch (error) {
            console.error("Error uploading footer image:", error);
          }
        }
      }
    });
    fileInput.click();
  };

  const handleDeleteLogoImage = () => {
    const currentLogo = logo;
    setIsFormChange(true);

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

  const handleDeleteHeaderImage = () => {
    const currentHeader = headerImage;
    setIsFormChange(true);

    if (currentHeader !== defaultHeaderImage) {
      setHeaderImage("");
      setDynamicContent((prevContent) => ({
        ...prevContent,
        headerBackgroundImage: "",
      }));
    } else {
      setHeaderImage("");
      setDynamicContent((prevContent) => ({
        ...prevContent,
        headerBackgroundImage: "",
      }));

      setDefaultHeaderImage("");
    }
  };

  const handleDeleteFooterImage = () => {
    const currentFooter = footerImage;
    setIsFormChange(true);

    if (currentFooter !== defaultFooterImage) {
      setFooterImage("");
      setDynamicContent((prevContent) => ({
        ...prevContent,
        footerImage: "",
      }));
    } else {
      setFooterImage("");
      setDynamicContent((prevContent) => ({
        ...prevContent,
        footerImage: "",
      }));

      setDefaultFooterImage("");
    }
  };

  const handleDeleteSecondHeaderImage = () => {
    const currentHeader = secondHeaderImage;
    setIsFormChange(true);

    if (currentHeader !== defaultSecondHeaderImage) {
      setSecondHeaderImage("");
      setDynamicContent((prevContent) => ({
        ...prevContent,
        headerImage: "",
      }));
    } else {
      setSecondHeaderImage("");
      setDynamicContent((prevContent) => ({
        ...prevContent,
        headerImage: "",
      }));

      setDefaultSecondHeaderImage("");
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
    setIsFormChange(true);
    setDynamicContent((prevContent) => ({
      ...prevContent,
      [field]: value,
    }));
    setIsDataSaved(false);
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

  const handleSubmitForm = async (e) => {
    try {
      loader("show");
      const payload = {
        chatLinkData: dynamicContent,
        eventId: eventData?.eventId,
        companyId: eventData?.companyId,
      };
      const response = await postData(ENDPOINT.STORECHATLINKDATA, payload);
      setFormData(dynamicContent);
      setApiData(dynamicContent);
      setIsDataSaved(true);
      if (errorMsg && errorMsg !== "") {
        toast.error(errorMsg);
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      loader("hide");
    }

    if (e) {
      toast.success("Your changes has been saved successfully !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsFormChange(false);
    } else {
      setIsFormChange(false);
      setConfirmationPopup(false);
      templateClicked(templateData);
    }
  };

  const handlePreviewInNewTab = async (e, newLink) => {
    e.preventDefault();

    try {
      let link = "";
      if (eventData?.eventId > 402) {
        link = `https://events.docintel.app/event?evnt=${eventData?.eventCode}`;
      } else {
        link = `${window.location.protocol}//${window.location.host}/event?evnt=${eventData?.eventCode}`;
      }

      await navigator.clipboard.writeText(link);
      window.open(link, "_blank");
    } catch (error) {
      console.error("Error preview in new window:", error);
    }
  };
  const templateClicked = (template, e) => {
    if (isFormChange) {
      setTemplateData(template);
      setPopupMessage({
        message1:
          "Do you want to save the changes in form otherwise they will vanish.",
        message2: "Are you sure you want to do this?",
        footerButton: "Yes please!",
      });
      setIsFormChange(false);
      if (confirmationpopup) {
        setConfirmationPopup(false);
      } else {
        setConfirmationPopup(true);
      }
    } else {
      setTemplateData(template);
      if (template?.templateId == apiData?.templateId) {
        setDynamicContent(apiData);
        setFormData(apiData);
        setLogo(apiData?.logoImageUrl ? apiData?.logoImageUrl : "");
        if (template?.templateId == 2) {
          setHeaderImage(
            apiData?.headerBackgroundImage ? apiData?.headerBackgroundImage : ""
          );
        }
        if (template?.templateId == 3) {
          setSecondHeaderImage(
            apiData?.headerImage ? apiData?.headerImage : ""
          );
        }
        if (template?.templateId == 3) {
          setFooterImage(
            apiData?.footerImage ? apiData?.footerImage : ""
          );
        }
      } else {
        const initialState = {};
        Object.entries(template?.fieldData).forEach(([field, value]) => {
          initialState[field] = value?.value;
        });
        initialState.templateId = template?.templateId;

        setDynamicContent(initialState);
        setFormData(initialState);

        let updatedBody = JSON.parse(JSON.stringify(template));
        setLogo(
          updatedBody?.fieldData?.logoImageUrl?.value
            ? updatedBody?.fieldData?.logoImageUrl?.value
            : ""
        );
        if (template?.templateId == 2) {
          setHeaderImage(
            updatedBody?.fieldData?.headerBackgroundImage?.value
              ? updatedBody?.fieldData?.headerBackgroundImage?.value
              : ""
          );
        }
        if (template?.templateId == 3) {
          setSecondHeaderImage(
            updatedBody?.fieldData?.headerImage?.value
              ? updatedBody?.fieldData?.headerImage?.value
              : ""
          );
        }
        if (template?.templateId == 3) {
          setFooterImage(
            updatedBody?.fieldData?.footerImage?.value
              ? updatedBody?.fieldData?.footerImage?.value
              : ""
          );
        }
      }

      setActiveIndex(template?.templateId);
    }
  };
  return (
    <>
      <Col className="right-sidebar custom-change">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <div className="custom-container">
          <div className="row">
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
                    // href={`${window.location.protocol}//${window.location.host}/event?evnt=${eventData?.eventCode}`}
                    href={
                      eventData?.eventId > 402
                        ? `https://events.docintel.app/event?evnt=${eventData?.eventCode}`
                        : `${window.location.host}/event?evnt=${eventData?.eventCode}`
                    }
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
                  <Button
                    className={`btn-filled  ${!isDataSaved ? "disabled" : ""}`}
                    onClick={(e) => {
                      handlePreviewInNewTab(e);
                    }}
                  >
                    Open Link
                  </Button>
                </div>
              </div>
            </div>
            <section className="select-mail-template library-consent create-change-content">
              <div className="custom-container">
                <Row>
                  <div className="page-title">
                    <h6>Select Template</h6>
                  </div>

                  <AliceCarousel
                    mouseTracking
                    //disableButtonsControls
                    disableDotsControls
                    activeIndex={activeIndex}
                    responsive={responsive}
                    onSlideChanged={syncActiveIndex}
                  >
                    {dynamicEventData.map((template, index) => {
                      return (
                        <>
                          <div
                            className="item"
                            onClick={(e) => templateClicked(template, e)}
                          >
                            <img
                              id={`"template_dyn" + template?.popupNo`}
                              src={`${path_image}/chatTemplate${template?.templateId}.png`}
                              alt=""
                              className={
                                typeof activeIndex !== "undefined" &&
                                activeIndex == template?.templateId
                                  ? "select_mm"
                                  : ""
                              }
                            />
                            {/* <p>{template?.name}</p> */}
                          </div>
                        </>
                      );
                    })}
                  </AliceCarousel>
                </Row>{" "}
              </div>{" "}
            </section>

            <div className="register-page create-change-content chatlink">
              <div className="row ">
                <div className="col-md-6 col-sm-6">
                  <div className="chatlink-left">
                    {Object.entries(templateData?.fieldData).map(
                      ([field, value]) => (
                        <div
                          key={field}
                          className="form-group d-flex align-items-center"
                        >
                          <label> {value.title}</label>

                          {value.type === "file" &&  field === "logoImageUrl" ?  (
                            <>
                              <div className="logo-section header-section">
                                {!logo && (
                                  <>
                                    <div>
                                      <h5>Upload your file</h5>
                                    </div>
                                    <Button
                                      onClick={(e) =>
                                        handleFileSelect(e, "logoImageUrl")
                                      }
                                    >
                                      Choose Your File
                                    </Button>
                                  </>
                                )}

                                <img
                                  className="logo-img"
                                  src={
                                     logo
                                  }
                                />

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
                                        handleDeleteLogoImage(
                                          e,
                                          "logoImageUrl"
                                        );
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
                              <span className="suggestion">
                                (Recommended size 300 x 140)
                              </span>
                            </>
                          ) : value.type === "file" &&  field === "headerBackgroundImage" ? (
                            <>
                              <div className="header-section">
                                {!headerImage && (
                                  <>
                                    <div>
                                      <h5>Upload your file</h5>
                                    </div>
                                    <Button className="upload-img"
                                      onClick={(e) =>
                                        handleFileSelect(e, "headerBackgroundImage")
                                      }
                                    >
                                      Choose Your File
                                    </Button>
                                  </>
                                )}

                                <img
                                  className="header-img"
                                  src={
                                    headerImage
                                     
                                  }
                                />

                                <div className="header-text">
                                  {headerImage && (
                                    <button
                                      className="btn btn-outline-primary"
                                      title="Edit user"
                                    >
                                      <img
                                        src={path + "edit-button.svg"}
                                        alt="Edit"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleFileSelect(e, "headerBackgroundImage");
                                        }}
                                      />
                                    </button>
                                  )}

                                  {headerImage && (
                                    <button
                                      className="dlt_btn_event btn-voilet"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteHeaderImage(
                                          e,
                                          "headerBackgroundImage"
                                        );
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
                              <span className="suggestion">
                                (Recommended size 300 x 140)
                              </span>
                            </>
                          ) : value.type === "file" &&  field === "headerImage" ? (
                            <>
                              <div className="header-section">
                                {!secondHeaderImage && (
                                  <>
                                    <div>
                                      <h5>Upload your file</h5>
                                    </div>
                                    <Button className="upload-img"
                                      onClick={(e) =>
                                        handleFileSelect(e, "headerImage")
                                      }
                                    >
                                      Choose Your File
                                    </Button>
                                  </>
                                )}

                                <img
                                  className="header-img"
                                  src={
                                    secondHeaderImage
                                     
                                  }
                                />

                                <div className="header-text">
                                  {secondHeaderImage && (
                                    <button
                                      className="btn btn-outline-primary"
                                      title="Edit user"
                                    >
                                      <img
                                        src={path + "edit-button.svg"}
                                        alt="Edit"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleFileSelect(e, "headerImage");
                                        }}
                                      />
                                    </button>
                                  )}

                                  {secondHeaderImage && (
                                    <button
                                      className="dlt_btn_event btn-voilet"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteSecondHeaderImage(
                                          e,
                                          "headerImage"
                                        );
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
                              <span className="suggestion">
                                (Recommended size 300 x 140)
                              </span>
                            </>
                          ):
                          value.type === "file" &&  field === "footerImage" ? (
                            <>
                              <div className="header-section">
                                {!footerImage && (
                                  <>
                                    <div>
                                      <h5>Upload your file</h5>
                                    </div>
                                    <Button className="upload-img"
                                      onClick={(e) =>
                                        handleFileSelect(e, "footerImage")
                                      }
                                    >
                                      Choose Your File
                                    </Button>
                                  </>
                                )}

                                <img
                                  className="header-img"
                                  src={
                                    footerImage
                                     
                                  }
                                />

                                <div className="header-text">
                                  {footerImage && (
                                    <button
                                      className="btn btn-outline-primary"
                                      title="Edit user"
                                    >
                                      <img
                                        src={path + "edit-button.svg"}
                                        alt="Edit"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleFileSelect(e, "footerImage");
                                        }}
                                      />
                                    </button>
                                  )}

                                  {footerImage && (
                                    <button
                                      className="dlt_btn_event btn-voilet"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteFooterImage(
                                          e,
                                          "footerImage"
                                        );
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
                              <span className="suggestion">
                                (Recommended size 300 x 140)
                              </span>
                            </>
                          ) : value.type == "color" ? (
                            <>
                              <div className="color-pick">
                                <div className="color-pick-point">
                                  <img
                                    src={path_image + "color-picker.svg"}
                                    alt=""
                                  />
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
                          ) : value.type == "textArea" ? (
                            <>
                               <textArea
                                type={value.type}
                                onChange={(e) => handleDynamicChange(field, e.target.value)}
                                className="form-control"
                                value={dynamicContent[field]}
                              >{dynamicContent[field]}</textArea>
                            </>
                          ):
                           (
                              <input
                                type={value.type}
                                onChange={(e) => handleDynamicChange(field, e.target.value)}
                                className="form-control"
                                value={dynamicContent[field]}
                              />
                            )
                          }
                        </div>
                      )
                    )}
                    <Button className="save-btn" onClick={handleSubmitForm}>
                      Save
                    </Button>
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
                            {
                            formData?.templateId == 2  ? (
                              <div
                                className="head-sec template2"
                                style={{
                                  backgroundImage: `url(${formData?.headerBackgroundImage})`,
                                }}
                              ></div>
                            ) :  formData?.templateId == 3  ? (<>
                              <div
                                className="head-sec template2"
                                style={{
                                  backgroundImage: `url(${formData?.headerImage})`,
                                }}
                              ></div>
                               <div className="event_title">
                      <h2 className="top-title"   style={{ color: formData?.textColor }} dangerouslySetInnerHTML={{
                                __html: formData?.formHeading
                                  ? formData?.formHeading
                                  : "Type your question here!",
                              }}/>
                    </div>
                            
                            </>
                            ) :(
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
                            )}
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

                                <input
                                  style={{
                                    borderColor: formData?.textColor,
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
                                <textarea
                                  style={{
                                    borderColor: formData?.textColor,
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

                             
                            </div>
                          </form>
                          {formData?.templateId === 3 ? <>
                            <div className="eahad-footer">
                            <img
                              
                               src={
                                 formData?.footerImage
                                   ? formData?.footerImage
                                   : "https://onesourcedoc.s3.eu-west-1.amazonaws.com/images/3BOf8GjoyBykieysOxBPUPNfeXFV4YBT1i3M3T01.png"
                               }
                              alt=""
                            />
                            <div className="footer-msg">
                            <p
                            style={{ color: formData?.textColor }}
                            dangerouslySetInnerHTML={{
                              __html: formData?.footerTextOne
                                ? formData?.footerTextOne
                                : "Visit <a target='_blank' href='https://onesource.octapharma.com'>One Source</a>, Octapharma’s online haematology platform for healthcare professionals, to be up to date with the latest news and events, and to hear leading experts share their opinions about treating patients with bleeding disorders.",
                            }}
                          />
                              {/* <p
                            style={{ color: formData?.textColor }}
                            dangerouslySetInnerHTML={{
                              __html: formData?.footerTextTwo
                                ? formData?.footerTextTwo
                                : "To visit One Source click here: <a target=\"_blank\" href=\"https://onesource.octapharma.com\">https://onesource.octapharma.com</a>",
                            }}
                          />
                              <span
                              style={{ color: formData?.textColor }}
                            dangerouslySetInnerHTML={{
                              __html: formData?.footerTextThree
                                ? formData?.footerTextThree
                                : "One Source platform is for healthcare professionals only.",
                            }}
                              /> */}
                            </div>
                          </div>
                           <div className="copy-right-bottom-text">
                           <p
                             style={{ color: formData?.textColor }}
                             dangerouslySetInnerHTML={{
                               __html: formData?.footerText,
                             }}
                           />
                         </div></> :
                          <div className="copy-right-bottom-text">
                          <p
                            style={{ color: formData?.textColor }}
                            dangerouslySetInnerHTML={{
                              __html: formData?.footerText,
                            }}
                          />
                        </div>
                        }

                          {/* <div className="copy-right-bottom-text">
                            <p
                              style={{ color: formData?.textColor }}
                              dangerouslySetInnerHTML={{
                                __html: formData?.footerText,
                              }}
                            />
                          </div> */}
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
      <CommonConfirmModel
        show={confirmationpopup}
        onClose={() => {
          setConfirmationPopup(false);
          templateClicked(templateData);
        }}
        onCloseCross={() => {
          setConfirmationPopup(false);
          setIsFormChange(true);
        }}
        fun={handleSubmitForm}
        popupMessage={popupMessage}
        path_image={path_image}
      />
    </>
  );
};
export default ChatLinkPage;
