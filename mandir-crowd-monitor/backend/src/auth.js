import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";
const TOKEN_TTL = "12h";

// Control-room users. Passwords are plain here for the hackathon; move to
// hashed + a real store if this ever goes beyond a prototype.
const USERS = [
  { id: "1", username: "Admin", email: "admin@trinetra.com", password: "admin123", role: "admin", department: "Control Room" },
  { id: "2", username: "Operator", email: "operator@trinetra.com", password: "operator123", role: "operator", department: "Control Room" },
  { id: "3", username: "Security1", email: "security@trinetra.com", password: "security123", role: "security", department: "Security" },
];

function publicUser(u) {
  const { password, ...rest } = u;
  return rest;
}

// Returns { token, user } or null if the credentials don't match.
export function login(email, password) {
  const user = USERS.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase() && u.password === password
  );
  if (!user) return null;

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: TOKEN_TTL }
  );
  return { token, user: publicUser(user) };
}

// Verify a token and return its payload, or null if invalid/expired.
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// Express middleware: require a valid Bearer token (use to gate admin actions).
export function requireAuth(req, res, next) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  const payload = token && verifyToken(token);
  if (!payload) return res.status(401).json({ error: "unauthorized" });
  req.user = payload;
  next();
}

export function userFromToken(token) {
  const payload = verifyToken(token);
  if (!payload) return null;
  const user = USERS.find((u) => u.id === payload.id);
  return user ? publicUser(user) : null;
}
