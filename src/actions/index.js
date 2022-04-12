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
