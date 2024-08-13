import React from "react";
import { Button, Form } from "react-bootstrap";
import DeleteAdd from "./DeleteAdd";

export default function Matrix({
  item,
  index,
  handleUpdateElement,
  addOption,
  addRow,
  handleExtraAndStyle,
  deleteOptionInMiddle,
  addOptionInMiddle
}) {
  console.log("Matrix");
  console.log(item);

  return (
    <div className="steps">
      <p className="option-heading">Row Labels</p>

      <div className="choice-option">
        {item.extra.rows.map((option, idx) => (
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
              placeholder="Type row label"
              onChange={(e) => {
                const updatedOptions = [...item.extra.rows];
                updatedOptions[idx].value = e.target.value;
                handleExtraAndStyle(index, updatedOptions, "rows", "extra");
              }}
            />

            <DeleteAdd
              itemIndex={index}
              answerindex={idx}
              deleteOptionInMiddle={deleteOptionInMiddle}
              addOptionInMiddle={addOptionInMiddle}
              itemInnerKey="rows"
            />
          </div>
        ))}

        <div className="answer-choice add-more">
          <Form.Label></Form.Label>
          <Button onClick={() => addRow(index, "", "rows", "extra")}>
            + Add new row label
          </Button>
        </div>
      </div>
      <p className="option-heading">Column Labels</p>

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
              placeholder="Type column label"
              onChange={(e) => {
                const updatedOptions = [...item.answer];
                updatedOptions[idx].value = e.target.value;
                handleUpdateElement(index, "answer", updatedOptions);
              }}
            />
            
            <DeleteAdd
              itemIndex={index}
              answerindex={idx}
              deleteOptionInMiddle={deleteOptionInMiddle}
              addOptionInMiddle={addOptionInMiddle}
              itemInnerKey="answer"
              answerId={option.answerId}
            />
          </div>
        ))}

        <div className="answer-choice add-more">
          <Form.Label></Form.Label>
          <Button onClick={() => addOption(index, "answer")}>
            + Add new Columns label
          </Button>
        </div>
      </div>
    </div>
  );
}
