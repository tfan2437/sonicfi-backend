import { Router } from "express";
import {
  getAlbumById,
  getArtistAlbums,
} from "../controller/album.controller.js";

const router = Router();

router.get("/:id", getAlbumById);
router.get("/by-artist/:id", getArtistAlbums);

export default router;
