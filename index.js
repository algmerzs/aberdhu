const express = require("express");
const morgan = require("morgan");
const app = express();

//settings
app.set("port", process.env.PORT || 7000);
app.set("json spaces", 2);

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(require("./routes/routes"));

// server
app.listen(app.get("port"), () =>
  console.log(`listening on port ${app.get("port")}`)
);
