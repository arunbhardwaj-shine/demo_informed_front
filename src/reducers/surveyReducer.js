import {
  ADD_ELEMENT,
  UPDATE_ELEMENT,
  COPY_ELEMENT,
  SET_CURRENT_ELEMENT_INDEX,
  TOGGLE_EDIT_MODE,
  TOGGLE_ADD_CLICKED,
  DELETE_ELEMENT,
  SORT_OPTIONS,
  ADD_OPTION,
  SWAP_ELEMENTS,
  ADD_EXTRA_AND_STYLE,
  UPDATE_SURVEY_ID,
  UPDATE_CONSENT,
  ADD_RES_QUESTION,
  EMPTY_REDUX_STATES,
  UPDATE_EDIT_DISABLE,
  UPDATE_CURRENT_ELEMENT_INDEX,
} from "../actions/surveyActions";
import { menuType } from "./menuType";

const initialState = {
  elements: [],
  currentElementIndex: null,
  isEditModeOn: false,
  isAddClicked: false,
  globalIndex: 1,
  survey_id: null,
  disableEdit: false,
};

const emptySurveyReduxStates = (state, action) => {
  return {
    ...state,
    elements: [],
    currentElementIndex: null,
    isEditModeOn: false,
    isAddClicked: false,
    globalIndex: 1,
    survey_id: null,
  };
};

const updateEditDisable = (state, action) => {
  return {
    ...state,
    disableEdit: action.payload,
  };
};

const addResQuestions = (state, action) => {
  const {elements,currentIndex} = action.payload;
  let count = 1;
  const newUpdatedElements = elements.map((item) => {
    return { ...item, questionNo: count++ };
  });
  return {
    ...state,
    elements: newUpdatedElements,
    globalIndex: elements?.length + 1,
    currentElementIndex: currentIndex != null && currentIndex != undefined ? currentIndex:null,
    isEditModeOn:currentIndex != null && currentIndex != undefined ? true : false,
  };
};

 

const addElement = (state, action) => {
  // Deep clone the element from menuType based on the action payload
  const newElement = structuredClone({ ...menuType[action.payload.type] });
  newElement.questionNo = state.globalIndex;
  newElement.survey_id = state.surveyId;

  // Clone the elements array to avoid direct modification of state
  const updatedElements = [...state.elements];
 
  // Insert the copied element at the specified index if provided
  if (action.payload.index !== undefined) {
    updatedElements.splice(action.payload.index, 0, newElement);
  } else {
    // If no index is provided, add the newElement at the end of the array
    updatedElements.push(newElement);
  }

  for (var i = 0; i < updatedElements.length; i++) {
    updatedElements[i].questionNo = i + 1;
  }

  // Return the updated state
  return {
    ...state,
    elements: updatedElements,
    currentElementIndex:
      action.payload.index !== undefined
        ? action.payload.index
        : state.elements.length,
    globalIndex: state.globalIndex + 1,
    isAddClicked: false,
    isEditModeOn: true,
  };
};


const setExtraAndStyling = (state, action) => {
  const { outerkey, innerKey, value, index } = action.payload;
  const updateElements = [...state.elements];
  updateElements[index] = {
    ...updateElements[index],
    [outerkey]: {
      ...updateElements[index][outerkey],
      [innerKey]: value,
    },
  };

  return {
    ...state,
    elements: updateElements,
  };
};

const updateElement = (state, action) => {
  const { key, value, index } = action.payload;
  const updatedElements = [...state.elements];
  updatedElements[index] = {
    ...updatedElements[index],
    [key]: value,
  };
  return {
    ...state,
    elements: updatedElements,
  };
};

const updateConsent = (state, action) => {
  const { value, index } = action.payload;
  const updatedElements = [...state.elements];
  const questionNo = updatedElements[index].questionNo;
  const survey_id = updatedElements[index].survey_id;
  const questionId = updatedElements[index].questionId;

  updatedElements[index] = {
    ...value,
    questionNo: questionNo,
    survey_id: survey_id,
    questionId: questionId,
  };
  return {
    ...state,
    elements: updatedElements,
  };
};

const copyElement = (state, action) => {
  // Copy the element to be duplicated
  const copiedElement = structuredClone({
    ...state.elements[action.payload.index],
  });
  copiedElement.questionId = 0;

  // Check if the element has answers and the type is not "matrix"
  if (
    copiedElement.answer.length > 0 &&
    copiedElement.type !== "matrix" &&
    copiedElement.accordionType === "questionTypes"
  ) {
    copiedElement.answer.forEach((option) => {
      option.answerId = 0;
    });
  }
  // Check if the element is of type "matrix"
  else if (copiedElement.answer.length > 0 && copiedElement.type === "matrix") {
    copiedElement.answer.forEach((row) => {
      row.id = 0;
      row.answer.forEach((column) => {
        column.answerId = 0;
      });
    });
  }

  // Clone the elements array to avoid direct modification of state
  const updatedElements = [...state.elements];
  // Insert the copied element at the specified index
  updatedElements.splice(action.payload.index + 1, 0, copiedElement);

  for (var i = 0; i < updatedElements.length; i++) {
    updatedElements[i].questionNo = i + 1;
  }

  return {
    ...state,
    elements: updatedElements,
    currentElementIndex: action.payload.index + 1,
    globalIndex: state.globalIndex + 1,
    isAddClicked: false,
  };
};

const swapElements = (state, action) => {
  const { draggedElementIndex, destinationIndex } = action.payload;
  const swappedElements = [...state.elements];

  const draggedItem = swappedElements.splice(draggedElementIndex, 1);

  swappedElements.splice(destinationIndex, 0, draggedItem[0]);

  let count = 1;
  const newUpdatedElements = swappedElements.map((item) => {
    return { ...item, questionNo: count++ };
  });

  return {
    ...state,
    elements: newUpdatedElements,
    currentElementIndex: destinationIndex,
    isEditModeOn: true,
  };
};

const addOption = (state, action) => {
  const { index: addOptionIndex, key: addOptionKey } = action.payload;
  const updatedElementsWithOption = state.elements.map((element, idx) => {
    if (idx === addOptionIndex) {
      return {
        ...element,
        [addOptionKey]: [...element[addOptionKey], ""],
      };
    }
    return element;
  });
  return {
    ...state,
    elements: updatedElementsWithOption,
  };
};

const deleteElement = (state, action) => {
  const updatedElements = state.elements.filter(
    (_, index) => index !== action.payload
  );
  let count = 1;
  const newUpdatedElements = updatedElements.map((item) => {
    return { ...item, questionNo: count++ };
  });
  return {
    ...state,
    elements: newUpdatedElements,
    currentElementIndex: -1,
    isEditModeOn: false,
    isAddClicked: false,
    globalIndex: count,
  };
};

const sortOptions = (state, action) => {
  if (state.elements[action.payload.index].type == "dropdown") {
    return {
      ...state,
      elements: state.elements.map((element, index) => {
        if (index === action.payload.index) {
          const sortedOptions = [...element.answer[0].value].sort((a, b) => {
            return action.payload.order === "asc"
              ? a.localeCompare(b)
              : b.localeCompare(a);
          });
          return {
            ...element,
            answer: [{ ...element.answer, value: sortedOptions }],
          };
        }
        return element;
      }),
    };
  }
  return {
    ...state,
    elements: state.elements.map((element, index) => {
      if (index === action.payload.index) {
        const sortedOptions = [...element.answer].sort((a, b) => {
          return action.payload.order === "asc"
            ? a.value.localeCompare(b.value)
            : b.value.localeCompare(a.value);
        });
        return { ...element, answer: sortedOptions };
      }
      return element;
    }),
  };
};

export const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ELEMENT:
      return addElement(state, action);
    case UPDATE_ELEMENT:
      return updateElement(state, action);
    case UPDATE_CONSENT:
      return updateConsent(state, action);
    case COPY_ELEMENT:
      return copyElement(state, action);
    case SET_CURRENT_ELEMENT_INDEX:
      return {
        ...state,
        currentElementIndex: action.payload,
        isEditModeOn: true,
      };
    case TOGGLE_EDIT_MODE:
      return {
        ...state,
        isEditModeOn: !state.isEditModeOn,
        isAddClicked: false,
        currentElementIndex: -1,
      };
    case TOGGLE_ADD_CLICKED:
      return {
        ...state,
        isAddClicked: !state.isAddClicked,
      };
    case SWAP_ELEMENTS:
      return swapElements(state, action);
    case DELETE_ELEMENT:
      return deleteElement(state, action);
    case ADD_OPTION:
      return addOption(state, action);
    case SORT_OPTIONS:
      return sortOptions(state, action);
    case ADD_EXTRA_AND_STYLE:
      return setExtraAndStyling(state, action);
    case UPDATE_SURVEY_ID:
      return {
        ...state,
        surveyId: action.payload,
      };
    case ADD_RES_QUESTION:
      return addResQuestions(state, action);
    case EMPTY_REDUX_STATES:
      return emptySurveyReduxStates(state, action);
    case UPDATE_EDIT_DISABLE:
      return updateEditDisable(state, action);
    case UPDATE_CURRENT_ELEMENT_INDEX:
      return {
        ...state,
        currentElementIndex: null,
        isEditModeOn: false,
        isAddClicked: false,
        disableEdit: false,
      };
    default:
      return state;
  }
};
