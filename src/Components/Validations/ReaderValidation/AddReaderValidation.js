export const AddReaderValidation = (data, groupId, flag) => {
  console.log("valid-->", data);
  let error = {};

  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!data?.firstName) {
    error.firstName = "First name required";
  }
  if (!data?.email || regemail?.test(data?.email) === false) {
    error.email = "Email required with email pattern";
  }
  if (data.country == "") {
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
  if (localStorage.getItem("user_id") == "90VIqoM675WT4/peSRnbSQ==") {
    if (!data?.primary_phone) {
      error.primary_phone = "Please enter Phone number";
    } else if (data?.primary_phone) {
      if (Object.keys(data?.primary_phone)?.length > 12) {
        error.primary_phone = "Number must be 12 digits or less";
      }
    }
    if (!data?.country?.value) {
      error.country = "Please select country";
    }
    if (!data?.address?.postcode) {
      error.postcode = "Please enter postcode";
    }
    if (!data?.contactTotal) {
      error.contactTotal = "Contact total required";
    } else if (data?.contactTotal) {
      if (data?.contactTotal > 500 || data?.contactTotal < 0) {
        error.contactTotal = "Contact total must be inbetween 0 to 500";
      }
    }
  }

  return error;
};
