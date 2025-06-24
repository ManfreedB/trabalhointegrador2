import db from '../services/db.js';

const Pagamento = {
    add: async (datacadastro, valor, servicoid) => {
        try {

            const resultado = await db.none(
                'INSERT INTO pagamento(valor, datacadastro, servicoid) VALUES($1, $2, $3)',
                [valor, datacadastro, servicoid]
            );
            return resultado;
        } catch (error) {
            throw new Error("Erro ao registrar pagamento: " + error.message);
        }
    },

    listPagamentoByEmpresa: async (empresaCnpj) => {
        try {
            const result = await db.any(
                `SELECT p.datacadastro,
                 p.valor,
                 p.datafechado,
                 s.descricao,
                 a.clientecnpj
                 FROM pagamento p
                 INNER JOIN servico s ON s.id = p.servicoid
                 INNER JOIN atende a ON a.clientecnpj = s.clientecnpj
                 WHERE a.empresacnpj = $1`,
                [empresaCnpj]
            );
            return result;
        } catch (error) {
            throw new Error("Erro ao listar pagamentos por empresa: " + error.message);
        }
    },

    listPagamentoByEmpresaAndDataFechadoNull: async (empresaCnpj) => {
        try {
            const result = await db.any(
                `SELECT p.id,
                 p.datacadastro,
                 p.valor,
                 p.datafechado,
                 s.descricao,
                 a.clientecnpj, 
                 c.nomeempresa,
                 c.rua,
                 c.cidade,
                 c.estado,
                 e.nomeempresa,
                 e.cnpj
                 FROM pagamento p
                 JOIN servico s ON s.id = p.servicoid
                 JOIN cliente c ON s.clientecnpj = c.cnpj
                 INNER JOIN atende a ON a.clientecnpj = c.cnpj
                 JOIN empresa e ON a.empresacnpj = e.cnpj
                 WHERE a.empresacnpj = $1
                 AND p.datafechado IS NULL`,
                [empresaCnpj]
            );
            return result;
        } catch (error) {
            throw new Error("Erro ao listar pagamentos por empresa e com datafechado null: " + error.message);
        }
    },

    listPagamentosMensais: async (empresaCnpj) => {
        try {
            const result = await db.any(`SELECT 
                EXTRACT(YEAR from p.datacadastro) AS ano,
                EXTRACT(MONTH from p.datacadastro) AS mes,
                SUM(p.valor) AS total_valor
                FROM pagamento p
                JOIN servico s ON s.id = p.servicoid
                JOIN atende a ON a.clientecnpj = s.clientecnpj
                WHERE a.empresacnpj = $1
                GROUP BY ano, mes
                ORDER BY ano ASC, mes ASC
                `, [empresaCnpj]);
            return result;
        } catch (error) {
            throw new Error("Erro ao listar pagamentos mensais: " + error.message);
        }
    },


    findById: async (id) => {
        try {
            const resultado = await db.oneOrNone('SELECT * FROM pagamento WHERE id = $1', [id]);
            return resultado;
        } catch (error) {
            throw new Error("Erro ao buscar pagamento por ID: " + error.message);
        }
    },

    update: async (id, datafechado) => {
        try {
            await db.none(
                'UPDATE pagamento SET  datafechado = $2  WHERE id = $1',
                [id, datafechado]
            );
        } catch (error) {
            throw new Error("Erro ao atualizar pagamento: " + error.message);
        }
    },

    delete: async (id) => {
        try {
            await db.none('DELETE FROM pagamento WHERE id = $1', [id]);
        } catch (error) {
            throw new Error("Erro ao excluir pagamento: " + error.message);
        }
    }
};

export default Pagamento;
