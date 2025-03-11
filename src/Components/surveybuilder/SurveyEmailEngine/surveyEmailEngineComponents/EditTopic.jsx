import React from 'react'
import { useState } from "react";
import { Modal, DropdownButton, Dropdown, Button } from "react-bootstrap";
import { loader } from '../../../../loader';
 
import { toast } from 'react-toastify';
import { surveyAxiosInstance } from '../../CommonFunctions/CommonFunction';
 
import { useEffect } from 'react';
import { surveyEndpoints } from '../../SurveyEndpoints/SurveyEndpoints';
 

const TopicModals = ({
        // edit,
        // editTopic,
        // subLinkData,
        // setSubLinkData,
        showEditTopicModal,
        setShowEditTopicModal,
        isData,
        setIsData,
        currentEditTopicId
        


}) => {
 

  const {ADD_SURVEY_SUBLINK_TAGS,GET_SURVEY_SUBLINK_TAGS,UPDATE_SURVEY_SUBLINK_TAGS}=surveyEndpoints;

    const [show, setShow] = useState(showEditTopicModal);
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
            try {
                loader("show")
                await surveyAxiosInstance.post(ADD_SURVEY_SUBLINK_TAGS,{tags : newTag })
                loader("hide")
            } catch (error) {
                console.log(error);

                loader("hide")
                toast.error("Failed to add tag.");

                return ;
                
            }
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
    
 
      try {
        const res = await surveyAxiosInstance.get(GET_SURVEY_SUBLINK_TAGS);
        setAllTags(res?.data?.data);
      } catch (err) {
        toast.error("Something went wrong");
      }
     

   
 
    // const tags = isData.filter((data) => currentEditTopicId == data.survey_id).[0].tags.parse() ;

       const filteredData = isData.filter((data) => Number(currentEditTopicId) === Number(data.survey_id));
      const tags = filteredData.length > 0 && filteredData[0].tags ? JSON.parse(filteredData[0].tags) : [];


   

      if (tags.length > 0  ) {
        // const clonedTags = structuredClone(tags[0].tags);
        setTagClickedFirst(tags);
        setFinalTags(tags);
      } else {
        console.warn("Tags not found for editTopic:",  );
      }
    }
 

  fetchTags();
}, [ ]); 



  
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
        setShowEditTopicModal(false);
        setError((prev)=>({
          ...prev,
          newTag:""
      }))
        
      };
  
  
        const saveButtonClicked = async () => {

        //   if(edit){
            let prev_tags = finalTags;
            let new_tags = prev_tags.concat(tagClickedFirst);
            const uniqueTags = new_tags.filter((x, i, a) => a.indexOf(x) === i);

         

              try {
                loader("show")
          
            //   const res= await surveyAxiosInstance.post(UPDATE_SURVEY_SUBLINK_TAGS,{tags : uniqueTags, sublink_id : editTopic })

            //    setIsData(prevData =>
            //     prevData.map(item =>
            //         item.survey_id === currentEditTopicId ? { ...item, tags: JSON.stringify(uniqueTags) } : item
            //     )
            // );
            setIsData(prevData =>
                prevData.map(item =>
                    Number(item.survey_id) === Number(currentEditTopicId)
                        ? { ...item, tags: typeof uniqueTags === "string" ? uniqueTags : JSON.stringify(uniqueTags) }
                        : item
                )
            );
            
                loader("hide")
              } catch (error) {
                loader("hide")
                console.log(error);

            }
            setFinalTags(uniqueTags);

        //   }
        // else{

        //     if (finalTags.length == 0 && tagClickedFirst.length == 0) {
        //       toast.error("No Topic selected");
        //       return;
        //     }
        //     if (typeof finalTags != "undefined" && finalTags.length > 0) {
        //       let prev_tags = finalTags;
        //       let new_tags = prev_tags.concat(tagClickedFirst);
        //       const uniqueTags = new_tags.filter((x, i, a) => a.indexOf(x) === i);
  
            
  
  
        //       setFinalTags(uniqueTags);
               
        //     } else {
        //       setFinalTags(tagClickedFirst);
             
        //     }

        //   }
         
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