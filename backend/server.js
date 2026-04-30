import { app } from '#src/app.js';
import { connectToDB } from '#config/database.js';
import 'dotenv/config';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

connectToDB();
