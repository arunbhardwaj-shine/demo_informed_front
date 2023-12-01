import React from "react";
import GetDetails from "../Distributes/GetDetails";
import GetMedpakDetails from "../Distributes/GetMedpakDetails";

const GetDetailsLayout = () => {
    return (
        <>
            {localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==" ? (<>
                {/* {localStorage.getItem("user_id") == "B7SHpAc XDXSH NXkN0rdQ==" ? (<> */}
                <GetMedpakDetails />
            </>) : (
                <GetDetails />
            )}
        </>
    );
};
export default GetDetailsLayout