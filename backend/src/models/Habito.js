import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { createApp } from "../app.js";

export const Habito = sequelize.define(
  "Habito",
  {
    id_habito: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
    },
    id_categoria: {
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    unidad_medida: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    meta: {
      type: DataTypes.FLOAT,
      defaultValue: true,
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      defaultValue: true,
    },
    duracion: {
      type: DataTypes.FLOAT,
      defaultValue: true,
    },
  },
  {
    tableName: "Habito",
    timestamps: false,
  }
);
//createApp({ Habito: Habito });
