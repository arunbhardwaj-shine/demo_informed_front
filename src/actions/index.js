import React from "react";
export const getListId = (listId) => {
  return {
    type: "LIST_ID",
    payload: listId,
  };
};

export const getUpdatedData = (data) => {
  return {
    type: "GET_UPDATED_DATA",
    payload: data,
  };
};

export const getEmailData = (data) => {
  return {
    type: "GET_EMAIL_DATA",
    payload: data,
  };
};

export const getSelectedSmartListData = (data) => {
  return {
    type: "GET_SMART_LIST_DATA",
    payload: data,
  };
};

export const getCampaignId = (data) => {
  return {
    type: "GET_UNIQUE_ID",
    payload: data,
  };
};

export const getDraftData = (data) => {
  return {
    type: "GET_DRAFT_DATA",
    payload: data,
  };
};

export const getSelected = (data) => {
  return {
    type: "GET_SELECTED",
    payload: data,
  };
};

export const getTestingSelected = (data) => {
  return {
    type: "GET_TESTING_SELECTED",
    payload: data,
  };
};

export const getSearched=(data)=>{
  return {
    type: "GET_SEARCHED",
    payload: data,
  };
}


export const getWebinarEmailData = (data) => {
  return {
    type: "GET_WEBINAR_EMAIL_DATA",
    payload: data,
  };
};

export const getWebinarSelectedSmartListData = (data) => {
  return {
    type: "GET_WEBINAR_SMART_LIST_DATA",
    payload: data,
  };
};

export const getWebinarDraftData = (data) => {
  return {
    type: "GET_WEBINAR_DRAFT_DATA",
    payload: data,
  };
};

export const getWebinarCampaignId = (data) => {
  return {
    type: "GET_WEBINAR_UNIQUE_ID",
    payload: data,
  };
};

export const getWebinarSelected = (data) => {
  return {
    type: "GET_WEBINAR_SELECTED",
    payload: data,
  };
};

