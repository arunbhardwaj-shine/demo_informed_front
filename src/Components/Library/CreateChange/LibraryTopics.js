import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { postData, deleteMethod } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { loader } from "../../../loader";
import CommanModel from "../../../Model/CommonModel";
import CommonConfirmModel from "../../../Model/CommonConfirmModel";
import { Link } from "react-router-dom";
import { popup_alert } from "../../../popup_alert";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

// const downloadData = [
//   {
//     label: "Topic",
//     type: "input",
//     placeholder: "Type your topic name",
//   },
// ];
let downloadData = [];

function LibraryTopics() {
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [clickData, setClickData] = useState(0);
  const [newValue, setNewValue] = useState({
    newProductValue: "",
    category: 0,
  });
  const [show, setShow] = useState(false);
  const [content, setContent] = useState({
    label: "Topics",
    value: 2,
  });

  const [SelectType, setSelectType] = useState([{ value: 2, label: "Topics" }]);
  const [BusinessUnitAll, setBusinessUnitAll] = useState([
    { value: 3, label: "Critical Care" },
    { value: 1, label: "Haematology" },
    { value: 2, label: "Immunotherapy" },
  ]);
  const [productData, setProductData] = useState({});
  const [heading, setHeading] = useState();
  const [footerButton, setFooterButton] = useState();
  const [topicId, setTopicId] = useState();
  const initFun = async () => {
    loader("show");
    const resp = await postData(ENDPOINT.SPC_PRO_LISTING, {
      user_id: localStorage.getItem("user_id"),
      type: content?.value,
      category: newValue?.category,
    });
    setProductData(resp?.data?.data);
    loader("hide");
  };
  useEffect(() => {
    initFun();
  }, [newValue?.category, content]);

  const handleSubmit = async (e) => {
    if (!topicId) {
      loader("show");
      try {
        await postData(ENDPOINT.ADD_SPC_PRODUCT, {
          user_id: localStorage.getItem("user_id"),
          product: newValue?.newProductValue,
          category: newValue?.category,
          type: content?.value,
        });
        loader("hide");
        initFun();
      } catch (err) {
        loader("hide");
      }
    } else {
      if (newValue?.newProductValue) {
        loader("show");
        try {
          await postData(`${ENDPOINT.UPDATE_TOPIC}${topicId}`, {
            product: newValue?.newProductValue,
          });
          loader("hide");

          initFun();
        } catch (err) {
          loader("hide");
        }
      }
    }
    setTopicId("");
  };
  const handleConfirmModel = async (id) => {
    setConfirmationPopup(false);
    loader("show");
    try {
      await deleteMethod(`${ENDPOINT.SPC_PRO_DELETE}${id}`);
      loader("hide");
      setClickData(0);
      initFun();
      popup_alert({
        visible: "show",
        message: "Your Topics has been deleted <br />successfully !",
        type: "success",
        redirect: "",
      });
    } catch (err) {
      loader("hide");
    }
  };
  const handleChange = (e) => {
    setNewValue({ ...newValue, newProductValue: e.target.value });
  };

  const setCommonModel = (stateMsg, e, id, value) => {
    if (stateMsg == "Add") {
      downloadData = [
        {
          label: "Topic",
          type: "input",
          placeholder: "Type your topic name",
        },
      ];

      setHeading("Add New Topic");
      setFooterButton("Add");
      setShow(true);
    }
    if (stateMsg == "Update") {
      downloadData = [
        {
          label: "Topic",
          type: "input",
          placeholder: "Type your topic name",
          // name: "topic_name",
          value: value,
        },
      ];

      setTopicId(id);
      setHeading("Update Topic");
      setFooterButton("Update");
      setShow(true);
    }
  };

  return (
    <Col className="right-sidebar">
      <div className="custom-container">
        <Row>
          <div className="top-header">
            <div className="page-title d-flex">
              <Link
                className="btn btn-primary btn-bordered back-btn"
                to="/library-create"
              >
                <svg
                  width="14"
                  height="24"
                  viewBox="0 0 14 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z"
                    fill="#97B6CF"
                  />
                </svg>
              </Link>
              <h2>Products & Topics</h2>
            </div>
          </div>
          <div className="create-change-content spc-content">
            <div className="form_action">
              {productData?.flag ? (
                <h4>Please select the business unit to show the products</h4>
              ) : null}
              <Form className="product-unit d-flex justify-content-between align-items-center">
                {productData?.flag ? (
                  <div className="form-group full">
                    <label htmlFor="">Business Unit</label>
                    <Select
                      options={BusinessUnitAll}
                      placeholder="Select business unit"
                      onChange={(e) =>
                        setNewValue({ ...newValue, category: e?.value })
                      }
                      className="dropdown-basic-button split-button-dropup"
                      isClearable
                    />
                  </div>
                ) : null}
                <div className="form-group ">
                  <label htmlFor="">Select type</label>
                  <Select
                    options={SelectType}
                    placeholder="Select type"
                    defaultValue={SelectType?.[0]}
                    onChange={(e) =>
                      setContent({ label: e?.label, value: e?.value })
                    }
                    className="dropdown-basic-button split-button-dropup"
                    isClearable
                  />
                </div>

                <Button
                  className="btn-bordered btn-voilet"
                  onClick={() => {
                    // setShow(true);
                    setCommonModel("Add");
                  }}
                >
                  Add New {content?.label?.trim()} +
                </Button>
              </Form>
            </div>
            <Row>
              <Col className="col-12 selected-products-list d-flex">
                {productData?.data?.map((item) => {
                  return (
                    <>
                      <Col xxl={3} xl={4} md={6}>
                        <div className="products-listing">
                          {item?.product}
                          <span>
                            <button
                              className="dlt_btn"
                              onClick={() => {
                                setConfirmationPopup(true);
                                setClickData(item?.id);
                              }}
                            >
                              <img
                                src={path_image + "delete.svg"}
                                alt="Delete Row"
                              />
                            </button>
                            <button
                              className="btn-edit btn-voilet"
                              onClick={(e) => {
                                setCommonModel(
                                  "Update",
                                  e,
                                  item?.id,
                                  item?.product
                                );
                              }}
                            >
                              <img
                                src={path_image + "edit-white.svg"}
                                alt="Delete Row"
                              />
                            </button>
                          </span>
                        </div>
                      </Col>
                    </>
                  );
                })}
              </Col>
            </Row>
          </div>
        </Row>
      </div>
      <CommanModel
        show={show}
        onClose={setShow}
        // heading={"Add New Topic"}
        heading={heading}
        data={downloadData}
        // footerButton={"Add"}
        footerButton={footerButton}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <CommonConfirmModel
        show={confirmationpopup}
        onClose={setConfirmationPopup}
        fun={handleConfirmModel}
        resetDataId={clickData}
        popupMessage={{
          message1: "You are about to remove this topic forever.",
          message2: " Are you sure you want to do this?",
          footerButton: " Yes Please!",
        }}
        path_image={path_image}
      />
    </Col>
  );
}

export default LibraryTopics;
