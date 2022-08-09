import React, { useEffect, useState } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ExportApi from "../../../Api/ExportApi";
import { loader } from "../../../loader";
// import CsvDownload from 'react-json-to-csv'
function EmailStats() {
  const [event, setEvent] = useState([]);
  const [eventId, setEventId] = useState();
  const [tempId, setTempId] = useState();
  const [Label, setLabel] = useState();
  const [EmailData, setEmailData] = useState();
  const [templateList, setTemplateList] = useState();
  const [templateId, setTemplateId] = useState();
  const [paginate, setPaginate] = useState();
  const [currentPage, setCurrentPage] = useState();
  let eId;
  const handleGetEventlist = () => {
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
        setEvent(resp.data.data);
        if (eventId == null || eventId == undefined) {
          setEventId(resp.data.data[0].id);
          handleGetTemplateList(resp.data.data[0].id);
          handleGetParticipantPage(resp.data.data[0].id);
        }
      }
    });
  };
  const handleGetTemplateList = (id) => {
    localStorage.setItem("emailstatseventid", id);
    ExportApi.UserTemplateList(id).then((resp) => {
      if (resp.ok) {
        // console.log(resp.data.data);
        if (templateId == null || templateId == undefined) {
          // console.log(id);
          setEventId(id);
          handleGetEmaildata(resp.data.data[0].id);
          setTemplateId(resp.data.data[0].id);
        }
        setTemplateList(resp.data.data);
      }
    });
  };
  const handleGetEmaildata = (id) => {
    loader("show");
    setTimeout(() => {
      ExportApi.EmailStatss(localStorage.getItem("emailstatseventid"), id).then(
        (resp) => {
          if (resp.ok) {
            loader("hide");
            //  console.log(resp.data.data);
            setEmailData(resp.data.data.data);
            setPaginate(resp.data.data.paginate);
            setLabel(resp.data.data.paginate.label);
            setCurrentPage(resp.data.data.paginate.currentPage);
          }
        }
      );
    }, 2000);
  };
  const handleGetParticipantPage = (id) => {
    ExportApi.EmailStatsPage(id, eventId, tempId).then((resp) => {
      if (resp.ok) {
        // console.log(resp.data);
        if (resp.data.code === 404) {
        } else {
          setPaginate(resp.data.data.paginate);
          setCurrentPage(resp.data.data.paginate.currentPage);
          setEmailData(resp.data.data.data);
        }
      }
    });
  };

  useEffect(() => {
    handleGetEventlist();
  }, []);
  return (
    <div class="right-sidebar col">
      <Row>
        <Col md={{ span: 9, offset: 2 }}>
          <Row>
            <Col>
              <Form.Label>Select Event </Form.Label>
              <Form.Select
                name="type"
                value={eventId}
                onChange={(e) => {
                  setEventId(e.target.value);
                  handleGetTemplateList(e.target.value);
                }}
              >
                <option> Select Event</option>
                {event?.map((val, i) => (
                  <React.Fragment key={i}>
                    <option value={val.id}>{val.title}</option>
                  </React.Fragment>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Select Template </Form.Label>
              <Form.Select
                value={templateId}
                onChange={(e) => {
                  setTemplateId(e.target.value);
                  handleGetEmaildata(e.target.value);
                }}
                name="type"
              >
                <option> Select template</option>
                {templateList
                  ? templateList?.map((val, i) => (
                      <React.Fragment key={i}>
                        <option value={val.id}>{val.name}</option>
                      </React.Fragment>
                    ))
                  : null}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
            {/* <Col> <CsvDownload data={EmailData}>Excel Download</CsvDownload></Col> */}
          </Row>
          {EmailData != undefined || EmailData != null ? (
            <Table bordered hover>
              <thead>
                <tr>
                  <th> Name</th>
                  <th>Email</th>
                  <th>Sent</th>
                  <th>Read</th>
                  {Label?.map((val, i) => {
                    return <th>{val}</th>;
                  })}
                  {/* {Object.entries(EmailData?EmailData[0].opened_linked:null)?.map(([key, value]) => {
              return (
                  <th>{key && key}</th>
              );
            })} */}
                </tr>
              </thead>
              <tbody>
                {EmailData?.map((val, i) => (
                  <tr key={i}>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.is_sent == 1 ? "Yes" : "No"}</td>
                    <td>{val.is_read == 1 ? "Yes" : "No"}</td>
                    {Object.entries(val.opened_linked)?.map(([key, value]) => {
                      return <td>{value}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
              <Row style={{ color: "blue" }}>
                {/* <Col></Col> */}
                {paginate?.previousPageUrl ? (
                  <Col>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleGetParticipantPage(currentPage - 1);
                      }}
                    >
                      Previous
                    </p>
                  </Col>
                ) : null}
                {paginate?.nextPageUrl ? (
                  <Col>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleGetParticipantPage(currentPage + 1);
                      }}
                    >
                      Next
                    </p>
                  </Col>
                ) : null}
              </Row>
            </Table>
          ) : (
            <h2
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "200px",
              }}
            >
              Data Not Found
            </h2>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default EmailStats;
