import React from "react";
import GetDetails from "../Distributes/GetDetails";
import GetMedpakDetails from "../Distributes/GetMedpakDetails";

const GetDetailsLayout = () => {
    return (
        <>
            {localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==" ? (<>
                {/* {localStorage.getItem("user_id") == "B7SHpAc XDXSH NXkN0rdQ==" ? (<> */}
                {/* {localStorage.getItem("user_id") == "rjiGlqA9DXJVH7bDDTX0Lg==" ? (<> */}
                <GetMedpakDetails />
            </>) : (
                <GetDetails />
            )}
        </>
    );
};
export default GetDetailsLayout