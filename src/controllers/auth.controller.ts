import { Request, Response } from 'express';
import { loginSchema } from '../schemas';
import { loginUser, getMe } from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }

    const { email, password } = parsed.data;
    const result = await loginUser(email, password);

    res.status(200).json(result);
  } catch (error: any) {
    if (error instanceof Error && error.message === 'Invalid email or password') {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const user = await getMe(req.user!.userId);
    res.status(200).json(user);
  } catch (error: any) {
    if (error instanceof Error && error.message === 'User not found') {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};