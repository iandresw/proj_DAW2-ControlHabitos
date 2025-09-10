const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes'); 

const app = express();


app.use(express.json()); 


app.use('/api/auth', authRoutes); 

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});