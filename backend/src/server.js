import { createApp } from "./app.js";

import { Categoria } from "./models/Categoria.js";
import { Habito } from "./models/Habito.js";
import { Progreso } from "./models/Progreso.js";
import { RegistoHabito } from "./models/RegistroHabito.js";
import { Usuario } from "./models/Usuario.js";
createApp(Categoria, Habito, Progreso, RegistoHabito, Usuario);
