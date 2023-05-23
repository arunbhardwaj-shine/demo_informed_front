import React, { useEffect, useState } from "react";
import axios from "axios";
import { loader } from "../../../loader";
import FilterSegment from "./FilterSegment";
import { useLocation } from "react-router-dom";

const SmartListFilter = () => {
  const location = useLocation();
  const { smartListName } = location.state;
  const { creatorName } = location.state;
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    const body = {
      user_id: localStorage.getItem("user_id"),
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
      <div className="col right-sidebar">
        <div className="custom-container">
            <div className="row">
              {"country" in filterList &&
                Object.keys(filterList.country).length > 0 && (
                  <FilterSegment
                    filters={filterList}
                    listname={smartListName}
                    creator={creatorName}
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
