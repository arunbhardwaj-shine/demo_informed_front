import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import Select from "react-select";
import CommonModel from "../../Model/CommonModel";
import { popup_alert } from "../../popup_alert";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

function Products() {
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [BusinessUnitAll, setBusinessUnitAll] = useState([
    { value: "Critical", label: "Critical Care" },
    { value: "Haematology", label: "Haematology" },
    { value: "Immunotherapy", label: "Immunotherapy" },
  ]);

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

  const [BusinessUnit, setBusinessUnit] = useState("");
  const onBusinessUnitChange = (event) => {
    console.log(event.value);
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

  const addProductClicked = () => {
    if (newProduct != "") {
      setData((oldArray) => [...oldArray, newProduct]);
    }

    setShow(false);
  };

  const addNewProductChanged = (e) => {
    setNewProduct(e.target.value);
  };

  const product = [
    {
      label: "Product name",
      stateLabel: "product name",
      type: "input",
      placeholder: "Type your product name",
    },
  ];
  return (
    <Col className="right-sidebar">
      <div className="custom-container">
        <Row>
          <div className="top-header">
            <div className="page-title">
              <h2>Products</h2>
            </div>
          </div>
          <div className="create-change-content spc-content">
            <div className="form_action">
              <h4>Please select the business unit to show the products </h4>
              <div className="row">
                <div className="col-12">
                  <Form className="product-unit d-flex justify-content-between align-items-center">
                    <div className="form-group">
                      <label htmlFor="">Business Unit</label>
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
                          setNewProduct("");
                          setShow(true);
                        }}
                      >
                        Add New Product +
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

      <CommonModel
        show={show}
        onClose={setShow}
        heading={"Add New Product"}
        footerButton={"Add"}
        data={product}
        handleChange={addNewProductChanged}
        handleSubmit={addProductClicked}
      />

      {/* <Modal show={show} className="send-confirm spc-create" id="download-qr">
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            Add New Product
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
                  <label htmlFor="">Product name</label>
                  <input
                    type="text"
                    placeholder="Type your product name"
                    className="form-control"
                    onChange={(e) => addNewProductChanged(e)}
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
            onClick={addProductClicked}
          >
            Add
          </button>
        </div>
      </Modal> */}
    </Col>
  );
}

export default Products;
