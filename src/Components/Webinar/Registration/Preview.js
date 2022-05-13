import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ensurePluginOrder } from 'react-table';
import ExportApi from '../../../Api/ExportApi';
const Preview = () => {
  const [data, setData] = useState(``);
  const [title, setTitle] = useState();

    let parms=useParams()
    console.log(parms)
    const handleGetPublicPage = () => {
      ExportApi.PublicPage(parms.code,parms.url).then((resp) => {
        if (resp.ok) {
          console.log(resp.data.data.body)
          setData(resp.data.data.body);
          document.getElementById("one").innerHTML=resp.data.data.body
        }
      });
    };
    const handleFormData = (e) => {
      e.preventDefault();
      alert("hello")
      // ExportApi.PublicPage(parms.code,parms.url).then((resp) => {
      //   if (resp.ok) {
      //     console.log(resp.data.data.body)
      //     setData(resp.data.data.body);
      //     document.getElementById("one").innerHTML=resp.data.data.body
      //   }
      // });
    };
    useEffect(() => {
      handleGetPublicPage()
    }, [])
  return (
    <div id="one">
    {/* <form>
<label for="name">First name:</label><br/>
<input type="text" id="fname" name="name" value="John"/><br/>
<input type="text" value="1" name="event_id" style="display: none;"/>
<input type="text" value="1" name="company_id" style="display: none;"/>
<input type="text" value="11" name="form_id" style="display: none;"/>
<input type="text" value="India" name="country" style="display: none;"/>
<input type="text" value="chrome" name="browser" style="display: none;"/>
<label for="lname">email:</label><br/>
<input type="email" id="email" name="email" value="Doe"/><br/><br/>
<button onClick="handleFormData()" >submit</button>
</form> */}
    </div>
  )
}

export default Preview