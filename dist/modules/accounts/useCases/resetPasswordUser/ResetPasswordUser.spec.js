// import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory'
// import AppError from '@shared/errors/AppError'
// import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase'
// let resetPasswordUserUseCase: ResetPasswordUserUseCase
// let usersRepositoryInMemory: UsersRepositoryInMemory
// describe('ResetPasswordUser', () => {
//   beforeEach(() => {
//     usersRepositoryInMemory = new UsersRepositoryInMemory()
//     resetPasswordUserUseCase = new ResetPasswordUserUseCase(
//       usersRepositoryInMemory
//     )
//   })
//   it('should be able to resetPasswordUser', async () => {
//     const createdUser = {
//       name: 'User Name Test',
//       description: 'User Description Test',
//     }
//     await resetPasswordUserUseCase.execute(createdUser)
//     const userCreated = await usersRepositoryInMemory.findByName(
//       createdUser.name
//     )
//     expect(userCreated).toHaveProperty('id')
//   })
//   it('should not be able to resetPasswordUser with same name', async () => {
//     const createdUser = {
//       name: 'User Name Test',
//       description: 'User Description Test',
//     }
//     await resetPasswordUserUseCase.execute(createdUser)
//     await expect(resetPasswordUserUseCase.execute(createdUser)).rejects.toEqual(
//       new AppError('Message')
//     )
//   })
// })
"use strict";