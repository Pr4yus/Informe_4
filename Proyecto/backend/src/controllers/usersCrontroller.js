import bcrypt from 'bcryptjs';
import { findAll, findById, findByRegistro, findByEmail, insertUser, updateUserNoPass, updateUserWithPass, deleteUser } from '../repositories/users.repo.js';

export const createUser = async (req, res) => {
  const { registro, nombres, apellidos, email, contraseña } = req.body;

  try {
    if (await findByRegistro(registro)) return res.status(409).json({ message: 'El registro ya existe' });
    if (await findByEmail(email)) return res.status(409).json({ message: 'El email ya existe' });

    const password_hash = bcrypt.hashSync(contraseña, 10);

    const id = await insertUser({ registro, nombres, apellidos, email, password_hash });

    const user = await findById(id);
    res.status(201).json(user);  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};

export const getAllUsers = async (_req, res) => {
  try {
    const users = await findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await findById(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { registro, nombres, apellidos, email, contraseña } = req.body;

  try {
    const user = await findById(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (email && email !== user.email && await findByEmail(email)) {
      return res.status(409).json({ message: 'El email ya está en uso' });
    }
    if (registro && registro !== user.registro && await findByRegistro(registro)) {
      return res.status(409).json({ message: 'El registro ya está en uso' });
    }

    if (contraseña) {
      const password_hash = bcrypt.hashSync(contraseña, 10);
      await updateUserWithPass(id, { registro, nombres, apellidos, email, password_hash });
    } else {
      await updateUserNoPass(id, { registro, nombres, apellidos, email });
    }

    const updatedUser = await findById(id);
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await findById(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    await deleteUser(id);
    res.status(204).end();  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};
