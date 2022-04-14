import React, { useEffect, useState } from "react";
import axios from "axios";

import FilterSegment from "./FilterSegment";

const SmartListFilter = () => {

  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    const body = {
      user_id: 18207,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const getfilterlist = async () => {
      await axios
        .post(`distributes/filters_list`, body)
        .then((res) => {
          setFilterList(res.data.response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getfilterlist();
  }, []);


  return (
    <>
    {'country' in filterList && filterList.country.length > 0 &&
      <FilterSegment
      filters={filterList}
      />
    }
    </>
  );

};

export default SmartListFilter;
