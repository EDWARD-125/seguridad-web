const Quiz = require('../../../models/Quiz');

const getQuizPorCategoria = async (req, res) => {
  try {
    const preguntas = await Quiz.find({ categoria: req.params.categoria });
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener quiz' });
  }
};

const crearPregunta = async (req, res) => {
  try {
    const nueva = new Quiz(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear pregunta', error: error.message });
  }
};

module.exports = { getQuizPorCategoria, crearPregunta };