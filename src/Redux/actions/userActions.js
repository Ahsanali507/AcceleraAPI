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

import axios from "axios"
const config = {
  headers: {
    "content-Type": "application/json",
  },
  withCredentials: true,
}
const basicUrl = "http://localhost:8000/api/"

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  })
  try {
    const res = await axios.post(basicUrl + "public/login", loginData, config)
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data.user,
    })
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.response.data.message,
    })
  }
}

export const userProfileAction = async (dispatch) => {
  dispatch({
    type: USER_PROFILE_REQUEST,
  })
  try {
    const res = await axios.get(basicUrl + "user/profile", config)
    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: res.data.user,
    })
  } catch (err) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: err.response.data.message,
    })
  }
}

export const changeMyPasswordAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_MY_PASSWORD_REQUEST,
    })
    const res = await axios.put(basicUrl + "user/password/update", data, config)
    dispatch({
      type: CHANGE_MY_PASSWORD_SUCCESS,
      payload: res.data.message,
    })
  } catch (err) {
    dispatch({
      type: CHANGE_MY_PASSWORD_FAIL,
      payload: err.response.data.message,
    })
  }
}
export const logoutUserAction = async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    })
    const res = await axios.get(basicUrl + "user/logout", config)
    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: res.data.user,
    })
  } catch (err) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: err.response.data.message,
    })
  }
}
