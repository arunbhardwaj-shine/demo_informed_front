export const SurveyFormValidations = (data) => {
    console.log("data-->", data)
    let error = {}
    if (!data?.location) {
        error.city = "This field is required"
        error.state = "This field is required"
    } else if (data?.location) {
        if (!data?.location?.city) {
            error.city = "This field is required"
        }
        if (!data?.location?.state) {
            error.state = "This field is required"
        }
    }
    // if (!data?.provider) {
    //     error.provider = "This field is required"
    // }

    if (!data?.haematologist) {
        error.haematologist = "This field is required"
    }

    if (!data?.practice_location) {
        error.practice_location = "This field is required"
    }
    if (!data?.rate_different_reasons) {
        error.rate_different_reasons = "This field is required"
    }
    else if (data?.rate_different_reasons) {
        if (!data?.rate_different_reasons?.to_confirm_diagnosis || 
            !data?.rate_different_reasons?.to_make_diagnosis ||
            !data?.rate_different_reasons?.patient_inhibitor_development_risk ||
            !data?.rate_different_reasons?.guide_treatment_choice || 
            !data?.rate_different_reasons?.genotype_not_available ||
            !data?.rate_different_reasons?.no_insurance_reimbursement || 
            !data?.rate_different_reasons?.family_members ||
            !data?.rate_different_reasons?.family_request ||
            !data?.rate_different_reasons?.pre_conception ||
            !data?.rate_different_reasons?.prohibitive ) {
            error.rate_different_reasons = "This field is required"
        }
    }
    if (!data?.patients_with_severe_hemophilia_A) {
        error.not_recieved_FVIII_infusion = "This field is required"
        error.recieved_FVIII_infusion = "This field is required"
    } else if (data?.patients_with_severe_hemophilia_A) {
        if (!data?.patients_with_severe_hemophilia_A?.not_recieved_FVIII_infusion) {
            error.not_recieved_FVIII_infusion = "This field is required"
        }
        if (!data?.patients_with_severe_hemophilia_A?.recieved_FVIII_infusion) {
            error.recieved_FVIII_infusion = "This field is required"
        }
    }
    if(!data?.patients_with_non_severe_hemophilia_A){
        error.patients_with_non_severe_hemophilia_A="This field is required"
    }

    if(!data?.known_carrier_with_hemophilia_A){
        error.symptomatic="This field is required"
        error.asymptomatic="This field is required"
    }else if(data?.known_carrier_with_hemophilia_A){
        if(!data?.known_carrier_with_hemophilia_A?.symptomatic){
            error.symptomatic="This field is required"
        }
        if(!data?.known_carrier_with_hemophilia_A?.asymptomatic){
            error.asymptomatic="This field is required"
        }
    }

    if(!data?.patient_with_FVIII_inhibitors){
        error.patient_with_FVIII_inhibitors="This field is required"
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
            error.genotype_information_impacted_rate="This field is required"
        }
        if(!data?.satisfied_with_8check_service){
            error.satisfied_with_8check_service="This field is required"
            error.recommend_colleague="This field is required"
        }else if(data?.satisfied_with_8check_service){
            if(!data?.satisfied_with_8check_service?.satisfied_with_8check_service){
                error.satisfied_with_8check_service="This field is required" 
            }
            if(!data?.satisfied_with_8check_service?.recommend_colleague){
                error.recommend_colleague="This field is required" 
            }
        }

        // if(!data?.suggestion){
        //     error.suggestion="This field is required"
        // }
        if(!data?.interested_in_8check_activities){
            error.interested_in_8check_activities="This field is required"
        }


    return error
}