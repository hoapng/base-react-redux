export const FETCH_USER_LOGIN_SUCESS = "FETCH_USER_LOGIN_SUCESS";
export const USER_LOGOUT_SUCESS = "USER_LOGOUT_SUCESS";

export const doLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN_SUCESS,
    payload: data,
  };
};

export const doLogout = (data) => {
  return {
    type: USER_LOGOUT_SUCESS,
  };
};
