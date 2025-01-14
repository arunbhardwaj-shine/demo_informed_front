import { STEP_TRACKER ,SET_DEFAULT_CURRENT_STEP} from "../actions/surveyStepAction";

const initialState = {
  currentStep: 1,
};

const setCurrentStep = (state, action) => {
   

  if (action.payload > state.currentStep) {
    return {
      ...state,
      currentStep: action.payload,
    };
  } else {
    return {
      ...state,
    };
  }
};

const setDefaultCurrentStep=(state,paylaod)=>{
   
    return {
        ...state,
        currentStep: 1
    }
}

export const surveyStepReducer = (state = initialState, action) => {
  switch (action.type) {
    case STEP_TRACKER:
      return setCurrentStep(state, action);
    case SET_DEFAULT_CURRENT_STEP:
        return setDefaultCurrentStep(state,action)
    default:
      return state;
  }
};
