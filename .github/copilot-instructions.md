# Copilot instructions (POS)

## Big picture

- Two apps: React client in [front-end/](front-end) and Node/Mongo API in [back-end/](back-end).
- Front-end routing and auth state are centralized: routes in [front-end/src/App.jsx](front-end/src/App.jsx), `AuthProvider` in [front-end/src/context/AuthContext.jsx](front-end/src/context/AuthContext.jsx).
- API access is centralized in [front-end/src/api/axios.js](front-end/src/api/axios.js) with `baseURL` set to `http://localhost:5000/api` and `withCredentials: true` for cookie auth.
- Styling is Tailwind via `@tailwindcss/vite`; global CSS only imports Tailwind in [front-end/src/index.css](front-end/src/index.css).

## Backend patterns & constraints

- JWT auth is cookie-based; middleware reads `user_token` or `admin_token` in [back-end/middlewares/userAuth.js](back-end/middlewares/userAuth.js) and [back-end/middlewares/adminAuth.js](back-end/middlewares/adminAuth.js).
- Auth controllers exist for users and admins in [back-end/controllers/authController.js](back-end/controllers/authController.js) and [back-end/controllers/adminAuthController.js](back-end/controllers/adminAuthController.js).
- Models are Mongoose schemas in [back-end/models/](back-end/models) (e.g., users, products, invoices, notifications). Password checks use helpers like `comparePassword` in [back-end/models/User.js](back-end/models/User.js) and [back-end/models/Admin.js](back-end/models/Admin.js).
- Routing is incomplete: only [back-end/routes/userRoutes.js](back-end/routes/userRoutes.js) exists and it does not export the router yet. There is no server entry file in [back-end/](back-end); avoid adding routes without also adding a server scaffold and a script in [back-end/package.json](back-end/package.json).
- Module format is inconsistent: [back-end/package.json](back-end/package.json) sets CommonJS, but [back-end/controllers/adminAuthController.js](back-end/controllers/adminAuthController.js) uses ES module imports. Be consistent if you add new backend files.

## Front-end conventions

- Pages live in [front-end/src/pages/](front-end/src/pages) and call API endpoints directly using the shared `API` instance.
- Auth context exposes `register`, `login`, `logout` and initializes `user` by calling `/auth/me` on mount in [front-end/src/context/AuthContext.jsx](front-end/src/context/AuthContext.jsx).

## Workflows

- Front-end scripts: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview` in [front-end/package.json](front-end/package.json).
- Back-end has no run scripts yet (only `test` placeholder) in [back-end/package.json](back-end/package.json).

## Integration points

- Client expects endpoints like `/auth/*`, `/products`, `/notifications`, `/invoices`; see usage in [front-end/src/pages/Products.jsx](front-end/src/pages/Products.jsx), [front-end/src/pages/Notifications.jsx](front-end/src/pages/Notifications.jsx), and [front-end/src/pages/Sales.jsx](front-end/src/pages/Sales.jsx).
- Cookies are required for auth; keep `withCredentials: true` consistent on new API calls.
