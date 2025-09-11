import { getPool } from '../config/db.js';

export async function findAll() {
  try {
    const [rows] = await getPool().query(
      'SELECT id AS _id, registro, nombres, apellidos, email, created_at FROM users ORDER BY id DESC'
    );
    return rows;
  } catch (err) {
    console.error('Error al obtener todos los usuarios:', err.message);
    throw err;  
  }
}

export async function findById(id) {
  try {
    const [rows] = await getPool().query(
      'SELECT id AS _id, registro, nombres, apellidos, email, created_at FROM users WHERE id=?',
      [id]
    );
    return rows[0] || null;
  } catch (err) {
    console.error('Error al obtener usuario por ID:', err.message);
    throw err;
  }
}

export async function findByRegistro(registro) {
  try {
    const [rows] = await getPool().query('SELECT * FROM users WHERE registro=? LIMIT 1', [registro]);
    return rows[0] || null;
  } catch (err) {
    console.error('Error al buscar usuario por registro:', err.message);
    throw err;
  }
}

export async function findByEmail(email) {
  try {
    const [rows] = await getPool().query('SELECT * FROM users WHERE email=? LIMIT 1', [email]);
    return rows[0] || null;
  } catch (err) {
    console.error('Error al buscar usuario por email:', err.message);
    throw err;
  }
}

export async function findByRegistroAuth(registro) {
  try {
    const [rows] = await getPool().query(
      'SELECT id, registro, nombres, apellidos, email, password_hash FROM users WHERE registro=? LIMIT 1',
      [registro]
    );
    return rows[0] || null;
  } catch (err) {
    console.error('Error al buscar usuario por registro (auth):', err.message);
    throw err;
  }
}

export async function findByRegistroAndEmail(registro, email) {
  try {
    const [rows] = await getPool().query(
      'SELECT id, registro, email FROM users WHERE registro=? AND email=? LIMIT 1',
      [registro, email]
    );
    return rows[0] || null;
  } catch (err) {
    console.error('Error al buscar usuario por registro y email:', err.message);
    throw err;
  }
}

export async function insertUser({ registro, nombres, apellidos, email, password_hash }) {
  try {
    const [res] = await getPool().query(
      'INSERT INTO users (registro, nombres, apellidos, email, password_hash) VALUES (?,?,?,?,?)',
      [registro, nombres, apellidos, email, password_hash]
    );
    return res.insertId;  
  } catch (err) {
    console.error('Error al insertar nuevo usuario:', err.message);
    throw err;
  }
}

export async function updateUserNoPass(id, { registro, nombres, apellidos, email }) {
  try {
    await getPool().query(
      `UPDATE users SET
        registro = COALESCE(?, registro),
        nombres = COALESCE(?, nombres),
        apellidos = COALESCE(?, apellidos),
        email = COALESCE(?, email)
      WHERE id=?`,
      [registro ?? null, nombres ?? null, apellidos ?? null, email ?? null, id]
    );
  } catch (err) {
    console.error('Error al actualizar usuario sin contraseña:', err.message);
    throw err;
  }
}

export async function updateUserWithPass(id, { registro, nombres, apellidos, email, password_hash }) {
  try {
    await getPool().query(
      `UPDATE users SET
        registro = COALESCE(?, registro),
        nombres = COALESCE(?, nombres),
        apellidos = COALESCE(?, apellidos),
        email = COALESCE(?, email),
        password_hash = ?
      WHERE id=?`,
      [registro ?? null, nombres ?? null, apellidos ?? null, email ?? null, password_hash, id]
    );
  } catch (err) {
    console.error('Error al actualizar usuario con contraseña:', err.message);
    throw err;
  }
}

export async function updatePasswordById(id, password_hash) {
  try {
    await getPool().query('UPDATE users SET password_hash=? WHERE id=?', [password_hash, id]);
  } catch (err) {
    console.error('Error al actualizar la contraseña del usuario:', err.message);
    throw err;
  }
}

export async function deleteUser(id) {
  try {
    await getPool().query('DELETE FROM users WHERE id=?', [id]);
  } catch (err) {
    console.error('Error al eliminar usuario:', err.message);
    throw err;
  }
}
