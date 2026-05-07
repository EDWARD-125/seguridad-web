const mongoose = require('mongoose');

const TemaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  categoria: {
    type: String,
    enum: [
      'criptografia',
      'protocolos',
      'servidores',
      'deteccion',
      'tecnicas'
    ],
    required: true
  },
  contenido: { type: String },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tema', TemaSchema);