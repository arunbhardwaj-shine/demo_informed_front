import Lock from "./Lock.png";
import Unlock from "./Unlock.png";
import React, { useEffect, useState } from "react";
import { Button, CloseButton, Col, Form, Row, Table } from "react-bootstrap";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import ExportApi from "../../../Api/ExportApi";
import ReactDOM from "react-dom";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
const Readers = () => {
  const [data, setData] = useState();
  const [event, setEvent] = useState([]);
  const [eventId, setEventId] = useState();
  const [flag, setFlag] = useState(false);
  const [countryName, setCountryName] = useState();
  const [render, setRender] = useState(0);
  const [massage, setMassage] = useState("Please Select Event");
  const handleGetReadersData = (id) => {
    ExportApi.ReadersData(id).then((resp) => {
      if (resp.ok) {
        console.log(resp.data.code);
        if (resp.data.code === 404) {
          setMassage("Data Not Found");
          setData();
          setFlag(false);
        } else {
          setData(resp.data.data.data);
          setFlag(true);
        }
      }
    });
  };
  const handleGetReadersSearch = (id) => {
    ExportApi.ReadersDataSearch(eventId, id).then((resp) => {
      if (resp.ok) {
        console.log(resp.data);
        if (resp.data.code === 404) {
          setMassage("Data Not Found");
          setData();
        } else {
          setData(resp.data.data.data);
        }
      }
    });
  };
  const handleGetReadersType = (id) => {
    ExportApi.ReadersType(eventId, id).then((resp) => {
      if (resp.ok) {
        // console.log(resp.data);
        if (resp.data.code === 404) {
          setData();
          setMassage("Data Not Found");
        } else {
          setData(resp.data.data.data);
        }
      }
    });
  };
  const handleGetReadersCountry = (id) => {
    ExportApi.ReadersCountry(eventId, id).then((resp) => {
      if (resp.ok) {
        // console.log(resp.data);
        if (resp.data.code === 404) {
          setMassage("Data Not Found");
          setData();
        } else {
          setData(resp.data.data.data);
        }
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
  const handleGetCountryData = () => {
    ExportApi.GetCountryData().then((resp) => {
      if (resp.ok) {
        console.log(resp.data.data);
        setCountryName(resp.data.data);
      }
    });
  };
  const handleBlock = (id, isblocked) => {
    if (isblocked == 0) {
      ExportApi.ReadersBlock(id, 1).then((resp) => {
        if (resp.ok) {
          console.log(resp.data.data);
          // setCountryName(resp.data.data);
        }
      });
    } else {
      ExportApi.ReadersBlock(id, 0).then((resp) => {
        if (resp.ok) {
          // console.log(resp.data.data)
          // setCountryName(resp.data.data);
        }
      });
    }
  }; 
  const handleSelect=(e,i)=>{
// console.log(e,i)
 let copydata= data
 copydata[i].type=e;
 console.log(copydata)
 setData(copydata)
 setRender(render+1)
  }
  const handleSelectChange=(id,val)=>{
    ExportApi.ReadersBlockt(id,val).then((resp) => {
      if (resp.ok) {
        console.log(resp.data);
        handleGetReadersData(eventId)
      }
    });
  }
  useEffect(() => {
    handleGetCountryData();
    handleGetEventlist();
  }, []);
  return (
    <div>
      {console.log("data", data)}
      <Row>
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
            <Col xs={2}>
              <h2>
                <strong>HCPs</strong>
              </h2>
            </Col>
            <Col xs={6}>
              <h2>Total Registration | {data ? data.length : null} </h2>
            </Col>
            <Col xs={4}>
              <Form.Label>Select Event </Form.Label>
              <Form.Select
                onChange={(e) => {
                  handleGetReadersData(e.target.value);
                  setEventId(e.target.value);
                }}
                name="type"
              >
                <option> Select Event</option>
                {event?.map((val, i) => (
                  <React.Fragment key={i}>
                    <option value={val.id}>{val.title}</option>
                  </React.Fragment>
                ))}
              </Form.Select>
            </Col>
          </Row>
          {flag ? (
            <>
              <Row>
                <Col>
                  <Form.Label>Select Country </Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      handleGetReadersCountry(e.target.value);
                    }}
                  >
                    <option>select Country</option>
                    {countryName?.map((val, i) => (
                      <React.Fragment key={i}>
                        <option value={val.country}>{val.country}</option>
                      </React.Fragment>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Select User type </Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      handleGetReadersType(e.target.value);
                    }}
                  >
                    <option value="HCP">HCP</option>
                    <option value="Staff User">Staff User</option>
                    <option value="Test User">Test User</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Search </Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      handleGetReadersSearch(e.target.value);
                    }}
                    placeholder="By name or email"
                  />
                </Col>
              </Row>

              <br />
              <br />
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
                      {data ? (
                        data.map((val, i) => (
                          <tr key={i}>
                            <td>{val.name}</td>
                            <td>{val.email} </td>
                            <td>{val.state} </td>
                            <td>{val.country} </td>
                            <td>{val.category} </td>
                            <td>{val.signup_date} </td>
                            <td>
                              <Form.Select onChange={(e)=>{handleSelect(e.target.value,i)}}  value={val.type} key={i}>
                                <option value="HCP">HCP</option>
                                <option value="Staff User">Staff User</option>
                                <option value="Test User">Test User</option>
                              </Form.Select>{" "}
                              <Button onClick={()=>{handleSelectChange(val.id,val.type)}} >Save</Button>{" "}
                            </td>
                            <td>
                              {val.is_blocked == 0 ? (
                                <img
                                  src={Unlock}
                                  width={70}
                                  onClick={(e) => {
                                    handleBlock(val.id, val.is_blocked);
                                    handleGetReadersData(eventId);
                                  }}
                                />
                              ) : (
                                <img
                                  src={Lock}
                                  onClick={(e) => {
                                    handleBlock(val.id, val.is_blocked);
                                    handleGetReadersData(eventId);
                                  }}
                                  width={70}
                                />
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <h2>{massage}</h2>
                      )}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </>
          ) : (
            <h3>{massage}</h3>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Readers;
