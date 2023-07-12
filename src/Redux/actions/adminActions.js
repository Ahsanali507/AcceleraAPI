import {
  CREATE_AGENT_FAIL,
  CREATE_AGENT_REQUEST,
  CREATE_AGENT_SUCCESS,
  CREATE_SUBADMIN_FAIL,
  CREATE_SUBADMIN_REQUEST,
  CREATE_SUBADMIN_SUCCESS,
  CREDIT_AGENT_FAIL,
  CREDIT_AGENT_REQUEST,
  CREDIT_AGENT_SUCCESS,
  DELETE_AGENT_FAIL,
  DELETE_AGENT_REQUEST,
  DELETE_AGENT_SUCCESS,
  DELETE_SUBADMIN_FAIL,
  DELETE_SUBADMIN_REQUEST,
  DELETE_SUBADMIN_SUCCESS,
  EDIT_AGENT_FAIL,
  EDIT_AGENT_REQUEST,
  EDIT_AGENT_SUCCESS,
  EDIT_SUBADMIN_FAIL,
  EDIT_SUBADMIN_REQUEST,
  EDIT_SUBADMIN_SUCCESS,
  GET_MY_AGENTS_FAIL,
  GET_MY_AGENTS_REQUEST,
  GET_MY_AGENTS_SUCCESS,
  GET_MY_SUBADMINS_FAIL,
  GET_MY_SUBADMINS_REQUEST,
  GET_MY_SUBADMINS_SUCCESS,
  GET_MY_TRANSACTIONS_FAIL,
  GET_MY_TRANSACTIONS_REQUEST,
  GET_MY_TRANSACTIONS_SUCCESS,
  WITHDRAW_AGENT_FAIL,
  WITHDRAW_AGENT_REQUEST,
  WITHDRAW_AGENT_SUCCESS,
} from "../constants/adminConstants"
import axios from "axios"

const config = {
  headers: {
    "content-Type": "application/json",
  },
  withCredentials: true,
}
const basicUrl = "http://localhost:8000/api/admin"

export const createSubAdminAction = (subAdminData) => async (dispatch) => {
  dispatch({
    type: CREATE_SUBADMIN_REQUEST,
  })
  try {
    const res = await axios.post(
      basicUrl + "/create/subadmin",
      subAdminData,
      config
    )
    dispatch({
      type: CREATE_SUBADMIN_SUCCESS,
      payload: res.data.user,
    })
  } catch (err) {
    dispatch({
      type: CREATE_SUBADMIN_FAIL,
      payload: err.response.data.message,
    })
  }
}

export const createAgentAction = (agentData) => async (dispatch) => {
  dispatch({
    type: CREATE_AGENT_REQUEST,
  })
  try {
    const res = await axios.post(basicUrl + "/create/agent", agentData, config)
    dispatch({
      type: CREATE_AGENT_SUCCESS,
      payload: res.data.user,
    })
  } catch (err) {
    dispatch({
      type: CREATE_AGENT_FAIL,
      payload: err.response.data.message,
    })
  }
}

export const getMySubAdminsAction = async (dispatch) => {
  dispatch({
    type: GET_MY_SUBADMINS_REQUEST,
  })
  try {
    const res = await axios.get(basicUrl + "/mysubadmins", config)
    dispatch({
      type: GET_MY_SUBADMINS_SUCCESS,
      payload: res.data.subAdmins,
    })
  } catch (err) {
    dispatch({
      type: GET_MY_SUBADMINS_FAIL,
      payload: err.response.data.message,
    })
  }
}

export const getMyAgentsAction = async (dispatch) => {
  dispatch({
    type: GET_MY_AGENTS_REQUEST,
  })
  try {
    const res = await axios.get(basicUrl + "/myagents", config)
    dispatch({
      type: GET_MY_AGENTS_SUCCESS,
      payload: res.data.agents,
    })
  } catch (err) {
    dispatch({
      type: GET_MY_AGENTS_FAIL,
      payload: err.response.data.message,
    })
  }
}

export const editSubAdminAction =
  (updatedData, victimId) => async (dispatch) => {
    dispatch({
      type: EDIT_SUBADMIN_REQUEST,
    })
    try {
      const res = await axios.put(
        basicUrl + `/update/subadmin/${victimId}`,
        updatedData,
        config
      )
      dispatch({
        type: EDIT_SUBADMIN_SUCCESS,
        payload: res.data.subAdmin,
      })
    } catch (err) {
      dispatch({
        type: EDIT_SUBADMIN_FAIL,
        payload: err.response.data.message,
      })
    }
  }

export const editSubAgentAction =
  (updatedData, victimId) => async (dispatch) => {
    dispatch({
      type: EDIT_AGENT_REQUEST,
    })
    try {
      const res = await axios.put(
        basicUrl + `/update/agent/${victimId}`,
        updatedData,
        config
      )
      dispatch({
        type: EDIT_AGENT_SUCCESS,
        payload: res.data.agent,
      })
    } catch (err) {
      dispatch({
        type: EDIT_AGENT_FAIL,
        payload: err.response.data.message,
      })
    }
  }

export const deleteSubAdminAction = (victimId) => async (dispatch) => {
  dispatch({
    type: DELETE_SUBADMIN_REQUEST,
  })
  try {
    const res = await axios.delete(
      basicUrl + `/delete/subadmin/${victimId}`,
      config
    )
    dispatch({
      type: DELETE_SUBADMIN_SUCCESS,
      payload: res.data.subAdmin,
    })
  } catch (err) {
    dispatch({
      type: DELETE_SUBADMIN_FAIL,
      payload: err.response.data.message,
    })
  }
}

export const deleteAgentAction = (victimId) => async (dispatch) => {
  dispatch({
    type: DELETE_AGENT_REQUEST,
  })
  try {
    const res = await axios.delete(
      basicUrl + `/delete/agent/${victimId}`,
      config
    )
    dispatch({
      type: DELETE_AGENT_SUCCESS,
      payload: res.data.subAdmin,
    })
  } catch (err) {
    dispatch({
      type: DELETE_AGENT_FAIL,
      payload: err.response.data.message,
    })
  }
}

export const creditAgentAction =
  (creditToTransfer, victimId) => async (dispatch) => {
    dispatch({
      type: CREDIT_AGENT_REQUEST,
    })
    try {
      const res = await axios.post(
        `api/admin/credit/agent/${victimId}`,
        creditToTransfer
        //config
      )
      dispatch({
        type: CREDIT_AGENT_SUCCESS,
        payload: res.data.message,
      })
    } catch (err) {
      console.log(err)
      dispatch({
        type: CREDIT_AGENT_FAIL,
        payload: err.response.data.message,
      })
    }
  }

export const withdrawAgentAction =
  (creditToTransfer, victimId) => async (dispatch) => {
    dispatch({
      type: WITHDRAW_AGENT_REQUEST,
    })
    try {
      const res = await axios.post(
        `api/admin/withdraw/agent/${victimId}`,
        creditToTransfer
        //config
      )
      dispatch({
        type: WITHDRAW_AGENT_SUCCESS,
        payload: res.data.message,
      })
    } catch (err) {
      dispatch({
        type: WITHDRAW_AGENT_FAIL,
        payload: err.response.data.message,
      })
    }
  }

export const getMyTransactionsAction = async (dispatch) => {
  dispatch({
    type: GET_MY_TRANSACTIONS_REQUEST,
  })
  try {
    const res = await axios.get(basicUrl + "/mytransactions", config)
    dispatch({
      type: GET_MY_TRANSACTIONS_SUCCESS,
      payload: res.data.agents,
    })
  } catch (err) {
    dispatch({
      type: GET_MY_TRANSACTIONS_FAIL,
      payload: err.response.data.message,
    })
  }
}
