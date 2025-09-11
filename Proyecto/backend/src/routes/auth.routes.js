import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { findByRegistroAuth, findByRegistroAndEmail, updatePasswordById } from '../repositories/users.repo.js';

const router = Router();

const LoginSchema = z.object({
  registro: z.string().trim().min(1),
  password: z.string().min(1).optional(),
  contraseña: z.string().min(1).optional()
}).refine(d => d.password || d.contraseña, { message: 'Falta contraseña', path: ['password'] });

const ForgotSchema = z.object({
  registro: z.string().trim().min(1),
  email: z.string().trim().email(),
  newPassword: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres')
});

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';  

router.post('/login', async (req, res) => {
  try {
    const body = LoginSchema.parse(req.body);
    const registro = body.registro.trim();
    const password = String(body.password ?? body.contraseña);

    const user = await findByRegistroAuth(registro);
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const isPasswordCorrect = bcrypt.compareSync(password, user.password_hash);
    if (!isPasswordCorrect) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ sub: user.id, registro: user.registro }, JWT_SECRET, { expiresIn: '2h' });

    res.json({
      token,
      user: { 
        id: user.id, 
        registro: user.registro, 
        nombres: user.nombres, 
        apellidos: user.apellidos, 
        email: user.email 
      }
    });
  } catch (err) {
    if (err?.name === 'ZodError') {
      return res.status(400).json({ message: 'Datos inválidos', errors: err.errors });
    }
    console.error(err);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const body = ForgotSchema.parse(req.body);
    const user = await findByRegistroAndEmail(body.registro.trim(), body.email.toLowerCase().trim());
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const hashedPassword = bcrypt.hashSync(body.newPassword, 10);
    await updatePasswordById(user.id, hashedPassword);
    res.json({ message: 'Contraseña actualizada' });
  } catch (err) {
    if (err?.name === 'ZodError') {
      return res.status(400).json({ message: 'Datos inválidos', errors: err.errors });
    }
    console.error(err);
    res.status(500).json({ message: 'No se pudo actualizar la contraseña' });
  }
});

export default router;
