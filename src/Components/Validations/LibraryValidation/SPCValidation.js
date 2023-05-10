export const SPCValidation = (data) => {
  let err = {};
  if (!data?.title?.trim()) {
    err.title = "Please enter title";
  }
  if (!data?.country) {
    err.country = "Please select country";
  }
  if (!data?.language) {
    err.language = "Please select language";
  }
  if (!data?.businessunit) {
    err.businessunit = "Please select businessunit";
  }
  if (!data?.product) {
    err.product = "Please select product";
  }
  if (data?.product) {
    if (data?.product?.length == 0) {
      err.product = "Please select product";
    }
  }
  if (!data?.uploadspc) {
    err.uploadspc = "Please select uploadspc";
  }
  return err;
};
