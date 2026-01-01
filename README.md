**Secure Notes API**

A minimal, secure REST API for storing personal notes built with Node.js, Express and MongoDB. This project demonstrates a pragmatic approach to authentication (JWT), clean separation of concerns, and practical error handling for small backend services.

**Tech Stack**
- **Node.js**: Runtime for the server.
- **Express**: Lightweight HTTP framework for routing and middleware.
- **MongoDB**: Document database for persisting users and notes.
- **Mongoose**: ODM for schema modeling and database operations.
- **JWT**: JSON Web Tokens for stateless authentication.

**What This Project Does**
- **Register & Login**: Users can sign up with an email and password (hashed with bcrypt), then log in to receive a JWT.
- **Create Notes**: Authenticated users can create notes tied to their account.
- **Auth Middleware**: A middleware verifies the bearer token, resolves the user, and attaches it to `req.user` for downstream handlers.

**Design & Thought Process**
- **Keep the API stateless where possible**: use JWTs so the server doesn't need session storage.
- **Separation of concerns**: routes map to controllers; controllers handle request logic and call models; middleware handles cross-cutting concerns (auth, logging, parsing).
- **Fail early and clearly**: return concise HTTP statuses and messages (400 for bad input, 401 for auth issues, 500 for server errors).
- **Security-first basics**: passwords are hashed, tokens expire, and sensitive fields are omitted when attaching user objects to requests.

**How It Works (Request Flow)**
1. Client signs up: `POST /api/users/signup` with `{name,email,password}` → user persisted (password hashed).
2. Client logs in: `POST /api/users/login` with `{email,password}` → server returns `{token}` signed with `JWT_SECRET`.
3. Client calls protected endpoint (for example `POST /api/notes/createNote`) with header `Authorization: Bearer <token>`.
4. `auth` middleware parses header, verifies token, looks up the user, and attaches the user to `req.user`.
5. Controller uses `req.user._id` to create notes scoped to that user.

**Files Overview**
- **`index.js`**: App entry; mounts routes and connects to the DB.
- **`src/config/auth.js`**: JWT verification middleware. Verifies token, fetches user, attaches `req.user`, calls `next()`.
- **`src/controllers/users.controller.js`**: `signUp` and `login` handlers; issues JWTs.
- **`src/controllers/notes.controller.js`**: Handlers for creating and returning notes.
- **`src/models/*.js`**: Mongoose schemas for `User` and `Note`.
- **`src/routes/*.js`**: Route definitions using controllers and middleware.

**Environment Variables**
- **`JWT_SECRET`**: secret used to sign and verify JWT tokens.
- **`MONGO_URI`**: MongoDB connection string.
- **`PORT`**: server port (default 3000).

Example `.env` snippet:

```env
JWT_SECRET=your_strong_secret_here
MONGO_URI=mongodb://localhost:27017/secure-notes
PORT=3000
```

**Installation & Run**
1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
node index.js
```

or (if `dev` script exists):

```bash
npm run dev
```

**Quick API Examples**
- Sign up:

```bash
curl -X POST http://localhost:3000/api/users/signup \
	-H "Content-Type: application/json" \
	-d '{"name":"Alice","email":"alice@example.com","password":"secret"}'
```

- Login (returns token):

```bash
curl -X POST http://localhost:3000/api/users/login \
	-H "Content-Type: application/json" \
	-d '{"email":"alice@example.com","password":"secret"}'
```

- Create note (replace <token>):

```bash
curl -X POST http://localhost:3000/api/notes/createNote \
	-H "Authorization: Bearer <token>" \
	-H "Content-Type: application/json" \
	-d '{"title":"My Note","content":"Safe content"}'
```

**Common Problems & Solutions (Lessons Learned)**
- **Middleware returned early**: If an auth middleware sends a response (for example `res.json(req.user)`) instead of calling `next()`, the controller will never run. Fix: verify token, attach `req.user`, then call `next()`.
- **Wrong header format**: Ensure the header is exactly `Authorization: Bearer <token>`; missing `Bearer ` or misspelled header leads to 401.
- **Token secret mismatch**: `JWT_SECRET` used to sign and verify must match and be loaded via `dotenv`.
- **User not found after decode**: The token payload may have an `userId` but the user may have been deleted — handle this with a 401 and clear messaging.
- **Async errors not propagated**: Always wrap async middleware/controllers with try/catch and return consistent status codes.

**Security Notes**
- Use a strong `JWT_SECRET` and rotate keys when needed.
- Set reasonable token expiry and offer refresh tokens for long sessions.
- Always validate and sanitize inputs before persisting.

**Next Steps & Improvements**
- Add note retrieval, update, and delete endpoints with ownership checks.
- Add request validation (e.g., using `Joi` or `express-validator`).
- Integrate rate limiting and helmet for basic security hardening.

**Contributing**
- Open an issue for bugs or feature requests. Fork and submit a PR for changes.

