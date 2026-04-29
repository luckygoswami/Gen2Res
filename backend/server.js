import { app } from './src/app.js';
import { connectToDB } from './src/config/database.js';
import { configDotenv } from 'dotenv';
configDotenv();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

connectToDB();
