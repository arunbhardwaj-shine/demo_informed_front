const modelValidation = (data) => {
  let error = {};

  if (Object.keys(data)?.length) {
    Object.keys(data)?.forEach((item) => {
      if (item != 'index' && !data[item]) {
        error[item] = `${
          item.charAt(0).toUpperCase() + item.slice(1)
        } is required`;
      }

      if(data[item] != "" && item == "user_email"){
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!data[item].match(validRegex)) {
          error[item] = `Email format is invalid.`;
        }
      }
    });
  }
  return error;
};

export default modelValidation;
