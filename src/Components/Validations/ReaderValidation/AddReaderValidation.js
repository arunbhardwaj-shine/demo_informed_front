export const AddReaderValidation = (data, groupId, flag) => {
 
  let error = {};

  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!data?.firstName) {
    error.firstName = "First name required";
  }
  if (!data?.email || regemail?.test(data?.email) === false) {
    error.email = "Email required with email pattern";
  }
  if (data.country.value=="") {

    error.country = "Please select country";

  }
  // if (groupId == 2 || (groupId == 3 && flag == 0)) {
  //   if (!data?.primary_phone?.toString()) {
  //     error.primary_phone = "Phone number required with country code";
  //   }
  //   if (!data?.countryCode?.toString()) {
  //     error.primary_phone = "Phone number required with country code";
  //   }
  // }
  if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
    if (!data?.institution) {                                                                          
      error.institution = "Please select institution";
    }
  }
  if (!data?.country) {
    error.country = "Please select country";
  }


  return error;
};
