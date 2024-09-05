import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import LoadChoicesModal from "./Modals/LoadChoicesModal";
import DeleteAdd from "./DeleteAdd";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

export default function Multiple({
  item,
  handleUpdateElement,
  index,
  handleSortOptions,
  addOption,
  deleteOptionInMiddle,
  addOptionInMiddle,
}) {
  const [showModal, setShowModal] = useState(false);
 
  const handleAddBulkElements = (elements) => {
    handleUpdateElement(index, "questionOptions", elements);
  };
  return (
    <>
      <div className="steps">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="option-heading">
              Answer choices
              <Button onClick={() => handleSortOptions(index, "asc")}>
                <img
                  src={path_image + "alphabet-ascending-order.svg"}
                  alt="Sort Ascending"
                />
              </Button>
              <Button onClick={() => handleSortOptions(index, "desc")}>
                <img
                  src={path_image + "alphabet-descending-order.svg"}
                  alt="Sort Descending"
                />
              </Button>
            </p>
          </div>
          {/* <div className="choice-load">
            <Button
              onClick={() => {
                setShowModal(true);
              }}
            >
              Load choices
            </Button>
            <img
              style={{ margin: "0 0 0 4px" }}
              src={path_image + "info_circle_icon.svg"}
              alt=""
            />
          </div> */}
        </div>
        <div className="choice-option">
          {item.answer.map((option, idx) => (
            <div
              className={
                option.value.length != 0
                  ? "answer-choice choice-added"
                  : "answer-choice"
              }
              key={idx}
            >
              <Form.Label>{idx + 1}.</Form.Label>
              <Form.Control
                type="text"
                value={option.value}
                placeholder="Type your answer"
                onChange={(e) => {
                  const updatedOptions = [...item.answer]; // Create a new array
                  updatedOptions[idx].value = e.target.value; // Update the new array
                  handleUpdateElement(index, "answer", updatedOptions); // Pass the updated array to the parent
                }}
              />
              <DeleteAdd
                itemIndex={index}
                answerindex={idx}
                deleteOptionInMiddle={deleteOptionInMiddle}
                addOptionInMiddle={addOptionInMiddle}
                itemInnerKey={"answer"}
                answerId={option.answerId}
              />
            </div>
          ))}

          <div className="answer-choice add-more">
            <Form.Label></Form.Label>
            <Button onClick={() => addOption(index, "answer")}>
              + Add new choice
            </Button>
          </div>
        </div>
      </div>
      <LoadChoicesModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        handleAddBulkElements={handleAddBulkElements}
      />
    </>
  );
}
