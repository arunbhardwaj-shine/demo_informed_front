
import RenderPdf from "./CreateChange/RenderPdf";
import { useLocation, Link } from "react-router-dom";

const handleNext = () =>{
    
}
const PreviewArticle = () =>{
    const {state} = useLocation();
    return (
       <>
        <RenderPdf
                    next = "0"
                    url= {state?.data}
                    handleNext ={handleNext}
                    hidePopup = "1"
                  />
                  : null
       </>

    )
 }
 export default PreviewArticle