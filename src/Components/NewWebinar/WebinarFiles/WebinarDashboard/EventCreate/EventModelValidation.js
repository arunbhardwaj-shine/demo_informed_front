const EventModelValidation = (data) => {

  let error = {};
  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!data?.title) {
    error.title = "Please enter title";
  }
  if (!data?.location) {
    error.location = "Please enter location";
  }
  if(!data?.event_type){
    error.event_type="Please select event"
  }

  if (!data?.timezone) {
    error.timezone = "Please select time zone";
  }
  if (!data?.country_timezone) {
    error.country_timezone = "Please select country time zone";
  }
  // if (!data?.is_client_stream) {
  //   error.is_client_stream = "Please select client stream";
  // }
  // if (data?.is_client_stream == "Yes") {
  //   if (!data?.client_stream_url) {
  //     error.client_stream_url = "Please enter url";
  //   }
  // }
  if (!data?.dateStart) {
    error.dateStart = "Please select event start date";
  }
  if (!data?.dateEnd) {
    error.dateStart = "Please select event end date";
  }
  if (!data?.dateStartHour || !data?.dateStartMin?.toString() || data?.dateStartHour == "Hour" || data?.dateStartMin == "Min") {
    error.dateStartHour = "Please select event start time";
  }
  if (!data?.dateEndHour || !data?.dateEndMin?.toString() || data?.dateEndHour == "Hour" || data?.dateEndMin == "Min") {
    error.dateEndHour = "Please select event end time";
  }
  if (!data?.event_code) {
    error.event_code = "Please select event code";
  }
  if ((data?.speaker_name)?.length) {
    let index = (data?.speaker_name)?.findIndex(
      (item, index) => item?.speakerName?.trim() == ""
    );
    if (index > -1) {
      error.speaker_name = "Please enter speaker name";
      error.index = index;
    }

  }
  // if (!data?.speaker_email) {
  //   error.speaker_email = "Please enter speaker email";
  // }
  // if (!data?.meeting_type) {
  //   error.meeting_type = "Please select meeting type";
  // }

  // if (data?.speaker_email && regemail?.test(data?.speaker_email) === false) {
  //   error.speaker_email = "Speaker email required with email pattern";
  // }

  return error;
};
export default EventModelValidation;
