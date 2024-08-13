export const ADD_ELEMENT = "ADD_ELEMENT";
export const ADD_OPTION = "ADD_OPTION";
export const COPY_ELEMENT = "COPY_ELEMENT";
export const UPDATE_ELEMENT = "UPDATE_ELEMENT";
export const UPDATE_CONSENT = "UPDATE_CONSENT";
export const SWAP_ELEMENTS = "SWAP_ELEMENTS";
export const SET_CURRENT_ELEMENT_INDEX = "SET_CURRENT_ELEMENT_INDEX";
export const TOGGLE_EDIT_MODE = "TOGGLE_EDIT_MODE";
export const TOGGLE_ADD_CLICKED = "TOGGLE_ADD_CLICKED";
export const DELETE_ELEMENT = "DELETE_ELEMENT";
export const SORT_OPTIONS = "SORT_OPTIONS";
export const ADD_EXTRA_AND_STYLE = "ADD_STYLE";
export const UPDATE_SURVEY_ID = "UPDATE_SURVEY_ID";
export const ADD_RES_QUESTION = "ADD_RES_QUESTION";
export const EMPTY_REDUX_STATES = "EMPTY_REDUX_STATES";
export const UPDATE_EDIT_DISABLE = "UPDATE_EDIT_DISABLE";
export const ADD_AT_POSITION = "ADD_AT_POSITION";

export const addElement = (type) => ({
  type: ADD_ELEMENT,
  payload: { type },
});

export const updateSurveyId = (surveyId) => ({
  type: UPDATE_SURVEY_ID,
  payload: surveyId,
});

export const setExtraAndStyling = (index, value, innerKey, outerkey) => ({
  type: ADD_EXTRA_AND_STYLE,
  payload: { index, value, innerKey, outerkey },
});

export const updateElement = (index, value, key) => ({
  type: UPDATE_ELEMENT,
  payload: { index, value, key },
});
export const updateConsent = (index, value) => ({
  type: UPDATE_CONSENT,
  payload: { index, value },
});

export const copyElement = (index) => ({
  type: COPY_ELEMENT,
  payload: { index },
});

export const swapElements = (draggedElementIndex, destinationIndex) => ({
  type: SWAP_ELEMENTS,
  payload: { draggedElementIndex, destinationIndex },
});

export const setCurrentElementIndex = (index) => ({
  type: SET_CURRENT_ELEMENT_INDEX,
  payload: index,
});

export const toggleEditMode = () => ({
  type: TOGGLE_EDIT_MODE,
});

export const toggleAddClicked = () => ({
  type: TOGGLE_ADD_CLICKED,
});

export const deleteElement = (index) => ({
  type: DELETE_ELEMENT,
  payload: index,
});

export const sortOptions = (index, order) => ({
  type: SORT_OPTIONS,
  payload: { index, order },
});

export const addOption = (index, key) => ({
  type: ADD_OPTION,
  payload: { index, key },
});

export const addResQuestions = (elements) => ({
  type: ADD_RES_QUESTION,
  payload: elements,
});

export const emptySurveyReduxStates = (elements) => ({
  type: EMPTY_REDUX_STATES,
  payload: elements,
});

export const updateEditDisable = (value) => ({
  type: UPDATE_EDIT_DISABLE,
  payload: value,
});

export const addElementAtPosition = (index) => ({
  type: ADD_AT_POSITION,
  payload: index,
});
