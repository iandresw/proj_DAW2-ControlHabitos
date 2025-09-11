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
      type: DataTypes.STRING(50),
    },
    descripcion: {
      type: DataTypes.STRING(100),
    },
    unidad_medida: {
      type: DataTypes.STRING(20),
    },
    meta: {
      type: DataTypes.FLOAT,
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
    },
    duracion: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "Habito",
    timestamps: false,
  }
);
//createApp({ Habito: Habito });
