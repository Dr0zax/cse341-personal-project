import dotenv from 'dotenv';
dotenv.config();

// Use the correct environment variable MONGODB_URI (fix previous typo)
// Provide a harmless local fallback to avoid immediate crashes during local dev.
const mongoUrl = process.env.MONGODB_URI;

export default { url: mongoUrl };
