import { Router } from "express";
import { getAlbumById } from "../controller/album.controller.js";

const router = Router();

router.get("/:id", getAlbumById);

export default router;
