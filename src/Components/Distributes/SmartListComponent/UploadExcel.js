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
      {console.log(location)}
      <Table data={data} smartListName={smartListName} />
    </>
  );
};
export default UploadExcel;
