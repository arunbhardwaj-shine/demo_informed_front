import React, { useEffect, useState } from "react";
import FilterSegment from "./FilterSegment";
import queryString from "query-string";
import axios from "axios";
import { loader } from "../../../loader";

const EditList = () => {

  const [filterList, setFilterList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [listName, setListName] = useState('');
  const queryParams = queryString.parse(window.location.search);

  const body = {
    user_id: 18207,
    list_id: queryParams.listId,
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
          getfilterlist();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterdatapayload = {
    user_id: 18207,
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
      {'country' in filterList && Object.keys(filterList.country).length > 0 &&
        <FilterSegment
        filters={filterList}
        listname={listName}
        selectedFilter={selectedFilter}
        data={filteredData}
        action="edit"
        />
      }
    </div>
    </>
  )
};

export default EditList;
