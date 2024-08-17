const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");

const dbConnection = require("./config/mongoDb/database");

const mountRoutes = require("./routes");
const ApiError = require("./utils/apiError/apiError");
const globalError = require("./middleware/errorMiddleware");

dotenv.config({ path: "config.env" });

//connect with db
dbConnection();

//express app
const app = express();

//Middleware
// for parsing application/json
app.use(express.json());

// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  //request logger middleware
  app.use(morgan("dev"));
  console.log(process.env.NODE_ENV);
}


//Mount Routes
mountRoutes(app);

//Route error middleware
app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 400));
});

//Global error handling middleware for express
app.use(globalError);

//node server
const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`App Running In This Port .`);
});

//Events (handling Rejection error outside express ) ---out express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors ${err.name}  | ${err.message}`);
  server.close(() => {
    console.error(`server shutting down`);
    process.exit(1);
  });
});
