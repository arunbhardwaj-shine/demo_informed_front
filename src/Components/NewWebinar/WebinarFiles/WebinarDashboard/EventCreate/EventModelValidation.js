const EventModelValidation = (data) => {
  let error = {};
  console.log("validation Data--->", data);
  if (!data?.title) {
    error.title = "Please enter title";
  }
  if (!data?.type) {
    error.type = "Please select bu";
  }
  if (!data?.timezone) {
    error.timezone = "Please select time zone";
  }
  if (!data?.country_timezone) {
    error.country_timezone = "Please select country time zone";
  }
  if (!data?.is_client_stream) {
    error.is_client_stream = "Please select client stream";
  }
  if (!data?.dateStart) {
    error.dateStart = "Please select event date";
  }
  if (!data?.dateStartHour) {
    error.dateStartHour = "Please select event start time";
  }
  // if (!data?.dateEndHour?.value) {
  //   error.dateEndHour = "Please select event end time";
  // }
  if (!data?.event_code) {
    error.event_code = "Please select event code";
  }
  // if (!data?.description) {
  //   error.description = "Please select event description";
  // }

  return error;
};
export default EventModelValidation;
