import { config } from "dotenv";
config({ path: "./src/.env" }); //
config();
export class RegistroHabitoController {
  constructor(registroHabito) {
    this.registroHabito = registroHabito;
  }

  crear = async (req, res, next) => {
    try {
      const { id_habito, fecha, realizado, valor } = req.body;
      if (!id_habito || !fecha || !realizado || !valor) {
        return res.status(400).json({ message: "Campos requeridos" });
      }
      const registoHabito = await this.registroHabito.findOne({
        where: { id_habito: id_habito, fecha: fecha },
      });
      if (registoHabito !== null) {
        return res
          .status(401)
          .json({ message: "Ya tiene un habito bajo ese nombre" });
      }

      const new_registoHabito = await this.registroHabito.create({
        id_habito,
        fecha,
        realizado,
        valor,
      });
      res.status(200).json(new_registoHabito);
    } catch (error) {
      res.status(500).json({
        message: `error al registar un progreso ${error.message}`,
      });
    }
  };

  getAll = async (req, res, next) => {
    try {
      const registroHabito = await this.registroHabito.findAll();
      if (registroHabito.lenght === 0) {
        return res
          .status(401)
          .json({ message: "No hay Registro Habito no hay" });
      }

      res.status(200).json(registroHabito);
    } catch (error) {
      res.status(500).json({
        message: `error al consultar los Registro Habito ${error.message}`,
      });
    }
  };

  update = async (req, res, next) => {
    try {
      const { id_registro } = req.params;
      const { valor } = req.body;

      if (!valor) {
        return res.status(400).json({ message: "Campos requeridos" });
      }

      const registroHabito = await this.registroHabito.findOne({
        where: { id_registro },
      });

      if (!registroHabito) {
        return res.status(404).json({ message: "Registro Habito no existe" });
      }

      registroHabito.valor = valor;
      await registroHabito.save();

      res.status(200).json(registroHabito);
    } catch (error) {
      res.status(500).json({
        message: `Error al actualizar el Registro Habito: ${error.message}`,
      });
    }
  };
  delete = async (req, res) => {
    try {
      const { id_registro } = req.params;
      const result = await this.registroHabito.destroy({
        where: { id_registro },
      });

      if (result === 0) {
        return res.status(404).json({
          message: `Error al eliminar registro, registro no encontrado`,
        });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: `Error al eliminar registro: ${error.message}`,
      });
    }
  };

  registroById = async (req, res, next) => {
    try {
      const { id_registro } = req.params;
      const registroHabito = await this.registroHabito.findOne({
        where: { id_registro },
      });
      if (!registroHabito) {
        return res.status(404).json({ message: "Registro Habito no existe" });
      }
      res.status(200).json(registroHabito);
    } catch (error) {
      res.status(500).json({
        message: `Error al buscar Registro Habito por id_registro: ${error.message}`,
      });
    }
  };
  registroByHabito = async (req, res, next) => {
    try {
      const { id_habito } = req.params;
      const registroHabito = await this.registroHabito.findAll({
        where: { id_habito },
      });
      if (!registroHabito) {
        return res.status(404).json({ message: "Registro Habito no existe" });
      }
      res.status(200).json(registroHabito);
    } catch (error) {
      res.status(500).json({
        message: `Error al buscar registro habito por id_habito: ${error.message}`,
      });
    }
  };
}
