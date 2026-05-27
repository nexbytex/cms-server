"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = void 0;
const schemas_1 = require("../utils/schemas");
const auth_service_1 = require("../services/auth.service");
const login = async (req, res) => {
    try {
        // Validate request body
        const parsed = schemas_1.loginSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.issues[0].message });
            return;
        }
        const { email, password } = parsed.data;
        const result = await (0, auth_service_1.loginUser)(email, password);
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Invalid email or password') {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.login = login;
const me = async (req, res) => {
    try {
        const user = await (0, auth_service_1.getMe)(req.user.userId);
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'User not found') {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.me = me;
