// backend/src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200', // Ajusta según el puerto donde corre tu frontend
  methods: ['GET', 'POST'],
  credentials: true}));

// Conectar a PostgreSQL usando Sequelize
const sequelize = new Sequelize('reloj', 'postgres', 'L1nk3d', {
  host: 'localhost',
  dialect: 'postgres'
});

// Definir el modelo de Usuario
const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
//loooooooool
// Sincronizar el modelo con la base de datos
sequelize.sync();

// Ruta de Registro
app.post('/register', async (req, res) => {
  console.log('Datos recibidos del frontend:', req.body);
  const { username, password } = req.body;

  // Verifica que se hayan proporcionado tanto el nombre de usuario como la contraseña
  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan datos: username y password son requeridos' });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Crear el nuevo usuario en la base de datos
    const user = await User.create({ username, password: hashedPassword });

    // Enviar respuesta exitosa con el usuario creado
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: { id: user.id, username: user.username } });
  } catch (error) {
    // Manejo de errores: enviar un mensaje de error estructurado
    res.status(400).json({ error: 'Error al registrar el usuario: ' + error.message });
  }
});

// Ruta de Inicio de Sesión
// Ruta de Inicio de Sesión
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, 'tuSecreto', { expiresIn: '1h' });
    res.json({ message: 'Inicio de sesión exitoso', token });
    this.message = 'Inicio de sesión exitoso';
  } else {
    res.status(401).send('Credenciales incorrectas');
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
