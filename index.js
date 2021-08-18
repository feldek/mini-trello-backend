const express = require("express");
require("dotenv").config();
const routes = require("./routes/routes");
const PORT = process.env.PORT || 3004;
const app = express();

app.listen(PORT, () => {
  console.log("Server has been started...");
});

app.use(express.urlencoded());
app.use(express.json());
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.append(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization,X-Custom-Header"
  );
  next();
});

app.use("/", routes);
