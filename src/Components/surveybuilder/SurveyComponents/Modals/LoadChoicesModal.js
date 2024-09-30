import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import dropdownList from "./dropdownList";

const LoadChoicesModal = ({
  show,
  onClose,
  handleAddBulkElements,
  fromMultiple,
}) => {
  const pathImage = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [error, setError] = useState({});
  const [addYourOwn, setAddYourOwn] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [textAreaValue, setTextAreaValue] = useState("");

  const selectChoices = fromMultiple
    ? [
        { value: "Agree_Disagree", label: "Agree_Disagree" },
        { value: "Always_Never", label: "Always_Never" },
        { value: "Satisfied_Dissatisfied", label: "Satisfied_Dissatisfied" },
        {
          value: "Very_Likely_Not_Very_Likely",
          label: "Very_Likely_Not_Very_Likely",
        },
        { value: "Frequently_Rarely", label: "Frequently_Rarely" },
        { value: "Daily_Yearly", label: "Daily_Yearly" },
        { value: "Effective_Ineffective", label: "Effective_Ineffective" },
        { value: "Clear_Unclear", label: "Clear_Unclear" },
        { value: "Easy_Difficult", label: "Easy_Difficult" },
        { value: "Happy_Unhappy", label: "Happy_Unhappy" },
        {
          value: "High_Quality_Low_Quality",
          label: "High_Quality_Low_Quality",
        },
        { value: "Helpful_Unhelpful", label: "Helpful_Unhelpful" },
      ]
    : [
        { value: "Countries", label: "Countries" },
        // { value: 'States', label: 'States' },
      ];

  const handleClose = () => {
    onClose(false);
    resetState();
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (addYourOwn) {
      const choices = textAreaValue
        .split(/\r?\n/)
        .map((choice) => choice.trim())
        .filter((choice) => choice);

      if (choices.length > 0) {
        setError({});
        handleAddBulkElements(choices);
        onClose(false);
        resetState();
      } else {
        setError({ customChoice: "Please enter at least one option" });
      }
    } else {
      if (selectedValue) {
        setError({});
        const selectedList = dropdownList[selectedValue.value];
        const choices = selectedList
          .join("\n")
          .split(/\r?\n/)
          .map((choice) => choice.trim())
          .filter((choice) => choice);
        handleAddBulkElements(choices);
        onClose(false);
        resetState();
        setTextAreaValue(selectedList.join("\n"));
      } else {
        setError({ choices: "Please select at least one choice from list" });
      }
    }
  };

  const resetState = () => {
    setAddYourOwn(false);
    setError({});
    setTextAreaValue("");
    setSelectedValue(null);
  };
  const handleSetYourOwn = () => {
    setAddYourOwn(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      id="download-qr"
      className="send-confirm survey-choice"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Modal.Header>
        <h5 className="modal-title" id="staticBackdropLabel">
          Load Choices
        </h5>
        <button
          type="button"
          onClick={handleClose}
          className="btn-close"
          aria-label="Close"
        ></button>
      </Modal.Header>
      <Modal.Body>
        {!addYourOwn ? (
          <div className="hcp-add-box">
            <div className="d-flex align-items-center form-group flex-wrap">
              <Select
                name="choices"
                placeholder="Select your choices list"
                className={`dropdown-basic-button split-button-dropup selectcountry${
                  error?.inputType ? " error" : ""
                }`}
                options={selectChoices}
                onChange={(selectedOption) => setSelectedValue(selectedOption)}
              />
              {error?.choices && (
                <div className="login-validation">{error.choices}</div>
              )}
              <p
                className="load-choice-txt d-flex align-items-center"
                onClick={() => setAddYourOwn(true)}
              >
                +Add your own choices in bulk
                <img src={`${pathImage}info_circle_icon.svg`} alt="info-icon" />
              </p>
            </div>
          </div>
        ) : (
          <div className="hcp-add-box">
            <div className="d-flex align-items-center form-group flex-wrap">
              <div className="hcp-add-content">
                <p>Enter each choice on a separate line</p>
                <div className="hcp-add-box-view">
                  <textarea
                    name="question"
                    id="question"
                    className="form-control"
                    placeholder="Type your choices here"
                    cols="40"
                    rows="4"
                    value={textAreaValue}
                    onChange={({ target }) => setTextAreaValue(target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            {error?.customChoice && (
              <div className="login-validation">{error.customChoice}</div>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-primary save btn-filled"
          onClick={handleSave}
        >
          Add
        </Button>
        {addYourOwn && (
          <Button
            className="btn btn-primary save btn-bordered"
            onClick={handleSetYourOwn}
          >
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default LoadChoicesModal;
