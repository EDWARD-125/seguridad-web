import { Link } from 'react-router-dom';
import Carrusel from '../components/Carrusel';

const temas = [
  { path: '/criptografia', nombre: 'Criptografía', desc: 'Cifrado simétrico, asimétrico, hashing y más.', icono: '🔐' },
  { path: '/protocolos', nombre: 'Protocolos de Seguridad', desc: 'HTTPS, TLS, SSL, OAuth, JWT.', icono: '🌐' },
  { path: '/servidores', nombre: 'Seguridad en Servidores', desc: 'Hardening, firewalls, configuración segura.', icono: '🖥️' },
  { path: '/deteccion', nombre: 'Detección de Ataques', desc: 'IDS, IPS, SIEM, logs y alertas.', icono: '🔍' },
  { path: '/tecnicas', nombre: 'Técnicas de Ataque y Defensa', desc: 'XSS, SQLi, CSRF y cómo defenderse.', icono: '⚔️' },
];

function Home() {
  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          🔒 Seguridad en la Web
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Explora los principales temas de seguridad informática en aplicaciones web.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.2rem'
      }}>
        {temas.map((t) => (
          <Link key={t.path} to={t.path} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#1a1a2e',
              border: '1px solid #2a2a4a',
              borderRadius: '12px',
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'transform 0.2s, border-color 0.2s',
              height: '100%'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = '#60a5fa';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#2a2a4a';
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{t.icono}</div>
              <h3 style={{ color: '#ffffff', marginBottom: '0.5rem', fontSize: '1rem' }}>{t.nombre}</h3>
              <p style={{ fontSize: '0.85rem', color: '#7070a0', margin: 0 }}>{t.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Carrusel */}
      <div style={{ marginTop: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#ffffff' }}>
          🛡️ Seguridad en el mundo digital
        </h2>
        <Carrusel />
      </div>

    </div>
  );
}

export default Home;