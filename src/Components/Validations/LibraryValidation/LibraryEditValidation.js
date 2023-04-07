export const LibraryEditValidation = (data) => {
  let error = {};

  if (!data?.contentTitle) {
    error.contentTitle = "Content Title is required!";
  }
  if(data.hasOwnProperty('chapter')){
    data.chapter?.forEach((item,index) =>{
      if(item.hasOwnProperty('uploadFile') && item?.uploadFile =="" ){
        if(!error?.chapter?.[index]){
          error.chapter = {...error.chapter,[index]:"Chapter is required"};
        }
      }
    })
  }
  if (data.hasOwnProperty('trial')) {
    if(!data?.trial){
      error.trial  = "trial is required";
    }
  }
  if (data.hasOwnProperty('blindType')) {
    if(!data?.blindType){
      error.blindType  = "Blind Type is required";
    }
  }
  

  if (!data?.limit?.toString()) {
    error.limit = "Limit is required";
  } else if (data?.limit) {
    if (data?.limit < 0) {
      error.limit = "Limit must be greater than or equal to 0";
    }
  }

  return error;
};
