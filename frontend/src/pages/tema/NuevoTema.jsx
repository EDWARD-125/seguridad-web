import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const categorias = [
  { value: 'criptografia', label: '🔐 Criptografía' },
  { value: 'protocolos', label: '🌐 Protocolos' },
  { value: 'servidores', label: '🖥️ Servidores' },
  { value: 'deteccion', label: '🔍 Detección' },
  { value: 'tecnicas', label: '⚔️ Técnicas' },
];

function NuevoTema() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    categoria: 'criptografia',
    contenido: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.titulo || !form.descripcion) {
      setError('El título y la descripción son obligatorios.');
      return;
    }
    setError('');
    setEnviando(true);
    try {
      await axios.post('http://localhost:5000/api/temas', form);
      setExito(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError('Error al guardar el tema.');
    } finally {
      setEnviando(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: '#12122a',
    border: '1px solid #2a2a4a',
    borderRadius: '8px',
    color: '#e0e0e0',
    fontSize: '0.95rem',
    outline: 'none',
    marginBottom: '1.2rem',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    color: '#60a5fa',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '0.4rem'
  };

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '700px', margin: '0 auto' }}>

      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'transparent',
          border: '1px solid #2a2a4a',
          color: '#60a5fa',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '2rem',
          fontSize: '0.9rem'
        }}
      >
        ← Volver
      </button>

      <div style={{
        background: '#1a1a2e',
        border: '1px solid #2a2a4a',
        borderRadius: '16px',
        padding: '2rem'
      }}>
        <h1 style={{ marginBottom: '0.5rem' }}>➕ Nuevo Tema</h1>
        <p style={{ marginBottom: '2rem' }}>Agrega un nuevo tema a la base de datos.</p>

        <label style={labelStyle}>Título *</label>
        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Ej: Cifrado AES"
          style={inputStyle}
        />

        <label style={labelStyle}>Descripción *</label>
        <input
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Breve descripción del tema"
          style={inputStyle}
        />

        <label style={labelStyle}>Categoría</label>
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          style={inputStyle}
        >
          {categorias.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <label style={labelStyle}>Contenido</label>
        <textarea
          name="contenido"
          value={form.contenido}
          onChange={handleChange}
          placeholder="Explicación detallada del tema..."
          rows={5}
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        {error && (
          <p style={{ color: '#f87171', marginBottom: '1rem', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </p>
        )}

        {exito && (
          <p style={{ color: '#4ade80', marginBottom: '1rem', fontSize: '0.9rem' }}>
            ✅ Tema guardado correctamente. Redirigiendo...
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={enviando}
          style={{
            background: '#1d4ed8',
            border: 'none',
            color: '#fff',
            padding: '0.8rem 2rem',
            borderRadius: '8px',
            cursor: enviando ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            opacity: enviando ? 0.7 : 1,
            transition: 'opacity 0.2s'
          }}
        >
          {enviando ? 'Guardando...' : 'Guardar tema'}
        </button>
      </div>
    </div>
  );
}

export default NuevoTema;