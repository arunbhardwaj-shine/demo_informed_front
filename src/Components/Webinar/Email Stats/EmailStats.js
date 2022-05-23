import React, { useEffect, useState } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ExportApi from "../../../Api/ExportApi";
// import CsvDownload from 'react-json-to-csv'
function EmailStats() {
  const [event, setEvent] = useState([]);
  const [eventId, setEventId] = useState();
  const [EmailData, setEmailData] = useState();
  const [templateList, setTemplateList] = useState();

  const handleGetEventlist = () => {
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
        setEvent(resp.data.data);
      }
    });
  };
  const handleGetTemplateList = (id) => {
    ExportApi.UserTemplateList(id).then((resp) => {
      if (resp.ok) {
        console.log(resp.data.data);
        setTemplateList(resp.data.data);
      }
    });
  };
  const handleGetEmaildata = (id) => {
    // console.log(id)
    ExportApi.EmailStatss(eventId, id).then((resp) => {
      if (resp.ok) {
        console.log(resp.data.data.data);
        setEmailData(resp.data.data.data);
      }
    });
  };
  useEffect(() => {
    handleGetEventlist();
  }, []);
  return (
    <div>
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
            <Col>
              <Form.Label>Select Event </Form.Label>
              <Form.Select
                name="type"
                onChange={(e) => {
                  handleGetTemplateList(e.target.value);
                  setEventId(e.target.value);
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
              {templateList != undefined || templateList != null ? (
                <>
                  <Form.Label>Select Template </Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      handleGetEmaildata(e.target.value);
                    }}
                    name="type"
                  >
                    <option> Select template</option>
                    {templateList
                      ? templateList?.map((val, i) => (
                          <React.Fragment key={i}>
                            {console.log(val)}
                            <option value={val.id}>{val.name}</option>
                          </React.Fragment>
                        ))
                      : null}
                  </Form.Select>
                </>
              ) : null}
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
                  <th>Open Link</th>
                </tr>
              </thead>
              {/* var obj = [{id:1,
           data:{EMAILOPENLINK: "http://51.89.210.56:8000/api/set-read",
           LINK_LOGIN_WEBINAR: "http://51.89.210.56:8000/api/track",
          UNSUBSCRIBE_LINK: "http://51.89.210.56:8000/api/track" }}];

for(let a of obj){
  
  console.log(Object.keys(a.data))
} */}
              <tbody>
                {EmailData?.map((val, i) => (
                  <tr key={i}>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.opened_linked.is_clicked == 1 ? "Yes" : "No"}</td>
                    {/* <td></td> */}
                  </tr>
                ))}
              </tbody>
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
