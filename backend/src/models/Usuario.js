import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { createApp } from "../app.js";

export const Usuario = sequelize.define(
  "Usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    correo: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    contrasenia: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "Usuario",
    timestamps: false,
  }
);

//createApp({ Usuario: Usuario });
