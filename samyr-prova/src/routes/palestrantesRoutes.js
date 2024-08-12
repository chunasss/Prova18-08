import { Router } from "express";
import {
  cadastrarPalestrantes,
  listarPalestrantes,
} from "../controllers/palestrantesController.js";

const router = Router();

router.get("/palestrantes", listarPalestrantes);
router.post("/palestrantes", cadastrarPalestrantes);

export default router;
