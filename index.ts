import { connectDB } from "./db/models/associate/initDB";
import express from "express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
// require("dotenv").config();
import "dotenv/config.js";
import cors from "cors";
import routes from "./routes/routes";
const PORT = process.env.PORT || 3004;
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use("/", routes);

connectDB()
  .then(async () => {
    app.listen(PORT, function () {
      console.log(`Server has been started... Port: ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error("Error while initializing", err);
  });
