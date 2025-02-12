const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")

const dotenv = require('dotenv');
const authRouter = require('./src/routes/auth.route.js');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());


dotenv.config();


const port = 3000;
const url = 'mongodb+srv://sarasavi:sarasavi@sarasavidrivingschool.8wcadpf.mongodb.net/?retryWrites=true&w=majority';


const QuizRoute = require("./src/routes/Quiz.route");

const QuizPackageRoute = require("./src/routes/QuizPackage.route");

const userRouter = require("./src/routes/User.route");

const PhysicalTrainingRoute = require("./src/routes/PhysicalTrain.route");

const EnrollPTSRouter = require("./src/routes/EnrollPTS.route");

const VehicleRouter = require("./src/routes/vehicle.js");
const RevenueRouter = require("./src/routes/revenue.js");

const ExamRoute = require("./src/routes/ExamRequest.route.js");

const ChatRoute = require("./src/routes/ChatRoute.js");

const QuizMarksRouter = require("./src/routes/QuizMarks.route");


const ChatbotRoute = require("./src/routes/ChatbotRoute.js");
const InstructorSalaryRouter = require("./src/routes/InstructorSalary.route.js");

const PTSReportRoute = require("./src/routes/PTSReportRoute.js")

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function connectDB(url , connectionParams){
    
  await mongoose.connect(url , connectionParams);
  
  // console.log("DB Connected");
}

connectDB(url , {}).then(()=>{

  console.log("Database Connected");
  app.listen(port , ()=>{
      console.log("Listening on port 3000");
  });
}).catch((err)=>{
  console.error('Connection Error',err);
})

app.use("/quiz", QuizRoute);

app.use("/quizPackage", QuizPackageRoute);
app.use("/quizMarks", QuizMarksRouter);


app.use("/user", userRouter);
app.use("/pts", PhysicalTrainingRoute);
app.use("/enrollPTS", EnrollPTSRouter);
app.use("/vehicle", VehicleRouter);
app.use("/revenue", RevenueRouter);
app.use("/exam" , ExamRoute)
app.use("/chat", ChatRoute);
app.use("/chatbot", ChatbotRoute);
app.use("/ptsreport", PTSReportRoute);
app.use("/salary",InstructorSalaryRouter)


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
