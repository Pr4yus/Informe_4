import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import {
  findAll, findById, findByRegistro, findByEmail,
  insertUser, updateUserNoPass, updateUserWithPass, deleteUser
} from '../repositories/users.repo.js';

const router = Router();

const UserSchema = z.object({
  registro: z.string().trim().min(1, 'Registro requerido'),
  nombres: z.string().trim().min(1, 'Nombres requeridos'),
  apellidos: z.string().trim().min(1, 'Apellidos requeridos'),
  contraseña: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  email: z.string().email('Email inválido').trim()
});

const UpdateSchema = z.object({
  registro: z.string().trim().min(1).optional(),
  nombres: z.string().trim().min(1).optional(),
  apellidos: z.string().trim().min(1).optional(),
  contraseña: z.string().min(6).optional(),
  email: z.string().email().trim().optional()
});

router.get('/', async (_req, res) => {
  const rows = await findAll();
  res.json(rows);
});

router.post('/', async (req, res) => {
  try {
    const data = UserSchema.parse(req.body);

    if (await findByRegistro(data.registro))
      return res.status(409).json({ message: 'El registro ya existe' });

    if (await findByEmail(data.email))
      return res.status(409).json({ message: 'El email ya existe' });

    const password_hash = bcrypt.hashSync(data.contraseña, 10);
    const id = await insertUser({
      registro: data.registro,
      nombres: data.nombres,
      apellidos: data.apellidos,
      email: data.email,
      password_hash
    });

    const user = await findById(id);
    res.status(201).json(user);
  } catch (err) {
    if (err?.name === 'ZodError')
      return res.status(400).json({ message: 'Datos inválidos', errors: err.errors });
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const exists = await findById(id);
    if (!exists) return res.status(404).json({ message: 'No encontrado' });

    const payload = UpdateSchema.parse(req.body);

    if (payload.email) {
      const u = await findByEmail(payload.email);
      if (u && u.id !== id) return res.status(409).json({ message: 'Email ya en uso' });
    }
    if (payload.registro) {
      const u = await findByRegistro(payload.registro);
      if (u && u.id !== id) return res.status(409).json({ message: 'Registro ya en uso' });
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'contraseña') && payload.contraseña) {
      const password_hash = bcrypt.hashSync(payload.contraseña, 10);
      await updateUserWithPass(id, { ...payload, password_hash });
    } else {
      await updateUserNoPass(id, payload);
    }

    const user = await findById(id);
    res.json(user);
  } catch (err) {
    if (err?.name === 'ZodError')
      return res.status(400).json({ message: 'Datos inválidos', errors: err.errors });
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const exists = await findById(id);
  if (!exists) return res.status(404).json({ message: 'No encontrado' });
  await deleteUser(id);
  res.status(204).end();
});

export default router;
