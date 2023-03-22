export const AddReaderValidation = (data) => {
  let error = {};
  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!data?.firstName) {
    error.firstName = "First name required";
  }
  if (!data?.email || regemail?.test(data?.email) === false) {
    error.email = "Email required with email pattern";
  }
  if (!data?.phoneNumber) {
    error.phoneNumber = "Phone number required with country code";
  }
  if (!data?.country) {
    error.country = "Please Select country";
  }
  return error;
};
