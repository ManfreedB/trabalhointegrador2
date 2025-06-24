import express from "express";
import { getEmpresaByConta } from "../controllers/EmpresaController.js";

const router = express.Router();

router.get("/empresa/dados/:conta", getEmpresaByConta);

export default router;