import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { createApp } from "../app.js";

export const RegistoHabito = sequelize.define(
  "RegistoHabito",
  {
    id_registro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_habito: {
      type: DataTypes.INTEGER,
    },
    fecha: {
      type: DataTypes.DATE,
    },
    realizado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    valor: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "RegistoHabito",
    timestamps: false,
  }
);
//createApp({ RegistoHabito: RegistoHabito });
