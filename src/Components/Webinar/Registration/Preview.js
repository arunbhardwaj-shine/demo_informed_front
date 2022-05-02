import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ExportApi from '../../../Api/ExportApi';

const Preview = () => {
  const [data, setData] = useState();
  const [title, setTitle] = useState();

    let parms=useParams()
    console.log(parms)
    const handleGetPublicPage = () => {
      ExportApi.PublicPage(parms.code,parms.url).then((resp) => {
        if (resp.ok) {
          console.log(resp.data.data.body)
          setData(resp.data.data.body);
          document.getElementById("one").innerHTML=resp.data.data.body;
        }
      });
    };
    useEffect(() => {
      handleGetPublicPage()
    }, [])
  return (
    <div id="one">
     {/* <h2>{data}</h2> */}
    </div>
  )
}

export default Preview