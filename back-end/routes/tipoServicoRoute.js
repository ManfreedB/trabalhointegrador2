import express from 'express';
import { addTipoServico, listTipoServicos, updateTipoServico, deleteTipoServico } from '../controllers/TipoServicoController.js'
import verifyPermissions from '../middlewares/Permissions.js';
const router = express.Router();

router.post('/cadastro/tipoServico', verifyPermissions(["empresa", "gerente"]), addTipoServico);
router.get('/listagem/tipoServico', listTipoServicos);
router.put('/update/tipoServico/:id', verifyPermissions(["empresa", "gerente"]), updateTipoServico);
router.delete('/excluir/tipoServico/:id', verifyPermissions(["empresa", "gerente"]), deleteTipoServico);
export default router;