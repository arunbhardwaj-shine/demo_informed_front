import React from "react";
import GetDetails from "../Distributes/GetDetails";
import GetMedpakDetails from "../Distributes/GetMedpakDetails";

const GetDetailsLayout = ({ type = ''}) => {
    const rdLikeArray=["56Ek4feL/1A8mZgIKQWEqg==","bWmUjqX7J011   WUTYn9g==","MXl8m36VZFYXpgFVz3Pg0g=="]
    const isLikeRdAccount= rdLikeArray.includes(localStorage.getItem("user_id"))
    return (
        <>
            {(localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==" ||isLikeRdAccount)
            ? (<>
             
                <GetMedpakDetails type={type} />
            </>) : (
                <GetDetails type={type} />
            )}
        </>
    );
};
export default GetDetailsLayout