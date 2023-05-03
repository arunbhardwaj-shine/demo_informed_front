import React from "react";
import AddSite from "./AddSite";
import { useLocation } from "react-router-dom";

const EditSite = () => {
    const { state } = useLocation();
    return (
      <>
        {
          state?.siteId != "" ?
          <AddSite
            siteid= {state?.siteId}
          /> : null
        }

      </>
    );
}

export default EditSite;
