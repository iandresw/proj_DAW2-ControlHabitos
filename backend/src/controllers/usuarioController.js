import jwt from "jsonwebtoken";
import { config } from "dotenv";

config({ path: "./src/.env" }); //
config();
export class UsuarioController {
  constructor(usuario) {
    this.usuario = usuario;
  }

  login = async (req, res, next) => {
    try {
      const { correo, contrasenia } = req.body;
      if (!correo || !contrasenia) {
        return res.status(400).json({ message: "Campos requeridos" });
      }
      const usuario = await this.usuario.findOne({
        where: { correo: correo, contrasenia: contrasenia },
      });

      if (!usuario) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }
      const usuario_res = {};
      res.status(200).json({ token: token, usuario: usuario_res });
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const { nombre, correo, contrasenia } = req.body;
      if (!nombre || !correo || !contrasenia) {
        return res.status(400).json({ message: "Campos requeridos" });
      }
      const usuario = await this.usuario.findOne({
        where: { correo: correo },
      });
      if (usuario !== null) {
        return res.status(401).json({ message: "Usuario ya existe" });
      }
      const satlRound = "M1";

      const new_usuario = await this.usuario.create(
        (nombre = nombre),
        (correo = correo),
        (contrasenia = contrasenia)
      );
      const token = await jwt.sign(
        {
          correo: new_usuario.correo,
          nombre: new_usuario.nombre,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ token: token, usuario: new_usuario });
    } catch (error) {
      res
        .status(500)
        .json({ message: `error al registar Usuario ${error.message}` });
    }
  };

  getAll = async (req, res, next) => {
    try {
      const usuarios = await this.usuario.findAll();
      if (usuarios !== null) {
        return res.status(401).json({ message: "Usuarios no hay" });
      }

      res.status(200).json(usuarios);
    } catch (error) {
      res
        .status(500)
        .json({ message: `error al consultar los Usuarios ${error.message}` });
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nombre, correo, contrasenia } = req.body;

      if (!nombre || !correo || !contrasenia) {
        return res.status(400).json({ message: "Campos requeridos" });
      }

      const usuario = await this.usuario.findOne({ where: { id } });

      if (!usuario) {
        return res.status(404).json({ message: "Usuario no existe" });
      }

      usuario.nombre = nombre;
      usuario.correo = correo;
      usuario.contrasenia = contrasenia;

      await usuario.save();

      res.status(200).json(usuario);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error al actualizar el usuario: ${error.message}` });
    }
  };
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.usuario.destroy({
        where: { id_usuario: id },
      });

      if (result === 0) {
        return res.status(404).json({
          message: `Error al eliminar usuario, usuario no encontrado`,
        });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: `Error al eliminar usuario: ${error.message}`,
      });
    }
  };

  usuarioById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const usuario = await this.usuario.findOne({ where: { id } });
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no existe" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error al buscar usuario por id: ${error.message}` });
    }
  };
}
