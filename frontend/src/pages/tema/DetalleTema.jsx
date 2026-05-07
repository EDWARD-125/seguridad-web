import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Tooltip from '../../components/Tooltip';

// ─── Mini juego: Cifrado Simétrico ───────────────────────────────
function JuegoCifrado() {
  const [texto, setTexto] = useState('');
  const [clave, setClave] = useState(3);
  const cifrar = (str, k) => str.split('').map(c => {
    if (c.match(/[a-z]/)) return String.fromCharCode(((c.charCodeAt(0) - 97 + k) % 26) + 97);
    if (c.match(/[A-Z]/)) return String.fromCharCode(((c.charCodeAt(0) - 65 + k) % 26) + 65);
    return c;
  }).join('');

  return (
    <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '1.5rem', marginTop: '1.5rem' }}>
      <h3 style={{ color: '#60a5fa', marginBottom: '1rem' }}>🎮 Mini juego — Cifrado César</h3>
      <p style={{ color: '#a0a0c0', fontSize: '0.9rem', marginBottom: '1rem' }}>
        El cifrado César desplaza cada letra del alfabeto N posiciones. Es el ancestro del cifrado simétrico moderno.
      </p>
      <label style={{ color: '#7070a0', fontSize: '0.85rem' }}>Texto a cifrar:</label>
      <input
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Escribe un mensaje..."
        style={{
          width: '100%', padding: '0.6rem', background: '#1a1a2e',
          border: '1px solid #2a2a4a', borderRadius: '8px', color: '#e0e0e0',
          fontSize: '0.9rem', marginBottom: '1rem', marginTop: '0.3rem', boxSizing: 'border-box'
        }}
      />
      <label style={{ color: '#7070a0', fontSize: '0.85rem' }}>Clave (desplazamiento): {clave}</label>
      <input type="range" min="1" max="25" value={clave}
        onChange={e => setClave(Number(e.target.value))}
        style={{ width: '100%', marginBottom: '1rem', marginTop: '0.3rem' }}
      />
      {texto && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: '#1a1a2e', borderRadius: '8px', padding: '1rem' }}>
            <p style={{ color: '#7070a0', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Original:</p>
            <p style={{ color: '#e0e0e0', fontFamily: 'monospace', margin: 0 }}>{texto}</p>
          </div>
          <div style={{ background: '#1a1a2e', borderRadius: '8px', padding: '1rem' }}>
            <p style={{ color: '#60a5fa', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Cifrado:</p>
            <p style={{ color: '#60a5fa', fontFamily: 'monospace', margin: 0 }}>{cifrar(texto, clave)}</p>
          </div>
          <div style={{ background: '#1a1a2e', borderRadius: '8px', padding: '1rem' }}>
            <p style={{ color: '#4ade80', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Descifrado (misma clave):</p>
            <p style={{ color: '#4ade80', fontFamily: 'monospace', margin: 0 }}>{cifrar(cifrar(texto, clave), 26 - clave)}</p>
          </div>
          <div style={{ background: '#1a1a2e', borderRadius: '8px', padding: '1rem' }}>
            <p style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Con clave incorrecta (+1):</p>
            <p style={{ color: '#f87171', fontFamily: 'monospace', margin: 0 }}>{cifrar(cifrar(texto, clave), 26 - clave + 1)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Diagrama: Cifrado Asimétrico ────────────────────────────────
function DiagramaAsimetrico() {
  const [paso, setPaso] = useState(0);
  const pasos = [
    { titulo: '1. Generación de claves', desc: 'Bob genera un par de claves: una pública (comparte con todos) y una privada (solo él la tiene).', color: '#60a5fa' },
    { titulo: '2. Alice cifra el mensaje', desc: 'Alice usa la clave PÚBLICA de Bob para cifrar el mensaje. Solo la clave privada de Bob puede descifrarlo.', color: '#fbbf24' },
    { titulo: '3. Bob descifra', desc: 'Bob usa su clave PRIVADA para descifrar el mensaje. Nadie más puede hacerlo, ni siquiera Alice.', color: '#4ade80' },
    { titulo: '4. Firma digital', desc: 'Bob puede firmar con su clave PRIVADA. Cualquiera con su clave pública puede verificar que fue él quien firmó.', color: '#a78bfa' },
  ];

  return (
    <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '1.5rem', marginTop: '1.5rem' }}>
      <h3 style={{ color: '#60a5fa', marginBottom: '1rem' }}>🔑 ¿Cómo funciona el cifrado asimétrico?</h3>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {pasos.map((p, i) => (
          <button key={i} onClick={() => setPaso(i)} style={{
            background: paso === i ? p.color : '#1a1a2e',
            border: `1px solid ${p.color}`,
            color: paso === i ? '#0f0f1a' : p.color,
            padding: '0.4rem 0.8rem', borderRadius: '20px',
            cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600'
          }}>
            Paso {i + 1}
          </button>
        ))}
      </div>
      <div style={{
        background: '#1a1a2e', borderRadius: '10px', padding: '1.5rem',
        borderLeft: `4px solid ${pasos[paso].color}`
      }}>
        <h4 style={{ color: pasos[paso].color, marginBottom: '0.5rem' }}>{pasos[paso].titulo}</h4>
        <p style={{ color: '#c0c0d8', margin: 0, lineHeight: '1.7' }}>{pasos[paso].desc}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <button onClick={() => setPaso(p => Math.max(0, p - 1))}
          disabled={paso === 0}
          style={{ background: 'transparent', border: '1px solid #2a2a4a', color: '#60a5fa', padding: '0.4rem 1rem', borderRadius: '8px', cursor: paso === 0 ? 'not-allowed' : 'pointer', opacity: paso === 0 ? 0.4 : 1 }}>
          ← Anterior
        </button>
        <button onClick={() => setPaso(p => Math.min(pasos.length - 1, p + 1))}
          disabled={paso === pasos.length - 1}
          style={{ background: '#1d4ed8', border: 'none', color: '#fff', padding: '0.4rem 1rem', borderRadius: '8px', cursor: paso === pasos.length - 1 ? 'not-allowed' : 'pointer', opacity: paso === pasos.length - 1 ? 0.4 : 1 }}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}

// ─── Mini juego: Hashing ─────────────────────────────────────────
function JuegoHashing() {
  const [input, setInput] = useState('');
  const hashSimple = str => {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    return Math.abs(h).toString(16).padStart(8, '0').toUpperCase();
  };

  return (
    <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '1.5rem', marginTop: '1.5rem' }}>
      <h3 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>🔢 Experimenta con Hashing</h3>
      <p style={{ color: '#a0a0c0', fontSize: '0.9rem', marginBottom: '1rem' }}>
        Una función hash convierte cualquier texto en un valor fijo. Un solo cambio en el texto cambia completamente el hash.
      </p>
      <input value={input} onChange={e => setInput(e.target.value)}
        placeholder="Escribe algo para hashear..."
        style={{ width: '100%', padding: '0.6rem', background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '8px', color: '#e0e0e0', fontSize: '0.9rem', marginBottom: '1rem', boxSizing: 'border-box' }}
      />
      {input && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[input, input + ' ', input.toUpperCase(), input + '!'].map((v, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#1a1a2e', borderRadius: '8px', padding: '0.6rem 1rem' }}>
              <span style={{ color: '#a0a0c0', fontFamily: 'monospace', fontSize: '0.85rem', minWidth: '160px' }}>"{v}"</span>
              <span style={{ color: '#fbbf24', fontFamily: 'monospace', fontSize: '0.85rem' }}>→ {hashSimple(v)}</span>
            </div>
          ))}
          <p style={{ color: '#7070a0', fontSize: '0.8rem', marginTop: '0.5rem' }}>
            💡 Nota: un espacio o mayúscula cambia completamente el hash.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Mini juego: XSS ─────────────────────────────────────────────
function JuegoXSS() {
  const [input, setInput] = useState('');
  const [modo, setModo] = useState('vulnerable');
  const sanitizar = str => str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const esAtaque = str => str.toLowerCase().includes('<script') || str.toLowerCase().includes('onerror') || str.toLowerCase().includes('javascript:');

  return (
    <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '1.5rem', marginTop: '1.5rem' }}>
      <h3 style={{ color: '#f87171', marginBottom: '0.5rem' }}>⚠️ Simulador XSS</h3>
      <p style={{ color: '#a0a0c0', fontSize: '0.9rem', marginBottom: '1rem' }}>
        Prueba qué pasa cuando un sitio NO sanitiza los inputs. Escribe algo como: {`<script>alert('hack')</script>`}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {['vulnerable', 'protegido'].map(m => (
          <button key={m} onClick={() => setModo(m)} style={{
            background: modo === m ? (m === 'vulnerable' ? '#f87171' : '#4ade80') : '#1a1a2e',
            border: `1px solid ${m === 'vulnerable' ? '#f87171' : '#4ade80'}`,
            color: modo === m ? '#0f0f1a' : (m === 'vulnerable' ? '#f87171' : '#4ade80'),
            padding: '0.4rem 1rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600'
          }}>
            {m === 'vulnerable' ? '❌ Sin protección' : '✅ Con sanitización'}
          </button>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)}
        placeholder={`<script>alert('hackeado')</script>`}
        style={{ width: '100%', padding: '0.6rem', background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '8px', color: '#e0e0e0', fontSize: '0.9rem', marginBottom: '1rem', boxSizing: 'border-box' }}
      />
      {input && (
        <div style={{ background: '#1a1a2e', borderRadius: '8px', padding: '1rem' }}>
          <p style={{ color: '#7070a0', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Resultado en el navegador:</p>
          {modo === 'vulnerable' && esAtaque(input) ? (
            <div style={{ background: '#2a0a0a', border: '1px solid #f87171', borderRadius: '6px', padding: '0.8rem' }}>
              <p style={{ color: '#f87171', margin: 0, fontSize: '0.9rem' }}>
                💀 ¡Ataque ejecutado! El script correría en el navegador de la víctima.
              </p>
              <p style={{ color: '#f87171', fontFamily: 'monospace', fontSize: '0.8rem', marginTop: '0.3rem' }}>{input}</p>
            </div>
          ) : (
            <div style={{ background: '#0a2a0a', border: '1px solid #4ade80', borderRadius: '6px', padding: '0.8rem' }}>
              <p style={{ color: '#4ade80', margin: 0, fontSize: '0.9rem' }}>
                ✅ Texto seguro: {modo === 'protegido' ? sanitizar(input) : input}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Mini juego: SQL Injection ────────────────────────────────────
function JuegoSQLi() {
  const [query, setQuery] = useState('');
  const ataques = ["' OR '1'='1", "' DROP TABLE users;--", "' UNION SELECT * FROM passwords;--", "admin'--"];
  const esAtaque = q => ataques.some(a => q.includes(a.substring(0, 8)));

  return (
    <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '1.5rem', marginTop: '1.5rem' }}>
      <h3 style={{ color: '#f87171', marginBottom: '0.5rem' }}>💉 Simulador SQL Injection</h3>
      <p style={{ color: '#a0a0c0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
        Simula cómo un atacante manipula consultas SQL. Prueba escribir: <span style={{ color: '#f87171', fontFamily: 'monospace' }}>' OR '1'='1</span>
      </p>
      <div style={{ background: '#1a1a2e', borderRadius: '8px', padding: '0.8rem', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#a0a0c0' }}>
        SELECT * FROM users WHERE username = '<span style={{ color: '#fbbf24' }}>{query || 'input'}</span>'
      </div>
      <input value={query} onChange={e => setQuery(e.target.value)}
        placeholder="Escribe un usuario..."
        style={{ width: '100%', padding: '0.6rem', background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '8px', color: '#e0e0e0', fontSize: '0.9rem', marginBottom: '1rem', boxSizing: 'border-box' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        <p style={{ color: '#7070a0', fontSize: '0.8rem', margin: 0 }}>Ataques comunes — click para probar:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {ataques.map((a, i) => (
            <button key={i} onClick={() => setQuery(a)} style={{
              background: '#2a0a0a', border: '1px solid #f87171', color: '#f87171',
              padding: '0.3rem 0.6rem', borderRadius: '6px', cursor: 'pointer',
              fontSize: '0.75rem', fontFamily: 'monospace'
            }}>{a}</button>
          ))}
        </div>
      </div>
      {query && (
        <div style={{ background: esAtaque(query) ? '#2a0a0a' : '#0a2a0a', border: `1px solid ${esAtaque(query) ? '#f87171' : '#4ade80'}`, borderRadius: '8px', padding: '1rem' }}>
          {esAtaque(query) ? (
            <>
              <p style={{ color: '#f87171', fontWeight: '600', marginBottom: '0.3rem' }}>💀 ¡Inyección exitosa!</p>
              <p style={{ color: '#f87171', fontSize: '0.85rem', margin: 0 }}>La consulta retorna TODOS los usuarios o ejecuta comandos maliciosos.</p>
              <p style={{ color: '#fbbf24', fontSize: '0.8rem', marginTop: '0.5rem' }}>🛡️ Defensa: usar prepared statements — SELECT * FROM users WHERE username = ?</p>
            </>
          ) : (
            <p style={{ color: '#4ade80', margin: 0 }}>✅ Consulta normal — sin inyección detectada.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Diagrama HTTPS ───────────────────────────────────────────────
function DiagramaHTTPS() {
  const [paso, setPaso] = useState(0);
  const pasos = [
    { titulo: 'Cliente saluda al servidor', desc: 'El navegador envía un "Client Hello" con las versiones TLS soportadas y algoritmos de cifrado disponibles.', icono: '👋' },
    { titulo: 'Servidor responde', desc: 'El servidor elige el algoritmo, envía su certificado SSL/TLS con su clave pública.', icono: '📜' },
    { titulo: 'Verificación del certificado', desc: 'El navegador verifica que el certificado sea válido y esté firmado por una Autoridad Certificadora (CA) de confianza.', icono: '✅' },
    { titulo: 'Intercambio de clave', desc: 'Se genera una clave de sesión compartida usando criptografía asimétrica. A partir de aquí todo es cifrado simétrico.', icono: '🔑' },
    { titulo: 'Comunicación segura', desc: 'Toda la comunicación está cifrada con la clave de sesión. Ni siquiera el ISP puede ver el contenido.', icono: '🔒' },
  ];

  return (
    <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '1.5rem', marginTop: '1.5rem' }}>
      <h3 style={{ color: '#4ade80', marginBottom: '1rem' }}>🌐 ¿Cómo funciona el handshake TLS?</h3>
      <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {pasos.map((_, i) => (
          <div key={i} onClick={() => setPaso(i)} style={{
            width: '32px', height: '32px', borderRadius: '50%', display: 'flex',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            background: paso === i ? '#4ade80' : '#1a1a2e',
            border: '1px solid #4ade80',
            color: paso === i ? '#0f0f1a' : '#4ade80',
            fontWeight: '600', fontSize: '0.85rem'
          }}>{i + 1}</div>
        ))}
      </div>
      <div style={{ background: '#1a1a2e', borderRadius: '10px', padding: '1.5rem', borderLeft: '4px solid #4ade80' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{pasos[paso].icono}</div>
        <h4 style={{ color: '#4ade80', marginBottom: '0.5rem' }}>{pasos[paso].titulo}</h4>
        <p style={{ color: '#c0c0d8', margin: 0, lineHeight: '1.7' }}>{pasos[paso].desc}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <button onClick={() => setPaso(p => Math.max(0, p - 1))} disabled={paso === 0}
          style={{ background: 'transparent', border: '1px solid #2a2a4a', color: '#4ade80', padding: '0.4rem 1rem', borderRadius: '8px', cursor: paso === 0 ? 'not-allowed' : 'pointer', opacity: paso === 0 ? 0.4 : 1 }}>
          ← Anterior
        </button>
        <button onClick={() => setPaso(p => Math.min(pasos.length - 1, p + 1))} disabled={paso === pasos.length - 1}
          style={{ background: '#166534', border: 'none', color: '#4ade80', padding: '0.4rem 1rem', borderRadius: '8px', cursor: paso === pasos.length - 1 ? 'not-allowed' : 'pointer', opacity: paso === pasos.length - 1 ? 0.4 : 1 }}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}

function JuegoJWT() {
  const [usuario, setUsuario] = useState('');
  const [rol, setRol] = useState('user');
  const btoa64 = str => btoa(unescape(encodeURIComponent(str)));

  const header = btoa64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = usuario ? btoa64(JSON.stringify({ user: usuario, rol, exp: '24h', iat: Date.now() })) : '';
  const firma = usuario ? btoa64(`${header}.${payload}.secret`).substring(0, 10) : '';

  return (
    <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '1.5rem', marginTop: '1.5rem' }}>
      <h3 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>🎫 Generador de JWT</h3>
      <p style={{ color: '#a0a0c0', fontSize: '0.9rem', marginBottom: '1rem' }}>
        Un JWT tiene 3 partes separadas por puntos. Cada parte está codificada en Base64.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ color: '#7070a0', fontSize: '0.85rem' }}>Usuario:</label>
          <input value={usuario} onChange={e => setUsuario(e.target.value)}
            placeholder="Ej: edward"
            style={{ width: '100%', padding: '0.6rem', background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '8px', color: '#e0e0e0', fontSize: '0.9rem', marginTop: '0.3rem', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ color: '#7070a0', fontSize: '0.85rem' }}>Rol:</label>
          <select value={rol} onChange={e => setRol(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '8px', color: '#e0e0e0', fontSize: '0.9rem', marginTop: '0.3rem', boxSizing: 'border-box' }}>
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="moderator">moderator</option>
          </select>
        </div>
      </div>
      {usuario && (
        <>
          <div style={{ background: '#1a1a2e', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.8rem' }}>
            <span style={{ color: '#f87171' }}>{header}</span>
            <span style={{ color: '#e0e0e0' }}>.</span>
            <span style={{ color: '#60a5fa' }}>{payload}</span>
            <span style={{ color: '#e0e0e0' }}>.</span>
            <span style={{ color: '#4ade80' }}>{firma}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            {[
              { label: 'Header', color: '#f87171', contenido: JSON.stringify({ alg: 'HS256', typ: 'JWT' }, null, 2) },
              { label: 'Payload', color: '#60a5fa', contenido: JSON.stringify({ user: usuario, rol, exp: '24h' }, null, 2) },
              { label: 'Firma', color: '#4ade80', contenido: 'HMACSHA256(\n  base64(header) +\n  base64(payload),\n  secret\n)' },
            ].map((p, i) => (
              <div key={i} style={{ background: '#12122a', borderRadius: '8px', padding: '0.8rem', borderTop: `3px solid ${p.color}` }}>
                <p style={{ color: p.color, fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>{p.label}</p>
                <pre style={{ color: '#c0c0d8', fontSize: '0.72rem', margin: 0, whiteSpace: 'pre-wrap' }}>{p.contenido}</pre>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function JuegoHardening() {
  const [configuraciones, setConfiguraciones] = useState([
    { id: 1, texto: 'Deshabilitar login como root via SSH', activo: false, impacto: 'alto', descripcion: 'Evita ataques de fuerza bruta directos a la cuenta más privilegiada.' },
    { id: 2, texto: 'Cerrar puertos no utilizados', activo: false, impacto: 'alto', descripcion: 'Reduce la superficie de ataque eliminando puntos de entrada innecesarios.' },
    { id: 3, texto: 'Activar firewall (UFW/iptables)', activo: false, impacto: 'alto', descripcion: 'Filtra tráfico no autorizado antes de que llegue a los servicios.' },
    { id: 4, texto: 'Aplicar actualizaciones de seguridad', activo: false, impacto: 'alto', descripcion: 'Corrige vulnerabilidades conocidas que los atacantes explotan activamente.' },
    { id: 5, texto: 'Configurar autenticación por llaves SSH', activo: false, impacto: 'medio', descripcion: 'Las llaves criptográficas son mucho más seguras que contraseñas.' },
    { id: 6, texto: 'Habilitar fail2ban', activo: false, impacto: 'medio', descripcion: 'Bloquea IPs automáticamente tras múltiples intentos fallidos de login.' },
    { id: 7, texto: 'Configurar logs y monitoreo', activo: false, impacto: 'medio', descripcion: 'Permite detectar actividad sospechosa y responder a incidentes.' },
    { id: 8, texto: 'Deshabilitar servicios innecesarios', activo: false, impacto: 'bajo', descripcion: 'Cada servicio activo es un potencial vector de ataque.' },
  ]);

  const toggle = id => setConfiguraciones(prev =>
    prev.map(c => c.id === id ? { ...c, activo: !c.activo } : c)
  );

  const activos = configuraciones.filter(c => c.activo).length;
  const porcentaje = Math.round((activos / configuraciones.length) * 100);
  const colorBarra = porcentaje < 40 ? '#f87171' : porcentaje < 70 ? '#fbbf24' : '#4ade80';
  const colorImpacto = { alto: '#f87171', medio: '#fbbf24', bajo: '#60a5fa' };

  return (
    <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '1.5rem', marginTop: '1.5rem' }}>
      <h3 style={{ color: '#60a5fa', marginBottom: '0.5rem' }}>🛡️ Simulador de Hardening</h3>
      <p style={{ color: '#a0a0c0', fontSize: '0.9rem', marginBottom: '1rem' }}>
        Activa las configuraciones de seguridad y observa cómo mejora el nivel de protección del servidor.
      </p>

      {/* Barra de progreso */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ color: '#a0a0c0', fontSize: '0.85rem' }}>Nivel de seguridad</span>
          <span style={{ color: colorBarra, fontWeight: '600' }}>{porcentaje}%</span>
        </div>
        <div style={{ background: '#1a1a2e', borderRadius: '999px', height: '10px' }}>
          <div style={{ background: colorBarra, borderRadius: '999px', height: '10px', width: `${porcentaje}%`, transition: 'width 0.4s, background 0.4s' }} />
        </div>
        <p style={{ color: colorBarra, fontSize: '0.8rem', marginTop: '0.4rem' }}>
          {porcentaje < 40 ? '⚠️ Servidor muy vulnerable' : porcentaje < 70 ? '🔶 Protección parcial' : '✅ Servidor bien protegido'}
        </p>
      </div>

      {/* Lista de configuraciones */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {configuraciones.map(c => (
          <div key={c.id}
            onClick={() => toggle(c.id)}
            style={{
              background: c.activo ? '#0a2a0a' : '#1a1a2e',
              border: `1px solid ${c.activo ? '#4ade80' : '#2a2a4a'}`,
              borderRadius: '8px', padding: '0.8rem 1rem',
              cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'flex-start', gap: '0.8rem'
            }}
          >
            <span style={{ fontSize: '1.2rem', marginTop: '0.1rem' }}>{c.activo ? '✅' : '⬜'}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span style={{ color: c.activo ? '#4ade80' : '#c0c0d8', fontSize: '0.9rem' }}>{c.texto}</span>
                <span style={{
                  background: '#12122a', border: `1px solid ${colorImpacto[c.impacto]}`,
                  color: colorImpacto[c.impacto], padding: '0.1rem 0.5rem',
                  borderRadius: '10px', fontSize: '0.7rem'
                }}>{c.impacto}</span>
              </div>
              <p style={{ color: '#7070a0', fontSize: '0.8rem', margin: 0 }}>{c.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimuladorIDS() {
  const [corriendo, setCorriendo] = useState(false);
  const [logs, setLogs] = useState([]);
  const [bloqueados, setBloqueados] = useState([]);

  const eventos = [
    { tipo: 'normal', msg: 'GET /index.html desde 192.168.1.10', color: '#4ade80' },
    { tipo: 'normal', msg: 'POST /api/login desde 192.168.1.15', color: '#4ade80' },
    { tipo: 'sospechoso', msg: '⚠️ 5 intentos fallidos desde 10.0.0.5', color: '#fbbf24' },
    { tipo: 'ataque', msg: '🚨 SQL Injection detectado desde 185.220.101.1', color: '#f87171' },
    { tipo: 'normal', msg: 'GET /productos desde 192.168.1.22', color: '#4ade80' },
    { tipo: 'ataque', msg: '🚨 Escaneo de puertos desde 45.33.32.156', color: '#f87171' },
    { tipo: 'sospechoso', msg: '⚠️ Tráfico inusual en puerto 8080', color: '#fbbf24' },
    { tipo: 'ataque', msg: '🚨 XSS detectado en parámetro "nombre"', color: '#f87171' },
    { tipo: 'normal', msg: 'GET /api/productos desde 192.168.1.8', color: '#4ade80' },
    { tipo: 'ataque', msg: '🚨 Fuerza bruta SSH desde 198.51.100.2', color: '#f87171' },
  ];

  const iniciar = () => {
    setCorriendo(true);
    setLogs([]);
    setBloqueados([]);
    let i = 0;
    const intervalo = setInterval(() => {
      if (i >= eventos.length) { clearInterval(intervalo); setCorriendo(false); return; }
      const evento = eventos[i];
      setLogs(prev => [...prev, { ...evento, id: i, tiempo: new Date().toLocaleTimeString() }]);
      if (evento.tipo === 'ataque') {
        const ip = evento.msg.match(/\d+\.\d+\.\d+\.\d+/)?.[0];
        if (ip) setBloqueados(prev => [...new Set([...prev, ip])]);
      }
      i++;
    }, 800);
  };

  return (
    <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '1.5rem', marginTop: '1.5rem' }}>
      <h3 style={{ color: '#60a5fa', marginBottom: '0.5rem' }}>🖥️ Simulador IDS/IPS en tiempo real</h3>
      <p style={{ color: '#a0a0c0', fontSize: '0.9rem', marginBottom: '1rem' }}>
        Observa cómo un IDS monitorea el tráfico y un IPS bloquea automáticamente las amenazas.
      </p>
      <button onClick={iniciar} disabled={corriendo}
        style={{ background: corriendo ? '#1a2a1a' : '#166534', border: 'none', color: '#4ade80', padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: corriendo ? 'not-allowed' : 'pointer', marginBottom: '1rem', fontSize: '0.9rem' }}>
        {corriendo ? '⏳ Monitoreando...' : '▶ Iniciar simulación'}
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <p style={{ color: '#60a5fa', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            📋 Log de eventos
          </p>
          <div style={{ background: '#0a0a14', borderRadius: '8px', padding: '0.8rem', height: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {logs.length === 0 && <p style={{ color: '#3a3a5a', fontSize: '0.8rem', fontFamily: 'monospace' }}>Esperando eventos...</p>}
            {logs.map(log => (
              <div key={log.id} style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: log.color }}>
                <span style={{ color: '#3a3a5a' }}>[{log.tiempo}] </span>{log.msg}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ color: '#f87171', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            🚫 IPs bloqueadas por IPS
          </p>
          <div style={{ background: '#0a0a14', borderRadius: '8px', padding: '0.8rem', height: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {bloqueados.length === 0 && <p style={{ color: '#3a3a5a', fontSize: '0.8rem', fontFamily: 'monospace' }}>Sin bloqueos aún...</p>}
            {bloqueados.map((ip, i) => (
              <div key={i} style={{ background: '#2a0a0a', border: '1px solid #f87171', borderRadius: '6px', padding: '0.4rem 0.8rem', fontFamily: 'monospace', fontSize: '0.8rem', color: '#f87171' }}>
                🚫 {ip} — BLOQUEADA
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mapa de contenido especial por tema ─────────────────────────
const contenidoEspecial = {
  'Cifrado Simétrico': <JuegoCifrado />,
  'Cifrado Asimétrico': <DiagramaAsimetrico />,
  'HTTPS y TLS': <DiagramaHTTPS />,
  'JWT - JSON Web Tokens': <JuegoJWT />,
  'Hardening de Servidores': <JuegoHardening />,
  'Sistemas IDS/IPS': <SimuladorIDS />,
  'Ataque XSS': <JuegoXSS />,
  'SQL Injection': <JuegoSQLi />,
};

const categoriaColores = {
  criptografia: '🔐',
  protocolos: '🌐',
  servidores: '🖥️',
  deteccion: '🔍',
  tecnicas: '⚔️',
};

// ─── Componente principal ─────────────────────────────────────────
function DetalleTema() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tema, setTema] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/temas/${id}`)
      .then(res => { setTema(res.data); setCargando(false); })
      .catch(() => setCargando(false));
  }, [id]);

  const handleEliminar = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este tema? Esta acción no se puede deshacer.')) {
      return;
    }
    setEliminando(true);
    try {
      await axios.delete(`http://localhost:5000/api/temas/${id}`);
      alert('Tema eliminado correctamente');
      navigate('/');
    } catch (error) {
      alert('Error al eliminar el tema');
      console.error(error);
    } finally {
      setEliminando(false);
    }
  };

  if (cargando) return <p style={{ padding: '2rem' }}>Cargando...</p>;
  if (!tema) return <p style={{ padding: '2rem' }}>Tema no encontrado.</p>;

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'transparent', border: '1px solid #2a2a4a',
          color: '#60a5fa', padding: '0.5rem 1rem', borderRadius: '8px',
          cursor: 'pointer', fontSize: '0.9rem'
        }}>← Volver</button>
        <button onClick={() => navigate(`/editar/${tema._id}`)} style={{
          background: 'transparent', border: '1px solid #fbbf24',
          color: '#fbbf24', padding: '0.5rem 1rem', borderRadius: '8px',
          cursor: 'pointer', marginBottom: '2rem', marginLeft: '0.8rem', fontSize: '0.9rem'
        }}>
          ✏️ Editar
        </button>
        <button onClick={handleEliminar} disabled={eliminando} style={{
          background: '#dc2626', border: '1px solid #dc2626',
          color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '8px',
          cursor: eliminando ? 'not-allowed' : 'pointer', fontSize: '0.9rem',
          fontWeight: '600', opacity: eliminando ? 0.6 : 1,
          boxShadow: eliminando ? 'none' : '0 2px 4px rgba(220, 38, 38, 0.3)'
        }}>🗑️ {eliminando ? 'Eliminando...' : 'Eliminar Tema'}</button>
      </div>

      {/* Encabezado */}
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>
          {categoriaColores[tema.categoria] || '📄'}
        </div>
        <h1 style={{ marginBottom: '0.5rem' }}>{tema.titulo}</h1>
        <span style={{
          background: '#12122a', border: '1px solid #2a2a4a', color: '#60a5fa',
          padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '1px'
        }}>{tema.categoria}</span>
      </div>

      {/* Descripción */}
      <div style={{ background: '#12122a', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ color: '#60a5fa', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem' }}>
          Descripción
        </h2>
        <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.7' }}>{tema.descripcion}</p>
      </div>

      {/* Contenido */}
      {tema.contenido && (
        <div style={{ background: '#12122a', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#60a5fa', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem' }}>
            Contenido
          </h2>
          <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.7' }}>{tema.contenido}</p>
        </div>
      )}

      {/* Contenido especial interactivo */}
      {contenidoEspecial[tema.titulo] && (
        <div style={{ background: '#12122a', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#60a5fa', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem' }}>
            🎮 Aprende jugando
          </h2>
          {contenidoEspecial[tema.titulo]}
        </div>
      )}

    </div>
  );
}

export default DetalleTema;