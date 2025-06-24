// models/Cliente.js

import db from '../services/db.js';

const Cliente = {
    add: (cnpj, nome, rua, cep, cidade, estado, telefone) => {
        return db.none(
            'INSERT INTO cliente(cnpj, nomeempresa, rua, cidade, cep, estado, telefone) VALUES($1, $2, $3, $4, $5, $6, $7)',
            [cnpj, nome, rua, cidade, cep, estado, telefone]
        );
    },


    listByEmpresa: (empresaCnpj) => {
        return db.any(
            `SELECT c.*
             FROM cliente c
             INNER JOIN atende a ON a.clientecnpj = c.cnpj
             WHERE a.empresacnpj = $1`,
            [empresaCnpj]
        );
    },

    listCNPJ: (cnpj) => {
        return db.oneOrNone('SELECT * FROM cliente WHERE cnpj = $1', [cnpj]);
    },

    atualizar: (cnpj, nomeempresa, rua, cidade, estado, cep, telefone) => {
        return db.none(
            'UPDATE cliente SET nomeempresa = $2, rua = $3, cidade = $4, estado = $5, cep = $6, telefone = $7 WHERE cnpj = $1',
            [cnpj, nomeempresa, rua, cidade, estado, cep, telefone]
        );
    },

    delete: (cnpj) => {
        return db.none('DELETE FROM cliente WHERE cnpj = $1', [cnpj]);
    }
};

export default Cliente;
