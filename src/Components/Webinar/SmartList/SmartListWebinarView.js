import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ExportApi from '../../../Api/ExportApi'
import TableView from './TableView'

const SmartListWebinarView = () => {
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
    <>
      <div className="loader" id="custom_loader">
          <span className="loader-view"> </span>
        </div>
      <div className="right-sidebar col">
      <TableView data={Data} smartListId={parms.id} upload_by_filter="001" />
    </div>
    </>
  )
}

export default SmartListWebinarView