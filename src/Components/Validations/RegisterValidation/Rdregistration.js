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

    if (!data?.institution) {
      error.institution = "Please Select institution";
    }

    if(data?.institution == "site_name"){
      if (!data?.country) {
        error.country = "Please Select country";
      }
    }

    if(data?.institution == "site_name") {
        if (!data?.sitenumber) {
          error.sitenumber = "Please Select site number";
        }
        if (!data?.sitename) {
          error.sitename = "Please Select site name";
        }
        if (!data?.sitecity) {
          error.sitecity = "Please Select site city";
        }
    }



    return error;
}
