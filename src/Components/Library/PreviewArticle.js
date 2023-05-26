
import RenderPdf from "./CreateChange/RenderPdf";
const handleNext = () =>{
    
}
const PreviewArticle = () =>{
    return (
      <div className="test">
    <RenderPdf
                    next = "0"
                    url= {window.data}
                    handleNext ={handleNext}
                    hidePopup = "1"
                    previewArticle={true}
                  />
      </div>
      
         
    )
 }
 export default PreviewArticle