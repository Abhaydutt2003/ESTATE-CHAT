import express from "express";
import { verifyJwt } from "../middlewares/verifyJwt.js";
import {
  deleteUser,
  updateUser,
  getNotificationNumber,
  profilePosts,
  savePost,
} from "../controllers/user.controller.js";

const router = express.Router();


router.put("/:id", verifyJwt, updateUser);
router.delete("/:id", verifyJwt, deleteUser);
router.post("/save", verifyJwt, savePost);
router.get("/notification", verifyJwt, getNotificationNumber);
router.get("/profilePosts", verifyJwt, profilePosts);

export default router;
