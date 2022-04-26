import React from "react";
import Table from "./Table";
import { useLocation } from "react-router-dom";

const UploadExcel = (props) => {
  const location = useLocation();
  console.log("props");
  console.log(location);
  const { data } = location.state;
  const { smartListName } = location.state;

  return (
    <>
      <div className="col right-sidebar">
        <Table data={data} smartListName={smartListName} upload_by_filter="0" />
      </div>  
    </>
  );
};
export default UploadExcel;
