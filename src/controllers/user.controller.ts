import { Request, Response } from "express";
import { createUserSchema, updateUserSchema } from "../schemas";
import * as UserService from "../services/user.service";
import { Role } from "../generated/prisma/client";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const role = req.query.role as Role | undefined;
        const users = await UserService.getAllUsers(role);
        res.status(200).json({ users });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ user });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const parsed = createUserSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ message: "Validation error", errors: parsed.error.flatten() });
        }
        const user = await UserService.createUser(parsed.data);
        res.status(201).json({ user });
    } catch (err: any) {
        const status = err.message === "Email already in use" ? 409 : 500;
        res.status(status).json({ message: err.message });
    }
};

export const updateUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const parsed = updateUserSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ message: "Validation error", errors: parsed.error.flatten() });
        }
        const user = await UserService.updateUser(req.params.id, parsed.data);
        res.status(200).json({ user });
    } catch (err: any) {
        const status = err.message === "User not found" ? 404
            : err.message === "Email already in use" ? 409 : 500;
        res.status(status).json({ message: err.message });
    }
};

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        await UserService.deleteUser(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err: any) {
        const status = err.message === "User not found" ? 404
            : err.message === "Cannot delete an admin user" ? 403 : 500;
        res.status(status).json({ message: err.message });
    }
};