import { config } from "dotenv";
config({ path: "./src/.env" }); //
config();
export class ProgresoController {
  constructor(progreso) {
    this.progreso = progreso;
  }

  crear = async (req, res, next) => {
    try {
      const {
        id_habito,
        fecha_inicio,
        valor_inicial,
        valor_final,
        observaciones,
      } = req.body;
      if (
        !id_habito ||
        !fecha_inicio ||
        !valor_inicial ||
        !valor_final ||
        !observaciones
      ) {
        return res.status(400).json({ message: "Campos requeridos " });
      }
      const progreso = await this.progreso.findOne({
        where: { id_habito: id_habito },
      });
      if (progreso !== null) {
        return res
          .status(401)
          .json({ message: "Ya tiene un habito bajo ese nombre" });
      }

      const new_progreso = await this.progreso.create({
        id_habito,
        fecha_inicio: new Date().toISOString(),
        valor_inicial,
        valor_final,
        observaciones,
      });

      res.status(200).json(new_progreso);
    } catch (error) {
      res.status(500).json({
        message: `error al registar un progreso ${error.message}`,
      });
    }
  };

  getAll = async (req, res, next) => {
    try {
      const progresos = await this.progreso.findAll();
      if (progresos.lenght === 0) {
        return res.status(401).json({ message: "No hay progresos no hay" });
      }

      res.status(200).json(progresos);
    } catch (error) {
      res
        .status(500)
        .json({ message: `error al consultar los progresos ${error.message}` });
    }
  };

  update = async (req, res, next) => {
    try {
      const { id_progreso } = req.params;
      const { valor_final, observaciones } = req.body;

      if (!valor_final || !observaciones) {
        return res.status(400).json({ message: "Campos requeridos" });
      }

      const progreso = await this.progreso.findOne({ where: { id_progreso } });

      if (!progreso) {
        return res.status(404).json({ message: "Habito no existe" });
      }

      progreso.valor_final = valor_final;
      progreso.observaciones = observaciones;
      await progreso.save();

      res.status(200).json(progreso);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error al actualizar el progreso: ${error.message}` });
    }
  };
  delete = async (req, res) => {
    try {
      const { id_progreso } = req.params;
      const result = await this.progreso.destroy({
        where: { id_progreso },
      });

      if (result === 0) {
        return res.status(404).json({
          message: `Error al eliminar progreso, progreso no encontrado`,
        });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: `Error al eliminar progreso: ${error.message}`,
      });
    }
  };

  progresoById = async (req, res, next) => {
    try {
      const { id_progreso } = req.params;
      const progreso = await this.progreso.findOne({ where: { id_progreso } });
      if (!progreso) {
        return res.status(404).json({ message: "Habito no existe" });
      }
      res.status(200).json(progreso);
    } catch (error) {
      res.status(500).json({
        message: `Error al buscar progreso por id_progreso: ${error.message}`,
      });
    }
  };
  progresoByHabito = async (req, res, next) => {
    try {
      const { id_habito } = req.params;
      const progreso = await this.progreso.findAll({ where: { id_habito } });
      if (!progreso) {
        return res.status(404).json({ message: "Habito no existe" });
      }
      res.status(200).json(progreso);
    } catch (error) {
      res.status(500).json({
        message: `Error al buscar progreso por id_habito: ${error.message}`,
      });
    }
  };
}
