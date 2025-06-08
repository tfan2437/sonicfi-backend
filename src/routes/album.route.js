import { Router } from "express";
import { getAlbum, getArtistAlbums } from "../controller/album.controller.js";

const router = Router();

router.get("/:id", getAlbum);
router.get("/by-artist/:id", getArtistAlbums);

export default router;
