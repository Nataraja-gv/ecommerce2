const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const cors = require("cors");
const categoryRouter = require("./routes/categoryRoute");
const profileRoute = require("./routes/profileRouter");

const app = express();
 

app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use("/uploads", express.static("src/uploads"));

app.use("/", authRouter);
app.use("/", categoryRouter);
app.use("/", profileRoute);



connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((error) => {
    console.log("Error", error);
  });
