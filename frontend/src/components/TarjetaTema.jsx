import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const demosPorTema = {
  'Cifrado Simétrico': {
    tipo: 'cifrado',
    descripcionDemo: 'Escribe un texto y mira cómo se "cifra" con una clave:',
  },
  'Cifrado Asimétrico': {
    tipo: 'info',
    dato: '🔑 Clave pública: cifra | 🗝️ Clave privada: descifra',
  },
  'HTTPS y TLS': {
    tipo: 'comparacion',
    sin: 'http://banco.com/login?pass=1234',
    con: 'https://banco.com 🔒 (datos cifrados)',
  },
  'JWT - JSON Web Tokens': {
    tipo: 'jwt',
    ejemplo: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiZWR3YXIifQ.xK9s2f',
  },
  'Hardening de Servidores': {
    tipo: 'checklist',
    items: ['✅ Deshabilitar puertos innecesarios', '✅ Actualizar paquetes', '✅ Configurar firewall', '❌ Root login activo'],
  },
  'Sistemas IDS/IPS': {
    tipo: 'alerta',
    alerta: '⚠️ Alerta: 5 intentos fallidos desde IP 192.168.1.105',
  },
  'Ataque XSS': {
    tipo: 'codigo',
    malo: '<script>alert("hackeado")</script>',
    bueno: '&lt;script&gt; → bloqueado ✅',
  },
  'SQL Injection': {
    tipo: 'codigo',
    malo: "' OR '1'='1",
    bueno: 'SELECT * WHERE id = ? → seguro ✅',
  },
};

function DemoInteractiva({ titulo }) {
  const [texto, setTexto] = useState('');
  const [expandido, setExpandido] = useState(false);
  const tituloNormalizado = titulo.toLowerCase();
  const demo = demosPorTema[titulo]
    || (tituloNormalizado.includes('asimetrico') ? demosPorTema['Cifrado AsimÃ©trico'] : null)
    || (tituloNormalizado.includes('simetrico') ? demosPorTema['Cifrado SimÃ©trico'] : null);

  if (!demo) return null;

  const cifrarSimple = (str) =>
    str.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 3)).join('');

  return (
    <div style={{ marginTop: '0.8rem' }}>
      <button
        onClick={(e) => { e.stopPropagation(); setExpandido(!expandido); }}
        style={{
          background: 'transparent',
          border: '1px solid var(--border)',
          color: 'var(--accent)',
          padding: '0.3rem 0.8rem',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.8rem',
          width: '100%'
        }}
      >
        {expandido ? '▲ Ocultar demo' : '▼ Ver demo interactiva'}
      </button>

      {expandido && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            marginTop: '0.8rem',
            background: 'var(--surface-3)',
            borderRadius: '8px',
            padding: '0.8rem',
            fontSize: '0.8rem'
          }}
        >
          {demo.tipo === 'cifrado' && (
            <>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{demo.descripcionDemo}</p>
              <input
                value={texto}
                onChange={e => setTexto(e.target.value)}
                placeholder="Escribe algo..."
                style={{
                  width: '100%',
                  padding: '0.4rem 0.6rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  fontSize: '0.8rem',
                  marginBottom: '0.5rem',
                  boxSizing: 'border-box'
                }}
              />
              {texto && (
                <div>
                  <span style={{ color: 'var(--text-soft)' }}>Cifrado: </span>
                  <span style={{ color: 'var(--accent)', fontFamily: 'monospace' }}>
                    {cifrarSimple(texto)}
                  </span>
                </div>
              )}
            </>
          )}

          {demo.tipo === 'info' && (
            <p style={{ color: '#a0c4ff', margin: 0 }}>{demo.dato}</p>
          )}

          {demo.tipo === 'comparacion' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ color: '#f87171', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                ❌ {demo.sin}
              </div>
              <div style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                ✅ {demo.con}
              </div>
            </div>
          )}

          {demo.tipo === 'jwt' && (
            <div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Ejemplo de token JWT:</p>
              <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', wordBreak: 'break-all' }}>
                <span style={{ color: '#f87171' }}>eyJhbGciOiJIUzI1NiJ9</span>.
                <span style={{ color: 'var(--accent)' }}>eyJ1c2VyIjoiZWR3YXIifQ</span>.
                <span style={{ color: '#4ade80' }}>xK9s2f</span>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-soft)' }}>
                <span style={{ color: '#f87171' }}>■</span> Header &nbsp;
                <span style={{ color: 'var(--accent)' }}>■</span> Payload &nbsp;
                <span style={{ color: '#4ade80' }}>■</span> Firma
              </div>
            </div>
          )}

          {demo.tipo === 'checklist' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {demo.items.map((item, i) => (
                <div key={i} style={{
                  color: item.startsWith('✅') ? '#4ade80' : '#f87171',
                  fontSize: '0.78rem'
                }}>
                  {item}
                </div>
              ))}
            </div>
          )}

          {demo.tipo === 'alerta' && (
            <div style={{
              background: '#2a1a1a',
              border: '1px solid #f87171',
              borderRadius: '6px',
              padding: '0.5rem 0.8rem',
              color: '#f87171',
              fontFamily: 'monospace',
              fontSize: '0.78rem'
            }}>
              {demo.alerta}
            </div>
          )}

          {demo.tipo === 'codigo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div>
                <span style={{ color: 'var(--text-soft)', fontSize: '0.75rem' }}>Ataque: </span>
                <span style={{ color: '#f87171', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {demo.malo}
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--text-soft)', fontSize: '0.75rem' }}>Defensa: </span>
                <span style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {demo.bueno}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TarjetaTema({ titulo, descripcion, id }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/tema/${id}`)}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '1.2rem',
        margin: '0.5rem',
        width: '280px',
        transition: 'transform 0.2s, border-color 0.2s',
        cursor: 'pointer'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'var(--accent)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '1rem' }}>{titulo}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
        {descripcion}
      </p>
      <DemoInteractiva titulo={titulo} />
    </div>
  );
}

export default TarjetaTema;

