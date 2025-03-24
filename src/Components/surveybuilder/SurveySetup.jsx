import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";
import { surveyValidation } from "../Validations/SurveyValidations/SurveyValidations";
import { getSurveyData } from "../../actions";
import { loader } from "../../loader";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { surveyAxiosInstance } from "./CommonFunctions/CommonFunction";
import { surveyEndpoints } from "./SurveyEndpoints/SurveyEndpoints";
import { useSelector } from "react-redux";
import { ENDPOINT } from "../../axios/apiConfig";

var surveySetupData = {};

const SurveySetup = (props) => {
  const {currentStep}=useSelector((state)=>state.surveyStepReducer);
  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
  const {FETCH_ALL_TOPICS,INSERT_SURVEY_CREATOR,GET_CREATOR}=surveyEndpoints;
  const [isSelected, setIsSelected] = useState(false);
  const [show, setShow] = useState(false);
  const [modalCounter, setModalCounter] = useState(0);
  const [count, setCount] = useState(0);
  const [view, setView] = useState(false);
  const handleView = () => setView(true);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const [addCreater, setAddCreator] = useState({
    label: "",
    value: "",
  });

  const [tagsReRender, setTagsReRender] = useState(0);

  const [existingCreator, setExistingCreator] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [allTags, setAllTags] = useState([]);
  const [tagClickedFirst, setTagClickedFirst] = useState(
    surveySetupData?.setUpData?.tags ? surveySetupData.setUpData.tags : []
  );
  const [finalTags, setFinalTags] = useState(
    surveySetupData?.setUpData?.tags ? surveySetupData.setUpData.tags : []
  );

  const [formData, setformData] = useState({
    surveyTitle: surveySetupData?.setUpData?.survey_title
      ? surveySetupData.setUpData.survey_title
      : "",
    surveyCreator: surveySetupData?.creator_name
      ? {
          label: surveySetupData.creator_name,
          value: surveySetupData?.setUpData?.creator_id,
        }
      : null,
    surveySubtitle: surveySetupData?.setUpData?.subtitle
      ? surveySetupData.setUpData.subtitle
      : "",
    surveyType: surveySetupData?.setUpData?.survey_type
      ? surveySetupData.setUpData.survey_type
      : 0,
    surveyFinalTags: surveySetupData?.setUpData?.tags
      ? surveySetupData.setUpData.tags
      : finalTags,
  });

  useEffect(() => {
    // Update the formData when existingCreator changes

    if (count > 0 && existingCreator.length >= 1) {
      setformData((prev) => ({
        ...prev,
        surveyCreator: {
          label: existingCreator[0]?.label,
          value: existingCreator[0]?.value,
        },
      }));
      setError((prev) => ({
        ...prev,
        surveyCreator: "",
      }));
    }
  }, [count, existingCreator.length]);

  function generateRandomAlphanumericCode(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  const handleBlock = () => {
     
    setAddCreator({
      label: "",
      value: "",
    });
    setView(false);
    setError((prev) => ({
      ...prev,
      addCreator: "",
    }));
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  function resetState(setfun) {
    setfun("");
  }
  const handleShow = () => {
    setShow(true);
    setModalCounter(modalCounter + 1);
  };

  const selectedCreator = (selectedOption) => {
    setformData((prev) => ({
      ...prev,
      surveyCreator: selectedOption,
    }));
    setError((prev) => ({
      ...prev,
      surveyCreator: "",
    }));
  };

  useEffect(() => {
    // const body = {
    //   admin_id: 18207,
    // };

    const getAllTags = async () => {
      loader("show");

      await surveyAxiosInstance
        .post(FETCH_ALL_TOPICS)
        .then((res) => {
          if(res.status == 200){
            setAllTags(res?.data?.data);
          }
          loader("hide");
        })
        .catch((err) => {
          loader("hide");
          toast.error("Something went wrong");
        });
    };
    getAllTags();
    // getCampaignData();
  }, []);

  const onCreatorAdd = (e) => {
    const { value } = e.target;
    setAddCreator({
      label: value,
      value: "",
    });
    setError((prev) => ({
      ...prev,
      addCreator: "",
    }));
  };

  const insertSurveyCreator = async (e) => {
    e.preventDefault();

    if (addCreater?.label === "" || addCreater.label === "undefined") {
      setError((prev) => ({
        ...prev,
        addCreator: "Please enter a creator name",
      }));
      return "";
    }
    try {
      loader("show");
      const res = await surveyAxiosInstance.post(
        INSERT_SURVEY_CREATOR,
        { /*user_id: "18207",*/ creator_name: addCreater?.label }
      );

      if (res.status === 200) {
        setAddCreator({ label: "", value: "" });
        await fetchCreaters();
        setCount(1);
        handleBlock();
        loader("hide");
      }
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };

  const handleClose = () => {
    resetState(setNewTag);
    setShow(false);
    setError((prev)=>({
      ...prev,
      newTag:""
  }))
    
  };

  const fetchCreaters = async () => {
    try {
      loader("show");
      // const res = await surveyAxiosInstance.post(GET_CREATOR, {
      //   user_id: 18207,
      // });
      const res = await surveyAxiosInstance.post(GET_CREATOR);

      if (res.status === 200) {
        const creators = res.data.data.map((creator) => ({
          label: creator.creator_name,
          value: creator.id,
        }));
        setExistingCreator(creators);
        if (count > 0) {
          setformData((prev) => ({
            ...prev,
            surveyCreator: {
              label: existingCreator[0].label,
              value: existingCreator[0].value,
            },
          }));
        }
       
      }
      loader("hide");
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchCreaters();
  }, []);

  const handleCancel = () => {
    navigate("/survey/survey-list");
  };

  const removeTag = (index) => {
    const tags = tagClickedFirst;

    tags.splice(index, 1);

    setTagClickedFirst(tags);
    setFinalTags(tags);
    setTagsReRender(tagsReRender + 1);
  };

  const onNextClick = async (e) => {
    e.preventDefault();
    var handleError = surveyValidation(formData);
    if (Object.keys(handleError).length > 0) {
      setError(handleError);
      return "";
    }

    try {
      const randomCode =
        surveySetupData?.unique_code != undefined
          ? surveySetupData.unique_code
          : generateRandomAlphanumericCode(8);

      const currentPageData = {
        survey_title: formData?.surveyTitle,
        subtitle: formData?.surveySubtitle,
        survey_live_flag: "0",
        survey_type: formData?.surveyType,
        creator_id: formData.surveyCreator.value,
        // admin_id: "18207",
        tags: formData.surveyFinalTags,
      };

      props.getSurveyData({
        ...surveySetupData,
        setUpData: { ...currentPageData },
        creator_name: formData.surveyCreator.label,
        unique_code: randomCode,
      });

      navigate("/survey/survey-builder");
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };

  const tagClicked = (dd) => {
    if (!tagClickedFirst.includes(dd)) {
      setTagClickedFirst((oldArray) => [...oldArray, dd]);
    } else {
      toast.error("Topic already in list.");
    }
  };

  const classicSurveyClicked = (e) => {
    e.preventDefault();
  };

  const removeTagFinal = (index) => {
    const tags = finalTags;
    const tagsClickedFirst = tagClickedFirst;
    tags.splice(index, 1);
    tagsClickedFirst.splice(index, 1);
    setFinalTags(tags);
    setTagClickedFirst(tagsClickedFirst);

    setTagsReRender(tagsReRender + 1);
  };

  const newTagChanged = (e) => {
    setNewTag(e.target.value);
    e.target.value = "";
    const new_atg = document.getElementById("new-tag");
    new_atg.value = "";
    setError((prev) => ({
      ...prev,
      newTag: "",
    }));
  };

  const [tagsCounter, setTagsCounter] = useState(0);

  const addTag = async () => {
    if (typeof newTag == "undefined" || newTag.trim().length === 0) {
      setError((prev) => ({
        ...prev,
        newTag: "Please enter a Topic",
      }));
    } else {
      let temp_tags = tagClickedFirst.map((data) => {
        return data.toLowerCase();
      });
      let alltemp_tags = [];

      if (typeof allTags != "undefined") {
        Object.entries(allTags)?.map((data) => {
          return alltemp_tags.push(...data);
        });
        alltemp_tags = alltemp_tags?.map((data) => {
          return data.toLowerCase();
        });
      }

      if (
        !temp_tags.includes(newTag.toLowerCase()) &&
        !alltemp_tags.includes(newTag.toLowerCase())
      ) {

          try {
                loader("show");
                await surveyAxiosInstance.post(ENDPOINT.ADD_SPC_PRODUCT, {
                  user_id: localStorage.getItem("user_id"),
                  product: newTag?.trim(),
                  category: 0,
                  type: 2,
                });
                loader("hide");
               // initFun();
              } catch (err) {
                loader("hide");
              }



        setTagClickedFirst((oldArray) => [...oldArray, newTag]);
        setAllTags((oldArray) => [...oldArray, newTag]);
      } else {
        toast.error("Topic already in list.");
      }
      setNewTag("");
      setTagsCounter(tagsCounter + 1);
    }
  };

  const saveButtonClicked = () => {
    if (finalTags.length == 0 && tagClickedFirst.length == 0) {
      toast.error("No topics selected");
      return;
    }
    if (typeof finalTags != "undefined" && finalTags.length > 0) {
      let prev_tags = finalTags;
      let new_tags = prev_tags.concat(tagClickedFirst);
      const uniqueTags = new_tags.filter((x, i, a) => a.indexOf(x) === i);
      setFinalTags(uniqueTags);
      setformData((prev) => ({
        ...prev,
        surveyFinalTags: uniqueTags,
      }));
    } else {
      setFinalTags(tagClickedFirst);
      setformData((prev) => ({
        ...prev,
        surveyFinalTags: tagClickedFirst,
      }));
    }
    handleClose();
  };

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Col className="right-sidebar custom-change survey-set">
        <div className="container-fluid">
          <div className="row">
            <div className="top-right-action preview">
              <div className="d-flex flex-column w-100">
                <div className="page-top-nav sticky">
                  <Row className="justify-content-end align-items-center">
                    <Col md={2}></Col>
                    <Col md={8}>
                      <ul className="tabnav-link">
                        <li className="active active-main">
                          <Link to="">Set-up</Link>
                        </li>
                        <li className={currentStep > 1 ? "active" : ""}>
                          <Link  to={currentStep > 1 ? "/survey/survey-configure" : "" } >Survey config</Link>
                        </li>
                        <li className={currentStep > 2 ? "active" : "" }>
                          <Link  to={currentStep > 2 ? "/survey/form-builder" : "" }>Build survey</Link>
                        </li>

                        <li className={currentStep > 3 ? "active" : "" }>
                          <Link to={currentStep > 3 ? "/survey/thank-you" : "" }>Thank you</Link>
                        </li>
                        <li className={currentStep > 4 ? "active" : "" }>
                          <Link to={currentStep > 4 ? "/survey/survey-preview" : "" }>Preview</Link>
                        </li>
                      </ul>
                    </Col>
                    <Col md={2}>
                      <div className="header-btn">
                        <Link
                          className="btn btn-primary btn-bordered move-draft"
                          to="/survey/survey-list"
                        >
                          Cancel
                        </Link>
                        <Button
                          className="btn btn-primary btn-filled next"
                          onClick={(e) => {
                            onNextClick(e);
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className="survey-setup d-flex w-100 flex-column">
              <div className="survey-create">
                <Form className="row">
                  <Form.Group className="col-md-7 form-group">
                    <Form.Label>
                      Survey Title <span>*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="surveyTitle"
                      value={formData.surveyTitle}
                      onChange={(e) => changeHandler(e)}
                      placeholder="Type your survey title"
                    />
                    <div className="login-validation">
                      {error?.surveyTitle ? error.surveyTitle : ""}
                    </div>
                  </Form.Group>
                  <Form.Group className="col-md-5 form-group">
                    <Form.Label>
                      Survey Creator <span>*</span>
                    </Form.Label>
                    <Select
                      aria-label="Survey creator"
                      className="dropdown-basic-button split-button-dropup"
                      name="surveyCreator"
                      options={existingCreator}
                      value={formData.surveyCreator}
                      onChange={selectedCreator}
                      placeholder="Type Creator's name"
                    />
                    <div className="d-flex justify-content-between">
                      <div className="login-validation">
                        {error?.surveyCreator ? error.surveyCreator : ""}
                      </div>
                      <p onClick={handleView}>
                        Add new creator{" "}
                        <img src={path_image + "creator-add.png"} alt="" />
                      </p>
                    </div>
                  </Form.Group>
                  <Form.Group className="col-md-7 form-group">
                    <Form.Label>
                      Subtitle <span>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="surveySubtitle"
                      value={formData.surveySubtitle}
                      onChange={changeHandler}
                      placeholder="Type your survey subtitle"
                    />
                    <div className="login-validation">
                      {error?.surveySubtitle ? error?.surveySubtitle : ""}
                    </div>
                  </Form.Group>
                  <div className="input-group d-flex w-100">
                    <div className="input-group-prepend">
                      <Button className="btn-filled" onClick={handleShow}>
                        Add Topics +
                      </Button>
                    </div>
                    <div className="tags_added">
                      <ul>
                        {finalTags.map((tags, index) => (
                          <li className="list1" key={index}>
                            {tags.innerHTML || tags}{" "}
                            <img
                              src={path_image + "filter-close.svg"}
                              alt="Close-filter"
                              onClick={() => removeTag(index)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Form>
              </div>
              <div className="survey-create-optional">
                <div className="survey-create-optional-box">
                  <h4>Select how do you want to create your survey:</h4>
                  <div className="d-flex justify-content-center">
                    <div
                      className="survey-optional-box"
                      onClick={() => setIsSelected(true)}
                    >
                      <div
                        className={
                          formData?.surveyType !== "" &&
                          formData?.surveyType === 0
                            ? "survey-optional-choice selected"
                            : "survey-optional-choice"
                        }
                        onClick={classicSurveyClicked}
                      >
                        <img src={path_image + "classic-survey.png"} alt="" />
                      </div>
                      <h5>
                        Classic Survey{" "}
                        <img src={path_image + "info_circle_icon.svg"} alt="" />{" "}
                      </h5>
                      <h5 className="optional-discribe">
                        Show all questions on a page at once
                      </h5>
                      <div className="login-validation">
                        {/* {error?.surveyType ? <p>{error?.surveyType} </p> : ""} */}
                      </div>
                    </div>
                    <div className="survey-optional-box disabled">
                      <div className="survey-optional-choice">
                        <span>Coming Soon...</span>
                        <img src={path_image + "cards-survey.png"} alt="" />
                      </div>
                      <h5>
                        Cards Survey{" "}
                        <img
                          src={path_image + "info-circle-img-disable.svg"}
                          alt=""
                        />
                      </h5>
                      <h5 className="optional-discribe">
                        Show one question on a card per time
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
      
      <Modal
        id="tagsModal"
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="survey-modal"
      >
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            Add Topics
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className="select-tags">
            <h6>Select Topics :</h6>
            <div className="tag-lists">
              <div className="tag-lists-view">
                {allTags
                  ? Object.values(allTags)?.map((data, index) => (
                      <div key={index} onClick={() => tagClicked(data)}>
                        {data}{" "}
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </div>
          <div className="selected-tags">
            <h6>
              Selected Topics  <span>| {tagClickedFirst.length}</span>
            </h6>

            <div className="total-selected">
              {tagClickedFirst.map((data, index) => (
                <div className="tag-cross" key={index}>
                  {data.innerHTML || data}
                  <img
                    src={path_image + "filter-close.svg"}
                    alt="Close-filter"
                    onClick={() => removeTagFinal(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <form>
            <div className="form-group">
              <label htmlFor="new-tag">New Topic</label>
              <div className="d-flex flex-column align-items-start">
                <input
                  type="text"
                  className="form-control"
                  id="new-tag"
                  //value={newTag}
                  //onChange={(e) => newTagChanged(e)}
                  value={newTag}
                  onChange={(e) => newTagChanged(e)}
                />
                <div className="login-validation">
                  {" "}
                  {error?.newTag ? error?.newTag : ""}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary add btn-bordered"
                onClick={addTag}
              >
                Add
              </button>
            </div>
          </form>
          <button
            type="button"
            className="btn btn-primary save btn-filled"
            // onClick={saveButtonClicked}
            onClick={saveButtonClicked}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>


      <Modal
        show={view}
        onHide={handleBlock}
        className="send-confirm"
        id="download-qr"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Creator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="form-group creator">
              <Form.Label>Creator name</Form.Label>
              <Form.Control
                type="text"
                onChange={onCreatorAdd}
                value={addCreater?.label}
                name="template"
                placeholder="Type creator name"
              />
              <div className="login-validation">
                {" "}
                {error?.addCreator ? error?.addCreator : ""}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => insertSurveyCreator(e)}
            type="button"
            className="btn btn-primary save btn-filled"
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  surveySetupData = state?.getSurveyData;

  return state;
};

export default connect(mapStateToProps, { getSurveyData: getSurveyData })(
  SurveySetup
);
