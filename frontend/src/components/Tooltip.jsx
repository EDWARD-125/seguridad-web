import { useState } from 'react';

function Tooltip({ palabra, explicacion, color = '#60a5fa' }) {
  const [visible, setVisible] = useState(false);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          color: color,
          fontWeight: '600',
          borderBottom: `1px dashed ${color}`,
          cursor: 'help',
          transition: 'opacity 0.2s'
        }}
      >
        {palabra}
      </span>

      {visible && (
        <div style={{
          position: 'absolute',
          bottom: '130%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1a1a2e',
          border: '1px solid #3a3a5a',
          borderRadius: '10px',
          padding: '0.8rem 1rem',
          width: '220px',
          zIndex: 999,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          pointerEvents: 'none'
        }}>
          {/* Flecha */}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '10px',
            height: '10px',
            background: '#1a1a2e',
            border: '1px solid #3a3a5a',
            borderTop: 'none',
            borderLeft: 'none',
            rotate: '45deg'
          }} />
          <p style={{
            color: color,
            fontWeight: '600',
            fontSize: '0.85rem',
            marginBottom: '0.3rem'
          }}>
            {palabra}
          </p>
          <p style={{
            color: '#c0c0d8',
            fontSize: '0.8rem',
            margin: 0,
            lineHeight: '1.5'
          }}>
            {explicacion}
          </p>
        </div>
      )}
    </span>
  );
}

export default Tooltip;