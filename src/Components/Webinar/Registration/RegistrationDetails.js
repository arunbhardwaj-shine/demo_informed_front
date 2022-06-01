import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
const RegistraionDetails = () => {
  const [inputbox, setInputBox] = useState([
    { value: "Name", name: "Name" },
    { value: "B", name: "gender" },
    { value: "C", name: "gender" },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);
  const [field, setField] = useState("");

  useEffect(() => {
    console.log("Hello in Registraion Details");
  }, []);

  const handleRadioChange = (e) => {
    console.log(e.target.value);
  };

  const addData = () => {
    setField("");
    setShow(true);
    //console.log("add data");
  };

  const addFieldChanged = (e) => {
    setField(e.target.value);
  };

  const saveClicked = () => {
    setShow(false);
    setInputBox((oldArray) => [...oldArray, { value: field, name: "gender" }]);
    setField("");
  };

  const fileChanged = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const submitData = () => {
    const body = {};

    //  axios
    //   .post(`http://51.89.210.56:8000/api/create-registration-detail`, body )
    //   .then((res) => {
    //     if (res.statusText == "OK") {
    //       hideConfirmationModal();
    //       let updatedArray = event.filter((item) => {
    //         return item["id"] != deletecardid;
    //       });
    //       if (typeof updatedArray !== "undefined") {
    //         setEvent(updatedArray);
    //       }
    //     }
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     toast.error("Something went wrong");
    //   });
  };

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
      <Col md={{ span: 6, offset: 3 }}>
        <h2>Registration Details</h2>
     
    <div>
      <br />
      Registration Page Title <input type="text" />
      <br />
      Body Text <textarea></textarea>
      <div>
        <h2>what data should be collected?</h2>
        <div onChange={handleRadioChange}>
          {inputbox.map((data) => {
            return (
              <>
                {data.value}
                <input type="checkbox" value={data.value} name={data.name} />
              </>
            );
          })}
        </div>
        <button onClick={addData}>Add data field</button>
        <div>
          {show == true ? (
            <>
              <input
                type="text"
                onChange={(e) => {
                  setField(e.target.value);
                }}
              />
              <button type="button" onClick={saveClicked}>
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setShow(false);
                  setField("");
                }}
              >
                Close
              </button>
            </>
          ) : null}
        </div>
      </div>
      <input type="file" onChange={(e) => fileChanged(e)} />
      <button className="btn btn-primary" onClick={submitData}>
        Submit
      </button>
    </div>
    </Col>
    </Row>
    </div>
  );
};
export default RegistraionDetails;
