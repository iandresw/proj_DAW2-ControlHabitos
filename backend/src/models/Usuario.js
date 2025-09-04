import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    nombres: {
      type: DataTypes.STRING,
    },
    apellidos: {
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
