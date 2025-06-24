import db from '../services/db.js';
import Pagamento from './Pagamento.js';

const Servico = {
    add: async (datarealizacao, descricao, clientecnpj, tiposervicoid, datacadastro, valor) => {
        try {
            const resultado = await db.one(
                'INSERT INTO servico(datarealizacao, descricao, clientecnpj, tiposervicoid) VALUES($1, $2, $3, $4) returning id',
                [datarealizacao, descricao, clientecnpj, tiposervicoid]
            );
            Pagamento.add(datacadastro, valor, resultado.id);
            return resultado;
        } catch (error) {
            throw new Error("Erro ao adicionar serviço: " + error.message);
        }
    },

    listByCliente: async (clientecnpj) => {
        try {
            const resultado = await db.any(`SELECT * FROM servico WHERE clientecnpj = ANY($1::text[])`,
                [clientecnpj]);
            return resultado;
        } catch (error) {
            throw new Error("Erro na listagem de serviços: " + error.message);
        }
    },

    listByEmpresa: async (empresacnpj) => {
        try {
            const resultado = await db.any(
                `SELECT s.id,
                        s.datarealizacao, 
                        s.descricao, 
                        s.clientecnpj,
                        c.nomeempresa,
                        ts.nome AS tipo_nome,
                        ts.id AS tipo_id
                    FROM 
                        servico s
                    JOIN 
                        cliente c ON s.clientecnpj = c.cnpj
                    JOIN
                        atende a ON a.clientecnpj = c.cnpj
                    JOIN 
                        tiposervico ts ON s.tiposervicoid = ts.id
                    WHERE 
                        a.empresacnpj = $1 `,
                [empresacnpj]
            );
            return resultado;
        } catch (error) {
            throw new Error("Erro ao buscar serviço por empresa: " + error.message);
        }
    },

    findById: async (id) => {
        try {
            const resultado = await db.oneOrNone('SELECT * FROM servico WHERE id = $1', [id]);
            return resultado;
        } catch (error) {
            throw new Error("Erro na listagem de serviços: " + error.message);
        }
    },

    update: async (id, clientecnpj, tiposervicoid) => {
        try {
            await db.none(
                'UPDATE servico SET clientecnpj = $2, tiposervicoid = $3 WHERE id = $1',
                [id, clientecnpj, tiposervicoid]
            );
        } catch (error) {
            throw new Error("Erro ao atualizar serviço: " + error.message);
        }
    },

    delete: async (id) => {
        try {
            await db.none('DELETE FROM servico WHERE id = $1', [id]);
        } catch (error) {
            throw new Error("Erro ao excluir serviço: " + error.message);
        }
    }
};

export default Servico;
