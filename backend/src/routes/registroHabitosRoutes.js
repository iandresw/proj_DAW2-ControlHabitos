import { Router } from "express";
import { RegistroHabitoController } from "../controllers/registroHabitoController.js";

export const createRegistroHabitosRouter = (registroHabito) => {
  const registroHabitoRouter = Router();
  const registroHabitoController = new RegistroHabitoController(registroHabito);
  registroHabitoRouter.post("/crear", registroHabitoController.crear);
  registroHabitoRouter.delete("/:id_registro", registroHabitoController.delete);
  registroHabitoRouter.put("/:id_registro", registroHabitoController.update);
  registroHabitoRouter.get("/", registroHabitoController.getAll);
  registroHabitoRouter.get(
    "/habito/:id_habito",
    registroHabitoController.registroByHabito
  );
  registroHabitoRouter.get(
    "/:id_registro",
    registroHabitoController.registroById
  );
  return registroHabitoRouter;
};
