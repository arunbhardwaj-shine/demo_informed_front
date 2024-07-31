export const AddReaderValidation = (data, groupId, flag) => {
  let error = {};

  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!data?.firstName) {
    error.firstName = "First name required";
  }
 
  // if (groupId == 2 || (groupId == 3 && flag == 0)) {
  //   if (!data?.primary_phone?.toString()) {
  //     error.primary_phone = "Phone number required with country code";
  //   }
  //   if (!data?.countryCode?.toString()) {
  //     error.primary_phone = "Phone number required with country code";
  //   }
  // }
  if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="||localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
    if (!data?.lastName) {
      error.lastName = "Last name required";
    }
    
  }
  if (!data?.email || regemail?.test(data?.email) === false) {
    error.email = "Email required with email pattern";
  }
  if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="||localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
    if (!data?.institution) {
      error.institution = "Please select institution";
    }

    if(!data?.siteNumber){
      error.siteNumber = "Please select site number";
    }
      if(!data?.siteName){
        error.siteName = "Please select site name";
      }
  }
  if (data?.country == "") {
    error.country = "Please select country";
  }
  if (!data?.country) {
    error.country = "Please select country";
  }
  if (localStorage.getItem("user_id") == "90VIqoM675WT4/peSRnbSQ==") {
    if (data?.primary_phone) {
      // if (
      //   Object.keys(data?.primary_phone)?.length > 20 ||
      //   Object.keys(data?.primary_phone)?.length < 10
      // ) {
      //   error.primary_phone = "Number must be in between 10 to 20 digits";
      // } else
       if (!data?.countryCode) {
        error.primary_phone = "Please select country code";
       }
    }
    if (data?.countryCode) {
      if (!data?.primary_phone) {
        error.primary_phone = "Please enter phone number";
      }
      //  else if (
      //   data?.primary_phone &&
      //   (Object.keys(data?.primary_phone)?.length > 20 ||
      //     Object.keys(data?.primary_phone)?.length < 10)
      // ) {
      //   error.primary_phone = "Number must be in between 10 to 20 digits";
      // }
    }
    // if (
    //   data?.alternativePhone &&
    //   (Object.keys(data?.alternativePhone)?.length > 20 ||
    //     Object.keys(data?.alternativePhone)?.length < 10)
    // ) {
    //   error.alternativePhone = "Number must be in between 10 to 20 digits";
    // }

    if (!data?.country?.value) {
      error.country = "Please select country";
    }
    if (
      data?.alternativeEmail &&
      regemail?.test(data?.alternativeEmail) === false
    ) {
      error.alternativeEmail = "Alternative email required with email pattern";
    }
    if (
      data?.address?.postcode?.length &&
      data?.address?.postcode?.length > 12
    ) {
      error.postcode = "Please enter valid postcode";
    }

    if (data?.contactTotal > 500 || data?.contactTotal < 0) {
      error.contactTotal = "Contact total must be in between 0 to 500";
    }
  }

  return error;
};
