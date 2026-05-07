const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  categoria: {
    type: String,
    enum: ['criptografia', 'protocolos', 'servidores', 'deteccion', 'tecnicas'],
    required: true
  },
  pregunta: { type: String, required: true },
  opciones: [{ type: String }],
  respuestaCorrecta: { type: Number, required: true },
  explicacion: { type: String }
});

module.exports = mongoose.model('Quiz', QuizSchema);