import { compare, hash } from "bcryptjs";

import { client } from "../../prisma/client"

import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import { GenerateRefreshTokenProvider } from "../../provider/GenerateRefreshTokenProvider";

interface IUserRequest {
    username: string;
    password: string;
}

export class AuthenticateUserUseCase {
    async execute({ username, password }: IUserRequest) {
        const userAlreadyExists = await client.user.findFirst({
            where: {
                username
            }
        })

        if (!userAlreadyExists) {
            throw new Error("User end/or password incorrect")
        }

        const passwordMatch = await compare(password, userAlreadyExists.password)

        if (!passwordMatch) {
            throw new Error("User end/or password incorrect")
        }

        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(userAlreadyExists.id)

        await client.refreshToken.deleteMany({
            where: {
                userId: userAlreadyExists.id
            }
        })

        const genereateRefreshToken = new GenerateRefreshTokenProvider();
        const refreshToken = await genereateRefreshToken.execute(userAlreadyExists.id)

        const user = {
            id: userAlreadyExists.id,
            username: userAlreadyExists.username,
            token,
            refreshToken,
        }

        return { user }
    }
}