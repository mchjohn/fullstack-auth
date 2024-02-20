import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            message: "Token is missing",
        });
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token, "70c6a456-1cc1-4e50-b43f-ec0c1358b58c");

        return next();
    } catch (error) {
        return response.status(401).json({
            errorCode: "Tooken is not valid",
        });
    }
}