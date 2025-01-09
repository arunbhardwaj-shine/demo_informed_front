import React, { useState,useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { postData,deleteMethod } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { loader } from "../../loader";
import CommanModel from "../../Model/CommonModel"
import CommonConfirmModel from "../../Model/CommonConfirmModel"
import { popup_alert } from "../../popup_alert";
let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;

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
  const [flag, setFlag] = useState(0);

  const [content,setContent] = useState({
    label:"Product",
    value:1
  })
  const [SelectType, setSelectType] = useState([
    { value:1, label: "Product" },
    { value: 2, label: "Topics" },
  ]);
  const [BusinessUnitAll, setBusinessUnitAll] = useState([
    { value:3, label: "Critical Care" },
    { value:1, label: "Haematology" },
    { value: 2, label: "Immunotherapy" },
  ]);
 const [productData,setProductData] = useState({})
  const initFun = async() =>{
    loader("show");
    const resp =  await postData(ENDPOINT.SPC_PRO_LISTING,{
        user_id:localStorage.getItem("user_id"),
        type:content?.value,
        category:newValue?.category
      })
      setProductData(resp?.data?.data)
      loader("hide");
  }
  useEffect (()=>{
    initFun()
  },[newValue?.category,content])

  const handleSubmit = async(e) =>{
    loader("show");
    try{
      await postData(ENDPOINT.ADD_SPC_PRODUCT,{
        user_id:localStorage.getItem("user_id"),
        product:newValue?.newProductValue,
        category:newValue?.category,
        type:content?.value
      })
      loader("hide");
      initFun()
    }catch(err){
      loader("hide");
    }
  }
  const handleConfirmModel = async(id) =>{
      setConfirmationPopup(false)
      loader("show");
      try{
        await deleteMethod(`${ENDPOINT.SPC_PRO_DELETE}${id}`)
         loader("hide");
         setClickData(0)
         initFun()
         popup_alert({
           visible: "show",
           message: "Your Products has been deleted <br />successfully !",
           type: "success",
           redirect: "",
         });
      }catch(err){
        loader("hide");
      }
  }
  const handleChange = (e) =>{
    setNewValue({...newValue,newProductValue:e.target.value})
  }
  return (
    <Col className="right-sidebar">
      <div className="custom-container">
        <Row>
          <div className="top-header">
              <div className="page-title d-flex">
                <h2>Products</h2>
              </div>
          </div>
          <div className="create-change-content spc-content">
            <div className="form_action">
            {
                productData?.flag?(
                  <h4>Please select the business unit to show the products</h4>
                ):null
            }
                  <Form className="product-unit d-flex justify-content-between align-items-center">
                  {
                      productData?.flag?(
                        <Form.Group className="form-group full">
                        <label htmlFor="">Business Unit</label>
                        <Select
                          options={BusinessUnitAll}
                          placeholder="Select business unit"
                          onChange={(e) => setNewValue({...newValue,category:e?.value})}
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                      </Form.Group>
                    ):null
                  }
                    <Form.Group className="form-group">
                        <label htmlFor="">Select type</label>
                        <Select
                          options={SelectType}
                          placeholder="Select type"
                          defaultValue={SelectType?.[0]}
                          onChange={(e) => setContent({label:e?.label,value:e?.value})}
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                    </Form.Group>

                      <Button
                        className="btn-bordered btn-voilet"
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        Add New {content?.label?.trim()} +
                      </Button>
                  </Form>
                </div>
                <Row>
                  <div className="col-12 selected-products-list d-flex">
                    {productData?.length? productData?.data?.map((item,i) => {
                      return (
                        <React.Fragment key={i}>
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
                        </React.Fragment>
                      );
                    }):<div className="no_found"><p>No Data Found</p></div>  }
                  </div>
                  </Row>
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
          "message1":"You are about to remove this product forever.",
          "message2":"Are you sure you want to do this?",
          "footerButton":" Yes Please!"
        }
       }
       path_image={path_image}

      />
    </Col>
  );
}

export default Products;
