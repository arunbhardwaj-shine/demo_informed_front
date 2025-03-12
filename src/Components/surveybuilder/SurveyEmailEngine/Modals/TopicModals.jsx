import React from 'react'
import { useState } from "react";
import { Modal, DropdownButton, Dropdown, Button } from "react-bootstrap";
import { loader } from '../../../../loader';
import { toast } from 'react-toastify';
 
import { surveyAxiosInstance } from '../../CommonFunctions/CommonFunction';
import { useEffect } from 'react';
import { surveyEndpoints } from '../../SurveyEndpoints/SurveyEndpoints';
import { ENDPOINT } from '../../../../axios/apiConfig';

const TopicModals = ({
        show ,
        setShow ,
        tagsReRender,
        setTagsReRender ,
        finalTags ,
        setFinalTags ,
        tagClickedFirst , 
        setTagClickedFirst ,
        newTag ,
        setNewTag ,
        allTags ,
        setAllTags ,
        tagsCounter ,
        setTagsCounter,
        error ,
        setError,
        edit,
        editTopic,
        setEditTopic ,
        subLinkData,
        setSubLinkData,

}) => {

  const {FETCH_ALL_TOPICS,UPDATE_SURVEY_SUBLINK_TAGS}=surveyEndpoints;

  
 
    let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
  
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
  
        const addTag = async () => {
          if (typeof newTag == "undefined" || newTag.trim().length === 0) {
            setError((prev) => ({
              ...prev,
              newTag: "Please enter a topic",
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


 

useEffect(() => {
  const fetchTags = async () => {
    

    if (edit) {
      try {
        const res = await surveyAxiosInstance.post(FETCH_ALL_TOPICS);
        if(res.status == 200){
          setAllTags(res?.data?.data);
        }
    
      } catch (err) {
        toast.error("Something went wrong");
      }

      const tags = subLinkData.filter((data) => data.sublink_id == editTopic);

      if (tags.length > 0 && tags[0].tags) {
        const clonedTags = structuredClone(tags[0].tags);
        setTagClickedFirst(clonedTags);
        setFinalTags(clonedTags);
      } else {
        console.warn("Tags not found for editTopic:", editTopic);
      }
    }
  };

  fetchTags();
}, [ ]); // Include dependencies




  
      function resetState(setfun) {
        setfun("");
      }
  
        const tagClicked = (dd) => {
          if (!tagClickedFirst.includes(dd)) {
            setTagClickedFirst((oldArray) => [...oldArray, dd]);
          } else {
            toast.error("Topic already in list.");
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
  
  
        const saveButtonClicked = async () => {

          if(edit){
            let prev_tags = finalTags;
            let new_tags = prev_tags.concat(tagClickedFirst);
            const uniqueTags = new_tags.filter((x, i, a) => a.indexOf(x) === i);

         

              try {
                loader("show")
               
             const res= await surveyAxiosInstance.post(UPDATE_SURVEY_SUBLINK_TAGS,{tags : uniqueTags, sublink_id : editTopic })

              if(res.status == 201){
                setSubLinkData(prevData =>
                  prevData.map(item =>
                      item.sublink_id === editTopic ? { ...item, tags: uniqueTags } : item
                  )
              );
  
              setFinalTags(uniqueTags);
  
              }
                loader("hide")
              } catch (error) {
                loader("hide")
                console.log(error);

            }
          
          }else{

            if (finalTags.length == 0 && tagClickedFirst.length == 0) {
              toast.error("No Topic selected");
              return;
            }
            if (typeof finalTags != "undefined" && finalTags.length > 0) {
              let prev_tags = finalTags;
              let new_tags = prev_tags.concat(tagClickedFirst);
              const uniqueTags = new_tags.filter((x, i, a) => a.indexOf(x) === i);

              setFinalTags(uniqueTags);
            } else {
              setFinalTags(tagClickedFirst);
             
            }

          }
         
          handleClose();
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

 


  return (
    <>
     <Modal
        id="tagsModal"
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="survey-modal"
      >
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
           Edit Topics
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
            <h6>Select topic :</h6>
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
              Selected topics <span>| {tagClickedFirst.length}</span>
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
              <label htmlFor="new-tag">New Topics</label>
              <div className="d-flex flex-column align-items-start">
                <input
                  type="text"
                  className={`form-control ${error?.newTag ? "error" : ""}`}
                  id="new-tag"
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
    </>
  )
}

export default TopicModals