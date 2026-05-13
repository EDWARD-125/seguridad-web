import { useEffect, useState } from 'react';
import axios from 'axios';
import PaginaTema from '../../components/PaginaTema';

const glosario = [
  { palabra: 'XSS', color: '#f87171', explicacion: 'Cross-Site Scripting. Inyeccion de scripts que se ejecutan en el navegador de la victima.' },
  { palabra: 'SQL Injection', color: '#f87171', explicacion: 'Insercion de instrucciones SQL maliciosas en entradas que terminan afectando consultas a la base de datos.' },
  { palabra: 'CSRF', color: '#fbbf24', explicacion: 'Engana al navegador de una victima autenticada para ejecutar acciones sin su intencion.' },
  { palabra: 'MITM', color: '#a78bfa', explicacion: 'Man In The Middle. Intercepcion de la comunicacion entre dos partes.' },
  { palabra: 'payload', color: '#60a5fa', explicacion: 'Contenido que ejecuta o aprovecha una vulnerabilidad durante un ataque.' },
  { palabra: 'zero-day', color: '#f87171', explicacion: 'Vulnerabilidad desconocida o sin parche disponible al momento del ataque.' },
  { palabra: 'sanitizacion', color: '#4ade80', explicacion: 'Proceso de limpiar o transformar entradas para que no sean interpretadas como codigo malicioso.' },
];

const descripcionLateral = [
  'Estudiar ataques no significa promoverlos: permite entender como fallan las aplicaciones y como construir defensas reales.',
  'Muchos ataques web empiezan con entradas no confiables: formularios, parametros, headers, cookies o archivos subidos.',
  'Una defensa fuerte combina validacion, permisos correctos, controles de sesion, registros y pruebas constantes.',
  'Pensar como atacante ayuda a encontrar supuestos peligrosos: datos confiados de mas, rutas sin autorizacion o errores demasiado detallados.',
];

function TecnicasAtaque() {
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/temas/categoria/tecnicas')
      .then(res => setTemas(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PaginaTema
      categoria="tecnicas"
      icono="⚔️"
      titulo="Tecnicas de Ataque y Defensa"
      descripcion="Ataques comunes en aplicaciones web y controles defensivos para reducir su impacto."
      descripcionLateral={descripcionLateral}
      glosario={glosario}
      puntos={[
        'XSS: inyecta JavaScript en una pagina para robar sesiones, manipular contenido o actuar como la victima.',
        'SQL Injection: altera consultas cuando la aplicacion concatena entradas del usuario sin proteccion.',
        'CSRF: fuerza al navegador de una victima autenticada a ejecutar una accion sin su intencion.',
        'MITM: intercepta comunicaciones entre cliente y servidor; TLS y validacion de certificados reducen este riesgo.',
        'Fuerza bruta: prueba credenciales de forma repetitiva; se mitiga con MFA, bloqueo progresivo y monitoreo.',
        'zero-day: vulnerabilidad sin parche conocido; se reduce su impacto con defensa en profundidad y privilegios minimos.',
        'Sanitizacion y validacion: tratar toda entrada como no confiable antes de procesarla, guardarla o mostrarla.',
      ]}
      temas={temas}
    />
  );
}

export default TecnicasAtaque;
