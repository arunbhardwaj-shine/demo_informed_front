export const HomeValidation = (data, status= 0) => {
  let error = {};
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const phoneRegex =
    /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  if (!data?.name) {
    error.name = "Please enter the name";
  }
  if (!data?.email) {
    error.email = "Please enter the email";
  }
  if (data?.email) {
    if (!emailRegex.test(data?.email)) {
      error.email = "Please enter the valid email address";
    }
  }
  if (!data?.phone && status == 0) {
    error.phone = "Please enter the phone number";
  } else if (data?.phone) {
    if (!phoneRegex.test(data?.phone)) {
      error.phone = "Please enter valid phone number";
    }
  }

  if (!data?.company && status == 0) {
    error.company = "Please enter company name";
  }
  if (data.hasOwnProperty("country")) {
    if (!data?.country) {
      error.country = "Please select country";
    }
  }

  return error;
};
