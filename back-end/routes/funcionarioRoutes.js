import express from 'express';
import verifyPermissions from '../middlewares/Permissions.js';
import {
    addFuncionario,
    listFuncionarios,
    updateFuncionario,
    deleteFuncionario,
    getFuncionarioByConta
} from '../controllers/FuncionarioController.js';

const router = express.Router();

router.post('/cadastro/funcionarios', verifyPermissions(["empresa", "gerente"]), addFuncionario);

router.get('/relatorio/funcionarios', listFuncionarios);

router.get('/funcionarios/dados/:conta', getFuncionarioByConta);

router.put('/update/funcionarios/:cpf', verifyPermissions(["empresa", "gerente"]), updateFuncionario);

router.delete('/excluir/funcionarios/:cpf', verifyPermissions(["empresa", "gerente"]), deleteFuncionario);

export default router;
