import express from 'express';
import { addCliente, listClientes, getClienteByCNPJ, updateCliente, deleteCliente } from '../controllers/ClienteController.js';
import verifyPermissions from '../middlewares/Permissions.js';

const router = express.Router();

router.post('/cadastro/clientes', verifyPermissions(["empresa", "gerente"]), addCliente);


router.get('/relatorio/clientes', listClientes);


router.get('/clientes/:cnpj', getClienteByCNPJ);


router.put('/update/clientes/:cnpj', verifyPermissions(["empresa", "gerente"]), updateCliente);


router.delete('/delete/clientes/:cnpj', verifyPermissions(["empresa", "gerente"]), deleteCliente);

export default router;
