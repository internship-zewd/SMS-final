const bodyParser = require("body-parser");

const db = require("./models");
const express = require("express");
const cors = require("cors");
const app = express();
PORT = 8081;

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("dotenv").config();

const studentRoute = require("./routes/student");
app.use("/student", studentRoute);
PORT = 8081;
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


db.sequelize.sync({ alter: true }).then((req) => {
  app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`);
  });
});
