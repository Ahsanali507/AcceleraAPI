import {
  CHANGE_MY_PASSWORD_FAIL,
  CHANGE_MY_PASSWORD_REQUEST,
  CHANGE_MY_PASSWORD_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
} from "../constants/userConstants"

export const LoginUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
      }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: {},
      }
    default:
      return { ...state }
  }
}
export const LogoutUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
      }
    case USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: action.payload,
      }
    case USER_LOGOUT_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        message: action.payload,
        user: {},
      }
    default:
      return { ...state }
  }
}
export const UserProfile = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
      }
    case USER_PROFILE_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      }
    case USER_PROFILE_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        message: action.payload,
        user: {},
      }
    default:
      return { ...state }
  }
}

export const ChangeMyPassword = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_MY_PASSWORD_REQUEST:
      return {
        loading: true,
      }
    case CHANGE_MY_PASSWORD_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      }
    case CHANGE_MY_PASSWORD_FAIL:
      return {
        loading: false,
        message: action.payload,
      }
    default:
      return { ...state }
  }
}
