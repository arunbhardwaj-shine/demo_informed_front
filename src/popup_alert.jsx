let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
const popup_alert = (data) => {
  const success = `${path_image}success.png`; 
  const alert = `${path_image}success.png`; 
  if (data.visible === "show") {
    var element = document.getElementById("resend-confirm");
    element.classList.add("custom_model_show");
    var element_message = document.getElementById("message_change");
    element_message.innerHTML = data.message;
    if (data.type === "success") {
      document.getElementById("img-replaced").src = success
        // "../../componentAssets/images/success.png";
    } else {
      document.getElementById("img-replaced").src =alert  
      // "../componentAssets/images/alert.png"
        // "./componentAssets/images/alert.png";
    }
   
    if (
      data.redirect != "" &&
      data.redirect != "undefined" &&
      typeof data.redirect !== "undefined"
    ) {
      document
        .getElementById("modeltoreplace")
        .setAttribute("redirecto", data.redirect);
    } else {
      document.getElementById("modeltoreplace").removeAttribute("redirecto");
    }
  }
};

export { popup_alert };
