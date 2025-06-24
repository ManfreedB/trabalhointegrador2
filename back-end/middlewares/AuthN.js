import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = (req, res, next) => {
    let token = req.get('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Token inválido ou ausente' });
    }

    token = token.replace('Bearer ', '');

    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Token inválido', error: err.message });
        }
        req.user = decoded.user;
        next();
    });
};

export default verifyToken;
