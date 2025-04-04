import React, { useEffect, useState } from "react";
import axios from "axios";
import { loader } from "../../../../../loader";
import FilterSegment from "./FilterSegment";
import { useLocation } from "react-router-dom";

const SmartListFilter = () => {
  const location = useLocation();
  const switch_account_detail = JSON.parse(localStorage.getItem("switch_account_detail"))
  const [localStorageUserId,setLocalStorageUserId]=useState(switch_account_detail != null && switch_account_detail != "undefined" && switch_account_detail
  ? switch_account_detail?.user_id
  : localStorage.getItem("user_id"))
  const { smartListName } = location.state;
  const { creatorName } = location.state;
  const { ibu } = location?.state ? location?.state : "";
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    const body = {
      user_id: localStorageUserId,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const getfilterlist = async () => {
      loader("show");
      await axios
        .post(`distributes/filters_list`, body)
        .then((res) => {
          setFilterList(res.data.response.data);
          loader("hide");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getfilterlist();
  }, []);

  return (
    <>
      <div className="col right-sidebar custom-change">
        <div className="custom-container">
            <div className="row">
              {"country" in filterList &&
                Object.keys(filterList.country).length > 0 && (
                  <FilterSegment
                    filters={filterList}
                    listname={smartListName}
                    creator={creatorName}
                    ibu = {ibu}
                    action="create"
                  />
                )}
            </div>
        </div>
      </div>
    </>
  );
};

export default SmartListFilter;
