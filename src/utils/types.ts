export interface JwtPayload {
  userId: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';
}

// Extend Express Request so req.user is typed everywhere
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}