import { Router } from "express";
import {
  getNewReleases,
  getTopAndMoreLikeArtists,
  getDiscoverAndPopularAlbums,
  getDiscoverAndPopularTraks,
} from "../controller/suggestion.controller.js";

const router = Router();

router.get("/new-releases", getNewReleases);
router.get("/top-and-more-like-artists", getTopAndMoreLikeArtists);
router.get("/discover-and-popular-albums", getDiscoverAndPopularAlbums);
router.get("/discover-and-popular-tracks", getDiscoverAndPopularTraks);

export default router;
