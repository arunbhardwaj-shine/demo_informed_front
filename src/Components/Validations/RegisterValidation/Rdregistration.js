export const rdregistration = (data) => {
  let error = {};
  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!data?.name) {
      error.name = "Name is required!";
    }

    if (!data?.email || regemail?.test(data?.email) === false) {
      error.email = "Email required with email pattern";
    }

    if (!data?.country) {
      error.country = "Please Select country";
    }

    if (!data?.sitenumber) {
      error.sitenumber = "Please Select site number";
    }

    return error;
}
