import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import {postFormData,postData,getData} from "../../axios/apiHelper"
import { popup_alert } from "../../popup_alert";
import { SPCValidation } from "../Validations/LibraryValidation/SPCValidation";
import CommonModel from "../../Model/CommonModel";
import {ENDPOINT} from "../../axios/apiConfig";
import { loader } from "../../loader";
import { toast } from "react-toastify";

const SpcEdit = () => {
  const { state } = useLocation();
  const [countryAll, setCountryAll] = useState([]);
  const [ibu, setIbu] = useState([
    { value: "Haematology", label: "Haematology" },
    { value: "Critical Care", label: "Critical Care" },
    { value: "Immunotherapy", label: "Immunotherapy" },
  ]);
  const [language, setLanguage] = useState([]);
  const navigate = useNavigate();
  const [productArr, setProductArr] = useState([]);
  const [productInput, setProductInput] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [show, setShow] = useState(false);
  const [userInputs, setSpcFormInputs] = useState({});
  const [error, setError] = useState({});
  const [pageLoad, setPageLoad] = useState(0);

  useEffect(() => {
	   getSpcData();
  }, []);

  const getSpcData = async() => {
    loader("show");
    try{
      let body = {
        "user_id": localStorage.getItem("user_id")
      };
      const res_data = await postData(ENDPOINT.SPC_HELPER_LISTING,body);
      let allListingData = res_data?.data?.data;
      let spcprodusts = [];
      Object.entries(res_data?.data?.data?.spcProduct).map(([index, item]) => {
        spcprodusts.push({
          value: item.product,
          label: item.product,
        });
        setProductArr(spcprodusts);
      });

      let countries = []
      Object.entries(res_data?.data?.data?.country).map(([index, item]) => {
        countries.push({
          value: item,
          label: item,
        });
        setCountryAll(countries);
      });

      let lng = []
      Object.entries(res_data?.data?.data?.language).map(([index, item]) => {
        lng.push({
          value: item,
          label: item,
        });
        setLanguage(lng);
      });

      if(state?.spcId){
          try{
            const res = await getData(ENDPOINT.LIBRARYGETSINGLESPC+"/"+state?.spcId);
            setSpcFormInputs({
              "title": res?.data?.data?.title,
              "country": res?.data?.data?.country,
              "language": res?.data?.data?.language,
              "businessunit": res?.data?.data?.IBU,
              "product": res?.data?.data?.product,
              "uploadspc": {
                "0": {"name":res?.data?.data?.file_name}
              }
            });

            let userProducts = [];
            if(isJson(res?.data?.data?.product)){
                let parsedObj = JSON.parse(res?.data?.data?.product);
                Object.entries(parsedObj).map(([index, item]) => {
                  userProducts.push({
                    value: item,
                    label: item,
                  });
                });
            }else{
              userProducts = {
                value: res?.data?.data?.product,
                label: res?.data?.data?.product,
              };
            }
            setProductInput(userProducts);
          }catch(err){
            loader("hide");
          }
          setPageLoad(1);
          loader("hide");
      }
    }catch(err){
      loader("hide");
    }
  }

  const handleChange = (e, isSelectedName) => {
    if (e?.target?.files?.length < 1) {
      return;
    }
    if(isSelectedName == "product"){
      let productVal = e.map((pdata) => {
        return pdata.value;
      });
      setSpcFormInputs({
        ...userInputs,
        [isSelectedName ? isSelectedName : e?.target?.name]: productVal
      });
    }else{
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

  const addProductClicked = async() => {
    loader("show");
    if (newProduct.trim() != "") {
      try{
        let body = {
          "user_id":localStorage.getItem("user_id"),
          "product":newProduct,
          "category":0,
          "type":1
        };
        const res = await postData(ENDPOINT.ADD_SPC_PRODUCT,body);
        setProductArr((oldArray) => [
          ...oldArray,
          { value: newProduct, label: newProduct },
        ]);
        toast.success(res?.data?.message);
      }catch(err){
        loader('hide');
      }
    }
    loader('hide');
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

  const publishClicked = async(event) => {
    loader('show');
    event.preventDefault()
    const result = SPCValidation(userInputs);

    if (Object.keys(result)?.length) {
      setError(result);
      loader('hide');
      return;
    }
    const data = new FormData(event.target);
    data.append('id',state?.spcId);
    data.append('createdBy',localStorage.getItem("user_id"));
    await postFormData(ENDPOINT.SPC_UPDATE,data,{
      header:{
        "Content-Type": "multipart/form-data",
      }
    });
    loader('hide');
    popup_alert({
      visible: "show",
      message: "Your HCP has been published <br />successfully !",
      type: "success",
      redirect: "spc-view",
    });
  };

  const isJson  = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  };


  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
		  {
			  pageLoad == 1 && (
				  <Form onSubmit={publishClicked} >
					<div className="top-header">
					  <div className="page-title">
						<h2>Update SPC</h2>
					  </div>
					  <div className="header-btn">
						<Button
						  className="btn-bordered cancel"

						  onClick={() => navigate("/spc-view")}
						>
						  Cancel
						</Button>
						<Button
						  className="btn-filled send_btn"
						  type="submit"
						>
						  Update
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
								  value={userInputs?.title}
								  name="title"
								/>
                {
                  /*
                  <input
  								  type="text"
  								  className="form-control"
  								  name="createdBy"
  								  value=localStorage.getItem("user_id")
  								/>
                  */
                }


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
								  defaultValue={
									countryAll[countryAll.findIndex(el => el.value == userInputs?.country)]
								  }
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
								  options={language}
								  placeholder="Select SPC language"
								  name="langauge"
								  onChange={(event) =>
									handleChange(event?.value, "language")
								  }
								  defaultValue={
									  language[language.findIndex(el => el.value == userInputs?.language)]
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
								  options={ibu}
								  name="ibu"
								  placeholder="Select Business Unit"
								  onChange={(event) =>
									handleChange(event?.value, "businessunit")
								  }
								  defaultValue={
									  ibu[ibu.findIndex(el => el.value == userInputs?.businessunit)]
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
  									       handleChange(event, "product")
  								}
								  defaultValue={
                    productInput
								  }
								  className="dropdown-basic-button split-button-dropup extra_multiselect"
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
									  <p>{userInputs?.uploadspc?.[0]?.name}</p>
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
			  )
		  }
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

export default SpcEdit;
