import api from "@/config/api";
import * as actionTypes from "./ActionTypes";

export const fetchIssues = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ISSUES_REQUEST });
    try {
      const response = await api.get(`/api/issues/project/${id}`);
      dispatch({
        type: actionTypes.FETCH_ISSUES_SUCCESS,
        issues: response.data,
      });
    } catch (error) {
      console.log("err in issue : ", error.message);
      dispatch({
        type: actionTypes.FETCH_ISSUES_FAILURE,
        error: error.message,
      });
    }
  };
};

export const createIssue = (data) => {
  return async (dispatch) => {
    // ✅ Fix: Removed incorrect destructuring
    dispatch({ type: actionTypes.CREATE_ISSUE_REQUEST });

    try {
      const response = await api.post(
        "/api/issues",
        data, // ✅ Send `data` directly instead of nesting inside `issueRequest`
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // ✅ Fix: Ensure JWT is correct
            "Content-Type": "application/json", // ✅ Ensure correct content type
          },
        }
      );

      dispatch({
        type: actionTypes.CREATE_ISSUE_SUCCESS,
        issue: response.data, // ✅ Handle success
      });
    } catch (error) {
      console.error("Error while creating issue:", error); // ✅ More helpful logging
      dispatch({
        type: actionTypes.CREATE_ISSUE_FAILURE,
        error: error.response?.data?.message || error.message, // ✅ Show actual server error
      });
    }
  };
};

export const fetchIssueById = (issueId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_REQUEST });
    try {
      const response = await api.get(`/api/issues/${issueId}`);
      dispatch({
        type: actionTypes.FETCH_ISSUES_BY_ID_SUCCESS,
        issue: response.data,
      });
    } catch (error) {
      console.log("err in issue : ", error.message);
      dispatch({
        type: actionTypes.FETCH_ISSUES_BY_ID_FAILURE,
        error: error.message,
      });
    }
  };
};

export const updateIssueStatus = (id, status) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST });
    try {
      const response = await api.put(`/api/issues/${id}/status/${status}`);
      dispatch({
        type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,
        issue: response.data,
      });
    } catch (error) {
      console.log("err in issue update : ", error.message);
      dispatch({
        type: actionTypes.UPDATE_ISSUE_STATUS_FAILURE,
        error: error.message,
      });
    }
  };
};

export const assignedUserToIssue = (issueId, userId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST });
    try {
      const response = await api.put(
        `/api/issues/${issueId}/assignee/${userId}`
      );
      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
        issue: response.data,
      });
    } catch (error) {
      console.log("err in issue assignedUserToIssue : ", error.message);
      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,
        error: error.message,
      });
    }
  };
};

export const deleteIssue = (issueId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ISSUE_REQUEST });

    try {
      const response = await api.delete(`/api/issues/${issueId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Ensure JWT is prefixed with 'Bearer'
        },
      });

      dispatch({
        type: actionTypes.DELETE_ISSUE_SUCCESS,
        issueId,
      });
    } catch (error) {
      console.log("Error deleting issue:", error.message);
      dispatch({
        type: actionTypes.DELETE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};
