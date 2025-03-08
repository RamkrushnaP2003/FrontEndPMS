import api from "@/config/api";
import * as actionTypes from "./ActionTypes";

export const createChatbot = (messageData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CHATBOT_CREATE_REQUEST });
    try {
      const response = await api.post("/api/chatbot", messageData);
      dispatch({
        type: actionTypes.CHATBOT_CREATE_SUCCESS,
        chatbot: response.data,
      });
    } catch (error) {
      console.log("err in chatbot : ", error.message);
      dispatch({
        type: actionTypes.CHATBOT_CREATE_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchChatbotByProjectId = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_CHATBOT_BY_PROJECT_ID_REQUEST });
    try {
      const response = await api.get(`/api/chatbot/${projectId}`);
      dispatch({
        type: actionTypes.FETCH_CHATBOT_BY_PROJECT_ID_SUCCESS,
        chatbot: response.data,
      });
    } catch (error) {
      console.log("err in chatbot : ", error);
      dispatch({
        type: actionTypes.FETCH_CHATBOT_BY_PROJECT_ID_FAILURE,
        error: error.message,
      });
    }
  };
};
