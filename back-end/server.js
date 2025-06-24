import bodyParser from 'body-parser';
import express from 'express';
import authRoutes from './routes/authRoutes.js'
import ProtectedRoute from './routes/protectedRoutes.js';
import authN from './middlewares/AuthN.js'
import FuncionarioRoutes from './routes/funcionarioRoutes.js'
import tipoServicoRoutes from './routes/tipoServicoRoute.js'
import ClienteRoutes from './routes/clienteRoutes.js'
import ServicoRoutes from './routes/servicoRoutes.js'
import PagamentoRoutes from './routes/pagamentosRoutes.js'
import EmpresaRoutes from './routes/EmpresaRoutes.js'


import cors from 'cors';
const app = express();
app.use(express.json());
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(authRoutes);
app.use(authN);
app.use('/protected', ProtectedRoute);
app.use(FuncionarioRoutes);
app.use(ClienteRoutes);
app.use(tipoServicoRoutes);
app.use(ServicoRoutes);
app.use(PagamentoRoutes);
app.use(EmpresaRoutes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));