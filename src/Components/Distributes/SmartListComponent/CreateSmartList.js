import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavigationType } from "react-router-dom";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button, Modal } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loader } from "../../../loader";

const CreateSmartList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { creator } = location.state != null ? location.state : "";
  const [show, setShow] = useState(false);
  const [smartListName, setSmartListName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [api_flag, setapi_flag] = useState(0);
  const [data, setData] = useState([]);
  const [activeClass, setActiveClass] = useState();
  const [filename, setFileName] = useState();
  const [rendervalidation, setRenderValidation] = useState(0);
  const [validator] = React.useState(new SimpleReactValidator());

  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED;

  const handleClose = () => {
    setShow(false);
    setSelectedFile(null);
  };
  const handleShow = () => setShow(true);

  const handleSmartListName = async (event) => {
    setSmartListName(event.target.value);
  };

  const handleCreatorName = async (event) => {
    setCreatorName(event.target.value);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const saveButtonClicked = () => {
    console.log(data);
    if (selectedFile != null) {
      setShow(false);
      setFileName(selectedFile.name);
      toggleSelection("upload_excel");
    } else {
      toast.success("Please upload a file.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
      });
    }
  };

  const toggleSelection = (elm) => {
    if (activeClass == elm) {
      var element = document.querySelector("#" + elm);
      if (element.classList.contains("active")) {
        element.classList.remove("active");
        setActiveClass();
      } else {
        element.classList.add("active");
        setActiveClass(elm);
      }
    } else {
      var allElements = document.querySelectorAll(".custom_img");
      for (let i = 0; i < allElements.length; i++) {
        allElements[i].classList.remove("active");
      }
      var element = document.querySelector("#" + elm);
      if (element.classList.contains("active")) {
        element.classList.remove("active");
        setActiveClass();
      } else {
        element.classList.add("active");
        setActiveClass(elm);
      }
    }
  };

  const clickNext = (event) => {
    if (validator.allValid()) {
      if (activeClass == "upload_excel") {
        uploadFile();
      } else {
        navigate("/SmartListFilter", {
          state: { smartListName: smartListName },
        });
      }
    } else {
      console.log("show error messages");
      console.log(validator.errorMessages);
      validator.showMessages();
      setRenderValidation(rendervalidation + 1);
    }
    // navigate("/SmartListFilter", {state: { smartListName: "My test" }});
  };
  // if (validator.allValid()) {
  //   if (activeClass == "upload_excel") {
  //     uploadFile();
  //   }else{
  //     alert("sdfdsf");
  //     navigate("/SmartListFilter", { replace: true });
  //   }
  // } else {
  //   validator.showMessages();
  // }
  // let error = false;
  // if (smartListName == "") {
  //   error = true;
  //   alert("Please Enter Smart List name.");
  // } else if (activeClass == "" || typeof activeClass === "undefined") {
  //   error = true;
  //   alert("Please select one segment.");
  // }
  //
  // if (activeClass == "upload_excel") {
  //   uploadFile();
  //
  //   event.preventDefault();
  // } else {
  //   if (error) {
  //     event.preventDefault();
  //   }
  // }

  const uploadFile = async () => {
    let formData = new FormData();
    formData.append("user_id", 18207);
    formData.append("smart_list_name", smartListName);
    formData.append("reader_file", selectedFile);

    console.log(formData);

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`distributes/create_smart_list_with_excel`, formData)
      .then((res) => {
        setData(res.data.response.data);
        navigate("/UploadExcel", {
          state: { data: res.data.response.data, smartListName: smartListName },
        });
        loader("hide");
        setapi_flag(api_flag + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    //here you will have correct value in userInput
    if (typeof creator !== "undefined" && creator != "") {
      setCreatorName(creator);
    }
  }, [smartListName]);

  // if (api_flag > 0) {
  //   return (
  //     <>
  //       <Table
  //         data={data}
  //         smartListDatafn={saveButtonClicked}
  //         api_flag={setapi_flag}
  //         smartListName={smartListName}
  //         url="CreateSmartList"
  //       />
  //     </>
  //   );
  // }

  return (
    <>
      <div className="col right-sidebar">
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
        <div className="row">
          <Link to="/SmartList">
            <button className="btn-cancel">cancel</button>
          </Link>
          <button className="btn-nxt" onClick={(event) => clickNext(event)}>
            Next
          </button>
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
              {validator.message("Smart List Name", smartListName, "required")}
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                name="creator_name"
                value={creatorName}
                onChange={(event) => handleCreatorName(event)}
              />
              {validator.message("Creator Name", creatorName, "required")}
            </div>
          </div>
          <div className="step2">
            <div className="col-sm-6">
              <img
                className="custom_img"
                id="upload_filter"
                src={path + "upload_hcp.png"}
                width="300px"
                onClick={(event) => toggleSelection("upload_filter")}
              />
            </div>
            <div className="col-sm-6">
              <img
                className="custom_img"
                id="upload_excel"
                src={path + "upload.png"}
                width="300px"
                onClick={handleShow}
              />
              {filename != "" ? <p>{filename}</p> : null}
            </div>
            <input type="hidden" id="segment" value={activeClass} />
            {validator.message("segment", activeClass, "required")}
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
              <div className="card">
                <div className="card-header">upload</div>
                <div className="card-body">
                  <p className="card-text">upload your new list file</p>
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
                Ok
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CreateSmartList;
