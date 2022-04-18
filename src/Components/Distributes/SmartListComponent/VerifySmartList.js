import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Table from "./Table";

const VerifySmartList = () => {
  const location = useLocation();
  const { getfilterdata } = location.state;
  return(
    <>
    {
      typeof(getfilterdata) === 'object' && getfilterdata.length > 0 ?
        <div className="box mt-2">
            <p className="mt-2">Selected Hcp's for the smart list</p>
            <Table
              data={getfilterdata}
            />
        </div>
        : <p>No Data Found.</p>
    }
    </>
  )

};

export default VerifySmartList;
