import Empresa from '../models/Empresa.js';
import bcrypt from 'bcrypt';
export const createEmpresa = async (req, res) => {
    const { cnpj, nome, conta, senha } = req.body;

    if (!cnpj || !nome || !conta || !senha) {
        return res.status(400).send({ message: 'Preencha todos os campos obrigatórios!' });
    }

    try {
        const hashedSenha = await bcrypt.hash(senha, 10);

        await Empresa.add(cnpj, nome, conta, hashedSenha);

        res.status(201).send({ message: 'Empresa criada com sucesso!' });
    } catch (error) {
        console.error("Erro ao criar empresa:", error);
        res.status(500).send({ message: 'Erro interno ao criar empresa.' });
    }
};

export const listEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.list();

        if (!empresas.length) {
            return res.status(404).send({ message: 'Nenhuma empresa encontrada.' });
        }

        res.status(200).send(empresas);
    } catch (error) {
        console.error("Erro ao listar empresas:", error);
        res.status(500).send({ message: 'Erro interno ao listar empresas.' });
    }
};

export const getEmpresaByCnpj = async (req, res) => {
    const { cnpj } = req.params;
    console.log(req.params);

    if (!cnpj) {
        return res.status(400).send({ message: 'CNPJ é obrigatório!' });
    }

    try {
        const empresa = await Empresa.findByCnpj(cnpj);

        if (!empresa) {
            return res.status(404).send({ message: 'Empresa não encontrada.' });
        }

        res.status(200).send(empresa);
    } catch (error) {
        console.error("Erro ao buscar empresa por CNPJ:", error);
        res.status(500).send({ message: 'Erro interno ao buscar empresa.' });
    }
};

export const getEmpresaByConta = async (req, res) => {
    const { conta } = req.params;

    if (!conta) {
        return res.status(400).send({ message: 'CNPJ é obrigatório!' });
    }

    try {
        const empresa = await Empresa.findByConta(conta);

        if (!empresa) {
            return res.status(404).send({ message: 'Empresa não encontrada.' });
        }

        res.status(200).send(empresa);
    } catch (error) {
        console.error("Erro ao buscar empresa por conta:", error);
        res.status(500).send({ message: 'Erro interno ao buscar empresa.' });
    }
};

export const updateEmpresa = async (req, res) => {
    const { cnpj } = req.params;
    const { nome, conta, senha } = req.body;

    if (!cnpj || !nome || !conta || !senha) {
        return res.status(400).send({ message: 'Preencha todos os campos obrigatórios!' });
    }

    try {
        const hashedSenha = await bcrypt.hash(senha, 10);

        const updated = await Empresa.update(cnpj, nome, conta, hashedSenha);

        if (!updated) {
            return res.status(404).send({ message: 'Empresa não encontrada.' });
        }

        res.status(200).send({ message: 'Empresa atualizada com sucesso!' });
    } catch (error) {
        console.error("Erro ao atualizar empresa:", error);
        res.status(500).send({ message: 'Erro interno ao atualizar empresa.' });
    }
};

export const deleteEmpresa = async (req, res) => {
    const { cnpj } = req.params;

    if (!cnpj) {
        return res.status(400).send({ message: 'CNPJ é obrigatório!' });
    }

    try {
        const deleted = await Empresa.delete(cnpj);

        if (!deleted) {
            return res.status(404).send({ message: 'Empresa não encontrada.' });
        }

        res.status(200).send({ message: 'Empresa excluída com sucesso!' });
    } catch (error) {
        console.error("Erro ao excluir empresa:", error);
        res.status(500).send({ message: 'Erro interno ao excluir empresa.' });
    }
};
