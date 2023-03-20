import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import AliceCarousel from "react-alice-carousel";
import { Link, useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { loader } from "../../../loader";
import React, { useEffect, useState, useRef } from "react";
import {postData} from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import SimpleReactValidator from "simple-react-validator";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import RenderPdf from "./RenderPdf";
import Tooltip from "react-bootstrap/Tooltip";
import {
  Button,
  Col,
  Dropdown,
  Modal,
  DropdownButton,
  Form,
  Row,
  ProgressBar,
  Tab,
  Tabs,
} from "react-bootstrap";
import Select from "react-select";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
// ebook 3846
const PreviewContent = () => {
    const navigate = useNavigate();
    const [articleId, setArticleId] = useState("3899");
    const [pdfData, setPdfData] = useState([]);
    const [editTitle, setEditTitle] = useState(false);
    const [titleChange, setTitleChange] = useState('');
	const responsive = {
		0: { items: 1 },
		568: { items: 2 },
		1024: { items: 5 },
	};
	const [activeIndex, setActiveIndex] = useState(0);
	const slidePrev = () => setActiveIndex(activeIndex - 1);
	const slideNext = () => setActiveIndex(activeIndex + 1);
	const syncActiveIndex = ({ item }) => setActiveIndex(item);
	const [templateId, setTemplateId] = useState();
	const [newTemplateClicked, setNewTemplateClicked] = useState(false);
	const [templateClickedd, setTemplateClicked] = useState(false);
	const [pdfFileId, setPdfFileId] = useState();
	const [templatePdf, setTemplatePdf] = useState();
	const [templateName, setTemplateName] = useState("");

    useEffect(() => {
      getArticleData();
    }, []);

    const getArticleData = async () => {
        loader('show');
		try{
          let body = {
            pdfId: articleId
          };
          const res = await postData(ENDPOINT.LIBRARYGETARTICLE, body);
          setPdfData(res?.data?.data);
		  loader('hide');
		}catch(err){
			loader('hide');
		}
    };

    const updateArticleTitle = (title) => {
		if(pdfData?.file_type && pdfData.file_type == "ebook") {
			let pdfIndex = pdfData.ebookData.findIndex(el => el.id === pdfFileId);
			pdfData.ebookData[pdfIndex].title = title;
			setPdfData(pdfData);
			setTemplateName(title);
		}else{
			pdfData.title = title;
		}   
    }
	
	const templateClicked = (template, e) => {
		const div = document.querySelector("img.select_mm");
		setNewTemplateClicked(false);
		if (div) {
		  div.classList.remove("select_mm");
		}
		setTemplatePdf(template?.file_name);
		setTemplateName(template?.title);
		setTemplateClicked(true);
		setPdfFileId(template.id);
		setEditTitle(false);
		e.target.classList.toggle("select_mm");
	}

    return(
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    <button className="btn btn-primary btn-bordered back"
                    onClick={(e) => navigate("/set-popup")}
                    >
                      Back
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">
                    <li className="">
                      <a href="">Create Your Content</a>
                    </li>
                    <li className="">
                      <a href="">Edit Consent Option</a>
                    </li>
                    <li className="active active-main">
                      <a href="">Preview Your Content &amp; Publish</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <button className="btn btn-primary btn-bordered move-draft">
                      Cancel
                    </button>
                    <button className="btn btn-primary btn-filled next">
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
			{
				pdfData?.file_type && pdfData.file_type == "ebook" && 
				(
					<section className="select-mail-template library-cosent">
					  <div className="custom-container">
						<div className="row">
							<AliceCarousel
							mouseTracking
							disableDotsControls
							activeIndex={activeIndex}
							responsive={responsive}
							onSlideChanged={syncActiveIndex}
						  >
							{pdfData?.ebookData.map((template) => {
							  return (
								<>
								  <div
									className="item"
									onClick={(e) => templateClicked(template, e)}
								  >
									<img
									  id={"template_dyn" + template.id}
									  src={template.image}
									  alt=""
									  className={
										typeof templateId !== "undefined" &&
										templateId == template.id
										  ? "select_mm"
										  : ""
									  }
									/>
									<p>{template.title}</p>
								  </div>
								</>
							  );
							})}
							</AliceCarousel>
						</div>
					</div>
					</section>	
				)
			}
            <div className="create-change-content spc-content">
              <div className="form_action">
                <div className="row">
                  <Col className="sublink_right preview-content d-flex flex-column">
					<>
					  <div className="d-flex justify-content-between align-items-center">
					  <h4 className="edit_content_title">
						{
						  editTitle ?
						  <input
							type="text"
							className="form-control"
							id="new-tag"
							value={
							  titleChange
							}
							onChange={(e) => setTitleChange(e.target.value)}
						  />
						  : 
						  pdfData?.file_type && pdfData.file_type == "ebook" ?
							templateName != '' ? templateName : pdfData?.title
						  :
						  pdfData?.title
						}

						{
						  editTitle ?
						  <>
						  <button onClick={(e) => {
							  setEditTitle(false)
							  updateArticleTitle(titleChange)
						  }}>Save</button>
						  <button onClick={(e) => {
							  setEditTitle(false)
							  setTitleChange(pdfData?.title)
						  }}>Cancel</button>
						  </>
						  :
						  <button
						  onClick={(e) => {
							  setEditTitle(true)
							  setTitleChange(
								pdfData?.file_type && pdfData.file_type == "ebook" ?
								templateName != '' ? templateName : pdfData?.title
								  :
								pdfData?.title
							  )
						  }}
						  >
						  <img src={path_image + "edit-button.svg"} alt="Edit" />
						  </button>
						}


					  </h4>
					  <Button className="btn btn-bordered">Change content file</Button>
					</div>
					{						
						pdfData?.file_type && pdfData.file_type == "ebook" ?
							<RenderPdf
							  url= {templatePdf}
							/>
						:
						
							<RenderPdf
							  url= {pdfData?.file_name}
							/>
					}
					
					</>	
                  </Col>
                </div>
              </div>
            </div>
      </Row>
    </div>
  </Col>
  )
}

export default PreviewContent;
