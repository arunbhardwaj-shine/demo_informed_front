import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import SmartListWebinar from "../SmartList/SmartListWebinar";
const SelectSmartList = () => {
  let params=useParams()
  return (
    <>
    <SmartListWebinar toggle ="yes" params={params}/>
    </>
  );
};
export default SelectSmartList;
