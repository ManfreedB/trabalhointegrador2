import express from 'express';
import { addServico, listServicos, updateServico, deleteServico } from '../controllers/ServicoController.js'
const router = express.Router();

router.post("/cadastro/servico", addServico);
router.get("/listagem/servico", listServicos);
router.put("/update/servico/:id", updateServico);

export default router;

