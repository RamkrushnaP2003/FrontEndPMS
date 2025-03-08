import api from "@/config/api";
import * as actionTypes from "./ActionType";

export const sendMessage = (messageData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SEND_MESSAGES_REQUEST });
    try {
      const response = await api.post("/api/messages/send", messageData);
      dispatch({
        type: actionTypes.SEND_MESSAGES_SUCCESS,
        message: response.data,
      });
    } catch (error) {
      console.log("err in chat : ", error.message);
      dispatch({
        type: actionTypes.SEND_MESSAGES_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchChatByProject = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_CHAT_BY_PROJECT_REQUEST });
    try {
      const response = await api.get(`/api/messages/chat/${projectId}`);
      dispatch({
        type: actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS,
        message: response.data,
      });
    } catch (error) {
      "err in chat : ", error.message;
      dispatch({
        type: actionTypes.FETCH_CHAT_BY_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchChatMessages = (chatId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_CHAT_MESSAGES_REQUEST });
    try {
      const response = await api.get(`/api/messages/chat/${chatId}`);
      dispatch({
        type: actionTypes.FETCH_CHAT_MESSAGES_SUCCESS,
        chatId,
        message: response.data,
      });
    } catch (error) {
      console.log("err in chat : ", error.message);
      dispatch({
        type: actionTypes.FETCH_CHAT_MESSAGES_FAILURE,
        error: error.message,
      });
    }
  };
};
