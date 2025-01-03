export const surveyValidation = (data) => {
    console.log(data);
    let error = {};
  
    if (!data?.surveyTitle) {
      error.surveyTitle = "Please enter the title";
    }
    if (!data?.surveyCreator || !data?.surveyCreator?.label) {
      error.surveyCreator = "Please select the creator name";
    }
    if (!data?.surveySubtitle) {
      error.surveySubtitle = "Please enter the subtitle";
    }
  
    // console.log(data)
    // if (!data?.label) {
    //   error.addCreator = "Please enter creator name";
    // }
   
    return error;
  };