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
