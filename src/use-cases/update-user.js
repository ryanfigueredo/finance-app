import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import bcrypt from 'bcrypt'
import { PostgresUpdatesUserRepository } from '../repositories/postgres/update-user.js'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        // 1. se o email estiver sendo atualizado, verirficar se o novo email já existe
        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository()

            const userWithProvidedEmail =
                await postgresGetUserByEmailRepository.execute(
                    updateUserParams.email
                )

            if (userWithProvidedEmail) {
                throw new EmailAlreadyInUseError(createUserParams.email)
            }
        }

        const user = {
            ...updateUserParams,
        }

        // 2. se a senha estiver sendo atualizada, criptografar a nova senha
        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10
            )

            user.password = hashedPassword
        }

        // 3 chamar o repo e atualizar o user
        const postgresUpdatesUserRepository =
            new PostgresUpdatesUserRepository()
        const updatedUser = await postgresUpdatesUserRepository.execute(
            userId,
            updateUserParams
        )

        return updatedUser
    }
}
