import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ExportApi from '../../../Api/ExportApi';

const Preview = () => {
  const [data, setData] = useState();

    let parms=useParams()
    console.log(parms)
    const handleGetPublicPage = () => {
      ExportApi.PublicPage(parms.code,parms.url).then((resp) => {
        if (resp.ok) {
          console.log(resp.data)
          setData(resp.data.data);
        }
      });
    };
    useEffect(() => {
      handleGetPublicPage()
    }, [])
  return (
    <div><center>Preview</center> </div>
  )
}

export default Preview