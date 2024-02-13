const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const authRouter = require("./routes/v1/auth")



const app = express();


app.use("/courses/covers",
    express.static(path.join(__dirname, "public", "courses", ""))
)


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/v1/auth", authRouter)

module.exports = app;