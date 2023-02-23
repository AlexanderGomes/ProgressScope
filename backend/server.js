const express = require("express");
require("dotenv").config();
const db = require("./utils/db");

const port = process.env.PORT || 5000;
const app = express();

const companyRoute = require("./routes/company");
const userRoute = require("./routes/user");
const reportRoute = require("./routes/report");
const teamRoute = require("./routes/team");
const codesRoute = require("./routes/code");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/company", companyRoute);
app.use("/api/user", userRoute);
app.use("/api/report", reportRoute);
app.use("/api/team", teamRoute);
app.use("/api/code", codesRoute);

app.listen(port, async () => {
  await db();
  console.log(`db is connected`);
  console.log(`server on port ${port}`);
});
