import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: string;
    }
  }
}

export default function authMiddleware(
  req: Request,
  resp: Response,
  next: NextFunction
) {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return resp.status(400).json({
        message: "Unauthorized",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = (payload as JwtPayload).id;
    next();
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
}
