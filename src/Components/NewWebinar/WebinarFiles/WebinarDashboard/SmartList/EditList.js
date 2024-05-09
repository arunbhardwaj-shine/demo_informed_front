import React, { useEffect, useState } from "react";
import FilterSegment from "./FilterSegment";
import queryString from "query-string";
import axios from "axios";
import { loader } from "../../../../../loader";

const EditList = () => {
  const switch_account_detail = JSON.parse(localStorage.getItem("switch_account_detail"))
  const [localStorageUserId,setLocalStorageUserId]=useState(switch_account_detail != null && switch_account_detail != "undefined" && switch_account_detail
  ? switch_account_detail?.user_id
  : localStorage.getItem("user_id"))
  const [filterList, setFilterList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [listName, setListName] = useState('');
  const [creator, setCreator] = useState('');
  const [ibu, setIbu] = useState('');
  const [listcount, setListCount] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const queryParams = queryString.parse(window.location.search);

  const body = {
    user_id: localStorageUserId,
    list_id: queryParams.listId,
    page:pageNo
  };

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

  const editListData = async () => {
    loader("show");
    await axios
      .post(`distributes/get_reders_list`, body)
      .then((res) => {
        if (res.data.response.data.length > 0) {
          setFilteredData(res.data.response.data);
          setSelectedFilter(res.data.response.selected_filters);
          setListName(res.data.response.smart_list_name);
          setCreator(res.data.response.creator_name);
          setIbu(res?.data?.response?.ibu);
          setListCount(res?.data?.response?.list_count);
          getfilterlist();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterdatapayload = {
    user_id: localStorageUserId,
  };
  const getfilterlist = async () => {
    await axios
      .post(`distributes/filters_list`, filterdatapayload)
      .then((res) => {
        setFilterList(res.data.response.data);
        loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    editListData();
  }, []);

  return(
    <>
    <div className="col right-sidebar">
    <div className="custom-container">
        <div className="row">
            {'country' in filterList && Object.keys(filterList.country).length > 0 &&
              <FilterSegment
              filters={filterList}
              listname={listName}
              selectedFilter={selectedFilter}
              data={filteredData}
              creator={creator}
              ibu = {ibu}
              listcount = {listcount}
              listId = {queryParams.listId}
              action="edit"
              />
            }
        </div>
    </div>
    </div>
    </>
  )
};

export default EditList;
