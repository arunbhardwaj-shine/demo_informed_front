 const modelValidation = (data) => {
    
    let error = {}
   
    if(Object.keys(data)?.length){

        Object.keys(data)?.forEach(item =>{
           if(!data[item]){
            error[item] = `${item} is required`
           }
        })
    }
    return error



}

export default  modelValidation