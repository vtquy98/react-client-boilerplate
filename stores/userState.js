import { makeFetchAction, ACTIONS } from "redux-api-call";
import { respondToSuccess } from "../middlewares/api-reaction";
import Router from "next/router";
import { saveToken, removeToken } from "../libs/token-interaction";
import nfetch from "../libs/fetchAPI";

export const USER_LOGIN_API = "UserLoginAPI";
export const GET_CURRENT_USER_API = "GetCurrentUserAPI";
export const USER_LOGOUT = "UserLogout";
export const USER_LOGOUT_API = "UserLogoutAPI";

const UserLoginAPI = makeFetchAction(USER_LOGIN_API, ({ username, password }) =>
  nfetch({ endpoint: "/login2", method: "POST" })({ username, password })
);

export const userLogin = (username, password) => {
  return respondToSuccess(
    UserLoginAPI.actionCreator({ username, password }),
    resp => {
      if (resp.errors) {
        console.error("Err:", resp.errors);
        return;
      }
      // saveToken(token here!);
      // Router.push("/admin-dashboard");
      return;
    }
  );
};

const GetCurrentUserAPI = makeFetchAction(
  GET_CURRENT_USER_API,
  nfetch({ endpoint: "/check-authen", method: "GET" })
);

export const getCurrentUser = () =>
  respondToSuccess(GetCurrentUserAPI.actionCreator({}), resp => {
    if (resp.errors) {
      console.error(resp.errors);
      return Router.replace({
        pathname: "/login"
      });
    }
  });

export const getCurrentUserDataSelector = GetCurrentUserAPI.dataSelector;

export const checkLogin = user => (!user ? false : true);

export default {
  connectStatus(state = false, { type, payload }) {
    if (type === ACTIONS.COMPLETE && payload.name === GET_CURRENT_USER_API) {
      return true;
    }
    if (type === ACTIONS.FAILURE && payload.name === GET_CURRENT_USER_API) {
      removeToken();
      Router.push("/login");
      return false;
    }
    // if (type === USER_LOGOUT) {
    //   removeToken();
    //   Router.push("/login");
    //   return false;
    // }
    return state;
  }
};
