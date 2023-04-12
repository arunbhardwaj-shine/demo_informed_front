const modelValidation = (data) => {
  let error = {};

  if (Object.keys(data)?.length) {
    Object.keys(data)?.forEach((item) => {
      if (!data[item]) {
        error[item] = `${
          item.charAt(0).toUpperCase() + item.slice(1)
        } is required`;
      }
    });
  }
  return error;
};

export default modelValidation;
