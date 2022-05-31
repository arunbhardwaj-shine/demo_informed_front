import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../App.css";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { loader } from "../../../loader";

const ViewSmartListWebinar = () => {
  const queryParams = queryString.parse(window.location.search);
  const [smartListName, setSmartListName] = useState("");
  const [editList, setEditListData] = useState([]);
  const [profileId, setProfileId] = useState(null);
  const [api_flag, setapi_flag] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [getuploadedby, setUploadedBy] = useState();
  const [getlistcount, setListCount] = useState("");
  const [creatorName, setCreatorName] = useState("");

  const [data, setData] = useState([]);

  const body = {
    smart_list_id: queryParams.listId,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("Token")}`,
  };

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const getSmartListData = async () => {
    // loader("show");
    await axios
      .get(`http://51.89.210.56:8000/api/smart-list/data?smart_list_id=` + 7, {
        headers,
      })
      .then((res) => {
        console.log(res);

        // if (res.data.response) {
        //   if (res.data.response.data.length > 0) {
        //     setCreatorName(res.data.response.creator_name);
        //     setEditListData(res.data.response.data);
        //     setLoading(false);
        //     setUploadedBy(res.data.response.upload_by_filter);
        //     setSmartListName(res.data.response.smart_list_name);
        //     setListCount(res.data.response.list_count);
        //     setapi_flag(api_flag + 1);
        //     loader("hide");
        //   }
        // } else {
        //   popup_alert({
        //     visible: "show",
        //     message: "No readers in the smart list",
        //     type: "error",
        //   });
        // }
        // loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("hi");
    getSmartListData();
  }, []);

  /**
   *
   * @param id - The id of the product
   * @param currentUnitPrice - The current unit price of the product
   */

  return (
    <>
      <div className="col right-sidebar">
        hi
        {/* <ViewTable
            data={editList}
            smartListDatafn={getSmartListData}
            api_flag={api_flag}
            list_count={getlistcount}
            listId={queryParams.listId}
            upload_by_filter={getuploadedby}
            smartListName={smartListName}
            creatorName={creatorName}
          /> */}
      </div>
    </>
  );
};

export default ViewSmartListWebinar;
