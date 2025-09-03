import express from "express";
import cors from "cors";
import { sequelize } from "./config/database.js";

const PORT = process.env.PORT || 5000;

export const createApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use((err, req, res, next) => {
    console.log("Error Global", err.message);
    res.status(500).json({ message: "Error interno del servicor 1" });
  });

  app.listen(PORT, () => {
    `Servidor corriendo en http://localhost:${PORT}`;
  });
  await sequelize.authenticate();
};
