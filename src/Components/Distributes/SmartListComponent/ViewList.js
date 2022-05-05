import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../App.css";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Loader from "react-js-loader";
import ViewTable from "./ViewTable";
import { loader } from "../../../loader";

const EditList = () => {
  const queryParams = queryString.parse(window.location.search);
  const [smartListName, setSmartListName] = useState("");
  const [editList, setEditListData] = useState([]);
  const [profileId, setProfileId] = useState(null);
  const [api_flag, setapi_flag] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [getuploadedby, setUploadedBy] = useState();
  const [getlistcount, setListCount] = useState("");

  const [data, setData] = useState([]);

  const body = {
    user_id: 18207,
    list_id: queryParams.listId,
  };

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const getSmartListData = async () => {
    loader("show");
    await axios
      .post(`distributes/get_reders_list`, body)
      .then((res) => {
        if (res.data.response.data.length > 0) {
          setEditListData(res.data.response.data);
          setLoading(false);
          setUploadedBy(res.data.response.upload_by_filter);
          setSmartListName(res.data.response.smart_list_name);
          setListCount(res.data.response.list_count);
          setapi_flag(api_flag + 1);
          loader("hide");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
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
      <div className="col right-sidebar">
        <ViewTable
          data={editList}
          smartListDatafn={getSmartListData}
          api_flag={api_flag}
          list_count={getlistcount}
          listId={queryParams.listId}
          upload_by_filter={getuploadedby}
          smartListName={smartListName}
        />
        </div>
      </>
    );
  } else {
    return (
      <>
      <div className="col right-sidebar">
        {isLoading ? (
          <div className={"item"}>
          </div>
        ) : null}
        </div>
      </>
    );
  }
};

export default EditList;
