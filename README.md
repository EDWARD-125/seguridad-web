# Seguridad Web (Fullstack)

App para aprender y practicar conceptos de **seguridad web** mediante contenido interactivo (simuladores) y evaluación por **quiz**. Incluye autenticación con **JWT** y un CRUD de “temas” almacenados en MongoDB.

---

## Stack tecnológico

### Frontend

| Tecnología     | Uso en el proyecto                                   |
|----------------|------------------------------------------------------|
| React          | Vistas y componentes (pages y UI)                    |
| Vite           | Tooling/build del frontend                           |
| React Router   | Navegación y rutas protegidas                        |
| Axios          | Consumo de la API backend                            |
| Context API    | `AuthContext` (sesión/JWT) y `ThemeContext` (preferencias) |


### Backend

| Tecnología | Uso en el proyecto |
|---|---|
| **Node.js** | Runtime del servidor |
| **Express** | API REST (rutas y middlewares) |

**Seguridad / Auth**

| Tecnología | Uso en el proyecto |
|---|---|
| **JWT (`jsonwebtoken`)** | Autenticación y autorización basada en token |
| **Middleware de autenticación** | Valida el token JWT en endpoints protegidos |

**Datos**

| Tecnología | Uso en el proyecto |
|---|---|
| **MongoDB** | Persistencia de usuarios, temas y quizzes |
| **Mongoose** | Modelado y acceso a datos |

**Organización**

| Tecnología / patrón | Uso en el proyecto |
|---|---|
| **Features** | `features/temas` y `features/quiz` |


### Infra local (recomendado)

| Componente | Uso |
|---|---|
| MongoDB local | Base de datos para desarrollo/seed |


---

## Estructura del proyecto

```
seguridad-web/
├── backend/
│   ├── src/
│   │   ├── app.js                # Inicializa Express + middlewares + rutas
│   │   ├── server.js             # Arranque del servidor (puerto, etc.)
│   │   ├── config/
│   │   │   └── db.js            # Conexión a MongoDB (Mongoose)
│   │   ├── features/
│   │   │   ├── temas/
│   │   │   │   ├── controllers/temasController.js
│   │   │   │   └── routes/temas.js
│   │   │   └── quiz/
│   │   │       ├── controllers/quizController.js
│   │   │       └── routes/quiz.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js # Valida JWT
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Tema.js
│   │   │   └── Quiz.js
│   │   ├── routes/
│   │   │   └── authRoutes.js    # /api/auth (login/registro y JWT)
│   │   ├── seed.js             # Seed inicial (usuarios/temas)
│   │   └── seedQuiz.js        # Seed de preguntas para quiz
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api.js               # Cliente HTTP (baseURL, headers, etc.)
│   │   ├── App.jsx              # Router y composición general
│   │   ├── main.jsx             # Bootstrap React
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── RutaProtegida.jsx
│   │   │   ├── PaginaTema.jsx
│   │   │   ├── TarjetaTema.jsx
│   │   │   └── (otros UI)
│   │   ├── pages/
│   │   │   ├── auth/Login.jsx
│   │   │   ├── quiz/Quiz.jsx
│   │   │   ├── tema/DetalleTema.jsx
│   │   │   ├── tema/NuevoTema.jsx
│   │   │   ├── tema/EditarTema.jsx
│   │   │   └── temas/* (Criptografía, Protocolos, Servidores, etc.)
│   │   └── (styles/assets)
│   └── package.json
│
└── README.md
```

---

## Qué hace la app (overview)

1. **Login** con JWT.
2. Navegación por **categorías** (criptografía, protocolos, servidores, detección y técnicas).
3. Vista de **detalle del tema**:
   - Muestra descripción y contenido textual.
   - Si el tema lo requiere, renderiza un **módulo interactivo** (simuladores como César, JWT, TLS, XSS, SQLi, IDS/IPS, Hardening, etc.).
4. **CRUD** de temas (crear/editar/eliminar) para usuarios autenticados.
5. **Quiz** por categoría (preguntas desde MongoDB).

---

## Backend (Express)

### Endpoints principales

- **Auth**
  - `POST /api/auth/login` (según implementación)
  - `POST /api/auth/register` (según implementación)

- **Temas**
  - `GET /api/temas` — obtener todos los temas
  - `GET /api/temas/categoria/:categoria` — filtrar por categoría
  - `GET /api/temas/:id` — obtener un tema por id
  - `POST /api/temas` — crear un tema
  - `PUT /api/temas/:id` — editar un tema
  - `DELETE /api/temas/:id` — eliminar un tema

- **Quiz**
  - `GET /api/quiz/:categoria` — obtener preguntas por categoría
  - `POST /api/quiz` — crear una pregunta (si está contemplado)

### Ejecución (dev)

1. Crear `.env` en `backend/` con al menos:
   - `MONGO_URI`
   - `JWT_SECRET`

2. Arrancar MongoDB local.
3. Levantar backend:
   - `cd backend`
   - `npm run dev`

> Nota: el backend usa `cors()` y `express.json()` en `src/app.js`.

---

## Frontend (React/Vite)

### Ejecución (dev)

1. `cd frontend`
2. `npm install`
3. `npm run dev`

### Rutas del cliente (principales)

- `/login` — inicio de sesión
- `/` — Home (protegida)
- `/criptografia`, `/protocolos`, `/servidores`, `/deteccion`, `/tecnicas` — categorías (protegidas)
- `/tema/:id` — detalle del tema (protegida)
- `/nuevo` — crear tema (protegida)
- `/editar/:id` — editar tema (protegida)
- `/buscar` — buscador (protegida)
- `/quiz/:categoria` — quiz por categoría (protegida)
- `/perfil`, `/configuracion`, `/estadisticas`, `/mis-quizzes` — secciones adicionales (protegidas)

---

## Herramientas y patrones usados

- **Separación por dominios (features / pages):**
  - Backend: `features/temas` y `features/quiz`
  - Frontend: `pages/tema/*` y `pages/temas/*`
- **Rutas protegidas en frontend:**
  - Componente/función de protección que redirige a `/login` si no hay sesión válida.
- **Autenticación por JWT:**
  - Token almacenado en el navegador (localStorage).
  - Backend valida el token con middleware.

---

## Seeds (carga inicial)

El proyecto incluye seeders:
- `backend/src/seed.js`
- `backend/src/seedQuiz.js`

Se usan para poblar MongoDB con datos iniciales (temas y preguntas) para que la app funcione desde el inicio.

---

## Cómo presentar (sugerencia rápida)

Para una demo clara:
1. Ingresar por `/login`.
2. Abrir un tema en `/tema/:id`.
3. Probar el **simulador interactivo** del tema.
4. Ir al **quiz** de esa categoría.

---

## Contacto

Si necesitas ampliar documentación técnica, usa `backend/ESTRUCTURA.md` como complemento.

