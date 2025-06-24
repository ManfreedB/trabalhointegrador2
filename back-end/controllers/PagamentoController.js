import Pagamento from '../models/Pagamento.js';
import Funcionario from '../models/Funcionario.js';
import Empresa from '../models/Empresa.js';

export const listPagamentosByEmpresa = async (req, res) => {
    const conta = req.user.conta;
    let user = await Empresa.findByConta(conta);
    let cnpjEmpresa;
    if (user) {
        cnpjEmpresa = user.cnpj
    } else {
        user = await Funcionario.findByConta(conta);
        cnpjEmpresa = user.empresacnpj;

    }

    try {
        const pagamentos = await Pagamento.listPagamentoByEmpresa(cnpjEmpresa);
        return res.status(200).json(pagamentos);
    } catch (error) {
        console.error("Erro ao listar pagamentos: ", error);
        return res.status(500).json({ message: "Erro interno ao listar pagamentos." });
    }
};

export const ganhosMensais = async (req, res) => {
    const conta = req.user.conta;
    let user = await Empresa.findByConta(conta);
    let cnpjEmpresa;
    if (user) {
        cnpjEmpresa = user.cnpj
    } else {
        user = await Funcionario.findByConta(conta);
        cnpjEmpresa = user.empresacnpj;
    }
    try {
        const pagamentosMensais = await Pagamento.listPagamentosMensais(cnpjEmpresa);
        return res.json(pagamentosMensais);
    } catch (error) {
        console.error("Erro ao obter pagamentos mensais:", error);
        return res.status(500).json({ message: "Erro ao obter pagamentos mensais" });
    }

}

export const listPagamentosNull = async (req, res) => {
    const conta = req.user.conta;
    let user = await Empresa.findByConta(conta);
    let cnpjEmpresa;
    if (user) {
        cnpjEmpresa = user.cnpj
    } else {
        user = await Funcionario.findByConta(conta);
        cnpjEmpresa = user.empresacnpj;
    }
    try {
        const pagamentos = await Pagamento.listPagamentoByEmpresaAndDataFechadoNull(cnpjEmpresa);
        return res.status(200).json(pagamentos);
    } catch (error) {
        console.error("Erro ao listar pagamentos com datafechado nulo: ", error);
        return res.status(500).json({ message: "Erro ao listar pagamentos com datafechado nulo." });
    }
};

export const getPagamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const pagamento = await Pagamento.findById(id);
        if (!pagamento) {
            return res.status(404).json({ message: "Pagamento não encontrado." });
        }
        return res.status(200).json(pagamento);
    } catch (error) {
        console.error("Erro ao buscar pagamento: ", error);
        return res.status(500).json({ message: "Erro interno ao buscar pagamento." });
    }
};

export const updatePagamento = async (req, res) => {
    const { id } = req.params;
    const datafechado = new Date().toLocaleDateString('pt-BR');


    try {
        const pagamentoExistente = await Pagamento.findById(id);
        if (!pagamentoExistente) {
            return res.status(404).json({ message: 'Pagamento não encontrado.' });
        }

        await Pagamento.update(id, datafechado);
        return res.status(200).json({ message: 'Pagamento atualizado com sucesso!' });
    } catch (error) {
        console.error("Erro ao atualizar pagamento: ", error);
        return res.status(500).json({ message: 'Erro ao atualizar pagamento.' });
    }
};

export const deletePagamento = async (req, res) => {
    const { id } = req.params;
    try {
        const pagamentoExistente = await Pagamento.findById(id);
        if (!pagamentoExistente) {
            return res.status(404).json({ message: 'Pagamento não encontrado.' });
        }

        await Pagamento.delete(id);
        return res.status(200).json({ message: 'Pagamento excluído com sucesso!' });
    } catch (error) {
        console.error("Erro ao excluir pagamento: ", error);
        return res.status(500).json({ message: 'Erro ao excluir pagamento.' });
    }
};
