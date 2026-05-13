import { useEffect, useState } from 'react';
import axios from 'axios';
import PaginaTema from '../../components/PaginaTema';

const glosario = [
  { palabra: 'IDS', color: '#60a5fa', explicacion: 'Intrusion Detection System. Observa actividad y genera alertas ante patrones sospechosos.' },
  { palabra: 'IPS', color: '#4ade80', explicacion: 'Intrusion Prevention System. Detecta y tambien puede bloquear trafico malicioso.' },
  { palabra: 'SIEM', color: '#fbbf24', explicacion: 'Centraliza y correlaciona logs de muchas fuentes para detectar amenazas.' },
  { palabra: 'Honeypot', color: '#f87171', explicacion: 'Sistema trampa disenado para atraer atacantes y estudiar su comportamiento.' },
  { palabra: 'logs', color: '#a78bfa', explicacion: 'Registros de eventos. Son evidencia clave para detectar, investigar y responder.' },
  { palabra: 'DDoS', color: '#f87171', explicacion: 'Ataque que busca dejar un servicio fuera de linea saturandolo con trafico.' },
];

const descripcionLateral = [
  'Detectar no es lo mismo que prevenir: primero se observan senales, luego se decide si alertar, bloquear o investigar.',
  'Un evento aislado puede parecer normal; la correlacion une intentos fallidos, IPs raras, horarios inusuales y cambios sospechosos.',
  'Los logs son evidencia. Sin registros claros, un incidente se vuelve una historia incompleta y dificil de responder.',
  'La deteccion efectiva combina herramientas, reglas, contexto humano y procesos de respuesta.',
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
      titulo="Sistemas de Deteccion de Ataques"
      descripcion="Herramientas y procesos para identificar actividad sospechosa, generar alertas y responder a incidentes."
      descripcionLateral={descripcionLateral}
      glosario={glosario}
      puntos={[
        'IDS: observa trafico o eventos y genera alertas cuando encuentra patrones sospechosos.',
        'IPS: ademas de detectar, puede bloquear trafico malicioso automaticamente segun reglas definidas.',
        'SIEM: centraliza logs de muchas fuentes y los correlaciona para descubrir amenazas que no se ven en un solo sistema.',
        'Analisis de logs: busca errores, accesos anormales, cambios inesperados y secuencias que indiquen compromiso.',
        'Honeypot: sistema senzuelo que atrae atacantes para estudiar tecnicas y obtener indicadores de compromiso.',
        'DDoS: requiere detectar volumen anormal, identificar fuentes y aplicar mitigacion con filtros, CDN o proteccion especializada.',
      ]}
      temas={temas}
    />
  );
}

export default DeteccionAtaques;
