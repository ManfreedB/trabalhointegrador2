import { login } from '../controllers/AuthController.js';
import { createEmpresa } from '../controllers/EmpresaController.js';
import express from 'express';
const router = express.Router();
router.post('/login', login);
router.post('/cadastro', createEmpresa);

export default router;