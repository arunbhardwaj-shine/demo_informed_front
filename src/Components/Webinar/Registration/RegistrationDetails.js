import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
const RegistraionDetails = () => {
  const [inputbox, setInputBox] = useState([
    { value: "Name", name: "Name" },
    { value: "Email", name: "Email"},
    { value: "Region", name: "Region"},
    { value: "Dr Number", name: "Dr number" },
    { value: "State", name: "State"},
    { value: "Hospital", name: "Hospital"},
    { value: "Profession", name: "Profession" },
    { value: "ConSent", name: "ConSent"},
  ]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [checkboxData, setcheckboxData] = useState([]);
  const [show, setShow] = useState(false);
  const [image, setimage] = useState();
  const [field, setField] = useState("");
  const handeleimage = (e) => {
    if (e?.target?.files[0].type.match(/\/(jpg|jpeg|png)$/)) {
      let file = e.target.files[0];
      setimage(e.target.files[0]);
      if (file) {
        const preview = document.getElementById("imgVieww");
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          function () {
            preview.src = reader.result;
          },
          false
        );
        reader.readAsDataURL(file);
      }
    } 
  };
  useEffect(() => {
    console.log("Hello in Registraion Details");
  }, []);


  const handleRadioChange = (e) => {
    if(e.target.name=="required"){
       alert(e.target.checked)
      console.log(e.target.checked)
    }else{
      alert(e.target.value)
      alert(e.target.checked)

    }

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
    setInputBox((oldArray) => [...oldArray, { value: field, name: field }]);
    setField("");
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
      <Col md={{ span: 7, offset: 3 }}>
        <h2>Registration Details</h2>
    <div>
      <Row>
        <Col xs={8}>
        <br />
      Registration Page Title <input type="text" />
      <br />
      Body Text <textarea></textarea>
      <div>
        <h2>what data should be collected?</h2>
        <div>
          {inputbox.map((data,i) => {
            return (
              <>
               <label>{data.value}</label> 
                <input type="checkbox" onChange={(e)=>handleRadioChange(e,i)} value={data.value} name={data.name} />
                <br/>
               <label>required</label> 
                <input type="checkbox"onChange={(e)=>handleRadioChange(e,i)}  name="required" />
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

        </Col>
        <Col>
        <div>
                          <img
                            id="imgVieww"
                            src=""
                            alt="Viewing the registration page image"
                            width={340}
                          />
                        </div>
        </Col>
      </Row>
      <input type="file" onChange={(e) => handeleimage(e)} />
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
