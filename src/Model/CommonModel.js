import React, { useState, useEffect, useMemo } from "react";
import { Dropdown, DropdownButton, Modal, Form } from "react-bootstrap";
import modelValidation from "./ModelValidation";
const CommonModel = ({
  show,
  onClose,
  heading,
  data,
  footerButton,
  handleChange,
  handleSubmit,
  handleQR,
}) => {
  const [selecteValue, setSelectedValue] = useState("Select Size");
  const [values, setValues] = useState({});
  const [errors, setError] = useState({});

  const handleSelect = (value) => {
    const dp_index = data[0].dropdown.findIndex((el) => el.value === value);
    setSelectedValue(data[0].dropdown[dp_index].key);
    handleQR(value);
  };
  useEffect(() => {
    let obj = {};
    data?.forEach((item) => {
      if (!obj[item?.name ? item?.name : item?.label]) {
        obj[item?.name ? item?.name : item?.label] = item?.value
          ? item?.value
          : "";
      }
    });
    setValues(obj);
  }, [show]);

  const handleModelChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    handleChange(e);
  };

  const handleCross = () => {
    setError({});
    setValues({});
    setSelectedValue("Select Size");
    onClose(false);
  };

  const handleClose = () => {
    const error = modelValidation(values);
    if (Object.keys(error)?.length) {
      setError(error);
      return;
    }
    setError({});
    setValues({});
    setSelectedValue("Select Size");
    handleSubmit();
    onClose(false);
  };
  const handleSelectModel = (e, data) => {
    setValues({ ...values, [data]: e });
    handleSelect(e);
  };

  const modelDropdown = (item) => {
    return (
      <div className="form-group">
        <label htmlFor="">{item.label}</label>
        <div className="modal-form-group">
          <DropdownButton
            className="dropdown-basic-button split-button-dropup "
            title={selecteValue}
            onSelect={(e) => handleSelectModel(e, item.label)}
          >
            <div className="scroll_div">
              {item?.dropdown?.map((values, newKeys) => {
                return (
                  <Dropdown.Item
                    eventKey={values?.value}
                    key={newKeys}
                    className={selecteValue == values?.key ? "active" : ""}
                  >
                    {values?.key}
                  </Dropdown.Item>
                );
              })}
            </div>
          </DropdownButton>
          {errors?.[item?.name ? item?.name : item?.label] ? (
            <div className="login-validation">
              {errors?.[item?.name ? item?.name : item?.label]}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  const modelInput = (item) => {
    return (
      <>
        <div className="form-group">
          <label htmlFor="">{item?.label}</label>
          <div className="modal-form-group">
            <input
              type="text"
              name={item?.name ? item?.name : item?.label}
              placeholder={item?.placeholder}
              className="form-control"
              onChange={handleModelChange}
              defaultValue={item?.value ? item?.value : ""}

              // onChange={handleChange}
            />
            {errors?.[item?.name ? item?.name : item?.label] ? (
              <div className="login-validation">
                {errors?.[item?.name ? item?.name : item?.label]}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleCross}
        className="send-confirm"
        id="download-qr"
      >
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            {heading}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            // onClick={() => onClose(false)}
            onClick={(e) => {
              handleCross();
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {data?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item?.type == "dropdown"
                    ? modelDropdown(item)
                    : item?.type == "input"
                    ? modelInput(item)
                    : null}
                </React.Fragment>
              );
            })}
          </Form>
        </Modal.Body>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary save btn-filled"
            onClick={(e) => {
              handleClose();
            }}
          >
            {footerButton}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default React.memo(CommonModel);
