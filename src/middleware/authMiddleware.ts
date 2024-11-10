// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { configuration } from "../config/config";
export interface AuthRequest extends Request {
  id: string;
}
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized", success: false });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      configuration.JWT_SECRET as string
    ) as JwtPayload;
    const _req = req as AuthRequest;
    _req.id = decoded.id as string;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid token", success: false, error: error });
  }
};
