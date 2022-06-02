import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TableView from "./TableView";

const ExcelUpload = () => {
  const location = useLocation();
  const { data } = location.state;
  const { smartListName } = location.state;

  return (
    <>
      {
        <div className="col right-sidebar">
          <TableView
            data={data}
            smartListName={smartListName}
            upload_by_filter="0"
          />
        </div>
      }
    </>
  );
};
export default ExcelUpload;
