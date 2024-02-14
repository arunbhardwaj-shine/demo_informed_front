export const SurveyQuestionFormValidations = (data) => {
  let error = {};
  if (!data?.location) {
    error.city = "Please enter city";
    error.state = "Please enter state";
  } else if (data?.location) {
    if (!data?.location?.city) {
      error.city = "Please enter city";
    }
    if (!data?.location?.state) {
      error.state = "Please enter state";
    }
  }

  if (!data?.provider) {
    error.provider = "Please enter type of provider";
  }

  if (!data?.patient_case?.patient_case_rating) {
    error.patient_case = "Please rate all the reasons";
  }

  if (!data?.clinical_practice?.future_clinical) {
    error.future_clinical = "Please select the option";
  }
  if (!data?.recommend?.recommend_clinical) {
    error.recommend_clinical = "Please select the option";
  }

  if (!data?.suggestion ) {
    error.suggestion = "Please give suggestions";
  }

  return error;
};
