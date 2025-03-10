import React, { useEffect } from "react";
import { Modal, DropdownButton, Dropdown, Button, Form, Row, Col } from "react-bootstrap";
import { surveyAxiosInstance } from "../../CommonFunctions/CommonFunction";
import { surveyEndpoints } from "../../SurveyEndpoints/SurveyEndpoints";
import { toast } from "react-toastify";
import { loader } from "../../../../loader";
import TopicModals from "./TopicModals";
import { useState } from "react";

const SublinkModal = ({
  createNewLink,
  setCreateNewLink,
  setSendListData,
  setSelectedSublinkId,
  setCurrentAddSublinkLid,
  SendListData,
  currentAddSublinkLid,
  type
}) => {
  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
    const {FETCH_ALL_TAGS,INSERT_SUBLINK_INFORMATION }=surveyEndpoints;
  const [show, setShow] = useState(false);
  const [modalCounter, setModalCounter] = useState(0);
  const [finalTags, setFinalTags] = useState([]);
  const [tagsReRender, setTagsReRender] = useState(0);
  const [newTag, setNewTag] = useState("");
  const [allTags, setAllTags] = useState([]);
  const [tagClickedFirst, setTagClickedFirst] = useState([]);
  const [tagsCounter, setTagsCounter] = useState(0);
  const [error, setError] = useState({});
  const [newLink, setLink] = useState({
    delivery: "",
  });

  const [identifier, setIdentifier] = useState("");

  const handleShow = () => {
    setShow(true);
    setModalCounter(modalCounter + 1);
  };

  useEffect(()=>{
    const getAllTags = async () => {
       

      await surveyAxiosInstance
        .get("survey/get-survey-tag" )
        .then((res) => {
          setAllTags(res?.data?.data);
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    };
    getAllTags();

  },[])



  const removeTag = (index) => {
    const tags = tagClickedFirst;

    tags.splice(index, 1);

    setTagClickedFirst(tags);
    setFinalTags(tags);
    setTagsReRender(tagsReRender + 1);
  };

  const handleChange = (name, e) => {
    setLink({ ...newLink, [name]: e });
  };

  const onIdentifierChange = (event) => {
    setIdentifier(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      loader("show");
      let body = {
    
        delivery: newLink.delivery,
        identifier: identifier,
        tags: finalTags,
        survey_id:currentAddSublinkLid
      };

      console.log(body,"body")

      console.log(setSendListData);


     
        const res = await surveyAxiosInstance.post(
          INSERT_SUBLINK_INFORMATION,
          body
        );

        const data = { ...res.data.data, delivery: newLink.delivery };

        if(type == true){ 
          setSendListData((prev) => [data, ...prev]);
         
        }else{
          console.log("from else")
          var myData = SendListData.map((data, index) => {
            if (data.survey_id == currentAddSublinkLid) {
              return { 
                ...data,
                subLinkData: [...data.subLinkData,res.data.data] // Merging existing and new data correctly
              };
            } else {
              return data;
            }
          });
  
          setSendListData(myData);
  
          setSelectedSublinkId({
            [currentAddSublinkLid]:res.data.data.sublink_id,  
          });
  
          setLink((prevLink) => ({
            ...prevLink,
            delivery: "",  
          }));

        }

     

       
        loader("hide");
     
    } catch (err) {
      console.log("err", err);
      loader("hide");
      //   toast.error("Something went wrong");
    } finally {
      //   loader("hide");
      loader("hide");
    }
    setCreateNewLink(false);
  };

  return (
    <>
      <Modal show={createNewLink} id="tagsModal" className="survey-tags-modal">
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
          Create New SubLink
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              setCreateNewLink(false);
              setLink((prevLink) => ({
                ...prevLink,
                delivery: "", // Clear the delivery field
              }));
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Row>
            <Form.Group as={Col} xs={7} className="d-flex align-items-center mb-5">
              <Form.Label>Identifier</Form.Label>
              <Form.Control type="text" placeholder="Title of the subLink" onChange={(event) => onIdentifierChange(event)}/>
            </Form.Group>

            <Form.Group as={Col} xs={5} className="d-flex align-items-center mb-5">
              <Form.Label>Delivery</Form.Label>
              <DropdownButton
              className={
                "dropdown-basic-button split-button-dropup " +
                (newLink?.delivery ? "addval" : "")
              }
              title={
                newLink?.delivery ? newLink?.delivery : "Select delivery type"
              }
              name="delivery"
              onSelect={(e) => handleChange("delivery", e)}
            >
              <div className="scroll_div delivery_popup">
                <div className="scroll_div_inset">
                  <Dropdown.Item
                    eventKey="Email"
                    className={newLink?.delivery == "Email" ? "active" : ""}
                  >
                    Email
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="InforMedGO"
                    className={
                      newLink?.delivery == "InforMedGO" ? "active" : ""
                    }
                  >
                    InforMedGO
                  </Dropdown.Item>

                  <Dropdown.Item
                    eventKey="Social"
                    className={newLink?.delivery == "Social" ? "active" : ""}
                  >
                    Social
                  </Dropdown.Item>

                  <Dropdown.Item
                    eventKey="Website"
                    className={newLink?.delivery == "Website" ? "active" : ""}
                  >
                    Website
                  </Dropdown.Item>
                </div>
              </div>
            </DropdownButton>
            </Form.Group>
          </Row>
 

          <Form.Group className="input-group d-flex mb-2">
            
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
            <div className="input-group-prepend">
              <Button className="btn-bordered" onClick={handleShow}>
                Add Topic +
              </Button>
            </div>
          </Form.Group>
          </Form>
        </Modal.Body>

        <div className="modal-footer d-flex justify-content-end">
          <button
            type="button"
            className={
              !(newLink?.delivery && identifier.trim().length > 0)
                ? "btn btn-primary save btn-filled btn-disabled"
                : "btn btn-primary save btn-filled"
            }
            onClick={() => handleSubmit()}
          >
            Create
          </button>
        </div>
      </Modal>

      <TopicModals
        finalTags={finalTags}
        setFinalTags={setFinalTags}
        show={show}
        setShow={setShow}
        modalCounter={modalCounter}
        setModalCounter={setModalCounter}
        newTag={newTag}
        setNewTag={setNewTag}
        allTags={allTags}
        setAllTags={setAllTags}
        tagsCounter={tagsCounter}
        setTagsCounter={setTagsCounter}
        tagClickedFirst={tagClickedFirst}
        setTagClickedFirst={setTagClickedFirst}
        tagsReRender={tagsReRender}
        setTagsReRender={setTagsReRender}
        error={error}
        setError={setError}
      />
    </>
  );
};

export default SublinkModal;
