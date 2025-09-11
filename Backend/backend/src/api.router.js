import { Router } from 'express';
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));
router.use('/users', usersRoutes);  
router.use('/auth', authRoutes);    
router.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  console.error(err.stack);
  res.status(statusCode).json({ message });
});

export default router;
