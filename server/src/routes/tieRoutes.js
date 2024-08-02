import express from 'express';
import { getTies } from '../controllers/tieController.js';

const router = express.Router();

router.get('/ties', getTies);

// Agrega más rutas aquí

export default router;