import { Router } from "express";
import {
  getNewReleasesAlbums,
  getPopularAlbums,
  getTopArtists,
} from "../controller/suggestion.controller.js";

const router = Router();

router.get("/new-releases", getNewReleasesAlbums);
router.get("/popular", getPopularAlbums);
router.get("/top-artists", getTopArtists);
router.get("/more-like", getTopAlbums);

export default router;
