import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const categoriaInfo = {
  criptografia: { icono: '🔐', color: '#60a5fa', nombre: 'Criptografía' },
  protocolos: { icono: '🌐', color: '#4ade80', nombre: 'Protocolos' },
  servidores: { icono: '🖥️', color: '#a78bfa', nombre: 'Servidores' },
  deteccion: { icono: '🔍', color: '#fbbf24', nombre: 'Detección' },
  tecnicas: { icono: '⚔️', color: '#f87171', nombre: 'Técnicas' },
};

function Resultado({ correctas, total, categoria, onReintentar }) {
  const porcentaje = Math.round((correctas / total) * 100);
  const info = categoriaInfo[categoria];
  const nivel = porcentaje >= 80 ? { texto: '🏆 Experto', color: '#4ade80' }
    : porcentaje >= 60 ? { texto: '👍 Intermedio', color: '#fbbf24' }
    : { texto: '📚 Sigue estudiando', color: '#f87171' };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{info.icono}</div>
      <h2 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Quiz completado</h2>
      <p style={{ color: '#a0a0c0', marginBottom: '2rem' }}>{info.nombre}</p>

      {/* Círculo de puntaje */}
      <div style={{
        width: '140px', height: '140px', borderRadius: '50%',
        border: `6px solid ${nivel.color}`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 2rem', background: 'var(--surface)'
      }}>
        <span style={{ fontSize: '2rem', fontWeight: '700', color: nivel.color }}>{porcentaje}%</span>
        <span style={{ fontSize: '0.8rem', color: '#7070a0' }}>{correctas}/{total}</span>
      </div>

      <div style={{
        background: 'var(--surface)', border: `1px solid ${nivel.color}`,
        borderRadius: '12px', padding: '1rem', marginBottom: '2rem',
        display: 'inline-block'
      }}>
        <span style={{ color: nivel.color, fontWeight: '600', fontSize: '1.1rem' }}>{nivel.texto}</span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={onReintentar} style={{
          background: '#1d4ed8', border: 'none', color: '#fff',
          padding: '0.8rem 1.5rem', borderRadius: '8px',
          cursor: 'pointer', fontSize: '0.95rem'
        }}>
          🔄 Reintentar
        </button>
      </div>
    </div>
  );
}

function Quiz() {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [preguntas, setPreguntas] = useState([]);
  const [actual, setActual] = useState(0);
  const [seleccionada, setSeleccionada] = useState(null);
  const [confirmada, setConfirmada] = useState(false);
  const [correctas, setCorrectas] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [cargando, setCargando] = useState(true);

  const info = categoriaInfo[categoria] || categoriaInfo.criptografia;

  const cargar = () => {
    setCargando(true);
    setActual(0);
    setSeleccionada(null);
    setConfirmada(false);
    setCorrectas(0);
    setTerminado(false);
    axios.get(`http://localhost:5000/api/quiz/${categoria}`)
      .then(res => { setPreguntas(res.data); setCargando(false); })
      .catch(() => setCargando(false));
  };

  useEffect(() => { cargar(); }, [categoria]);

  useEffect(() => {
    if (!terminado || preguntas.length === 0) return;

    const key = `segweb_quiz_resultados_${usuario?.id || usuario?.email || 'anonimo'}`;
    const porcentaje = Math.round((correctas / preguntas.length) * 100);
    const nuevoResultado = {
      categoria,
      correctas,
      total: preguntas.length,
      porcentaje,
      fecha: new Date().toISOString()
    };

    try {
      const anteriores = JSON.parse(localStorage.getItem(key)) || [];
      localStorage.setItem(key, JSON.stringify([...anteriores, nuevoResultado].slice(-50)));
    } catch {
      localStorage.setItem(key, JSON.stringify([nuevoResultado]));
    }
  }, [terminado, preguntas.length, correctas, categoria, usuario]);

  const confirmar = () => {
    if (seleccionada === null) return;
    setConfirmada(true);
    if (seleccionada === preguntas[actual].respuestaCorrecta) {
      setCorrectas(c => c + 1);
    }
  };

  const siguiente = () => {
    if (actual + 1 >= preguntas.length) {
      setTerminado(true);
    } else {
      setActual(a => a + 1);
      setSeleccionada(null);
      setConfirmada(false);
    }
  };

  if (cargando) return <p style={{ padding: '2rem' }}>Cargando quiz...</p>;
  if (preguntas.length === 0) return <p style={{ padding: '2rem' }}>No hay preguntas para esta categoría.</p>;

  const pregunta = preguntas[actual];
  const progreso = Math.round(((actual) / preguntas.length) * 100);

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '750px', margin: '0 auto' }}>

      <button onClick={() => navigate(-1)} style={{
        background: 'transparent', border: '1px solid var(--border)',
        color: 'var(--accent)', padding: '0.5rem 1rem', borderRadius: '8px',
        cursor: 'pointer', marginBottom: '2rem', fontSize: '0.9rem'
      }}>← Volver</button>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: '16px', padding: '2rem'
      }}>

        {terminado ? (
          <Resultado
            correctas={correctas}
            total={preguntas.length}
            categoria={categoria}
            onReintentar={cargar}
          />
        ) : (
          <>
            {/* Encabezado */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2rem' }}>{info.icono}</span>
              <div style={{ flex: 1 }}>
                <h2 style={{ color: 'var(--text-strong)', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                  Quiz — {info.nombre}
                </h2>
                <p style={{ color: 'var(--text-soft)', fontSize: '0.85rem', margin: 0 }}>
                  Pregunta {actual + 1} de {preguntas.length}
                </p>
              </div>
              <span style={{
                background: 'var(--surface-3)', border: `1px solid ${info.color}`,
                color: info.color, padding: '0.3rem 0.8rem',
                borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600'
              }}>
                {correctas} ✓
              </span>
            </div>

            {/* Barra de progreso */}
            <div style={{ background: 'var(--surface-3)', borderRadius: '999px', height: '6px', marginBottom: '2rem' }}>
              <div style={{
                background: info.color, borderRadius: '999px',
                height: '6px', width: `${progreso}%`, transition: 'width 0.4s'
              }} />
            </div>

            {/* Pregunta */}
            <div style={{
              background: 'var(--surface-3)', borderRadius: '12px',
              padding: '1.5rem', marginBottom: '1.5rem'
            }}>
              <p style={{ color: 'var(--text-strong)', fontSize: '1.05rem', margin: 0, lineHeight: '1.6' }}>
                {pregunta.pregunta}
              </p>
            </div>

            {/* Opciones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {pregunta.opciones.map((opcion, i) => {
                let borderColor = 'var(--border)';
                let bgColor = 'var(--surface-3)';
                let textColor = 'var(--text)';

                if (confirmada) {
                  if (i === pregunta.respuestaCorrecta) {
                    borderColor = '#4ade80';
                    bgColor = '#0a2a0a';
                    textColor = '#4ade80';
                  } else if (i === seleccionada) {
                    borderColor = '#f87171';
                    bgColor = '#2a0a0a';
                    textColor = '#f87171';
                  }
                } else if (i === seleccionada) {
                  borderColor = info.color;
                  bgColor = 'var(--surface)';
                  textColor = 'var(--text-strong)';
                }

                return (
                  <div key={i} onClick={() => !confirmada && setSeleccionada(i)}
                    style={{
                      background: bgColor, border: `1px solid ${borderColor}`,
                      borderRadius: '10px', padding: '0.9rem 1.2rem',
                      cursor: confirmada ? 'default' : 'pointer',
                      transition: 'all 0.2s', display: 'flex',
                      alignItems: 'center', gap: '0.8rem'
                    }}
                    onMouseEnter={e => { if (!confirmada) e.currentTarget.style.borderColor = info.color; }}
                    onMouseLeave={e => { if (!confirmada && i !== seleccionada) e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >
                    <span style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      border: `1px solid ${borderColor}`, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', color: textColor, flexShrink: 0
                    }}>
                      {confirmada && i === pregunta.respuestaCorrecta ? '✓'
                        : confirmada && i === seleccionada ? '✗'
                        : String.fromCharCode(65 + i)}
                    </span>
                    <span style={{ color: textColor, fontSize: '0.95rem' }}>{opcion}</span>
                  </div>
                );
              })}
            </div>

            {/* Explicación */}
            {confirmada && (
              <div style={{
                background: seleccionada === pregunta.respuestaCorrecta ? '#0a2a0a' : '#1a0a0a',
                border: `1px solid ${seleccionada === pregunta.respuestaCorrecta ? '#4ade80' : '#f87171'}`,
                borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem'
              }}>
                <p style={{ color: '#a0a0c0', fontSize: '0.9rem', margin: 0, lineHeight: '1.6' }}>
                  💡 {pregunta.explicacion}
                </p>
              </div>
            )}

            {/* Botones */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {!confirmada ? (
                <button onClick={confirmar} disabled={seleccionada === null}
                  style={{
                    background: seleccionada !== null ? '#1d4ed8' : '#1a1a2e',
                    border: 'none', color: '#fff', padding: '0.8rem 2rem',
                    borderRadius: '8px', cursor: seleccionada !== null ? 'pointer' : 'not-allowed',
                    fontSize: '0.95rem', opacity: seleccionada === null ? 0.5 : 1
                  }}>
                  Confirmar respuesta
                </button>
              ) : (
                <button onClick={siguiente} style={{
                  background: '#166534', border: 'none', color: '#4ade80',
                  padding: '0.8rem 2rem', borderRadius: '8px',
                  cursor: 'pointer', fontSize: '0.95rem'
                }}>
                  {actual + 1 >= preguntas.length ? 'Ver resultado 🏆' : 'Siguiente →'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
