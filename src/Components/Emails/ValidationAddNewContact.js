export const ValidationAddNewContact=(data,selectedHcp,flag)=>{
    console.log("data-->",data)
    const status=data?.map((data)=>{
        

   
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
        if (data.first_name == "") {
          return "Please enter the first name";
        } else if (data.last_name == "") {
          return "Please enter the last name";
        }
        else if (data.email == "") {
          return "Please enter the email atleast";
        }
        else if (data.email != "") {
            let email = data.email;
            let useremail = email?.trim();
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (regex.test(String(useremail).toLowerCase())) {
              let prev_obj = selectedHcp?.find((x) => x?.email?.toLowerCase() === useremail?.toLowerCase());
              if (typeof prev_obj != "undefined") {
                return "User with same email already added in list.";
              } else {
                return "true";
              }
            } else {
              return "Email format is not valid";
            }
          }
        else if(flag=="addMore"){
            if(data?.optIrt=="yes"){

            if(data?.institutionType==""){
                return "Please select the institution type"; 
            } else if (data?.country == "") {
                return "Please select country";
              }
             else if(data?.siteNumber==""){
                return "Please enter the site number";
              }else if(data?.siteName==""){
                return "Please enter the site name";
              }
            }else if(data?.optIrt=="no"){
                if(data?.institutionType==""){
                    return "Please select the institution type"; 
                }
               else if (data?.country == "") {
                    return "Please select country";
                  }
             }
        }
        else if (flag=="save"){
             if(data?.siteIrt==1){
                if (data?.institution_type == "") {
                 return "Please select the institution type";
               }
               else if (data?.country == "") {
                 return "Please select country";
               }
              else if(data?.siteNumber==""){
                 return "Please enter the site number";
               }else if(data?.siteName==""){
                 return "Please enter the site name";
               }
             }else if(data?.siteIrt==0){
                if(data?.institution_type==""){
                    return "Please select the institution type"; 
                }
                else if(data?.country == "") {
                    return "Please select country";
                  }
             }
        }
        return "true";
       
      }
     else{
        if (data.email == "") {
            return "Please enter the email atleast";
          } else if (data?.institution_type == "") {
            return "Please select the institution type";
          }
          if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" || localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
            if (data?.country == "") {
              return "Please select country";
            }
          }
          if (data.email != "") {
            let email = data.email;
            let useremail = email?.trim();
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (regex.test(String(useremail).toLowerCase())) {
              let prev_obj = selectedHcp?.find((x) => x?.email === useremail);
              if (typeof prev_obj != "undefined") {
                return "User with same email already added in list.";
              } else {
                return "true";
              }
            } else {
              return "Email format is not valid";
            }
          }
          return "true";
     } 
   
    
      
    })
    return status
}