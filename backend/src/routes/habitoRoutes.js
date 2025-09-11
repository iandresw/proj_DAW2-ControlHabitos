import { Router } from "express";
import { HabitoController } from "../controllers/habitoController.js";

export const createHabitoRouter = (habito) => {
  const habitoRouter = Router();
  const habitoController = new HabitoController(habito);
  habitoRouter.post("/crear", habitoController.crear);
  habitoRouter.put("/:id_habito", habitoController.update);
  habitoRouter.delete("/:id_habito", habitoController.delete);
  habitoRouter.get("/usuario/:id_usuario", habitoController.HabitoByUsuario);
  habitoRouter.get("/", habitoController.getAll);
  habitoRouter.get("/:id_habito", habitoController.habitoById);
  return habitoRouter;
};
