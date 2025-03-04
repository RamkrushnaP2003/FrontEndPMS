import api from "@/config/api";
import {
  ACCEPT_INVITATION_REQUEST,
  ACCEPT_INVITATION_SUCCESS,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECT_BY_ID_REQUEST,
  FETCH_PROJECT_BY_ID_SUCCESS,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  INVITE_TO_PROJECT_REQUEST,
  INVITE_TO_PROJECT_SUCCESS,
  SEARCH_PROJECT_REQUEST,
  SEARCH_PROJECT_SUCCESS,
} from "./ActionTypes";

export const fetchProjects =
  ({ category, tag }) =>
  async (dispatch) => {
    dispatch({ type: FETCH_PROJECT_REQUEST });
    try {
      const { data } = await api.get("/api/projects", {
        params: { category, tag },
      });
      console.logg("ALl project", data);
      dispatch({ type: FETCH_PROJECT_SUCCESS, projects: data });
    } catch (error) {
      console.log(error);
    }
  };

export const searchProjects = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_PROJECT_REQUEST });
  try {
    const { data } = await api.get("/api/projects/search?keyword=" + keyword);
    console.logg("search project", data);
    dispatch({ type: SEARCH_PROJECT_SUCCESS, projects: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProjects = (projectData) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    const { data } = await api.post("/api/projects", projectData);
    console.logg("create project", data);
    dispatch({ type: CREATE_PROJECT_SUCCESS, projects: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchProjectById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
  try {
    const { data } = await api.get("/api/projects" + id);
    console.logg("fetch project by id :" + id + " ====> ", data);
    dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, projects: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject =
  ({ id }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_PROJECT_REQUEST });
    try {
      const { data } = await api.delete("/api/projects" + id);
      console.logg("delete project by id :" + id + " ====> ", data);
      dispatch({ type: DELETE_PROJECT_SUCCESS, projectId });
    } catch (error) {
      console.log(error);
    }
  };

export const inviteToProject =
  ({ email, projectId }) =>
  async (dispatch) => {
    dispatch({ type: INVITE_TO_PROJECT_REQUEST });
    try {
      const { data } = await api.post("/api/projects/invite", {
        email,
        projectId,
      });
      console.logg("invite to project by id :" + id + " ====> ", data);
      dispatch({ type: INVITE_TO_PROJECT_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const acceptInvitaion =
  ({ invitationToken, navigate }) =>
  async (dispatch) => {
    dispatch({ type: ACCEPT_INVITATION_REQUEST });
    try {
      const { data } = await api.get("/api/projects/accpet_invitation", {
        params: {
          token: invitationToken,
        },
      });
      navigate("/project" + data.projectId);
      console.logg("accept invitation project by id :" + id + " ====> ", data);
      dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
