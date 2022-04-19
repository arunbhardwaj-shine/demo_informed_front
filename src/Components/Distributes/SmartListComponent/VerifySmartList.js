import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Table from "./Table";

const VerifySmartList = () => {
  const location = useLocation();
  const { getfilterdata } = location.state;
  const { listname } = location.state;
  const { filter_payload } = location.state;
  return(
    <>
    <div className="col right-sidebar">
      {
        typeof(getfilterdata) === 'object' && getfilterdata.length > 0 ?
          <div className="box mt-2">
              {console.log(filter_payload)}
              <p className="mt-2">Selected Hcp's for the smart list</p>
              <Table
                data={getfilterdata}
                smartListName={listname}
                upload_by_filter = '1'
                filter_payload={filter_payload}
              />
          </div>
          : <p>No Data Found.</p>
      }
    </div>
    </>
  )

};

export default VerifySmartList;
