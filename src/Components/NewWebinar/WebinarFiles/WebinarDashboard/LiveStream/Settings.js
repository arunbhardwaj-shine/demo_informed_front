import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { getData, postData } from "../../../../../axios/apiHelper";
import { toast } from "react-toastify";
import { loader } from "../../../../../loader";
import Select from "react-select";

const Settings = () => {
  const validExtensions = ["png", "jpeg", "jpg"];
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const { eventIdContext, handleEventId } = useSidebar();
  const [liveStatus, setLiveStatus] = useState(0);
  const [askQuestion, setAskQuestion] = useState(0);
  const [streamUrl, setStreamUrl] = useState("");
  const [eventId, setEventId] = useState(
    eventIdContext?.eventId
      ? eventIdContext?.eventId
      : localStorageEvent?.eventId
  );

  const posterOptions = [
    {
      label: "Thank you message without speaker image",
      value:
        "https://docintel.s3.eu-west-1.amazonaws.com/image/CP_Brand-thanks1-banner-min.jpg",
    },
    {
      label: "Thank you message with speaker image",
      value:
        "https://docintel.s3.eu-west-1.amazonaws.com/image/CP_Brand-thanks-banner-jill.jpg",
    },
    {
      label: "Event delayed",
      value:
        "https://docintel.s3.eu-west-1.amazonaws.com/image/CP_Banner-Unexpected-Reason.jpg",
    },
    {
      label: "Stay tuned",
      value:
        "https://docintel.s3.eu-west-1.amazonaws.com/image/CP_Brand-video-banner-jill.jpg",
    },
    {
      label: "Technical difficulties",
      value:
        "https://docintel.s3.eu-west-1.amazonaws.com/image/CP_Banner-Technical-difficulties.jpg",
    },
    { label: "Custom message", value: "" },
  ];

  const [selectedPosterOption, setSelectedPosterOption] = useState(
    posterOptions[0]
  );

  const [posterUrl, setPosterUrl] = useState(posterOptions[0].value);
  const [poster, setPoster] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  useEffect(() => {
    // if(!eventIdContext){
    //   handleEventId(localStorageEvent)
    // }
    fetchSettings();
  }, []);

  // const fetchSettings = async () => {
  //   try {
  //     loader("show");
  //     const response = await getData(
  //       `${ENDPOINT.WEBINAR_SETTINGS_GET}/${eventId}`
  //     );
  //     const { live_status, ask_question, poster_url, stream_url } =
  //       response?.data?.data;
  //     setLiveStatus(live_status);
  //     setAskQuestion(ask_question);
  //     setPosterUrl(poster_url);
  //     console.log(posterOptions,'options')
  //     setStreamUrl(stream_url);
  //     // console.log(response?.data?.data, "===>response");
  //   } catch (error) {
  //     console.error("Error fetching settings:", error);
  //   } finally {
  //     loader("hide");
  //   }
  // };

  const fetchSettings = async () => {
    try {
      loader("show");
      const response = await getData(
        `${ENDPOINT.WEBINAR_SETTINGS_GET}/${eventId}`
      );
      const { live_status, ask_question, poster_url, stream_url } =
        response?.data?.data;
      setLiveStatus(live_status);
      setAskQuestion(ask_question);

      if (poster_url != "") {
        const foundOption = posterOptions.find(
          (option) => option.value === poster_url
        );
        if (
          typeof foundOption !== "undefined" &&
          foundOption !== "undefined" &&
          foundOption !== ""
        ) {
          setSelectedPosterOption(foundOption);
        } else {
          setSelectedPosterOption(posterOptions[posterOptions?.length - 1]);
          setUploadedImageUrl(poster_url);
        }
        setStreamUrl(stream_url);
        setPosterUrl(poster_url);
      } else {
        setSelectedPosterOption(posterOptions[0]);
        setPosterUrl(posterOptions[0]?.value);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      loader("hide");
    }
  };

  const handleSave = async () => {
    try {
      loader("show");

      if (errorMsg) {
        toast.error(errorMsg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      if (liveStatus === 2 && !streamUrl.trim()) {
        toast.error("Please filled stream url first", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      if (
        liveStatus === 3 &&
        !posterUrl.trim() &&
        !selectedPosterOption.label === "Custom message"
      ) {
        toast.error("Please filled poster url first", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      if (liveStatus === 2 && !streamUrl.startsWith("https")) {
        toast.error("Stream URL should start with 'https'", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      if (
        liveStatus === 3 &&
        !posterUrl.startsWith("https") &&
        !selectedPosterOption.label === "Custom message"
      ) {
        toast.error("Poster URL should start with 'https'", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const payload = {
        eventId: eventId,
        live_status: liveStatus,
        ask_question: askQuestion,
        stream_url: liveStatus === 2 ? streamUrl : "",
        poster_url:
          liveStatus === 3
            ? selectedPosterOption.label === "Custom message"
              ? uploadedImageUrl
              : posterUrl
            : "",
      };

      const response = await postData(
        ENDPOINT.WEBINAR_SETTINGS_UPDATE,
        payload
      );
      toast.success("Data Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error updating settings:", error);
    } finally {
      loader("hide");
    }
  };

  const handleFileSelect = (e, isSelectedName) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";
    fileInput.accept = ".png, .jpeg, .jpg";
    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];

      if (file) {
        const extension = file.name.split(".").pop().toLowerCase();

        if (!validExtensions.includes(extension)) {
          if (isSelectedName === "posterImage") {
            setErrorMsg(
              `Invalid file extension of image. Please select a valid extension file.`
            );
          }
        } else {
          setErrorMsg("");
        }
        if (isSelectedName === "posterImage") {
          setPoster(URL.createObjectURL(file)); 
        }
        try {
          const uploadedImageUrl = await uploadImageToServer(file);
          setUploadedImageUrl(uploadedImageUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
        } 
      }
    });
    fileInput.click();
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

  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  return (
    <>
      <Col className="right-sidebar custom-change">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <div className="custom-container">
          <div className="row">
            <div className="top-header regi-web sticky">
              <div className="page-title">
                <h2>Settings</h2>
              </div>
              <Button className="save-btn" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
          <div className="page-title event-heading">
            <h4>Event Status:</h4>
          </div>

          <div className="settings-card">
            <div className="settings-status">
              <Form.Check
                inline
                type="radio"
                checked={liveStatus === 0}
                // onChange={() => setLiveStatus(0)}
                onChange={() => {
                  setLiveStatus(0);
                }}
              />
              <div className="event-status-img">
                <img src={path_image + "offline-status.png"} alt="" />
              </div>
              <div className="event-status-msg">
                <p className="event-status-set">Offline</p>
                <p>Not live yet. A video or image is shown while offline.</p>
              </div>
            </div>
            <div className="settings-status">
              <Form.Check
                inline
                type="radio"
                checked={liveStatus === 1}
                onChange={() => {
                  setLiveStatus(1);
                }}
              />
              <div className="event-status-img">
                <img src={path_image + "start-time.png"} alt="" />
              </div>
              <div className="event-status-msg">
                <p className="event-status-set">Start Timer</p>
                <p>Activate a timer to count down to the live stream starts.</p>
              </div>
            </div>
            <div className="settings-status">
              <Form.Check
                inline
                type="radio"
                checked={liveStatus === 2}
                onChange={() => {
                  setLiveStatus(2);
                }}
              />
              <div className="event-status-img">
                <img src={path_image + "live-status.png"} alt="" />
              </div>

              <div className="event-status-msg">
                <p className="event-status-set">Start Live Streaming</p>
                <p>Click here to start the streaming.</p>
              </div>
            </div>
            <div className="settings-status">
              <Form.Check
                inline
                type="radio"
                checked={liveStatus === 3}
                onChange={() => {
                  setLiveStatus(3);
                }}
              />
              <div className="event-status-img">
                <img src={path_image + "message-to attendeed.png"} alt="" />
              </div>
              <div className="event-status-msg">
                <p className="event-status-set">Set Poster</p>
                <p>Stop the live stream and place an image message.</p>
              </div>
            </div>
          </div>

          {/* <div className="ask-questions">
            <h5>Ask live questions: </h5>
            <div className="yes">
            <Form.Check
              inline
              type="radio"
              checked={askQuestion === 1}
              onChange={() => setAskQuestion(1)}
            />
            Yes
            </div>
             <div className="no">
            <Form.Check
              inline
              type="radio"
              checked={askQuestion === 0}
              onChange={() => setAskQuestion(0)}
            />
            No
          </div>
          </div> */}

          {liveStatus === 2 && (
            <div className="stream-url">
              <Form.Group>
                <Form.Label>Stream URL:</Form.Label>
                <Form.Control
                  type="text"
                  value={streamUrl}
                  onChange={(e) => setStreamUrl(e.target.value)}
                />
              </Form.Group>
            </div>
          )}

          {/* {liveStatus === 3 && (
            <div className="poster-url">
            <Form.Group>
              <Form.Label>Poster URL:</Form.Label>
              <Form.Control
                type="text"
                value={posterUrl}
                onChange={(e) => setPosterUrl(e.target.value)}
              />
            </Form.Group>
            </div>
          )} */}

          {liveStatus === 3 && (
            <div className="poster-url">
              <Form.Group className="poster-url-detail">
                <Form.Label>Poster Option:</Form.Label>
                <Select
                  className="dropdown-basic-button split-button-dropup"
                  options={posterOptions.map((option) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                  value={selectedPosterOption}
                  onChange={(selectedOption) => {
                    setSelectedPosterOption(selectedOption);

                    if (selectedOption?.label == "Custom message") {
                      // setUploadedImageUrl(uploadedImageUrl);
                    } else {
                      setPosterUrl(
                        posterOptions.find(
                          (option) => option.label === selectedOption.label
                        )?.value || ""
                      );
                    }
                  }}
                />
              </Form.Group>

              {!(selectedPosterOption?.label === "Custom message") && (
                <Form.Group className="poster-url-detail">
                  <Form.Label>Poster URL:</Form.Label>
                  <Form.Control type="text" value={posterUrl} />
                </Form.Group>
              )}

              {selectedPosterOption?.label === "Custom message" && (
                <>
                 

                  <div className="form-group d-flex align-items-center custom-poster-added">
                 
                    <div className="custom-poster">
                    {!(poster || uploadedImageUrl)  ? (
                        <h5>Upload your poster</h5>
                    ) : null}

                      <img
                        className="header-img"
                        src={poster || uploadedImageUrl}
                      />
                    </div>
                     <Button className="upload-img" 
                  // onClick={handleFileSelect}
                   onClick={(e) => handleFileSelect(e, "posterImage")}>
                    Choose Your File
                  </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Col>
    </>
  );
};

export default Settings;
