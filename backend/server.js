import { app } from '#src/app.js';
import { connectToDB } from '#config/database.js';
import { PORT } from '#config/variables.js';

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

connectToDB();
