const WebinarRegistrationValidation = (formData, eventData) => {
  let error = {};

  if (!formData?.pageTitle) {
    error.pageTitle = "Please enter page title";
  }
  if (!formData?.body?.length) {
    error.body = "Please add form fields";
  }

  return error;
};
export default WebinarRegistrationValidation;
