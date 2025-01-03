const loader = (data) => {
  if (data == "show") {
    const element = document.getElementById("custom_loader");

    element?.classList?.add("show");
  } else {
    const element = document.getElementById("custom_loader");
    element?.classList?.remove("show");
  }
};

export { loader };
