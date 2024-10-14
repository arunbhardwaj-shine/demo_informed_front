import axios from "axios";
import { loader } from "../../../loader";
import { toast } from "react-toastify";
import { useState } from "react";
import { Form } from "react-bootstrap";
import "../../../Components/assets/css/survey.scss";
import "../../../Components/assets/fonts/fonts.css";
import Select from "react-select";

import { Button } from "react-bootstrap";

const validExtensions = ["png", "jpeg", "jpg", "gif"];
export const surveyAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_KEY_NEW_SURVEY,
});
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
        tags: JSON.stringify(currentPagesData.setUpData.tags),
        unique_code: unique_code,
      };

      try {
        const res = await surveyAxiosInstance.post(
          "/survey/insert-survey-data",
          body
        );

        if (res) {
          unique_code = res.data.data.unique_code;
          survey_id = res.data.data.survey_id;
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
          "/survey/insert-custom-template",
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
          "/survey/survey-config-information",
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
          "/survey/insert-question-detail",
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
          "/survey/insert-Final-information",
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
      "/survey/survey-draft-information",
      body
    );

    if (response) {
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
      loader("show");
      const res = await surveyAxiosInstance.post(
        "/survey/image-uploadaws",
        formData
      );
      if (fileInputRef && fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (res) {
        loader("hide");
        return res.data.data;
      }
      loader("hide");
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  }
};

export const updateLiveFlag = async (survey_id, flag) => {
  const body = { survey_id: survey_id, status: flag };
  try {
    const response = await surveyAxiosInstance.post(
      "/survey/update-live-flag",
      body
    );

    return true;
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
        "/survey/delete-survey-question",
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
