import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const categoriaIconos = {
  criptografia: '🔐',
  protocolos: '🌐',
  servidores: '🖥️',
  deteccion: '🔍',
  tecnicas: '⚔️',
};

function Buscador() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [buscado, setBuscado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const buscar = async () => {
    if (!query.trim()) return;
    setCargando(true);
    setBuscado(false);
    try {
      const res = await axios.get('http://localhost:5000/api/temas');
      const filtrados = res.data.filter(t =>
        t.titulo.toLowerCase().includes(query.toLowerCase()) ||
        t.descripcion.toLowerCase().includes(query.toLowerCase()) ||
        t.categoria.toLowerCase().includes(query.toLowerCase())
      );
      setResultados(filtrados);
      setBuscado(true);
    } catch (err) {
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') buscar();
  };

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' }}>

      <h1 style={{ marginBottom: '0.5rem' }}>🔎 Buscador</h1>
      <p style={{ marginBottom: '2rem' }}>Busca temas por título, descripción o categoría.</p>

      {/* Input de búsqueda */}
      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem' }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ej: cifrado, XSS, firewall..."
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--text)',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
        <button
          onClick={buscar}
          style={{
            background: '#1d4ed8',
            border: 'none',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Buscar
        </button>
      </div>

      {/* Resultados */}
      {cargando && <p>Buscando...</p>}

      {buscado && !cargando && (
        <>
          <p style={{ marginBottom: '1rem', color: 'var(--text-soft)', fontSize: '0.9rem' }}>
            {resultados.length} resultado{resultados.length !== 1 ? 's' : ''} para "{query}"
          </p>

          {resultados.length === 0 ? (
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              color: 'var(--text-soft)'
            }}>
              No se encontraron temas. Intenta con otra palabra.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {resultados.map(t => (
                <div
                  key={t._id}
                  onClick={() => navigate(`/tema/${t._id}`)}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '1.2rem 1.5rem',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, transform 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ fontSize: '1.8rem' }}>
                    {categoriaIconos[t.categoria] || '📄'}
                  </span>
                  <div>
                    <h3 style={{ color: 'var(--text-strong)', fontSize: '1rem', marginBottom: '0.3rem' }}>
                      {t.titulo}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)', margin: 0 }}>
                      {t.descripcion}
                    </p>
                  </div>
                  <span style={{
                    marginLeft: 'auto',
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border)',
                    color: 'var(--accent)',
                    padding: '0.2rem 0.7rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    whiteSpace: 'nowrap'
                  }}>
                    {t.categoria}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Buscador;
