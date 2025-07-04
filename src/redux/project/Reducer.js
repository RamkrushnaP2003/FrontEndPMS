import {
  ACCEPT_INVITATION_REQUEST,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  EDIT_PROJECT_REQUEST,
  EDIT_PROJECT_SUCCESS,
  FETCH_PROJECT_BY_ID_REQUEST,
  FETCH_PROJECT_BY_ID_SUCCESS,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  INVITE_TO_PROJECT_REQUEST,
  SEARCH_PROJECT_SUCCESS,
  SOFT_DELETE_PROJECT_SUCCESS,
} from "./ActionTypes";

const initialState = {
  projects: [],
  loading: false,
  error: null,
  projectDetails: null,
  searchProjects: [],
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_REQUEST:
    case CREATE_PROJECT_REQUEST:
    case DELETE_PROJECT_REQUEST:
    case FETCH_PROJECT_BY_ID_REQUEST:
    case ACCEPT_INVITATION_REQUEST:
    case INVITE_TO_PROJECT_REQUEST:
    case EDIT_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.projects || [],
        error: null,
      };

    case EDIT_PROJECT_SUCCESS:
      console.log(action);
      return {
        ...state,
        projectDetails: action.updateProject,
        loading: false,
        error: null,
      };

    case SEARCH_PROJECT_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        searchProjects: action.projects,
        error: null,
      };

    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: [...state.projects, action.projects],
        error: null,
      };

    case FETCH_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        projectDetails: action.project,
        error: null,
      };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
        error: null,
      };

    case SOFT_DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.map((project) =>
          project.id === action.payload.id
            ? { ...project, status: action.payload.status }
            : project
        ),
        error: null,
      };

    default:
      return state;
  }
};
