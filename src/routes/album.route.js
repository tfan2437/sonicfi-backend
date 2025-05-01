import { Router } from "express";
import { getAlbums, getAlbumById } from "../controller/album.controller.js";

const router = Router();

router.get("/", getAlbums);
router.get("/:id", getAlbumById);

export default router;
