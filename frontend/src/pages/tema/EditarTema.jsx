import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const categorias = [
  { value: 'criptografia', label: '🔐 Criptografía' },
  { value: 'protocolos', label: '🌐 Protocolos' },
  { value: 'servidores', label: '🖥️ Servidores' },
  { value: 'deteccion', label: '🔍 Detección' },
  { value: 'tecnicas', label: '⚔️ Técnicas' },
];

function EditarTema() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    categoria: 'criptografia',
    contenido: ''
  });
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [exito, setExito] = useState('');
  const [error, setError] = useState('');
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/temas/${id}`)
      .then(res => {
        setForm({
          titulo: res.data.titulo,
          descripcion: res.data.descripcion,
          categoria: res.data.categoria,
          contenido: res.data.contenido || ''
        });
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGuardar = async () => {
    if (!form.titulo || !form.descripcion) {
      setError('El título y la descripción son obligatorios.');
      return;
    }
    setError('');
    setGuardando(true);
    try {
      await axios.put(`http://localhost:5000/api/temas/${id}`, form);
      setExito('✅ Tema actualizado correctamente.');
      setTimeout(() => navigate(-1), 1500);
    } catch {
      setError('Error al guardar los cambios.');
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async () => {
    setEliminando(true);
    try {
      await axios.delete(`http://localhost:5000/api/temas/${id}`);
      navigate('/');
    } catch {
      setError('Error al eliminar el tema.');
      setEliminando(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    background: '#12122a', border: '1px solid #2a2a4a',
    borderRadius: '8px', color: '#e0e0e0', fontSize: '0.95rem',
    outline: 'none', marginBottom: '1.2rem', boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block', color: '#60a5fa', fontSize: '0.85rem',
    textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem'
  };

  if (cargando) return <p style={{ padding: '2rem' }}>Cargando...</p>;

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '700px', margin: '0 auto' }}>

      <button onClick={() => navigate(-1)} style={{
        background: 'transparent', border: '1px solid #2a2a4a',
        color: '#60a5fa', padding: '0.5rem 1rem', borderRadius: '8px',
        cursor: 'pointer', marginBottom: '2rem', fontSize: '0.9rem'
      }}>← Volver</button>

      <div style={{
        background: '#1a1a2e', border: '1px solid #2a2a4a',
        borderRadius: '16px', padding: '2rem'
      }}>
        <h1 style={{ marginBottom: '0.5rem' }}>✏️ Editar Tema</h1>
        <p style={{ marginBottom: '2rem' }}>Modifica el contenido del tema.</p>

        <label style={labelStyle}>Título *</label>
        <input name="titulo" value={form.titulo} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Descripción *</label>
        <input name="descripcion" value={form.descripcion} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Categoría</label>
        <select name="categoria" value={form.categoria} onChange={handleChange} style={inputStyle}>
          {categorias.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <label style={labelStyle}>Contenido</label>
        <textarea name="contenido" value={form.contenido} onChange={handleChange}
          rows={5} style={{ ...inputStyle, resize: 'vertical' }} />

        {error && <p style={{ color: '#f87171', marginBottom: '1rem', fontSize: '0.9rem' }}>⚠️ {error}</p>}
        {exito && <p style={{ color: '#4ade80', marginBottom: '1rem', fontSize: '0.9rem' }}>{exito}</p>}

        {/* Botones */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <button onClick={handleGuardar} disabled={guardando} style={{
            background: '#1d4ed8', border: 'none', color: '#fff',
            padding: '0.8rem 2rem', borderRadius: '8px',
            cursor: guardando ? 'not-allowed' : 'pointer',
            fontSize: '1rem', opacity: guardando ? 0.7 : 1
          }}>
            {guardando ? 'Guardando...' : '💾 Guardar cambios'}
          </button>

          {!confirmarEliminar ? (
            <button onClick={() => setConfirmarEliminar(true)} style={{
              background: 'transparent', border: '1px solid #f87171',
              color: '#f87171', padding: '0.8rem 1.5rem',
              borderRadius: '8px', cursor: 'pointer', fontSize: '0.95rem'
            }}>
              🗑️ Eliminar tema
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ color: '#f87171', fontSize: '0.9rem' }}>¿Confirmar?</span>
              <button onClick={handleEliminar} disabled={eliminando} style={{
                background: '#f87171', border: 'none', color: '#fff',
                padding: '0.6rem 1rem', borderRadius: '8px',
                cursor: 'pointer', fontSize: '0.9rem'
              }}>
                {eliminando ? 'Eliminando...' : 'Sí, eliminar'}
              </button>
              <button onClick={() => setConfirmarEliminar(false)} style={{
                background: 'transparent', border: '1px solid #2a2a4a',
                color: '#a0a0c0', padding: '0.6rem 1rem',
                borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem'
              }}>
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditarTema;