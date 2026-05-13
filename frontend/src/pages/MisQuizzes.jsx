import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const categorias = [
  { id: 'criptografia', nombre: 'Criptografia', color: '#60a5fa' },
  { id: 'protocolos', nombre: 'Protocolos', color: '#4ade80' },
  { id: 'servidores', nombre: 'Servidores', color: '#a78bfa' },
  { id: 'deteccion', nombre: 'Deteccion', color: '#fbbf24' },
  { id: 'tecnicas', nombre: 'Tecnicas', color: '#f87171' }
];

function MisQuizzes() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const resultados = useMemo(() => obtenerResultados(usuario), [usuario]);

  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h1>Mis quizzes</h1>
      <p>Elige una categoria para practicar y revisa tu ultimo resultado local.</p>

      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginTop: '1.5rem'
      }}>
        {categorias.map(categoria => {
          const intentos = resultados.filter(item => item.categoria === categoria.id);
          const ultimo = intentos.at(-1);

          return (
            <article key={categoria.id} style={{
              background: 'var(--surface)',
              border: `1px solid ${categoria.color}`,
              borderRadius: '8px',
              padding: '1.1rem'
            }}>
              <h2 style={{ marginTop: 0, color: 'var(--text-strong)', fontSize: '1.05rem' }}>{categoria.nombre}</h2>
              <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                {ultimo
                  ? `Ultimo resultado: ${ultimo.correctas}/${ultimo.total} (${ultimo.porcentaje}%)`
                  : 'Aun no has completado este quiz.'}
              </p>
              <button
                onClick={() => navigate(`/quiz/${categoria.id}`)}
                style={{
                  width: '100%',
                  background: '#1d4ed8',
                  border: 'none',
                  color: '#ffffff',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 700
                }}
              >
                Iniciar quiz
              </button>
            </article>
          );
        })}
      </section>
    </main>
  );
}

function obtenerResultados(usuario) {
  const key = `segweb_quiz_resultados_${usuario?.id || usuario?.email || 'anonimo'}`;
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

export default MisQuizzes;
