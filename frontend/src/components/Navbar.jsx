import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { path: '/', label: '🏠 Inicio' },
  { path: '/criptografia', label: 'Criptografía' },
  { path: '/protocolos', label: 'Protocolos' },
  { path: '/servidores', label: 'Servidores' },
  { path: '/deteccion', label: 'Detección' },
  { path: '/tecnicas', label: 'Técnicas' },
  { path: '/buscar', label: '🔎 Buscar' },
  { path: '/nuevo', label: '➕ Nuevo' },
];

function Navbar() {
  const location = useLocation();
  const { usuario, logout, estaAutenticado } = useAuth();
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
          
          {estaAutenticado ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
              <span style={{ color: '#60a5fa', fontSize: '0.85rem' }}>
                👤 {usuario?.nombre}
              </span>
              <button onClick={logout} style={{
                background: 'transparent', border: '1px solid #f87171',
                color: '#f87171', padding: '0.3rem 0.8rem',
                borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem'
              }}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link to="/login" style={{
              color: '#60a5fa', textDecoration: 'none',
              border: '1px solid #60a5fa', padding: '0.3rem 0.8rem',
              borderRadius: '6px', fontSize: '0.85rem', marginLeft: 'auto'
            }}>
              🔑 Login
            </Link>
          )}
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
          
          {estaAutenticado ? (
            <>
              <span style={{ color: '#60a5fa', fontSize: '0.85rem', padding: '0.75rem 0', borderBottom: '1px solid #1e1e3a' }}>
                👤 {usuario?.nombre}
              </span>
              <button onClick={() => { logout(); setAbierto(false); }} style={{
                background: 'transparent', border: 'none',
                color: '#f87171', padding: '0.75rem 0',
                cursor: 'pointer', fontSize: '0.85rem',
                textAlign: 'left',
                borderBottom: '1px solid #1e1e3a'
              }}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setAbierto(false)} style={{
              color: '#60a5fa', textDecoration: 'none',
              padding: '0.75rem 0',
              fontSize: '0.85rem',
              borderBottom: '1px solid #1e1e3a'
            }}>
              🔑 Login
            </Link>
          )}
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