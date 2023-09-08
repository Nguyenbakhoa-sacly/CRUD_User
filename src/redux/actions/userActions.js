import { toast } from "react-toastify";
import { loginAPI } from "../../services/UserService";


export const USER_LOGIN = 'USER_LOGIN';
export const FETCH_USER_LOIGIN = 'FETCH_USER_LOIGIN';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const USER_REFETCH = 'USER_REFETCH';
export const USER_LOGOUT = 'USER_LOGOUT';

export const handleLoginRedux = (email, password) => {
  return async (dispatch, getState) => {
    //fetch nguoi dung
    dispatch({ type: FETCH_USER_LOIGIN });

    let res = await loginAPI(email.trim(), password);
    //login thanh cong
    if (res && res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('email', email.trim());
      dispatch({
        type: FETCH_USER_SUCCESS,
        data: { email: email.trim(), token: res.token }
      })
    } else {
      //login that bai
      if (res && res.status === 400) {
        toast.error(res.data.error)
      }
      dispatch({
        type: FETCH_USER_ERROR
      })
    }
  }
}

export const handleLogoutRedux = () => {
  return (dispatch, getState) => {
    dispatch({ type: USER_LOGOUT })
  }
}

//nap lai data vao redux de bat dau lai tu dau

export const handlerReFetch = () => {
  return (dispatch, getState) => {
    dispatch({ type: USER_REFETCH })
  }
}