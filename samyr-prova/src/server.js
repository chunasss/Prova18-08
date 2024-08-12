import "dotenv/config";
import express from "express";

import "./models/palestrantesModel.js";

import palestrantesRoutes from "./routes/palestrantesRoutes.js";

const PORT = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/eventos", palestrantesRoutes);

app.listen(PORT, () => {
  console.log("serv on port", PORT);
});
