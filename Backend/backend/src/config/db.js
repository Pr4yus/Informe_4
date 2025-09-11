import mysql from 'mysql2/promise';

let pool;

export function createPool() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT || 3306),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    pool.getConnection()
      .then(() => console.log('✅ Conexión a MySQL exitosa'))
      .catch((err) => {
        console.error('❌ Error al conectar a MySQL:', err.message);
        process.exit(1); 
      });
  } catch (err) {
    console.error('❌ Error al crear el pool de conexiones:', err.message);
    process.exit(1); 
  }
}

export function getPool() {
  if (!pool) throw new Error('❌ Pool de MySQL no inicializado');
  return pool;
}
