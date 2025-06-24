import db from '../services/db.js';
const Funcionario = {
    add: async (cpf, nome, conta, senha, cargo, empresaCnpj) => {
        try {
            const resultado = await db.none(
                'INSERT INTO funcionarios(cpf, nome, conta, senha, cargo, empresacnpj) VALUES($1, $2, $3, $4, $5, $6)',
                [cpf, nome, conta, senha, cargo, empresaCnpj]
            );
            return resultado;
        } catch (error) {
            throw new Error("Erro na criação de funcionário: " + error.mesage);

        }


    },

    list: async () => {
        try {
            const resultado = db.any('SELECT * FROM funcionarios');
            return resultado;
        } catch (error) {
            throw new Error("Erro na listagem: " + error.mesage);
        }
    },

    listByEmpresa: async (empresaCnpj) => {
        try {
            const resultado = db.any('SELECT * FROM funcionarios WHERE empresacnpj = $1', [empresaCnpj])
            return resultado;
        } catch (error) {
            throw new Error("Erro na listagem: " + error.mesage);
        }
    },

    findById: async (id) => {
        try {
            const resultado = db.oneOrNone('SELECT * FROM funcionarios WHERE id = $1', [id]);
            return resultado;
        } catch (error) {
            throw new Error("Erro na busca por id: " + error.mesage);

        }
    },

    findByConta: async (conta) => {
        try {
            const resultado = db.oneOrNone('SELECT * FROM funcionarios WHERE conta = $1', [conta]);
            return resultado;
        } catch (error) {
            throw new Error("Erro na busca por conta: " + error.mesage);
        }
    },

    update: (cpf, nome, conta, senha, cargo) => {
        return db.none(
            'UPDATE funcionarios SET nome = $2, conta = $3, senha = $4, cargo = $5 WHERE cpf = $1',
            [cpf, nome, conta, senha, cargo]
        );
    },

    delete: (cpf) => {
        return db.none('DELETE FROM funcionarios WHERE cpf = $1', [cpf]);
    }
};

export default Funcionario;


