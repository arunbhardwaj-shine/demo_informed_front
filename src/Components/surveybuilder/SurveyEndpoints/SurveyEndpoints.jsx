
export const surveyEndpoints = {
    // Survey List EndPoints 
    FETCH_SURVEY_DATA: "/survey/fetch-survey-data",
    DUPLICATE_SURVEY: "/survey/duplicate-survey",
    FETCH_SURVEY_SUBLINK: "/survey/fetch-survey-sublink",
    DELETE_ALL_DETAILS: "/survey/delete-all-details",

    // Setup Page Data
    GET_CREATOR: "/survey/get-creator",
    // FETCH_ALL_TAGS: "/survey/fetch-All-tags",
    FETCH_ALL_TOPICS: "/library/get-topics",
    INSERT_SURVEY_CREATOR: "/survey/insert-survey-creator",
    FETCH_SAVED_TEMPLATE: "/survey/fetch-saved-template",
    IMAGE_UPLOAD_AWS: "/survey/image-uploadaws",
    DELETE_SURVEY_TEMPLATE: "/survey/delete-survey-template",
    INSERT_CUSTOM_TEMPLATE: "/survey/insert-custom-template",

    // Build Survey Data
    DELETE_SURVEY_QUESTION: "/survey/delete-survey-question",
    FETCH_QUESTION: "/survey/fetch-question",
    DELETE_OPTION: "/survey/delete-option",

    // Sublink Listing Page 
    // FETCH_SURVEY_SUBLINK_2: "/survey/fetch-survey-sublink", // Duplicate
    FETCH_ALL_SURVEY_TITLE: "/survey/fetch-all-survey-title",
    INSERT_SUBLINK_INFORMATION: "/survey/insert-sublink-information",
    // FETCH_SURVEY_DATA_2: "/survey/fetch-survey-data", // Duplicate

    // Survey Analytics
    SURVEY_ANALYTIC_DETAILS: "/survey/survey-analytic-details",
    QNS_ANALYTICS: "/survey/qns-analytics",
    SURVEY_TAKERS_OVER_TIME: "/survey/survey-takers-over-time",
    ANALYTIC_QNS_DETAIL: "/survey/analytic-qns-detail",
    SURVEY_TAKERS_STATUS: "/survey/survey-takers-status",
    GET_DROPOFF_RESPONSES: "/survey/get-dropoff-responses",
    TAKERS_RESPONSES_DETAIL: "/survey/takers-responses-detail",
    DOWNLOAD_ALL_EXCEL_SHEET:"/survey/get-all-excel-data",
    GET_SURVEY_SUBLINK_TAGS:"/survey/get-survey-sublink-tags",
   // ADD_SURVEY_SUBLINK_TAGS:"/survey/add-survey-sublink-tag",
    UPDATE_SURVEY_SUBLINK_TAGS:"/survey/update-sublink-tag",
    UPDATE_SURVEY_TOPICS:"/survey/update-survey-topics",

    // Last Publish Page Endpoints
    INSERT_SURVEY_DATA: "/survey/insert-survey-data",
    INSERT_TMPLATE_DATA: "/survey/insert-custom-template", // Duplicate
    SURVEY_CONFIG_INFORMATION: "/survey/survey-config-information",
    INSERT_QUESTION_DETAIL: "/survey/insert-question-detail",
    INSERT_FINAL_INFORMATION: "/survey/insert-Final-information",
    SURVEY_DRAFT_INFORMATION: "/survey/survey-draft-information",
    UPDATE_LIVE_FLAG: "/survey/update-live-flag",
    // DELETE_SURVEY_QUESTION_2: "/survey/delete-survey-question", // Duplicate

    ALAND_ACTIVITY:"/survey/user-activity",
    FETCH_IMAGE:"/auth/fetch-image?url="
    





};
