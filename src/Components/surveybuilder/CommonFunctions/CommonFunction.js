import axios from "axios";
import { loader } from "../../../loader";
import { toast } from "react-toastify";
import { useState } from "react";
import { Form } from "react-bootstrap";
import "../../../Components/assets/css/survey.scss";
import "../../../Components/assets/fonts/fonts.css";
import Select from "react-select";
import { surveyEndpoints } from "../SurveyEndpoints/SurveyEndpoints";
import { Button } from "react-bootstrap";

const {
  INSERT_SURVEY_DATA,
  INSERT_TMPLATE_DATA,
  SURVEY_CONFIG_INFORMATION,
  INSERT_QUESTION_DETAIL,
  INSERT_FINAL_INFORMATION,
  SURVEY_DRAFT_INFORMATION,
  IMAGE_UPLOAD_AWS,
  UPDATE_LIVE_FLAG,
  DELETE_SURVEY_QUESTION
} = surveyEndpoints;

const validExtensions = ["png", "jpeg", "jpg", "gif"];

export const surveyAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_KEY_NEW_SURVEY,
});


surveyAxiosInstance.interceptors.request.use(
  (req) => {
    req.timeout = 600000;
    const switch_account_detail=JSON.parse(localStorage.getItem("switch_account_detail"))
    const token=switch_account_detail &&switch_account_detail !=null && switch_account_detail!="undefined"
                ?switch_account_detail?.user_id
                :localStorage.getItem("user_id");

    const jt=switch_account_detail &&switch_account_detail !=null && switch_account_detail!="undefined"
              ?switch_account_detail?.decrypted_token
              :localStorage.getItem("decrypted_token");

    req.headers["token"] = token;
    req.headers["auth"]  = jt;
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const saveAsDraft = async (e, draft, pathname, navigate) => {
  e.preventDefault();
  let liveFlag = draft == 0 ? 0 : 1;
  const currentPagesData = JSON.parse(localStorage.getItem("getSurveyData"));
  loader("show");
  let survey_id = currentPagesData?.survey_id ? currentPagesData.survey_id : 0;
  let unique_code = currentPagesData?.unique_code
    ? currentPagesData.unique_code
    : "";
  try {
    if (currentPagesData && currentPagesData.setUpData !== undefined) {
      const body = {
        ...currentPagesData.setUpData,
        survey_id: survey_id,
        tags: JSON.stringify(currentPagesData?.setUpData?.tags),
        unique_code: unique_code,
      };

      try {
        const res = await surveyAxiosInstance.post(
          INSERT_SURVEY_DATA,
          body
        );

        if (res.status === 200) {
          unique_code = res?.data?.data?.unique_code;
          survey_id = res?.data?.data?.survey_id;
        }
      } catch (error) {
        loader("hide");
        toast.error("Something went wrong");
        return;
      }
    }

    if (
      currentPagesData &&
      survey_id !== 0 &&
      currentPagesData.formBuilderData !== undefined
    ) {
      try {
        const body = {
          ...currentPagesData.formBuilderData,
          survey_id: survey_id,
          raw_html: 0,
          template_status: 0,
        };
        const response = await surveyAxiosInstance.post(
          INSERT_TMPLATE_DATA,
          body
        );
      } catch (error) {
        loader("hide");
        toast.error("Something went wrong");
        return;
      }
    }

    if (
      currentPagesData &&
      survey_id !== 0 &&
      currentPagesData.surveyConfigData !== undefined &&
      currentPagesData.surveyConfigData != ""
    ) {
      const body = { ...currentPagesData.surveyConfigData, survey_id };
      try {
        const response = await surveyAxiosInstance.post(
          SURVEY_CONFIG_INFORMATION,
          body
        );
      } catch (error) {
        loader("hide");
        toast.error("Something went wrong");
        return;
      }
    }

    if (
      currentPagesData &&
      survey_id !== 0 &&
      currentPagesData.question_data !== undefined
    ) {
      const data = currentPagesData.question_data.map((item) => {
        return { ...item, survey_id: survey_id };
      });
      const body = data;

      try {
        const response = await surveyAxiosInstance.post(
          INSERT_QUESTION_DETAIL,
          body
        );
      } catch (error) {
        loader("hide");
        toast.error("Something went wrong");
        return;
      }
    }

    if (
      currentPagesData &&
      survey_id !== 0 &&
      currentPagesData.thanksPageData !== undefined &&
      currentPagesData.thanksPageData !== ""
    ) {
      const body = { ...currentPagesData.thanksPageData, survey_id };

      try {
        const response = await surveyAxiosInstance.post(
          INSERT_FINAL_INFORMATION,
          body
        );
      } catch (error) {
        loader("hide");
        toast.error("Something went wrong");
        return;
      }
    }

    const liveStatus = await updateLiveFlag(survey_id, liveFlag);
    if (liveStatus !== true) {
      return;
    }

    const body = {
      is_draft: draft,
      route_location: pathname,
      survey_id: survey_id,
    };

    const response = await surveyAxiosInstance.post(
      SURVEY_DRAFT_INFORMATION,
      body
    );

    if (response.status === 200) {
      navigate("/survey/survey-list");
    }
  } catch (error) {
    toast.error("Something went wrong");
    return;
  } finally {
    loader("hide");
  }
};

export const uploadImageToServer = async (file, fileInputRef) => {

  if (file) {
    try {
     
      const extension = file.name.split(".").pop().toLowerCase();
      if (!validExtensions.includes(extension)) {
        throw new Error(
          "Invalid file extension. Please select a valid extension file."
        );
      }
      const formData = new FormData();
      formData.append("file", file);
       
      const res = await surveyAxiosInstance.post(
        IMAGE_UPLOAD_AWS,
        formData
      );
      if (fileInputRef && fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      if (res.status === 200) {
        
        return res.data.data;
      }
   
    } catch (error) {
       
      toast.error("Something went wrong");
    }
  }
};

export const updateLiveFlag = async (survey_id, flag) => {
  const body = { survey_id: survey_id, status: flag };
  try {
    const response = await surveyAxiosInstance.post(
      UPDATE_LIVE_FLAG,
      body
    );
    if(response.status === 200){
      loader("hide");
      return true;
    }
    loader("hide");

  } catch (error) {
    loader("hide");
    toast.error("Something went wrong");
    return;
  }
};

export const SurveyLiveButton = ({
  survey_id,
  liveFlagValue,
  updateLiveFlag,
  fetchSurveyListing,
}) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [isChecked, setIsChecked] = useState(liveFlagValue === 1);

  const handleLiveToogle = async (e, survey_id) => {
    e.preventDefault();
    setIsChecked(!isChecked);
    let status = isChecked ? 2 : 1;
    await updateLiveFlag(survey_id, status);
    await fetchSurveyListing();
  };
  return (
    <>
      {" "}
      <p className="option-heading">
        Status: <img src={path_image + "info_circle_icon.svg"} alt="" />
      </p>
      <div className="form-switch">
        {/* <input type="checkbox" id="custom-switch" className="form-check-input"/> */}
        <span>Completed</span>
        <Form.Check
          inline
          label="Live"
          name="group1"
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleLiveToogle(e, survey_id)}
        />
      </div>
    </>
  );
};

export const SublinkHandler = ({
  handleCopy,
  setDownloadLink,
  sublinkoptions,
  survey_id,
}) => {
  const [selectedSublinkId, setSelectedSublinkId] = useState();

  const onSublinkChange = (selectedOption) => {
    setSelectedSublinkId(selectedOption ? selectedOption.value : null);
  };

  return (
    <>
      <div className="data-main-box change-tab-main-box tab-panel">
        <ul className="tab-mail-list data change">
          <li>
            <h6 className="tab-content-title">SubLinks</h6>
            <div className="select-dropdown-wrapper">
              <div className="select">
                <Select
                  aria-label="SSelect Sublink"
                  className="dropdown-basic-button split-button-dropup"
                  name="surveyCreator"
                  placeholder="Select Sublink"
                  onChange={onSublinkChange}
                  options={sublinkoptions}
                  value={sublinkoptions.find(
                    (option) => option.value === selectedSublinkId
                  )}
                />
                <Button
                  onClick={() => handleCopy(survey_id, selectedSublinkId)}
                >
                  Copy
                </Button>
              </div>
            </div>
          </li>
          <li>
            <h6 className="tab-content-title">QR Codes</h6>
            <div className="select-dropdown-wrapper">
              <div className="select">
                <Select
                  aria-label="Select Sublink"
                  className="dropdown-basic-button split-button-dropup"
                  name="surveyCreator"
                  placeholder="Select Sublink"
                  onChange={onSublinkChange}
                  options={sublinkoptions}
                  value={sublinkoptions.find(
                    (option) => option.value === selectedSublinkId
                  )}
                />
                <Button
                  onClick={(e) => setDownloadLink(survey_id, selectedSublinkId)}
                >
                  download
                </Button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export const UpdateQuestion = async (questionId) => {
  try {
    loader("show");
    if (questionId != 0) {
      const response = surveyAxiosInstance.post(
        DELETE_SURVEY_QUESTION,
        {
          questionId,
        }
      );
    }
    // setConfirmationPopup(false)
    loader("hide");
  } catch (error) {
    loader("hide");
    toast.error("Something went wrong");
  }
};

export const analyticButtonClicked = (data, navigate, addUniqueCode) => {
 
  let item = {
    Title: data?.survey_title,
    survey_id: data?.survey_id,
    CreatedDate: data?.date,
  };
  if (addUniqueCode) {
    item = {
      ...item,
      unique_code: data?.unique_code,
    };
  } else {
    item = {
      ...item,
      unique_code: undefined,
    };
  }
  navigate("/survey/survey-analytics-detail", { state: { item } });
};

// "This function checks whether a valid user submitted the survey or if an anonymous user submitted it. based on ip "
export const ValidateIPaddress = (isIpaddress) => {
  if (/(\d{1,3}\.){3}\d{1,3}/.test(isIpaddress)) {
    return true;
  }
  return false;
};
