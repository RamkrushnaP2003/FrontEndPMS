import api from "@/config/api";
import {
  ACCEPT_INVITATION_REQUEST,
  ACCEPT_INVITATION_SUCCESS,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  EDIT_PROJECT_FAILURE,
  EDIT_PROJECT_REQUEST,
  EDIT_PROJECT_SUCCESS,
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
      dispatch({ type: FETCH_PROJECT_SUCCESS, projects: data });
    } catch (error) {
      console.log(error);
    }
  };

export const searchProjects = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_PROJECT_REQUEST });
  try {
    const { data } = await api.get("/api/projects/search?keyword=" + keyword);
    dispatch({ type: SEARCH_PROJECT_SUCCESS, projects: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProjects = (projectData) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    const { data } = await api.post("/api/projects", projectData);

    dispatch({ type: CREATE_PROJECT_SUCCESS, projects: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchProjectById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
  try {
    const { data } = await api.get("/api/projects/" + id);
    dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, project: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PROJECT_REQUEST });
  try {
    const { data } = await api.delete("/api/projects/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Ensure JWT is prefixed with 'Bearer'
      },
    });

    dispatch({ type: DELETE_PROJECT_SUCCESS, payload: id });
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

      dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const editProjectById = (updatedProjectDetails, projectId) => {
  return async (dispatch) => {
    dispatch({ type: "EDIT_PROJECT_REQUEST" });

    try {
      const { data } = await api.put(
        `/api/projects/${projectId}/update`,
        updatedProjectDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      dispatch({ type: "EDIT_PROJECT_SUCCESS", updateProject: data });
    } catch (err) {
      dispatch({ type: "EDIT_PROJECT_FAILURE", error: err.message });
      console.error(err.message);
    }
  };
};
