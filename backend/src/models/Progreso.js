import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { createApp } from "../app.js";

export const Progreso = sequelize.define(
  "Progreso",
  {
    id_progreso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_habito: {
      type: DataTypes.INTEGER,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
    },
    valor_inicial: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    valor_final: {
      type: DataTypes.FLOAT,
      defaultValue: null,
    },
    observaciones: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    tableName: "Progreso",
    timestamps: false,
  }
);
//createApp({ Progreso: Progreso });
