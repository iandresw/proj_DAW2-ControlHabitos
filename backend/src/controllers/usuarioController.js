import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config({ path: "./src/.env" }); //
config();
export class UsuarioController {
  constructor(usuario) {
    this.usuario = usuario;
  }

  login = async (req, res, next) => {
    try {
      const { correo, contrasenia_plana } = req.body;
      if (!correo || !contrasenia_plana) {
        return res.status(400).json({ message: "Campos requeridos" });
      }
      const usuario = await this.usuario.findOne({
        where: { correo: correo },
      });

      if (!usuario) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      // Comparar la contraseña proporcionada con la contraseña encriptada
      const isMatch = await bcrypt.compare(
        contrasenia_plana,
        usuario.contrasenia
      );
      console.log(isMatch);
      if (!isMatch) {
        return res.status(401).json({ mensaje: "Credenciales inválidas" });
      }
      const token = await jwt.sign(
        {
          correo: usuario.correo,
          nombre: usuario.nombre,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      usuario.contrasenia = "";
      const usuario_res = {};
      res.status(200).json({ token: token, usuario: usuario });
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const { nombre, correo, contrasenia_plana } = req.body;
      if (!nombre || !correo || !contrasenia_plana) {
        return res.status(400).json({ message: "Campos requeridos" });
      }
      const usuario = await this.usuario.findOne({
        where: { correo: correo },
      });
      if (usuario !== null) {
        return res.status(401).json({ message: "Usuario ya existe" });
      }
      const saltRound = 10;
      const contrasenia = await bcrypt.hash(contrasenia_plana, saltRound);

      const new_usuario = await this.usuario.create({
        nombre,
        correo,
        contrasenia,
        fecha_registro: new Date().toISOString(),
      });

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
      res.status(200).json({
        token: token,
        usuario: {
          correo: new_usuario.correo,
          nombre: new_usuario.nombre,
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `error al registar Usuario ${error.message}` });
    }
  };

  getAll = async (req, res, next) => {
    try {
      const usuarios = await this.usuario.findAll();

      if (usuarios.length === 0) {
        return res.status(404).json({ message: "No hay usuarios registrados" });
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
      const { id_usuario } = req.params;
      const { nombre, correo, estado } = req.body;

      if (!nombre || !correo || estado === undefined) {
        return res.status(400).json({ message: "Campos requeridos" });
      }

      const usuario = await this.usuario.findOne({ where: { id_usuario } });

      if (!usuario) {
        return res.status(404).json({ message: "Usuario no existe" });
      }

      usuario.nombre = nombre;
      usuario.correo = correo;
      usuario.estado = estado;

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
      const { id_usuario } = req.params;
      const result = await this.usuario.destroy({
        where: { id_usuario: id_usuario },
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
      const { id_usuario } = req.params;
      const usuario = await this.usuario.findOne({ where: { id_usuario } });
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
