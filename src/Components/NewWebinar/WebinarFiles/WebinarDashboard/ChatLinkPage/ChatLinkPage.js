import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { postData, getData,postFormData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { loader } from "../../../../../loader";
import { Button, Col, Row } from "react-bootstrap";
import dynamicEventData from "./events.json";
import dynamicEventDataJson from "./events.json";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { toast } from "react-toastify";
import AliceCarousel from "react-alice-carousel";
import CommonConfirmModel from "../../../../../Model/CommonConfirmModel";
import QRCode from 'qrcode';

const validExtensions = ["png", "jpeg", "jpg", "gif"];
let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const ChatLinkPage = () => {
  const { eventIdContext, handleEventId } = useSidebar();
  const [activeIndex, setActiveIndex] = useState(0);
  const aliceCarouselRef = useRef(null);

  const templateUserIDs={"iSnEsKu5gB/DRlycxB6G4g==":[1,2,4,5,6,7,8,9,10],"B7SHpAc XDXSH NXkN0rdQ==":[1,2,4,5,6,7,8,9,10], "wW0geGtDPvig5gF 6KbJrg==":[1,2,4,5,6,7,8,9,10],
  "UbCJcnLM9fe HsRMgX8c1A==":[1,2,4,5,6,7,8,9,10],"z2TunmZQf3QwCsICFTLGGQ==":[1,2,4,5,6,7,8,9,10],"qDgwPdToP05Kgzc g2VjIQ==":[1,2,4,5,6,7,8,9,10] ,"rjiGlqA9DXJVH7bDDTX0Lg==":[1,2,4,5,6,7,8,9,10,11],
"MpEPwXLqTPveAfumxT/KXw==":[1,2,4,5,6,7,8,9,10],"5EdDBhVCQm08iLJwBENCWw==":[1,2,4,5,6,7,8,9,10],"I3yCIhnPAd0Ma6sNY4augA==":[1,2,4,5,6,7,8,9,10],"Y/I8/x8K0syk/ulWyKwKhg==":[1,2,4,5,6,7,8,9,10]
,"bWmUjqX7J011   WUTYn9g==":[1,2,4,5,6,7,8,9,10],"56Ek4feL/1A8mZgIKQWEqg==":[12],"sNl1hra39QmFk9HwvXETJA==":[12]}

  const userId=localStorage.getItem("user_id") 

  const defaultTemplateIds = [11];

  // const  dynamicEventData=dynamicEventDataJson.map(template => {
  //     if (templateUserIDs[userId]?.includes(template.templateId) ) {
  //       return template;
  //     } else {
  //     }
  //   }).filter(Boolean); 

    const dynamicEventData = dynamicEventDataJson.filter(template => {
      if (templateUserIDs[userId]?.includes(template.templateId)) {
        return true; 
      } else if (!templateUserIDs.hasOwnProperty(userId) && defaultTemplateIds.includes(template.templateId)) {
        return true;
      } else {
        return false;
      }
    });

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
    1921: { items: 5 },
  };
  const syncActiveIndex = ({ item }) => setActiveIndex(item);
  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
  });
  const [isFormChange, setIsFormChange] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const currentIndex = useRef(null);

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
  const [downloadqr, setDownloadQr] = useState(false);
  const [downloadqrSection, setDownloadQrSection] = useState(false);
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
  const [downloadType,setDownloadType]=useState("png")

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
        const index = dynamicEventData.findIndex(
          (item) => item?.templateId === chatLinkData?.templateId
        );


        if (index !== -1) {

          const filteredItem = dynamicEventData[index];
          setTemplateData(filteredItem);
    
          setActiveIndex(index);
          currentIndex.current = index
       
        } else {
          setTemplateData(dynamicEventData[0]);
          setActiveIndex(0);
          currentIndex.current = 0
        }

        setDynamicContent(chatLinkData);
        setApiData(chatLinkData);
        setFormData(chatLinkData);
        setLogo(chatLinkData?.logoImageUrl);
        setHeaderImage(chatLinkData?.headerBackgroundImage);
        setFooterImage(chatLinkData?.footerImage);
        setSecondHeaderImage(chatLinkData?.headerImage);
        setIsDataSaved(true);
      } else {
        setTemplateData(dynamicEventData[0]);
        setActiveIndex(0);
        currentIndex.current = 0
        setFormData(dynamicContent);
        setLogo(dynamicContent?.logoImageUrl);
        setHeaderImage(dynamicContent?.headerBackgroundImage);
        setFooterImage(dynamicContent?.footerImage);
        setSecondHeaderImage(chatLinkData?.headerImage);

        setIsDataSaved(false);
      }
    } catch (error) {
      setLogo(dynamicContent?.logoImageUrl);
      setHeaderImage(dynamicContent?.headerBackgroundImage);
      setFooterImage(dynamicContent?.footerImage);
      setSecondHeaderImage(dynamicContent?.headerImage);

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

        if (isSelectedName === "logoImageUrl") {
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
        if (isSelectedName === "headerBackgroundImage") {
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

        if (isSelectedName === "headerImage") {
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
        if (isSelectedName === "footerImage") {
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
  const templateClicked = (template, e, index = 0) => {
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
        // if (template?.templateId == 3) {
        //   setSecondHeaderImage(
        //     apiData?.headerImage ? apiData?.headerImage : ""
        //   );
        // }
        // if (template?.templateId == 3) {
        //   setFooterImage(
        //     apiData?.footerImage ? apiData?.footerImage : ""
        //   );
        // }
        if (
          template?.templateId == 4 ||
          template?.templateId == 5 ||
          template?.templateId == 6 ||
          template?.templateId == 7 || 
          template?.templateId == 8 ||  
          template?.templateId == 9 ||
          template?.templateId == 10
        ) {
          setSecondHeaderImage(
            apiData?.headerImage ? apiData?.headerImage : ""
          );
          setFooterImage(apiData?.footerImage ? apiData?.footerImage : "");
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
        // if (template?.templateId == 3) {
        //   setSecondHeaderImage(
        //     updatedBody?.fieldData?.headerImage?.value
        //       ? updatedBody?.fieldData?.headerImage?.value
        //       : ""
        //   );
        // }
        // if (template?.templateId == 3) {
        //   setFooterImage(
        //     updatedBody?.fieldData?.footerImage?.value
        //       ? updatedBody?.fieldData?.footerImage?.value
        //       : ""
        //   );
        // }
        if (
          template?.templateId == 4 ||
          template?.templateId == 5 ||
          template?.templateId == 6 ||
          template?.templateId == 7 || 
          template?.templateId == 8 ||  
          template?.templateId == 9 ||
          template?.templateId == 10
        ) {
          setSecondHeaderImage(
            updatedBody?.fieldData?.headerImage?.value
              ? updatedBody?.fieldData?.headerImage?.value
              : ""
          );
          setFooterImage(
            updatedBody?.fieldData?.footerImage?.value
              ? updatedBody?.fieldData?.footerImage?.value
              : ""
          );
        }
      }

      setActiveIndex(index);
    }
  };

  const generateQRUrl = () => {
    // Generate the QR code URL based on your logic
    const url =  eventData?.eventId > 402
    ? `https://events.docintel.app/event?evnt=${eventData?.eventCode}`
    : `${window.location.host}/event?evnt=${eventData?.eventCode}`; 
    return url;
  };

  const handleDownload = async () => {
    if (!isDataSaved) {
      return;
    }
    const qrUrl = generateQRUrl();

    try {
      let fileName= (eventData?.eventTitle).replaceAll(" ","_")
      const canvas = await QRCode.toCanvas(qrUrl, { width: 300 });
 if(downloadType=="png"){  
      const pngUrl = canvas.toDataURL('image/png').replace(/^data:image\/[^;]/, 'data:application/octet-stream');
      
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${fileName}_ChatLink.png`; // Set the filename
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      }

      else if(downloadType=="eps"){        
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/png");
        const res = await postFormData(ENDPOINT.DOWNLOAD_EPS_FILE, { "svgCode": pngUrl },
        {
          responseType: "blob",
        }
      );
      const url = URL.createObjectURL(res?.data);    
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `${fileName}_ChatLink.eps`;;     
      // downloadLink.style.display = 'none';    
      document.body.appendChild(downloadLink);      
      downloadLink.click();     
      URL.revokeObjectURL(url);
      document.body.removeChild(downloadLink);

      }
    } catch (error) {
      console.error('Error generating QR code:', error);
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
           { currentIndex.current !=null &&   <div className="top-right-action">
                <div className="d-flex justify-content-end header_btns">
                <div className={`dropdown qr-download ${
                      !isDataSaved ? "disabled" : ""
                    }`}>
                    <button
                      className="btn btn-primary dropdown"
                      type="button"
                      onClick={handleDownload}
                    >
                      Download QR

                    </button>
                    </div>
                  {/* <div className="dropdown qr-download">
                    <button
                      className="btn btn-primary dropdown"
                      type="button"
                      onClick={() => setDownloadQr((downloadqr) => !downloadqr)}
                    >
                      Download QR
                      
                    </button>
                    {downloadqr && (
                      <div
                        className="dropdown-menu filter-options"
                        aria-labelledby="dropdownMenuButton2"
                      >
                        <ul>
                          <li>
                            <label className="select-multiple-option">
                            <input
                              type="radio"
                              id="qr-code"
                              name="qr-code"
                              onChange={()=>setDownloadType('png')}
                            />Download PNG
                            <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="select-multiple-option">
                            <input
                              type="radio"
                              id="qr-code1"
                              name="qr-code"
                              onChange={()=>setDownloadType('eps')}
                              
                            />Download EPS
                            <span className="checkmark"></span>
                            </label>
                          </li>
                        </ul>
                        <div className="filter-footer justify-content-end">
                          <button
                            className="btn btn-primary btn-filled"
                            onClick={handleDownload}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    )}
                  </div>  */}
                  <a
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
              </div>}
            </div>
            <section className="select-mail-template library-consent create-change-content">
              <div className="page-title">
                <h6>Select Template</h6>
              </div>

              {(dynamicEventData?.length && currentIndex.current !=null) && <AliceCarousel
                ref={aliceCarouselRef}
                mouseTracking
                //disableButtonsControls
                items={dynamicEventData?.length}
                disableDotsControls
                activeIndex={activeIndex}
                responsive={responsive}
                onInitialized={()=>{
                  aliceCarouselRef.current?.slideTo(currentIndex.current)
                }}
              >
                { dynamicEventData.map((template, index) => {
                  return (
                    <>
                      <div
                        className="item"
                        onClick={(e) => templateClicked(template, e, index)}
                      >
                        <img
                          key={template?.templateId}
                          id={`template_${template?.templateId}`}
                          src={`${path_image}/chatTemplate${template?.templateId}.png`}
                          alt=""
                          className={
                            typeof activeIndex !== "undefined" &&
                            activeIndex == index
                              ? "select_mm"
                              : "nothing"
                          }
                        />
                        <p>{template?.templateName}</p>
                      </div>
                    </>
                  );
                })}
              </AliceCarousel>}
            </section>

            <div className="register-page create-change-content chatlink">
              <div className="row ">
                <div className="col-md-6 col-sm-6">
                  <div className="chatlink-left">
                    {currentIndex.current !=null && Object.entries(templateData?.fieldData).map(
                      ([field, value]) => (
                        <div
                          key={field}
                          className="form-group d-flex align-items-center"
                        >
                          <label> {value.title}</label>

                          {value.type === "file" && field === "logoImageUrl" ? (
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
                          ) : value.type === "file" &&
                            field === "headerBackgroundImage" ? (
                            <>
                              <div className="header-section">
                                {!headerImage && (
                                  <>
                                    <div>
                                      <h5>Upload your file</h5>
                                    </div>
                                    <Button
                                      className="upload-img"
                                      onClick={(e) =>
                                        handleFileSelect(
                                          e,
                                          "headerBackgroundImage"
                                        )
                                      }
                                    >
                                      Choose Your File
                                    </Button>
                                  </>
                                )}

                                <img className="header-img" src={headerImage} />

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
                                          handleFileSelect(
                                            e,
                                            "headerBackgroundImage"
                                          );
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
                                (Recommended size 750 x 180)
                                {/* { formData?.templateId === 8 ?  '(Recommended size 300 x 140)' :'(Recommended size 750 x 180)'} */}
                              </span>
                            </>
                          ) : value.type === "file" &&
                            field === "headerImage" ? (
                            <>
                              <div className="header-section">
                                {!secondHeaderImage && (
                                  <>
                                    <div>
                                      <h5>Upload your file</h5>
                                    </div>
                                    <Button
                                      className="upload-img"
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
                                  src={secondHeaderImage}
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
                              (Recommended size 750 x 180)
                              {/* { formData?.templateId === 8 ? '(Recommended size 300 x 140)' : '(Recommended size 750 x 180)'} */}
                              </span>
                            </>
                          ) : value.type === "file" &&
                            field === "footerImage" ? (
                            <>
                              <div className="header-section">
                                {!footerImage && (
                                  <>
                                    <div>
                                      <h5>Upload your file</h5>
                                    </div>
                                    <Button
                                      className="upload-img"
                                      onClick={(e) =>
                                        handleFileSelect(e, "footerImage")
                                      }
                                    >
                                      Choose Your File
                                    </Button>
                                  </>
                                )}

                                <img className="header-img" src={footerImage} />

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
                                (Recommended size 190 x 100)
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
                                  defaultValue={dynamicContent[field]}
                                  value={dynamicContent[field]}
                                />
                              </div>
                            </>
                          ) : value.type == "textArea" ? (
                            <>
                              <textArea
                                type={value.type}
                                onChange={(e) =>
                                  handleDynamicChange(field, e.target.value)
                                }
                                className="form-control"
                                value={dynamicContent[field]}
                              >
                                {dynamicContent[field]}
                              </textArea>
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
                      )
                    )}
                 {currentIndex.current !=null &&  <Button className="save-btn" onClick={handleSubmitForm}>
                      Save
                    </Button>}
                  </div>
                </div>

                <div className="col-md-6 col-sm-6">
                  <div className="webinar-popup">
                    <div className="loader" id="custom_loader">
                      <div className="loader_show">
                        <span className="loader-view"> </span>
                      </div>
                    </div>
                    {currentIndex.current !=null && <div className={`octa_events`}>
                      <div className="question-block">
                        <div className="header-logo">
                          <div>
                            <img
                              src={
                                formData?.logoImageUrl
                                // : path_image + "FVIII_logo.png"
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="question-block-form">
                          <div className="log-inner">
                            {formData?.templateId == 2 ? (
                              <div
                                className="head-sec template2"
                                style={{
                                  backgroundImage: `url(${formData?.headerBackgroundImage})`,
                                }}
                              ></div>
                            ) : formData?.templateId == 4 ||
                              formData?.templateId == 5 ||
                              formData?.templateId == 6 ||
                              formData?.templateId === 7 ||  
                              formData?.templateId === 8 ||  
                              formData?.templateId === 9 || 
                              formData?.templateId === 10
                              ? (
                              <>
                                <div
                                  className="head-sec template2"
                                  style={{
                                    backgroundImage: `url(${formData?.headerImage})`,
                                  }} 
                                  
                                ></div>
                                <div className="event_title">
                                  <h2
                                    className="top-title"
                                    style={{ color: formData?.textColor }}
                                    dangerouslySetInnerHTML={{
                                      __html: formData?.formHeading
                                        ? formData?.formHeading
                                        : "Type your question here!",
                                    }}
                                  />
                                </div>
                              </>
                            )
                            // :  formData?.templateId === 8 ? (
                            //   <>
                            //     <div
                            //       className="head-sec template2 isth"
                            //     > <img
                            //     src={
                            //       formData?.headerImage
                            //         ? formData?.headerImage
                            //         : ""
                            //     }
                             
                            //   /></div>
                            //     <div className="event_title">
                            //       <h2
                            //         className="top-title"
                            //         style={{ color: formData?.textColor }}
                            //         dangerouslySetInnerHTML={{
                            //           __html: formData?.formHeading
                            //             ? formData?.formHeading
                            //             : "Type your question here!",
                            //         }}
                            //       />
                            //     </div>
                            //   </>
                            // )
                            : (
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
                                <label
                                  htmlFor="fname"
                                  className="form-label"
                                  style={{ color: formData?.textColor }}
                                  dangerouslySetInnerHTML={{
                                    __html: formData?.nameLabel,
                                  }}
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
                                    __html: formData?.questionLabel,
                                  }}
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
                          {formData?.templateId === 4 ||
                          formData?.templateId === 5 ||
                          formData?.templateId === 6 ||
                          formData?.templateId === 7 || 
                          formData?.templateId === 8 || 
                          formData?.templateId === 9 ||
                          formData?.templateId === 10 ? (
                            <>
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
                                    __html: formData?.footerText,
                                  }}
                                />
                              </div>
                            </>
                          ) 
                    //       :
                    //       formData?.templateId === 8 ? (
                    //       <>
                    //       <div className="copy-right-bottom-text">
                    //      <p
                    //        style={{ color: formData?.textColor }}
                    //        dangerouslySetInnerHTML={{
                    //          __html: formData?.footerTextOne,
                    //        }}
                    //      />
                    //    </div>
                    //    <div className="copy-right-bottom-text">
                    //             <p
                    //               style={{ color: formData?.textColor }}
                    //               dangerouslySetInnerHTML={{
                    //                 __html: formData?.footerText,
                    //               }}
                    //             />
                    //           </div>

                    //    </>
                       
                    //  )
                     :
                          
                          (
                            <div className="copy-right-bottom-text">
                              <p
                                style={{ color: formData?.textColor }}
                                dangerouslySetInnerHTML={{
                                  __html: formData?.footerText,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>}
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
