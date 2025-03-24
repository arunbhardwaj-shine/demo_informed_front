import React from "react";
import SelectSmartListUsers from "../Emails/SelectSmartListUsers";
import SelectSmartListCountryUsers from "../Emails/SelectSmartListCountryUsers";

const SelectSmartListUsersLayout = ({ type = ''}) => {
    return (
        <>
            {localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==" ? (
                <SelectSmartListCountryUsers type={type} />
            ) : (
                <SelectSmartListUsers type={type} />
            )}
        </>
    );
};
export default SelectSmartListUsersLayout