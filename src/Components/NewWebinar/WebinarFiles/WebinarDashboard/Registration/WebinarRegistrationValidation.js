const WebinarRegistrationValidation = (formData, eventData) => {
  let error = {};
  if (!eventData?.event_id) {
    error.event_id = "Please select the event";
  }
  if (!formData?.pageTitle) {
    error.pageTitle = "Please enter page title";
  }
  if (!formData?.body?.length) {
    error.body = "Please add form fields";
  }
  // if (
  //   !formData?.body?.some(
  //     (item, index) => item?.label?.toLowerCase() == "email"
  //   )
  // ) {
  //   error.email = "Please select email";
  // }
  return error;
};
export default WebinarRegistrationValidation;
