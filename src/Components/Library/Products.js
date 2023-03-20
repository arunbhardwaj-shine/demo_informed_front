import React, { useState,useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { postData,deleteMethod } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { loader } from "../../loader";
import CommanModel from "../../Model/CommonModel"
import CommonConfirmModel from "../../Model/CommonConfirmModel"
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
  const [clickData, setClickData] = useState(0);

  const [newValue, setNewValue] = useState({
    newProductValue :"",
    category:0
  });
  const [show, setShow] = useState(false);
  const [BusinessUnitAll, setBusinessUnitAll] = useState([
    { value:3, label: "Critical Care" },
    { value:1, label: "Haematology" },
    { value: 2, label: "Immunotherapy" },
  ]);
 const [productData,setProductData] = useState({})
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
  const handleConfirmModel = async(id) =>{
      loader("show");
     await deleteMethod(`${ENDPOINT.SPC_PRO_DELETE}${id}`)
      setConfirmationPopup(false)
      loader("hide");
      setClickData(0)
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
                  <div className="col-12 selected-products-list d-flex">
                    {productData?.data?.map((item) => {
                      return (
                        <>
                          <Col xxl={3} xl={4} md={6}>
                            <div className="products-listing">
                              {item?.product}
                              <button
                                className="dlt_btn"
                                onClick={() => {
                                  setConfirmationPopup(true)
                                  setClickData(item?.id)
                                }
                              }
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
              </div>
            </div>
          </div>
        </Row>
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
       <CommonConfirmModel
       show={confirmationpopup}
       onClose={setConfirmationPopup}
       fun={handleConfirmModel}
       resetDataId={clickData}
       popupMessage={
        {
          "message1":"You are about to remove this popup forever.",
          "message2":" Are you sure you want to do this?",
          "footerButton":" Yes Please!"
        }
       }
       path_image={path_image}

      />
    </Col>
  );
}

export default Products;
