import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Loader from "react-js-loader";
import Table from "./Table";

const EditList = () => {
  const queryParams = queryString.parse(window.location.search);
  const [smartListName, setSmartListName] = useState("");
  const [editList, setEditListData] = useState([]);
  const [profileId, setProfileId] = useState(null);
  const [api_flag, setapi_flag] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const body = {
    user_id: 18207,
    list_id: queryParams.listId,
  };

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const getSmartListData = async () => {
    await axios
      .post(`distributes/get_reders_list`, body)
      .then((res) => {
        if (res.data.response.data.length > 0) {
          setEditListData(res.data.response.data);
          setLoading(false);
          //  console.log(res.data.response.data);
          setSmartListName(res.data.response.smart_list_name);
          setapi_flag(api_flag + 1);
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
        <Table
          data={editList}
          smartListDatafn={getSmartListData}
          api_flag={api_flag}
          listId={queryParams.listId}
        />
      </>
    );
  } else {
    return (
      <>
        {isLoading ? (
          <div className={"item"}>
            <Loader type="heart" bgColor="red" color="red" size={100} />
          </div>
        ) : null}
      </>
    );
  }
};

export default EditList;
