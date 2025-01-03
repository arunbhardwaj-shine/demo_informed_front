export const STEP_TRACKER = "STEP_TRACKER";
export const SET_DEFAULT_CURRENT_STEP="SET_DEFAULT_CURRENT_STEP"


export const  updateCurrentStep= (currentStep) => ({
    type: STEP_TRACKER,
    payload: currentStep,
  });

export const setDefaultCurrentStep=()=>({
  type:SET_DEFAULT_CURRENT_STEP,
  payload:""
})