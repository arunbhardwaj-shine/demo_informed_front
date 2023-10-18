import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CommonAddQuestionModal from "./CommonAddQuestionModal";

// import Question from "./AddQuestion";

const WebinarRegistration = () => {
  const [file, setFile] = useState();
  const [foot, setfoot] = useState();
  const [showModal, setModal] = useState(false);
  useEffect(() => {}, []);
  const handleFileSelect = (e, flag) => {
    console.log("flag--->", flag);
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      console.log(file);
      if (flag == "header") {
        setFile(URL.createObjectURL(file));
      }
      if (flag == "footer") {
        setfoot(URL.createObjectURL(file));
      }
    });

    fileInput.click();
  };
  const handleAddQuestionModalClose = () => {
    setModal(false);
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="outer">
              <header className="header">
                <button
                  className="button"
                  onClick={(e) => handleFileSelect(e, "header")}
                >
                  upload
                </button>

                <img className="header-img" src={file} />
              </header>

              <section className="section">
                <div className="sec1">
                  <h1>
                    To register please select and fill in all your details
                    below.
                  </h1>

                  <h2>This meeting is for healthcare professionals only.</h2>

                  <hr></hr>
                </div>

                <div>
                  <button onClick={() => setModal(true)}>AddQuestion</button>

                  {/* {showmodel && <Question />} */}
                </div>
              </section>

              <footer className="footer">
                <button
                  className="fbutton"
                  onClick={(e) => handleFileSelect(e, "footer")}
                >
                  upload
                </button>

                <img className="footer-img" src={foot} />
              </footer>
            </div>
          </Row>
        </div>
      </Col>
      <CommonAddQuestionModal
        show={showModal}
        onClose={handleAddQuestionModalClose}
      />
    </>
  );
};

export default WebinarRegistration;
