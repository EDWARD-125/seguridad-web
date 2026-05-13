import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const tarjeta = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  padding: '1.2rem',
  boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
};

function Perfil() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(usuario);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let activo = true;

    const cargarPerfil = async () => {
      try {
        const res = await api.get('/auth/perfil');
        if (activo) setPerfil(res.data);
      } catch (err) {
        if (activo) setError(err.response?.data?.mensaje || 'No se pudo cargar el perfil');
      } finally {
        if (activo) setCargando(false);
      }
    };

    cargarPerfil();
    return () => {
      activo = false;
    };
  }, []);

  const nombre = perfil?.nombre || usuario?.nombre || 'Usuario';
  const email = perfil?.email || usuario?.email || 'Sin email';
  const rol = perfil?.rol || usuario?.rol || 'usuario';
  const proveedor = perfil?.proveedorAuth || usuario?.proveedorAuth || 'local';
  const inicial = nombre.charAt(0).toUpperCase();

  return (
    <main style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '2rem',
      minHeight: 'calc(100vh - 56px)'
    }}>
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 360px)',
        gap: '1rem',
        alignItems: 'stretch'
      }} className="perfil-grid">
        <div style={tarjeta}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 800
            }}>
              {inicial}
            </div>
            <div>
              <h1 style={{ marginBottom: '0.25rem' }}>{nombre}</h1>
              <p style={{ margin: 0, color: 'var(--accent)', overflowWrap: 'anywhere' }}>{email}</p>
            </div>
          </div>

          {cargando && <p style={{ color: 'var(--accent)' }}>Cargando informacion del perfil...</p>}
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.8rem',
            marginTop: '1rem'
          }}>
            <DatoPerfil titulo="Rol" valor={rol === 'admin' ? 'Administrador' : 'Usuario'} />
            <DatoPerfil titulo="Acceso" valor={proveedor === 'local' ? 'Correo y password' : proveedor} />
            <DatoPerfil titulo="Estado" valor="Sesion activa" />
          </div>
        </div>

        <aside style={tarjeta}>
          <h2 style={{ marginTop: 0 }}>Seguridad</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <AccionPerfil titulo="Configuracion" descripcion="Ajusta preferencias de tu cuenta." onClick={() => navigate('/configuracion')} />
            <AccionPerfil titulo="Estadisticas" descripcion="Revisa actividad y progreso local." onClick={() => navigate('/estadisticas')} />
            <AccionPerfil titulo="Mis quizzes" descripcion="Consulta tu progreso y resultados." onClick={() => navigate('/mis-quizzes')} />
          </div>
        </aside>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .perfil-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

function DatoPerfil({ titulo, valor }) {
  return (
    <div style={{
      background: 'var(--surface-3)',
      border: '1px solid var(--border-soft)',
      borderRadius: '8px',
      padding: '0.9rem'
    }}>
      <p style={{ margin: '0 0 0.35rem', color: 'var(--text-soft)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
        {titulo}
      </p>
      <strong style={{ color: 'var(--text-strong)', fontSize: '0.95rem' }}>{valor}</strong>
    </div>
  );
}

function AccionPerfil({ titulo, descripcion, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        background: 'var(--surface-3)',
        border: '1px solid var(--border-soft)',
        borderRadius: '8px',
        padding: '0.85rem',
        cursor: 'pointer'
      }}
    >
      <span style={{ display: 'block', color: 'var(--text-strong)', fontWeight: 700 }}>{titulo}</span>
      <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.84rem', marginTop: '0.25rem' }}>
        {descripcion}
      </span>
    </button>
  );
}

export default Perfil;
