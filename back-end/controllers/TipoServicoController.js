import TipoServico from "../models/TipoServico.js";
export const addTipoServico = async (req, res) => {
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
        return res.status(400).json({ message: "Nome e descrição são obrigatórios." });
    }

    try {
        await TipoServico.add(nome, descricao);
        return res.status(201).json({ message: "Tipo de serviço adicionado com sucesso!" });
    } catch (error) {
        console.error("Erro ao adicionar tipo de serviço: ", error);
        return res.status(500).json({ message: "Erro interno ao adicionar tipo de serviço." });
    }
};

export const listTipoServicos = async (req, res) => {
    try {
        const tipos = await TipoServico.list();
        return res.status(200).json(tipos);
    } catch (error) {
        console.error("Erro ao listar tipos de serviço: ", error);
        return res.status(500).json({ message: "Erro interno ao listar tipos de serviço." });
    }
};

export const getTipoServicoById = async (req, res) => {
    const { id } = req.params;
    try {
        const tipoServico = await TipoServico.findById(id);

        if (!tipoServico) {
            return res.status(404).json({ message: "Tipo de serviço não encontrado." });
        }

        return res.status(200).json(tipoServico);
    } catch (error) {
        console.error("Erro ao buscar tipo de serviço: ", error);
        return res.status(500).json({ message: "Erro interno ao buscar tipo de serviço." });
    }
};

export const updateTipoServico = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
        await TipoServico.update(id, nome, descricao);
        return res.status(200).json({ message: "Tipo de serviço atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar tipo de serviço: ", error);
        return res.status(500).json({ message: "Erro interno ao atualizar tipo de serviço." });
    }
};

export const deleteTipoServico = async (req, res) => {
    const { id } = req.params;
    try {
        await TipoServico.delete(id);
        return res.status(200).json({ message: "Tipo de serviço deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar tipo de serviço: ", error);
        return res.status(500).json({ message: "Erro interno ao deletar tipo de serviço." });
    }
};
