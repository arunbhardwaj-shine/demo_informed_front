import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { loader } from "../../../loader";
import { Link } from "react-router-dom";
import EmailEditor from "react-email-editor";
function CustomizeRehearsalInvites() {
  const [isOpen, setIsOpen] = useState(false);
  const [allTags, setAllTags] = useState({});
  const openTags = () => {
    setIsOpen(true);
  };
  const emailEditorRef = useRef(null);
  const onLoad = () => {
 
    // emailEditorRef.current.editor.loadDesign(dpc?dpc:hello);
  };
  const onReady = () => {

    // await emailEditorRef.current.editor.loadDesign(dpc)
    console.log("onReady");
  };
  useEffect(() => {
    loader("show")
    const body = {
      user_id: 18207,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const getAllTags = async () => {
      await axios
        .post(`emailapi/get_tags`, body)
        .then((res) => {
          setAllTags(res.data.response.data);
          // console.log(campaign_id_st);
          // if (typeof campaign_id_st === "undefined" || campaign_id_st == 0) {
         loader("hide");
          // }
        })
        .catch((err) => {
          //console.log(err);
        });
    };
    getAllTags();
    // getCampaignData();
  }, []);

  return (
    <div className="right-sidebar">
        <div className="loader" id="custom_loader">
	        <span className="loader-view"> </span>
          </div>
      <div className="schedule_reheasal">
        <Link to="/webinar/rehearsal">
          <h6>
            Schedule another rehearsal <span>+</span>
          </h6>
        </Link>
      </div>
      <Row>
        <Col ><h3>Rehearsal</h3></Col>
        <Col><Button>Save</Button></Col>
      </Row>
      <form>
        <div className="form-inline row justify-content-between align-items-center">
          <div className="form-inline row justify-content-between align-items-center">
            <div className="input-group w-100">
              <div className="input-group-prepend">
                <button
                  className="btn btn-bordered btn-primary"
                  type="button"
                  id="tags-add"
                  data-bs-toggle="modal"
                  data-bs-target="#tagsModal"
                  onClick={() => setIsOpen(true)}
                >
                  + Add Tag
                </button>
              </div>
              <div className="tags_added">
                <ul>
                  {/* {finalTags.map((tags, index) => {
                          return (
                            <>
                              <li className="list1">
                                {tags.innerHTML || tags}{" "}
                                <img
                                  src={path_image + "filter-close.svg"}
                                  alt="Close-filter"
                                  onClick={() => removeTag(index)}
                                />
                              </li>
                            </>
                          );
                        })} */}
                </ul>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Subject</label>
              <input
                type="text"
                className="form-control"
                id="email-campaign"
                // value={emailCampaign}
                // onChange={changeEmailCampaign}
              />
              {/* {validator.message(
                        "emailCampaign",
                        emailCampaign,
                        "required"
                      )} */}
            </div>
          </div>
            <div className="form-group col-12 col-md-7">
                <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady}></EmailEditor>
              </div>  
        </div>
      </form>

      <Modal id="tagsModal" show={isOpen}>
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            Add Tags
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={(e) => {
              setIsOpen(false);
            }}
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className="select-tags">
            <h6>Select Tag :</h6>
            <div className="tag-lists">
              <div className="tag-lists-view">
                {Object.values(allTags).map((data) => {
                  return (
                    <>
                      <div>{data} </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="selected-tags">
            <h6>
              {/* Selected Tag <span>| {tagClickedFirst.length}</span> */}
            </h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <form>
            <div className="form-group">
              <label for="new-tag">New Tag</label>
              <input
                type="text"
                className="form-control"
                id="new-tag"
                // value={newTag}
                //  onChange={(e) => newTagChanged(e)}
              />

              <button
                //   onClick={addTag}
                type="button"
                className="btn btn-primary add btn-bordered"
              >
                Add
              </button>
            </div>
          </form>
          <button
            type="button"
            className="btn btn-primary save btn-filled"
            // onClick={saveButtonClicked}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomizeRehearsalInvites;
