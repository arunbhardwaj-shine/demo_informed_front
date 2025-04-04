import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../App.scss";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Loader from "react-js-loader";
import ViewTable from "./ViewTable";
import { loader } from "../../../loader";
import { popup_alert } from "../../../popup_alert";
import { Spinner } from "react-activity";

const EditList = () => {
  const queryParams = queryString.parse(window.location.search);
  const [smartListName, setSmartListName] = useState("");
  const [editList, setEditListData] = useState([]);
  const [profileId, setProfileId] = useState(null);
  const [api_flag, setapi_flag] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [getuploadedby, setUploadedBy] = useState();
  const [getlistcount, setListCount] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [ibu, setIBU] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [isLoad, setIsLoading] = useState(0);
  const [hide, setHide] = useState(1);

  const [data, setData] = useState([]);

  const body = {
    user_id: localStorage.getItem("user_id"),
    list_id: queryParams.listId,
    page:pageNo
  };

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const getSmartListData = async () => {
    loader("show");
    await axios
      .post(`distributes/get_reders_list`, body)
      .then((res) => {
        if (res.data.response) {
          if (res.data.response.data.length > 0) {
            setCreatorName(res.data.response.creator_name);
            setIBU(res?.data?.response?.ibu);
            setEditListData(res.data.response.data);
            setLoading(false);
            setUploadedBy(res.data.response.upload_by_filter);
            setSmartListName(res.data.response.smart_list_name);
            setListCount(res.data.response.list_count);
            setapi_flag(api_flag + 1);
            loader("hide");
            if(res.data.response.list_count <=res.data.response.data.length){
               setHide(0)
            }
          }
        } else {
          popup_alert({
            visible: "show",
            message: "No readers in the smart list",
            type: "error",
          });
        }
        loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLoadMore = async() =>{
    try{
      setIsLoading(1)
      const body = {
        user_id: localStorage.getItem("user_id"),
        list_id: queryParams.listId,
        page:pageNo+1
      };
      const res = await axios.post(`distributes/get_reders_list`, body)
        if (res.data.response) {
          if (res.data.response.data.length) {
            setEditListData((oldArray)=>[...oldArray,...res.data.response.data]);
            let total = editList?.length + res.data.response.data.length
            if(getlistcount <=total){
               setHide(0)
            }
            setPageNo(pageNo+1)
          }
        } 
    }catch(err){
      console.log("er",err)
    }finally{
      setIsLoading(0)
      loader("hide");

    }
  }

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
        <div className="col right-sidebar custom-change">
          <div className="custom-container">
            <div className="row">
              <ViewTable
                data={editList}
                smartListDatafn={getSmartListData}
                api_flag={api_flag}
                list_count={getlistcount}
                listId={queryParams.listId}
                upload_by_filter={getuploadedby}
                smartListName={smartListName}
                creatorName={creatorName}
                ibu = {ibu}
              />
            </div>
            {
                hide?!isLoad?<div className="text-center load_more">
                <button className="btn btn-primary"  onClick={handleLoadMore}>
                  Load All
                </button>
              </div>:"" :""
            }
            
            { isLoad == true ? (
              <div
                className="load_more"
                style={{
                  margin: "0 auto",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Spinner color="#53aff4" size={32} speed={1} animating={true} />
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="col right-sidebar">
          <div className="custom-container">
            <div className="row">
              {isLoading ? <div className={"item"}></div> : null}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default EditList;
