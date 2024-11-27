import cors from "cors";
import express from "express";
import "dotenv/config.js";
import { connectDB } from "./db/models/associate/initDB";
import routes from "./src/routes/routes";

const PORT = process.env.PORT || 3004;
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));
app.use("/", routes);

connectDB()
  .then(async () => {
    app.listen(PORT, function() {
      console.log(`Server has been started... Port: ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error("Error while initializing", err);
  });
