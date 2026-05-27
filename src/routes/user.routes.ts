import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/user.controller";

const router = Router();

// All user routes require authentication
router.use(authenticate);

// Admin only
router.get("/", authorize("ADMIN"), getUsers);
router.post("/", authorize("ADMIN"), createUser);
router.get("/:id", authorize("ADMIN"), getUser);
router.put("/:id", authorize("ADMIN"), updateUser);
router.delete("/:id", authorize("ADMIN"), deleteUser);

export default router;