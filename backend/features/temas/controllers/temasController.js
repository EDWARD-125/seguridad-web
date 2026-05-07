const Tema = require('../models/Tema');

// Obtener todos los temas
const getTemas = async (req, res) => {
  try {
    const temas = await Tema.find();
    res.json(temas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener temas' });
  }
};

// Obtener temas por categoría
const getTemasPorCategoria = async (req, res) => {
  try {
    const temas = await Tema.find({ categoria: req.params.categoria });
    res.json(temas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener temas' });
  }
};

// Crear tema
const crearTema = async (req, res) => {
  try {
    const nuevoTema = new Tema(req.body);
    const temaGuardado = await nuevoTema.save();
    res.status(201).json(temaGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear tema', error: error.message });
  }
};

const getTemaById = async (req, res) => {
  try {
    const tema = await Tema.findById(req.params.id);
    if (!tema) return res.status(404).json({ mensaje: 'Tema no encontrado' });
    res.json(tema);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tema' });
  }
};

const editarTema = async (req, res) => {
  try {
    const tema = await Tema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tema) return res.status(404).json({ mensaje: 'Tema no encontrado' });
    res.json(tema);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al editar tema' });
  }
};

const eliminarTema = async (req, res) => {
  try {
    await Tema.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Tema eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar tema' });
  }
};

module.exports = { getTemas, getTemasPorCategoria, crearTema, getTemaById, editarTema, eliminarTema };