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
  const [isDelete, setDelete] = useState(false);
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
    try {
      loader("show");
      const resp = await postData(ENDPOINT.SPC_PRO_LISTING, {
        user_id: localStorage.getItem("user_id"),
        type: content?.value,
        category: newValue?.category,
      });
      setProductData(resp?.data?.data);
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };
  useEffect(() => {
    initFun();
  }, [newValue?.category, content]);

  const handleSubmit = async (e) => {
    if (!topicId) {
      try {
        loader("show");
        await postData(ENDPOINT.ADD_SPC_PRODUCT, {
          user_id: localStorage.getItem("user_id"),
          product: newValue?.newProductValue?.trim(),
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
        try {
          loader("show");
          await postData(`${ENDPOINT.UPDATE_TOPIC}${topicId}`, {
            product: newValue?.newProductValue?.trim(),
            type: content?.value,
          });
          loader("hide");

          initFun();
        } catch (err) {
          console.log("--err", err);
          loader("hide");
        }
      }
    }
    setTopicId("");
  };
  const handleConfirmModel = async (id) => {
    setConfirmationPopup(false);

    try {
      loader("show");
      await deleteMethod(`${ENDPOINT.SPC_PRO_DELETE}${id}`);
      loader("hide");
      setClickData(0);
      initFun();
      popup_alert({
        visible: "show",
        message: "Your topics has been deleted <br />successfully !",
        type: "success",
        redirect: "",
      });
    } catch (err) {
      console.log("--err", err);
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
      setTopicId();
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
              <h2> Topics</h2>
            </div>
          </div>
          <div className="create-change-content spc-content">
            <div className="form_action sticky-view">
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
                    setCommonModel("Add");
                  }}
                >
                  Add New {content?.label?.trim()} +
                </Button>
              </Form>
            </div>
            <Row>
              <Col className="col-12 selected-products-list product_show d-flex">
                <div className="products_top_action">
                  {isDelete ? (
                    <button
                      onClick={() => setDelete(!isDelete)}
                      class="btn btn-outline-primary cancel"
                      title="Cancel delete"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      class="btn btn-outline-primary"
                      onClick={() => setDelete(!isDelete)}
                      title="Delete"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                          fill="#0066BE"
                        ></path>
                        <path
                          d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                          fill="#0066BE"
                        ></path>
                        <path
                          d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                          fill="#0066BE"
                        ></path>
                        <path
                          d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                          fill="#0066BE"
                        ></path>
                        <path
                          d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                          fill="#0066BE"
                        ></path>
                        <path
                          d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                          fill="#0066BE"
                        ></path>
                      </svg>
                    </button>
                  )}
                </div>
                {productData?.data?.map((item) => {
                  return (
                    <>
                      <Col xxl={3} xl={4} md={6}>
                        <div className="products-listing">
                          {item?.product}

                          {isDelete ? (
                            <button
                              title="Delete"
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
                          ) : (
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
                                title="Edit"
                                src={path_image + "edit-white.svg"}
                                alt="Delete Row"
                              />
                            </button>
                          )}
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
        heading={heading}
        data={downloadData}
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
          footerButton: " Yes please!",
        }}
        path_image={path_image}
      />
    </Col>
  );
}

export default LibraryTopics;
