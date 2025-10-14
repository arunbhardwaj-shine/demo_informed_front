export const createContent = (data, fileCheck, groupId = 2, retailer = 0) => {
  const rdLikeArray=["56Ek4feL/1A8mZgIKQWEqg==","bWmUjqX7J011   WUTYn9g==","MXl8m36VZFYXpgFVz3Pg0g==","HPW6EwQy6v8VrfnMsjz8tg=="]
  const isLikeRdAccount= rdLikeArray.includes(localStorage.getItem("user_id"))
  let error = {};
  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  
  if (data.hasOwnProperty("limit")) {
    if (groupId == 2 && !data?.limit) {
      error.limit = "Limit is required";
    } else if (groupId == 2 && data?.limit) {
      if (data?.limit < 0) {
        error.limit = "Limit must be greater than or equal to 0";
      }
    }
  }

  
  if (!data?.contentTitle) {
    error.contentTitle = "Content title is required!";
  }

  if (data.hasOwnProperty("chapter")) {
    data.chapter?.forEach((item, index) => {
      if(item.type == "video" && item.videoType == 'existing'){
        if(item?.selectedVideo == ''){
          if (!error?.chapter?.[index]) {
            error.chapter = { ...error.chapter, [index]: "Please select video" };
          }
        }
      }else{
        if (!item.uploadFile || !item.chapterTitle) {
          if (!error?.chapter?.[index]) {
            if (!isLikeRdAccount) {
              error.chapter = {
                ...error.chapter,
                [index]: "Chapter is required",
              };
            } else {
              error.chapter = { ...error.chapter, [index]: "File is required" };
            }
          }
        }
      }
    });
  }
  if (data.hasOwnProperty("pdfChapter")) {
    data.pdfChapter?.forEach((item, index) => {
      if (!item.uploadFile) {
        if (!error?.pdfChapter?.[index]) {
          if (!isLikeRdAccount) {
            error.pdfChapter = {
              ...error.pdfChapter,
              [index]: "Chapter is required",
            };
          } else {
            error.pdfChapter = {
              ...error.chapter,
              [index]: "File is required",
            };
          }
        }
      }
    });
  }

  

  if (!data?.docintelFormat) {
    error.docintelFormat = "Docintel format is required!";
  } else if (data?.docintelFormat) {
    if (data?.docintelFormat == "pdf" && !data?.uploadFile) {
      error.uploadFile = "Please upload pdf file!";
    } else if (data?.docintelFormat == "video" && !data?.uploadFile) {
      error.uploadVideo = "Please upload video !";
    } else if (data?.docintelFormat == "ebook" && !fileCheck.length) {
      error.ebookErr = "Please upload pdf file !";
    } else if (data?.docintelFormat == "pdfspc" && !fileCheck.length) {
      error.ebookErr = "Please upload pdf file !";
    }
  }
   

  return error;
};


export const saveNewTemplate = (data) => {
  let error = {};
  
  if(data.hasOwnProperty("template_name")){
    if(!data?.template_name){
      error.template_name = "Please enter template name";
    }
  }

  if(data.hasOwnProperty("language")){
    if(!data?.language){
      error.language = "Please select language";
    }
  }

  if(data.hasOwnProperty("ibu")){
    if(!data?.ibu){
      error.ibu = "Please select ibu";
    }
  }

  return error;
};