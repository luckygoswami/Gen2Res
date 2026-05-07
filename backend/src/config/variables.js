import 'dotenv/config';

const { PORT, MONGODB_URI, JWT_SECRET, FRONTEND_URL, GEMINI_API_KEY } =
  process.env;

export { PORT, MONGODB_URI, JWT_SECRET, FRONTEND_URL, GEMINI_API_KEY };
