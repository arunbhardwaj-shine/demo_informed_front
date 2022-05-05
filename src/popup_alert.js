const popup_alert = (data) => {

  if(data.visible === "show"){
    var element = document.getElementById("resend-confirm");
    element.classList.add("custom_model_show");
    var element_message = document.getElementById("message_change");
    console.log(element_message)
    element_message.innerHTML = data.message;
    if(data.type==="success"){
      document.getElementById("img-replaced").src = "componentAssets/images/success.svg";
    }else{
      document.getElementById("img-replaced").src = "componentAssets/images/alert.png";
    }

  }
};

export { popup_alert };
