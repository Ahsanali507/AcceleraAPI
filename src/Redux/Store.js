import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { LoginUser, LogoutUser, UserProfile } from "./reducers/UserReducers"
import {
  GetMyAgents,
  GetMySubAdmins,
  GetMyTransactions,
} from "./reducers/AdminReducers"

const middelWare = [thunk]
const RootReducer = combineReducers({
  // normal user functions
  loggedInUser: LoginUser,
  userProfile: UserProfile,
  loggedOutUser: LogoutUser,

  mySubAdmins: GetMySubAdmins,
  myAgents: GetMyAgents,
  myTransactions: GetMyTransactions,
})
const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middelWare))
)
export default Store
