const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const cors = require("cors");
 
const profileRoute = require("./routes/profileRouter");
const categoryRouter = require("./routes/categoryRouter");
const AdminRouter = require("./routes/adminRouter");
const BannerRouter = require("./routes/bannerRouter");

const app = express();
 

app.use(express.json());
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(cookieParser())
app.use("/uploads", express.static("src/uploads"));

app.use("/", authRouter);
app.use("/", categoryRouter );
app.use("/", profileRoute);
app.use("/", AdminRouter);
app.use("/", BannerRouter);





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
