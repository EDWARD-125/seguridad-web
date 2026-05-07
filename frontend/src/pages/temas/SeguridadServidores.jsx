import { useEffect, useState } from 'react';
import axios from 'axios';
import PaginaTema from '../../components/PaginaTema';

const glosario = [
  { palabra: 'Hardening', color: '#60a5fa', explicacion: 'Proceso de reducir la superficie de ataque de un servidor deshabilitando servicios, puertos y usuarios innecesarios.' },
  { palabra: 'Firewall', color: '#4ade80', explicacion: 'Sistema que filtra el tráfico de red entrante y saliente según reglas definidas. Puede ser software o hardware.' },
  { palabra: 'SSH', color: '#a78bfa', explicacion: 'Secure Shell. Protocolo cifrado para administrar servidores remotamente de forma segura.' },
  { palabra: 'VPN', color: '#fbbf24', explicacion: 'Virtual Private Network. Crea un túnel cifrado entre el usuario y el servidor, ocultando el tráfico.' },
  { palabra: 'DMZ', color: '#f87171', explicacion: 'Zona Desmilitarizada. Red intermedia entre internet y la red interna que aloja servicios públicos como web servers.' },
  { palabra: 'parches', color: '#34d399', explicacion: 'Actualizaciones de software que corrigen vulnerabilidades de seguridad conocidas. Aplicarlos es crítico.' },
];

const descripcionLateral = [
  'El 60% de los ataques exitosos explotan vulnerabilidades con parches disponibles pero no aplicados.',
  'Un servidor mal configurado puede ser comprometido en menos de 5 minutos si está expuesto a internet.',
  'El principio de mínimo privilegio reduce el daño potencial si una cuenta es comprometida.',
  'Los ataques de fuerza bruta por SSH son uno de los más comunes. Deshabilitar root login es esencial.',
];

function SeguridadServidores() {
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/temas/categoria/servidores')
      .then(res => setTemas(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PaginaTema
      categoria="servidores"
      icono="🖥️"
      titulo="Seguridad en Servidores"
      descripcion="Configuración y buenas prácticas para proteger servidores."
      descripcionLateral={descripcionLateral}
      glosario={glosario}
      puntos={[
        'Hardening — reducir superficie de ataque deshabilitando servicios innecesarios',
        'Firewall — filtrado de tráfico entrante y saliente',
        'Actualizaciones — aplicar parches de seguridad regularmente',
        'Principio de mínimo privilegio — cada proceso solo accede a lo necesario',
        'SSH seguro — deshabilitar root, usar llaves en vez de contraseñas',
        'DMZ — separar servicios públicos de la red interna',
        'VPN — acceso remoto cifrado para administradores',
      ]}
      temas={temas}
    />
  );
}

export default SeguridadServidores; 