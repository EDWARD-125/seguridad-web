import { useEffect, useState } from 'react';
import axios from 'axios';
import PaginaTema from '../../components/PaginaTema';

const glosario = [
  { palabra: 'Hardening', color: '#60a5fa', explicacion: 'Proceso de reducir la superficie de ataque mediante configuraciones seguras y eliminacion de lo innecesario.' },
  { palabra: 'Firewall', color: '#4ade80', explicacion: 'Control que filtra trafico entrante y saliente segun reglas definidas.' },
  { palabra: 'SSH', color: '#a78bfa', explicacion: 'Protocolo cifrado para administrar servidores remotamente.' },
  { palabra: 'VPN', color: '#fbbf24', explicacion: 'Tunel cifrado para conectar usuarios o redes de forma privada.' },
  { palabra: 'DMZ', color: '#f87171', explicacion: 'Zona separada para exponer servicios publicos sin abrir directamente la red interna.' },
  { palabra: 'parches', color: '#34d399', explicacion: 'Actualizaciones que corrigen fallos y vulnerabilidades conocidas.' },
];

const descripcionLateral = [
  'La seguridad de un servidor depende del software, la configuracion, los permisos y el mantenimiento continuo.',
  'Hardening significa quitar oportunidades: menos servicios, menos puertos, menos privilegios y menos configuraciones por defecto.',
  'El minimo privilegio limita el dano: si una cuenta cae, no deberia tener acceso a todo el sistema.',
  'Un servidor bien protegido tambien registra eventos para investigar incidentes y responder con evidencia.',
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
      descripcion="Practicas para reducir superficie de ataque, controlar accesos y mantener servicios confiables."
      descripcionLateral={descripcionLateral}
      glosario={glosario}
      puntos={[
        'Hardening: deshabilitar servicios innecesarios, cerrar puertos, eliminar cuentas sin uso y aplicar configuraciones seguras.',
        'Firewall: permitir solo el trafico necesario; todo puerto abierto debe tener una razon operativa clara.',
        'Actualizaciones: aplicar parches de seguridad para corregir vulnerabilidades conocidas antes de que sean explotadas.',
        'Minimo privilegio: separar usuarios, roles y permisos para que una falla no comprometa todo el sistema.',
        'SSH seguro: usar llaves, deshabilitar root remoto, limitar intentos y restringir acceso por red.',
        'DMZ: ubicar servicios publicos en una zona separada para proteger la red interna si uno de ellos cae.',
        'VPN: exponer administracion solo a usuarios autorizados mediante un tunel cifrado y controlado.',
      ]}
      temas={temas}
    />
  );
}

export default SeguridadServidores;
