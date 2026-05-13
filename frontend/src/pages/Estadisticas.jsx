import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';

const categorias = {
  criptografia: 'Criptografia',
  protocolos: 'Protocolos',
  servidores: 'Servidores',
  deteccion: 'Deteccion',
  tecnicas: 'Tecnicas'
};

const card = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  padding: '1.2rem'
};

function Estadisticas() {
  const { usuario } = useAuth();
  const resultados = useMemo(() => obtenerResultados(usuario), [usuario]);
  const total = resultados.length;
  const mejor = resultados.reduce((max, item) => Math.max(max, item.porcentaje), 0);
  const promedio = total
    ? Math.round(resultados.reduce((sum, item) => sum + item.porcentaje, 0) / total)
    : 0;

  const porCategoria = Object.keys(categorias).map(categoria => {
    const intentos = resultados.filter(item => item.categoria === categoria);
    const ultimo = intentos.at(-1);
    return { categoria, intentos: intentos.length, ultimo };
  });

  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h1>Estadisticas</h1>
      <p>Resumen local de tus quizzes completados en este navegador.</p>

      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
        margin: '1.5rem 0'
      }}>
        <Metrica titulo="Quizzes completados" valor={total} />
        <Metrica titulo="Mejor puntaje" valor={`${mejor}%`} />
        <Metrica titulo="Promedio" valor={`${promedio}%`} />
      </section>

      <section style={card}>
        <h2 style={{ marginTop: 0 }}>Progreso por categoria</h2>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {porCategoria.map(item => (
            <div key={item.categoria} style={{
              background: 'var(--surface-3)',
              border: '1px solid var(--border-soft)',
              borderRadius: '8px',
              padding: '0.9rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <strong style={{ color: 'var(--text-strong)' }}>{categorias[item.categoria]}</strong>
                <span style={{ color: 'var(--accent)' }}>
                  {item.ultimo ? `${item.ultimo.porcentaje}% ultimo resultado` : 'Sin intentos'}
                </span>
              </div>
              <p style={{ margin: '0.35rem 0 0', fontSize: '0.9rem' }}>
                Intentos registrados: {item.intentos}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Metrica({ titulo, valor }) {
  return (
    <div style={card}>
      <p style={{ margin: '0 0 0.4rem', color: 'var(--accent)', fontSize: '0.85rem' }}>{titulo}</p>
      <strong style={{ color: 'var(--text-strong)', fontSize: '2rem' }}>{valor}</strong>
    </div>
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

export default Estadisticas;
