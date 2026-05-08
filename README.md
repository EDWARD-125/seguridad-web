# Seguridad Web — Proyecto Fullstack

Este proyecto es una aplicación de seguridad web con frontend en React/Vite y backend en Node.js/Express + MongoDB.

## Características

- CRUD completo para temas de seguridad
- Navegación por categorías: criptografía, protocolos, servidores, detección y técnicas de ataque
- Quiz por categoría con preguntas almacenadas en MongoDB
- Páginas de login y administración de temas (crear/editar/eliminar)
- Backend organizado en features para temas y quiz
- Frontend organizado en pages por dominio y componentes reutilizables

## Estructura del proyecto

```
seguridad-web/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── features/
│   │   ├── quiz/
│   │   │   ├── controllers/quizController.js
│   │   │   └── routes/quiz.js
│   │   └── temas/
│   │       ├── controllers/temasController.js
│   │       └── routes/temas.js
│   ├── models/
│   │   ├── Quiz.js
│   │   └── Tema.js
│   ├── seed.js
│   ├── seedQuiz.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── quiz/
│   │   │   ├── tema/
│   │   │   └── temas/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── vite.config.ts
│   └── package.json
└── README.md
```

## Backend

### Configuración
1. Instala dependencias: `npm install`
2. Copia o crea un archivo `.env` con `MONGO_URI` y otros datos necesarios
3. Inicia MongoDB localmente

### Ejecutar
En diferentes terminales:

**Terminal 1 — MongoDB:**
```bash
cd backend
mongod
```

**Terminal 2 — Backend:**
```bash
cd backend
npm run dev
```

### Rutas principales
- `GET /api/temas` — obtener todos los temas
- `GET /api/temas/categoria/:categoria` — obtener temas por categoría
- `GET /api/temas/:id` — obtener un tema por id
- `POST /api/temas` — crear un tema
- `PUT /api/temas/:id` — editar un tema
- `DELETE /api/temas/:id` — eliminar un tema
- `GET /api/quiz/:categoria` — obtener preguntas del quiz por categoría
- `POST /api/quiz` — crear una pregunta del quiz

## Frontend

### Ejecutar
**Terminal 3 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Rutas del cliente
- `/` — página principal
- `/criptografia`, `/protocolos`, `/servidores`, `/deteccion`, `/tecnicas` — páginas de categoría
- `/tema/:id` — detalles del tema
- `/nuevo` — crear tema
- `/editar/:id` — editar tema
- `/buscar` — buscador
- `/quiz/:categoria` — quiz por categoría
- `/login` — login

## Notas

- El proyecto está diseñado para separar responsabilidades en carpetas por dominio.
- El archivo `seedQuiz.js` permite cargar preguntas de quiz en la base de datos.
- El backend usa Express y Mongoose para comunicarse con MongoDB.
- El frontend usa Vite y React Router para la navegación.

## Contacto

Usa este README como referencia inicial para entender la estructura y arrancar el proyecto.
