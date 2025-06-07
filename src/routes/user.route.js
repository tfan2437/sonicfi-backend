import { Router } from "express";
import { getUser, createUser } from "../controller/user.controller.js";

const router = Router();

router.get("/:uid", getUser);
router.post("/:uid", createUser);

export default router;
