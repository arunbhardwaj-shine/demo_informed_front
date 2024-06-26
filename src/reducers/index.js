import React from "react";
import { combineReducers } from "redux";

const getListId = (listId = JSON.parse(localStorage.getItem('getListId')), action) => {
  if (action.type === "LIST_ID") {
    localStorage.setItem('getListId', JSON.stringify(action.payload));
    return action.payload;
  }
  return listId;
};

const getUpdatedData = (data = JSON.parse(localStorage.getItem('getUpdatedData')), action) => {
  if (action.type === "GET_UPDATED_DATA") {
    localStorage.setItem('getUpdatedData', JSON.stringify(action.payload));
    return action.payload;
  }
  return data;
};

const getEmailData = (emailData = JSON.parse(localStorage.getItem('getEmailData')), action) => {
  if (action.type === "GET_EMAIL_DATA") {
    localStorage.setItem('getEmailData', JSON.stringify(action.payload));
    return action.payload;
  }
  return emailData;
};

const getSelectedSmartListData = (smartListData = JSON.parse(localStorage.getItem('getSelectedSmartListData')), action) => {
  if (action.type === "GET_SMART_LIST_DATA") {
    localStorage.setItem('getSelectedSmartListData', JSON.stringify(action.payload));
    return action.payload;
  }
  return smartListData;
};

const getCampaignId = (uniqueId = JSON.parse(localStorage.getItem('getCampaignId')), action) => {
  if (action.type === "GET_UNIQUE_ID") {
    localStorage.setItem('getCampaignId', JSON.stringify(action.payload));
    return action.payload;
  }

  return uniqueId;
};

const getDraftData = (draftData = JSON.parse(localStorage.getItem('getDraftData')), action) => {
  if (action.type === "GET_DRAFT_DATA") {
    localStorage.setItem('getDraftData', JSON.stringify(action.payload));
    return action.payload;
  }
  return draftData;
};

const getSelected =(selected=JSON.parse(localStorage.getItem('getSelected')),action) => {
  if (action.type === "GET_SELECTED") {
    localStorage.setItem('getSelected', JSON.stringify(action.payload));
    return action.payload;
  }
  return selected;

}

const getTestingSelected =(testselected=JSON.parse(localStorage.getItem('getTestSelected')),action) => {
  if (action.type === "GET_TESTING_SELECTED") {

    localStorage.setItem('getTestingSelected', JSON.stringify(action.payload));
    return action.payload;
  }
  return testselected;

}

const getSearched =(searched=JSON.parse(localStorage.getItem('getSearched')),action) => {
  if (action.type === "GET_SEARCHED") {
    localStorage.setItem('getSearched', JSON.stringify(action.payload));
    return action.payload;
  }
  return searched;

}

const getWebinarEmailData = ( webinarEmailData = JSON.parse(localStorage.getItem('getWebinarEmailData')), action) => {
  if (action.type === "GET_WEBINAR_EMAIL_DATA") {
    localStorage.setItem('getWebinarEmailData', JSON.stringify(action.payload));
    return action.payload;
  }
  return webinarEmailData;
};

const getWebinarSelectedSmartListData = (webinarSelectedSmartListData = JSON.parse(localStorage.getItem('getWebinarSelectedSmartListData')), action) => {
  if (action.type === "GET_WEBINAR_SMART_LIST_DATA") {
    localStorage.setItem('getWebinarSelectedSmartListData', JSON.stringify(action.payload));
    return action.payload;
  }
  return webinarSelectedSmartListData;
};

const getWebinarDraftData = (webinarDraftData = JSON.parse(localStorage.getItem('getWebinarDraftData')), action) => {
  if (action.type === "GET_WEBINAR_DRAFT_DATA") {
    localStorage.setItem('getWebinarDraftData', JSON.stringify(action.payload));
    return action.payload;
  }
  return webinarDraftData;
};

const getWebinarCampaignId = (webinarUniqueId = JSON.parse(localStorage.getItem('getWebinarCampaignId')), action) => {
  if (action.type === "GET_WEBINAR_UNIQUE_ID") {
    localStorage.setItem('getWebinarCampaignId', JSON.stringify(action.payload));
    return action.payload;
  }  
  return webinarUniqueId;
};

const getWebinarSelected =(webinarSelected=JSON.parse(localStorage.getItem('getWebinarSelected')),action) => {
  if (action.type === "GET_WEBINAR_SELECTED") {
    localStorage.setItem('getWebinarSelected', JSON.stringify(action.payload));
    return action.payload;
  }
  return webinarSelected; 
}

export default combineReducers({
  listId: getListId,
  updatedData: getUpdatedData,
  getEmailData: getEmailData,
  getSelectedSmartListData: getSelectedSmartListData,
  getCampaignId: getCampaignId,
  getDraftData: getDraftData,
  getSelected: getSelected,
  getTestingSelected:getTestingSelected,
  getWebinarEmailData:getWebinarEmailData,
  getWebinarSelectedSmartListData:getWebinarSelectedSmartListData,
  getWebinarDraftData:getWebinarDraftData,
  getWebinarCampaignId:getWebinarCampaignId,
  getWebinarSelected:getWebinarSelected,
  getSearched:getSearched
});
