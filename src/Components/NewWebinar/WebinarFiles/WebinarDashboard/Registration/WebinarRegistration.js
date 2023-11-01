import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import CommonAddQuestionModal from "./CommonAddQuestionModal";
import { toast } from "react-toastify";
import Select from "react-select";
import { loader } from "../../../../../loader";

// import Question from "./AddQuestion";

const WebinarRegistration = () => {
  const [file, setFile] = useState();
  const [foot, setfoot] = useState();
  const [showModal, setModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const [formInputs, setFormInputs] = useState({});
  const [showChangeHeader, setShowChangeHeader] = useState(false);
  const [showChangeFooter, setShowChangeFooter] = useState(false);

  useEffect(() => {
    console.log("form Data--->", formData);
  }, []);

  // const handleFileSelect = (e, flag) => {
  //   const fileInput = document.createElement("input");
  //   fileInput.type = "file";
  //   fileInput.style.display = "none";
  //   fileInput.addEventListener("change", (e) => {
  //     const file = e.target.files[0];
  //     console.log(file);
  //     if (flag == "header") {
  //       setFile(URL.createObjectURL(file));
  //       const imgElement = document.querySelector(".header-img");
  //       imgElement.style.height = "310px";
  //       imgElement.style.width = "100%";
  //       imgElement.style.borderRadius = "32px";
  //     }
  //     if (flag == "footer") {
  //       const imgElement = document.querySelector(".footer-img");
  //       imgElement.style.height = "310px";
  //       imgElement.style.width = "100%";
  //       imgElement.style.borderRadius = "32px";
  //       setfoot(URL.createObjectURL(file));
  //     }
  //   });
  //   fileInput.click();
  // };

  const handleFileSelect = async (e, flag) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";

    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      console.log(file);

      if (flag === "header") {
        setFile(URL.createObjectURL(file));
        const imgElement = document.querySelector(".header-img");
        imgElement.style.height = "310px";
        imgElement.style.width = "100%";
        imgElement.style.borderRadius = "32px";
      }

      if (flag === "footer") {
        const imgElement = document.querySelector(".footer-img");
        imgElement.style.height = "310px";
        imgElement.style.width = "100%";
        imgElement.style.borderRadius = "32px";
        setfoot(URL.createObjectURL(file));
      }

      try {
        const uploadedImageUrl = await uploadImageToServer(file);
        console.log(uploadedImageUrl, "==>imageUrl");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    });

    fileInput.click();
  };

  const uploadImageToServer = async (file) => {
    try {
      loader("show");
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        "https://onesource.informed.pro/api/upload-image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const uploadedData = await response.json();
        return uploadedData.imageUrl;
      } else {
        console.error("Image upload failed");
        return null;
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    } finally {
      loader("hide");
    }
  };

  const handleAddQuestionModalClose = () => {
    setModal(false);
  };

  const handleModalSave = (form) => {
    let updateFormData = [...formData];
    updateFormData.push(form);
    setFormData(updateFormData);
  };

  const handleChange = (e, index, item, data) => {
    if (data?.inputType == "radio" || data?.inputType == "checkbox") {
      let newObj = formInputs;
      if (!newObj[data?.label]) {
        newObj[data?.label] = [];
      }
      if (e?.target?.checked == true) {
        if (data?.inputType == "radio") {
          newObj[data?.label] = [];
          newObj[data?.label].push(item?.optionLabel);
        } else {
          newObj[data?.label].push(item?.optionLabel);
        }
      } else if (e?.target?.checked == false) {
        const index = newObj[data?.label]?.indexOf(item?.optionLabel);
        if (index > -1) {
          newObj[data?.label]?.splice(index, 1);
          if (newObj[data?.label]?.length == 0) {
            delete newObj[data?.label];
          }
        }
      }
      setFormInputs(newObj);
    } else {
      setFormInputs({ ...formInputs, [e?.target?.name]: e?.target?.value });
    }
  };
  const saveClicked = (e) => {
    e.preventDefault();

    // let allPresent = formData.every((item, index) => {
    //   return Object.keys(formInputs)?.includes(item?.label);
    // });
    // if (!allPresent) {
    //   toast.error("Please fill all the inputs");
    // } else {
    //   const formElement = document.getElementById("registration-form");
    //   const formHTML = formElement.outerHTML;
    //   console.log("HTML form content-->", formHTML);
    //   console.log("form inputs-->", formInputs);
    //   setFormInputs({});
    //   setFormData([]);
    // }

    const formElement = document.getElementById("registration-form");
    const formHTML = formElement.outerHTML;
    // console.log("HTML form content-->", formHTML);
    console.log("form inputs-->", formInputs);
    setFormInputs({});
    setFormData([]);
  };

  return (
    // <>
    //   {console.log("form Data--->", formData)}
    //   <Col className="right-sidebar">
    //     <div className="custom-container">
    //       <Row>
    //         <div className="outer">
    //           <header className="header">
    //             <Button
    //               className="button"
    //               onClick={(e) => handleFileSelect(e, "header")}
    //             >
    //               Upload Header
    //             </Button>

    //             <Button style={{marginLeft:'20px'}}
    //               className="fbutton"
    //               onClick={(e) => handleFileSelect(e, "footer")}
    //             >
    //               Upload Footer
    //             </Button>

    //             <Button style={{marginLeft:'20px'}} onClick={() => setModal(true)}>Add Feilds</Button>

    //             {/* <img className="header-img" src={file} /> */}
    //           </header>

    //           {/* <section className="section">
    //             <div className="sec1">
    //               <div className="add_hcp_boxes">
    //                 <button onClick={() => setModal(true)}>AddQuestion</button>
    //                 <div className="form_action">
    //                   <div className="row">
    //                     <form id="registration-form" onSubmit={saveClicked}>
    //                       <h2>
    //                         To register please select and fill in all your
    //                         details below.
    //                       </h2>

    //                       <h3>
    //                         This meeting is for healthcare professionals only.
    //                       </h3>

    //                       <hr></hr>

    //                       <div className="center-align-form">
    //                         {formData && formData?.length > 0 ? (
    //                           <div>
    //                             {formData?.map((data, index) => (
    //                               <div key={index} className="centered-input">
    //                                 <div className="col-12 col-md-6">
    //                                   <div className="form-group">
    //                                     <label htmlFor="">{data?.label}</label>
    //                                     {data?.option?.length > 0 ? (
    //                                       data?.inputType === "radio" ? (
    //                                         data?.option?.map((item, index) => (
    //                                           <div key={index}>
    //                                             <input
    //                                               type="radio"
    //                                               name={data?.label}
    //                                               required={
    //                                                 data?.required == "yes"
    //                                                   ? true
    //                                                   : false
    //                                               }
    //                                               // checked={}
    //                                               onChange={(e) =>
    //                                                 handleChange(
    //                                                   e,
    //                                                   index,
    //                                                   item,
    //                                                   data
    //                                                 )
    //                                               }
    //                                             />
    //                                             <label htmlFor="">
    //                                               {item?.optionLabel}
    //                                             </label>
    //                                           </div>
    //                                         ))
    //                                       ) : data?.inputType == "checkbox" ? (
    //                                         data?.option?.map((item, index) => (
    //                                           <div key={index}>
    //                                             <input
    //                                               type="checkbox"
    //                                               name={data?.label}
    //                                               required={
    //                                                 data?.required == "yes"
    //                                                   ? true
    //                                                   : false
    //                                               }
    //                                               onChange={(e) =>
    //                                                 handleChange(
    //                                                   e,
    //                                                   index,
    //                                                   item,
    //                                                   data
    //                                                 )
    //                                               }
    //                                             />
    //                                             <label htmlFor="">
    //                                               {item?.optionLabel}
    //                                             </label>
    //                                           </div>
    //                                         ))
    //                                       ) : data?.inputType == "selection" ? (
    //                                         <div key={index}>
    //                                           <select>
    //                                             {data?.option?.map((item) => (
    //                                               <option
    //                                                 value={item?.optionLabel}
    //                                               >
    //                                                 {item?.optionLabel}
    //                                               </option>
    //                                             ))}
    //                                           </select>
    //                                         </div>
    //                                       ) : null
    //                                     ) : (
    //                                       <input
    //                                         name={data?.label}
    //                                         className="form-control"
    //                                         type={data?.inputType}
    //                                         required={
    //                                           data?.required == "yes"
    //                                             ? true
    //                                             : false
    //                                         }
    //                                         placeholder={data?.placeholder}
    //                                         onChange={(e) =>
    //                                           handleChange(e, index)
    //                                         }
    //                                       />
    //                                     )}
    //                                   </div>
    //                                 </div>
    //                               </div>
    //                             ))}
    //                             <Button type="submit">Save</Button>
    //                           </div>
    //                         ) : null}
    //                       </div>
    //                     </form>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </section> */}

    //           <div style={{marginTop:'35px',marginBottom:'50px'}} className="header"> <img className="header-img" src={file} /></div>

    //           <section className="webinarRegistrationBody">
    //             <div className="sec1">
    //               <div className="add_hcp_boxes">
    //                 {/* <button onClick={() => setModal(true)}>AddQuestion</button> */}
    //                 <div className="form_action">
    //                   <div className="row">
    //                     <form id="registration-form" onSubmit={saveClicked}>
    //                       <h3 style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
    //                         To register please select and fill in all your
    //                         details below.
    //                       </h3>

    //                       <h4 style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
    //                         This meeting is for healthcare professionals only.
    //                       </h4>

    //                       <hr></hr>

    //                       <div className="center-align-form">
    //                         {formData && formData?.length > 0 ? (
    //                           <div>
    //                             {formData?.map((data, index) => (
    //                               <div key={index} className="centered-input">
    //                                 <div className="col-12 col-md-6">
    //                                   <div className="form-group">
    //                                     <label htmlFor="">{data?.label}</label>
    //                                     {data?.option?.length > 0 ? (
    //                                       data?.inputType === "radio" ? (
    //                                         data?.option?.map((item, index) => (
    //                                           <div key={index}>
    //                                             <input style={{marginBottom:'25px',  marginTop:'10px'}}
    //                                               type="radio"
    //                                               name={data?.label}
    //                                               required={
    //                                                 data?.required == "yes"
    //                                                   ? true
    //                                                   : false
    //                                               }
    //                                               // checked={}
    //                                               onChange={(e) =>
    //                                                 handleChange(
    //                                                   e,
    //                                                   index,
    //                                                   item,
    //                                                   data
    //                                                 )
    //                                               }
    //                                             />
    //                                             <label htmlFor="">
    //                                               {item?.optionLabel}
    //                                             </label>
    //                                           </div>
    //                                         ))
    //                                       ) : data?.inputType == "checkbox" ? (
    //                                         data?.option?.map((item, index) => (
    //                                           <div key={index}>
    //                                             <input style={{marginBottom:'25px', marginTop:'10px'}}
    //                                               type="checkbox"
    //                                               name={data?.label}
    //                                               required={
    //                                                 data?.required == "yes"
    //                                                   ? true
    //                                                   : false
    //                                               }
    //                                               onChange={(e) =>
    //                                                 handleChange(
    //                                                   e,
    //                                                   index,
    //                                                   item,
    //                                                   data
    //                                                 )
    //                                               }
    //                                             />
    //                                             <label htmlFor="">
    //                                               {item?.optionLabel}
    //                                             </label>
    //                                           </div>
    //                                         ))
    //                                       ) : data?.inputType == "selection" ? (
    //                                         <div key={index}>
    //                                           <select style={{marginBottom:'25px',  marginTop:'10px'}}>
    //                                             {data?.option?.map((item) => (
    //                                               <option
    //                                                 value={item?.optionLabel}
    //                                               >
    //                                                 {item?.optionLabel}
    //                                               </option>
    //                                             ))}
    //                                           </select>
    //                                         </div>
    //                                       ) : null
    //                                     ) : (
    //                                       <input style={{marginBottom:'25px', marginTop:'10px'}}
    //                                         name={data?.label}
    //                                         className="form-control"
    //                                         type={data?.inputType}
    //                                         required={
    //                                           data?.required == "yes"
    //                                             ? true
    //                                             : false
    //                                         }
    //                                         placeholder={data?.placeholder}
    //                                         onChange={(e) =>
    //                                           handleChange(e, index)
    //                                         }
    //                                       />
    //                                     )}
    //                                   </div>
    //                                 </div>
    //                               </div>
    //                             ))}
    //                             <Button type="submit">Save</Button>
    //                           </div>
    //                         ) : null}
    //                       </div>
    //                     </form>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </section>

    //           <div >
    //             {/* <button
    //               className="fbutton"
    //               onClick={(e) => handleFileSelect(e, "footer")}
    //             >
    //               upload
    //             </button> */}

    //             {/* <img className="footer-img" src={foot} /> */}
    //           </div>
    //           <div style={{marginTop:'35px',marginBottom:'50px'}}>  <img className="footer-img" src={foot} /></div>
    //         </div>
    //       </Row>
    //     </div>
    //   </Col>
    //   <CommonAddQuestionModal
    //     show={showModal}
    //     onClose={handleAddQuestionModalClose}
    //     handleSave={handleModalSave}
    //     formLabel={formData}
    //   />
    // </>
    <>
      <Col className="right-sidebar">
        <div className="register-page">
          <h3>Registration Page</h3>
          <div className="row">
            <div className="left-section col-sm-3 col-md-6 col-lg-8">
              <div className="text-section">
                <div className="row">
                  <div className="col-lg-3 registration-heading">
                    <h5>Registration Page Title</h5>
                  </div>
                  <div className="col-lg-6 registration-text">
                    <input type="text" value="" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-3 registration-bodyHeading">
                    <h5>Body Text</h5>
                  </div>
                  <div className="col-lg-6 registration-bodyText">
                    <textarea cols="50" rows="4" value="" />
                  </div>
                </div>

                <div className="feilds-section">
                  <Form.Check
                    className="name-checkbox"
                    inline
                    label="Name"
                    name="group1"
                    type="radio"
                  />

                  <Form.Check
                    className="name-checkbox"
                    inline
                    label="Email"
                    name="group1"
                    type="radio"
                  />

                  <Form.Check
                    className="name-checkbox"
                    inline
                    label="Profession"
                    name="group1"
                    type="radio"
                  />

                  <Form.Check
                    className="name-checkbox"
                    inline
                    label="Country"
                    name="group1"
                    type="radio"
                  />

                  <Form.Check
                    className="name-checkbox"
                    inline
                    label="State"
                    name="group1"
                    type="radio"
                  />

                  <span>Add Feilds</span>
                </div>
              </div>
            </div>
            <div className="right-section col-sm-9 col-md-6 col-lg-4">
              {/* <div className="header-section">
                {!file && (<h4 className="header-img-section" id="uploadButton" onClick={(e) => handleFileSelect(e, "header")}>Upload header</h4>)}
                <img className="header-img" src={file} />
                <h4 className="hover" onClick={(e) => handleFileSelect(e, "header")}>Change Header</h4>
              </div> */}

              <div
                className="header-section"
                onMouseOver={() => setShowChangeHeader(true)}
                onMouseOut={() => setShowChangeHeader(false)}
              >
                {!file && (
                  <h4
                    className="header-img-section"
                    id="uploadButton"
                    onClick={(e) => handleFileSelect(e, "header")}
                  >
                    Upload header
                  </h4>
                )}
                <img className="header-img" src={file} />
                <div className="header-text">
                  {" "}
                  {showChangeHeader && file && (
                    <h4
                      className="header-hover"
                      onClick={(e) => handleFileSelect(e, "header")}
                    >
                      Change Header
                    </h4>
                  )}
                </div>
              </div>

              <div
                className="footer-section"
                onMouseOver={() => setShowChangeFooter(true)}
                onMouseOut={() => setShowChangeFooter(false)}
              >
                {!foot && (
                  <h4
                    className="footer-img-section"
                    onClick={(e) => handleFileSelect(e, "footer")}
                  >
                    Upload footer
                  </h4>
                )}
                <img className="footer-img" src={foot} />
                <div className="footer-text">
                  {" "}
                  {showChangeFooter && foot && (
                    <h4
                      className="footer-hover"
                      onClick={(e) => handleFileSelect(e, "footer")}
                    >
                      Change Footer
                    </h4>
                  )}
                </div>
              </div>

              {/* <div className="footer-section">
              {!foot && (<h4 className="footer-img-section"  onClick={(e) => handleFileSelect(e, "footer")}>Upload footer</h4>)}
              <img className="footer-img" src={foot} />
              </div> */}
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default WebinarRegistration;
