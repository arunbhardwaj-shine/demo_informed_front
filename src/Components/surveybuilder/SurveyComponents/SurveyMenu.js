import React, { useState, useEffect } from "react";
import {
  Accordion,
  Button,
  Form,
  OverlayTrigger,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { SidebarItems } from "../surveyObjects/SidebarItems";
import { SidebarCommonItems } from "../surveyObjects/SidebarCommonItems";
import Rating from "./Rating";
import Matrix from "./Matrix";
import Dropdown from "./Dropdown";
import Multiple from "./Multiple";
import DivideLine from "./DivideLine";
import FreeText from "./FreeText";
import QuestionEditor from "./QuestionEditor";
import Consent from "./Consent";
import {
  surveyAxiosInstance,
  uploadImageToServer,
} from "../CommonFunctions/CommonFunction";

import { loader } from "../../../loader";
import { useDispatch, useSelector } from "react-redux";

import {UpdateQuestion} from "../CommonFunctions/CommonFunction";

import {
  addElement,
  updateElement,
  toggleEditMode,
  sortOptions,
  setExtraAndStyling,
  updateSurveyId,
  updateConsent,
} from "../../../actions/surveyActions";
import { useLocation } from "react-router-dom";
// import { getSurveyData } from '../../../actions';

const SurveyMenu = ({ menuRef }) => {
  const location = useLocation();

  const validExtensions = ["png", "jpeg", "jpg", "gif"];

  const menuTitles = {
    multiple: "Multiple choices",
    checkbox: "CheckBox",
    dropdown: "Dropdown",
    freeText: "Free Text",
    matrix: "Matrix",
    rating: "Rating",
    heading: "Headline",
    paragraph: "Paragraph",
    divideLine: "Divider line",
    image: "Image",
    consent: "Consent",
  };

  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  const { currentElementIndex, elements, isEditModeOn } = useSelector(
    (state) => state.surveyData
  );
  const obj = useSelector(
    (state) => state.surveyData
  );



  const [editorIndex, setEditorIndex] = useState(0);

  const dispatch = useDispatch();

  const [accordionType, setAccordionType] = useState("0");
  const handleAddElement = (type) => {
    dispatch(addElement(type));
  };
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("type", type);
  };
  useEffect(() => {
    dispatch(
      updateSurveyId(
        JSON.parse(localStorage.getItem("getSurveyData"))?.survey_id
      )
    );
  }, []);

  useEffect(() => {
    setEditorIndex((prev) => prev + 1);
  }, [elements?.[currentElementIndex]?.questionNo]);

  const handleSortOptions = (index, order) => {
    dispatch(sortOptions(index, order));
  };
  const handleUpdateElement = (index, value, key) => {
    dispatch(updateElement(index, key, value));
  };

  const handleExtraAndStyle = (index, value, innerKey, outerkey) => {
    dispatch(setExtraAndStyling(index, value, innerKey, outerkey));
  };

  const updateColumns = (index, innerAnswerIndex, innerKey, value) => {
    const item = elements[index];

    const updatedColumns = item.answer.map((option, optionIndex) => {
      // Update inner objects inside the `option`
      const updatedInnerOptions = option.answer.map((innerOption, innerIndex) =>
        innerIndex === innerAnswerIndex
          ? { ...innerOption, value }
          : innerOption
      );

      // Return the updated `option` with modified `answer`
      return {
        ...option,
        answer: updatedInnerOptions,
      };
    });

    handleUpdateElement(index, "answer", updatedColumns);
  };

  const deleteOptionInMiddle = async (
    itemIndex,
    key,
    answerIndex,
    optionId
  ) => {
    // var currentOptions = elements[itemIndex][key];
    var currentOptions = elements[itemIndex].answer;

    if (elements[itemIndex].type === "matrix") {
      if (key === "title") {
        currentOptions.splice(answerIndex, 1);
        handleUpdateElement(itemIndex, "answer", [...currentOptions]);

        if(optionId){
          UpdateQuestion(optionId)
        }
        return;
      } else {
        const updatedOptions = currentOptions.map((option) => {
          const updatedInnerOptions = option.answer.filter(
            (innerOption, innerIndex) => {
              if (innerIndex != answerIndex) {
                // If indices do not match, return the innerOption as is
                return innerOption;
              }
            }
          );
          return {
            ...option,
            answer: updatedInnerOptions,
          };
        });

        // Call handleUpdateElement with the correct parameters
        handleUpdateElement(itemIndex, "answer", updatedOptions);
        if (optionId != 0) {
          await deleteOptions(optionId);
        }

        return;
      }
    }

    if (elements[itemIndex].type === "dropdown") {
      currentOptions[0].value.splice(answerIndex, 1);
      handleUpdateElement(itemIndex, key, [...currentOptions]);
      return;
    }

    if (optionId != 0) {
      await deleteOptions(optionId);
    }
    currentOptions.splice(answerIndex, 1);
    handleUpdateElement(itemIndex, key, [...currentOptions]);
  };

  const deleteOptions = async (optionId) => {
    try {
      loader("show");
      const response = await surveyAxiosInstance.post("/survey/delete-option", {
        answerId: optionId,
      });
      loader("hide");
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };
  const addRowInMiddle = (itemIndex, key, answerIndex) => {
    const currentOptions = elements[itemIndex].answer;

    var columns = [];
    if (currentOptions.length > 0) {
      const lastOption = currentOptions[answerIndex].title;
      if (lastOption.trim() === "") {
        toast.warning("Please fill in the current option!");
        return;
      }
      columns = currentOptions[answerIndex].answer.map((columns) => ({
        value: columns.value,
        answerId: 0,
      }));
    }

    currentOptions.splice(answerIndex + 1, 0, {
      title: `Row ${answerIndex + 2}`,
      id: 0,
      answer: [...columns],
    });

    handleUpdateElement(itemIndex, "answer", [...currentOptions]);
  };

  const addColumnInMiddle = (itemIndex, key, answerIndex) => {
    const currentOptions = elements[itemIndex];
    const updatedValues = currentOptions.answer.map((option) => {
      option.answer.splice(answerIndex + 1, 0, { value: `Column ${answerIndex+2} `, answerId: 0 });
      return {
        ...option,
      };
    });
    
    handleUpdateElement(itemIndex, key, [...updatedValues]);
  };

  const addOptionInMiddle = (itemIndex, key, answerIndex) => {
    var currentOptions = elements[itemIndex][key];
    if (elements[itemIndex].type === "matrix") {
      if (key === "title") {
        addRowInMiddle(itemIndex, key, answerIndex);
        return;
      } else {
        addColumnInMiddle(itemIndex, key, answerIndex);
        return;
      }
    }

    if (elements[itemIndex].type === "dropdown") {
      currentOptions[0].value.splice(answerIndex + 1, 0, "");
      handleUpdateElement(itemIndex, key, [...currentOptions]);
      return;
    }

    currentOptions.splice(answerIndex + 1, 0, { value: "", answerId: 0 });
    handleUpdateElement(itemIndex, key, [...currentOptions]);
  };

  const addRow = (index, value, innerKey, outerkey) => {
    const currentOptions = elements[index][outerkey];
    var columns = [];
    if (currentOptions.length > 0) {
      const lastOption = currentOptions[currentOptions.length - 1].title;
      if (lastOption.trim() === "") {
        toast.warning("Please fill in the current option!");
        return;
      }
      columns = currentOptions[currentOptions.length - 1].answer.map(
        (columns) => ({ value: columns.value , answerId: 0 })
      );
    } else {
      columns = [{ value: "", answerId: 0 }];
      
    }

    handleUpdateElement(index, outerkey, [
      ...currentOptions,
      { title: value, id: 0, answer: [...columns] },
    ]);
  };

  const addOption = (index, key) => {
    const currentOptions = elements[index][key];
    if (elements[index].type === "dropdown") {
      if (currentOptions[0].value.length > 0) {
        const lastOption =
          currentOptions[0].value[currentOptions[0].value.length - 1];
        if (lastOption.trim() === "") {
          toast.warning("Please fill in the current option!");
          return;
        }
      }
      currentOptions[0].value.push("");
      handleUpdateElement(index, key, [...currentOptions]);
    } else if (elements[index].type === "matrix") {
      var updatedColumns = [];
      var curentOptionsLength=0;
      if (currentOptions.length > 0 && currentOptions[0].answer.length > 0) {
        const columns = currentOptions[0].answer;
        const lastOption = columns[columns.length - 1].value;
        curentOptionsLength=columns.length;

        if (lastOption.trim() === "") {
          toast.warning("Please fill in the current option!");
          return;
        }
      }

      if (currentOptions.length == 0) {
        updatedColumns = [
          {
            title: "",
            id: 0,
            answer: [{ value: "Column 1", answerId: 0 }],
          },
        ];
      } else {
        updatedColumns = currentOptions.map((option,index) => ({
          ...option,
          answer: [...currentOptions[0].answer, { value: `Column ${curentOptionsLength+1} `, answerId: 0 }],
        }));
      }

      handleUpdateElement(index, key, [...updatedColumns]);
    } else {
      if (currentOptions.length > 0) {
        const lastOption = currentOptions[currentOptions.length - 1].value;
        if (lastOption.trim() === "") {
          toast.warning("Please fill in the current option!");
          return;
        }
      }
      handleUpdateElement(index, key, [
        ...currentOptions,
        { value: "", answerId: 0 },
      ]);
    }
  };

 

  const toggleDescription = (index, keyName = "") => {
    const updatedElements = [...elements];
    const currentValue = updatedElements[index][keyName];
    const newValue = !currentValue;

    // Update the toggle value
    handleUpdateElement(index, keyName, newValue);
 

    setTimeout(() => {
      if((keyName === "addOtherChoice" || keyName === "isOptional")  && newValue ){

        let element="";
        if(keyName === "addOtherChoice"){
          element=document.getElementById("other-choice-view");
        }else {
          
          element=document.getElementById("isoptinal-scroll-view");
         
        }
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 0);
  };

  const handleAllOfTheAbove = (index) => {
    const value = !elements[index].extra.addAllOfTheAbove;
    handleExtraAndStyle(index,value, "addAllOfTheAbove", "extra");

  };

  const renderEditorForm = (item, index) => {
    if (!item) {
      // toggleEditMode(false)
      // toggleAddClicked(false)
      return null;
    }

    const commonFeatures = (children) => (
      <>
        <div className="steps">
          {item.type == "paragraph" ? (
            <p className="option-heading">Paragraph</p>
          ) : item.type == "heading" ? (
            <p className="option-heading">Headline</p>
          ) : (
            <p className="option-heading">Question</p>
          )}
          {/* 
          {item.question}
          {index} */}

          <QuestionEditor
            value={item.question}
            handleUpdateElement={handleUpdateElement}
            index={index}
            Placeholder={item.type === "paragraph" || item.type === "heading" ? "Type your text here" : "Type your question here"}
            key={"questionEditor" + editorIndex}
          />

          {item?.questionDescription != undefined && (
            <div className="d-flex align-items-center justify-content-between">
              <p>Add Helper/Description text below the question</p>
              <Form.Check
                type="switch"
                id="custom-switch"
                checked={item.questionDescriptionEnabled}
                onChange={() =>
                  toggleDescription(index, "questionDescriptionEnabled")
                }
              />
            </div>
          )}
          {item?.questionDescriptionEnabled && (
            <div className="d-flex align-items-center w-100">
              <Form.Control
                type="text"
                placeholder="Enter helper text"
                value={item.questionDescription}
                onChange={(e) =>
                  handleUpdateElement(
                    index,
                    "questionDescription",
                    e.target.value
                  )
                }
              />
            </div>
          )}
        </div>
        {children}
      {
        item.accordionType === "questionTypes"  &&  <div className="steps">
        {item.accordionType === "questionTypes" && (
          <div className="d-flex align-items-center justify-content-between">
            <p className="option-heading" style={{ margin: "0" }}>
              Make this question optional{" "}
              <img src={path_image + "info_circle_icon.svg"} alt="" />
            </p>
            <Form.Check
              type="switch"
              id="custom-switch"
              checked={item.isOptional}
              onChange={() => toggleDescription(index, "isOptional")}
            />
          </div>
        )}

        {item.isOptional ? (
          <div className="d-flex align-items-center w-100" id="isoptinal-scroll-view">
            <Form.Label>Label</Form.Label>
            <Form.Control
              type="text"
              value={item.optionalLabel}
              onChange={(e) =>
                handleUpdateElement(index, "optionalLabel", e.target.value)
              }
            />
          </div>
        ) : (
          ""
        )}

        {item.extra?.allowMultipleAnswer !== undefined && (
          <div className="d-flex align-items-center justify-content-between">
            <p className="option-heading" style={{ margin: "0" }}>
              Allow multiple answers per row{" "}
              <img src={path_image + "info_circle_icon.svg"} alt="" />
            </p>
            <Form.Check
              type="switch"
              id="custom-switch"
              checked={item.extra.allowMultipleAnswer}
              onChange={() =>
                handleExtraAndStyle(
                  index,
                  !elements[index].extra.allowMultipleAnswer,
                  "allowMultipleAnswer",
                  "extra"
                )
              }
            />
          </div>
        )}
      </div>
      } 

        {item?.extra?.addAllOfTheAbove !== undefined && (
          <div className="steps" >
            <div className="d-flex align-items-center justify-content-between">
              <p className="option-heading" style={{ margin: "0" }}>
                Add “All of the above” choice{" "}
                <img src={path_image + "info_circle_icon.svg"} alt="" />
              </p>
              <Form.Check
                type="switch"
                id="custom-switch"
                checked={item.extra.addAllOfTheAbove}
                onChange={(e) => handleAllOfTheAbove(index)}
              />
            </div>
            {item.extra.addAllOfTheAbove ? (
              <>
                <div className="d-flex align-items-center w-100">
                  <Form.Label>Answer Choice</Form.Label>
                  <Form.Control
                    type="text"
                    value={item.extra.allOfTheAboveLabel}
                    onChange={(e) =>
                      handleExtraAndStyle(
                        index,
                        e.target.value,
                        "allOfTheAboveLabel",
                        "extra"
                      )
                    }
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        )}

        {item?.extra?.otherChoiceLabel !== undefined && (
          <div className="steps" id="other-choice-view" >
            <div className="d-flex align-items-center justify-content-between">
              <p className="option-heading" style={{ margin: "0" }}>
                Add “Other” choice{" "}
                <img src={path_image + "info_circle_icon.svg"} alt="" />
              </p>
              <Form.Check
                type="switch"
                id="custom-switch"
                checked={item.addOtherChoice}
                onChange={() => toggleDescription(index, "addOtherChoice")}
              />
            </div>
            {item.addOtherChoice ? (
              < >
                <div className="d-flex align-items-center w-100">
                  <Form.Label>Answer Choice</Form.Label>
                  <Form.Control
                    type="text"
                    value={item.extra.otherChoiceLabel}
                    onChange={(e) =>
                      handleExtraAndStyle(
                        index,
                        e.target.value,
                        "otherChoiceLabel",
                        "extra"
                      )
                    }
                  />
                </div>

                <div className="d-flex align-items-center w-100">
                  <Form.Label>Placeholder Text</Form.Label>
                  <Form.Control
                    type="text"
                    value={item.extra.otherChoicePlaceholderText}
                    onChange={(e) =>
                      handleExtraAndStyle(
                        index,
                        e.target.value,
                        "otherChoicePlaceholderText",
                        "extra"
                      )
                    }
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        )}
      </>
    );

    switch (item.type) {
      case "multiple":
      case "checkbox":
        return (
          <>
            {commonFeatures(
              <Multiple
                index={index}
                item={item}
                handleUpdateElement={handleUpdateElement}
                handleSortOptions={handleSortOptions}
                addOption={addOption}
                deleteOptionInMiddle={deleteOptionInMiddle}
                addOptionInMiddle={addOptionInMiddle}
              />
            )}
          </>
        );
      case "dropdown":
        return (
          <div>
            {commonFeatures(
              <Dropdown
                index={index}
                item={item}
                handleUpdateElement={handleUpdateElement}
                handleSortOptions={handleSortOptions}
                addOption={addOption}
                handleExtraAndStyle={handleExtraAndStyle}
                deleteOptionInMiddle={deleteOptionInMiddle}
                addOptionInMiddle={addOptionInMiddle}
              />
            )}
          </div>
        );
      case "freeText":
        return (
          <div className="heading-style">
            {commonFeatures(
              <FreeText
                index={index}
                item={item}
                handleUpdateElement={handleUpdateElement}
                addOption={addOption}
                handleExtraAndStyle={handleExtraAndStyle}
              />
            )}
          </div>
        );
      case "matrix":
        return (
          <div>
            {commonFeatures(
              <Matrix
                index={index}
                item={item}
                handleUpdateElement={handleUpdateElement}
                addOption={addOption}
                addRow={addRow}
                handleExtraAndStyle={handleExtraAndStyle}
                deleteOptionInMiddle={deleteOptionInMiddle}
                addOptionInMiddle={addOptionInMiddle}
                updateColumns={updateColumns}
              />
            )}
          </div>
        );
      case "rating":
        return (
          <div>
            {commonFeatures(
              <Rating
                index={index}
                item={item}
                handleUpdateElement={handleUpdateElement}
                handleExtraAndStyle={handleExtraAndStyle}
              />
            )}
          </div>
        );

      case "heading":
        return (
          <div className="heading-style">
            {commonFeatures(
              <>
                {/* <Form.Group>
                  <Form.Label>Text Color</Form.Label>
                  <div className="color-picker">
                    <div className="color-pick">
                      <div className="color-pick-point">
                        <img src={path_image + "color-picker.svg"} alt="" />
                      </div>
                      <input
                        type="color"
                        title="Choose your color"
                        name="color"
                        value={item.color}
                        onChange={(e) =>
                          handleExtraAndStyle(
                            index,
                            e.target.value,
                            "color",
                            "style"
                          )
                        }
                      />
                    </div>
                  </div>
                </Form.Group> */}
              </>
            )}
          </div>
        );
      case "paragraph":
        return (
          <div className="paragraph-style">
            {commonFeatures(
              <div className="steps">
                <Form.Group>
                  <Form.Label>Text Color</Form.Label>
                  <div className="color-picker">
                    <div className="color-pick">
                      <div className="color-pick-point">
                        <img src={path_image + "color-picker.svg"} alt="" />
                      </div>
                      <input
                        type="color"
                        title="Choose your color"
                        name="color"
                        value={item.style.color || "#ffffff"}
                        onChange={(e) =>
                          handleExtraAndStyle(
                            index,
                            e.target.value,
                            "color",
                            "style"
                          )
                        }
                      />
                    </div>
                  </div>
                </Form.Group>
              </div>
            )}
          </div>
        );
      case "image":
        return (
          <div className="steps">
            <p class="option-heading">Image</p>
            <div className="d-flex align-items-center">
              <div className="img-preview">
                <img
                  src={
                    item.question != ""
                      ? item.question
                      : path_image + "add-img1.png"
                  }
                  alt=""
                />
              </div>
              <div className="input-file-container">
                <input
                  type="file"
                  name="file"
                  className="input-file"
                  onInput={async (e) => {
                    const result = await uploadImageToServer(e.target.files[0]);
                    handleUpdateElement(index, "question", result);
                  }}
                ></input>
                <label tabindex="0" for="my-file" class="input-file-trigger">
                  {elements[index].question === "" ? "+ Add Image" : "Change Image"}
                </label>
                <br/>
                {/* <span><strong>Max width:</strong> 724px |  <strong>Height:</strong> Auto</span> */}
              </div>
            </div>
            <div className="words-limit">
              <p class="option-heading">Image Width (%)</p>
              <input
                placeholder="0"
                type="number"
                value={item.style.width}
                class="form-control"
                onChange={(e) => {
                  const value = Math.max(
                    0,
                    Math.min(100, parseInt(e.target.value, 10))
                  );
                  handleExtraAndStyle(index, value, "width", "style");
                }}
              />
            </div>
          </div>
        );
      case "consent":
        return (
          <Consent
            index={index}
            item={item}
            handleUpdateConsent={(value) =>
              dispatch(updateConsent(index, value))
            }
            handleExtraAndStyle={handleExtraAndStyle}
          />
        );

      case "divideLine":
        return (
          <>
            <DivideLine
              index={index}
              item={item}
              handleUpdateElement={handleUpdateElement}
              handleExtraAndStyle={handleExtraAndStyle}
            />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <div className="left-setup-options">
      {!isEditModeOn ? (
        <>
          <div className="left-setup-heading">
            <h5>Build Survey</h5>
            <p>
              You can add any question or element to your survey page by drag &
              drop or by clicking on +
            </p>
          </div>
          <div className="left-setup-drag">
            <Accordion
              defaultActiveKey={accordionType}
              onSelect={(e) => setAccordionType(e)}
            >
              <Accordion.Item eventKey={"0"}>
                <Accordion.Header>Questions Types</Accordion.Header>
                <Accordion.Body>
                  <div className={`top-right-action menu`}>
                    <div className="d-flex flex-column">
                      {SidebarItems.map((item, index) => (
                        <div
                          key={index}
                          className="sidebar-item"
                          draggable
                          onDragStart={(e) => handleDragStart(e, item.type)}
                        >
                          {item.icon && (
                            <div className="options-svg">{item.svg}</div>
                          )}
                          {item.label}
                          <div
                            className="plus-arrow"
                            onClick={() => handleAddElement(item.type)}
                          >
                            <img src={path_image + item.icon} alt="" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Common Elements</Accordion.Header>
                <Accordion.Body>
                  <div className={`top-right-action menu`}>
                    <div className="d-flex flex-column">
                      {SidebarCommonItems.map((item, index) => (
                        <div
                          key={index}
                          className="sidebar-item"
                          draggable
                          onDragStart={(e) => handleDragStart(e, item.type)}
                        >
                          {item.icon && (
                            <div className="options-svg">{item.svg}</div>
                          )}
                          {item.label}
                          <div
                            className="plus-arrow"
                            onClick={() => handleAddElement(item.type)}
                          >
                            <img src={path_image + item.icon} alt="" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </>
      ) : (
        <div className="left-setup-format" ref={menuRef}>
          <div className="left-setup-heading">
            <div className="d-flex align-items-center justify-content-between">
              <Button
                className="back-btn"
                onClick={() => {
                  dispatch(toggleEditMode());
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1228_29755)">
                    <path
                      d="M5.16113 12.0024C5.16113 11.5722 5.32536 11.1422 5.65313 10.8142L15.9727 0.494781C16.6291 -0.161672 17.6935 -0.161672 18.3497 0.494781C19.0058 1.15097 19.0058 2.21508 18.3497 2.87159L9.21834 12.0024L18.3493 21.1332C19.0055 21.7897 19.0055 22.8537 18.3493 23.5098C17.6932 24.1666 16.6288 24.1666 15.9724 23.5098L5.65281 13.1905C5.32499 12.8624 5.16113 12.4323 5.16113 12.0024Z"
                      fill="#97B6CF"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1228_29755">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Button>
              <h5>{menuTitles[elements[currentElementIndex]?.type]}</h5>
              <div></div>
            </div>
          </div>
          <div
            className={
              elements[currentElementIndex]?.accordionType == "commonElements"
                ? "live-stream-tabs-data  common-elements"
                : "live-stream-tabs-data"
            }
          >
            <Tabs defaultActiveKey="edit">
              <Tab eventKey="edit" title="Edit">
                <div className="survey-active-data">
                  {currentElementIndex !== -1 &&
                    renderEditorForm(
                      elements[currentElementIndex],
                      currentElementIndex
                    )}
                </div>
              </Tab>

              {elements?.[currentElementIndex]?.accordionType ==
                "questionTypes" && (
                <Tab eventKey="logic" title="Logic">
                  <div className="disabled">
                    The Logic feature is coming soon..
                  </div>
                </Tab>
              )}
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyMenu;
