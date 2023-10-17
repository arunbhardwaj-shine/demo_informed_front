const EventModelValidation = (data) => {
  let error = {};
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
  if (data?.is_client_stream == "Yes") {
    if (!data?.client_stream_url) {
      error.client_stream_url = "Please enter url";
    }
  }
  if (!data?.dateStart) {
    error.dateStart = "Please select event date";
  }
  if (!data?.dateStartHour || !data?.dateStartMin?.toString()) {
    error.dateStartHour = "Please select event start time";
  }
  if (!data?.dateEndHour || !data?.dateEndMin?.toString()) {
    error.dateEndHour = "Please select event end time";
  }
  if (!data?.event_code) {
    error.event_code = "Please select event code";
  }
  // if (!data?.description) {
  //   error.description = "Please select event description";
  // }

  return error;
};
export default EventModelValidation;
