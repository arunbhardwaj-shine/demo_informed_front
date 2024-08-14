
import RenderPdf from "./CreateChange/RenderPdf";
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
const handleNext = () =>{
    
}
const PreviewArticle = () =>{
    return (

      <div className="create-change-content spc-content">
      <div className="form_action">
        <Row>
          <Col className="sublink_right preview-content d-flex flex-column">
              {
                window.data && typeof window.data !== "undefined"
                ?
                <RenderPdf
                next = "0"
                url= {window.data}
                handleNext ={handleNext}
                hidePopup = "1"
                previewArticle={true}
              />
                : null
              }
          </Col>
        </Row>
      </div>
    </div>
    )
 }
 export default PreviewArticle