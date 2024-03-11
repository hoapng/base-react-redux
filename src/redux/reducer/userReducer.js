import {
  FETCH_USER_LOGIN_SUCESS,
  USER_LOGOUT_SUCESS,
  USER_UPDATE_SUCESS,
} from "../action/userActons";

const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: "",
    email: "",
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCESS:
      // console.log("action", action)
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          username: action?.payload?.DT?.username,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role,
          email: action?.payload?.DT?.email,
        },
        isAuthenticated: true,
      };
    case USER_LOGOUT_SUCESS:
      return {
        ...state,
        account: {
          access_token: "",
          refresh_token: "",
          username: "",
          image: "",
          role: "",
          email: "",
        },
        isAuthenticated: false,
      };
    case USER_UPDATE_SUCESS:
      const newAccount = {
        access_token: "",
        refresh_token: state.account.refresh_token,
        username: action?.payload?.username,
        image: action?.payload?.userImage,
        role: state.account.role,
        email: state.account.email,
      };
      return {
        ...state,
        account: newAccount,
      };
    // case DECREMENT:
    //     return {
    //         ...state, count: state.count - 1,
    //     };
    default:
      return state;
  }
};

export default userReducer;
