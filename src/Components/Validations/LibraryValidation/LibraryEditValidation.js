export const LibraryEditValidation = (data) => {
  console.log("validation data", data);
  let error = {};

  if (!data?.limit?.toString()) {
    error.limit = "Limit is required";
  } else if (data?.limit) {
    if (data?.limit < 0) {
      error.limit = "Limit must be greater than or equal to 0";
    }
  }

  if (!data?.contentTitle) {
    error.contentTitle = "Content title is required!";
  }
  if (data.hasOwnProperty("chapter")) {
    data.chapter?.forEach((item, index) => {
      if (
        (item.hasOwnProperty("uploadFile") && item?.uploadFile == "") ||
        !item?.chapterTitle
      ) {
        if (!error?.chapter?.[index]) {
          if (localStorage.getItem("user_id") != "56Ek4feL/1A8mZgIKQWEqg==") {
            error.chapter = {
              ...error.chapter,
              [index]: "Chapter is required",
            };
          } else {
            error.chapter = { ...error.chapter, [index]: "File is required" };
          }
          // error.chapter = {...error.chapter,[index]:"Chapter is required"};
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

  if (!data?.docintelFormat) {
    error.docintelFormat = "Docintel format is required!";
  } else if (data?.docintelFormat) {
    if (data?.docintelFormat == "pdf" && !data?.uploadFile) {
      error.uploadFile = "Please upload pdf file!";
    }
  }
  // if (!data?.docintelFormat) {
  //   error.docintelFormat = "Docintel format is required!";
  // } else if (data?.docintelFormat) {
  //   if (data?.docintelFormat == "pdf" && !data?.uploadFile) {
  //     error.uploadFile = "Please upload pdf file!";
  //   } else if (data?.docintelFormat == "video" && !data?.uploadFile) {
  //     error.uploadVideo = "Please upload video !";
  //   } else if (data?.docintelFormat == "ebook" && !fileCheck.length) {
  //     error.ebookErr = "Please upload pdf file !";
  //   } else if (data?.docintelFormat == "pdfspc" && !fileCheck.length) {
  //     error.ebookErr = "Please upload pdf file !";
  //   }
  // }

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

  return error;
};
