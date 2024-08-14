import React from "react";
import WebinarSelectSmartListCountryUsers from "./WebinarSelectSmartListCountryUsers";
import WebinarSelectSmartListUsers from "./WebinarSelectSmartListUsers";

const WebinarSelectSmartListUsersLayout = () => {
    return (
        <>
            {localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==" ? (
                <WebinarSelectSmartListCountryUsers />
            ) : (
                <WebinarSelectSmartListUsers />
            )}
        </>
    );
};
export default WebinarSelectSmartListUsersLayout