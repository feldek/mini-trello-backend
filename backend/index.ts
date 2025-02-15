import "dotenv/config.js";
import cors from "cors";
import express from "express";
import path from "path";
import { config } from "dotenv";
import routes from "./src/routes/routes";
import { connectDB } from "./db/models/associate/initDB";

const pathEnv = path.resolve(__dirname, ".env");

config({ path: pathEnv });

const PORT = process.env.PORT || 3004;

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));
app.use("/", routes);

connectDB()
  .then(() => {
    app.listen(
      PORT,
      function () {
        console.log("process.env.MINI_TRELLO_HOST", process.env.MINI_TRELLO_HOST);
        console.log("process.env.HOST", process.env.HOST);
        console.log("process.env.DB_CONFIG_DATABASE", process.env.DB_CONFIG_DATABASE);
        console.log("DB_CONFIG_USERNAME", process.env.DB_CONFIG_USERNAME);
        console.log("DB_CONFIG_PASSWORD", process.env.DB_CONFIG_PASSWORD);
        console.log("DB_CONFIG_DATABASE", process.env.DB_CONFIG_DATABASE);
        console.log("DB_CONFIG_HOST", process.env.DB_CONFIG_HOST);
        console.log("MINI_TRELLO_DB_CONFIG_DATABASE", process.env.MINI_TRELLO_DB_CONFIG_DATABASE);
        console.log("MINI_TRELLO_DB_CONFIG_DATABASE2", process.env.MINI_TRELLO_DB_CONFIG_DATABASE2);
      },
    );
  })
  .catch((err) => {
    console.error("Error while initializing", err);
  });
