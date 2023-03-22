export const createContent = (data,fileCheck) => {
  let error = {};
  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // if (!data?.limitOfUsage) {
  //   error.limitOfUsage = "Limit of usage is required!";
  // }
  if (!data?.contentTitle) {
    error.contentTitle = "Content Title is required!";
  }
  // if (!data?.journalTitle) {
  //   error.journalTitle = "Journal Title is required!";
  // }
  // if (!data?.keyAuthor) {
  //   error.keyAuthor = "Author Title is required!";
  // }

  
  if (!data?.docintelFormat) {
    error.docintelFormat = "Docintel Format is required!";
  }else if(data?.docintelFormat){
     if(data?.docintelFormat == "pdf" && !data?.uploadFile){
      error.uploadFile = "Please upload pdf file!";
     }else if(data?.docintelFormat == "video" && !data?.uploadFile){
      error.uploadVideo = "Please upload video !";
     }else if(data?.docintelFormat == "ebook" && !fileCheck.length){
      error.ebookErr = "Please upload pdf file !";
     }
  }
  // if (!data?.uploadFile) {
  //   error.uploadFile = "File is required!";
  // }

  // if (!data?.image) {
  //   error.image = "Upload cover image is required!";
  // }

  // else if (!data?.country) {
  //   error.country = "Country is required";
  // } else if (!data?.clientProduct) {
  //   error.clientProduct = "Client Product is required";
  // } else if (!data?.production) {
  //   error.production = "Production is required";
  // } else if (!data.sales) {
  //   error.sales = "Sales is required";
  // }

  return error;
};
