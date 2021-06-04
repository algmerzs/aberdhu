const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

//settings
app.set("port", process.env.PORT || 7000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("json spaces", 2);

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(require("./routes/routes"));

// server
app.listen(app.get("port"), () =>
  console.log(`listening on port ${app.get("port")}`)
);
