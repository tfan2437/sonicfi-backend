import { Router } from "express";
import { getAllTracks } from "../controller/track.controller.js";

const router = Router();

router.get("/", getAllTracks);

export default router;
