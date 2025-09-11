import { createApp } from "./app.js";
import { Usuario } from "../src/models/Usuario.js";
import { Habito } from "./models/Habito.js";
createApp({ usuario: Usuario, habito: Habito });
