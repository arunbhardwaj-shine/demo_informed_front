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

export default combineReducers({
  listId: getListId,
  updatedData: getUpdatedData,
});
