// models/Atende.js

import db from '../services/db.js';

const Atende = {
    add: (cnpjCliente, cnpjEmpresa) => {
        return db.none(
            'INSERT INTO atende (clientecnpj, empresacnpj) VALUES($1, $2)',
            [cnpjCliente, cnpjEmpresa]
        );
    },


    listByEmpresa: (cnpjEmpresa) => {
        return db.any(
            'SELECT * FROM atende WHERE empresacnpj = $1',
            [cnpjEmpresa]
        );
    },


    listByCliente: (cnpjCliente) => {
        return db.any(
            'SELECT * FROM atende WHERE clientecnpj = $1',
            [cnpjCliente]
        );
    },


    delete: (cnpjEmpresa, cnpjCliente) => {
        return db.none(
            'DELETE FROM atende WHERE empresacnpj = $1 AND clientecnpj = $2',
            [cnpjEmpresa, cnpjCliente]
        );
    }
};

export default Atende;
