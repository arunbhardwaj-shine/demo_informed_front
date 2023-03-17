import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {postFormData,postData} from "../../axios/apiHelper"
import { popup_alert } from "../../popup_alert";
import { SPCValidation } from "../Validations/LibraryValidation/SPCValidation";
import CommonModel from "../../Model/CommonModel";
import {ENDPOINT} from "../../axios/apiConfig"

const SpcCreate = () => {
  const [countryAll, setCountryAll] = useState([
    { value: "India", label: "India" },
    { value: "Australia", label: "Australia" },
    { value: "Russia", label: "Russia" },
  ]);
  const navigate = useNavigate();
  const [productArr, setProductArr] = useState([
    { value: "India", label: "India" },
    { value: "Australia", label: "Australia" },
    { value: "Russia", label: "Russia" },
  ]);
  const [newProduct, setNewProduct] = useState("");
  const [show, setShow] = useState(false);
  const [userInputs, setSpcFormInputs] = useState({});
  const [error, setError] = useState({});

  const handleChange = (e, isSelectedName) => {
    if (e?.target?.files?.length < 1) {
      return;
    }
    setSpcFormInputs({
      ...userInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e?.target?.files
          : e
        : e?.target?.value,
    });
    // const result = SPCValidation({
    //   ...userInputs,
    //   [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
    //     ? e?.target?.files
    //       ? e?.target?.files
    //       : e
    //     : e?.target?.value,
    // });
    // if (Object.keys(result)?.length) {
    //   setError(result);
    //   return;
    // }
    setError({});
  };

  const addNewProductClicked = (e) => {
    e.preventDefault();
    setNewProduct("");
    setShow(true);
  };

  const addProductClicked = () => {
    setShow(false);
    if (newProduct != "") {
      setProductArr((oldArray) => [
        ...oldArray,
        { value: newProduct, label: newProduct },
      ]);
    }
  };

  const product = [
    {
      label: "Product name",
      type: "input",
      placeholder: "Type your product name",
    },
  ];

  const addNewProductChanged = (e) => {
    setNewProduct(e.target.value);
  };

  const publishClicked = async(event) => {
    event.preventDefault()
  
    const result = SPCValidation(userInputs);

    if (Object.keys(result)?.length) {
      setError(result);
      return;
    }
    const data = new FormData(event.target);
    await postFormData(ENDPOINT.SPCCREATE,data,{
      header:{
        "Content-Type": "multipart/form-data",
      }
    });


    popup_alert({
      visible: "show",
      message: "Your HCP has been published <br />successfully !",
      type: "success",
      redirect: "",
    });
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
          <Form onSubmit={publishClicked} >
            <div className="top-header">
              <div className="page-title">
                <h2>Create SPC</h2>
              </div>
              <div className="header-btn">
                <Button
                  className="btn-bordered cancel"
                 
                  onClick={() => navigate("/spc")}
                >
                  Cancel
                </Button>
                <Button
                  className="btn-filled send_btn"
                  type="submit"
                >
                  Publish
                </Button>
              </div>
            </div>

            <div className="create-change-content spc-content">
              <div className="form_action">
                <h4>Please fill the following and upload SPC needed</h4>
                <div className="row">
                  <div className="col-12">
                   
                      <div className="form-group">
                        <label htmlFor="">Title of SPC</label>

                        <input
                          type="text"
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          name="title"
                        />
                        <input
                          type="text"
                          className="form-control"
                          name="createdBy"
                          value="18207"
                        />
                     
                        {error?.title ? (
                          <div className="login-validation">{error?.title}</div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="">Country</label>
                        <Select
                          options={countryAll}
                          placeholder="Select country"
                          name="country"
                          onChange={(event) =>
                            handleChange(event?.value, "country")
                          }
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                        {error?.country ? (
                          <div className="login-validation">
                            {error?.country}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Language</label>
                        <Select
                          options={countryAll}
                          placeholder="Select SPC language"
                          name="langauge"
                          onChange={(event) =>
                            handleChange(event?.value, "language")
                          }
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                        {error?.language ? (
                          <div className="login-validation">
                            {error?.language}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Business Unit</label>
                        <Select
                          options={countryAll}
                          name="ibu"
                          placeholder="Select Business Unit"
                          onChange={(event) =>
                            handleChange(event?.value, "businessunit")
                          }
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                        {error?.businessunit ? (
                          <div className="login-validation">
                            {error?.businessunit}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Product</label>
                        <Select
                          options={productArr}
                          name="product"
                          placeholder="Select product"
                          onChange={(event) =>
                            handleChange(event?.value, "product")
                          }
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                        <div className="add_product">
                          <span>&nbsp;</span>
                          <Button
                            onClick={addNewProductClicked}
                            className="btn-bordered btn-voilet"
                          >
                            Add New Product +
                          </Button>
                        </div>
                        {error?.product ? (
                          <div className="login-validation">
                            {error?.product}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="form-group val">
                        <label htmlFor="">Upload SPC</label>
                        <div className="upload-file-box">
                          <div className="box">
                            <input
                              type="file"
                              name="file"
                              id="file-6"
                              className="inputfile inputfile-6"
                              accept="application/pdf"
                              onChange={(event) =>
                                handleChange(event, "uploadspc")
                              }
                            />
                            <label htmlFor="file-6">
                              <span>Choose Your File</span>
                            </label>
                            {userInputs?.uploadspc?.[0]?.name ? (
                              <h5>{userInputs?.uploadspc?.[0]?.name}</h5>
                            ) : (
                              <p>
                                Upload your SPC file <br />
                                <span>(Please upload PDF file only)</span>
                              </p>
                            )}
                          </div>
                        </div>
                        {error?.uploadspc ? (
                          <div className="login-validation">
                            {error?.uploadspc}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                   
                  </div>
                </div>
              </div>
            </div>
            </Form>
          </Row>
        </div>
      </Col>

      <CommonModel
        show={show}
        onClose={setShow}
        heading={"Add New Product"}
        data={product}
        footerButton={"Add"}
        handleChange={addNewProductChanged}
        handleSubmit={addProductClicked}
        inputValue
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
              setNewProduct("");
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <Form>
                <div className="form-group">
                  <label htmlFor="">Product Name</label>
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
    </>
  );
};

export default SpcCreate;
