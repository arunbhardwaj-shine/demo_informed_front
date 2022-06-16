import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../App.css";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { loader } from "../../../loader";
import { popup_alert } from "../../../popup_alert";
import ViewTable from "../../Distributes/SmartListComponent/ViewTable";
import ViewData from "./ViewData";
import GridView from "./GridView";

import { toast, ToastContainer } from "react-toastify";

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

  //const [data, setData] = useState([]);

  const body = {
    smart_list_id: queryParams.listId,
    type: "",
    bounced: "",
    country_id: "",
  };

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

  const getSmartListData = async () => {
    loader("show");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };

    await axios
      .post(`http://51.89.210.56:8000/api/smart-list/single-record`, body, {
        headers,
      })
      .then((res) => {
        console.log(res);

        if (res.data.data) {
          if (res.data.data.length > 0) {
            loader("false");
            console.log(res.data.data);
            setEditListData(res.data.data);
            setapi_flag(api_flag + 1);
            // setLoading(false);
            // setUploadedBy(res.data.response.upload_by_filter);
            // setSmartListName(res.data.response.smart_list_name);
            // setListCount(res.data.response.list_count);
            // setapi_flag(api_flag + 1);
            // loader("hide");
          }
        } else {
          toast.error(res.data.message);
          // popup_alert({
          //   visible: "show",
          //   message: "No readers in the smart list",
          //   type: "error",
          // });
        }
        //    loader("hide");
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

  if (api_flag > 0) {
    return (
      <>
        {console.log(editList)}

        <GridView data={editList} smartListId={queryParams.listId} />
      </>
    );
  } else {
    return (
      <>
        <div className="right-sidebar">
          <div className="loader" id="custom_loader">
            <span className="loader-view"> </span>
          </div>
        </div>
      </>
    );
  }
};

export default ViewSmartListWebinar;
