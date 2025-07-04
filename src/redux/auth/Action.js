import { API_BASE_URL } from "@/config/api";
import {
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionTypes";
import axios from "axios";

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: REGISTER_SUCCESS, payload: data });
    }
  } catch (e) {
    console.log(e);
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, userData);

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      return { success: true, user: data };
    }
  } catch (e) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: e.response?.data?.message || "Login failed",
    });
    return {
      success: false,
      error: e.response?.data?.message || "Login failed",
    };
  }
};

// export const getUser = () => async (dispatch) => {
//   dispatch({ type: GET_USER_REQUEST });
//   try {
//     const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//       },
//     });
//     dispatch({ type: GET_USER_SUCCESS, payload: data });
//     console.log("get user success", data);
//   } catch (e) {
//     console.log(e);
//   }
// };

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (e) {
    console.error("Error fetching user:", e.response?.data || e.message);

    const errorMessage = e.response?.data?.message || "";

    if (errorMessage.includes("Invalid Token")) {
      localStorage.removeItem("jwt");
      window.location.href = "/auth/login";
    }
    dispatch({ type: GET_USER_FAILURE, payload: e.message });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.clear();
};
