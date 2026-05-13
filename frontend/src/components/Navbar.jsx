import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { path: '/', label: 'Inicio' },
  { path: '/criptografia', label: 'Criptografia' },
  { path: '/protocolos', label: 'Protocolos' },
  { path: '/servidores', label: 'Servidores' },
  { path: '/deteccion', label: 'Deteccion' },
  { path: '/tecnicas', label: 'Tecnicas' },
  { path: '/buscar', label: 'Buscar' },
  { path: '/nuevo', label: 'Nuevo' },
];

function MenuUsuario({ usuario, logout }) {
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  const opciones = [
    { icono: 'P', label: 'Mi perfil', accion: () => navigate('/perfil') },
    { icono: 'C', label: 'Configuracion', accion: () => navigate('/configuracion') },
    { icono: 'E', label: 'Estadisticas', accion: () => navigate('/estadisticas') },
    { icono: 'Q', label: 'Mis quizzes', accion: () => navigate('/mis-quizzes') },
    { tipo: 'divider' },
    { icono: 'S', label: 'Cerrar sesion', accion: () => { logout(); navigate('/login'); }, color: 'var(--danger)' },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setAbierto(!abierto)}
        style={{
          background: abierto ? 'var(--surface-2)' : 'transparent',
          border: '1px solid var(--border)',
          color: 'var(--text)',
          padding: '0.4rem 0.8rem',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem',
          transition: 'all 0.2s'
        }}
      >
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8rem',
          fontWeight: '700',
          color: '#fff'
        }}>
          {usuario.nombre.charAt(0).toUpperCase()}
        </div>
        <span style={{ color: 'var(--accent)', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {usuario.nombre}
        </span>
        <span style={{ color: 'var(--text-soft)', fontSize: '0.7rem' }}>{abierto ? '▲' : '▼'}</span>
      </button>

      {abierto && (
        <>
          <div
            onClick={() => setAbierto(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 98 }}
          />

          <div style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            minWidth: '200px',
            zIndex: 99,
            boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
            overflow: 'hidden',
            animation: 'aparecer 0.2s ease'
          }}>
            <div style={{
              padding: '1rem',
              borderBottom: '1px solid var(--border-soft)',
              background: 'var(--surface-2)'
            }}>
              <p style={{ color: 'var(--text-strong)', fontWeight: '600', margin: 0, fontSize: '0.9rem' }}>
                {usuario.nombre}
              </p>
              <p style={{ color: 'var(--text-soft)', margin: 0, fontSize: '0.75rem' }}>
                {usuario.email}
              </p>
              <span style={{
                background: usuario.rol === 'admin' ? 'var(--accent-strong)' : 'var(--surface)',
                color: usuario.rol === 'admin' ? '#dbeafe' : 'var(--text-soft)',
                fontSize: '0.7rem',
                padding: '0.1rem 0.5rem',
                borderRadius: '10px',
                marginTop: '0.3rem',
                display: 'inline-block'
              }}>
                {usuario.rol === 'admin' ? 'Admin' : 'Usuario'}
              </span>
            </div>

            {opciones.map((op, i) => {
              if (op.tipo === 'divider') {
                return <div key={i} style={{ height: '1px', background: 'var(--border-soft)', margin: '0.3rem 0' }} />;
              }

              return (
                <button
                  key={i}
                  onClick={() => { op.accion(); setAbierto(false); }}
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    color: op.color || 'var(--text)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                    fontSize: '0.88rem',
                    textAlign: 'left',
                    transition: 'background 0.15s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ color: op.color || 'var(--accent)', fontWeight: 700 }}>{op.icono}</span>
                  <span>{op.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function Navbar() {
  const location = useLocation();
  const { usuario, logout, estaAutenticado } = useAuth();
  const [abierto, setAbierto] = useState(false);

  return (
    <nav style={{
      background: 'var(--nav-bg)',
      borderBottom: '1px solid var(--border)',
      boxShadow: 'var(--nav-shadow)',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <style>{`
        @keyframes aparecer { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px'
      }}>
        <span style={{ color: 'var(--text-strong)', fontWeight: '600', fontSize: '1rem' }}>
          SegWeb
        </span>

        <div className="nav-desktop" style={{
          display: 'flex',
          gap: '1.2rem',
          alignItems: 'center',
          flex: 1,
          marginLeft: '2rem'
        }}>
          {links.map(link => (
            <Link key={link.path} to={link.path} style={{
              color: location.pathname === link.path ? 'var(--accent)' : 'var(--text-muted)',
              textDecoration: 'none',
              fontWeight: location.pathname === link.path ? '600' : '400',
              borderBottom: location.pathname === link.path ? '2px solid var(--accent)' : '2px solid transparent',
              paddingBottom: '2px',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s'
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ marginLeft: 'auto' }}>
          {estaAutenticado && usuario ? (
            <MenuUsuario usuario={usuario} logout={logout} />
          ) : (
            <Link to="/login" style={{
              color: 'var(--accent)',
              textDecoration: 'none',
              border: '1px solid var(--accent)',
              padding: '0.3rem 0.8rem',
              borderRadius: '6px',
              fontSize: '0.85rem'
            }}>
              Login
            </Link>
          )}
        </div>

        <button
          onClick={() => setAbierto(!abierto)}
          className="nav-mobile-btn"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'none',
            marginLeft: '1rem'
          }}
        >
          {abierto ? 'x' : '='}
        </button>
      </div>

      {abierto && (
        <div className="nav-mobile-menu" style={{
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '0.5rem'
        }}>
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setAbierto(false)}
              style={{
                color: location.pathname === link.path ? 'var(--accent)' : 'var(--text-muted)',
                textDecoration: 'none',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border-soft)',
                fontSize: '0.95rem'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
