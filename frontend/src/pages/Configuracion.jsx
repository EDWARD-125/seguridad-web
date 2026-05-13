import { useTheme } from '../context/ThemeContext';

const card = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  padding: '1.2rem'
};

function Configuracion() {
  const { preferencias, actualizarPreferencia } = useTheme();

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h1>Configuracion</h1>
      <p>Ajusta preferencias de uso para tu experiencia en SegWeb.</p>

      <section style={{ ...card, display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
        <Ajuste titulo="Tema visual" descripcion="Mantiene la interfaz en modo oscuro o claro.">
          <select
            value={preferencias.tema}
            onChange={e => actualizarPreferencia('tema', e.target.value)}
            style={control}
          >
            <option value="oscuro">Oscuro</option>
            <option value="claro">Claro</option>
          </select>
        </Ajuste>

        <Ajuste titulo="Notificaciones" descripcion="Recibir avisos visuales dentro de la app.">
          <input
            type="checkbox"
            checked={preferencias.notificaciones}
            onChange={e => actualizarPreferencia('notificaciones', e.target.checked)}
            style={{ width: '18px', height: '18px' }}
          />
        </Ajuste>

        <Ajuste titulo="Modo estudio" descripcion="Prioriza el acceso a quizzes y temas de repaso.">
          <input
            type="checkbox"
            checked={preferencias.modoEstudio}
            onChange={e => actualizarPreferencia('modoEstudio', e.target.checked)}
            style={{ width: '18px', height: '18px' }}
          />
        </Ajuste>
      </section>
    </main>
  );
}

function Ajuste({ titulo, descripcion, children }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      background: 'var(--surface-3)',
      border: '1px solid var(--border-soft)',
      borderRadius: '8px',
      padding: '1rem',
      flexWrap: 'wrap'
    }}>
      <div>
        <h2 style={{ margin: '0 0 0.25rem', fontSize: '1rem', color: 'var(--text-strong)' }}>{titulo}</h2>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>{descripcion}</p>
      </div>
      {children}
    </div>
  );
}

const control = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  borderRadius: '8px',
  padding: '0.55rem 0.75rem'
};

export default Configuracion;
