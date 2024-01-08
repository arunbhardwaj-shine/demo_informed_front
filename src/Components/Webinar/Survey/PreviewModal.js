import React, { useState } from "react";
import { Button } from "react-bootstrap";

const PreviewModal = ({ questions, onQuestionOrderChange }) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  const filteredQuestions = questions.filter(
    (question) => question?.questionData && question?.questionData.id
  );

  const [accordionOpen, setAccordionOpen] = useState(null);
  // const [questionsList, setQuestionsList] = useState(questions);
  const [questionsList, setQuestionsList] = useState(filteredQuestions);

  const toggleAccordion = (index) => {
    setAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDrop = (e, toIndex) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const updatedQuestions = [...questionsList];

    const [draggedQuestion] = updatedQuestions.splice(draggedIndex, 1);

    updatedQuestions.splice(toIndex, 0, draggedQuestion);

    setQuestionsList(updatedQuestions);
    onQuestionOrderChange(updatedQuestions);

    // setAccordionOpen(toIndex);
  };

  const handleOrderChange = (questionIndex, moveBy) => {
    const newIndex =
      (questionIndex + moveBy + questionsList.length) % questionsList.length;
    const updatedQuestions = [...questionsList];

    const movedQuestion = updatedQuestions.splice(questionIndex, 1)[0];
    updatedQuestions.splice(newIndex, 0, movedQuestion);

    setQuestionsList(updatedQuestions);
    onQuestionOrderChange(updatedQuestions);

    // setAccordionOpen(newIndex);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const isFirstBox = (index) => index === 0;
  const isLastBox = (index) => index === questionsList.length - 1;
 
  return (
    <>
    {questionsList?.length > 0 ? 
    <div className="polls-preview">
      <div className="polls-preview-header">
        <ul>
          <li>No.</li>
          <li>Question</li>
          <li>Type</li>
          <li>Change the order</li>
        </ul>
      </div>
      <div className="polls-preview-lists">
        {questionsList.map((question, index) => (
          <>
          <div className="polls-preview-list-box" draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={allowDrop}>
            <div className="polls-preview-list-question">
            <ul
              key={question.id}
              // draggable
              // onDragStart={(e) => handleDragStart(e, index)}
              // onDrop={(e) => handleDrop(e, index)}
              // onDragOver={allowDrop}
            >
              <li>{index + 1}</li>
              <li>{question?.questionData?.question}</li>
              <li>{question?.questionData?.answerType}</li>
              <li>
                <div className="question-action">
                  <Button
                    className="btn-bordered question-prev"
                    onClick={() => handleOrderChange(index, -1)} // Move down
                    disabled={isFirstBox(index)}
                  >
                     <svg
                        width="19"
                        height="11"
                        viewBox="0 0 19 11"
                        fill="none"
                      >
                        <path
                          d="M9.27902 3.61976L2.56094 10.3378C1.97509 10.9236 1.02524 10.9236 0.439388 10.3378C-0.146462 9.75196 -0.146463 8.80211 0.439387 8.21626L8.21496 0.440724C8.41288 0.242814 8.65233 0.111762 8.90525 0.0475674C9.4024 -0.0805243 9.95244 0.0500824 10.3417 0.439387L18.1173 8.21496C18.7031 8.80081 18.7031 9.75066 18.1173 10.3365C17.5314 10.9224 16.5816 10.9224 15.9957 10.3365L9.27902 3.61976Z"
                          fill="#0066BE"
                        />
                      </svg>
                  </Button>
                  <Button
                    className="btn-bordered question-next"
                    onClick={() => handleOrderChange(index, 1)} // Move up
                    disabled={isLastBox(index)}
                  >
                    <svg
                        width="19"
                        height="11"
                        viewBox="0 0 19 11"
                        fill="none"
                      >
                        <path
                          d="M9.27853 7.15662L2.56206 0.442137C1.97595 -0.143796 1.02569 -0.143796 0.43958 0.442137C-0.146527 1.02807 -0.146527 1.97806 0.43958 2.56399L8.21954 10.3416C8.80565 10.9276 9.75591 10.9276 10.342 10.3416C10.3643 10.3194 10.3858 10.2965 10.4064 10.2732L18.1204 2.56155C18.7065 1.97556 18.7065 1.02548 18.1204 0.439493C17.5342 -0.146497 16.5838 -0.146498 15.9977 0.439493L9.27853 7.15662Z"
                          fill="#0066BE"
                        />
                      </svg>
                  </Button>
                  </div>
              </li>
            </ul>
            </div>
            <div className="preview-answers">
                <div
                  className={`answer-section ${
                    accordionOpen === index ? "active" : ""
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="answer-section-heading">
                    <p>
                      Answers <img src={path_image + "down-arrow.png"} alt="" />
                    </p>
                  </div>
                  {accordionOpen === index && (
                  <div className="details-content">
                    <ul>
                      {question?.questionData?.answerOption.map(
                        (option, optionIndex) => (
                          <li key={option?.id}>
                            Option {optionIndex + 1}: {option?.answer}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                </div>
                
              </div>
        </div>
          </>
        ))}
      </div>
    </div>
    :<div class="email_box_block no_found">
    <p>No Data Found</p>
  </div>}
    </>
  );
};

export default PreviewModal;
