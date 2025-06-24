import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Funcionario from '../models/Funcionario.js';
import Empresa from '../models/Empresa.js';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
    const { conta, senha } = req.body;
    console.log(conta, senha);
    console.log(process.env.SECRET_JWT);
    if (!conta || !senha) return res.status(401).send({ message: 'Informe email/senha' });

    try {
        let user = await Funcionario.findByConta(conta);
        if (!user) {
            user = await Empresa.findByConta(conta);
        }
        if (!user) return res.status(401).send({ message: 'Usuário ou Senha inválidos!' });

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) return res.status(401).send({ message: 'Usuário ou Senha inválidos!' });

        const token = jwt.sign(
            {
                user: {
                    conta: user.conta,
                    cargo: user.cargo,
                },
            },
            process.env.SECRET_JWT, { expiresIn: '1d' }
        );

        res.status(200).send({
            user: {
                conta: user.conta,
                cargo: user.cargo,
            },
            token,
        });
    } catch (error) {
        console.error("Erro ao realizar login do funcionário: ", error);
        return res.status(500).send({ message: 'Erro interno ao realizar login.' });
    }
};
