import { SUBADMIN_CREATE_AGENT_FAIL, SUBADMIN_CREATE_AGENT_REQUEST, SUBADMIN_CREATE_AGENT_SUCCESS, SUBADMIN_DELETE_AGENT_REQUEST, SUBADMIN_EDIT_AGENT_FAIL, SUBADMIN_EDIT_AGENT_REQUEST, SUBADMIN_EDIT_AGENT_SUCCESS, SUBADMIN_GET_MY_AGENTS_FAIL, SUBADMIN_GET_MY_AGENTS_REQUEST, SUBADMIN_GET_MY_AGENTS_SUCCESS } from "../constants/subAdminConstants";

export const SubAdminCreateAgent = (
    state = {
      createdAgent: {},
    },
    action
  ) => {
    switch (action.type) {
      case SUBADMIN_CREATE_AGENT_REQUEST:
        return {
          loading: true,
          isCreated: false,
          createdAgent: {},
        };
      case SUBADMIN_CREATE_AGENT_SUCCESS:
        return {
          loading: false,
          isCreated: true,
          createdAgent: action.payload.createdAgent,
        };
      case SUBADMIN_CREATE_AGENT_FAIL:
        return {
          loading: false,
          isCreated: false,
          error: action.payload,
        };
      default:
        return {
          ...state,
        };
    }
};

export const SubAdminGetMyAgents = (state = {}, action)=>{
    switch(action.type){
        case SUBADMIN_GET_MY_AGENTS_REQUEST:
            return {
                loading: true,
                myAgents: [],
            }
        case SUBADMIN_GET_MY_AGENTS_SUCCESS:
            return {
                loading: false,
                myAgents: action.payload.myAgents
            }
        case SUBADMIN_GET_MY_AGENTS_FAIL:
            return {
                loading: false,
                myAgents: [],
                error: action.payload
            }
        default:
            return {
                ...state,
            }
    }
}

export const SubAdminEditAgent = (state = {}, action) => {
    switch(action.type){
        case SUBADMIN_EDIT_AGENT_REQUEST:
            return {
                loading: true,
                isEditted: false,
                edittedAgent: {}
            }
        case SUBADMIN_EDIT_AGENT_SUCCESS:
            return {
                loading: false,
                isEditted: true,
                edittedAgent: action.payload.subAdmin
            }
        case SUBADMIN_EDIT_AGENT_FAIL:
            return {
                loading: false,
                isEditted: false,
                error: action.payload
            }
        default:
            return {
                ...state,
            }
    }
}

export const SubAdminDeleteAgent = (state = {}, action) => {
    switch(action.type){
        case SUBADMIN_DELETE_AGENT_REQUEST:
            return {
                loading: true,
                isDeleted: false,
            }
        case SUBADMIN_EDIT_AGENT_SUCCESS:
            return {
                loading: false,
                isDeleted: true,
            }
        case SUBADMIN_EDIT_AGENT_FAIL:
            return {
                loading: false,
                isDeleted: false,
                error: action.payload
            }
        default:
            return {
                ...state,
            }
    }
}

export const CreditAgent = (state = {}, action)=> {
    switch(action.type){
        case CREDIT_AGENT_REQUEST:
            return {
                loading: true,
                isCreditted: false,
            }
        case CREDIT_AGENT_SUCCESS:
            return {
                loading: false,
                isCreditted: true,
                message: action.payload
            }
        case CREDIT_AGENT_FAIL:
            return {
                loading: false,
                isCreditted: false,
                error: action.payload
            }
        default:
            return {
                ...state,
            }
    }
}

export const WithdrawAgent = (state = {}, action)=> {
    switch(action.type){
        case WITHDRAW_AGENT_REQUEST:
            return {
                loading: true,
                isWithdrawn: false,
            }
        case WITHDRAW_AGENT_SUCCESS:
            return {
                loading: false,
                isWithdrawn: true,
                message: action.payload
            }
        case DELETE_AGENT_FAIL:
            return {
                loading: false,
                isWithdrawn: false,
                error: action.payload
            }
        default:
            return {
                ...state,
            }
    }
}