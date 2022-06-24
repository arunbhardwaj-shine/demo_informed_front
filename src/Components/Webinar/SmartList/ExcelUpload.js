import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TableView from "./TableView";

const ExcelUpload = () => {
  const location = useLocation();
  const { data } = location.state;
  const { smartListId } = location.state;

  return (
    <>
      {/* {console.log(data)} */}
      <TableView data={data} smartListId={smartListId} upload_by_filter="0" />
    </>
  );
};
export default ExcelUpload;
