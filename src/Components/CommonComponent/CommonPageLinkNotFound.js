import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";


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
      <div class="not-found">
         <h1>404</h1>
      </div>
        <h4>Page not found</h4>
        <p>The link you clicked may be broken or the page may have been removed or renamed.</p>
        {/* <Link to="/">Go back</Link> */}
    </div>
    </div>
    </>
  )
}

export default CommonPageLinkNotFound;
