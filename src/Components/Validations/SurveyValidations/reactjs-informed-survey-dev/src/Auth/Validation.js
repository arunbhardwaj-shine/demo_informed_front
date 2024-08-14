export const Validation = (data) => {
  let error = {};
  if (!data?.oldPassword) {
    error.oldPassword = "Old password is required";
  }
  if (!data?.newPassword) {
    error.newPassword = "New password is required";
  }

  if (!data?.confirmPassword) {
    error.confirmPassword = "Confirm password is required";
  } else if (data?.confirmPassword != data?.newPassword) {
    error.confirmPassword = "New password and confirm password should be same";
  }

  return error;
};
