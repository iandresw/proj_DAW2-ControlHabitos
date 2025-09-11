import express from "express";
import cors from "cors";
import { sequelize } from "./config/database.js";
//MODELOS
import { Categoria } from "../src/models/Categoria.js";
import { Habito } from "../src/models/Habito.js";
import { Progreso } from "../src/models/Progreso.js";
import { RegistoHabito } from "../src/models/RegistroHabito.js";
import { Usuario } from "../src/models/Usuario.js";
//RUTAS
import { createCategoriaRouter } from "../src/routes/categoriaRoutes.js";
import { createHabitoRouter } from "../src/routes/habitoRoutes.js";
import { createProgresoRouter } from "../src/routes/progresoRouter.js";
import { createRegistroHabitosRouter } from "../src/routes/registroHabitosRoutes.js";
import { createUsuarioRouter } from "../src/routes/usuarioRoutes.js";

const PORT = process.env.PORT || 5000;

export const createApp = async (
  categoria,
  habito,
  progreso,
  registroHabito,
  usuario
) => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api/categoria", createCategoriaRouter(categoria));
  app.use("/api/habito", createHabitoRouter(habito));
  app.use("/api/progreso", createProgresoRouter(progreso));
  app.use("/api/registroHabito", createRegistroHabitosRouter(registroHabito));
  app.use("/api/usuario", createUsuarioRouter(usuario));

  app.use((err, req, res, next) => {
    console.error("Error global", err.message);
    res.status(500).json({ message: "Error interno del servidor 11" });
  });
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
  await sequelize.authenticate();
  await Categoria.sync({ force: true });
  await Habito.sync({ force: true });
  await Progreso.sync({ force: true });
  await RegistoHabito.sync({ force: true });
  await Usuario.sync({ force: true });
};
