import { Router } from "express";
import {
  registrarParticipante,
  listarParticipantes,
  inscreverParticipanteEmEvento
} from "../controllers/participanteController.js";

const router = Router();


router.post("/participantes/registrar", registrarParticipante);


router.get("/participantes", listarParticipantes);


router.post("/participantes/inscrever", inscreverParticipanteEmEvento);

export default router;
