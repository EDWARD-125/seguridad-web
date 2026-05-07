import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { path: '/', label: '🏠 Inicio' },
  { path: '/criptografia', label: 'Criptografía' },
  { path: '/protocolos', label: 'Protocolos' },
  { path: '/servidores', label: 'Servidores' },
  { path: '/deteccion', label: 'Detección' },
  { path: '/tecnicas', label: 'Técnicas' },
  { path: '/buscar', label: '🔎 Buscar' },
  { path: '/nuevo', label: '➕ Nuevo' },
  { path: '/login', label: '🔑 Login' },
];

function Navbar() {
  const location = useLocation();
  const [abierto, setAbierto] = useState(false);

  return (
    <nav style={{
      background: '#12122a',
      borderBottom: '1px solid #2a2a4a',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Barra principal */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px'
      }}>
        <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '1rem' }}>
          🔒 SegWeb
        </span>

        {/* Links en desktop */}
        <div style={{
          display: 'flex',
          gap: '1.2rem',
          alignItems: 'center',
          flexWrap: 'nowrap'
        }} className="nav-desktop">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: location.pathname === link.path ? '#60a5fa' : '#a0aec0',
                textDecoration: 'none',
                fontWeight: location.pathname === link.path ? '600' : '400',
                borderBottom: location.pathname === link.path ? '2px solid #60a5fa' : '2px solid transparent',
                paddingBottom: '2px',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Botón hamburguesa en móvil */}
        <button
          onClick={() => setAbierto(!abierto)}
          className="nav-mobile-btn"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#a0aec0',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'none'
          }}
        >
          {abierto ? '✕' : '☰'}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {abierto && (
        <div className="nav-mobile-menu" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          paddingBottom: '0.5rem'
        }}>
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setAbierto(false)}
              style={{
                color: location.pathname === link.path ? '#60a5fa' : '#a0aec0',
                textDecoration: 'none',
                padding: '0.75rem 0',
                borderBottom: '1px solid #1e1e3a',
                fontSize: '0.95rem',
                fontWeight: location.pathname === link.path ? '600' : '400'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Estilos responsive */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;