export const SurveyQuestionFormValidations = (data) => {
  let error = {};
  if (!data?.patient_case?.patient_case_rating) {
    error.patient_case = "This field is required";
  }

  // if (!data?.clinical_practice?.future_clinical) {
  //   error.future_clinical = "Please select the option";
  // }
  // if (!data?.recommend?.recommend_clinical) {
  //   error.recommend_clinical = "Please select the option";
  // }

  // if (!data?.suggestion ) {
  //   error.suggestion = "Please give suggestions";
  // }

  return error;
};
