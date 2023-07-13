const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const errorMiddelware = require("./utility/ErrorMiddelware")

const PublicRoutes = require("./routes/PublicRoutes")
const AdminRoutes = require("./routes/AdminRoutes")
const SubAdminRoutes = require("./routes/SubAdminRoutes")

require("dotenv").config()

const app = express()

// middelwares
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

// routes
app.use("/api", PublicRoutes)
app.use("/api", AdminRoutes)
app.use("/api", SubAdminRoutes)

app.use(errorMiddelware)
app.get("/", (req, res, next) => {
  res.send("app is running")
})

module.exports = app
