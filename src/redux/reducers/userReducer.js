
import { USER_REFETCH, USER_LOGOUT, FETCH_USER_LOIGIN, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from '../actions/userActions';

const INITIAL_STATE = {
  account: {
    email: '',
    auth: null,
    token: '',
  },
  isLoading: false,
  isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOIGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case FETCH_USER_SUCCESS:
      console.log('>>>check action', action);
      return {
        ...state,
        //cap nhat lai account
        account: {
          email: action.data.email,
          auth: true,
          token: action.data.token,
        },
        isLoading: false,
        isError: false,
      };
    //login that bai
    case FETCH_USER_ERROR:
      return {
        ...state,
        account: {
          auth: false,
        },
        isLoading: false,
        isError: true,
      };
    //login thang cong
    case USER_LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      return {
        ...state,
        account: {
          email: '',
          auth: false,
          token: '',
        }
      }
    case USER_REFETCH:
      return {
        ...state,
        account: {
          email: localStorage.getItem('email'),
          auth: true,
          token: localStorage.getItem('token'),
        }
      }
    default: return state;
  }
}

export default userReducer
