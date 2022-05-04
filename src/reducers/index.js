import React from "react";
import { combineReducers } from "redux";

const getListId = (listId = null, action) => {
  if (action.type === "LIST_ID") {
    return action.payload;
  }
  return listId;
};

const getUpdatedData = (data = null, action) => {
  if (action.type === "GET_UPDATED_DATA") {
    return action.payload;
  }
  return data;
};

const getEmailData = (emailData = null, action) => {
  if (action.type === "GET_EMAIL_DATA") {
    return action.payload;
  }
  return emailData;
};

const getSelectedSmartListData = (smartListData = null, action) => {
  if (action.type === "GET_SMART_LIST_DATA") {
    return action.payload;
  }
  return smartListData;
};

const getCampaignId = (uniqueId = null, action) => {
  if (action.type === "GET_UNIQUE_ID") {
    return action.payload;
  }

  return uniqueId;
};

const getDraftData = (draftData = null, action) => {
  if (action.type === "GET_DRAFT_DATA") {
    return action.payload;
  }
  return draftData;
};

export default combineReducers({
  listId: getListId,
  updatedData: getUpdatedData,
  getEmailData: getEmailData,
  getSelectedSmartListData: getSelectedSmartListData,
  getCampaignId: getCampaignId,
  getDraftData: getDraftData,
});
