export const LibraryEditValidation = (data) => {
  let error = {};

  if (!data?.contentTitle) {
    error.contentTitle = "Content Title is required!";
  }

  if (!data?.limit) {
    error.limit = "Limit is required";
  } else if (data?.limit) {
    if (data?.limit < 1) {
      error.limit = "Limit must be greater than 0";
    }
  }

  return error;
};
