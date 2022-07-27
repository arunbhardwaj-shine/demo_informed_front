import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ExportApi from '../../../Api/ExportApi';
import FilterList from './FilterList';
import TableView from './TableView';

const EditSmartList = () => {
    let parms = useParams();
    const [Data, setData] = useState()
    const getData=()=>{
        ExportApi.GetSmartListSingleRecord(parms.id)
        .then((resp) => {
          if (resp.data) {
            setData(resp.data.data)
          }
        })
    }
useEffect(() => {
    getData()
}, [])
  return (
    <> <div className="right-sidebar col"> {parms.active==1?<TableView getData={getData} data={Data} smartListId={parms.id} name={parms.name} active="1" upload_by_filter="1"  /> : <FilterList id={parms.id} name={parms.name} active="0"/>}
   </div>
        {/* <div className="page-top-nav smart_list_names">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-6">
              <div className="page-title">
                <h2>{parms.name}</h2>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="header-btn">
                <button
                  className="btn btn-primary btn-bordered light"
                //   onClick={closeClicked}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary btn-filled save"
                 onClick={() => showConfirmation()}
                 disabled={
                   typeof getfilterdata !== "undefined" &&
                   getfilterdata.length > 0
                     ? false
                     : typeof getNewAddedUser !== "undefined" &&
                       getNewAddedUser.length > 0
                     ? false
                     : true
                  }
                >
                  Save
                </button>
              </div>
            </div>  
        <div className="smart-list-name-drop">
        <h5>Please select who to include to your smart list.You can pick one or more:</h5>
        </div>
          </div>
        </div> */}
    </>
  )
}

export default EditSmartList