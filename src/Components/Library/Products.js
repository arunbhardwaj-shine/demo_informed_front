import React, { useState,useEffect } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import Select from "react-select";
import { popup_alert } from "../../popup_alert";
import { postData, } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { loader } from "../../loader";
import CommanModel from "../../Model/CommonModel"

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const downloadData = [
  {
    label: "Product name",
    type: "input",
    placeholder: "Type your product name",
  },
];
function Products() {
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [newValue, setNewValue] = useState({
    newProductValue :"",
    category:0
  });

  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [BusinessUnitAll, setBusinessUnitAll] = useState([
    { value:3, label: "Critical Care" },
    { value:1, label: "Haematology" },
    { value: 2, label: "Immunotherapy" },
  ]);
 const [productData,setProductData] = useState({})
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
 

  const initFun = async() =>{
    loader("show");
    const resp =  await postData(ENDPOINT.SPC_PRO_LISTING,{
        userId:29836198,
        type:1,
        category:newValue?.category
      })
      setProductData(resp?.data?.data)
      loader("hide");
  }
  useEffect (()=>{
    initFun()
  },[newValue?.category])
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
  const handleSubmit = async(e) =>{
    loader("show");
     await postData(ENDPOINT.ADD_SPC_PRODUCT,{
        userId:29836198,
        product:newValue?.newProductValue,
        category:newValue?.category,
        type:1
      })
      loader("hide");
      initFun()

  }
  const handleChange = (e) =>{
    setNewValue({...newValue,newProductValue:e.target.value})
  }
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
                  {
                      productData?.flag?(
                        <div className="form-group">
                        <label htmlFor="">Business Unit</label>
                        <Select
                          options={BusinessUnitAll}
                          placeholder="Select business unit"
                          onChange={(e) => setNewValue({...newValue,category:e?.value})}
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                  </div>
                  ):null
                }
                  
                    {/* {BusinessUnit !== "" ? ( */}
                      <Button
                        className="btn-bordered btn-voilet"
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        Add New Product +
                      </Button>
                  </Form>
                </div>
                {/* {BusinessUnit == "" ? (
                  <div className="col-12 no-type-selected">
                    <div className="no-data-selected">
                      <h3>No BU selected yet!</h3>
                      <img src={path_image + "dummy-bu.png"} alt="" />
                    </div>
                  </div>
                ) : ( */}
                  <div className="col-12 selected-products-list d-flex">
                    {productData?.data?.map((item) => {
                      return (
                        <>
                          <Col xxl={3} xl={4} md={6}>
                            <div className="products-listing">
                              {item?.product}
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
                {/* )} */}
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
      <CommanModel
        show={show}
        onClose={setShow}
        heading={"Add New Product"}
        data={downloadData}
        footerButton={"Add"}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Col>
  );
}

export default Products;
