const AddQuestionValidation = (formData, formLabel) => {
  let error = {};
  if (!formData?.inputType) {
    error.inputType = "Please select the input type";
  }
  if (
    (formData?.inputType == "checkbox" ||
      formData?.inputType == "radio" ||
      formData?.inputType == "selection") &&
    !formData?.option?.length
  ) {
    error.option = "Please add options";
  }
  if (formData?.label == "") {
    error.label = "Please enter label";
  } else if (
    formLabel?.find(
      (item, index) =>
        item?.label?.toLowerCase() == formData?.label?.toLowerCase()
    )
  ) {
    error.label = "Label already exist";
  }
  if (formData?.option?.length) {
    let index = formData?.option?.findIndex(
      (data, index) => data?.optionLabel == ""
    );
    if (index > -1) {
      error.option = "Options can't be empty";
      error.index = index;
    }
  }
  return error;
};
export default AddQuestionValidation;
