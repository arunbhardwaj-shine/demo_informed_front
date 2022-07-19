import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TableView from "./TableView";

const ExcelUpload = () => {
  const location = useLocation();
  const { data } = location.state;
  const { smartListId } = location.state;

  return (
    <>
        <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
      {/* {console.log(data)} */}
      <TableView data={data} smartListId={smartListId} upload_by_filter="0" />
      </div>
      </div>
      </div>
    </>
  );
};
export default ExcelUpload;
