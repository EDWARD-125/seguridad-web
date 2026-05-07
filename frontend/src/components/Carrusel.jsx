import { useState, useEffect } from 'react';

const slides = [
  {
    imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    titulo: 'Criptografía',
    descripcion: 'Protege tus datos con algoritmos de cifrado modernos.'
  },
  {
    imagen: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
    titulo: 'Seguridad en Redes',
    descripcion: 'Protocolos seguros para comunicaciones confiables.'
  },
  {
    imagen: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&q=80',
    titulo: 'Protección de Servidores',
    descripcion: 'Hardening y buenas prácticas para infraestructuras seguras.'
  },
  {
    imagen: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80',
    titulo: 'Detección de Amenazas',
    descripcion: 'Sistemas IDS/IPS para identificar y bloquear ataques.'
  },
  {
    imagen: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80',
    titulo: 'Ethical Hacking',
    descripcion: 'Conoce las técnicas de ataque para defenderte mejor.'
  },
];

function Carrusel() {
  const [actual, setActual] = useState(0);

  // Auto-avance cada 4 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  const anterior = () => setActual(prev => (prev - 1 + slides.length) % slides.length);
  const siguiente = () => setActual(prev => (prev + 1) % slides.length);

  const slide = slides[actual];

  return (
    <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', userSelect: 'none' }}>

      {/* Imagen */}
      <img
        src={slide.imagen}
        alt={slide.titulo}
        style={{
          width: '100%',
          height: '400px',
          objectFit: 'cover',
          display: 'block',
          transition: 'opacity 0.5s'
        }}
      />

      {/* Overlay oscuro */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
      }} />

      {/* Texto */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '2rem',
        right: '2rem'
      }}>
        <h3 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '0.4rem' }}>
          {slide.titulo}
        </h3>
        <p style={{ color: '#c0c0d8', fontSize: '1rem', margin: 0 }}>
          {slide.descripcion}
        </p>
      </div>

      {/* Botón anterior */}
      <button
        onClick={anterior}
        style={{
          position: 'absolute',
          top: '50%',
          left: '1rem',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ‹
      </button>

      {/* Botón siguiente */}
      <button
        onClick={siguiente}
        style={{
          position: 'absolute',
          top: '50%',
          right: '1rem',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ›
      </button>

      {/* Puntos indicadores */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        right: '2rem',
        display: 'flex',
        gap: '6px'
      }}>
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setActual(i)}
            style={{
              width: i === actual ? '20px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === actual ? '#60a5fa' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          />
        ))}
      </div>

    </div>
  );
}

export default Carrusel;