import { useEffect, useState } from 'react';
import axios from 'axios';
import PaginaTema from '../../components/PaginaTema';

const glosario = [
  { palabra: 'XSS', color: '#f87171', explicacion: 'Cross-Site Scripting. Inyección de scripts maliciosos en páginas web que se ejecutan en el navegador de la víctima.' },
  { palabra: 'SQL Injection', color: '#f87171', explicacion: 'Inyección de código SQL malicioso en formularios para manipular o extraer datos de la base de datos.' },
  { palabra: 'CSRF', color: '#fbbf24', explicacion: 'Cross-Site Request Forgery. Engaña al navegador para ejecutar acciones no autorizadas en nombre del usuario autenticado.' },
  { palabra: 'MITM', color: '#a78bfa', explicacion: 'Man In The Middle. El atacante se interpone entre cliente y servidor interceptando y modificando la comunicación.' },
  { palabra: 'payload', color: '#60a5fa', explicacion: 'Código malicioso que se ejecuta al explotar una vulnerabilidad. Puede ser un script, comando o programa.' },
  { palabra: 'zero-day', color: '#f87171', explicacion: 'Vulnerabilidad desconocida por el fabricante y sin parche disponible. Muy valorada por atacantes.' },
  { palabra: 'sanitización', color: '#4ade80', explicacion: 'Proceso de limpiar y validar los datos de entrada del usuario para prevenir inyecciones maliciosas.' },
];

const descripcionLateral = [
  'XSS es la vulnerabilidad web más común según OWASP Top 10 desde hace más de una década.',
  'En 2023 se descubrieron más de 26,000 vulnerabilidades nuevas, un récord histórico.',
  'El 43% de los ciberataques van dirigidos a pequeñas empresas por tener menos defensas.',
  'Conocer las técnicas de ataque es fundamental para un buen defensor — "piensa como el atacante".',
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
      titulo="Técnicas de Ataque y Defensa"
      descripcion="Casos prácticos de ataques comunes y cómo defenderse."
      descripcionLateral={descripcionLateral}
      glosario={glosario}
      puntos={[
        'XSS — inyección de scripts maliciosos en páginas web',
        'SQL Injection — manipulación de consultas a la base de datos',
        'CSRF — solicitudes falsas en nombre del usuario autenticado',
        'MITM — interceptación de comunicaciones entre cliente y servidor',
        'Fuerza bruta — adivinanza sistemática de contraseñas',
        'zero-day — vulnerabilidades sin parche conocido',
        'sanitización — validar y limpiar inputs como defensa principal',
      ]}
      temas={temas}
    />
  );
}

export default TecnicasAtaque;