import express from 'express';
import { listPagamentosByEmpresa, listPagamentosNull, updatePagamento, deletePagamento, ganhosMensais } from '../controllers/PagamentoController.js'
import verifyPermissions from '../middlewares/Permissions.js';

const router = express.Router();

router.get('/relatorio/pagamentos', listPagamentosByEmpresa);

router.get('/relatorio/pagamentosAbertos', listPagamentosNull);

router.put('/update/pagamentos/:id', updatePagamento);

router.get("/dashboard/ganhosMensais", verifyPermissions(["empresa", "gerente"]), ganhosMensais)

router.delete('/pagamentos/:id', deletePagamento);

export default router;
