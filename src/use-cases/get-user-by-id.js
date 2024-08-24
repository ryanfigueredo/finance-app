import { PostgresGetUserByIdRepository } from '../infra/repositories/postgres-get-user-by-id-repository'

export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByIdRepository = new PostgresGetUserByIdRepository()

        const user = await getUserByIdRepository.execute(userId)

        return user
    }
}
