import { Router } from "express";
import { CategoriaController } from "../controllers/categoriaController.js";

export const createCategoriaRouter = (categoria) => {
  const categoriaRouter = Router();
  const categoriaController = new CategoriaController(categoria);
  categoriaRouter.get("/", categoriaController.getAll);
  categoriaRouter.post("/crear", categoriaController.crear);
  categoriaRouter.put("/:id_categoria", categoriaController.update);
  categoriaRouter.delete("/:id_categoria", categoriaController.delete);
  categoriaRouter.get("/:id_categoria", categoriaController.categoriaById);
  return categoriaRouter;
};
