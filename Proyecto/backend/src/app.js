import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './api.router.js';

const app = express();

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', apiRouter);

app.use((_req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));

export default app;
