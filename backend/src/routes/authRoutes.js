const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const generarToken = (usuario) => jwt.sign(
  { id: usuario._id, rol: usuario.rol, nombre: usuario.nombre, email: usuario.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Registro
router.post('/registro', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: 'El email ya está registrado' });
    const usuario = new User({ nombre, email, password });
    await usuario.save();
    const token = generarToken(usuario);
    res.status(201).json({
      token,
      usuario: { id: usuario._id, nombre, email, rol: usuario.rol }
    });
  } catch (error) {
    console.error('ERROR REGISTRO:', error.message);
    res.status(500).json({ mensaje: 'Error al registrar usuario', detalle: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    const valido = await usuario.compararPassword(password);
    if (!valido) return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    const token = generarToken(usuario);
    res.json({
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, email, rol: usuario.rol }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
});

// Perfil (protegido)
router.get('/perfil', protect, async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).select('-password');
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener perfil' });
  }
});

// Logout (el frontend elimina el token)
router.post('/logout', protect, (req, res) => {
  res.json({ mensaje: 'Sesión cerrada correctamente' });
});

module.exports = router;