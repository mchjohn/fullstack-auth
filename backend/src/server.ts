import "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';

import { router } from './routes';

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
        status: "error",
        message: err.message
    })
})

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));