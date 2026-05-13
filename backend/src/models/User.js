const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  proveedorAuth: { type: String, enum: ['local', 'github', 'google', 'microsoft'], default: 'local' },
  proveedorId: { type: String },
  rol: { type: String, enum: ['admin', 'usuario'], default: 'usuario' },
  fechaCreacion: { type: Date, default: Date.now }
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.compararPassword = async function (password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
