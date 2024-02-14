export const SurveyFormValidations = (data) => {
    console.log("data-->", data)
    let error = {}
    if (!data?.location) {
        error.city = "Please enter city"
        error.state = "Please enter state"
    } else if (data?.location) {
        if (!data?.location?.city) {
            error.city = "Please enter city"
        }
        if (!data?.location?.state) {
            error.state = "Please enter state"
        }
    }
    if (!data?.provider) {
        error.provider = "Please enter type of provider"
    }

    if (!data?.haematologist) {
        error.haematologist = "Please select the option"
    }

    if (!data?.practice_location) {
        error.practice_location = "Please select location of practice"
    }
    if (!data?.rate_different_reasons) {
        error.rate_different_reasons = "Please rate all the reasons"
    }
    else if (data?.rate_different_reasons) {
        if (!data?.rate_different_reasons?.to_confirm_diagnosis || 
            !data?.rate_different_reasons?.patient_inhibitor_development_risk ||
            !data?.rate_different_reasons?.guide_treatment_choice || 
            !data?.rate_different_reasons?.genotype_not_available ||
            !data?.rate_different_reasons?.no_insurance_reimbursement || 
            !data?.rate_different_reasons?.family_request) {
            error.rate_different_reasons = "Please rate all the reasons"
        }
    }
    if (!data?.patients_with_severe_hemophilia_A) {
        error.not_recieved_FVIII_infusion = "Please select the option"
        error.recieved_FVIII_infusion = "Please select the option"
    } else if (data?.patients_with_severe_hemophilia_A) {
        if (!data?.patients_with_severe_hemophilia_A?.not_recieved_FVIII_infusion) {
            error.not_recieved_FVIII_infusion = "Please select the option"
        }
        if (!data?.patients_with_severe_hemophilia_A?.recieved_FVIII_infusion) {
            error.recieved_FVIII_infusion = "Please select the option"
        }
    }
    if(!data?.patients_with_non_severe_hemophilia_A){
        error.patients_with_non_severe_hemophilia_A="Please select the option"
    }

    if(!data?.known_carrier_with_hemophilia_A){
        error.symptomatic="Please select the option"
        error.asymptomatic="Please select the option"
    }else if(data?.known_carrier_with_hemophilia_A){
        if(!data?.known_carrier_with_hemophilia_A?.symptomatic){
            error.symptomatic="Please select the option"
        }
        if(!data?.known_carrier_with_hemophilia_A?.asymptomatic){
            error.asymptomatic="Please select the option"
        }
    }

    if(!data?.patient_with_FVIII_inhibitors){
        error.patient_with_FVIII_inhibitors="Please select the option"
    }
    if(!data?.genotype_information_impacted_rate||
        !data?.genotype_information_impacted_rate?.improved_accuracy_diagnosis||
        !data?.genotype_information_impacted_rate?.guided_treatment_choice||
        !data?.genotype_information_impacted_rate?.changed_clinical_management||
        !data?.genotype_information_impacted_rate?.impacted_family_planning||
        !data?.genotype_information_impacted_rate?.informed_testing_of_family_members||
        !data?.genotype_information_impacted_rate?.surgical_management||
        !data?.genotype_information_impacted_rate?.improved_patients_quality_of_life

        ){
            error.genotype_information_impacted_rate="Please rate all the fields"
        }
        if(!data?.satisfied_with_8check_service){
            error.satisfied_with_8check_service="Please select the option"
            error.FVIII_infusion="Please select the option"
        }else if(data?.satisfied_with_8check_service){
            if(!data?.satisfied_with_8check_service?.satisfied_with_8check_service){
                error.satisfied_with_8check_service="Please select the option" 
            }
            if(!data?.satisfied_with_8check_service?.FVIII_infusion){
                error.FVIII_infusion="Please select the option" 
            }
        }

        if(!data?.service_improvement){
            error.service_improvement="Please give suggestions"
        }
        if(!data?.interested_in_8check_activities){
            error.interested_in_8check_activities="Please select option"
        }


    return error
}