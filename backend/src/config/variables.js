import 'dotenv/config';

const {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  FRONTEND_URL,
  GEMINI_API_KEY,
  GOOGLE_CLIENT_ID,
} = process.env;

export {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  FRONTEND_URL,
  GEMINI_API_KEY,
  GOOGLE_CLIENT_ID,
};
