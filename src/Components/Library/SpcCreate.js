import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { postFormData, postData } from "../../axios/apiHelper";
import { popup_alert } from "../../popup_alert";
import { SPCValidation } from "../Validations/LibraryValidation/SPCValidation";
import CommonModel from "../../Model/CommonModel";
import { ENDPOINT } from "../../axios/apiConfig";
import { loader } from "../../loader";
import { toast } from "react-toastify";

const SpcCreate = () => {
  const [ibu, setIbu] = useState([
    { value: "Critical Care", label: "Critical Care" },
    { value: "Haematology", label: "Haematology" },
    { value: "Immunotherapy", label: "Immunotherapy" },
  ]);
  const [countryAll, setCountryAll] = useState([]);
  const [language, setLanguage] = useState([]);
  const navigate = useNavigate();
  const [productArr, setProductArr] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [show, setShow] = useState(false);
  const [userInputs, setSpcFormInputs] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    getSpcData();
  }, []);

  const getSpcData = async () => {
    try {
      loader("show");
      let body = {
        user_id: localStorage.getItem("user_id"),
      };
      const res_data = await postData(ENDPOINT.SPC_HELPER_LISTING, body);
      let allListingData = res_data?.data?.data;
      let spcprodusts = [];
      Object.entries(res_data?.data?.data?.spcProduct).map(([index, item]) => {
        spcprodusts.push({
          value: item.product,
          label: item.product,
        });
        setProductArr(spcprodusts);
      });

      let countries = [];
      Object.entries(res_data?.data?.data?.country).map(([index, item]) => {
        countries.push({
          value: item,
          label: item,
        });
        setCountryAll(countries);
      });

      let lng = [];
      Object.entries(res_data?.data?.data?.language).map(([index, item]) => {
        lng.push({
          value: item,
          label: item,
        });
        setLanguage(lng);
      });
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  const handleChange = (e, isSelectedName) => {
    if (e?.target?.files?.length < 1) {
      return;
    }

    if (isSelectedName == "product") {
      let productVal = e.map((pdata) => {
        return pdata.value;
      });
      setSpcFormInputs({
        ...userInputs,
        [isSelectedName ? isSelectedName : e?.target?.name]: productVal,
      });
    } else {
      setSpcFormInputs({
        ...userInputs,
        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e?.target?.files
            ? e?.target?.files
            : e
          : e?.target?.value,
      });
    }
    setError({});
  };

  const addNewProductClicked = (e) => {
    e.preventDefault();
    setNewProduct("");
    setShow(true);
  };

  const addProductClicked = async () => {
    if (newProduct.trim() != "") {
      try {
        loader("show");
        let body = {
          user_id: localStorage.getItem("user_id"),
          product: newProduct,
          category: 0,
          type: 1,
        };
        const res = await postData(ENDPOINT.ADD_SPC_PRODUCT, body);
        setProductArr((oldArray) => [
          ...oldArray,
          { value: newProduct, label: newProduct },
        ]);
        toast.success(res?.data?.message);
      } catch (err) {
        console.log("--err", err);
      } finally {
        loader("hide");
      }
    }

    setShow(false);
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

  const publishClicked = async (event) => {
    event.preventDefault();
    try {
      loader("show");
      const result = SPCValidation(userInputs);

      if (Object.keys(result)?.length) {
        toast.error(result[Object.keys(result)[0]]);
        setError(result);
        loader("hide");
        return;
      }
      const data = new FormData(event.target);
      data.append("createdBy", localStorage.getItem("user_id"));
      await postFormData(ENDPOINT.SPCCREATE, data, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      });
      popup_alert({
        visible: "show",
        message: "Your SPC has been published <br />successfully !",
        type: "success",
        redirect: "/spc-view",
      });
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <Form onSubmit={publishClicked}>
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
                  <Button className="btn-filled send_btn" type="submit">
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
                        <label htmlFor="">
                          Title of SPC <span>*</span>
                        </label>

                        <input
                          type="text"
                          onChange={(e) => handleChange(e)}
                          className={
                            error?.title ? "form-control error" : "form-control"
                          }
                          name="title"
                        />

                        {/*
                          <input
                            type="text"
                            className="form-control"
                            name="createdBy"
                            value=localStorage.getItem("user_id")
                          />
                          */}

                        {error?.title ? (
                          <div className="login-validation">{error?.title}</div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="">
                          Country <span>*</span>
                        </label>
                        <Select
                          options={countryAll}
                          placeholder="Select country"
                          name="country"
                          onChange={(event) =>
                            handleChange(event?.value, "country")
                          }
                          className={
                            error?.country
                              ? "dropdown-basic-button split-button-dropup error"
                              : "dropdown-basic-button split-button-dropup"
                          }
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
                        <label htmlFor="">
                          Language <span>*</span>
                        </label>
                        <Select
                          options={language}
                          placeholder="Select SPC language"
                          name="langauge"
                          onChange={(event) =>
                            handleChange(event?.value, "language")
                          }
                          className={
                            error?.language
                              ? "dropdown-basic-button split-button-dropup error"
                              : "dropdown-basic-button split-button-dropup"
                          }
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
                        <label htmlFor="">
                          Business Unit <span>*</span>
                        </label>
                        <Select
                          options={ibu}
                          name="ibu"
                          placeholder="Select Business Unit"
                          onChange={(event) =>
                            handleChange(event?.value, "businessunit")
                          }
                          className={
                            error?.businessunit
                              ? "dropdown-basic-button split-button-dropup error"
                              : "dropdown-basic-button split-button-dropup"
                          }
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
                        <label htmlFor="">
                          Product <span>*</span>
                        </label>
                        <Select
                          options={productArr}
                          name="product"
                          placeholder="Select product"
                          onChange={(event) => handleChange(event, "product")}
                          className={
                            error?.product
                              ? "dropdown-basic-button split-button-dropup extra_multiselect error"
                              : "dropdown-basic-button split-button-dropup extra_multiselect"
                          }
                          isClearable
                          isMulti="true"
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
                        <label htmlFor="">
                          Upload SPC <span>*</span>
                        </label>
                        <div
                          className={
                            error?.uploadspc
                              ? "upload-file-box error"
                              : "upload-file-box"
                          }
                        >
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
                              <p className="uploaded-file">
                                {userInputs?.uploadspc?.[0]?.name}
                              </p>
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
    </>
  );
};

export default SpcCreate;
