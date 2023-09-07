export const createContent = (data, fileCheck, groupId = 2) => {
  let error = {};
  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // if (!data?.limitOfUsage) {
  //   error.limitOfUsage = "Limit of usage is required!";
  // }
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
      if (!item.uploadFile || !item.chapterTitle) {
        if (!error?.chapter?.[index]) {
          if (localStorage.getItem("user_id") != "56Ek4feL/1A8mZgIKQWEqg==") {
            error.chapter = {
              ...error.chapter,
              [index]: "Chapter is required",
            };
          } else {
            error.chapter = { ...error.chapter, [index]: "File is required" };
          }
        }
      }
    });
  }
  if (data.hasOwnProperty("pdfChapter")) {
    data.pdfChapter?.forEach((item, index) => {
      if (!item.uploadFile) {
        if (!error?.pdfChapter?.[index]) {
          if (localStorage.getItem("user_id") != "56Ek4feL/1A8mZgIKQWEqg==") {
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

  // if (data.hasOwnProperty('trial')) {
  //   if(!data?.trial){
  //     error.trial  = "trial is required";
  //   }
  // }
  // if (data.hasOwnProperty('blindType')) {
  //   if(!data?.blindType){
  //     error.blindType  = "Blind Type is required";
  //   }
  // }

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
