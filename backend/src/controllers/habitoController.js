import { config } from "dotenv";

config({ path: "./src/.env" }); //
config();
export class HabitoController {
  constructor(habito) {
    this.habito = habito;
  }

  crear = async (req, res, next) => {
    try {
      const {
        id_usuario,
        id_categoria,
        nombre,
        descripcion,
        unidad_medida,
        meta,
        duracion,
      } = req.body;
      if (
        !id_usuario ||
        !id_categoria ||
        !nombre ||
        !descripcion ||
        !unidad_medida ||
        !meta ||
        !duracion
      ) {
        return res.status(400).json({ message: "Campos requeridos" });
      }
      const habito = await this.habito.findOne({
        where: { id_usuario: id_usuario, nombre: nombre },
      });
      if (habito !== null) {
        return res
          .status(401)
          .json({ message: "Ya tiene un habito bajo ese nombre" });
      }

      const new_habito = await this.habito.create({
        id_usuario,
        id_categoria,
        nombre,
        descripcion,
        unidad_medida,
        meta,
        fecha_inicio: new Date().toISOString(),
        duracion,
      });

      res.status(200).json({ new_habito });
    } catch (error) {
      res.status(500).json({
        message: `error al registar un nuevo habito ${error.message}`,
      });
    }
  };

  getAll = async (req, res, next) => {
    try {
      const habitos = await this.habito.findAll();
      if (habitos.length === 0) {
        return res.status(401).json({ message: "No hay Habitos no hay" });
      }

      res.status(200).json(habitos);
    } catch (error) {
      res
        .status(500)
        .json({ message: `error al consultar los habitos ${error.message}` });
    }
  };

  update = async (req, res, next) => {
    try {
      const { id_habito } = req.params;
      const { nombre, descripcion, meta, duracion } = req.body;

      if (!nombre || !descripcion || !meta || !duracion) {
        return res.status(400).json({ message: "Campos requeridos" });
      }

      const habito = await this.habito.findOne({ where: { id_habito } });

      if (!habito) {
        return res.status(404).json({ message: "Habito no existe" });
      }

      habito.nombre = nombre;
      habito.descripcion = descripcion;
      habito.meta = meta;
      habito.duracion = duracion;
      await habito.save();

      res.status(200).json(habito);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error al actualizar el habito: ${error.message}` });
    }
  };
  delete = async (req, res) => {
    try {
      const { id_habito } = req.params;
      const result = await this.habito.destroy({
        where: { id_habito },
      });

      if (result === 0) {
        return res.status(404).json({
          message: `Error al eliminar habito, habito no encontrado`,
        });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: `Error al eliminar habito: ${error.message}`,
      });
    }
  };

  habitoById = async (req, res, next) => {
    try {
      const { id_habito } = req.params;
      const habito = await this.habito.findOne({ where: { id_habito } });
      if (!habito) {
        return res.status(404).json({ message: "Habito no existe" });
      }
      res.status(200).json(habito);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error al buscar habito por id: ${error.message}` });
    }
  };
  HabitoByUsuario = async (req, res, next) => {
    try {
      const { id_usuario } = req.params;
      const habitos = await this.habito.findAll({ where: { id_usuario } });
      if (!habitos) {
        return res.status(404).json({ message: "Habito no existe" });
      }
      res.status(200).json(habitos);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error al buscar habito por id: ${error.message}` });
    }
  };
}
