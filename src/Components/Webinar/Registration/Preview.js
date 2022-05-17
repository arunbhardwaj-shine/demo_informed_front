import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { ensurePluginOrder } from 'react-table';
import ExportApi from '../../../Api/ExportApi';
import { browserName, browserVersion } from "react-device-detect";
const Preview = () => {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);

    let parms=useParams()
    console.log(parms)
    const handleGetPublicPage = () => {
      ExportApi.PublicPage(parms.code,parms.url).then((resp) => {
        if (resp.ok) {
          console.log(resp.data.data.body)
          

          document.getElementById("one").innerHTML=resp.data.data.body

          setTimeout(() => {
            
            let closePeer = document.getElementById('submit');
            console.log("closePeer",closePeer)
            if (closePeer) {
            closePeer.addEventListener('click',handleFormData);
            }
          }, 5500);
        }
      });
    };

    const handleFormData = (e) => {
       e.preventDefault();
     let name=document.getElementById("fname").value
     let country=document.getElementById("country").value
     let email=document.getElementById("email").value
      // bind function for close the popup
  
      ExportApi.CreateParticipant(name,country,browserName,email,parms.url).then((resp) => {
        if (resp.ok) {
          console.log(resp.data)
          if(resp.data.code==200)
          setData(resp.data.message)
          setShow(true)
        }
      });
    };
    useEffect(() => {
      handleGetPublicPage()
    console.log("browserName",browserName)
    }, [])

  return (
    <>
    <Modal
    show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
      </Modal.Header>
      <Modal.Body>
       <h2 style={{color:"green",fontWeight:"bold",textAlign:"center"}}>{data}</h2>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    <div id="one"> </div>
    </>
  )
}

export default Preview