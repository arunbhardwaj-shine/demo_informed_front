import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function Question(props) {
  const {
    questionData,
    onQuestionChange,
    onChoiceChange,
    onChoiceColorChange,
    onTypeChange,
    onAddChoice,
    onDelete,
    onDeleteChoice,
    onHandleSpeakerNameChange,
    questionDataErrors,
  } = props;

  const { question, answerOption, answerType, speakerName } = questionData;

  const [questionError, setQuestionError] = useState("");
  const [speakerNameError, setSpeakerNameError] = useState("");
  const [confirmOptionDelete, setConfirmOptionDelete] = useState({});

  const validateQuestion = () => {
    if (question.trim() === "") {
      setQuestionError("Question is required.");
      return false;
    }
    setQuestionError("");
    return true;
  };

  const validateSpeakerName = () => {
    if (speakerName.trim() === "") {
      setSpeakerNameError("Speaker Name is required.");
      return false;
    }
    setSpeakerNameError("");
    return true;
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <Container>
       <div className="row">
        <div className="col-12 col-md-6" md={6}>
          <div className="form-group">
            <label htmlFor="">
              {" "}
              Question <span className="text-danger">*</span>
            </label>
            <Form.Control
              type="text"
              value={question}
              onChange={onQuestionChange}
              onBlur={validateQuestion}
            />
            <p className="text-danger">{questionDataErrors?.questionError}</p>
          </div>
        </div>
        <div className="col-12 col-md-6" md={6}>
          <div className="form-group">
            <label htmlFor=""> Speaker Name <span className="text-danger">*</span></label>
            <Form.Control
              type="text"
              value={speakerName}
              onChange={onHandleSpeakerNameChange}
              onBlur={validateSpeakerName}
            />
            <p className="text-danger">
              {questionDataErrors?.speakerNameError}
            </p>
          </div>
        </div>
       </div>
       {/* <div className="row">
      <div className="col-12 col-md-6">
        <div className="form-group">
          <label>Question Type <span className="text-danger">*</span></label>
          <Select
            options={options}
            value={options.find(option => option.value === answerType)}
            onChange={selectedOption => onTypeChange(selectedOption.value)}
          />
          <p className="text-danger">{questionDataErrors?.answerTypeError}</p>
        </div>
      </div>
    </div> */}
       <div className="row">
        <div className="col-12 col-md-6" md={6}>
          <div className="form-group">
            <label htmlFor=""> Question Type <span className="text-danger">*</span> </label>
            <Form.Control
              as="select"
              value={answerType}
              onChange={onTypeChange}
            >
              <option value="">Select Type</option>
              <option value="input">User Input</option>
              <option value="RADIO">Single Choice</option>
              <option value="CHECKBOX">Multiple Choice</option>
            </Form.Control>
            <p className="text-danger">{questionDataErrors?.answerTypeError}</p>
          </div>
        </div>
       </div>

      {(answerType === "RADIO" || answerType === "CHECKBOX") && (
        <div>
          <label htmlFor=""> Answers <span className="text-danger">*</span>  </label>
          {answerOption.map((choice, index) => (
             <div className="row" key={index}>
              <div className="col-12 col-md-6" md={4}>
                <label htmlFor=""> Option {index + 1} <span className="text-danger">*</span></label>
                <Form.Control
                  type="text"
                  value={choice.answer}
                  onChange={(e) => onChoiceChange(e, index)}
                />
                <p className="text-danger">
                  {questionDataErrors?.answerOptionError[index]?.answerError}
                </p>
              </div>
              <div className="col-12 col-md-6" md={4}>
                <Form.Control
                  type="color"
                  id={`colorInput_${index}`}
                  defaultValue={choice.color}
                  title="Choose your color"
                  onChange={(e) => onChoiceColorChange(e, index)}
                />
                <p className="text-danger">
                  {questionDataErrors?.answerOptionError[index]?.colorError}
                </p>
              </div>
              <div className="col-12 col-md-6" md={4}>
                {confirmOptionDelete[index] ? (
                  <div>
                    <p>Are You Sure ?</p>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setConfirmOptionDelete({
                          ...confirmOptionDelete,
                          [index]: false,
                        });
                        onDeleteChoice(index);
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        setConfirmOptionDelete({
                          ...confirmOptionDelete,
                          [index]: false,
                        })
                      }
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  answerOption?.length > 1 && (
                    <Button
                      variant="danger"
                      onClick={() =>
                        setConfirmOptionDelete({
                          ...confirmOptionDelete,
                          [index]: true,
                        })
                      }
                    >
                      <img
                        src="componentAssets/images/delete.svg"
                        alt="Delete Row"
                      />
                    </Button>
                  )
                )}
              </div>
             </div>
          ))}
           <div className="row">
            <div className="col-12 col-md-6" md={12}>
              <Button variant="primary" onClick={onAddChoice}>
                Add Choice
              </Button>
            </div>
           </div>
        </div>
      )}
       <div className="row">
        <div className="col-12 col-md-6" md={12}>
          {/* {confirmDelete ? (
            <div>
              <p>Are you sure ?</p>
              <Button variant="danger" onClick={handleDelete}>
                Yes
              </Button>
              <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="danger" onClick={() => setConfirmDelete(true)}>
<img src="componentAssets/images/delete.svg" alt="Delete Row"/>            </Button>
          )} */}
        </div>
       </div>
    </Container>
  );
}

export default Question;
