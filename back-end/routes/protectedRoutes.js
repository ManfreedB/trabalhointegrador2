import express from 'express';
import verifyToken from '../middlewares/AuthN.js';

const router = express.Router();

router.get('/validate-token', verifyToken, (req, res) => {
    res.status(200).send({ message: 'Token válido', data: res.locals.funcionario });
});

export default router;
