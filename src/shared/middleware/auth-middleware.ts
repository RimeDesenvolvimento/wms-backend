import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '../../modules/auth/interfaces/auth-interface';

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Access token is required' });
      return;
    }

    const token = authHeader.substring(7);
    const secret = process.env.JWT_SECRET || 'secret';
    
    const decoded = jwt.verify(token, secret) as AuthPayload;
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}; 