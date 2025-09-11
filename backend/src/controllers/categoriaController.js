import { config } from "dotenv";
config({ path: "./src/.env" }); //
config();
export class CategoriaController {
  constructor(categoria) {
    this.categoria = categoria;
  }

  crear = async (req, res, next) => {
    try {
      const { nombre, descripcion } = req.body;
      if (!nombre || !descripcion) {
        return res.status(400).json({ message: "Campos requeridos" });
      }
      const categoria = await this.categoria.findOne({
        where: { nombre: nombre },
      });
      if (categoria !== null) {
        return res
          .status(401)
          .json({ message: "Ya tiene una categoria bajo ese nombre" });
      }

      const new_categoria = await this.categoria.create({
        nombre,
        descripcion,
      });

      res.status(200).json(new_categoria);
    } catch (error) {
      res.status(500).json({
        message: `error al registar una categoria ${error.message}`,
      });
    }
  };

  getAll = async (req, res, next) => {
    try {
      const categorias = await this.categoria.findAll();
      if (categorias.length === 0) {
        return res.status(401).json({ message: "No hay categorias no hay" });
      }

      res.status(200).json(categorias);
    } catch (error) {
      res.status(500).json({
        message: `error al consultar las categorias ${error.message}`,
      });
    }
  };

  update = async (req, res, next) => {
    try {
      const { id_categoria } = req.params;
      const { nombre, descripcion } = req.body;

      if (!nombre || !descripcion) {
        return res.status(400).json({ message: "Campos requeridos" });
      }

      const categoria = await this.categoria.findOne({
        where: { id_categoria },
      });

      if (!categoria) {
        return res.status(404).json({ message: "Habito no existe" });
      }

      categoria.nombre = nombre;
      categoria.descripcion = descripcion;
      await categoria.save();

      res.status(200).json(categoria);
    } catch (error) {
      res.status(500).json({
        message: `Error al actualizar el categoria: ${error.message}`,
      });
    }
  };

  delete = async (req, res) => {
    try {
      const { id_categoria } = req.params;
      const result = await this.categoria.destroy({
        where: { id_categoria },
      });

      if (result === 0) {
        return res.status(404).json({
          message: `Error al eliminar la categoria, categoria no encontrada`,
        });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: `Error al eliminar la categoria: ${error.message}`,
      });
    }
  };

  categoriaById = async (req, res, next) => {
    try {
      const { id_categoria } = req.params;
      const categoria = await this.categoria.findOne({
        where: { id_categoria },
      });
      if (!categoria) {
        return res.status(404).json({ message: "Categoria no existe" });
      }
      res.status(200).json(categoria);
    } catch (error) {
      res.status(500).json({
        message: `Error al buscar categoria por id_categoria: ${error.message}`,
      });
    }
  };
}
