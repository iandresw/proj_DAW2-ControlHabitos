const User = require('../models/User');


exports.registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    console.log("Intentnado registrar a:", email);

    const nuevoUsuario = await User.create({ nombre, email, password });
    res.status(201).json({ message: 'Usuario creado exitosamente', userId: nuevoUsuario.id });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};


exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ where: { email: email } });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    
    if (usuario.password !== password) {
      return res.status(401).json({ message: 'Contrasena incorrecta' });
    }

    const infoUsuario = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
    }

    res.status(200).json({ message: 'Login exitoso', usuario: infoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesion', error: error.message });
  }
};