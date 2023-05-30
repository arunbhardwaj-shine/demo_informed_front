

export const Validation  = (data) =>{
    let error = {}
    if(!data?.oldPassword){
        error.oldPassword = "Old Password is required"
    }
    if(!data?.newPassword){
        error.newPassword = "New Password is required"
    }

    if(!data?.confirmPassword){
        error.confirmPassword = "Confirm Password is required"
    }else if(data?.confirmPassword !=data?.newPassword){
        error.confirmPassword = "New password and Confirm Password should be same"
    }

    return error

}
