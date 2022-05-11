import React from "react";
import Table from "./Table";
import { useLocation } from "react-router-dom";

const UploadExcel = (props) => {
  const location = useLocation();
  const { data } = location.state;
  const { smartListName } = location.state;
  const { creator } = location.state;

  const sendDataToParent = (childData) => {
    //console.log("function to just pass the callback");
  }

  return (
    <>
    {
      <div className="col right-sidebar">
        <Table data={data} smartListName={smartListName} upload_by_filter="0" creator={creator} sendDataToParent={sendDataToParent} />
      </div>
    }

    </>
  );
};
export default UploadExcel;
