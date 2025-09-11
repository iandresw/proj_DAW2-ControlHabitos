import { Router } from "express";
import { ProgresoController } from "../controllers/progresoController.js";

export const createProgresoRouter = (progreso) => {
  const progesoRouter = Router();
  const progresoController = new ProgresoController(progreso);

  progesoRouter.post("/crear", progresoController.crear);
  progesoRouter.put("/:id_progreso", progresoController.update);
  progesoRouter.delete("/:id_progreso", progresoController.delete);
  progesoRouter.get("/habito/:id_habito", progresoController.progresoByHabito);
  progesoRouter.get("/", progresoController.getAll);
  progesoRouter.get("/:id_progreso", progresoController.progresoById);
  return progesoRouter;
};
