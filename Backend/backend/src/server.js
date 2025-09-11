import 'dotenv/config';
import app from './app.js';
import { createPool, getPool } from './config/db.js';

const PORT = process.env.PORT || 4000;

async function main() {
  try {
    createPool();
    await getPool().query('SELECT 1'); // sanity chec
    console.log('✅ MySQL conectado');

    app.listen(PORT, () => {
      console.log(`🚀 API escuchando en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar:', err);
    process.exit(1);
  }
}
main();
