const bodyParser = require("body-parser");

const db = require("./models");
const express = require("express");
const cors = require("cors");
const dotenv=require('dotenv')
const app = express();
const PORT = process.env.PORT||8081;
const ORIGIN=process.env.ORIGIN||"http://localhost:8000"
const path=require('path')
dotenv.config()

const corsOptions = {
  origin: ORIGIN,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const studentRoute = require("./routes/student");
app.use("/student", studentRoute);
const instructorRoute = require("./routes/instructor");
app.use(`/instructor`, instructorRoute);

const adminRoute = require("./routes/admin");
app.use("/admin", adminRoute);

const courseRoute = require("./routes/course");
app.use("/course", courseRoute);

const accountantRoute = require("./routes/accountant");
app.use("/accountant", accountantRoute);

const managerRoute = require("./routes/manager");
app.use("/manager", managerRoute);

const classRoute = require("./routes/class_room");
app.use("/class_room", classRoute);
const messageRoute = require("./routes/message");
app.use("/message", messageRoute);
var authRouter = require("./routes/auth");
app.use("/auth", authRouter);

var createFirst = require("./routes/createTestAll");
app.use("/create", createFirst);
const createTestAll=require('./seeders/createTestAll')
createTestAll()

var assessmentRouter = require("./routes/assessment");
app.use("/assessment", assessmentRouter);
var markListRouter = require("./routes/mark_list");
const todoRoute=require('./routes/todo')
app.use('/todo',todoRoute)

app.use("/markList", markListRouter);
var profileRouter = require("./routes/profile");
app.use("/profile", profileRouter);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

db.sequelize.sync({ alter: true }).then((req) => {
  app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`);
  });
});
