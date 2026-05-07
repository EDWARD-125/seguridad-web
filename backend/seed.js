const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tema = require('./models/Tema');

dotenv.config();

const datos = [
  {
    titulo: 'Cifrado Simétrico',
    descripcion: 'Usa la misma clave para cifrar y descifrar datos.',
    categoria: 'criptografia',
    contenido: 'Algoritmos: AES, DES, 3DES. Rápido pero requiere compartir la clave de forma segura.'
  },
  {
    titulo: 'Cifrado Asimétrico',
    descripcion: 'Usa clave pública y privada para cifrar y descifrar.',
    categoria: 'criptografia',
    contenido: 'Algoritmos: RSA, ECC. Más seguro para intercambio de claves.'
  },
  {
    titulo: 'HTTPS y TLS',
    descripcion: 'Protocolo seguro para comunicación en la web.',
    categoria: 'protocolos',
    contenido: 'TLS cifra la comunicación entre cliente y servidor. HTTPS = HTTP + TLS.'
  },
  {
    titulo: 'JWT - JSON Web Tokens',
    descripcion: 'Estándar para autenticación y autorización.',
    categoria: 'protocolos',
    contenido: 'Compuesto por header, payload y firma. Usado en APIs REST.'
  },
  {
    titulo: 'Hardening de Servidores',
    descripcion: 'Proceso de asegurar un servidor reduciendo vulnerabilidades.',
    categoria: 'servidores',
    contenido: 'Deshabilitar servicios innecesarios, actualizar parches, configurar firewall.'
  },
  {
    titulo: 'Sistemas IDS/IPS',
    descripcion: 'Sistemas de detección y prevención de intrusiones.',
    categoria: 'deteccion',
    contenido: 'IDS detecta ataques, IPS los bloquea automáticamente.'
  },
  {
    titulo: 'Ataque XSS',
    descripcion: 'Cross-Site Scripting: inyección de scripts maliciosos.',
    categoria: 'tecnicas',
    contenido: 'Defensa: escapar caracteres especiales, usar Content Security Policy.'
  },
  {
    titulo: 'SQL Injection',
    descripcion: 'Inyección de código SQL malicioso en formularios.',
    categoria: 'tecnicas',
    contenido: 'Defensa: usar consultas preparadas (prepared statements), validar inputs.'
  }
];

const insertarDatos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Tema.deleteMany();
    await Tema.insertMany(datos);
    console.log('✅ Datos insertados correctamente');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

insertarDatos();