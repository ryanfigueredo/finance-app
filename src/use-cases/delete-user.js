export class DeleteUserUseCase {
    constructor(deleteUserRepository) {
        this.deleteUserRepository = deleteUserRepository
    }
    async execute(userId) {
        const deletedUser = await this.postgresDeleteUserRepository.execute(
            userId
        )

        return deletedUser
    }
}
