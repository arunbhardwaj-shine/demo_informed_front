import React from "react";
import { Button, Form } from "react-bootstrap";
import DeleteAdd from "./DeleteAdd";

export default function Matrix({
  item,
  index,
  handleUpdateElement,
  addOption,
  addRow,
  updateColumns,
  deleteOptionInMiddle,
  addOptionInMiddle
}) {
  console.log(item)
 

  return (
    <div className="steps">
      <p className="option-heading">Row Labels</p>

      <div className="choice-option">
       { item.answer.length > 0 && item.answer.map((option, idx) => (
          <div
            className={
              option.title.length != 0
                ? "answer-choice choice-added"
                : "answer-choice"
            }
            key={idx}
          >
            <Form.Label>{idx + 1}.</Form.Label>
            <Form.Control
              type="text"
              value={option.title}
              placeholder="Type row label"
              onChange={(e) => {
                const updatedOptions = [...item.answer];
                updatedOptions[idx].title = e.target.value;
                // handleExtraAndStyle(index, updatedOptions, "rows", "extra");
                handleUpdateElement(index, "answer", updatedOptions);
              }}
            />

            <DeleteAdd
              itemIndex={index}
              answerindex={idx}
              deleteOptionInMiddle={deleteOptionInMiddle}
              addOptionInMiddle={addOptionInMiddle}
              itemInnerKey="title"
            />
          </div>
        ))}

        <div className="answer-choice add-more">
          <Form.Label></Form.Label>
          <Button onClick={() => addRow(index, "", "title", "answer")}>
            + Add new row label
          </Button>
        </div> 
      </div>
      <p className="option-heading">Column Labels</p>

      <div className="choice-option">
      { 
        item?.answer[0]?.answer?.map((option,idx)=>(
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
        

                updateColumns(index,idx,"answer",e.target.value);
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

          ))
       
        }

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
