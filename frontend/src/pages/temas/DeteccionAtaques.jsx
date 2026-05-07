import { useEffect, useState } from 'react';
import axios from 'axios';
import PaginaTema from '../../components/PaginaTema';

const glosario = [
  { palabra: 'IDS', color: '#60a5fa', explicacion: 'Intrusion Detection System. Monitorea el tráfico y genera alertas cuando detecta actividad sospechosa.' },
  { palabra: 'IPS', color: '#4ade80', explicacion: 'Intrusion Prevention System. Como el IDS pero además bloquea automáticamente el tráfico malicioso.' },
  { palabra: 'SIEM', color: '#fbbf24', explicacion: 'Security Information and Event Management. Centraliza y correlaciona logs de múltiples fuentes para detectar amenazas.' },
  { palabra: 'Honeypot', color: '#f87171', explicacion: 'Sistema trampa que simula ser un objetivo real para atraer atacantes y estudiar sus técnicas.' },
  { palabra: 'logs', color: '#a78bfa', explicacion: 'Registros de eventos del sistema. Son fundamentales para detectar, investigar y responder a incidentes.' },
  { palabra: 'DDoS', color: '#f87171', explicacion: 'Distributed Denial of Service. Ataque que satura un servidor con tráfico masivo desde múltiples fuentes.' },
];

const descripcionLateral = [
  'El tiempo promedio para detectar una intrusión en una empresa es de 207 días.',
  'Los SIEM modernos usan inteligencia artificial para detectar anomalías en tiempo real.',
  'Los Honeypots han permitido descubrir vulnerabilidades zero-day antes de que sean explotadas masivamente.',
  'El 80% de los ataques exitosos dejan rastros en los logs que no fueron revisados a tiempo.',
];

function DeteccionAtaques() {
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/temas/categoria/deteccion')
      .then(res => setTemas(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PaginaTema
      categoria="deteccion"
      icono="🔍"
      titulo="Sistemas de Detección de Ataques"
      descripcion="Herramientas y técnicas para detectar intrusiones y amenazas."
      descripcionLateral={descripcionLateral}
      glosario={glosario}
      puntos={[
        'IDS — detecta actividad sospechosa y genera alertas',
        'IPS — bloquea automáticamente el tráfico malicioso',
        'SIEM — centraliza y correlaciona logs de seguridad',
        'Análisis de logs — revisión de registros para detectar anomalías',
        'Honeypot — sistemas trampa para estudiar atacantes',
        'DDoS — detección y mitigación de ataques de denegación de servicio',
      ]}
      temas={temas}
    />
  );
}

export default DeteccionAtaques;