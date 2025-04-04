import React from "react";
 


const CommonPageLinkNotFound = () => {
  const path_image = process.env.REACT_APP_ONESOURCE;
  return (
    <>
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
    <div className="page_not_found">
      <div className="page_not_found-inset">
      <div className="not-found">
         <h1>404</h1>
      </div>
        <h4>Page not found</h4>
        <p>The link you clicked may be broken or the page may have been removed or renamed.</p>
        
    </div>
    </div>
    </>
  )
}

export default CommonPageLinkNotFound;
