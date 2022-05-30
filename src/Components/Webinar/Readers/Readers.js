import Lock from "./Lock.png";
import Delete from "./Delete.jpg";
import Unlock from "./Unlock.png";
import React, { useEffect, useState } from "react";
import { Button, CloseButton, Col, Form, Modal, Row, Table } from "react-bootstrap";
import "../webinar.css";
import { toast, ToastContainer } from "react-toastify";
import ExportApi from "../../../Api/ExportApi";
import ReactDOM from "react-dom";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import CsvDownload from "react-json-to-csv";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import { loader } from "../../../loader";
const Readers = () => {
  const [data, setData] = useState();
  const [type, setType] = useState();
  const [paginate, setPaginate] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [countryvalue, setCountryValue] = useState();
  const [event, setEvent] = useState([]);
  const [eventId, setEventId] = useState();
  const [search, setSearch] = useState();
  const [flag, setFlag] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [NewData, setNewData] = useState();
  const [modalShow1, setModalShow1] = useState(false);
  const [countryName, setCountryName] = useState();
  const [render, setRender] = useState(0);
  const [massage, setMassage] = useState("Please Select Event");
  const handleGetReadersData = (id) => {
      ExportApi.ReadersData(id).then((resp) => {
        if (resp.ok) {
          if (resp.data.code === 404) {
            setMassage("Data Not Found");
            setData();
            setFlag(false);
          } else {
            setPaginate(resp.data.data.paginate);
            setCurrentPage(resp.data.data.paginate.currentPage);
            setData(resp.data.data.data);
            const newArray = resp.data.data.data?.map(({ id,state,is_blocked,category,country_id, ...item }) => item)
            setNewData(newArray)
            setFlag(true);
          }
        }
      });
    
  };
  const handleGetReadersDataPage = (id) => {
    ExportApi.ReadersPage(id, eventId).then((resp) => {
      if (resp.ok) {

        if (resp.data.code === 404) {
          setMassage("Data Not Found");
          setData();
        } else {
          setPaginate(resp.data.data.paginate);
          setCurrentPage(resp.data.data.paginate.currentPage);
          setData(resp.data.data.data);
        }
      }
    });
  };
  const handleGetReadersSearch = (id) => {
    ExportApi.ReadersDataSearch(eventId, id, type, countryvalue).then(
      (resp) => {
        if (resp.ok) {
         
          if (resp.data.code === 404) {
            setMassage("Data Not Found");
            setData();
          } else {
            setData(resp.data.data.data);
          }
        }
      }
    );
  };
  const handleGetReadersType = (id) => {
    if (id == "null") {
      setMassage("Data Not Found");
      handleGetReadersData(eventId)
    } else {
      ExportApi.ReadersType(eventId, id, search, countryvalue).then((resp) => {
        if (resp.ok) {
          
          if (resp.data.code === 404) {
            setData();
            setMassage("Data Not Found");
          } else {
            setData(resp.data.data.data);
          }
        }
      });
    }
  };
  const handleGetReadersCountry = (id) => {
    if (id == "null") {
      setMassage("Data Not Found");
      setData();
      setFlag(false);
    } else {
      ExportApi.ReadersCountry(eventId, id, type, search).then((resp) => {
        if (resp.ok) { 
          if (resp.data.code === 404) {
            setMassage("Data Not Found");
            setData();
          } else {
            setData(resp.data.data.data);
          }
        }
      });
    }
  };
  const handleGetEventlist = () => {
    loader("show")
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
        loader("hide")
        setEvent(resp.data.data);
        console.log(resp.data.data[0].id)
        if(eventId==null||eventId==undefined){
           setEventId(resp.data.data[0].id)
          handleGetReadersData(resp.data.data[0].id)
        }
      }
    });
  };
  const handleGetCountryData = () => {
    ExportApi.GetCountryData().then((resp) => {
      if (resp.ok) {
      
        setCountryName(resp.data.data);
      }
    });
  };
  const handleDeleteData = () => {
    ExportApi.ReadersDelete(localStorage.getItem("DeleteData"), 1).then((resp) => {
      if (resp.ok) {
        if (resp.data.code == 200) {
          toast.success(resp.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(resp.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    });
  };
  const handleBlock = (is) => {
    if (localStorage.getItem("is") == 0){
      ExportApi.ReadersBlock(localStorage.getItem("blockId"), 1).then((resp) => {
        if (resp.ok) {
          if (resp.data.code == 200) {
            handleGetReadersSearch()
            toast.success(resp.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error(resp.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      });
    } else {
      ExportApi.ReadersBlock(localStorage.getItem("blockId"), 0).then((resp) => {
        if (resp.ok) {
          if (resp.data.code == 200) {
            handleGetReadersSearch()
            toast.success(resp.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error(resp.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      });
    }
  };
  const handleSelect = (e, i) => {
    let copydata = data;
    copydata[i].type = e;
    setData(copydata);
    setRender(render + 1);
  };
  const handleSelectChange = (id, val) => {
    ExportApi.ReadersBlockt(id, val).then((resp) => {
      if (resp.ok) {
        if (resp.data.code == 200) {
          toast.success(resp.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(resp.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    });
  };

  useEffect(() => {
    handleGetEventlist()
  }, []);
  useEffect(() => {
    handleGetCountryData();
  }, []);
  return (
    <div>
       <div className="loader" id="custom_loader">
	        <span className="loader-view"> </span>
          </div>
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
                <strong>Participants</strong>
              </h2>
            </Col>
            <Col xs={6}>
              <h2>Total Registration | {data ? data.length : null} </h2>
            </Col>
            <Col xs={4}>
              <Form.Label> Event </Form.Label>
              <Form.Select
                 value={eventId}
                onChange={(e) => {
                  handleGetReadersData(e.target.value);
                  setEventId(e.target.value);
                }}
                name="type"
              >
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
                  <Form.Label> Country </Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      handleGetReadersCountry(e.target.value);
                      setCountryValue(e.target.value);
                    }}
                  >
                    <option value="">Select Country</option>
                    {countryName?.map((val, i) => (
                      <React.Fragment key={i}>
                        <option value={val.id}>{val.country}</option>
                      </React.Fragment>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label> User type </Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      handleGetReadersType(e.target.value);
                      setType(e.target.value);
                    }}
                  >
                    <option value="">Select Type</option>
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
                      setSearch(e.target.value);
                    }}
                    placeholder="By name or email"
                  />
                </Col>
                <Col>
                <CsvDownload data={NewData}>Excel Download</CsvDownload>
                {/* <ReactHtmlTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-outline-primary"
                    table="table-to-xls"
                    filename="Readersxls"
                    sheet="Readersxls"
                    buttonText="Download"
                  /> */}
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col>
                  <Table bordered hover id="table-to-xls">
                    <thead>
                      <tr>
                        <th> Sr.No</th>
                        <th> Name</th>
                        <th> Email</th>
                        <th> Country</th>
                        <th> Signup Date</th>
                        <th> User Type</th>
                        <th> Action</th>
                        <th> Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data ? (
                        data.map((val, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{val.name}</td>
                            <td>{val.email} </td>
                            <td>{val.country} </td>
                            <td>{val.signup_date} </td>
                            <td>
                              <Form.Select
                                onChange={(e) => {
                                  handleSelect(e.target.value, i);
                                  handleSelectChange(val.id, val.type);
                                }}
                                value={val.type}
                                key={i}
                              >
                                <option value="HCP">HCP</option>
                                <option value="Staff User">Staff User</option>
                                <option value="Test User">Test User</option>
                              </Form.Select>
                            </td>
                            <td>
                              {val.is_blocked == 0 ? (
                                <img
                                  src={Unlock}
                                  width={70}
                                  onClick={() => {
                                    setModalShow(true)
                                    localStorage.setItem("blockId", val.id)
                                    localStorage.setItem("is",val.is_blocked)
                                  }}
                                />
                              ) : (
                                <img
                                  src={Lock}
                                  onClick={() => {
                                    localStorage.setItem("blockId", val.id)
                                    localStorage.setItem("is",val.is_blocked)
                                      handleBlock();
                                  }}
                                  width={70}
                                />
                              )}
                            </td>
                            <td>
                              <img
                                src={Delete}
                                onClick={() => {
                                  localStorage.setItem("DeleteData",val.id)
                                  setModalShow1(true)
                                  // handleGetReadersDataPage(currentPage);
                                }}
                                width={90}
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <h2>{massage}</h2>
                      )}
                    </tbody>
                    <Row style={{ color: "blue" }}>
                      {/* <Col></Col> */}
                      {paginate.previousPageUrl ? (
                        <Col>
                          <p
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleGetReadersDataPage(currentPage - 1);
                            }}
                          >
                            Previous{" "}
                          </p>
                        </Col>
                      ) : null}
                      {paginate.nextPageUrl ? (
                        <Col>
                          <p
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleGetReadersDataPage(currentPage + 1);
                            }}
                          >
                            Next
                          </p>
                        </Col>
                      ) : null}
                    </Row>
                  </Table>
                </Col>
              </Row>
            </>
          ) : (
            <h3>{massage}</h3>
          )}
        </Col>
        <Modal
      show={modalShow}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header onClick={()=>setModalShow(false)} closeButton>
      </Modal.Header>
      <Modal.Body>
        <h6>The block action will remove the HCP from this event only</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{ handleBlock();setTimeout(() => {
          setModalShow(false);
        }, 1000); }}>Block</Button>
        <Button onClick={()=>{setModalShow(false)}}>Close</Button>
      </Modal.Footer>
    </Modal>
        <Modal
      show={modalShow1}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header onClick={()=>setModalShow1(false)} closeButton>
      </Modal.Header>
      <Modal.Body>
        <h6>The Delete action will delete the HCP from your account entirly</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{handleDeleteData();setModalShow1(false)}}>Delete</Button>
        <Button onClick={()=>{setModalShow1(false)}}>Close</Button>
      </Modal.Footer>
    </Modal>
      </Row>
    </div>
  );
};

export default Readers;
