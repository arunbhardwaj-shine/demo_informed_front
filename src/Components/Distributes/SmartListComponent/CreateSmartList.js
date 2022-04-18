import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "./Table";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button, Modal } from "react-bootstrap";

const CreateSmartList = () => {
  const [show, setShow] = useState(false);
  const [smartListName, setSmartListName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [api_flag, setapi_flag] = useState(0);
  const [data, setData] = useState([]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleSmartListName = async (event) => {
    setSmartListName(event.target.value);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    //  console.log("hi");
    console.log(selectedFile);
  };

  const saveButtonClicked = async () => {
    let formData = new FormData();
    formData.append("user_id", 18207);
    formData.append("smart_list_name", smartListName);
    formData.append("reader_file", selectedFile);

    console.log(formData);

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    await axios
      .post(`distributes/create_smart_list_with_excel`, formData)
      .then((res) => {
        console.log(res);
        // setapi_flag(1);
        setData(res.data.response.data);
        // console.log(data);
        //  props.getUpdatedData(res.data.response.data);
        setapi_flag(api_flag + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    //here you will have correct value in userInput
  }, [smartListName]);

  if (api_flag > 0) {
    return (
      <>
        <Table
          data={data}
          smartListDatafn={saveButtonClicked}
          api_flag={setapi_flag}
          smartListName={smartListName}
          url="CreateSmartList"
        />
      </>
    );
  }

  return (
    <>
      <div className="row">
        <button className="btn-cancel">cancel</button>
        <button className="btn-nxt">Next</button>
      </div>
      <div className="row">
        <div className="step1">
          <div className="col-sm-6">
            <input
              type="text"
              name="smart_list_name"
              value={smartListName}
              onChange={(event) => handleSmartListName(event)}
            />
          </div>
          <div className="col-sm-6">
            <input type="text" name="creator_name" />
          </div>
        </div>
        <div className="step2">
          <div className="col-sm-6">
            <Link to="/SmartListFilter">
              <img src="/componentAssets/img/upload_hcp.png" width="300px" />
            </Link>
          </div>
          <div className="col-sm-6">
            <img
              src="/componentAssets/img/upload.png"
              width="300px"
              onClick={handleShow}
            />
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {/* <Modal.Title>New HCP</Modal.Title>
            <button className="btn btn-secondary" style={{ margin: "10px" }}>
              Add HCP +{" "}
            </button>
            <button
              className="btn-secondary"
              variant="primary"
              style={{ margin: "5px" }}
            >
              Upload Excel
            </button> */}
          </Modal.Header>{" "}
          <Modal.Body>
            <div class="card">
              <div class="card-header">upload</div>
              <div class="card-body">
                <p class="card-text">upload your new list file</p>
                <input type="file" onChange={onFileChange}></input>
              </div>
            </div>
          </Modal.Body>
          {/* <div className="container">
            <div className="row align-items-center vh-100">
              <div className="col-6 mx-auto">
                <div className="card shadow border">
                  <div className="card-body d-flex flex-column align-items-center">
                    <div className="card-title">
                      first name <input type="text"></input>
                      last name <input type="text"></input>
                      email <input type="text"></input>
                      contact type <input type="text"></input>
                      country <input type="text"></input>
                      <br />
                      <Button
                        variant="primary"
                        onClick={handleShowUploadMenu}
                        style={{ margin: "5px" }}
                      >
                        Upload Excel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* {renderCounterData.map((data) => {
            return <>{data}</>;
          })} */}
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={saveButtonClicked}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default CreateSmartList;
