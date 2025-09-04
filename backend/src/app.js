import express from "express";
import cors from "cors";
import { sequelize } from "./config/database.js";

import { Usuario } from "../src/models/Usuario.js";
import { createUsuarioRouter } from "../src/routes/usuarioRoutes.js";

const PORT = process.env.PORT || 5000;

export const createApp = async (Usuario) => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api/usuario", createUsuarioRouter(Usuario));
  app.use((err, req, res, next) => {
    console.error("Error global", err.message);
    res.status(500).json({ message: "Error interno del servidor 11" });
  });
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
  await sequelize.authenticate();
  await Usuario.sync({ force: false });
};
