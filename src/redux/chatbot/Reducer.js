import * as actionTypes from "./ActionTypes";

const initialState = {
  chatbots: [],
  loading: false,
  error: null,
};

export const chatbotReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHATBOT_BY_PROJECT_ID_REQUEST:
    case actionTypes.CHATBOT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.CHATBOT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [...state.chatbots, action.chatbot],
      };

    case actionTypes.FETCH_CHATBOT_BY_PROJECT_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        chatbots: action.chatbot,
      };
    case actionTypes.FETCH_CHATBOT_BY_PROJECT_ID_FAILURE:
    case actionTypes.CHATBOT_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
