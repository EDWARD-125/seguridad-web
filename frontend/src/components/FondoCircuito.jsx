import { useEffect, useRef } from 'react';

function FondoCircuito() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const paletas = {
      oscuro: {
        linea: [96, 165, 250],
        nodo: [96, 165, 250],
        particulas: ['#60a5fa', '#4ade80'],
        greebles: ['#60a5fa', '#4ade80', '#a78bfa', '#fbbf24'],
      },
      claro: {
        linea: [37, 99, 235],
        nodo: [30, 64, 175],
        particulas: ['#1d4ed8', '#059669'],
        greebles: ['#1d4ed8', '#059669', '#7c3aed', '#d97706'],
      }
    };

    const obtenerPaleta = () => {
      const tema = document.documentElement.dataset.theme === 'claro' ? 'claro' : 'oscuro';
      return paletas[tema];
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Nodos del circuito ──────────────────────────────────────
    const NODOS = 60;
    const nodos = Array.from({ length: NODOS }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
      pulso: Math.random() * Math.PI * 2,
    }));

    // ── Partículas de flujo de datos ────────────────────────────
    const hexToRgba = (hex, alpha = 1) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    
    const PARTICULAS = 40;
    const particulas = Array.from({ length: PARTICULAS }, () => ({
      nodoOrigen: Math.floor(Math.random() * NODOS),
      nodoDestino: Math.floor(Math.random() * NODOS),
      progreso: Math.random(),
      velocidad: Math.random() * 0.004 + 0.002,
      colorIndex: Math.random() > 0.5 ? 0 : 1,
      size: Math.random() * 2 + 1,
    }));

    // ── Greebles (detalles de circuito fijos) ───────────────────
    const GREEBLES = 30;
    const greebles = Array.from({ length: GREEBLES }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      tipo: Math.floor(Math.random() * 4),
      size: Math.random() * 12 + 6,
      opacidad: Math.random() * 0.3 + 0.1,
      pulso: Math.random() * Math.PI * 2,
      colorIndex: Math.floor(Math.random() * 4),
    }));

    const dibujarGreeble = (g, t, paleta) => {
      const op = g.opacidad * (0.6 + 0.4 * Math.sin(t * 0.8 + g.pulso));
      ctx.strokeStyle = paleta.greebles[g.colorIndex];
      ctx.globalAlpha = op;
      ctx.lineWidth = 0.7;

      const { x, y, size: s } = g;

      if (g.tipo === 0) {
        // Chip cuadrado con pines
        ctx.strokeRect(x, y, s, s);
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(x + (s / 4) * (i + 0.5), y);
          ctx.lineTo(x + (s / 4) * (i + 0.5), y - s * 0.4);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + (s / 4) * (i + 0.5), y + s);
          ctx.lineTo(x + (s / 4) * (i + 0.5), y + s * 1.4);
          ctx.stroke();
        }
      } else if (g.tipo === 1) {
        // Círculo con cruces (resistencia)
        ctx.beginPath();
        ctx.arc(x, y, s / 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - s * 0.8, y);
        ctx.lineTo(x + s * 0.8, y);
        ctx.stroke();
      } else if (g.tipo === 2) {
        // Esquinas en L (conector)
        ctx.beginPath();
        ctx.moveTo(x, y + s);
        ctx.lineTo(x, y);
        ctx.lineTo(x + s, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + s * 2, y + s);
        ctx.lineTo(x + s * 2, y);
        ctx.lineTo(x + s, y);
        ctx.stroke();
      } else {
        // Cruz de target
        ctx.beginPath();
        ctx.moveTo(x - s, y);
        ctx.lineTo(x + s, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y - s);
        ctx.lineTo(x, y + s);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, s * 0.5, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    // ── Loop de animación ────────────────────────────────────────
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;
      const paleta = obtenerPaleta();

      // Mover nodos
      nodos.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulso += 0.02;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Dibujar conexiones entre nodos cercanos
      for (let i = 0; i < NODOS; i++) {
        for (let j = i + 1; j < NODOS; j++) {
          const dx = nodos[i].x - nodos[j].x;
          const dy = nodos[i].y - nodos[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const op = (1 - dist / 120) * 0.25;

            // Línea en L (estilo circuito)
            const mx = nodos[i].x;
            const my = nodos[j].y;

            ctx.beginPath();
            ctx.moveTo(nodos[i].x, nodos[i].y);
            ctx.lineTo(mx, my);
            ctx.lineTo(nodos[j].x, nodos[j].y);
            ctx.strokeStyle = `rgba(${paleta.linea[0]}, ${paleta.linea[1]}, ${paleta.linea[2]}, ${op})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Punto de esquina
            ctx.beginPath();
            ctx.arc(mx, my, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${paleta.linea[0]}, ${paleta.linea[1]}, ${paleta.linea[2]}, ${op * 2})`;
            ctx.fill();
          }
        }
      }

      // Dibujar nodos
      nodos.forEach(n => {
        const pulso = 0.5 + 0.5 * Math.sin(n.pulso);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (1 + pulso * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${paleta.nodo[0]}, ${paleta.nodo[1]}, ${paleta.nodo[2]}, ${0.2 + pulso * 0.4})`;
        ctx.fill();

        // Halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${paleta.nodo[0]}, ${paleta.nodo[1]}, ${paleta.nodo[2]}, ${0.03 + pulso * 0.05})`;
        ctx.fill();
      });

      // Dibujar partículas de flujo de datos
      particulas.forEach(p => {
        p.progreso += p.velocidad;
        if (p.progreso >= 1) {
          p.progreso = 0;
          p.nodoOrigen = p.nodoDestino;
          p.nodoDestino = Math.floor(Math.random() * NODOS);
        }

        const origen = nodos[p.nodoOrigen];
        const destino = nodos[p.nodoDestino];
        const mx = origen.x;
        const my = destino.y;

        let px, py;
        if (p.progreso < 0.5) {
          const t2 = p.progreso * 2;
          px = origen.x + (mx - origen.x) * t2;
          py = origen.y + (my - origen.y) * t2;
        } else {
          const t2 = (p.progreso - 0.5) * 2;
          px = mx + (destino.x - mx) * t2;
          py = my + (destino.y - my) * t2;
        }

        // Estela
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(paleta.particulas[p.colorIndex], 0.9);
        ctx.fill();

        // Brillo
        ctx.beginPath();
        ctx.arc(px, py, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(paleta.particulas[p.colorIndex], 0.15);
        ctx.fill();
      });

      // Dibujar greebles
      greebles.forEach(g => dibujarGreeble(g, t, paleta));

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 'var(--canvas-opacity)',
      }}
    />
  );
}

export default FondoCircuito;
