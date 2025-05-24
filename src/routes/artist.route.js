import { Router } from "express";
import { getArtistById } from "../controller/artist.controller.js";

const router = Router();

router.get("/:id", getArtistById);

export default router;
