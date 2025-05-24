import { Router } from "express";
import {
  getNewReleases,
  getTopArtistsAndMoreBy,
  getDiscoverAndPopular,
} from "../controller/suggestion.controller.js";

const router = Router();

router.get("/new-releases", getNewReleases);
router.get("/top-artists-and-more-by", getTopArtistsAndMoreBy);
router.get("/discover-and-popular", getDiscoverAndPopular);

export default router;
