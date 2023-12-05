import React from "react";
import MedpakSelectSmartListUsers from "./MedpakSelectSmartListUsers";
import SelectSmartListUsers from "./SelectSmartListUsers";
const SelectSmartListUsersLayout = () => {
    return (
        <>
            {localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==" ? (
                <MedpakSelectSmartListUsers />
            ) : (
                <SelectSmartListUsers />
            )}
        </>
    );
};
export default SelectSmartListUsersLayout