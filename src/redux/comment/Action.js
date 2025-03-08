import api from "@/config/api";
import * as actionTypes from "./ActionTypes";

export const createComment = (commentData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_COMMENT_REQUEST });
    try {
      const response = await api.post("/api/comments", commentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      dispatch({
        type: actionTypes.CREATE_COMMENT_SUCCESS,
        comment: response.data,
      });
    } catch (error) {
      console.log("createComment : ", error.message);
      dispatch({
        type: actionTypes.CREATE_COMMENT_FAILURE,
        error: error.message,
      });
    }
  };
};

export const deleteComment = (commentId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_COMMENT_REQUEST });
    try {
      await api.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      dispatch({
        type: actionTypes.DELETE_COMMENT_SUCCESS,
        commentId,
      });
    } catch (error) {
      console.log("deleteComment : ", error.message);
      dispatch({
        type: actionTypes.DELETE_COMMENT_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchComments = (issueId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_COMMENTS_REQUEST });
    try {
      const reponse = await api.get(`/api/comments/${issueId}`);
      dispatch({
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        comments: reponse.data,
      });
    } catch (error) {
      console.log("fetchComments : ", error.message);
      dispatch({
        type: actionTypes.FETCH_COMMENTS_FAILURE,
        error: error.message,
      });
    }
  };
};
