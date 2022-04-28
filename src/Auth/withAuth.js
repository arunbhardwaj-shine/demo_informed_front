import { useNavigate } from "react-router-dom";
import App from "../App";
const WithAuth = (WrappedComponent) => {

  
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("Token");
      
      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        
        return 
        //return <WrappedComponent {...props} />;
      }

      // if (accessToken) {
      // Router.replace("/wiser-board");
      // return null;
      // }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default WithAuth;
