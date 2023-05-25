
import RenderPdf from "./CreateChange/RenderPdf";
import { useLocation, Link } from "react-router-dom";

const handleNext = () =>{
    
}
const PreviewArticle = () =>{
    return (
      
             <RenderPdf
                    next = "0"
                    url= {window.data}
                    handleNext ={handleNext}
                    hidePopup = "1"
                  />
    )
 }
 export default PreviewArticle