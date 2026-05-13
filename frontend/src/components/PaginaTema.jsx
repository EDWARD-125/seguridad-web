import { useNavigate } from 'react-router-dom';
import TarjetaTema from './TarjetaTema';
import Tooltip from './Tooltip';

function renderConTooltips(texto, glosario) {
  if (!glosario || glosario.length === 0) return texto;

  const partes = [];
  let restante = texto;
  let key = 0;

  glosario.forEach(({ palabra, explicacion, color }) => {
    const indice = restante.indexOf(palabra);
    if (indice === -1) return;
    partes.push(restante.substring(0, indice));
    partes.push(
      <Tooltip key={key++} palabra={palabra} explicacion={explicacion} color={color} />
    );
    restante = restante.substring(indice + palabra.length);
  });

  partes.push(restante);
  return partes;
}

function PaginaTema({ titulo, icono, descripcion, descripcionLateral, puntos, temas, glosario, categoria }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Encabezado + descripción lateral */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: descripcionLateral ? '1fr 340px' : '1fr',
        gap: '1.5rem',
        marginBottom: '2rem',
        alignItems: 'start'
      }}>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '2rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>{icono}</div>
          <h1 style={{ marginBottom: '0.5rem' }}>{titulo}</h1>
          <p style={{ fontSize: '1rem' }}>{descripcion}</p>
        </div>

        {descripcionLateral && (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h3 style={{
              color: 'var(--accent)',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '0.2rem'
            }}>
              💡 ¿Sabías que?
            </h3>
            {descripcionLateral.map((item, i) => (
              <div key={i} style={{
                borderLeft: '3px solid var(--border)',
                paddingLeft: '0.8rem'
              }}>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Puntos clave */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          marginBottom: '1rem',
          fontSize: '0.9rem',
          color: 'var(--accent)',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Puntos clave
        </h2>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {puntos.map((punto, i) => (
            <li key={i} style={{
              padding: '0.6rem 0',
              borderBottom: i < puntos.length - 1 ? '1px solid var(--border-soft)' : 'none',
              color: 'var(--text)',
              fontSize: '0.95rem',
              lineHeight: '1.6'
            }}>
              <span style={{ color: '#60a5fa', marginRight: '0.5rem' }}>▸</span>
              {glosario ? renderConTooltips(punto, glosario) : punto}
            </li>
          ))}
        </ul>
      </div>

      {/* Tarjetas desde MongoDB */}
      <h2 style={{ marginBottom: '1rem' }}>Desde la base de datos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
        {temas.length > 0
          ? temas.map(t => (
              <TarjetaTema key={t._id} id={t._id} titulo={t.titulo} descripcion={t.descripcion} />
            ))
          : <p>No hay contenido aún.</p>}
      </div>

      {/* Botón Quiz */}
      {categoria && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => navigate(`/quiz/${categoria}`)}
            style={{
              background: '#1d4ed8',
              border: 'none',
              color: '#fff',
              padding: '1rem 2.5rem',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            🎯 Poner a prueba tus conocimientos
          </button>
        </div>
      )}

    </div>
  );
}

export default PaginaTema;
