import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
let dropdownData={
  input: "User Input",
   RADIO: "Single Choice",  
   CHECKBOX: "Multiple Choice"
 }
function Question(props) {
  const [dropDownOptions,setDropDownOptions]=useState( [
    { label: "User Input", value: "input" },
    { label: "Single Choice", value: "RADIO" },
    { label: "Multiple Choice", value: "CHECKBOX" }
  ])

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
    onHandleShowCommentChange,
  } = props;

  const { question, answerOption, answerType, speakerName, includeComment } =
    questionData;
    const [selectedItem, setSelectedItem] = useState(answerType ?{value:answerType,label:dropdownData[answerType]}:"");
  const [confirmOptionDelete, setConfirmOptionDelete] = useState({});
  const handleDelete = () => {
    onDelete();
  };

  return (
    <form id="add_hcp_form" className={"tab-pane"}>
      <div className="add_hcp_boxes">
        <div className="form_action">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="">
                  {" "}
                  Question <span>*</span>
                </label>
                <Form.Control
                  type="text"
                  value={question}
                  onChange={onQuestionChange}
                  placeholder="Enter your question"
                />
                <div class="login-validation">
                  {" "}
                  {questionDataErrors?.questionError}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="">
                  Speaker Name <span>*</span>
                </label>
                <Form.Control
                  type="text"
                  className="form-control"
                  value={speakerName}
                  placeholder="Enter speaker name"
                  onChange={onHandleSpeakerNameChange}
                />
                <div class="login-validation">
                  {" "}
                  {questionDataErrors?.speakerNameError}
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              {" "}
              <div className="form-group">
                <label htmlFor="">
                  {" "}
                  Input Type <span>*</span>{" "}
                </label>
            

                
          
              <Select
                options={dropDownOptions}
                placeholder="Select Type"
                name="input-type"
                className="dropdown-basic-button split-button-dropup"
                isClearable
                onChange={(e)=>{
                  setSelectedItem(e);
                  onTypeChange(e.value)
                }}
                value={selectedItem}
              />
       

                <div class="login-validation">
                  {" "}
                  {questionDataErrors?.answerTypeError}
                </div>
              </div>
            </div>
            {(answerType === "RADIO" || answerType === "CHECKBOX") && (
              <>
                <label htmlFor=""> {/* Answers <span >*</span>{" "} */}</label>
                {answerOption.map((choice, index) => (
                  <>
                    <div className="col-6 col-md-5" key={index}>
                      <div className="form-group">
                        <label htmlFor="">
                          {" "}
                          Option {index + 1} <span>*</span>
                        </label>
                        <Form.Control
                          type="text"
                          value={choice.answer}
                          onChange={(e) => onChoiceChange(e, index)}
                          placeholder="Enter Options"
                        />
                        <div class="login-validation">
                          {
                            questionDataErrors?.answerOptionError[index]
                              ?.answerError
                          }
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-5">
                      <div className="form-group">
                        <label htmlFor=""> Color </label>

                        <Form.Control
                          type="color"
                          id={`colorInput_${index}`}
                          defaultValue={choice.color}
                          title="Choose your color"
                          onChange={(e) => onChoiceColorChange(e, index)}
                        />
                        <div class="login-validation">
                          {" "}
                          {
                            questionDataErrors?.answerOptionError[index]
                              ?.colorError
                          }
                        </div>
                      </div>
                    </div>

                    <div className="col-2 col-md-2">
                      {confirmOptionDelete[index] ? (
                        <>
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
                        </>
                      ) : (
                        answerOption?.length > 1 && (
                          <div className="col-12 col-md-6" md={12}>
                            <div className="form-group">
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
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </>
                ))}
                <div className="col-12 col-md-6" md={12}>
                  <div className="form-group">
                    <Button variant="primary" onClick={onAddChoice}>
                      Add Choice
                    </Button>
                  </div>
                </div>

                <div className="col-12 col-md-12">
                  <div className="form-group">
                    <label htmlFor=""> Include Comment </label>
                    <input
                      type="checkbox"
                      name="showComment"
                      checked={includeComment?.showComment}
                      onClick={onHandleShowCommentChange}
                    />
                  </div>
                </div>
                {includeComment?.showComment && (
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="">
                        {" "}
                        Placeholder 
                      </label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Placeholder "
                        name="placeHolder"
                        value={includeComment?.placeHolder}
                        onChange={onHandleShowCommentChange}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default Question;
