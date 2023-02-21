import React, { useState } from "react";

import { Modal, Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { popup_alert } from "../../../popup_alert";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const LibraryTopics = () => {
  const navigate = useNavigate();
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [BusinessUnitAll, setBusinessUnitAll] = useState([
    { value: "Critical", label: "Critical Care" },
    { value: "Haematology", label: "Haematology" },
    { value: "Immunotherapy", label: "Immunotherapy" },
  ]);

  const [newTopic, setNewTopic] = useState("");

  const [data, setData] = useState([
    "Product1",
    "Product2",
    "Product3",
    "Product4",
    "Product5",
    "Product6",
    "Product7",
    "Product8",
  ]);

  const addNewTopicChange = (e) => {
    setNewTopic(e.target.value);
  };

  const addTopicClicked = () => {
    if (newTopic != "") {
      setData((oldArray) => [...oldArray, newTopic]);
    }

    setShow(false);
  };

  const [BusinessUnit, setBusinessUnit] = useState("");
  const onBusinessUnitChange = (event) => {
    if (event.value == "Haematology") {
      setData([
        "Product1",
        "Product2",
        "Product3",
        "Product4",
        "Product5",
        "Product6",
        "Product7",
        "Product8",
      ]);
    } else if (event.value == "Immunotherapy") {
      setData(["Product1", "Product2", "Product3", "Product4", "Product5"]);
    } else if (event.value == "Critical") {
      setData(["Product1", "Product2"]);
    }
    setBusinessUnit(event.value);
  };
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title">
                <h2>Topics</h2>
              </div>
              <div className="top-right-action">
                <div className="header-btn">
                  <Button
                    className="btn-bordered cancel"
                    onClick={() => navigate("/library-create")}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
            <div className="create-change-content spc-content">
              <div className="form_action">
                <h4>Please select the business unit to show the topics</h4>
                <div className="row">
                  <div className="col-12">
                    <Form className="product-unit d-flex justify-content-between align-items-center">
                      <div className="form-group">
                        <label for="">Business unit</label>
                        <Select
                          options={BusinessUnitAll}
                          placeholder="Select business unit"
                          onChange={(event) => onBusinessUnitChange(event)}
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                      </div>
                      {BusinessUnit !== "" ? (
                        <Button
                          className="btn-bordered btn-voilet"
                          onClick={() => {
                            setNewTopic("");
                            setShow(true);
                          }}
                        >
                          Add New Topic +
                        </Button>
                      ) : null}
                    </Form>
                  </div>
                  {BusinessUnit == "" ? (
                    <div className="col-12 no-type-selected">
                      <div className="no-data-selected">
                        <h3>No BU selected yet!</h3>
                        <img src={path_image + "dummy-bu.png"} alt="" />
                      </div>
                    </div>
                  ) : (
                    <div className="col-12 selected-products-list d-flex">
                      {data.map((data) => {
                        return (
                          <>
                            <Col xxl={3} xl={4} md={6}>
                              <div className="products-listing">
                                {data}
                                <button
                                  className="dlt_btn"
                                  onClick={() => setConfirmationPopup(true)}
                                >
                                  <img
                                    src={path_image + "delete.svg"}
                                    alt="Delete Row"
                                  />
                                </button>
                              </div>
                            </Col>
                          </>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Col>

      <div className="delete">
        <Modal
          className="modal send-confirm"
          id="delete-confirm"
          show={confirmationpopup}
        >
          <Modal.Header>
            {/* <Modal.Title>Heading Text</Modal.Title>*/}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={(e) => setConfirmationPopup(false)}
            ></button>
          </Modal.Header>

          <Modal.Body>
            <img src={path_image + "alert.png"} alt="" />
            <h4>
              You are about to remove this popup forever.
              <br />
              Are you sure you want to do this?
            </h4>
            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                onClick={(e) => {
                  setConfirmationPopup(false);
                  popup_alert({
                    visible: "show",
                    message: "The topic has been deleted <br />successfully !",
                    type: "success",
                    redirect: "",
                  });
                }}
              >
                Yes Please!
              </button>
              <button
                type="button"
                className="btn btn-primary btn-bordered light"
                onClick={(e) => setConfirmationPopup(false)}
              >
                Cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <Modal show={show} className="send-confirm spc-create" id="download-qr">
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            Add New Topic
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              setShow(false);
              // setNewProduct("");
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <Form>
                <div className="form-group">
                  <label for="">Topic</label>
                  <input
                    type="text"
                    placeholder="Type your product name"
                    className="form-control"
                    onChange={(e) => addNewTopicChange(e)}
                  />
                </div>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary save btn-filled"
            onClick={addTopicClicked}
          >
            Add
          </button>
        </div>
      </Modal>
    </>
  );
};

export default LibraryTopics;
