import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import { UserService } from "@/modules/users/services/user-service";
import { UserRepository } from "@/modules/users/repositories/user-repository";
import { AuthPayload } from "@/modules/auth/interfaces/auth-interface";

export const authorizationMiddleware = (allowedRoles: Role[]) => {
  const userService = new UserService(new UserRepository());

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.user as AuthPayload | undefined;

      if (!payload) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
      }

      const user = await userService.findById(payload.userId);

      if (!user) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
      }

      if (!user.role || !allowedRoles.includes(user.role as Role)) {
        res.status(403).json({ success: false, error: "Forbidden - Insufficient permissions" });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };
};