import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Typing effect ─────────────────────────────────────────────────
const lineasCodigo = [
  '> Inicializando sistema de seguridad...',
  '> Cargando protocolos de cifrado AES-256...',
  '> Verificando certificados TLS...',
  '> Estableciendo conexión segura...',
  '> Sistema listo. Autentícate para continuar.',
];

function TypingEffect() {
  const [lineas, setLineas] = useState([]);
  const [lineaActual, setLineaActual] = useState(0);
  const [charActual, setCharActual] = useState(0);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    if (listo) return;
    if (lineaActual >= lineasCodigo.length) { setListo(true); return; }
    const linea = lineasCodigo[lineaActual];
    if (charActual < linea.length) {
      const t = setTimeout(() => {
        setLineas(prev => {
          const nuevas = [...prev];
          nuevas[lineaActual] = (nuevas[lineaActual] || '') + linea[charActual];
          return nuevas;
        });
        setCharActual(c => c + 1);
      }, 30);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLineaActual(l => l + 1); setCharActual(0); }, 200);
      return () => clearTimeout(t);
    }
  }, [lineaActual, charActual, listo]);

  return (
    <div style={{
      background: '#050510', borderRadius: '10px', padding: '1rem',
      fontFamily: 'monospace', fontSize: '0.78rem', marginBottom: '1.5rem',
      border: '1px solid #1a1a3a', minHeight: '100px'
    }}>
      {lineas.map((l, i) => (
        <div key={i} style={{
          color: i === lineas.length - 1 && !listo ? '#60a5fa' : l.includes('listo') ? '#4ade80' : '#a0a0c0',
          marginBottom: '0.3rem'
        }}>
          {l}
          {i === lineas.length - 1 && !listo && (
            <span style={{ animation: 'parpadeo 1s infinite', marginLeft: '2px' }}>█</span>
          )}
        </div>
      ))}
      {listo && <div style={{ color: '#4ade80' }}>{'>'} <span style={{ animation: 'parpadeo 1s infinite' }}>█</span></div>}
    </div>
  );
}

// ── Canvas partículas ─────────────────────────────────────────────
function FondoLogin() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particulas = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5, pulso: Math.random() * Math.PI * 2,
    }));

    const flujos = Array.from({ length: 15 }, () => ({
      origen: Math.floor(Math.random() * 40), destino: Math.floor(Math.random() * 40),
      progreso: Math.random(), vel: Math.random() * 0.006 + 0.003,
      color: Math.random() > 0.5 ? '#60a5fa' : '#4ade80',
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particulas.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulso += 0.03;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      for (let i = 0; i < particulas.length; i++) {
        for (let j = i + 1; j < particulas.length; j++) {
          const dx = particulas[i].x - particulas[j].x;
          const dy = particulas[i].y - particulas[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const op = (1 - dist / 80) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particulas[i].x, particulas[i].y);
            ctx.lineTo(particulas[i].x, particulas[j].y);
            ctx.lineTo(particulas[j].x, particulas[j].y);
            ctx.strokeStyle = `rgba(96,165,250,${op})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      particulas.forEach(p => {
        const pulso = 0.5 + 0.5 * Math.sin(p.pulso);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (1 + pulso * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${0.3 + pulso * 0.4})`; ctx.fill();
      });
      flujos.forEach(f => {
        f.progreso += f.vel;
        if (f.progreso >= 1) { f.progreso = 0; f.origen = f.destino; f.destino = Math.floor(Math.random() * 40); }
        const o = particulas[f.origen], d = particulas[f.destino];
        const mx = o.x, my = d.y;
        let px, py;
        if (f.progreso < 0.5) { const t = f.progreso * 2; px = o.x + (mx - o.x) * t; py = o.y + (my - o.y) * t; }
        else { const t = (f.progreso - 0.5) * 2; px = mx + (d.x - mx) * t; py = my + (d.y - my) * t; }
        ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = f.color; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      borderRadius: '20px', opacity: 0.6
    }} />
  );
}

// ── Escáner biométrico ────────────────────────────────────────────
function EscanerBiometrico({ activo, exito }) {
  return (
    <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 1.5rem' }}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="36" fill="none" stroke={exito ? '#4ade80' : '#60a5fa'} strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="40" cy="40" r="28" fill="none" stroke={exito ? '#4ade80' : '#60a5fa'} strokeWidth="0.5" strokeOpacity="0.2" />
        <circle cx="40" cy="40" r="36" fill="none" stroke={exito ? '#4ade80' : '#60a5fa'} strokeWidth="2"
          strokeDasharray="40 186"
          style={{ transformOrigin: '40px 40px', animation: activo ? 'girar 1.5s linear infinite' : 'none' }} />
        <text x="40" y="46" textAnchor="middle" fontSize="22" fill={exito ? '#4ade80' : '#60a5fa'}>
          {exito ? '✓' : '🔒'}
        </text>
        {[[8,8],[72,8],[8,72],[72,72]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x},${y}) rotate(${i*90})`}>
            <path d="M0,8 L0,0 L8,0" fill="none" stroke={exito ? '#4ade80' : '#60a5fa'} strokeWidth="1.5" />
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── Candado animado (intro) ───────────────────────────────────────
function CandadoIntro({ onAbrir }) {
  const [hover, setHover] = useState(false);
  const [abriendo, setAbriendo] = useState(false);
  const [abierto, setAbierto] = useState(false);

  const handleClick = () => {
    if (abriendo || abierto) return;
    setAbriendo(true);
    setTimeout(() => { setAbierto(true); setTimeout(onAbrir, 600); }, 800);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: abierto ? 'default' : 'pointer',
          display: 'inline-block',
          transition: 'transform 0.3s',
          transform: hover && !abriendo ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        <svg width="160" height="200" viewBox="0 0 160 200">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>

          {/* Arco del candado */}
          <g style={{
            transformOrigin: '80px 75px',
            transform: abierto ? 'rotate(-40deg) translateX(-20px)' : 'rotate(0deg)',
            transition: 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)'
          }}>
            <path
              d="M 45 75 L 45 50 A 35 35 0 0 1 115 50 L 115 75"
              fill="none"
              stroke={abriendo ? '#4ade80' : hover ? '#60a5fa' : '#3b82f6'}
              strokeWidth="14"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{ transition: 'stroke 0.3s' }}
            />
          </g>

          {/* Cuerpo del candado */}
          <rect x="20" y="75" width="120" height="100" rx="16"
            fill="url(#bodyGrad)"
            stroke={abriendo ? '#4ade80' : hover ? '#60a5fa' : '#3b82f6'}
            strokeWidth="2"
            filter="url(#glow)"
            style={{ transition: 'stroke 0.3s' }}
          />

          {/* Brillo superior */}
          <rect x="20" y="75" width="120" height="30" rx="16"
            fill="rgba(255,255,255,0.07)" />

          {/* Ojo de la cerradura */}
          <circle cx="80" cy="120" r="14"
            fill={abriendo ? '#4ade80' : '#1a1a3a'}
            stroke={abriendo ? '#4ade80' : '#60a5fa'}
            strokeWidth="2"
            style={{ transition: 'all 0.4s' }}
            filter="url(#glow)"
          />

          {/* Ranura */}
          <rect x="75" y="120" width="10" height="20" rx="5"
            fill={abriendo ? '#0a2a0a' : '#0f0f1a'}
            style={{ transition: 'fill 0.4s' }}
          />

          {/* Destellos en las esquinas */}
          {[[20,75],[140,75],[20,175],[140,175]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="3"
              fill={hover || abriendo ? '#60a5fa' : '#2a2a5a'}
              style={{ transition: 'fill 0.3s' }}
            />
          ))}

          {/* Texto hint */}
          {!abriendo && (
            <text x="80" y="195" textAnchor="middle" fontSize="11"
              fill={hover ? '#60a5fa' : '#3a3a6a'}
              fontFamily="monospace"
              style={{ transition: 'fill 0.3s' }}>
              {hover ? '[ CLICK PARA ABRIR ]' : '[ ACCESO RESTRINGIDO ]'}
            </text>
          )}
          {abriendo && (
            <text x="80" y="195" textAnchor="middle" fontSize="11"
              fill="#4ade80" fontFamily="monospace">
              [ ACCESO CONCEDIDO ]
            </text>
          )}
        </svg>
      </div>
    </div>
  );
}

// ── Pantalla de bienvenida ────────────────────────────────────────
function PantallaBienvenida({ onEntrar }) {
  const [fase, setFase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setFase(1), 300);
    const t2 = setTimeout(() => setFase(2), 1000);
    const t3 = setTimeout(() => setFase(3), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem', textAlign: 'center', position: 'relative'
    }}>

      {/* Bienvenida */}
      <div style={{
        opacity: fase >= 1 ? 1 : 0,
        transform: fase >= 1 ? 'translateY(0)' : 'translateY(-30px)',
        transition: 'all 0.8s cubic-bezier(0.34,1.56,0.64,1)',
        marginBottom: '0.5rem'
      }}>
        <p style={{
          color: '#60a5fa', fontFamily: 'monospace',
          fontSize: '0.9rem', letterSpacing: '4px',
          textTransform: 'uppercase', margin: 0
        }}>
          SISTEMA DE SEGURIDAD WEB v2.0
        </p>
      </div>

      {/* Título principal */}
      <div style={{
        opacity: fase >= 2 ? 1 : 0,
        transform: fase >= 2 ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'all 0.8s cubic-bezier(0.34,1.56,0.64,1)',
        marginBottom: '0.8rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          fontWeight: '700', margin: 0,
          background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #4ade80)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.2
        }}>
          Bienvenido a SegWeb
        </h1>
      </div>

      {/* Frase de enganche */}
      <div style={{
        opacity: fase >= 3 ? 1 : 0,
        transform: fase >= 3 ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'all 0.8s cubic-bezier(0.34,1.56,0.64,1)',
        marginBottom: '3rem'
      }}>
        <p style={{
          color: '#7070a0', fontSize: '1.1rem',
          maxWidth: '500px', margin: '0 auto',
          lineHeight: 1.6
        }}>
          En el mundo digital, la seguridad no es opcional.
          <br />
          <span style={{ color: '#a78bfa' }}>Es tu primera y última línea de defensa.</span>
        </p>
      </div>

      {/* Candado */}
      <div style={{
        opacity: fase >= 3 ? 1 : 0,
        transform: fase >= 3 ? 'scale(1)' : 'scale(0.5)',
        transition: 'all 0.8s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <CandadoIntro onAbrir={onEntrar} />
      </div>

    </div>
  );
}

// ── Botones sociales ──────────────────────────────────────────────
const redesSociales = [
  {
    nombre: 'GitHub', bg: '#24292e',
    icono: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    )
  },
  {
    nombre: 'Google', bg: '#4285F4',
    icono: (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" />
      </svg>
    )
  },
  {
    nombre: 'Microsoft', bg: '#00a4ef',
    icono: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
      </svg>
    )
  },
];

// ── Formulario de login ───────────────────────────────────────────
function FormularioLogin() {
  const navigate = useNavigate();
  const [modo, setModo] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', nombre: '' });
  const [escaneando, setEscaneando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.email || !form.password) { setError('Completa todos los campos.'); return; }
    setError(''); setEscaneando(true);
    setTimeout(() => { setExito(true); setTimeout(() => navigate('/'), 1500); }, 2000);
  };

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    background: '#0a0a1a', border: '1px solid #2a2a4a',
    borderRadius: '8px', color: '#e0e0e0', fontSize: '0.95rem',
    outline: 'none', marginBottom: '1rem', boxSizing: 'border-box',
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '2rem'
    }}>
      <div style={{
        position: 'relative', width: '100%', maxWidth: '440px',
        background: 'rgba(10,10,26,0.95)',
        border: '1px solid #2a2a4a', borderRadius: '20px', padding: '2.5rem',
        animation: 'aparecer 0.6s ease',
        boxShadow: '0 0 60px rgba(96,165,250,0.15)',
      }}>
        <FondoLogin />
        <div style={{ position: 'relative', zIndex: 1 }}>

          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>🔒</div>
            <h1 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.2rem' }}>SegWeb</h1>
            <p style={{ color: '#5050a0', fontSize: '0.8rem', margin: 0, fontFamily: 'monospace' }}>
              SISTEMA DE SEGURIDAD v2.0
            </p>
          </div>

          <TypingEffect />
          <EscanerBiometrico activo={escaneando} exito={exito} />

          <div style={{ display: 'flex', marginBottom: '1.5rem', background: '#0a0a1a', borderRadius: '8px', padding: '3px' }}>
            {['login', 'registro'].map(m => (
              <button key={m} onClick={() => { setModo(m); setError(''); setExito(false); setEscaneando(false); }}
                style={{
                  flex: 1, padding: '0.6rem', border: 'none', borderRadius: '6px',
                  background: modo === m ? '#1a1a3a' : 'transparent',
                  color: modo === m ? '#60a5fa' : '#5050a0',
                  cursor: 'pointer', fontSize: '0.9rem',
                  fontWeight: modo === m ? '600' : '400', transition: 'all 0.2s'
                }}>
                {m === 'login' ? '🔑 Iniciar sesión' : '📝 Registrarse'}
              </button>
            ))}
          </div>

          {modo === 'registro' && (
            <input name="nombre" value={form.nombre} onChange={handleChange}
              placeholder="Nombre completo" style={inputStyle} />
          )}
          <input name="email" value={form.email} onChange={handleChange}
            placeholder="Email" type="email" style={inputStyle} />
          <input name="password" value={form.password} onChange={handleChange}
            placeholder="Contraseña" type="password" style={inputStyle} />

          {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem' }}>⚠️ {error}</p>}
          {exito && <p style={{ color: '#4ade80', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>✅ Acceso concedido. Redirigiendo...</p>}

          <button onClick={handleSubmit} disabled={escaneando} style={{
            width: '100%', padding: '0.9rem', border: 'none',
            background: exito ? '#166534' : 'linear-gradient(135deg, #1d4ed8, #7c3aed)',
            color: '#fff', borderRadius: '10px', fontSize: '1rem',
            fontWeight: '600', cursor: escaneando ? 'not-allowed' : 'pointer',
            marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(96,165,250,0.3)'
          }}>
            {escaneando && !exito ? '🔍 Verificando identidad...' : exito ? '✅ Acceso concedido' : modo === 'login' ? '🔐 Iniciar sesión' : '🚀 Crear cuenta'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, height: '1px', background: '#1a1a3a' }} />
            <span style={{ color: '#3a3a6a', fontSize: '0.8rem', fontFamily: 'monospace' }}>OR_CONNECT_WITH</span>
            <div style={{ flex: 1, height: '1px', background: '#1a1a3a' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {redesSociales.map(red => (
              <button key={red.nombre} style={{
                flex: 1, padding: '0.7rem', background: red.bg, border: 'none',
                borderRadius: '8px', color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '0.4rem', fontSize: '0.8rem', transition: 'all 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {red.icono} {red.nombre}
              </button>
            ))}
          </div>

          <p style={{ textAlign: 'center', color: '#3a3a6a', fontSize: '0.75rem', fontFamily: 'monospace', margin: 0 }}>
            🔒 Conexión cifrada con TLS 1.3 · AES-256
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────
function Login() {
  const [fase, setFase] = useState('intro');

  return (
    <>
      <style>{`
        @keyframes parpadeo { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes girar { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes aparecer { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {fase === 'intro' && (
        <PantallaBienvenida onEntrar={() => setFase('login')} />
      )}

      {fase === 'login' && (
        <div style={{ animation: 'aparecer 0.8s ease' }}>
          <FormularioLogin />
        </div>
      )}
    </>
  );
}

export default Login;