import Empresa from "../models/Empresa.js";
import Servico from "../models/servico.js";
import Funcionario from "../models/Funcionario.js";


export const addServico = async (req, res) => {
    const { dataRealizacao, descricao, clienteCNPJ, tipoServicoId, dataCadastro, valor } = req.body;

    if (!dataRealizacao || !descricao || !clienteCNPJ || !tipoServicoId) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        await Servico.add(dataRealizacao, descricao, clienteCNPJ, tipoServicoId, dataCadastro, valor);
        return res.status(201).json({ message: "Serviço adicionado com sucesso!" });
    } catch (error) {
        console.error("Erro ao adicionar serviço: ", error);
        return res.status(500).json({ message: "Erro interno ao adicionar serviço." });
    }
};

export const listServicos = async (req, res) => {
    try {
        const conta = req.user.conta;
        let user = await Empresa.findByConta(conta);
        let cnpjEmpresa;
        if (user) {
            cnpjEmpresa = user.cnpj
        } else {
            user = await Funcionario.findByConta(conta);
            cnpjEmpresa = user.empresacnpj;
        }
        console.log(cnpjEmpresa);
        const servicos = await Servico.listByEmpresa(cnpjEmpresa)
        const servicosFormatados = servicos.map((servico) => ({
            ...servico,
            datarealizacao: new Intl.DateTimeFormat("pt-BR").format(new Date(servico.datarealizacao)),
        }));
        return res.status(200).json(servicosFormatados);
    } catch (error) {
        console.error("Erro ao listar serviços: ", error);
        return res.status(500).json({ message: "Erro interno ao listar serviços." });
    }
};

export const getServicoById = async (req, res) => {
    const { id } = req.params;
    try {
        const servico = await Servico.findById(id);

        if (!servico) {
            return res.status(404).json({ message: "Serviço não encontrado." });
        }

        return res.status(200).json(servico);
    } catch (error) {
        console.error("Erro ao buscar serviço: ", error);
        return res.status(500).json({ message: "Erro interno ao buscar serviço." });
    }
};

export const updateServico = async (req, res) => {
    const { id } = req.params;
    const { clientecnpj, tipo_id } = req.body;
    try {
        await Servico.update(id, clientecnpj, tipo_id);
        return res.status(200).json({ message: "Serviço atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar serviço: ", error);
        return res.status(500).json({ message: "Erro interno ao atualizar serviço." });
    }
};

export const deleteServico = async (req, res) => {
    const { id } = req.params;
    try {
        await Servico.delete(id);
        return res.status(200).json({ message: "Serviço deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar serviço: ", error);
        return res.status(500).json({ message: "Erro interno ao deletar serviço." });
    }
};
