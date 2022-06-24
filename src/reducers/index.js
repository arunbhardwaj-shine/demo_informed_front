import React from "react";
import { combineReducers } from "redux";

const getListId = (listId = JSON.parse(localStorage.getItem('getListId')), action) => {
  if (action.type === "LIST_ID") {
    // console.log("helllo in 1")
    localStorage.setItem('getListId', JSON.stringify(action.payload));
    return action.payload;
  }
  return listId;
};

const getUpdatedData = (data = JSON.parse(localStorage.getItem('getUpdatedData')), action) => {
  if (action.type === "GET_UPDATED_DATA") {
    // console.log("helllo in 2")
    localStorage.setItem('getUpdatedData', JSON.stringify(action.payload));
    return action.payload;
  }
  return data;
};

const getEmailData = (emailData = JSON.parse(localStorage.getItem('getEmailData')), action) => {
  if (action.type === "GET_EMAIL_DATA") {
    // console.log("helllo in 3")
    localStorage.setItem('getEmailData', JSON.stringify(action.payload));
    return action.payload;
  }
  return emailData;
};

const getSelectedSmartListData = (smartListData = JSON.parse(localStorage.getItem('getSelectedSmartListData')), action) => {
  if (action.type === "GET_SMART_LIST_DATA") {
    // console.log("helllo in 4")
    localStorage.setItem('getSelectedSmartListData', JSON.stringify(action.payload));
    return action.payload;
  }
  return smartListData;
};

const getCampaignId = (uniqueId = JSON.parse(localStorage.getItem('getCampaignId')), action) => {
  if (action.type === "GET_UNIQUE_ID") {
    // console.log("helllo in 5")
    localStorage.setItem('getCampaignId', JSON.stringify(action.payload));
    return action.payload;
  }

  return uniqueId;
};

const getDraftData = (draftData = JSON.parse(localStorage.getItem('getDraftData')), action) => {
  if (action.type === "GET_DRAFT_DATA") {
    // console.log("helllo in 6")
    localStorage.setItem('getDraftData', JSON.stringify(action.payload));
    return action.payload;
  }
  return draftData;
};

const getSelected =(selected=JSON.parse(localStorage.getItem('getSelected')),action) => {
  if (action.type === "GET_SELECTED") {
    // console.log("helllo in 7")
    // console.log(action.payload)
    localStorage.setItem('getSelected', JSON.stringify(action.payload));
    return action.payload;
  }
  return selected;

}

export default combineReducers({
  listId: getListId,
  updatedData: getUpdatedData,
  getEmailData: getEmailData,
  getSelectedSmartListData: getSelectedSmartListData,
  getCampaignId: getCampaignId,
  getDraftData: getDraftData,
  getSelected: getSelected
});
