import "./App.css"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import LoginPage from "./Pages/LoginPage"
import MainPage from "./Pages/MainPage"
import { useCallback, useEffect } from "react"
import { userProfileAction } from "./Redux/actions/userActions"

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, isAuthenticated } = useSelector((state) => state.userProfile)

  useCallback(() => {
    dispatch(userProfileAction)
  }, [dispatch])

  useEffect(() => {
    if (!loading) {
      isAuthenticated ? navigate("/") : navigate("/login")
    }
  }, [loading, isAuthenticated, navigate])

  return (
    <div className="App">
      {loading && <p>loading</p>}
      <Routes>
        <Route exact path="/" element={<MainPage />}></Route>
        <Route exact path="/login" element={<LoginPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
