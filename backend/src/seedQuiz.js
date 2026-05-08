const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('./models/Quiz');

dotenv.config();

const preguntas = [
  // Criptografía
  {
    categoria: 'criptografia',
    pregunta: '¿Cuál algoritmo de cifrado simétrico es considerado el más seguro actualmente?',
    opciones: ['DES', 'MD5', 'AES-256', 'SHA-1'],
    respuestaCorrecta: 2,
    explicacion: 'AES-256 es el estándar actual. DES es obsoleto y MD5/SHA-1 son funciones hash, no cifrado.'
  },
  {
    categoria: 'criptografia',
    pregunta: '¿Qué diferencia al cifrado simétrico del asimétrico?',
    opciones: [
      'El simétrico usa dos claves diferentes',
      'El simétrico usa la misma clave para cifrar y descifrar',
      'El asimétrico es más lento que el simétrico',
      'No hay diferencia'
    ],
    respuestaCorrecta: 1,
    explicacion: 'El cifrado simétrico usa una sola clave compartida. El asimétrico usa un par de claves pública/privada.'
  },
  {
    categoria: 'criptografia',
    pregunta: '¿Para qué se usa SHA-256?',
    opciones: ['Cifrar mensajes', 'Generar hashes de datos', 'Crear certificados SSL', 'Autenticar usuarios'],
    respuestaCorrecta: 1,
    explicacion: 'SHA-256 es una función hash que genera un valor único de 256 bits para cualquier entrada.'
  },
  {
    categoria: 'criptografia',
    pregunta: '¿Qué significa que una función hash sea "de una sola vía"?',
    opciones: [
      'Solo funciona en un sentido de la red',
      'No se puede recuperar el dato original a partir del hash',
      'Solo puede usarse una vez',
      'Solo cifra texto plano'
    ],
    respuestaCorrecta: 1,
    explicacion: 'Una función hash no es reversible. No puedes obtener el texto original a partir del hash.'
  },
  // Protocolos
  {
    categoria: 'protocolos',
    pregunta: '¿Qué protocolo protege las comunicaciones HTTPS?',
    opciones: ['SSH', 'FTP', 'TLS', 'DNS'],
    respuestaCorrecta: 2,
    explicacion: 'HTTPS = HTTP + TLS. El protocolo TLS cifra la comunicación entre el navegador y el servidor.'
  },
  {
    categoria: 'protocolos',
    pregunta: '¿Cuántas partes tiene un JWT?',
    opciones: ['2', '3', '4', '5'],
    respuestaCorrecta: 1,
    explicacion: 'Un JWT tiene 3 partes: Header, Payload y Firma, separadas por puntos.'
  },
  {
    categoria: 'protocolos',
    pregunta: '¿Para qué sirve OAuth 2.0?',
    opciones: [
      'Cifrar contraseñas en la base de datos',
      'Autorizar acceso a recursos sin compartir contraseñas',
      'Crear certificados SSL',
      'Detectar intrusiones'
    ],
    respuestaCorrecta: 1,
    explicacion: 'OAuth 2.0 permite que una app acceda a recursos de otra en nombre del usuario sin exponer su contraseña.'
  },
  {
    categoria: 'protocolos',
    pregunta: '¿Cuál versión de TLS es la actual y más segura?',
    opciones: ['TLS 1.0', 'TLS 1.1', 'TLS 1.2', 'TLS 1.3'],
    respuestaCorrecta: 3,
    explicacion: 'TLS 1.3 es la versión más reciente. TLS 1.0 y 1.1 están oficialmente deprecados.'
  },
  // Servidores
  {
    categoria: 'servidores',
    pregunta: '¿Qué es el hardening de servidores?',
    opciones: [
      'Instalar más RAM al servidor',
      'Reducir la superficie de ataque deshabilitando servicios innecesarios',
      'Aumentar el ancho de banda',
      'Hacer copias de seguridad'
    ],
    respuestaCorrecta: 1,
    explicacion: 'Hardening significa endurecer la seguridad del servidor eliminando todo lo que no sea necesario.'
  },
  {
    categoria: 'servidores',
    pregunta: '¿Qué herramienta bloquea IPs automáticamente tras múltiples intentos fallidos?',
    opciones: ['Nginx', 'fail2ban', 'Apache', 'UFW'],
    respuestaCorrecta: 1,
    explicacion: 'fail2ban monitorea los logs y bloquea automáticamente IPs que muestran comportamiento malicioso.'
  },
  {
    categoria: 'servidores',
    pregunta: '¿Qué es una DMZ en seguridad de redes?',
    opciones: [
      'Un tipo de firewall',
      'Una zona de red entre internet y la red interna',
      'Un protocolo de cifrado',
      'Un sistema de detección de intrusos'
    ],
    respuestaCorrecta: 1,
    explicacion: 'La DMZ (Zona Desmilitarizada) es una red intermedia que aloja servicios públicos, separada de la red interna.'
  },
  {
    categoria: 'servidores',
    pregunta: '¿Por qué es importante aplicar parches de seguridad?',
    opciones: [
      'Para mejorar el rendimiento',
      'Para corregir vulnerabilidades conocidas que los atacantes explotan',
      'Para agregar nuevas funciones',
      'Para reducir el consumo de RAM'
    ],
    respuestaCorrecta: 1,
    explicacion: 'El 60% de los ataques exitosos explotan vulnerabilidades con parches disponibles pero no aplicados.'
  },
  // Detección
  {
    categoria: 'deteccion',
    pregunta: '¿Cuál es la diferencia entre IDS e IPS?',
    opciones: [
      'No hay diferencia',
      'IDS detecta y alerta, IPS detecta y bloquea',
      'IPS solo monitorea logs',
      'IDS bloquea automáticamente'
    ],
    respuestaCorrecta: 1,
    explicacion: 'IDS (Intrusion Detection System) solo detecta y alerta. IPS (Intrusion Prevention System) también bloquea.'
  },
  {
    categoria: 'deteccion',
    pregunta: '¿Qué es un Honeypot?',
    opciones: [
      'Un tipo de firewall',
      'Un sistema trampa para atraer y estudiar atacantes',
      'Una base de datos cifrada',
      'Un protocolo de red seguro'
    ],
    respuestaCorrecta: 1,
    explicacion: 'Un Honeypot simula ser un objetivo real para atraer atacantes y estudiar sus técnicas sin riesgo real.'
  },
  {
    categoria: 'deteccion',
    pregunta: '¿Qué significa SIEM?',
    opciones: [
      'System Intrusion Event Monitor',
      'Security Information and Event Management',
      'Secure Internet Email Management',
      'Software Intrusion Engine Module'
    ],
    respuestaCorrecta: 1,
    explicacion: 'SIEM centraliza y correlaciona eventos de seguridad de múltiples fuentes para detectar amenazas.'
  },
  // Técnicas
  {
    categoria: 'tecnicas',
    pregunta: '¿Qué es un ataque XSS?',
    opciones: [
      'Inyección de código SQL en formularios',
      'Inyección de scripts maliciosos en páginas web',
      'Interceptación de comunicaciones',
      'Ataque de fuerza bruta'
    ],
    respuestaCorrecta: 1,
    explicacion: 'XSS (Cross-Site Scripting) inyecta scripts que se ejecutan en el navegador de la víctima.'
  },
  {
    categoria: 'tecnicas',
    pregunta: '¿Cuál es la defensa principal contra SQL Injection?',
    opciones: [
      'Usar HTTPS',
      'Prepared statements y consultas parametrizadas',
      'Instalar un antivirus',
      'Cifrar la base de datos'
    ],
    respuestaCorrecta: 1,
    explicacion: 'Los prepared statements separan el código SQL de los datos del usuario, haciendo imposible la inyección.'
  },
  {
    categoria: 'tecnicas',
    pregunta: '¿Qué es un ataque MITM?',
    opciones: [
      'Ataque de fuerza bruta a contraseñas',
      'El atacante se interpone entre cliente y servidor',
      'Inyección de código malicioso',
      'Denegación de servicio'
    ],
    respuestaCorrecta: 1,
    explicacion: 'Man In The Middle intercepta la comunicación entre dos partes sin que ninguna lo sepa.'
  },
  {
    categoria: 'tecnicas',
    pregunta: '¿Qué es una vulnerabilidad zero-day?',
    opciones: [
      'Una vulnerabilidad muy antigua',
      'Una vulnerabilidad desconocida sin parche disponible',
      'Un ataque que dura cero días',
      'Una vulnerabilidad ya corregida'
    ],
    respuestaCorrecta: 1,
    explicacion: 'Zero-day es una vulnerabilidad desconocida por el fabricante, sin parche disponible, muy valiosa para atacantes.'
  },
];

const insertar = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Quiz.deleteMany();
    await Quiz.insertMany(preguntas);
    console.log('✅ Preguntas del quiz insertadas correctamente');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

insertar();
