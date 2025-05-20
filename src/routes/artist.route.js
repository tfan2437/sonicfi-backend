import { Router } from "express";
import { getAllArtists } from "../controller/artist.controller.js";

const router = Router();

router.get("/", getAllArtists);

export default router;
