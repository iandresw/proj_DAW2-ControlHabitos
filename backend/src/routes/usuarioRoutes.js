import { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController.js";

export const createUsuarioRouter = (Usuario) => {
  const usuarioRouter = Router();
  const usuarioController = new UsuarioController(Usuario);
  usuarioRouter.post("/login", usuarioController.login);
  usuarioRouter.post("/register", usuarioController.register);
  usuarioRouter.get("/", usuarioController.getAll);
  usuarioRouter.delete("/:id", usuarioController.delete);
  usuarioRouter.put("/:id", usuarioController.update);
  usuarioRouter.get("/:id", usuarioController.usuarioById);
  return usuarioRouter;
};
