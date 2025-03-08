import api from "@/config/api";
import * as actionTypes from "./ActionType";

export const getUserSubscription = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_SUBSCRIPTION_REQUEST });
    try {
      const response = await api.get(`/api/subscription/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: actionTypes.GET_USER_SUBSCRIPTION_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("err in subscription : ", error.message);
      dispatch({
        type: actionTypes.GET_USER_SUBSCRIPTION_FAILURE,
        error: error.message,
      });
    }
  };
};

export const upgradeSubcription = ({ planType }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPGRADE_SUBSCRIPTION_REQUEST });
    try {
      const response = await api.patch(`/api/subscription/upgrade`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          planType: planType,
        },
      });
      dispatch({
        type: actionTypes.UPGRADE_SUBSCRIPTION_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("err in subscription : ", error.message);
      dispatch({
        type: actionTypes.UPGRADE_SUBSCRIPTION_FAILURE,
        error: error.message,
      });
    }
  };
};
