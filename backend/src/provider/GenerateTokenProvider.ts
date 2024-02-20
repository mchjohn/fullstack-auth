import { sign } from "jsonwebtoken";

export class GenerateTokenProvider{
    async execute(userId: string) {
        const token = sign({}, "70c6a456-1cc1-4e50-b43f-ec0c1358b58c", {
            subject: userId,
            expiresIn: "30s"
        })

        return token
    }
}