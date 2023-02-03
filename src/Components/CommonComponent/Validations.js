export const createContent = (data) => {
  let error = {};
  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!data?.company) {
    error.company = "Company is required";
  } else if (!data?.country) {
    error.country = "Country is required";
  } else if (!data?.clientProduct) {
    error.clientProduct = "Client Product is required";
  } else if (!data?.production) {
    error.production = "Production is required";
  } else if (!data.sales) {
    error.sales = "Sales is required";
  }
  // else if (!data?.reseller) {
  //   error.reseller = "Reseller is required";
  // }

  return error;
};
