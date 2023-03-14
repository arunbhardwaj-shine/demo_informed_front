import React, { useState } from "react";
import { Dropdown, DropdownButton, Modal, Form } from "react-bootstrap";

const CommonModel = ({
  show,
  onClose,
  heading,
  data,
  footerButton,
  handleSubmit,
  handleDropdown,
  handleChange,
}) => {
  // const [selecteValue, setSelectedValue] = useState("Select Size");
  const [selecteValue, setSelectedValue] = useState({});

  const handleSelect = (value, label) => {
    setSelectedValue({ ...selecteValue, [label]: value });
    handleDropdown(label, value);
  };
  const handleClose = () => {
    onClose(false);
  };

  const modelDropdown = (item) => {
    return (
      <div className="form-group">
        <label htmlFor="">{item.label}</label>
        <DropdownButton
          className="dropdown-basic-button split-button-dropup "
          title={
            selecteValue[item?.stateLabel]
              ? selecteValue[item?.stateLabel]
              : "Select size"
          }
          onSelect={(e) => handleSelect(e, item?.stateLabel)}
        >
          <div className="scroll_div">
            {item?.dropdown?.map((values, newKeys) => {
              return (
                <Dropdown.Item
                  eventKey={values?.value}
                  key={newKeys}
                  className={
                    selecteValue[item?.stateLabel] == values?.key
                      ? "active"
                      : ""
                  }
                >
                  {values?.key}
                </Dropdown.Item>
              );
            })}
          </div>
        </DropdownButton>
      </div>
    );
  };
  const modelInput = (item) => {
    return (
      <>
        <div className="form-group">
          <label htmlFor="">{item?.label}</label>
          <input
            type="text"
            placeholder={item?.placeholder}
            className="form-control"
            onChange={handleChange}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
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
            onClick={handleClose}
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
            onClick={handleSubmit}
          >
            {footerButton}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CommonModel;
