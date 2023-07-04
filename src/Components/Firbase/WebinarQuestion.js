import React,{useEffect,useState} from "react"
import { postData } from "../../axios/apiHelper"
import { ENDPOINT } from "../../axios/apiConfig"
const WebinarQuestion = ()=>{

    const initiFun = async()=>{
        try{
         await postData(ENDPOINT)

        }catch(err){
            console.log("-err",err)
        }
    }

    useEffect(()=>{

    },[])
    return (
        <>
        
        </>
    )
}

export default WebinarQuestion