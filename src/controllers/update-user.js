import validator from 'validator'
import { badRequest } from './helpers.js'
import { UpdateUserUseCase } from '../use-cases/update-user.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const isIdValid = validator.isUUID(userId)

            if (!isIdValid) {
                return badRequest({
                    message: 'The provided id is not valid.',
                })
            }

            const updateUserParams = httpRequest.body

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field)
            )

            if (!someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some field is not allowed',
                })
            }

            if (updateUserParams.password) {
                const passwordIsNotValid = params.password.length < 6

                if (passwordIsNotValid) {
                    return badRequest({
                        message: 'Password must be at least 6 characters',
                    })
                }
            }

            if (updateUserParams.email) {
                const emailIsValid = validator.isEmail(updateUserParams.email)

                if (!emailIsValid) {
                    return badRequest({
                        message: 'Invalid e-mail. Please provide a valid one.',
                    })
                }
            }

            const updateUserUseCase = new UpdateUserUseCase()

            const updatedUser = await updateUserUseCase.execute(
                userId,
                updateUserParams
            )

            return ok(updatedUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
