import { Router } from "express";
import {
  getPlaylists,
  createPlaylist,
  getPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "../controller/playlist.controller.js";

const router = Router();

router.get("/user/:uid", getPlaylists);
router.post("/user/:uid", createPlaylist);

router.get("/:_id", getPlaylist);
router.put("/:_id", updatePlaylist);
router.delete("/:_id", deletePlaylist);

export default router;
