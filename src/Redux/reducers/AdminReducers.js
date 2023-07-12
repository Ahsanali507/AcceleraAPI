import {
  CHANGE_USERS_PASSWORDS_FAIL,
  CHANGE_USERS_PASSWORDS_REQUEST,
  CHANGE_USERS_PASSWORDS_SUCCESS,
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
  WITHDRAW_AGENT_REQUEST,
  WITHDRAW_AGENT_SUCCESS,
} from "../constants/adminConstants"

export const CreateSubAdmin = (
  state = {
    createdSubAdmin: {},
  },
  action
) => {
  switch (action.type) {
    case CREATE_SUBADMIN_REQUEST:
      return {
        loading: true,
        isCreated: false,
        createdSubAdmin: {},
      }
    case CREATE_SUBADMIN_SUCCESS:
      return {
        loading: false,
        isCreated: true,
        createdSubAdmin: action.payload.createdSubAdmin,
      }
    case CREATE_SUBADMIN_FAIL:
      return {
        loading: false,
        isCreated: false,
        error: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export const CreateAgent = (
  state = {
    createdAgent: {},
  },
  action
) => {
  switch (action.type) {
    case CREATE_AGENT_REQUEST:
      return {
        loading: true,
        isCreated: false,
        createdAgent: {},
      }
    case CREATE_AGENT_SUCCESS:
      return {
        loading: false,
        isCreated: true,
        createdAgent: action.payload.createdAgent,
      }
    case CREATE_AGENT_FAIL:
      return {
        loading: false,
        isCreated: false,
        error: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export const GetMySubAdmins = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_SUBADMINS_REQUEST:
      return {
        loading: true,
        mySubAdmins: [],
      }
    case GET_MY_SUBADMINS_SUCCESS:
      return {
        loading: false,
        mySubAdmins: action.payload,
      }
    case GET_MY_SUBADMINS_FAIL:
      return {
        loading: false,
        mySubAdmins: [],
        error: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export const GetMyAgents = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_AGENTS_REQUEST:
      return {
        loading: true,
        myAgents: [],
      }
    case GET_MY_AGENTS_SUCCESS:
      return {
        loading: false,
        myAgents: action.payload,
      }
    case GET_MY_AGENTS_FAIL:
      return {
        loading: false,
        myAgents: [],
        error: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export const EditSubAdmin = (state = {}, action) => {
  switch (action.type) {
    case EDIT_SUBADMIN_REQUEST:
      return {
        loading: true,
        isEditted: false,
        edittedSubAdmin: {},
      }
    case EDIT_SUBADMIN_SUCCESS:
      return {
        loading: false,
        isEditted: true,
        edittedSubAdmin: action.payload.subAdmin,
      }
    case EDIT_SUBADMIN_FAIL:
      return {
        loading: false,
        isEditted: false,
        error: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export const EditAgent = (state = {}, action) => {
  switch (action.type) {
    case EDIT_AGENT_REQUEST:
      return {
        loading: true,
        isEditted: false,
        edittedAgent: {},
      }
    case EDIT_AGENT_SUCCESS:
      return {
        loading: false,
        isEditted: true,
        edittedAgent: action.payload.subAdmin,
      }
    case EDIT_AGENT_FAIL:
      return {
        loading: false,
        isEditted: false,
        error: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export const ChangeUserPassword = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_USERS_PASSWORDS_REQUEST:
      return {
        loading: true,
        isChanged: false,
      }
    case CHANGE_USERS_PASSWORDS_SUCCESS:
      return {
        loading: false,
        isChanged: true,
      }
    case CHANGE_USERS_PASSWORDS_FAIL:
      return {
        loading: false,
        isChanged: false,
        error: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export const DeleteSubAdmin = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SUBADMIN_REQUEST:
      return {
        loading: true,
        isDeleted: false,
      }
    case DELETE_SUBADMIN_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
      }
    case DELETE_SUBADMIN_FAIL:
      return {
        loading: false,
        isDeleted: false,
        error: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export const DeleteAgent = (state = {}, action) => {
  switch (action.type) {
    case DELETE_AGENT_REQUEST:
      return {
        loading: true,
        isDeleted: false,
      }
    case DELETE_AGENT_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
      }
    case DELETE_AGENT_FAIL:
      return {
        loading: false,
        isDeleted: false,
        error: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export const CreditAgent = (state = {}, action) => {
  switch (action.type) {
    case CREDIT_AGENT_REQUEST:
      return {
        loading: true,
        isCreditted: false,
      }
    case CREDIT_AGENT_SUCCESS:
      return {
        loading: false,
        isCreditted: true,
        message: action.payload,
      }
    case CREDIT_AGENT_FAIL:
      return {
        loading: false,
        isCreditted: false,
        error: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export const WithdrawAgent = (state = {}, action) => {
  switch (action.type) {
    case WITHDRAW_AGENT_REQUEST:
      return {
        loading: true,
        isWithdrawn: false,
      }
    case WITHDRAW_AGENT_SUCCESS:
      return {
        loading: false,
        isWithdrawn: true,
        message: action.payload,
      }
    case DELETE_AGENT_FAIL:
      return {
        loading: false,
        isWithdrawn: false,
        error: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export const GetMyTransactions = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_TRANSACTIONS_REQUEST:
      return {
        loading: true,
        myTransactions: [],
      }
    case GET_MY_TRANSACTIONS_SUCCESS:
      return {
        loading: false,
        myTransactions: action.payload,
      }
    case GET_MY_TRANSACTIONS_FAIL:
      return {
        loading: false,
        myTransactions: [],
        error: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}
