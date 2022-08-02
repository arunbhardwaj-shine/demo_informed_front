import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ExportApi from '../../../Api/ExportApi';
import TableView from '../SmartList/TableView'

const TableTypeData = () => {
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

<TableView getData={getData} data={Data} smartListId={parms.id}  />
    </>
  )
}

export default TableTypeData