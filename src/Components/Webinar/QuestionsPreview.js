import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ExportApi from '../../Api/ExportApi';
import { loader } from '../../loader';

const QuestionsPreview = () => {
    let params=useParams()
    const [Data, setData] = useState([]);
    const [DataAns, setDataAns] = useState([]);
    const listData=()=>{
        ExportApi.listFormPool_Survey(params.id,"survey",1).then((resp) => {
          if (resp.ok) {
           console.log(resp.data.data)
       if(resp.data.message=="No Record Found"){
        setData([])
      }else{
       setData(resp.data.data)
       loader("hide")
      }
          }
        });
        loader("hide")
      }
      useEffect(() => {
        loader("show")
          listData()
      }, []);
      const submit=()=>{
       const sub_ques =[]
        const nodeList = document.querySelectorAll("input");
       
       
     for (let i = 0; i < nodeList.length; i++) {
      if(nodeList[i].checked==true&&nodeList[i].name==="null")
      {
        // console.log(nodeList[i].name==="null")
        // console.log(nodeList[i].name!=="null")
        let obj={
          id:nodeList[i].id,
          question:nodeList[i].className,
          sub_ques:nodeList[i].name,
          answer:nodeList[i].value}
          sub_ques.push(obj)
        }
        else   if(nodeList[i].checked==true&&nodeList[i].name!=="null"){
          console.log("noooooooo")
          let obj={
            id:nodeList[i].id,
            question:nodeList[i].className,
            // sub_ques:nodeList[i].name,
            answer:nodeList[i].value}

             sub_ques.push(obj)
          }
        // console.log(nodeList[i].value);


        setDataAns(sub_ques)
        // setDataAns(DataAns)
      // DataAns.splice(i, 1, DataAns[i]);
      // setDataAns([...DataAns]);
      }

      }
  return (
    <div className="right-sidebar col"> 
    
     <div className="survey-tab">{Data.length>0?
  <h4> <center>{Data[0]?.event?.title}</center> </h4>:null
}</div>
{console.log("first",DataAns)}
    {
        Data.map((item,index)=>{

 return   <>

    <div className="question" >
     <h6 >{index+1 +" . "}{item.question}</h6>
    </div>
     {item.sub_ques==null?<>   { item.label?.map((val,index)=>{
     return  <div className='question-lab' key={index}> 
      <label htmlFor="exampleInputEmail1">{val.name}</label> 
      <input className={item.question}id={item.id} name={"null"} value={val.name} type="radio"/> 
       </div>
     })}</>:<>
     
     {item.type=="checkbox"?<div >
      { item.label?.map((item,index)=>{
     return  <div className='green' key={index}> 
      <label htmlFor="exampleInputEmail1">{item.name} </label> 
     
      {/* <input name={"name"+index} type="checkbox"/>  */}
       </div>
     })}
      <br/>
     
     {item.sub_ques?.map((data)=>{
       return<>
      
       <div className='SubQue1'>

  <h6 >{data.question}</h6>
     { item.label?.map((val,index)=>{
     return  <div  key={index}> 
      <input className={item.question}id={item.id} name={data.question} value={val.name}type="radio"/></div>
     })}
       </div>
    </>  
     })}
    </div>:null}
     
     {item.type=="radio"?<div>
     { item.label?.map((item,index)=>{
     return  <div key={index}> 
      <label htmlFor="exampleInputEmail1">{item.name} </label> 
      {/* <input name={"name"+index} type="checkbox"/>  */}
       </div>
     })}
      <div>{item.sub_ques>0?item.sub_ques?.map((data)=>{
      //  alert(data.SubQuestion)
      return<>
      <h6>{data.question}</h6>

         {item.label.map((item,index)=>{
      // console.log(item)
     return <>
       {/* <label htmlFor="exampleInputEmail1">{item.name} </label>  */}
      <input className='SubQue' id={item.id} name={data.question}value={item.name} type="radio"/> 
     </>
    })}
         </>
        }):<> { item.label?.map((item,index)=>{
          return  <div className='question'  key={index}> 
           <label htmlFor="exampleInputEmail1">{item.name}</label> 
           <input className='SubQue' id={item.id} value={item.name} type="radio"/>  </div>
          })}</>} </div></div>:null}
     </>}

  
       </>
           })
        }
        <button type='button' onClick={()=>submit()}>submit</button>
  </div>
  )
}

export default QuestionsPreview