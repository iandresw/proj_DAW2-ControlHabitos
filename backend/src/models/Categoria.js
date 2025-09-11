import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { createApp } from "../app.js";

export const Categoria = sequelize.define(
  "Categoria",
  {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
    },
    descripcion: {
      type: DataTypes.STRING(100),
    },
  },
  {
    tableName: "Categoria",
    timestamps: false,
  }
);
//createApp({ Categoria: Categoria });
