import { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController.js";

export const createUsuarioRouter = (usuario) => {
  const usuarioRouter = Router();
  const usuarioController = new UsuarioController(usuario);
  usuarioRouter.post("/login", usuarioController.login);
  usuarioRouter.post("/register", usuarioController.register);
  usuarioRouter.get("/", usuarioController.getAll);
  usuarioRouter.delete("/:id_usuario", usuarioController.delete);
  usuarioRouter.put("/:id_usuario", usuarioController.update);
  usuarioRouter.get("/:id_usuario", usuarioController.usuarioById);
  return usuarioRouter;
};
