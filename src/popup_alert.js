const popup_alert = (data) => {
  if (data.visible === "show") {
    var element = document.getElementById("resend-confirm");
    element.classList.add("custom_model_show");
    var element_message = document.getElementById("message_change");
    element_message.innerHTML = data.message;
    if (data.type === "success") {
      document.getElementById("img-replaced").src =
        "componentAssets/images/success.svg";
    } else {
      document.getElementById("img-replaced").src =
        "componentAssets/images/alert.png";
    }
    console.log(data.redirect);
    if (
      data.redirect != "" &&
      data.redirect != "undefined" &&
      typeof data.redirect !== "undefined"
    ) {
      alert("in");
      document
        .getElementById("modeltoreplace")
        .setAttribute("redirecto", data.redirect);
    } else {
      document.getElementById("modeltoreplace").removeAttribute("redirecto");
    }
  }
};

export { popup_alert };
