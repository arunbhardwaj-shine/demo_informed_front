import Lock from './Lock.png'
import Unlock from './Unlock.png'
import React, { useEffect, useState } from "react";
import { Button, CloseButton, Col, Form, Row, Table } from "react-bootstrap";
import * as Yup from "yup";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import ExportApi from "../../../Api/ExportApi";
const Readers = () => {
    const [data, setData] = useState([]);
    const [event, setEvent] = useState([]);
    const handleGetReadersData = (id) => {
        ExportApi.ReadersData(id).then((resp) => {
          if (resp.ok) {
              console.log(resp.data.data.data)
              setData(resp.data.data.data);
          }
        });
      };
    const handleGetEventlist = () => {
        ExportApi.GetEventList().then((resp) => {
          if (resp.ok) {
            setEvent(resp.data.data);
          }
        });
      };
    useEffect(() => {
        handleGetEventlist()
    }, [])
  return (
    <div>    <Row>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Col md={{ span: 9, offset: 2 }}>
        <Row>
            <Col xs={2} > <h2><strong>HCPs</strong></h2></Col>
            <Col xs={6}><h2>Total Registration | </h2></Col>
            <Col xs={4}>  <Form.Label>Select Event </Form.Label>
                  <Form.Select
                  onChange={(e)=>{handleGetReadersData(e.target.value)}}
                    name="type" >
                    <option> Select Event</option>
                    {event?.map((val, i) => (
                      <React.Fragment key={i}>
                        <option value={val.id}>{val.title}</option>
                      </React.Fragment>
                    ))}
                  </Form.Select></Col>
            
        </Row>
       
    
    
    
     <Row>
      <Col>
      <Table bordered hover>
              <thead>
                <tr>
                  <th> Name</th>
                  <th> Email</th>
                  <th> State</th>
                  <th> Country</th>
                  <th> Category</th>
                  <th> Signup Date</th>
                  <th> User Type</th>
                  <th> Action</th>
                </tr>
              </thead>
              <tbody>
                  {data?data.map((val,i) => (
                  <tr key={i}>  
                    <td>{val.name}</td>
                    <td>{val.email} </td>
                    <td>{val.state} </td>
                    <td>{val.country} </td>
                    <td>{val.category} </td>
                    <td>{val.signup_date} </td>
                    <td><Form.Select key={i} aria-label="Default select example">
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select> <Button>Save</Button> </td>
                    <td>{val.is_blocked==0?<img src={Unlock} width={70} />:<img src={Lock} width={70} />} </td>
                  </tr>
                )):<h2>Data Not Found</h2>}
              </tbody>
            </Table>
      </Col>
     </Row>


        </Col>
        </Row>
       </div>
  )
}

export default Readers