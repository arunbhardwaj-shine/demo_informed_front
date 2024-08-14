import React from "react";
import SelectSmartListUsers from "../Emails/SelectSmartListUsers";
import SelectSmartListCountryUsers from "../Emails/SelectSmartListCountryUsers";

const SelectSmartListUsersLayout = () => {
    return (
        <>
            {localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==" ? (
                <SelectSmartListCountryUsers />
            ) : (
                <SelectSmartListUsers />
            )}
        </>
    );
};
export default SelectSmartListUsersLayout