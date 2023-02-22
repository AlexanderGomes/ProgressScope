const express = require("express");
require("dotenv").config();
const db = require("./utils/db");

const port = process.env.PORT || 5000;
const app = express();

const companyRoute = require("./routes/company");
const userRoute = require("./routes/user");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/company", companyRoute);
app.use("/api/user", userRoute);

app.listen(port, async () => {
  await db();
  console.log(`db is connected`);
  console.log(`server on port ${port}`);
});
